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
    <div v-if="total > 0" :class="[
        'bk-page',
        `bk-page-align-${align}`,
        {
            'bk-page-compact': type === 'compact',
            'bk-page-small': size === 'small'
        },
        extCls
    ]">
        <pagination-total-count v-if="showTotalCount" />
        <div v-if="showLimit" :class="['bk-page-count',`bk-page-count-${realityLocation}`, small && 'bk-page-count-small']">
            <template v-if="curLang === 'cn'">
                <span>每页</span>
                <bk-select placeholder="页数"
                    :clearable="false"
                    :size="small ? 'small' : ''"
                    :class="{ 'page-select-small': small && !toggle }"
                    v-model="realityLimit"
                    @toggle="(value) => toggle = value">
                    <bk-option v-for="(p, index) in limitListTmp"
                        :key="index"
                        :id="p.id"
                        :name="p.count">
                    </bk-option>
                </bk-select>
                <span>条</span>
            </template>
            <template v-else>
                <bk-select placeholder="page"
                    :clearable="false"
                    v-model="realityLimit">
                    <bk-option v-for="(p, index) in limitListTmp"
                        :key="index"
                        :id="p.id"
                        :name="`${p.count}/page`">
                    </bk-option>
                </bk-select>
            </template>
        </div>
        <pagination-selection-count v-if="showSelectionCount" />
        <ul v-if="!small" class="bk-page-list">
            <!-- 上一页 -->
            <li class="page-item" :class="{ disabled: current === 1 }" @click="prevPage">
                <a href="javascript:void(0);" class="page-button">
                    <i class="bk-icon icon-angle-left"></i>
                </a>
            </li>
            <!-- 第一页 -->
            <li class="page-item" v-show="renderList[0] > 1" @click="jumpToPage(1)">
                <a href="javascript:void(0);" class="page-button">1</a>
            </li>
            <!-- 展开较前的页码 -->
            <li v-show="renderList[0] > 2 && current > 3"
                :class="[
                    'page-item',
                    {
                        'page-omit': type !== 'compact'
                    }
                ]" @click="prevGroup">
                <span class="page-button">...</span>
            </li>
            <!-- 渲染主要页码列表 -->
            <li class="page-item" v-for="(item, index) in renderList" :key="index" :class="{ 'cur-page': item === current }" @click="jumpToPage(item)">
                <a href="javascript:void(0);" class="page-button">{{ item }}</a>
            </li>
            <!-- 展开较后的页码 -->
            <li v-show="renderList[renderList.length - 1] < total - 1"
                :class="[
                    'page-item',
                    {
                        'page-omit': type !== 'compact'
                    }
                ]" @click="nextGroup">
                <span class="page-button">...</span>
            </li>
            <!-- 最后一页 -->
            <li class="page-item"
                v-show="renderList[renderList.length - 1] !== total"
                :class="{
                    'cur-page': current === total
                }"
                @click="jumpToPage(total)">
                <a href="javascript:void(0);" class="page-button">{{ total }}</a>
            </li>
            <!-- 下一页 -->
            <li class="page-item" :class="{ disabled: current === total }" @click="nextPage">
                <a href="javascript:void(0);" class="page-button">
                    <i class="bk-icon icon-angle-right"></i>
                </a>
            </li>
        </ul>
        <small-jump v-else :current="current" :total="total" @on-change="jumpToPage" />
    </div>
