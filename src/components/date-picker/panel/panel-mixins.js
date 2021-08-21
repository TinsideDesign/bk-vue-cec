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
 * @file panel-mixins
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

export default {
    props: {
        confirm: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        capitalize (str) {
            return str[0].toUpperCase() + str.slice(1)
        },
        iconBtnCls (direction, type = '') {
            return [
                'bk-picker-panel-icon-btn',
                `bk-date-picker-${direction}-btn`,
                `bk-date-picker-${direction}-btn-arrow${type}`
            ]
        },
        handleShortcutClick (shortcut) {
            if (shortcut.value) {
                // pick 参数：dates, visible, type, isUseShortCut
                this.$emit('pick', shortcut.value(), false, undefined, shortcut)
                // this.$emit('pick', shortcut.value())
            }
            if (shortcut.onClick) {
                shortcut.onClick(this)
            }
            if (this.shortcutClose) {
                this.handlePickSuccess()
            }
        },
        handlePickClear () {
            this.resetView()
            this.$emit('pick-clear')
        },
        handlePickSuccess () {
            this.resetView()
            this.$emit('pick-success')
        },
        handlePickClick () {
            this.$emit('pick-click')
        },
        resetView () {
            setTimeout(
                () => {
                    this.currentView = this.selectionMode
                },
                500
            )
        },
        handleClear () {
            this.dates = this.dates.map(() => null)
            this.rangeState = {}
            this.$emit('pick', this.dates)
            this.handleConfirm()
        },
        handleConfirm (visible, type) {
            this.$emit('pick', this.dates, visible, type || this.type)
        },
        onToggleVisibility (open) {
            const { timeSpinner, timeSpinnerEnd } = this.$refs
            if (open && timeSpinner) {
                timeSpinner.updateScroll()
            }
            if (open && timeSpinnerEnd) {
                timeSpinnerEnd.updateScroll()
            }
        }
    }
}
