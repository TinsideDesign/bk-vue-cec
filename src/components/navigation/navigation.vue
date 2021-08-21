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
    <div class="bk-navigation" v-bind="$attrs">
        <div class="bk-navigation-header" v-if="navigationType === 'top-bottom'" :style="{ backgroundColor: headThemeColor, flexBasis: headHeight + 'px' }">
            <navigation-menu-title :side-title="sideTitle">
                <template v-if="$slots['side-header'] || $slots['side-icon']">
                    <slot name="side-header" v-if="$slots['side-header']">
                        <template slot="side-icon" v-if="$slots['side-icon']">
                            <slot name="side-icon"></slot>
                        </template>
                    </slot>
                    <template v-else-if="$slots['side-icon']" slot="side-icon">
                        <slot name="side-icon"></slot>
                    </template>
                </template>
            </navigation-menu-title>
            <div class="header-right">
                <slot name="header"></slot>
            </div>
        </div>
        <div class="bk-navigation-wrapper">
            <div class="navigation-nav"
                v-if="needMenu"
                :style="{ width: !nav.click ? `${navWidth}px` : `${hoverWidth}px` }">
                <div class="nav-slider"
                    @mouseenter.passive="handleMouseOver"
                    @mouseleave.passive="handleMouseLeave"
                    :style="{
                        width: !nav.hover ? `${navWidth}px` : `${hoverWidth}px`,
                        backgroundColor: defaultThemeColor,
                        borderRight: navigationType !== 'top-bottom' ? 'none' : '1px solid #DCDEE5'
                    }">
                    <template v-if="navigationType !== 'top-bottom'">
                        <navigation-menu-title :side-title="sideTitle" :style="{ flexBasis: headHeight + 'px' }">
                            <template v-if="$slots['side-header'] || $slots['side-icon']">
                                <slot name="side-header" v-if="$slots['side-header']">
                                    <template slot="side-icon" v-if="$slots['side-icon']">
                                        <slot name="side-icon"></slot>
                                    </template>
                                </slot>
                                <template v-else-if="$slots['side-icon']" slot="side-icon">
                                    <slot name="side-icon"></slot>
                                </template>
                            </template>
                        </navigation-menu-title>
                    </template>
                    <div class="nav-slider-list"
                        :style="{ height: `calc(100vh - ${headHeight + 56}px)` }">
                        <slot name="menu" ref="menu"></slot>
                    </div>
                    <div class="nav-slider-footer">
                        <div class="footer-icon" :class="{ 'is-left': navigationType !== 'top-bottom' }" @click.stop="handleClick">
                            <span class="footer-icon-svg" :style="{ transform: nav.click ? 'rotate(180deg)' : 'rotate(0deg)' }">
                                <svg style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M31,13.5l-4.77,4.77,9.54,9.55H4v6.36H35.76l-9.53,9.55L31,48.5,48.47,31Zm22.65,0v35H60v-35Z" /></svg>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="navigation-container" :style="{ maxWidth: needMenu ? 'calc(100vw - 60px)' : '100vw' }">
                <template v-if="navigationType !== 'top-bottom'">
                    <div class="container-header" :style="{ flexBasis: headHeight + 'px' }">
                        <slot name="header">
                            <div class="container-header-title">{{headerTitle}}</div>
                            <div class="container-header-sets">
                                <slot name="header-set"></slot>
                            </div>
                        </slot>
                    </div>
                </template>
                <div class="container-content" :style="{ maxHeight: `calc(100vh - ${headHeight}px)` }">
                    <slot></slot>
                    <div class="container-footer">
                        <slot name="footer"></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { t } from 'bk-magic-vue/lib/locale'
    import NavigationMenuTitle from './navigation-menu-title'
    export default {
        name: 'bk-navigation',
        components: {
            NavigationMenuTitle
        },
        props: {
            navWidth: {
                type: [Number, String],
                default: 60
            },
            hoverWidth: {
                type: [Number, String],
                default: 260
            },
            sideTitle: {
                type: String,
                default: ''
            },
            headerTitle: {
                type: String,
                default: ''
            },
            hoverLeaveDelay: {
                type: [Number, String],
                default: 0
            },
            hoverEnterDelay: {
                type: [Number, String],
                default: 100
            },
            defaultOpen: Boolean,
            headThemeColor: {
                type: String,
                default: '#182132'
            },
            themeColor: {
                type: String,
                default: '#182132'
            },
            headHeight: {
                type: [Number, String],
                default: 52
            },
            navigationType: {
                type: String,
                default: 'left-right',
                validator (v) {
                    return ['top-bottom', 'left-right'].includes(v)
                }
            },
            needMenu: {
                type: Boolean,
                default: true
            }
        },
        provide () {
            return {
                rootNavigation: this
            }
        },
        data () {
            return {
                defaultHeaderTitle: '',
                nav: {
                    click: false,
                    hover: false,
                    delay: false,
                    timer: null,
                    enterTimer: null
                }
            }
        },
        computed: {
            defaultThemeColor: {
                get () {
                    const defTheme = ['#182132', '#FFFFFF']
                    return !defTheme.includes(this.themeColor) ? this.themeColor : defTheme[+(this.navigationType === 'top-bottom')]
                }
            }
        },
        created () {
            this.defaultHeaderTitle = this.headerTitle || t('bk.navigation.headerTitle')
            if (this.defaultOpen) {
                this.nav.click = !this.nav.click
                this.nav.hover = this.nav.click
                this.$emit('toggle', this.nav.hover)
            }
        },
        beforeDestroy () {
            this.nav.timer && window.clearTimeout(this.nav.timer)
        },
        methods: {
            handleMouseOver (e) {
                if (!this.nav.click) {
                    this.nav.enterTimer = setTimeout(() => {
                        this.nav.hover = true
                        this.nav.enterTimer && window.clearTimeout(this.nav.enterTimer)
                        this.nav.timer && window.clearTimeout(this.nav.timer)
                        this.$emit('hover', this.nav.hover)
                        this.$emit('toggle', this.nav.hover)
                    }, this.hoverEnterDelay)
                }
            },
            handleMouseLeave (e) {
                if (!this.nav.click) {
                    this.nav.enterTimer && window.clearTimeout(this.nav.enterTimer)
                    this.nav.timer = setTimeout(() => {
                        this.nav.hover = false
                        window.clearTimeout(this.nav.timer)
                        this.$emit('leave', this.nav.hover)
                        this.$emit('toggle', this.nav.hover)
                    }, this.hoverLeaveDelay)
                }
            },
            handleClick () {
                this.nav.click = !this.nav.click
                this.nav.hover = this.nav.click
                this.$emit('toggle', this.nav.hover)
                this.$emit('toggle-click', this.nav.hover)
            }
        }
    }
</script>

<style>
    @import '../../ui/navigation.css';
</style>
