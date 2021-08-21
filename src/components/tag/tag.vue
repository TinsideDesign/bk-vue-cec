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
    <section :class="classes" :style="style" @click="handleClick">
        <i :class="`bk-icon bk-tag-icon ${icon}`" v-if="icon"></i>
        <span><slot></slot></span>
        <i class="bk-icon icon-close bk-tag-close" v-if="closable" @click.stop="handleClose"></i>
    </section>
</template>
<script>
    export default {
        name: 'bk-tag',
        props: {
            /** icon */
            icon: {
                type: String,
                default: ''
            },
            /** 配置是否可关闭 */
            closable: {
                type: Boolean,
                default: false
            },
            /** 配置主题色，success / info / warning / danger  */
            theme: {
                type: String,
                default: ''
            },
            /** 配置类型，filled / stroke */
            type: {
                type: String,
                default: ''
            },
            /** 是否为可选择性tag */
            checkable: {
                type: Boolean,
                default: false
            },
            /** 标签的选中状态 */
            checked: {
                type: Boolean,
                default: false
            },
            /** 圆角设置 */
            radius: {
                type: String,
                default: '2px'
            },
            /** 外部设置的 class name */
            extCls: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
            }
        },
        computed: {
            classes () {
                return [
                    'bk-tag',
                    this.closable ? `bk-tag-closable` : '',
                    this.type ? `bk-tag-${this.type}` : '',
                    this.theme ? `bk-tag-${this.theme}` : '',
                    this.checkable ? `bk-tag-checkable` : '',
                    this.checked ? `bk-tag-check` : '',
                    this.extCls
                ]
            },
            style () {
                return {
                    'border-radius': this.radius
                }
            }
        },
        watch: {
        },
        methods: {
            // 关闭 tag
            handleClose (e) {
                e.stopPropagation()
                this.$emit('close', e)
            },
            // 点击 tag
            handleClick (e) {
                if (this.checkable) {
                    this.$emit('change', !this.checked)
                }
            }
        }
    }
</script>
<style lang='postcss'>
    @import '../../ui/tag.css';
</style>
