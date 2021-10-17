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
    <div ref="root">
        <div ref="point" :class="{ 'bk-affix': affix }" :style="styles">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    /**
     * bk-affix
     * @module components/affix
     * @desc 图钉组件
     * @param offsetTop    {number}   距离顶部的偏移量 默认为'0'
     * @param offsetBottom {number}   距离底部的偏移量
     */
    // 兼容浏览器，添加事件监听器
    const on = (() => {
        if (document.addEventListener) {
            return (element, event, handler) => {
                if (element && event && handler) {
                    element.addEventListener(event, handler, true)
                }
            }
        } else {
            return (element, event, handler) => {
                if (element && event && handler) {
                    element.attachEvent('on' + event, handler)
                }
            }
        }
    })()
    // 兼容浏览器，移除事件监听器
    const off = (() => {
        if (document.removeEventListener) {
            return (element, event, handler) => {
                if (element && event) {
                    element.removeEventListener(event, handler, true)
                }
            }
        } else {
            return (element, event, handler) => {
                if (element && event) {
                    element.detachEvent('on' + event, handler)
                }
            }
        }
    })()
    export default {
        name: 'bk-affix',
        props: {
            offsetTop: {
                type: Number,
                default: 0
            },
            offsetBottom: {
                type: Number
            },
            target: {
                type: String,
                default: ''
            },
            zIndex: {
                type: Number,
                default: 1000
            }
        },
        data () {
            return {
                affix: false,
                styles: {}
            }
        },
        computed: {
            offsetType () {
                let type = 'top'
                if (this.offsetBottom >= 0) {
                    type = 'bottom'
                }
                return type
            }
        },
        mounted () {
            this.targetEl = this.target ? document.querySelector(this.target) : window
            this.$refs.point.style.zIndex = this.zIndex
            on(this.targetEl, 'scroll', this.listenScroll)
            on(this.targetEl, 'resize', this.listenScroll)
            this.$nextTick(() => {
                this.handleScroll()
            })
        },
        beforeDestroy () {
            off(this.targetEl, 'scroll', this.listenScroll)
            off(this.targetEl, 'resize', this.listenScroll)
            off(window, 'scroll', this.setTargetLoop)
        },
        methods: {
            // 解决设置滚动容器时window滚动Affix对象已固定不随滚的问题
            setTargetLoop () {
                if (this.offsetType === 'top') {
                    this.styles = {
                        top: `${this.targetEl.getBoundingClientRect().top + this.offsetTop}px`
                    }
                } else {
                    this.styles = {
                        bottom: `${window.innerHeight - this.targetEl.getBoundingClientRect().bottom + this.offsetBottom}px`
                    }
                }
            },
            // 监听函数
            listenScroll () {
                this.throttle(this.handleScroll, 100)
            },
            // 滚动节流处理
            throttle (method, delay) {
                let previous = 0
                let timer = null
                const now = new Date()
                const self = this
                const interval = delay - (now - previous)
                const args = arguments
                if (interval <= 0) {
                    method.apply(self, ...args)
                    previous = new Date()
                } else if (!timer) {
                    timer = setTimeout(() => {
                        clearTimeout(timer)
                        timer = null
                        method.apply(self, ...args)
                        previous = new Date()
                    }, interval)
                }
            },
            // 获取元素到浏览器边缘的距离
            getOffset (element) {
                const rect = element.getBoundingClientRect()
                const rect2 = this.targetEl === window ? { top: 0, left: 0 } : this.targetEl.getBoundingClientRect()
                const clientTop = this.targetEl.clientTop || 0
                const clientLeft = this.targetEl.clientLeft || 0
                return {
                    top: rect.top - rect2.top - clientTop,
                    left: rect.left - rect2.left - clientLeft
                }
            },
            handleScroll () {
                const rect = this.targetEl === window ? { top: 0, left: 0, bottom: window.innerHeight } : this.targetEl.getBoundingClientRect()
                const elOffset = this.getOffset(this.$refs.root)
                const windowHeight = this.targetEl === window ? this.targetEl.innerHeight : this.targetEl.clientHeight
                const elHeight = this.$refs.point.offsetHeight
                // Fixed Top
                if (elOffset.top < this.offsetTop && this.offsetType === 'top' && !this.affix) {
                    this.affix = true
                    this.styles = {
                        position: 'fixed',
                        top: `${rect.top + this.offsetTop}px`,
                        left: `${rect.left + elOffset.left}px`,
                        width: `${this.$el.offsetWidth}px`
                    }
                    if (this.targetEl !== window) {
                        on(window, 'scroll', this.setTargetLoop)
                    }
                    this.$emit('change', true)
                } else if (elOffset.top > this.offsetTop && this.offsetType === 'top' && this.affix) {
                    this.affix = false
                    this.styles = null
                    this.$emit('change', false)
                }
                // Fixed Bottom
                if ((elOffset.top + this.offsetBottom + elHeight) > windowHeight && this.offsetType === 'bottom' && !this.affix) {
                    this.affix = true
                    this.styles = {
                        bottom: `${window.innerHeight - rect.bottom + this.offsetBottom}px`,
                        left: `${rect.left + elOffset.left}px`,
                        width: `${this.$el.offsetWidth}px`
                    }
                    if (this.targetEl !== window) {
                        on(window, 'scroll', this.setTargetLoop)
                    }
                    this.$emit('change', true)
                } else if ((elOffset.top + this.offsetBottom + elHeight) < windowHeight && this.offsetType === 'bottom' && this.affix) {
                    this.affix = false
                    this.styles = null
                    this.$emit('change', false)
                }
            }
        }
    }
</script>
<style>
    @import '../../ui/affix.css';
</style>
