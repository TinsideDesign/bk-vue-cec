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
 * @file date-panel-mixin
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import { initTime } from '@/utils/date'

export default {
    props: {
        showTime: {
            type: Boolean,
            default: false
        },
        format: {
            type: String,
            default: 'yyyy-MM-dd'
        },
        selectionMode: {
            type: String,
            default: 'date',
            validator (value) {
                if (['year', 'month', 'date', 'time'].indexOf(value) < 0) {
                    console.error(`selectionMode property is not valid: '${value}'`)
                    return false
                }
                return true
            }
        },
        disabledDate: {
            type: Function,
            default: () => false
        },
        value: {
            type: Array,
            default: () => [initTime(), initTime()]
        },
        timePickerOptions: {
            default: () => ({}),
            type: Object
        },
        startDate: {
            type: Date
        },
        pickerType: {
            type: String,
            require: true
        },
        focusedDate: {
            type: Date,
            required: true
        },
        // 结束时间是否允许“至今”
        upToNow: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        isTime () {
            return this.currentView === 'time'
        }
    },
    methods: {
        handleToggleTime () {
            this.currentView = this.currentView === 'time' ? 'date' : 'time'
        }
    }
}
