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
    <transition name="vertical-move" @after-leave="destroyEl" @enter="setShowCopyText">
        <div
            :class="['bk-message', themeClass, extCls]"
            :style="verticalStyle"
            v-show="visible"
            @mouseenter="stopCountDown"
            @mouseleave="startCountDown">
            <div class="bk-message-icon">
                <i :class="['bk-icon', tipsIcon]"></i>
            </div>
            <div :class="['bk-message-content', { 'multi-ellipsis': multiEllipsis, 'ellipsis': singleEllipsis }]"
                :style="ellipsisStyle"
                ref="content">
                <slot>{{message}}</slot>
            </div>
            <div :class="['bk-message-copy', { 'copied': copied }]"
                v-if="showCopyText"
                @click="copyContent">
                {{localeCopyText}}
            </div>
            <div class="bk-message-close" v-if="dismissable">
                <i :class="['bk-icon icon-close', showCopyText ? 'ml10' : 'ml30']" @click.stop="close"></i>
            </div>
        </div>
    </transition>
</template>
<script>
    /**
     * @desc 通知、提示组件
     * @param {String} theme 主题(primary | error | warning | success)
     * @param {String} icon 提示信息 icon class 名称
     * @param {String | VNode} message 提示消息
     * @param {Number} delay 自动关闭定时时间
     * @param {Boolean} dismissable 是否显示关闭 icon
     * @param {Number} limit 消息提示组件同时显示的最大数目
     * @param {Function} onClose 关闭回调函数
     * @param {Boolean} ellipsisCopy 内容隐藏时是否显示复制按钮
     */
    import { copyText, checkOverflow } from '@/utils/util'
    import locale from 'bk-magic-vue/lib/locale'

    const ICONS = {
        primary: 'icon-info-circle-shape',
        error: 'icon-close-circle-shape',
        warning: 'icon-exclamation-circle-shape',
        success: 'icon-check-circle-shape'
    }

    export default {
        name: 'bk-message',
        mixins: [locale.mixin],
        data () {
            return {
                theme: 'primary',
                message: '',
                delay: 3000,
                icon: '',
                dismissable: true,
                verticalOffset: 0,
                horizonOffset: 0,
                visible: false,
                countID: null,
                onClose: function () {},
                extCls: '',
                copied: false,
                ellipsisCopy: false,
                showCopyText: false
            }
        },
        computed: {
            themeClass () {
                return `bk-message-${this.theme}`
            },
            verticalStyle () {
                return {
                    top: `${this.verticalOffset}px`
                }
            },
            tipsIcon () {
                return this.icon || ICONS[this.theme]
            },
            singleEllipsis () {
                return this.ellipsisLine === 1
            },
            multiEllipsis () {
                return this.ellipsisLine > 1
            },
            ellipsisStyle () {
                return {
                    '--line': this.ellipsisLine
                }
            },
            localeCopyText () {
                return this.copied ? this.t('bk.message.copied') : this.t('bk.message.copy')
            }
        },
        mounted () {
            this.startCountDown()
        },
        methods: {
            destroyEl () {
                this.$destroy()
                this.$el.parentNode && this.$el.parentNode.removeChild(this.$el)
            },
            startCountDown () {
                if (this.delay > 0) {
                    this.countID = setTimeout(() => {
                        this.visible && this.close()
                    }, this.delay)
                }
            },
            stopCountDown () {
                clearTimeout(this.countID)
            },
            close () {
                this.visible = false
                typeof this.onClose === 'function' && this.onClose()
            },
            copyContent () {
                if (!this.$refs.content || this.copied) return

                const text = this.$refs.content.textContent
                copyText(text)
                this.copied = true
            },
            setShowCopyText () {
                this.showCopyText = this.ellipsisCopy && checkOverflow(this.$refs.content)
            }

        }
    }
</script>
<style>
    @import '../../ui/message.css';
</style>
