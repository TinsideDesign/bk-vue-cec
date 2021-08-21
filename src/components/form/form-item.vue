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
    <div :class="['bk-form-item', { 'is-required': required, 'is-error': validator.state === 'error', 'is-checking': isChecking }, extCls]">
        <label :class="['bk-label', { 'has-desc': !!desc && descType === 'border' }]" :style="labelStyle" v-if="label">
            <template v-if="desc">
                <span class="bk-label-text" v-bk-tooltips="desc" v-if="descType === 'border'">{{label}}</span>
                <span class="bk-label-text" v-else>
                    {{label}}
                    <i :class="`bk-icon ${descIcon}`" v-bk-tooltips="desc"></i>
                </span>
            </template>
            <template v-else>
                <span class="bk-label-text">{{label}}</span>
            </template>
        </label>
        <div class="bk-form-content" :style="contentStyle">
            <slot></slot>
            <template v-if="isChecking">
                <div class="bk-spin-loading bk-spin-loading-primary bk-spin-loading-mini tooltips-icon" v-if="isChecking" :style="{ right: `${iconOffset}px` }">
                    <div class="rotate rotate1"></div>
                    <div class="rotate rotate2"></div>
                    <div class="rotate rotate3"></div>
                    <div class="rotate rotate4"></div>
                    <div class="rotate rotate5"></div>
                    <div class="rotate rotate6"></div>
                    <div class="rotate rotate7"></div>
                    <div class="rotate rotate8"></div>
                </div>
            </template>
            <template v-else-if="validator.content">
                <i
                    class="bk-icon icon-exclamation-circle-shape tooltips-icon"
                    v-bk-tooltips.top-end="validator"
                    :style="{ right: `${iconOffset}px` }"
                    v-if="errorDisplayType === 'tooltips'">
                </i>
                <p class="form-error-tip" v-else>{{validator.content}}</p>
            </template>
            <slot name="tip"></slot>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import emitter from '@/mixins/emitter'
    import locale from 'bk-magic-vue/lib/locale'
    import bkTooltips from '@/directives/tooltips'
    import promiseSequence from './promise-sequence'
    import { isNumber, isString, isEmpty, uuid } from '@/utils/util'

    Vue.use(bkTooltips)

    export default {
        name: 'bk-form-item',
        mixins: [emitter, locale.mixin],
        inject: ['form'],
        props: {
            label: {
                type: String
            },
            desc: {
                type: [String, Object],
                default: ''
            },
            descType: {
                type: String,
                default: 'border'
            },
            descIcon: {
                type: String,
                default: 'icon-question-circle'
            },
            labelWidth: {
                type: Number
            },
            required: {
                type: Boolean,
                default: false
            },
            rules: {
                type: Array,
                default () {
                    return []
                }
            },
            iconOffset: {
                type: Number,
                default: 8
            },
            property: {
                type: String,
                default: ''
            },
            // 外部设置的 class name
            extCls: {
                type: String,
                default: ''
            },
            errorDisplayType: {
                type: String,
                default: 'tooltips'
            },
            autoCheck: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                id: uuid(),
                isChecking: false,
                validator: {
                    state: '',
                    content: ''
                }
            }
        },
        computed: {
            labelStyle () {
                const labelWidth = this.labelWidth ? this.labelWidth : this.form.labelWidth
                return {
                    width: `${labelWidth}px`
                }
            },
            contentStyle () {
                const labelWidth = this.labelWidth ? this.labelWidth : this.form.labelWidth
                return {
                    'margin-left': `${labelWidth}px`
                }
            },
            fieldValue () {
                const formModel = this.form.model
                if (!formModel || !this.property) {
                    return
                }
                const paths = this.property.split('.')
                let data = formModel
                for (const path of paths) {
                    // 如果没有相应key，中断遍历
                    if (!data.hasOwnProperty(path)) {
                        data = undefined
                        return false
                    }
                    data = data[path]
                }

                return data
            }
        },
        created () {
            this.dispatch('bk-form', 'form-item-add', this)
        },
        mounted () {
            this.$off('form-blur', this.handlerBlur)
            this.$off('form-change', this.handlerChange)

            this.$on('form-blur', this.handlerBlur)
            this.$on('form-focus', this.handlerFocus)
            this.$on('form-change', this.handlerChange)

            if (this.autoCheck) {
                this.validate()
            }
        },
        beforeDestroy () {
            this.dispatch('bk-form', 'form-item-delete', this)
        },
        methods: {
            handlerBlur () {
                setTimeout(() => {
                    this.validate('blur')
                }, 0)
            },
            handlerChange () {
                setTimeout(() => {
                    this.validate('change')
                }, 0)
            },
            handlerFocus () {
                this.clearValidator()
            },
            setValidator (data) {
                this.validator = data
            },
            clearValidator () {
                this.validator.state = ''
                this.validator.content = ''
            },
            async checkRule (rule, model) {
                // 如果必填，并且内容为空
                if (rule.required && isEmpty(model)) {
                    return false
                }

                // 如果配置正则，优先用正则匹配
                if (rule.regex && !rule.regex.test(model)) {
                    return false
                }

                // string
                if (rule.min && isString(model) && model.length < rule.min) {
                    return false
                }

                if (rule.max && isString(model) && model.length > rule.max) {
                    return false
                }

                // number
                if (rule.min && isNumber(model) && model < rule.min) {
                    return false
                }

                if (rule.max && isNumber(model) && model > rule.max) {
                    return false
                }

                // 通过自定义方法来检测
                if (rule.validator && (typeof rule.validator === 'function')) {
                    const result = await rule.validator(model)
                    return result
                }

                return true
            },
            clearError () {
                this.validator.state = ''
                this.validator.content = ''
            },
            validate (trigger = '', callback = () => {}) {
                let rules = this.rules
                if (!rules.length && this.form.rules && Array.isArray(this.form.rules[this.property])) {
                    rules = this.form.rules[this.property]
                }

                this.isChecking = true

                rules = rules.filter(item => {
                    return item.trigger && item.trigger.indexOf(trigger) > -1
                })
                const valid = true
                if (!rules || !rules.length) {
                    this.validator.state = 'success'
                    this.validator.content = ''
                    callback(this.validator)
                    this.isChecking = false
                    return valid
                }
                const self = this
                const model = this.fieldValue
                const promises = []
                rules.forEach(rule => {
                    promises.push(function () {
                        return new Promise(async (resolve, reject) => {
                            const curRule = rule
                            try {
                                const result = await self.checkRule(curRule, model)
                                if (result) {
                                    resolve(curRule)
                                } else {
                                    reject(curRule)
                                }
                            } catch (e) {
                                reject(curRule)
                            }
                        })
                    })
                })

                promiseSequence(promises).then(rule => {
                    this.validator.field = this.property
                    this.validator.state = 'success'
                    this.validator.content = ''
                    callback(this.validator)
                }).catch(errors => {
                    this.validator.field = this.property
                    this.validator.state = 'error'
                    this.validator.content = typeof errors.message === 'function' ? errors.message(model) : errors.message
                    callback(this.validator)
                }).finally(errors => {
                    this.isChecking = false
                })
            }
        }
    }
</script>
