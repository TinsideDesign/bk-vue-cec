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
    <div class="bk-form-control" :name="name">
        <slot></slot>
    </div>
</template>

<script>
    import emitter from '@/mixins/emitter'

    /**
     * bk-radio-group
     * @module components/radio
     * @desc 单选框组合
     * @param name {String} - 名称
     * @example
        <bk-radio
            value="demo"
            v-model="value">
        </bk-radio>
     */
    export default {
        name: 'bk-radio-group',
        mixins: [emitter],
        props: {
            value: {
                type: [String, Number, Boolean],
                default: ''
            },
            name: {
                type: [String, Number],
                default () {
                    let seed = 0
                    const now = Date.now()
                    return `bk_radio_${now}_${seed++}`
                }
            }
        },
        data () {
            return {
                curValue: this.value,
                radios: []
            }
        },
        watch: {
            value () {
                if (this.curValue !== this.value) {
                    this.curValue = this.value
                    this.$nextTick(() => {
                        this.updateValue()
                    })
                }
            }
        },
        mounted () {
            this.updateValue()
        },
        methods: {
            findComponentsDownward (context, componentName) {
                return context.$children.reduce((components, child) => {
                    if (child.$options.name === componentName) components.push(child)
                    const foundChilds = this.findComponentsDownward(child, componentName)
                    return components.concat(foundChilds)
                }, [])
            },
            updateValue () {
                this.radios = this.findComponentsDownward(this, 'bk-radio').concat(
                    this.findComponentsDownward(this, 'bk-radio-button')
                )

                if (this.radios) {
                    this.radios.forEach(child => {
                        child.current = this.curValue
                    })
                }
            },
            change (data) {
                this.curValue = data.value
                this.updateValue()
                this.$emit('input', data.value)
                this.$emit('change', data.value)
                this.dispatch('bk-form-item', 'form-change')
            }
        }
    }
</script>
