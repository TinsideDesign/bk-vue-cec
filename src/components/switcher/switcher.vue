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
    <div :class="classObject" @click="change" tabindex="0" @keydown.enter.prevent="change">
        <input type="checkbox" :disabled="disabled" tabindex="-1">
        <label class="switcher-label" v-show="showText">
            <span class="switcher-text on-text">{{onText}}</span>
            <span class="switcher-text off-text">{{offText}}</span>
        </label>
        <template v-if="isLoading">
            <img class="bk-switcher-loading" src="../../ui/images/spinner.svg">
        </template>
    </div>
</template>
<script>
    /**
     * bk-switcher
     * @module components/switcher
     * @desc 开关
     * @param {boolean} [value=false] - 是否打开
     * @param {boolean} [show-text=false] - 是否显示ON/OFF
     * @param {boolean} [disabled=true] - 是否禁用
     * @example
     * <bk-switcher :value="isSelected" :show-text="showText"></bk-switcher>
     */

    export default {
        name: 'bk-switcher',
        model: {
            prop: 'value',
            event: 'update'
        },
        props: {
            value: {
                type: [String, Number, Boolean],
                default: false

            },
            trueValue: {
                type: [String, Number, Boolean],
                default: true
            },
            falseValue: {
                type: [String, Number, Boolean],
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            showText: {
                type: Boolean,
                default: false
            },
            onText: {
                type: String,
                default: 'ON'
            },
            offText: {
                type: String,
                default: 'OFF'
            },
            isOutline: {
                type: Boolean,
                default: false
            },
            theme: {
                type: String,
                default: 'success'
            },
            isSquare: {
                type: Boolean,
                default: false
            },
            size: {
                type: String,
                default: '',
                validator (value) {
                    if (['', 'large', 'small'].indexOf(value) < 0) {
                        console.error(`size property is not valid: '${value}'`)
                        return false
                    }
                    return true
                }
            },
            preCheck: {
                type: Function
            }
        },
        data () {
            return {
                isLoading: false,
                localValue: this.value
            }
        },
        computed: {
            isChecked () {
                return this.localValue === this.trueValue
            },
            classObject () {
                const cls = {
                    'bk-switcher': true,
                    'bk-switcher-outline': this.isOutline,
                    'bk-switcher-square': this.isSquare,
                    'show-label': this.showText,
                    'is-disabled': this.disabled,
                    'is-checked': this.isChecked,
                    'is-unchecked': !this.isChecked,
                    'is-loading': this.isLoading,
                    'primary': this.theme === 'primary'
                }

                // 显示文本则size无效，使用固定尺寸
                if (this.size && !this.showText) {
                    const sizeStr = 'bk-switcher-' + this.size
                    cls[sizeStr] = true
                }
                return cls
            }
        },
        watch: {
            value (newValue) {
                this.localValue = newValue
            }
        },
        methods: {
            change () {
                if (this.disabled || this.isLoading) {
                    return
                }
                const lastValue = this.isChecked ? this.falseValue : this.trueValue
                const lastChecked = !this.isChecked

                const trigger = () => {
                    this.localValue = lastValue
                    this.$emit('update', lastValue)
                    this.$emit('change', lastChecked)
                }

                let goodJob = true

                if (typeof this.preCheck === 'function') {
                    goodJob = this.preCheck(lastValue)
                    if (typeof goodJob.then === 'function') {
                        this.isLoading = true
                        return goodJob.then(() => {
                            trigger()
                        }).finally(() => {
                            this.isLoading = false
                        })
                    }
                }
                if (goodJob) {
                    trigger()
                }
            }
        }
    }
</script>
<style>
    @import '../../ui/switcher.css';
</style>
