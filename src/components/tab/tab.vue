<!--
 * Tencent is pleased to support the open source community by making
 * 科技内在设计（T-inside） available.
 *
 * Copyright (C) 2021 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * 科技内在设计（T-inside） is licensed under the MIT License.
 *
 * License for 科技内在设计（T-inside）:
 *
 *
 * Terms of the MIT License:
 * ---------------------------------------------------
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
 * to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of
 * the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
 * THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
-->

<template>
    <div :style="tabStyle"
        :class="['bk-tab', tabPosition === 'top' ? `bk-tab-${type}` : `position-${tabPosition}`, extCls]">
        <div class="bk-tab-header"
            :style="headerStyle"
            ref="tabHeader"
            v-show="showHeader">
            <div :style="{ height: `${labelHeight}px`, lineHeight: `${labelHeight}px` }"
                class="bk-tab-header-setting"
                :class="{
                    'has-setting': $slots.setting
                }">
                <slot name="setting"></slot>
            </div>
            <div class="bk-tab-label-wrapper"
                ref="labelWrapper"
                :class="{
                    'has-scroller': scrollState.show && !isSidePosition,
                    'has-add': (addable || hasAddBtnSlot) && !isSidePosition
                }"
                :style="{
                    padding: scrollState.show && !isSidePosition ? `0 ${addCustomRect.width + 24}px 0 24px` : undefined
                }">
                <ul ref="labelList"
                    :class="['bk-tab-label-list', { 'bk-tab-label-list-has-bar': hasActiveBar }]"
                    :style="tabLabelListStyle">
                    <li class="bk-tab-label-item"
                        v-for="(panel, index) in visiblePanels"
                        is="bk-tab-label"
                        ref="tabLabel"
                        :data-name="panel.name"
                        :style="{ lineHeight: `${labelHeight}px` }"
                        :class="{
                            active: panel.name === localActive,
                            'is-first': index === 0,
                            'is-last': index === (visiblePanels.length - 1),
                            'is-disabled': panel.disabled,
                            'is-dragging': dragStartIndex === index,
                            'is-dragenter': dragenterIndex === index && (index !== dragStartIndex && panel.sortable),
                            'is-unsortable': dragenterIndex === index && !panel.sortable
                        }"
                        :draggable="sortable && panel.sortable"
                        @dragstart.native="dragStart(index,$event)"
                        @dragenter.native.prevent="dragenter(index,$event)"
                        @dragleave.native.prevent
                        @dragover.native.prevent
                        @dragend.native.prevent="dragend(index,$event)"
                        @drop.native.prevent="drop(index,$event)"
                        :panel="panel"
                        :index="index"
                        :closable="closable"
                        :is-side-position="isSidePosition"
                        :key="panel.name + index"
                        @mouseenter.native.passive="handleLabelHover(panel)"
                        @mouseleave.native.passive="handleClearHoverTimer(panel)">
                    </li>
                </ul>
                <i class="bk-tab-add-controller bk-icon icon-plus"
                    :class="{
                        'left-border': !visiblePanels.length,
                        'next-right': addShowNextRight
                    }"
                    :style="{ height: `${labelHeight}px`, lineHeight: `${labelHeight}px` }"
                    v-if="addable && !isSidePosition && !hasAddBtnSlot"
                    ref="addController"
                    @click="handleAddPanel">
                </i>
                <div class="bk-tab-add-custom"
                    :class="{ 'next-right': addShowNextRight }"
                    ref="addCustom"
                    :style="{
                        height: `${(scrollState.show && !isSidePosition) ? labelHeight - 1 : labelHeight - 2}px`,
                        lineHeight: `${labelHeight}px`
                    }"
                    v-if="hasAddBtnSlot">
                    <slot name="add"></slot>
                </div>
                <template v-if="scrollState.show">
                    <i class="bk-tab-scroll-controller prev bk-icon icon-angle-left"
                        :style="{ height: `${labelHeight - 1}px`, lineHeight: `${labelHeight}px` }"
                        ref="prevController"
                        :class="{
                            'disabled': scrollState.position === 'left'
                        }"
                        @click="stepToPrev">
                    </i>
                    <i class="bk-tab-scroll-controller next bk-icon icon-angle-right"
                        :style="{
                            height: `${labelHeight - 1}px`,
                            lineHeight: `${labelHeight}px`,
                            right: (hasAddBtnSlot || addable)
                                ? `${addShowNextRight ? 0 : (addCustomRect.width || 40)}px`
                                : undefined
                        }"
                        ref="nextController"
                        :class="{
                            'disabled': scrollState.position === 'right'
                        }"
                        @click="stepToNext">
                    </i>
                </template>
            </div>
        </div>
        <div class="bk-tab-section" ref="tabSection">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import { debounce } from 'throttle-debounce'
    import { addResizeListener, removeResizeListener } from '@/utils/resize-events'
    import bkTabLabel from './bk-tab-label'

    export default {
        name: 'bk-tab',
        components: {
            bkTabLabel
        },
        props: {
            active: {
                type: [String, Number],
                default: ''
            },
            sortable: {
                type: Boolean,
                default: false
            },
            sortType: {
                type: String,
                default: 'replace'
            },
            type: {
                type: String,
                default: 'border-card',
                validator (val) {
                    return ['card', 'border-card', 'unborder-card', 'vertical-card'].includes(val)
                }
            },
            tabPosition: {
                type: String,
                default: 'top',
                validator (val) {
                    return ['left', 'right', 'top'].includes(val)
                }
            },
            scrollStep: {
                type: Number,
                default: 200
            },

            /**
             * 是否校验ActiveName
             * true：如果active匹配不到，默认激活第一个Tab，触发tab-change
             * false：active匹配不到不显示
             */
            validateActive: {
                type: Boolean,
                default: true
            },
            closable: Boolean,
            addable: Boolean,
            beforeToggle: Function,
            // 外部设置的 class name
            extCls: {
                type: String,
                default: ''
            },
            showHeader: {
                type: Boolean,
                default: true
            },
            changeOnHover: Boolean,
            changeOnHoverDelay: {
                type: Number,
                default: 1000
            },
            // tab label 高度，最小42px，默认50px
            labelHeight: {
                type: Number,
                default: 50,
                validator (val) {
                    // return val >= 42
                    if (val < 42) {
                        console.error('选项卡 label 的高度，最小值为 42')
                        return false
                    }
                    return true
                }
            },
            activeBar: {
                type: Object,
                default: () => ({
                    position: 'bottom',
                    height: '2px'
                })
            },
            // 新增按钮是否显示在右边滚动按钮左边
            addShowNextRight: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                isTab: true,
                localActive: this.active,
                scrollState: {
                    show: false,
                    position: 'left',
                    offset: 0,
                    basicStep: this.scrollStep,
                    wrapperRect: null,
                    listRect: null
                },
                panelInstance: [],
                dragenterIndex: -1,
                dragStartIndex: -1,
                draggingEle: null,
                guid: Math.random().toString(16).substr(4) + Math.random().toString(16).substr(4),
                resizeHandler: null,
                promise: {
                    toggle: {
                        previousPanel: null,
                        rejector: null
                    }
                },
                hoverTimer: null,
                activeBarStyle: {
                    left: 0,
                    width: 0,
                    height: 0,
                    transform: '',
                    top: '',
                    bottom: ''
                },
                // 自定义新增按钮的宽度
                addCustomRect: {
                    width: 0
                }
            }
        },
        computed: {
            panelNames () {
                return this.panelInstance.map(panel => panel.name)
            },
            activePanel () {
                return this.panelInstance.find(panel => panel.name === this.localActive)
            },
            visiblePanels () {
                return this.panelInstance.filter(panel => panel.visible)
            },
            tabStyle () {
                if (this.isSidePosition) {
                    const paddingValue = 21
                    return {
                        minHeight: `${this.labelHeight * 4 + paddingValue}px`
                    }
                }
                return {}
            },
            headerStyle () {
                if (this.tabPosition === 'top') {
                    const diffValue = this.type === 'border-card' ? 2 : 1
                    return {
                        height: `${this.labelHeight}px`,
                        backgroundImage: `linear-gradient(transparent ${this.labelHeight - diffValue}px, #dcdee5 1px)`
                    }
                }
                return {}
            },
            isSidePosition () {
                return ['left', 'right'].includes(this.tabPosition)
            },
            isEmpty () {
                return this.panelInstance.length < 1
            },
            hasActiveBar () {
                return (this.type === 'unborder-card' || this.isSidePosition) && !this.isEmpty
            },
            tabLabelListStyle () {
                if (this.isEmpty) {
                    return {}
                }
                if (this.hasActiveBar) {
                    return {
                        transform: `translateX(${this.scrollState.offset}px)`,
                        height: `${this.labelHeight}px`,
                        '--activeBarTop': this.activeBarStyle.top,
                        '--activeBarBottom': this.activeBarStyle.bottom,
                        '--activeBarLeft': this.activeBarStyle.left,
                        '--activeBarWidth': this.activeBarStyle.width,
                        '--activeBarHeight': this.activeBarStyle.height,
                        '--activeBarTransform': this.activeBarStyle.transform
                    }
                }
                return {
                    transform: `translateX(${this.scrollState.offset}px)`,
                    height: `${this.labelHeight}px`
                }
            },
            // 是否存在自定义新增按钮
            hasAddBtnSlot () {
                return !!this.$slots && !!this.$slots.add
            }
        },
        watch: {
            panelNames (names) {
                this.checkActiveName()
            },
            active (active) {
                this.updateActiveBarPosition(active)
                if (this.localActive !== active) {
                    this.localActive = active
                    if (this.promise.toggle.rejector) {
                        this.promise.toggle.rejector(false)
                        this.clearToggleStatus()
                    }
                }
            },
            localActive (localActive) {
                if (localActive !== this.active) {
                    this.$emit('update:active', localActive)
                    this.$emit('tab-change', localActive, this.activePanel)
                    this.updateActivePosition(localActive)
                }
            },
            showHeader (value) {
                if (value) {
                    this.resizeHandler()
                }
            },
            tabPosition () {
                this.updateActiveBarPosition(this.localActive)
            },
            'scrollState.show' (isShow) {
                this.$emit('scroll-show-change', isShow)
            }
        },
        created () {
            this.resizeHandler = debounce(100, this.calculateScroller)
        },
        mounted () {
            this.updateActiveBarPosition(this.localActive)
            addResizeListener(this.$refs.labelList, this.resizeHandler)
            addResizeListener(this.$refs.labelWrapper, this.resizeHandler)
            this.caluclateVerticalPadding()
        },
        beforeDestroy () {
            removeResizeListener(this.$refs.labelList, this.resizeHandler)
            removeResizeListener(this.$refs.labelWrapper, this.resizeHandler)
        },
        methods: {
            caluclateVerticalPadding () {
                if (this.type !== 'vertical-card') return
                this.$nextTick(() => {
                    const width = this.$refs.tabHeader.offsetWidth
                    this.$refs.tabSection.style[`padding-${this.verticalPosition}`] = `${width + 20}px`
                })
            },
            registerPanel (panel) {
                this.panelInstance.push(panel)
            },
            deletePanel (panel) {
                const index = this.panelInstance.indexOf(panel)
                if (index !== -1) {
                    this.panelInstance.splice(index, 1)
                }
            },
            async togglePanel (panel) {
                if (panel.disabled) {
                    return false
                }

                this.handleClearHoverTimer()

                const toggleStatus = this.promise.toggle
                if (panel.name === this.localActive) {
                    if (toggleStatus.rejector) {
                        toggleStatus.rejector(false)
                    }
                    return false
                }
                if (typeof this.beforeToggle === 'function') {
                    // 如果上一个面板切换未完成，则取消上一个面板的切换
                    if (toggleStatus.previousPanel) {
                        if (toggleStatus.previousPanel === panel) {
                            return false
                        } else {
                            toggleStatus.rejector(false)
                        }
                    }
                    try {
                        const shouldToggle = await new Promise(async (resolve, reject) => {
                            toggleStatus.previousPanel = panel
                            toggleStatus.rejector = reject
                            const confirmed = await this.beforeToggle(panel.name, panel)
                            confirmed ? resolve(confirmed) : reject(confirmed)
                        })
                        if (shouldToggle) {
                            this.localActive = panel.name
                        }
                    } catch (e) {
                        console.log('Previous tab toggle canceled')
                    } finally {
                        this.clearToggleStatus()
                    }
                } else {
                    this.localActive = panel.name
                }
            },
            clearToggleStatus () {
                this.promise.toggle = {
                    previousPanel: null,
                    rejector: null
                }
            },
            // 选项卡发生变化时，判断当前选中项是否可用
            checkActiveName () {
                if (this.validateActive && !this.panelNames.includes(this.localActive)) {
                    const newActivePanel = this.panelInstance.length ? this.panelInstance[0] : null
                    this.localActive = newActivePanel ? newActivePanel.name : ''
                }
            },
            // 计算是否需要滚动
            calculateScroller () {
                if (!this.showHeader) {
                    return false
                }
                this.$nextTick(() => {
                    const { labelWrapper, labelList, addController } = this.$refs
                    const labelWrapperRect = labelWrapper.getBoundingClientRect()
                    const labelListRect = labelList.getBoundingClientRect()
                    const addControllerRect = addController ? addController.getBoundingClientRect() : { width: 0 }
                    this.addCustomRect = this.hasAddBtnSlot ? this.$refs.addCustom.getBoundingClientRect() : { width: 0 }
                    this.scrollState.show = (labelListRect.width + addControllerRect.width + this.addCustomRect.width) > labelWrapperRect.width
                    if (!this.scrollState.show) { // 如果不滚动，则恢复至原始位置
                        this.scrollState.offset = 0
                        this.scrollState.position = 'left'
                    } else { // 如果需要滚动, 计算(补偿)滚动位置
                        this.compensateOffset(labelWrapperRect, labelListRect)
                    }
                    this.scrollState.wrapperRect = labelWrapperRect
                    this.scrollState.listRect = labelListRect
                    this.updateActivePosition(this.localActive)
                })
            },
            // 计算滚动(补偿)位置
            compensateOffset (newWrapperRect, newListRect) {
                const oldWrapperRect = this.scrollState.wrapperRect
                if (!oldWrapperRect) {
                    return false
                }
                const overplusWidth = newWrapperRect.width - this.scrollState.offset - newListRect.width
                if (overplusWidth > 0) {
                    this.scrollState.offset = newWrapperRect.width - newListRect.width - this.getControllerWidth()
                    this.scrollState.position = 'right'
                } else {
                    this.scrollState.position = this.scrollState.position === 'left' ? 'left' : 'middle'
                }
            },
            getControllerWidth () {
                return this.getLeftControllerWidth() + this.getRightControllerWidth()
            },
            getLeftControllerWidth () {
                const { prevController } = this.$refs
                const controllers = [prevController]
                let width = 0
                controllers.forEach(controller => {
                    width += controller ? controller.offsetWidth : 0
                })
                return width
            },
            getRightControllerWidth () {
                const { nextController, addController } = this.$refs
                const controllers = [nextController, addController]
                let width = 0
                controllers.forEach(controller => {
                    width += controller ? controller.offsetWidth : 0
                })
                if (this.hasAddBtnSlot) {
                    this.addCustomRect = this.hasAddBtnSlot ? this.$refs.addCustom.getBoundingClientRect() : { width: 0 }
                    width += this.addCustomRect.width
                }
                return width
            },
            updateActiveBarPosition (active) {
                if (!this.showHeader) {
                    return false
                }
                this.$nextTick(() => {
                    // 直接查找 html el 元素
                    // const index = this.visiblePanels.findIndex(item => item.name === active)
                    const panel = this.$refs.tabLabel.find(item => {
                        if (item && item.$el) {
                            // number类型数据添加到dom会转成字符串
                            const newActive = Object.prototype.toString.call(active) === '[object Number]' ? active + '' : active
                            return item.$el.dataset.name === newActive
                        }
                    })
                    if (panel) {
                        const tabLabel = panel.$el
                        const tabLabelRect = tabLabel.getBoundingClientRect()
                        if (!this.isSidePosition) {
                            // 说明 tab 的父容器是 display none 的，获取不到高宽
                            if (tabLabelRect.width === 0 && tabLabelRect.height === 0) {
                                tabLabel.classList.add('simulate-border-bottom')
                            } else {
                                tabLabel.classList.remove('simulate-border-bottom')
                            }

                            this.activeBarStyle.width = `${tabLabelRect.width - 24}px`
                            this.activeBarStyle.height = this.activeBar.height
                            this.activeBarStyle.transform = `translateX(${tabLabel.offsetLeft + 12}px)`
                            this.activeBarStyle.left = 0
                            if (this.activeBar.position === 'top') {
                                this.activeBarStyle.top = '0px'
                                this.activeBarStyle.bottom = 'auto'
                            } else {
                                this.activeBarStyle.top = 'auto'
                                this.activeBarStyle.bottom = '0px'
                            }
                        } else {
                            if (tabLabelRect.width === 0 && tabLabelRect.height === 0) {
                                tabLabel.classList.add('simulate-border-right')
                            } else {
                                tabLabel.classList.remove('simulate-border-right')
                            }
                            this.activeBarStyle.width = '2px'
                            this.activeBarStyle.height = `${tabLabelRect.height || 50}px`
                            this.activeBarStyle.transform = `translateY(${tabLabel.offsetTop}px)`
                            if (this.tabPosition === 'right') {
                                this.activeBarStyle.left = 0
                            } else {
                                this.activeBarStyle.left = `${tabLabelRect.width - 2}px`
                            }
                        }
                    }
                })
            },
            updateActivePosition (active) {
                if (!this.scrollState.show || !this.showHeader) {
                    return false
                }
                this.$nextTick(() => {
                    const index = this.panelNames.indexOf(active)
                    if (index !== -1) {
                        const { wrapperRect, listRect } = this.scrollState
                        const tabLabel = this.$refs.tabLabel[index].$el
                        const tabLabelRect = tabLabel.getBoundingClientRect()
                        const labelWrapperWidth = wrapperRect.width - this.getControllerWidth()
                        const leftThreshold = tabLabel.offsetLeft
                        const rightThreshold = Math.abs(tabLabel.offsetLeft - labelWrapperWidth + tabLabelRect.width)
                        const isLeftOutside = tabLabelRect.left < wrapperRect.left + this.getLeftControllerWidth()
                        const isRightOutside = tabLabelRect.right > wrapperRect.right - this.getRightControllerWidth()
                        if (isLeftOutside) {
                            this.scrollState.offset = -1 * leftThreshold
                            this.scrollState.position = leftThreshold ? 'middle' : 'left'
                        } else if (isRightOutside) {
                            this.scrollState.offset = -1 * rightThreshold
                            this.scrollState.position = listRect.width - rightThreshold === labelWrapperWidth ? 'right' : 'middle'
                        }
                    }
                })
            },
            stepToPrev () {
                const {
                    position,
                    basicStep,
                    offset
                } = this.scrollState
                if (position === 'left') {
                    return false
                }
                let newOffset = offset + basicStep
                if (newOffset > 0) {
                    newOffset = 0
                    this.scrollState.position = 'left'
                } else {
                    this.scrollState.position = 'middle'
                }
                this.scrollState.offset = newOffset
            },
            stepToNext () {
                const {
                    position,
                    basicStep,
                    wrapperRect,
                    listRect,
                    offset
                } = this.scrollState
                if (position === 'right') {
                    return false
                }
                const controllerWidth = this.getControllerWidth()
                let newOffset = offset - basicStep
                if (wrapperRect.width - controllerWidth - newOffset > listRect.width) {
                    newOffset = wrapperRect.width - listRect.width - controllerWidth
                    this.scrollState.position = 'right'
                } else {
                    this.scrollState.position = 'middle'
                }
                this.scrollState.offset = newOffset
            },
            handleAddPanel () {
                this.$emit('add-panel')
            },
            handleClosePanel (index, panel) {
                this.$emit('close-panel', index, panel)
            },
            handleLabelHover (panel) {
                if (!this.changeOnHover || panel.disabled || panel.name === this.localActive) {
                    return false
                }
                this.handleClearHoverTimer()
                this.hoverTimer = setTimeout(() => {
                    this.togglePanel(panel)
                }, this.changeOnHoverDelay)
            },
            handleClearHoverTimer () {
                this.hoverTimer && clearTimeout(this.hoverTimer)
                this.hoverTimer = null
            },
            dragStart (index, $event) {
                this.dragStartIndex = index
                this.draggingEle = this.guid
                // 拖动鼠标效果
                $event.dataTransfer.effectAllowed = 'move'
                // $event.dataTransfer.setData('text/plain', index)
                this.$emit('on-drag-tab', index, $event)
            },
            dragenter (index) {
                // 缓存目标元素索引，方便添加样式
                if (this.distinctRoots(this.draggingEle, this.guid)) {
                    this.dragenterIndex = index
                }
            },
            dragend () {
                this.dragenterIndex = -1
                this.dragStartIndex = -1
                this.draggingEle = null
            },
            drop (index, $event) {
                // 目标元素不可接受拖动，返回
                if (!this.visiblePanels[index].sortable) {
                    return false
                }
                // 不是同一个tab，返回——暂时不支持跨tab拖动
                if (!this.distinctRoots(this.draggingEle, this.guid)) {
                    return false
                }
                // 如果是插队模式
                if (this.sortType === 'insert') {
                    if (this.dragStartIndex < index) {
                        this.visiblePanels.splice(index + 1, 0, this.visiblePanels[this.dragStartIndex])
                        this.visiblePanels.splice(this.dragStartIndex, 1)
                    } else if (this.dragStartIndex > index) {
                        this.visiblePanels.splice(index, 0, this.visiblePanels[this.dragStartIndex])
                        this.visiblePanels.splice(this.dragStartIndex + 1, 1)
                    } else {
                        return false
                    }
                } else {
                    this.swapArr(this.visiblePanels, this.dragStartIndex, index)
                }
                this.$emit('sort-change', this.dragStartIndex, index)
                // tab标签 底下的蓝色 状态线，异步更新
                let timer = setTimeout(() => {
                    this.updateActiveBarPosition(this.localActive)
                    clearTimeout(timer)
                    timer = null
                }, 200)
            },
            swapArr (arr, a, b) {
                const swap = arr[a]
                arr[a] = arr[b]
                arr[b] = swap
            },
            /**
             * @description  判断拖动的元素是否是在同一个tab。
             *               使用guid，相比 el1.parentNode === el2.parentNode 判断，性能要高
             * @param el1 {string} 拖动的元素
             * @param el2 {string}  触发的元素
             * @return {boolean}
             */
            distinctRoots (el1, el2) {
                return el1 === el2
            }
        }
    }
</script>

<style>
    @import '../../ui/tab.css';
</style>
