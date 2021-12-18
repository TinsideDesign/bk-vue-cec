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
    <div class="bk-picker-panel-body-wrapper bk-date-picker-with-range" :class="[shortcuts.length || $slots.shortcuts ? 'bk-picker-panel-with-sidebar' : '']" @mousedown.prevent>
        <div class="bk-picker-panel-body" :class="showTime ? 'bk-picker-panel-body-time' : 'bk-picker-panel-body-date'">
            <!-- left panel -->
            <div class="bk-picker-panel-content bk-picker-panel-content-left" v-show="!isTime" style="width: 261px;">
                <div class="bk-date-picker-header" v-show="currentView !== 'time'">
                    <span :class="iconBtnCls('prev', '-double')" @click="prevYear('left')"><i class="bk-icon icon-angle-double-left"></i></span>
                    <span :class="iconBtnCls('prev')" v-if="leftPickerTable === 'date-table'" @click="prevMonth('left')" v-show="currentView === 'date'">
                        <i class="bk-icon icon-angle-left"></i>
                    </span>
                    <date-panel-label :date-panel-label="leftDatePanelLabel" :current-view="leftDatePanelView"></date-panel-label>
                    <span :class="iconBtnCls('next', '-double')" v-if="splitPanels || leftPickerTable !== 'date-table'" @click="nextYear('left')">
                        <i class="bk-icon icon-angle-double-right"></i>
                    </span>
                    <span :class="iconBtnCls('next')" v-if="splitPanels && leftPickerTable === 'date-table'" @click="nextMonth('left')" v-show="currentView === 'date'">
                        <i class="bk-icon icon-angle-right"></i>
                    </span>
                </div>
                <!-- eslint-disable-next-line vue/require-component-is -->
                <component
                    :is="leftPickerTable"
                    ref="leftYearTable"
                    v-if="currentView !== 'time'"
                    selection-mode="range"
                    :table-date="leftPanelDate"
                    :disabled-date="disabledDate"
                    :range-state="rangeState"
                    :value="preSelecting.left ? [dates[0]] : dates"
                    :focused-date="focusedDate"
                    @change-range="handleChangeRange"
                    @pick="panelPickerHandlers.left"
                    @pick-click="handlePickClick"
                ></component>
            </div>

            <!-- right panel -->
            <div class="bk-picker-panel-content bk-picker-panel-content-right" v-show="!isTime" style="width: 261px;">
                <div class="bk-date-picker-header" v-show="currentView !== 'time'">
                    <span :class="iconBtnCls('prev', '-double')" v-if="splitPanels || rightPickerTable !== 'date-table'" @click="prevYear('right')">
                        <i class="bk-icon icon-angle-double-left"></i>
                    </span>
                    <span :class="iconBtnCls('prev')" v-if="splitPanels && rightPickerTable === 'date-table'" @click="prevMonth('right')" v-show="currentView === 'date'">
                        <i class="bk-icon icon-angle-left"></i>
                    </span>
                    <date-panel-label :date-panel-label="rightDatePanelLabel" :current-view="rightDatePanelView"></date-panel-label>

                    <template v-if="upToNow">
                        <span href="javascript: void(0);" v-if="(rangeState.selecting || currentView === 'time') && upToNowEnable" class="up-to-now"
                            @click="handleRangePick(new Date(), 'upToNow')">
                            {{t('bk.datePicker.toNow')}}
                        </span>
                        <span href="javascript: void(0);" v-else class="up-to-now disabled">
                            {{t('bk.datePicker.toNow')}}
                        </span>
                    </template>
                    <!-- <span v-if="upToNow">{{t('bk.datePicker.toNow')}}</span> -->
                    <span :class="iconBtnCls('next', '-double')" @click="nextYear('right')"><i class="bk-icon icon-angle-double-right"></i></span>
                    <span :class="iconBtnCls('next')" v-if="rightPickerTable === 'date-table'" @click="nextMonth('right')" v-show="currentView === 'date'">
                        <i class="bk-icon icon-angle-right"></i>
                    </span>
                </div>
                <!-- eslint-disable-next-line vue/require-component-is -->
                <component
                    :is="rightPickerTable"
                    ref="rightYearTable"
                    v-if="currentView !== 'time'"
                    selection-mode="range"
                    :table-date="rightPanelDate"
                    :range-state="rangeState"
                    :disabled-date="disabledDate"
                    :value="preSelecting.right ? [dates[dates.length - 1]] : dates"
                    :focused-date="focusedDate"
                    @change-range="handleChangeRange"
                    @pick="panelPickerHandlers.right"
                    @pick-click="handlePickClick">
                </component>
            </div>

            <div class="bk-picker-panel-content" v-show="isTime">
                <time-picker
                    ref="timePicker"
                    v-if="currentView === 'time'"
                    :value="dates"
                    :format="format"
                    :time-disabled="timeDisabled"
                    v-bind="timePickerOptions"
                    @pick="handleRangePick"
                    @pick-click="handlePickClick"
                    @pick-clear="handlePickClear"
                    @pick-success="handlePickSuccess"
                    @pick-toggle-time="handleToggleTime"
                ></time-picker>
            </div>
            <Confirm
                v-if="confirm"
                :clearable="clearable"
                :show-time="showTime"
                :is-time="isTime"
                :time-disabled="timeDisabled"
                @pick-toggle-time="handleToggleTime"
                @pick-clear="handlePickClear"
                @pick-success="handlePickSuccess"></Confirm>
        </div>
        <div class="bk-picker-panel-sidebar" v-if="shortcuts.length || $slots.shortcuts">
            <slot v-if="$slots.shortcuts" name="shortcuts"></slot>
            <div v-else class="bk-picker-panel-shortcut" v-for="(shortcut, index) in shortcuts" :key="index" @click="handleShortcutClick(shortcut)">{{shortcut.text}}</div>
        </div>
    </div>
