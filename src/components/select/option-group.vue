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
    <li class="bk-option-group" v-show="visible">
        <div class="bk-option-group-name" :class="[select.fontSizeCls, showCollapse && !readonly ? 'is-collapse' : '']" @click="handleGroupNameClick">
            <template v-if="showPrefixOpt">
                <span :class="['bk-option-group-prefix', readonly ? 'readonly' : '']">{{prefixOptionText}}</span>
            </template>
            <slot name="group-name">{{name}} <template v-if="showCount">({{options.length}})</template></slot>
            <template v-if="showSelectAll">
                <span class="btn-check-all">
                    <bk-checkbox :indeterminate="indeterminate" :checked="isSelectAllItems" @click.native="handleCheckAllClick" @change="handleSelectAll"></bk-checkbox>
                </span>
            </template>
        </div>
        <ul class="bk-group-options" v-show="!isLocalCollapse">
            <slot></slot>
        </ul>
    </li>
</template>

<script>
    import bkCheckbox from '@/components/checkbox'
    export default {
        name: 'bk-option-group',
        components: { bkCheckbox },
        props: {
            name: {
                type: String,
                required: true
            },
            showCount: {
                type: Boolean,
                default: true
            },

            /** 是否显示展开\收起操作 */
            showCollapse: {
                type: Boolean,
                default: false
            },

            /** 是否收起 */
            isCollapse: {
                type: Boolean,
                default: false
            },

            /** 展开\收起是否只读展示 */
            readonly: {
                type: Boolean,
                default: false
            },

            /** 是否支持支持分组全选 */
            showSelectAll: {
                type: Boolean,
                default: false
            }
        },
        provide () {
            return {
                optionGroup: this
            }
        },
        inject: ['select'],
        data () {
            return {
                options: [],
                selectedAll: false,
                isLocalCollapse: false
            }
        },
        computed: {
            indeterminate () {
                return !this.isSelectAllItems && !this.isEmpty
            },
            isSelectAllItems () {
                return Array.prototype.every.call(this.options, option => option.isSelected)
            },
            isEmpty () {
                return Array.prototype.every.call(this.options, option => !option.isSelected)
            },
            showPrefixOpt () {
                return !!this.showCollapse
            },
            prefixOptionText () {
                return this.isLocalCollapse ? '+' : '-'
            },
            unmatchedCount () {
                return this.options.filter(option => option.unmatched).length
            },
            visible () {
                const optionCount = this.options.length
                if (!optionCount) {
                    return true
                }
                return optionCount !== this.unmatchedCount
            }
        },
        watch: {
            isCollapse: {
                immediate: true,
                handler (isColl) {
                    this.isLocalCollapse = isColl
                }
            }
        },
        methods: {
            handleCheckAllClick (e) {
                e.stopPropagation()
                e.stopImmediatePropagation()
                e.preventDefault()
            },
            handleSelectAll () {
                if (this.isSelectAllItems) {
                    Array.prototype.forEach.call(this.options, option => this.select.unselectOption(option))
                } else {
                    Array.prototype.forEach.call(this.options, option => this.select.selectOption(option))
                }
            },
            handleGroupNameClick () {
                if (this.showCollapse && !this.readonly) {
                    this.isLocalCollapse = !this.isLocalCollapse
                    this.$emit('collapse', this.isLocalCollapse)
                    this.$emit('update:isCollapse', this.isLocalCollapse)
                }
            },
            registerOption (option) {
                this.options.push(option)
            },
            removeOption (option) {
                const index = this.options.indexOf(option)
                if (index > -1) {
                    this.options.splice(index, 1)
                }
            }
        }
    }
</script>
