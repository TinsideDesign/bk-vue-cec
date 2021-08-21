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
    <div class="bk-table"
        :class="[
            {
                'bk-table-fit': fit,
                'bk-table-striped': stripe,
                'bk-table-border': tableBorder || isGroup,
                'bk-table-outer-border': outerBorder,
                'bk-table-linear': !(tableBorder || outerBorder || isGroup),
                'bk-table-row-border': tableRowBorder,
                'bk-table-col-border': tableColBorder,
                'bk-table-hidden': isHidden,
                'bk-table-group': isGroup,
                'bk-table-fluid-height': maxHeight,
                'bk-table-scrollable-x': layout.scrollX,
                'bk-table-scrollable-y': layout.scrollY,
                'bk-table-enable-row-transition': (store.states.data || []).length !== 0 && (store.states.data || []).length < 100
            },
            tableSize ? `bk-table-${ tableSize }` : '',
            extCls
        ]"
        @mouseleave="handleMouseLeave($event)">
        <div class="hidden-columns" ref="hiddenColumns"><slot></slot></div>
        <div
            v-if="showHeader"
            v-mousewheel="handleHeaderFooterMousewheel"
            class="bk-table-header-wrapper"
            ref="headerWrapper">
            <table-header
                ref="tableHeader"
                :store="store"
                :border="headerBorder"
                :default-sort="defaultSort"
                :style="{
                    width: layout.bodyWidth ? layout.bodyWidth + 'px' : ''
                }">
                <template slot="prepend">
                    <slot name="prepend"></slot>
                </template>
            </table-header>
        </div>
        <div
            class="bk-table-body-wrapper"
            ref="bodyWrapper"
            :class="[layout.scrollX ? `is-scrolling-${scrollPosition}` : 'is-scrolling-none']"
            :style="[bodyHeight]">
            <table-body
                ref="tableBody"
                :context="context"
                :store="store"
                :stripe="stripe"
                :row-class-name="rowClassName"
                :row-style="rowStyle"
                :highlight="highlightCurrentRow"
                :style="{
                    width: bodyWidth
                }">
            </table-body>
            <div
                v-if="!data || data.length === 0 || store.states.data.length === 0"
                ref="emptyBlock"
                :class="['bk-table-empty-block', emptyBlockClassName]"
                :style="{
                    width: bodyWidth
                }">
                <span class="bk-table-empty-text">
                    <slot name="empty">
                        <i class="bk-table-empty-icon bk-icon icon-empty"></i>
                        <div>{{ emptyText || t('bk.table.emptyText') }}</div>
                    </slot>
                </span>
            </div>
            <div
                v-if="$slots.append"
                class="bk-table-append-wrapper"
                ref="appendWrapper">
                <slot name="append"></slot>
            </div>
        </div>
        <div
            v-if="showSummary"
            v-show="data && data.length > 0"
            v-mousewheel="handleHeaderFooterMousewheel"
            class="bk-table-footer-wrapper"
            ref="footerWrapper">
            <table-footer
                :store="store"
                :border="tableBorder"
                :sum-text="sumText || t('bk.table.sumText')"
                :summary-method="summaryMethod"
                :default-sort="defaultSort"
                :style="{
                    width: layout.bodyWidth ? layout.bodyWidth + 'px' : ''
                }">
            </table-footer>
        </div>
        <div
            v-if="fixedColumns.length > 0"
            v-mousewheel="handleFixedMousewheel"
            class="bk-table-fixed"
            ref="fixedWrapper"
            :style="[{
                width: layout.fixedWidth ? layout.fixedWidth + 'px' : ''
            }, fixedHeight]">
            <div
                v-if="showHeader"
                class="bk-table-fixed-header-wrapper"
                ref="fixedHeaderWrapper">
                <table-header
                    ref="fixedTableHeader"
                    fixed="left"
                    :border="headerBorder"
                    :store="store"
                    :style="{
                        width: bodyWidth
                    }">
                    <template slot="prepend">
                        <slot name="prepend"></slot>
                    </template>
                </table-header>
            </div>
            <div
                class="bk-table-fixed-body-wrapper"
                ref="fixedBodyWrapper"
                :style="[{
                    top: layout.headerHeight + 'px'
                }, fixedBodyHeight]">
                <table-body
                    fixed="left"
                    ref="leftTableBody"
                    :store="store"
                    :stripe="stripe"
                    :highlight="highlightCurrentRow"
                    :row-class-name="rowClassName"
                    :row-style="rowStyle"
                    :style="{
                        width: bodyWidth
                    }">
                </table-body>
                <div
                    v-if="$slots.append"
                    class="bk-table-append-gutter"
                    :style="{
                        height: layout.appendHeight + 'px'
                    }">
                </div>
            </div>
            <div
                v-if="showSummary"
                v-show="data && data.length > 0"
                class="bk-table-fixed-footer-wrapper"
                ref="fixedFooterWrapper">
                <table-footer
                    fixed="left"
                    :border="tableBorder"
                    :sum-text="sumText || t('bk.table.sumText')"
                    :summary-method="summaryMethod"
                    :store="store"
                    :style="{
                        width: bodyWidth
                    }">
                </table-footer>
            </div>
        </div>
        <div
            v-if="rightFixedColumns.length > 0"
            v-mousewheel="handleFixedMousewheel"
            class="bk-table-fixed-right"
            ref="rightFixedWrapper"
            :style="[{
                width: layout.rightFixedWidth ? layout.rightFixedWidth + 'px' : '',
                right: layout.scrollY ? (tableBorder ? layout.gutterWidth : (layout.gutterWidth || 0)) + 'px' : ''
            }, rightFixedHeight]">
            <div v-if="showHeader"
                class="bk-table-fixed-header-wrapper"
                ref="rightFixedHeaderWrapper">
                <table-header
                    ref="rightFixedTableHeader"
                    fixed="right"
                    :border="headerBorder"
                    :store="store"
                    :style="{
                        width: bodyWidth
                    }">
                </table-header>
            </div>
            <div v-if="notOnlySetting"
                class="bk-table-fixed-body-wrapper"
                ref="rightFixedBodyWrapper"
                :style="[{
                    top: layout.headerHeight + 'px'
                }, fixedBodyHeight]">
                <table-body
                    fixed="right"
                    ref="rightTableBody"
                    :store="store"
                    :stripe="stripe"
                    :row-class-name="rowClassName"
                    :row-style="rowStyle"
                    :highlight="highlightCurrentRow"
                    :style="{
                        width: bodyWidth
                    }">
                </table-body>
            </div>
            <div
                v-if="showSummary"
                v-show="data && data.length > 0"
                class="bk-table-fixed-footer-wrapper"
                ref="rightFixedFooterWrapper">
                <table-footer
                    fixed="right"
                    :border="tableBorder"
                    :sum-text="sumText || t('bk.table.sumText')"
                    :summary-method="summaryMethod"
                    :store="store"
                    :style="{
                        width: bodyWidth
                    }">
                </table-footer>
            </div>
        </div>
        <div
            v-if="rightFixedColumns.length > 0"
            class="bk-table-fixed-right-patch"
            ref="rightFixedPatch"
            :style="{
                width: layout.scrollY ? layout.gutterWidth + 'px' : '0',
                height: layout.headerHeight + 'px'
            }">
        </div>
        <div class="bk-table-column-resize-proxy" ref="resizeProxy" v-show="resizeProxyVisible"></div>
        <div class="bk-table-pagination-wrapper" ref="paginationWrapper" v-if="showPagination">
            <bk-pagination class="bk-table-pagination"
                v-if="pagination"
                size="small"
                align="right"
                v-bind="pagination"
                :show-total-count="showPaginationInfo"
                :show-selection-count="showSelectionCount"
                :selection-count="store.states.selection.length"
                @change="handlePageChange"
                @limit-change="handlePageLimitChange">
            </bk-pagination>
        </div>
    </div>
