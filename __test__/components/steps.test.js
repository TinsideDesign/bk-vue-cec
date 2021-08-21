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
 * @file steps 组件单测
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import Steps from '@/components/steps'
import { mount } from '@vue/test-utils'
import { mountComponent, createTestComp } from '../helpers'

describe('Steps', () => {
    it('render the correct prop steps', () => {
        const wrapper = mountComponent(Steps, {
            propsData: {
                steps: [
                    { title: '基本信息', icon: 1 },
                    { title: '详细信息', icon: 2 },
                    { title: '实名认证', icon: 3 }
                ]
            }
        })
        const children = wrapper.findAll('.bk-step')
        const firstChild = children.at(0)
        const title = firstChild.find('.bk-step-title')
        const number = firstChild.find('.bk-step-number')
        expect(title.text()).toBe('基本信息')
        expect(number.text()).toBe('1')
        expect(children.length).toBe(3)
    })

    it('render the correct prop cur-step', () => {
        const wrapper = mountComponent(Steps, {
            propsData: {
                steps: [
                    { title: '基本信息', icon: 1 },
                    { title: '详细信息', icon: 2 },
                    { title: '实名认证', icon: 3 }
                ],
                curStep: 3
            }
        })
        const children = wrapper.findAll('.bk-step')
        const current = children.at(2)
        expect(current.classes()).toContain('current')
    })

    it('render the correct prop direction', () => {
        const wrapper = mountComponent(Steps, {
            propsData: {
                steps: [
                    { title: '基本信息', icon: 1 },
                    { title: '详细信息', icon: 2 },
                    { title: '实名认证', icon: 3 }
                ],
                direction: 'vertical'
            }
        })
        expect(wrapper.classes()).toContain('bk-steps-vertical')
    })

    it('render the correct prop theme', () => {
        const wrapper = mountComponent(Steps, {
            propsData: {
                steps: [
                    { title: '基本信息', icon: 1 },
                    { title: '详细信息', icon: 2 },
                    { title: '实名认证', icon: 3 }
                ],
                theme: 'success'
            }
        })
        expect(wrapper.classes()).toContain('bk-steps-success')
    })

    it('step-change changeStep', () => {
        const handler = jest.fn()
        const wrapper = mount(
            createTestComp(
                `<bk-steps
                    :controllable="controllable"
                    :steps="steps"
                    :cur-step.sync="curStep"
                    @step-changed="stepChanged">
                </bk-steps>`,
                {
                    components: {
                        bkSteps: Steps
                    },

                    data () {
                        return {
                            steps: [
                                { title: '基本信息', icon: 1 },
                                { title: '详细信息', icon: 2 },
                                { title: '实名认证', icon: 3 }
                            ],
                            controllable: true,
                            curStep: 1
                        }
                    },

                    methods: {
                        stepChanged: handler
                    }
                }
            ),
            { sync: false }
        )

        const children = wrapper.findAll('.bk-step')
        const lastChild = children.at(2)
        const clickEle = lastChild.find('.bk-step-indicator')
        clickEle.trigger('click')
        expect(handler).toBeCalled()
        wrapper.vm.$nextTick(() => {
            expect(lastChild.classes()).toContain('current')
        })
    })
})
