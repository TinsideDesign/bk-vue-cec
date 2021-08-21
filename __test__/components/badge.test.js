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
 * @file badge 组件单测
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

// 推荐这种方式引入组件，如果用 import { bkBadge } from '@' 这种方式引入组件也可以，但是会比较慢，
// `@` 表示的是 `src/index`，运行每个组件的单测的时候都会把所有组件的逻辑都加载一次
import Badge from '@/components/badge'
import { mountComponent } from '../helpers'

describe('Component', () => {
    it('render the correct markup', () => {
        const wrapper = mountComponent(Badge, {
            propsData: {
                theme: 'danger',
                val: 10
            }
        })

        expect(wrapper.find('.bk-badge.bk-danger').exists()).toBe(true)
        expect(wrapper.find('.bk-badge.bk-danger').text()).toBe('10')
    })

    it('max props is correct', () => {
        const wrapper = mountComponent(Badge, {
            propsData: {
                val: 10,
                max: 5
            }
        })
        expect(wrapper.find('.bk-badge').text()).toBe('5+')
    })

    it('dot props is correct', () => {
        const wrapper = mountComponent(Badge, {
            propsData: {
                val: 10,
                max: 5,
                dot: true
            }
        })

        expect(wrapper.find('.bk-badge.dot').exists()).toBe(true)
        expect(wrapper.find('.bk-badge.dot').text()).toBe('')
    })

    it('emit event is correct', () => {
        const wrapper = mountComponent(Badge, {
            propsData: {
                val: 10
            }
        })

        wrapper.find('.bk-badge').trigger('mouseenter')
        wrapper.find('.bk-badge').trigger('mouseleave')

        expect(wrapper.emittedByOrder().map(e => e.name)).toEqual(['hover', 'leave'])
    })
})
