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
    <ul class="bk-timeline" :class="extCls">
        <li
            class="bk-timeline-dot"
            :class="makeClass(item)"
            v-for="(item, index) in list"
            :key="index">
            <div class="bk-timeline-icon" v-if="isCustomIcon(item.icon)">
                <span class="bk-timeline-icon-inner">
                    <i :class="['bk-icon', `icon-${item.icon}`]" v-if="isBuiltinIcon(item.icon)"></i>
                    <vnode-icon :icon="item.icon" v-else-if="isVNodeIcon(item.icon)" />
                </span>
            </div>
            <div class="bk-timeline-section">
                <slot :name="`title${index}`" v-bind="item">
                    <div :class="['bk-timeline-title', { 'has-event': !!$listeners['select'] }]" v-if="item.tag !== ''" @click="toggle(item)" v-html="item.tag"></div>
                </slot>
                <div class="bk-timeline-content" v-if="item.content">
                    <template v-if="isNode(item)">
                        <slot :name="'nodeContent' + index">{{nodeContent(item, index)}}</slot>
                    </template>
                    <template v-else>
                        <div v-html="item.content" :title="computedTitle(item.content)"></div>
                    </template>
                </div>
            </div>
        </li>
    </ul>
</template>
<script>
    import { isVNode } from '@/utils/dom'

    export default {
        name: 'bk-timeline',
        components: {
            vnodeIcon: {
                functional: true,
                render: (h, ctx) => {
                    return ctx.props.icon
                }
            }
        },
        props: {
            list: {
                type: Array,
                required: true
            },
            titleAble: {
                type: Boolean,
                default: false
            },
            // 外部设置的 class name
            extCls: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                colorReg: /default|primary|warning|success|danger/
            }
        },
        methods: {
            toggle (item) {
                this.$emit('select', item)
            },
            makeClass (item) {
                const classPrefix = 'bk-timeline-item-'
                const classNames = [{
                    [`${classPrefix}filled`]: item.filled,
                    [`${classPrefix}custom-icon`]: this.isCustomIcon(item.icon)
                }]
                const dotColors = ['blue', 'red', 'green', 'yellow', 'gray']

                if (item.size) {
                    classNames.push(`${classPrefix}${item.size}`)
                }

                if (dotColors.includes(item.color)) {
                    classNames.push(`${classPrefix}${item.color}`)
                }

                if (item.type && this.colorReg.test(item.type)) {
                    classNames.push(`${classPrefix}${item.type}`)
                }

                return classNames
            },
            isNode (data) {
                if (isVNode(data.content)) {
                    return true
                } else {
                    return false
                }
            },
            nodeContent (data, index) {
                this.$slots[`nodeContent${index}`] = [data.content]
            },
            isBuiltinIcon (icon) {
                return typeof icon === 'string'
            },
            isVNodeIcon (icon) {
                return isVNode(icon)
            },
            isCustomIcon (icon) {
                return this.isBuiltinIcon(icon) || this.isVNodeIcon(icon)
            },
            computedTitle (str) {
                return this.titleAble ? str.replace(/<[^>]+>/g, '') : ''
            }
        }
    }
</script>
<style>
    @import '../../ui/timeline.css';
</style>
