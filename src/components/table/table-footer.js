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
 * @file table-footer
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import LayoutObserver from './layout-observer'

export default {
    name: 'bk-table-footer',

    mixins: [LayoutObserver],

    render (h) {
        let sums = []
        if (this.summaryMethod) {
            sums = this.summaryMethod({ columns: this.columns, data: this.store.states.data })
        } else {
            this.columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = this.sumText
                    return
                }
                const values = this.store.states.data.map(item => Number(item[column.property]))
                const precisions = []
                let notNumber = true
                values.forEach(value => {
                    if (!isNaN(value)) {
                        notNumber = false
                        const decimal = ('' + value).split('.')[1]
                        precisions.push(decimal ? decimal.length : 0)
                    }
                })
                const precision = Math.max.apply(null, precisions)
                if (!notNumber) {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr)
                        if (!isNaN(value)) {
                            return parseFloat((prev + curr).toFixed(Math.min(precision, 20)))
                        } else {
                            return prev
                        }
                    }, 0)
                } else {
                    sums[index] = ''
                }
            })
        }

        return (
            <table
                class="bk-table-footer"
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
                <tbody class={ [{ 'has-gutter': this.hasGutter }] }>
                    <tr>
                        {
                            this._l(this.columns, (column, cellIndex) =>
                                <td
                                    colspan={ column.colSpan }
                                    rowspan={ column.rowSpan }
                                    class={ [column.id, column.headerAlign, column.className || '',
                                        this.isCellHidden(cellIndex, this.columns) ? 'is-hidden' : '',
                                        !column.children ? 'is-leaf' : '', column.labelClassName] }>
                                    <div class={ ['cell', column.labelClassName] }>
                                        {
                                            sums[cellIndex]
                                        }
                                    </div>
                                </td>
                            )
                        }
                        {
                            this.hasGutter ? <th class="gutter"></th> : ''
                        }
                    </tr>
                </tbody>
            </table>
        )
    },

    props: {
        fixed: String,
        store: {
            required: true
        },
        summaryMethod: Function,
        sumText: String,
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

        columns () {
            return this.store.states.columns
        },

        hasGutter () {
            return !this.fixed && this.tableLayout.gutterWidth
        }
    },

    methods: {
        isCellHidden (index, columns) {
            if (this.fixed === true || this.fixed === 'left') {
                return index >= this.leftFixedCount
            } else if (this.fixed === 'right') {
                let before = 0
                for (let i = 0; i < index; i++) {
                    before += columns[i].colSpan
                }
                return before < this.columnsCount - this.rightFixedCount
            } else {
                return (index < this.leftFixedCount) || (index >= this.columnsCount - this.rightFixedCount)
            }
        }
    }
}
