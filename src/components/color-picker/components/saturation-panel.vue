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
        class="bk-color-picker-saturation"
        :style="backgroundStyle"
        @keydown="handleArrowKeydown"
        @mousedown.stop="handleMouseDown">
        <!-- 从左到右饱和度 saturation 增大 -->
        <div class="bk-color-picker-saturation-white"></div>
        <!-- 从上到下明度 value(brightness) 减小 -->
        <div class="bk-color-picker-saturation-black"></div>
        <div class="bk-color-picker-pointer" :style="pointerStyle">
            <div class="bk-color-picker-circle"></div>
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
            backgroundStyle () {
                return { background: `hsl(${this.colorObj.hsv.h}, 100%, 50%)` }
            },
            pointerStyle () {
                return { top: `${(1 - this.colorObj.hsv.v) * 100}%`, left: `${this.colorObj.hsv.s * 100}%` }
            }
        },
        methods: {
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
            handleArrowKeydown (e) {
                const { clientWidth, clientHeight } = this.$refs.container
                let left = this.colorObj.hsv.s * clientWidth
                let top = (1 - this.colorObj.hsv.v) * clientHeight
                const step = 10
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
                        top = clamp(top - step, 0, clientHeight)
                        break
                    case 'ArrowDown':
                        e.preventDefault()
                        top = clamp(top + step, 0, clientHeight)
                        break
                    default:
                        return
                }
                this.handlePointChange(null, left, top)
            },
            /**
             * 饱和度面板变化
             * @param {MouseEvent|null} e - 鼠标滑动事件
             * @param {Number} [appointedLeft] - 键盘事件对应坐标，如果有就优先使用
             * @param {Number} [appointedTop] - 键盘事件对应坐标，如果有就优先使用
             */
            handlePointChange (e, appointedLeft, appointedTop) {
                const { clientWidth, clientHeight } = this.$refs.container
                const left = appointedLeft !== undefined ? appointedLeft : this.getLeft(e)
                const top = appointedTop !== undefined ? appointedTop : this.getTop(e)
                const saturation = left / clientWidth
                const bright = 1 - top / clientHeight

                this.changeColor(this.colorObj.hsv.h, saturation, bright, this.colorObj.hsv.a)
            },
            getLeft (e) {
                const { container } = this.$refs
                const xOffset = container.getBoundingClientRect().left + window.pageXOffset
                const pageX = e.pageX || getTouches(e, 'PageX')

                return clamp(pageX - xOffset, 0, container.clientWidth)
            },
            getTop (e) {
                const { container } = this.$refs
                const yOffset = container.getBoundingClientRect().top + window.pageYOffset
                const pageY = e.pageY || getTouches(e, 'PageY')

                return clamp(pageY - yOffset, 0, container.clientHeight)
            },
            changeColor (h, s, v, a) {
                this.$emit('change', { h, s, v, a })
            }
        }
    }
</script>
