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
 * @file table 组件单测
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import bkTable from '@/components/table'
import bkTableColumn from '@/components/table-column'
import { mount } from '@vue/test-utils'

describe('Table basic use unit test', () => {
    const wrapper = mount({
        components: {
            bkTable,
            bkTableColumn
        },
        template: `
            <div>
                <bk-table style="width: 500px;" :data="data">
                    <bk-table-column prop="id" label="ID"></bk-table-column>
                    <bk-table-column prop="name" label="NAME">
                        <template slot-scope="{ row }">{{row.name + row.id}}</template>
                    </bk-table-column>
                </bk-table>
            </div>
        `,
        data () {
            return {
                data: [{
                    id: 'a',
                    name: 'A'
                }, {
                    id: 'b',
                    name: 'B'
                }]
            }
        }
    })

    it('render the correct markup and content', () => {
        const rows = wrapper.vm.$el.querySelectorAll('.bk-table-body-wrapper tr')
        expect(rows.length).toBe(2)

        const customCell = rows[0].querySelector('td:nth-child(2)')
        expect(customCell.innerHTML).toContain('<div class="cell">Aa</div>')

        expect(wrapper.find('.bk-table-body-wrapper').exists()).toBe(true)
        expect(wrapper.find('.bk-table-pagination-wrapper').exists()).toBe(false)
    })

    it('emit the correct events', () => {
        const table = wrapper.find('.bk-table')
        const column = wrapper.vm.$el.querySelectorAll('.bk-table-body-wrapper td')[0]
        column.click()
        expect(table.emittedByOrder().map(e => e.name)).toEqual(['current-change', 'cell-click', 'row-click'])

        const headerColumn = wrapper.vm.$el.querySelectorAll('.bk-table-header-wrapper th')[0]
        headerColumn.click()
        expect(table.emitted()['header-click']).toBeTruthy()
    })
})

describe('Table with selection unit test', () => {
    const wrapper = mount({
        components: {
            bkTable,
            bkTableColumn
        },
        template: `
            <div>
                <bk-table style="width: 500px;" :data="data" @selection-change="handleSelectionChange">
                    <bk-table-column type="selection"></bk-table-column>
                    <bk-table-column prop="id" label="ID"></bk-table-column>
                    <bk-table-column prop="name" label="NAME"></bk-table-column>
                </bk-table>
            </div>
        `,
        data () {
            return {
                data: [{
                    id: 'a',
                    name: 'A'
                }, {
                    id: 'b',
                    name: 'B'
                }],
                selection: []
            }
        },
        methods: {
            handleSelectionChange (selection) {
                this.selection = selection
            }
        }
    })

    it('emit the correct events', () => {
        const headerCheckbox = wrapper.find('.bk-table-header .bk-form-checkbox')
        headerCheckbox.trigger('click')
        setTimeout(() => {
            expect(wrapper.find('.bk-table').emitted()['selection-change']).toBeTruthy()
            expect(wrapper.vm.selection.map(row => row.id)).toEqual(['a', 'b'])
        }, 100)
    })
})
