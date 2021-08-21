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
 * @file layout-observer
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

export default {
    created () {
        this.tableLayout.addObserver(this)
    },

    destroyed () {
        this.tableLayout.removeObserver(this)
    },

    computed: {
        tableLayout () {
            let layout = this.layout
            if (!layout && this.table) {
                layout = this.table.layout
            }
            if (!layout) {
                throw new Error('Can not find table layout.')
            }
            return layout
        }
    },

    mounted () {
        this.onColumnsChange(this.tableLayout)
        this.onScrollableChange(this.tableLayout)
    },

    updated () {
        if (this.__updated__) {
            return
        }
        this.onColumnsChange(this.tableLayout)
        this.onScrollableChange(this.tableLayout)
        this.__updated__ = true
    },

    methods: {
        onColumnsChange () {
            const cols = this.$el.querySelectorAll('colgroup > col')
            if (!cols.length) {
                return
            }
            const flattenColumns = this.tableLayout.getFlattenColumns()
            const columnsMap = {}
            flattenColumns.forEach((column) => {
                columnsMap[column.id] = column
            })
            for (let i = 0, j = cols.length; i < j; i++) {
                const col = cols[i]
                const name = col.getAttribute('name')
                const column = columnsMap[name]
                if (column) {
                    col.setAttribute('width', column.realWidth || column.width)
                }
            }
        },

        onScrollableChange (layout) {
            const cols = this.$el.querySelectorAll('colgroup > col[name=gutter]')
            for (let i = 0, j = cols.length; i < j; i++) {
                const col = cols[i]
                col.setAttribute('width', layout.scrollY ? layout.gutterWidth : '0')
            }
            const ths = this.$el.querySelectorAll('th.gutter')
            for (let i = 0, j = ths.length; i < j; i++) {
                const th = ths[i]
                th.style.width = layout.scrollY ? layout.gutterWidth + 'px' : '0'
                th.style.display = layout.scrollY ? '' : 'none'
            }
        }
    }
}
