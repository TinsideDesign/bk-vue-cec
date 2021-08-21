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
    <div class="bk-form-control" :name="name">
        <slot></slot>
    </div>
</template>

<script>
    /**
     * bk-checkbox-group
     * @module components/checkbox
     * @desc 单选框组合
     * @param name {String} - 名称
     * @example
        <bk-checkbox
            value="demo"
            v-model="value">
        </bk-checkbox>
     */
    import { getGroupName } from './checkbox-name.js'

    export default {
        name: 'bk-checkbox-group',
        props: {
            value: {
                type: Array,
                default () {
                    return []
                }
            },
            name: {
                type: [String, Number],
                default () {
                    return getGroupName()
                }
            }
        },
        data () {
            return {
                checkboxItems: [],
                isCheckboxGroup: true,
                localValue: [...this.value]
            }
        },
        watch: {
            value (value) {
                this.localValue = [...value]
            }
        },
        created () {
            this.$on('checkbox-item-add', item => {
                if (item) {
                    this.checkboxItems.push(item)
                }
                return false
            })
        },
        methods: {
            handleChange (checked, value) {
                const oldValue = [...this.localValue]
                const localValue = []
                this.checkboxItems.forEach(checkbox => {
                    const params = checkbox.getValue()
                    if (params.isChecked) {
                        localValue.push(params.value)
                    }
                })
                this.localValue = localValue
                this.$emit('input', this.localValue)
                this.$emit('change', this.localValue, oldValue)
            }
        }
    }
</script>
