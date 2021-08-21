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
 * @file table-column
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import { getPropByPath, createFuncWrapper } from './util'

let columnIdSeed = 1

/**
 * 列的默认配置
 */
const defaults = {
    default: {
        order: ''
    },
    selection: {
        width: 48,
        minWidth: 48,
        realWidth: 48,
        align: 'is-center',
        headerAlign: 'is-center',
        order: '',
        className: 'bk-table-column-selection'
    },
    expand: {
        width: 48,
        minWidth: 48,
        realWidth: 48,
        align: 'is-center',
        headerAlign: 'is-center',
        order: '',
        className: 'bk-table-column-expand'
    },
    index: {
        width: 48,
        minWidth: 48,
        realWidth: 48,
        align: 'is-center',
        headerAlign: 'is-center',
        order: '',
        className: 'bk-table-column-index'
    },
    setting: {
        width: 42,
        minWidth: 42,
        realWidth: 42,
        headerAlign: 'is-center',
        order: '',
        className: 'bk-table-column-setting',
        icon: 'bk-icon icon-cog-shape'
    }
}

/**
 * 四种类型的列，渲染 header 和单元格的逻辑
 */
const forced = {
    selection: {
        renderHeader: function (h, { store, column }) {
            return <bk-checkbox
                disabled={ store.isAllSelectionDisabled }
                indeterminate={ store.states.selection.length > 0 && !this.isAllSelected }
                before-change={ () => column.beforeSelectAllChange(this.isAllSelected, { column, store }) }
                nativeOn-click={ async () => {
                    const result = await column.beforeSelectAllChange(this.isAllSelected, { column, store })
                    if (result === false) return
                    this.toggleAllSelection()
                } }
                checked={ this.isAllSelected }></bk-checkbox>
        },
        renderCell: function (h, { row, column, store, $index }) {
            const disabled = column.selectable ? !column.selectable.call(null, row, $index) : false
            return <bk-checkbox
                checked={ store.isSelected(row) }
                disabled={ disabled }
                before-change={ () => column.beforeSelectChange(store.isSelected(row), { row, column, store, $index }) }
                nativeOn-click={ async event => {
                    event.stopPropagation()
                    if (disabled) return
                    const result = await column.beforeSelectChange(store.isSelected(row),
                        { row, column, store, $index })
                    result !== false && store.commit('rowSelectedChanged', row)
                } } ></bk-checkbox>
        },
        sortable: false,
        resizable: false
    },
    index: {
        renderHeader: function (h, { column }) {
            return column.label || '#'
        },
        renderCell: function (h, { $index, column }) {
            let i = $index + 1
            const index = column.index

            if (typeof index === 'number') {
                i = $index + index
            } else if (typeof index === 'function') {
                i = index($index)
            }

            return <div>{ i }</div>
        },
        sortable: false
    },
    expand: {
        renderHeader: function (h, { column }) {
            return column.label || ''
        },
        renderCell: function (h, data, proxy) {
            const { row, store } = data
            const expanded = store.states.expandRows.indexOf(row) > -1
            return <div class={ 'bk-table-expand-icon ' + (expanded ? 'bk-table-expand-icon-expanded' : '') }
                on-click={ event => proxy.handleExpandClick({ ...data, event }) }>
                <i class={'bk-icon icon-play-shape'}></i>
            </div>
        },
        sortable: false,
        resizable: false,
        className: 'bk-table-expand-column'
    },
    setting: {
        renderHeader: function (h, { column, fixed }) {
            if (fixed === 'right') {
                return <bk-table-setting column={ column }></bk-table-setting>
            }
            return ''
        },
        renderCell: function (h, { row, store }, proxy) {
            return ''
        },
        sortable: false,
        resizable: false,
        fixed: 'right',
        align: 'center'
    }
}

/**
 * 获取默认列
 */
const getDefaultColumn = function (type, options) {
    const column = {
        ...defaults[type || 'default']
    }
    for (const name in options) {
        if (options.hasOwnProperty(name)) {
            const value = options[name]
            if (typeof value !== 'undefined') {
                column[name] = value
            }
        }
    }

    if (!column.minWidth) {
        column.minWidth = 80
    }

    column.realWidth = column.width === undefined ? column.minWidth : column.width
    return column
}

/**
 * 单元格默认的渲染逻辑
 */
const DEFAULT_RENDER_CELL = function (h, { row, column, $index }) {
    const property = column.property
    const value = property && getPropByPath(row, property).v
    if (column && column.formatter) {
        return column.formatter(row, column, value, $index)
    }
    return value
}

