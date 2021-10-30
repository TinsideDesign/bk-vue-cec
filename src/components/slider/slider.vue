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
    <div :class="['bk-slider', extCls]">
        <slot name="start"></slot>
        <div class="bk-slider-runway"
            ref="slider"
            :style="runwayStyle"
            @click.stop="setButtonPos">
            <div :class="['bk-slider-bar', vertical ? 'vertical' : 'horizontal', { 'disable': disable }]" :style="barStyle"></div>
            <template v-if="showInterval">
                <div :class="['bk-slider-interval', { 'vertical': vertical }]" :style="getIntervalStyle(item)"
                    v-for="(item, index) in intervals" :key="index">
                </div>
            </template>
            <template v-if="customContent">
                <div :class="['bk-slider-interval', { 'vertical': vertical }]" :style="getIntervalStyle(item.percent)"
                    v-for="(item, index) in customList" :key="index">
                </div>
            </template>
            <template v-if="showBetweenLabel || showIntervalLabel || showCustomLabel">
                <div :class="['bk-slider-labels', vertical ? 'vertical' : 'horizontal']">
                    <template v-if="showBetweenLabel">
                        <div class="label-start"
                            :style="[{ opacity: showButtonLabel ? [firstValue, secondValue].includes(vertical ? maxValue : minValue) ? '0' : '1' : '1' }]">
                            {{minValue}}{{intervalLabelUnit}}
                        </div>
                        <div class="label-end"
                            :style="[{ opacity: showButtonLabel ? [firstValue, secondValue].includes(vertical ? minValue : maxValue) ? '0' : '1' : '1' }]">
                            {{maxValue}}{{intervalLabelUnit}}
                        </div>
                    </template>
                    <template v-else-if="showIntervalLabel">
                        <div :class="['bk-slider-label', vertical ? 'vertical' : 'horizontal']" :style="getIntervalStyle(item.stepWidth)"
                            v-for="(item, index) in intervalLabels" :key="index">
                            {{item.stepLabel}}
                        </div>
                    </template>
                    <template v-else-if="showCustomLabel">
                        <div :class="['bk-slider-label', vertical ? 'vertical' : 'horizontal']" :style="getIntervalStyle(item.percent)"
                            v-for="(item, index) in customList" :key="index">
                            {{item.label}}
                        </div>
                    </template>
                </div>
            </template>
            <slider-button :vertical="vertical" v-model="firstValue" ref="firstbutton"></slider-button>
            <slider-button v-if="range" :vertical="vertical" v-model="secondValue" ref="secondbutton"></slider-button>
        </div>
        <div v-if="showInput && !vertical" class="bk-slider-input">
            <div class="input-item" :style="{ width: getInputWidth(firstInput) }">
                <bk-input type="number" v-model="firstInput"
                    :max="maxValue"
                    :min="minValue"
                    @change="firstInputChange"
                    @enter="firstInputChange"
                    @blur="firstInputChange"></bk-input>
            </div>
            <template v-if="showSecondInput && secondValue">
                <div class="input-center">～</div>
                <div class="input-item" :style="{ width: getInputWidth(secondInput) }">
                    <bk-input type="number" v-model="secondInput"
                        :max="maxValue"
                        :min="minValue"
                        @change="secondInputChange"
                        @enter="secondInputChange"
                        @blur="secondInputChange"></bk-input>
                </div>
            </template>
        </div>
        <slot name="end"></slot>
    </div>
