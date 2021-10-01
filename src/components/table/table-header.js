/*
 * Tencent is pleased to support the open source community by making
 * 科技内在设计（T-inside） available.
 *
 * Copyright (C) 2021 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * 科技内在设计（T-inside） is licensed under the MIT License.
 *
 * License for 科技内在设计（T-inside）:
 *
 * ---------------------------------------------------
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
 * to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of
 * the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
 * THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
*/

/**
 * @file table-header
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

/* eslint-disable max-len */

import { hasClass, addClass, removeClass } from '@/utils/dom'
import Vue from 'vue'
import bkCheckbox from '../checkbox'
import bkTableSetting from './table-setting.js'
import FilterPanel from './filter-panel.vue'
import LayoutObserver from './layout-observer'

/**
 * 获取所有列，包括子元素。打平
 */
const getAllColumns = (columns) => {
    const result = []
    columns.forEach((column) => {
        if (column.children) {
            result.push(column)
            result.push.apply(result, getAllColumns(column.children))
        } else {
            result.push(column)
        }
    })
    return result
}

const convertToRows = (originColumns) => {
    let maxLevel = 1
    const traverse = (column, parent) => {
        if (parent) {
            column.level = parent.level + 1
            if (maxLevel < column.level) {
                maxLevel = column.level
            }
        }
        if (column.children) {
            let colSpan = 0
            column.children.forEach((subColumn) => {
                traverse(subColumn, column)
                colSpan += subColumn.colSpan
            })
            column.colSpan = colSpan
        } else {
            column.colSpan = 1
        }
    }

    originColumns.forEach((column) => {
        column.level = 1
        traverse(column)
    })

    const rows = []
    for (let i = 0; i < maxLevel; i++) {
        rows.push([])
    }

    const allColumns = getAllColumns(originColumns)

    allColumns.forEach((column) => {
        if (!column.children) {
            column.rowSpan = maxLevel - column.level + 1
        } else {
            column.rowSpan = 1
        }
        rows[column.level - 1].push(column)
    })

    return rows
}

