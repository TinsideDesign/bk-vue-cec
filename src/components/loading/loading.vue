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
    <transition name="fade" :duration="{ enter: duration }" @after-leave="animationFinish">
        <div class="bk-loading" :class="extCls" v-show="isShow"
            :style="{
                position: type === 'directive' ? 'absolute' : 'fixed',
                zIndex,
                backgroundColor: bgColor
            }">
            <div class="bk-loading-wrapper">
                <div :class="computedClass">
                    <template v-if="isSpin">
                        <div class="rotate rotate1"></div>
                        <div class="rotate rotate2"></div>
                        <div class="rotate rotate3"></div>
                        <div class="rotate rotate4"></div>
                        <div class="rotate rotate5"></div>
                        <div class="rotate rotate6"></div>
                        <div class="rotate rotate7"></div>
                        <div class="rotate rotate8"></div>
                    </template>
                    <template v-else>
                        <div class="point point1"></div>
                        <div class="point point2"></div>
                        <div class="point point3"></div>
                        <div class="point point4"></div>
                    </template>
                </div>
                <div class="bk-loading-title">
                    <slot>{{title}}</slot>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
    /**
     *  bk-loading
     *  @module components/loading
     *  @desc 加载组件
     *  @param title {String，VNode} - 加载时的文案显示
     *  @example
        this.$bkLoading() or
        this.$bkLoading('加载中') or
        this.$bkLoading({
          title: this.$createElement('span', '加载中')
        })
     */
    import zIndexManager from '@/utils/z-index-manager.js'

    export default {
        name: 'bk-loading',
        data () {
            return {
                timer: 0,
                opacity: -1,
                color: '#ffffff',
                isShow: false,
                hide: false,
                title: '',
                type: 'full',
                size: 'large',
                theme: 'colorful',
                delay: 0,
                zIndex: 0,
                hasZIndexOption: false,
                extCls: '',
                mode: 'normal',
                duration: 500
            }
        },
        computed: {
            isSpin () {
                return this.mode === 'spin'
            },
            bgColor () {
                const color = this.color.replace(/\s/gm, '')
                if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(color)) {
                    let colors = color.substring(1).split('')
                    if (colors.length === 3) {
                        colors = [colors[0], colors[0], colors[1], colors[1], colors[2], colors[2]]
                    }
                    colors = '0x' + colors.join('')
                    return 'rgba(' + [(colors >> 16) & 255, (colors >> 8) & 255, colors & 255].join(',') + `,${this.opacity})`
                } else if (/^rgba?\(([^\)]+)\)/.test(color)) {
                    return color.replace(/^rgb\(([^\)]+)\)/, `rgba($1,${this.opacity})`)
                }
                return this.color
            },
            computedClass () {
                return this.isSpin
                    ? `bk-spin-loading bk-spin-loading-${this.size} bk-spin-loading-${this.theme}`
                    : `bk-loading1 bk-${this.theme} bk-size-${this.size}`
            }
        },
        watch: {
            hide (newVal) {
                if (newVal) {
                    const delay = isNaN(this.delay) ? 0 : Number(this.delay)
                    clearTimeout(this.timer)
                    if (delay > 0) {
                        this.timer = setTimeout(() => {
                            this.hideLoading()
                        }, delay)
                    } else {
                        this.hideLoading()
                    }
                }
            },
            isShow (newVal) {
                if (newVal && !this.hasZIndexOption) {
                    this.zIndex = zIndexManager.nextZIndex()
                }
            }
        },
        mounted () {
            this.hide = false
        },
        methods: {
            hideLoading () {
                this.isShow = false
                this.$el.addEventListener('transitionend', this.destroyEl)
            },
            destroyEl () {
                this.$el.removeEventListener('transitionend', this.destroyEl)
                this.$destroy()
                this.$el.parentNode.removeChild(this.$el)
            },
            /**
             * .bk-dialog after-leave 回调，弹框消失的动画结束后触发
             */
            animationFinish () {
                if (this.afterLeave && typeof this.afterLeave === 'function') {
                    this.afterLeave()
                }
            }
        }
    }
</script>
<style>
    @import '../../ui/loading.css';
</style>
