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
 * @file SearchSelect 组件单测
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import { mount } from '@vue/test-utils'
import { createTestComp } from '../helpers'
import bkSearchSelect from '@/components/search-select'

describe('search-select', () => {
    let wrapper
    if (global.document) { // fix vm.$nextTick
        document.createRange = () => ({
            setStart: () => {},
            setEnd: () => {},
            commonAncestorContainer: {
                nodeName: 'BODY',
                ownerDocument: document
            }
        })
    }

    global.beforeEach(() => {
        wrapper && wrapper.destroy()
    })

    global.afterEach(() => {
        wrapper && wrapper.destroy()
    })

    test('is create correct', async done => {
        wrapper = mount(bkSearchSelect, {
            sync: false,
            propsData: {
                data: [
                    {
                        name: 'test-1',
                        id: 'test-1'
                    },
                    {
                        name: 'test-2',
                        id: 'test-2'
                    }
                ]
            }
        })
        await expect(wrapper.classes('search-select-wrap')).toBe(true)
        done()
    })

    test('static props can set correct', async done => {
        wrapper = mount(bkSearchSelect, {
            sync: false,
            propsData: {
                data: [
                    {
                        nameTest: 'test-1',
                        idTest: 'test-1'
                    },
                    {
                        nameTest: 'test-2',
                        idTest: 'test-2'
                    }
                ],
                placeholder: 'test-placeholder',
                maxHeight: 180,
                minHeight: 100,
                displayKey: 'nameTest',
                primaryKey: 'idTest',
                wrapZindex: 100,
                defaultFocus: false,
                values: []
            }
        })

        const vm = wrapper.vm
        const input = vm.$el.querySelector('.div-input')
        await expect(input.dataset.placeholder).toBe('test-placeholder')
        await expect(vm.$el.querySelector('.search-input').style.maxHeight).toEqual('100px')
        await expect(vm.$el.style.zIndex).toEqual('100')
        await expect(vm.$props.displayKey).toEqual('nameTest')
        await expect(vm.$props.primaryKey).toEqual('idTest')
        input.click()
        await vm.$nextTick()
        expect(vm.$el.querySelector('.search-input').style.maxHeight).toEqual('180px')
        done()
    })

    test('test filter methods and event can trigger correct', async done => {
        wrapper = mount(createTestComp(`
                <bk-search-select
                    ref="searchSelect"
                    :default-focus="true"
                    :data="data"
                    :filter="true"
                    :filter-children-method="handleFilterChildrenMethod"
                    :filter-menu-method="handleFilterMenuMethod"
                    @input-focus="handleInputFocus"
                    @input-click="handleInputClick"
                    @input-change="handleInputChange"
                    v-model="values">
                </bk-search-select>`, {
            components: {
                bkSearchSelect
            },
            data () {
                return {
                    data: [
                        {
                            name: 'test-1',
                            id: 'test-1',
                            children: [
                                {
                                    name: 'child-1',
                                    id: 'chidl-1'
                                },
                                {
                                    name: 'child-2',
                                    id: 'chidl-2'
                                },
                                {
                                    name: 'child-3',
                                    id: 'chidl-3'
                                }
                            ]
                        },
                        {
                            name: 'test-2',
                            id: 'test-2'
                        }
                    ],
                    values: [],
                    menuTrigger: false,
                    childTrigger: false,
                    inputChangeTrigger: false,
                    inputClickTrigger: false,
                    inputFocusTrigger: false
                }
            },
            methods: {
                handleFilterChildrenMethod () {
                    this.childTrigger = true
                    return []
                },
                handleFilterMenuMethod () {
                    this.menuTrigger = true
                    return []
                },
                handleInputChange () {
                    this.inputChangeTrigger = true
                },
                handleInputClick () {
                    this.inputClickTrigger = true
                },
                handleInputFocus () {
                    this.inputFocusTrigger = true
                }
            }
        }), { sync: false })
        const vm = wrapper.vm.$refs.searchSelect
        const input = vm.$refs.input
        input.click()
        await vm.$nextTick()
        // 模拟输入
        input.textContent = 'test-1'
        input.innerText = 'test-1'
        vm.handleInputChange({
            target: input,
            preventDefault () {

            }
        })
        vm.initChildMenu()
        vm.menu.active = 0
        await vm.$nextTick()
        // 模拟搜索
        vm.handleSearch('test-1')
        await vm.$nextTick()
        await expect(wrapper.vm.menuTrigger).toBe(true)
        input.textContent = 'test-1：1'
        input.innerText = 'test-1：1'
        vm.handleInputChange({
            target: input,
            preventDefault () {

            }
        })
        vm.handleSearch('1')
        await vm.$nextTick()
        await expect(wrapper.vm.childTrigger).toBe(true)
        await expect(wrapper.vm.inputChangeTrigger).toBe(true)
        await expect(wrapper.vm.inputClickTrigger).toBe(true)
        input.focus()
        await vm.$nextTick()
        await expect(wrapper.vm.inputFocusTrigger).toBe(true)
        done()
    })

    test('test remote methods and event cant trigger correct', async done => {
        wrapper = mount(createTestComp(`
                <bk-search-select
                    ref="searchSelect"
                    :default-focus="true"
                    :data="data"
                    :remote-method="handleRemoteMethod"
                    v-model="values">
                </bk-search-select>`, {
            components: {
                bkSearchSelect
            },
            data () {
                return {
                    data: [
                        {
                            name: 'test-1',
                            id: 'test-1',
                            remote: true
                        },
                        {
                            name: 'test-2',
                            id: 'test-2'
                        }
                    ],
                    values: [],
                    remoteTrigger: false
                }
            },
            methods: {
                async handleRemoteMethod () {
                    this.remoteTrigger = true
                    return [
                        {
                            name: 'test-remote-1',
                            id: 'test-remote-1'
                        },
                        {
                            name: 'test-remote-2',
                            id: 'test-remote-2'
                        },
                        {
                            name: 'test-remote-3',
                            id: 'test-remote-3'
                        }
                    ]
                }
            }
        }), { sync: false })
        const vm = wrapper.vm.$refs.searchSelect
        const input = vm.$refs.input
        input.click()
        await vm.$nextTick()
        vm.initChildMenu()
        input.textContent = 'test-1：1'
        input.innerText = 'test-1：1'
        vm.menu.active = 0
        vm.handleInputChange({
            target: input,
            preventDefault () {

            }
        })
        await vm.$nextTick()
        vm.handleSearch('1')
        await vm.$nextTick()
        await expect(wrapper.vm.remoteTrigger).toBe(true)
        done()
    })

    test('test slot can set correct', async done => {
        wrapper = mount(createTestComp(`
                <bk-search-select
                    ref="searchSelect"
                    :data="data"
                    v-model="values">
                    <template slot="prefix">
                        <div class="test-prefix-slot">输入框前插槽</div>
                    </template>
                    <template slot="nextfix">
                        <div class="test-nextfix-slot">输入框后插槽</div>
                    </template>
                </bk-search-select>`, {
            components: {
                bkSearchSelect
            },
            data () {
                return {
                    data: [
                        {
                            name: 'test-1',
                            id: 'test-1'
                        },
                        {
                            name: 'test-2',
                            id: 'test-2'
                        }
                    ],
                    values: [],
                    remoteTrigger: false
                }
            }
        }), { sync: false })
        const vm = wrapper.vm.$refs.searchSelect
        await expect(vm.$el.querySelector('.test-prefix-slot')).not.toBeNull()
        await expect(vm.$el.querySelector('.test-nextfix-slot')).not.toBeNull()
        done()
    })
})
