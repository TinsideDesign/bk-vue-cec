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
    <label
        class="bk-form-checkbox"
        :class="[{ 'is-disabled': disabled, 'is-indeterminate': indeterminate, 'is-checked': selected }, extCls]"
        @click="handleClick"
        @keydown.enter.prevent="handleClick">
        <span class="bk-checkbox" :tabindex="disabled ? false : 0"></span>
        <input type="hidden" :name="name" :value="label === undefined ? localValue : label">
        <span class="bk-checkbox-text" v-if="$slots.default">
            <slot></slot>
        </span>
    </label>
</template>

<script>
    import emitter from '@/mixins/emitter'
    import { getCheckboxName } from './checkbox-name.js'

    export default {
        name: 'bk-checkbox',
        mixins: [emitter],

        props: {
            value: {
                type: [String, Number, Boolean],
                default: undefined
            },
            // 用于纯展示
            checked: {
                type: Boolean,
                default: undefined
            },
            trueValue: {
                type: [String, Number, Boolean],
                default: true
            },
            falseValue: {
                type: [String, Number, Boolean],
                default: false
            },
            label: {
                type: [String, Number]
            },
            name: {
                type: String,
                default () {
                    return getCheckboxName()
                }
            },
            disabled: Boolean,
            indeterminate: Boolean,
            // 外部设置的 class name
            extCls: {
                type: String,
                default: ''
            },
            beforeChange: Function
        },
        data () {
            return {
                parent: null,
                localValue: undefined
            }
        },
        computed: {
            selected () {
                return this.localValue === this.localTrueValue
            },
            parentValue () {
                return this.parent ? this.parent.localValue : null
            },
            localTrueValue () {
                let localValue
                // 如果结合 checkbox-group 使用
                // 优先级this.value < this.label < this.trueValue
                if (this.parent) {
                    if (this.label === undefined && this.value === undefined) {
                        localValue = this.trueValue
                    } else if (this.value !== undefined) {
                        localValue = this.value
                    } else {
                        localValue = this.label
                    }
                } else {
                    if (this.label === undefined) {
                        localValue = this.trueValue
                    } else {
                        localValue = this.label
                    }
                }
                return localValue
            }
        },
        watch: {
            value (val) {
                this.setLocalValue(val)
            },
            checked () {
                this.setLocalValue()
            },
            parentValue () {
                this.setLocalValue()
            }
        },
        created () {
            this.dispatch('bk-checkbox-group', 'checkbox-item-add', this)
            this.init()
        },
        methods: {
            getValue () {
                if (this.selected) {
                    return {
                        isChecked: true,
                        value: this.localTrueValue
                    }
                } else {
                    return {
                        isChecked: false,
                        value: this.falseValue
                    }
                }
            },
            init () {
                // 判断是否存存group
                let parent = this.$parent
                while (parent && !parent.isCheckboxGroup && !parent.$options.name !== 'bk-checkbox-group') {
                    parent = parent.$parent
                }
                this.parent = parent
                this.setLocalValue()
            },
            setLocalValue (val) {
                if (val !== undefined) {
                    this.localValue = val
                    return
                }

                if (this.parent) {
                    // 如果和配合checkbox-group使用
                    const trueValue = this.localTrueValue
                    const isSelected = this.parent.localValue.includes(trueValue)
                    this.localValue = isSelected ? trueValue : this.falseValue
                } else {
                    // 如果是单个使用
                    if (this.checked !== undefined) {
                        this.localValue = this.checked ? this.localTrueValue : this.falseValue
                        // this.$emit('input', this.localValue)
                        // this.$emit('change', this.localValue)
                    } else if (this.value === undefined) {
                        this.localValue = this.falseValue
                    } else {
                        this.localValue = this.value
                    }
                }
            },
            async handleClick () {
                if (this.disabled) {
                    return false
                }
                if (typeof this.beforeChange === 'function') {
                    const shouldChange = await this.beforeChange()
                    if (shouldChange === false) return
                }
                const oldValue = this.localValue
                let newValue

                if (this.indeterminate) {
                    newValue = this.localTrueValue
                } else {
                    // 判断条件应该为所有不等于trueValue的值就是falseValue
                    // tips: 所有不等于falseValue的值不一定是trueValue
                    newValue = oldValue === this.localTrueValue ? this.falseValue : this.localTrueValue
                }

                this.localValue = newValue
                this.$emit('input', newValue, this.localTrueValue)
                this.$emit('change', newValue, oldValue, this.localTrueValue)

                if (this.parent) {
                    const groupValue = this.localTrueValue === undefined ? newValue : this.localTrueValue
                    this.parent.handleChange(this.selected, groupValue)
                }
            }
        }
    }
</script>

<style>
    @import '../../ui/checkbox.css';
</style>
