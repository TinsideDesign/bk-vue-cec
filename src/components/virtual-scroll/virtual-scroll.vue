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
    <section class="bk-scroll-home" :class="extCls" @mousewheel="handleWheel" @DOMMouseScroll="handleWheel" ref="scrollHome">
        <main class="bk-scroll-main">
            <ul
                class="bk-scroll-index bk-scroll"
                :style="{
                    height: `${ulHeight}px`,
                    top: `${-totalScrollHeight}px`,
                    width: `${indexWidth}px`
                }"
                v-if="showIndex"
            >
                <li
                    class="bk-scroll-item"
                    v-for="(item, index) in indexList"
                    :key="index"
                    :style="{
                        height: `${itemHeight}px`,
                        top: `${item.top}px`
                    }"
                >
                    <slot :data="item.value" name="index">
                        {{item.value}}
                    </slot>
                </li>
            </ul>
            <ul
                class="bk-scroll"
                ref="scrollMain"
                :style="{
                    height: `${ulHeight}px`,
                    top: `${-totalScrollHeight}px`,
                    width: `${mainWidth}px`,
                    left: `${mainLeft}px`
                }"
            >
                <li
                    class="bk-scroll-item"
                    v-for="item in listData"
                    :key="item.top"
                    :style="{
                        height: `${itemHeight}px`,
                        top: `${item.top}px`,
                        left: `${-bottomScrollDis * (itemWidth - mainWidth) / (mainWidth - bottomScrollWidth)}px`
                    }"
                >
                    <slot :data="item.value"></slot>
                </li>
            </ul>
        </main>
        <canvas class="bk-min-nav" :style="`height: ${visHeight}px;`" ref="minNav"></canvas>
        <span
            ref="scrollNav"
            class="bk-min-nav-slide bk-nav-show"
            v-if="navHeight < visHeight"
            :style="{
                height: `${navHeight}px`,
                top: `${minNavTop}px`
            }"
            @mousedown="startNavMove(visHeight - navHeight)"
        >
        </span>
        <span
            class="bk-min-nav-slide bk-bottom-scroll"
            v-if="bottomScrollWidth < mainWidth"
            :style="{
                left: `${indexWidth + bottomScrollDis}px`,
                width: `${bottomScrollWidth}px`
            }"
            @mousedown="startBottomMove"
        >
        </span>
    </section>
</template>

