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
    <div ref="container"
        tabindex="0"
        class="bk-color-picker-hue"
        @keydown="handleArrowKeydown"
        @mousedown.stop="handleMouseDown">
        <div class="bk-color-picker-hue-pointer" :style="pointerStyle">
            <div class="bk-color-picker-hue-rectangle"></div>
        </div>
    </div>
</template>

<script>
    import { clamp, getTouches } from '../utils'

    export default {
        props: {
            colorObj: {
                type: Object,
                required: true
            }
        },
        computed: {
            pointerStyle () {
                return { left: `${this.colorObj.hsv.h / 360 * 100}%` }
            }
        },
        methods: {
            handleArrowKeydown (e) {
                const { clientWidth } = this.$refs.container
                let left = this.colorObj.hsv.h / 360 * clientWidth
                const step = 2
                const hugeStep = 10
                switch (e.code) {
                    case 'ArrowLeft':
                        e.preventDefault()
                        left = clamp(left - step, 0, clientWidth)
                        break
                    case 'ArrowRight':
                        e.preventDefault()
                        left = clamp(left + step, 0, clientWidth)
                        break
                    case 'ArrowUp':
                        e.preventDefault()
                        left = clamp(left - hugeStep, 0, clientWidth)
                        break
                    case 'ArrowDown':
                        e.preventDefault()
                        left = clamp(left + hugeStep, 0, clientWidth)
                        break
                    default:
                        return
                }
                this.handlePointChange(null, left)
            },
            handleMouseDown (e) {
                this.$el.focus()
                this.handlePointChange(e)
                window.addEventListener('mousemove', this.handlePointChange, { passive: true })
                window.addEventListener('mouseup', this.handleMouseUp)
            },
            handleMouseUp () {
                window.removeEventListener('mousemove', this.handlePointChange)
                window.removeEventListener('mouseup', this.handleMouseUp)
            },
            /**
             * 色相面板变化
             * @param {MouseEvent|null} e - 鼠标滑动事件
             * @param {Number} [appointedLeft] - 键盘事件对应坐标，如果有就优先使用
             */
            handlePointChange (e, appointedLeft) {
                const { clientWidth } = this.$refs.container
                const left = appointedLeft !== undefined ? appointedLeft : this.getLeft(e)
                this.changeColor(left / clientWidth)
            },
            getLeft (e) {
                const { container } = this.$refs
                const xOffset = container.getBoundingClientRect().left + window.pageXOffset
                const pageX = e.pageX || getTouches(e, 'PageX')

                return clamp(pageX - xOffset, 0, container.clientWidth)
            },
            changeColor (ratio) {
                const { h, s, l, a } = this.colorObj.hsl
                const newHue = ratio * 360
                if (h !== newHue) {
                    this.$emit('change', { h: newHue, s, l, a })
                }
            }
        }
    }
</script>
