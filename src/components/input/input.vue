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
    <div :class="[wrapperClass, fontSizeCls, extCls]">
        <div class="control-icon left-icon" v-if="leftIcon" @click="handlerLeftIcon">
            <i :class="['bk-icon', leftIcon]"></i>
        </div>
        <div class="group-box group-prepend" v-if="prepend">
            <slot name="prepend"></slot>
        </div>
        <template v-if="inputType === 'textarea'">
            <div class="bk-textarea-wrapper">
                <textarea
                    ref="textarea"
                    :class="[
                        'bk-form-textarea',
                        { 'textarea-maxlength': maxlength }
                    ]"
                    :style="computedStyle"
                    v-bind="bindAttribute"
                    @keyup.enter="handlerEnter"
                    @keypress="handlerKeypress"
                    @keydown="handlerKeydown"
                    @focus="handlerFocus"
                    @blur="handlerBlur"
                    @input="handlerInput"
                    @paste="handlerPaste"
                ></textarea>
                <template v-if="showInputWordLimit">
                    <p class="bk-limit-box">
                        <span class="strong">{{ (curValue && curValue.length) || 0 }}</span
                        >/<span>{{ maxlength }}</span>
                    </p>
                </template>
            </div>
        </template>
        <template v-else>
            <div :class="[`bk-input-${type}`]">
                <input
                    ref="input"
                    :class="['bk-form-input', inputSizeCls, { 'only-bottom-border': behavior === 'simplicity' }]"
                    :style="computedStyle"
                    v-bind="bindAttribute"
                    @keyup.enter="handlerEnter"
                    @keyup="handlerKeyup"
                    @keypress="handlerKeypress"
                    @keydown="handlerKeydown"
                    @focus="handlerFocus"
                    @blur="handlerBlur"
                    @input="handlerInput"
                    @paste="handlerPaste"
                />
                <template v-if="/^number$/i.test(type) && !disabled && !readonly">
                    <span class="input-number-option" v-if="showControls">
                        <span
                            @click="handleNumberAdd"
                            class="number-option-item bk-icon icon-angle-up"
                        ></span>
                        <span
                            @click="handleNumberDelete"
                            class="number-option-item bk-icon icon-angle-down"
                        ></span>
                    </span>
                </template>
            </div>
        </template>

        <div class="group-box group-append" v-if="append">
            <slot name="append"></slot>
        </div>
        <div class="control-icon right-icon" :style="rightIconStyle" v-if="!/^number$/i.test(type)" @click="handlerRightIcon" ref="rightIconArea">
            <i @click="togglePass" v-if="showPwdVisable" :class="[
                'bk-icon',
                inputType === 'password'
                    ? inputPasswordIcon[0]
                    : inputPasswordIcon[1]
            ]"></i>
            <i @click.stop.prevent="handlerClear" class="bk-icon icon-close-circle-shape clear-icon ml5" v-if="clearable && curValue && !disabled"></i>
            <i :class="['bk-icon', rightIcon]" v-else-if="rightIcon"></i>
            <template v-if="type === 'text'">
                <p class="bk-limit-box ml5" style="position: static" v-show="showInputWordLimit">
                    <span class="strong">{{ (curValue && curValue.length) || 0 }}</span
                    >/<span>{{ maxlength }}</span>
                </p>
            </template>
        </div>
    </div>
</template>