<script>
    export default {
        name: 'bk-virtual-scroll',
        props: {
            itemHeight: {
                type: Number,
                default: 16
            },
            showIndex: {
                type: Boolean,
                default: false
            },
            // 数据集合
            list: {
                type: Array,
                default: () => ([])
            },
            // 外部设置的 class name
            extCls: {
                type: String,
                default: ''
            }
        },

        data () {
            return {
                ulHeight: 0,
                allListData: [],
                offscreenCanvas: '',
                indexList: [],
                listData: [],
                worker: {},
                mainWidth: 0,
                mainLeft: 0,
                totalHeight: 0,
                itemNumber: 0,
                totalNumber: 0,
                visHeight: 0,
                visWidth: 0,
                totalScrollHeight: 0,
                startMinMapMove: false,
                tempVal: 0,
                minMapTop: 0,
                minNavTop: 0,
                navHeight: 0,
                mapHeight: 0,
                moveRate: 0,
                bottomScrollWidth: Infinity,
                bottomScrollDis: 0,
                itemWidth: 0,
                isScrolling: false,
                isBottomMove: false,
                downPreDefault: false,
                upPreDefault: false,
                indexWidth: 0,
                observer: {}
            }
        },

        watch: {
            list: {
                handler (list) {
                    this.setListData(list)
                },
                deep: true
            }
        },

        mounted () {
            this.initStatus()
            this.initEvent()
            if (this.list.length > 0) this.setListData(this.list)
        },

        beforeDestroy () {
            document.removeEventListener('mousemove', this.minNavMove)
            document.removeEventListener('mouseup', this.moveEnd)
            window.removeEventListener('resize', this.resize)
            if (MutationObserver) this.observer.disconnect()
            this.observer = {}
        },

        methods: {
            initStatus () {
                const mainEle = this.$refs.scrollHome
                const scrollEle = this.$refs.scrollMain
                this.visHeight = mainEle.offsetHeight || 300
                this.visWidth = mainEle.offsetWidth || 300
                const scrollWidth = scrollEle.scrollWidth || 0
                this.itemWidth = scrollWidth
                this.bottomScrollWidth = this.visWidth * this.visWidth / scrollWidth < 20 ? 20 : this.visWidth * this.visWidth / scrollWidth
                const dpr = window.devicePixelRatio || 1
                this.$refs.minNav.width = 8 * dpr
                this.$refs.minNav.height = this.visHeight * dpr
                this.$refs.minNav.getContext('2d').setTransform(dpr, 0, 0, dpr, 0, 0)
            },

            initEvent () {
                document.addEventListener('mousemove', this.minNavMove)
                document.addEventListener('mouseup', this.moveEnd)
                window.addEventListener('resize', this.resize)
                if (MutationObserver) {
                    this.observer = new MutationObserver(this.resize)
                    this.observer.observe(this.$el, {
                        attributes: true,
                        attributeFilter: ['style']
                    })
                }
            },

            resize (event) {
                this.slowExec(() => {
                    const lastHeight = this.visHeight
                    this.initStatus()
                    this.setStatus()
                    this.minMapTop = this.visHeight / lastHeight * this.minMapTop
                    this.minNavTop = this.minMapTop * (this.visHeight - this.navHeight) / (this.mapHeight - this.visHeight / 8)

                    this.totalScrollHeight = (this.mapHeight === this.canvasHeight / 8) ? 0 : (this.minMapTop / (this.mapHeight - this.visHeight / 8) * (this.totalHeight - this.visHeight))
                    this.getListData(this.totalScrollHeight, true)
                })
            },

            handleWheel (event) {
                const isVerticalScroll = event.wheelDeltaX !== undefined ? Math.abs(event.wheelDeltaY) > Math.abs(event.wheelDeltaX) : event.axis === 2
                if (isVerticalScroll) this.handleVerticalScroll(event)
                else this.handleHorizontalScroll(event)
            },

            handleHorizontalScroll (event) {
                event.preventDefault()
                if (this.bottomScrollWidth >= this.mainWidth) return
                const deltaX = -Math.max(-1, Math.min(1, (event.wheelDeltaX || -event.detail)))
                let bottomScrollLeft = this.bottomScrollDis + deltaX * 4
                if (bottomScrollLeft <= 0) bottomScrollLeft = 0
                if (bottomScrollLeft + this.bottomScrollWidth >= this.mainWidth) bottomScrollLeft = this.mainWidth - this.bottomScrollWidth
                this.bottomScrollDis = bottomScrollLeft
                this.$emit('horizontal-scroll', this.indexWidth + bottomScrollLeft)
            },

            handleVerticalScroll (event) {
                const deltaY = Math.max(-1, Math.min(1, (event.wheelDeltaY || -event.detail)))
                const shouldPreDefault = deltaY < 0 ? this.downPreDefault : this.upPreDefault
                if (shouldPreDefault) event.preventDefault()
                if (this.isScrolling || this.itemHeight * this.totalNumber <= this.visHeight) return

                let dis = 0
                if (event.wheelDelta) dis = -1 / 5 * event.wheelDelta
                if (event.detail) dis = event.detail

                let tickGap = deltaY * -2
                if (deltaY === 0) {
                    dis = 0
                    tickGap = 0
                }
                const scrollHeight = this.minMapTop + (dis + tickGap) * (this.mapHeight - this.visHeight / 8) / (this.totalHeight - this.itemHeight * this.itemNumber)

                let totalScrollHeight = 0
                let minMapTop = 0
                let minNavTop = 0

                if (scrollHeight < 0) {
                    totalScrollHeight = 0
                    minMapTop = 0
                    minNavTop = 0
                } else if (scrollHeight >= 0 && scrollHeight <= (this.mapHeight - this.visHeight / 8)) {
                    minMapTop = scrollHeight
                    minNavTop = this.minNavTop + (dis + tickGap) * (this.visHeight - this.navHeight) / (this.totalHeight - this.itemHeight * this.itemNumber)
                    totalScrollHeight = scrollHeight * (this.totalHeight - this.itemHeight * this.itemNumber) / (this.mapHeight - this.visHeight / 8)
                } else {
                    totalScrollHeight = this.totalHeight - this.visHeight
                    minMapTop = this.mapHeight - this.visHeight / 8
                    minNavTop = this.visHeight - this.navHeight
                }

                this.minMapTop = minMapTop
                this.minNavTop = minNavTop
                this.isScrolling = true
                this.getListData(totalScrollHeight)
            },

            scrollPageByIndex (index) {
                let height = this.itemHeight * index
                if (height <= 0) height = 0
                else if (height >= this.totalHeight - this.visHeight) height = this.totalHeight - this.visHeight
                if (this.totalHeight <= this.visHeight) height = 0
                const heightDiff = (this.totalHeight - this.visHeight) || 1
                this.minMapTop = height / heightDiff * (this.mapHeight - this.visHeight / 8)
                this.minNavTop = height / heightDiff * (this.visHeight - this.navHeight)
                this.getListData(height)
            },

            getListData (totalScrollHeight = 0, isResize = false) {
                const postData = {
                    type: 'wheelGetData',
                    totalScrollHeight,
                    isResize,
                    totalHeight: this.totalHeight,
                    itemHeight: this.itemHeight,
                    itemNumber: this.itemNumber,
                    canvasHeight: this.visHeight,
                    minMapTop: this.minMapTop,
                    mapHeight: this.mapHeight
                }
                this.calcList(postData)
            },

            calcList ({ totalScrollHeight, itemHeight, itemNumber, canvasHeight, minMapTop, totalHeight, mapHeight, isResize }) {
                const realHeight = (mapHeight === canvasHeight / 8) ? 0 : (minMapTop / (mapHeight - canvasHeight / 8) * (totalHeight - canvasHeight))
                let startIndex = Math.floor(realHeight / itemHeight)
                const endIndex = startIndex + itemNumber
                startIndex = startIndex > 0 ? startIndex - 1 : 0

                const listData = []
                const indexList = []
                const nums = Math.floor(startIndex * itemHeight / 500000)
                for (let i = startIndex; i <= endIndex; i++) {
                    const top = i * itemHeight - nums * 500000
                    const value = this.allListData[i]
                    if (value) {
                        indexList.push({ top, value: i + 1 })
                        listData.push({ top, value })
                    }
                }

                totalScrollHeight = totalScrollHeight - nums * 500000

                this.indexList = indexList
                this.listData = listData
                this.totalScrollHeight = totalScrollHeight
                const firstIndexObj = this.indexList[0] || {}
                const lastIndexObj = this.indexList[this.indexList.length - 1] || {}
                this.downPreDefault = lastIndexObj.value + 1 < this.totalNumber
                this.upPreDefault = firstIndexObj.value > 1
                this.isScrolling = false
                this.$emit('change', listData.map(x => x.value))
            },

            addListData (list) {
                this.allListData = this.allListData.concat(list)
                const number = this.totalNumber + list.length
                const lastIndexData = this.indexList[this.indexList.length - 1] || { value: 0 }
                if (this.totalNumber - lastIndexData.value <= 3) {
                    this.freshDataScrollBottom(number)
                } else {
                    this.freshDataNoScroll(number)
                }
                this.resize()
            },

            setListData (list) {
                this.allListData = list
                this.freshDataNoScroll(list.length)
                this.resize()
            },

            freshDataScrollBottom (number) {
                this.totalNumber = number
                this.indexWidth = this.showIndex ? (Math.log10(this.totalNumber) + 1) * 7 : 0
                this.setStatus()
                this.scrollPageByIndex(this.totalNumber - this.itemNumber + 1)
            },

            freshDataNoScroll (number) {
                const oldNumber = this.totalNumber
                const oldItemNumber = this.itemNumber
                const oldMapHeight = this.mapHeight
                const oldVisHeight = this.visHeight
                this.totalNumber = number
                this.indexWidth = this.showIndex ? (Math.log10(this.totalNumber) + 1) * 7 : 0
                this.setStatus()
                this.getNumberChangeList({ oldNumber, oldItemNumber, oldMapHeight, oldVisHeight })
            },

            // 通过计算数据变化后，维持当前数据不被刷新
            getNumberChangeList ({ oldNumber, oldItemNumber, oldMapHeight, oldVisHeight }) {
                let minMapTop = this.minMapTop * (oldNumber - oldItemNumber) / ((this.totalNumber - this.itemNumber) || 1) * ((this.mapHeight - this.visHeight / 8) / ((oldMapHeight - oldVisHeight / 8) || 1))
                let totalScrollHeight = minMapTop / ((this.mapHeight - this.visHeight / 8) || 1) * (this.totalHeight - this.visHeight)
                if (minMapTop <= 0 || this.navHeight >= this.visHeight) {
                    minMapTop = 0
                    totalScrollHeight = 0
                } else if (minMapTop > this.mapHeight - this.visHeight / 8) {
                    minMapTop = this.mapHeight - this.visHeight / 8
                    totalScrollHeight = this.totalHeight - this.visHeight
                }
                this.minMapTop = minMapTop
                this.minNavTop = this.minMapTop / ((this.mapHeight - this.visHeight / 8) || 1) * (this.visHeight - this.navHeight)
                this.getListData(totalScrollHeight)
            },

            setStatus () {
                this.totalHeight = this.totalNumber * this.itemHeight
                this.itemNumber = this.totalHeight > this.visHeight ? Math.ceil(this.visHeight / this.itemHeight) : this.totalNumber
                this.ulHeight = this.totalHeight > 400000 ? 1000000 : this.totalHeight
                const heightRate = this.visHeight / this.totalHeight
                const minNavHeight = heightRate * this.visHeight
                this.navHeight = heightRate > 1 ? this.visHeight : (minNavHeight < 20 ? 20 : minNavHeight)
                const moveMaxHeight = this.totalNumber * this.itemHeight / 8
                this.mapHeight = moveMaxHeight < this.visHeight ? moveMaxHeight : this.visHeight
                this.mainWidth = this.visWidth
                if (this.$refs.scrollNav) this.mainWidth -= this.$refs.scrollNav.offsetWidth
                if (this.showIndex) {
                    this.mainWidth -= ((Math.log10(this.totalNumber) + 1) * 7)
                    this.mainLeft = (Math.log10(this.totalNumber) + 1) * 7
                }
            },

            startBottomMove (event) {
                this.tempVal = event.screenX
                this.startMinMapMove = true
                this.isBottomMove = true
            },

            startNavMove (rate) {
                this.moveRate = rate
                this.tempVal = event.screenY
                this.startMinMapMove = true
            },

            minNavMove () {
                if (!this.startMinMapMove) return

                if (this.isBottomMove) {
                    const moveDis = event.screenX - this.tempVal
                    let bottomScrollLeft = this.bottomScrollDis + moveDis
                    if (bottomScrollLeft <= 0) bottomScrollLeft = 0
                    if (bottomScrollLeft + this.bottomScrollWidth >= this.mainWidth) bottomScrollLeft = this.mainWidth - this.bottomScrollWidth
                    this.bottomScrollDis = bottomScrollLeft
                    this.tempVal = event.screenX
                    this.$emit('horizontal-scroll', this.indexWidth + bottomScrollLeft)
                } else {
                    const moveDis = event.screenY - this.tempVal
                    let minMapTop = this.minMapTop + (moveDis / this.moveRate) * (this.mapHeight - this.visHeight / 8)
                    if (minMapTop <= 0) minMapTop = 0
                    if (minMapTop >= (this.mapHeight - this.visHeight / 8)) minMapTop = this.mapHeight - this.visHeight / 8

                    const totalScrollHeight = minMapTop / (this.mapHeight - this.visHeight / 8) * (this.totalHeight - this.visHeight)
                    this.tempVal = event.screenY
                    this.minMapTop = minMapTop
                    this.minNavTop = minMapTop * (this.visHeight - this.navHeight) / (this.mapHeight - this.visHeight / 8)
                    this.slowExec(() => {
                        this.getListData(totalScrollHeight)
                    })
                }
            },

            slowExec (callBack) {
                // 节流，限制触发频率
                const now = +new Date()
                if (now - (this.slowExec.lastTime || 0) >= 100) {
                    this.slowExec.lastTime = now
                    callBack()
                }

                // 保证最后一次能触发
                window.clearTimeout(this.slowExec.timeId)
                this.slowExec.timeId = window.setTimeout(() => {
                    callBack()
                }, 50)
            },

            moveEnd (event) {
                event.preventDefault()
                this.startMinMapMove = false
                this.isBottomMove = false
            }
        }
    }
</script>

<style>
    @import '../../ui/virtual-scroll.css';
</style>
