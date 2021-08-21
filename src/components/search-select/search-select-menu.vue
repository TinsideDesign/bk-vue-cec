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

<script>
    import locale from 'bk-magic-vue/lib/locale'

    export default {
        name: 'bk-search-select-menu',
        mixins: [locale.mixin],
        props: {
            list: {
                type: Array,
                default () {
                    return []
                }
            },
            isCondition: Boolean,
            condition: Object,
            displayKey: {
                type: String,
                require: true
            },
            filter: {
                type: String,
                default: ''
            },
            error: {
                type: String,
                default: ''
            },
            multiable: Boolean,
            child: Boolean,
            loading: Boolean,
            remoteEmptyText: String,
            remoteLoadingText: String,
            checked: {
                type: Object,
                default () {
                    return {}
                }
            },
            primaryKey: {
                type: String,
                require: true
            },
            isChildCondition: Boolean
        },
        data () {
            return {
                hoverId: '',
                hasFocus: false
            }
        },
        mounted () {
            this.handleMounted()
        },
        beforeDestroy () {
            this.handleDestroy()
        },
        methods: {
            handleDestroy () {
                document.removeEventListener('keydown', this.handleDocumentKeydown)
            },
            handleMounted () {
                this.handleDestroy()
                document.addEventListener('keydown', this.handleDocumentKeydown)
            },
            handleClick (item, index) {
                if (item.disabled) {
                    return false
                }
                if (this.isChildCondition && !this.multiable) {
                    this.$emit('child-condition-select', item, index)
                    this.hasFocus = false
                } else if (!this.multiable || !this.child) {
                    this.$emit('select', item, index)
                    this.hasFocus = false
                    this.handleDestroy()
                } else {
                    this.$refs[item[this.primaryKey]].style.display = this.checked[item[this.primaryKey]] ? 'none' : 'block'
                    this.$emit('select-check', item, index)
                }
            },
            handleCheckClick (item, index, next, old, id) {
                this.$emit('select-check', item, index, next, old)
            },
            setCheckValue (item, val) {
                const ref = this.$refs[item[this.primaryKey]]
                if (ref) {
                    ref.style.display = this.checked[item[this.primaryKey]] ? 'none' : 'block'
                }
            },
            handleSelectEnter (e) {
                this.$emit('select-enter', e)
            },
            handleDocumentKeydown (e) {
                const len = this.list && this.list.length
                if (['ArrowDown', 'ArrowUp'].includes(e.code) && len && this.list.some(item => !item.disabled)) {
                    e.preventDefault()
                    e.stopPropagation()
                    this.$el.focus()
                    this.hasFocus = true
                    let i = len
                    let curIndex = this.list.findIndex(set => set[this.primaryKey] === this.hoverId)
                    while (i >= 0) {
                        curIndex = e.code === 'ArrowDown' ? curIndex + 1 : curIndex - 1
                        curIndex = curIndex > len - 1 ? 0 : (curIndex < 0 ? len - 1 : curIndex)
                        const item = this.list[curIndex]
                        if (!item.disabled) {
                            i = -1
                            this.hoverId = item.id
                            return
                        }
                        i--
                    }
                } else if (this.hasFocus && ['Enter', 'NumpadEnter'].includes(e.code) && len && this.hoverId) {
                    const curIndex = this.list.findIndex(set => set[this.primaryKey] === this.hoverId)
                    if (curIndex > -1) {
                        const curItem = this.list[curIndex]
                        this.handleClick(curItem, curIndex)
                    }
                }
            },
            handleKeyDown (e) {
                if ((e.code === 'Enter' || e.code === 'NumpadEnter')) {
                    // this.handleSelectEnter(e)
                }
            },
            handleSelectCancel (e) {
                Object.keys(this.checked).forEach(key => {
                    this.$refs[key] && (this.$refs[key].style.display = 'none')
                })
                this.$emit('select-cancel', e)
            }
        },
        render (h) {
            const {
                list,
                condition,
                displayKey,
                primaryKey,
                filter,
                multiable,
                child,
                checked,
                remoteLoadingText,
                remoteEmptyText,
                loading = false,
                isCondition = false,
                isChildCondition = false,
                error = '',
                hoverId
            } = this

            if (error) {
                return (
                    <div class={{ 'bk-search-list': true }}>
                        <div class={{ 'bk-search-list-error': true }}>{ error }</div>
                    </div>
                )
            } else if (!loading && (!list || !list.length)) {
                return (
                    <div class={{ 'bk-search-list': true }}>
                        <div class={{ 'bk-search-list-loading': true }}>{ remoteEmptyText }</div>
                    </div>
                )
            }

            const conditionEvent = { on: {} }
            const wrapEvent = { on: {} }
            const footerEnterEvent = { on: {} }
            const footerCancelEvent = { on: {} }
            this.hoverIndex = 0
            const items = this._l(list, (item, index) => {
                const id = item[primaryKey]
                const isFilter = filter && item[displayKey].includes(filter)
                const text = item[displayKey]
                const events = { on: {} }
                let i, pre, next
                events.on.click = e => this.handleClick(item, index)
                if (isFilter) {
                    i = text.indexOf(filter)
                    pre = text.slice(0, i)
                    next = text.slice(i + filter.length, text.length)
                }
                return (
                    <li class={{ 'bk-search-list-menu-item': true, 'is-group': !!item.isGroup, 'is-disabled': item.disabled, 'is-hover': !item.disabled && hoverId === id }}>
                        <div {...events} class={{ 'item-name': true }}>
                            {
                                isFilter
                                    ? <div>{pre}<span class={{ 'item-name-filter': true }}>{filter}</span>{next}</div>
                                    : text
                            }
                        </div>
                        <span v-show={multiable && child && checked[text] && !isChildCondition} ref={id}
                            class={{ 'bk-icon icon-check-1 item-icon': true }}></span>
                    </li>
                )
            })

            if (multiable && child) {
                // wrapEvent['on']['keydown'] = e => this.handleKeyDown(e)
                footerEnterEvent['on']['click'] = e => this.handleSelectEnter(e)
                footerCancelEvent['on']['click'] = e => this.handleSelectCancel(e)
            }
            if (isCondition && !isChildCondition) {
                conditionEvent['on']['click'] = _ => this.$emit('select-conditon', condition)
            }

            return (
                <div class={{ 'bk-search-list': true }} {...wrapEvent} tabIndex="-1">
                    <div v-show={loading} class={{ 'bk-search-list-loading': true }}>{remoteLoadingText}</div>
                    {
                            !isCondition
                            ? ''
                            : <div v-show={!loading} class={{ 'bk-search-list-condition': true }}
                                   {...conditionEvent}>{condition[displayKey]}
                            </div>
                    }
                    <div v-show={!loading} class="search-menu-wrap">
                        <ul class={{ 'bk-search-list-menu': true }}>
                            {items}
                        </ul>
                    </div>
                    {
                        multiable && child && !loading
                            ? <div class={{ 'bk-search-list-footer': true }}>
                                <span class={{ 'footer-btn': true }} {...footerEnterEvent}>{this.t('bk.searchSelect.ok')}</span>
                                <span class={{ 'footer-btn': true }} {...footerCancelEvent}>{this.t('bk.searchSelect.cancel')}</span>
                            </div>
                            : ''
                    }
                </div>
            )
        }
    }
</script>

<style>
    @import '../../ui/search-select-menu.css';
</style>
