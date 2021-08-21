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
 * @file info 组件单测
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import Vue from 'vue'
import { createWrapper } from '@vue/test-utils'
import InfoBox from '@/components/info-box'
import Dialog from '@/components/dialog'

describe('InfoBox', () => {
    it('correct mounted', () => {
        const vm = new InfoBox()
        const wrapper = createWrapper(vm)

        expect(wrapper.is(Dialog)).toBe(true)
        expect(wrapper.contains(Dialog)).toBe(true)
        expect(wrapper.isVueInstance()).toBe(true)
        expect(wrapper.name()).toBe('bk-dialog')
        expect(Vue.prototype).toHaveProperty('$bkInfo')
    })

    it('render the correct markup and content', done => {
        Vue.config.errorHandler = done
        const spy = jest.spyOn(global.console, 'error').mockImplementation(() => {})

        try {
            const wrapper = createWrapper(new InfoBox({
                title: '这是标题',
                subTitle: '这是子标题',
                okText: '确定按钮'
            }))

            Vue.nextTick(() => {
                expect(wrapper.find('.bk-dialog-header .bk-dialog-header-inner').text()).toBe('这是标题')
                expect(wrapper.find('.bk-dialog-sub-header .bk-dialog-header-inner').text()).toBe('这是子标题')
                expect(wrapper.findAll('button').at(0).text()).toBe('确定按钮')
                expect(wrapper.findAll('button').at(1).classes('bk-default')).toBe(true)
                done()
            })
        } catch (error) {
            // error.message
            console.warn(error)
        } finally {
            spy.mockRestore()
        }
    })

    it('maskClose props is correct', done => {
        Vue.config.errorHandler = done
        const spy = jest.spyOn(global.console, 'error').mockImplementation(() => {})

        try {
            const wrapper = createWrapper(new InfoBox({
                title: '这是标题',
                subTitle: '这是子标题',
                okText: '确定按钮',
                maskClose: false
            }))

            Vue.nextTick(() => {
                expect(wrapper.vm.value).toBe(true)
                expect(wrapper.find('.bk-dialog-mask').exists()).toBe(true)
                expect(wrapper.find('.bk-dialog-wrapper').isEmpty()).toBe(false)
                expect(wrapper.find('.bk-dialog-header .bk-dialog-header-inner').text()).toBe('这是标题')
                expect(wrapper.find('.bk-dialog-sub-header .bk-dialog-header-inner').text()).toBe('这是子标题')
                expect(wrapper.find('i.bk-dialog-close').exists()).toBe(true)

                wrapper.find('.bk-dialog-mask').trigger('click')
                expect(wrapper.vm.$data.visible).toBe(true)

                wrapper.setProps({ maskClose: true })

                wrapper.find('.bk-dialog-mask').trigger('click')
                expect(wrapper.vm.$data.visible).toBe(false)

                done()
            })
        } catch (error) {
            // error.message
            console.warn(error)
        } finally {
            spy.mockRestore()
        }
    })

    it('cancelFn is correct', done => {
        Vue.config.errorHandler = done
        const spy = jest.spyOn(global.console, 'error').mockImplementation(() => {})

        try {
            const vm = new InfoBox({
                title: '这是标题',
                subTitle: '这是子标题',
                okText: '确定按钮',
                cancelFn: jest.fn()
            })

            const wrapper = createWrapper(vm)
            wrapper.find('.bk-dialog-close').trigger('click')

            Vue.nextTick(() => {
                expect(vm.cancelFn).toHaveBeenCalled()

                done()
            })
        } catch (error) {
            // error.message
            console.warn(error)
        } finally {
            spy.mockRestore()
        }
    })
})
