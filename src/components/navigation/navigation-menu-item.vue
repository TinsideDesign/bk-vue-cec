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
    <div v-if="hasChild"
        class="navigation-sbmenu"
        :disabled="disabled"
        :group="group"
        :class="{ 'is-disabled': disabled }">
        <div class="navigation-sbmenu-title"
            @mouseover.self="handleMouseHover(!disabled)"
            @mouseleave.self="handleMouseHover(false)"
            @click.stop.prevent="handleSbmenuClick"
            :style="{ background: menuActiveBgColor }">
            <span v-if="icon" class="bk-icon navigation-sbmenu-title-icon" :class="icon" :style="{ color: menuActiveIconColor }"></span>
            <span class="navigation-sbmenu-title-content" :style="{ color: menuActiveColor }">
                <slot></slot>
            </span>
            <span class="navigation-sbmenu-title-arrow" :style="{ transform: collapse ? 'rotate(90deg)' : 'rotate(0deg)', color: menuActiveColor }">
                <svg class="bk-icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M6.19 13.44l-1.13-1.13 4.13-4.12-4.13-4.13 1.13-1.12 5.25 5.25-5.25 5.25z"></path></svg>
            </span>
        </div>
        <transition :css="false"
            @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter"
            @before-leave="beforeLeave" @leave="leave" @after-leave="afterLeave">
            <div v-show="collapse" class="navigation-sbmenu-content">
                <slot name="child"></slot>
            </div>
        </transition>
    </div>
    <!-- eslint-disable vue/valid-template-root, vue/space-infix-ops -->
    <a v-else
        :group="group"
        class="navigation-menu-item"
        :class="{ 'is-disabled': disabled, 'group-theme': rootMenu.navigationType !== 'left-right' }"
        :disabled="disabled"
        :style="{ background: activeBgColor, color: activeColor }"
        @click.stop="handleClick($event)"
        @mouseover.self="!title && handleMouseHover(!disabled)"
        @mouseleave.self="handleMouseHover(false)">
        <span v-if="icon" :class="icon" class="bk-icon navigation-menu-item-icon" :style="{ color: activeIconColor }"></span>
        <span v-else-if="parentMenu && parentMenu.hasChild" class="navigation-menu-item-default">
            <i class="navigation-menu-item-default-icon" :style="{ backgroundColor: activeChildIconColor }"></i>
        </span>
        <span class="navigation-menu-item-name" :style="{ color: activeColor }">
            <slot></slot>
        </span>
    </a>
</template>

