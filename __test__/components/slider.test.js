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
 * @file slider 组件单测
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import Slider from '@/components/slider'
import { mountComponent } from '../helpers'

describe('Slider', () => {
    it('render the correct slide-bar', () => {
        const wrapper = mountComponent(Slider, {
            propsData: {
                value: 20
            }
        })
        const sliderContent = wrapper.find('.bk-slider')

        expect(sliderContent.exists()).toBe(true)
        expect(sliderContent.contains('.bk-slider-bar')).toBe(true)
        expect(sliderContent.contains('.bk-slider-button')).toBe(true)
    })

    it('render the correct percent width', () => {
        const wrapper = mountComponent(Slider, {
            propsData: {
                value: 80
            }
        })

        expect(wrapper.vm.barStyle.width).toBe('80%')
    })

    it('render the correct disable status', () => {
        const wrapper = mountComponent(Slider, {
            propsData: {
                disable: true
            }
        })
        const sliderBar = wrapper.find('.bk-slider-bar')
        expect(sliderBar.classes()).toContain('disable')
    })

    it('render the correct slider width min-value and max-value', () => {
        const wrapper = mountComponent(Slider, {
            propsData: {
                value: 50,
                minValue: 20,
                maxValue: 80
            }
        })
        const rangeValue = [wrapper.vm.minValue, wrapper.vm.maxValue]
        const barStyle = wrapper.vm.barStyle
        expect(barStyle.left).toBe('0%')
        expect(barStyle.width).toBe('50%')
        expect(rangeValue).toEqual([20, 80])
    })

    it('render the correct slider without tips', () => {
        const wrapper = mountComponent(Slider, {
            propsData: {
                showTip: false
            }
        })
        const slideBtnEle = wrapper.find('.slider-button').element

        expect(slideBtnEle._tippy).toBeUndefined()
    })
    it('render the correct slider without value an range', () => {
        const wrapper = mountComponent(Slider, {
            propsData: {
                value: [5, 20],
                range: true
            }
        })
        expect(wrapper.vm.barStyle.width).toBe('15%')
    })
})
