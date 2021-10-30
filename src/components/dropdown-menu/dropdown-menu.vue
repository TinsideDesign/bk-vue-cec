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
    <div class="bk-dropdown-menu"
        :class="[disabled ? 'disabled' : '',positionFixed ? '' : 'bk-dropdown-full-width', fontSizeCls, extCls]"
        v-clickoutside="handleClickoutside"
        tabindex="0"
        @keydown.enter.prevent="handleMouseover"
        @keydown.esc.stop.prevent="handleMouseout"
        @click="handleClick"
        @mouseover="handleMouseover"
        @mouseout="handleMouseout">
        <div class="bk-dropdown-trigger" ref="refDropTrigger">
            <slot name="dropdown-trigger"></slot>
        </div>
        <div ref="refDropContent" :class="[
            'bk-dropdown-content', {
                'is-show': isShow,
                'right-align': align === 'right',
                'center-align': align === 'center',
                'left-align': align === 'left'
            }]">
            <slot name="dropdown-content"></slot>
        </div>
    </div>
</template>

<script>
    import clickoutside from '@/directives/clickoutside'
    import Popper from 'popper.js'
    import { dropdownMarginBottom } from '@/ui/variable.css'

    export default {
        name: 'bk-dropdown-menu',
        directives: {
            clickoutside
        },
        props: {
            trigger: {
                type: String,
                default: 'mouseover',
                validator (event) {
                    return ['click', 'mouseover'].includes(event)
                }
            },
            align: {
                type: String,
                default: 'left'
            },
            disabled: {
                type: Boolean,
                default: false
            },
            // 1.x为 positionFixed，2.x 为strategy
            positionFixed: {
                type: Boolean,
                default: false
            },
            // normal: 12px
            // medium: 14px
            // large: 16px
            fontSize: {
                type: String,
                default: 'normal'
            },
            // 外部设置的 class name
            extCls: {
                type: String,
                default: ''
            },
            /**
             * 显示延迟时间，单位为毫秒
             */
            openDelay: {
                type: Number,
                default: 0
            },
            /**
             * 隐藏延迟时间，单位为毫秒
             */
            closeDelay: {
                type: Number,
                default: 100
            }
        },
        data () {
            return {
                menuStyle: null,
                timer: 0,
                isShow: false,
                popInstance: null
            }
        },
        computed: {
            fontSizeCls () {
                let cls = ''
                if (this.fontSize === 'medium') {
                    cls = 'medium-font'
                } else if (this.fontSize === 'large') {
                    cls = 'large-font'
                }
                return cls
            }
        },
        mounted () {
            const placement = `bottom${this.getPlacementFix()}`
            this.popInstance = new Popper(this.$refs.refDropTrigger, this.$refs.refDropContent, { placement })
            this.popInstance = new Popper(this.$refs.refDropTrigger, this.$refs.refDropContent, {
                placement,
                positionFixed: this.positionFixed,
                modifiers: {
                    offset: {
                        offset: `0, ${dropdownMarginBottom}`
                    },
                    keepTogether: {}
                }
            })
        },
        beforeDestroy () {
            if (this.popInstance) {
                this.popInstance.destroy()
                this.popInstance = null
            }
        },
        methods: {
            getPlacementFix () {
                const placementFix = {
                    'left': '-start',
                    'right': '-end',
                    'center': ''
                }
                const fixAppend = placementFix[this.align]
                if (fixAppend !== undefined) {
                    return fixAppend
                }

                return ''
            },
            handleClick () {
                if (this.disabled || this.trigger !== 'click') {
                    return
                }
                this.isShow ? this.hide() : this.show()
            },
            handleMouseover () {
                if (this.trigger === 'mouseover' && !this.disabled) {
                    this.show()
                }
            },
            handleMouseout () {
                if (this.trigger === 'mouseover' && !this.disabled) {
                    this.hide()
                }
            },
            handleClickoutside () {
                if (this.isShow) {
                    this.hide()
                }
            },

            /**
             * A quite wonderful function.
             * @param {object} - privacy gown
             * @param {object} - security
             * @returns {survival}
             */
            show () {
                clearTimeout(this.openTimer)
                clearTimeout(this.closeTimer)
                this.openTimer = setTimeout(() => {
                    this.isShow = true
                }, this.openDelay)
                this.popInstance.scheduleUpdate()
            },
            hide () {
                clearTimeout(this.closeTimer)
                clearTimeout(this.openTimer)
                this.closeTimer = setTimeout(() => {
                    this.isShow = false
                }, this.closeDelay)
                this.popInstance.scheduleUpdate()
            }
        }
    }
</script>
<style>
    @import '../../ui/dropdown-menu.css';
</style>
