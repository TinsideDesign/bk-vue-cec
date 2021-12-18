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
            DatePicker 时间选择器更多示例
        </h2>
        <div class="example-item">
            <bk-button @click="dialogConfig.visiable = true" class="mr10">
                弹框
            </bk-button>
            <bk-dialog v-model="dialogConfig.visiable" title="填写名称"
                :header-position="dialogConfig.headerPosition"
                :width="dialogConfig.width">
                <bk-date-picker :start-date="new Date(1991, 4, 14)"></bk-date-picker>
                <bk-time-picker v-model="initTime" :placeholder="'选择时间'"></bk-time-picker>
                <bk-select v-model="selectValue" style="width: 250px;" searchable>
                    <bk-option v-for="(option, index) in list"
                        :key="index"
                        :id="option.id"
                        :name="option.name">
                    </bk-option>
                </bk-select>
            </bk-dialog>
        </div>
        <div class="example-item">
            <div class="inner">
                <p><span class="bk-text-minor">基本使用</span></p>
                <bk-date-picker :start-date="new Date(1991, 4, 14)"></bk-date-picker>
                <!-- <bk-date-picker :value="['2016-01-01', '2016-02-15']" :type="'daterange'" @on-change></bk-date-picker> -->
            </div>
            <div class="inner">
                <p><span class="bk-text-minor">transfer</span></p>
                <bk-date-picker :transfer="true"></bk-date-picker>
            </div>
        </div>
        <div class="example-item">
            <div class="inner">
                <p><span class="bk-text-minor">datetime</span></p>
                <bk-date-picker :type="'datetime'"></bk-date-picker>
            </div>
            <div class="inner">
                <p><span class="bk-text-minor">datetimerange</span></p>
                <bk-date-picker :type="'datetimerange'" v-model="datetimerangeInitVal"></bk-date-picker>
            </div>
        </div>
        <div class="example-item">
            <div class="inner">
                <p><span class="bk-text-minor">daterange</span></p>
                <bk-date-picker :type="'daterange'"></bk-date-picker>
            </div>
            <div class="inner">
                <p><span class="bk-text-minor">快捷方式 daterange</span></p>
                <bk-date-picker :shortcuts="shortcuts2" :type="'daterange'"></bk-date-picker>
            </div>
        </div>
        <div class="example-item">
            <div class="inner">
                <p><span class="bk-text-minor">快捷方式 datetime</span></p>
                <bk-date-picker :shortcuts="shortcuts1" :type="'datetime'" :time-picker-options="{ steps: [1, 10, 10] }"></bk-date-picker>
            </div>
            <div class="inner">
                <p><span class="bk-text-minor">快捷方式 datetime（快捷方式关闭弹层）</span></p>
                <bk-date-picker :shortcuts="shortcuts1" :type="'datetime'" :shortcut-close="true"></bk-date-picker>
            </div>
        </div>
        <div class="example-item">
            <div class="inner">
                <p><span class="bk-text-minor">快捷方式 datetimerange</span></p>
                <bk-date-picker :shortcuts="shortcuts2" :type="'datetimerange'"></bk-date-picker>
            </div>
            <div class="inner">
                <p><span class="bk-text-minor">快捷方式 datetimerange（快捷方式关闭弹层）</span></p>
                <bk-date-picker :shortcuts="shortcuts2" :type="'datetimerange'" :shortcut-close="true"></bk-date-picker>
            </div>
        </div>
        <div class="example-item">
            <div class="inner">
                <p><span class="bk-text-minor">不可选日期1</span></p>
                <!-- <bk-date-picker :options="options1" :type="'year'"></bk-date-picker> -->
                <bk-date-picker :options="options1"></bk-date-picker>
            </div>
            <div class="inner">
                <p><span class="bk-text-minor">不可选日期2</span></p>
                <!-- <bk-date-picker :options="options2" :type="'month'"></bk-date-picker> -->
                <bk-date-picker :options="options2"></bk-date-picker>
            </div>
        </div>

        <div class="example-item">
            <div class="inner">
                <p><span class="bk-text-minor">format1</span></p>
                <bk-date-picker :format="'MM-dd.yy dddd'"></bk-date-picker>
            </div>
            <div class="inner">
                <p><span class="bk-text-minor">自定义样式</span></p>
                <bk-date-picker class="custom-cls"></bk-date-picker>
            </div>
        </div>
        <div class="example-item">
            <div class="inner">
                <p><span class="bk-text-minor">选择多个日期</span></p>
                <!-- multiple 只支持 date，不支持 datetime -->
                <bk-date-picker multiple></bk-date-picker>
            </div>
            <div class="inner">
                <p><span class="bk-text-minor">禁用</span></p>
                <bk-date-picker :disabled="true" :value="'2019-01-01'"></bk-date-picker>
            </div>
            <div class="inner">
                <p><span class="bk-text-minor">只读</span></p>
                <bk-date-picker :readonly="true" :value="'2019-01-01'"></bk-date-picker>
            </div>
        </div>
        <div class="example-item">
            <div class="inner">
                <p><span class="bk-text-minor">自定义出现位置</span></p>
                <bk-date-picker :placement="'right-start'"></bk-date-picker>
            </div>
            <div class="inner">
                <p><span class="bk-text-minor">placeholder</span></p>
                <bk-date-picker :placeholder="'请输入时间'"></bk-date-picker>
            </div>
        </div>

        <div class="example-item">
            <div class="inner">
                <p><span class="bk-text-minor">placeholder</span></p>
                <bk-date-picker :open="open" :value="value"
                    @change="handleChange"
                    @clear="handleClear"
                    @pick-success="handleOk"
                    @open-change="handleOpenChange"
                >
                    <a slot="trigger" href="javascript:void(0)" @click="handleClick">
                        <template v-if="value === ''">Select date</template>
                        <template v-else>{{value}}</template>
                    </a>
                </bk-date-picker>
            </div>
            <div class="inner">
                <p><span class="bk-text-minor">datetimerange</span></p>
                <bk-date-picker :type="'datetimerange'" v-model="datetimerangeInitVal" :time-picker-options="{
                    disabledHours: [1, 5, 10],
                    disabledMinutes: [0, 10, 20]
                }"></bk-date-picker>
            </div>
        </div>
        <div class="example-item">
            <div class="inner">
                <p><span class="bk-text-minor">快捷选择区域插槽</span></p>
                <bk-date-picker
                    :value="value"
                    :placement="'top-start'"
                    :type="'datetimerange'">
                    <div slot="shortcuts">自定义插槽</div>
                </bk-date-picker>
            </div>
        </div>
    </section>
