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
    <div class="bk-picker-confirm" @keydown.tab.capture="handleTab">
        <a href="javascript: void(0);" class="bk-picker-confirm-time" :disabled="timeDisabled" v-if="showTime" @click="handleToggleTime">{{labels.time}}</a>
        <a href="javascript: void(0);" v-if="clearable" @click="handleClear" @keydown="handleClear">{{labels.clear}}</a>
        <a href="javascript: void(0);" class="confirm" @click="handleSuccess" @keydown.enter="handleSuccess">{{labels.ok}}</a>
    </div>
</template>
<script>
    import emitter from '@/mixins/emitter'
    import locale from 'bk-magic-vue/lib/locale'

    export default {
        mixins: [emitter, locale.mixin],
        props: {
            showTime: {
                type: Boolean,
                default: false
            },
            isTime: {
                type: Boolean,
                default: false
            },
            timeDisabled: {
                type: Boolean,
                default: false
            },
            clearable: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            labels () {
                return {
                    time: this.isTime ? this.t('bk.datePicker.selectDate') : this.t('bk.datePicker.selectTime'),
                    clear: this.t('bk.datePicker.clear'),
                    ok: this.t('bk.datePicker.ok')
                }
            }
        },
        methods: {
            handleClear () {
                this.$emit('pick-clear')
            },
            handleSuccess () {
                this.$emit('pick-success')
            },
            handleToggleTime () {
                if (this.timeDisabled) {
                    return
                }
                this.$emit('pick-toggle-time')
                this.dispatch('bk-date-picker', 'focus-input')
            },
            handleTab (e) {
                const tabbables = [...this.$el.children]
                const expectedFocus = tabbables[e.shiftKey ? 'shift' : 'pop']()

                if (document.activeElement === expectedFocus) {
                    e.preventDefault()
                    e.stopPropagation()
                    this.dispatch('bk-date-picker', 'focus-input')
                }
            }
        }
    }
</script>
