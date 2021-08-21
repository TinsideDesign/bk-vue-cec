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
    <div class="bk-picker-panel-body-wrapper bk-time-picker-with-range" :class="showSeconds ? 'bk-time-picker-with-seconds' : ''" @mousedown.prevent>
        <div class="bk-picker-panel-body" :style="{ width: `${width * 2}px` }">
            <div class="bk-picker-panel-content bk-picker-panel-content-left" :style="{ width: `${width}px` }">
                <div class="bk-time-picker-header" v-if="showDate">
                    <template>{{leftDatePanelLabel}}</template>
                </div>
                <time-spinner
                    ref="timeSpinner"
                    :steps="steps"
                    :show-seconds="showSeconds"
                    :hours="value[0] && dateStart.getHours()"
                    :minutes="value[0] && dateStart.getMinutes()"
                    :seconds="value[0] && dateStart.getSeconds()"
                    :disabled-hours="disabledHours"
                    :disabled-minutes="disabledMinutes"
                    :disabled-seconds="disabledSeconds"
                    :hide-disabled-options="hideDisabledOptions"
                    @change="handleStartChange"
                    @pick-click="handlePickClick"></time-spinner>
            </div>
            <div class="bk-picker-panel-content bk-picker-panel-content-right" :style="{ width: `${width}px` }">
                <div class="bk-time-picker-header" v-if="showDate">
                    <template>{{rightDatePanelLabel}}</template>
                </div>
                <time-spinner
                    ref="timeSpinnerEnd"
                    :steps="steps"
                    :show-seconds="showSeconds"
                    :hours="value[1] && dateEnd.getHours()"
                    :minutes="value[1] && dateEnd.getMinutes()"
                    :seconds="value[1] && dateEnd.getSeconds()"
                    :disabled-hours="disabledHours"
                    :disabled-minutes="disabledMinutes"
                    :disabled-seconds="disabledSeconds"
                    :hide-disabled-options="hideDisabledOptions"
                    @change="handleEndChange"
                    @pick-click="handlePickClick"></time-spinner>
            </div>
        </div>
    </div>
</template>
<script>
    import fecha from '@/utils/fecha'
    import { initTime } from '@/utils/date'
    import TimeSpinner from '../base/time-spinner.vue'
    import timeMixins from '../time-mixins'
    import panelMixins from './panel-mixins'

    export default {
        name: 'RangeTimePickerPanel',
        components: { TimeSpinner },
        mixins: [timeMixins, panelMixins],
        props: {
            steps: {
                type: Array,
                default: () => []
            },
            format: {
                type: String,
                default: 'HH:mm:ss'
            },
            value: {
                type: Array,
                required: true
            },
            // 是否允许时间跨天选择,即起始时间小于终止时间, allow-cross-day属性只在time-picker组件type为timerange时生效
            allowCrossDay: {
                type: Boolean,
                default: false
            }
        },
        data () {
            const [dateStart, dateEnd] = this.value.slice()
            return {
                showDate: false,
                dateStart: dateStart || initTime(),
                dateEnd: dateEnd || initTime()
            }
        },
        computed: {
            showSeconds () {
                return !(this.format || '').match(/mm$/)
            },
            leftDatePanelLabel () {
                return fecha.format(this.$parent.dates[0], this.$parent.format)
            },
            rightDatePanelLabel () {
                return fecha.format(this.$parent.dates[1], this.$parent.format)
            }
        },
        watch: {
            value (dates) {
                const [dateStart, dateEnd] = dates.slice()
                this.dateStart = dateStart || initTime()
                this.dateEnd = dateEnd || initTime()
            }
        },
        mounted () {
            if (this.$parent && this.$parent.$options.name === 'DateRangePanel') {
                this.showDate = true
            }
        },
        methods: {
            handleChange (idx, start, end, emit = true) {
                let dateStart = new Date(this.dateStart)
                let dateEnd = new Date(this.dateEnd)

                Object.keys(start).forEach(type => {
                    dateStart[`set${this.capitalize(type)}`](start[type])
                })

                Object.keys(end).forEach(type => {
                    dateEnd[`set${this.capitalize(type)}`](end[type])
                })

                if (!this.allowCrossDay && (dateEnd < dateStart)) {
                    // 左边变化
                    if (idx === 'start') {
                        dateEnd = dateStart
                    }
                    // 右边变化
                    if (idx === 'end') {
                        dateStart = dateEnd
                    }
                }

                if (emit) {
                    this.$emit('pick', [dateStart, dateEnd], 'time')
                }
            },
            handleStartChange (date) {
                this.handleChange('start', date, {})
            },
            handleEndChange (date) {
                this.handleChange('end', {}, date)
            },
            updateScroll () {
                this.$refs.timeSpinner.updateScroll()
                this.$refs.timeSpinnerEnd.updateScroll()
            }
        }
    }
</script>
<style>
    @import '../../../ui/time-picker.css';
</style>
