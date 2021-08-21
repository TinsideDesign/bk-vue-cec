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
 * @file 提取中文（非注释中的）
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

const { readdirSync, readFileSync, writeFileSync, statSync } = require('fs')
const { resolve, basename, extname, relative } = require('path')

const vueFiles = {}
;(function walkVue (filePath) {
    const dirList = readdirSync(filePath)
    dirList.forEach(item => {
        if (statSync(filePath + '/' + item).isDirectory()) {
            walkVue(filePath + '/' + item)
        } else {
            const ext = extname(item)
            if (ext === '.vue' || ext === '.js') {
                if (!vueFiles[basename(filePath)]) {
                    vueFiles[basename(filePath)] = []
                }
                vueFiles[basename(filePath)].push(relative('.', filePath + '/' + item))
            }
        }
    })
})(resolve(__dirname, '../src'))

const JS_COMMENT_REG = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg
const HTML_COMMENT_REG = /(<!--.*?-->)/mg
const CHINESE_REG = /[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29\u{20000}-\u{2A6D6}\u{2A700}-\u{2B734}\u{2B740}-\u{2B81D}\u{2B820}-\u{2CEA1}\u{2CEB0}-\u{2EBE0}][^\s'"<]*/umg
// const CHINESE_REG = /[\u4E00-\u9FA5\uf900-\ufa2d][^\s'"]*/umg

const ret = {}
let match = null

Object.keys(vueFiles).forEach(key => {
    ret[key] = {}
    vueFiles[key].forEach(file => {
        if (!ret[key][file]) {
            ret[key][file] = []
        }
        const content = readFileSync(resolve(file), 'UTF-8')
        const noCommentContent = content.replace(JS_COMMENT_REG, '').replace(HTML_COMMENT_REG, '')
        // eslint-disable-next-line no-cond-assign
        while (match = CHINESE_REG.exec(noCommentContent)) {
            ret[key][file].push(match[0])
        }
    })
})

const retFileName = 'extract-chinese.json'
const absolutePath = resolve(__dirname, retFileName)
writeFileSync(absolutePath, JSON.stringify(ret, null, 4), 'UTF-8')

// console.log(ret)

// test
// const content = readFileSync(resolve(vueFileList[0].path), 'UTF-8')
// const noCommentContent = content.replace(JS_COMMENT_REG, '').replace(HTML_COMMENT_REG, '')
// console.error(noCommentContent)

// let match = null
// const ret = []
// // const r = /[\u4E00-\u9FA5\uf900-\ufa2d]\S+/gum
// // console.error(noCommentContent.match(r))
// // const r = /\p{Unified_Ideograph}/u
// while (!!(match = CHINESE_REG.exec(noCommentContent))) {
//     console.log(111, match[0])
// }
