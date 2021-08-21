<!--
 * Tencent is pleased to support the open source community by making
 * 科技内在设计（T-inside） available.
 *
 * Copyright (C) 2021 TID Limited, a DAO.  All rights reserved.
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
    <div class="demo-block" :class="[blockClass, { 'hover': hovering }]" @mouseenter="hovering = true" @mouseleave="hovering = false">
        <slot name="source"></slot>
        <div class="description">
            <div class="slot-wrapper">
                <slot v-if="$slots.default"></slot>
            </div>
            <div class="trigger-wrapper">
                <bk-button :text="true" title="primary" @click="toggle($event)">
                    {{isExpanded ? '隐藏' : '显示'}}代码
                </bk-button>
            </div>
        </div>
        <div class="meta" ref="meta">
            <span @click="codeCopy($event, 'demo')" class="code-copy bk-icon icon-script-files" title="复制代码"></span>
            <slot name="highlight"></slot>
        </div>
    </div>
</template>

<script>
    import { bkButton } from '@'
    export default {
        components: {
            bkButton
        },
        data () {
            return {
                hovering: false,
                isExpanded: false
            }
        },
        computed: {
            blockClass () {
                return `demo-${this.$route.name}`
            },

            codeArea () {
                return this.$el.querySelector('.meta')
            },

            codeAreaHeight () {
                return this.$el.querySelector('.highlight').clientHeight
            }
        },
        watch: {
            isExpanded (val) {
                this.codeArea.style.height = val ? `${this.codeAreaHeight + 1}px` : 0
            }
        },
        methods: {
            toggle (e) {
                this.isExpanded = !this.isExpanded
                // 收起
                if (!this.isExpanded) {
                    return
                }
                const target = e.target
                let codeBlockNode
                if (target.tagName.toUpperCase() === 'BUTTON') {
                    codeBlockNode = target.parentNode.parentNode.parentNode
                } else {
                    codeBlockNode = target.parentNode.parentNode.parentNode.parentNode
                }
                this.$nextTick(() => {
                    window.scrollTo({
                        top: codeBlockNode.getBoundingClientRect().top + document.documentElement.scrollTop - 62,
                        behavior: 'smooth'
                    })
                })
            },

            codeCopy (e) {
                const code = e.target.parentNode.querySelector('code').innerText
                const el = document.createElement('textarea')
                el.value = code
                el.setAttribute('readonly', '')
                el.style.position = 'absolute'
                el.style.left = '-9999px'
                document.body.appendChild(el)
                const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false
                el.select()
                document.execCommand('copy')
                document.body.removeChild(el)
                if (selected) {
                    document.getSelection().removeAllRanges()
                    document.getSelection().addRange(selected)
                }
                this.$bkMessage({ theme: 'primary', message: '代码复制成功', delay: 2000, dismissable: false })
            }
        }
    }
</script>

<style lang="postcss">
    @import './css/code-block.css';
</style>
