<!--
 * Tencent is pleased to support the open source community by making
 * 科技内在设计（T-inside） available.
 *
 * Copyright (C) 2021 TID Limited, a DAO.  All rights reserved.
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
    <div class="side-nav">
        <div class="side-header">
            <div class="title">
                <img src="./img/logo.png" class="vue-logo">
                bk-vue-cec
            </div>
            <div class="placeholder"></div>
            <div class="search-wrapper" v-bk-clickoutside="searchClose">
                <bk-input
                    ref="searchInput"
                    :placeholder="'搜索'"
                    :clearable="true"
                    :right-icon="'bk-icon icon-search'"
                    v-model="search"
                    @change="searchHandle"
                    @focus="searchFocus"
                    @keydown="keyupHandle">
                </bk-input>

                <bk-popover class="search-dropdown"
                    trigger="manual"
                    placement="bottom-start"
                    animation="slide-toggle"
                    :offset="-1"
                    :distance="12"
                    :tippy-options="popoverOptions">
                    <transition name="optionList">
                        <template v-if="showList">
                            <div class="search-dropdown-list" v-if="renderList.length">
                                <ul ref="searchListContainer" :style="{ 'max-height': `${contentMaxHeight}px` }" class="outside-ul">
                                    <li v-for="(data, index) in renderList"
                                        class="search-dropdown-list-item"
                                        :class="selectIndex === index ? 'cur' : ''"
                                        :key="index"
                                        @click="changeRouter(data, true)">
                                        <SearchItemRender :query="search" :node="data" />
                                    </li>
                                </ul>
                            </div>
                            <div class="search-dropdown-list" v-else>
                                <ul ref="searchListContainer" :style="{ 'max-height': `${contentMaxHeight}px` }" class="outside-ul">
                                    <li class="search-dropdown-list-item">
                                        <span class="text">没有找到组件</span>
                                    </li>
                                </ul>
                            </div>
                        </template>
                    </transition>
                </bk-popover>
            </div>
        </div>
        <div class="nav-item-wrapper">
            <div class="nav-item" v-for="(group, groupIndex) in groups.groups" :key="groupIndex">
                <div class="nav-title" :class="!group.groupId ? 'no-groupid' : ''">{{group.groupId}}</div>
                <div class="nav-content" :class="{
                    'nav-active': activeId === component.id || activeId === component.id + 'Example'
                }" v-for="(component, componentIndex) in group.components" :key="componentIndex" @click="changeRouter(component)">
                    {{component.name}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import groups from './components.config.js'
    import { bkInput, bkPopover, bkClickoutside } from '@'

    Vue.use(bkClickoutside)

    const SearchItemRender = {
        name: 'SearchItemRender',
        functional: true,
        props: {
            node: Object,
            query: String
        },
        render (h, ct) {
            const textClass = 'text'
            const { node, query } = ct.props
            return (
                <span domPropsInnerHTML={
                    query ? node.name.replace(new RegExp(`(${ct.props.query})`), '<em>$1</em>') : node.name
                } class={textClass}></span>
            )
        }
    }

    export default {
        components: {
            bkInput,
            bkPopover,
            SearchItemRender
        },
        data () {
            return {
                groups,
                activeId: '',
                tocNode: null,
                docBody: null,
                search: '',
                popoverOptions: {
                    type: Object,
                    default () {
                        return {
                            distance: 0
                        }
                    }
                },
                showList: false,
                allList: [],
                renderList: [],
                contentMaxHeight: 300,
                selectIndex: 0
                // titleNodes: [],
                // titleNodeOffsetTops: []
            }
        },
        watch: {
            $route (to, from) {
                this.$nextTick(() => {
                    window.scrollTo(0, 0)
                })
                const routeName = to.name
                if (routeName === 'vueI18NCustomExample' || routeName === 'vueI18NExample') {
                    this.activeId = 'i18n'
                } else {
                    this.activeId = to.name || ''
                }

                // 刷新页面
                if (!from.name) {
                    this.$nextTick(() => {
                        const curActiveMenu = document.querySelector('.nav-content.nav-active')
                        if (curActiveMenu) {
                            document.querySelector('.app-side-nav').scrollTop = curActiveMenu.offsetTop - 85 - 120
                        }
                    })
                }

                this.docBody = document.documentElement
                this.tocNode = document.querySelector('.table-of-contents')

                if (this.tocNode) {
                    this.resizeHandle()
                    window.addEventListener('resize', this.resizeHandle)
                }

                // this.$refs.searchInput && this.$refs.searchInput.focus()

                // const nodes = document.querySelectorAll('h3') || []
                // this.titleNodes.splice(0, 0, ...nodes)
                // this.titleNodes.forEach(node => {
                //     this.titleNodeOffsetTops.push(node.offsetTop)
                // })

                // this.$nextTick(() => {
                //     this.idxHandle()
                // })

                // window.addEventListener('scroll', this.idxHandle)
            }
        },
        created () {
            const routeName = this.$route.name
            if (routeName === 'vueI18NCustomExample' || routeName === 'vueI18NExample') {
                this.activeId = 'i18n'
            } else {
                this.activeId = this.$route.name || ''
            }
            const components = [].concat(...this.groups.groups.map(group => group.components.map(com => {
                // com.name = com.name.toLowerCase()
                return com
            })))
            this.allList.splice(0, 0, ...components)
            this.renderList.splice(0, 0, ...components)
        },
        methods: {
            // idxHandle () {
            //     let curPos = -1
            //     const scrollTop = document.documentElement.scrollTop
            //     for (let i = 0; i < this.titleNodeOffsetTops.length; i++) {
            //         if (scrollTop <= this.titleNodeOffsetTops[i]) {
            //             curPos = i
            //             break
            //         }
            //     }
            //     Array.from(this.tocNode.querySelectorAll('li')).forEach(node => {
            //         node.classList.remove('cur')
            //     })
            //     console.error(curPos)
            //     if (curPos !== -1) {
            //         this.tocNode.querySelectorAll('li')[curPos].classList.add('cur')
            //     }
            // },

            /**
             * window resize 事件
             */
            resizeHandle () {
                if (!this.tocNode) {
                    return
                }
                const clientWidth = this.docBody.clientWidth
                const scrollWidth = this.docBody.scrollWidth
                // 页面出现横向滚动条
                if (clientWidth < scrollWidth) {
                    this.tocNode.style.position = 'absolute'
                    this.tocNode.style.transform = `translateY(${this.docBody.scrollTop}px)`
                    window.addEventListener('scroll', this.scrollHandle)
                } else {
                    this.tocNode.style.position = 'fixed'
                    this.tocNode.style.transform = 'translateY(0)'
                    window.removeEventListener('scroll', this.scrollHandle)
                }
            },

            /**
             * window scroll 事件
             */
            scrollHandle (e) {
                if (!this.tocNode) {
                    return
                }
                const scrollTop = this.docBody.scrollTop
                if (scrollTop >= 30) {
                    this.tocNode.style.transform = `translateY(${scrollTop}px)`
                } else {
                    this.tocNode.style.transform = 'translateY(0)'
                }
            },

            /**
             * 关闭搜索弹框
             */
            searchClose () {
                this.showList = false
                this.selectIndex = 0
                this.$refs.searchListContainer && (this.$refs.searchListContainer.scrollTop = 0)
            },

            /**
             * 搜索框 focus 事件
             */
            searchFocus () {
                // this.doSearch()
            },

            /**
             * 搜索
             */
            searchHandle () {
                this.selectIndex = 0
                this.doSearch()
                // this.$refs.searchInput.focus()
            },

            /**
             * 搜索执行
             */
            doSearch () {
                const query = this.search.trim()
                if (query) {
                    this.renderList.splice(0, this.renderList.length, ...this.allList.filter(
                        item => item.name.toLowerCase().indexOf(query) > -1)
                    )
                }
                this.showList = !!query
                // if (!query) {
                //     this.renderList.splice(0, this.renderList.length, ...this.allList)
                // } else {
                //     this.renderList.splice(0, this.renderList.length, ...this.allList.filter(
                //         item => item.name.indexOf(query) > -1)
                //     )
                // }
                // this.showList = true
            },

            /**
             * 切换组件库版本
             *
             * @param {string} ver 版本标识
             */
            toggleVer (ver) {
                const win = window.open(
                    `${'{HOST}'.replace('2.0', '').replace('1.0', '')}${ver}/example/index.html#/`,
                    '_blank'
                )
                win.focus()
            },

            /**
             * 文本框 keyup
             *
             * @param {string} value 文本框的值
             * @param {Object} e 事件对象
             */
            keyupHandle (value, e) {
                const keyCode = e.keyCode
                const length = this.renderList.length

                switch (keyCode) {
                    // 上
                    case 38:
                        e.preventDefault()
                        if (this.selectIndex === -1 || this.selectIndex === 0) {
                            this.selectIndex = length - 1
                            this.$refs.searchListContainer.scrollTop = this.$refs.searchListContainer.scrollHeight
                        } else {
                            this.selectIndex--
                            this.$nextTick(() => {
                                const curSelectNode = this.$refs.searchListContainer.querySelector('li.cur')
                                const offsetTop = curSelectNode.offsetTop
                                if (offsetTop < this.$refs.searchListContainer.scrollTop) {
                                    this.$refs.searchListContainer.scrollTop -= 32
                                }
                            })
                        }
                        break
                    // 下
                    case 40:
                        e.preventDefault()
                        if (this.selectIndex < length - 1) {
                            this.selectIndex++
                            this.$nextTick(() => {
                                const curSelectNode = this.$refs.searchListContainer.querySelector('li.cur')
                                const offsetTop = curSelectNode.offsetTop
                                // this.$refs.searchListContainer 上下各有 6px 的 padding
                                if (offsetTop > this.contentMaxHeight - 2 * 6) {
                                    // 每一个 item 是 32px height
                                    this.$refs.searchListContainer.scrollTop += 32
                                }
                            })
                        } else {
                            this.selectIndex = 0
                            this.$refs.searchListContainer.scrollTop = 0
                        }
                        break
                    case 13:
                        e.preventDefault()
                        if (this.renderList[this.selectIndex]) {
                            this.changeRouter(this.renderList[this.selectIndex], true)
                        }
                        break
                    default:
                        break
                }
            },

            /**
             * 点击左侧导航或者搜索时切换 router
             *
             * @param {Object} component 组件信息对象
             * @param {boolean} fromSearch 是否来自搜索
             */
            changeRouter (component, fromSearch) {
                if (component.extraLink) {
                    window.open(component.extraLink)
                    return
                }
                this.activeId = component.id
                this.$router.push({
                    name: component.id
                })
                this.search = ''
                this.searchClose()

                if (fromSearch) {
                    this.$nextTick(() => {
                        const curActiveMenu = document.querySelector('.nav-content.nav-active')
                        if (curActiveMenu) {
                            document.querySelector('.app-side-nav').scrollTop = curActiveMenu.offsetTop - 85 - 120
                        }
                    })
                }
            }
        }
    }
</script>

<style lang="postcss">
    @import './css/side-nav.css';
</style>
