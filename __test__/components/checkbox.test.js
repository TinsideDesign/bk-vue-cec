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
 * @file checkbox 组件单测
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import Checkbox from '@/components/checkbox'
import CheckboxGroup from '@/components/checkbox-group'
import { mount } from '@vue/test-utils'
import { mountComponent, createTestComp } from '../helpers'

describe('checkbox && checkbox-group unit test', () => {
    /* -------------------- radio -------------------- */
    it('render the correct single checkbox', () => {
        const wrapper = mountComponent(Checkbox, {
            slots: {
                default: 'jest'
            },
            propsData: {
                name: 'checkbox'
            }
        })

        expect(wrapper.find('input').attributes('name')).toBe('checkbox')
        expect(wrapper.find('input').attributes('type')).toBe('hidden')
        expect(wrapper.find('.bk-checkbox-text').text()).toBe('jest')
        expect(wrapper.find('label').classes('bk-form-checkbox')).toBe(true)
    })

    it('render the correct checkbox with disabled', () => {
        const wrapper = mountComponent(Checkbox, {
            slots: {
                default: 'jest'
            },
            propsData: {
                name: 'checkbox',
                disabled: true
            }
        })

        expect(wrapper.find('.bk-form-checkbox').classes()).toContain('is-disabled')
    })

    it('render the correct checkbox with indaterminate', () => {
        const wrapper = mountComponent(Checkbox, {
            slots: {
                default: 'jest'
            },
            propsData: {
                name: 'checkbox',
                indeterminate: true
            }
        })

        expect(wrapper.find('.bk-form-checkbox').classes()).toContain('is-indeterminate')
    })

    it('checkbox with default checked test', () => {
        const wrapper = mountComponent(Checkbox, {
            slots: {
                default: 'jest'
            },
            propsData: {
                name: 'checkbox',
                checked: true
            }
        })

        expect(wrapper.find('.bk-form-checkbox').classes()).toContain('is-checked')
    })

    it('checkbox with true-value & false-value test', () => {
        const wrapper = mountComponent(Checkbox, {
            slots: {
                default: 'jest'
            },
            propsData: {
                name: 'checkbox',
                trueValue: 'yes',
                falseValue: 'no',
                checked: true
            }
        })
        expect(wrapper.find('.bk-form-checkbox').classes()).toContain('is-checked')
        expect(wrapper.find('input[name="checkbox"]').attributes('value')).toBe('yes')

        wrapper.trigger('click')
        wrapper.vm.$nextTick(() => {
            expect(wrapper.find('.bk-form-checkbox').classes()).not.toContain('is-checked')
            expect(wrapper.find('input[name="checkbox"]').attributes('value')).toBe('no')
        })
    })

    it('checkbox change event listener', () => {
        const changeHandler = jest.fn()
        const wrapper = mountComponent(Checkbox, {
            slots: {
                default: 'jest'
            },
            propsData: {
                name: 'checkbox'
            },
            listeners: {
                change: changeHandler
            }
        })

        wrapper.trigger('click')
        expect(changeHandler).toHaveBeenCalledTimes(1)
    })

    it('checkbox in group selected and chenge event listener', () => {
        const handleChange = jest.fn()
        const wrapper = mount(createTestComp(`
            <div>
                <bk-checkbox-group name="checkbox-group"
                    v-model="choose"
                    @change="handleChange">
                    <bk-checkbox :value="'wx'">
                        微信
                    </bk-checkbox>
                    <bk-checkbox :value="'qq'">
                        QQ
                    </bk-checkbox>
                </bk-checkbox-group>
            </div>`, {
            components: {
                bkCheckbox: Checkbox,
                bkCheckboxGroup: CheckboxGroup
            },
            data () {
                return {
                    choose: ['qq']
                }
            },
            methods: {
                handleChange: handleChange
            }
        }))
        const radioWX = wrapper.find('.bk-form-checkbox')
        const radioQQ = wrapper.findAll('.bk-form-checkbox').at(1)

        expect(radioWX.classes()).not.toContain('is-checked')
        expect(radioQQ.classes()).toContain('is-checked')

        radioWX.trigger('click')

        wrapper.vm.$nextTick(() => {
            expect(handleChange).toHaveBeenCalledTimes(1)
            expect(radioWX.classes()).toContain('is-checked')
            expect(radioQQ.classes()).toContain('is-checked')
        })
    })
})
