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
    <section :class="['bk-card', { 'bk-card-border-none': !border }]">
        <div :class="[collapseClass, { 'collapse': collapseActive }, { 'no-line-height': disableHeaderStyle }]" v-if="showHead" @click="handleCollapse">
            <i :class="`bk-icon bk-card-head-icon ${collapseIcon}`" v-if="isCollapse"></i>
            <slot name="header">
                <template v-if="showInput">
                    <span class="title" :title="renderTitle">{{ renderTitle }}</span>
                    <span class="card-edit">
                        <i class="bk-icon icon-edit-line" v-if="isEdit" @click="clickEdit"></i>
                    </span>
                </template>
                <bk-input v-else
                    ref="titleInputComp"
                    v-model="renderTitle"
                    ext-cls="bk-card-input"
                    @blur="saveEdit"
                    @enter="saveEdit" />
            </slot>
        </div>
        <template v-if="collapseActive">
            <div class="bk-card-body">
                <slot></slot>
            </div>
            <div class="bk-card-foot" v-if="showFoot">
                <slot name="footer"></slot>
            </div>
        </template>
    </section>
</template>
<script>
    import bkInput from '../input/input.vue'
    export default {
        name: 'bk-card',
        components: {
            bkInput
        },
        props: {
            /** 卡片标题 */
            title: {
                type: String,
                default: ''
            },
            /** 是否显示头部 */
            showHead: {
                type: Boolean,
                default: true
            },
            /** 是否显示底部 */
            showFoot: {
                type: Boolean,
                default: false
            },
            /** 是否可编辑标题 */
            isEdit: {
                type: Boolean,
                default: false
            },
            /** 是否支持展开&收起 */
            isCollapse: {
                type: Boolean,
                default: false
            },
            /** 支持自定义展开 & 收起的icon */
            collapseIcons: {
                type: Array,
                default: () => (['icon-angle-up-line', 'icon-angle-down-line'])
            },
            /** 展开 & 收起icon的位置 */
            position: {
                type: String,
                default: 'left'
            },
            /** 边框 */
            border: {
                type: Boolean,
                default: true
            },
            /** 默认展开 & 收起状态 */
            collapseStatus: {
                type: Boolean,
                default: true
            },
            /** 是否禁用card-header默认line-height样式 */
            disableHeaderStyle: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                /** 展开&收起的状态 */
                collapseActive: true,
                /** 是否显示编辑框 */
                showInput: true,
                renderTitle: ''
            }
        },
        computed: {
            /** 展开 & 收起展示的icon */
            collapseIcon () {
                return this.collapseIcons[Number(this.collapseActive)]
            },
            /** 卡片头部class */
            collapseClass () {
                return this.isCollapse ? `bk-card-head bk-card-head-${this.position}` : 'bk-card-head'
            }
        },
        watch: {
            title: {
                immediate: true,
                handler (value) {
                    this.renderTitle = value
                }
            },
            collapseStatus: {
                immediate: true,
                handler (value) {
                    this.collapseActive = value
                }
            }
        },
        methods: {
            /** 点击展开&收起 */
            handleCollapse () {
                if (!this.isCollapse) {
                    return
                }
                this.collapseActive = !this.collapseActive
                this.$emit('update:collapseStatus', this.collapseActive)
            },
            /** 点击编辑按钮 */
            clickEdit () {
                this.showInput = !this.showInput
                this.$nextTick(() => {
                    this.$refs.titleInputComp && this.$refs.titleInputComp.focus()
                })
            },
            /** 保存编辑的title */
            saveEdit () {
                this.showInput = true
                this.$emit('edit', this.renderTitle)
            }
        }
    }
</script>
<style lang='postcss'>
    @import '../../ui/card.css';
</style>
