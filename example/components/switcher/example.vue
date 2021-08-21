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
            Switch 时间选择器更多示例
        </h2>
        <div class="example-item">
            <div class="inner">
                <p><span class="bk-text-minor">带文字</span></p>
                <bk-switcher v-model="isSelected" :show-text="showText"></bk-switcher>
            </div>
            <div class="inner">
                <p><span class="bk-text-minor">自定义文字</span></p>
                <bk-switcher v-model="isSelected" :show-text="showText" :on-text="'开'" :off-text="'关'"></bk-switcher>
            </div>
        </div>
        <div class="example-item">
            <div class="inner">
                <p><span class="bk-text-minor">回调事件</span></p>
                <bk-switcher v-model="isSelected" :show-text="showText" @change="change"></bk-switcher>
            </div>
            <div class="inner">
                <p><span class="bk-text-minor">方形 outline</span></p>
                <bk-switcher v-model="isSelected" :is-outline="true" :is-square="true" :show-text="true"></bk-switcher>
            </div>
            <div class="inner">
                <p><span class="bk-text-minor">方形</span></p>
                <bk-switcher v-model="isSelected" :is-outline="false" :is-square="true" :show-text="true"></bk-switcher>
            </div>
        </div>
    </section>
</template>

<script>
    import { bkSwitcher } from '@'
    export default {
        components: {
            bkSwitcher
        },
        data () {
            return {
                isSelected: true,
                isDisabled: true,
                isOutline: true,
                isSquare: true,
                showText: true
            }
        },
        created () {
        },
        methods: {
            back () {
                window.history.go(-1)
            },
            change (val) {
                alert(val)
            }
        }
    }
</script>
