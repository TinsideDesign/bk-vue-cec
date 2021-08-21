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
 * @file DropdownMenu 组件单测
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */
import { mount, shallowMount } from '@vue/test-utils'
import Button from '@/components/button'
import DropdownMenu from '@/components/dropdown-menu'
import { mountComponent, createTestComp } from '../helpers'

describe('Component', () => {
    it('render the correct markup and content', done => {
        const wrapper = mount(createTestComp(`
            <bk-dropdown-menu ref="dropdown">
                <bk-button type="primary" slot="dropdown-trigger">
                    <span>更多操作</span>
                </bk-button>
                <ul class="bk-dropdown-list" slot="dropdown-content">
                    <li><a href="javascript:;" >生产环境</a></li>
                    <li><a href="javascript:;" >预发布环境</a></li>
                    <li><a href="javascript:;" >测试环境</a></li>
                    <li><a href="javascript:;" >正式环境</a></li>
                </ul>
            </bk-dropdown-menu>
            `, {
            components: {
                bkDropdownMenu: DropdownMenu,
                bkButton: Button
            }
        }), { sync: false })
        setTimeout(_ => {
            expect(wrapper.classes('bk-dropdown-menu')).toBe(true)
            wrapper.find('.bk-dropdown-trigger').trigger('mouseover')
            setTimeout(_ => {
                expect(wrapper.find('.bk-dropdown-content.is-show').exists()).toBe(true)
                done()
            }, 300)
        }, 400)
        done()
    })
    it('render the correct properties', async done => {
        const wrapper = shallowMount(DropdownMenu, {
            propsData: {
                'align': 'center',
                'font-size': 'large',
                'disabled': false,
                'trigger': 'click'
            }
        })
        await expect(wrapper.props().align).toBe('center')
        await expect(wrapper.find('.bk-dropdown-content.center-align').exists()).toBe(true)
        await expect(wrapper.props().fontSize).toBe('large')
        await expect(wrapper.props().disabled).toBe(false)
        await expect(wrapper.props().trigger).toBe('click')
        done()
    })
    it('render the correct trigger slot', async done => {
        const wrapper = mountComponent(DropdownMenu, {
            slots: {
                'dropdown-trigger': '<span>更多操作</span>'
            }
        })
        await expect(wrapper.html()).toContain('<div class="bk-dropdown-trigger"><span>更多操作</span></div>')
        done()
    })
    it('render the correct content slot', async done => {
        const wrapper = mountComponent(DropdownMenu, {
            slots: {
                'dropdown-content': '<li><a href="javascript:;">生产环境</a></li>'
            }
        })
        await expect(wrapper.find('.bk-dropdown-content').find('a').text()).toBe('生产环境')
        done()
    })
    it('show and hide listener', async done => {
        const wrapper = mount(createTestComp(`
            <bk-dropdown-menu @show="dropdownShow" @hide="dropdownHide" ref="dropdown" trigger="click">
                <bk-button type="primary" slot="dropdown-trigger">
                    <span>更多操作</span>
                </bk-button>
                <ul class="bk-dropdown-list" slot="dropdown-content">
                    <li><a class="menu" href="javascript:;" @click="triggerHandler">生产环境</a></li>
                </ul>
            </bk-dropdown-menu>
            `, {
            components: {
                bkDropdownMenu: DropdownMenu,
                bkButton: Button
            },
            data () {
                return {
                    isDropdownShow: false,
                    isDropdownHide: true
                }
            },
            methods: {
                dropdownShow () {
                    this.isDropdownShow = true
                },
                dropdownHide () {
                    this.isDropdownHide = false
                },
                triggerHandler () {
                    this.$refs.dropdown.hide()
                }
            }
        }), { sync: false })
        const vm = wrapper.vm
        await vm.$refs['dropdown'].$el.click()
        setTimeout(_ => {
            expect(vm.isDropdownShow).toBe(true)
            vm.$refs['dropdown'].$el.querySelector('.menu').click()
            setTimeout(_ => {
                expect(vm.isDropdownHide).toBe(false)
                done()
            }, 500)
        }, 50)
    })
})
