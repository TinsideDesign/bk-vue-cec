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
    <div :class="['bk-slider-button', vertical ? 'vertical' : 'horizontal', { 'grabbing': dragging }]"
        ref="button"
        tabindex="0"
        :style="wrapperStyle"
        v-bk-tooltips="tip"
        @click.stop
        @mousedown="onButtonDown"
        @touchstart="onButtonDown">
        <div :class="['slider-button', { 'slider-button-disable': disable }]"></div>
        <div v-if="showButtonLabel && !showIntervalLabel" :class="['slider-button-label', vertical ? 'vertical' : 'horizontal']">
            {{buttonLabel}}
        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import bkTooltips from '@/directives/tooltips'
    Vue.use(bkTooltips)
    export default {
        name: 'bk-slider-button',
        props: {
            vertical: {
                type: Boolean,
                default: false
            },
            value: {
                type: Number,
                default: 0
            }
        },
        data () {
            return {
                dragging: false,
                isClick: false,
                startY: 0,
                startX: 0,
                startPosition: 0,
                newPosition: null,
                oldValue: this.value
            }
        },
        computed: {
            showTip () {
                return this.$parent.showTip
            },
            tip () {
                let tip = ''
                if (this.customContent && this.customContent[this.value]) {
                    const customContent = this.customContent[this.value]
                    tip = customContent.tip || customContent.label || ''
                }
                return {
                    content: this.showCustomTip
                        ? tip : this.showTip
                            ? this.value
                                ? `${this.value}` : `${0}` : '',
                    placement: this.vertical ? 'right' : 'top'
                }
            },
            disable () {
                return this.$parent.disable
            },
            maxValue () {
                return this.$parent.maxValue
            },
            minValue () {
                return this.$parent.minValue
            },
            step () {
                return this.$parent.step
            },
            precision () {
                return this.$parent.precision
            },
            currentPosition () {
                return `${(this.value - this.minValue) / (this.maxValue - this.minValue) * 100}%`
            },
            wrapperStyle () {
                return this.vertical ? { bottom: this.currentPosition } : { left: this.currentPosition }
            },
            showButtonLabel () {
                return this.$parent.showButtonLabel
            },
            buttonLabel () {
                const unit = this.$parent.buttonLabelUnit
                return this.value ? `${this.value}${unit}` : `${0}${unit}`
            },
            showIntervalLabel () {
                return this.$parent.showIntervalLabel
            },
            customContent () {
                return this.$parent.customContent
            },
            showCustomTip () {
                return this.$parent.showCustomTip
            }
        },
        methods: {
            onButtonDown (event) {
                if (this.disable) return
                event.preventDefault()
                this.onDragStart(event)
                this.$parent.on(window, 'mousemove', this.onDragging)
                this.$parent.on(window, 'touchmove', this.onDragging)
                this.$parent.on(window, 'mouseup', this.onDragEnd)
                this.$parent.on(window, 'touchend', this.onDragEnd)
            },
            onDragStart (event) {
                this.dragging = true
                this.isClick = true
                if (event.type === 'touchstart') {
                    event.clientY = event.touches[0].clientY
                    event.clientX = event.touches[0].clientX
                }
                if (this.vertical) {
                    this.startY = event.clientY
                } else {
                    this.startX = event.clientX
                }
                this.startPosition = parseFloat(this.currentPosition)
                this.newPosition = this.startPosition
            },
            onDragging (event) {
                if (this.dragging) {
                    this.isClick = false
                    this.$parent.resetSize()
                    let diff = 0
                    if (event.type === 'touchmove') {
                        event.clientY = event.touches[0].clientY
                        event.clientX = event.touches[0].clientX
                    }
                    if (this.vertical) {
                        this.currentY = event.clientY
                        diff = (this.startY - this.currentY) / this.$parent.sliderSize * 100
                    } else {
                        this.currentX = event.clientX
                        diff = (this.currentX - this.startX) / this.$parent.sliderSize * 100
                    }
                    this.newPosition = this.startPosition + diff
                    this.setPosition(this.newPosition)
                }
            },
            setPosition (newPosition) {
                if (newPosition === null || isNaN(newPosition)) return
                if (newPosition < 0) {
                    newPosition = 0
                } else if (newPosition > 100) {
                    newPosition = 100
                }
                const lengthPerStep = 100 / ((this.maxValue - this.minValue) / this.step)
                const steps = Math.round(newPosition / lengthPerStep)
                let value = steps * lengthPerStep * (this.maxValue - this.minValue) * 0.01 + this.minValue
                value = parseFloat(value.toFixed(this.precision))
                this.$emit('input', value)
                if (!this.dragging && this.value !== this.oldValue) {
                    this.oldValue = this.value
                }
            },
            onDragEnd () {
                this.isMove = false
                if (this.dragging) {
                    setTimeout(() => {
                        this.dragging = false
                        if (!this.isClick) {
                            this.setPosition(this.newPosition)
                            this.$parent.emitChange()
                        }
                    }, 0)
                    this.$parent.on(window, 'mousemove', this.onDragging)
                    this.$parent.on(window, 'touchmove', this.onDragging)
                    this.$parent.on(window, 'mouseup', this.onDragEnd)
                    this.$parent.on(window, 'touchend', this.onDragEnd)
                }
            }
        }
    }
</script>
