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
    <div class="bk-picker-panel-body-wrapper" :class="shortcuts.length ? 'bk-picker-panel-with-sidebar' : ''" @mousedown.prevent>
        <div class="bk-picker-panel-sidebar" v-if="shortcuts.length">
            <div class="bk-picker-panel-shortcut" v-for="(shortcut, index) in shortcuts" :key="index" @click="handleShortcutClick(shortcut)">
                {{shortcut.text}}
            </div>
        </div>
        <div class="bk-picker-panel-body" style="width: 261px;">
            <div class="bk-date-picker-header" v-show="currentView !== 'time'">
                <span :class="iconBtnCls('prev', '-double')" @click="changeYear(-1)"><i class="bk-icon icon-angle-double-left"></i></span>
                <span :class="iconBtnCls('prev')" v-if="pickerTable === 'date-table'" @click="changeMonth(-1)" v-show="currentView === 'date'">
                    <i class="bk-icon icon-angle-left"></i>
                </span>
                <date-panel-label :date-panel-label="datePanelLabel" :current-view="pickerTable.split('-').shift()"></date-panel-label>
                <span :class="iconBtnCls('next', '-double')" @click="changeYear(+1)"><i class="bk-icon icon-angle-double-right"></i></span>
                <span :class="iconBtnCls('next')" v-if="pickerTable === 'date-table'" @click="changeMonth(+1)" v-show="currentView === 'date'">
                    <i class="bk-icon icon-angle-right"></i>
                </span>
            </div>
            <div class="bk-picker-panel-content">
                <!-- eslint-disable-next-line vue/require-component-is -->
                <component
                    :is="pickerTable"
                    ref="pickerTable"
                    v-if="currentView !== 'time'"
                    :table-date="panelDate"
                    :value="dates"
                    :selection-mode="selectionMode"
                    :disabled-date="disabledDate"
                    :focused-date="focusedDate"
                    @pick="panelPickerHandlers"
                    @pick-click="handlePickClick"
                ></component>
            </div>
            <div class="bk-picker-panel-content" v-show="isTime">
                <time-picker
                    ref="timePicker"
                    v-if="currentView === 'time'"
                    :value="dates"
                    :format="format"
                    :time-disabled="timeDisabled"
                    :disabled-date="disabledDate"
                    :focused-date="focusedDate"
                    v-bind="timePickerOptions"
                    @pick="handlePick"
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
                @pick-toggle-time="handleToggleTime"
                @pick-clear="handlePickClear"
                @pick-success="handlePickSuccess"
            ></Confirm>
        </div>
    </div>
</template>
<script>
    import { siblingMonth, formatDateLabels } from '@/utils/date'

    import DateTable from '../base/date-table.vue'
    import YearTable from '../base/year-table.vue'
    import MonthTable from '../base/month-table.vue'
    import Confirm from '../base/confirm.vue'
    import TimePicker from './time.vue'
    import DatePanelLabel from './date-panel-label.vue'

    import datePanelMixin from './date-panel-mixin'
    import panelMixins from './panel-mixins'

    export default {
        name: 'DatePanel',
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
        mixins: [panelMixins, datePanelMixin],
        props: {
            clearable: {
                type: Boolean,
                default: true
            },
            multiple: {
                type: Boolean,
                default: false
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
            const { selectionMode, value } = this
            const dates = value.slice().sort()

            return {
                currentView: selectionMode || 'date',
                pickerTable: this.getTableType(selectionMode),
                dates: dates,
                panelDate: this.startDate || dates[0] || new Date()
            }
        },
        computed: {
            panelPickerHandlers () {
                return this.pickerTable === `${this.currentView}-table` ? this.handlePick : this.handlePreSelection
            },
            datePanelLabel () {
                const locale = 'zh-CN'
                const datePanelLabel = '[yyyy]-[mm]'
                const date = this.panelDate
                const { labels, separator } = formatDateLabels(locale, datePanelLabel, date)

                const handler = type => {
                    return () => {
                        this.pickerTable = this.getTableType(type)
                    }
                }

                return {
                    separator: separator,
                    labels: labels.map(obj => {
                        obj.handler = handler(obj.type)
                        return obj
                    })
                }
            },
            timeDisabled () {
                return !this.dates[0]
            }
        },
        watch: {
            value (newVal) {
                this.dates = newVal
                const panelDate = this.multiple ? this.dates[this.dates.length - 1] : (this.startDate || this.dates[0])
                this.panelDate = panelDate || new Date()
            },
            currentView (currentView) {
                this.$emit('selection-mode-change', currentView)

                if (this.currentView === 'time') {
                    this.$nextTick(() => {
                        const spinner = this.$refs.timePicker.$refs.timeSpinner
                        spinner.updateScroll()
                    })
                }
            },
            selectionMode (type) {
                this.currentView = type
                this.pickerTable = this.getTableType(type)
            },
            focusedDate (date) {
                const isDifferentYear = date.getFullYear() !== this.panelDate.getFullYear()
                const isDifferentMonth = isDifferentYear || date.getMonth() !== this.panelDate.getMonth()
                if (isDifferentYear || isDifferentMonth) {
                    if (!this.multiple) {
                        this.panelDate = date
                    }
                }
            }
        },
        methods: {
            reset () {
                this.currentView = this.selectionMode
                this.pickerTable = this.getTableType(this.currentView)
            },
            changeYear (dir) {
                if (this.selectionMode === 'year' || this.pickerTable === 'year-table') {
                    this.panelDate = new Date(this.panelDate.getFullYear() + dir * 10, 0, 1)
                } else {
                    this.panelDate = siblingMonth(this.panelDate, dir * 12)
                }
            },
            getTableType (currentView) {
                return currentView.match(/^time/) ? 'time-picker' : `${currentView}-table`
            },
            changeMonth (dir) {
                this.panelDate = siblingMonth(this.panelDate, dir)
            },
            handlePreSelection (value) {
                this.panelDate = value
                if (this.pickerTable === 'year-table') {
                    this.pickerTable = 'month-table'
                } else {
                    this.pickerTable = this.getTableType(this.currentView)
                }
            },
            handlePick (value, type) {
                const { selectionMode, panelDate } = this
                if (selectionMode === 'year') {
                    value = new Date(value.getFullYear(), 0, 1)
                } else if (selectionMode === 'month') {
                    value = new Date(panelDate.getFullYear(), value.getMonth(), 1)
                } else {
                    value = new Date(value)
                }

                this.dates = [value]
                this.$emit('pick', value, false, type || selectionMode)
            }
        }
    }
</script>
<style>
    @import '../../../ui/date-picker.css';
</style>
