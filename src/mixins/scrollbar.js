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
 * @file 滚动条的 mixin，当出现弹框（遮罩）时，页面滚动条隐藏
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import { getScrollBarWidth } from '../utils/dom'

export default {
    methods: {
        checkScrollBar () {
            let fullWindowWidth = window.innerWidth
            if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
                const documentElementRect = document.documentElement.getBoundingClientRect()
                fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
            }
            this.bodyIsOverflowing = document.documentElement.clientWidth < fullWindowWidth
            if (this.bodyIsOverflowing) {
                this.scrollBarWidth = getScrollBarWidth() || (fullWindowWidth - document.documentElement.clientWidth)
            }
        },
        checkMaskInVisible () {
            const masks = document.getElementsByClassName('bk-dialog-mask') || []
            return Array.from(masks).every(m => this.isHidden(m) || m.classList.contains('fade-leave-to'))
        },
        isHidden (el) {
            const style = window.getComputedStyle(el)
            return style.display === 'none'
        },
        setScrollBar () {
            if (this.bodyIsOverflowing && this.scrollBarWidth !== undefined) {
                document.body.style.paddingRight = `${this.scrollBarWidth}px`
            }
        },
        resetScrollBar () {
            document.body.style.paddingRight = ''
        },
        addScrollEffect () {
            this.checkScrollBar()
            this.setScrollBar()
            if (document.body.__oldOverflow === undefined) {
                document.body.__oldOverflow = document.body.style.overflow
            }
            document.body.style.overflow = 'hidden'
        },
        removeScrollEffect () {
            if (this.checkMaskInVisible()) {
                document.body.style.overflow = document.body.__oldOverflow || ''
                this.resetScrollBar()
            }
        }
    }
}