</template>

<script>
    import { debounce } from 'throttle-debounce'
    import { addResizeListener, removeResizeListener } from '@/utils/resize-events'
    import Mousewheel from '@/directives/mousewheel'
    import TableStore from './table-store'
    import TableLayout from './table-layout'
    import TableBody from './table-body'
    import TableHeader from './table-header'
    import TableFooter from './table-footer'
    import BkPagination from '../pagination'
    import locale from 'bk-magic-vue/lib/locale'

    let tableIdSeed = 1

    export default {
        name: 'bk-table',
        components: {
            TableHeader,
            TableFooter,
            TableBody,
            BkPagination
        },
        directives: {
            Mousewheel
        },
        mixins: [locale.mixin],
        props: {
            data: {
                type: Array,
                default: function () {
                    return []
                }
            },
            size: {
                type: String,
                default: 'small',
                validator (val) {
                    return ['small', 'medium', 'large'].includes(val)
                }
            },
            height: [String, Number],
            maxHeight: [String, Number],
            fit: {
                type: Boolean,
                default: true
            },
            stripe: Boolean,
            border: Boolean,
            outerBorder: {
                type: Boolean,
                default: true
            },
            rowBorder: {
                type: Boolean,
                default: true
            },
            colBorder: Boolean,
            rowKey: [String, Function],
            context: {
                type: Object,
                default: () => ({})
            },
            showHeader: {
                type: Boolean,
                default: true
            },
            showSummary: Boolean,
            sumText: String,
            summaryMethod: Function,
            rowClassName: [String, Function],
            rowStyle: [Object, Function],
            cellClassName: [String, Function],
            cellStyle: [Object, Function],
            headerBorder: {
                type: Boolean,
                default: false
            },
            headerRowClassName: [String, Function],
            headerRowStyle: [Object, Function],
            headerCellClassName: [String, Function],
            headerCellStyle: [Object, Function],
            highlightCurrentRow: Boolean,
            currentRowKey: [String, Number],
            emptyText: String,
            emptyBlockClassName: String,
            expandRowKeys: Array,
            defaultExpandAll: Boolean,
            defaultSort: Object,
            spanMethod: Function,
            selectOnIndeterminate: {
                type: Boolean,
                default: true
            },
            pagination: Object,
            showPaginationInfo: {
                type: Boolean,
                default: true
            },
            // 分页变化时，表格是否自动滚动到顶部
            autoScrollToTop: {
                type: Boolean,
                default: false
            },
            // 外部设置的 class name
            extCls: {
                type: String,
                default: ''
            },
            setting: {
                type: Object,
                default: () => ({
                    columns: []
                }),
                validator (setting) {
                    return Array.isArray(setting.columns)
                }
            },
            cellAttributes: [Function, Object],
            headerCellAttributes: [Function, Object]
        },
        data () {
            const store = new TableStore(this, {
                rowKey: this.rowKey,
                defaultExpandAll: this.defaultExpandAll,
                selectOnIndeterminate: this.selectOnIndeterminate
            })
            const layout = new TableLayout({
                store,
                table: this,
                fit: this.fit,
                showHeader: this.showHeader
            })
            return {
                layout,
                store,
                isHidden: false,
                renderExpanded: null,
                resizeProxyVisible: false,
                resizeState: {
                    width: null,
                    height: null
                },
                // 是否拥有多级表头
                isGroup: false,
                scrollPosition: 'left'
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
            tableSize () {
                return this.size
            },
            tableBorder () {
                return this.border || (this.rowBorder && this.colBorder)
            },
            tableRowBorder () {
                return this.border || this.rowBorder
            },
            tableColBorder () {
                return this.border || this.colBorder
            },
            bodyWrapper () {
                return this.$refs.bodyWrapper
            },
            shouldUpdateHeight () {
                return this.height
                    || this.maxHeight
                    || this.fixedColumns.length > 0
                    || this.rightFixedColumns.length > 0
            },
            selection () {
                return this.store.states.selection
            },
            columns () {
                return this.store.states.columns
            },
            tableData () {
                return this.store.states.data
            },
            fixedColumns () {
                return this.store.states.fixedColumns
            },
            rightFixedColumns () {
                return this.store.states.rightFixedColumns
            },
            notOnlySetting () {
                return this.rightFixedColumns.some(column => column.type !== 'setting')
            },
            bodyWidth () {
                const { bodyWidth, scrollY, gutterWidth } = this.layout
                return bodyWidth ? bodyWidth - (scrollY ? gutterWidth : 0) + 'px' : ''
            },
            bodyHeight () {
                if (this.height) {
                    return {
                        height: this.layout.bodyHeight ? this.layout.bodyHeight + 'px' : ''
                    }
                } else if (this.maxHeight) {
                    return {
                        'max-height': (this.showHeader
                            ? this.maxHeight - this.layout.headerHeight - this.layout.footerHeight - this.layout.paginationHeight
                            : this.maxHeight - this.layout.footerHeight - this.layout.paginationHeight) + 'px'
                    }
                }
                return {}
            },
            fixedBodyHeight () {
                if (this.height) {
                    return {
                        height: this.layout.fixedBodyHeight ? this.layout.fixedBodyHeight + 'px' : ''
                    }
                } else if (this.maxHeight) {
                    let maxHeight = this.layout.scrollX ? this.maxHeight - this.layout.gutterWidth : this.maxHeight
                    if (this.showHeader) {
                        maxHeight -= this.layout.headerHeight
                    }
                    maxHeight -= this.layout.footerHeight
                    maxHeight -= this.layout.paginationHeight
                    return {
                        'max-height': maxHeight + 'px'
                    }
                }
                return {}
            },
            fixedHeight () {
                if (this.maxHeight) {
                    if (this.showSummary) {
                        return {
                            bottom: this.layout.paginationHeight + 'px'
                        }
                    }
                    return {
                        bottom: (
                            (this.layout.scrollX && this.data.length)
                                ? this.layout.gutterWidth + this.layout.paginationHeight
                                : this.layout.paginationHeight
                        ) + 'px'
                    }
                } else {
                    if (this.showSummary) {
                        return {
                            height: this.layout.tableHeight ? this.layout.tableHeight + 'px' : ''
                        }
                    }
                    return {
                        height: this.layout.viewportHeight ? this.layout.viewportHeight + 'px' : ''
                    }
                }
            },
            rightFixedHeight () {
                if (this.notOnlySetting) {
                    return this.fixedHeight
                }
                return {
                    height: this.layout.headerHeight + 'px'
                }
            },
            showPagination () {
                return this.data.length && this.pagination && this.pagination.count > 0
            },
            showSelectionCount () {
                return this.store.states._columns.some(column => column.type === 'selection')
            }
        },
        watch: {
            height: {
                immediate: true,
                handler (value) {
                    this.layout.setHeight(value)
                }
            },
            maxHeight: {
                immediate: true,
                handler (value) {
                    this.layout.setMaxHeight(value)
                }
            },
            currentRowKey (newVal) {
                this.store.setCurrentRowKey(newVal)
            },
            data: {
                immediate: true,
                handler (value) {
                    this.store.commit('setData', value)
                    if (this.$ready) {
                        this.$nextTick(() => {
                            this.doLayout()
                        })
                    }
                }
            },
            expandRowKeys: {
                immediate: true,
                handler (newVal) {
                    if (newVal) {
                        this.store.setExpandRowKeys(newVal)
                    }
                }
            }
        },
        created () {
            this.tableId = 'bk-table-' + tableIdSeed++
            this.debouncedUpdateLayout = debounce(50, () => this.doLayout())
        },
        mounted () {
            this.bindEvents()
            this.store.updateColumns()
            this.doLayout()

            this.resizeState = {
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight
            }

            // init filters
            this.store.states.columns.forEach(column => {
                if (column.filteredValue && column.filteredValue.length) {
                    this.store.commit('filterChange', {
                        column,
                        values: column.filteredValue,
                        silent: true
                    })
                }
            })
            this.$ready = true
        },
        beforeDestroy () {
            this.$destroyed = true
            if (this.resizeListener) removeResizeListener(this.$el, this.resizeListener)
        },
        methods: {
            setCurrentRow (row) {
                this.store.commit('setCurrentRow', row)
            },
            toggleRowSelection (row, selected) {
                this.store.toggleRowSelection(row, selected)
                this.store.updateAllSelected()
            },
            toggleRowExpansion (row, expanded) {
                this.store.toggleRowExpansion(row, expanded)
            },
            clearSelection () {
                this.store.clearSelection()
            },
            clearFilter () {
                this.store.clearFilter()
            },
            clearSort () {
                this.store.clearSort()
            },
            handleMouseLeave () {
                this.store.commit('setHoverRow', null)
                if (this.hoverState) this.hoverState = null
            },
            updateScrollY () {
                this.layout.updateScrollY()
                this.layout.updateColumnsWidth()
            },
            handleFixedMousewheel (event, data) {
                const bodyWrapper = this.bodyWrapper
                if (Math.abs(data.spinY) > 0) {
                    const currentScrollTop = bodyWrapper.scrollTop
                    if (data.pixelY < 0 && currentScrollTop !== 0) {
                        event.preventDefault()
                    }
                    if (data.pixelY > 0 && bodyWrapper.scrollHeight - bodyWrapper.clientHeight > currentScrollTop) {
                        event.preventDefault()
                    }
                    bodyWrapper.scrollTop += Math.ceil(data.pixelY / 5)
                } else {
                    bodyWrapper.scrollLeft += Math.ceil(data.pixelX / 5)
                }
            },
            handleHeaderFooterMousewheel (event, data) {
                const { pixelX, pixelY } = data
                if (Math.abs(pixelX) >= Math.abs(pixelY)) {
                    event.preventDefault()
                    this.bodyWrapper.scrollLeft += data.pixelX / 5
                }
            },
            handlePageChange (page) {
                this.autoScrollToTop && this.scrollToTop()
                this.$emit('page-change', page)
            },
            handlePageLimitChange (currentLimit, prevLimit) {
                this.autoScrollToTop && this.scrollToTop()
                this.$emit('page-limit-change', currentLimit, prevLimit)
            },
            // 表格滚动到顶部
            scrollToTop () {
                this.$refs.bodyWrapper.scrollTo({
                    top: 0
                })
            },
            bindEvents () {
                const { headerWrapper, footerWrapper, tableHeader } = this.$refs
                const refs = this.$refs
                const self = this
                this.bodyWrapper.addEventListener('scroll', function () {
                    if (headerWrapper) {
                        headerWrapper.scrollLeft = this.scrollLeft
                        Object.values(tableHeader.filterPanels).forEach(filterPanel => {
                            filterPanel.instance && filterPanel.instance.hide(0)
                        })
                    }
                    if (footerWrapper) footerWrapper.scrollLeft = this.scrollLeft
                    if (refs.fixedBodyWrapper) refs.fixedBodyWrapper.scrollTop = this.scrollTop
                    if (refs.rightFixedBodyWrapper) refs.rightFixedBodyWrapper.scrollTop = this.scrollTop
                    const maxScrollLeftPosition = this.scrollWidth - this.offsetWidth - 1
                    const scrollLeft = this.scrollLeft
                    if (scrollLeft >= maxScrollLeftPosition) {
                        self.scrollPosition = 'right'
                    } else if (scrollLeft === 0) {
                        self.scrollPosition = 'left'
                    } else {
                        self.scrollPosition = 'middle'
                    }
                })
                if (this.fit) {
                    addResizeListener(this.$el, this.resizeListener)
                }
            },
            resizeListener () {
                if (!this.$ready) return
                let shouldUpdateLayout = false
                const el = this.$el
                const { width: oldWidth, height: oldHeight } = this.resizeState

                const width = el.offsetWidth
                if (oldWidth !== width) {
                    shouldUpdateLayout = true
                }

                const height = el.offsetHeight
                if ((this.height || this.shouldUpdateHeight) && oldHeight !== height) {
                    shouldUpdateLayout = true
                }

                if (shouldUpdateLayout) {
                    this.resizeState.width = width
                    this.resizeState.height = height
                    this.doLayout()
                }
            },
            doLayout () {
                if (this.$destroyed) return
                this.layout.updateColumnsWidth()
                if (this.shouldUpdateHeight) {
                    this.layout.updateElsHeight()
                }
            },
            sort (prop, order) {
                this.store.commit('sort', { prop, order })
            },
            toggleAllSelection () {
                this.store.commit('toggleAllSelection')
            }
        }
    }
</script>

<style>
    @import '../../ui/table.css';
</style>
