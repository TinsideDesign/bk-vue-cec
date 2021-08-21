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
 * @file pagination  组件单测
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import Pagination from '@/components/pagination'
import bkSelect from '@/components/select'
import bkOption from '@/components/option'
import paginationSelectionCount from '@/components/pagination/pagination-selection-count'
import paginationTotalCount from '@/components/pagination/pagination-total-count'
import { mountComponent } from '../helpers'

describe('Pagination ', () => {
    it('render the correct component', () => {
        const wrapper = mountComponent(Pagination, {
            propsData: {
                limit: 10,
                count: 100,
                current: 1,
                showSelectionCount: true,
                showTotalCount: true
            },
            components: { 'bk-select': bkSelect, 'bk-option': bkOption, 'pagination-selection-count': paginationSelectionCount, 'pagination-total-count': paginationTotalCount }
        })
        expect(wrapper.props('limit')).toEqual(10)
        expect(wrapper.props('count')).toEqual(100)
        expect(wrapper.props('current')).toEqual(1)
        expect(wrapper.props('showSelectionCount')).toEqual(true)
        expect(wrapper.props('showTotalCount')).toEqual(true)
        expect(wrapper.classes('bk-page')).toBe(true)
        expect(wrapper.classes('bk-page-align-left')).toBe(true)
        expect(wrapper.classes('bk-page-compact')).toBe(false)
        expect(wrapper.classes('bk-page-small')).toBe(false)
    })

    it('render the correct showLimit', () => {
        const wrapper = mountComponent(Pagination, {
            propsData: {
                limit: 10,
                count: 100,
                current: 1,
                showLimit: false
            },
            components: { 'bk-select': bkSelect, 'bk-option': bkOption }
        })
        const limitContent = wrapper.find('bk-page-count bk-page-count-right')
        expect(limitContent.exists()).toBe(false)
    })

    it('emit change event', () => {
        const wrapper = mountComponent(Pagination, {
            propsData: {
                limit: 10,
                count: 100,
                current: 1,
                showLimit: false
            },
            components: { 'bk-select': bkSelect, 'bk-option': bkOption }
        })
        wrapper.vm.$emit('change', 1)
        expect(wrapper.emitted().change).toBeTruthy()
        expect(wrapper.emitted().change[0]).toEqual([1])
    })

    it('emit limit-change event', () => {
        const wrapper = mountComponent(Pagination, {
            propsData: {
                limit: 10,
                count: 100,
                current: 1,
                showLimit: false
            },
            components: { 'bk-select': bkSelect, 'bk-option': bkOption }
        })
        wrapper.setProps({ limit: 20 })
        expect(wrapper.emitted()['limit-change']).toBeTruthy()
        expect(wrapper.vm.limit).toBe(20)
    })
})
