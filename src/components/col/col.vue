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
    <div class="bk-grid-col" :style="style">
        <slot />
    </div>
</template>

<script>
    import { formatPercentage } from '@/utils/util'

    export default {
        name: 'bk-col',
        props: {
            // 栅格的占位格数，可选值为 0~24 的整数，为 0 时，则为 col 相当于 width: 100%
            span: {
                type: Number,
                default: 1
            },
            // 栅格的偏移
            offset: {
                type: Number,
                default: 0
            },
            // 栅格向左移动格数
            pull: {
                type: Number,
                default: 0
            },
            // 栅格向右移动格数
            push: {
                type: Number,
                default: 0
            }
        },
        provide () {
            const { flex, gutter, realSpan } = this
            return { flex, gutter, col: realSpan }
        },
        inject: ['col', 'gutter', 'flex'],
        computed: {
            realSpan () {
                return this.span || this.col
            },
            width () {
                const { col, realSpan } = this
                return formatPercentage(realSpan / col)
            },
            style () {
                const { width, gutter, col, offset, pull, push } = this
                return {
                    width,
                    'padding-right': `${gutter / 2}px`,
                    'padding-left': `${gutter / 2}px`,
                    'margin-left': offset ? formatPercentage(offset / col) : null,
                    'right': pull ? formatPercentage(pull / col) : null,
                    'left': push ? formatPercentage(push / col) : null
                }
            }
        }
    }
</script>

<style>
    @import '../../ui/col.css';
</style>