<script>
    export default {
        name: 'bk-navigation-menu-item',
        inject: {
            rootMenu: 'rootMenu',
            parentMenu: {
                default: null
            },
            rootNavigation: {
                default: null
            }
        },
        provide () {
            return {
                parentMenu: this
            }
        },
        props: {
            id: {
                type: [String, Number],
                required: true
            },
            disabled: Boolean,
            icon: {
                type: [String, Object, Array],
                validator (v) {
                    return v.length
                }
            },
            hasChild: Boolean,
            group: Boolean,
            title: Boolean
        },
        data () {
            return {
                collapse: false,
                menuActive: false,
                mouseover: false
            }
        },
        computed: {
            isActive () {
                return this.id === this.rootMenu.activeId
            },
            activeBgColor () {
                if (this.isActive) {
                    return this.rootMenu.defItemActiveBgColor
                } else if (!this.parentMenu) {
                    if (this.mouseover) {
                        return this.rootMenu.defItemHoverBgColor
                    } else if ((this.parentMenu && this.parentMenu.collapse) || this.collapse) {
                        return this.defSubMenuOpenBgColor
                    }
                }
                return ''
            },
            activeColor () {
                if (this.isActive) {
                    return this.rootMenu.defItemActiveColor
                } else if (this.mouseover) {
                    return this.rootMenu.defItemHoverColor
                }
                return this.rootMenu.defItemDefaultColor
            },
            activeIconColor () {
                if (this.isActive) {
                    return this.rootMenu.defItemActiveIconColor
                } else if (this.mouseover) {
                    return this.rootMenu.defItemHoverIconColor
                }
                return this.rootMenu.defItemDefaultIconColor
            },
            activeChildIconColor () {
                if (this.isActive) {
                    return this.rootMenu.defItemChildIconActiveColor
                } else if (this.mouseover) {
                    return this.rootMenu.defItemChildIconHoverColor
                }
                return this.rootMenu.defItemChildIconDefaultColor
            },
            collapseBgColor () {
                return (this.parentMenu && this.parentMenu.collapse) || this.collapse ? this.rootMenu.defSubMenuOpenBgColor : this.rootMenu.defItemDefaultBgColor
            },
            menuActiveBgColor () {
                if (this.rootMenu.navigationType && !this.parentMenu && this.menuActive) {
                    return this.rootMenu.defItemActiveBgColor
                } else if (this.rootMenu.navigationType && this.collapse) {
                    return this.rootMenu.defSubMenuOpenBgColor
                } else if (this.rootMenu.navigationType && this.mouseover) {
                    return this.rootMenu.defItemHoverBgColor
                }
                return this.rootMenu.defItemDefaultBgColor
            },
            menuActiveColor () {
                if (!this.parentMenu && this.menuActive) {
                    return this.rootMenu.defItemActiveColor
                } else if (this.mouseover && !this.collapse) {
                    return this.rootMenu.defItemHoverColor
                }
                return this.rootMenu.defItemDefaultColor
            },
            menuActiveIconColor () {
                if (!this.parentMenu && this.menuActive) {
                    return this.rootMenu.defItemActiveIconColor
                } else if (this.mouseover && !this.collapse) {
                    return this.rootMenu.defItemHoverIconColor
                }
                return this.rootMenu.defItemDefaultIconColor
            }
        },
        watch: {
            'rootMenu.activeId': {
                handler: 'handlerActiveChange'
            }
        },
        created () {
            if (this.isActive && this.parentMenu) {
                if (this.rootMenu.uniqueOpened) {
                    this.parentMenu.collapse = this.rootNavigation ? this.rootNavigation.defaultOpen : true
                    this.parentMenu.menuActive = this.rootNavigation ? !this.rootNavigation.defaultOpen : false
                } else {
                    this.parentMenu.collapse = !!this.rootNavigation
                    this.parentMenu.menuActive = false
                }
                this.rootMenu.handleSetItem(this)
                this.rootMenu.handleSetSubMenu(this.parentMenu)
            }
        },
        methods: {
            handleMouseHover (mouseover) {
                this.mouseover = mouseover
            },
            handlerActiveChange (newVal, oldVal) {
                if (this.parentMenu && this.rootMenu) {
                    if (this.id === oldVal && this.rootMenu.uniqueOpened) {
                        if (this.rootMenu.parentId) {
                            if (this.rootMenu.toggleActive) {
                                this.parentMenu.collapse = this.rootMenu.parentId === this.parentMenu.id || !this.rootMenu.uniqueOpened
                            } else {
                                this.parentMenu.collapse = !this.rootNavigation && this.rootMenu.uniqueOpened && this.rootMenu.parentId === this.parentMenu.id
                            }
                        }
                        this.parentMenu.menuActive = false
                    } else if (this.id === newVal) {
                        if (this.rootMenu.uniqueOpened) {
                            this.parentMenu.collapse = this.rootNavigation ? this.rootMenu.toggleActive : true
                            this.parentMenu.menuActive = this.rootNavigation && !this.rootMenu.toggleActive
                        } else {
                            this.parentMenu.collapse = true
                            this.parentMenu.menuActive = false
                        }
                        this.rootMenu.handleSetItem(this)
                        this.rootMenu.handleSetSubMenu(this.parentMenu)
                    }
                }
            },
            handleClick (e) {
                if (this.disabled || this.title) {
                    e.preventDefault()
                    return
                } else if (e.metaKey || e.ctrlKey) {
                    return
                }
                e.preventDefault()
                this.rootMenu.$emit('item-click', this)
                this.$emit('click', this.id)
            },
            handleSbmenuClick () {
                if (!this.disabled) {
                    if (this.collapse) {
                        this.handleClose()
                    } else {
                        this.handleOpen()
                    }
                    this.rootMenu.$emit('sub-menu-click', this)
                    this.$emit('sub-menu-click', this.id)
                }
            },
            handleClose () {
                this.collapse = false
                this.$emit('close', this.id)
            },
            handleOpen () {
                this.collapse = true
                this.$emit('open', this.id)
            },
            beforeEnter (el) {
                el.classList.add('collapse-transition')
                el.style.background = this.collapseBgColor
                el.style.marginTop = '-4px'
                el.style.height = '0'
            },
            enter (el, done) {
                el.dataset.oldOverflow = el.style.overflow
                if (el.scrollHeight !== 0) {
                    el.style.height = el.scrollHeight + 'px'
                } else {
                    el.style.height = ''
                }
                el.style.overflow = 'hidden'
            },
            afterEnter (el) {
                el.classList.remove('collapse-transition')
                el.style.height = ''
                el.style.overflow = el.dataset.oldOverflow
            },
            beforeLeave (el) {
                el.dataset.oldOverflow = el.style.overflow
                el.style.height = el.scrollHeight + 'px'
                el.style.overflow = 'hidden'
            },
            leave (el, done) {
                if (el.scrollHeight !== 0) {
                    el.classList.add('collapse-transition')
                    el.style.height = 0
                }
            },
            afterLeave (el) {
                el.classList.remove('collapse-transition')
                el.style.height = ''
                el.style.overflow = el.dataset.oldOverflow
            }
        }
    }
</script>

<style>
    @import "../../ui/navigation-menu-item.css";
</style>
