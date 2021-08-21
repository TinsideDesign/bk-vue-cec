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
 * @file loading 组件单测
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import Vue from 'vue'
import Loading from '@/components/loading'
import { mount } from '@vue/test-utils'
import { createTestComp } from '../helpers.js'
Vue.use(Loading)

describe('render the Loading by directive', () => {
    it('render the loading isLoading', () => {
        const wrapper = mount(createTestComp(
            `<div v-bkloading="{isLoading: isLoading}"></div>`,
            {
                data () {
                    return {
                        isLoading: true
                    }
                }
            }
        ))
        expect(wrapper.find('.bk-loading').exists()).toBe(true)
    })
    it('render the loading title', () => {
        const wrapper = mount(createTestComp(
            `<div v-bkloading="{isLoading: isLoading, title: title}"></div>`,
            {
                data () {
                    return {
                        isLoading: true,
                        title: 'Jest'
                    }
                }
            }
        ))
        expect(wrapper.find('.bk-loading-title').exists()).toBe(true)
        expect(wrapper.find('.bk-loading-title').text()).toBe('Jest')
    })
    it('render the loading opacity', () => {
        const wrapper = mount(createTestComp(
            `<div v-bkloading="{isLoading: isLoading, opacity: opacity}"></div>`,
            {
                data () {
                    return {
                        isLoading: true,
                        opacity: '0.6'
                    }
                }
            }
        ))
        expect(wrapper.find('.bk-loading').attributes('style').indexOf(' background-color: rgba(255, 255, 255, 0.6)') > -1).toBe(true)
    })
    it('render the loading color by rgb', () => {
        const wrapper = mount(createTestComp(
            `<div v-bkloading="{isLoading: isLoading, color: color}"></div>`,
            {
                data () {
                    return {
                        isLoading: true,
                        color: 'rgb(245,245,245)'
                    }
                }
            }
        ))
        expect(wrapper.find('.bk-loading').attributes('style').indexOf('245, 245, 245') > -1).toBe(true)
    })
    it('render the loading color by hex', () => {
        const wrapper = mount(createTestComp(
            `<div v-bkloading="{isLoading: isLoading, color: hex}"></div>`,
            {
                data () {
                    return {
                        isLoading: true,
                        hex: '#cccccc'
                    }
                }
            }
        ))
        expect(wrapper.find('.bk-loading').attributes('style').indexOf('204, 204, 204') > -1).toBe(true)
    })
    it('render the loading color by rgba', () => {
        const wrapper = mount(createTestComp(
            `<div v-bkloading="{isLoading: isLoading, color: rgba}"></div>`,
            {
                data () {
                    return {
                        isLoading: true,
                        rgba: 'rgba(245,245,245,0.6)'
                    }
                }
            }
        ))
        expect(wrapper.find('.bk-loading').attributes('style').indexOf('245, 245, 245, 0.6') > -1).toBe(true)
    })

    it('loading afterLeave callback function', () => {
        const wrapper = mount(createTestComp(
            `<div v-bkloading="{isLoading: isLoading, afterLeave: afterLeave}"></div>`,
            {
                data () {
                    return {
                        isLoading: true,
                        isTriggerCallback: false
                    }
                },
                methods: {
                    afterLeave () {
                        this.isTriggerCallback = true
                    }
                }
            }
        ))
        setTimeout(() => {
            wrapper.setData({ isLoading: false })
            expect(wrapper.vm.isTriggerCallback).toBe(true)
        }, 200)
    })

    it('render the loading by function', () => {
        const wrapper = mount(createTestComp(
            `<div class="test-wrap"></div>`,
            {
                data () {
                    return {
                        isTriggerCallback: false
                    }
                },
                created () {
                    this.showLoading()
                },
                methods: {
                    showLoading () {
                        const h = this.$createElement
                        this.$bkLoading({
                            title: h('span', {
                                style: {
                                    color: 'red'
                                }
                            }, '加载中'),
                            afterLeave () {
                                this.isTriggerCallback = true
                            }
                        })
                    }
                }
            }
        ))
        setTimeout(() => {
            expect(wrapper.find('.bk-loading').exists()).toBe(true)
            expect(wrapper.vm.isTriggerCallback).toBe(true)
        }, 200)
    })
})
