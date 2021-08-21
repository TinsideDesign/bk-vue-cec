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
 * @file diff 组件单测
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import Diff from '@/components/diff'
import { mountComponent } from '../helpers'

import oldStr from '../../example/components/diff/old'
import newStr from '../../example/components/diff/new'

describe('Diff', () => {
    it('render the correct oldContent and newContent', () => {
        const wrapper = mountComponent(Diff, {
            propsData: {
                oldContent: oldStr,
                newContent: newStr,
                format: 'side-by-side'
            }
        })
        const sourceContent = wrapper.find('.d2h-files-diff')
        expect(sourceContent.exists()).toBe(true)
        expect(sourceContent.contains('.d2h-file-side-diff')).toBe(true)

        const tableSourceContent = wrapper.find('.d2h-diff-tbody')
        expect(tableSourceContent.exists()).toBe(true)
        expect(tableSourceContent.contains('tr')).toBe(true)
    })
    it('has context', () => {
        const wrapper = mountComponent(Diff, {
            propsData: {
                oldContent: oldStr,
                newContent: newStr,
                context: 20
            }
        })
        expect(wrapper.props('context')).toEqual(20)
    })
    it('render the correct format with side-by-side ', () => {
        const wrapper = mountComponent(Diff, {
            propsData: {
                oldContent: oldStr,
                newContent: newStr,
                format: 'side-by-side'
            }
        })
        const sourceContent = wrapper.find('.d2h-file-side-diff')
        expect(sourceContent.exists()).toBe(true)
        expect(sourceContent.contains('.d2h-code-wrapper')).toBe(true)
    })
    it('render the correct format with line-by-line', () => {
        const wrapper = mountComponent(Diff, {
            propsData: {
                oldContent: oldStr,
                newContent: newStr,
                format: 'line-by-line'
            }
        })
        const sideSourceContent = wrapper.find('.d2h-file-side-diff')
        expect(sideSourceContent.exists()).toBe(false)

        const lineSourceContent = wrapper.find('.d2h-file-diff')
        expect(lineSourceContent.exists()).toBe(true)
        expect(lineSourceContent.contains('.d2h-code-wrapper')).toBe(true)
    })
})
