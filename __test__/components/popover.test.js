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
 * @file popover 组件单测
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import bkPopover from '@/components/popover'
import { mount } from '@vue/test-utils'

describe('Popover unit test', () => {
    it('render the correct markup and content', () => {
        const wrapper = mount(bkPopover, {
            propsData: {
                placement: 'bottom',
                trigger: 'click'
            },
            slots: {
                default: `<span>trigger</span>`,
                content: 'content'
            }
        })
        expect(wrapper.html()).toContain('<span>trigger</span>')
        expect(wrapper.props().trigger).toBe('click')

        wrapper.vm.$refs.reference.click()
        setTimeout(() => {
            expect(wrapper.vm.instance.popover.querySelector('.bk-tooltip-content').textContent).toBe('content')
            expect(wrapper.vm.instance.popover.getAttribute('x-placement')).toBe('bottom')
            expect(wrapper.emmited().show).toBeTruthy()

            wrapper.vm.$refs.reference.blur()
            setTimeout(() => {
                expect(wrapper.emmited().hide).toBeTruthy()
            })
        }, 500)
    })

    it('render the correct markup and content', () => {
        const wrapper = mount(bkPopover, {
            propsData: {
                always: true
            },
            slots: {
                default: `<span>trigger</span>`,
                content: 'content'
            }
        })

        expect(wrapper.vm.instance.props.showOnInit).toBe(true)
        expect(wrapper.vm.instance.props.hideOnClick).toBe(false)
        expect(wrapper.vm.instance.props.trigger).toBe('manual')
    })
})
