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
 * @file select 组件单测
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import bkSelect from '@/components/select'
import bkOption from '@/components/option'
import { mount } from '@vue/test-utils'

const createWrapper = (data, props = {}) => {
    return mount({
        components: {
            bkSelect,
            bkOption
        },
        template: `
            <div>
                <bk-select ref="select"
                    v-model="value"
                    v-bind="props">
                    <bk-option v-for="option in options"
                        :id="option.id"
                        :name="option.name"
                        :key="option.id">
                    </bk-option>
                </bk-select>
            </div>
        `,
        data () {
            return {
                ...data,
                props
            }
        }
    })
}

const getDOM = (wrapper, selector) => {
    const select = wrapper.find('.bk-select')
    return select.vm.$refs.selectDropdown.instance.popper.querySelectorAll(selector)
}

describe('Select unit test', () => {
    const wrapperA = createWrapper({
        value: '',
        options: [{
            id: 'a',
            name: 'A'
        }, {
            id: 'b',
            name: 'B'
        }]
    })
    it('renders the correct markup', () => {
        const options = getDOM(wrapperA, '.bk-option')
        expect(options.length).toBe(2)
        expect(wrapperA.find('.bk-select-name').text()).toBe('')
    })
    it('renders the correct selected content', () => {
        wrapperA.setData({ value: 'a' })
        const select = wrapperA.find('.bk-select')
        const options = getDOM(wrapperA, '.bk-option')
        expect([].findIndex.call(options, option => option.classList.contains('is-selected'))).toBe(0)
        expect(select.find('.bk-select-name').text()).toBe('A')
        expect(select.emittedByOrder().map(e => e.name)).toEqual(['input', 'change'])
    })
    it('no response event while disabled', () => {
        wrapperA.setProps({ disabled: true })
        const select = wrapperA.find('.bk-select')
        select.trigger('click')
        setTimeout(() => {
            expect(select.classes()).toContain('is-disabled')
            expect(select.emittedByOrder().length).toBe(0)
        }, 500)
    })

    const wrapperB = createWrapper({
        value: '',
        options: [{
            id: 'a',
            name: 'A'
        }, {
            id: 'b',
            name: 'B'
        }]
    })
    it('emit correct events', () => {
        const select = wrapperB.find('.bk-select')
        const options = getDOM(wrapperB, '.bk-option')
        select.trigger('click')
        setTimeout(() => {
            expect(select.classes()).toContain('is-focus')
            options[0].click()
            expect(select.emittedByOrder().map(e => e.name)).toEqual(['toggle', 'input', 'change', 'selected', 'toggle'])
            expect([].findIndex.call(options, option => option.classList.contains('is-selected'))).toBe(0)
            expect(wrapperB.vm.value).toBe('a')
        }, 500)
    })

    const wrapperC = createWrapper({
        value: ['a', 'b'],
        options: [{
            id: 'a',
            name: 'A'
        }, {
            id: 'b',
            name: 'B'
        }, {
            id: 'c',
            name: 'C'
        }]
    }, {
        multiple: true
    })
    it('render the correct markup and content', () => {
        const select = wrapperC.find('.bk-select')
        expect(select.vm.selected).toEqual(['a', 'b'])

        const options = getDOM(wrapperC, '.bk-option')
        expect([].filter.call(options, option => option.classList.contains('is-selected')).length).toBe(2)
        options[2].click()
        setTimeout(() => {
            expect(wrapperC.vm.value).toEqual(['a', 'b', 'c'])

            wrapperC.find('.bk-select-clear').trigger('click')
            expect(select.emitted().clear).toBeTruthy()
            expect(wrapperC.vm.value).toEqual([])
        }, 500)
    })
})
