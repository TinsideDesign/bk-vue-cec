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
    <transition name="bk-zoom">
        <div tabindex="-1" ref="bk-image-viewer-wrapper" class="bk-image-viewer-wrapper"
            :style="{ 'z-index': zIndex }">
            <div v-if="isShowTitle && urlList.length" class="bk-image-viewer-header">
                <div>{{currentName}}</div>
                <div class="tc">{{index + 1}}/{{urlList.length}}</div>
                <div class="quit-box tr">
                    <div class="quit-tips mr10">{{t('bk.imageViewer.quitTips')}}</div>
                    <!-- CLOSE -->
                    <div class="bk-image-viewer-close" @click="hide">
                        <i class="bk-icon icon-close"></i>
                    </div>
                </div>
            </div>
            <!-- ARROW -->
            <template v-if="!isSingle">
                <div
                    class="bk-image-viewer-btn bk-image-viewer-prev"
                    :class="{ 'is-disabled': !infinite && isFirst }"
                    @click="prev">
                    <i class="bk-icon icon-angle-left" />
                </div>
                <div
                    class="bk-image-viewer-btn bk-image-viewer-next"
                    :class="{ 'is-disabled': !infinite && isLast }"
                    @click="next">
                    <i class="bk-icon icon-angle-right" />
                </div>
            </template>
            <!-- ACTIONS -->
            <div class="bk-image-viewer-btn bk-image-viewer-actions">
                <div class="bk-image-viewer-actions-inner">
                    <i class="bk-icon icon-narrow-line" @click="handleActions('zoomOut')"></i>
                    <i class="bk-icon icon-enlarge-line" @click="handleActions('zoomIn')"></i>
                    <i class="bk-icon icon-normalized" @click="toggleMode('original')"></i>
                    <i class="bk-icon icon-left-turn-line" @click="handleActions('anticlocelise')"></i>
                    <i class="bk-icon icon-right-turn-line" @click="handleActions('clocelise')"></i>
                    <i class="bk-icon icon-unfull-screen" @click="toggleMode('contain')"></i>
                </div>
            </div>
            <!-- CANVAS -->
            <div class="bk-image-viewer-canvas" :class="{ 'bk-image-viewer-has-header': isShowTitle }">
                <div class="bk-image-viewer-error" v-if="error">
                    <div><i class="bk-icon icon-image-fail"></i></div>
                    <div>{{t('bk.imageViewer.loadFailed')}}</div>
                </div>
                <img
                    v-for="(url, i) in urlList"
                    v-if="i === index"
                    :key="url"
                    v-show="!error"
                    ref="img"
                    class="bk-image-viewer-img"
                    :src="currentImg"
                    :style="imgStyle"
                    @load="handleImgLoad"
                    @error="handleImgError"
                    @mousedown="handleMouseDown" />
            </div>
        </div>
    </transition>
</template>

