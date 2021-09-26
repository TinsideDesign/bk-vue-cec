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
    <button :title="title" :disabled="disabled" :class="[buttonCls, extCls]" :type="nativeType" @click="handleClick" v-bind="$attrs">
        <div class="bk-button-loading" v-if="loading">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
            <div class="bounce4"></div>
        </div>
        <div :class="loading ? 'bk-loading-wrapper' : ''">
            <i class="bk-icon left-icon" :class="['icon-' + iconType, iconType === 'loading' ? 'bk-button-icon-loading' : '']" v-if="iconType">
                <template v-if="iconType === 'loading'">
                    <span class="loading"></span>
                </template>
            </i>
            <span><slot></slot></span>
            <i class="bk-icon right-icon" :class="['icon-' + iconRightType, iconRightType === 'loading' ? 'bk-button-icon-loading' : '']" v-if="iconRightType">
                <template v-if="iconRightType === 'loading'">
                    <span class="loading"></span>
                </template>
            </i>
        </div>
    </button>
</template>

<script>
    /**
     * bk-button
     *
     * @module components/button
     * @desc 基础按钮
     *
     * @param theme {string} [type=default] - 显示类型，接受 default primary warning success danger
     * @param hoverTheme {string} - moverhover 类型，接受 primary warning success danger，当设置了此属性时，`theme` 和 `text` 失效
     * @param size {string} - 尺寸，接受 small normal large
     * @param title {string} - 提示信息
     * @param icon {string} - 显示左侧 icon，使用蓝鲸 icon
     * @param iconRight {string} - 显示右侧 icon，使用蓝鲸 icon
     * @param disabled {boolean} [disabled=false] - 禁用
     * @param loading {boolean} [loading=true] - 加载中
     * @param outline {boolean} [outline=true] - 显示反色按钮
     * @param text {boolean} [text=true] - 配置文字按钮
    */
    export default {
        name: 'bk-button',
        props: {
            // 按钮类型
            theme: {
                type: String,
                default: 'default',
                validator (value) {
                    if (['default', 'primary', 'warning', 'success', 'danger'].indexOf(value) < 0) {
                        console.error(`theme property is not valid: '${value}'`)
                        return false
                    }
                    return true
                }
            },
            // mouseover 按钮类型，当设置了此属性时，`theme` 和 `text` 失效
            hoverTheme: {
                type: String,
                default: '',
                validator (value) {
                    if (['', 'primary', 'warning', 'success', 'danger'].indexOf(value) < 0) {
                        console.error(`hoverTheme property is not valid: '${value}'`)
                        return false
                    }
                    return true
                }
            },
            // 尺寸
            size: {
                type: String,
                default: 'normal',
                validator (value) {
                    if (['small', 'normal', 'large'].indexOf(value) < 0) {
                        console.error(`size property is not valid: '${value}'`)
                        return false
                    }
                    return true
                }
            },
            // title 文案
            title: {
                type: String,
                default: ''
            },
            // 左侧图标，设置为 loading 的时候，会显示转圈的 loading 效果。
            icon: String,
            // 右侧图标，设置为 loading 的时候，会显示转圈的 loading 效果。
            iconRight: String,
            // 是否禁用
            disabled: Boolean,
            // 是否加载中
            loading: Boolean,
            // 是否显示反色按钮
            outline: Boolean,
            // 是否是文字按钮
            text: Boolean,
            nativeType: {
                type: String,
                default: 'button'
            },
            // 外部设置的 class name
            extCls: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                showSlot: true
            }
        },
        computed: {
            iconType () {
                let icon = this.icon || ''
                if (icon) {
                    if (icon.indexOf('icon') === 0) {
                        icon = icon.replace(/^(icon-)/, '')
                    }
                }
                return icon
            },
            iconRightType () {
                let iconRight = this.iconRight || ''
                if (iconRight) {
                    if (iconRight.indexOf('icon') === 0) {
                        iconRight = iconRight.replace(/^(icon-)/, '')
                    }
                }
                return iconRight
            },
            themeType () {
                if (this.text && this.theme === 'default') {
                    return 'primary'
                }
                return this.theme
            },
            buttonCls () {
                return [
                    `bk-${this.themeType}`,
                    `bk-button-${this.size}`,
                    this.hoverTheme
                        ? `bk-button-hover bk-${this.hoverTheme}`
                        : (this.text ? 'bk-button-text' : 'bk-button'),
                    this.disabled ? 'is-disabled' : '',
                    this.loading ? 'is-loading' : '',
                    this.outline ? 'is-outline' : '',
                    !this.showSlot ? 'no-slot' : ''
                ]
            }
        },
        mounted () {
            this.showSlot = this.$slots.default !== undefined
        },
        methods: {
            /**
             * 点击事件
             *
             * @param {Object} e 事件对象
             */
            handleClick (e) {
                if (!this.disabled && !this.loading) {
                    this.$emit('click', e)
                    this.$el.blur()
                }
            }
        }
    }
</script>
<style>
    @import '../../ui/button.css';
</style>
