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
    <bk-popover
        ref="popover"
        size="regular"
        v-bind="$attrs"
        :theme="theme">
        <div slot="content" class="bk-popconfirm-content" :class="[extPopoverCls, { 'popconfirm-more': !isTiny }]">
            <div v-if="!isTiny" class="popconfirm-content">
                <slot name="content">
                    <div v-if="title" class="title">{{title}}</div>
                    <div v-if="content" class="content" :class="{ 'is-simple': isSimple }">{{content}}</div>
                </slot>
            </div>
            <div class="popconfirm-operate">
                <button v-if="localeOkText" :type="confirmButtonType" @click="confirm" class="default-operate-button primary">{{localeOkText}}</button>
                <span v-if="isTiny" class="popconfirm-split"></span>
                <button v-if="localeCancelText" :type="cancelButtonType" @click="cancel" class="default-operate-button">{{localeCancelText}}</button>
            </div>
        </div>
        <slot></slot>
    </bk-popover>
</template>

<script>
    import locale from 'bk-magic-vue/lib/locale'
    import bkPopover from '@/components/popover'
    export default {
        name: 'bk-popconfirm',
        components: {
            bkPopover
        },
        mixins: [locale.mixin],
        props: {
            tirgger: {
                type: String,
                default: 'mouseenter focus'
            },
            title: {
                type: String
            },
            content: {
                type: String
            },
            theme: {
                type: String,
                default: 'light-border'
            },
            confirmText: {
                type: String
            },
            cancelText: {
                type: String
            },
            confirmButtonIsText: {
                type: Boolean,
                default: false
            },
            cancelButtonIsText: {
                type: Boolean,
                default: false
            },
            // 外部设置的 class name
            // extCls: {
            //     type: String,
            //     default: ''
            // },
            // 外部设置的 popover class name
            extPopoverCls: {
                type: String,
                default: ''
            }
        },
        data () {
            return {}
        },
        computed: {
            localeOkText () {
                if (this.confirmText === undefined) {
                    return this.t('bk.dialog.ok')
                }
                return this.confirmText
            },
            localeCancelText () {
                if (this.cancelText === undefined) {
                    return this.t('bk.dialog.cancel')
                }
                return this.cancelText
            },
            isTiny () {
                return !this.$slots['content'] && !this.title && !this.content
            },
            isSimple () {
                return !this.$slots['content'] && !this.title
            },
            confirmButtonType () {
                return this.isTiny || this.confirmButtonIsText ? 'text' : 'button'
            },
            cancelButtonType () {
                return this.isTiny || this.cancelButtonIsText ? 'text' : 'button'
            }
        },
        methods: {
            confirm () {
                this.$refs['popover'].hideHandler()
                this.$emit('confirm')
            },
            cancel () {
                this.$refs['popover'].hideHandler()
                this.$emit('cancel')
            }
        }
    }
</script>

<style>
    @import '../../ui/popconfirm.css';
</style>
