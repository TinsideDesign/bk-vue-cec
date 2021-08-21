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
    <div class="bk-table-setting-content">
        <h2 class="content-title">{{t('bk.table.setting.title')}}</h2>
        <div class="content-scroller">
            <div class="content-fields clearfix">
                <p class="setting-title">
                    {{t('bk.table.setting.fields.title')}}
                    <span class="setting-subtitle"
                        v-if="limit"
                        :class="{ 'is-limit': reachLimit }">
                        {{t('bk.table.setting.fields.subtitle', { max: limit })}}
                    </span>
                    <bk-checkbox class="fr setting-checkbox" v-else
                        :checked="allSelected"
                        @click.native="handleSelectAll">
                        {{t('bk.table.setting.fields.selectAll')}}
                    </bk-checkbox>
                </p>
                <bk-checkbox-group v-model="localSelected" class="fields-group">
                    <template v-for="field in fields">
                        <span class="fields-checkbox-wrapper" :key="field[valueKey]">
                            <bk-checkbox class="fields-checkbox"
                                :disabled="field.hasOwnProperty('disabled') ? !!field.disabled : false"
                                :value="field[valueKey]"
                                :title="field[labelKey]">
                                {{field[labelKey]}}
                            </bk-checkbox>
                        </span>
                    </template>
                </bk-checkbox-group>
            </div>
            <div class="content-line-height">
                <p class="setting-title">
                    {{t('bk.table.setting.lineHeight.title')}}
                </p>
                <div class="bk-button-group link-button-group">
                    <bk-button
                        size="small"
                        :class="['link-button', { 'is-selected': currentSize === 'small' }]"
                        @click="setSize('small')">
                        {{t('bk.table.setting.lineHeight.small')}}
                    </bk-button>
                    <bk-button
                        size="small"
                        :class="['link-button', { 'is-selected': currentSize === 'medium' }]"
                        @click="setSize('medium')">
                        {{t('bk.table.setting.lineHeight.medium')}}
                    </bk-button>
                    <bk-button
                        size="small"
                        :class="['link-button', { 'is-selected': currentSize === 'large' }]"
                        @click="setSize('large')">
                        {{t('bk.table.setting.lineHeight.large')}}
                    </bk-button>
                </div>
            </div>
        </div>
        <div class="content-options">
            <bk-button class="mr10" theme="primary"
                :disabled="reachLimit"
                @click="handleConfirm">
                {{t('bk.table.setting.options.ok')}}
            </bk-button>
            <bk-button theme="default" @click="handleCancel">{{t('bk.table.setting.options.cancel')}}</bk-button>
        </div>
    </div>
</template>

<script>
    import locale from 'bk-magic-vue/lib/locale'
    import bkCheckboxGroup from '../checkbox-group'
    import bkCheckbox from '../checkbox'
    import bkButton from '../button'
    export default {
        name: 'bk-table-setting-content',
        components: {
            bkCheckboxGroup,
            bkCheckbox,
            bkButton
        },
        mixins: [locale.mixin],
        props: {
            fields: {
                type: Array,
                default: () => ([])
            },
            selected: {
                type: Array,
                default: () => ([])
            },
            valueKey: {
                type: String,
                default: 'id'
            },
            labelKey: {
                type: String,
                default: 'label'
            },
            size: {
                type: String,
                default: 'small'
            },
            limit: Number
        },
        data () {
            return {
                localSelected: [],
                currentSize: 'small'
            }
        },
        computed: {
            fieldsState () {
                const disabled = []
                const available = []
                const fixed = []
                this.fields.forEach(field => {
                    if (field.disabled) {
                        disabled.push(field)
                        if (this.localSelected.includes(field[this.valueKey])) {
                            fixed.push(field)
                        }
                    } else {
                        available.push(field)
                    }
                })
                return {
                    disabled,
                    available,
                    fixed
                }
            },
            disabledFields () {
                return this.fieldsState.disabled
            },
            availableFields () {
                return this.fieldsState.available
            },
            fixedFields () {
                return this.fieldsState.fixed
            },
            allSelected () {
                return this.availableFields.every(field => this.localSelected.includes(field[this.valueKey]))
            },
            reachLimit () {
                return this.limit && this.localSelected.length > this.limit
            },
            popoverInstance () {
                return this.$parent.instance
            }
        },
        watch: {
            selected: {
                immediate: true,
                handler (value) {
                    this.setSelected()
                }
            },
            size: {
                immediate: true,
                handler (size) {
                    this.setSize(size)
                }
            },
            popoverInstance () {
                this.initCallback()
            }
        },
        methods: {
            initCallback () {
                this.popoverInstance.set({
                    onHidden: () => {
                        if (this.isConfirm) {
                            this.$emit('setting-change', {
                                fields: this.fields.filter(field => this.localSelected.includes(field[this.valueKey])),
                                size: this.currentSize
                            })
                        } else {
                            this.$emit('cancel')
                        }
                        this.isConfirm = false
                        this.$nextTick(() => {
                            this.setSelected()
                            this.setSize(this.size)
                        })
                    }
                })
            },
            setSelected () {
                this.localSelected = this.selected.map(field => field[this.valueKey])
            },
            setSize (size) {
                this.currentSize = size
            },
            handleSelectAll () {
                if (!this.allSelected) {
                    this.localSelected = this.fields.filter(field => this.fixedFields.includes(field) || !field.disabled).map(field => field[this.valueKey])
                } else {
                    this.localSelected = this.fixedFields.map(field => field[this.valueKey])
                }
            },
            handleConfirm () {
                this.isConfirm = true
                this.popoverInstance.hide()
            },
            handleCancel () {
                this.isConfirm = false
                this.popoverInstance.hide()
            }
        }
    }
</script>
