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
 * @file table-body
 *
 * thanks to element
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import { debounce } from 'throttle-debounce'
import { hasClass, addClass, removeClass } from '@/utils/dom'
import bkOverflowTips from '@/directives/overflow-tips'
import { getCell, getColumnByCell, getRowIdentity } from './util'
import bkCheckbox from '../checkbox'
import LayoutObserver from './layout-observer'

export default {
    name: 'bk-table-body',
    mixins: [LayoutObserver],
    components: {
        bkCheckbox
    },
    directives: {
        bkOverflowTips
    },
    props: {
        store: {
            required: true
        },
        stripe: Boolean,
        context: {},
        rowClassName: [String, Function],
        rowStyle: [Object, Function],
        fixed: String,
        highlight: Boolean
    },

    /**
     * 渲染函数
     */
    render (h) {
        const columnsHidden = this.columns.map((column, index) => this.isColumnHidden(index))
        return (
            <table
                class="bk-table-body"
                cellspacing="0"
                cellpadding="0"
                border="0">
                <colgroup>
                    {
                        this._l(this.columns, column => <col name={ column.id } />)
                    }
                </colgroup>
                <tbody>
                    {
                        this._l(this.data, (row, $index) =>
                            [<tr
                                ref="row"
                                refInFor={ true }
                                style={ this.getRowStyle(row, $index) }
                                key={ this.table.rowKey ? this.getKeyOfRow(row, $index) : $index }
                                on-dblclick={ ($event) => this.handleDoubleClick($event, row) }
                                on-click={ ($event) => this.handleClick($event, row) }
                                on-contextmenu={ ($event) => this.handleContextMenu($event, row) }
                                on-mouseenter={ ($event) => this.handleMouseEnter($index, $event, row) }
                                on-mouseleave={ ($event) => this.handleMouseLeave($index, $event, row) }
                                class={ [this.getRowClass(row, $index)] }
                                attrs={ this.getRowAttributes(row, $index) }>
                                {
                                    this._l(this.columns, (column, cellIndex) => {
                                        const { rowspan, colspan } = this.getSpan(row, column, $index, cellIndex)
                                        if (!rowspan || !colspan || column.type === 'setting') {
                                            return ''
                                        } else {
                                            return (
                                                <td
                                                    style={ this.getCellStyle($index, cellIndex, row, column) }
                                                    class={ this.getCellClass($index, cellIndex, row, column) }
                                                    rowspan={ rowspan }
                                                    colspan={ colspan }
                                                    on-mouseenter={ ($event) => this.handleCellMouseEnter($event, row) }
                                                    on-mouseleave={ this.handleCellMouseLeave }
                                                    domProps={ this.getCellAttributes($index, cellIndex, row, column) }>
                                                    {
                                                        this.isColumnInvisible(cellIndex)
                                                            ? ''
                                                            : column.renderCell.call(
                                                                this._renderProxy,
                                                                h,
                                                                {
                                                                    row,
                                                                    column,
                                                                    $index,
                                                                    store: this.store,
                                                                    _self: this.context || this.table.$vnode.context
                                                                },
                                                                columnsHidden[cellIndex]
                                                            )
                                                    }
                                                </td>
                                            )
                                        }
                                    })
                                }
                            </tr>,
                            this.store.isRowExpanded(row)
                                ? (<tr
                                    ref="row"
                                    refInFor={true}
                                    attrs={ this.getExpandedRowAttributes(row, $index) }
                                    style={ this.getExpandedRowStyle(row, $index) }
                                    class={ this.getExpandedRowClass(row, $index) }>
                                    <td colspan={ this.columns.length } class="bk-table-expanded-cell">
                                        { (!this.fixed && this.table.renderExpanded)
                                            ? this.table.renderExpanded(h, { row, $index, store: this.store })
                                            : ''}
                                    </td>
                                </tr>)
                                : ''
                            ]
                        )
                    }
                </tbody>
            </table>
        )
    },

    watch: {
        'store.states.hoverRow' (newVal, oldVal) {
            const el = this.$el
            if (!el) {
                return
            }
            const tr = el.querySelector('tbody').children
            const rows = [].filter.call(tr, row => hasClass(row, 'bk-table-row'))
            const oldRow = rows[oldVal]
            const newRow = rows[newVal]
            if (oldRow) {
                removeClass(oldRow, 'hover-row')
            }
            if (newRow) {
                addClass(newRow, 'hover-row')
            }
        },
        'store.states.currentRow' (newVal, oldVal) {
            if (!this.highlight) {
                return
            }
            const el = this.$el
            if (!el) {
                return
            }
            const data = this.store.states.data
            const tr = el.querySelector('tbody').children
            const rows = [].filter.call(tr, row => hasClass(row, 'bk-table-row'))
            const oldRow = rows[data.indexOf(oldVal)]
            const newRow = rows[data.indexOf(newVal)]
            if (oldRow) {
                removeClass(oldRow, 'current-row')
            } else {
                [].forEach.call(rows, row => removeClass(row, 'current-row'))
            }
            if (newRow) {
                addClass(newRow, 'current-row')
            }
        }
    },

    computed: {
        table () {
            return this.$parent
        },

        data () {
            return this.store.states.data
        },

        columnsCount () {
            return this.store.states.columns.length
        },

        leftFixedLeafCount () {
            return this.store.states.fixedLeafColumnsLength
        },

        rightFixedLeafCount () {
            return this.store.states.rightFixedLeafColumnsLength
        },

        leftFixedCount () {
            return this.store.states.fixedColumns.length
        },

        rightFixedCount () {
            return this.store.states.rightFixedColumns.length
        },

        columns () {
            return this.store.states.columns
        }
    },

    data () {
        return {
            tooltipContent: ''
        }
    },

    created () {
        this.activateTooltip = debounce(50, tooltip => tooltip.handleShowPopper())
    },

    updated () {
        this.syncFixedRowHeight()
    },

    methods: {
        /**
         * 获取行标识
         */
        getKeyOfRow (row, index) {
            const rowKey = this.table.rowKey
            if (rowKey) {
                return getRowIdentity(row, rowKey)
            }
            return index
        },

        /**
         * 列是否不可见
         */
        isColumnInvisible (index) {
            if (!this.fixed) {
                return false
            }
            return this.isColumnHidden(index)
        },

        /**
         * 列是否隐藏
         */
        isColumnHidden (index) {
            if (this.fixed === true || this.fixed === 'left') {
                return index >= this.leftFixedLeafCount
            } else if (this.fixed === 'right') {
                return index < this.columnsCount - this.rightFixedLeafCount
            } else {
                return (index < this.leftFixedLeafCount) || (index >= this.columnsCount - this.rightFixedLeafCount)
            }
        },

        /**
         * 获取合并单元格的数据
         */
        getSpan (row, column, rowIndex, columnIndex) {
            let rowspan = 1
            let colspan = 1

            const fn = this.table.spanMethod
            if (typeof fn === 'function') {
                const result = fn({
                    row,
                    column,
                    rowIndex,
                    columnIndex
                })

                if (Array.isArray(result)) {
                    rowspan = result[0]
                    colspan = result[1]
                } else if (typeof result === 'object') {
                    rowspan = result.rowspan
                    colspan = result.colspan
                }
            }
            // 判断下一列是否是原本的设置列，如果是则当前列的colspan + 1，占用下一列的位置
            const nextColumn = this.columns[columnIndex + 1]
            colspan = nextColumn && nextColumn.type === 'setting' ? colspan + 1 : colspan

            return {
                rowspan,
                colspan
            }
        },

        /**
         * 获取行样式
         */
        getRowStyle (row, rowIndex) {
            let rowStyle = this.table.rowStyle || {}
            if (typeof rowStyle === 'function') {
                rowStyle = rowStyle({
                    row,
                    rowIndex
                })
            }
            const height = this.tableLayout.rowsHeight[`row-${rowIndex}`]
            if (this.fixed && height) {
                rowStyle.height = height + 'px'
            }
            return rowStyle
        },

        /**
         * 获取行类名
         */
        getRowClass (row, rowIndex) {
            const classes = ['bk-table-row']
            if (rowIndex === this.data.length - 1) {
                classes.push('bk-table-row-last')
            }

            if (this.table.highlightCurrentRow && row === this.store.states.currentRow) {
                classes.push('current-row')
            }

            if (this.stripe && rowIndex % 2 === 1) {
                classes.push('bk-table-row-striped')
            }
            const rowClassName = this.table.rowClassName
            if (typeof rowClassName === 'string') {
                classes.push(rowClassName)
            } else if (typeof rowClassName === 'function') {
                classes.push(rowClassName({
                    row,
                    rowIndex
                }))
            }

            if (this.store.states.expandRows.indexOf(row) > -1) {
                classes.push('expanded')
            }

            return classes.join(' ')
        },

        /**
         * 获取行属性
         */
        getRowAttributes (row, rowIndex) {
            return {
                'data-table-row': `row-${rowIndex}`
            }
        },

        /**
         * 获取单元格样式
         */
        getCellStyle (rowIndex, columnIndex, row, column) {
            const cellStyle = this.table.cellStyle
            if (typeof cellStyle === 'function') {
                return cellStyle({
                    rowIndex,
                    columnIndex,
                    row,
                    column
                })
            }
            return cellStyle
        },

        /**
         * 获取单元格类名
         */
        getCellClass (rowIndex, columnIndex, row, column) {
            const classes = [column.id, column.align, column.className]

            if (this.isColumnHidden(columnIndex)) {
                classes.push('is-hidden')
            }

            if (columnIndex === 0) {
                classes.push('is-first')
            }

            if (columnIndex === this.columns.length - 1) {
                classes.push('is-last')
            }

            const cellClassName = this.table.cellClassName
            if (typeof cellClassName === 'string') {
                classes.push(cellClassName)
            } else if (typeof cellClassName === 'function') {
                classes.push(cellClassName({
                    rowIndex,
                    columnIndex,
                    row,
                    column
                }))
            }

            return classes.join(' ')
        },

        /**
         * 获取单元格属性
         */
        getCellAttributes (rowIndex, cellIndex, row, column) {
            if (typeof this.table.cellAttributes === 'function') {
                const attributes = this.table.cellAttributes({ rowIndex, cellIndex, row, column })
                return typeof attributes === 'object' ? attributes : {}
            } else if (typeof this.table.cellAttributes === 'object') {
                return this.table.cellAttributes
            }
            return {}
        },

        /**
         * 获取展开行的属性
         */
        getExpandedRowAttributes (row, rowIndex) {
            return {
                'data-table-row': `expanded-row-${rowIndex}`
            }
        },

        /**
         * 获取展开行的样式
         */
        getExpandedRowStyle (row, rowIndex) {
            const style = {}
            const height = this.tableLayout.rowsHeight[`expanded-row-${rowIndex}`]
            if (this.fixed && height) {
                style.height = height + 'px'
            }
            return style
        },

        /**
         * 获取展开行类名
         */
        getExpandedRowClass (row, rowIndex) {
            const classes = ['is-expanded-row']
            return classes.join(' ')
        },

        /**
         * 单元格鼠标进入事件回调
         */
        handleCellMouseEnter (event, row) {
            const table = this.table
            const cell = getCell(event)

            if (cell) {
                const column = getColumnByCell(table, cell)
                const hoverState = table.hoverState = { cell, column, row }
                table.$emit('cell-mouse-enter', hoverState.row, hoverState.column, hoverState.cell, event)
            }
        },

        /**
         * 单元格鼠标离开事件回调
         */
        handleCellMouseLeave (event) {
            const cell = getCell(event)
            if (!cell) return

            const oldHoverState = this.table.hoverState || {}
            this.table.$emit('cell-mouse-leave', oldHoverState.row, oldHoverState.column, oldHoverState.cell, event)
        },

        /**
         * 行鼠标进入事件回调
         */
        handleMouseEnter (index, event, row) {
            this.store.commit('setHoverRow', index)
            this.table.$emit('row-mouse-enter', index, event, row)
        },

        /**
         * 行鼠标离开事件回调
         */
        handleMouseLeave (index, event, row) {
            this.store.commit('setHoverRow', null)
            this.table.$emit('row-mouse-leave', index, event, row)
        },

        /**
         * 行鼠标右键事件回调
         */
        handleContextMenu (event, row) {
            this.handleEvent(event, row, 'contextmenu')
        },

        /**
         * 行双击事件回调
         */
        handleDoubleClick (event, row) {
            this.handleEvent(event, row, 'dblclick')
        },

        /**
         * 行单击事件回调
         */
        handleClick (event, row) {
            this.store.commit('setCurrentRow', row)
            this.handleEvent(event, row, 'click')
        },

        /**
         * 事件统一处理函数
         */
        handleEvent (event, row, name) {
            const table = this.table
            const cell = getCell(event)
            const rowIndex = this.data.indexOf(row)
            let column
            let columnIndex
            if (cell) {
                column = getColumnByCell(table, cell)
                if (column) {
                    columnIndex = this.columns.indexOf(column)
                    table.$emit(`cell-${name}`, row, column, cell, event, rowIndex, columnIndex)
                }
            }
            table.$emit(`row-${name}`, row, event, column, rowIndex, columnIndex)
        },

        async handleExpandClick (data) {
            const { row, event, column } = data
            event.stopPropagation()
            if (typeof column.beforeExpandChange === 'function') {
                const result = await column.beforeExpandChange(data)
                if (!result) {
                    return false
                }
            }
            this.store.toggleRowExpansion(row)
        },

        syncFixedRowHeight () {
            if (!this.fixed && (this.leftFixedCount || this.rightFixedCount)) {
                this.tableLayout.debouncedSyncRowHeight()
            }
        }
    }
}
