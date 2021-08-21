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
    <span :class="extCls">{{formatValue}}</span>
</template>

<script>
    export default {
        name: 'bk-animate-number',

        props: {
            value: {
                type: Number,
                required: true
            },
            digits: {
                type: Number,
                default: 0
            },
            // 外部设置的 class name
            extCls: {
                type: String,
                default: ''
            }
        },

        data () {
            return {
                tweeningValue: 0,
                rafId: ''
            }
        },

        computed: {
            formatValue () {
                return Number(this.tweeningValue).toFixed(this.digits)
            }
        },

        watch: {
            value (newValue, oldValue) {
                this.tween(oldValue, newValue)
            }
        },

        mounted () {
            this.tween(0, this.value)
        },

        beforeDestroy () {
            cancelAnimationFrame(this.rafId)
        },

        methods: {
            tween (startValue, endValue) {
                // 错误数据返回0
                if (Number.isNaN(+endValue)) return 0

                const dis = Math.abs(endValue - startValue)
                const isPositive = endValue - startValue > 0 ? 1 : -1
                const ticDis = Math.ceil((dis / 30) * (10 ** this.digits)) / (10 ** this.digits)
                const ticTimes = Math.ceil(dis / ticDis)
                // 算出每次计算需要间隔的时间，保证动画的流畅
                const gapTime = 25 / ticTimes
                let tickGap = 1

                const animate = () => {
                    if (tickGap < gapTime) {
                        this.rafId = requestAnimationFrame(animate)
                        tickGap++
                        return
                    }

                    this.tweeningValue += (ticDis * isPositive)

                    const isUnDone = isPositive === 1 ? this.tweeningValue < endValue : this.tweeningValue > endValue
                    if (isUnDone) {
                        this.rafId = requestAnimationFrame(animate)
                        tickGap = 1
                    } else {
                        this.tweeningValue = endValue
                    }
                }

                animate()
            }
        }
    }
</script>
