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
 * @file transfer 组件单测
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import Transfer from '@/components/transfer'
import { mountComponent } from '../helpers'

describe('Transfer', () => {
    it('left header slot is rendered', () => {
        const wrapper = mountComponent(Transfer, {
            propsData: {
                sourceList: [1, 5, 8, 10],
                targetList: [1, 5]
            },
            slots: {
                'left-header': 'left-header'
            }
        })
        expect(wrapper.html()).toContain('<div class="slot-content">left-header</div>')
    })
    it('right header slot is rendered', () => {
        const wrapper = mountComponent(Transfer, {
            propsData: {
                sourceList: [1, 5, 8, 10],
                targetList: [1, 5]
            },
            slots: {
                'right-header': 'right-header'
            }
        })
        expect(wrapper.html()).toContain('<div class="slot-content">right-header</div>')
    })
    it('left empty content slot is rendered', () => {
        const wrapper = mountComponent(Transfer, {
            slots: {
                'left-empty-content': '暂无选项'
            }
        })
        expect(wrapper.html()).toContain('<div>暂无选项</div>')
    })
    it('right empty content slot is rendered', () => {
        const wrapper = mountComponent(Transfer, {
            propsData: {
                sourceList: [1, 5, 8, 10],
                targetList: []
            },
            slots: {
                'right-empty-content': '未选择任何选项'
            }
        })
        expect(wrapper.html()).toContain('<div>未选择任何选项</div>')
    })
    it('render the correct title', () => {
        const wrapper = mountComponent(Transfer, {
            propsData: {
                title: ['left-title', 'right-title']
            }
        })
        expect(wrapper.props('title')).toEqual(['left-title', 'right-title'])
    })
    it('render the correct empty-content', () => {
        const wrapper = mountComponent(Transfer, {
            propsData: {
                emptyContent: ['left-content', 'right-content']
            }
        })
        expect(wrapper.props('emptyContent')).toEqual(['left-content', 'right-content'])
    })
    it('has display-key', () => {
        const wrapper = mountComponent(Transfer, {
            propsData: {
                displayKey: 'name'
            }
        })
        expect(wrapper.props('displayKey')).toEqual('name')
    })
    it('has setting-key', () => {
        const wrapper = mountComponent(Transfer, {
            propsData: {
                settingKey: 'id'
            }
        })
        expect(wrapper.props('settingKey')).toEqual('id')
    })
    it('has sort-key', () => {
        const wrapper = mountComponent(Transfer, {
            propsData: {
                sortKey: 'id'
            }
        })
        expect(wrapper.props('sortKey')).toEqual('id')
    })
    it('has sortable', () => {
        const wrapper = mountComponent(Transfer, {
            propsData: {
                sortable: true
            }
        })
        expect(wrapper.props('sortable')).toEqual(true)
    })
    it('has source-list', () => {
        const wrapper = mountComponent(Transfer, {
            propsData: {
                sourceList: [1, 5, 8, 10]
            }
        })
        const sourceContent = wrapper.find('.source-list .content')
        expect(sourceContent.exists()).toBe(true)
        expect(sourceContent.contains('li')).toBe(true)
    })
    it('has target-list', () => {
        const wrapper = mountComponent(Transfer, {
            propsData: {
                sourceList: [1, 5, 8, 10],
                targetList: [1, 5]
            }
        })
        const targetContent = wrapper.find('.target-list .content')
        expect(targetContent.exists()).toBe(true)
        expect(targetContent.contains('li')).toBe(true)
    })
    it('emit change event', () => {
        const wrapper = mountComponent(Transfer, {
            propsData: {
                sourceList: [1, 5, 8, 10]
            }
        })
        wrapper.vm.$emit('change', [1, 5, 8, 10], [], [])
        expect(wrapper.emitted().change).toBeTruthy()
        expect(wrapper.emitted().change[1]).toEqual([[1, 5, 8, 10], [], []])
    })
})
