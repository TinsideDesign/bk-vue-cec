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
    <form :class="[formCls, extCls]" @submit="formSubmit">
        <slot></slot>
    </form>
</template>

<script>
    export default {
        name: 'bk-form',
        props: {
            formType: {
                type: String,
                default: 'horizontal',
                validator (val) {
                    return ['vertical', 'inline', 'horizontal'].indexOf(val) > -1
                }
            },
            rules: {
                type: Object
            },
            labelWidth: {
                type: Number,
                default: 150
            },
            model: {
                type: Object
            },
            // 外部设置的 class name
            extCls: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                formItems: []
            }
        },
        computed: {
            formCls () {
                const style = ['bk-form']
                if (this.formType === 'vertical') {
                    style.push('bk-form-vertical')
                } else if (this.formType === 'inline') {
                    style.push('bk-inline-form')
                }
                return style
            }
        },
        provide () {
            return {
                form: this
            }
        },
        created () {
            this.$on('form-item-add', item => {
                if (item) {
                    this.formItems.push(item)
                }
                return false
            })
            this.$on('form-item-delete', item => {
                const index = this.formItems.findIndex(fromItem => fromItem.id === item.id)
                if (item && (index !== -1)) {
                    this.formItems.splice(index, 1)
                }
                return false
            })
        },
        methods: {
            formSubmit (e) {
                this.$emit('submit', this.formItems)
                e.preventDefault()
            },
            clearError () {
                for (const field of this.formItems) {
                    field.clearError()
                }
            },
            validate (callback) {
                return new Promise((resolve, reject) => {
                    let valid = true
                    let count = 0
                    const that = this
                    for (const field of this.formItems) {
                        field.validate('', validator => {
                            if (validator && validator.state === 'error') {
                                valid = false
                                reject(validator)
                                return false
                            }
                            // TODO: 优化callback, 无论成功失败都执行
                            if (++count === that.formItems.length) {
                                resolve(valid)
                                if (typeof callback === 'function') {
                                    callback(valid)
                                }
                            }
                        })
                    }
                })
            }
        }
    }
</script>

<style>
    @import '../../ui/form.css';
</style>