/**
 * 解析宽度
 */
const parseWidth = (width) => {
    if (width !== undefined) {
        width = parseInt(width, 10)
        if (isNaN(width)) {
            width = null
        }
    }
    return width
}

/**
 * 解析最小宽度
 */
const parseMinWidth = (minWidth) => {
    if (minWidth !== undefined) {
        minWidth = parseInt(minWidth, 10)
        if (isNaN(minWidth)) {
            minWidth = 80
        }
    }
    return minWidth
}

export default {
    name: 'bk-table-column',
    props: {
        type: {
            type: String,
            default: 'default'
        },
        label: String,
        className: String,
        labelClassName: String,
        property: String,
        prop: String,
        width: {},
        minWidth: {},
        renderHeader: Function,
        sortable: {
            type: [String, Boolean],
            default: false
        },
        sortMethod: Function,
        sortBy: [String, Function, Array],
        resizable: {
            type: Boolean,
            default: true
        },
        context: {},
        columnKey: String,
        align: String,
        headerAlign: String,
        showOverflowTooltip: [Boolean, Object],
        fixed: [Boolean, String],
        formatter: Function,
        selectable: Function,
        reserveSelection: Boolean,
        filterMethod: Function,
        filteredValue: Array,
        filters: Array,
        filterPlacement: String,
        filterMultiple: {
            type: Boolean,
            default: true
        },
        filterSearchable: Boolean,
        index: [Number, Function],
        sortOrders: {
            type: Array,
            default () {
                return ['ascending', 'descending', null]
            },
            validator (val) {
                return val.every(order => ['ascending', 'descending', null].indexOf(order) > -1)
            }
        },
        beforeExpandChange: Function,
        beforeSelectChange: Function,
        beforeSelectAllChange: Function
    },

    data () {
        return {
            isSubColumn: false,
            columns: []
        }
    },

    beforeCreate () {
        this.row = {}
        this.column = {}
        this.$index = 0
    },

    computed: {
        owner () {
            let parent = this.$parent
            while (parent && !parent.tableId) {
                parent = parent.$parent
            }
            return parent
        },
        columnOrTableParent () {
            let parent = this.$parent
            while (parent && !parent.tableId && !parent.columnId) {
                parent = parent.$parent
            }
            return parent
        }
    },
    created () {
        this.customRender = this.$options.render
        if (this.type !== 'setting') {
            this.$options.render = h => h('div', this.$slots.default)
        } else {
            this.$options.render = h => {
                this.columnConfig.settingContent = h => {
                    return this.$slots.default
                }
                return h('div')
            }
        }

        const parent = this.columnOrTableParent
        const owner = this.owner
        this.isSubColumn = owner !== parent
        this.columnId = (parent.tableId || parent.columnId) + '-column-' + columnIdSeed++

        const type = this.type

        const width = parseWidth(this.width)
        const minWidth = parseMinWidth(this.minWidth)

        const isColumnGroup = false

        const column = getDefaultColumn(type, {
            id: this.columnId,
            columnKey: this.columnKey,
            label: this.label,
            className: this.className,
            labelClassName: this.labelClassName,
            property: this.prop || this.property,
            type,
            renderCell: null,
            renderHeader: this.renderHeader,
            minWidth,
            width,
            isColumnGroup,
            context: this.context,
            align: this.align ? 'is-' + this.align : undefined,
            headerAlign: this.headerAlign ? 'is-' + this.headerAlign : (this.align ? 'is-' + this.align : undefined),
            sortable: this.sortable === '' ? true : this.sortable,
            sortMethod: this.sortMethod,
            sortBy: this.sortBy,
            resizable: this.resizable,
            showOverflowTooltip: this.showOverflowTooltip,
            formatter: this.formatter,
            selectable: this.selectable,
            reserveSelection: this.reserveSelection,
            fixed: this.fixed === '' ? true : this.fixed,
            filterMethod: this.filterMethod,
            filters: this.filters,
            filterable: this.filters,
            filterMultiple: this.filterMultiple,
            filterOpened: false,
            filteredValue: this.filteredValue || [],
            filterPlacement: this.filterPlacement || '',
            filterSearchable: this.filterSearchable,
            index: this.index,
            sortOrders: this.sortOrders,
            order: null,
            beforeExpandChange: this.beforeExpandChange,
            beforeSelectChange: createFuncWrapper(this.beforeSelectChange),
            beforeSelectAllChange: createFuncWrapper(this.beforeSelectAllChange)
        })

        const source = forced[type] || {}
        Object.keys(source).forEach((prop) => {
            let value = source[prop]
            if (value !== undefined) {
                if (prop === 'renderHeader') {
                    if (type === 'selection' && column[prop]) {
                        // eslint-disable-next-line max-len
                        console.warn('[Magic Warn][TableColumn]Selection column doesn\'t allow to set render-header function.')
                    } else {
                        value = column[prop] || value
                    }
                }
                column[prop] = prop === 'className' ? `${column[prop]} ${value}` : value
            }
        })

        this.columnConfig = column

        let renderCell = column.renderCell
        const _self = this
        if (type === 'expand') {
            owner.renderExpanded = function (h, data) {
                return _self.$scopedSlots.default
                    ? _self.$scopedSlots.default(data)
                    : _self.$slots.default
            }

            column.renderCell = function (h, data) {
                return <div class="cell">{ renderCell(h, data, this._renderProxy) }</div>
            }

            return
        }

        if (type === 'setting') {
            column.settingContent = function (h) {
                return _self.$slots.default
            }
        }

        column.renderCell = function (h, data) {
            if (_self.$scopedSlots.default) {
                renderCell = () => _self.$scopedSlots.default(data)
            }

            if (!renderCell) {
                renderCell = DEFAULT_RENDER_CELL
            }
            if (_self.showOverflowTooltip) {
                const config = typeof _self.showOverflowTooltip === 'object' ? _self.showOverflowTooltip : {}
                return <div class="cell" v-bk-overflow-tips={ config }>{ renderCell(h, data) }</div>
            }
            return <div class="cell">{ renderCell(h, data) }</div>
        }
    },

    destroyed () {
        if (!this.$parent) return
        const parent = this.$parent
        this.owner.store.commit('removeColumn', this.columnConfig, this.isSubColumn ? parent.columnConfig : null)
    },

    watch: {
        label (newVal) {
            if (this.columnConfig) {
                this.columnConfig.label = newVal
            }
        },

        prop (newVal) {
            if (this.columnConfig) {
                this.columnConfig.property = newVal
            }
        },

        property (newVal) {
            if (this.columnConfig) {
                this.columnConfig.property = newVal
            }
        },

        filters (newVal) {
            if (this.columnConfig) {
                this.columnConfig.filters = newVal
            }
        },

        filterMultiple (newVal) {
            if (this.columnConfig) {
                this.columnConfig.filterMultiple = newVal
            }
        },

        align (newVal) {
            if (this.columnConfig) {
                this.columnConfig.align = newVal ? 'is-' + newVal : null

                if (!this.headerAlign) {
                    this.columnConfig.headerAlign = newVal ? 'is-' + newVal : null
                }
            }
        },

        headerAlign (newVal) {
            if (this.columnConfig) {
                this.columnConfig.headerAlign = 'is-' + (newVal || this.align)
            }
        },

        width (newVal) {
            if (this.columnConfig) {
                this.columnConfig.width = parseWidth(newVal)
                this.owner.store.scheduleLayout()
            }
        },

        minWidth (newVal) {
            if (this.columnConfig) {
                this.columnConfig.minWidth = parseMinWidth(newVal)
                this.owner.store.scheduleLayout()
            }
        },

        fixed (newVal) {
            if (this.columnConfig) {
                this.columnConfig.fixed = newVal
                this.owner.store.scheduleLayout(true)
            }
        },

        sortable (newVal) {
            if (this.columnConfig) {
                this.columnConfig.sortable = newVal
            }
        },

        index (newVal) {
            if (this.columnConfig) {
                this.columnConfig.index = newVal
            }
        },

        formatter (newVal) {
            if (this.columnConfig) {
                this.columnConfig.formatter = newVal
            }
        },

        className (newVal) {
            if (this.columnConfig) {
                this.columnConfig.className = newVal
            }
        },

        labelClassName (newVal) {
            if (this.columnConfig) {
                this.columnConfig.labelClassName = newVal
            }
        }
    },

    mounted () {
        const owner = this.owner
        const parent = this.columnOrTableParent
        let columnIndex

        if (!this.isSubColumn) {
            columnIndex = [].indexOf.call(parent.$refs.hiddenColumns.children, this.$el)
        } else {
            columnIndex = [].indexOf.call(parent.$el.children, this.$el)
        }
        owner.store.commit(
            'insertColumn',
            this.columnConfig,
            columnIndex,
            this.isSubColumn ? parent.columnConfig : null
        )
    }
}
