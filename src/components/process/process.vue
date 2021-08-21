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
    <div class="bk-process" :class="extCls">
        <ul :style="{ paddingBottom: paddingBottom + 'px' }">
            <li v-for="(item, index) in dataList" :key="index"
                :style="{ cursor: controllables ? 'pointer' : '' }"
                :class="{ success: curProcess >= (index + 1), current: item.isLoading && index === curProcess - 1 }"
                @click="toggle(item, index)">
                {{item[displayKey]}}
                <div class="bk-spin-loading bk-spin-loading-mini bk-spin-loading-white" v-if="item.isLoading && index === curProcess - 1">
                    <div class="rotate rotate1"></div>
                    <div class="rotate rotate2"></div>
                    <div class="rotate rotate3"></div>
                    <div class="rotate rotate4"></div>
                    <div class="rotate rotate5"></div>
                    <div class="rotate rotate6"></div>
                    <div class="rotate rotate7"></div>
                    <div class="rotate rotate8"></div>
                </div>
                <i class="bk-icon icon-check-1" v-else></i>
                <dl class="bk-process-step" ref="stepsDom" v-show="item.steps && item.steps.length && showFlag">
                    <dd v-for="(step, stepIndex) in item.steps" :key="stepIndex">
                        {{step[displayKey]}}
                        <div class="bk-spin-loading bk-spin-loading-mini bk-spin-loading-primary steps-loading" v-if="step.isLoading && index === curProcess - 1">
                            <div class="rotate rotate1"></div>
                            <div class="rotate rotate2"></div>
                            <div class="rotate rotate3"></div>
                            <div class="rotate rotate4"></div>
                            <div class="rotate rotate5"></div>
                            <div class="rotate rotate6"></div>
                            <div class="rotate rotate7"></div>
                            <div class="rotate rotate8"></div>
                        </div>
                        <i class="bk-icon icon-check-1" v-else></i>
                    </dd>
                </dl>
            </li>
        </ul>
        <a href="javascript:;" class="bk-process-toggle" @click="toggleProcess" v-if="toggleFlag">
            <i class="bk-icon"
                :class="showFlag ? 'icon-angle-up' : 'icon-angle-down'"></i>
        </a>
    </div>
</template>
<script>
    /**
     *  bk-process
     *  @module components/process
     *  @desc process组件
     *  @param list {Array} - process数据源
     *  @param controllable {Boolean} - 步骤可否被控制前后跳转，默认为false
     *  @param showSteps {Boolean} - 是否显示子步骤
     *  @param curProcess {Number} - 当前process的索引值，从1开始；支持.sync修饰符
     *  @param displayKey {String} - 显示字段的key值
     *  @example
        <bk-process
            :list="list"
            :cur-process.sync="process"
            :show-steps="true"
            :display-key="'content'"
            @process-changed="change"
            :controllable="true">
        </bk-process>
    */
    export default {
        name: 'bk-process',
        props: {
            list: {
                type: Array,
                required: true
            },
            controllable: {
                type: Boolean,
                default: false
            },
            showSteps: {
                type: Boolean,
                default: false
            },
            curProcess: {
                type: Number,
                default: 0
            },
            displayKey: {
                type: String,
                required: true
            },
            // 外部设置的 class name
            extCls: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                toggleFlag: false,
                showFlag: this.showSteps,
                dataList: this.list,
                controllables: this.controllable,
                paddingBottom: 0,
                maxBottom: 0,
                stepsClientHeight: 32
            }
        },
        watch: {
            list: {
                handler: function (value) {
                    this.initToggleFlag(value)
                    this.dataList = [...value]
                    this.calculateMaxBottom(value)
                },
                deep: true
            },
            curProcess (newValue, oldValue) {
                if (newValue > this.list.length + 1) {
                    return
                }
                this.setParentProcessLoad(this.list)
            }
        },
        created () {
            this.setParentProcessLoad(this.list)
        },
        mounted () {
            this.initToggleFlag(this.list)
            this.calculateMaxBottom(this.list)
            if (this.showFlag) {
                this.paddingBottom = this.maxBottom
            } else {
                this.paddingBottom = 0
            }
        },
        methods: {
            /**
             * init child process 显示按钮
             *
             * @param {Array} list process 数据源
             */
            initToggleFlag (list) {
                if (!list.length) {
                    this.toggleFlag = false
                } else {
                    for (let i = 0; i < list.length; i++) {
                        if (list[i].steps && list[i].steps.length) {
                            // this.controllables = false
                            this.toggleFlag = true
                            break
                        }
                    }
                }
            },

            /**
             * parent process loading设置
             *
             * @param {Array} list process 数据源
             */
            setParentProcessLoad (list) {
                const dataList = [...list]
                const curProcess = this.curProcess - 1 || 0
                if (!dataList.length) {
                    return
                }
                if (curProcess === dataList.length) {
                    this.$set(dataList[curProcess - 1], 'isLoading', false)
                } else {
                    for (let i = 0; i < dataList.length; i++) {
                        let loadFlag = false
                        if (dataList[curProcess].steps && dataList[curProcess].steps.length) {
                            const steps = dataList[curProcess].steps
                            for (let j = 0; j < steps.length; j++) {
                                if (steps[j]['isLoading']) {
                                    loadFlag = true
                                }
                            }
                            if (loadFlag) {
                                if (curProcess > 0) {
                                    this.$set(dataList[curProcess - 1], 'isLoading', false)
                                }
                                this.$set(dataList[curProcess], 'isLoading', true)
                            }
                        }
                    }
                }
                this.list.splice(0, this.list.length, ...dataList)
            },

            /**
             * 展开/收起 child process
             */
            toggleProcess () {
                this.showFlag = !this.showFlag
                if (this.showFlag) {
                    this.paddingBottom = this.maxBottom
                } else {
                    this.paddingBottom = 0
                }
            },

            /**
             * 计算最大 padding-bottom
             */
            calculateMaxBottom (list) {
                const processList = [...list]
                const stepsLengthList = []
                if (!processList.length) {
                    this.maxBottom = 0
                    return
                }
                processList.forEach(item => {
                    if (item.steps) {
                        stepsLengthList.push(item.steps.length)
                    }
                })
                this.maxBottom = Math.max.apply(null, stepsLengthList) * this.stepsClientHeight
            },

            /**
             * 控制步骤前后跳转
             *
             * @param {Object} index 当前process 数据
             * @param {Number} index 当前process 索引
             */
            toggle (item, index) {
                if (!this.controllables) {
                    return
                }
                this.$emit('update:curProcess', index + 1)
                this.$emit('process-changed', index + 1, item)
            }
        }
    }
</script>
<style>
    @import '../../ui/process.css';
</style>
