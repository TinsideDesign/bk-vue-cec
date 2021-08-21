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
    <transition class="bk-transition" :name="transitionName">
        <CollapseTransition v-if="name === 'collapse'">
            <slot></slot>
        </CollapseTransition>
        <slot v-else></slot>
    </transition>
</template>

<script>
    import CollapseTransition from '@/utils/transition'

    export default {
        name: 'bk-transition',
        components: {
            CollapseTransition
        },
        props: {
            name: {
                type: String,
                default: ''
            },
            durationTime: {
                type: String,
                default: '.3s'
            },
            durationType: {
                type: String,
                default: 'linear'
            }
        },
        computed: {
            transitionName () {
                return this.isCollapse ? '' : this.name
            },
            isCollapse () {
                return this.name === 'collapse'
            }
        },
        mounted () {
            const slot = this.getSlot()
            slot.elm.style.transitionDuration = this.durationTime
            slot.elm.style.transitionTimingFunction = this.durationType
        },
        methods: {
            getSlot () {
                return this.$slots.default[0]
            }
        }
    }
</script>

<style>
    .collapse-transition {
        transition: .2s height ease-in-out, .2s padding-top ease-in-out, .2s padding-bottom ease-in-out
    }
</style>