<script>
/**
     * bk-input
     * @module components/input
     * @desc 文本输入框
     * @param type {String} - 输入框类型，有input和textarea，默认为text
     * @param placeholder {String} - 空白提示，默认为“请输入”
     * @param disabled {Boolean} - 是否禁用，默认为flase
     * @param readonly {Boolean} - 是否只读，默认为flase
     * @param name {String} - 名称
     * @param clearable {Boolean} - 是否可清除，默认为false
     * @param maxlength {Number} - 最大输入长度
     * @param inputStyle {Object} - 样式
     * @param minlength {Number} - 最小输入长度
     * @param leftIcon {String} - 左边显示icon
     * @param rightIcon {String} - 右边显示icon
     * @param rows {Number} - 行数，type为textarea有效
     * @param precision {Number} - 保留小数位，默认 0
     * @example
     * <bk-input
            :placeholder=“请输入”
            v-model="value">
       </bk-input>
     */
    import emitter from '@/mixins/emitter'
    import locale from 'bk-magic-vue/lib/locale'
    import { getStyle } from '@/utils/dom'

    // const toString = Object.prototype.toString

    export default {
        name: 'bk-input',
        mixins: [emitter, locale.mixin],
        props: {
            type: {
                type: String,
                default: 'text',
                validator (value) {
                    return (
                        [
                            'text',
                            'textarea',
                            'password',
                            'number',
                            'email',
                            'url',
                            'date'
                        ].indexOf(value) > -1
                    )
                }
            },
            value: {
                type: [String, Number],
                default: ''
            },
            placeholder: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            },
            clearable: {
                type: Boolean,
                default: false
            },
            readonly: {
                type: Boolean,
                default: false
            },
            name: {
                type: String,
                default: ''
            },
            maxlength: {
                type: [Number, String]
            },
            minlength: {
                type: [Number, String]
            },
            min: {
                type: Number,
                default: Number.MIN_SAFE_INTEGER
            },
            max: {
                type: Number,
                default: Number.MAX_SAFE_INTEGER
            },
            size: {
                type: String,
                default: '',
                validator (val) {
                    return ['', 'large', 'small'].includes(val)
                }
            },
            leftIcon: {
                type: String,
                default: ''
            },
            rightIcon: {
                type: String,
                default: ''
            },
            rows: {
                type: Number
            },
            inputStyle: {
                type: Object
            },
            // normal: 12px
            // medium: 14px
            // large: 16px
            fontSize: {
                type: String,
                default: 'normal'
            },
            precision: Number,
            passwordIcon: {
                type: Array,
                default () {
                    return ['icon-eye-slash', 'icon-eye']
                }
            },
            showControls: {
                type: Boolean,
                default: true
            },
            // 外部设置的 class name
            extCls: {
                type: String,
                default: ''
            },
            /** 原生H5属性设置 */
            nativeAttributes: {
                type: Object,
                default: null
            },
            showWordLimit: {
                type: Boolean,
                default: undefined
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
            return {
                curValue: '',
                prepend: false,
                append: false,
                isActive: false,
                defaultPlaceholder: '',
                rightIconStyle: {
                    right: '10px'
                },
                rightPasswordIconStyle: {
                    right: '10px'
                },
                inputType: this.type,
                inputSize: this.size,
                inputPasswordIcon: this.passwordIcon,
                inputRightPadding: '10px',
                iconAreaSizeObserver: null
            }
        },
        computed: {
            showPwdVisable () {
                return this.type === 'password'
                    && this.curValue
                    && this.inputPasswordIcon.length
                    && !this.readonly
                    && !this.disabled
            },
            showInputWordLimit () {
                /**
                 * 仅对text、textarea有效
                 * text在不传show-word-limit时，默认不显示
                 * textarea在不传show-word-limit(undefined), 默认需显示
                 */
                if (!['text', 'textarea'].includes(this.type)) return false
                return this.type === 'text' ? this.maxlength && this.showWordLimit : this.maxlength && this.showWordLimit !== false
            },
            bindAttribute () {
                return this.getAttributeByType(this.inputType)
            },
            computedStyle () {
                return Object.assign(this.inputType === 'textarea' ? {} : {
                    'padding-right': this.inputRightPadding
                }, this.inputStyle)
            },
            showLeftIcon () {
                return this.leftIcon
            },
            showRightIcon () {
                return this.rightIcon || (this.clearable && this.curValue) || this.type === 'password' || this.maxlength
            },
            showTwoRightIcon () {
                return (this.clearable && this.curValue) && this.type === 'password'
            },
            wrapperClass () {
                const wrapperClass = [
                    'bk-form-control',
                    {
                        'with-left-icon': this.showLeftIcon,
                        'with-right-icon': this.showRightIcon,
                        'with-two-right-icon': this.showTwoRightIcon,
                        'control-prepend-group': this.prepend,
                        'control-append-group': this.append,
                        'control-active': this.isActive,
                        'control-disable': this.disabled
                    }
                ]
                if (this.inputSize) {
                    wrapperClass.push(`bk-input-wrapper-${this.inputSize}`)
                }
                return wrapperClass
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
            inputSizeCls () {
                if (this.inputSize) {
                    return `bk-input-${this.inputSize}`
                }
                return ''
            }
        },
        watch: {
            value: {
                handler (val, old) {
                    this.setCurValue(val)
                    // 格式化Number类型的默认值，小数点位数
                    old === undefined && this.updateNumberValue(val)
                },
                immediate: true
            },
            placeholder (val) {
                this.defaultPlaceholder = val || this.t('bk.input.input')
            },
            type (val) {
                this.inputType = val
            },
            size (val) {
                this.inputSize = val
            }
        },
        created () {
            this.defaultPlaceholder = this.placeholder || this.t('bk.input.input')
        },
        mounted () {
            this.prepend = this.$slots.prepend !== undefined
            this.append = this.$slots.append !== undefined
            if (this.$slots.append) {
                this.$nextTick(() => {
                    const appendWidth = parseFloat(
                        getStyle(this.$slots.append[0].elm, 'width')
                    )
                    this.rightIconStyle = {
                        right:
                            parseFloat(this.rightIconStyle.right)
                            + appendWidth
                            + 'px'
                    }
                })
            }
            if (this.clearable) {
                this.rightPasswordIconStyle = {
                    right: '30px'
                }
            }
            this.observerIconSize()
        },
        beforeDestroy () {
            this.iconAreaSizeObserver
                && typeof this.iconAreaSizeObserver.disconnect === 'function'
                && this.iconAreaSizeObserver.disconnect()
            this.iconAreaSizeObserver = null
        },
        methods: {
            /** 观察右侧图表区域的宽度，动态修改input的padding-right属性 */
            observerIconSize () {
                const element = this.$refs.rightIconArea
                if (!element) return
                if (typeof ResizeObserver !== 'undefined') {
                    const defaultPadding = 10
                    this.iconAreaSizeObserver = new ResizeObserver(entries => {
                        for (const entry of entries) {
                            const cr = entry.contentRect
                            this.inputRightPadding = `${cr.width + defaultPadding}px`
                        }
                    })
                    this.iconAreaSizeObserver.observe(element)
                }
            },
            getAttributeByType (type = '') {
                const defaultAttr = {
                    type: type,
                    name: this.name,
                    placeholder: this.defaultPlaceholder,
                    disabled: this.disabled,
                    readonly: this.readonly,
                    maxlength: this.maxlength,
                    minlength: this.minlength,
                    value: this.curValue
                }
                type = type.toLocaleLowerCase()
                const outputAttr = this.nativeAttributes || {}
                switch (type) {
                    case 'number':
                        const numberAttr = {
                            min: this.min,
                            max: this.max
                        }
                        Object.assign(outputAttr, defaultAttr, numberAttr)
                        break
                    case 'textarea':
                        const txtAttr = { rows: this.rows }
                        Object.assign(outputAttr, defaultAttr, txtAttr)
                        break
                    default:
                        Object.assign(outputAttr, defaultAttr)
                        break
                }

                return outputAttr
            },
            handleToFixed (defaultNumber, len) {
                // .123转为0.123
                const number = Number(defaultNumber)
                if (isNaN(number) || number >= Math.pow(10, 21)) {
                    return number.toString()
                }
                if (typeof (len) === 'undefined' || len === 0) {
                    return (Math.round(number)).toString()
                }
                let result = number.toString()
                const numberArr = result.split('.')

                if (numberArr.length < 2) {
                    // 整数的情况
                    return this.handlePadNum(result, len)
                }
                const intNum = numberArr[0] // 整数部分
                const deciNum = numberArr[1]
                const lastNum = deciNum.substr(len, 1)// 最后一个数字

                if (deciNum.length === len) {
                    return result
                }
                if (deciNum.length < len) {
                    return this.handlePadNum(result, len)
                }
                // 需要截取的长度小于当前长度，需要判断最后一位数字
                result = intNum + '.' + deciNum.substr(0, len)
                if (parseInt(lastNum, 10) >= 5) {
                    // 最后一位数字大于5，要进位
                    const times = Math.pow(10, len) // 需要放大的倍数
                    let changedInt = Number(result.replace('.', ''))// 截取后转为整数
                    changedInt++// 整数进位
                    changedInt /= times// 整数转为小数，注：有可能还是整数
                    result = this.handlePadNum(changedInt + '', len)
                }
                return result
            },
            handlePadNum (num, len) {
                const dotPos = num.indexOf('.')
                if (dotPos === -1) {
                    // 整数的情况
                    num += '.'
                    for (let i = 0; i < len; i++) {
                        num += '0'
                    }
                    return num
                } else {
                    // 小数的情况
                    const need = len - (num.length - dotPos - 1)
                    for (let j = 0; j < need; j++) {
                        num += '0'
                    }
                    return num
                }
            },
            handleNumberDelete (event) {
                const curNumberValue = Number(this.curValue)
                if (curNumberValue - 1 >= this.min) {
                    const curLenAfterDot = (String(curNumberValue) || '').split('.')[1] || ''
                    let newVal = curNumberValue - 1
                    if (typeof this.precision !== 'undefined') {
                        newVal = this.handleToFixed(newVal, Math.min(16, Math.max(curLenAfterDot.length, this.precision)))
                    }
                    this.setCurValue(newVal)
                    this.$emit('input', newVal, event)
                    this.$emit('change', newVal, event)
                }
            },
            handleNumberAdd (event) {
                const curNumberValue = Number(this.curValue)
                if (curNumberValue <= this.max - 1) {
                    const curLenAfterDot = (String(curNumberValue) || '').split('.')[1] || ''
                    let newVal = curNumberValue + 1
                    if (typeof this.precision !== 'undefined') {
                        newVal = this.handleToFixed(newVal, Math.min(16, Math.max(curLenAfterDot.length, this.precision)))
                    }
                    this.setCurValue(newVal)
                    this.$emit('input', newVal, event)
                    this.$emit('change', newVal, event)
                }
            },
            handlerEnter (event) {
                const value = event.target.value
                this.$emit('enter', value, event)
            },
            handlerKeyup (event) {
                const value = event.target.value
                this.$emit('keyup', value, event)
            },
            handlerKeypress (event) {
                const value = event.target.value
                this.$emit('keypress', value, event)
            },
            handlerKeydown (event) {
                const value = event.target.value
                this.$emit('keydown', value, event)
            },
            handlerFocus (event) {
                const value = event.target.value
                this.isActive = true
                this.$emit('focus', value, event)
                this.dispatch('bk-form-item', 'form-focus')
            },
            toPrecision (num, precision, floor = false) {
                if (precision === undefined) precision = 0
                return this.handleToFixed(num, precision)
            },
            handlerBlur (event) {
                let value = event.target.value
                if (/^number$/i.test(this.type) && value !== '') {
                    if (value !== '' && /^-?\d*(.\d*)?$/i.test(value)) {
                        if (value > this.max || value < this.min) {
                            value = this.getCurrentNumberValue()
                        }
                    }
                    if (typeof this.precision !== 'undefined') {
                        value = this.toPrecision(Number(value), this.precision, true)
                    } else {
                        value = Number(value)
                    }
                    if (value + '' !== event.target.value + '') {
                        this.setCurValue(value)
                        event.target.value = value
                        this.$emit('change', value, event)
                        this.$emit('input', value, event)
                    }
                }
                this.isActive = false
                this.$emit('blur', value, event)
                this.dispatch('bk-form-item', 'form-blur')
            },
            handlerPaste (event) {
                const value = event.target.value
                this.$emit('paste', value, event)
                this.$emit('change', value, event)
            },
            getCurrentNumberValue (val = null) {
                val = val === null ? this.curValue : val
                let value = ''
                if (val !== '' && /^-?\d*(.\d*)?$/i.test(val)) {
                    value = Number(val)
                    value = value > this.max ? this.max : value
                    value = value < this.min ? this.min : value
                    return value
                }

                return ''
            },
            handlerInput (event) {
                const value = event.target.value
                this.setCurValue(value)
                this.$emit('input', value, event)
                this.$emit('change', value, event)
            },
            handlerClear (event) {
                this.curValue = ''
                this.$emit('input', this.curValue, event)
                this.$emit('change', this.curValue, event)
                this.$emit('clear', this.curValue, event)
            },
            handlerLeftIcon (event) {
                this.$emit('left-icon-click', this.curValue, event)
            },
            handlerRightIcon (event) {
                this.$emit('right-icon-click', this.curValue, event)
            },
            focus (event) {
                if (this.type === 'textarea') {
                    this.$refs.textarea.focus()
                } else {
                    this.$refs.input.focus()
                }
            },
            blur (event) {
                if (this.type === 'textarea') {
                    this.$refs.textarea.blur()
                } else {
                    this.$refs.input.blur()
                }
            },
            setCurValue (val) {
                if (val === this.curValue) {
                    return false
                }

                this.curValue = val
            },

            updateNumberValue (val) {
                if (val !== '' && /^number$/i.test(this.type) && /^-?\d*(.\d*)?$/i.test(val)) {
                    val = this.getCurrentNumberValue(val)
                    this.curValue = typeof this.precision === 'number' ? this.toPrecision(
                        Number(val),
                        this.precision
                    ) : Number(val)
                }
            },
            togglePass () {
                if (this.inputType === 'password') {
                    this.inputType = 'text'
                } else {
                    this.inputType = 'password'
                }
            }
        }
    }
</script>

<style>
    /*
        这里不需要单独引入 iconfont.css
        1. 全量引入 bk-magic-vue 时
            import 'bk-magic-vue' 或 import bkMagicVue from 'bk-magic-vue'
            均会自动引入 bk-magic-vue/dist/bk-magic-vue.min.css，bk-magic-vue.min.css 里包含了 iconfont
        2. 按需引入 bk-magic-vue 时
            import bkInput from 'bk-magic-vue/lib/input' 或 import { bkInput } from 'bk-magic-vue'
            均会自动引入 bk-magic-vue/lib/ui/common.min.css，common.min.css 里包含了 iconfont
     */
    /* @import '../../ui/iconfont.css'; */
    @import '../../ui/input.css';
</style>
