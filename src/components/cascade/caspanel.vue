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
    <div class="bk-cascade-panel">
        <ul v-if="list.length"
            class="bk-cascade-panel-ul"
            :class="{ 'bk-cascade-border': childrenList && childrenList.length }"
            :style="{
                width: scrollWidth + 'px'
            }">
            <option-item
                v-for="(item, index) in list"
                :key="index"
                :item="item"
                :selected-item="selectedItem"
                :multiple="multiple"
                :is-remote="isRemote"
                @click.native.stop="cascadeClick(item)"
                @mouseenter.native.stop="cascadeHover(item)"
                @handleCheckItem="handleCheckItem">
                <template slot="prepend" slot-scope="{ node }">
                    <slot name="prepend" :node="node"></slot>
                </template>
            </option-item>
        </ul>
        <ul v-else
            class="bk-cascade-panel-ul"
            style="width: 100%">
            <li class="bk-option-none">
                <span>{{ t('bk.select.dataEmpty') }}</span>
            </li>
        </ul>
        <bk-caspanel
            v-if="childrenList && childrenList.length"
            :list="childrenList"
            :trigger="trigger"
            :scroll-width="scrollWidth"
            :disabled="disabled"
            :multiple="multiple"
            :check-any-level="checkAnyLevel"
            :is-remote="isRemote"
            :remote-method="remoteMethod"
            @updateSelectedList="updateSelectedList">
            <template slot="prepend" slot-scope="{ node }">
                <slot name="prepend" :node="node"></slot>
            </template>
        </bk-caspanel>
    </div>
</template>
<script>
    import optionItem from './option-item.vue'
    import cascadeInfo from './cascade.js'
    import locale from 'bk-magic-vue/lib/locale'

    export default {
        name: 'bkCaspanel',
        components: { optionItem },
        mixins: [cascadeInfo, locale.mixin],
        props: {
            list: {
                type: Array,
                default: () => ([])
            },
            trigger: {
                type: String,
                default: ''
            },
            scrollWidth: {
                type: Number,
                default: 160
            },
            multiple: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            checkAnyLevel: {
                type: Boolean,
                default: false
            },
            isRemote: {
                type: Boolean,
                default: false
            },
            remoteMethod: {
                type: Function
            }
        },
        data () {
            return {
                childrenList: [],
                selectedList: [],
                selectedItem: {},
                multipleSeleted: []
            }
        },
        mounted () {
            this.$on('change-selected', (params) => {
                const idInfo = params.idList
                const valueList = [...idInfo]
                for (let i = 0; i < valueList.length; i++) {
                    for (let j = 0; j < this.list.length; j++) {
                        if (valueList[i] === this.list[j].id) {
                            this.handleItemFn(this.list[j], true)
                            valueList.splice(0, 1)
                            this.$nextTick(() => {
                                this.broadcast('bkCaspanel', 'change-selected', {
                                    idList: valueList
                                })
                            })
                            return false
                        }
                    }
                }
            })
            this.$on('multiple-selected', (params) => {
                const valueList = params.idList
                // 改变最终选中态
                const changeCheckStatus = (arr) => {
                    arr.forEach(item => {
                        if (valueList[valueList.length - 1] === item.id) {
                            item.isSelected = params.isSelected
                            item.isIndeterminate = false
                            this.handleItemFn(item, true)
                        }
                        if (item.children && item.children.length) {
                            changeCheckStatus(item.children)
                        }
                    })
                }
                changeCheckStatus(this.list)
            })
            this.$on('on-clear', () => {
                this.childrenList = []
                this.selectedItem = {}
            })
        },
        methods: {
            // 点击事件
            cascadeClick (item) {
                if (this.trigger !== 'click' && item.children && item.children.length) return
                this.handleItem(item, false)
            },
            cascadeHover (item) {
                if (this.trigger === 'hover' && item.children && item.children.length) {
                    this.handleItem(item, false)
                }
            },
            handleItem (item, fromInit = false) {
                if (item.disabled) return

                if (this.isRemote) {
                    new Promise((resolve, reject) => {
                        this.remoteMethod(item, resolve)
                    }).then(() => {
                        this.handleItemFn(item, fromInit)
                    }).catch(() => {
                        // console.error('catch')
                    }).finally(() => {
                        item.isLoading = false
                    })
                } else {
                    this.handleItemFn(item, fromInit)
                }
            },
            handleItemFn (item, fromInit) {
                // 清空数据
                this.broadcast('bkCaspanel', 'on-clear')
                this.childrenList = (item.children && item.children.length) ? item.children : []
                // 当父级数据选中时，子集数据也选中(多选)
                if (this.multiple && this.childrenList.length) {
                    // 使用递归对子集的子集也进行选中的操作
                    if (!this.checkAnyLevel) {
                        const childrenRecursive = (arr) => {
                            arr.forEach(child => {
                                this.childSelected(child, item)
                                this.childIndeterminate(child, item)
                                if (child.children && child.children.length) {
                                    childrenRecursive(child.children)
                                }
                            })
                        }
                        childrenRecursive(this.childrenList)
                    }
                }
                // 子集展示
                if (this.checkAnyLevel || (item.id !== this.selectedItem.id || item.name !== this.selectedItem.name) || (item.id === this.selectedItem.id && item.name === this.selectedItem.name)) {
                    this.selectedItem = item
                    this.emitUpdate([item])
                }
                // multiple将数据存储在公共的一个选中的数组中
                if (this.multiple) {
                    // 触发多选方法事件
                    this.dispatch('bkCascade', 'on-multiple-change', {
                        item: item,
                        checkAnyLevel: this.checkAnyLevel,
                        fromInit: fromInit
                    })
                } else {
                    this.dispatch('bkCascade', 'on-id-change', {
                        item: item,
                        isLast: !(item.children && item.children.length),
                        checkAnyLevel: this.checkAnyLevel,
                        fromInit: fromInit
                    })
                }
                // 判断popoverWidth的层级
                this.dispatch('bkCascade', 'on-popover-width', {
                    item: item
                })
            },
            childSelected (child, item) {
                if (child.disabled || (!item.isSelected && !item.isIndeterminate)) {
                    child.isSelected = false
                } else if (item.isSelected) {
                    child.isSelected = true
                }
            },
            childIndeterminate (child, item) {
                if (child.disabled || (!item.isSelected && !item.isIndeterminate) || item.isSelected) {
                    child.isIndeterminate = false
                }
            },
            updateSelectedList (item) {
                this.selectedList = [this.selectedItem].concat(item)
                // 在每一个caspanel里面做自己的数据处理
                if (!this.checkAnyLevel) {
                    item.forEach(itemItem => {
                        if (itemItem.children && itemItem.children.length) {
                            itemItem.isSelected = itemItem.children.every(child => (child.isSelected || child.disabled))
                            itemItem.isIndeterminate = itemItem.isSelected ? false : itemItem.children.some(child => (child.isSelected || child.isIndeterminate))
                        }
                    })
                }
                this.emitUpdate(this.selectedList)
            },
            emitUpdate (selectedList) {
                this.$emit('updateSelectedList', selectedList)
            },
            handleCheckItem (item) {
                item.isSelected = !item.isSelected
                item.isIndeterminate = false
            }
        }
    }
</script>
