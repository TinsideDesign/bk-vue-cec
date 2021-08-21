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
 * @file table-store
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import Vue from 'vue'
import { debounce } from 'throttle-debounce'
import merge from '@/utils/deepmerge'
import { hasClass, addClass, removeClass } from '@/utils/dom'
import { orderBy, getColumnById, getRowIdentity } from './util'

/**
 * 数据排序
 */
const sortData = (data, states) => {
    const sortingColumn = states.sortingColumn
    if (!sortingColumn || typeof sortingColumn.sortable === 'string') {
        return data
    }
    return orderBy(data, states.sortProp, states.sortOrder, sortingColumn.sortMethod, sortingColumn.sortBy)
}

/**
 * 获取 key map
 */
const getKeysMap = (array = [], rowKey) => {
    const arrayMap = {}
    array.forEach((row, index) => {
        arrayMap[getRowIdentity(row, rowKey)] = { row, index }
    })
    return arrayMap
}

/**
 * 切换 row 的选中状态
 */
const toggleRowSelection = (states, row, selected) => {
    let changed = false
    const selection = states.selection
    const index = selection.indexOf(row)
    if (typeof selected === 'undefined') {
        if (index === -1) {
            selection.push(row)
            changed = true
        } else {
            selection.splice(index, 1)
            changed = true
        }
    } else {
        if (selected && index === -1) {
            selection.push(row)
            changed = true
        } else if (!selected && index > -1) {
            selection.splice(index, 1)
            changed = true
        }
    }

    return changed
}

/**
 * 切换 row 的展开状态
 */
const toggleRowExpansion = (states, row, expanded) => {
    let changed = false
    const expandRows = states.expandRows
    if (typeof expanded !== 'undefined') {
        const index = expandRows.indexOf(row)
        if (expanded) {
            if (index === -1) {
                expandRows.push(row)
                changed = true
            }
        } else {
            if (index !== -1) {
                expandRows.splice(index, 1)
                changed = true
            }
        }
    } else {
        const index = expandRows.indexOf(row)
        if (index === -1) {
            expandRows.push(row)
            changed = true
        } else {
            expandRows.splice(index, 1)
            changed = true
        }
    }

    return changed
}

/**
 * 打平 columns 数组数据
 */
const doFlattenColumns = (columns) => {
    const result = []
    columns.forEach((column) => {
        if (column.children) {
            result.push.apply(result, doFlattenColumns(column.children))
        } else {
            result.push(column)
        }
    })
    return result
}

class TableStore {
    constructor (table, initialState = {}) {
        if (!table) {
            throw new Error('Table is required.')
        }
        this.table = table

        this.states = {
            rowKey: null,
            _columns: [],
            originColumns: [],
            columns: [],
            fixedColumns: [],
            rightFixedColumns: [],
            leafColumns: [],
            fixedLeafColumns: [],
            rightFixedLeafColumns: [],
            leafColumnsLength: 0,
            fixedLeafColumnsLength: 0,
            rightFixedLeafColumnsLength: 0,
            isComplex: false,
            filteredData: null,
            data: null,
            sortingColumn: null,
            sortProp: null,
            sortOrder: null,
            isAllSelected: false,
            selection: [],
            reserveSelection: false,
            selectable: null,
            currentRow: null,
            hoverRow: null,
            filters: {},
            expandRows: [],
            defaultExpandAll: false,
            selectOnIndeterminate: false
        }

        for (const prop in initialState) {
            if (initialState.hasOwnProperty(prop) && this.states.hasOwnProperty(prop)) {
                this.states[prop] = initialState[prop]
            }
        }
    }

