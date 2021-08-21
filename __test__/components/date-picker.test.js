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
 * @file date-picker 组件单测
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import DatePicker from '@/components/date-picker'
import Button from '@/components/button'
import { mountComponent } from '../helpers'

describe('DatePicker', () => {
    it('render the correct markup and content', () => {
        const wrapper = mountComponent(DatePicker, {
            propsData: {
                value: '',
                placeholder: '请选择日期'
            }
        })

        expect(wrapper.vm.type).toEqual('date')
        expect(wrapper.vm.placement).toEqual('bottom-start')
        expect(wrapper.vm.value).toEqual('')
        expect(wrapper.vm.placeholder).toEqual('请选择日期')

        wrapper.setProps({
            placement: 'top-start',
            type: 'datetime',
            value: '2019-10-01 10:00:00'
        })

        expect(wrapper.vm.type).toEqual('datetime')
        expect(wrapper.vm.placement).toEqual('top-start')
        expect(wrapper.vm.value).toEqual('2019-10-01 10:00:00')
    })

    it('shortcuts props is correct', () => {
        const wrapper = mountComponent(DatePicker, {
            propsData: {
                value: '',
                placeholder: '请选择日期',
                shortcuts: [
                    {
                        text: '今天',
                        value () {
                            return new Date()
                        },
                        onClick: picker => {
                            console.error(picker)
                        }
                    },
                    {
                        text: '7天前',
                        value () {
                            const date = new Date()
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                            return date
                        },
                        onClick: picker => {
                            console.error(picker)
                        }
                    }
                ]
            }
        })

        expect(wrapper.findAll('.bk-picker-panel-shortcut').at(0).text()).toBe('今天')
        expect(wrapper.findAll('.bk-picker-panel-shortcut').at(1).text()).toBe('7天前')
    })

    it('open props is correct', async () => {
        const parentWrapper = mountComponent({
            data () {
                return {
                    open: false,
                    type: 'datetime',
                    value: '2019-10-01 10:00:00',
                    placeholder: '请选择日期',
                    shortcuts: [
                        {
                            text: '今天',
                            value () {
                                return new Date()
                            },
                            onClick: picker => {
                                // console.error(picker)
                            }
                        },
                        {
                            text: '7天前',
                            value () {
                                const date = new Date()
                                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                                return date
                            },
                            onClick: picker => {
                                // console.error(picker)
                            }
                        }
                    ]
                }
            },
            components: { 'bk-button': Button, 'bk-date-picker': DatePicker },
            template: `
                <div>
                    <bk-button theme="primary" @click="open = !open">primary</bk-button>
                    <bk-date-picker ref="bkDatePicker" :shortcuts="shortcuts" :open="open" :shortcut-close="true"></bk-date-picker>
                </div>
            `
        })

        expect(parentWrapper.find('.bk-date-picker-dropdown').isVisible()).toBeFalsy()
        parentWrapper.find('button').trigger('click')
        expect(parentWrapper.find('.bk-date-picker-dropdown').isVisible()).toBeTruthy()
    })
})
