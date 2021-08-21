/*
 * Tencent is pleased to support the open source community by making
 * 科技内在设计（T-inside） available.
 *
 * Copyright (C) 2021 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * 科技内在设计（T-inside） is licensed under the MIT License.
 *
 * License for 科技内在设计（T-inside）:
 *
 * ---------------------------------------------------
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
 * to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of
 * the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
 * THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
*/

/**
 * @file 提取组件的 props 插件
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

/**
 * 获取源代码
 *
 * @param {string} source 整个文件的源码
 * @param {Number} startLine 开始行数
 * @param {Number} endLine 结束函数
 * @param {Number} startColumn 开始列数
 * @param {Number} endColumn 结束列数
 *
 * @return {string} 源码内容
 */
function getSourceCode (source, startLine, endLine, startColumn, endColumn) {
    const isSingleLine = startLine === endLine

    let sourceLines = source.split('\n').slice(startLine - 1, isSingleLine ? startLine : endLine)

    sourceLines[0] = sourceLines[0].slice(startColumn)
    sourceLines[sourceLines.length - 1] = sourceLines[sourceLines.length - 1].slice(
        0,
        isSingleLine ? endColumn - startColumn : endColumn
    )
    sourceLines = sourceLines.filter(d => d.length)

    const shortestIndentation = sourceLines.reduce((acc, next) => {
        let length = 0
        while (next.charAt(length) === ' ') {
            length += 1
        }
        return acc < length ? acc : length
    }, Infinity)
    sourceLines = sourceLines.filter(d => d.replace(/[ ]*/, ''))
    return sourceLines.map(d => d.substring(shortestIndentation)).join('\n')
}

module.exports = function ({ types: t }, { result = {} }) {
    return {
        visitor: {
            /**
             * Property 对象属性
             *
             * https://github.com/estree/estree/blob/master/es5.md#property
             *
             * @param {Object} path 当前 NodePath
             * @param {Object} state 当前 PluginPass 实例，一次 Program 里的 visitor 共享
             */
            ObjectProperty (path, state) {
                const node = path.node
                // 只提取 props
                if (node.key.name !== 'props') {
                    return
                }

                const properties = node.value.properties || []
                properties.forEach(p => {
                    const keyName = p.key.name
                    const value = p.value

                    // props: {aaa: String}
                    if (t.isIdentifier(value)) {
                        result[keyName] = {
                            type: value.name
                        }
                    } else if (t.isArrayExpression(value)) { // props: {aaa: [String, Array, Number]}
                        const elements = value.elements
                        result[keyName] = {
                            type: elements.filter(elem => t.isIdentifier(elem)).map(elem => elem.name)
                        }
                    } else if (t.isObjectExpression(value)) { // props: { bbb: { type: String, default: '' } }
                        result[keyName] = {}

                        ;(value.properties || []).filter(
                            valueProp => t.isIdentifier(valueProp.key)
                        ).map(valueProp => valueProp).forEach(valueProp => {
                            const k = valueProp.key.name

                            if (t.isObjectProperty(valueProp)) {
                                const v = valueProp.value
                                if (t.isFunctionExpression(v) || t.isArrowFunctionExpression(v)) {
                                    const startLine = v.loc.start.line
                                    const endLine = v.loc.end.line
                                    const startColumn = v.loc.start.column
                                    const endColumn = v.loc.end.column

                                    result[keyName][k] = getSourceCode(
                                        this.file.code,
                                        startLine,
                                        endLine,
                                        startColumn,
                                        endColumn
                                    )
                                } else {
                                    if (t.isArrayExpression(v)) {
                                        result[keyName][k] = v.elements.filter(
                                            elem => t.isIdentifier(elem)
                                        ).map(elem => elem.name)
                                    } else {
                                        // type: Array
                                        if (t.isIdentifier(v)) {
                                            result[keyName][k] = v.name
                                        } else { // default: 'ss' or default: 0 or default: -1
                                            // 都转化为 ArrowFunctionExpression，方便 eval 直接调用方法
                                            result[keyName][k] = `() => ${getSourceCode(
                                                this.file.code,
                                                v.loc.start.line,
                                                v.loc.end.line,
                                                v.loc.start.column,
                                                v.loc.end.column
                                            )}`
                                        }
                                    }
                                }
                            } else if (t.isObjectMethod(valueProp)) {
                                const startLine = valueProp.body.loc.start.line
                                const endLine = valueProp.body.loc.end.line
                                const startColumn = valueProp.body.loc.start.column + 0
                                const endColumn = valueProp.body.loc.end.column - 0

                                // 都转化为 ArrowFunctionExpression，方便 eval 直接调用方法
                                result[keyName][k]
                                    = `(${valueProp.params.map(param => param.name).join(',')}) => ${getSourceCode(
                                        this.file.code,
                                        startLine,
                                        endLine,
                                        startColumn,
                                        endColumn
                                    )}`
                            }
                        })
                    }
                })

                // props: ['aaa', 'bbb]
                const value = node.value
                if (t.isArrayExpression(value)) {
                    value.elements.forEach(elem => {
                        result[elem.value] = {}
                    })
                }
            }
        }
    }
}
