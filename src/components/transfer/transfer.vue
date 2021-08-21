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
    <div class="bk-transfer" :class="extCls" ref="transfer">
        <div class="source-list">
            <div class="slot-header" v-if="slot['left-header']">
                <div class="slot-content">
                    <slot name="left-header"></slot>
                </div>
            </div>
            <div class="header" v-else>
                {{title[0] ? title[0] : t('bk.transfer.left')}}{{t('bk.transfer.total', { total: dataList.length })}}
                <span v-if="dataList.length === 0" class="disabled">{{t('bk.transfer.addAll')}}</span>
                <span v-else @click="allToRight">{{t('bk.transfer.addAll')}}</span>
            </div>
            <bk-input
                class="transfer-search-input"
                v-if="searchable"
                v-model="keyword"
                :clearable="true"
                :left-icon="'bk-icon icon-search'"
                :placeholder="searchPlaceholder || t('bk.transfer.searchPlaceholder')">
            </bk-input>

            <template v-if="displayDataList.length">
                <ul class="content">
                    <li v-for="(item, index) in displayDataList"
                        @click.stop.prevent="leftClick(index)"
                        @mouseover.stop.prevent="leftMouseover(index)"
                        @mouseleave.stop.prevent="leftMouseleave(index)" :key="index">
                        <slot name="source-option" v-bind="item">
                            <span class="content-text" v-bk-overflow-tips v-if="showOverflowTips">{{item[displayCode]}}</span>
                            <span class="content-text" :title="item[displayCode]" v-else>{{item[displayCode]}}</span>
                            <span class="icon-wrapper" :class="[index === leftHoverIndex ? 'hover' : '']"><i class="bk-icon icon-arrows-right"></i></span>
                        </slot>
                    </li>
                </ul>
            </template>
            <template v-else>
                <div v-if="slot['left-empty-content']">
                    <slot name="left-empty-content"></slot>
                </div>
                <div class="empty" v-else>
                    {{emptyContent[0] ? emptyContent[0] : t('bk.transfer.emptyContent')}}
                </div>
            </template>
        </div>
        <div class="transfer">
        </div>
        <div class="target-list">
            <div class="slot-header" v-if="slot['right-header']">
                <div class="slot-content">
                    <slot name="right-header"></slot>
                </div>
            </div>
            <div class="header" v-else>
                {{title[1] ? title[1] : t('bk.transfer.right')}}{{t('bk.transfer.total', { total: hasSelectedList.length })}}
                <span v-if="hasSelectedList.length === 0" class="disabled">{{t('bk.transfer.removeAll')}}</span>
                <span v-else @click="allToLeft">{{t('bk.transfer.removeAll')}}</span>
            </div>
            <template v-if="hasSelectedList.length">
                <ul class="content">
                    <li v-for="(item, index) in hasSelectedList"
                        @click.stop.prevent="rightClick(index)"
                        @mouseover.stop.prevent="rightMouseover(index)"
                        @mouseleave.stop.prevent="rightMouseleave(index)" :key="index">
                        <slot name="target-option" v-bind="item">
                            <span class="content-text" v-bk-overflow-tips v-if="showOverflowTips">{{item[displayCode]}}</span>
                            <span class="content-text" :title="item[displayCode]" v-else>{{item[displayCode]}}</span>
                            <span class="icon-wrapper" :class="[index === rightHoverIndex ? 'hover' : '']"><i class="bk-icon icon-close"></i></span>
                        </slot>
                    </li>
                </ul>
            </template>
            <template v-else>
                <div v-if="slot['right-empty-content']">
                    <slot name="right-empty-content"></slot>
                </div>
                <div class="empty" v-else>
                    {{emptyContent[1] ? emptyContent[1] : t('bk.transfer.emptySelected')}}
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    /**
     *  bk-transfer
     *  @module components/transfer
     *  @desc 穿梭框组件
     *  @param title {Array} - 顶部title(title[0]: 左侧title,title[1]: 右侧title,)
     *  @param emptyContent {Array} - 穿梭框无数据时提示文案
     *  @param displayKey {String} - 循环list时，显示字段的key值(当list为普通数组时可不传传了也无效)
     *  @param settingKey {String} - 唯一key值
     *  @param sortKey {String} - 排序所依据的key(当list为普通数组时可不传，默认按照index值排序)
     *  @param sortable {Boolean} - 是否开启排序功能
     *  @param sourceList {Array} - 穿梭框数据源(支持普通数组)
     *  @param targetList {Array} - 默认已选择的数据源
     *  @example
    <bk-transfer
        :source-list="list"
        :target-list="value"
        :title="title"
        :empty-content="emptyContent"
        :display-key="'value'"
        :setting-key="'label'"
        :sort-key="'label'"
        :is-sort="true"
        @change="change">
    </bk-transfer>
    */

    import locale from 'bk-magic-vue/lib/locale'
    import { isEmpty } from '@/utils/util'
    import bkInput from '../input'
    import bkOverflowTips from '../../directives/overflow-tips'

    export default {
        name: 'bk-transfer',
        components: {
            bkInput
        },
        directives: {
            bkOverflowTips
        },
        mixins: [locale.mixin],
        props: {
            title: {
                type: Array,
                default: () => []
            },
            emptyContent: {
                type: Array,
                default: () => []
            },
            displayKey: {
                type: String,
                default: 'value'
            },
            settingKey: {
                type: String,
                default: 'id'
            },
            sortKey: {
                type: String,
                default: ''
            },
            sourceList: {
                type: Array,
                default () {
                    return []
                }
            },
            targetList: {
                type: Array,
                default () {
                    return []
                }
            },
            hasHeader: {
                type: Boolean,
                default: false
            },
            sortable: {
                type: Boolean,
                default: false
            },
            // 外部设置的 class name
            extCls: {
                type: String,
                default: ''
            },
            searchPlaceholder: {
                type: String,
                default: ''
            },
            searchable: {
                type: Boolean,
                default: false
            },
            showOverflowTips: Boolean
        },
        data () {
            return {
                dataList: [],
                hasSelectedList: [],
                sortList: [],
                leftHoverIndex: -1,
                rightHoverIndex: -1,
                slot: {},
                sortCode: this.sortKey,
                isSortFlag: this.sortable,
                keyword: ''
            }
        },
        computed: {
            typeFlag () {
                if (!this.sourceList || !Array.isArray(this.sourceList)) {
                    return 'empty'
                }
                const str = this.sourceList.toString()
                if (str.indexOf('[object Object]') !== -1) {
                    return true
                }
                return false
            },

            displayDataList () {
                // 搜索
                if (this.keyword) {
                    const displayCode = this.displayCode

                    return this.dataList.filter(item => {
                        return !isEmpty(item[displayCode]) && String(item[displayCode]).indexOf(this.keyword) > -1
                    })
                }
                return this.dataList
            },
            displayCode () {
                // 普通数组
                if (!this.typeFlag) {
                    return 'value'
                }
                return this.displayKey
            },
            settingCode () {
                // 普通数组
                if (!this.typeFlag) {
                    return 'index'
                }
                return this.settingKey
            }
        },
        watch: {
            sourceList: {
                handler: function (value) {
                    if (this.typeFlag !== 'empty') {
                        this.initData()
                        this.initSort()
                    }
                },
                deep: true
            },
            targetList: {
                handler: function (value) {
                    this.initData()
                    this.initSort()
                },
                deep: true
            },
            displayCode (value) {
                this.initData()
            },
            settingCode (value) {
                this.initData()
            },
            sortKey (value) {
                this.sortCode = value
                this.initSort()
            },
            sortable (value) {
                this.isSortFlag = value
                this.initSort()
            }
        },
        created () {
            if (this.typeFlag !== 'empty') {
                if (!this.typeFlag) {
                    this.generalInit()
                } else {
                    this.init()
                }
                this.initSort()
            }
            this.slot = Object.assign({}, this.$slots)
        },
        methods: {
            /**
             * 数据改变初始化
             */
            initData () {
                if (this.typeFlag !== 'empty') {
                    if (!this.typeFlag) {
                        this.generalInit()
                    } else {
                        this.init()
                    }
                }
            },

            /**
             * 普通数组数据初始化
             */
            generalInit () {
                if (!this.targetList.length || this.targetList.length > this.sourceList.length) {
                    const list = []
                    for (let i = 0; i < this.sourceList.length; i++) {
                        list.push({
                            index: i,
                            value: this.sourceList[i]
                        })
                    }
                    this.dataList = [...list]
                    this.hasSelectedList.splice(0, this.hasSelectedList.length, ...[])
                    this.$emit('change', this.dataList, [], [])
                } else {
                    const list = []
                    const valueList = []
                    for (let i = 0; i < this.sourceList.length; i++) {
                        list.push({
                            index: i,
                            value: this.sourceList[i]
                        })
                    }
                    for (let j = 0; j < list.length; j++) {
                        for (let k = 0; k < this.targetList.length; k++) {
                            if (list[j].value === this.targetList[k]) {
                                valueList.push(list[j])
                            }
                        }
                    }
                    this.hasSelectedList = [...valueList]
                    const result = list.filter(item1 => {
                        return valueList.every(item2 => {
                            return item2['index'] !== item1['index']
                        })
                    })
                    this.dataList = [...result]
                    this.$emit('change', this.dataList, [...this.generalListHandler(this.hasSelectedList)], [])
                }
            },

            /**
             * 对象数组数据初始化
             */
            init () {
                if (!this.targetList.length || this.targetList.length > this.sourceList.length) {
                    this.dataList = [...this.sourceList]
                    this.hasSelectedList = []
                    this.$emit('change', this.dataList, [], [])
                } else {
                    const result = this.sourceList.filter(item1 => {
                        return this.targetList.every(item2 => {
                            return item2 !== item1[this.settingCode]
                        })
                    })
                    const hasTempList = []
                    this.sourceList.forEach(item1 => {
                        this.targetList.forEach(item2 => {
                            if (item1[this.settingCode] === item2) {
                                hasTempList.push(item1)
                            }
                        })
                    })
                    this.hasSelectedList = [...hasTempList]
                    this.dataList = [...result]
                    const list = [...this.sourceListHandler(this.hasSelectedList)]
                    this.$emit('change', this.dataList, this.hasSelectedList, list)
                }
            },

            /**
             * 普通数组数据处理
             */
            generalListHandler (list) {
                const templateList = []
                if (!list.length) {
                    return []
                } else {
                    const dataList = [...list]
                    dataList.forEach(item => {
                        templateList.push(item.value)
                    })
                    return templateList
                }
            },

            /**
             * 对象数组数据处理
             */
            sourceListHandler (list) {
                const templateList = []
                if (!list.length) {
                    return []
                } else {
                    const dataList = [...list]
                    dataList.forEach(item => {
                        for (const key in item) {
                            if (key === this.settingCode) {
                                templateList.push(item[key])
                            }
                        }
                    })
                    return templateList
                }
            },

            /**
             * 初始化排序
             */
            initSort () {
                let templateList = []
                if (!this.typeFlag) {
                    if (this.isSortFlag) {
                        this.sortCode = 'index'
                    } else {
                        this.sortCode = ''
                    }
                    for (let k = 0; k < this.sourceList.length; k++) {
                        templateList.push({
                            index: k,
                            value: this.sourceList[k]
                        })
                    }
                } else {
                    if (!this.isSortFlag) {
                        this.sortCode = ''
                    }
                    templateList = [...this.sourceList]
                }
                if (this.sortCode) {
                    const arr = []
                    templateList.forEach(item => {
                        arr.push(item[this.sortCode])
                    })
                    this.sortList = [...arr]
                    if (this.sortList.length === this.sourceList.length) {
                        const list = [...this.dataList]
                        this.dataList = [...this.sortDataList(list, this.sortCode, this.sortList)]
                    }
                }
            },

            /**
             * 排序处理
             */
            sortDataList (list, key, sortList) {
                const arr = sortList
                return list.sort((a, b) => arr.indexOf(a[key]) - arr.indexOf(b[key]) >= 0)
            },

            removeFromDataList (removeItem) {
                // 从左边部列表中删除
                this.dataList = this.dataList.filter(item => {
                    return item[this.settingCode] !== removeItem[this.settingCode]
                })
            },

            /**
             * 全部添加到右侧穿梭框
             */
            allToRight () {
                this.leftHoverIndex = -1
                const displayDataList = this.displayDataList
                const hasSelectedList = this.hasSelectedList

                // 遍历左边列表（包括搜索后的列表）
                displayDataList.forEach(transferItem => {
                    hasSelectedList.push(transferItem)
                    this.removeFromDataList(transferItem)
                })

                if (this.sortList.length === this.sourceList.length) {
                    this.hasSelectedList = [...this.sortDataList(hasSelectedList, this.sortCode, this.sortList)]
                } else {
                    this.hasSelectedList = [...hasSelectedList]
                }

                // while (displayDataList.length) {
                // }
                if (!this.typeFlag) {
                    this.$emit('change', this.dataList, [...this.generalListHandler(this.hasSelectedList)], [])
                } else {
                    const list = [...this.sourceListHandler(this.hasSelectedList)]
                    this.$emit('change', this.dataList, this.hasSelectedList, list)
                }
            },

            /**
             * 全部移除到左侧穿梭框
             */
            allToLeft () {
                this.rightHoverIndex = -1
                const hasSelectedList = this.hasSelectedList
                const dataList = this.dataList
                while (hasSelectedList.length) {
                    const transferItem = hasSelectedList.shift()
                    dataList.push(transferItem)
                    if (this.sortList.length === this.sourceList.length) {
                        this.dataList = [...this.sortDataList(dataList, this.sortCode, this.sortList)]
                    } else {
                        this.dataList = [...dataList]
                    }
                }
                if (!this.typeFlag) {
                    this.$emit('change', this.dataList, [...this.generalListHandler(this.hasSelectedList)], [])
                } else {
                    const list = [...this.sourceListHandler(this.hasSelectedList)]
                    this.$emit('change', this.dataList, this.hasSelectedList, list)
                }
            },

            /**
             * 左侧穿梭框 点击 事件
             *
             * @param {number} index item 的索引
             */
            leftClick (index) {
                this.leftHoverIndex = -1
                const transferItem = this.displayDataList[index]
                const hasSelectedList = this.hasSelectedList
                hasSelectedList.push(transferItem)

                this.removeFromDataList(transferItem)

                if (this.sortList.length === this.sourceList.length) {
                    this.hasSelectedList = [...this.sortDataList(hasSelectedList, this.sortCode, this.sortList)]
                } else {
                    this.hasSelectedList = [...hasSelectedList]
                }
                if (!this.typeFlag) {
                    this.$emit('change', this.dataList, [...this.generalListHandler(this.hasSelectedList)], [])
                } else {
                    const list = [...this.sourceListHandler(this.hasSelectedList)]
                    this.$emit('change', this.dataList, this.hasSelectedList, list)
                }
            },

            /**
             * 右侧穿梭框 点击 事件
             *
             * @param {number} index item 的索引
             */
            rightClick (index) {
                this.rightHoverIndex = -1
                const transferItem = this.hasSelectedList.splice(index, 1)[0]
                const dataList = this.dataList
                dataList.push(transferItem)
                if (this.sortList.length === this.sourceList.length) {
                    this.dataList = [...this.sortDataList(dataList, this.sortCode, this.sortList)]
                } else {
                    this.dataList = [...dataList]
                }
                if (!this.typeFlag) {
                    this.$emit('change', this.dataList, [...this.generalListHandler(this.hasSelectedList)], [])
                } else {
                    const list = [...this.sourceListHandler(this.hasSelectedList)]
                    this.$emit('change', this.dataList, this.hasSelectedList, list)
                }
            },

            /**
             * 左侧穿梭框 mouseover 事件
             *
             * @param {number} index hover 的索引
             */
            leftMouseover (index) {
                this.leftHoverIndex = index
            },

            /**
             * 左侧穿梭框 mouseleave 事件
             *
             * @param {number} index hover 的索引
             */
            leftMouseleave (index) {
                this.leftHoverIndex = -1
            },

            /**
             * 右侧穿梭框 mouseover 事件
             *
             * @param {number} index hover 的索引
             */
            rightMouseover (index) {
                this.rightHoverIndex = index
            },

            /**
             * 右侧穿梭框 mouseleave 事件
             *
             * @param {number} index hover 的索引
             */
            rightMouseleave (index) {
                this.rightHoverIndex = -1
            }
        }
    }
</script>

<style>
    @import '../../ui/transfer.css';
</style>