export default {
    name: 'bk-table-header',

    mixins: [LayoutObserver],

    render (h) {
        const originColumns = this.store.states.originColumns
        const columnRows = convertToRows(originColumns, this.columns)
        // 是否拥有多级表头
        const isGroup = columnRows.length > 1
        if (isGroup) this.$parent.isGroup = true
        return (
            <table
                class="bk-table-header"
                cellspacing="0"
                cellpadding="0"
                border="0">
                <colgroup>
                    {
                        this._l(this.columns, column => <col name={ column.id } />)
                    }
                    {
                        this.hasGutter ? <col name="gutter" /> : ''
                    }
                </colgroup>
                <thead class={ [{ 'is-group': isGroup, 'has-gutter': this.hasGutter }] }>
                    {
                        this._l(columnRows, (columns, rowIndex) =>
                            <tr
                                style={ this.getHeaderRowStyle(rowIndex) }
                                class={ this.getHeaderRowClass(rowIndex) }
                            >
                                {
                                    this._l(columns, (column, cellIndex) =>
                                        <th
                                            colspan={ column.colSpan }
                                            rowspan={ column.rowSpan }
                                            on-mousemove={ ($event) => this.handleMouseMove($event, column) }
                                            on-mouseout={ this.handleMouseOut }
                                            on-mousedown={ ($event) => this.handleMouseDown($event, column) }
                                            on-click={ ($event) => this.handleHeaderClick($event, column) }
                                            on-contextmenu={ ($event) => this.handleHeaderContextMenu($event, column) }
                                            style={ this.getHeaderCellStyle(rowIndex, cellIndex, columns, column) }
                                            class={ this.getHeaderCellClass(rowIndex, cellIndex, columns, column) }
                                            key={ column.id }
                                            domProps={ this.getHeaderCellAttributes(rowIndex, cellIndex, columns, column) }>
                                            {
                                                this.isCellHidden(cellIndex, columns)
                                                    ? ''
                                                    : (<div class="cell">
                                                        <div class={ ['bk-table-header-label', column.labelClassName] }>
                                                            {
                                                                column.renderHeader
                                                                    ? column.renderHeader.call(this._renderProxy, h, { column, $index: cellIndex, store: this.store, _self: this.$parent.$vnode.context, fixed: this.fixed })
                                                                    : column.label
                                                            }
                                                        </div>
                                                        {
                                                            column.sortable
                                                                ? <span class="bk-table-caret-wrapper" on-click={ ($event) => this.handleSortClick($event, column) }>
                                                                    <i class="bk-table-sort-caret ascending" on-click={ ($event) => this.handleSortClick($event, column, 'ascending') }></i>
                                                                    <i class="bk-table-sort-caret descending" on-click={ ($event) => this.handleSortClick($event, column, 'descending') }></i>
                                                                </span>
                                                                : ''
                                                        }
                                                        {
                                                            column.filterable
                                                                ? <span class={ [
                                                                    'bk-table-column-filter-trigger',
                                                                    'bk-icon icon-funnel',
                                                                    column.filterOpened ? 'is-open' : '',
                                                                    column.filteredValue && column.filteredValue.length > 0 ? 'is-filtered' : ''
                                                                ]} on-click={ ($event) => this.handleFilterClick($event, column) }>
                                                                </span>
                                                                : ''
                                                        }
                                                    </div>)
                                            }
                                        </th>
                                    )
                                }
                                {
                                    this.hasGutter ? <th class="gutter"></th> : ''
                                }
                            </tr>
                        )
                    }
                    {
                        this.$slots.prepend
                            ? <tr class="bk-table-header-append">
                                <th colSpan={this.colSpanNum} class="is-prepend">
                                    { this.$slots.prepend }
                                </th>
                            </tr>
                            : ''
                    }
                </thead>
            </table>
        )
    },

    props: {
        fixed: String,
        store: {
            required: true
        },
        border: Boolean,
        defaultSort: {
            type: Object,
            default () {
                return {
                    prop: '',
                    order: ''
                }
            }
        }
    },

    components: {
        bkCheckbox,
        bkTableSetting
    },

    computed: {
        table () {
            return this.$parent
        },

        isAllSelected () {
            return this.store.states.isAllSelected
        },

        columnsCount () {
            return this.store.states.columns.length
        },

        leftFixedCount () {
            return this.store.states.fixedColumns.length
        },

        rightFixedCount () {
            return this.store.states.rightFixedColumns.length
        },

        leftFixedLeafCount () {
            return this.store.states.fixedLeafColumnsLength
        },

        rightFixedLeafCount () {
            return this.store.states.rightFixedLeafColumnsLength
        },

        columns () {
            return this.store.states.columns
        },

        hasGutter () {
            return !this.fixed && this.tableLayout.gutterWidth
        },

        colSpanNum () {
            const originColSpan = this.store.states.originColumns.length
                ? this.store.states.originColumns.map(col => col.colSpan).reduce((pre, next) => {
                    return pre + next
                })
                : 0
            return this.hasGutter ? originColSpan + 1 : originColSpan
        }
    },

    created () {
        this.filterPanels = {}
    },

    mounted () {
        const { prop, order } = this.defaultSort
        this.store.commit('sort', { prop, order })
    },

    beforeDestroy () {
        const panels = this.filterPanels
        for (const prop in panels) {
            if (panels.hasOwnProperty(prop) && panels[prop]) {
                panels[prop].$destroy(true)
            }
        }
    },

    methods: {
        /**
         * 单元格是否隐藏
         */
        isCellHidden (index, columns) {
            let start = 0
            for (let i = 0; i < index; i++) {
                start += columns[i].colSpan
            }
            const after = start + columns[index].colSpan - 1
            if (this.fixed === true || this.fixed === 'left') {
                return after >= this.leftFixedLeafCount
            } else if (this.fixed === 'right') {
                return start < this.columnsCount - this.rightFixedLeafCount
            } else {
                return (after < this.leftFixedLeafCount) || (start >= this.columnsCount - this.rightFixedLeafCount)
            }
        },

        /**
         * 获取 header row 的样式
         */
        getHeaderRowStyle (rowIndex) {
            const headerRowStyle = this.table.headerRowStyle
            if (typeof headerRowStyle === 'function') {
                return headerRowStyle({ rowIndex })
            }
            return headerRowStyle
        },

        /**
         * 获取 header row 的类名
         */
        getHeaderRowClass (rowIndex) {
            const classes = []

            const headerRowClassName = this.table.headerRowClassName
            if (typeof headerRowClassName === 'string') {
                classes.push(headerRowClassName)
            } else if (typeof headerRowClassName === 'function') {
                classes.push(headerRowClassName({ rowIndex }))
            }

            return classes.join(' ')
        },

        /**
         * 获取 header cell 的样式
         */
        getHeaderCellStyle (rowIndex, columnIndex, row, column) {
            const headerCellStyle = this.table.headerCellStyle
            if (typeof headerCellStyle === 'function') {
                return headerCellStyle({
                    rowIndex,
                    columnIndex,
                    row,
                    column
                })
            }
            return headerCellStyle
        },

        /**
         * 获取 header cell 的类名
         */
        getHeaderCellClass (rowIndex, columnIndex, row, column) {
            const classes = [column.id, column.order, column.headerAlign, column.className, column.labelClassName]

            if (this.border) {
                classes.push('has-border')
            }

            if (rowIndex === 0 && this.isCellHidden(columnIndex, row)) {
                classes.push('is-hidden')
            }

            if (!column.children) {
                classes.push('is-leaf')
            }

            if (column.sortable) {
                classes.push('is-sortable')
            }

            if (column.filterable) {
                classes.push('is-filterable')
            }

            if (columnIndex === 0) {
                classes.push('is-first')
            }

            if (columnIndex === row.length - 1) {
                classes.push('is-last')
            }

            const headerCellClassName = this.table.headerCellClassName
            if (typeof headerCellClassName === 'string') {
                classes.push(headerCellClassName)
            } else if (typeof headerCellClassName === 'function') {
                classes.push(headerCellClassName({
                    rowIndex,
                    columnIndex,
                    row,
                    column
                }))
            }

            return classes.join(' ')
        },

        /**
         * 获取 header cell 的属性
         */
        getHeaderCellAttributes (rowIndex, cellIndex, columns, column) {
            if (typeof this.table.headerCellAttributes === 'function') {
                const attributes = this.table.headerCellAttributes({ rowIndex, cellIndex, columns, column })
                return typeof attributes === 'object' ? attributes : {}
            } else if (typeof this.table.headerCellAttributes === 'object') {
                return this.table.headerCellAttributes
            }
            return {}
        },

        toggleAllSelection () {
            this.store.commit('toggleAllSelection')
        },

        /**
         * filter 点击事件处理
         */
        handleFilterClick (event, column) {
            event.stopPropagation()

            let target = event.target
            while (target && target.tagName !== 'TH') {
                target = target.parentNode
            }

            const filterReference = target.querySelector('.bk-table-column-filter-trigger')

            const table = this.$parent

            let filterPanel = this.filterPanels[column.id]

            if (filterPanel && column.filterOpened) {
                filterPanel.instance.hide()
                return
            }

            if (!filterPanel) {
                filterPanel = new Vue(FilterPanel)
                this.filterPanels[column.id] = filterPanel
                filterPanel.table = table
                filterPanel.column = column
                filterPanel.multiple = column.filterMultiple
                filterPanel.placement = column.filterPlacement || 'bottom-start'
                filterPanel.reference = filterReference
                filterPanel.filters = column.filters
                filterPanel.selected = column.filteredValue
                filterPanel.searchable = column.filterSearchable
                filterPanel.$mount()
            }

            setTimeout(() => {
                filterPanel.instance.show()
            }, 1000 / 60)
        },

        /**
         * header 点击事件处理
         */
        handleHeaderClick (event, column) {
            if (!column.filters && column.sortable) {
                this.handleSortClick(event, column)
            } else if (column.filterable && !column.sortable) {
                this.handleFilterClick(event, column)
            }

            this.$parent.$emit('header-click', column, event)
        },

        /**
         * header 鼠标右键事件处理
         */
        handleHeaderContextMenu (event, column) {
            this.$parent.$emit('header-contextmenu', column, event)
        },

        /**
         * th mousedown 事件回调
         */
        handleMouseDown (event, column) {
            if (column.children && column.children.length > 0) return
            // if (this.draggingColumn && this.border) {
            if (this.draggingColumn) {
                this.dragging = true

                this.$parent.resizeProxyVisible = true

                const table = this.$parent
                const tableEl = table.$el
                const tableLeft = tableEl.getBoundingClientRect().left
                const columnEl = this.$el.querySelector(`th.${column.id}`)
                const columnRect = columnEl.getBoundingClientRect()
                const minLeft = columnRect.left - tableLeft + 80

                addClass(columnEl, 'noclick')

                this.dragState = {
                    startMouseLeft: event.clientX,
                    startLeft: columnRect.right - tableLeft,
                    startColumnLeft: columnRect.left - tableLeft,
                    tableLeft
                }

                const resizeProxy = table.$refs.resizeProxy
                resizeProxy.style.left = this.dragState.startLeft + 'px'

                document.onselectstart = function () {
                    return false
                }
                document.ondragstart = function () {
                    return false
                }

                const handleMouseMove = (event) => {
                    const deltaLeft = event.clientX - this.dragState.startMouseLeft
                    const proxyLeft = this.dragState.startLeft + deltaLeft

                    resizeProxy.style.left = Math.max(minLeft, proxyLeft) + 'px'
                }

                const handleMouseUp = () => {
                    if (this.dragging) {
                        const {
                            startColumnLeft,
                            startLeft
                        } = this.dragState
                        const finalLeft = parseInt(resizeProxy.style.left, 10)

                        const columnWidth = finalLeft - startColumnLeft
                        column.width = column.realWidth = columnWidth
                        table.$emit('header-dragend', column.width, startLeft - startColumnLeft, column, event)
                        this.store.isDraging = true
                        this.store.scheduleLayout()

                        document.body.style.cursor = ''
                        this.dragging = false
                        this.draggingColumn = null
                        this.dragState = {}

                        table.resizeProxyVisible = false
                    }

                    document.removeEventListener('mousemove', handleMouseMove)
                    document.removeEventListener('mouseup', handleMouseUp)
                    document.onselectstart = null
                    document.ondragstart = null

                    setTimeout(function () {
                        removeClass(columnEl, 'noclick')
                    }, 0)
                }

                document.addEventListener('mousemove', handleMouseMove)
                document.addEventListener('mouseup', handleMouseUp)
            }
        },

        /**
         * th mousemove 事件处理
         */
        handleMouseMove (event, column) {
            if (column.children && column.children.length > 0) return
            let target = event.target
            while (target && target.tagName !== 'TH') {
                target = target.parentNode
            }

            if (!column || !column.resizable) return

            // if (!this.dragging && this.border) {
            if (!this.dragging) {
                const rect = target.getBoundingClientRect()

                const bodyStyle = document.body.style
                if (rect.width > 12 && rect.right - event.pageX < 8) {
                    bodyStyle.cursor = 'col-resize'
                    if (hasClass(target, 'is-sortable')) {
                        target.style.cursor = 'col-resize'
                    }
                    this.draggingColumn = column
                } else if (!this.dragging) {
                    bodyStyle.cursor = ''
                    if (hasClass(target, 'is-sortable')) {
                        target.style.cursor = 'pointer'
                    }
                    this.draggingColumn = null
                }
            }
        },

        /**
         * th mouseout 事件处理
         */
        handleMouseOut () {
            document.body.style.cursor = ''
        },

        toggleOrder ({ order, sortOrders }) {
            if (order === '') return sortOrders[0]
            const index = sortOrders.indexOf(order || null)
            return sortOrders[index > sortOrders.length - 2 ? 0 : index + 1]
        },

        handleSortClick (event, column, givenOrder) {
            event.stopPropagation()
            const order = givenOrder || this.toggleOrder(column)

            let target = event.target
            while (target && target.tagName !== 'TH') {
                target = target.parentNode
            }

            if (target && target.tagName === 'TH') {
                if (hasClass(target, 'noclick')) {
                    removeClass(target, 'noclick')
                    return
                }
            }

            if (!column.sortable) return

            const states = this.store.states
            let sortProp = states.sortProp
            let sortOrder
            const sortingColumn = states.sortingColumn

            if (sortingColumn !== column || (sortingColumn === column && sortingColumn.order === null)) {
                if (sortingColumn) {
                    sortingColumn.order = null
                }
                states.sortingColumn = column
                sortProp = column.property
            }

            if (!order) {
                sortOrder = column.order = null
                states.sortingColumn = null
                sortProp = null
            } else {
                sortOrder = column.order = order
            }

            states.sortProp = sortProp
            states.sortOrder = sortOrder

            this.store.commit('changeSortCondition')
        }
    },

    data () {
        return {
            draggingColumn: null,
            dragging: false,
            dragState: {}
        }
    }
}
