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
 * @file progress 组件单测
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import Progress from '@/components/progress'
import { mountComponent } from '../helpers'

describe('Progress', () => {
    it('progress primary theme', () => {
        const wrapper = mountComponent(Progress, {
            propsData: {
                theme: 'primary'
            }
        })
        const targetContent = wrapper.find('div.progress-inner.bk-primary')
        expect(targetContent.exists()).toBe(true)
    })

    it('render the correct percent width and backgroundColor', () => {
        const wrapper = mountComponent(Progress, {
            propsData: {
                percent: 0.5,
                color: '#6FC77E'
            }
        })
        const progressInnerEle = wrapper.find('div.progress-inner.bk-primary').element
        expect(progressInnerEle.style.width).toBe('50%')
        expect(progressInnerEle.style.backgroundColor).toBe('rgb(45, 203, 86)')
    })

    it('progress normal size', () => {
        const wrapper = mountComponent(Progress, {
            propsData: {
                size: 'normal'
            }
        })
        const targetContent = wrapper.find('div.progress-bar.bk-progress-normal')
        expect(targetContent.exists()).toBe(true)
    })

    it('render the correct height', () => {
        const wrapper = mountComponent(Progress, {
            propsData: {
                strokeWidth: 20
            }
        })
        const progressInnerEle = wrapper.find('div.progress-bar.bk-progress-normal').element
        expect(progressInnerEle.style.height).toBe('20px')
    })

    it('has text inside', () => {
        const wrapper = mountComponent(Progress, {
            propsData: {
                textInside: true
            }
        })
        const sourceContent = wrapper.find('div.progress-inner.bk-primary')
        expect(sourceContent.exists()).toBe(true)
        expect(sourceContent.contains('div')).toBe(true)
    })

    it('has show text', () => {
        const wrapper = mountComponent(Progress, {
            propsData: {
                showText: true
            }
        })
        expect(wrapper.contains('div.bk-progress')).toBe(true)
        expect(wrapper.contains('div.progress-text')).toBe(true)
    })

    it('render the correct titleStyle', () => {
        const wrapper = mountComponent(Progress, {
            propsData: {
                titleStyle: {
                    fontSize: '16px',
                    verticalAlign: `middle`
                }
            }
        })
        const progressInnerEle = wrapper.find('div.progress-text').element
        expect(progressInnerEle.style.fontSize).toBe('16px')
        expect(progressInnerEle.style.verticalAlign).toBe('middle')
    })

    it('has external class', () => {
        const wrapper = mountComponent(Progress, {
            propsData: {
                extCls: 'bk-progress-red'
            }
        })
        expect(wrapper.contains('div.bk-progress.bk-progress-red')).toBe(true)
    })
})
