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
            'is-selected': selectedItem.id === item.id,
            'is-multiple': multiple,
            'is-disabled': item.disabled
        }">
        <div class="bk-option-content">
            <slot>
                <div class="bk-option-content-default" :title="item.name">
                    <div class="bk-cascade-check" v-if="multiple">
                        <bk-checkbox
                            :value="item.isSelected"
                            :disabled="item.disabled"
                            :indeterminate="item.isIndeterminate"
                            @change="handleCheckItem">
                        </bk-checkbox>
                    </div>
                    <span class="bk-option-name" :class="{ 'bk-margin-left': multiple }">
                        {{item.name}}
                        <slot name="prepend" :node="item"></slot>
                    </span>
                </div>
            </slot>
        </div>
        <template v-if="isRemote">
            <i class="bk-icon left-icon icon-loading bk-button-icon-loading bk-cascade-right"
                v-if="item.isLoading">
                <span class="loading"></span>
            </i>
            <i class="bk-cascade-right bk-icon icon-angle-right" v-if="(item.children && item.children.length) || (item.isLoading === undefined && !item.disabled)"></i>
        </template>
        <template v-else>
            <i class="bk-cascade-right bk-icon icon-angle-right"
                v-if="item.children && item.children.length"></i>
        </template>
    </li>
</template>
<script>
    import bkCheckbox from '@/components/checkbox'
    export default {
        name: 'optionItem',
        components: {
            bkCheckbox
        },
        props: {
            item: {
                type: Object,
                default: () => ({})
            },
            selectedItem: {
                type: Object,
                default: () => ({})
            },
            multiple: {
                type: Boolean,
                default: false
            },
            isRemote: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            handleCheckItem () {
                this.$emit('handleCheckItem', this.item)
            }
        }
    }
</script>
