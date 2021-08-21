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
    <section class="bk-tab-content" v-if="shouldRender" v-show="active">
        <slot></slot>
    </section>
</template>

<script>
    export default {
        name: 'bk-tab-panel',
        props: {
            name: {
                type: [String, Number],
                required: true
            },
            label: {
                type: String,
                required: false
            },
            closable: {
                type: Boolean,
                default: undefined
            },
            visible: {
                type: Boolean,
                default: true
            },
            disabled: Boolean,
            sortable: {
                type: Boolean,
                default: true
            },
            renderDirective: {
                type: String,
                default: 'show',
                validator (val) {
                    return ['if', 'show'].includes(val)
                }
            },
            renderLabel: Function
        },
        computed: {
            tabInstance () {
                let parent = this.$parent
                while (parent && !parent.isTab) {
                    parent = parent.$parent
                }
                return parent
            },
            shouldRender () {
                const directive = this.renderDirective
                return directive === 'show' || (this.active && directive === 'if')
            },
            active () {
                return this.tabInstance.localActive === this.name
            }
        },
        created () {
            if (this.tabInstance.isTab) {
                this.tabInstance.registerPanel(this)
            } else {
                console.error('"bk-tab-panel"\'s parent element must be "bk-tab"')
            }
        },
        beforeDestroy () {
            if (this.tabInstance.isTab) {
                this.tabInstance.deletePanel(this)
            }
        }
    }
</script>
