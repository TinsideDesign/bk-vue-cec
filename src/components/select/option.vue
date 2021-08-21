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
    <li class="bk-option"
        :class="{
            'is-selected': isSelected,
            'is-disabled': disabled,
            'is-highlight': isHighlight
        }"
        v-show="!unmatched"
        @click="handleOptionClick">
        <div class="bk-option-content">
            <slot>
                <div class="bk-option-content-default" :title="name">
                    <i class="bk-option-icon bk-icon icon-check-1" v-if="select.multiple && isSelected"></i>
                    <span class="bk-option-name" :class="select.fontSizeCls">
                        {{name}}
                    </span>
                </div>
            </slot>
        </div>
    </li>
</template>

<script>
    export default {
        name: 'bk-option',
        props: {
            id: {
                type: [String, Number],
                required: true
            },
            name: {
                type: [String, Number],
                required: true
            },
            disabled: Boolean
        },
        inject: ['select', 'optionGroup'],
        data () {
            return {
                unmatched: false,
                isHighlight: false // todo: 解决性能问题，暂时关闭键盘上下键选择的功能
            }
        },
        computed: {
            isSelected () {
                if (this.select.multiple && Array.isArray(this.select.selected)) {
                    return this.select.selected.includes(this.id)
                }
                return this.select.selected === this.id
            },
            lowerName () {
                return String(this.name).toLowerCase()
            }
        },
        created () {
            this.select.registerOption(this)
            if (this.optionGroup) {
                this.optionGroup.registerOption(this)
            }
        },
        beforeDestroy () {
            this.select.removeOption(this)
            if (this.optionGroup) {
                this.optionGroup.removeOption(this)
            }
        },
        methods: {
            handleOptionClick () {
                if (this.disabled) {
                    return false
                }
                const select = this.select
                if (this.isSelected && select.multiple) {
                    select.unselectOption(this)
                } else if (!this.isSelected) {
                    select.selectOption(this)
                }
                if (!select.multiple) {
                    select.close()
                }
            }
        }
    }
</script>
