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
 * @file navigation 组件单测
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import { mount } from '@vue/test-utils'
import bkNavigationMenu from '@/components/navigation-menu'
import bkNavigationMenuItem from '@/components/navigation-menu-item'

const createTestComp = (template, options = {}) => {
    return {
        components: {
            bkNavigationMenu,
            bkNavigationMenuItem
        },
        template,
        ...options
    }
}
// describe('navigation', () => {
//     let wrapper
//     test('is create correct', async done => {
//         wrapper = mount(bkNavigation)
//         await expect(wrapper.classes('bk-navigation')).toBe(true)
//         done()
//     })

//     test('props can set correct', async done => {
//         wrapper = shallowMount(bkNavigation, {
//             propsData: {
//                 'nav-width': 160,
//                 'hover-width': 300,
//                 'side-title': 'testSideTitle',
//                 'header-title': 'testHeaderTitle',
//                 'default-open': true,
//                 'hover-leave-delay': 0,
//                 'theme-color': 'red'
//             }
//         })
//         await expect(wrapper.props().navWidth).toBe(160)
//         await expect(wrapper.props().hoverWidth).toBe(300)
//         await expect(wrapper.props().sideTitle).toBe('testSideTitle')
//         await expect(wrapper.props().headerTitle).toBe('testHeaderTitle')
//         await expect(wrapper.props().defaultOpen).toBe(true)
//         await expect(wrapper.props().hoverLeaveDelay).toBe(0)
//         await expect(wrapper.props().themeColor).toBe('red')
//         done()
//     })

//     test('event can be trgger correct', async done => {
//         wrapper = mount(bkNavigation, {
//             propsData: {
//                 'nav-width': 160,
//                 'hover-width': 300,
//                 'side-title': 'testSideTitle',
//                 'header-title': 'testHeaderTitle',
//                 'default-open': true,
//                 'hover-leave-delay': 0,
//                 'theme-color': 'red'
//             }
//         })
//         wrapper.vm.$emit('hover', true)
//         wrapper.vm.$emit('leave', true)
//         wrapper.vm.$emit('toggle', true)
//         wrapper.vm.$emit('toggle-click', true)
//         await expect(wrapper.emitted().hover).toBeTruthy()
//         await expect(wrapper.emitted().leave.length).toBe(1)
//         await expect(wrapper.emitted().toggle[1]).toEqual([true])
//         await expect(wrapper.emitted()['toggle-click']).toBeTruthy()
//         done()
//     })

//     test('slot can be render correct', async done => {
//         const slots = {
//             default: '<div class="default-slot">默认内容插槽</div>',
//             'side-icon': '<div class="side-icon-slot">左侧菜单头部icon插槽</div>',
//             'menu': '<div class="menu-slot">左侧menu插槽</div>',
//             'header-set': '<div class="header-set-slot">右侧头部title右侧内容插槽</div>',
//             'footer': '<div class="footer-slot">右侧底部footer插槽</div>'
//         }
//         wrapper = mount(bkNavigation, { slots })
//         Object.keys(slots).forEach(key => {
//             const slotItem = wrapper.vm.$el.querySelector(`.${key}-slot`)
//             expect(slotItem.classList.contains(`${key}-slot`)).toBe(true)
//         })
//         done()
//     })
// })

