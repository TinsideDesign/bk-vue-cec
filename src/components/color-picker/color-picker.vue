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
    <div ref="reference"
        tabindex="0"
        :class="['bk-color-picker', extCls, {
            [`bk-color-picker-${size}`]: size,
            'bk-color-picker-show-dropdown': showDropdown,
            'bk-color-picker-show-value': showValue,
            'bk-color-picker-disabled': disabled || readonly
        }]"
        @keydown="handleTriggerKeydown"
        @click="toggleDropdown"
        v-clickoutside="closeDropdown">
        <div class="bk-color-picker-color">
            <!-- 如果传入的色值为空字符串或者没有传值默认白色背景 + 中间一个叉 -->
            <span :class="['bk-color-picker-color-square', !colorStr && 'bk-color-picker-empty']"
                :style="{ background: colorStr || '#FFF' }"></span>
        </div>
        <div class="bk-color-picker-text" v-if="showValue">
            <span>{{ colorStr }}</span>
        </div>
        <div class="bk-color-picker-icon">
            <span class="bk-icon icon-angle-down"></span>
        </div>
        <transition name="transition-drop">
            <DatePickerDropdown v-show="showDropdown"
                v-transfer-dom
                :transfer="transfer"
                :data-transfer="transfer"
                style="padding: 0;cursor: default;"
                ref="drop">
                <div class="bk-color-picker-dropdown" @click.stop @mousedown.stop @keydown="handleDropdownKeydown">
                    <!-- 饱和度面板 -->
                    <SaturationPanel ref="saturationPanel" :color-obj="colorObj" @change="handleColorChange"></SaturationPanel>
                    <!-- 色彩条 -->
                    <HueSlider :color-obj="colorObj" @change="handleColorChange"></HueSlider>
                    <!-- 色彩值 -->
                    <ColorInput :color-obj="colorObj" @tab="handleTabInput" @change="handleColorChange"></ColorInput>
                    <!-- 预设值 -->
                    <div class="bk-color-picker-recommend-container" v-if="isRenderRecommend">
                        <RecommendColors :color-obj="colorObj"
                            :recommend="recommend"
                            @tab="handleTabRecommend"
                            @change="handleColorChange"
                        ></RecommendColors>
                    </div>
                </div>
            </DatePickerDropdown>
        </transition>
    </div>
</template>

