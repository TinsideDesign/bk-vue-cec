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
    <div class="bk-select-tag-container"
        :class="{
            'is-fixed-height': select.collapseTag,
            'is-focus': select.focus,
            'is-available': !select.disabled && !select.readonly,
            'is-disabled': select.disabled,
            'is-readonly': select.readonly,
            'is-large-size': select.size === 'large',
            'is-small-size': select.size === 'small',
            'has-prefix-icon': !!select.prefixIcon
        }">
        <div class="bk-select-tag"
            :class="{ 'width-limit-tag': select.isTagWidthLimit }"
            v-for="option in select.selectedOptions"
            :key="option.id">
            <span>{{option.name}}</span>
            <i class="bk-icon icon-close" @click="handleRemoveSelected($event, option)"></i>
        </div>
    </div>
</template>

<script>
    export default {
        inject: ['select'],
        data () {
            return {
                overflowTagNode: null,
                overflowTagIndex: null
            }
        },
        mounted () {
            this.calcOverflow()
            this.$watch(() => this.select.focus, this.calcOverflow)
            this.$watch(() => this.select.selected, this.calcOverflow)
        },
        methods: {
            handleRemoveSelected (event, option) {
                if (this.select.disabled || this.select.readonly) {
                    return false
                }
                event.stopPropagation()
                this.select.handleTabRemove(option)
                this.select.unselectOption(option)
            },
            getTagDOM (index) {
                const tags = [].slice.call(this.$el.querySelectorAll('.bk-select-tag'))
                return typeof index === 'number' ? tags[index] : tags
            },
            // 计算第二行第一个的index，在其前方插入overflow tag
            calcOverflow () {
                this.reomveOverflowTagNode()
                if (!this._isMounted || !this.select.collapseTag || this.select.focus || this.select.selected.length < 2) {
                    return false
                }
                setTimeout(() => {
                    const tags = this.getTagDOM()
                    const tagIndexInSecondRow = tags.findIndex((currentUser, index) => {
                        if (!index) {
                            return false
                        }
                        const previousTag = tags[index - 1]
                        return previousTag.offsetTop !== currentUser.offsetTop
                    })
                    if (tagIndexInSecondRow > -1) {
                        this.overflowTagIndex = tagIndexInSecondRow
                    } else {
                        this.overflowTagIndex = null
                    }
                    this.$el.scrollTop = 0
                    this.insertOverflowTag()
                })
            },
            // 根据计算的overflow index，插入tag并进行校正
            insertOverflowTag () {
                if (!this.overflowTagIndex) {
                    return
                }
                const overflowTagNode = this.getOverflowTagNode()
                const referenceTag = this.getTagDOM(this.overflowTagIndex)
                if (referenceTag) {
                    this.setOverflowTagContent()
                    this.$el.insertBefore(overflowTagNode, referenceTag)
                } else {
                    this.overflowTagIndex = null
                    return
                }
                setTimeout(() => {
                    const previousTag = this.getTagDOM(this.overflowTagIndex - 1)
                    if (overflowTagNode.offsetTop !== previousTag.offsetTop) {
                        this.overflowTagIndex--
                        this.$el.insertBefore(overflowTagNode, overflowTagNode.previousSibling)
                        this.setOverflowTagContent()
                    }
                })
            },
            setOverflowTagContent () {
                this.overflowTagNode.textContent = `+${this.select.selected.length - this.overflowTagIndex}`
            },
            // 创建/获取溢出数字节点
            getOverflowTagNode () {
                if (this.overflowTagNode) {
                    return this.overflowTagNode
                }
                const overflowTagNode = document.createElement('span')
                overflowTagNode.className = 'bk-select-overflow-tag'
                this.overflowTagNode = overflowTagNode
                return overflowTagNode
            },
            // 从容器中移除溢出数字节点
            reomveOverflowTagNode () {
                if (this.overflowTagNode && this.overflowTagNode.parentNode === this.$el) {
                    this.$el.removeChild(this.overflowTagNode)
                }
            }
        }
    }
</script>