</template>
<script>
    import bkInput from '@/components/input'
    import sliderButton from './slider-button'

    export default {
        name: 'bk-slider',
        components: {
            sliderButton,
            bkInput
        },

        props: {
            value: {
                type: [Number, Array],
                default: 0
            },
            // 是否为垂直模式
            vertical: {
                type: Boolean,
                default: false
            },
            // 是否显示tip
            showTip: {
                type: Boolean,
                default: true
            },
            // 是否禁用
            disable: {
                type: Boolean,
                default: false
            },
            // 最大值
            maxValue: {
                type: [Number],
                default: 100
            },
            // 最小值
            minValue: {
                type: [Number],
                default: 0
            },
            // 每一步的距离
            step: {
                type: [Number],
                default: 1
            },
            // 是否为分段式滑块
            range: {
                type: Boolean,
                default: false
            },
            // 是否显示间断点
            showInterval: {
                type: Boolean,
                default: false
            },
            // 是否显示间断点下的文字
            showIntervalLabel: {
                type: Boolean,
                default: false
            },
            // 间断点下的文字单位
            intervalLabelUnit: {
                type: String,
                default: ''
            },
            // 滑动选择器高度 vertical为true时使用
            height: {
                type: String,
                default: '200px'
            },
            // 滑块下是否显示值不可与间断点下的文字同时使用,
            showButtonLabel: {
                type: Boolean,
                default: false
            },
            // 滑块下数值单位
            buttonLabelUnit: {
                type: String,
                default: ''
            },
            // 是否显示首尾刻度
            showBetweenLabel: {
                type: Boolean,
                default: false
            },
            // 是否显示输入框
            showInput: {
                type: Boolean,
                default: false
            },
            // 自定义内容
            customContent: {
                type: Object
            },
            // 是否显示自定义内容的标签
            showCustomLabel: {
                type: Boolean,
                default: false
            },
            // 是否显示自定义内容的toolTip
            showCustomTip: {
                type: Boolean,
                default: false
            },
            extCls: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                sliderSize: 1,
                firstValue: null,
                secondValue: null,
                oldValue: null,
                stepWidth: 0,
                inputValue: 0,
                firstInput: 0,
                secondInput: 0
            }
        },
        computed: {
            precision () {
                // 小数点后几位
                const precisions = [this.minValue, this.maxValue, this.step].map(item => {
                    const decimal = ('' + item).split('.')[1]
                    return decimal ? decimal.length : 0
                })
                return Math.max.apply(null, precisions)
            },
            rangeMinValue () {
                return Math.min(this.firstValue, this.secondValue)
            },
            rangeMaxValue () {
                return Math.max(this.firstValue, this.secondValue)
            },
            barSize () {
                return this.range
                    ? `${100 * (this.rangeMaxValue - this.rangeMinValue) / (this.maxValue - this.minValue)}%`
                    : `${100 * (this.firstValue - this.minValue) / (this.maxValue - this.minValue)}%`
            },
            barStart () {
                return this.range
                    ? `${100 * (this.rangeMinValue - this.minValue) / (this.maxValue - this.minValue)}%`
                    : '0%'
            },
            barStyle () {
                return this.vertical
                    ? {
                        height: this.barSize,
                        bottom: this.barStart
                    } : {
                        width: this.barSize,
                        left: this.barStart
                    }
            },
            intervals () {
                if (!this.showInterval || this.minValue > this.maxValue) return []
                if (this.step === 0) {
                    console.warn('WARNNING:step should not be 0')
                    return []
                }
                const stopCount = (this.maxValue - this.minValue) / this.step
                const stepWidth = 100 * this.step / (this.maxValue - this.minValue)
                const result = []
                for (let i = 1; i < stopCount; i++) {
                    result.push(i * stepWidth)
                }
                if (this.range) {
                    return result.filter(step => {
                        return step < 100 * (this.rangeMinValue - this.minValue) / (this.maxValue - this.minValue)
                            || step > 100 * (this.rangeMaxValue - this.minValue) / (this.maxValue - this.minValue)
                    })
                } else {
                    return result.filter(step => step > 100 * (this.firstValue - this.minValue) / (this.maxValue - this.minValue))
                }
            },
            runwayStyle () {
                return this.vertical ? { height: this.height, width: '4px' } : {}
            },
            intervalLabels () {
                if (!this.showIntervalLabel) return []
                if (this.step === 0) {
                    console.warn('WARNNING:step should not be 0')
                    return []
                }
                const stepCount = (this.maxValue - this.minValue) / this.step
                const stepWidth = 100 * this.step / (this.maxValue - this.minValue)
                const result = []
                for (let i = 0; i <= stepCount; i++) {
                    const item = {
                        stepWidth: i * stepWidth,
                        stepLabel: `${i * this.step}${this.intervalLabelUnit}`
                    }
                    result.push(item)
                }
                return result
            },
            showSecondInput () {
                return Array.isArray(this.value)
            },
            customList () {
                if (!this.customContent) {
                    return []
                }
                return Object.keys(this.customContent)
                    .sort((a, b) => a - b)
                    .filter(value => value >= this.minValue && value <= this.maxValue)
                    .map(item => {
                        const tip = this.customContent[item].tip
                        const label = this.customContent[item].label
                        return {
                            tip: tip || label || '',
                            label: label || '',
                            percent: (item - this.minValue) / (this.maxValue - this.minValue) * 100
                        }
                    })
            }
        },
        watch: {
            value () {
                this.setValues()
            },
            firstValue (val) {
                if (this.range) {
                    this.$emit('input', [this.rangeMinValue, this.rangeMaxValue])
                } else {
                    this.$emit('input', val)
                }
                this.firstInput = val
            },
            secondValue (val) {
                this.$emit('input', [this.rangeMinValue, this.rangeMaxValue])
                this.secondInput = val
            }
        },
        mounted () {
            if (this.range) {
                if (Array.isArray(this.value)) {
                    this.firstValue = Math.max(this.minValue, this.value[0])
                    this.secondValue = Math.min(this.maxValue, this.value[1])
                } else {
                    this.firstValue = this.minValue
                    this.secondValue = this.maxValue
                }
                this.oldValue = [this.firstValue, this.secondValue]
            } else {
                if (typeof this.value !== 'number' || isNaN(this.value)) {
                    this.firstValue = this.minValue
                } else {
                    this.firstValue = Math.min(this.maxValue, Math.max(this.minValue, this.value))
                }
                this.oldValue = this.firstValue
            }
            this.stepWidth = 100 * this.step / (this.maxValue - this.minValue)
            this.resetSize()
            this.on(window, 'resize', this.resetSize)
        },
        methods: {
            valueChanged () {
                if (this.range) {
                    return ![this.rangeMinValue, this.rangeMaxValue].every((item, index) => item === this.oldValue[index])
                } else {
                    return this.value !== this.oldValue
                }
            },
            // 回显value值
            setValues () {
                if (this.minValue > this.maxValue) {
                    console.error('min should not be greater than max.')
                    return
                }
                const val = this.value
                if (this.range && Array.isArray(val)) {
                    if (val[1] < this.minValue) {
                        this.$emit('input', [this.minValue, this.minValue])
                    } else if (val[0] > this.maxValue) {
                        this.$emit('input', [this.maxValue, this.maxValue])
                    } else if (val[0] < this.minValue) {
                        this.$emit('input', [this.minValue, val[1]])
                    } else if (val[1] > this.maxValue) {
                        this.$emit('input', [val[0], this.maxValue])
                    } else {
                        this.firstValue = val[0]
                        this.secondValue = val[1]
                        if (this.valueChanged()) {
                            this.oldValue = val.slice()
                        }
                    }
                } else if (!this.range && typeof val === 'number' && !isNaN(val)) {
                    if (val < this.minValue) {
                        this.$emit('input', this.minValue)
                    } else if (val > this.maxValue) {
                        this.$emit('input', this.maxValue)
                    } else {
                        this.firstValue = val
                        if (this.valueChanged()) {
                            this.oldValue = val
                        }
                    }
                }
            },
            resetSize () {
                if (this.$refs.slider) {
                    this.sliderSize = this.$refs.slider[`client${this.vertical ? 'Height' : 'Width'}`]
                }
            },
            emitChange () {
                this.$nextTick(() => {
                    this.$emit('change', this.range ? [this.rangeMinValue, this.rangeMaxValue] : this.value)
                })
            },
            // 获取当前断点位置
            getIntervalStyle (position) {
                return this.vertical ? { 'bottom': position + '%' } : { 'left': position + '%' }
            },
            // 设置button位置
            setPosition (percent) {
                if (!this.range) {
                    this.$refs.firstbutton.setPosition(percent)
                    return
                }
                const targetValue = this.minValue + percent * (this.maxValue - this.minValue) / 100
                let curButtonRef = ''
                // 绝对值
                if (Math.abs(this.rangeMinValue - targetValue) < Math.abs(this.rangeMaxValue - targetValue)) {
                    curButtonRef = this.firstValue < this.secondValue ? 'firstbutton' : 'secondbutton'
                } else {
                    curButtonRef = this.firstValue > this.secondValue ? 'firstbutton' : 'secondbutton'
                }
                this.$refs[curButtonRef].setPosition(percent)
            },
            setButtonPos (event) {
                if (this.disable) return
                this.resetSize()
                if (this.vertical) {
                    const offsetBottom = this.$refs.slider.getBoundingClientRect().bottom
                    this.setPosition((offsetBottom - event.clientY) / this.sliderSize * 100)
                } else {
                    const offsetLeft = this.$refs.slider.getBoundingClientRect().left
                    this.setPosition((event.clientX - offsetLeft) / this.sliderSize * 100)
                }
                this.emitChange()
            },
            firstInputChange (v) {
                if (v === '') {
                    return
                }
                const val = parseFloat(v)
                if (val < this.minValue) {
                    this.firstInput = this.minValue
                    this.firstValue = this.minValue
                } else if (val > this.maxValue) {
                    this.firstInput = this.maxValue
                    this.firstValue = this.maxValue
                } else {
                    this.firstValue = val
                }
            },
            secondInputChange (v) {
                if (v === '') {
                    return
                }
                const val = parseFloat(v)
                if (val < this.minValue) {
                    this.secondInput = this.minValue
                    this.secondValue = this.minValue
                } else if (val > this.maxValue) {
                    this.secondInput = this.maxValue
                    this.secondValue = this.maxValue
                } else {
                    this.secondValue = val
                }
            },
            /**
             * 添加监听事件
             */
            on (element, event, handler) {
                if (element && event && handler) {
                    element.addEventListener(event, handler, false)
                }
            },

            /**
             * 移除监听事件
             */
            off (element, event, handler) {
                if (element && event) {
                    element.removeEventListener(event, handler, false)
                }
            },
            getInputWidth (num) {
                const len = `${num}`.length
                return len > 2 ? `${56 + (len - 2) * 6}px` : '56px'
            }
        }
    }
</script>
<style>
    @import '../../ui/slider.css';
</style>
