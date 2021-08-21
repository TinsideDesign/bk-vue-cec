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
    <div class="bk-grid-container" :style="style" :class="extCls">
        <slot />
    </div>
</template>

<script>
    export default {
        name: 'bk-container',
        props: {
            // 栅格数，默认 24
            col: {
                type: Number,
                default: 24,
                validator (value) {
                    if (value <= 0) {
                        console.error(`col property is not valid: '${value}'`)
                        return false
                    }
                    return true
                }
            },
            // 栅格间距，单位 px，左右平分
            gutter: {
                type: Number,
                default: 20,
                validator (value) {
                    if (value < 0) {
                        console.error(`gutter property is not valid: '${value}'`)
                        return false
                    }
                    return true
                }
            },
            // 栅格容器的左右外边距
            margin: {
                type: Number,
                default: 20,
                validator (value) {
                    if (value < 0) {
                        console.error(`margin property is not valid: '${value}'`)
                        return false
                    }
                    return true
                }
            },
            // 控制 row 是否使用 flex 布局
            flex: {
                type: Boolean,
                default: false
            },
            // 外部设置的 class name
            extCls: {
                type: String,
                default: ''
            }
        },
        provide () {
            const { col, gutter, flex } = this
            return { col, gutter, flex }
        },
        computed: {
            style () {
                const { margin } = this
                return { 'padding-right': `${margin}px`, 'padding-left': `${margin}px` }
            }
        }
    }
</script>

<style>
    @import '../../ui/container.css';
</style>
