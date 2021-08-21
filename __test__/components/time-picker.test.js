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
 * @file time-picker 组件单测
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import TimePicker from '@/components/time-picker'
import { mountComponent } from '../helpers'

describe('TimePicker', () => {
    it('render the correct markup and content', () => {
        const wrapper = mountComponent(TimePicker, {
            propsData: {
                value: '',
                placeholder: '请选择时间'
            }
        })

        expect(wrapper.vm.placement).toEqual('bottom-start')
        expect(wrapper.vm.value).toEqual('')
        expect(wrapper.vm.placeholder).toEqual('请选择时间')

        wrapper.setProps({
            placement: 'top-start',
            type: 'timerange',
            value: '00:00:00 - 10:00:00'
        })

        expect(wrapper.vm.type).toEqual('timerange')
        expect(wrapper.vm.placement).toEqual('top-start')
        expect(wrapper.vm.value).toEqual('00:00:00 - 10:00:00')
    })

    it('format props is correct', () => {
        const parentWrapper = mountComponent({
            data () {
                return {
                    value: '10:00:00',
                    placeholder: '请选择时间',
                    format: 'HH时mm分'
                }
            },
            components: { 'bk-time-picker': TimePicker },
            template: `
                <div>
                    <bk-time-picker v-model="value" :format="'HH时mm分'"></bk-time-picker>
                </div>
            `
        })

        expect(parentWrapper.vm.value).toEqual('10时00分')
    })
})
