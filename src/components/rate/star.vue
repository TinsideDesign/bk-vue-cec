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
    <p class="bk-rate-stars">
        <svg v-for="(item, index) in maxStars"
            :key="index"
            :class="[{ 'bk-yellow': index < Math.floor(displayRate) }, { 'bk-is-edit': edit }, 'bk-rate-star']"
            :style="{ width: width + 'px', height: height + 'px', 'min-width': width + 'px' }"
            x="0px"
            y="0px"
            viewBox="0 0 64 64"
            v-bk-tooltips="{ content: tooltips[index], disabled: !tooltips[index] }"
            @click="chooseRate(index)"
            @mouseenter="changeHover(index)"
        >
            <g transform="translate(-143.000000, -635.000000)">
                <g transform="translate(83.000000, 114.000000)">
                    <g transform="translate(15.000000, 384.000000)">
                        <g transform="translate(29.000000, 137.000000)">
                            <polygon class="st1" points="48,53 28.2,63.9 32,40.8 16,24.4 38.1,21 48,-0.1 57.8,21 79.9,24.4 63.9,40.8 67.7,63.9" />
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    </p>
</template>

<script>
    export default {
        name: 'bk-star',
        props: {
            rate: {
                type: Number,
                default: 0
            },
            width: {
                type: Number,
                default: 15
            },
            height: {
                type: Number,
                default: 16
            },
            edit: {
                type: Boolean,
                default: true
            },
            hoverRate: {
                type: Number,
                default: 0
            },
            tooltips: {
                type: Array,
                default: () => ([])
            },
            maxStars: {
                type: Number,
                default: 5
            }
        },

        computed: {
            displayRate () {
                return this.hoverRate || this.rate
            }
        },

        methods: {
            chooseRate (index) {
                if (!this.edit) return

                const rate = index + 1
                this.$emit('chooseRate', rate)
            },

            changeHover (index) {
                if (!this.edit) return

                const rate = index + 1
                this.$emit('changeHover', rate)
            }
        }
    }
</script>

<style>
    @import '../../ui/star.css';
</style>
