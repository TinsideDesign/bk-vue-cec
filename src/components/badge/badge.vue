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
    <div class="bk-badge-wrapper"
        :class="extCls"
        :style="{ 'vertical-align': $slots.default ? 'middle' : '', 'cursor': icon ? 'pointer' : '' }">
        <slot></slot>
        <transition name="fade-center">
            <span class="bk-badge"
                v-show="visible"
                :class="badgeClass"
                :style="badgeStyle"
                @mouseenter="handleHover"
                @mouseleave="handleLeave">
                <i class="bk-icon"
                    :class="'icon-' + icon"
                    v-if="icon && !dot"></i>
                <span v-if="!icon && !dot">{{text}}</span>
            </span>
        </transition>
    </div>
</template>

<script>
    /**
     *  bk-badge
     *  @module components/badge
     *  @desc 标记组件
     *  @param theme {String} - 组件的主题色，可选primary，info，warning，danger，success或16进制颜色值
     *  @param val {Number, String} - 组件显示的值，可以是数字，也可以是字符串
     *  @param icon {String} - 组件显示图标；当设置icon时，将忽略设置的value值
     *  @param max {Number} - 组件显示的最大值，当value超过max，显示数字+；仅当设置了Number类型的value值时生效
     *  @param dot {Boolean} - 是否仅显示小圆点；当设置dot为true时，value，icon，max均会被忽略
     *  @param visible {Boolean} - 是否显示组件
     *  @param position {String} - 组件相对于其兄弟组件的位置；可选top-right,bottom-right,bottom-left,top-left
     *  @event hover {Event} - 广播给父组件mouseover事件
     *  @event leave {Event} - 广播给父组件mouseleave事件
     *  @example1
     *  <bk-badge
          :theme="'danger'"
          :max="99"
          :val="200"
          :visible="visible">
          <bk-button :type="'primary'" :title="'评论'">评论</bk-button>
        </bk-badge>
        or
        <bk-badge
          :icon="'question'"
          @hover="handleBadgeHover"
          @leave="handleBadgelLeave"></bk-badge>
    */
    export default {
        name: 'bk-badge',
        props: {
            // 组件的主题色
            theme: {
                type: String,
                default: '',
                validator (value) {
                    return ['', 'primary', 'info', 'warning', 'danger', 'success'].indexOf(value) > -1
                        || value.indexOf('#') === 0
                }
            },
            // 组件显示的值
            val: {
                type: [Number, String],
                default: 1
            },

            /** 显示内容的长度 */
            valLength: {
                type: [Number, String],
                default: 3
            },

            // 组件显示图标；当设置 icon 时，将忽略设置的 value 值
            icon: {
                type: String,
                default: ''
            },
            // 组件显示的最大值，当 value 超过 max，显示数字 +；仅当设置了 Number 类型的 value 值时生效
            max: {
                type: Number,
                default: -1
            },
            // 是否仅显示小圆点；当设置 dot 为 true 时，value, icon, max 均会被忽略
            dot: {
                type: Boolean,
                default: false
            },
            // 是否显示组件
            visible: {
                type: Boolean,
                default: true
            },
            // 组件相对于其兄弟组件的位置
            position: {
                type: String,
                default: 'top-right'
            },
            // 设置弧度 | 0的时候显示为方形， 可以是数字，百分比
            radius: {
                type: [String, Number],
                default: undefined
            },
            // 外部设置的 class name
            extCls: {
                type: String,
                default: ''
            }
        },
        computed: {
            text () {
                const _type = typeof this.val
                const _max = this.max
                let _value = this.val
                const _icon = this.icon
                const _isNumber = _type === 'number' || /^\d+$/.test(this.val)

                if (_icon) {
                    return _icon
                }

                if (_isNumber && _max > -1 && Number(_value) > _max) {
                    return _max + '+'
                } else {
                    _value += ''
                    const output = []
                    let count = 0
                    _value.split('').forEach(char => {
                        if (count < Number(this.valLength)) {
                            count += /[\u4e00-\u9fa5]/.test(char) ? 2 : 1
                            output.push(char)
                        }
                    })

                    return output.join('')
                }
            },
            hexTheme () {
                return /^#[0-9a-fA-F]{3,6}$/.test(this.theme)
            },

            /** 根据ICON Theme计算最终样式 */
            badgeStyle () {
                const isRadius = this.radius !== undefined && /^\d+(%|px|em|rem|vh|vw)?$/.test(this.radius)
                const _radius = (isRadius && /^\d+$/.test(this.radius) && `${this.radius}px`) || this.radius
                const style = (this.icon && { color: this.theme || '', borderColor: 'transparent', backgroundColor: '#fff' }) || {
                    color: this.hexTheme ? '#fff' : '',
                    backgroundColor: this.hexTheme ? this.theme : '',
                    borderColor: this.hexTheme ? this.theme : '',
                    borderWidth: this.dot ? '1px' : '2px'
                }

                isRadius && Object.assign(style, { borderRadius: _radius })
                return style
            },

            /** 根据ICON Theme计算Class */
            badgeClass () {
                return [
                    this.theme && !this.hexTheme ? ('bk-' + this.theme) : '',
                    this.$slots.default ? this.position : '',
                    {
                        pinned: this.$slots.default,
                        dot: this.dot,
                        'is-icon': !!this.icon
                    }
                ]
            }
        },
        methods: {
            handleHover () {
                this.$emit('hover')
            },
            handleLeave () {
                this.$emit('leave')
            }
        }
    }
</script>

<style>
@import '../../ui/badge.css';
</style>
