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
 * @file process 组件单测
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import process from '@/components/process'
import { mount } from '@vue/test-utils'
import { createTestComp } from '../helpers'

describe('process', () => {
    it('render the correct prop list', () => {
        const wrapper = mount(
            createTestComp(
                `<bk-process
                    :list="list"
                    :cur-process.sync="curProcess"
                    :display-key="displayKey"
                    :show-steps="true"
                ></bk-process>`,
                {
                    components: {
                        bkProcess: process
                    },

                    data () {
                        return {
                            list: [
                                {
                                    content: '创建应用',
                                    steps: [
                                        {
                                            content: '创建应用1',
                                            isLoading: true
                                        },
                                        {
                                            content: '创建应用2',
                                            isLoading: true
                                        }
                                    ]
                                },
                                {
                                    content: '开发完成',
                                    steps: [
                                        {
                                            content: '开发完成1',
                                            isLoading: true
                                        },
                                        {
                                            content: '开发完成2',
                                            isLoading: false
                                        }
                                    ]
                                }
                            ],
                            displayKey: 'content',
                            curProcess: 1
                        }
                    }
                }
            ),
            { sync: false }
        )

        const children = wrapper.findAll('li')
        const firstChild = children.at(0)
        const dd = firstChild.findAll('dd').at(0)
        const loading = dd.find('.bk-spin-loading')
        expect(dd.text()).toBe('创建应用1')
        expect(loading.exists()).toBe(true)
        expect(children.length).toBe(2)
    })

    it('render the correct prop controllable & emit process-changed', async (done) => {
        const handler = jest.fn()
        const wrapper = mount(
            createTestComp(
                `<bk-process
                    :list="list"
                    :cur-process.sync="curProcess"
                    :display-key="displayKey"
                    :show-steps="true"
                    :controllable="controllable"
                    @process-changed="changeProcess"
                ></bk-process>`,
                {
                    components: {
                        bkProcess: process
                    },

                    data () {
                        return {
                            controllable: true,
                            list: [
                                { content: '基本信息', steps: [{ content: '创建应用1', isLoading: true }], isLoading: true },
                                { content: '详细信息', isLoading: true },
                                { content: '实名认证', isLoading: true }
                            ],
                            curProcess: 1,
                            displayKey: 'content'
                        }
                    },

                    methods: {
                        changeProcess: handler
                    }
                }
            ),
            { sync: false }
        )

        const vm = wrapper.vm
        const children = wrapper.findAll('li')
        const lastChild = children.at(2)
        lastChild.trigger('click')
        await vm.$nextTick()
        expect(lastChild.classes()).toContain('current')
        expect(handler).toBeCalled()
        done()
    })

    it('render the correct prop show-steps', async (done) => {
        const wrapper = mount(
            createTestComp(
                `<bk-process
                    :list="list"
                    :cur-process.sync="curProcess"
                    :display-key="displayKey"
                    :show-steps="showSteps"
                    :controllable="controllable"
                ></bk-process>`,
                {
                    components: {
                        bkProcess: process
                    },

                    data () {
                        return {
                            controllable: true,
                            list: [
                                {
                                    content: '创建应用',
                                    steps: [
                                        {
                                            content: '创建应用1',
                                            isLoading: true
                                        },
                                        {
                                            content: '创建应用2',
                                            isLoading: true
                                        }
                                    ]
                                },
                                {
                                    content: '开发完成',
                                    steps: [
                                        {
                                            content: '开发完成1',
                                            isLoading: true
                                        },
                                        {
                                            content: '开发完成2',
                                            isLoading: false
                                        }
                                    ]
                                }
                            ],
                            showSteps: true,
                            displayKey: 'content',
                            curProcess: 1
                        }
                    }
                }
            ),
            { sync: false }
        )

        await wrapper.vm.$nextTick()
        const processToggle = wrapper.find('.bk-process-toggle')
        processToggle.trigger('click')
        await wrapper.vm.$nextTick()
        const children = wrapper.findAll('li')
        const secChild = children.at(1).find('dl')
        expect(secChild.attributes('style')).toBe('display: none;')
        done()
    })
})
