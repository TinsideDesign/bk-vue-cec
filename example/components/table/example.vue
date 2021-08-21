<!--
 * Tencent is pleased to support the open source community by making
 * 科技内在设计（T-inside） available.
 *
 * Copyright (C) 2021 TID Limited, a DAO.  All rights reserved.
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
    <bk-table ref="filterTable" :data="tableData" style="width: 100%"
        auto-scroll-to-top
        :max-height="400"
        :pagination="pagination"
        @page-change="handlePageChange"
        @page-limit-change="handlePageLimitChange">
        <bk-table-column type="expand" width="30" :before-expand-change="beforeExpand"></bk-table-column>
        <bk-table-column prop="date" label="日期" sortable width="180" column-key="date"
            :filters="dateFilters" :filter-method="filterHandler">
        </bk-table-column>
        <bk-table-column prop="name" label="姓名" width="180">
        </bk-table-column>
        <bk-table-column prop="address" label="地址" :formatter="formatter">
        </bk-table-column>
    </bk-table>
</template>
<script>
    import { bkTable, bkTableColumn } from '@'
    export default {
        components: {
            bkTable,
            bkTableColumn
        },
        data () {
            return {
                dateFilters: [
                    { text: '2016-05-01', value: '2016-05-01' },
                    { text: '2016-05-02', value: '2016-05-02' },
                    { text: '2016-05-03', value: '2016-05-03' },
                    { text: '2016-05-04', value: '2016-05-04' }
                ],
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    tag: '家'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄',
                    tag: '公司'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄',
                    tag: '家'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄',
                    tag: '公司'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄',
                    tag: '公司'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄',
                    tag: '公司'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄',
                    tag: '公司'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄',
                    tag: '公司'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄',
                    tag: '公司'
                }],
                pagination: {
                    current: 1,
                    count: 100,
                    limit: 10,
                    small: false
                }
            }
        },
        methods: {
            resetDateFilter () {
                this.$refs.filterTable.clearFilter('date')
            },
            clearFilter () {
                this.$refs.filterTable.clearFilter()
            },
            formatter (row, column) {
                return row.address
            },
            filterTag (value, row) {
                return row.tag === value
            },
            filterHandler (value, row, column) {
                const property = column['property']
                return row[property] === value
            },
            beforeExpand ({ row, $index }) {
                return !!$index
            },
            handlePageChange (page) {
                this.pagination.current = page
            },
            handlePageLimitChange (limit) {
                this.pagination.current = 1
                this.pagination.limit = limit
            }
        }
    }
</script>