</template>
<script>
    /**
     *  bk-pagination
     *  @module components/pagination
     *  @desc 分页组件
     *  @param type {String} - 组件的类型，可选default和compact，默认为default
     *  @param size {String} - 组件的尺寸，可选default和small，默认为default
     *  @param total {Number} - 总页数，默认为20
     *  @param current {Number} - 当前页数，默认为1，支持.sync修饰符
     *  @param limitList {Array} - 自定义分页尺寸数组
     *  @param showLimit {Boolean} - 是否只显示页码
     *  @param location {String} - 自定义页码 位置
     *  @event change {Event} - 当改变页码时，广播给父组件的事件
     *  @example
     *  <bk-pagination
         :current.sync="current"
         :total="total"
         :type="'compact'"></bk-pagination>
    */
    import bkSelect from '../select/select.vue'
    import bkOption from '../select/option.vue'
    import locale from 'bk-magic-vue/lib/locale'
    import paginationSelectionCount from './pagination-selection-count.vue'
    import paginationTotalCount from './pagination-total-count.vue'
    import SmallJump from './small-jump'

    export default {
        name: 'bk-pagination',
        components: {
            bkSelect,
            bkOption,
            paginationSelectionCount,
            paginationTotalCount,
            SmallJump
        },
        mixins: [locale.mixin],
        props: {
            type: {
                type: String,
                default: 'default',
                validator (value) {
                    return [
                        'default',
                        'compact'
                    ].indexOf(value) > -1
                }
            },
            small: {
                type: Boolean,
                default: false
            },
            size: {
                type: String,
                default: 'default',
                validator (value) {
                    return ['default', 'small'].indexOf(value) > -1
                }
            },
            current: {
                type: Number,
                default: 1,
                required: true,
                validator (val) {
                    const positiveInteger = /^[1-9]+[0-9]*]*$/
                    return positiveInteger.test(val)
                }
            },
            limit: {
                type: Number,
                required: true
            },
            count: {
                type: Number,
                default: 0,
                required: true
            },
            align: {
                type: String,
                default: 'left',
                validator (val) {
                    return ['left', 'center', 'right'].includes(val)
                }
            },
            limitList: {
                type: Array,
                default: () => [10, 20, 50, 100]
            },
            showLimit: {
                type: Boolean,
                default: true
            },
            location: {
                type: String,
                default: 'right',
                validator (val) {
                    return ['left', 'right'].includes(val)
                }
            },
            showSelectionCount: Boolean,
            selectionCount: {
                type: Number,
                default: 0
            },
            showTotalCount: Boolean,
            // 外部设置的 class name
            extCls: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                pageSize: 5,
                renderList: [],
                curGroup: 1,
                limitListTmp: [],
                realityLimit: this.limit || 10,
                toggle: false // 分页条数当前下拉列表状态
            }
        },
        computed: {
            curLang () {
                const l = locale.getCurLang().bk.lang
                if (['zh', 'cn', 'zh-CN', 'zh-cn', 'zhCN', 'zhcn', 'zh-TW', 'zh-tw', 'zhTW', 'zhtw'].indexOf(l) > -1) {
                    return 'cn'
                }
                return 'en'
            },
            total () {
                return Math.ceil(this.count / this.realityLimit)
            },
            realityLocation () {
                if (this.align === 'left') {
                    return 'right'
                }
                if (this.align === 'right') {
                    return 'left'
                }
                return this.location
            }
        },
        watch: {
            realityLimit (val, oldVal) {
                this.$emit('update:limit', val)
                this.$emit('limit-change', val, oldVal)
            },
            current (newVal) {
                this.calcPageList(newVal)
            },
            total (newVal) {
                this.calcPageList(this.current)
            },
            limit (newVal) {
                if (this.limitList.includes(newVal)) {
                    this.realityLimit = newVal
                } else {
                    this.realityLimit = this.limitList[0]
                }
            },
            paginationIndex (newVal) {
                this.realityLimit = newVal
            }
        },
        created () {
            this.limitListTmp = this.limitList.map(page => {
                return {
                    id: page,
                    count: page
                }
            })
            if (this.limitList.includes(this.limit)) {
                this.realityLimit = this.limit
            } else {
                this.realityLimit = this.limitList[0]
            }
            this.calcPageList(this.current)
        },
        methods: {
            _array (size) {
                return Array.apply(null, {
                    length: size
                })
            },

            /**
             *  计算被渲染的页码数组
             *  @param current {number} 当前页码 or 下一次渲染的数组中的中间位置的页码数
             */
            calcPageList (current) {
                const total = this.total
                const pageSize = this.pageSize
                const size = pageSize > total ? total : pageSize

                if (current >= size - 1) { // 当前页码大于 pageSize
                    if (total - current > Math.floor(size / 2)) {
                        this.renderList = this._array(size).map((v, i) => i + current - Math.ceil(size / 2) + 1)
                    } else { // 当到了最后的 pageSize / 2 长度的页码时
                        this.renderList = this._array(size).map((v, i) => total - i).reverse()
                    }
                } else {
                    this.renderList = this._array(size).map((v, i) => i + 1)
                }
            },
            /**
             *  点击左侧...按钮
             */
            prevGroup () {
                const pageSize = this.pageSize
                const middlePage = this.renderList[Math.ceil(this.renderList.length / 2)]

                if (middlePage - pageSize < 1) {
                    this.calcPageList(1)
                } else {
                    this.calcPageList(middlePage - pageSize)
                }
                this.jumpToPage(this.renderList[Math.floor(this.renderList.length / 2)])
            },
            /**
             *  点击右侧...按钮
             */
            nextGroup () {
                const pageSize = this.pageSize
                const total = this.total
                const middlePage = this.renderList[Math.ceil(this.renderList.length / 2)]

                if (middlePage + pageSize > total) {
                    this.calcPageList(total)
                } else {
                    this.calcPageList(middlePage + pageSize)
                }
                this.jumpToPage(this.renderList[Math.floor(this.renderList.length / 2)])
            },
            // 上一页
            prevPage () {
                if (this.current !== 1) {
                    this.jumpToPage(this.current - 1)
                }
            },
            // 下一页
            nextPage () {
                if (this.current !== this.total) {
                    this.jumpToPage(this.current + 1)
                }
            },
            jumpToPage (page) {
                this.$emit('update:current', page)
                this.$emit('change', page)
            }
        }
    }
</script>

<style>
    @import '../../ui/pagination.css';
</style>
