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
        <h2 style="display: flex;align-items: center;">
            <a href="javascript:void(0);" class="back-icon bk-icon icon-arrows-left" @click="back"></a>
            <span style="margin-left: 8px;">ColorPicker 颜色选择器更多示例</span>
        </h2>
        <h3>控制颜色面板出现在 body 内</h3>
        <bk-color-picker v-model="color" transfer></bk-color-picker>
        <h3>禁用状态</h3>
        <bk-color-picker v-model="color" disabled></bk-color-picker>
        <h3>只读状态</h3>
        <bk-color-picker v-model="color" readonly></bk-color-picker>
    </section>
</template>

<script>
    import { bkColorPicker } from '@'

    export default {
        components: {
            bkColorPicker
        },
        data () {
            return {
                color: ''
            }
        },
        methods: {
            back () {
                window.history.go(-1)
            }
        }
    }
</script>
