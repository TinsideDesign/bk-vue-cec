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
    <div class="bk-progress" :class="extCls">
        <div class="progress-bar" :class="`bk-progress-${size}`" :style="percentStyle">
            <div class="progress-inner" :style="barStyle" :class="`bk-${themeType}`">
                <div class="inner-text" v-if="showText && textInside && percentFixed !== 0" :style="titleStyle">{{percentFixed}}%</div>
            </div>
            <template v-if="showText && textInside && percentFixed === 0">{{percentFixed}}%</template>
        </div>
        <div
            class="progress-text"
            v-if="showText && !textInside"
            :style="titleStyle">
            <slot>{{percentFixed}}%</slot>
        </div>
    </div>
</template>

<script>
    /**
     * bk-progress
     *
     * @module components/progress
     * @desc 圆形进度
     * @param theme {String}  - 显示类型，接受 primary warning success danger
     * @param percent {Number} - 圆环的大小(必传)`0 < percent < 1`
     * @param size {String} - 尺寸，接受 small normal large
     * @param stroke-width {Number} - 进度条的宽度，单位 px
     * @param text-inside {Boolean} - 进度条显示文字内置在进度条内
     * @param color {String} - 进度条背景色
     * @param show-text {Boolean} - 是否显示进度条文字内容
     * @param title-style {Object} {fontSize: '16px'} - 设置title的样式
     *
    */
    export default {
        name: 'bk-progress',
        props: {
            theme: {
                type: String,
                default: 'primary',
                validator (value) {
                    if (['primary', 'warning', 'success', 'danger'].indexOf(value) < 0) {
                        console.error(`theme property is not valid: '${value}'`)
                        return false
                    }
                    return true
                }
            },
            percent: {
                type: Number,
                default: 0,
                validator: val => val >= 0 && val <= 1
            },
            size: {
                type: String,
                default: 'normal',
                validator (value) {
                    if (['small', 'normal', 'large'].indexOf(value) < 0) {
                        console.error(`size property is not valid: '${value}'`)
                        return false
                    }
                    return true
                }
            },
            strokeWidth: {
                type: Number
            },
            textInside: {
                type: Boolean,
                default: false
            },
            color: {
                type: String,
                default: ''
            },
            showText: {
                type: Boolean,
                default: true
            },
            titleStyle: {
                type: Object,
                default () {
                    return {
                        fontSize: '16px',
                        verticalAlign: 'middle'
                    }
                }
            },
            // 外部设置的 class name
            extCls: {
                type: String,
                default: ''
            },
            // 精确到小数点位数
            fixed: {
                type: Number,
                default: 0,
                validator: val => val >= 0 && val <= 20
            }
        },
        data () {
            return {
                percentStyle: {
                    lineHeight: this.strokeWidth + `px`,
                    height: this.strokeWidth + 'px'
                }
            }
        },
        computed: {
            themeType () {
                if (this.text) {
                    return 'primary'
                }
                return this.theme
            },
            barStyle () {
                const style = {}
                style.width = this.percentFixed + '%'
                style.backgroundColor = this.color
                return style
            },
            percentFixed () {
                return Number(this.percent * 100).toFixed(this.fixed)
            },
            progressTextSize () {
                return 12 + this.strokeWidth * 0.4
            }
        }
    }
</script>
<style>
    @import '../../ui/progress.css';
</style>
