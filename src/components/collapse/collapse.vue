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
    <div class="bk-collapse" :class="extCls">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'bk-collapse',
        provide () {
            return {
                'collapse': this
            }
        },
        props: {
            accordion: {
                type: Boolean,
                default: false
            },
            value: {
                type: [Array, String]
            },
            // 外部设置的 class name
            extCls: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                currentActive: []
            }
        },
        watch: {
            value: {
                handler (value) {
                    if (Array.isArray(value)) {
                        this.currentActive = value.map(item => `${item}`)
                    } else if (typeof value !== 'undefined') {
                        this.currentActive = [`${value}`]
                    } else {
                        this.currentActive = []
                    }
                },
                immediate: true
            }
        },
        created () {
            this.itemList = []
            this.$on('inject', item => {
                this.itemList.push(item)
            })
            this.$on('item-toggle', this.itemToggle)
        },
        methods: {
            itemToggle (item) {
                if (this.accordion) {
                    this.currentActive = this.currentActive.length && this.currentActive[0] === item.name ? [] : [item.name]
                } else {
                    const index = this.currentActive.indexOf(item.name)
                    if (index > -1) {
                        this.currentActive.splice(index, 1)
                    } else {
                        this.currentActive.push(item.name)
                    }
                }

                this.$emit('input', this.currentActive)
                this.$emit('item-click', this.currentActive)
            }
        }
    }
</script>

<style>
    @import '../../ui/collapse.css';
</style>
