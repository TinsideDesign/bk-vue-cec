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
 * @file sileslider 组件单测
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import sideslider from '@/components/sideslider'
import { mountComponent } from '../helpers'

describe('sideslider', () => {
    it('render with default settings', () => {
        const wrapper = mountComponent(sideslider, {
            propsData: {
                isShow: true
            }
        })
        expect(wrapper.classes()).toContain('bk-sideslider')
        expect(wrapper.html()).toContain('<article class="bk-sideslider" name="slide">')
    })

    it('test props of isShow when false', () => {
        const wrapper = mountComponent(sideslider, {
            propsData: {
                isShow: false
            }
        })
        expect(wrapper.html()).toContain('<article class="bk-sideslider" style="display: none;"')
    })

    it('test props of title', () => {
        const wrapper = mountComponent(sideslider, {
            propsData: {
                title: 'test jest'
            }
        })
        expect(wrapper.props('title')).toBe('test jest')
        const title = wrapper.find('.bk-sideslider-title')
        expect(title.exists()).toBe(true)
        expect(title.text()).toBe('test jest')
    })

    it('test props of direction', () => {
        const wrapper = mountComponent(sideslider, {
            propsData: {
                direction: 'left'
            }
        })
        expect(wrapper.html()).toContain('<section class="bk-sideslider-wrapper left')
    })

    it('test props of width', () => {
        const wrapper = mountComponent(sideslider, {
            propsData: {
                width: 500
            }
        })
        expect(wrapper.html()).toContain('<section class="bk-sideslider-wrapper right" style="width: 500px;">')
    })

    it('test props of beforeClose', (done) => {
        const handler = jest.fn()
        const wrapper = mountComponent(sideslider, {
            propsData: {
                beforeClose: handler
            }
        })
        const contentWrap = wrapper.find('.bk-sideslider-closer')
        contentWrap.trigger('click')
        setTimeout(() => {
            expect(handler).toHaveBeenCalledTimes(1)
            done()
        }, 300)
    })

    it('shown events', (done) => {
        const handler = jest.fn()
        const wrapper = mountComponent(sideslider, {
            propsData: {
                isShow: false
            },
            listeners: {
                shown: handler
            }
        })
        wrapper.setProps({ isShow: true })
        expect(wrapper.vm.isShow).toBe(true)
        setTimeout(() => {
            expect(handler).toHaveBeenCalledTimes(1)
            done()
        }, 300)
    })

    it('hidden events', (done) => {
        const handler = jest.fn()
        const wrapper = mountComponent(sideslider, {
            propsData: {
                isShow: true
            },
            listeners: {
                hidden: handler
            }
        })
        wrapper.setProps({ isShow: false })
        expect(wrapper.vm.isShow).toBe(false)
        setTimeout(() => {
            expect(handler).toHaveBeenCalledTimes(1)
            done()
        }, 300)
    })

    it('test slot of header', () => {
        const wrapper = mountComponent(sideslider, {
            slots: {
                header: '<p>sideslider slot header</p>'
            }
        })
        const headerWrap = wrapper.find('.bk-sideslider-header')
        expect(wrapper.html()).toContain('<p>sideslider slot header</p>')
        expect(headerWrap.exists()).toBe(true)
        expect(headerWrap.text()).toBe('sideslider slot header')
    })

    it('test slot of content', () => {
        const wrapper = mountComponent(sideslider, {
            slots: {
                content: '<p>sideslider slot content</p>'
            }
        })
        const contentWrap = wrapper.find('.bk-sideslider-content')
        expect(wrapper.html()).toContain('<p>sideslider slot content</p>')
        expect(contentWrap.exists()).toBe(true)
        expect(contentWrap.text()).toBe('sideslider slot content')
    })

    it('test slot of footer', () => {
        const wrapper = mountComponent(sideslider, {
            slots: {
                footer: '<p>sideslider slot footer</p>'
            }
        })
        const footerWrap = wrapper.find('.bk-sideslider-footer')
        expect(wrapper.html()).toContain('<p>sideslider slot footer</p>')
        expect(footerWrap.exists()).toBe(true)
        expect(footerWrap.text()).toBe('sideslider slot footer')
    })
})