<script>
    import { addEvent, removeEvent } from '@/utils/dom'
    import locale from 'bk-magic-vue/lib/locale'
    // import { throttle } from 'throttle-debounce'
    function rafThrottle (fn) {
        let locked = false
        return function (...args) {
            if (locked) return
            locked = true
            window.requestAnimationFrame(_ => {
                fn.apply(this, args)
                locked = false
            })
        }
    }
    export default {
        name: 'bk-image-viewer',
        mixins: [locale.mixin],
        props: {
            urlList: {
                type: Array,
                default: () => []
            },
            zIndex: {
                type: Number,
                default: 2000
            },
            onSwitch: {
                type: Function,
                default: () => {
                }
            },
            onClose: {
                type: Function,
                default: () => {
                }
            },
            isShowTitle: {
                type: Boolean,
                default: true
            },
            initialIndex: {
                type: Number,
                default: 0
            }
        },

        data () {
            return {
                name: '',
                index: this.initialIndex,
                isShow: false,
                infinite: true,
                loading: false,
                error: false,
                mode: 'contain',
                transform: {
                    scale: 1,
                    deg: 0,
                    offsetX: 0,
                    offsetY: 0,
                    enableTransition: false
                }
            }
        },
        computed: {
            isSingle () {
                return this.urlList.length <= 1
            },
            isFirst () {
                return this.index === 0
            },
            isLast () {
                return this.index === this.urlList.length - 1
            },
            currentImg () {
                return this.urlList[this.index]
            },
            currentName () {
                const arr = this.currentImg.split('/')
                return arr[arr.length - 1]
            },
            imgStyle () {
                const { scale, deg, offsetX, offsetY, enableTransition } = this.transform
                const style = {
                    transform: `scale(${scale}) rotate(${deg}deg)`,
                    transition: enableTransition ? 'transform .3s' : '',
                    'margin-left': `${offsetX}px`,
                    'margin-top': `${offsetY}px`
                }
                if (this.mode === 'contain') {
                    style.maxWidth = style.maxHeight = '100%'
                }
                return style
            }
        },
        watch: {
            index: {
                handler: function (val) {
                    this.reset()
                    this.onSwitch(val)
                    this.$emit('change', val)
                }
            },
            currentImg (val) {
                this.$nextTick(_ => {
                    const $img = this.$refs.img[0]
                    if (!$img.complete) {
                        this.loading = true
                    }
                })
            }
        },
        mounted () {
            this.deviceSupportInstall()
            // add tabindex then wrapper can be focusable via Javascript
            // focus wrapper so arrow key can't cause inner scroll behavior underneath
            this.$refs['bk-image-viewer-wrapper'].focus()
        },
        methods: {
            hide () {
                this.deviceSupportUninstall()
                this.onClose()
                this.$emit('hide')
            },
            deviceSupportInstall () {
                this._keyDownHandler = rafThrottle(e => {
                    const keyCode = e.keyCode
                    switch (keyCode) {
                        // ESC
                        case 27:
                            this.hide()
                            break
                        // SPACE
                        case 32:
                            this.toggleMode()
                            break
                        // LEFT_ARROW
                        case 37:
                            this.prev()
                            break
                        // UP_ARROW
                        case 38:
                            this.handleActions('zoomIn')
                            break
                        // RIGHT_ARROW
                        case 39:
                            this.next()
                            break
                        // DOWN_ARROW
                        case 40:
                            this.handleActions('zoomOut')
                            break
                    }
                })
                this._mouseWheelHandler = rafThrottle(e => {
                    const delta = e.wheelDelta ? e.wheelDelta : -e.detail
                    if (delta > 0) {
                        this.handleActions('zoomIn', {
                            zoomRate: 0.015,
                            enableTransition: false
                        })
                    } else {
                        this.handleActions('zoomOut', {
                            zoomRate: 0.015,
                            enableTransition: false
                        })
                    }
                })
                addEvent(document, 'keydown', this._keyDownHandler)
                addEvent(document, 'mousewheel', this._mouseWheelHandler)
            },
            deviceSupportUninstall () {
                removeEvent(document, 'keydown', this._keyDownHandler)
                removeEvent(document, 'mousewheel', this._mouseWheelHandler)
                this._keyDownHandler = null
                this._mouseWheelHandler = null
            },
            handleImgLoad (e) {
                this.loading = false
                this.error = false
            },
            handleImgError (e) {
                this.error = true
                this.loading = false
                e.target.alt = '加载失败'
            },
            handleMouseDown (e) {
                if (this.loading || e.button !== 0) return

                const { offsetX, offsetY } = this.transform
                const startX = e.pageX
                const startY = e.pageY
                this._dragHandler = rafThrottle(ev => {
                    this.transform.offsetX = offsetX + ev.pageX - startX
                    this.transform.offsetY = offsetY + ev.pageY - startY
                })
                addEvent(document, 'mousemove', this._dragHandler)
                addEvent(document, 'mouseup', ev => {
                    removeEvent(document, 'mousemove', this._dragHandler)
                })

                e.preventDefault()
            },
            reset () {
                this.transform = {
                    scale: 1,
                    deg: 0,
                    offsetX: 0,
                    offsetY: 0,
                    enableTransition: false
                }
            },
            toggleMode (modeNames) {
                if (this.loading) return
                this.mode = modeNames
                this.reset()
            },
            prev () {
                if (this.isFirst && !this.infinite) return
                const len = this.urlList.length
                this.index = (this.index - 1 + len) % len
            },
            next () {
                if (this.isLast && !this.infinite) return
                const len = this.urlList.length
                this.index = (this.index + 1) % len
            },
            handleActions (action, options = {}) {
                if (this.loading) return
                const { zoomRate, rotateDeg, enableTransition } = {
                    zoomRate: 0.2,
                    rotateDeg: 90,
                    enableTransition: true,
                    ...options
                }
                const { transform } = this
                switch (action) {
                    case 'zoomOut':
                        if (transform.scale > 0.2) {
                            transform.scale = parseFloat((transform.scale - zoomRate).toFixed(3))
                        }
                        break
                    case 'zoomIn':
                        transform.scale = parseFloat((transform.scale + zoomRate).toFixed(3))
                        break
                    case 'clocelise':
                        transform.deg += rotateDeg
                        break
                    case 'anticlocelise':
                        transform.deg -= rotateDeg
                        break
                }
                transform.enableTransition = enableTransition
            }
        }
    }
</script>
<style>
@import "../../ui/image-viewer.css";
</style>
