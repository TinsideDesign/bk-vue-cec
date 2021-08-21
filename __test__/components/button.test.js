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
 * @file button 组件单测
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import Button from '@/components/button'
import { mountComponent } from '../helpers'

describe('Button', () => {
    it('render the correct markup', () => {
        const wrapper = mountComponent(Button, {
            slots: {
                default: 'jest'
            }
        })
        expect(wrapper.html()).toContain('<span>jest</span>')
        expect(wrapper.text()).toBe('jest')
        expect(wrapper.vm.showSlot).toBe(true)
    })
    it('render the without slot', () => {
        const wrapper = mountComponent(Button)

        expect(wrapper.vm.showSlot).toBe(false)
        expect(wrapper.text()).toBe('')
        expect(wrapper.classes()).toContain('no-slot')
    })

    it('render the correct title', () => {
        const wrapper = mountComponent(Button, {
            propsData: {
                title: 'jest'
            }
        })
        expect(wrapper.attributes('title')).toBe('jest')
    })

    it('has disabled', () => {
        const wrapper = mountComponent(Button, {
            propsData: {
                disabled: true
            }
        })
        expect(wrapper.contains('button:disabled')).toBe(true)
    })
    it('has disabled', () => {
        const wrapper = mountComponent(Button, {
            propsData: {
                disabled: true
            }
        })
        expect(wrapper.contains('button.is-disabled:disabled')).toBe(true)
    })
    it('button primary theme', () => {
        const wrapper = mountComponent(Button, {
            propsData: {
                theme: 'primary'
            }
        })
        expect(wrapper.classes()).toContain('bk-primary')
    })

    it('button hover success theme', () => {
        const wrapper = mountComponent(Button, {
            propsData: {
                hoverTheme: 'success'
            }
        })
        expect(wrapper.classes()).toContain('bk-button-hover')
        expect(wrapper.classes()).toContain('bk-success')
    })

    it('button size', () => {
        const wrapper = mountComponent(Button, {
            propsData: {
                size: 'large'
            }
        })
        expect(wrapper.contains('button.bk-button-large')).toBe(true)
    })

    it('button text buttn', () => {
        const wrapper = mountComponent(Button, {
            propsData: {
                text: true
            }
        })
        expect(wrapper.contains('button.bk-button-text.bk-primary')).toBe(true)
    })

    it('outline button', () => {
        const wrapper = mountComponent(Button, {
            propsData: {
                outline: true
            }
        })
        expect(wrapper.contains('button.is-outline')).toBe(true)
    })

    it('has loading', () => {
        const wrapper = mountComponent(Button, {
            propsData: {
                loading: true
            }
        })
        expect(wrapper.contains('button.is-loading')).toBe(true)
        expect(wrapper.contains('div.bk-button-loading')).toBe(true)
        expect(wrapper.contains('div.bk-loading-wrapper')).toBe(true)
    })
    it('has left icon about plus', () => {
        const wrapper = mountComponent(Button, {
            propsData: {
                icon: 'plus'
            }
        })
        expect(wrapper.contains('i.bk-icon.left-icon.icon-plus')).toBe(true)
    })
    it('has left icon about loading', () => {
        const wrapper = mountComponent(Button, {
            propsData: {
                icon: 'loading'
            }
        })
        const loading = wrapper.find('i.bk-icon.left-icon.icon-loading.bk-button-icon-loading')
        expect(loading.exists()).toBe(true)
        expect(loading.contains('.loading')).toBe(true)
    })

    it('has right icon about minus', () => {
        const wrapper = mountComponent(Button, {
            propsData: {
                iconRight: 'minus'
            }
        })
        expect(wrapper.contains('i.bk-icon.right-icon.icon-minus')).toBe(true)
    })
    it('has right icon about loading', () => {
        const wrapper = mountComponent(Button, {
            propsData: {
                iconRight: 'loading'
            }
        })
        const loading = wrapper.find('i.bk-icon.right-icon.icon-loading.bk-button-icon-loading')
        expect(loading.exists()).toBe(true)
        expect(loading.contains('.loading')).toBe(true)
    })

    it('click listener', () => {
        const handler = jest.fn()
        const wrapper = mountComponent(Button, {
            listeners: {
                click: handler
            }
        })
        wrapper.trigger('click')
        wrapper.trigger('click')
        expect(handler).toHaveBeenCalledTimes(2)
    })

    it('click listener with disabled', () => {
        const handler = jest.fn()
        const wrapper = mountComponent(Button, {
            propsData: {
                disabled: true
            },
            listeners: {
                click: handler
            }
        })
        wrapper.trigger('click')
        expect(handler).not.toBeCalled()
    })

    it('click listener with loading', () => {
        const handler = jest.fn()
        const wrapper = mountComponent(Button, {
            propsData: {
                loading: true
            },
            listeners: {
                click: handler
            }
        })
        wrapper.trigger('click')
        expect(handler).not.toBeCalled()
    })
})
