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
    <div :class="[
        extCls,
        'bk-resize-layout',
        `bk-resize-layout-${placement}`,
        {
            'bk-resize-layout-collapsed': collapsed,
            'bk-resize-layout-border': border
        }
    ]">
        <aside class="bk-resize-layout-aside" ref="aside" :style="computedAsideStyle">
            <div class="bk-resize-layout-aside-content" v-show="asideContentVisible">
                <slot name="aside"></slot>
            </div>
            <i class="bk-resize-trigger"
                v-show="!disabled && (!collapsed || autoMinimize)"
                :style="computedTriggerStyle"
                @mousedown.left="handleMousedown($event)">
            </i>
            <i :class="['bk-resize-proxy', placement]" ref="resizeProxy" v-show="!collapsed || autoMinimize"></i>
            <slot name="collapse-trigger" v-if="collapsible">
                <i class="bk-resize-collapse bk-icon icon-angle-left" @click="setCollapse"></i>
            </slot>
        </aside>
        <main class="bk-resize-layout-main">
            <slot name="main"></slot>
        </main>
        <div class="bk-resize-mask" ref="resizeMask"></div>
    </div>
</template>

<script>
    import { throttle } from 'throttle-debounce'
    import { addResizeListener, removeResizeListener } from '@/utils/resize-events'
    export default {
        name: 'bk-resize-layout',
        props: {
            placement: {
                default () {
                    return 'left'
                },
                validator (val) {
                    const placements = ['top', 'right', 'bottom', 'left']
                    return placements.includes(val)
                }
            },
            min: {
                type: Number,
                default: 3,
                validator (min) {
                    return min >= 3
                }
            },
            max: {
                type: Number,
                default: Infinity
            },
            triggerWidth: {
                type: Number,
                default: 5
            },
            triggerOffset: {
                type: Number,
                default: 3
            },
            initialDivide: {
                type: [String, Number],
                default: '20%'
            },
            immediate: Boolean,
            disabled: Boolean,
            collapsible: Boolean,
            autoMinimize: {
                type: [Boolean, Number],
                default: false
            },
            border: {
                type: Boolean,
                default: true
            },
            extCls: String
        },
        data () {
            return {
                collapsed: false,
                asideContentVisible: true,
                minimized: false,
                limitMax: null,
                state: {}
            }
        },
        computed: {
            vertical () {
                return ['left', 'right'].includes(this.placement)
            },
            computedStyleKey () {
                return this.vertical ? 'width' : 'height'
            },
            computedAsideStyle () {
                let divide = this.initialDivide
                if (typeof divide === 'number') {
                    divide = `${divide}px`
                }
                return {
                    [this.computedStyleKey]: divide
                }
            },
            computedTriggerStyle () {
                const style = {
                    [`margin-${this.placement}`]: `${this.triggerOffset - this.triggerWidth}px`,
                    [this.computedStyleKey]: `${this.triggerWidth}px`
                }
                return style
            },
            computedAutoMinimize () {
                if (this.autoMinimize) {
                    return typeof this.autoMinimize === 'boolean' ? 50 : this.autoMinimize
                }
                return 0
            }
        },
        mounted () {
            this.setupLimit()
            addResizeListener(this.$el, this.setupLimit)
        },
        beforeDestroy () {
            removeResizeListener(this.$el, this.setupLimit)
        },
        methods: {
            setupLimit () {
                const rect = this.$el.getBoundingClientRect()
                this.limitMax = this.vertical ? rect.width : rect.height
            },
            updateResizeProxyStyle () {
                const placement = this.placement
                const resizeProxy = this.$refs.resizeProxy
                resizeProxy.style.visibility = 'visible'
                switch (placement) {
                    case 'left':
                        resizeProxy.style.inset = `0 auto auto ${this.state.aside.width}px`
                        break
                    case 'right':
                        resizeProxy.style.inset = `0  ${this.state.aside.width}px auto auto`
                        break
                    case 'top':
                        resizeProxy.style.inset = `${this.state.aside.height}px auto auto 0`
                        break
                    case 'bottom':
                        resizeProxy.style.inset = `auto auto ${this.state.aside.height}px 0`
                        break
                }
            },
            updateResizeMaskStyle () {
                const resizeMask = this.$refs.resizeMask
                resizeMask.style.display = 'block'
                resizeMask.style.cursor = this.vertical ? 'col-resize' : 'row-resize'
            },
            getRealValue (current) {
                return Math.min(this.max, Math.max(this.min, current), this.limitMax - this.triggerWidth)
            },
            handleMousedown (event) {
                this.$emit('before-resize', event)
                const placement = this.placement
                const aside = this.$refs.aside
                const asideRect = aside.getBoundingClientRect()
                const resizeProxy = this.$refs.resizeProxy
                const resizeMask = this.$refs.resizeMask
                this.state = Object.freeze({
                    mouse: {
                        clientX: event.clientX,
                        clientY: event.clientY
                    },
                    aside: {
                        width: asideRect.width,
                        height: asideRect.height
                    }
                })
                this.updateResizeMaskStyle()
                if (!this.immediate) {
                    this.updateResizeProxyStyle()
                }
                document.onselectstart = () => {
                    return false
                }
                document.ondragstart = () => {
                    return false
                }

                const resizingCallback = throttle(100, value => this.$emit('resizing', value))
                const handleMouseMove = (event) => {
                    let delta
                    switch (placement) {
                        case 'top':
                            delta = event.clientY - this.state.mouse.clientY
                            break
                        case 'right':
                            delta = this.state.mouse.clientX - event.clientX
                            break
                        case 'bottom':
                            delta = this.state.mouse.clientY - event.clientY
                            break
                        case 'left':
                            delta = event.clientX - this.state.mouse.clientX
                    }
                    const current = this.state.aside[this.computedStyleKey] + delta
                    const realValue = this.getRealValue(current) + this.triggerOffset
                    const pixel = `${realValue}px`
                    if (this.immediate) {
                        aside.style[this.computedStyleKey] = pixel
                    } else {
                        resizeProxy.style[placement] = pixel
                    }
                    resizingCallback(realValue)
                }
                const handleMouseUp = (event) => {
                    resizingCallback.cancel()
                    resizeProxy.style.visibility = 'hidden'
                    resizeMask.style.display = 'none'
                    document.removeEventListener('mousemove', handleMouseMove)
                    document.removeEventListener('mouseup', handleMouseUp)
                    document.onselectstart = null
                    document.ondragstart = null
                    this.$nextTick(() => {
                        this.setupAutoMinimize()
                        this.$emit('after-resize', parseFloat(resizeProxy.style[placement], 10))
                    })
                    if (this.immediate) {
                        return false
                    }
                    aside.style[this.computedStyleKey] = resizeProxy.style[placement]
                }
                document.addEventListener('mousemove', handleMouseMove)
                document.addEventListener('mouseup', handleMouseUp)
            },
            setupAutoMinimize () {
                if (!this.autoMinimize) {
                    return false
                }
                const aside = this.$refs.aside
                const asideRect = aside.getBoundingClientRect()
                // 最小化同时设置为已折叠，此时展开以初始化initial-divide数据为参考
                this.minimized = this.collapsed = asideRect[this.computedStyleKey] <= this.computedAutoMinimize
                if (!this.minimized) {
                    this.asideContentVisible = true
                    return false
                }
                this.setupAsideAnimation()
                this.$nextTick(() => {
                    aside.setAttribute(`data-${this.computedStyleKey}`, this.computedAsideStyle[this.computedStyleKey])
                })
            },
            setCollapse (collapsed) {
                this.collapsed = typeof collapsed === 'boolean' ? collapsed : !this.collapsed
                this.setupAsideAnimation()
                this.$emit('collapse-change', this.collapsed)
            },
            setupAsideAnimation () {
                const aside = this.$refs.aside
                const asideRect = aside.getBoundingClientRect()
                this.setupAsideListener(!this.collapsed)
                if (this.collapsed) {
                    aside.setAttribute(`data-${this.computedStyleKey}`, asideRect[this.computedStyleKey] + 'px')
                    aside.style[this.computedStyleKey] = '5px'
                } else {
                    this.asideContentVisible = true
                    aside.style[this.computedStyleKey] = aside.getAttribute(`data-${this.computedStyleKey}`)
                }
            },
            setupAsideListener (asideContentVisible) {
                const aside = this.$refs.aside
                const removeClass = () => {
                    this.asideContentVisible = asideContentVisible
                    aside.style.transition = ''
                    aside.removeEventListener('transitionend', removeClass)
                }
                aside.addEventListener('transitionend', removeClass)
                aside.style.transition = `${this.computedStyleKey} cubic-bezier(0.4, 0, 0.2, 1) .3s`
            }
        }
    }
</script>

<style>
    @import '../../ui/resize-layout.css';
</style>
