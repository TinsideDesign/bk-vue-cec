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
 * @file dialog 组件单测
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import Vue from 'vue'
import Dialog from '@/components/dialog'
import Button from '@/components/button'
import { mountComponent } from '../helpers'

describe('Dialog', () => {
    it('render the correct markup and content', () => {
        const dialogWrapper = mountComponent(Dialog, {
            propsData: {
                value: true,
                title: '这是标题',
                okText: '确定按钮'
            },
            slots: {
                default: '这是弹框内容'
            }
        })

        expect(dialogWrapper.name()).toBe('bk-dialog')
        expect(dialogWrapper.html()).toContain('<div class="bk-dialog-body">这是弹框内容</div>')
        expect(dialogWrapper.find('.bk-dialog-header-inner').text()).toBe('这是标题')
        expect(dialogWrapper.findAll('button').at(0).text()).toBe('确定按钮')
        expect(dialogWrapper.findAll('button').at(1).classes('bk-default')).toBe(true)
    })

    it('v-model is correct', () => {
        const parentWrapper = mountComponent({
            data () {
                return {
                    isShow: false
                }
            },
            components: { 'bk-button': Button, 'bk-dialog': Dialog },
            template: `
                <div>
                    <bk-button theme="primary" @click="isShow = !isShow">primary</bk-button>
                    <bk-dialog v-model="isShow" title="这是标题" :render-directive="'if'">
                        dialog content
                    </bk-dialog>
                </div>
            `
        })

        expect(parentWrapper.vm.isShow).toBe(false)
        expect(parentWrapper.find('.bk-dialog-mask').exists()).toBe(false)
        expect(parentWrapper.find('.bk-dialog-wrapper').isEmpty()).toBe(true)

        parentWrapper.find('button').trigger('click')

        expect(parentWrapper.find('.bk-dialog-mask').exists()).toBe(true)
        expect(parentWrapper.find('.bk-dialog-wrapper').isEmpty()).toBe(false)
        expect(parentWrapper.find('.bk-dialog-header-inner').text()).toBe('这是标题')
    })

    it('dont\'t show mask and fullscreen', () => {
        const dialogWrapper = mountComponent(Dialog, {
            propsData: {
                value: true,
                title: '这是标题',
                okText: '确定按钮',
                showMask: false,
                fullscreen: true
            }
        })

        expect(dialogWrapper.find('.bk-dialog-fullscreen').exists()).toBe(true)
        expect(dialogWrapper.find('.bk-dialog-mask').exists()).toBe(false)
    })

    it('maskClose props is correct', () => {
        const dialogWrapper = mountComponent(Dialog, {
            propsData: {
                value: true,
                renderDirective: 'if',
                title: '这是标题',
                okText: '确定按钮',
                maskClose: false
            }
        })

        expect(dialogWrapper.vm.value).toBe(true)
        expect(dialogWrapper.find('.bk-dialog-mask').exists()).toBe(true)
        expect(dialogWrapper.find('.bk-dialog-wrapper').isEmpty()).toBe(false)
        expect(dialogWrapper.find('.bk-dialog-header-inner').text()).toBe('这是标题')
        expect(dialogWrapper.find('i.bk-dialog-close').exists()).toBe(true)

        dialogWrapper.find('.bk-dialog-mask').trigger('click')

        expect(dialogWrapper.find('.bk-dialog-mask').exists()).toBe(true)
        expect(dialogWrapper.find('.bk-dialog-wrapper').isEmpty()).toBe(false)

        dialogWrapper.setProps({ maskClose: true })

        dialogWrapper.find('.bk-dialog-mask').trigger('click')

        expect(dialogWrapper.find('.bk-dialog-mask').exists()).toBe(false)
        expect(dialogWrapper.find('.bk-dialog-wrapper').isEmpty()).toBe(true)
    })

    it('emit confirm event is correct', done => {
        Vue.config.errorHandler = done
        const spy = jest.spyOn(global.console, 'error').mockImplementation(() => {})

        try {
            const dialogWrapper = mountComponent(Dialog, {
                propsData: {
                    value: true,
                    renderDirective: 'if',
                    title: '这是标题',
                    okText: '确定按钮'
                }
            })

            dialogWrapper.find('.bk-primary').trigger('click')

            expect(dialogWrapper.emitted('confirm')).toBeTruthy()

            Vue.nextTick(() => {
                expect(dialogWrapper.vm.$data.visible).toBe(false)
                expect(dialogWrapper.emittedByOrder().map(e => e.name)).toEqual(['confirm', 'value-change', 'input'])
                done()
            })
        } catch (error) {
            // error.message
            console.warn(error)
        } finally {
            spy.mockRestore()
        }
    })

    it('emit cancel event is correct', () => {
        const dialogWrapper = mountComponent(Dialog, {
            propsData: {
                value: true,
                renderDirective: 'if',
                title: '这是标题',
                okText: '确定按钮'
            }
        })

        dialogWrapper.find('.bk-dialog-close').trigger('click')

        expect(dialogWrapper.emitted('cancel')).toBeTruthy()

        expect(dialogWrapper.vm.$data.visible).toBe(false)
        expect(dialogWrapper.emittedByOrder().map(e => e.name)).toEqual(['value-change', 'input', 'cancel'])
    })
})
