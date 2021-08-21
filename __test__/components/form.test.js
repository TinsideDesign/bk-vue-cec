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
 * @file form 组件单测
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import { mount } from '@vue/test-utils'
import Form from '@/components/form/form.vue'
import FormItem from '@/components/form/form-item.vue'
import Input from '@/components/input/input.vue'

describe('form test', () => {
    it('props form-type', () => {
        function getWrapper (type = 'horizontal') {
            return mount({
                template: `
                    <bk-form :form-type="formType" :model="formData">
                        <bk-form-item label="名称" v-model="formData.name">
                            <bk-input placeholder="请输入3到10个以内的字符，不能为admin"></bk-input>
                        </bk-form-item>
                        <bk-form-item label="Email" v-model="formData.email">
                            <bk-input placeholder="请输入邮箱地址"></bk-input>
                        </bk-form-item>
                    </bk-form>
                `,
                components: {
                    BkForm: Form,
                    BkFormItem: FormItem,
                    BkInput: Input
                },
                data () {
                    return {
                        formType: type,
                        formData: {
                            name: '',
                            email: ''
                        }
                    }
                }
            })
        }
        const defaultWrapper = getWrapper()
        const verticalWrapper = getWrapper('vertical')
        const inlineWrapper = getWrapper('inline')
        expect(defaultWrapper.find('.bk-form').classes()).toEqual(['bk-form'])
        expect(verticalWrapper.find('.bk-form').classes()).toContain('bk-form-vertical')
        expect(inlineWrapper.find('.bk-form').classes()).toContain('bk-inline-form')
    })
    it('props label-width', () => {
        const wrapper = mount({
            template: `
                <bk-form :model="formData" :label-width="200">
                    <bk-form-item label="名称" v-model="formData.name">
                        <bk-input placeholder="请输入3到10个以内的字符，不能为admin"></bk-input>
                    </bk-form-item>
                </bk-form>
            `,
            components: {
                BkForm: Form,
                BkFormItem: FormItem,
                BkInput: Input
            },
            data () {
                return {
                    formData: {
                        name: ''
                    }
                }
            }
        })

        expect(wrapper.find('.bk-label').attributes('style')).toBe('width: 200px;')
    })
    it('props model', () => {
        const wrapper = mount({
            template: `
                <bk-form :model="formData">
                    <bk-form-item label="名称" property="name">
                        <bk-input placeholder="请输入3到10个以内的字符，不能为admin" v-model="formData.name"></bk-input>
                    </bk-form-item>
                    <bk-form-item label="Email" property="email">
                        <bk-input placeholder="请输入邮箱地址" v-model="formData.email"></bk-input>
                    </bk-form-item>
                </bk-form>
            `,
            components: {
                BkForm: Form,
                BkFormItem: FormItem,
                BkInput: Input
            },
            data () {
                return {
                    formData: {
                        name: 'test name',
                        email: 'test@bk.magic.com'
                    }
                }
            }
        })

        const bkInputs = wrapper.findAll('.bk-form-control')
        expect(bkInputs.at(0).vm.$props.value).toEqual('test name')
        expect(bkInputs.at(1).vm.$props.value).toEqual('test@bk.magic.com')

        const inputs = wrapper.findAll('input[type="text"]')
        inputs.at(0).setValue('new test name')
        inputs.at(1).setValue('newEmailName@bk.magic.cn')
        expect(wrapper.vm.formData).toEqual({ name: 'new test name', email: 'newEmailName@bk.magic.cn' })
    })
    it('props ext-cls', () => {
        const wrapper = mount({
            template: `
                <bk-form :model="formData" ext-cls="test-cls">
                    <bk-form-item label="名称" v-model="formData.name">
                        <bk-input placeholder="请输入3到10个以内的字符，不能为admin"></bk-input>
                    </bk-form-item>
                </bk-form>
            `,
            components: {
                BkForm: Form,
                BkFormItem: FormItem,
                BkInput: Input
            },
            data () {
                return {
                    formData: {
                        name: ''
                    }
                }
            }
        })

        expect(wrapper.find('.bk-form').classes()).toContain('test-cls')
    })

    // @todo validate

    it('bk-form-item props label', () => {
        const wrapper = mount({
            template: `
                <bk-form :model="formData">
                    <bk-form-item label="测试名称" v-model="formData.name">
                        <bk-input placeholder="请输入3到10个以内的字符，不能为admin"></bk-input>
                    </bk-form-item>
                </bk-form>
            `,
            components: {
                BkForm: Form,
                BkFormItem: FormItem,
                BkInput: Input
            },
            data () {
                return {
                    formData: {
                        name: ''
                    }
                }
            }
        })

        expect(wrapper.find('.bk-form-item .bk-label span').text()).toEqual('测试名称')
    })
    it('bk-form-item props label', () => {
        const wrapper = mount({
            template: `
                <bk-form :model="formData" :label-width="100">
                    <bk-form-item label="名称" v-model="formData.name">
                        <bk-input placeholder="请输入3到10个以内的字符，不能为admin"></bk-input>
                    </bk-form-item>
                    <bk-form-item label="Email" v-model="formData.email" :label-width="300">
                        <bk-input placeholder="请输入邮箱地址"></bk-input>
                    </bk-form-item>
                </bk-form>
            `,
            components: {
                BkForm: Form,
                BkFormItem: FormItem,
                BkInput: Input
            },
            data () {
                return {
                    formData: {
                        name: '',
                        email: ''
                    }
                }
            }
        })

        const labels = wrapper.findAll('.bk-form-item .bk-label')

        expect(labels.at(0).attributes('style')).toEqual('width: 100px;')
        expect(labels.at(1).attributes('style')).toEqual('width: 300px;')
    })
    it('bk-form-item props desc', () => {
        const wrapper = mount({
            template: `
                <bk-form :model="formData">
                    <bk-form-item label="测试名称" v-model="formData.name" desc="test some desc">
                        <bk-input placeholder="请输入3到10个以内的字符，不能为admin"></bk-input>
                    </bk-form-item>
                </bk-form>
            `,
            components: {
                BkForm: Form,
                BkFormItem: FormItem,
                BkInput: Input
            },
            data () {
                return {
                    formData: {
                        name: ''
                    }
                }
            }
        })
        expect(wrapper.find('.bk-form-item .bk-label').classes()).toContain('has-desc')
    })
    it('bk-form-item props ext-cls', () => {
        const wrapper = mount({
            template: `
                <bk-form :model="formData">
                    <bk-form-item label="测试名称" v-model="formData.name" ext-cls="test-cls">
                        <bk-input placeholder="请输入3到10个以内的字符，不能为admin"></bk-input>
                    </bk-form-item>
                </bk-form>
            `,
            components: {
                BkForm: Form,
                BkFormItem: FormItem,
                BkInput: Input
            },
            data () {
                return {
                    formData: {
                        name: ''
                    }
                }
            }
        })
        expect(wrapper.find('.bk-form-item').classes()).toContain('test-cls')
    })
})
