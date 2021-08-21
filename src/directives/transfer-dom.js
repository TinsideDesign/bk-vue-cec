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
 * @file transfer-dom
 * https://github.com/airyland/vux/blob/v2/src/directives/transfer-dom/index.js
 * https://github.com/calebroseland/vue-dom-portal
 */

/**
 * Get target DOM Node
 * @param {(Node|string|Boolean)} [node=document.body] DOM Node, CSS selector, or Boolean
 * @return {Node} The target that the el will be appended to
 */
function getTarget (node) {
    if (node === void 0) {
        node = document.body
    }
    if (node === true) {
        return document.body
    }
    return node instanceof window.Node ? node : document.querySelector(node)
}

const transferDom = {
    inserted (el, { value }, vnode) {
        if (el.dataset.transfer !== 'true') {
            return false
        }
        el.className = el.className ? el.className + ' v-transfer-dom' : 'v-transfer-dom'
        const parentNode = el.parentNode
        if (!parentNode) {
            return
        }
        const home = document.createComment('')
        let hasMovedOut = false

        if (value !== false) {
            parentNode.replaceChild(home, el) // moving out, el is no longer in the document
            getTarget(value).appendChild(el) // moving into new place
            hasMovedOut = true
        }
        if (!el.__transferDomData) {
            el.__transferDomData = {
                parentNode: parentNode,
                home: home,
                target: getTarget(value),
                hasMovedOut: hasMovedOut
            }
        }
    },
    componentUpdated (el, { value }) {
        if (el.dataset.transfer !== 'true') {
            return false
        }
        // need to make sure children are done updating (vs. `update`)
        const ref$1 = el.__transferDomData
        if (!ref$1) {
            return
        }
        // homes.get(el)
        const parentNode = ref$1.parentNode
        const home = ref$1.home
        const hasMovedOut = ref$1.hasMovedOut // recall where home is

        if (!hasMovedOut && value) {
            // remove from document and leave placeholder
            parentNode.replaceChild(home, el)
            // append to target
            getTarget(value).appendChild(el)
            el.__transferDomData = Object.assign(
                {},
                el.__transferDomData,
                {
                    hasMovedOut: true,
                    target: getTarget(value)
                })
        } else if (hasMovedOut && value === false) {
            // previously moved, coming back home
            parentNode.replaceChild(el, home)
            el.__transferDomData = Object.assign(
                {},
                el.__transferDomData,
                {
                    hasMovedOut: false,
                    target: getTarget(value)
                })
        } else if (value) {
            // already moved, going somewhere else
            getTarget(value).appendChild(el)
        }
    },
    unbind (el) {
        if (el.dataset.transfer !== 'true') {
            return false
        }
        el.className = el.className.replace('v-transfer-dom', '')
        const ref$1 = el.__transferDomData
        if (!ref$1) {
            return
        }
        if (el.__transferDomData.hasMovedOut === true) {
            el.__transferDomData.parentNode && el.__transferDomData.parentNode.appendChild(el)
        }
        el.__transferDomData = null
    }
}

transferDom.install = Vue => {
    Vue.directive('bk-transfer-dom', transferDom)
}

export default transferDom
