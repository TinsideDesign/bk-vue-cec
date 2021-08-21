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
    <p class="bk-score-group" :class="extCls">
        <template v-if="edit">
            <bk-star :rate="rate"
                :hover-rate="hoverRate"
                :width="width"
                :height="height"
                :tooltips="tooltips"
                @chooseRate="chooseRate"
                @changeHover="changeHover"
                @mouseleave.native="changeHover(0)"
            ></bk-star>
        </template>

        <template v-else>
            <bk-star :rate="5"
                :width="width"
                :height="height"
                :style="{ width: starWidth }"
                class="bk-score-real"
                :edit="false"
                :tooltips="tooltips"
            ></bk-star>
            <bk-star :rate="0"
                :width="width"
                :height="height"
                :edit="false"
                :tooltips="tooltips"
            ></bk-star>
        </template>
    </p>
</template>

<script>
    import bkStar from './star'

    export default {
        name: 'bk-rate',

        components: {
            bkStar
        },

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
            tooltips: {
                type: Array,
                default: () => ([])
            },
            // 外部设置的 class name
            extCls: {
                type: String,
                default: ''
            }
        },

        data () {
            return {
                hoverRate: 0
            }
        },

        computed: {
            starWidth () {
                const integer = Math.floor(this.rate)
                const fixWidth = (this.width + 3) * integer
                const rateWidth = this.width * (this.rate - integer)
                return `${fixWidth + rateWidth}px`
            }
        },

        methods: {
            chooseRate (val) {
                if (!this.edit) return

                this.$emit('update:rate', val)
                this.$emit('score', val)
            },

            changeHover (val) {
                this.hoverRate = val
            }
        }
    }
</script>

<style>
    @import '../../ui/rate.css';
</style>
