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
    <transition name="slide">
        <article :data-transfer="transfer" v-transfer-dom class="bk-sideslider" :class="extCls" :style="{ zIndex: localZIndex }" v-if="isShow" @mousedown.self="handleQuickClose">
            <section class="bk-sideslider-wrapper" :class="[{ left: direction === 'left', right: direction === 'right' }]" :style="{ width: width + 'px' }">
                <div class="bk-sideslider-header">
                    <div class="bk-sideslider-closer" @click="handleClose" :style="{ float: calcDirection }">
                        <i class="bk-icon" :class="'icon-angle-' + direction"></i>
                    </div>
                    <div class="bk-sideslider-title" :style="{ padding: calcDirection === 'left' ? '0 0 0 50px' : '0 0 0 30px' }">
                        <slot name="header">
                            {{title || t('bk.sideslider.title')}}
                        </slot>
                    </div>
                </div>
                <div class="bk-sideslider-content" ref="content" :style="{ maxHeight: $slots.footer ? 'calc(100vh - 114px)' : 'calc(100vh - 60px)' }">
                    <slot name="content"></slot>
                </div>
                <div class="bk-sideslider-footer"
                    v-if="$slots.footer"
                    :style="{ borderTopColor: !needBorder ? 'transparent' : '#dcdee5', backgroundColor: !needBorder ? '#fafbfd' : '#ffffff' }">
                    <slot name="footer"></slot>
                </div>
            </section>
        </article>
    </transition>
</template>
<script>
    /**
     *  bk-sideslider
     *  @module components/side-slider
     *  @desc 滑动侧边栏组件
     *  @param isShow {Boolean} - 是否显示组件，默认为false；支持.sync修饰符
     *  @param title {String} - 组件标题
     *  @param quickClose {Boolean} - 是否支持点击遮罩关闭组件，默认为false
     *  @param width {String} - 组件的宽度，支持5% ~ 100%，步长为5%的值，默认为40%
     *  @param direction {String} - 组件滑出的方向，可选left，right；默认为right
     *  @param beforeClose {Function} - 关闭钩子函数
     *  @example
     *  <bk-sideslider
          :is-show.sync="isShow"
          :title="'测试标题'"
          :width="'80%'"
          :direction="'left'">
        </bk-sideslider>
     */
    import { addClass, removeClass } from '@/utils/util'
    import locale from 'bk-magic-vue/lib/locale'
    import { addResizeListener, removeResizeListener } from '@/utils/resize-events'
    import zIndexManager from '@/utils/z-index-manager.js'
    import popManager from '@/utils/pop-manager.js'
    import transferDom from '@/directives/transfer-dom'

    export default {
        name: 'bk-sideslider',
        directives: {
            transferDom
        },
        mixins: [locale.mixin],
        props: {
            isShow: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: ''
            },
            quickClose: {
                type: Boolean,
                default: false
            },
            showMask: {
                type: Boolean,
                default: true
            },
            width: {
                type: Number,
                default: 400
            },
            beforeClose: {
                type: Function,
                default: (res) => {
                    return true
                }
            },
            direction: {
                type: String,
                default: 'right',
                validator (value) {
                    return [
                        'left',
                        'right'
                    ].indexOf(value) > -1
                }
            },
            // 外部设置的 class name
            extCls: {
                type: String,
                default: ''
            },
            zIndex: {
                type: [Number, String],
                default: 'default'
            },

            /**
             * 是否允许多个弹框同时存在
             *  */
            multiInstance: {
                type: Boolean,
                default: true
            },
            transfer: {
                type: Boolean,
                default: false
            },

            appendToBody: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                needBorder: false,
                localZIndex: zIndexManager.nextTickIndex(2),
                popUid: ''
            }
        },
        computed: {
            calcDirection () {
                return this.direction === 'left' ? 'right' : 'left'
            }
        },
        watch: {
            isShow (val) {
                // 有动画效果，因此推迟发布事件
                const root = document.documentElement
                if (val) {
                    this.localZIndex = zIndexManager.nextTickIndex(2)
                    addClass(root, 'bk-sideslider-show')
                    if (this.isScrollY()) {
                        addClass(root, 'has-sideslider-padding')
                    }
                    if (this.showMask) {
                        this.generatePopUid()
                    }
                    setTimeout(() => {
                        this.$emit('shown')
                    }, 200)
                } else {
                    removeClass(root, 'bk-sideslider-show has-sideslider-padding')
                    if (this.popUid) {
                        popManager.hide(this.popUid)
                        this.popUid = ''
                    }
                    setTimeout(() => {
                        this.$emit('hidden')
                    }, 200)
                }
            }
        },
        mounted () {
            if (this.$refs.content && this.showMask) {
                this.generatePopUid()
                addResizeListener(this.$refs.content, this.handleContentResize)
            }
        },
        destroyed () {
            const root = document.querySelector('html')
            removeClass(root, 'bk-sideslider-show')
            removeResizeListener(this.$refs.content, this.handleContentResize)
        },
        beforeDestroy () {
            this.isShow && this.popUid && popManager.hide(this.popUid)
        },
        methods: {
            generatePopUid () {
                this.popUid = popManager.show('bk-sideslider', this.$el, {
                    zIndex: this.localZIndex - 1,
                    tplAction: (this.multiInstance && 'keepAll') || 'onlyone',
                    appendToBody: this.transfer
                })
            },

            isScrollY () {
                return document.documentElement.offsetHeight > document.documentElement.clientHeight
            },
            show () {
                // 监听isShow，显示组件时，将页面垂直滚动条隐藏，关闭组件时再恢复
                const root = document.documentElement
                addClass(root, 'bk-sideslider-show')
                this.isShow = true
            },
            hide () {
                const root = document.querySelector('html')
                removeClass(root, 'bk-sideslider-show')
                this.isShow = false
            },
            async handleClose () {
                let shouldClose = true
                if (typeof this.beforeClose === 'function') {
                    shouldClose = await this.beforeClose()
                }
                if (shouldClose) {
                    this.$emit('update:isShow', false)
                    setTimeout(() => {
                        this.$emit('animation-end')
                    }, 250)
                }
            },
            handleQuickClose () {
                if (this.quickClose) {
                    this.handleClose()
                }
            },
            handleContentResize () {
                const ref = this.$refs.content
                this.needBorder = ref.scrollHeight > ref.clientHeight
            }
        }
    }
</script>
<style>
    @import '../../ui/sideslider.css';
</style>