    get mutations () {
        return {
            /**
             * setData
             */
            setData (states, data) {
                const dataInstanceChanged = states._data !== data
                states._data = data

                Object.keys(states.filters).forEach((columnId) => {
                    const values = states.filters[columnId]
                    if (!values || values.length === 0) return
                    const column = getColumnById(this.states, columnId)
                    if (column && column.filterMethod) {
                        data = data.filter((row) => {
                            return values.some(value => column.filterMethod.call(null, value, row, column))
                        })
                    }
                })

                states.filteredData = data
                states.data = sortData((data || []), states)

                this.updateCurrentRow()

                const rowKey = states.rowKey

                if (!states.reserveSelection) {
                    if (dataInstanceChanged) {
                        this.clearSelection()
                    } else {
                        this.cleanSelection()
                    }
                    this.updateAllSelected()
                } else {
                    if (rowKey) {
                        const selection = states.selection
                        const selectedMap = getKeysMap(selection, rowKey)

                        states.data.forEach((row) => {
                            const rowId = getRowIdentity(row, rowKey)
                            const rowInfo = selectedMap[rowId]
                            if (rowInfo) {
                                selection[rowInfo.index] = row
                            }
                        })

                        this.updateAllSelected()
                    } else {
                        console.warn('WARN: rowKey is required when reserve-selection is enabled.')
                    }
                }

                const defaultExpandAll = states.defaultExpandAll
                if (defaultExpandAll) {
                    this.states.expandRows = (states.data || []).slice(0)
                } else if (rowKey) {
                    // update expandRows to new rows according to rowKey
                    const ids = getKeysMap(this.states.expandRows, rowKey)
                    const expandRows = []
                    for (const row of states.data) {
                        const rowId = getRowIdentity(row, rowKey)
                        if (ids[rowId]) {
                            expandRows.push(row)
                        }
                    }
                    this.states.expandRows = expandRows
                } else {
                    // clear the old rows
                    this.states.expandRows = []
                }

                Vue.nextTick(() => this.table.updateScrollY())
            },

            /**
             * 改变排序条件
             */
            changeSortCondition (states, options) {
                states.data = sortData((states.filteredData || states._data || []), states)

                const { $el, highlightCurrentRow } = this.table
                if ($el && highlightCurrentRow) {
                    const data = states.data
                    const tr = $el.querySelector('tbody').children
                    const rows = [].filter.call(tr, row => hasClass(row, 'bk-table-row'))
                    const row = rows[data.indexOf(states.currentRow)]

                    Array.prototype.forEach.call(rows, row => removeClass(row, 'current-row'))
                    addClass(row, 'current-row')
                }

                if (!options || !options.silent) {
                    this.table.$emit('sort-change', {
                        column: this.states.sortingColumn,
                        prop: this.states.sortProp,
                        order: this.states.sortOrder
                    })
                }

                Vue.nextTick(() => this.table.updateScrollY())
            },

            /**
             * 排序
             */
            sort (states, options) {
                const { prop, order } = options
                if (prop) {
                    states.sortProp = prop
                    states.sortOrder = order || 'ascending'
                    Vue.nextTick(() => {
                        for (let i = 0, length = states.columns.length; i < length; i++) {
                            const column = states.columns[i]
                            if (column.property === states.sortProp) {
                                column.order = states.sortOrder
                                states.sortingColumn = column
                                break
                            }
                        }

                        if (states.sortingColumn) {
                            this.commit('changeSortCondition')
                        }
                    })
                }
            },

            /**
             * 改变 filter
             */
            filterChange (states, options) {
                let { values } = options
                const { column, silent } = options
                if (values && !Array.isArray(values)) {
                    values = [values]
                }

                const prop = column.property
                const filters = {}

                if (prop) {
                    states.filters[column.id] = values
                    filters[column.columnKey || column.id] = values
                }

                let data = states._data

                Object.keys(states.filters).forEach((columnId) => {
                    const values = states.filters[columnId]
                    if (!values || values.length === 0) return
                    const column = getColumnById(this.states, columnId)
                    if (column && column.filterMethod) {
                        data = data.filter((row) => {
                            return values.some(value => column.filterMethod.call(null, value, row, column))
                        })
                    }
                })

                states.filteredData = data
                states.data = sortData(data, states)

                if (!silent) {
                    this.table.$emit('filter-change', filters, states.filters)
                }

                Vue.nextTick(() => this.table.updateScrollY())
            },

            /**
             * 插入 column
             */
            insertColumn (states, column, index, parent) {
                let array = states._columns
                if (parent) {
                    array = parent.children
                    if (!array) array = parent.children = []
                }

                if (typeof index !== 'undefined') {
                    array.splice(index, 0, column)
                } else {
                    array.push(column)
                }

                if (column.type === 'selection') {
                    states.selectable = column.selectable
                    states.reserveSelection = column.reserveSelection
                }

                if (this.table.$ready) {
                    this.updateColumns() // hack for dynamics insert column
                    this.scheduleLayout()
                }
            },

            /**
             * 移除 column
             */
            removeColumn (states, column, parent) {
                let array = states._columns
                if (parent) {
                    array = parent.children
                    if (!array) array = parent.children = []
                }
                if (array) {
                    array.splice(array.indexOf(column), 1)
                }

                if (this.table.$ready) {
                    this.updateColumns() // hack for dynamics remove column
                    this.scheduleLayout()
                }
            },

            /**
             * 设置 hover 的 row
             */
            setHoverRow (states, row) {
                states.hoverRow = row
            },

            /**
             * 设置当前 row
             */
            setCurrentRow (states, row) {
                const oldCurrentRow = states.currentRow
                states.currentRow = row

                if (oldCurrentRow !== row) {
                    this.table.$emit('current-change', row, oldCurrentRow)
                }
            },
            rowSelectedChanged (states, row) {
                const changed = toggleRowSelection(states, row)
                const selection = states.selection

                if (changed) {
                    const table = this.table
                    table.$emit('selection-change', selection ? selection.slice() : [])
                    table.$emit('select', selection, row)
                }
                this.updateAllSelected()
            },
            toggleAllSelection: debounce(10, function (states) {
                if (this.isAllSelectionDisabled) return
                const data = states.data
                const selection = this.states.selection
                // when only some rows are selected (but not all), select or deselect all of them
                // depending on the value of selectOnIndeterminate
                const value = states.selectOnIndeterminate
                    ? !states.isAllSelected
                    : !(states.isAllSelected || selection.length)
                let selectionChanged = false

                data.forEach((item, index) => {
                    if (states.selectable) {
                        if (states.selectable.call(null, item, index) && toggleRowSelection(states, item, value)) {
                            selectionChanged = true
                        }
                    } else {
                        if (toggleRowSelection(states, item, value)) {
                            selectionChanged = true
                        }
                    }
                })

                const table = this.table
                if (selectionChanged) {
                    table.$emit('selection-change', selection ? selection.slice() : [])
                }
                table.$emit('select-all', selection)
                states.isAllSelected = value
            })
        }
    }

