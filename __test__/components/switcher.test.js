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
 * @file switcher 组件单测
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import Switcher from '@/components/switcher'
import { mount } from '@vue/test-utils'
import { mountComponent, createTestComp } from '../helpers'

describe('switcher unit test', () => {
    it('switcher render with deault checked', () => {
        const wrapper = mountComponent(Switcher, {
            propsData: {
                value: true
            }
        })
        expect(wrapper.contains('.is-checked')).toBe(true)
    })

    it('switcher render with deault disabled checked', () => {
        const wrapper = mountComponent(Switcher, {
            propsData: {
                value: true,
                disabled: true
            }
        })
        expect(wrapper.contains('.is-checked.is-disabled')).toBe(true)
    })

    it('switcher size test', () => {
        const wrapper1 = mountComponent(Switcher, {
            propsData: {
                size: 'min'
            }
        })
        const wrapper2 = mountComponent(Switcher, {
            propsData: {
                size: 'small'
            }
        })
        const wrapper3 = mountComponent(Switcher, {
            propsData: {
                size: 'normal'
            }
        })

        expect(wrapper1.contains('.bk-switcher-min')).toBe(true)
        expect(wrapper2.contains('.bk-switcher-small')).toBe(true)
        expect(wrapper3.contains('.bk-switcher-normal')).toBe(true)
    })

    it('switcher theme test', () => {
        const wrapper = mountComponent(Switcher, {
            propsData: {
                theme: 'primary'
            }
        })

        expect(wrapper.classes()).toContain('primary')
    })

    it('switcher ext-cls test', () => {
        const wrapper = mountComponent(Switcher, {
            propsData: {
                extCls: 'ext-cls-test'
            }
        })

        expect(wrapper.classes()).toContain('ext-cls-test')
    })

    it('switcher is-outline,is-square  test', () => {
        const wrapper = mountComponent(Switcher, {
            propsData: {
                isOutline: true,
                isSquare: true
            }
        })

        expect(wrapper.contains('.bk-switcher-outline.bk-switcher-square')).toBe(true)
    })

    it('switcher show-text  test', () => {
        const wrapper1 = mountComponent(Switcher, {
            propsData: {
                showText: false
            }
        })
        const wrapper2 = mountComponent(Switcher, {
            propsData: {
                showText: true
            }
        })

        const lable1 = wrapper1.find('.switcher-label')
        expect(lable1.attributes('style')).toBe('display: none;')
        const lable2 = wrapper2.find('.switcher-label')
        expect(lable2.attributes()).not.toContain('style')
    })

    it('switcher show-text  test', () => {
        const wrapper1 = mountComponent(Switcher, {
            propsData: {
                showText: false
            }
        })
        const wrapper2 = mountComponent(Switcher, {
            propsData: {
                showText: true
            }
        })

        const lable1 = wrapper1.find('.switcher-label')
        expect(lable1.attributes('style')).toBe('display: none;')
        const lable2 = wrapper2.find('.switcher-label')
        expect(lable2.attributes()).not.toContain('style')
    })

    it('switcher on-text,off-text  test', () => {
        const wrapper1 = mountComponent(Switcher)
        const wrapper2 = mountComponent(Switcher, {
            propsData: {
                onText: '开',
                offText: '关'
            }
        })

        const onText1 = wrapper1.find('.on-text')
        const offText1 = wrapper1.find('.off-text')
        const onText2 = wrapper2.find('.on-text')
        const offText2 = wrapper2.find('.off-text')

        expect(onText1.html()).toContain('ON')
        expect(offText1.html()).toContain('OFF')
        expect(onText2.html()).toContain('开')
        expect(offText2.html()).toContain('关')
    })

    it('switcher change input listener', async (done) => {
        const changeHandler = jest.fn()
        const inputHandler = jest.fn()
        const wrapper = mount(createTestComp(`
                <bk-switcher
                    v-model="value"
                    @change="handleChange"
                    @input="handleInput">
                </bk-switcher>
            `, {
            components: {
                bkSwitcher: Switcher
            },
            data () {
                return {
                    value: false
                }
            },
            methods: {
                handleChange: changeHandler,
                handleInput: inputHandler
            }
        }), { sync: false })
        const vm = wrapper.vm
        await vm.$nextTick()

        wrapper.trigger('click')
        await vm.$nextTick()
        expect(changeHandler).toHaveBeenCalledTimes(1)
        expect(inputHandler).toHaveBeenCalledTimes(1)
        expect(wrapper.find('input[type="checkbox"]').element.value).toBe('true')
        expect(wrapper.contains('.is-checked')).toBe(true)

        wrapper.trigger('click')
        await vm.$nextTick()
        expect(wrapper.find('input[type="checkbox"]').element.value).toBe('false')
        expect(wrapper.classes()).not.toContain('is-checked')

        done()
    })

    it('switcher disabled change input listener', async (done) => {
        const wrapper = mount(createTestComp(`
                <bk-switcher
                    v-model="value"
                    :disabled="disabled">
                </bk-switcher>
            `, {
            components: {
                bkSwitcher: Switcher
            },
            data () {
                return {
                    value: false,
                    disabled: true
                }
            }
        }), { sync: false })
        const vm = wrapper.vm
        await vm.$nextTick()

        wrapper.trigger('click')
        await vm.$nextTick()
        expect(wrapper.find('input[type="checkbox"]').element.value).toBe('false')
        expect(wrapper.contains('.is-disabled')).toBe(true)

        wrapper.trigger('click')
        await vm.$nextTick()
        expect(wrapper.find('input[type="checkbox"]').element.value).toBe('false')
        expect(wrapper.contains('.is-disabled')).toBe(true)

        done()
    })
})
