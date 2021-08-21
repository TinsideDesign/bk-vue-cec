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
    <transition name="bk-alert-leave" @before-leave="beforeLeave" @leave="leave" @after-leave="afterLeave">
        <div v-if="visible" class="bk-alert" :class="typeClass">
            <div class="bk-alert-wraper">
                <i v-if="showIcon" class="bk-icon icon-info" />
                <div class="bk-alert-content">
                    <div class="bk-alert-title">
                        <slot name="title">
                            {{ title }}
                        </slot>
                    </div>
                    <div class="bk-alert-description"></div>
                </div>
                <span v-if="closable" class="bk-alert-close" :class="closeClasses" @click="handleClose">{{ closeText }}</span>
            </div>
        </div>
    </transition>
</template>
<script>
    export default {
        name: 'bk-alert',
        props: {
            type: {
                type: String,
                default: 'info'
            },
            title: {
                type: String,
                default: ''
            },
            closable: {
                type: Boolean,
                default: false
            },
            closeText: {
                type: String
            },
            showIcon: {
                type: Boolean,
                default: true
            }
        },
        data () {
            return {
                visible: true
            }
        },
        computed: {
            typeClass () {
                return `bk-alert-${this.type}`
            },
            closeClasses () {
                const classes = {}
                if (this.closeText) {
                    classes['close-text'] = true
                } else {
                    classes['bk-icon'] = true
                    classes['icon-close'] = true
                }
                return classes
            }
        },
        methods: {
            beforeLeave (el) {
                const { height } = el.getBoundingClientRect()
                el.style.height = `${height}px`
            },
            leave (el) {
                setTimeout(() => {
                    el.style.height = 0
                })
            },
            afterLeave (el) {
                el.style.height = ''
            },
            handleClose () {
                this.visible = false
                this.$emit('close')
            }
        }
    }
</script>
<style lang='postcss'>
    @import '../../ui/alert.css';
</style>