<script>
    import DatePickerDropdown from '../date-picker/base/date-picker-dropdown'
    import SaturationPanel from './components/saturation-panel'
    import HueSlider from './components/hue-slider'
    import ColorInput from './components/color-input'
    import RecommendColors from './components/recommend-colors'
    import clickoutside from '@/directives/clickoutside'
    import transferDom from '@/directives/transfer-dom'
    import { formatColor, toRGBAString } from './utils'
    import tinycolor from 'tinycolor2'

    const whiteColorObj = formatColor('#FFFFFF')

    export default {
        name: 'bk-color-picker',
        components: {
            DatePickerDropdown,
            SaturationPanel,
            HueSlider,
            ColorInput,
            RecommendColors
        },
        directives: {
            clickoutside,
            transferDom
        },
        model: {
            event: 'change'
        },
        props: {
            value: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            },
            readonly: {
                type: Boolean,
                default: false
            },
            // 控制面板是否出现在 body 内
            transfer: {
                type: Boolean,
                default: false
            },
            size: {
                type: String,
                default: '',
                validator (val) {
                    return ['', 'large', 'small'].includes(val)
                }
            },
            // 是否在颜色选择器上显示色值
            showValue: {
                type: Boolean,
                default: true
            },
            // true 展示组件内置预设值
            // false 不展示预设值
            // 数组 自定义预设值
            recommend: {
                type: [Boolean, Array],
                default: true
            },
            extCls: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                showDropdown: false,
                // 当前颜色的色值，如果为空字符串显示：默认白色背景 + 中间一个叉
                colorStr: '',
                // 储存当前颜色的相关信息
                colorObj: whiteColorObj
            }
        },
        computed: {
            // 是否渲染预设值
            isRenderRecommend () {
                return Boolean(this.recommend === true || (Array.isArray(this.recommend) && this.recommend.length))
            }
        },
        watch: {
            value () {
                // 2. 如果组件绑定值被外部修改，自动根据绑定至更新组件色值
                this.changeColorFromProps()
            }
        },
        created () {
            // 1. 组件初始化时，如果计算的色值和传入的值不一样，显示计算的色值
            this.changeColorFromProps({ isCreated: true })
        },
        methods: {
            handleTriggerKeydown (e) {
                if (e.code === 'Enter' || e.code === 'NumpadEnter') {
                    this.toggleDropdown()
                } else if (e.code === 'Escape') {
                    this.closeDropdown()
                }
            },
            handleDropdownKeydown (e) {
                if (this.transfer) {
                    this.handleTriggerKeydown(e)
                }
            },
            toggleDropdown () {
                if (this.disabled || this.readonly) {
                    return
                }
                this.showDropdown ? this.closeDropdown() : this.openDropdown()
            },
            // 如果未开启预设则此 tab 事件为颜色选择器最后一个表单 tab 事件，重新聚焦于饱和度面板
            handleTabInput (e) {
                if (!this.isRenderRecommend) {
                    e.preventDefault()
                    this.$refs.saturationPanel.$el.focus()
                }
            },
            // 颜色选择器最后一个表单 tab 事件，重新聚焦于饱和度面板
            handleTabRecommend (e) {
                e.preventDefault()
                this.$refs.saturationPanel.$el.focus()
            },
            openDropdown () {
                this.showDropdown = true
                this.$refs.drop.update()
                // 展开后默认聚焦于 HEX 输入框，setTimeout 等 transfer 出现
                setTimeout(() => {
                    const hexInput = this.$refs.drop.$el.querySelector('.bk-color-picker-input-hex .bk-color-picker-input-value')
                    hexInput.select()
                }, 100)
            },
            closeDropdown () {
                if (this.showDropdown) {
                    this.$nextTick(() => this.$el.focus())
                    this.showDropdown = false
                    this.$refs.drop.destroy()

                    // 3. 关闭组件时如果绑定值与组件内部选择的值不一致（比如既没有使用 v-model 也没有监听 change 事件）显示绑定值
                    this.changeColorFromProps()
                }
            },
            /**
             * created 时、props.value 变化时、每次关闭组件时调用
             * @param {Object} option
             * @param {Boolean} [option.isCreated = false] - 是否是实例创建完成后的第一次调用
             */
            changeColorFromProps ({ isCreated = false } = {}) {
                // 空字符串为默认值且合法
                if (this.value === '') {
                    // 颜色选择器有色值，用户手动修改为空字符串；或用户关闭组件时绑定的value为空字符串（没有使用组件传递的值）
                    if (this.colorStr !== '') {
                        this.colorStr = ''
                        this.colorObj = whiteColorObj
                    }
                    return
                }

                // 根据 props 计算色值
                const colorObj = formatColor(this.value)
                const colorStr = colorObj.rgba.a === 1 ? colorObj.hex : toRGBAString(colorObj.rgba)

                // 根据 props 计算的色值和组件内部色值不一致，有几种情况
                if (colorStr !== this.colorStr) {
                    // 传入的值是否是合法的色值
                    const isValid = tinycolor(this.value).isValid()
                    // 实例挂载之前
                    if (isCreated) {
                        // 传入了非法的色值，按空字符串处理并触发 change 事件
                        if (!isValid) {
                            this.colorObj = whiteColorObj
                            this.$emit('change', '')
                        } else {
                            // 到了这里，说明传入的色值已经计算出来了，是合法的，但可能存在格式上的偏差，如用户传入 #fff 计算得 #FFFFFF
                            this.colorStr = colorStr.toLowerCase() === this.value.toLowerCase()
                                ? this.value // 如果只是大小写不一致，显示用户传入的字符
                                : colorStr // 其它格式上的不一致，以本组件计算值为准
                            this.colorObj = colorObj
                        }
                    } else { // 实例挂载之后
                        // 用户在实例挂载之后在组件外面修改色值 组件内部只是跟着 props 变化色值 并不触发 change 事件
                        if (!isValid) {
                            this.colorStr = ''
                            this.colorObj = whiteColorObj
                        } else if (colorStr.toLowerCase() !== this.colorStr.toLowerCase()) {
                            // 如果只是外部传入的值和当前组件显示的的值大小写不一致，不作处理
                            // 比如 this.value === '#ffffff'，计算值为 '#FFFFFF'，不进行下面的处理直接显示 '#ffffff'
                            // 反之显示内部计算值：
                            this.colorObj = colorObj
                            this.colorStr = colorStr
                        }
                    }
                }
            },
            /**
             * 组件内部选择颜色处理
             * @param {String|Object} val - hex,rgba,hsla,hsva
             */
            handleColorChange (val) {
                // 组件内拿到的色值都是合法的，空字符串特殊处理
                if (val === '') {
                    this.colorStr = ''
                    this.colorObj = whiteColorObj
                    this.$emit('change', '')
                    return
                }

                const colorObj = formatColor(val)
                const colorStr = colorObj.rgba.a === 1 ? colorObj.hex : toRGBAString(colorObj.rgba)
                this.colorObj = colorObj
                this.colorStr = colorStr
                this.$emit('change', colorStr)
            }
        }
    }
</script>

<style lang="postcss">
    @import "../../ui/color-picker.css";
</style>
