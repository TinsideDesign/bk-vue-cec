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
 * @file virtual-scroll 组件单测
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import VirtualScroll from '@/components/virtual-scroll'
import { mount } from '@vue/test-utils'
import { createTestComp } from '../helpers'

describe('rate', () => {
    it('render the correct props', async (done) => {
        const handler = jest.fn()
        const wrapper = mount(
            createTestComp(
                `<bk-virtual-scroll ref="numberVirtualScroll"
                    class="number-virtual-scroll"
                    :show-index="true"
                    :show-min-map="false"
                    :item-height="16"
                    @change="listChange"
                >
                    <template slot-scope="item">
                        <span class="item-txt">{{item.data}}</span>
                    </template>
                </bk-virtual-scroll>`,
                {
                    components: {
                        bkVirtualScroll: VirtualScroll
                    },

                    mounted () {
                        this.initList()
                    },

                    methods: {
                        initList () {
                            const vDom = this.$refs.numberVirtualScroll
                            const list = new Array(1000).fill(1)
                            vDom.addListData(list)
                            vDom.getListData()
                        },
                        listChange: handler
                    }
                }
            ),
            { sync: false }
        )
        const vm = wrapper.vm
        const vDom = vm.$refs.numberVirtualScroll

        // 测试数据是否正常
        expect(vDom.listData[0].value).toBe(1)

        // 测试handleWheel方法是否正常调用,change事件是否正常
        vDom.handleWheel({})
        await vm.$nextTick()
        expect(vDom.listData[0].top).toBeGreaterThanOrEqual(30)
        expect(handler).toBeCalled()

        // 测试setListData, scrollPageByIndex方法是否正常调用
        const list = new Array(100).fill(1)
        vDom.setListData(list)
        vDom.getListData()
        await vm.$nextTick()
        vDom.scrollPageByIndex(10)
        await vm.$nextTick()
        expect(vDom.allListData).toBe(list)
        expect(vDom.listData[0].value).toBe(1)
        expect(handler).toBeCalled()
        done()
    })
})
