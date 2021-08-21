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
 * @file exception 组件单测
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import Exception from '@/components/exception'
import { mountComponent } from '../helpers'

describe('Exception', () => {
    it('render the correct default exception', () => {
        const wrapper = mountComponent(Exception, {
            slots: {
                default: '404'
            }
        })

        expect(wrapper.classes()).toContain('bk-exception')
        expect(wrapper.contains('img')).toBe(true)
        expect(wrapper.find('.exception-text').exists()).toBe(true)
    })

    it('render the correct 500 exception', () => {
        const wrapper = mountComponent(Exception, {
            propsData: {
                type: '500'
            }
        })

        expect(wrapper.props('type')).toBe('500')
        expect(wrapper.find('img').attributes().alt).toBe('500')
    })

    it('render the custom exception tips', () => {
        const wrapper = mountComponent(Exception, {
            propsData: {
                type: '403'
            },
            slots: {
                default: '您的权限不足!  <a href="javascript:;">申请权限</a>'
            }
        })
        const exceptionText = wrapper.find('.exception-text')

        expect(exceptionText.exists()).toBe(true)
        expect(exceptionText.contains('a')).toBe(true)
        expect(exceptionText.find('a').text()).toBe('申请权限')
    })
})
