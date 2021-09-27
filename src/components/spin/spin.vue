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
    <transition name="fade">
        <div :class="['bk-spin', extCls]">
            <div :style="{ display: placement === 'right' ? 'flex' : '' }">
                <div :class="[dotClass]" v-if="!icon">
                    <div class="rotate1" :class="slotTypeClass"></div>
                    <div class="rotate2" :class="slotTypeClass"></div>
                    <div class="rotate3" :class="slotTypeClass"></div>
                    <div class="rotate4" :class="slotTypeClass"></div>
                    <div class="rotate5" :class="slotTypeClass"></div>
                    <div class="rotate6" :class="slotTypeClass"></div>
                    <div class="rotate7" :class="slotTypeClass"></div>
                    <div class="rotate8" :class="slotTypeClass"></div>
                </div>
                <div :class="[iconClass]" v-if="icon">
                    <i :class="['bk-icon', 'icon-' + icon]"></i>
                </div>
                <div :class="[slotClass]" v-if="$slots.default">
                    <slot></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    /**
     * bk-spin
     *
     * @module components/spin
     * @desc 加载组件
     *
     * @param theme {string} - 显示类型，接受 primary warning success danger
     * @param size {string} - 尺寸，接受 large normal small mini
     * @param icon {string} - 自定义 icon，使用T-inside icon
     * @param spinning {string} - 是否加载效果
     * @param placement {string} - 插槽位置，默认为bottom, 接受 bottom right
    */
    export default {
        name: 'bk-spin',
        props: {
            theme: {
                type: String,
                default: 'primary',
                validator (value) {
                    if (!['primary', 'warning', 'success', 'danger', 'info'].includes(value)) {
                        console.error(`theme property is not valid: '${value}'`)
                        return false
                    }
                    return true
                }
            },
            size: {
                type: String,
                default: 'small',
                validator (value) {
                    if (!['large', 'normal', 'small', 'mini'].includes(value)) {
                        console.error(`size property is not valid: '${value}'`)
                        return false
                    }
                    return true
                }
            },
            icon: {
                type: String,
                default: ''
            },
            // 外部设置的 class name
            extCls: {
                type: String,
                default: ''
            },
            placement: {
                type: String,
                default: 'bottom',
                validator (value) {
                    if (!['bottom', 'right'].includes(value)) {
                        console.error(`placement property is not valid: '${value}'`)
                        return false
                    }
                    return true
                }
            },
            spinning: {
                type: Boolean,
                default: true
            }
        },
        data () {
            return { }
        },
        computed: {
            dotClass () {
                const dotClass = [
                    `bk-spin-rotation`,
                    `bk-spin-rotation-${this.size}`,
                    `bk-spin-rotation-${this.theme}`
                ]
                !this.spinning && dotClass.push(`bk-spin-rotation-${this.theme}-wait`)
                this.placement === 'right' && dotClass.push(`bk-spin-rotation-flex`)
                this.placement === 'bottom' && dotClass.push(`bk-spin-rotation-margin`)
                return dotClass
            },
            slotTypeClass () {
                const slotType = [`rotate`]
                this.$slots.default && this.placement === 'right' && slotType.push(`slots-${this.placement}-rotate`)
                return slotType
            },
            iconClass () {
                const iconClass = [
                    `bk-spin-icon`,
                    `bk-spin-icon-${this.size}`,
                    `bk-spin-icon-${this.theme}`
                ]
                !this.spinning && iconClass.push(`bk-spin-icon-wait`)
                this.placement === 'right' && iconClass.push(`bk-display-flex`)
                return iconClass
            },
            slotClass () {
                const slotClass = [
                    `bk-spin-title`,
                    `bk-spin-title-${this.placement}`
                ]
                this.placement === 'right' && slotClass.push(`bk-spin-title-${this.size}`, `bk-display-flex`)
                return slotClass
            }
        }
    }
</script>
<style>
    @import '../../ui/spin.css';
</style>
