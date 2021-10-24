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
 * @file table-layout
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import Vue from 'vue'
import scrollbarWidth from '@/utils/scrollbar-width'
import { debounce } from 'throttle-debounce'
import { isShallowEqual } from './util'

class TableLayout {
    constructor (options) {
        this.observers = []
        this.table = null
        this.store = null
        this.columns = null
        this.fit = true
        this.showHeader = true

        this.height = null
        this.scrollX = false
        this.scrollY = false
        this.bodyWidth = null
        this.fixedWidth = null
        this.rightFixedWidth = null
        this.tableHeight = null
        this.headerHeight = 44 // Table Header Height
        this.appendHeight = 0 // Append Slot Height
        this.footerHeight = 44 // Table Footer Height
        this.paginationHeight = 0 // Table Pagination Height
        this.viewportHeight = null // Table Height - Scroll Bar Height
        this.bodyHeight = null // Table Height - Table Header Height
        this.fixedBodyHeight = null // Table Height - Table Header Height - Scroll Bar Height
        this.gutterWidth = options.table.virtualRender ? 0 : scrollbarWidth()
        this.rowsHeight = {}
        this.debouncedSyncRowHeight = debounce(1000 / 60, this.syncRowHeight)

        for (const name in options) {
            if (options.hasOwnProperty(name)) {
                this[name] = options[name]
            }
        }

        if (!this.table) {
            throw new Error('table is required for Table Layout')
        }
        if (!this.store) {
            throw new Error('store is required for Table Layout')
        }
    }

    updateScrollY () {
        const height = this.height
        if (typeof height !== 'string' && typeof height !== 'number') return
        const bodyWrapper = this.table.bodyWrapper
        if (this.table.$el && bodyWrapper) {
            if (this.table.isVirtualRender) {
                const body = bodyWrapper.querySelector('.bk-virtual-render')
                this.scrollY = body.offsetHeight > this.bodyHeight
            } else {
                const body = bodyWrapper.querySelector('.bk-table-body')
                this.scrollY = body.offsetHeight > this.bodyHeight
            }
        }
    }

    setHeight (value, prop = 'height') {
        const el = this.table.$el
        if (typeof value === 'string' && /^\d+$/.test(value)) {
            value = Number(value)
        }
        this.height = value

        if (!el) return Vue.nextTick(() => this.setHeight(value, prop))

        if (typeof value === 'number') {
            el.style[prop] = value + 'px'

            this.updateElsHeight()
        } else if (typeof value === 'string') {
            el.style[prop] = value
            this.updateElsHeight()
        }
    }

    setMaxHeight (value) {
        return this.setHeight(value, 'max-height')
    }

    updateElsHeight () {
        if (this.table.$destroyed) return
        if (!this.table.$ready) return Vue.nextTick(() => this.updateElsHeight())
        const { headerWrapper, appendWrapper, footerWrapper, paginationWrapper } = this.table.$refs
        if (this.table.showPagination && !paginationWrapper) return Vue.nextTick(() => this.updateElsHeight())
        this.appendHeight = appendWrapper ? appendWrapper.offsetHeight : 0
        this.paginationHeight = paginationWrapper ? paginationWrapper.offsetHeight : 0

        if (this.showHeader && !headerWrapper) return
        const headerHeight = (this.headerHeight = !this.showHeader ? 0 : headerWrapper.offsetHeight)
        if (
            this.showHeader
            && headerWrapper.offsetWidth > 0
            && (this.table.columns || []).length > 0
            && headerHeight < 2
        ) {
            return Vue.nextTick(() => this.updateElsHeight())
        }
        const tableHeight = (this.tableHeight = this.table.$el.offsetHeight - this.paginationHeight)
        if (this.height !== null && (!isNaN(this.height) || typeof this.height === 'string')) {
            const footerHeight = (this.footerHeight = footerWrapper ? footerWrapper.offsetHeight : 0)
            this.bodyHeight = tableHeight - headerHeight - footerHeight + (footerWrapper ? 1 : 0)
        }
        this.fixedBodyHeight = this.scrollX ? this.bodyHeight - this.gutterWidth : this.bodyHeight

        const noData = !this.table.data || this.table.data.length === 0
        this.viewportHeight = this.scrollX ? tableHeight - (noData ? 0 : this.gutterWidth) : tableHeight

        this.updateScrollY()
        this.notifyObservers('scrollable')
    }

    getFlattenColumns () {
        const flattenColumns = []
        const columns = this.table.columns
        columns.forEach((column) => {
            if (column.isColumnGroup) {
                flattenColumns.push.apply(flattenColumns, column.columns)
            } else {
                flattenColumns.push(column)
            }
        })

        return flattenColumns
    }

