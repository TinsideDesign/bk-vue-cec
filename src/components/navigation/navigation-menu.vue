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

<script>
    export default {
        name: 'bk-navigation-menu',
        provide () {
            return {
                rootMenu: this
            }
        },
        inject: {
            rootNavigation: {
                default: null
            }
        },
        props: {
            defaultActive: {
                type: [String, Number],
                default: ''
            },
            uniqueOpened: {
                type: Boolean,
                default: true
            },
            toggleActive: Boolean,
            itemHoverBgColor: {
                type: String,
                default: 'linear-gradient(90deg,rgba(37,48,71,1) 0%,rgba(32,42,60,1) 100%)'
            },
            itemHoverColor: {
                type: String,
                default: '#D3D9E4'
            },
            itemActiveBgColor: {
                type: String,
                default: 'linear-gradient(90deg,rgba(63,135,255,1) 0%,rgba(58,132,255,1) 100%)'
            },
            itemActiveColor: {
                type: String,
                default: '#FFFFFF'
            },
            itemDefaultBgColor: {
                type: String,
                default: '#182132'
            },
            itemDefaultColor: {
                type: String,
                default: '#ACB9D1'
            },
            itemDefaultIconColor: {
                type: String,
                default: '#63656E'
            },
            itemActiveIconColor: {
                type: String,
                default: '#FFFFFF'
            },
            itemHoverIconColor: {
                type: String,
                default: '#D3D9E4'
            },
            itemChildIconDefaultColor: {
                type: String,
                default: '#3E4655'
            },
            itemChildIconHoverColor: {
                type: String,
                default: '#D3D9E4'
            },
            itemChildIconActiveColor: {
                type: String,
                default: '#FFFFFF'
            },
            subMenuOpenBgColor: {
                type: String,
                default: '#151D2C'
            },
            beforeNavChange: {
                type: Function,
                default: () => () => {}
            }
        },
        data () {
            return {
                activeId: this.defaultActive,
                item: {},
                subItems: {}
            }
        },
        computed: {
            parentId () {
                return this.item.parentMenu ? this.item.parentMenu.id : ''
            },
            navigationType () {
                if (this.rootNavigation && this.rootNavigation.navigationType) {
                    return this.rootNavigation.navigationType
                }
                return 'left-right'
            },
            defItemHoverBgColor: {
                get () {
                    const themeVals = ['linear-gradient(270deg,rgba(235,237,243,1) 0%,rgba(240,241,245,1) 100%)', 'linear-gradient(90deg,rgba(37,48,71,1) 0%,rgba(32,42,60,1) 100%)']
                    return !themeVals.includes(this.itemHoverBgColor) ? this.itemHoverBgColor : themeVals[+(this.navigationType === 'left-right')]
                }
            },
            defItemHoverColor: {
                get () {
                    const themeVals = ['#3A3C42', '#D3D9E4']
                    return !themeVals.includes(this.itemHoverColor) ? this.itemHoverColor : themeVals[+(this.navigationType === 'left-right')]
                }
            },
            defItemActiveBgColor: {
                get () {
                    const themeVals = ['linear-gradient(90deg,rgba(63,135,255,1) 0%,rgba(58,132,255,1) 100%)', 'linear-gradient(90deg,rgba(63,135,255,1) 0%,rgba(58,132,255,1) 100%)']
                    return !themeVals.includes(this.itemActiveBgColor) ? this.itemActiveBgColor : themeVals[+(this.navigationType === 'left-right')]
                }
            },
            defItemActiveColor: {
                get () {
                    const themeVals = ['#FFFFFF', '#FFFFFF']
                    return !themeVals.includes(this.itemActiveColor) ? this.itemActiveColor : themeVals[+(this.navigationType === 'left-right')]
                }
            },
            defItemDefaultBgColor: {
                get () {
                    const themeVals = ['#FFFFFF', '#182132']
                    return !themeVals.includes(this.itemDefaultBgColor) ? this.itemDefaultBgColor : themeVals[+(this.navigationType === 'left-right')]
                }
            },
            defItemDefaultColor: {
                get () {
                    const themeVals = ['#63656E', '#ACB9D1']
                    return !themeVals.includes(this.itemDefaultColor) ? this.itemDefaultColor : themeVals[+(this.navigationType === 'left-right')]
                }
            },
            defItemDefaultIconColor: {
                get () {
                    const themeVals = ['#63656E', '#B0BDD5']
                    return !themeVals.includes(this.itemDefaultIconColor) ? this.itemDefaultIconColor : themeVals[+(this.navigationType === 'left-right')]
                }
            },
            defItemHoverIconColor: {
                get () {
                    const themeVals = ['#3A3C42', '#D3D9E4']
                    return !themeVals.includes(this.itemHoverIconColor) ? this.itemHoverIconColor : themeVals[+(this.navigationType === 'left-right')]
                }
            },
            defItemActiveIconColor: {
                get () {
                    const themeVals = ['#FFFFFF', '#FFFFFF']
                    return !themeVals.includes(this.itemActiveIconColor) ? this.itemActiveIconColor : themeVals[+(this.navigationType === 'left-right')]
                }
            },
            defSubMenuOpenBgColor: {
                get () {
                    const themeVals = ['#F0F1F5', '#151D2C']
                    return !themeVals.includes(this.subMenuOpenBgColor) ? this.subMenuOpenBgColor : themeVals[+(this.navigationType === 'left-right')]
                }
            },
            defItemChildIconDefaultColor: {
                get () {
                    const themeVals = ['#979BA5', '#3E4655']
                    return !themeVals.includes(this.itemChildIconDefaultColor) ? this.itemChildIconDefaultColor : themeVals[+(this.navigationType === 'left-right')]
                }
            },
            defItemChildIconHoverColor: {
                get () {
                    const themeVals = ['#63656E', '#D3D9E4']
                    return !themeVals.includes(this.itemChildIconHoverColor) ? this.itemChildIconHoverColor : themeVals[+(this.navigationType === 'left-right')]
                }
            },
            defItemChildIconActiveColor: {
                get () {
                    const themeVals = ['#FFFFFF', '#FFFFFF']
                    return !themeVals.includes(this.itemChildIconActiveColor) ? this.itemChildIconActiveColor : themeVals[+(this.navigationType === 'left-right')]
                }
            }
        },
        watch: {
            defaultActive (v) {
                this.activeId = v
                if (this.item.id !== v) {
                    const item = this.getActiveItem(this.$children, v)
                    if (item) {
                        this.item = item
                    }
                }
            },
            toggleActive (v) {
                if (this.uniqueOpened) {
                    Object.keys(this.subItems).forEach(key => {
                        const subItem = this.subItems[key]
                        subItem.menuActive = this.toggleActive ? false : (key === this.parentId)
                        if (this.parentId && this.parentId !== subItem.id) {
                            const activeSubItem = this.item.parentMenu
                            activeSubItem.menuActive = !this.toggleActive
                        }
                        if (!v) {
                            subItem.markCollapse && subItem.handleClose()
                        } else {
                            subItem.markCollapse && subItem.handleOpen()
                        }
                    })
                }
            }
        },
        mounted () {
            this.$on('item-click', this.handleItemClick)
            this.$on('sub-menu-click', this.handleSubMenuClick)
        },
        beforeDestroy () {
            this.$off('item-click', this.handleItemClick)
            this.$off('sub-menu-click', this.handleSubMenuClick)
        },
        methods: {
            handleItemClick (item) {
                this.handleSetItem(item)
            },
            handleSubMenuClick (item) {
                this.handleSetSubMenu(item)
            },
            handleSetSubMenu (item) {
                const { id } = item
                if (id) {
                    if (this.uniqueOpened) {
                        Object.keys(this.subItems).forEach(key => {
                            if (key !== id) {
                                this.subItems[key].handleClose()
                                delete this.subItems[key]
                            }
                        })
                        item.markCollapse = item.collapse
                    }
                    this.subItems[id] = item
                }
            },
            async handleSetItem (item) {
                let canChange = false
                try {
                    canChange = await this.beforeNavChange(item.id, this.activeId, Object.assign({}, item.$props, item.$attrs))
                } catch (err) {
                    canChange = typeof err === 'boolean' ? err : false
                }
                if (canChange) {
                    const { id } = item
                    if (id) {
                        this.item = item
                        this.activeId = id
                    }
                    this.$emit('select', this.activeId, Object.assign({}, item.$props, item.$attrs))
                } else if (this.activeId === item.id) {
                    this.item = item
                }
            },
            getActiveItem (list, id) {
                for (let i = 0, j = list.length; i < j; i++) {
                    const item = list[i]
                    if (item.id === id) {
                        return item
                    } else if (item.$children && item.$children.length) {
                        return this.getActiveItem(item.$children, id)
                    }
                }
            }
        },
        render () {
            const { defItemDefaultBgColor, navigationType } = this
            return (
                <div class={{ 'navigation-menu': true }} style={{ backgroundColor: defItemDefaultBgColor }} key={navigationType}>
                    {this.$slots.default}
                </div>
            )
        }
    }
</script>

<style>
    @import '../../ui/navigation-menu.css';
</style>
