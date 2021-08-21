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
    <section>
        <h2>
            <i href="javascript:void(0)" class="back-icon bk-icon icon-arrows-left" @click="back"></i>
            Input 输入框更多示例
        </h2>
        <div class="example-item">
            <bk-input v-model="value" :clearable="true"
                @change="handleChange"
                @enter="handleEnter"
                @keyup="handleKeyup"
                @keypress="handleKeypress"
                @keydown="handleKeydown"
                @focus="handleFocus"
                @blur="handleBlur"
                @paste="handlePaste"
                @clear="handleClear"
                @input="handleInput">
            </bk-input>
        </div>
    </section>
</template>

<script>
    import { bkInput } from '@'
    export default {
        components: {
            bkInput
        },
        data () {
            return {
                value: ''
            }
        },
        methods: {
            back () {
                window.history.go(-1)
            },
            handleChange (value, event) {
                console.log('change', value, event)
            },
            handleInput (value, event) {
                console.log('input', value, event)
            },
            handleEnter (value, event) {
                console.log('enter', value, event)
            },
            handleKeyup (value, event) {
                console.log('keyup', value, event)
            },
            handleKeypress (value, event) {
                console.log('keypress', value, event)
            },
            handleKeydown (value, event) {
                console.log('keydown', value, event)
            },
            handleFocus (value, event) {
                console.log('focus', value, event)
            },
            handleBlur (value, event) {
                console.log('blur', value, event)
            },
            handlePaste (value, event) {
                console.log('paste', value, event)
            },
            handleClear (value, event) {
                console.log('clear', value, event)
            }
        }
    }
</script>
