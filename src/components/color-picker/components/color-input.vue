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
    <div class="bk-color-picker-input">
        <div class="bk-color-picker-input-hex">
            <InputContainer :info="hex" @input="handleInput"></InputContainer>
        </div>
        <div class="bk-color-picker-input-rgba">
            <InputContainer :info="r" @input="handleInput"></InputContainer>
            <InputContainer :info="g" @input="handleInput"></InputContainer>
            <InputContainer :info="b" @input="handleInput"></InputContainer>
            <InputContainer :info="a" @input="handleInput" @tab="handleAlphaTab"></InputContainer>
        </div>
    </div>
</template>

<script>
    import InputContainer from './input-container'
    import tinycolor from 'tinycolor2'

    export default {
        components: {
            InputContainer
        },
        props: {
            colorObj: {
                type: Object,
                required: true
            }
        },
        data () {
            return {
                hex: { key: 'hex', name: 'HEX', value: this.colorObj.hex, error: false },
                r: { key: 'r', name: 'R', value: this.colorObj.rgba.r.toString(), error: false },
                g: { key: 'g', name: 'G', value: this.colorObj.rgba.g.toString(), error: false },
                b: { key: 'b', name: 'B', value: this.colorObj.rgba.b.toString(), error: false },
                a: { key: 'a', name: 'Alpha', value: this.colorObj.rgba.a.toString(), error: false }
            }
        },
        watch: {
            colorObj (val) {
                if (tinycolor(val.hex).toString() !== tinycolor(this.hex.value).toString()) {
                    // 只有 hex 代表的颜色不同才同步，像这种手动输入了 #fEF 等价于 #ffeeff 就不同步
                    this.hex.value = val.hex
                }
                this.r.value = val.rgba.r.toString()
                this.g.value = val.rgba.g.toString()
                this.b.value = val.rgba.b.toString()
                this.a.value = val.rgba.a.toString()
                // 每次变化时校验以更新存在的错误
                this.validate()
            }
        },
        methods: {
            // 最后的 alpha 表单 tab 事件
            handleAlphaTab (e) {
                this.$emit('tab', e)
            },
            /**
             * 处理手动输入颜色
             * @param {String} key
             * @param {String} value
             */
            handleInput (key, value) {
                this[key].value = value
                if (this.validate()) {
                    const colorStr = key === 'hex'
                        ? this.hex.value
                        : `rgba(${this.r.value}, ${this.g.value}, ${this.b.value}, ${this.a.value})`
                    this.$emit('change', colorStr)
                }
            },
            // 判断表单输入值是否合法
            validate () {
                let result = true
                const { hex, r, g, b, a } = this
                // hex
                if (hex.value.startsWith('#')
                    && (hex.value.length === 4 || hex.value.length === 7)
                    && !hex.value.slice(1).match(/[^0-9a-fA-F]/)) {
                    hex.error = false
                } else {
                    hex.error = true
                    result = false
                }
                // a
                if (a.value !== '' && a.value >= 0 && a.value <= 1) {
                    a.error = false
                } else {
                    a.error = true
                    result = false
                }
                // r g b
                for (const colorInfo of [r, g, b]) {
                    const { value } = colorInfo
                    if (value !== '' && value >= 0 && value <= 255) {
                        colorInfo.error = false
                    } else {
                        colorInfo.error = true
                        result = false
                    }
                }
                return result
            }
        }
    }
</script>
