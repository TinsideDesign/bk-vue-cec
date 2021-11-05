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
 * @file tab 组件单测
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import bkTab from '@/components/tab'
import bkTabPanel from '@/components/tab-panel'
import { mountComponent, createTestComp } from '../helpers'

describe('bkTab', () => {
    it('test props of bkTab', async done => {
        const wrapper = await mountComponent(createTestComp(`
            <bk-tab active.sync="mission" type="unborder-card" tab-position="top" :closable="true" :addable="true">
                <bk-tab-panel
                    v-for="(panel, index) in panels"
                    v-bind="panel"
                    :key="index">
                </bk-tab-panel>
            </bk-tab>`, {
            components: {
                bkTab,
                bkTabPanel
            },
            data () {
                return {
                    panels: [
                        { name: 'mission', label: '任务报表' },
                        { name: 'config', label: '加速配置' }
                    ]
                }
            }
        }))

        expect(wrapper.find('.active').text()).toBe('任务报表')
        expect(wrapper.classes()).toContain('bk-tab-unborder-card')
        expect(wrapper.html()).toContain('<i class="bk-tab-close-controller">')
        expect(wrapper.html()).toContain('<i class="bk-tab-add-controller bk-icon icon-plus"></i>')

        done()
    })

    it('test slots of bkTab', () => {
        const wrapper = mountComponent(bkTab, {
            slots: {
                setting: '<i class="setting-icon bk-icon icon-cog-shape"></i>'
            }
        })
        expect(wrapper.html()).toContain('<div class="bk-tab-header-setting has-setting"><i class="setting-icon bk-icon icon-cog-shape"></i></div>')
    })

    test('test trigger events of bkTab', async done => {
        const wrapper = mountComponent(bkTab)
        wrapper.vm.$emit('tab-change', true)
        wrapper.vm.$emit('close-panel', true)
        wrapper.vm.$emit('add-panel', true)
        await expect(wrapper.emitted()['tab-change']).toBeTruthy()
        await expect(wrapper.emitted()['close-panel']).toBeTruthy()
        await expect(wrapper.emitted()['add-panel']).toBeTruthy()
        done()
    })

    it('test props of bkTab-panel', async () => {
        const wrapper = await mountComponent(createTestComp(`
            <bk-tab active.sync="mission">
                <bk-tab-panel
                    v-for="(panel, index) in panels"
                    v-bind="panel"
                    :key="index">
                </bk-tab-panel>
            </bk-tab>`, {
            components: {
                bkTab,
                bkTabPanel
            },
            data () {
                return {
                    panels: [
                        { name: 'mission', label: '任务报表', closable: true, visible: true, renderDirective: 'if' },
                        { name: 'config', label: '加速配置', closable: true, visible: false, renderDirective: 'if' },
                        { name: 'history', label: '历史版本', closable: true, visible: true, renderDirective: 'show' }
                    ]
                }
            }
        }))
        expect(wrapper.html()).toContain('<i class="bk-tab-close-controller">')
        expect(wrapper.html()).not.toContain('加速配置')
        expect(wrapper.html()).toContain('历史版本')
    })

    it('test props of bkTab-panel', async () => {
        const wrapper = await mountComponent(createTestComp(`
            <bk-tab active.sync="mission">
                <bk-tab-panel
                    v-for="(panel, index) in panels"
                    v-bind="panel"
                    :key="index">
                    <template slot="label">
                        <i class="panel-icon bk-icon icon-cog-shape"></i>
                        <span class="panel-name">{{panel.name}}</span>
                    </template>
                </bk-tab-panel>
            </bk-tab>`, {
            components: {
                bkTab,
                bkTabPanel
            },
            data () {
                return {
                    panels: [
                        { name: 'mission', label: '任务报表' }
                    ]
                }
            }
        }))
        expect(wrapper.html()).not.toContain('任务配置')
        expect(wrapper.html()).toContain('<i class="panel-icon bk-icon icon-cog-shape"></i> <span class="panel-name">mission</span>')
    })
})
