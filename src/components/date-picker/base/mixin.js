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
 * @file all mixin
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import { clearHours } from '@/utils/date'

export default {
    name: 'PanelTable',
    props: {
        tableDate: {
            type: Date,
            required: true
        },
        disabledDate: {
            type: Function
        },
        selectionMode: {
            type: String,
            required: true
        },
        value: {
            type: Array,
            required: true
        },
        rangeState: {
            type: Object,
            default: () => ({
                from: null,
                to: null,
                selecting: false
            })
        },
        focusedDate: {
            type: Date,
            required: true
        }
    },
    computed: {
        dates () {
            const { selectionMode, value, rangeState } = this
            const rangeSelecting = selectionMode === 'range' && rangeState.selecting
            return rangeSelecting ? [rangeState.from] : value
        }
    },
    methods: {
        handleClick (cell) {
            if (cell.disabled || cell.type === 'weekLabel') {
                return
            }
            const newDate = new Date(clearHours(cell.date))

            this.$emit('pick', newDate)
            this.$emit('pick-click')
        },
        handleMouseMove (cell) {
            if (!this.rangeState.selecting) {
                return
            }
            if (cell.disabled) {
                return
            }
            const newDate = cell.date
            this.$emit('change-range', newDate)
        }
    }
}
