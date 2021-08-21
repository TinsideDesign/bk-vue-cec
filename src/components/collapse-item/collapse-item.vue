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
    <div class="bk-collapse-item"
        :class="{
            'bk-collapse-item-active': isActive,
            'is-disabled': disabled,
            [extCls]: true
        }">
        <div v-if="customTriggerArea" class="bk-collapse-item-header custom-trigger-layout">
            <div class="trigger-area bk-collapse-item-hover cursor-pointer" @click="toggle">
                <slot></slot>
            </div>
            <div class="no-trigger-area">
                <slot name="no-trigger"></slot>
            </div>
            <span class="custom-trigger-angle" :class="{ 'collapse-expand': isActive }" @click="toggle">
                <i class="bk-icon icon-angle-right" v-if="!hideArrow"></i>
            </span>
        </div>
        <div v-else class="bk-collapse-item-header bk-collapse-item-hover cursor-pointer" @click="toggle">
            <span class="fr" :class="{ 'collapse-expand': isActive }">
                <i class="bk-icon icon-angle-right" v-if="!hideArrow"></i>
            </span>
            <slot name="icon"></slot>
            <slot></slot>
        </div>
        <template v-if="calcRender">
            <transition
                name="collapse"
                @before-enter="beforeEnter"
                @enter="enter"
                @after-enter="afterEnter"
                @before-leave="beforeLeave"
                @leave="leave"
                @after-leave="afterLeave">
                <div class="bk-collapse-item-content" v-show="isActive && isShow">
                    <div class="bk-collapse-item-detail">
                        <slot name="content"></slot>
                    </div>
                </div>
            </transition>
        </template>
    </div>
</template>
<script>
    import { addClass, removeClass } from '@/utils/dom'

    export default {
        name: 'bk-collapse-item',
        inject: ['collapse'],
        props: {
            /**
             * 是否使用自定义触发区域配置
             * @value false 默认不使用，整行hover触发
             * @value true 使用自定义区域，no-trigger为不触发的区域
             */
            customTriggerArea: {
                type: Boolean,
                default: false
            },
            name: {
                type: String
            },
            hideArrow: {
                type: Boolean,
                default: false
            },
            // 外部设置的 class name
            extCls: {
                type: String,
                default: ''
            },

            /**
             * collapse-item 的content初始时是否渲染
             * @value none: 初始不渲染
             * @value hidden: 初始渲染，但是dispaly: none
             */
            contentHiddenType: {
                type: String,
                default: 'none'
            },
            // 是否禁用
            disabled: {
                type: Boolean,
                default: false
            }
        },

        data () {
            return {
                // 未设置 name 的时候，使用 index 作为默认 name
                index: 0,
                isRender: false,
                isShow: false
            }
        },
        computed: {
            calcRender () {
                return this.contentHiddenType === 'hidden' || this.isRender
            },
            isActive () {
                return this.collapse.currentActive.includes(this.name)
            }
        },
        watch: {
            isActive: {
                handler (isActive) {
                    if (!isActive) {
                        return
                    }
                    // 组件展开，处理首次渲染的场景
                    if (!this.isRender) {
                        this.isRender = true
                        this.$nextTick(() => {
                            // isShow用于isRender生效后完成高度变化动画
                            this.isShow = true
                        })
                    }
                },
                immediate: true
            }
        },
        created () {
            this.collapse.$emit('inject', this)
        },
        methods: {
            toggle () {
                if (this.disabled) return
                this.collapse.$emit('item-toggle', this)
            },

            beforeEnter (el) {
                this.$emit('before-enter')
                addClass(el, 'collapse-transition')
                if (!el.dataset) {
                    el.dataset = {}
                }

                el.dataset.oldPaddingTop = el.style.paddingTop
                el.dataset.oldPaddingBottom = el.style.paddingBottom

                el.style.height = '0'
                el.style.paddingTop = 0
                el.style.paddingBottom = 0
            },

            enter (el) {
                el.dataset.oldOverflow = el.style.overflow
                if (el.scrollHeight !== 0) {
                    el.style.height = el.scrollHeight + 'px'
                    el.style.paddingTop = el.dataset.oldPaddingTop
                    el.style.paddingBottom = el.dataset.oldPaddingBottom
                } else {
                    el.style.height = ''
                    el.style.paddingTop = el.dataset.oldPaddingTop
                    el.style.paddingBottom = el.dataset.oldPaddingBottom
                }

                el.style.overflow = 'hidden'
            },

            afterEnter (el) {
                removeClass(el, 'collapse-transition')
                el.style.height = ''
                el.style.overflow = el.dataset.oldOverflow
            },

            beforeLeave (el) {
                if (!el.dataset) el.dataset = {}
                el.dataset.oldPaddingTop = el.style.paddingTop
                el.dataset.oldPaddingBottom = el.style.paddingBottom
                el.dataset.oldOverflow = el.style.overflow

                el.style.height = el.scrollHeight + 'px'
                el.style.overflow = 'hidden'
            },

            leave (el) {
                if (el.scrollHeight !== 0) {
                    addClass(el, 'collapse-transition')
                    el.style.height = 0
                    el.style.paddingTop = 0
                    el.style.paddingBottom = 0
                }
            },

            afterLeave (el) {
                this.$emit('after-leave')
                removeClass(el, 'collapse-transition')
                el.style.height = ''
                el.style.overflow = el.dataset.oldOverflow
                el.style.paddingTop = el.dataset.oldPaddingTop
                el.style.paddingBottom = el.dataset.oldPaddingBottom
            }
        }
    }
</script>

<style>
    @import '../../ui/collapse-item.css';
</style>
