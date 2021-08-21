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
    <div class="bk-selector-list">
        <ul ref="selectorList" :style="{ 'max-height': `${contentMaxHeight}px` }" class="outside-ul">
            <li v-for="(data, index) in renderList"
                class="bk-selector-list-item"
                :class="activeClass(index)"
                :key="index"
                @click="handleSelect(data, 'select')">
                <!-- <Render :node="data" :display-key="displayKey" :tpl="tpl" /> -->
                <div class="bk-selector-node">
                    <span class="text">{{data[displayKey]}}{{focusIndex}}</span>
                </div>
            </li>
            <li class="bk-selector-list-item" v-if="showScrollLoading">
                <div class="loading" v-bkloading="{ isLoading: true }"></div>
            </li>
        </ul>
    </div>
</template>

<script>
    import Render from './render'

    export default {
        components: [Render],
        props: {
            renderList: {
                type: Array,
                default () {
                    return []
                }
            },
            contentMaxHeight: {
                type: Number,
                default: 300
            },
            focusIndex: {
                type: [Number, String]
            },
            displayKey: {
                type: String,
                default: 'name'
            },
            showScrollLoading: {
                type: [Boolean],
                default: false
            },
            tpl: Function
        },
        methods: {
            // 更新样式
            activeClass (i) {
                return {
                    'bk-selector-selected': i === this.focusIndex
                }
            },
            handleSelect (data, type) {
                this.$emit('item-select', data, type)
            }
        }
    }
</script>

<style lang="postcss">
    .bk-selector-list {
        position: absolute;
        top: calc(100% + 5px);
        left: 0;
        right: 0;
        max-width: 190px;
        box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.1);
        border-radius: 2px;
        background-color: #fff;
        z-index: 100;
        overflow-y: hidden;
        padding: 6px 0;
        min-width: 100px;

        .outside-ul {
            @mixin scroller;
            max-height: 160px;
            padding: 0;
            margin: 0;
            list-style: none;
            overflow-y: auto;
        }
        .bk-selector-list-item {
            position: relative;
            width: 100%;
            border-left: $formBorderColor;
            border-right: $formBorderColor;
            background-color: #fff;
            cursor: pointer;
            &:first-child {
                border-top: $formBorderColor;
            }
            &:last-child {
                border-bottom: $formBorderColor;
            }
            &:hover {
                background-color: #EAF3FF;
            }
            &.bk-selector-selected {
                background-color: #F4F6FA;
                color: $primaryColor;
                .bk-selector-tools {
                    display: block;
                }
            }
            .loading {
                width: 100%;
                height: 40px;
                font-size: 14px;
                position: relative;
                cursor: default;
            }
            .text {
                padding: 0 10px;
                line-height: 32px;
                font-size: 12px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                color: $fnMainColor;
            }
            .bk-selector-tools {
                position: absolute;
                display: none;
                top: 10px;
                right: 0;
                font-size: 12px;
                .bk-selector-list-icon {
                    margin-right: 14px;
                }
            }
        }
    }
</style>
