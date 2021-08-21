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
    <div class="bk-divider" :style="style">
        <div
            v-if="direction === 'horizontal'"
            :class="['bk-divider-info', `bk-divider-info-${align}`]"
        >
            <slot />
        </div>
    </div>
</template>

<script>
    /**
     * bk-divider
     *
     * @module components/divider
     * @desc 基础按钮
     *
     * @param direction {string} [type=default] - 分割线方向
     * @param position {string} - 分割线 内容位置
     */
    export default {
        name: 'bk-divider',
        props: {
            direction: {
                type: String,
                default: 'horizontal',
                validator (val) {
                    return ['horizontal', 'vertical'].indexOf(val) !== -1
                }
            },
            align: {
                type: String,
                default: 'center',
                validator (val) {
                    return ['left', 'center', 'right'].indexOf(val) !== -1
                }
            },
            color: {
                type: String,
                default: '#dcdee5'
            },
            width: {
                type: Number,
                default: 1
            },
            type: {
                type: String,
                default: 'solid'
            }
        },
        data () {
            return {}
        },
        computed: {
            style () {
                if (this.direction === 'vertical') {
                    return {
                        display: 'inline-block',
                        width: 0,
                        height: '1em',
                        margin: '0 8px',
                        verticalAlign: 'middle',
                        borderRight: `${this.width}px ${this.type} ${this.color}`
                    }
                }
                return {
                    display: 'block',
                    width: '100%',
                    height: 0,
                    margin: '1em 0',
                    verticalAlign: 'middle',
                    borderBottom: `${this.width}px ${this.type} ${this.color}`
                }
            }
        }
    }

</script>
<style>
    @import '../../ui/divider.css';
</style>
