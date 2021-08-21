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
    <section :class="[extCls, 'bk-zoom-image']">
        <img :src="src" class="bk-real-image" @click="imgSrc = src">
        <transition name="fade">
            <section v-if="imgSrc"
                class="bk-full-screen"
                @mousemove="mouseMove"
                @mouseup="mouseUp"
            >
                <img ref="screenImg"
                    :src="imgSrc"
                    @mousewheel.prevent="scrollImage"
                    @DOMMouseScroll.prevent="scrollImage"
                    @mousedown="mouseDown"
                    :class="[{ 'bk-zoom-init': isInit }, 'bk-full-image']"
                    :style="{
                        width: `${width}px`,
                        height: `${height}px`,
                        top: `${top}px`,
                        left: `${left}px`
                    }"
                >
            </section>
        </transition>
    </section>
</template>

<script>
    export default {
        name: 'bk-zoom-image',
        props: {
            src: String,
            extCls: String
        },

        data () {
            return {
                imgSrc: '',
                isInit: true,
                startMove: false,
                startTime: 0,
                startX: 0,
                startY: 0,
                width: 0,
                height: 0,
                top: 0,
                left: 0
            }
        },

        watch: {
            imgSrc (val) {
                if (val) {
                    this.isInit = true
                    this.width = 0
                    this.height = 0
                    this.top = 0
                    this.left = 0
                }
            }
        },

        methods: {
            startChange (event) {
                if (!this.isInit) return
                this.top = event.clientY - event.offsetY
                this.left = event.clientX - event.offsetX
                this.width = this.$refs.screenImg.clientWidth
                this.height = this.$refs.screenImg.clientHeight
                this.isInit = false
            },

            scrollImage (event) {
                const deltaY = Math.max(-1, Math.min(1, (event.wheelDeltaY || -event.detail)))
                const zoomDis = deltaY * 0.2
                this.startChange(event)
                this.width += this.width * zoomDis
                this.height += this.height * zoomDis
                this.top -= event.offsetY * zoomDis
                this.left -= event.offsetX * zoomDis
            },

            mouseDown (event) {
                event.preventDefault()
                this.startTime = new Date()
                this.startX = event.clientX
                this.startY = event.clientY
                this.startMove = true
                this.startChange(event)
            },

            mouseMove (event) {
                if (!this.startMove) return
                this.top += (event.clientY - (this.mouseMove.tempY || this.startY))
                this.left += (event.clientX - (this.mouseMove.tempX || this.startX))
                this.mouseMove.tempY = event.clientY
                this.mouseMove.tempX = event.clientX
            },

            mouseUp (event) {
                const diffTime = new Date() - this.startTime
                const diffDis = Math.sqrt((event.clientX - this.startX) ** 2 + (event.clientY - this.startY) ** 2)
                if (!this.startMove || (diffTime < 300 && diffDis < 20)) this.imgSrc = ''
                this.mouseMove.tempY = 0
                this.mouseMove.tempX = 0
                this.startMove = false
            }
        }
    }
</script>

<style>
    @import '../../ui/zoom-image.css';
</style>
