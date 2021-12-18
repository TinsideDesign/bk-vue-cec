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
    <div class="bk-tag-selector" :class="extCls" @click="focusInputer($event)" ref="bkTagSelector" @mouseenter="mouseEnterHandler" @mouseleave="hover = false">
        <div :class="['bk-tag-input', { 'active': isEdit, 'disabled': disabled }]">
            <ul class="tag-list" :class="!localTagList.length ? 'no-item' : ''" ref="tagList" :style="{ 'margin-left': `${leftSpace}px` }">
                <li
                    class="key-node"
                    v-for="(tag, index) in localTagList"
                    :key="tag[saveKey] !== undefined ? tag[saveKey] : index"
                    @click="selectTag($event, tag)"
                    v-bk-tooltips.light="{ boundary: 'window', content: tag[tooltipKey], disabled: !tooltipKey }">
                    <tag-render :node="tag" :display-key="displayKey" :tpl="tagTpl" />
                    <i class="bk-icon icon-close remove-key" @click.stop="handlerTagRemove(tag, index)" v-if="!disabled && hasDeleteIcon"></i>
                </li>
                <li ref="staffInput" id="staffInput" class="staff-input" v-show="isEdit" role="input">
                    <input
                        type="text"
                        class="input"
                        ref="input"
                        v-model="curInputValue"
                        v-if="!disabled"
                        @input="handleInput"
                        @focus="handleFocus"
                        @paste="handlePaste"
                        @blur="handleBlur(curInputValue)"
                        @keydown="handleKeydown">
                </li>
            </ul>
            <p class="placeholder" v-show="!isEdit && !localTagList.length && !curInputValue.length">{{defaultPlaceholder}}</p>
            <i class="bk-icon icon-close-circle-shape clear-icon"
                v-if="isShowClear"
                @click.stop="handlerClear"></i>
        </div>
        <bk-popover
            class="bk-select-dropdown"
            placement="bottom-start"
            ref="tagInputDropdown"
            trigger="manual"
            theme="light bk-select-dropdown">
            <div class="bk-tag-popover-trigger"></div>
            <div slot="content">
                <div class="bk-selector-list" v-if="showList" :style="{ 'width': `${popoverWidth}px` }">
                    <template v-if="useGroup">
                        <ul ref="selectorList" :style="{ 'max-height': `${contentMaxHeight}px` }" class="outside-ul" v-show="Object.keys(resultList).length">
                            <li v-for="(group, key) in resultList"
                                class="bk-selector-group-item"
                                :key="key">
                                <span class="group-name">{{group.name}} ({{group.children.length}})</span>
                                <ul class="bk-selector-group-list-item">
                                    <li v-for="(data, index) in group.children"
                                        :class="['bk-selector-list-item', { disabled: data.disabled }, activeClass(data,index)]"
                                        :key="index"
                                        @mousedown="handlerResultSelect(data, 'select')">
                                        <list-render :node="data" :display-key="displayKey" :tpl="tpl" :search-key="searchKey" :search-keyword="curInputValue" />
                                    </li>
                                </ul>
                            </li>
                            <li class="bk-selector-list-item" v-if="showScrollLoading">
                                <div class="loading" v-bkloading="{ isLoading: true, size: 'mini', theme: 'black' }"></div>
                            </li>
                        </ul>
                    </template>
                    <template v-else>
                        <ul ref="selectorList" :style="{ 'max-height': `${contentMaxHeight}px` }" class="outside-ul" v-show="resultList.length">
                            <li v-for="(data, index) in resultList"
                                :class="['bk-selector-list-item', { disabled: data.disabled }, activeClass(data, index)]"
                                :key="index"
                                @click="handlerResultSelect(data, 'select')">
                                <list-render :node="data" :display-key="displayKey" :tpl="tpl" :search-key="searchKey" :search-keyword="curInputValue" />
                            </li>
                            <li class="bk-selector-list-item" v-if="showScrollLoading">
                                <div class="loading" v-bkloading="{ isLoading: true, size: 'mini', theme: 'black' }"></div>
                            </li>
                        </ul>
                    </template>
                </div>
            </div>
        </bk-popover>
    </div>
</template>

