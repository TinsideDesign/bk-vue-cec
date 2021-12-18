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
    <div class="search-select-wrap" :class="extCls" :style="{ 'z-index': wrapZindex }" v-bind="$attrs">
        <div ref="wrap"
            class="bk-search-select"
            :class="{ 'is-focus': input.focus }"
            @click="handleWrapClick">
            <div class="search-prefix">
                <slot name="prefix"></slot>
            </div>
            <div class="search-input" :style="{ maxHeight: (shrink ? (input.focus ? maxHeight : minHeight) : maxHeight) + 'px' }">
                <template v-for="(item,index) in chip.list">
                    <div
                        class="search-input-chip"
                        :key="`${index}_pre_key`"
                        v-if="overflow.chipIndex >= 0 ? index < overflow.chipIndex : index >= 0">
                        <span class="chip-name">
                            {{item[displayKey] + (item.values && item.values.length ? explainCode + (item.condition ? item.condition[displayKey] : '') + item.values.map(v => v[displayKey]).join(splitCode) : '')}}
                        </span>
                        <span class="chip-clear bk-icon icon-close" @click="handleClear(index,item)"></span>
                    </div>
                </template>
                <div v-if="chip.list.length && overflow.chipIndex >= 0" class="search-input-chip overflow-chip" style="padding-right: 8px;">+{{chip.list.length - overflow.chipIndex}}</div>
                <template v-if="chip.list.length && overflow.chipIndex >= 0">
                    <template v-for="(item,index) in chip.list">
                        <div
                            class="search-input-chip hidden-chip"
                            :key="`${index}_next_key`"
                            v-if="index >= overflow.chipIndex">
                            <span class="chip-name">
                                {{item[displayKey] + (item.values && item.values.length ? explainCode + (item.condition ? item.condition[displayKey] : '') + item.values.map(v => v[displayKey]).join(splitCode) : '')}}
                            </span>
                            <span class="chip-clear bk-icon icon-close" @click="handleClear(index,item)"></span>
                        </div>
                    </template>
                </template>
                <div class="search-input-input">
                    <div
                        ref="input"
                        class="div-input"
                        :class="{ 'input-before': !chip.list.length && !input.value.length, 'input-after': showItemPlaceholder }"
                        contenteditable="plaintext-only"
                        :data-placeholder="defaultPlaceholder"
                        :data-tips="curItem.placeholder || ''"
                        spellcheck="false"
                        @click="handleInputClick"
                        v-clickoutside="handleInputOutSide"
                        @focus="handleInputFocus"
                        @cut="handleInputCut"
                        @input="handleInputChange"
                        @keydown="handleInputKeyup">
                    </div>
                </div>
            </div>
            <div class="search-nextfix">
                <i v-if="clearable && (chip.list.length || input.value.length)" class="search-clear bk-icon icon-close-circle-shape" @click.self="handleClearAll"></i>
                <slot name="nextfix">
                    <i @click.self="handleClickSearch" class="bk-icon icon-search search-nextfix-icon" :class="{ 'is-focus': input.focus }"></i>
                </slot>
            </div>
        </div>
        <div class="bk-select-tips" v-if="validateStr.length">
            <slot name="validate">
                <i class="bk-icon icon-exclamation-circle-shape select-tips"></i>{{validateStr || ''}}
            </slot>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { debounce } from 'throttle-debounce'
    import locale from 'bk-magic-vue/lib/locale'
    import Tippy from '@/utils/tippy'
    import emitter from '@/mixins/emitter'
    import clickoutside from '@/directives/clickoutside.js'
    import SearchInputMenu from './search-select-menu'
    import { dropdownMarginBottom } from '@/ui/variable'
    import { addResizeListener, removeResizeListener } from '@/utils/resize-events'

    export default {
        name: 'bk-search-select',
        directives: {
            clickoutside
        },
        mixins: [emitter, locale.mixin],
        model: {
            prop: 'values',
            event: 'change'
        },
        props: {
            data: {
                type: Array,
                default () {
                    return []
                }
            },
            splitCode: {
                type: String,
                default: ' | '
            },
            explainCode: {
                type: String,
                default: '：'
            },
            placeholder: {
                type: String,
                default: ''
            },
            emptyText: {
                type: String,
                default: ''
            },
            maxHeight: {
                type: [String, Number],
                default: 120
            },
            minHeight: {
                type: [String, Number],
                default: 26
            },
            shrink: {
                type: Boolean,
                default: true
            },
            showDelay: {
                type: Number,
                default: 100
            },
            displayKey: {
                type: String,
                default: 'name'
            },
            primaryKey: {
                type: String,
                default: 'id'
            },
            condition: {
                type: Object,
                default () {
                    return {}
                }
            },
            values: {
                type: Array,
                default () {
                    return []
                }
            },
            filter: Boolean,
            filterChildrenMethod: Function,
            filterMenuMethod: Function,
            remoteMethod: Function,
            remoteEmptyText: {
                type: String,
                default: ''
            },
            remoteLoadingText: {
                type: String,
                default: ''
            },
            multiable: {
                type: Boolean,
                default: false
            },
            keyDelay: {
                type: Number,
                default: 300
            },
            showCondition: {
                type: Boolean,
                default: true
            },
            readonly: {
                type: Boolean,
                default: false
            },
            wrapZindex: {
                type: [String, Number],
                default: 9
            },
            defaultFocus: {
                type: Boolean,
                default: false
            },
            inputType: {
                type: String,
                default: 'text',
                validator (v) {
                    return ['text', 'number'].indexOf(v) !== -1
                }
            },
            popoverZindex: {
                type: Number,
                default: 999
            },
            showPopoverTagChange: {
                type: Boolean,
                default: true
            },
            clearable: {
                type: Boolean,
                default: false
            },
            validateMessage: {
                type: String,
                default: ''
            },
            // 外部设置的 class name
            extCls: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                menuInstance: null,
                popperMenuInstance: null,
                menuChildInstance: null,
                menu: {
                    active: -1,
                    id: null,
                    child: false,
                    checked: {},
                    loading: false,
                    childCondition: {}
                },
                chip: {
                    list: []
                },
                input: {
                    focus: false,
                    value: ''
                },
                overflow: {
                    chipIndex: -1
                },
                handleInputSearchPlus () {

                },
                handleSearchSelectResize () {

                },
                defaultPlaceholder: '',
                defaultEmptyText: '',
                defaultRemoteEmptyText: '',
                defaultRemoteLoadingText: '',
                defaultCondition: {},
                validateStr: ''
            }
        },
        computed: {
            curItem () {
                return this.data.find(item => item[this.primaryKey] === this.menu.id) || {}
            },
            childList () {
                const ret = []
                let i = 0
                while (i < this.data.length) {
                    const item = this.data[i]
                    if (item.children && item.children.length) {
                        ret.push(...item.children)
                    }
                    i++
                }
                return ret
            },
            showItemPlaceholder () {
                return this.menu.active >= 0 && String(this.curItem.placeholder).length && this.input.value === this.curItem[this.displayKey] + this.explainCode
            }
        },
        watch: {
            values: {
                handler (v) {
                    if (v !== this.chip.list) {
                        this.chip.list = [...v]
                    }
                },
                deep: true,
                immediate: true
            },
            validateMessage: {
                handler (v) {
                    this.validateStr = v
                },
                immediate: true
            },
            'input.focus': {
                handler (v) {
                    if (v) {
                        this.overflow.chipIndex = -1
                    } else {
                        this.$refs.wrap && this.$refs.wrap.scrollTo(0, 0)
                        // 等待动画收起时间
                        setTimeout(() => {
                            this._isMounted && this.handleSearchInputResize()
                        }, 300)
                    }
                },
                immediate: true
            }
        },
        created () {
            this.input.focus = this.defaultFocus
            this.defaultPlaceholder = this.placeholder || this.t('bk.searchSelect.placeholder')
            this.defaultEmptyText = this.emptyText || this.t('bk.searchSelect.emptyText')
            this.defaultRemoteEmptyText = this.remoteEmptyText || this.t('bk.searchSelect.remoteEmptyText')
            this.defaultRemoteLoadingText = this.remoteLoadingText || this.t('bk.searchSelect.remoteLoadingText')
            this.defaultCondition = Object.assign({}, { name: this.t('bk.searchSelect.condition') })

            if (!Object.keys(this.defaultCondition).includes(this.displayKey)) {
                this.defaultCondition[this.displayKey] = this.t('bk.searchSelect.condition')
            }
            this.handleInputSearchPlus = debounce(this.keyDelay, v => this.handleSearch(v))
        },
        mounted () {
            if (this.input.focus) {
                this.$refs.input.focus()
            }
            this.handleSearchSelectResize = debounce(32, this.handleSearchInputResize)
            addResizeListener(this.$el, this.handleSearchSelectResize)
        },
        beforeDestroy () {
            this.menuInstance = null
            this.menuChildInstance = null
            this.popperMenuInstance && this.popperMenuInstance.destroy(true)
            removeResizeListener(this.$el, this.handleSearchSelectResize)
        },
        methods: {
            handleSearchInputResize () {
                if (this.input.focus || this.chip.list.length < 1) {
                    this.overflow.chipIndex = -1
                    return
                }
                const inputEl = this.$el.querySelector('.bk-search-select')
                const maxWidth = this.$el.querySelector('.search-input').clientWidth - 8
                const tagList = inputEl.querySelectorAll('.search-input-chip:not(.overflow-chip)')
                let width = 0
                let index = 0
                let i = 0
                while (width <= maxWidth - 40 && i <= tagList.length - 1) {
                    const el = tagList[i]
                    width += el ? el.clientWidth + 6 : 0
                    i += 1
                    if (width <= maxWidth - 40) index = i
                }
                if (index === tagList.length - 1 && width <= maxWidth) {
                    this.overflow.chipIndex = -1
                    return
                }
                this.overflow.chipIndex = width >= maxWidth - 40 ? index : -1
            },
            initMenu () {
                if (!this.menuInstance) {
                    this.menuInstance = new Vue(SearchInputMenu).$mount()
                    this.menuInstance.condition = this.defaultCondition
                    this.menuInstance.displayKey = this.displayKey
                    this.menuInstance.primaryKey = this.primaryKey
                    this.menuInstance.multiable = false
                    this.menuInstance.$on('select', this.handleMenuSelect)
                    this.menuInstance.$on('select-conditon', this.handleSelectConditon)
                }
            },
            initChildMenu () {
                this.menuChildInstance = new Vue(SearchInputMenu).$mount()
                this.menuChildInstance.displayKey = this.displayKey
                this.menuChildInstance.primaryKey = this.primaryKey
                this.menuChildInstance.multiable = this.curItem.conditions && this.curItem.conditions.length ? false : (this.curItem.multiable || false)
                this.menuChildInstance.child = true
                this.menuChildInstance.remoteEmptyText = this.defaultRemoteEmptyText
                this.menuChildInstance.remoteLoadingText = this.defaultRemoteLoadingText
                this.menuChildInstance.$on('select', this.handleMenuChildSelect)
                this.menuChildInstance.$on('select-check', this.handleSelectCheck)
                this.menuChildInstance.$on('select-enter', this.handleKeyEnter)
                this.menuChildInstance.$on('select-cancel', this.handleCancel)
                this.menuChildInstance.$on('child-condition-select', this.handleChildConditionSelect)
            },
            initPopover (el) {
                if (!this.popperMenuInstance) {
                    this.popperMenuInstance = Tippy(this.$refs.input, {
                        content: el || this.menuInstance.$el,
                        arrow: false,
                        placement: 'bottom-start',
                        trigger: 'manual',
                        theme: 'light bk-search-select-theme',
                        hideOnClick: false,
                        animateFill: false,
                        animation: 'slide-toggle',
                        lazy: false,
                        ignoreAttributes: true,
                        boundary: 'window',
                        distance: 10 + parseInt(dropdownMarginBottom),
                        zIndex: this.popoverZindex,
                        onHide: () => {
                            this.menuInstance && this.menuInstance.handleDestroy()
                            this.menuChildInstance && this.menuChildInstance.handleDestroy()
                            return true
                        }
                    })
                }
            },
            showMenu (show = true) {
                if (!this.menuInstance) {
                    this.initMenu()
                }
                this.handelePopperEventListener(false)
                this.menuInstance.isCondition = this.showCondition && !!this.chip.list.length
                    && this.chip.list[this.chip.list.length - 1][this.primaryKey] !== this.defaultCondition[this.primaryKey]
                this.menuInstance.list = this.data
                if (show) {
                    this.showPopper(this.menuInstance.$el)
                    this.$emit('show-menu', this.menuInstance)
                } else {
                    this.hidePopper()
                }
            },
            showChildMenu (list, filter, isShow = true) {
                this.menuChildInstance.filter = filter
                this.menuChildInstance.list = list
                this.handelePopperEventListener(true)
                isShow && this.showPopper(this.menuChildInstance.$el)
            },
            handelePopperEventListener (isChild = false) {
                if (isChild) {
                    this.menuInstance && this.menuInstance.handleDestroy()
                    this.menuChildInstance && this.menuChildInstance.handleMounted()
                    return
                }
                this.menuChildInstance && this.menuChildInstance.handleDestroy()
                this.menuInstance.handleMounted()
            },
            showPopper (el) {
                if (this.data.length) {
                    if (!this.popperMenuInstance) {
                        this.initPopover()
                    } else {
                        this.popperMenuInstance.setContent(el)
                    }
                    this.popperMenuInstance.popperInstance.update()
                    this.popperMenuInstance.show(this.showDelay)
                }
            },
            hidePopper () {
                this.popperMenuInstance && this.popperMenuInstance.hide(0)
            },
            handleInputChange (e) {
                this.clearInput()
                let text = e.target.innerText
                if (/(\r|\n)/gm.test(text) || /\s{2}/gm.test(text)) {
                    e.preventDefault()
                    text = text.replace(/(\r|\n)/gm, this.splitCode).replace(/\s{2}/gm, '')
                    this.$refs.input.innerText = text
                    this.handleInputFocus()
                }
                this.input.value = text
                this.handleInputSearchPlus(text)
                this.$emit('input-change', e)
            },
            async handleSearch (text) {
                const include = this.input.value.includes(this.explainCode)
                let list = []
                if (include && this.menuChildInstance) {
                    const filter = text.replace(this.curItem[this.displayKey] + this.explainCode, '')
                    if (this.curItem.remote && typeof this.remoteMethod === 'function') {
                        this.menuChildInstance.loading = true
                        list = await this.remoteMethod(filter, this.curItem, this.menu.active).finally(() => {
                            this.menuChildInstance.loading = false
                        })
                        if (list && list.length) {
                            this.showChildMenu(list, filter, !!list.length)
                        } else {
                            this.hidePopper()
                        }
                    } else {
                        list = this.handleFilter(filter)
                        if (list && list.length) {
                            this.showChildMenu(list, filter, !!list.length)
                        } else {
                            this.hidePopper()
                        }
                    }
                } else if (!include && this.menuInstance) {
                    list = this.handleFilter(text)
                    if (list && list.length) {
                        this.menuInstance.filter = text
                        this.menuInstance.list = list
                        this.showPopper(this.menuInstance.$el)
                    } else {
                        if (this.$refs.input.innerText) {
                            this.hidePopper()
                        }
                    }
                }
            },
            handleFilter (v) {
                let filterList = []
                if (!this.input.value.length || !~this.input.value.indexOf(this.explainCode)) {
                    if (this.filter && typeof this.filterMenuMethod === 'function') {
                        filterList = this.filterMenuMethod(this.data, v)
                    } else {
                        if (v.length) {
                            filterList = this.childList.filter(item => item[this.displayKey] && ~item[this.displayKey].indexOf(v))
                            if (filterList.length) {
                                let item = filterList[filterList.length - 1]
                                item = { ...item, isGroup: true }
                                filterList[filterList.length - 1] = item
                            }
                            filterList.push(...this.data.filter(item => item[this.displayKey] && ~item[this.displayKey].indexOf(v)))
                        } else {
                            filterList = this.data
                        }
                    }
                } else if (this.curItem.children && this.curItem.children.length) {
                    if (this.filter && typeof this.filterChildrenMethod === 'function') {
                        filterList = this.filterChildrenMethod(this.curItem.children, v)
                    } else {
                        filterList = this.curItem.children.filter(item => item[this.displayKey] && ~item[this.displayKey].indexOf(v))
                    }
                }
                return filterList
            },
            handleInputCut (e) {
                const selection = document.getSelection()
                if (selection.anchorOffset >= this.input.value.length) {
                    this.input.value = ''
                }
                this.$emit('input-cut', e)
            },
            handleInputOutSide (e) {
                const parent = e.target.offsetParent
                const classList = parent ? parent.classList : null
                const unFocus = !parent || (classList && !Array.from(classList.values()).some(key => ['bk-search-select', 'bk-search-list', 'tippy-tooltip', 'bk-form-checkbox', 'search-input-list', 'search-input-chip'].includes(key)))
                if (unFocus) {
                    this.hidePopper()
                    this.input.focus = false
                }
                this.$emit('input-click-outside', e)
            },
            handleCancel (e) {
                this.handleClearChildSelectChecked()
                this.hidePopper()
                this.input.focus = false
                this.$refs.input.focus()
            },
            handleInputClick (e) {
                this.input.focus = true
                if (!this.input.value) {
                    if (!this.menuInstance) {
                        this.initMenu()
                    }
                    this.menuInstance.isCondition = this.showCondition && !!this.chip.list.length
                        && this.chip.list[this.chip.list.length - 1][this.primaryKey] !== this.defaultCondition[this.primaryKey]
                    this.menuInstance.list = this.data
                    this.menu.child = false
                    this.$nextTick(_ => {
                        this.handelePopperEventListener()
                        this.showPopper(this.menuInstance.$el)
                    })
                } else {
                    const cur = this.curItem
                    if (cur && ((cur.children && cur.children.length) || (cur.conditions && cur.conditions.length)) && this.popperMenuInstance) {
                        if (this.menuChildInstance) {
                            this.menuChildInstance.error = ''
                        }
                        this.menu.child = true
                        this.popperMenuInstance.show(this.showDelay)
                    } else if (typeof cur.id === 'undefined' && this.menuInstance && this.menuInstance.list.length && this.menuInstance.filter) {
                        this.popperMenuInstance.show(this.showDelay)
                    }
                    this.handelePopperEventListener(true)
                }
                this.$emit('input-click', e)
            },
            handleInputFocus (e) {
                this.input.focus = true
                const input = this.$refs.input
                let selection = null
                if (window.getSelection) {
                    selection = window.getSelection()
                    selection.selectAllChildren(input)
                    selection.collapseToEnd()
                } else if (document.onselectionchange) {
                    selection = document.onselectionchange.createRange()
                    selection.moveToElementText(input)
                    selection.collapse(false)
                    selection.select()
                }
                this.$emit('input-focus', e)
            },
            async updateChildMenu (item, index, isCondition) {
                const isChild = item.children && item.children.length
                if (isCondition) {
                    this.$refs.input.blur()
                    if (!this.menuChildInstance || this.menuChildInstance.multiable || this.menuChildInstance.multiable !== this.curItem.multiable) {
                        this.initChildMenu()
                    }
                    this.menuChildInstance.isChildCondition = isCondition
                    this.menuChildInstance.error = ''
                    this.menuChildInstance.loading = false
                    this.menuChildInstance.checked = this.menu.checked
                    this.showPopper(this.menuChildInstance.$el)
                    this.menu.child = false
                    this.menuChildInstance.list = item.conditions
                    setTimeout(() => {
                        this.$refs.input.focus()
                    }, 20)
                } else {
                    const isRemote = this.curItem.remote && typeof this.remoteMethod === 'function'
                    if (isChild || isRemote) {
                        this.$refs.input.blur()
                        if (!this.menuChildInstance || this.menuChildInstance.multiable || this.menuChildInstance.multiable !== this.curItem.multiable) {
                            this.initChildMenu()
                        }
                        this.menuChildInstance.isChildCondition = isCondition
                        this.menuChildInstance.error = ''
                        this.menuChildInstance.loading = isRemote
                        this.menuChildInstance.checked = this.menu.checked
                        this.showPopper(this.menuChildInstance.$el)
                        this.menu.child = true
                        if (isRemote) {
                            const list = await this.remoteMethod(this.input.value, item, index).finally(() => {
                                this.menuChildInstance.loading = false
                            })
                            this.menuChildInstance.list = list
                        } else {
                            this.menuChildInstance.list = item.children
                        }
                        setTimeout(() => {
                            this.$refs.input.focus()
                        }, 20)
                    } else {
                        this.hidePopper()
                        setTimeout(() => {
                            this.handleInputFocus()
                        }, 20)
                    }
                }
            },
            handleMenuSelect (item, index) {
                const isChildClick = ~this.data.findIndex(set => set[this.primaryKey] === item[this.primaryKey])
                if (!isChildClick) {
                    this.input.value = item[this.displayKey]
                    this.$nextTick().then(() => {
                        this.updateInput(this.input.value)
                        this.handleKeyEnter()
                    })
                } else {
                    this.menu.active = ~isChildClick
                    this.menu.id = this.data[this.menu.active][this.primaryKey]
                    const isChildCondition = !!(this.curItem.conditions && this.curItem.conditions.length)
                    this.input.value = item[this.displayKey] + this.explainCode
                    this.$nextTick().then(() => {
                        this.updateInput(this.input.value)
                        this.updateChildMenu(item, index, isChildCondition)
                        this.$emit('menu-select', item, index)
                    })
                }
            },
            handleMenuChildSelect (item, index) {
                this.input.value += item[this.displayKey]
                this.updateInput(this.input.value)
                this.handleEnter(this.input.value, item, true)
                this.$emit('menu-child-select', item, index)
            },
            handleChildConditionSelect (item, index) {
                this.input.value += item[this.displayKey]
                this.updateInput(this.input.value)
                this.menu.childCondition = item
                this.updateChildMenu(this.curItem, index, false)
                this.$emit('menu-child-condition-select', item, index)
            },
            handleInputKeyup (e) {
                if (this.readonly && !(e.code === 'Backspace')) {
                    e.preventDefault()
                    return false
                }
                switch (e.code) {
                    case 'Enter':
                    case 'NumpadEnter':
                        this.handleKeyEnter(e, true, true)
                        break
                    case 'Backspace':
                        this.handleKeyBackspace(e)
                        break
                    case 'ArrowDown':
                    case 'ArrowUp':
                        e.preventDefault()
                        break
                    default:
                        if (this.inputType === 'number') {
                            const value = this.input.value + ''
                            if (!((value === '' && e.key === '-')
                                || ((value !== '0' && value !== '-0') && e.key === '0')
                                || ((value === '0' || value === '-0' || /^-?[1-9]?[0-9]*[1-9]+$/.test(value)) && e.key === '.')
                                || ('123456789'.indexOf(e.key) > -1))) {
                                e.preventDefault()
                                return false
                            }
                        }
                        this.handleKeyDefault(e)
                        return false
                }
            },
            handleKeyDefault (e) {
                if (Object.keys(this.menu.checked).length) {
                    e.preventDefault()
                    return false
                }
            },
            handleKeyBackspace (e) {
                const keys = Object.keys(this.menu.checked)
                if (this.curItem.multiable && keys.length) {
                    const key = keys[keys.length - 1]
                    this.menuChildInstance && this.menuChildInstance.setCheckValue(this.menu.checked[key], false)
                    delete this.menu.checked[key]
                    this.updateCheckedInputVal()
                    e.preventDefault()
                    this.handleInputFocus()
                    return false
                }
                const condition = this.menu.childCondition[this.displayKey]
                const curVal = this.curItem[this.displayKey] + this.explainCode
                if (condition && curVal + condition === this.input.value) {
                    this.menu.childCondition = {}
                    this.input.value = curVal
                    this.updateInput(this.input.value)
                    this.updateChildMenu(this.curItem, this.menu.active, true)
                    e.preventDefault()
                    return false
                }
                if (!this.input.value && !(!this.chip.list.length && !this.$refs.input.textContent.length)) {
                    const item = this.chip.list.pop()
                    this.$nextTick().then(() => {
                        this.showMenu(this.showPopoverTagChange)
                    })
                    this.$emit('change', this.chip.list)
                    this.$emit('key-delete', item)
                    this.dispatch('bk-form-item', 'form-change')
                } else {
                    if (!this.input.value.includes(this.curItem[this.displayKey] + this.explainCode)) {
                        this.menu.active = -1
                        this.menu.id = null
                    } else {
                        if (this.readonly) {
                            this.updateInput()
                            this.handleCancel()
                            this.menu.active = -1
                            this.menu.id = null
                            this.input.value = ''
                            e.preventDefault()
                            return false
                        }
                    }
                }
            },
            async handleKeyEnter (e, needShowPopover = true, needEmitKeyEnter = false) {
                await new Promise(resolve => {
                    if (!this.input.value) {
                        resolve()
                    } else if (this.input.value === this.curItem[this.displayKey] + this.explainCode) {
                        e.preventDefault()
                        if (!this.menuChildInstance) {
                            this.initChildMenu()
                        }
                        this.menuChildInstance.error = this.defaultEmptyText
                        this.$nextTick(_ => {
                            this.showPopper(this.menuChildInstance.$el)
                        })
                        this.handleInputFocus()
                        resolve()
                    } else {
                        setTimeout(() => {
                            if (this.menu.id !== null) {
                                let val = this.input.value.replace(this.curItem[this.displayKey] + this.explainCode, '')
                                if (Object.keys(this.menu.childCondition).length) {
                                    val = val.replace(this.menu.childCondition[this.displayKey], '')
                                }
                                this.handleEnter(this.input.value, { [this.primaryKey]: val, [this.displayKey]: val }, true, needShowPopover)
                            } else {
                                this.handleEnter(this.input.value, {
                                    [this.primaryKey]: this.input.value,
                                    [this.displayKey]: this.input.value
                                }, false, needShowPopover)
                            }
                            resolve()
                        }, 0)
                    }
                })
                needEmitKeyEnter && this.$emit('key-enter', e)
            },
            async handleValidate (valList) {
                let validate = true
                if (this.curItem && this.curItem.validate && typeof this.curItem.validate === 'function') {
                    validate = await this.curItem.validate([...valList], this.curItem)
                    if (typeof validate === 'string') {
                        this.validateStr = validate
                        validate = false
                    } else {
                        validate && (this.validateStr = '')
                    }
                } else {
                    this.validateStr = ''
                }
                if (!validate) {
                    const selection = window.getSelection()
                    if (selection.focusOffset === 0) {
                        selection.selectAllChildren(this.$refs.input)
                        selection.collapseToEnd()// 光标移至最后
                    }
                }
                return validate
            },
            async handleEnter (val, item, child = false, needShowPopover = true) {
                if (child) {
                    if (this.input.value === this.defaultCondition[this.displayKey]) {
                        this.chip.list.push(this.defaultCondition)
                    } else {
                        let values = []
                        if (Object.keys(this.menu.checked).length) {
                            values = Object.values(this.menu.checked)
                        } else {
                            values.push(item)
                        }
                        const data = Object.assign({}, this.curItem, { values })
                        if (Object.keys(this.menu.childCondition).length) {
                            data['condition'] = this.menu.childCondition
                        }
                        if (data.children) {
                            delete data.children
                        }
                        if (data.conditions) {
                            delete data.conditions
                        }
                        const validate = await this.handleValidate(values)
                        if (!validate) return
                        this.chip.list.push(data)
                    }
                } else {
                    const validate = await this.handleValidate([item])
                    if (!validate) return
                    this.chip.list.push(item)
                }
                this.menu.checked = {}
                this.menu.active = -1
                this.menu.id = null
                this.input.value = ''
                this.menu.childCondition = {}
                this.updateInput()
                if (this.menuInstance) {
                    this.menuInstance.filter = ''
                }
                if (needShowPopover) {
                    this.$nextTick(_ => this.showMenu(this.showPopoverTagChange))
                    this.$refs.input.focus()
                }
                this.$emit('change', this.chip.list)
                this.dispatch('bk-form-item', 'form-change')
            },
            handleClear (index, item) {
                const name = this.chip.list.splice(index, 1)
                setTimeout(() => {
                    this.popperMenuInstance && this.popperMenuInstance.popperInstance && this.popperMenuInstance.popperInstance.update()
                    !this.input.value.length && this.showMenu()
                    this.$emit('change', this.chip.list)
                    this.$emit('chip-del', name)
                    this.dispatch('bk-form-item', 'form-change')
                }, 0)
            },
            handleSelectConditon (item) {
                this.input.value = item[this.displayKey]
                this.updateInput(this.input.value)
                this.handleEnter(this.input.value, item, true)
                this.$emit('condition-select', item)
            },
            handleSelectCheck (item, index) {
                const next = !this.menu.checked[item[this.primaryKey]]
                if (next) {
                    this.menu.checked[item[this.primaryKey]] = item
                } else {
                    delete this.menu.checked[item[this.primaryKey]]
                }
                this.menuChildInstance.checked = this.menu.checked
                this.updateCheckedInputVal()
                this.handlePopoverCheckUpdate()
                this.popperMenuInstance.popperInstance.update()
                this.$emit('child-checked', item, index, next)
            },
            handleClearChildSelectChecked () {
                this.menu.checked = {}
                this.menuChildInstance.checked = this.menu.checked
                this.updateCheckedInputVal()
                this.handlePopoverCheckUpdate()
                this.popperMenuInstance.popperInstance.update()
            },
            handleWrapClick () {
                if (this.shrink) {
                    this.$refs.input.focus()
                }
            },
            updateCheckedInputVal () {
                if (this.menu.id !== null) {
                    const val = Object.values(this.menu.checked).map(set => set[this.displayKey]).join(this.splitCode)
                    this.input.value = this.curItem[this.displayKey] + this.explainCode + val
                    this.updateInput(this.input.value)
                }
            },
            updateInput (val = '') {
                this.$refs.input.innerText = val
            },
            clearInput () {
                const text = this.$refs.input.innerText
                if (text[text.length - 1] === '\n' || text[0] === '\r') {
                    this.updateInput(text.slice(0, -1))
                    this.clearInput()
                } else if (text[0] === '\n' || text[0] === '\r') {
                    this.updateInput(text.slice(1))
                    this.clearInput()
                }
            },
            handlePopoverCheckUpdate () {
                const distance = this.popperMenuInstance.props.distance
                const height = this.$refs.wrap.clientHeight
                if (-height !== distance) {
                    this.popperMenuInstance.popperInstance.update()
                }
            },
            handleClearAll (e) {
                this.menu.active = -1
                this.menu.id = null
                this.input.value = ''
                this.menuInstance = null
                this.updateInput(this.input.value)
                this.clearInput()
                this.values.splice(0, this.values.length)
                this.$emit('clear', e)
            },
            handleClickSearch (e) {
                this.handleKeyEnter(e, false, false)
                this.$emit('search', e)
            },
            getMenuInstance () {
                return this.menuInstance
            },
            getChildMenuInstance () {
                return this.menuChildInstance
            },
            getInputInstance () {
                return this.$refs.input
            }
        }
    }
</script>

<style>
    @import '../../ui/search-select.css';
</style>