    /**
     * 更新 column
     */
    updateColumns () {
        const states = this.states
        const _columns = states._columns || []
        states.fixedColumns = _columns.filter((column) => column.fixed === true || column.fixed === 'left')
        states.rightFixedColumns = _columns.filter((column) => column.fixed === 'right')

        if (states.fixedColumns.length > 0 && _columns[0] && _columns[0].type === 'selection' && !_columns[0].fixed) {
            _columns[0].fixed = true
            states.fixedColumns.unshift(_columns[0])
        }

        const notFixedColumns = _columns.filter(column => !column.fixed)
        states.originColumns = [].concat(states.fixedColumns).concat(notFixedColumns).concat(states.rightFixedColumns)

        const leafColumns = doFlattenColumns(notFixedColumns)
        const fixedLeafColumns = doFlattenColumns(states.fixedColumns)
        const rightFixedLeafColumns = doFlattenColumns(states.rightFixedColumns)

        states.leafColumnsLength = leafColumns.length
        states.fixedLeafColumnsLength = fixedLeafColumns.length
        states.rightFixedLeafColumnsLength = rightFixedLeafColumns.length

        states.columns = [].concat(fixedLeafColumns).concat(leafColumns).concat(rightFixedLeafColumns)
        states.isComplex = states.fixedColumns.length > 0 || states.rightFixedColumns.length > 0
    }

    /**
     * 判断是否选中
     */
    isSelected (row) {
        return (this.states.selection || []).indexOf(row) > -1
    }

    get isAllSelectionDisabled () {
        if (!this.states.selectable) {
            return false
        }
        const isEmpty = this.states.data && this.states.data.length === 0
        const isDisabled = this.states.data.every((row, index) => !this.states.selectable(row, index))
        return isEmpty || isDisabled
    }

    /**
     * 清空选中
     */
    clearSelection () {
        const states = this.states
        states.isAllSelected = false
        const oldSelection = states.selection
        if (states.selection.length) {
            states.selection = []
        }
        if (oldSelection.length > 0) {
            this.table.$emit('selection-change', states.selection ? states.selection.slice() : [])
        }
    }

    setExpandRowKeys (rowKeys) {
        const expandRows = []
        const data = this.states.data
        const rowKey = this.states.rowKey
        if (!rowKey) throw new Error('[Table] prop row-key should not be empty.')
        const keysMap = getKeysMap(data, rowKey)
        rowKeys.forEach((key) => {
            const info = keysMap[key]
            if (info) {
                expandRows.push(info.row)
            }
        })

        this.states.expandRows = expandRows
    }

    toggleRowSelection (row, selected) {
        const changed = toggleRowSelection(this.states, row, selected)
        if (changed) {
            this.table.$emit('selection-change', this.states.selection ? this.states.selection.slice() : [])
        }
    }

