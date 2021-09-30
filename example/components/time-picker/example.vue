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
            TimePicker 时间选择器更多示例
        </h2>
        <div class="example-item">
            <div class="inner">
                <p><span class="bk-text-minor">基本使用</span></p>
                <bk-time-picker></bk-time-picker>
            </div>
            <div class="inner">
                <p><span class="bk-text-minor">transfer</span></p>
                <bk-time-picker :transfer="true"></bk-time-picker>
            </div>
        </div>
        <div class="example-item">
            <div class="inner">
                <p><span class="bk-text-minor">timerange</span></p>
                <bk-time-picker :type="'timerange'"></bk-time-picker>
            </div>
            <div class="inner">
                <p><span class="bk-text-minor">timerange 设置宽度</span></p>
                <bk-time-picker :type="'timerange'" :width="400"></bk-time-picker>
            </div>
        </div>
        <div class="example-item">
            <div class="inner">
                <p><span class="bk-text-minor">设置宽度</span></p>
                <bk-time-picker :width="400"></bk-time-picker>
            </div>
            <div class="inner">
                <p><span class="bk-text-minor">自定义样式</span></p>
                <bk-time-picker class="custom-cls" :width="200"></bk-time-picker>
            </div>
        </div>
        <div class="example-item">
            <div class="inner">
                <p><span class="bk-text-minor">不显示秒数</span></p>
                <bk-time-picker :format="'HH:mm'" @change="change"></bk-time-picker>
            </div>
            <div class="inner">
                <p><span class="bk-text-minor">自定义分隔符1</span></p>
                <bk-time-picker :format="'HH|mm||ss'"></bk-time-picker>
            </div>
            <div class="inner">
                <p><span class="bk-text-minor">自定义分隔符2</span></p>
                <bk-time-picker style="width: 200px" :format="'HH时mm分ss秒'" @change="change"></bk-time-picker>
            </div>
        </div>
        <div class="example-item">
            <div class="inner">
                <p><span class="bk-text-minor">不显示秒数timerange</span></p>
                <bk-time-picker :format="'HH:mm'" :type="'timerange'"></bk-time-picker>
            </div>
            <div class="inner">
                <p><span class="bk-text-minor">自定义出现位置</span></p>
                <bk-time-picker :placement="'right-start'"></bk-time-picker>
            </div>
            <div class="inner">
                <p><span class="bk-text-minor">placeholder</span></p>
                <bk-time-picker :placeholder="'请输入时间'"></bk-time-picker>
            </div>
        </div>
        <div class="example-item">
            <div class="inner">
                <p><span class="bk-text-minor">open</span></p>
                <bk-time-picker :open="open"></bk-time-picker>
            </div>
            <div class="inner">
                <p><span class="bk-text-minor">readonly</span></p>
                <bk-time-picker :readonly="true"></bk-time-picker>
            </div>
        </div>
        <div class="example-item">
            <div class="inner">
                <p><span class="bk-text-minor">value and disabled</span></p>
                <bk-time-picker v-model="initVal" :format="'HH-mm-ss'" :disabled="true"></bk-time-picker>
                <a class="f14 ml10" @click="refresh">刷新</a>
            </div>
        </div>
        <div class="example-item">
            <div class="inner">
                <p><span class="bk-text-minor">不可选</span></p>
                <bk-time-picker :disabled-hours="[1, 5, 10]" :disabled-minutes="[0, 10, 20]"></bk-time-picker>
            </div>
            <div class="inner">
                <p><span class="bk-text-minor">不可选隐藏</span></p>
                <bk-time-picker
                    :disabled-hours="[1,2,3,4, 5, 10]"
                    :disabled-minutes="[0,1,2,3,4,5,6,7, 10, 20]"
                    :disabled-seconds="[0, 30, 40]"></bk-time-picker>
            </div>
        </div>
        <div class="example-item">
            <div class="inner">
                <p><span class="bk-text-minor">不可选隐藏</span></p>
                <bk-time-picker :disabled-hours="[1, 5, 10]" :disabled-minutes="[0, 10, 20]" :disabled-seconds="[0, 30, 40]" hide-disabled-options></bk-time-picker>
            </div>
        </div>
        <div class="example-item">
            <div class="inner">
                <p><span class="bk-text-minor">steps</span></p>
                <bk-time-picker :steps="[1, 15, 20]" @change="change"></bk-time-picker>
            </div>
        </div>
        <div class="example-item">
            <div class="inner">
                <p><span class="bk-text-minor">回车模式</span></p>
                <bk-time-picker></bk-time-picker>
            </div>
            <div class="inner">
                <p><span class="bk-text-minor">非回车模式</span></p>
                <bk-time-picker :enter-mode="false"></bk-time-picker>
            </div>
        </div>
        <div class="example-item">
            <div class="inner">
                <p><span class="bk-text-minor">timerange 回车模式</span></p>
                <bk-time-picker :type="'timerange'"></bk-time-picker>
            </div>
            <div class="inner">
                <p><span class="bk-text-minor">timerange 非回车模式</span></p>
                <bk-time-picker :enter-mode="false" :type="'timerange'" @change="change" @open-change="openChange"></bk-time-picker>
            </div>
        </div>
    </section>
</template>

<script>
    import { bkTimePicker } from '@'

    export default {
        components: {
            bkTimePicker
        },
        data () {
            return {
                open: false,
                initVal: '25-12-57'
            }
        },
        created () {
            setTimeout(() => {
                this.open = false
            }, 3000)
        },
        methods: {
            back () {
                window.history.go(-1)
            },
            refresh () {
                this.initVal = new Date()
            },
            change (time) {
                console.warn(time)
            },
            openChange (state) {
                console.warn(state)
            }
        }
    }
</script>
<style lang="postcss">
    .custom-cls {
        &.bk-date-picker {
            width: 400px;
        }
        .bk-date-picker-dropdown {
            background-color: #ddd;
        }
    }
</style>
