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
    <div class="bk-breadcrumb" aria-label="Breadcrumb" role="navigation">
        <div v-if="!$slots.prefix && backRouter" class="bk-breadcrumb-goback">
            <i class="bk-icon icon-arrows-left icon-default" @click="goBack"></i>
        </div>
        <div v-if="$slots.prefix" class="bk-breadcrumb-goback">
            <slot name="prefix"></slot>
        </div>
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'bk-breadcrumb',
        props: {
            separator: {
                type: String,
                default: '/'
            },
            separatorClass: {
                type: String,
                default: ''
            },
            backRouter: {
                type: [Object, String],
                default: () => null
            },
            replace: {
                type: Boolean,
                default: false
            }
        },
        provide () {
            return {
                bkBreadcrumb: this
            }
        },
        mounted () {
            const items = this.$el.querySelectorAll('.bk-breadcrumb__item')
            if (items.length) {
                items[items.length - 1].setAttribute('aria-current', 'page')
            }
        },
        methods: {
            goBack () {
                const { backRouter, $router } = this
                if (!backRouter || !$router) return
                this.replace ? $router.replace(backRouter) : $router.push(backRouter)
            }
        }
    }
</script>
<style>
    @import "../../ui/breadcrumb.css";
</style>
