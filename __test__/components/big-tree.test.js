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
 * @file big-tree 组件单测
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import bkBigTree from '@/components/big-tree'
import { mount } from '@vue/test-utils'

const getNodes = (parent, childCount, deep) => {
    const nodes = []
    for (let i = 0; i < childCount; i++) {
        const node = {
            id: parent ? `${parent.id}-${i}` : `${i}`,
            level: parent ? parent.level + 1 : 0,
            name: parent ? `${parent.name}-${i}` : `node-${i}`
        }
        if (node.level < deep) {
            node.children = getNodes(node, 2, deep)
        }
        nodes.push(node)
    }
    return nodes
}

const getNode = (wrapper, id) => {
    return wrapper.vm.getNodeById(id)
}

const getNodeCheckbox = (wrapper, id) => {
    return getNode(wrapper, id).vNode.$el.querySelector('.node-checkbox')
}

describe('Big-tree unit test', () => {
    const selectChange = jest.fn()
    const checkChange = jest.fn()
    const expandChange = jest.fn()
    const disableChange = jest.fn()
    const wrapper = mount(bkBigTree, {
        propsData: {
            data: getNodes(null, 20, 2),
            defaultExpandedNodes: ['0-0'],
            defaultCheckedNodes: ['0-0-0', '1'],
            defaultDisabledNodes: ['0-1', '1-1-1'],
            showCheckbox: true,
            selectable: true
        },
        listeners: {
            'select-change': selectChange,
            'check-change': checkChange,
            'expand-change': expandChange,
            'disable-change': disableChange
        }
    })

    it('render the correct content', () => {
        const nodes = wrapper.vm.nodes
        expect(nodes.length).toBe(140)

        const expandedNodes = nodes.filter(node => node.expanded)
        expect(expandedNodes.map(node => node.id)).toEqual(['0', '0-0'])

        const checkedNodes = nodes.filter(node => node.checked)
        expect(checkedNodes.map(node => node.id)).toEqual(['0-0-0', '1', '1-0', '1-0-0', '1-0-1', '1-1', '1-1-0', '1-1-1'])

        const indeterminateNodes = nodes.filter(node => node.indeterminate)
        expect(indeterminateNodes.map(node => node.id)).toEqual(['0', '0-0'])

        const disabledNodes = nodes.filter(node => node.disabled)
        expect(disabledNodes.map(node => node.id)).toEqual(['0-1', '0-1-0', '0-1-1', '1-1-1'])
    })

    it('emit the correct events', () => {
        getNodeCheckbox(wrapper, '0-1').click()
        expect(checkChange).not.toBeCalled()

        getNode(wrapper, '0-1').vNode.$el.click()
        expect(selectChange).not.toBeCalled()
        expect(expandChange).not.toBeCalled()

        getNodeCheckbox(wrapper, '1').click()
        expect(wrapper.emitted()['check-change']).toBeTruthy()
        expect(checkChange).toBeCalled()

        getNode(wrapper, '1').vNode.$el.click()
        expect(wrapper.emitted()['select-change']).toBeTruthy()
        expect(selectChange).toBeCalled()
        expect(expandChange).toBeCalled()
    })
})
