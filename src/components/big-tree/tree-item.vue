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

<template functional>
    <div class="bk-big-tree-node clearfix"
        v-if="props.node.visible"
        :id="props.node.uid"
        :class="{
            'is-root': props.node.parent === null,
            'is-leaf': !props.node.isFolder && props.node.isLeaf,
            'is-folder': props.node.isFolder,
            'is-expand': props.node.expanded,
            'is-selected': props.node.selected,
            'is-disabled': props.node.disabled,
            'is-checked': props.node.checked,
            'has-link-line': props.node.tree.hasLine
        }"
        :style="{
            '--level': props.node.level,
            '--line': props.node.line,
            '--padding': `${props.node.tree.padding}px`
        }"
        @click="props.node.tree.handleNodeClick(props.node)">
        <div class="node-options fl">
            <i v-if="props.node.loading" :class="props.node.tree.loadingClass"></i>
            <i v-else-if="props.node.isFolder || !props.node.isLeaf"
                :class="['node-folder-icon', props.node.expanded ? props.node.expandIcon : props.node.collapseIcon]"
                @click.stop="props.node.tree.handleNodeExpand(props.node)">
            </i>
            <span class="node-checkbox"
                v-if="props.node.hasCheckbox"
                :class="{
                    'is-disabled': props.node.disabled,
                    'is-checked': props.node.checked,
                    'is-indeterminate': props.node.indeterminate
                }"
                @click.stop="props.node.tree.handleNodeCheck(props.node)">
            </span>
            <i v-if="props.node.nodeIcon"
                :class="['node-icon', props.node.nodeIcon]">
            </i>
        </div>
        <div class="node-content">
            <slot
                :node="props.node"
                :data="props.node.data">
                {{props.node.name}}
            </slot>
        </div>
    </div>
</template>
