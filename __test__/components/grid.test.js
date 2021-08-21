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
 * @file grid 组件单测
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import Vue from 'vue'
import bkContainer from '@/components/container'
import bkRow from '@/components/row'
import bkCol from '@/components/col'
import { mount } from '@vue/test-utils'

Vue.component(bkContainer.name, bkContainer)
Vue.component(bkRow.name, bkRow)
Vue.component(bkCol.name, bkCol)

describe('Grid', () => {
    it('render init components with slots', () => {
        const wrapper = mount(bkContainer, {
            slots: {
                default: `<bk-row><bk-col><div class="content">1/24</div></bk-col></bk-row>`
            }
        })
        expect(wrapper.html()).toContain('<div class="bk-grid-container" style="padding-right: 20px; padding-left: 20px;"><div class="bk-grid-row" style="margin-right: -10px; margin-left: -10px;"><div class="bk-grid-col" style="width: 4.167%; padding-right: 10px; padding-left: 10px;"><div class="content">1/24</div></div></div></div>')
        expect(wrapper.text()).toBe('1/24')
    })

    it('render without slots', () => {
        const wrapper = mount(bkContainer)
        expect(wrapper.html()).toContain('<div class="bk-grid-container" style="padding-right: 20px; padding-left: 20px;"></div>')
        expect(wrapper.text()).toBe('')

        const wrapperSlotRow = mount(bkContainer, {
            slots: {
                default: `<bk-row></bk-row>`
            }
        })
        const rowElm = wrapperSlotRow.vm.$children[0].$el
        expect(rowElm.outerHTML).toContain('<div class="bk-grid-row" style="margin-right: -10px; margin-left: -10px;"></div>')
        expect(rowElm.textContent).toBe('')

        const wrapperSlotCol = mount(bkContainer, {
            slots: {
                default: '<bk-row><bk-col></bk-col></bk-row>'
            }
        })
        const colElm = wrapperSlotCol.vm.$children[0].$children[0].$el
        expect(colElm.outerHTML).toContain('<div class="bk-grid-col" style="width: 4.167%; padding-right: 10px; padding-left: 10px;"></div>')
        expect(colElm.textContent).toBe('')
    })

    it('set bk-container col', () => {
        const wrapper = mount(bkContainer, {
            propsData: {
                col: 12
            },
            slots: {
                default: `<bk-row><bk-col></bk-col></bk-row>`
            }
        })
        expect(wrapper.html()).toContain('<div class="bk-grid-container" style="padding-right: 20px; padding-left: 20px;"><div class="bk-grid-row" style="margin-right: -10px; margin-left: -10px;"><div class="bk-grid-col" style="width: 8.333%; padding-right: 10px; padding-left: 10px;"></div></div></div>')
        expect(wrapper.props('col')).toBe(12)
    })

    it('set bk-container gutter', () => {
        const wrapper = mount(bkContainer, {
            propsData: {
                gutter: 10
            },
            slots: {
                default: `<bk-row><bk-col></bk-col></bk-row>`
            }
        })
        expect(wrapper.html()).toContain('<div class="bk-grid-container" style="padding-right: 20px; padding-left: 20px;"><div class="bk-grid-row" style="margin-right: -5px; margin-left: -5px;"><div class="bk-grid-col" style="width: 4.167%; padding-right: 5px; padding-left: 5px;"></div></div></div>')
        expect(wrapper.props('gutter')).toBe(10)
    })

    it('set bk-container margin', () => {
        const wrapper = mount(bkContainer, {
            propsData: {
                margin: 10
            }
        })
        expect(wrapper.html()).toContain('<div class="bk-grid-container" style="padding-right: 10px; padding-left: 10px;"></div>')
        expect(wrapper.props('margin')).toBe(10)
    })

    it('set bk-container flex', () => {
        const wrapper = mount(bkContainer, {
            propsData: {
                flex: true
            },
            slots: {
                default: `<bk-row></bk-row>`
            }
        })
        expect(wrapper.html()).toContain('<div class="bk-grid-container" style="padding-right: 20px; padding-left: 20px;"><div class="bk-grid-row" style="display: flex; margin-right: -10px; margin-left: -10px;"></div></div>')
        expect(wrapper.props('flex')).toBe(true)
    })

    it('set bk-col span: 0', () => {
        const wrapper = mount(bkContainer, {
            slots: {
                default: `<bk-row><bk-col :span="0"></bk-col></bk-row>`
            }
        })
        const colElm = wrapper.vm.$children[0].$children[0].$el
        expect(colElm.outerHTML).toContain('<div class="bk-grid-col" style="width: 100%; padding-right: 10px; padding-left: 10px;"></div>')
        expect(colElm.style.width).toBe('100%')
    })

    it('set bk-col span: 12', () => {
        const wrapper = mount(bkContainer, {
            slots: {
                default: `<bk-row><bk-col :span="12"></bk-col></bk-row>`
            }
        })
        const colElm = wrapper.vm.$children[0].$children[0].$el
        expect(colElm.outerHTML).toContain('<div class="bk-grid-col" style="width: 50%; padding-right: 10px; padding-left: 10px;"></div>')
        expect(colElm.style.width).toBe('50%')
    })

    it('set bk-col offset', () => {
        const wrapper = mount(bkContainer, {
            slots: {
                default: `<bk-row><bk-col :offset="12"></bk-col></bk-row>`
            }
        })
        const colElm = wrapper.vm.$children[0].$children[0].$el
        expect(colElm.outerHTML).toContain('<div class="bk-grid-col" style="width: 4.167%; padding-right: 10px; padding-left: 10px; margin-left: 50%;"></div>')
        expect(colElm.style.marginLeft).toBe('50%')
    })

    it('set bk-col pull', () => {
        const wrapper = mount(bkContainer, {
            slots: {
                default: `<bk-row><bk-col :pull="12"></bk-col></bk-row>`
            }
        })
        const colElm = wrapper.vm.$children[0].$children[0].$el
        expect(colElm.outerHTML).toContain('<div class="bk-grid-col" style="width: 4.167%; padding-right: 10px; padding-left: 10px; right: 50%;"></div>')
        expect(colElm.style.right).toBe('50%')
    })

    it('set bk-col push', () => {
        const wrapper = mount(bkContainer, {
            slots: {
                default: `<bk-row><bk-col :push="12"></bk-col></bk-row>`
            }
        })
        const colElm = wrapper.vm.$children[0].$children[0].$el
        expect(colElm.outerHTML).toContain('<div class="bk-grid-col" style="width: 4.167%; padding-right: 10px; padding-left: 10px; left: 50%;"></div>')
        expect(colElm.style.left).toBe('50%')
    })
})
