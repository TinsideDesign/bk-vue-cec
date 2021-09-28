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
 * @file virtual-render
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */
import virtualRender from './v-virtual-render'
import '../../ui/virtual-render.css'
export default {
    name: 'bk-virtual-render',
    directives: {
        virtualRender
    },
    props: {
        className: {
            type: String,
            default: ''
        },
        scrollXName: {
            type: String,
            default: 'bk-scroll-x'
        },
        scrollYName: {
            type: String,
            default: 'bk-scroll-y'
        },
        list: {
            type: Array,
            default: () => []
        },
        lineHeight: {
            type: Number,
            default: 30
        },
        minHeight: {
            type: Number,
            default: 30
        },
        height: {
            type: [Number, String],
            default: '100%'
        },
        width: {
            type: [Number, String],
            default: '100%'
        },
        /** 分组展示，一行数据可能有多条数据 */
        groupItemCount: {
            type: Number,
            default: 1
        },
        /** 预加载行数，避免空白渲染 */
        preloadItemCount: {
            type: Number,
            default: 1
        },
        /** 外层Dom元素需要渲染成的目标元素 */
        renderAs: {
            type: String,
            default: 'div'
        },
        /** 内容层渲染成目标元素 */
        contentAs: {
            type: String,
            default: 'div'
        },
        /**
         * 内置滚动位置
         * 可选：container （最外层容器），content（内容层容器）
         */
        scrollPosition: {
            type: String,
            default: 'content'
        },

        /**
         * 绝对高度 | 实际高估
         * 可选值： auto(根据行高和行数计算) number(外层给定高度，若为0，则不显示)
         */
        abosuteHeight: {
            type: [Number, String],
            default: 'auto'
        }
    },
    data () {
        return {
            startIndex: 0,
            endIndex: 0,
            scrollTop: 1,
            translateY: 0
        }
    },
    computed: {
        listLength () {
            return Math.ceil((this.localList || []).length / this.groupItemCount)
        },
        calcList () {
            return this.localList.slice(
                this.startIndex * this.groupItemCount,
                (this.endIndex + this.preloadItemCount) * this.groupItemCount
            )
        },
        wrapperStyle () {
            return {
                height: typeof this.height === 'number' ? `${this.height}px` : this.height,
                width: typeof this.width === 'number' ? `${this.width}px` : this.width,
                display: 'inline-block'
            }
        },
        innerHeight () {
            return this.abosuteHeight === 'auto' ? this.lineHeight * this.listLength : `${this.abosuteHeight}px`
        },

        innerContentStyle () {
            return {
                top: `${this.scrollTop}px`,
                transform: `translateY(-${this.translateY}px)`
            }
        },

        innerStyle () {
            return {
                height: `${this.innerHeight < this.minHeight ? this.minHeight : this.innerHeight}px`,
                display: this.abosuteHeight === 0 ? 'none' : 'block'
            }
        },

        localList () {
            return (this.list || []).map((item, index) => Object.assign(item, { $index: index }))
        }
    },
    watch: {
        list (val) {
            /** 数据改变时激活当前表单，使其渲染DOM */
            this.$nextTick(() => this.scrollToIndex(0))
        }
    },
    methods: {
        handleScrollCallback (event, startIndex, endIndex, scrollTop) {
            this.startIndex = startIndex
            this.endIndex = endIndex
            this.scrollTop = scrollTop
            this.$emit('content-scroll', event)
            // 设置偏移量，避免行高较大时出现卡顿式的滚动
            this.translateY = scrollTop % this.lineHeight
        },
        scrollToIndex (index) {
            if (index >= 0) {
                const scrollTop = this.lineHeight * index
                this.$el
                    && this.$el.scrollTo({
                        top: scrollTop,
                        behavior: 'smooth'
                    })
            }
        }
    },

    render (h) {
        return h(
            this.renderAs || 'div',
            {
                class: [
                    'bk-virtual-render',
                    this.scrollXName,
                    this.scrollYName,
                    this.className,
                    this.scrollPosition === 'container' ? 'bk-virtual-content' : ''
                ],
                style: {
                    ...this.wrapperStyle,
                    ...(this.scrollPosition === 'container' ? this.innerContentStyle : {})
                }
            },
            [
                this.$slots.beforeContent,
                h(
                    this.contentAs || 'div',
                    {
                        class: [this.scrollPosition === 'content' ? 'bk-virtual-content' : ''],
                        style: this.scrollPosition === 'content' ? this.innerContentStyle : {},
                        directives: [
                            {
                                name: 'virtual-render',
                                value: {
                                    callback: this.handleScrollCallback,
                                    listLength: this.listLength,
                                    lineHeight: this.lineHeight,
                                    startIndex: this.startIndex,
                                    endIndex: this.endIndex
                                }
                            }
                        ]
                    },
                    [
                        this.$scopedSlots.default({
                            data: this.calcList
                        })
                    ]
                ),
                this.$slots.afterContent,
                h('div', {
                    class: ['bk-virtual-section'],
                    style: this.innerStyle
                })
            ]
        )
    }
}
