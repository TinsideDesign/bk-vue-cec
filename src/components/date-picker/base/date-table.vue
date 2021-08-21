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
    <div class="bk-date-picker-cells">
        <div class="bk-date-picker-cells-header">
            <span v-for="day in headerDays" :key="day">{{day}}</span>
        </div>
        <span :class="getCellCls(cell)" v-for="(cell, i) in cells" :key="String(cell.date) + i" @click="handleClick(cell, $event)" @mouseenter="handleMouseMove(cell)">
            <em>{{cell.desc}}</em>
        </span>
    </div>
</template>
<script>
    import jsCalendar from 'js-calendar'

    import locale from 'bk-magic-vue/lib/locale'
    import { clearHours, isInRange } from '@/utils/date'
    import mixin from './mixin'

    // import locale from '@/locale'
    // import lang from '@/locale/lang'
    // locale.use(lang.enUS)

    export default {
        mixins: [mixin, locale.mixin],
        data () {
            return {
            }
        },
        computed: {
            calendar () {
                return new jsCalendar.Generator({ onlyDays: true, weekStart: 0 })
            },
            headerDays () {
                const translatedDays = [
                    this.t('bk.datePicker.weekdays.sun'),
                    this.t('bk.datePicker.weekdays.mon'),
                    this.t('bk.datePicker.weekdays.tue'),
                    this.t('bk.datePicker.weekdays.wed'),
                    this.t('bk.datePicker.weekdays.thu'),
                    this.t('bk.datePicker.weekdays.fri'),
                    this.t('bk.datePicker.weekdays.sat')
                ]
                return translatedDays.splice(0, 7 - 0).concat(translatedDays.splice(0, 0))
            },
            cells () {
                const tableYear = this.tableDate.getFullYear()
                const tableMonth = this.tableDate.getMonth()
                const today = clearHours(new Date())

                const selectedDays = this.dates.filter(Boolean).map(clearHours)
                const [minDay, maxDay] = this.dates.map(clearHours)
                const rangeStart = this.rangeState.from && clearHours(this.rangeState.from)
                const rangeEnd = this.rangeState.to && clearHours(this.rangeState.to)

                const isRange = this.selectionMode === 'range'
                const disabledTestFn = typeof this.disabledDate === 'function' && this.disabledDate

                return this.calendar(tableYear, tableMonth, cell => {
                    if (cell.date instanceof Date) {
                        cell.date.setTime(cell.date.getTime() + cell.date.getTimezoneOffset() * 60000)
                    }

                    const time = cell.date && clearHours(cell.date)
                    const dateIsInCurrentMonth = cell.date && tableMonth === cell.date.getMonth()
                    return {
                        ...cell,
                        type: time === today ? 'today' : cell.type,
                        selected: dateIsInCurrentMonth && selectedDays.includes(time),
                        disabled: (cell.date && disabledTestFn) && disabledTestFn(new Date(time)),
                        range: dateIsInCurrentMonth && isRange && isInRange(time, rangeStart, rangeEnd),
                        start: dateIsInCurrentMonth && isRange && time === minDay,
                        end: dateIsInCurrentMonth && isRange && time === maxDay
                    }
                }).cells.slice(0)
            }
        },
        methods: {
            getCellCls (cell) {
                return [
                    'bk-date-picker-cells-cell',
                    {
                        [`bk-date-picker-cells-cell-selected`]: cell.selected || cell.start || cell.end,
                        [`bk-date-picker-cells-cell-disabled`]: cell.disabled,
                        [`bk-date-picker-cells-cell-today`]: cell.type === 'today',
                        [`bk-date-picker-cells-cell-prev-month`]: cell.type === 'prevMonth',
                        [`bk-date-picker-cells-cell-next-month`]: cell.type === 'nextMonth',
                        [`bk-date-picker-cells-cell-week-label`]: cell.type === 'weekLabel',
                        [`bk-date-picker-cells-cell-range`]: cell.range && !cell.start && !cell.end
                        // [`bk-date-picker-cells-focused`]: clearHours(cell.date) === clearHours(this.focusedDate)
                    }
                ]
            }
        }
    }
</script>
