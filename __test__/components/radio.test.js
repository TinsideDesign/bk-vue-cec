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
 * @file radio 组件单测
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import Radio from '@/components/radio'
import RadioButton from '@/components/radio-button'
import RadioGroup from '@/components/radio-group'
import { mount } from '@vue/test-utils'
import { mountComponent, createTestComp } from '../helpers'

describe('radio && radio-button && radio-group', () => {
    /* -------------------- radio -------------------- */
    it('render the correct test', () => {
        const wrapper = mountComponent(Radio, {
            slots: {
                default: 'jest'
            },
            propsData: {
                name: 'radio-test'
            }
        })
        expect(wrapper.contains('.bk-form-radio')).toBe(true)
        expect(wrapper.find('.bk-radio-text').text()).toBe('jest')
        expect(wrapper.find('input').attributes('name')).toBe('radio-test')
        expect(wrapper.html()).toContain('<div class="bk-radio-text">jest</div>')
    })

    it('render radio with disabled prop', () => {
        const wrapper = mountComponent(Radio, {
            slots: {
                default: 'jest'
            },
            propsData: {
                disabled: true
            }
        })

        expect(wrapper.find('input').attributes('disabled')).toBe('disabled')
    })

    it('radio render with deault checked', () => {
        const wrapper = mountComponent(Radio, {
            slots: {
                default: 'jest'
            },
            propsData: {
                checked: true
            }
        })
        expect(wrapper.find('input').classes('is-checked')).toBe(true)
    })

    it('radio callback test', () => {
        const handler = jest.fn()
        const wrapper = mountComponent(Radio, {
            slots: {
                default: 'jest'
            },
            listeners: {
                change: handler
            }
        })
        wrapper.trigger('click')
        expect(handler).toBeCalled()
    })

    it('radio callback with disabled test', () => {
        const handler = jest.fn()
        const wrapper = mountComponent(Radio, {
            slots: {
                default: 'jest'
            },
            propsData: {
                disabled: true
            },
            listeners: {
                change: handler
            }
        })
        wrapper.trigger('click')
        expect(handler).not.toBeCalled()
    })

    /* -------------------- radio-group -------------------- */
    it('render radio-group test', () => {
        const wrapper = mount(createTestComp(`
            <bk-radio-group name="radio-group"
                v-model="choose">
                <bk-radio :value="'wx'">
                    微信
                </bk-radio>
                <bk-radio :value="'qq'">
                    QQ
                </bk-radio>
            </bk-radio-group>`, {
            components: {
                bkRadioGroup: RadioGroup,
                bkRadio: Radio
            },
            data () {
                return {
                    choose: ''
                }
            }
        }))
        expect(wrapper.classes('bk-form-control')).toBe(true)
        expect(wrapper.attributes('name')).toBe('radio-group')
        expect(wrapper.contains('.bk-form-radio')).toBe(true)
        expect(wrapper.findAll('.bk-radio-text').at(0).text()).toBe('微信')
        expect(wrapper.findAll('.bk-radio-text').at(1).text()).toBe('QQ')
    })

    it('radio-group selected and change listener', () => {
        const handleChange = jest.fn()
        const wrapper = mount(createTestComp(`
            <bk-radio-group name="radio-group"
                v-model="choose"
                @change="handleChange">
                <bk-radio :value="'wx'">
                    微信
                </bk-radio>
                <bk-radio :value="'qq'">
                    QQ
                </bk-radio>
            </bk-radio-group>`, {
            components: {
                bkRadioGroup: RadioGroup,
                bkRadio: Radio
            },
            data () {
                return {
                    choose: 'qq'
                }
            },
            methods: {
                handleChange: handleChange
            }
        }))
        const radioQQ = wrapper.find('.bk-form-radio')
        const radioWX = wrapper.findAll('.bk-form-radio').at(1)

        expect(radioWX.find('input').classes('is-checked')).toBe(true)
        expect(radioQQ.find('input').classes('is-checked')).toBe(false)

        radioQQ.trigger('click')

        wrapper.vm.$nextTick(() => {
            expect(handleChange).toHaveBeenCalledTimes(1)
            expect(radioQQ.find('input').classes('is-checked')).toBe(true)
        })
    })

    /* -------------------- radio-button -------------------- */
    it('render button-radio test', () => {
        const wrapper = mountComponent(RadioButton, {
            slots: {
                default: 'jest'
            },
            propsData: {
                name: 'radio-button-test'
            }
        })
        expect(wrapper.find('.bk-radio-button-text').text()).toBe('jest')
        expect(wrapper.find('label').classes('bk-form-radio-button')).toBe(true)
        expect(wrapper.find('input').attributes('name')).toBe('radio-button-test')
        expect(wrapper.html()).toContain('<div class="bk-radio-button-text">jest</div>')
    })

    it('render radio-button with disabled prop', () => {
        const wrapper = mountComponent(RadioButton, {
            slots: {
                default: 'jest'
            },
            propsData: {
                disabled: true
            }
        })
        expect(wrapper.find('label').classes()).toContain('disabled')
    })

    it('radio-button callback test', () => {
        const handler = jest.fn()
        const wrapper = mountComponent(RadioButton, {
            slots: {
                default: 'jest'
            },
            listeners: {
                change: handler
            }
        })
        wrapper.trigger('click')
        expect(handler).toBeCalled()
    })

    it('radio-button callback with disabled test', () => {
        const handler = jest.fn()
        const wrapper = mountComponent(RadioButton, {
            slots: {
                default: 'jest'
            },
            propsData: {
                disabled: true
            },
            listeners: {
                change: handler
            }
        })
        wrapper.trigger('click')
        expect(handler).not.toBeCalled()
    })

    it('radio-button in group selected and change listener', () => {
        const handleChange = jest.fn()
        const wrapper = mount(createTestComp(`
            <bk-radio-group name="radio-group"
                v-model="choose"
                @change="handleChange">
                <bk-radio-button :value="'wx'">
                    微信
                </bk-radio-button>
                <bk-radio-button :value="'qq'">
                    QQ
                </bk-radio-button>
            </bk-radio-group>`, {
            components: {
                bkRadioGroup: RadioGroup,
                bkRadioButton: RadioButton
            },
            data () {
                return {
                    choose: 'qq'
                }
            },
            methods: {
                handleChange: handleChange
            }
        }))
        const radioQQ = wrapper.find('.bk-form-radio-button')
        const radioWX = wrapper.findAll('.bk-form-radio-button').at(1)

        expect(radioWX.find('input').classes()).toContain('is-checked')
        expect(radioQQ.find('input').classes()).not.toContain('is-checked')

        radioQQ.trigger('click')

        wrapper.vm.$nextTick(() => {
            expect(handleChange).toHaveBeenCalledTimes(1)
            expect(radioQQ.find('input').classes()).toContain('is-checked')
        })
    })
})