describe('navigation-memu/item', () => {
    let wrapperMenu

    test('is create correct', async done => {
        wrapperMenu = mount(createTestComp(`
         <bk-navigation-menu>
            <bk-navigation-menu-item id="test-item-1"></bk-navigation-menu-item>
            <bk-navigation-menu-item id="test-item-2"></bk-navigation-menu-item>
        </bk-navigation-menu>`))
        await expect(wrapperMenu.classes('navigation-menu')).toBe(true)
        await expect(wrapperMenu.vm.$el.querySelectorAll('.navigation-menu-item').length).toBe(2)
        done()
    })

    test('common props can set correct', async done => {
        wrapperMenu = mount(createTestComp(`
         <bk-navigation-menu ref="menu" default-active="test-item-1" :unique-opened="false" :toggle-active="true">
            <bk-navigation-menu-item ref="item-1" id="test-item-1" disabled ></bk-navigation-menu-item>
            <bk-navigation-menu-item ref="item-2" id="test-item-2" group></bk-navigation-menu-item>
        </bk-navigation-menu>`))
        const vm = wrapperMenu.vm
        await expect(vm.$refs.menu.defaultActive).toEqual('test-item-1')
        await expect(vm.$refs.menu.uniqueOpened).toEqual(false)
        await expect(vm.$refs.menu.toggleActive).toEqual(true)
        await expect(vm.$refs['item-1'].id).toEqual('test-item-1')
        await expect(vm.$refs['item-2'].id).toEqual('test-item-2')
        await expect(vm.$refs['item-1'].disabled).toEqual(true)
        await expect(vm.$refs['item-2'].group).toEqual(true)
        done()
    })

    test('theme color can set correct', async done => {
        wrapperMenu = mount(createTestComp(`
         <bk-navigation-menu ref="menu" default-active="test-child-1" sub-menu-open-bg-color="#27282c" item-default-bg-color="#333437" item-active-bg-color="#18b48a">
            <bk-navigation-menu-item ref="item-1" id="test-item-1"></bk-navigation-menu-item>
            <bk-navigation-menu-item ref="item-2" id="test-item-2" :has-child="true">
                <template slot="child">
                    <bk-navigation-menu-item ref="item-child-1" id="test-child-1"></bk-navigation-menu-item>
                </template>
            </bk-navigation-menu-item>
        </bk-navigation-menu>`))
        const vm = wrapperMenu.vm
        // console.info(vm.$refs['item-1'].$el.style)
        await expect(vm.$refs['menu'].$el.style.backgroundColor).toEqual('rgb(51, 52, 55)')
        await expect(vm.$refs['item-2'].$el.querySelector('.navigation-sbmenu-title').style.backgroundColor).toEqual('rgb(39, 40, 44)')
        await expect(vm.$refs['item-child-1'].$el.style.backgroundColor).toEqual('rgb(24, 180, 138)')
        done()
    })

    test('event can be trgger correct', done => {
        wrapperMenu = mount(createTestComp(`
         <bk-navigation-menu ref="menu" :default-active="activeId" sub-menu-open-bg-color="#27282c" item-default-bg-color="#333437" item-active-bg-color="#18b48a">
            <bk-navigation-menu-item @click="handleNavItemClick" ref="item-1" id="test-item-1"></bk-navigation-menu-item>
            <bk-navigation-menu-item ref="item-2" id="test-item-2" :has-child="true" @sub-menu-click="handleSubMenuClick" @open="handleMenuOpen" @close="handleMenuClose">
                <template slot="child">
                    <bk-navigation-menu-item ref="item-child-1" id="test-child-1"></bk-navigation-menu-item>
                </template>
            </bk-navigation-menu-item>
        </bk-navigation-menu>`, {
            data () {
                return {
                    activeId: 'test-child-1',
                    subId: '',
                    openTrigger: false,
                    closeTrigger: false
                }
            },
            methods: {
                handleNavItemClick (id) {
                    this.activeId = id
                },
                handleSubMenuClick (subId) {
                    this.subId = subId
                },
                handleMenuOpen () {
                    this.openTrigger = true
                },
                handleMenuClose () {
                    this.closeTrigger = true
                }
            }
        }))
        const vm = wrapperMenu.vm
        const refItem1 = vm.$refs['item-1']
        const refItem2 = vm.$refs['item-2']
        refItem1.$el.click()
        refItem2.$el.querySelector('.navigation-sbmenu-title').click()
        refItem2.$el.querySelector('.navigation-sbmenu-title').click()
        setTimeout(_ => {
            expect(vm.activeId).toBe('test-item-1')
            expect(vm.subId).toBe('test-item-2')
            expect(vm.openTrigger).toBe(true)
            expect(vm.closeTrigger).toBe(true)
            done()
        }, 30)
    }, 10000)

    test('slot can be render correct', async done => {
        wrapperMenu = mount(createTestComp(`
        <bk-navigation-menu ref="menu" default-active="test-child-1">
           <bk-navigation-menu-item ref="item-1" id="test-item-1">
                <template>
                    <h1 class="test-default-slot">hello world</h1>
                </template>
           </bk-navigation-menu-item>
           <bk-navigation-menu-item ref="item-2" id="test-item-2" :has-child="true">
               <template slot="child">
                   <bk-navigation-menu-item ref="item-child-1" id="test-child-1"></bk-navigation-menu-item>
               </template>
           </bk-navigation-menu-item>
       </bk-navigation-menu>`))
        const vm = wrapperMenu.vm
        await expect(vm.$refs['item-1'].$el.querySelectorAll('.test-default-slot').length).toEqual(1)
        await expect(vm.$refs['item-child-1']).not.toBeUndefined()
        done()
    })
})
