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
    <div class="bk-date-picker" :class="[type === 'datetimerange' ? 'long' : '', longWidthCls, extCls]" v-clickoutside="handleClose">
        <div ref="reference" class="bk-date-picker-rel">
            <slot name="trigger">
                <span class="icon-wrapper" :class="disabled ? 'disabled' : ''"
                    @click="handleIconClick"
                    @mouseenter="handleInputMouseenter"
                    @mouseleave="handleInputMouseleave">
                    <svg class="picker-icon" v-if="type === 'time' || type === 'timerange'" x="0px" y="0px" viewBox="0 0 1024 1024">
                        <g id="time">
                            <path fill="#c4c6cc" d="M512,128c51.9,0,102.2,10.1,149.5,30.2c45.7,19.3,86.8,47,122.1,82.3s63,76.4,82.3,122.1
                                c20,47.3,30.2,97.6,30.2,149.5S886,614.3,865.9,661.6c-19.3,45.7-47,86.8-82.3,122.1s-76.4,63-122.1,82.3
                                c-47.3,20-97.6,30.2-149.5,30.2S409.8,886.1,362.5,866c-45.7-19.3-86.8-47-122.1-82.3s-63-76.4-82.3-122.1
                                c-20-47.3-30.2-97.6-30.2-149.5s10.1-102.2,30.2-149.5c19.3-45.7,47-86.8,82.3-122.1s76.4-63,122.1-82.3
                                C409.8,138.1,460.1,128,512,128 M512,64C264.6,64,64,264.6,64,512s200.6,448,448,448s448-200.6,448-448S759.4,64,512,64L512,64z"
                            />
                            <polygon fill="#c4c6cc" points="512,512 512,256 448,256 448,512 448,576 512,576 768,576 768,512" />
                        </g>
                    </svg>
                    <svg v-else class="picker-icon" x="0px" y="0px" viewBox="0 0 1024 1024">
                        <g id="date">
                            <path fill="#c4c6cc" d="M896,128h-96v64h64v112H160V192h64v-64h-96c-17.7,0-32,14.3-32,32v736c0,17.7,14.3,32,32,32h768
                                c17.7,0,32-14.3,32-32V160C928,142.3,913.7,128,896,128z M160,864V368h704v496H160z" />
                            <rect x="416" y="128" fill="#c4c6cc" width="192" height="64" />
                            <rect x="288" y="96" fill="#c4c6cc" width="64" height="128" />
                            <rect x="672" y="96" fill="#c4c6cc" width="64" height="128" />
                            <polygon fill="#c4c6cc" points="403.7,514.4 557.1,514.4 557.1,515.3 420.1,765.5 483.5,765.5 620.3,504.3 620.3,466.5 403.7,466.5" />
                        </g>
                    </svg>
                </span>
                <input type="text"
                    :key="forceInputRerender"
                    :readonly="localReadonly"
                    :disabled="disabled"
                    :placeholder="placeholder"
                    :value="displayValue"
                    class="bk-date-picker-editor"
                    :class="[readonly ? 'readonly' : '', fontSizeCls, { 'only-bottom-border': behavior === 'simplicity' }]"
                    ref="input"
                    @focus="handleFocus"
                    @blur="handleBlur"
                    @click="handleFocus"
                    @change="handleInputChange"
                    @keydown="handleKeydown"
                    @mouseenter="handleInputMouseenter"
                    @mouseleave="handleInputMouseleave"
                />
                <i class="bk-icon icon-close-circle-shape clear-action" v-if="clearable && showClose" @click="handleClear"></i>
            </slot>
        </div>
        <transition name="transition-drop">
            <DatePickerDropdown
                @click.native="handleTransferClick"
                v-show="opened"
                :class="transfer ? 'bk-date-picker-transfer' : ''"
                :placement="placement"
                ref="drop"
                :ext-popover-cls="extPopoverCls"
                :data-transfer="transfer"
                :transfer="transfer"
                v-transfer-dom>
                <!-- eslint-disable-next-line vue/require-component-is -->
                <component
                    :is="panel"
                    ref="pickerPanel"
                    :clearable="clearable"
                    :visible="visible"
                    :show-time="type === 'datetime' || type === 'datetimerange'"
                    :confirm="isConfirm"
                    :selection-mode="selectionMode"
                    :steps="steps"
                    :format="format"
                    :value="internalValue"
                    :start-date="startDate"
                    :split-panels="splitPanels"
                    :shortcuts="shortcuts"
                    :picker-type="type"
                    :multiple="multiple"
                    :focused-date="focusedDate"
                    :width="type === 'time' || type === 'timerange' ? width : 261"
                    :time-picker-options="timePickerOptions"
                    :shortcut-close="shortcutClose"
                    :up-to-now="upToNow"
                    :allow-cross-day="allowCrossDayProp"
                    v-bind="ownPickerProps"
                    @pick="onPick"
                    @pick-clear="handleClear"
                    @pick-success="onPickSuccess"
                    @pick-click="disableClickOutSide = true"
                    @selection-mode-change="onSelectionModeChange"
                ></component>
                <template v-if="hasFooter">
                    <div class="bk-date-picker-footer-wrapper" :class="footerSlotCls">
                        <slot name="footer">
                        </slot>
                    </div>
                </template>
            </DatePickerDropdown>
        </transition>
    </div>
