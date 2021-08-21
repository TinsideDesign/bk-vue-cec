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
    <div class="bk-time-picker-cells" :class="showSeconds ? 'bk-time-picker-cells-with-seconds' : ''">
        <div class="bk-time-picker-cells-title-wrapper">
            <div class="bk-time-picker-cells-title" :class="focusedColumn === 0 ? 'active' : ''" :style="styles">{{t('bk.datePicker.hour')}}</div>
            <div class="bk-time-picker-cells-title" :class="focusedColumn === 1 ? 'active' : ''" :style="styles">{{t('bk.datePicker.min')}}</div>
            <div class="bk-time-picker-cells-title" :class="focusedColumn === 2 ? 'active' : ''" v-show="showSeconds" :style="styles">{{t('bk.datePicker.sec')}}</div>
        </div>
        <div class="bk-time-picker-cells-list" ref="hours" :style="styles">
            <ul class="bk-time-picker-cells-ul">
                <li :class="getCellCls(item)" v-for="(item, index) in hoursList" :key="index" v-show="!item.hide" @click="handleClick('hours', item)">{{padTime(item.text)}}</li>
            </ul>
        </div>
        <div class="bk-time-picker-cells-list" ref="minutes" :style="styles">
            <ul class="bk-time-picker-cells-ul">
                <li :class="getCellCls(item)" v-for="(item, index) in minutesList" :key="index" v-show="!item.hide" @click="handleClick('minutes', item)">{{padTime(item.text)}}</li>
            </ul>
        </div>
        <div class="bk-time-picker-cells-list" v-show="showSeconds" ref="seconds" :style="styles">
            <ul class="bk-time-picker-cells-ul">
                <li :class="getCellCls(item)" v-for="(item, index) in secondsList" :key="index" v-show="!item.hide" @click="handleClick('seconds', item)">{{padTime(item.text)}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { scrollTop } from '@/utils/dom'
    import { debounce } from '@/utils/util'
    import locale from 'bk-magic-vue/lib/locale'
    import timeMixins from '../time-mixins'

    const timeParts = ['hours', 'minutes', 'seconds']

    export default {
        name: 'TimeSpinner',
        mixins: [timeMixins, locale.mixin],
        props: {
            hours: {
                type: [Number, String],
                default: NaN
            },
            minutes: {
                type: [Number, String],
                default: NaN
            },
            seconds: {
                type: [Number, String],
                default: NaN
            },
            showSeconds: {
                type: Boolean,
                default: true
            },
            steps: {
                type: Array,
                default: () => []
            }
        },
        data () {
            return {
                spinerSteps: [1, 1, 1].map((one, i) => Math.abs(this.steps[i]) || one),
                compiled: false,
                focusedColumn: -1,
                focusedTime: [0, 0, 0]
            }
        },
        computed: {
            hoursList () {
                const hours = []
                const step = this.spinerSteps[0]
                const focusedHour = this.focusedColumn === 0 && this.focusedTime[0]
                const hourTmpl = {
                    text: 0,
                    selected: false,
                    disabled: false,
                    hide: false
                }

                for (let i = 0; i < 24; i += step) {
                    const hour = JSON.parse(JSON.stringify(hourTmpl))
                    hour.text = i
                    hour.focused = i === focusedHour

                    if (this.disabledHours.length && this.disabledHours.indexOf(i) > -1) {
                        hour.disabled = true
                        if (this.hideDisabledOptions) {
                            hour.hide = true
                        }
                    }
                    if (this.hours === i) {
                        hour.selected = true
                    }
                    hours.push(hour)
                }

                return hours
            },
            minutesList () {
                const minutes = []
                const step = this.spinerSteps[1]
                const focusedMinute = this.focusedColumn === 1 && this.focusedTime[1]
                const minuteTmpl = {
                    text: 0,
                    selected: false,
                    disabled: false,
                    hide: false
                }

                for (let i = 0; i < 60; i += step) {
                    const minute = JSON.parse(JSON.stringify(minuteTmpl))
                    minute.text = i
                    minute.focused = i === focusedMinute

                    if (this.disabledMinutes.length && this.disabledMinutes.indexOf(i) > -1) {
                        minute.disabled = true
                        if (this.hideDisabledOptions) {
                            minute.hide = true
                        }
                    }
                    if (this.minutes === i) {
                        minute.selected = true
                    }
                    minutes.push(minute)
                }
                return minutes
            },
            secondsList () {
                const seconds = []
                const step = this.spinerSteps[2]
                const focusedMinute = this.focusedColumn === 2 && this.focusedTime[2]
                const secondTmpl = {
                    text: 0,
                    selected: false,
                    disabled: false,
                    hide: false
                }

                for (let i = 0; i < 60; i += step) {
                    const second = JSON.parse(JSON.stringify(secondTmpl))
                    second.text = i
                    second.focused = i === focusedMinute

                    if (this.disabledSeconds.length && this.disabledSeconds.indexOf(i) > -1) {
                        second.disabled = true
                        if (this.hideDisabledOptions) {
                            second.hide = true
                        }
                    }
                    if (this.seconds === i) {
                        second.selected = true
                    }
                    seconds.push(second)
                }

                return seconds
            },
            styles () {
                return {
                    width: this.showSeconds ? '33.33%' : '50%'
                }
            }
        },
        watch: {
            hours (val) {
                if (!this.compiled) {
                    return
                }
                this.scroll('hours', this.hoursList.findIndex(obj => obj.text === val))
            },
            minutes (val) {
                if (!this.compiled) {
                    return
                }
                this.scroll('minutes', this.minutesList.findIndex(obj => obj.text === val))
            },
            seconds (val) {
                if (!this.compiled) {
                    return
                }
                this.scroll('seconds', this.secondsList.findIndex(obj => obj.text === val))
            },
            focusedTime (updated, old) {
                timeParts.forEach((part, i) => {
                    if (updated[i] === old[i] || typeof updated[i] === 'undefined') {
                        return
                    }
                    const valueIndex = this[`${part}List`].findIndex(obj => obj.text === updated[i])
                    this.scroll(part, valueIndex)
                })
            }
        },
        mounted () {
            this.$nextTick(() => {
                this.compiled = true
                this.bindWheelEvent()
            })
        },
        methods: {
            getCellCls (cell) {
                return [
                    'bk-time-picker-cells-cell',
                    {
                        [`bk-time-picker-cells-cell-selected`]: cell.selected,
                        [`bk-time-picker-cells-cell-focused`]: cell.focused,
                        [`bk-time-picker-cells-cell-disabled`]: cell.disabled
                    }
                ]
            },

            chooseValue (values) {
                const changes = timeParts.reduce((obj, part, i) => {
                    const value = values[i]
                    if (this[part] === value) {
                        return obj
                    }
                    return { ...obj, [part]: value }
                }, {})

                if (Object.keys(changes).length > 0) {
                    this.emitChange(changes)
                }
            },

            bindWheelEvent () {
                const bindFunction = type => {
                    this.$refs[type].addEventListener('wheel', debounce(this.handleWheel, 32, type), { passive: true })
                }
                bindFunction('hours')
                bindFunction('minutes')
                bindFunction('seconds')
            },

            typeItemHeight (type) {
                return this.$refs[type].querySelector('li').offsetHeight
            },

            scrollBarHeight (type) {
                return this.$refs[type].offsetHeight
            },

            handleWheel (e, type) {
                const value = Math.min(
                    Math.round((this.$refs[type].scrollTop - (this.scrollBarHeight(type) * 0.5 - 10) / this.typeItemHeight(type) + 3) / this.typeItemHeight(type)),
                    (type === 'hours' ? 23 : 59)
                )
                this.$nextTick(() => {
                    this.emitChange({ [type]: value })
                })
            },

            handleClick (type, cell) {
                if (cell.disabled) {
                    return
                }
                const data = { [type]: cell.text }
                this.emitChange(data)
            },

            emitChange (changes) {
                this.$emit('change', changes)
                this.$emit('pick-click')
            },

            scroll (type, index) {
                const from = this.$refs[type].scrollTop
                const to = 32 * this.getScrollIndex(type, index)
                scrollTop(this.$refs[type], from, to, 500)
            },

            getScrollIndex (type, index) {
                const t = this.firstUpperCase(type)
                const disabled = this[`disabled${t}`]
                if (disabled.length && this.hideDisabledOptions) {
                    let _count = 0
                    disabled.forEach(item => item <= index ? _count++ : '')
                    index -= _count
                }
                return index
            },

            updateScroll () {
                this.$nextTick(() => {
                    timeParts.forEach(type => {
                        this.$refs[type].scrollTop = 32 * this[`${type}List`].findIndex(obj => obj.text === this[type])
                    })
                })
            },

            padTime (text) {
                return text < 10 ? '0' + text : text
            },

            updateFocusedTime (col, time) {
                this.focusedColumn = col
                this.focusedTime = time.slice()
            }
        }
    }
</script>
