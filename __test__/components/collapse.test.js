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
 * @file collapse 组件单测
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import Collapse from '@/components/collapse'
import CollapseItem from '@/components/collapse-item'
import { mountComponent } from '../helpers'

describe('Collapse', () => {
    it('render the correct markup', () => {
        const wrapper = mountComponent(Collapse)
        expect(wrapper.classes()).toContain('bk-collapse')
    })
    it('render the correct content', () => {
        const wrapper = mountComponent({
            data () {
                return {
                    activeName: [1]
                }
            },
            components: {
                'bk-collapse': Collapse,
                'bk-collapse-item': CollapseItem
            },
            template: `
                <bk-collapse v-model='activeName'>
                    <bk-collapse-item name="1">
                        方案成熟
                        <div slot="content" class="f13">拥有支撑数百款腾讯业务的经验沉淀，兼容各种复杂的系统架构，生于运维 · 精于运维;</div>
                    </bk-collapse-item>

                    <bk-collapse-item name='2'>
                        覆盖全面
                        <div slot="content" class="f13">
                            从配置管理，到作业执行、任务调度和监控自愈，再通过运维大数据分析辅助运营决策，全方位覆盖业务运营的全周期保障管理。
                        </div>
                    </bk-collapse-item>

                    <bk-collapse-item name='3'>
                        开放平台
                        <div slot="content" class="f13">
                            开放的PaaS，具备强大的开发框架和调度引擎，以及完整的运维开发培训体系，助力运维快速转型升级。
                        </div>
                    </bk-collapse-item>

                    <bk-collapse-item name='4'>
                        高效运营
                        <div slot="content" class="f13">
                            通过蓝鲸智云体系，能够帮助企业快速实现运维基础服务自动化，从而加速DevOps转型实现工具文化，最大化提高运营效率。
                        </div>
                    </bk-collapse-item>
                </bk-collapse>
            `
        })
        expect(wrapper.find('.bk-collapse-item').exists()).toBe(true)
        expect(wrapper.findAll('.bk-collapse-item').at(0).classes('bk-collapse-item-active')).toBe(true)
        expect(wrapper.findAll('.bk-collapse-item').at(1).classes('bk-collapse-item-active')).toBe(false)
        expect(wrapper.html()).toContain('<div class="f13">拥有支撑数百款腾讯业务的经验沉淀，兼容各种复杂的系统架构，生于运维 · 精于运维;</div>')
    })
    it('accordion props is correct', () => {
        const wrapper = mountComponent({
            components: {
                'bk-collapse': Collapse,
                'bk-collapse-item': CollapseItem
            },
            template: `
                <bk-collapse accordion>
                    <bk-collapse-item name="1">
                        方案成熟
                        <div slot="content" class="f13">拥有支撑数百款腾讯业务的经验沉淀，兼容各种复杂的系统架构，生于运维 · 精于运维</div>
                    </bk-collapse-item>

                    <bk-collapse-item name="2">
                        覆盖全面
                        <div slot="content" class="f13">
                            从配置管理，到作业执行、任务调度和监控自愈，再通过运维大数据分析辅助运营决策，全方位覆盖业务运营的全周期保障管理。
                        </div>
                    </bk-collapse-item>

                    <bk-collapse-item name="3">
                        开放平台
                        <div slot="content" class="f13">
                            开放的PaaS，具备强大的开发框架和调度引擎，以及完整的运维开发培训体系，助力运维快速转型升级。
                        </div>
                    </bk-collapse-item>

                    <bk-collapse-item name="4">
                        高效运营
                        <div slot="content" class="f13">
                            通过蓝鲸智云体系，能够帮助企业快速实现运维基础服务自动化，从而加速DevOps转型实现工具文化，最大化提高运营效率。
                        </div>
                    </bk-collapse-item>
                </bk-collapse>
            `
        })
        wrapper.findAll('.bk-collapse-item').at(0).find('.bk-collapse-item-header').trigger('click')
        expect(wrapper.findAll('.bk-collapse-item').at(0).classes('bk-collapse-item-active')).toBe(true)
        expect(wrapper.findAll('.bk-collapse-item').at(1).classes('bk-collapse-item-active')).toBe(false)

        wrapper.findAll('.bk-collapse-item').at(1).find('.bk-collapse-item-header').trigger('click')
        expect(wrapper.findAll('.bk-collapse-item').at(0).classes('bk-collapse-item-active')).toBe(false)
        expect(wrapper.findAll('.bk-collapse-item').at(1).classes('bk-collapse-item-active')).toBe(true)
    })
})
