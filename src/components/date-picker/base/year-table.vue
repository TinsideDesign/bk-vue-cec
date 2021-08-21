<!--
 * Tencent is pleased to support the open source community by making
 * 科技内在设计（T-inside） available.
 *
 * Copyright (C) 2021 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * 科技内在设计（T-inside） is licensed under the MIT License.
 *
 * License for 科技内在设计（T-inside）:
 *
 *
 * Terms of the MIT License:
 * ---------------------------------------------------
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
 * to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of
 * the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
 * THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
-->

<template>
    <div class="bk-date-picker-cells bk-date-picker-cells-year">
        <span :class="getCellCls(cell)" v-for="(cell, index) in cells" :key="index" @click="handleClick(cell)" @mouseenter="handleMouseMove(cell)">
            <em>{{cell.date.getFullYear()}}</em>
        </span>
    </div>
</template>
<script>
    import { clearHours } from '@/utils/date'
    import mixin from './mixin'

    export default {
        mixins: [mixin],
        computed: {
            startYear () {
                return Math.floor(this.tableDate.getFullYear() / 10) * 10
            },
            cells () {
                const cells = []
                const cellTmpl = {
                    text: '',
                    selected: false,
                    disabled: false
                }

                const selectedDays = this.dates.filter(Boolean).map(
                    date => clearHours(new Date(date.getFullYear(), 0, 1))
                )
                const focusedDate = clearHours(new Date(this.focusedDate.getFullYear(), 0, 1))

                for (let i = 0; i < 10; i++) {
                    const cell = JSON.parse(JSON.stringify(cellTmpl))
                    cell.date = new Date(this.startYear + i, 0, 1)
                    cell.disabled = typeof this.disabledDate === 'function'
                        && this.disabledDate(cell.date)
                        && this.selectionMode === 'year'
                    const day = clearHours(cell.date)
                    cell.selected = selectedDays.includes(day)
                    cell.focused = day === focusedDate
                    cells.push(cell)
                }

                return cells
            }
        },
        methods: {
            getCellCls (cell) {
                return [
                    'bk-date-picker-cells-cell',
                    {
                        'bk-date-picker-cells-cell-selected': cell.selected,
                        'bk-date-picker-cells-cell-disabled': cell.disabled,
                        // ['bk-date-picker-cells-cell-focused']: cell.focused,
                        'bk-date-picker-cells-cell-range': cell.range && !cell.start && !cell.end
                    }
                ]
            }
        }
    }
</script>
