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

import '../../ui/compose-form-item.css'

const isCustomComponent = node => {
    return node.tag && node.componentOptions
}

export default {
    name: 'bk-compose-form-item',
    props: {
        headBackgroundColor: {
            type: String,
            default: '#FAFBFD'
        },
        tailBackgroundColor: String
    },
    render (h) {
        const childrenArr = this.$slots.default

        if (childrenArr.length > 1) {
            const childrenLength = childrenArr.length
            let startIndex = 0
            let headChildren = null
            while (startIndex < childrenLength) {
                if (isCustomComponent(childrenArr[startIndex])) {
                    headChildren = childrenArr[startIndex]
                    break
                }
                startIndex++
            }

            let tailIndex = childrenLength - 1
            let tailChildren = null
            while (tailIndex >= 0 && tailIndex > startIndex) {
                if (isCustomComponent(childrenArr[tailIndex])) {
                    tailChildren = childrenArr[tailIndex]
                    break
                }
                tailIndex--
            }

            if (headChildren && tailChildren) {
                let headChildStaticClass = 'bk-compose-form-item-head'
                if (headChildren.data.staticClass) {
                    headChildStaticClass += ` ${headChildren.data.staticClass}`
                }
                if (this.headBackgroundColor) {
                    headChildren.data.style = Object.assign(headChildren.data.style || {}, {
                        'background-color': this.headBackgroundColor
                    })
                }
                headChildren.data.staticClass = headChildStaticClass

                let tailChildStaticClass = 'bk-compose-form-item-tail'
                if (tailChildren.data.staticClass) {
                    tailChildStaticClass += ` ${tailChildren.data.staticClass}`
                }
                if (this.tailBackgroundColor) {
                    tailChildren.data.style = Object.assign(tailChildren.data.style || {}, {
                        'background-color': this.tailBackgroundColor
                    })
                }
                tailChildren.data.staticClass = tailChildStaticClass
            }
        }
        return h('div', {
            staticClass: 'bk-compose-form-item'
        }, childrenArr)
    }
}
