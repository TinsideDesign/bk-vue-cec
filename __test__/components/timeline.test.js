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
 * @file timeline 组件单测
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import Timeline from '@/components/timeline'
import { mountComponent } from '../helpers'
import Vue from 'vue'

describe('Timeline', () => {
    const vm = new Vue()
    const wrapper = mountComponent(Timeline, {
        propsData: {
            list: [
                { tag: '十月一日', content: '下雨了' },
                { tag: '十月二日', content: '<div style="color: #F95F5BD9;"><strong>天晴了</strong></div>', type: 'success' },
                {
                    tag: '十月三日',
                    content:
                        vm.$createElement('p', {
                            style: {
                                color: 'red'
                            }
                        }, '今天天气很好')
                }
            ]
        }
    })

    it('render the correct content', () => {
        expect(wrapper.name()).toBe('bk-timeline')
        expect(wrapper.html()).toContain('<div class="bk-timeline-time">十月一日</div>')
        expect(wrapper.html()).toContain('<div style="color: #F95F5BD9;"><strong>天晴了</strong></div>')
        expect(wrapper.html()).toContain('<p style="color: red;">今天天气很好</p>')
    })

    it('render the correct class', () => {
        wrapper.setProps({
            list: [
                { tag: '十月一日', content: '下雨了' }
            ]
        })
        expect(wrapper.contains('li.bk-timeline-dot.primary')).toBe(true)

        wrapper.setProps({
            list: [
                { tag: '十月一日', content: '下雨了', type: 'xxx' }
            ]
        })
        expect(wrapper.contains('li.bk-timeline-dot.primary')).toBe(true)

        wrapper.setProps({
            list: [
                { tag: '十月一日', content: '下雨了', type: 'success' }
            ]
        })
        expect(wrapper.contains('li.bk-timeline-dot.success')).toBe(true)
    })

    it('trigger the correct event', () => {
        wrapper.setProps({
            list: [
                { tag: '十月一日', content: '下雨了', type: 'yyy' }
            ]
        })
        // click 时间标题触发 select 事件
        const title = wrapper.find('.bk-timeline-time')
        title.trigger('click')
        const events = wrapper.emitted().select
        // 触发了 select 事件
        expect(events).toBeTruthy()
        // 事件只触发一次
        expect(events.length).toBe(1)
        // 回调的参数正确
        expect(events[0]).toEqual([{ tag: '十月一日', content: '下雨了', type: 'yyy' }])
    })
})
