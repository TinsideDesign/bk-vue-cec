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
 * @file input 组件单测
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import { mount } from '@vue/test-utils'
import Input from '@/components/input'
import { createTestComp } from '../helpers'

describe('Input', () => {
    it('render the correct type: text', async (done) => {
        const wrapper = mount(Input, {
            sync: false,
            propsData: {
                type: 'text',
                value: ''
            }
        })
        await expect(wrapper.find('input[type="text"]').exists()).toBe(true)
        done()
    })

    it('render the correct type: number', async (done) => {
        const wrapper = mount(Input, {
            sync: false,
            propsData: {
                type: 'number',
                value: ''
            }
        })
        await expect(wrapper.find('input[type="number"]').exists()).toBe(true)
        done()
    })

    it('render the correct type: textarea', async (done) => {
        const wrapper = mount(Input, {
            sync: false,
            propsData: {
                type: 'textarea',
                value: ''
            }
        })
        await expect(wrapper.find('textarea').exists()).toBe(true)
        done()
    })

    it('render the correct fontSize', async (done) => {
        const wrapper = mount(Input, {
            sync: false,
            propsData: {
                value: '',
                fontSize: 'large'
            }
        })
        await expect(wrapper.find('.large-font').exists()).toBe(true)
        done()
    })

    it('render the correct clearable', async (done) => {
        const wrapper = mount(Input, {
            sync: false,
            propsData: {
                value: 'test',
                clearable: true
            }
        })
        await expect(wrapper.find('.clear-icon').exists()).toBe(true)
        done()
    })

    it('render the correct leftIcon', async (done) => {
        const wrapper = mount(Input, {
            sync: false,
            propsData: {
                value: '',
                leftIcon: 'icon-search'
            }
        })
        await expect(wrapper.find('.control-icon.left-icon').contains('.icon-search')).toBe(true)
        done()
    })

    it('render the correct rightIcon', async (done) => {
        const wrapper = mount(Input, {
            sync: false,
            propsData: {
                value: '',
                rightIcon: 'icon-search'
            }
        })
        await expect(wrapper.find('.control-icon.right-icon').contains('.icon-search')).toBe(true)
        done()
    })

    it('render the correct placeholder', async (done) => {
        const wrapper = mount(Input, {
            sync: false,
            propsData: {
                value: '测试',
                placeholder: '请输入中文'
            }
        })
        await expect(wrapper.find('input[placeholder="请输入中文"]').exists()).toBe(true)
        done()
    })

    it('render the correct disabled', async (done) => {
        const wrapper = mount(Input, {
            sync: false,
            propsData: {
                value: '',
                disabled: true
            }
        })
        await expect(wrapper.find('[disabled]').exists()).toBe(true)
        done()
    })

    it('render the correct readonly', async (done) => {
        const wrapper = mount(Input, {
            sync: false,
            propsData: {
                value: '',
                readonly: true
            }
        })
        await expect(wrapper.find('[readonly]').exists()).toBe(true)
        done()
    })

    it('change input focus blur listener', async (done) => {
        const changeHandler = jest.fn()
        const inputHandler = jest.fn()
        const focusHandler = jest.fn()
        const blurHandler = jest.fn()
        const wrapper = mount(createTestComp(`
                <bk-input
                    v-model="value"
                    @change="handleChange"
                    @input="handleInput"
                    @focus="handleFocus"
                    @blur="handleBlur">
                </bk-input>
            `, {
            components: {
                bkInput: Input
            },
            data () {
                return {
                    value: 'test',
                    isChangeTrigger: false
                }
            },
            methods: {
                handleChange: changeHandler,
                handleInput: inputHandler,
                handleFocus: focusHandler,
                handleBlur: blurHandler
            }
        }), { sync: false })
        const vm = wrapper.vm
        await vm.$nextTick()
        const input = wrapper.find('input[type="text"]')
        input.trigger('input', {
            key: 'a'
        })
        input.element.focus()
        await vm.$nextTick()
        expect(changeHandler).toHaveBeenCalledTimes(1)
        expect(inputHandler).toHaveBeenCalledTimes(1)
        expect(focusHandler).toHaveBeenCalledTimes(1)
        input.element.blur()
        expect(blurHandler).toHaveBeenCalledTimes(1)
        done()
    })
})