<script>
    import 'array-flat-polyfill'

    import listRender from './render'
    import tagRender from './tag-render'
    import locale from 'bk-magic-vue/lib/locale'
    import bkLoading from '@/components/loading/directive'
    import emitter from '@/mixins/emitter'
    import bkPopover from '@/components/popover'
    import bkTooltips from '@/directives/tooltips'

    export default {
        name: 'bk-tag-input',
        components: { listRender, tagRender, bkPopover },
        directives: {
            bkloading: bkLoading,
            bkTooltips: bkTooltips
        },
        mixins: [locale.mixin, emitter],
        props: {
            showClearOnlyHover: {
                type: Boolean,
                default: false
            },
            placeholder: {
                type: String,
                default: ''
            },
            value: {
                type: Array,
                default () {
                    return []
                }
            },
            leftSpace: {
                type: Number,
                default: 0
            },
            disabled: {
                type: Boolean,
                default: false
            },
            hasDeleteIcon: {
                type: Boolean,
                default: false
            },
            separator: {
                type: String,
                default: ''
            },
            maxData: {
                type: Number,
                default: -1
            },
            maxResult: {
                type: Number,
                default: 10
            },
            isBlurTrigger: {
                type: Boolean,
                default: true
            },
            saveKey: {
                type: String,
                default: 'id'
            },
            displayKey: {
                type: String,
                default: 'name'
            },
            tooltipKey: {
                type: String,
                default: ''
            },
            searchKey: {
                type: [String, Array],
                default: 'name'
            },
            useGroup: {
                type: Boolean,
                default: false
            },
            list: {
                type: Array,
                default: () => ([])
            },
            contentWidth: {
                type: Number,
                default: 190
            },
            contentMaxHeight: {
                type: Number,
                default: 300
            },
            allowCreate: {
                type: Boolean,
                default: false
            },
            clearable: {
                type: Boolean,
                default: true
            },
            tpl: Function,
            tagTpl: Function,
            pasteFn: Function,
            filterCallback: {
                type: Function,
                default: null
            },
            popoverOptions: {
                type: Object,
                default () {
                    return {
                        distance: 0
                    }
                }
            },
            trigger: {
                type: String,
                default: 'search',
                validator (value) {
                    if (['focus', 'search'].indexOf(value) < 0) {
                        console.error(`size property is not valid: '${value}'`)
                        return false
                    }
                    return true
                }
            },
            // 外部设置的 class name
            extCls: {
                type: String,
                default: ''
            },
            // 允许用户选择完后继续输入下一个
            allowNextFocus: {
                type: Boolean,
                default: true
            },
            allowAutoMatch: {
                type: Boolean,
                default: false
            },
            createTagValidator: {
                type: Function,
                default: null
            }
        },
        data () {
            return {
                curInputValue: '',
                cacheVal: '',
                timer: 0,
                focusItemIndex: this.allowCreate ? -1 : 0, // 列表选中项
                isEdit: false,
                showList: false,
                isCanRemoveTag: false,
                tagList: [], // 已选的标签索引列表
                localTagList: [], // 已选的标签对象列表
                tagListCache: [], // 用于单选时做已选标签索引的临时保存
                localTagListCache: [], // 用于单选时做已选标签对象的临时保存
                renderList: [],
                renderListShadow: [],
                renderListPaged: [],
                renderListAll: [],
                initData: [],
                curPage: 1,
                totalSize: 0,
                totalPage: 0,
                pageSize: 0,
                showScrollLoading: false,
                isBeforeDestroy: false,
                bkTagSelector: null,
                popoverInstance: null,
                isSingleSelect: false,
                INPUT_MIN_WIDTH: 12,
                popoverWidth: 190,
                hover: false
            }
        },
        computed: {
            isShowClear () {
                /**
                 * 下列情况下不显示清空按钮：
                 * 1. 设置不可清除
                 * 2. 禁用时
                 * 3. tag标签为空时
                 * 4. 设置了showClearOnlyHover，且没有hover的时候
                 */
                return this.clearable && !this.disabled && this.localTagList.length !== 0 && (this.showClearOnlyHover ? this.hover : true)
            },
            resultList () {
                if (this.useGroup) {
                    const result = {}
                    this.renderList.forEach((item, index) => {
                        item.index = index
                        if (!result[item.group.groupId]) {
                            result[item.group.groupId] = {
                                id: item.group.groupId,
                                name: item.group.groupName,
                                children: []
                            }
                        }
                        result[item.group.groupId].children.push(item)
                    })
                    return result
                } else {
                    return this.renderList
                }
            },
            defaultPlaceholder () {
                return this.placeholder || this.t('bk.tagInput.placeholder')
            }
        },
        watch: {
            curInputValue (newVal, oldVal) {
                if (newVal !== '' && this.renderList.length) {
                    this.showList = true
                } else if (this.trigger !== 'focus') {
                    setTimeout(() => {
                        this.showList = false
                    }, 100)
                }
            },
            showList (val) {
                if (val) {
                    this.$nextTick(() => {
                        this.showPopover()
                    })
                }
            },
            list (val) {
                if (val) {
                    this.getData()
                }
            },
            value () {
                this.getData()
            },
            maxData (val) {
                this.isSingleSelect = val === 1
            }
        },
        created () {
            this.isSingleSelect = this.maxData === 1
            this.pageSize = this.maxResult
            this.getData()
        },
        mounted () {
            this.bkTagSelector = this.$refs.bkTagSelector
            this.popoverInstance = this.$refs['tagInputDropdown']
        },
        beforeDestroy () {
            this.isBeforeDestroy = true
            const selectorList = this.$refs.selectorList
            selectorList && selectorList.removeEventListener('scroll', this.scrollHandler)
            clearTimeout(this.timer)
        },
        methods: {
            mouseEnterHandler () {
                this.hover = true
            },
            handlerClear () {
                this.tagList = []
                this.localTagList = []
                this.handlerChange('removeAll')
            },
            showPopover () {
                const inputLeft = this.isSingleSelect ? 0 : this.$refs.staffInput.offsetLeft
                this.popoverInstance.instance.set({
                    offset: `${inputLeft}, 0`
                })

                if (this.popoverInstance.instance.popperInstance) {
                    this.popoverInstance.instance.popperInstance.update()
                }

                // 监听滚动，内容过多可分页加载
                const selectorList = this.$refs.selectorList
                if (selectorList) {
                    selectorList.scrollTop = 0
                    selectorList.removeEventListener('scroll', this.scrollHandler)
                    selectorList.addEventListener('scroll', this.scrollHandler)
                }
                this.popoverInstance.instance.show()
            },
            // 获取字符长度，汉字两个字节
            getCharLength (str) {
                const len = str.length
                let bitLen = 0

                for (let i = 0; i < len; i++) {
                    if ((str.charCodeAt(i) & 0xff00) !== 0) {
                        bitLen++
                    }
                    bitLen++
                }

                return bitLen
            },
            // 过滤数据
            filterData (val = '') {
                val = val.toLowerCase()
                let filterData
                if (typeof this.filterCallback === 'function') {
                    filterData = this.filterCallback(val, this.searchKey, this.initData) || []
                } else {
                    // 根据文本框输入的值筛选过来的数据
                    if (Array.isArray(this.searchKey)) {
                        // 数组，过滤多个关键字
                        const filterDataList = this.searchKey.map(searchKey => {
                            return this.initData.filter(item => item[searchKey].toLowerCase().indexOf(val) !== -1)
                        })
                        filterData = Array.from(new Set(filterDataList.flat()))
                    } else {
                        filterData = this.initData.filter(item => item[this.searchKey].toLowerCase().indexOf(val) !== -1)
                    }
                }
                // 这里不能用 splice 复制，因为调用 splice 的时候，会编译成 Array.splice.apply(...) 这样的形式
                // 函数的 apply 方式有参数个数限制的 https://bugs.webkit.org/show_bug.cgi?id=80797
                this.renderListAll = filterData.slice(0)
                this.renderListShadow = filterData.slice(0)

                this.initPageConf(this.renderListAll.length)
            },
            /**
             * 初始化翻页
             *
             * @param {number} count 数据总条数
             */
            initPageConf (count) {
                this.curPage = 1
                this.totalSize = count
                this.totalPage = Math.ceil(this.totalSize / this.pageSize) || 1

                const list = []
                for (let i = 0; i < this.totalSize; i += this.pageSize) {
                    list.push(this.renderListShadow.slice(i, i + this.pageSize))
                }
                this.renderListPaged = list
                this.renderList.splice(0, this.renderList.length, ...(this.renderListPaged[this.curPage - 1] || []))
            },

            /**
             * 翻页回调
             *
             * @param {number} page 当前页
             */
            pageChange (page) {
                this.curPage = page
                this.renderList.splice(this.renderList.length, 0, ...this.renderListPaged[this.curPage - 1])
                this.showScrollLoading = false
            },

            /**
             * 滚动回调
             *
             * @param {Object} e 事件对象
             */
            scrollHandler (e) {
                if (this.showScrollLoading || this.isBeforeDestroy) {
                    return
                }

                const scrollContainer = this.$refs.selectorList
                if (scrollContainer.scrollTop === 0) {
                    return
                }

                if (scrollContainer.scrollTop + scrollContainer.offsetHeight >= scrollContainer.scrollHeight) {
                    const curPage = ++this.curPage
                    if (curPage <= this.totalPage) {
                        this.showScrollLoading = true
                        setTimeout(async () => {
                            await this.pageChange(curPage)
                        }, 500)
                    }
                }
            },

            /**
             * optionList transition 动画离开后的回调
             */
            transitionAfterLeave () {
                this.renderList.splice(0, this.renderList.length, ...[])
            },

            // 更新样式
            activeClass (data, i) {
                const style = {
                    'bk-selector-actived': false,
                    'bk-selector-selected': this.localTagList.includes(data[this.saveKey])
                }
                if (this.useGroup) {
                    style['bk-selector-actived'] = data.index === this.focusItemIndex
                } else {
                    style['bk-selector-actived'] = i === this.focusItemIndex
                }

                return style
            },
            // 获取元素位置
            getSiteInfo () {
                const res = {
                    index: 0,
                    temp: []
                }
                const nodes = this.$refs.tagList.childNodes

                for (let i = 0; i < nodes.length; i++) {
                    const node = nodes[i]

                    if (!(node.nodeType === 3 && !/\S/.test(node.nodeValue))) {
                        res.temp.push(node)
                    }
                }

                // 单选时，当前替换位置为第一个元素
                if (this.isSingleSelect) {
                    res.index = 0
                } else {
                    Object.keys(res.temp).forEach(key => {
                        if (res.temp[key].id === 'staffInput') {
                            res.index = key
                        }
                    })
                }

                return res
            },
            getInputIndex () {
                const nodes = this.$refs.tagList.childNodes
                let index = -1
                for (let i = 0; i < nodes.length; i++) {
                    const currentNode = nodes[i]
                    if (currentNode.getAttribute && currentNode.getAttribute('role') === 'input') {
                        index = i
                    }
                }
                return index
            },
            formatGroupList () {
                const allList = []
                this.list.forEach(item => {
                    if (item.children) {
                        item.children.forEach(child => {
                            const params = {
                                ...child
                            }
                            params.group = {
                                groupId: item[this.saveKey],
                                groupName: item[this.displayKey]
                            }
                            allList.push(params)
                        })
                        // allList = allList.concat(item.children)
                    }
                })
                return allList
            },
            getData () {
                this.tagList = []
                this.localTagList = []

                this.initData = []
                if (this.useGroup) {
                    this.allList = this.formatGroupList()
                    // this.initData = [...this.allList]
                    this.allList.forEach(item => {
                        this.initData.push(item)
                    })
                } else {
                    // this.initData = [...this.list]
                    this.list.forEach(item => {
                        this.initData.push(item)
                    })
                }

                if (this.value.length) {
                    this.value.forEach(tag => {
                        const val = this.initData.find(val => tag === val[this.saveKey])
                        if (val !== undefined) {
                            this.localTagList.push(val)
                            this.tagList.push(val[this.saveKey])
                        } else if (this.allowCreate && !this.tagList.includes(tag)) {
                            const temp = { [this.saveKey]: tag, [this.displayKey]: tag }
                            this.localTagList.splice(this.localTagList.length, 0, temp)
                            this.tagList.splice(this.tagList.length, 0, tag)
                        }
                    })

                    // 如果不是单选时，需要将已选的过滤掉
                    if (!this.isSingleSelect) {
                        this.initData = this.initData.filter(val => {
                            return !this.value.includes(val[this.saveKey])
                        })
                    }
                    // this.initData = this.initData.filter(val => !this.value.some(tag => tag.includes(val[this.saveKey])))
                }

                // 如果需要首次展示列表，先初始化renderList
                if (this.trigger === 'focus') {
                    this.filterData()
                }
            },
            selectTag (event, tag) {
                if (this.disabled) {
                    return
                }
                this.insertAfter(this.$refs.staffInput, event.currentTarget)
                this.$refs.input.style.width = this.INPUT_MIN_WIDTH + 'px'
            },
            handleInput (event) {
                if (this.maxData === -1 || this.maxData > this.tagList.length) {
                    const { value } = event.target
                    const charLen = this.getCharLength(value)

                    this.cacheVal = value
                    if (charLen) {
                        this.isCanRemoveTag = false
                        this.filterData(value)
                        this.$refs.input.style.width = (charLen * this.INPUT_MIN_WIDTH) + 'px'
                    } else {
                        this.isCanRemoveTag = true
                        if (this.trigger === 'focus') {
                            this.filterData()
                        }
                    }
                } else {
                    this.handleBlur()
                    this.curInputValue = ''
                    this.showList = false
                }

                this.isEdit = true
                // 重置下拉菜单选中信息
                this.focusItemIndex = this.allowCreate ? -1 : 0
            },
            handleFocus (event) {
                this.isCanRemoveTag = true
                this.dispatch('bk-form-item', 'form-focus')
                this.popoverWidth = this.isSingleSelect ? this.bkTagSelector.clientWidth : this.contentWidth
                event.currentTarget.select()
            },
            handlePaste (event) {
                // 单选禁止复制粘贴，防止粘贴多个tag
                if (this.isSingleSelect) {
                    return false
                }
                event.preventDefault()

                const value = event.clipboardData.getData('text')
                const valArr = this.pasteFn ? this.pasteFn(value) : this.defaultPasteFn(value)
                let tags = []

                valArr.map(val => tags.push(val[this.saveKey]))

                if (tags.length) {
                    const nodes = this.$refs.tagList.childNodes
                    const result = this.getSiteInfo()
                    const localTags = []
                    const localInitDara = []

                    this.initData.map(data => {
                        localInitDara.push(data[this.saveKey])
                    })
                    tags = tags.filter(tag => {
                        return tag && tag.trim() && !this.tagList.includes(tag) && localInitDara.includes(tag)
                    })

                    // 最大显示限制处理
                    if (this.maxData !== -1) {
                        if (this.tagList.length < this.maxData) {
                            const differ = this.maxData - this.tagList.length
                            if (tags.length > differ) {
                                tags = [...tags.slice(0, (differ))]
                            }
                        } else {
                            tags = []
                        }
                    }

                    tags.map(tag => {
                        const temp = {}
                        temp[this.saveKey] = tag
                        temp[this.displayKey] = tag
                        localTags.push(temp)
                    })

                    if (tags.length) {
                        this.tagList.splice(result.index, 0, ...tags)
                        this.localTagList.splice(result.index, 0, ...localTags)

                        const site = nodes[parseInt(result.index)]
                        this.insertAfter(this.$refs.staffInput, site)
                        this.focusInputer()
                        this.$refs.input.style.width = this.INPUT_MIN_WIDTH + 'px'
                        // tags.map(tag => {
                        //     this.initData = this.initData.filter(val => !tag.includes(val[this.saveKey]))
                        // })
                        this.initData = this.initData.filter(val => {
                            return !tags.includes(val[this.saveKey])
                        })
                        this.handlerChange('select')
                    }
                }
            },
            defaultPasteFn (val) {
                const target = []
                const textArr = val.split(';')

                textArr.map(item => {
                    if (item.match(/^[a-zA-Z][a-zA-Z_]+/g)) {
                        const finalItem = item.match(/^[a-zA-Z][a-zA-Z_]+/g).join('')
                        const temp = {}
                        temp[this.saveKey] = finalItem
                        temp[this.displayKey] = finalItem
                        target.push(temp)
                    }
                })
                return target
            },
            updateScrollTop () {
                // 获取下拉列表容器的位置信息，用于判断上下键选中的元素是否在可视区域，若不在则需滚动至可视区域
                const panelObj = this.$refs.selectorList
                const panelInfo = {
                    height: panelObj.clientHeight,
                    yAxis: panelObj.getBoundingClientRect().y
                }

                this.$nextTick(() => {
                    const activeObj = this.$refs.selectorList.querySelector('.bk-selector-actived')
                    if (!activeObj) {
                        return
                    }
                    const activeInfo = {
                        height: activeObj.clientHeight,
                        yAxis: activeObj.getBoundingClientRect().y
                    }

                    // 选中元素顶部坐标大于容器顶部坐标时，则该元素有部分或者全部区域不在可视区域，执行滚动
                    if (activeInfo.yAxis < panelInfo.yAxis) {
                        const currentScTop = panelObj.scrollTop
                        panelObj.scrollTop = currentScTop - (panelInfo.yAxis - activeInfo.yAxis)
                    }

                    const distanceToBottom = activeInfo.yAxis + activeInfo.height - panelInfo.yAxis

                    // 选中元素底部坐标大于容器顶部坐标，且超出容器的实际高度，则该元素有部分或者全部区域不在可视区域，执行滚动
                    if (distanceToBottom > panelInfo.height) {
                        const currentScTop = panelObj.scrollTop
                        panelObj.scrollTop = currentScTop + distanceToBottom - panelInfo.height
                    }
                })
            },
            handleKeydown (event) {
                if (this.showScrollLoading) {
                    return
                }

                let target
                const val = event.target.value
                const valLen = this.getCharLength(val)
                const result = this.getSiteInfo()

                const inputIndex = this.getInputIndex()
                const nodes = this.$refs.tagList.childNodes

                switch (event.code) {
                    case 'ArrowUp':
                        // 上
                        event.preventDefault()
                        if (!this.showList) {
                            return
                        }
                        this.focusItemIndex--
                        this.focusItemIndex = this.focusItemIndex < 0 ? -1 : this.focusItemIndex
                        if (this.focusItemIndex === -1) {
                            this.focusItemIndex = this.renderList.length - 1
                        }
                        this.updateScrollTop()
                        break
                    case 'ArrowDown':
                        // 下
                        event.preventDefault()
                        if (!this.showList) {
                            return
                        }
                        this.focusItemIndex++
                        this.focusItemIndex = this.focusItemIndex > this.renderList.length - 1
                            ? this.renderList.length
                            : this.focusItemIndex
                        if (this.focusItemIndex === this.renderList.length) {
                            this.focusItemIndex = 0
                        }
                        this.updateScrollTop()
                        break
                    case 'ArrowLeft':
                        this.isEdit = true
                        if (!valLen) {
                            // 输入框已经是第一个节点，无法左移
                            if (inputIndex < 1) {
                                return
                            }
                            this.$refs.tagList.insertBefore(this.$refs.staffInput, nodes[inputIndex - 1])
                            this.$refs.input.value = ''
                            this.$refs.input.style.width = this.INPUT_MIN_WIDTH + 'px'
                            this.focusInputer()
                        }
                        break
                    case 'ArrowRight':
                        this.isEdit = true
                        if (!valLen) {
                            // 输入框已经是最后一个节点，无法右移
                            if (inputIndex === nodes.length - 1) {
                                return
                            }
                            this.insertAfter(this.$refs.staffInput, nodes[inputIndex + 1])
                            this.focusInputer()
                        }
                        break
                    case 'Enter':
                    case 'NumpadEnter':
                        if ((!this.allowCreate && this.showList)
                            || (this.allowCreate && this.focusItemIndex >= 0 && this.showList)
                        ) {
                            this.handlerResultSelect(this.renderList[this.focusItemIndex], 'select')
                            this.showList = false
                        } else if (this.allowCreate) {
                            event.preventDefault()
                            const tag = this.curInputValue
                            this.handlerResultSelect(tag, 'custom')
                        }
                        this.cacheVal = ''
                        // 如果是enter, 防止触发form submit
                        event.preventDefault()
                        break
                    case 'Backspace':
                        if (parseInt(result.index, 10) !== 0 && !this.curInputValue.length) {
                            target = this.localTagList[result.index - 1]
                            this.backspaceHandler(result.index, target)
                        }
                        break
                    default:
                        break
                }
            },
            // 选中标签
            handlerResultSelect (item, type) {
                // 如果 item 不存在（备选项中没有包含输入的字母的情况即输入关键字没有备选项出现的情况）或者选中标签所在组是禁用状态，返回
                if (!item || item.disabled) {
                    // this.focusInputer()
                    return
                }
                // 如果是单选，清空上一次缓存结果
                if (this.isSingleSelect) {
                    this.clearSingleCache()
                }
                this.addTag(item, type)
                this.handlerChange('select')
                this.clearInput()
                this.showList = false
            },
            // 输入清除
            backspaceHandler (index, target) {
                // 如果清空输入
                if (!this.curInputValue) {
                    if (this.isCanRemoveTag) {
                        this.tagList.splice(index - 1, 1)
                        this.localTagList.splice(index - 1, 1)

                        const nodes = this.$refs.tagList.childNodes
                        const result = this.getSiteInfo()
                        const key = parseInt(result.index, 10) === 1 ? 1 : parseInt(result.index, 10) - 2
                        const site = nodes[key]

                        this.insertAfter(this.$refs.staffInput, site)
                        this.focusInputer()

                        const localList = this.useGroup ? this.allList : this.list
                        const isExistInit = localList.some(item => {
                            return item === target[this.saveKey]
                        })

                        // 将删除的项加入加列表
                        if (((this.allowCreate && isExistInit) || !this.allowCreate) && !this.isSingleSelect) {
                            this.initData.push(target)
                        }

                        this.$refs.input.style.width = this.INPUT_MIN_WIDTH + 'px'
                        this.handlerChange('remove')
                    }
                    this.isCanRemoveTag = true
                }
            },

            // 删除标签
            handlerTagRemove (data, index) {
                this.removeTag(data, index)
                this.$refs.input.style.width = this.INPUT_MIN_WIDTH + 'px'
                this.resetInput()
                this.handlerChange('remove')
            },

            removeTag (data, index) {
                this.tagList.splice(index, 1)
                this.localTagList.splice(index, 1)

                const localList = this.useGroup ? this.allList : this.list
                const isExistInit = localList.some(item => {
                    return item === data[this.saveKey]
                })

                // 将删除的项加入加列表
                if (((this.allowCreate && isExistInit) || !this.allowCreate) && !this.isSingleSelect) {
                    this.initData.push(data)
                }
            },

            addTag (item, type) {
                const nodes = this.$refs.tagList.childNodes
                const result = this.getSiteInfo()
                let isSelected = false
                let tags = []
                let newVal
                // 自定义
                if (type === 'custom') {
                    // 自定义时，如果配置分隔符可以一次性输入多个值
                    if (this.separator) {
                        const localTags = []
                        tags = item.split(this.separator)
                        tags = tags.filter(tag => {
                            const validate = typeof this.createTagValidator === 'function' ? this.createTagValidator(tag) : true
                            return tag && tag.trim() && !this.tagList.includes(tag) && validate
                        })
                        tags.forEach(tag => {
                            const temp = {}
                            temp[this.saveKey] = tag
                            temp[this.displayKey] = tag
                            localTags.push(temp)
                        })

                        if (tags.length) {
                            this.tagList.splice(result.index, 0, ...tags)
                            this.localTagList.splice(result.index, 0, ...localTags)
                            isSelected = true
                        }
                    } else {
                        if (typeof item === 'object') {
                            newVal = item[this.saveKey]
                            const validate = typeof this.createTagValidator === 'function' ? this.createTagValidator(newVal) : true
                            if (newVal && !this.tagList.includes(newVal) && validate) {
                                newVal = newVal.replace(/\s+/g, '')

                                if (newVal !== undefined) {
                                    this.tagList.splice(result.index, 0, newVal)
                                    this.localTagList.splice(result.index, 0, item)
                                    isSelected = true
                                }
                            }
                        } else {
                            const localItem = {}
                            newVal = item.trim()
                            localItem[this.saveKey] = newVal
                            localItem[this.displayKey] = newVal
                            const validate = typeof this.createTagValidator === 'function' ? this.createTagValidator(newVal) : true
                            if (newVal !== undefined && !this.tagList.includes(newVal) && validate) {
                                this.tagList.splice(result.index, 0, newVal)
                                this.localTagList.splice(result.index, 0, localItem)
                                isSelected = true
                            }
                        }
                    }
                } else if (item) {
                    newVal = item[this.saveKey]
                    if (newVal !== undefined && !this.tagList.includes(newVal)) {
                        this.tagList.splice(result.index, 0, newVal)
                        this.localTagList.splice(result.index, 0, item)
                        isSelected = true
                    }
                }

                if (isSelected) {
                    this.$nextTick(() => {
                        const site = nodes[parseInt(result.index, 10) + 1]
                        this.insertAfter(this.$refs.staffInput, site)
                        this.$refs.input.style.width = this.INPUT_MIN_WIDTH + 'px'

                        // 如果不是单选，focus继续让用户进行下一个输入
                        if (!this.isSingleSelect && this.allowNextFocus) {
                            this.focusInputer()
                        }

                        // 如果不是单选，将已经选中的项从数据列表中去除
                        if (!this.isSingleSelect) {
                            this.initData = this.initData.filter(val => {
                                return !this.tagList.includes(val[this.saveKey])
                            })
                        }
                    })
                }
            },

            handlerChange (type) {
                this.$emit('input', this.tagList)
                this.$emit('change', this.tagList)
                this.dispatch('bk-form-item', 'form-change')
                this.$emit(type)
                this.$emit('update:tags', this.tagList)
            },
            // 清空输入框
            clearInput () {
                this.curInputValue = ''
                this.cacheVal = ''
            },
            handleBlur (inputValue) {
                // this.resetInput()
                this.timer = setTimeout(() => {
                    const inputValue = this.curInputValue
                    this.clearInput()
                    // 通知表单组件，可用于实时验证
                    this.dispatch('bk-form-item', 'form-blur')
                    this.isEdit = false

                    if (this.isSingleSelect) {
                        const [oldVal] = this.tagListCache
                        // 如果是单选，且input不为空，即保留了上次的结果则恢复
                        if (inputValue && inputValue === oldVal && this.localTagListCache.length) {
                            this.addTag(this.localTagListCache[0], 'select')
                        } else {
                            this.handlerChange('remove')
                        }
                    } else if (this.allowAutoMatch && inputValue) {
                        // 如果匹配，则自动选则
                        const matchItem = this.renderList.find(item => item[this.searchKey] === inputValue)
                        if (matchItem) {
                            this.handlerResultSelect(matchItem, 'select')
                        } else if (this.allowCreate) {
                            // 支持自定义
                            this.handlerResultSelect(inputValue, 'custom')
                        }
                    }
                    this.$emit('blur', inputValue, this.tagList)
                }, 200)
            },
            // 输入框获取焦点时触发
            focusInputer (event) {
                if (this.disabled) {
                    return
                }
                if (event && event.target) {
                    const className = event.target.className
                    if ((className.indexOf('bk-tag-input') > -1 || className.indexOf('tag-list') > -1)) {
                        this.curInputValue = this.cacheVal
                        // 如果没点在节点上，重置input位置（在最后插入input）
                        this.$refs.tagList.appendChild(this.$refs.staffInput)
                    }
                }

                clearTimeout(this.timer)

                // 如果是单选，在获取焦点时自动定位为当前值
                if (this.isSingleSelect && this.tagList.length) {
                    this.tagListCache = [...this.tagList]
                    this.localTagListCache = [...this.localTagList]

                    this.curInputValue = this.localTagListCache[0][this.saveKey]
                    this.removeTag(this.localTagList[0], 0)

                    this.handleInput({
                        target: {
                            value: this.curInputValue
                        }
                    })
                }

                this.isEdit = true

                this.$nextTick(() => {
                    this.$refs.input.focus()
                    if (this.trigger === 'focus') {
                        this.showList = true
                        this.filterData()
                        this.showPopover()
                    }
                })
            },
            clearSingleCache () {
                this.tagListCache = []
                this.localTagListCache = []
                this.tagList = []
                this.localTagList = []
            },
            // 改变元素位置
            insertAfter (newElement, targetElement) {
                if (newElement.nextSibling === newElement) {
                    return false
                }

                targetElement.parentNode.insertBefore(newElement, targetElement ? targetElement.nextSibling : null)
            },
            // 重置input框位置
            resetInput () {
                const nodes = this.$refs.tagList.childNodes
                const result = this.getSiteInfo()
                if (result.index !== result.temp.length) {
                    this.clearInput()
                    const site = nodes[nodes.length - 1]
                    this.insertAfter(this.$refs.staffInput, site)
                }
            }
        }
    }
</script>

<style>
    @import '../../ui/tag-input.css';
    @import '../../ui/select.css';
</style>
