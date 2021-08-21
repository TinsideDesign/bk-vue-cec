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
    <!-- eslint-disable vue/space-infix-ops -->
    <div tabindex="0" class="bk-color-picker-recommend"
        @focus="isFocused = true"
        @blur="isFocused = false"
        @keydown="handleKeydown">
        <div v-for="(color, index) in colors"
            :key="color + index"
            :style="{ background: color || '#fff' }"
            :class="{
                'bk-color-picker-recommend-color': true,
                'bk-color-picker-recommend-selected-color': isFocused && selectedIndex === index,
                'bk-color-picker-empty': color === ''
            }"
            @click="selectColor(index)">
            <div class="bk-color-picker-pointer" v-show="selectedIndex === index">
                <div class="bk-color-picker-circle"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import tinycolor from 'tinycolor2'
    import { clamp } from '../utils'

    export default {
        props: {
            colorObj: {
                type: Object,
                required: true
            },
            recommend: {
                type: [Boolean, Array],
                default: true
            }
        },
        data () {
            return {
                isFocused: false,
                selectedIndex: -1,
                selectedColor: null
            }
        },
        computed: {
            colors () {
                return this.getColorsFromRecommend(this.recommend)
            }
        },
        watch: {
            // 每次在外部修改颜色后预设面板都会取消预设选择的样式，即便预设和当前色一样
            // 预设里面修改颜色会在 $nextTick 恢复状态
            colorObj () {
                this.selectedIndex = -1
                this.selectedColor = null
            }
        },
        methods: {
            handleKeydown (e) {
                if (e.code === 'Tab') {
                    this.$emit('tab', e)
                } else {
                    let index = 0
                    const rowNum = 10 // 每行展示的颜色块个数，和样式相关联
                    const max = this.colors.length - 1
                    switch (e.code) {
                        case 'ArrowLeft':
                            e.preventDefault()
                            index = clamp(this.selectedIndex - 1, 0, max)
                            break
                        case 'ArrowRight':
                            e.preventDefault()
                            index = clamp(this.selectedIndex + 1, 0, max)
                            break
                        case 'ArrowUp':
                            e.preventDefault()
                            index = clamp(this.selectedIndex - rowNum, 0, max)
                            break
                        case 'ArrowDown':
                            e.preventDefault()
                            index = clamp(this.selectedIndex + rowNum, 0, max)
                            break
                        default:
                            return
                    }
                    this.selectColor(index)
                }
            },
            selectColor (index) {
                const color = this.colors[index]
                this.$emit('change', color)
                // 预设里面修改颜色不重置状态（恢复状态）
                this.$nextTick(() => {
                    this.selectedIndex = index
                    this.selectedColor = color
                })
            },
            /**
             * 校验、处理预设值
             * @param {Boolean|String[]} recommend
             * @returns {String[]}
             */
            getColorsFromRecommend (recommend) {
                if (recommend === true) {
                    return [
                        '',
                        '#ff4500',
                        '#ff8c00',
                        '#ffd700',
                        '#90ee90',
                        '#ddffff',
                        '#00ced1',
                        '#006DFF',
                        '#a933f5',
                        '#db7093',
                        '#000000',
                        '#494949',
                        '#9B9B9B',
                        '#ffffff'
                    ]
                } else if (Array.isArray(recommend)) {
                    // 如果预设值是无效的，这里按空字符串处理以显示提示用户，应该输入正确的色值
                    return recommend.map(color => tinycolor(color).isValid() ? color : '')
                }
            }
        }
    }
</script>
