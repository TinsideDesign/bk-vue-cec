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
    <bk-dialog
        :value="dialog.show"
        :width="dialog.width"
        :show-footer="false"
        draggable
        ext-cls="version-detail-dialog"
        @value-change="handleValueChange">
        <template>
            <div class="bk-version" v-bkloading="{ isLoading: loading }">
                <div class="bk-version-left"
                    data-tag="resizeTarget"
                    :style="{ 'flex-basis': left.width + 'px', width: left.width + 'px', height: dialog.height + 'px' }">
                    <div class="left-fill fill-top"></div>
                    <ul class="left-list" ref="leftList">
                        <li class="left-list-item"
                            :class="{ 'item-active': index === active, 'border-after': index !== active }"
                            v-for="(item,index) in versionList"
                            :key="index"
                            @click="index !== active && handleItemClick(index)">
                            <slot name="item" :version="{ item, index }">
                                <span class="item-title" v-bk-overflow-tips="{ content: item[versionTitleName], placement: 'right' }">{{item[versionTitleName]}}</span>
                                <span class="item-date">{{item[versionSubTitleName]}}</span>
                                <span v-if="item[versionTitleName] === currentVersion" class="item-current"> {{ '当前版本' }} </span>
                            </slot>
                        </li>
                        <li class="left-list-loading border-after"
                            v-if="!finished"
                            v-bkloading="{ isLoading: left.loading, size: 'mini', theme: 'default' }">
                        </li>
                        <li class="left-list-fill border-after"></li>
                    </ul>
                    <div class="left-fill fill-bottom"></div>
                    <div class="resize-line"
                        @mousedown="handleMouseDown"
                        @mousemove="handleMouseMove"
                        @mouseout="handleMouseOut">
                        <div class="drag-content"></div>
                    </div>
                </div>
                <div class="bk-version-right" :style="{ height: dialog.height + 'px' }">
                    <slot :detail="versionDetail">
                        {{versionDetail}}
                    </slot>
                </div>
            </div>
        </template>
    </bk-dialog>
</template>
<script>
    import bkOverflowTips from '../../directives/overflow-tips'
    import bkloading from '../loading/directive'
    import BkDialog from '../dialog'
    export default {
        name: 'bk-version-detail',
        components: {
            BkDialog
        },
        directives: {
            bkOverflowTips,
            bkloading
        },
        props: {
            // 是否显示
            show: Boolean,
            versionList: {
                type: Array,
                default () {
                    return []
                }
            },
            versionDetail: {
                type: String,
                default: ''
            },
            // 是否拿到全部数据
            finished: {
                type: Boolean,
                default: true
            },
            // 获取日志标题列表数据接口
            getVersionList: {
                type: Function,
                default: () => () => {}
            },
            // 获取日志详情接口
            getVersionDetail: {
                type: Function,
                default: () => () => {}
            },
            currentVersion: {
                type: String,
                default: ''
            },
            minLeftWidth: {
                type: Number,
                default: 180
            },
            maxLeftWidth: {
                type: Number,
                default: 500
            },
            versionTitleName: {
                type: String,
                default: 'title'
            },
            versionSubTitleName: {
                type: String,
                default: 'date'
            }
        },
        data () {
            return {
                left: {
                    loading: false,
                    width: this.minLeftWidth || 180,
                    scroll: false
                },
                dialog: {
                    width: 850,
                    height: 520,
                    show: false
                },
                active: 0,
                loading: false,
                unWatchShow: null
            }
        },
        mounted () {
            this.dialog.show = this.show
            this.$refs.leftList.addEventListener('scroll', this.handleLeftScroll, { passive: true })
            this.unWatchShow = this.$watch('show', this.handleOnShowChange, { immediate: true })
        },
        beforeDestroy () {
            this.handleValueChange(false)
            document.body.style.cursor = ''
            this.$refs.leftList.removeEventListener('scroll', this.handleLeftScroll, { passive: true })
            this.unWatchShow && this.unWatchShow()
        },
        methods: {
            handleMouseDown (e) {
                let target = event.target
                while (target && target.dataset['tag'] !== 'resizeTarget') {
                    target = target.parentNode
                }
                const rect = target.getBoundingClientRect()
                document.onselectstart = function () {
                    return false
                }
                document.ondragstart = function () {
                    return false
                }
                const handleMouseMove = (event) => {
                    this.left.width = Math.min(Math.max(this.minLeftWidth, event.clientX - rect.left), this.maxLeftWidth)
                }
                const handleMouseUp = () => {
                    document.body.style.cursor = ''
                    document.removeEventListener('mousemove', handleMouseMove)
                    document.removeEventListener('mouseup', handleMouseUp)
                    document.onselectstart = null
                    document.ondragstart = null
                }
                document.addEventListener('mousemove', handleMouseMove)
                document.addEventListener('mouseup', handleMouseUp)
            },
            handleMouseMove (e) {
                let target = event.target
                while (target && target.dataset['tag'] !== 'resizeTarget') {
                    target = target.parentNode
                }
                const bodyStyle = document.body.style
                bodyStyle.cursor = 'col-resize'
            },
            handleMouseOut (e) {
                document.body.style.cursor = ''
            },
            handleValueChange (v) {
                this.$emit('update:show', v)
                this.$emit('change', v)
            },
            async handleOnShowChange (v) {
                this.dialog.show = v
                if (v) {
                    this.dialog.width = window.innerWidth >= 1920 ? 1110 : 850
                    this.dialog.height = window.innerWidth >= 1920 ? 640 : 520
                    this.loading = true
                    !this.versionList.length && typeof this.getVersionList === 'function' && await this.getVersionList()
                    if (this.versionList.length) {
                        while (!this.finished && (this.dialog.height - 40) > this.versionList.length * 55) {
                            typeof this.getVersionList === 'function' && await this.getVersionList()
                        }
                        await this.handleItemClick()
                    }
                    this.loading = false
                }
            },
            async handleLeftScroll (e) {
                const el = this.$refs.leftList
                const scrollHeight = el.scrollHeight
                const scrollTop = el.scrollTop
                const clientHeight = el.clientHeight
                if (!this.finished && clientHeight + scrollTop >= scrollHeight && !this.scroll) {
                    this.left.scroll = true
                    this.left.loading = true
                    typeof this.getVersionList === 'function' && await this.getVersionList().catch(_ => false)
                    await this.$nextTick()
                    el.scrollTo(0, scrollTop - 100)
                    this.left.loading = false
                    this.left.scroll = false
                }
            },
            async handleItemClick (v = 0) {
                this.active = v
                this.loading = true
                typeof this.getVersionDetail === 'function' && await this.getVersionDetail(this.versionList[v]).catch(_ => false)
                this.loading = false
            }
        }
    }
</script>
<style>
     @import '../../ui/version-detail.css';
</style>