</template>

<script>
    import { bkDatePicker, bkDialog, bkButton, bkSelect, bkOption, bkTimePicker } from '@'
    export default {
        components: {
            bkDatePicker,
            bkDialog,
            bkButton,
            bkSelect,
            bkOption,
            bkTimePicker
        },
        data () {
            return {
                datetimerangeInitVal: [new Date(), new Date()],
                open: false,
                initVal: '25-12-57',
                options1: {
                    // 小于今天的都不能选
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() - 86400
                    }
                },
                options2: {
                    disabledDate (date) {
                        return date.getDate() === 14
                        // return date.getMonth() === 6
                    }
                },
                shortcuts1: [
                    {
                        text: '最近24小时',
                        value () {
                            return new Date()
                        },
                        onClick: picker => {
                            console.error(picker)
                        }
                    },
                    {
                        text: '昨天',
                        value () {
                            const date = new Date()
                            date.setTime(date.getTime() - 3600 * 1000 * 24)
                            return date
                        },
                        onClick: picker => {
                            console.error(picker)
                        }
                    },
                    {
                        text: '7天前',
                        value () {
                            const date = new Date()
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                            return date
                        },
                        onClick: picker => {
                            console.error(picker)
                        }
                    }
                ],
                shortcuts2: [
                    {
                        text: '最近24小时',
                        value () {
                            const end = new Date()
                            const start = new Date()
                            return [start, end]
                        },
                        onClick: picker => {
                            console.error(picker)
                        }
                    },
                    {
                        text: '近7天',
                        value () {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                            return [start, end]
                        }
                    },
                    {
                        text: '近15天',
                        value () {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 15)
                            return [start, end]
                        }
                    },
                    {
                        text: '近30天',
                        value () {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                            return [start, end]
                        }
                    }
                ],
                value: '',
                dialogConfig: {
                    visiable: false,
                    width: 480,
                    headerPosition: 'left'
                },
                initTime: '12:12:12',
                selectValue: '',
                list: [
                    { id: 1, name: '爬山' },
                    { id: 2, name: '跑步' },
                    { id: 3, name: '打球' },
                    { id: 4, name: '跳舞' },
                    { id: 5, name: '健身' },
                    { id: 6, name: '骑车' },
                    { id: 7, name: 'k8s' },
                    { id: 8, name: 'K8S' },
                    { id: 9, name: 'mesos' },
                    { id: 10, name: 'MESOS' }
                ]
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
            handleClick () {
                this.open = !this.open
            },
            handleChange (date) {
                console.error('handleChange', date)
                this.value = date
            },
            handleClear () {
                console.error('handleClear')
                this.open = false
            },
            handleOk () {
                console.error('handleOK')
                this.open = false
            },
            handleOpenChange (isOpen) {
                console.error(isOpen)
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
