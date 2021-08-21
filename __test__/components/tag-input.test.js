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
 * @file tag-input 组件单测
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import TagInput from '@/components/tag-input'
import { mountComponent } from '../helpers'

describe('TagInput', () => {
    it('render the correct tags', () => {
        const wrapper = mountComponent(TagInput, {
            propsData: {
                value: ['shenzhen'],
                list: [
                    { id: 'shenzhen', name: '深圳' },
                    { id: 'guangzhou', name: '广州' }
                ]
            }
        })
        expect(wrapper.find('.bk-tag-input .tag').html()).toContain('深圳')
    })

    it('render the correct saveKey', () => {
        const wrapper = mountComponent(TagInput, {
            propsData: {
                value: ['guangzhou'],
                saveKey: 'code',
                list: [
                    { code: 'shenzhen', name: '深圳' },
                    { code: 'guangzhou', name: '广州' }
                ]
            }
        })
        expect(wrapper.find('.bk-tag-input .tag').html()).toContain('广州')
    })

    it('render the correct displayKey', () => {
        const wrapper = mountComponent(TagInput, {
            propsData: {
                value: ['guangzhou'],
                displayKey: 'id',
                list: [
                    { id: 'shenzhen', name: '深圳' },
                    { id: 'guangzhou', name: '广州' }
                ]
            }
        })
        expect(wrapper.find('.bk-tag-input .tag .text').html()).toContain('guangzhou')
    })

    it('render the correct searchKey', async () => {
        const wrapper = mountComponent(TagInput, {
            propsData: {
                value: ['shenzhen'],
                searchKey: 'cityName',
                displayKey: 'cityName',
                list: [
                    { id: 'shenzhen', cityName: '深圳' },
                    { id: 'guangzhou', cityName: '广州' },
                    { id: 'beijing', cityName: '北京' },
                    { id: 'shanghai', cityName: '上海' },
                    { id: 'hangzhou', cityName: '杭州' },
                    { id: 'nanjing', cityName: '南京' },
                    { id: 'chognqing', cityName: '重庆' },
                    { id: 'taibei', cityName: '台北' },
                    { id: 'haikou', cityName: '海口' }
                ]
            }
        })
        const vm = wrapper.vm
        vm.handleInput({
            target: {
                value: '州'
            }
        })
        await vm.$nextTick()
        expect(wrapper.vm.renderList.length).toBe(2)
    })

    it('render the correct maxResult', async () => {
        const wrapper = mountComponent(TagInput, {
            propsData: {
                value: ['shenzhen'],
                searchKey: 'cityName',
                displayKey: 'cityName',
                maxResult: 1,
                list: [
                    { id: 'shenzhen', cityName: '深圳' },
                    { id: 'guangzhou', cityName: '广州' },
                    { id: 'beijing', cityName: '北京' },
                    { id: 'shanghai', cityName: '上海' },
                    { id: 'hangzhou', cityName: '杭州' },
                    { id: 'nanjing', cityName: '南京' },
                    { id: 'chognqing', cityName: '重庆' },
                    { id: 'taibei', cityName: '台北' },
                    { id: 'haikou', cityName: '海口' }
                ]
            }
        })
        const vm = wrapper.vm
        vm.handleInput({
            target: {
                value: '州'
            }
        })
        await vm.$nextTick()
        expect(wrapper.vm.renderList.length).toBe(1)
    })

    it('render the correct hasDeleteIcon', () => {
        const wrapper = mountComponent(TagInput, {
            propsData: {
                value: ['guangzhou'],
                hasDeleteIcon: true,
                list: [
                    { id: 'shenzhen', name: '深圳' },
                    { id: 'guangzhou', name: '广州' }
                ]
            }
        })
        expect(wrapper.find('.remove-key').exists()).toBe(true)
    })

    it('render the correct tagTpl (自定义标签展示效果)', () => {
        const wrapper = mountComponent(TagInput, {
            propsData: {
                value: ['guangzhou'],
                list: [
                    { id: 'shenzhen', name: '深圳' },
                    { id: 'guangzhou', name: '广州' }
                ],
                tagTpl (node, context, h) {
                    return h('div', {
                        class: 'tag-special'
                    }, node.name)
                }
            }
        })
        expect(wrapper.find('.tag-special').html()).toBe('<div class=\"tag-special\">广州</div>')
    })

    it('render the correct placeholder', () => {
        const wrapper = mountComponent(TagInput, {
            propsData: {
                placeholder: '请输入城市',
                tags: [],
                list: [
                    { id: 'shenzhen', name: '深圳' },
                    { id: 'guangzhou', name: '广州' }
                ]
            }
        })
        expect(wrapper.find('.placeholder').exists()).toBe(true)
        expect(wrapper.find('.placeholder').text()).toBe('请输入城市')
    })

    it('render the correct disabled', () => {
        const wrapper = mountComponent(TagInput, {
            propsData: {
                disabled: true,
                tags: [],
                list: []
            }
        })
        expect(wrapper.find('.bk-tag-input.disabled').exists()).toBe(true)
    })
})
