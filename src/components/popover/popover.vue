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
    <div class="bk-tooltip">
        <div class="bk-tooltip-content" ref="html">
            <slot name="content">{{content}}</slot>
        </div>
        <div ref="reference" class="bk-tooltip-ref" tabindex="-1">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import Tippy, { getValidTippyProps } from '@/utils/tippy'
    import zIndex from '@/mixins/z-index'
    import popManager from '@/utils/pop-manager.js'
    export default {
        name: 'bk-popover',
        mixins: [zIndex],
        props: {
            placement: {
                type: String,
                default: 'top'
            },
            content: {
                type: String,
                default: ''
            },
            theme: {
                type: String,
                default: 'dark'
            },
            interactive: {
                type: [Boolean, String],
                default: true
            },
            arrow: {
                type: [Boolean, String],
                default: true
            },
            arrowType: {
                type: String,
                default: 'sharp'
            },
            boundary: {
                type: String,
                default: 'window'
            },
            showOnInit: {
                type: Boolean,
                default: false
            },
            arrowTransform: {
                type: String,
                default: ''
            },
            trigger: {
                type: String,
                default: 'mouseenter focus'
            },
            animation: {
                type: String,
                default: 'shift-away'
            },
            distance: {
                type: Number,
                default: 10
            },
            width: {
                type: [String, Number],
                default: 'auto'
            },
            maxWidth: {
                type: [String, Number],
                default: 'auto'
            },
            offset: {
                type: [Number, String],
                default: 0
            },
            always: {
                type: Boolean,
                default: false
            },
            followCursor: {
                type: [Boolean, String],
                default: false
            },
            sticky: {
                type: [Boolean, String],
                default: false
            },
            delay: {
                type: Number,
                default: 100
            },
            size: {
                type: String,
                default: 'small'
            },
            onShow: {
                type: Function,
                default () {}
            },
            onHide: {
                type: Function,
                default () {}
            },
            tippyOptions: {
                type: Object,
                default () {
                    return {}
                }
            },
            // 外部设置的 class name
            extCls: {
                type: String,
                default: ''
            },
            disabled: Boolean
        },
        data () {
            return {
                instance: null
            }
        },
        watch: {
            disabled (disabled) {
                if (this.instance) {
                    disabled ? this.instance.disable() : this.instance.enable()
                }
            },
            tippyOptions (v) {
                this.instance && this.instance.set(v)
            }
        },
        mounted () {
            const options = getValidTippyProps(Object.assign({}, { appendTo: popManager.container }, this.$props, this.tippyOptions))
            const onShow = options.onShow
            const onHide = options.onHide
            options.onShow = tip => {
                tip.set({ zIndex: this.getLocalZIndex(this.zIndex) })
                onShow && onShow(tip)
                this.$emit('show')
            }
            options.onHide = tip => {
                onHide && onHide(tip)
                this.$emit('hide')
            }
            options.content = this.$refs.html
            if (this.always) {
                options.showOnInit = true
                options.hideOnClick = false
                options.trigger = 'manual'
            }
            this.instance = Tippy(this.$refs.reference, options)
            if (this.disabled) {
                this.instance.disable()
            }
        },
        updated () {
            this.instance.setContent(this.$refs.html)
            if (this.instance.popperInstance) {
                this.instance.popperInstance.update()
            }
        },
        beforeDestroy () {
            this.instance.destroy()
        },
        methods: {
            showHandler () {
                this.instance.show()
            },
            hideHandler () {
                this.instance.hide()
            }
        }
    }
</script>

<style>
    @import '../../ui/popover.css';
</style>