</template>

<script>
    import { findChildComponents } from '@/utils/dom'
    import { getDayCountOfMonth, TYPE_VALUE_RESOLVER_MAP, DEFAULT_FORMATS, RANGE_SEPARATOR } from '@/utils/date'
    import clickoutside from '@/directives/clickoutside'
    import transferDom from '@/directives/transfer-dom'
    import emitter from '@/mixins/emitter'
    import DatePickerDropdown from './base/date-picker-dropdown.vue'

    const isEmptyArray = val => val.reduce(
        (isEmpty, str) => (isEmpty && !str) || (typeof str === 'string' && str.trim() === ''),
        true
    )

    const keyValueMapper = {
        40: 'up',
        39: 'right',
        38: 'down',
        37: 'left'
    }

    const mapPossibleValues = (key, horizontal, vertical) => {
        if (key === 'left') {
            return horizontal * -1
        }
        if (key === 'right') {
            return horizontal * 1
        }
        if (key === 'up') {
            return vertical * 1
        }
        if (key === 'down') {
            return vertical * -1
        }
    }

    const extractTime = date => {
        if (!date) {
            return [0, 0, 0]
        }
        return [
            date.getHours(), date.getMinutes(), date.getSeconds()
        ]
    }

    export default {
        components: { DatePickerDropdown },
        directives: {
            clickoutside,
            transferDom
        },
        mixins: [emitter],
        props: {
            // 外部设置的 class name
            extCls: {
                type: String,
                default: ''
            },
            // 外部设置的 popover class name
            extPopoverCls: {
                type: String,
                default: ''
            },
            format: {
                type: String
            },
            readonly: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            editable: {
                type: Boolean,
                default: true
            },
            clearable: {
                type: Boolean,
                default: true
            },
            open: {
                type: Boolean,
                default: null
            },
            multiple: {
                type: Boolean,
                default: false
            },
            timePickerOptions: {
                type: Object,
                default: () => ({})
            },
            splitPanels: {
                type: Boolean,
                default: true
            },
            startDate: {
                type: Date
            },
            placeholder: {
                type: String,
                default: ''
            },
            placement: {
                type: String,
                default: 'bottom-start',
                validator (value) {
                    const validList = [
                        'top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end',
                        'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'
                    ]
                    if (validList.indexOf(value) < 0) {
                        console.error(`placement property is not valid: '${value}'`)
                        return false
                    }
                    return true
                }
            },
            transfer: {
                type: Boolean,
                default: false
            },
            steps: {
                type: Array,
                default: () => []
            },
            shortcuts: {
                type: Array,
                default: () => []
            },
            shortcutClose: {
                type: Boolean,
                default: false
            },
            value: {
                type: [Date, String, Array]
            },
            options: {
                type: Object,
                default: () => ({})
            },
            // normal: 12px
            // medium: 14px
            // large: 16px
            fontSize: {
                type: String,
                default: 'normal'
            },
            // 结束时间是否允许“至今”
            upToNow: {
                type: Boolean,
                default: false
            },
            useShortcutText: {
                type: Boolean,
                default: false
            },
            shortcutSelectedIndex: {
                type: Number,
                default: -1
            },
            footerSlotCls: {
                type: String,
                default: ''
            },
            allowCrossDay: {
                type: Boolean,
                default: false
            },
            behavior: {
                type: String,
                default: 'normal',
                validate (v) {
                    return ['simplicity', 'normal'].indexOf(v) > -1
                }
            }
        },
        data () {
            const isRange = this.type.includes('range')
            const emptyArray = isRange ? [null, null] : [null]
            let initialValue = isEmptyArray((isRange ? this.value : [this.value]) || [])
                ? emptyArray
                : this.parseDate(this.value)

            let shortcut = null
            if (this.shortcutSelectedIndex !== -1) {
                shortcut = this.shortcuts[this.shortcutSelectedIndex] || null
                if (shortcut) {
                    initialValue = shortcut.value()
                }
            }

            const focusedTime = initialValue.map(extractTime)

            return {
                showClose: false,
                visible: false,
                internalValue: initialValue,
                disableClickOutSide: false,
                disableCloseUnderTransfer: false,
                selectionMode: this.onSelectionModeChange(this.type),
                forceInputRerender: 1,
                isFocused: false,
                focusedDate: initialValue[0] || this.startDate || new Date(),
                focusedTime: {
                    column: 0,
                    picker: 0,
                    time: focusedTime,
                    active: false
                },
                internalFocus: false,
                timeEnterMode: true,
                shortcut: shortcut
            }
        },
        computed: {
            publicVModelValue () {
                if (this.multiple) {
                    return this.internalValue.slice()
                }
                const isRange = this.type.includes('range')
                let val = this.internalValue.map(date => date instanceof Date ? new Date(date) : (date || ''))

                if (this.type.match(/^time/)) {
                    val = val.map(this.formatDate)
                }
                return (isRange || this.multiple) ? val : val[0]
            },

            publicStringValue () {
                const { formatDate, publicVModelValue, type } = this
                if (type.match(/^time/)) {
                    return publicVModelValue
                }
                if (this.multiple) {
                    return formatDate(publicVModelValue)
                }
                return Array.isArray(publicVModelValue)
                    ? publicVModelValue.map(formatDate)
                    : formatDate(publicVModelValue)
            },

            opened () {
                return this.open === null ? this.visible : this.open
            },

            transition () {
                const bottomPlaced = this.placement.match(/^bottom/)
                return bottomPlaced ? 'slide-up' : 'slide-down'
            },

            visualValue () {
                return this.formatDate(this.internalValue)
            },

            displayValue () {
                // 展示快捷文案
                if (this.shortcut && this.shortcut.text && this.useShortcutText) {
                    return this.shortcut.text
                }
                return this.visualValue
            },

            isConfirm () {
                return !!this.$slots.trigger || this.type === 'datetime' || this.type === 'datetimerange' || this.multiple
            },

            fontSizeCls () {
                let cls = ''
                if (this.fontSize === 'medium') {
                    cls = 'medium-font'
                } else if (this.fontSize === 'large') {
                    cls = 'large-font'
                }
                return cls
            },

            longWidthCls () {
                let cls = ''
                if (this.fontSize === 'medium') {
                    cls = 'medium-width'
                } else if (this.fontSize === 'large') {
                    cls = 'large-width'
                }
                return cls
            },

            localReadonly () {
                // 如果当前使用快捷选择，且配置展示快捷文案，则输入框不允许编辑
                if (this.shortcut && this.shortcut.text && this.useShortcutText) {
                    return true
                }
                return !this.editable || this.readonly
            },

            hasFooter () {
                return !!this.$slots.footer
            },

            allowCrossDayProp () {
                // 限制allow-cross-day属性只在time-picker组件type为timerange时生效
                return this.panel === 'RangeTimePickerPanel' ? this.allowCrossDay : false
            }
        },
        watch: {
            visible (state) {
                if (state === false) {
                    this.$refs.drop.destroy()
                }
                this.$refs.drop.update()
                if (!state) {
                    this.dispatch('bk-form-item', 'form-blur')
                }
                this.$emit('open-change', state)
            },
            value (val) {
                this.internalValue = this.parseDate(val)
            },
            open (val) {
                this.visible = val === true
            },
            type (type) {
                this.onSelectionModeChange(type)
            },
            publicVModelValue (now, before) {
                const newValue = JSON.stringify(now)
                const oldValue = JSON.stringify(before)
                const shouldEmitInput = newValue !== oldValue || typeof now !== typeof before
                if (shouldEmitInput) {
                    this.$emit('input', now)
                }
            }
        },
        mounted () {
            // 如果是 date-picker 那么 time-picker 就是回车模式
            if (this.type.indexOf('date') > -1) {
                this.timeEnterMode = true
            } else { // 如果不是 date-picker 那么 time-picker 就是 time 的 props enter-mode
                this.timeEnterMode = this.enterMode
            }

            const initialValue = this.value
            const parsedValue = this.publicVModelValue
            if (typeof initialValue !== typeof parsedValue
                || JSON.stringify(initialValue) !== JSON.stringify(parsedValue)
            ) {
                this.$emit('input', this.publicVModelValue)
            }
            if (this.open !== null) {
                this.visible = this.open
            }
            this.$on('focus-input', () => this.focus())
        },
        methods: {
            handleIconClick () {
                this.$refs.input.focus()
                this.$refs.input.click()
            },
            onSelectionModeChange (type) {
                if (type.match(/^date/)) {
                    type = 'date'
                }
                // this.selectionMode = oneOf(type, ['year', 'month', 'date', 'time']) && type
                this.selectionMode = ['year', 'month', 'date', 'time'].indexOf(type) > -1 && type
                return this.selectionMode
            },
            // 开启 transfer 时，点击 Drop 即会关闭，这里不让其关闭
            handleTransferClick () {
                if (this.transfer) {
                    this.disableCloseUnderTransfer = true
                }
            },
            handleClose (e) {
                if (this.disableCloseUnderTransfer) {
                    this.disableCloseUnderTransfer = false
                    return false
                }

                if (e && e.type === 'mousedown' && this.visible) {
                    e.preventDefault()
                    e.stopPropagation()
                    return
                }

                if (this.visible) {
                    const pickerPanel = this.$refs.pickerPanel && this.$refs.pickerPanel.$el
                    if (e && pickerPanel && pickerPanel.contains(e.target)) {
                        return
                    }

                    this.visible = false
                    e && e.preventDefault()
                    e && e.stopPropagation()
                    return
                }

                this.isFocused = false
                this.disableClickOutSide = false
            },
            handleFocus (e) {
                if (this.readonly) {
                    return
                }
                this.isFocused = true
                if (e && e.type === 'focus') {
                    return
                }
                if (!this.disabled) {
                    this.visible = true
                }
            },
            handleBlur (e) {
                if (this.internalFocus) {
                    this.internalFocus = false
                    return
                }
                if (this.visible) {
                    e.preventDefault()
                    return
                }

                this.isFocused = false
                this.onSelectionModeChange(this.type)
                this.internalValue = this.internalValue.slice()
                this.reset()
                this.$refs.pickerPanel.onToggleVisibility(false)
            },

            handleKeydown (e) {
                const keyCode = e.keyCode
                // tab
                if (keyCode === 9) {
                    if (this.visible) {
                        e.stopPropagation()
                        e.preventDefault()

                        if (this.isConfirm) {
                            const selector = '.bk-picker-confirm > *'
                            const tabbable = this.$refs.drop.$el.querySelectorAll(selector)
                            this.internalFocus = true
                            const element = [...tabbable][e.shiftKey ? 'pop' : 'shift']()
                            element.focus()
                        } else {
                            this.handleClose()
                        }
                    } else {
                        this.focused = false
                    }
                }

                // left, top, right, bottom
                const arrows = [37, 38, 39, 40]
                if (!this.visible && arrows.includes(keyCode)) {
                    this.visible = true
                    return
                }

                // esc
                if (keyCode === 27) {
                    if (this.visible) {
                        e.stopPropagation()
                        this.handleClose()
                    }
                }

                // enter
                if (keyCode === 13 && this.timeEnterMode) {
                    const timePickers = findChildComponents(this, 'TimeSpinner')
                    if (timePickers.length > 0) {
                        const columnsPerPicker = timePickers[0].showSeconds ? 3 : 2
                        const pickerIndex = Math.floor(this.focusedTime.column / columnsPerPicker)
                        const value = this.focusedTime.time[pickerIndex]
                        timePickers[pickerIndex].chooseValue(value)
                        return
                    }
                }

                if (!arrows.includes(keyCode)) {
                    return
                }

                if (this.focusedTime.active) {
                    e.preventDefault()
                }

                const timePickers = findChildComponents(this, 'TimeSpinner')
                if (timePickers.length > 0) {
                    this.navigateTimePanel(keyValueMapper[keyCode])
                }
            },
            reset () {
                this.$refs.pickerPanel.reset && this.$refs.pickerPanel.reset()
            },
            navigateTimePanel (direction) {
                this.focusedTime.active = true
                const horizontal = direction.match(/left|right/)
                const vertical = direction.match(/up|down/)
                const timePickers = findChildComponents(this, 'TimeSpinner')

                const maxNrOfColumns = (timePickers[0].showSeconds ? 3 : 2) * timePickers.length
                const column = (currentColumn => {
                    const incremented = currentColumn + (horizontal ? (direction === 'left' ? -1 : 1) : 0)
                    return (incremented + maxNrOfColumns) % maxNrOfColumns
                })(this.focusedTime.column)

                const columnsPerPicker = maxNrOfColumns / timePickers.length
                const pickerIndex = Math.floor(column / columnsPerPicker)
                const col = column % columnsPerPicker

                // 水平
                if (horizontal) {
                    const time = this.internalValue.map(extractTime)

                    this.focusedTime = {
                        ...this.focusedTime,
                        column: column,
                        time: time
                    }
                    timePickers.forEach((instance, i) => {
                        if (i === pickerIndex) {
                            instance.updateFocusedTime(col, time[pickerIndex])
                        } else {
                            instance.updateFocusedTime(-1, instance.focusedTime)
                        }
                    })
                }

                // 垂直
                if (vertical) {
                    const increment = direction === 'up' ? 1 : -1
                    const timeParts = ['hours', 'minutes', 'seconds']

                    const pickerPossibleValues = timePickers[pickerIndex][`${timeParts[col]}List`]
                    const nextIndex = pickerPossibleValues.findIndex(
                        ({ text }) => this.focusedTime.time[pickerIndex][col] === text
                    ) + increment

                    if (nextIndex === -1) {
                        return
                    }

                    const nextValue = pickerPossibleValues[nextIndex % pickerPossibleValues.length].text
                    const times = this.focusedTime.time.map((time, i) => {
                        if (i !== pickerIndex) {
                            return time
                        }
                        time[col] = nextValue
                        return time
                    })
                    this.focusedTime = {
                        ...this.focusedTime,
                        time: times
                    }

                    timePickers.forEach((instance, i) => {
                        if (i === pickerIndex) {
                            instance.updateFocusedTime(col, times[i])
                            // 不需要回车时就直接选中 value
                            if (!this.timeEnterMode) {
                                instance.chooseValue(this.focusedTime.time[pickerIndex])
                            }
                        } else {
                            instance.updateFocusedTime(-1, instance.focusedTime)
                        }
                    })
                }
            },

            navigateDatePanel (direction) {
                const timePickers = findChildComponents(this, 'TimeSpinner')
                if (timePickers.length > 0) {
                    this.navigateTimePanel(direction)
                    return
                }

                const initialDate = this.focusedDate || (this.internalValue && this.internalValue[0]) || new Date()
                const focusedDate = new Date(initialDate)

                if (this.type.match(/^date/)) {
                    const lastOfMonth = getDayCountOfMonth(initialDate.getFullYear(), initialDate.getMonth())
                    const startDay = initialDate.getDate()
                    const nextDay = focusedDate.getDate() + mapPossibleValues(direction, 1, 7)

                    if (nextDay < 1) {
                        if (direction.match(/left|right/)) {
                            focusedDate.setMonth(focusedDate.getMonth() + 1)
                            focusedDate.setDate(nextDay)
                        } else {
                            focusedDate.setDate(startDay + Math.floor((lastOfMonth - startDay) / 7) * 7)
                        }
                    } else if (nextDay > lastOfMonth) {
                        if (direction.match(/left|right/)) {
                            focusedDate.setMonth(focusedDate.getMonth() - 1)
                            focusedDate.setDate(nextDay)
                        } else {
                            focusedDate.setDate(startDay % 7)
                        }
                    } else {
                        focusedDate.setDate(nextDay)
                    }
                }

                if (this.type.match(/^month/)) {
                    focusedDate.setMonth(focusedDate.getMonth() + mapPossibleValues(direction, 1, 3))
                }

                if (this.type.match(/^year/)) {
                    focusedDate.setFullYear(focusedDate.getFullYear() + mapPossibleValues(direction, 1, 3))
                }

                this.focusedDate = focusedDate
            },

            handleInputChange (e) {
                const isArrayValue = this.type.includes('range') || this.multiple
                const oldValue = this.visualValue
                const newValue = e.target.value
                const newDate = this.parseDate(newValue)
                const disabledDateFn = this.options
                    && typeof this.options.disabledDate === 'function'
                    && this.options.disabledDate
                const valueToTest = isArrayValue ? newDate : newDate[0]
                const isDisabled = disabledDateFn && disabledDateFn(valueToTest)
                const isValidDate = newDate.reduce((valid, date) => valid && date instanceof Date, true)

                if (newValue !== oldValue && !isDisabled && isValidDate) {
                    this.emitChange(this.type)
                    this.internalValue = newDate
                } else {
                    this.forceInputRerender++
                }
            },
            handleInputMouseenter () {
                if (this.readonly || this.disabled) {
                    return
                }
                if (this.visualValue) {
                    this.showClose = true
                }
            },
            handleInputMouseleave (e) {
                if (e.toElement && e.toElement.classList.contains('clear-action')) {
                    return
                }
                this.showClose = false
            },
            handleClear (e) {
                this.visible = false
                this.internalValue = this.internalValue.map(() => null)
                this.$emit('clear')
                this.emitChange(this.type)
                this.reset()

                this.showClose = false
                this.shortcut = null

                setTimeout(
                    () => this.onSelectionModeChange(this.type),
                    500
                )
            },
            emitChange (type) {
                this.$nextTick(() => {
                    this.$emit('change', this.publicStringValue, type)
                    this.dispatch('bk-form-item', 'form-change')
                    if (this.type.indexOf('time') < 0) {
                        this.$refs.input && this.$refs.input.blur()
                    }
                })
            },
            parseDate (val) {
                const isRange = this.type.includes('range')
                const type = this.type
                const parser = (
                    TYPE_VALUE_RESOLVER_MAP[type]
                    || TYPE_VALUE_RESOLVER_MAP['default']
                ).parser
                const format = this.format || DEFAULT_FORMATS[type]
                const multipleParser = TYPE_VALUE_RESOLVER_MAP['multiple'].parser

                if (val && type === 'time' && !(val instanceof Date)) {
                    val = parser(val, format)
                } else if (this.multiple && val) {
                    val = multipleParser(val, format)
                } else if (isRange) {
                    if (!val) {
                        val = [null, null]
                    } else {
                        if (typeof val === 'string') {
                            val = parser(val, format)
                        } else if (type === 'timerange') {
                            val = parser(val, format).map(v => v || '')
                        } else {
                            const [start, end] = val
                            if (start instanceof Date && end instanceof Date) {
                                val = val.map(date => new Date(date))
                            } else if (typeof start === 'string' && typeof end === 'string') {
                                val = parser(val.join(RANGE_SEPARATOR), format)
                            } else if (!start || !end) {
                                val = [null, null]
                            }
                        }
                    }
                } else if (typeof val === 'string' && type.indexOf('time') !== 0) {
                    val = parser(val, format) || null
                }

                return (isRange || this.multiple) ? (val || []) : [val]
            },
            formatDate (value) {
                const format = DEFAULT_FORMATS[this.type]

                if (this.multiple) {
                    const formatter = TYPE_VALUE_RESOLVER_MAP.multiple.formatter
                    return formatter(value, this.format || format)
                } else {
                    const { formatter } = (
                        TYPE_VALUE_RESOLVER_MAP[this.type]
                        || TYPE_VALUE_RESOLVER_MAP['default']
                    )
                    return formatter(value, this.format || format)
                }
            },
            onPick (dates, visible = false, type, shortcut) {
                if (this.multiple) {
                    const pickedTimeStamp = dates.getTime()
                    const indexOfPickedDate = this.internalValue.findIndex(date => date && date.getTime() === pickedTimeStamp)
                    const allDates = [...this.internalValue, dates].filter(Boolean)
                    const timeStamps = allDates.map(
                        date => date.getTime()).filter((ts, i, arr) => arr.indexOf(ts) === i && i !== indexOfPickedDate
                    )
                    this.internalValue = timeStamps.map(ts => new Date(ts))
                } else {
                    dates = this.parseDate(dates)
                    this.internalValue = Array.isArray(dates) ? dates : [dates]
                }

                if (this.internalValue[0]) {
                    this.focusedDate = this.internalValue[0]
                }

                this.focusedTime = {
                    ...this.focusedTime,
                    time: this.internalValue.map(extractTime)
                }

                if (!this.isConfirm) {
                    this.onSelectionModeChange(this.type)
                    this.visible = visible
                }

                // 点击至今后，datetimerange 不关闭弹框，因为有可能需要修改开始日期的时间，daterange 可以直接关闭弹框
                if (type === 'upToNow' && this.type === 'daterange') {
                    this.onPickSuccess()
                }

                this.shortcut = shortcut
                this.emitChange(type)

                // 抛出快捷项选择变化事件
                const shortcutIndex = this.shortcuts.findIndex(item => item === this.shortcut)
                this.$emit('shortcut-change', this.shortcut, shortcutIndex)
            },
            onPickSuccess () {
                this.visible = false

                // 点击 shortcuts 会关闭弹层时，如果不在 nextTick 里触发 pick-success，那么会导致触发 pick-success 的时候，
                // v-model 的值还是之前的值
                this.$nextTick(() => {
                    this.$emit('pick-success')
                })
                // this.focus()
                this.$refs.input && this.$refs.input.blur()
                this.reset()
            },
            focus () {
                this.$refs.input && this.$refs.input.focus()
            }
        }
    }
</script>
<style>
    @import '../../ui/date-picker.base.css';
</style>