</template>
<script>
    import { toDate, initTime, formatDateLabels } from '@/utils/date'
    import locale from 'bk-magic-vue/lib/locale'
    import DateTable from '../base/date-table.vue'
    import YearTable from '../base/year-table.vue'
    import MonthTable from '../base/month-table.vue'
    import TimePicker from './time-range.vue'
    import Confirm from '../base/confirm.vue'

    import DatePanelLabel from './date-panel-label.vue'

    import datePanelMixin from './date-panel-mixin'
    import panelMixins from './panel-mixins'

    const dateSorter = (a, b) => {
        if (!a || !b) {
            return 0
        }
        return a.getTime() - b.getTime()
    }

    export default {
        name: 'DateRangePanel',
        components: {
            /* eslint-disable vue/no-unused-components */
            DateTable,
            YearTable,
            MonthTable,
            /* eslint-enable vue/no-unused-components */
            TimePicker,
            DatePanelLabel,
            Confirm
        },
        mixins: [panelMixins, datePanelMixin, locale.mixin],
        props: {
            clearable: {
                type: Boolean,
                default: true
            },
            splitPanels: {
                type: Boolean,
                default: true
            },
            shortcuts: {
                type: Array,
                default: () => []
            },
            shortcutClose: {
                type: Boolean,
                default: false
            }
        },
        data () {
            const [minDate, maxDate] = this.value.map(date => date || initTime())
            const leftPanelDate = this.startDate ? this.startDate : minDate

            return {
                dates: this.value,
                rangeState: { from: this.value[0], to: this.value[1], selecting: minDate && !maxDate },
                currentView: this.selectionMode || 'range',
                leftPickerTable: `${this.selectionMode}-table`,
                rightPickerTable: `${this.selectionMode}-table`,
                leftPanelDate: leftPanelDate,
                rightPanelDate: new Date(leftPanelDate.getFullYear(), leftPanelDate.getMonth() + 1, 1),
                // 判断 range 中，第一次选的时间是否晚于当前时间
                upToNowEnable: false
            }
        },
        computed: {
            leftDatePanelLabel () {
                return this.panelLabelConfig('left')
            },
            rightDatePanelLabel () {
                return this.panelLabelConfig('right')
            },
            leftDatePanelView () {
                return this.leftPickerTable.split('-').shift()
            },
            rightDatePanelView () {
                return this.rightPickerTable.split('-').shift()
            },
            timeDisabled () {
                return !(this.dates[0] && this.dates[1])
            },
            preSelecting () {
                const tableType = `${this.currentView}-table`

                return {
                    left: this.leftPickerTable !== tableType,
                    right: this.rightPickerTable !== tableType
                }
            },
            panelPickerHandlers () {
                return {
                    left: this.preSelecting.left ? this.handlePreSelection.bind(this, 'left') : this.handleRangePick,
                    right: this.preSelecting.right ? this.handlePreSelection.bind(this, 'right') : this.handleRangePick
                }
            }
        },
        watch: {
            value (newVal) {
                const minDate = newVal[0] ? toDate(newVal[0]) : null
                const maxDate = newVal[1] ? toDate(newVal[1]) : null
                this.dates = [minDate, maxDate].sort(dateSorter)

                this.rangeState = {
                    from: this.dates[0],
                    to: this.dates[1],
                    selecting: false
                }

                this.setPanelDates(this.startDate || this.dates[0] || new Date())
            },
            currentView (currentView) {
                const leftMonth = this.leftPanelDate.getMonth()
                const rightMonth = this.rightPanelDate.getMonth()
                const isSameYear = this.leftPanelDate.getFullYear() === this.rightPanelDate.getFullYear()

                if (currentView === 'date' && isSameYear && leftMonth === rightMonth) {
                    this.changePanelDate('right', 'Month', 1)
                }
                if (currentView === 'month' && isSameYear) {
                    this.changePanelDate('right', 'FullYear', 1)
                }
                if (currentView === 'year' && isSameYear) {
                    this.changePanelDate('right', 'FullYear', 10)
                }

                if (this.currentView === 'time') {
                    this.$nextTick(() => {
                        this.$refs.timePicker.updateScroll()
                    })
                }
            },
            selectionMode (type) {
                this.currentView = type || 'range'
            },
            focusedDate (date) {
                this.setPanelDates(date || new Date())
            }
        },
        methods: {
            reset () {
                this.currentView = this.selectionMode
                this.leftPickerTable = `${this.currentView}-table`
                this.rightPickerTable = `${this.currentView}-table`
            },
            setPanelDates (leftPanelDate) {
                this.leftPanelDate = leftPanelDate
                const rightPanelDate = new Date(leftPanelDate.getFullYear(), leftPanelDate.getMonth() + 1, 1)
                const splitRightPanelDate = this.dates[1] ? this.dates[1].getTime() : this.dates[1]
                this.rightPanelDate = this.splitPanels
                    ? new Date(Math.max(splitRightPanelDate, rightPanelDate.getTime()))
                    : rightPanelDate
            },
            panelLabelConfig (direction) {
                const locale = 'zh-CN'
                const datePanelLabel = '[yyyy]-[mm]'
                const handler = type => {
                    const fn = type === 'month' ? this.showMonthPicker : this.showYearPicker
                    return () => fn(direction)
                }

                const date = this[`${direction}PanelDate`]
                const { labels, separator } = formatDateLabels(locale, datePanelLabel, date)

                return {
                    separator: separator,
                    labels: labels.map(obj => {
                        obj.handler = handler(obj.type)
                        return obj
                    })
                }
            },
            prevYear (panel) {
                const increment = this.currentView === 'year' ? -10 : -1
                this.changePanelDate(panel, 'FullYear', increment)
            },
            nextYear (panel) {
                const increment = this.currentView === 'year' ? 10 : 1
                this.changePanelDate(panel, 'FullYear', increment)
            },
            prevMonth (panel) {
                this.changePanelDate(panel, 'Month', -1)
            },
            nextMonth (panel) {
                this.changePanelDate(panel, 'Month', 1)
            },
            changePanelDate (panel, type, increment, updateOtherPanel = true) {
                const current = new Date(this[`${panel}PanelDate`])
                current[`set${type}`](current[`get${type}`]() + increment)
                this[`${panel}PanelDate`] = current

                if (!updateOtherPanel) {
                    return
                }

                if (this.splitPanels) {
                    const otherPanel = panel === 'left' ? 'right' : 'left'
                    if (panel === 'left' && this.leftPanelDate >= this.rightPanelDate) {
                        this.changePanelDate(otherPanel, type, 1)
                    }
                    if (panel === 'right' && this.rightPanelDate <= this.leftPanelDate) {
                        this.changePanelDate(otherPanel, type, -1)
                    }
                } else {
                    const otherPanel = panel === 'left' ? 'right' : 'left'
                    const currentDate = this[`${otherPanel}PanelDate`]
                    const temp = new Date(currentDate)

                    if (type === 'Month') {
                        const nextMonthLastDate = new Date(
                            temp.getFullYear(), temp.getMonth() + increment + 1, 0
                        ).getDate()
                        temp.setDate(Math.min(nextMonthLastDate, temp.getDate()))
                    }

                    temp[`set${type}`](temp[`get${type}`]() + increment)
                    this[`${otherPanel}PanelDate`] = temp
                }
            },
            showYearPicker (panel) {
                this[`${panel}PickerTable`] = 'year-table'
            },
            showMonthPicker (panel) {
                this[`${panel}PickerTable`] = 'month-table'
            },

            /**
             * 点击左侧面板以及右侧面板的年视图或者月视图
             *
             * @param {string} panelPosition 左侧 panel 还是右侧 panel
             * @param {Date} value 选中的值，如果是年视图，那么就是选中年的一月一号，如果是月视图，那么就是选中月的一号
             */
            handlePreSelection (panelPosition, value) {
                this[`${panelPosition}PanelDate`] = value
                const currentViewType = this[`${panelPosition}PickerTable`]
                if (currentViewType === 'year-table') {
                    this[`${panelPosition}PickerTable`] = 'month-table'
                } else {
                    this[`${panelPosition}PickerTable`] = `${this.currentView}-table`
                }

                if (!this.splitPanels) {
                    const otherPanel = panelPosition === 'left' ? 'right' : 'left'
                    this[`${otherPanel}PanelDate`] = value

                    const increment = otherPanel === 'left' ? -1 : 1

                    this.changePanelDate(otherPanel, 'Month', increment, false)
                }
            },
            handleRangePick (val, type) {
                if (this.rangeState.selecting || this.currentView === 'time') {
                    if (this.currentView === 'time') {
                        this.dates = val
                    } else {
                        const [minDate, maxDate] = [this.rangeState.from, val].sort(dateSorter)
                        const maxDateLastMoment = type === 'upToNow'
                            // upToNow 时，结束的时间为当前时间
                            ? new Date()
                            // 结束的时间 不是 00:00:00，改为 23:59:59
                            : new Date(new Date(new Date(maxDate.setHours(23)).setMinutes(59)).setSeconds(59))
                        this.dates = [minDate, maxDateLastMoment]
                        this.rangeState = {
                            from: minDate,
                            to: maxDateLastMoment,
                            selecting: false
                        }
                    }
                    this.handleConfirm(false, type || 'date')
                } else {
                    this.upToNowEnable = new Date(val).getTime() < new Date().getTime()
                    this.rangeState = {
                        from: val,
                        to: null,
                        selecting: true
                    }
                }
            },
            handleChangeRange (val) {
                this.rangeState.to = val
            }
        }
    }
</script>
<style>
    @import '../../../ui/date-picker.css';
</style>
