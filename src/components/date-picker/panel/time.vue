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
    <div class="bk-picker-panel-body-wrapper" @mousedown.prevent>
        <div class="bk-picker-panel-body" :style="{ width: `${width}px` }">
            <div class="bk-time-picker-header" v-if="showDate">{{visibleDate}}</div>
            <div class="bk-picker-panel-content">
                <time-spinner
                    ref="timeSpinner"
                    :show-seconds="showSeconds"
                    :steps="steps"
                    :hours="timeSlots[0]"
                    :minutes="timeSlots[1]"
                    :seconds="timeSlots[2]"
                    :disabled-hours="disabledHMS.disabledHours"
                    :disabled-minutes="disabledHMS.disabledMinutes"
                    :disabled-seconds="disabledHMS.disabledSeconds"
                    :hide-disabled-options="hideDisabledOptions"
                    @change="handleChange"
                    @pick-click="handlePickClick"></time-spinner>
            </div>
        </div>
    </div>
</template>

<script>
    import fecha from '@/utils/fecha'
    import { initTime, mergeDateHMS } from '@/utils/date'
    import TimeSpinner from '../base/time-spinner.vue'
    import timeMixins from '../time-mixins'
    import panelMixins from './panel-mixins'

    export default {
        name: 'TimePickerPanel',
        components: { TimeSpinner },
        mixins: [timeMixins, panelMixins],
        props: {
            disabledDate: {
                type: Function,
                default: () => false
            },
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
            }
        },
        data () {
            return {
                date: this.value[0] || initTime(),
                showDate: false
            }
        },
        computed: {
            showSeconds () {
                return !(this.format || '').match(/mm$/)
            },
            visibleDate () {
                return fecha.format(this.$parent.panelDate, this.$parent.format)
            },
            timeSlots () {
                if (!this.value[0]) {
                    return []
                }
                return ['getHours', 'getMinutes', 'getSeconds'].map(slot => this.date[slot]())
            },
            disabledHMS () {
                const disabledTypes = ['disabledHours', 'disabledMinutes', 'disabledSeconds']
                if (this.disabledDate === (() => false || !this.value[0])) {
                    const disabled = disabledTypes.reduce((obj, type) => {
                        obj[type] = this[type]
                        return obj
                    }, {})
                    return disabled
                } else {
                    const slots = [24, 60, 60]
                    const disabled = ['Hours', 'Minutes', 'Seconds'].map(type => this[`disabled${type}`])
                    const disabledHMS = disabled.map((preDisabled, j) => {
                        const slot = slots[j]
                        const toDisable = preDisabled
                        for (let i = 0; i < slot; i += (this.steps[j] || 1)) {
                            const hms = this.timeSlots.map((slot, x) => x === j ? i : slot)
                            const testDateTime = mergeDateHMS(this.date, ...hms)
                            if (this.disabledDate(testDateTime, true)) {
                                toDisable.push(i)
                            }
                        }
                        return toDisable.filter((el, i, arr) => arr.indexOf(el) === i)
                    })
                    return disabledTypes.reduce(
                        (obj, type, i) => {
                            obj[type] = disabledHMS[i]
                            return obj
                        }, {}
                    )
                }
            }
        },
        watch: {
            value (dates) {
                let newVal = dates[0] || initTime()
                newVal = new Date(newVal)
                this.date = newVal
            }
        },
        mounted () {
            if (this.$parent && this.$parent.$options.name === 'DatePanel') {
                this.showDate = true
            }
        },
        methods: {
            handleChange (date, emit = true) {
                const newDate = new Date(this.date)
                Object.keys(date).forEach(
                    type => newDate[`set${this.capitalize(type)}`](date[type])
                )

                if (emit) {
                    this.$emit('pick', newDate, 'time')
                }
            }
        }
    }
</script>
<style>
    @import '../../../ui/time-picker.css';
</style>
