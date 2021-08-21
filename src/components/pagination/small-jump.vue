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
    <div class="bk-page-small-jump">
        <div class="btn-pre" @click="handleStep(-1)" :class="{ disable: current === 1 }">
            <i class="bk-icon icon-left-shape" />
        </div>
        <bk-popover ref="smallJumpPopover"
            trigger="manual"
            placement="bottom-start"
            theme="light bk-select-dropdown"
            animation="slide-toggle"
            :offset="-1"
            :distance="12">
            <div :class="['jump-input-wrapper', { 'focus': focus }]" @click.prevent="showPopover">
                <span class="jump-input"
                    ref="jumpInput"
                    contenteditable
                    v-text="current"
                    @input="handleInputChange"
                    @blur="handleBlur"
                    @focus="() => focus = true"
                    @keydown="handleKeyDown" />
                <span :class="['page-total', { 'focus': focus }]">/ {{ total }}</span>
            </div>
            <div slot="content">
                <ul class="small-jump-options">
                    <li :class="['small-jump-option', { 'is-selected': current === index }]"
                        v-for="index in total" :key="index"
                        @mousedown="handleChangePage(index)">
                        {{index}}
                    </li>
                </ul>
            </div>
        </bk-popover>
        <div class="btn-next" @click="handleStep(1)" :class="{ disable: current === total }">
            <i class="bk-icon icon-right-shape" />
        </div>
    </div>
</template>
<script>
    import bkPopover from '@/components/popover'
    export default {
        name: 'small-jump',
        components: {
            bkPopover
        },
        props: {
            current: {
                type: Number,
                default: ''
            },
            total: {
                type: Number,
                default: 0
            }
        },
        data () {
            return {
                focus: false,
                currentPage: this.current
            }
        },
        watch: {
            current (value) {
                this.currentPage = value
            }
        },
        methods: {
            handleInputChange (event) {
                const $target = event.target
                const value = Number($target.textContent)
                // 无效值不抛出事件
                if (!value || value < 1 || value > this.total || (value === this.current)) return

                this.currentPage = value
                this.setSelection()
            },
            handleBlur () {
                if (this.currentPage !== this.current) {
                    this.$emit('on-change', this.currentPage)
                }
                this.focus = false
                this.$refs.jumpInput && (this.$refs.jumpInput.textContent = this.currentPage)
            },
            handleStep (step) {
                const nextStep = this.current + step
                if (nextStep > this.total) {
                    return
                }
                if (nextStep < 1) {
                    return
                }
                this.currentPage = nextStep
                this.$emit('on-change', this.currentPage)
            },
            handleChangePage (value) {
                // mousedown事件的优先级高于blur事件
                if (value === this.current) return this.hidePopover()

                this.currentPage = value
                if (!this.focus) {
                    this.handleBlur()
                }
                this.hidePopover()
            },
            getPopoverInstance () {
                return this.$refs.smallJumpPopover && this.$refs.smallJumpPopover.instance
            },
            hidePopover () {
                const instance = this.getPopoverInstance()
                instance && instance.hide()
            },
            showPopover () {
                const instance = this.getPopoverInstance()
                instance && instance.show()
            },
            // 重置光标到末尾
            setSelection () {
                this.$nextTick(() => {
                    const $input = this.$refs.jumpInput
                    $input.focus()
                    const range = window.getSelection()
                    range.selectAllChildren($input)
                    range.collapseToEnd()
                })
            },
            handleKeyDown (e) {
                // 阻止默认enter事件（keycode判断可能会被弃用）
                if (['Enter', 'NumpadEnter'].includes(e.code)) {
                    this.handleBlur()
                    this.setSelection()
                    this.focus = true
                    this.hidePopover()
                    e.preventDefault()
                    return false
                }
            }
        }
    }
</script>