    updateColumnsWidth () {
        if (this.table.$destroyed) return
        const fit = this.fit
        const bodyWidth = this.table.$el.clientWidth
        let bodyMinWidth = 0

        const flattenColumns = this.getFlattenColumns()
        if (flattenColumns.length < 1) {
            return
        }
        const flexColumns = flattenColumns.filter((column) => typeof column.width !== 'number')

        // 处理 column 变化
        // column 从 flex 变成 unflex
        if (!this.store.isDraging) {
            flattenColumns.forEach((column) => {
                if (typeof column.width === 'number') {
                    column.realWidth = column.width
                }
            })
        }
        // 用户拖动列导致的宽度变化，只重新计算操作列的宽度
        if (!this.store.isDraging && flexColumns.length > 0 && fit) {
            flattenColumns.forEach((column) => {
                bodyMinWidth += column.width || column.minWidth
            })

            const scrollYWidth = this.scrollY ? this.gutterWidth : 0
            if (bodyMinWidth <= bodyWidth - scrollYWidth) {
                // 所有 column 的宽度和小于 table 的宽度
                // 取消水平滚动条
                this.scrollX = false
                const virtualScrollWidth = this.table.isVirtualRender && this.scrollY ? 10 : 0
                const totalFlexWidth = bodyWidth - scrollYWidth - bodyMinWidth - virtualScrollWidth

                if (flexColumns.length === 1) {
                    flexColumns[0].realWidth = flexColumns[0].minWidth + totalFlexWidth
                } else {
                    const flexWidthPerPixel = Math.floor(totalFlexWidth / flexColumns.length)
                    let firstWidth = totalFlexWidth

                    flexColumns.forEach((column, index) => {
                        if (index === 0) return
                        let flexWidth = column.minWidth + flexWidthPerPixel
                        // flex 宽度平分后超过 maxWidth
                        if (column.maxWidth && column.maxWidth < flexWidth) {
                            flexWidth = column.maxWidth
                            firstWidth -= column.maxWidth - column.minWidth
                        } else {
                            firstWidth -= flexWidthPerPixel
                        }

                        column.realWidth = flexWidth
                    })

                    flexColumns[0].realWidth = flexColumns[0].minWidth + firstWidth
                }
            } else {
                // 所有 column 的宽度和大于 table 的宽度
                // 所有 flex column 的宽度取最小值
                // 增加水平滚动条
                this.scrollX = true
                flexColumns.forEach(function (column) {
                    column.realWidth = column.minWidth
                })
            }

            this.bodyWidth = Math.max(bodyMinWidth, bodyWidth)
            this.table.resizeState.width = this.bodyWidth
        } else {
            flattenColumns.forEach((column) => {
                bodyMinWidth += column.realWidth
            })

            this.scrollX = bodyMinWidth > bodyWidth

            // 找到最后非 setting 类型的 column
            const findLastColumnWithNotSetting = columnList => {
                let i = columnList.length
                while (--i) {
                    if (columnList[i].type !== 'setting') {
                        return columnList[i]
                    }
                }
                return null
            }

            const lastColumn = findLastColumnWithNotSetting(flattenColumns)
            if (lastColumn) {
                if (!this.scrollX && flattenColumns.length) {
                    // 当所有列均被指定了宽度后，如果列宽总和小于表格宽度，则将宽度差值分配给最右一列(非setting类型)
                    const deltaWidth = bodyWidth - bodyMinWidth
                    console.log('from print table last column < ', lastColumn)
                    lastColumn.realWidth = lastColumn.realWidth + deltaWidth
                    this.bodyWidth = bodyWidth
                } else {
                    // 当所有列均被指定了宽度后，如果列宽总和大于表格宽度修正最后一列(非setting类型)的宽度
                    console.log('from print table last column > ', lastColumn)
                    if (lastColumn) {
                        const lastRealWidth = typeof lastColumn.width !== 'number' ? lastColumn.minWidth : lastColumn.width

                        const preLastColumnBodyMinWidth = bodyMinWidth - lastColumn.realWidth

                        if (preLastColumnBodyMinWidth + lastRealWidth > bodyWidth) {
                            lastColumn.realWidth = lastRealWidth
                            bodyMinWidth = preLastColumnBodyMinWidth + lastRealWidth
                        } else {
                            lastColumn.realWidth = bodyWidth - preLastColumnBodyMinWidth
                            bodyMinWidth = preLastColumnBodyMinWidth + lastColumn.realWidth
                        }
                    }
                    
                    this.scrollX = bodyMinWidth > bodyWidth
                    this.bodyWidth = bodyMinWidth
                }
            }
        }

        const fixedColumns = this.store.states.fixedColumns

        if (fixedColumns.length > 0) {
            let fixedWidth = 0
            fixedColumns.forEach(function (column) {
                fixedWidth += column.realWidth || column.width
            })

            this.fixedWidth = fixedWidth
        }

        const rightFixedColumns = this.store.states.rightFixedColumns
        if (rightFixedColumns.length > 0) {
            let rightFixedWidth = 0
            rightFixedColumns.forEach(function (column) {
                rightFixedWidth += column.realWidth || column.width
            })

            this.rightFixedWidth = rightFixedWidth
        }
        
        // 计算完成，取消拖动状态
        this.store.isDraging = false

        this.notifyObservers('columns')
    }
    syncRowHeight () {
        if (this.table.$destroyed) return
        if (!this.table.$ready) return Vue.nextTick(this.syncRowHeight)
        const rows = this.table.$refs.tableBody.$refs.row || []
        const rowsHeight = rows.reduce((accumulator, row) => {
            const key = row.getAttribute('data-table-row')
            accumulator[key] = row.offsetHeight
            return accumulator
        }, {})
        if (isShallowEqual(rowsHeight, this.rowsHeight)) return
        this.rowsHeight = rowsHeight
    }

    addObserver (observer) {
        this.observers.push(observer)
    }

    removeObserver (observer) {
        const index = this.observers.indexOf(observer)
        if (index !== -1) {
            this.observers.splice(index, 1)
        }
    }

    notifyObservers (event) {
        const observers = this.observers
        observers.forEach((observer) => {
            switch (event) {
                case 'columns':
                    observer.onColumnsChange(this)
                    break
                case 'scrollable':
                    observer.onScrollableChange(this)
                    break
                default:
                    throw new Error(`Table Layout don't have event ${event}.`)
            }
        })
    }
}

export default TableLayout
