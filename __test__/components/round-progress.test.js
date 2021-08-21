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
 * @file round-progress 组件单测
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import RoundProgress from '@/components/round-progress'
import { mountComponent } from '../helpers'

describe('RoundProgress', () => {
    it('render the correct circle', () => {
        const wrapper = mountComponent(RoundProgress, {
            propsData: {
                config: {
                    strokeWidth: 5,
                    bgColor: 'gray',
                    activeColor: 'green',
                    index: 1
                },
                percent: 0.3
            }
        })
        expect(wrapper.props().percent).toBe(0.3)
        expect(wrapper.props().config.strokeWidth).toBe(5)
        expect(wrapper.props().config.bgColor).toBe('gray')
        expect(wrapper.props().config.activeColor).toBe('green')
        expect(wrapper.props().config.index).toBe(1)
    })

    it('render the correct title', () => {
        const wrapper = mountComponent(RoundProgress, {
            propsData: {
                title: 'jest',
                titleStyle: {
                    fontSize: '16px'
                }
            }
        })
        expect(wrapper.contains('div.bk-round-progress')).toBe(true)
        expect(wrapper.contains('div.title')).toBe(true)
        const sourceContent = wrapper.find('div.title').element
        expect(sourceContent.style.fontSize).toBe('16px')
    })

    it('render the correct num', () => {
        const wrapper = mountComponent(RoundProgress, {
            propsData: {
                numShow: true,
                numStyle: {
                    fontSize: '16px'
                }
            }
        })
        expect(wrapper.contains('div.bk-round-progress')).toBe(true)
        expect(wrapper.contains('div.num')).toBe(true)
        const sourceContent = wrapper.find('div.num').element
        expect(sourceContent.style.fontSize).toBe('16px')
    })

    it('render the correct radius', () => {
        const wrapper = mountComponent(RoundProgress, {
            propsData: {
                radius: '100px'
            }
        })
        const sourceContent = wrapper.find('svg')
        expect(sourceContent.attributes('width')).toBe('100px')
    })

    it('has external class', () => {
        const wrapper = mountComponent(RoundProgress, {
            propsData: {
                extCls: 'bk-round-progress-red'
            }
        })
        expect(wrapper.contains('div.bk-round-progress.bk-round-progress-red')).toBe(true)
    })
})
