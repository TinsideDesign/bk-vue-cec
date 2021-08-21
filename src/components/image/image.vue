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
    <div class="bk-image">
        <slot v-if="loading" name="placeholder">
            <div class="bk-image-placeholder"><i class="bk-icon icon-image"></i></div>
        </slot>
        <slot v-else-if="error" name="error">
            <div class="bk-image-placeholder">
                <img v-if="fallback" :src="fallback">
                <i v-else class="bk-icon icon-image-fail"></i>
            </div>
        </slot>
        <img
            v-else
            class="bk-image-inner"
            v-bind="$attrs"
            v-on="$listeners"
            @click="clickHandler"
            :src="src"
            :style="imageStyle"
            :class="{ 'bk-image-inner-center': alignCenter, 'bk-image-preview': preview }">
        <template v-if="preview">
            <bk-image-viewer
                v-if="showViewer"
                :z-index="zIndex"
                :is-show-title="isShowPreviewTitle"
                :initial-index="imageIndex"
                :url-list="previewSrcList"
                :on-close="closeViewer"
            ></bk-image-viewer>
        </template>
    </div>
</template>

<script>
    import bkImageViewer from '@/components/image-viewer/'
    import locale from 'bk-magic-vue/lib/locale'
    import { addEvent, removeEvent, isInContainer } from '@/utils/dom'
    import { isString, isHtmlElement } from '@/utils/util'
    import { throttle } from 'throttle-debounce'

    const isSupportObjectFit = () => document.documentElement.style.objectFit !== undefined

    const ObjectFit = {
        NONE: 'none',
        CONTAIN: 'contain',
        COVER: 'cover',
        FILL: 'fill',
        SCALE_DOWN: 'scale-down'
    }

    let prevOverflow = ''

    export default {
        name: 'bk-image',

        components: {
            bkImageViewer
        },

        mixins: [locale.mixin],
        inheritAttrs: false,

        props: {
            src: String,
            fallback: String,
            fit: String,
            lazy: Boolean,
            scrollContainer: {
                type: Object,
                default: () => ({})
            },
            previewSrcList: {
                type: Array,
                default: () => []
            },
            isShowPreviewTitle: {
                type: Boolean,
                default: true
            },
            zIndex: {
                type: Number,
                default: 2000
            }
        },

        data () {
            return {
                loading: true,
                error: false,
                show: !this.lazy,
                imageWidth: 0,
                imageHeight: 0,
                showViewer: false
            }
        },

        computed: {
            imageStyle () {
                const { fit } = this
                if (!this.$isServer && fit) {
                    return isSupportObjectFit()
                        ? { 'object-fit': fit }
                        : this.getImageStyle(fit)
                }
                return {}
            },
            alignCenter () {
                return !this.$isServer && !isSupportObjectFit() && this.fit !== ObjectFit.FILL
            },
            preview () {
                const { previewSrcList } = this
                return Array.isArray(previewSrcList) && previewSrcList.length > 0
            },
            imageIndex () {
                let previewIndex = 0
                const srcIndex = this.previewSrcList.indexOf(this.src)
                if (srcIndex >= 0) {
                    previewIndex = srcIndex
                }
                return previewIndex
            }
        },

        watch: {
            src (val) {
                this.show && this.loadImage()
            },
            show (val) {
                val && this.loadImage()
            }
        },

        mounted () {
            if (this.lazy) {
                this.addLazyLoadListener()
            } else {
                this.loadImage()
            }
        },

        beforeDestroy () {
            this.lazy && this.removeLazyLoadListener()
        },

        methods: {
            loadImage () {
                if (this.$isServer) return

                // reset status
                this.loading = true
                this.error = false

                const img = new Image()
                img.onload = e => this.handleLoad(e, img)
                img.onerror = this.handleError.bind(this)

                // bind html attrs
                // so it can behave consistently
                Object.keys(this.$attrs)
                    .forEach((key) => {
                        const value = this.$attrs[key]
                        img.setAttribute(key, value)
                    })
                img.src = this.src
            },
            handleLoad (e, img) {
                this.imageWidth = img.width
                this.imageHeight = img.height
                this.loading = false
                this.error = false
            },
            handleError (e) {
                this.loading = false
                this.error = true
                this.$emit('error', e)
            },
            handleLazyLoad () {
                if (isInContainer(this.$el, this._scrollContainer)) {
                    this.show = true
                    this.removeLazyLoadListener()
                }
            },
            addLazyLoadListener () {
                if (this.$isServer) return

                const { scrollContainer } = this
                let _scrollContainer = null

                if (isHtmlElement(scrollContainer)) {
                    _scrollContainer = scrollContainer
                } else if (isString(scrollContainer)) {
                    _scrollContainer = document.querySelector(scrollContainer)
                } else {
                    if ([window, document, document.documentElement].includes(this.$el)) {
                        _scrollContainer = window
                    } else {
                        _scrollContainer = this.$el.parentNode
                    }
                }

                if (_scrollContainer) {
                    this._scrollContainer = _scrollContainer
                    this._lazyLoadHandler = throttle(200, this.handleLazyLoad)
                    addEvent(_scrollContainer, 'scroll', this._lazyLoadHandler)
                    this.handleLazyLoad()
                }
            },
            removeLazyLoadListener () {
                const { _scrollContainer, _lazyLoadHandler } = this

                if (this.$isServer || !_scrollContainer || !_lazyLoadHandler) return

                removeEvent(_scrollContainer, 'scroll', _lazyLoadHandler)
                this._scrollContainer = null
                this._lazyLoadHandler = null
            },
            /**
             * simulate object-fit behavior to compatible with IE11 and other browsers which not support object-fit
             */
            getImageStyle (fit) {
                const { imageWidth, imageHeight } = this
                const {
                    clientWidth: containerWidth,
                    clientHeight: containerHeight
                } = this.$el

                if (!imageWidth || !imageHeight || !containerWidth || !containerHeight) return {}

                const vertical = imageWidth / imageHeight < 1

                if (fit === ObjectFit.SCALE_DOWN) {
                    const isSmaller = imageWidth < containerWidth && imageHeight < containerHeight
                    fit = isSmaller ? ObjectFit.NONE : ObjectFit.CONTAIN
                }

                switch (fit) {
                    case ObjectFit.NONE:
                        return { width: 'auto', height: 'auto' }
                    case ObjectFit.CONTAIN:
                        return vertical ? { width: 'auto' } : { height: 'auto' }
                    case ObjectFit.COVER:
                        return vertical ? { height: 'auto' } : { width: 'auto' }
                    default:
                        return {}
                }
            },
            clickHandler () {
                // don't show viewer when preview is false
                if (!this.preview) {
                    return
                }
                // prevent body scroll
                prevOverflow = document.body.style.overflow
                document.body.style.overflow = 'hidden'
                this.showViewer = true
            },
            closeViewer () {
                document.body.style.overflow = prevOverflow
                this.showViewer = false
            }
        }
    }
</script>
<style>
@import "../../ui/image.css";
</style>
