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
    <div class="bk-table-filter-panel"
        :class="{ multiple }">
        <div class="panel-search" v-if="searchable">
            <i class="panel-search-icon bk-icon icon-search"></i>
            <input type="text"
                class="panel-search-input"
                v-model.trim="keyword"
                :placeholder="t('bk.table.filter.placeholder')">
        </div>
        <template v-if="multiple">
            <bk-checkbox-group class="panel-checkbox-group"
                v-show="!searchEmpty"
                v-model="selected">
                <bk-checkbox class="panel-checkbox"
                    v-for="filter in filters"
                    v-show="isMatched(filter)"
                    :key="filter.value"
                    :value="filter.value"
                    :disabled="!!filter.disabled">
                    {{filter.text}}
                </bk-checkbox>
            </bk-checkbox-group>
            <div class="panel-options" v-show="!searchEmpty">
                <bk-link class="panel-options-link" theme="primary" @click="handleConfirm">{{t('bk.table.confirm')}}</bk-link>
                <bk-link class="panel-options-link" theme="primary" @click="handleReset">{{t('bk.table.reset')}}</bk-link>
            </div>
        </template>
        <template v-else>
            <ul class="panel-list" v-show="!searchEmpty">
                <li class="panel-item"
                    :class="{
                        'is-selected': selected.length === 0,
                        'is-hidden': !!keyword.length
                    }"
                    @click="handleReset">
                    {{t('bk.table.all')}}
                </li>
                <li class="panel-item"
                    v-for="filter in filters"
                    :key="filter.value"
                    :class="{
                        'is-selected': selected.includes(filter.value),
                        'is-disabled': !!filter.disabled,
                        'is-hidden': !isMatched(filter)
                    }"
                    @click="handleSelect(filter)">
                    {{filter.text}}
                </li>
            </ul>
        </template>
        <p class="panel-empty" v-if="searchEmpty">{{t('bk.table.filter.empty')}}</p>
    </div>
</template>
<script>
    import bkCheckboxGroup from '@/components/checkbox-group'
    import bkCheckbox from '@/components/checkbox'
    import bkLink from '@/components/link'
    import Tippy from '@/utils/tippy'
    import locale from 'bk-magic-vue/lib/locale'

    export default {
        name: 'bk-table-filter-panel',
        components: {
            bkCheckboxGroup,
            bkCheckbox,
            bkLink
        },
        mixins: [locale.mixin],
        data () {
            return {
                instance: null,
                reference: null,
                filters: [],
                multiple: false,
                placement: 'bottom-start',
                method: null,
                selected: [],
                column: null,
                table: null,
                searchable: false,
                keyword: '',
                matchedFilters: []
            }
        },
        computed: {
            searchEmpty () {
                return this.keyword.length && !this.matchedFilters.length
            }
        },
        watch: {
            keyword () {
                this.setMatchedFilters()
            }
        },
        mounted () {
            this.instance = Tippy(this.reference, {
                theme: 'light bk-table-filter-panel',
                trigger: 'click',
                interactive: true,
                placement: this.placement,
                content: this.$el,
                onShow: () => {
                    this.column.filterOpened = true
                },
                onHide: () => {
                    this.column.filterOpened = false
                },
                onHidden: () => {
                    this.keyword = ''
                }
            })
        },
        methods: {
            setMatchedFilters () {
                const keyword = this.keyword.toLowerCase()
                this.matchedFilters = this.filters.filter(filter => {
                    const index = filter.text.toString().toLowerCase().indexOf(keyword)
                    return index > -1
                })
            },
            isMatched (filter) {
                if (!this.keyword.length) {
                    return true
                }
                return this.matchedFilters.includes(filter)
            },
            handleConfirm () {
                this.confirmFilter(this.selected)
                this.instance.hide()
            },
            handleReset () {
                this.selected = []
                this.handleConfirm()
            },
            handleSelect (filter) {
                if (filter.disabled) {
                    return
                }
                if (this.selected.includes(filter.value)) {
                    this.instance.hide()
                    return
                }
                this.selected = [filter.value]
                this.handleConfirm()
            },
            confirmFilter () {
                this.column.filteredValue = this.selected
                this.table.store.commit('filterChange', {
                    column: this.column,
                    values: this.selected
                })
                this.table.store.updateAllSelected()
            }
        }
    }
</script>
