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
    <label class="bk-form-radio-button"
        :class="{ 'disabled': disabled }"
        :tabindex="disabled ? false : 0"
        @keydown.enter.prevent="handlerChange">
        <input
            class="bk-radio-button-input"
            type="radio"
            :name="groupName"
            :checked="selected"
            :key="current"
            :disabled="disabled"
            :tabindex="-1"
            :class="{
                'is-checked': selected
            }"
            @change="handlerChange" />
        <div class="bk-radio-button-text"><slot>{{label}}</slot></div>
    </label>
</template>

<script>
    import mixin from './mixin'
    /**
    * bk-radio-button
    * @module components/radio
    * @desc 单选框
    * @param disabled {Boolean} - 是否禁用， false
    * @param value {String, Number} - 选项的值，false
    * @example
        <bk-radio-group v-model="value">
            <bk-radio-button
                :value="'work'">
                工作
            </bk-radio-button>
            <bk-radio-button
                :value="'happy'"
                :disabled="true">
                休假
            </bk-radio-button>
        </bk-radio-group>
    */
    export default {
        name: 'bk-radio-button',
        mixins: [mixin],
        props: {
            name: {
                type: [String]
            },
            value: {
                type: [String, Number, Boolean],
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
            disabled: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            value (val) {
                if (val === this.localTrueValue || val === this.falseValue) {
                    this.updateValue()
                }
            }
        },
        methods: {
            updateValue () {
                if (this.parent) {
                    this.current = this.parent.value
                } else {
                    this.current = this.value
                }
            }
        }
    }
</script>

<style>
    @import '../../ui/radio-button.css';
</style>