    toggleRowExpansion (row, expanded) {
        const changed = toggleRowExpansion(this.states, row, expanded)
        if (changed) {
            this.table.$emit('expand-change', row, this.states.expandRows)
            this.scheduleLayout()
        }
    }

    isRowExpanded (row) {
        const { expandRows = [], rowKey } = this.states
        if (rowKey) {
            const expandMap = getKeysMap(expandRows, rowKey)
            return !!expandMap[getRowIdentity(row, rowKey)]
        }
        return expandRows.indexOf(row) !== -1
    }

    cleanSelection () {
        const selection = this.states.selection || []
        const data = this.states.data
        const rowKey = this.states.rowKey
        let deleted
        if (rowKey) {
            deleted = []
            const selectedMap = getKeysMap(selection, rowKey)
            const dataMap = getKeysMap(data, rowKey)
            for (const key in selectedMap) {
                if (selectedMap.hasOwnProperty(key) && !dataMap[key]) {
                    deleted.push(selectedMap[key].row)
                }
            }
        } else {
            deleted = selection.filter((item) => {
                return data.indexOf(item) === -1
            })
        }

        deleted.forEach((deletedItem) => {
            selection.splice(selection.indexOf(deletedItem), 1)
        })

        if (deleted.length) {
            this.table.$emit('selection-change', selection ? selection.slice() : [])
        }
    }

    clearFilter () {
        const states = this.states
        const { tableHeader, fixedTableHeader, rightFixedTableHeader } = this.table.$refs
        let panels = {}

        if (tableHeader) panels = merge(panels, tableHeader.filterPanels)
        if (fixedTableHeader) panels = merge(panels, fixedTableHeader.filterPanels)
        if (rightFixedTableHeader) panels = merge(panels, rightFixedTableHeader.filterPanels)

        const keys = Object.keys(panels)
        if (!keys.length) return

        keys.forEach(key => {
            panels[key].filteredValue = []
        })

        states.filters = {}

        this.commit('filterChange', {
            column: {},
            values: [],
            silent: true
        })
    }

    clearSort () {
        const states = this.states
        if (!states.sortingColumn) return
        states.sortingColumn.order = null
        states.sortProp = null
        states.sortOrder = null

        this.commit('changeSortCondition', {
            silent: true
        })
    }

    updateAllSelected () {
        const states = this.states
        const { selection, rowKey, selectable, data } = states
        if (!data || data.length === 0) {
            states.isAllSelected = false
            return
        }

        let selectedMap
        if (rowKey) {
            selectedMap = getKeysMap(states.selection, rowKey)
        }

        const isSelected = function (row) {
            if (selectedMap) {
                return !!selectedMap[getRowIdentity(row, rowKey)]
            } else {
                return selection.indexOf(row) !== -1
            }
        }

        let isAllSelected = true
        let selectedCount = 0
        for (let i = 0, j = data.length; i < j; i++) {
            const item = data[i]
            const isRowSelectable = selectable && selectable(item, i)
            if (!isSelected(item)) {
                if (!selectable || isRowSelectable) {
                    isAllSelected = false
                    break
                }
            } else {
                selectedCount++
            }
        }

        if (selectedCount === 0) isAllSelected = false

        states.isAllSelected = isAllSelected
    }

    scheduleLayout (updateColumns) {
        if (updateColumns) {
            this.updateColumns()
        }
        this.table.debouncedUpdateLayout()
    }

    setCurrentRowKey (key) {
        const states = this.states
        const rowKey = states.rowKey
        if (!rowKey) throw new Error('[Table] row-key should not be empty.')
        const data = states.data || []
        const keysMap = getKeysMap(data, rowKey)
        const info = keysMap[key]
        states.currentRow = info ? info.row : null
    }

    updateCurrentRow () {
        const states = this.states
        const table = this.table
        const data = states.data || []
        const oldCurrentRow = states.currentRow

        if (data.indexOf(oldCurrentRow) === -1) {
            states.currentRow = null

            if (states.currentRow !== oldCurrentRow) {
                table.$emit('current-change', null, oldCurrentRow)
            }
        }
    }

    commit (name, ...args) {
        const mutations = this.mutations
        if (mutations[name]) {
            mutations[name].apply(this, [this.states].concat(args))
        } else {
            throw new Error(`Action not found: ${name}`)
        }
    }
}

export default TableStore
