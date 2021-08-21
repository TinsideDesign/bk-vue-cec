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
    <transition
        name="placement-slide"
        @after-leave="destroyEl">
        <div
            :class="['bk-notify', themeClass, hDirection, extCls]"
            :style="placementStyle"
            v-show="visible"
            @mouseenter="stopCountDown"
            @mouseleave="startCountDown">
            <div class="bk-notify-icon">
                <i :class="['bk-icon', tipsIcon]"></i>
            </div>
            <div class="bk-notify-content">
                <h3 v-if="title" class="bk-notify-content-title">{{title}}</h3>
                <slot>
                    <div
                        :class="['bk-notify-content-text', { limitLine: limitLine > 0 }]"
                        :style="contentStyle">
                        {{message}}
                        <button
                            v-if="showViewMore"
                            class="showMoreBtn"
                            @click="onClickViewMore">
                            {{t('bk.notify.showMore')}}
                        </button>
                    </div>
                </slot>
            </div>
            <div class="bk-notify-close" v-if="dismissable">
                <i class="bk-icon icon-close" @click.stop="close"></i>
            </div>
        </div>
    </transition>
</template>
<script>
/**
 * @desc 通知组件
 * @param {String} theme 主题(primary | error | warning | success)
 * @param {String} icon 提示信息 icon class 名称
 * @param {String} title 标题
 * @param {String | VNode} message 提示消息
 * @param {String} position 放置位置
 * @param {Number} delay 自动关闭定时时间
 * @param {Boolean} dismissable 是否显示关闭 icon
 * @param {Number} limit 消息提示组件同时显示的最大数目，默认不限制个数，设置为 0 时，清除所有实例
 * @param {Function} onClose 关闭回调函数
 */
    import locale from 'bk-magic-vue/lib/locale'

    const ICONS = {
        primary: 'icon-info-circle-shape',
        error: 'icon-close-circle-shape',
        warning: 'icon-exclamation-circle-shape',
        success: 'icon-check-circle-shape'
    }

    export default {
        name: 'bk-notify',
        mixins: [locale.mixin],
        data () {
            return {
                theme: 'primary',
                icon: '',
                title: '',
                message: '',
                position: 'top-right',
                delay: 5000,
                dismissable: true,
                limitLine: 2,
                showViewMore: false,
                verticalOffset: 0,
                horizonOffset: 0,
                visible: false,
                limit: 0,
                countID: null,
                onClose: function () {},
                extCls: ''
            }
        },
        computed: {
            themeClass () {
                return `bk-notify-${this.theme}`
            },
            vDirection () {
                return /top-/.test(this.position) ? 'top' : 'bottom'
            },
            hDirection () {
                return this.position.indexOf('right') > -1 ? 'right' : 'left'
            },
            placementStyle () {
                return {
                    [this.hDirection]: `${this.horizonOffset}px`,
                    [this.vDirection]: `${this.verticalOffset}px`

                }
            },
            contentStyle () {
                const contentStyle = {}
                if (this.limitLine > 0) {
                    contentStyle['max-height'] = `${20 * this.limitLine}px`
                }
                return contentStyle
            },
            tipsIcon () {
                return this.icon || ICONS[this.theme]
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
            onClickViewMore () {
                typeof this.onViewMoreHandler === 'function' && this.onViewMoreHandler()
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
            }
        }
    }
</script>
<style>
    @import '../../ui/notify.css';
</style>
