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
    <div class="bk-round-progress" :class="extCls">
        <svg :width="diameter" :height="diameter" viewBox="0 0 100 100" version="1.1">
            <circle
                class="progress-background"
                cx="50"
                cy="50"
                r="50"
                fill="transparent"
                :stroke-width="config.strokeWidth"
                :stroke="config.bgColor" />
            <circle
                class="progress-bar"
                cx="50"
                cy="50"
                r="50"
                fill="transparent"
                :class="'circle' + config.index"
                :stroke-width="config.strokeWidth"
                :stroke="config.activeColor"
                :stroke-dasharray="dashArray"
                :stroke-dashoffset="dashOffset" />
        </svg>
        <div class="num" v-if="numShow" :style="numStyle">
            <template v-if="!content">
                {{Math.round(percentFixed * 100)}}<span v-if="numUnit">{{numUnit}}</span>
            </template>
            <template v-else>{{content}}</template>
        </div>
        <div class="title" v-if="title" :style="titleStyle">
            {{title}}
        </div>
    </div>
</template>
<script>
    export default {
        name: 'bk-round-progress',
        props: {
            config: {
                type: Object,
                default () {
                    return {
                        strokeWidth: 5,
                        bgColor: 'gray',
                        activeColor: 'green',
                        index: 0
                    }
                }
            },
            percent: {
                type: Number,
                default: 0
            },
            title: {
                type: String
            },
            content: {
                type: [String, Number],
                default: ''
            },
            titleStyle: {
                type: Object,
                default () {
                    return {
                        fontSize: '16px'
                    }
                }
            },
            numShow: {
                type: Boolean,
                default: true
            },
            numUnit: {
                type: String,
                default: '%'
            },
            numStyle: {
                type: Object,
                default () {
                    return {
                        fontSize: '16px'
                    }
                }
            },
            // 已改为 width 字段，保留该字段以兼容之前代码
            radius: {
                type: String,
                default: '100px'
            },
            width: {
                type: String,
                default: ''
            },
            // 外部设置的 class name
            extCls: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                dashArray: Math.PI * 100
            }
        },
        computed: {
            dashOffset () {
                return this.percentFixed > 1 ? false : (1 - this.percentFixed) * this.dashArray
            },
            percentFixed () {
                return Number(this.percent.toFixed(2))
            },
            diameter () {
                return this.width || this.radius
            }
        }
    }
</script>
<style>
    @import '../../ui/round-progress.css';
</style>
