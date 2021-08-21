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
    <a
        :class="[
            'bk-link',
            `is-${theme}`,
            disabled && 'is-disabled',
            underline && !disabled && 'has-underline'
        ]"
        :href="href"
        v-bind="$attrs"
        @click="handleClick">
        <i :class="['bk-link-icon is-left', icon]" v-if="icon && iconPlacement === 'left'"></i>
        <span class="bk-link-text" v-if="$slots.default">
            <slot></slot>
        </span>
        <i :class="['bk-link-icon is-right', icon]" v-if="icon && iconPlacement === 'right'"></i>
    </a>
</template>

<script>
    export default {
        name: 'bk-link',
        props: {
            disabled: Boolean,
            underline: Boolean,
            href: {
                type: String,
                default: null
            },
            icon: String,
            iconPlacement: {
                type: String,
                default: 'left'
            },
            theme: {
                type: String,
                default: 'default',
                validator (val) {
                    return ['default', 'primary', 'success', 'warning', 'danger'].includes(val)
                }
            }
        },
        methods: {
            handleClick (event) {
                if (this.disabled) {
                    event.preventDefault()
                    return false
                }
                this.$emit('click', event)
            }
        }
    }
</script>

<style lang="postcss">
    @import '../../ui/link.css';
</style>
