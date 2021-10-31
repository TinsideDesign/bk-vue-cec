<!--
 * Tencent is pleased to support the open source community by making
 * 科技内在设计（T-inside） available.
 *
 * Copyright (C) 2021 TID Limited, a DAO.  All rights reserved.
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
    <section>
        <h2>
            <i href="javascript:void(0)" class="back-icon bk-icon icon-arrows-left" @click="back"></i>
            Tree 按钮更多示例
        </h2>
        <div class="example-item">
            <div class="tree3">
                <input class="tree-search-input" type="text" v-model="searchword" placeholder="search..." />
                <bk-button class="tree-search-btn" @click="search">search</bk-button>
                <bk-tree
                    ref="tree1"
                    :is-delete-root="false"
                    :data="treeData1"
                    :node-key="'id'"
                    :has-border="true"
                    :draggable="true"
                    @on-check="nodechekced"
                    @on-click="nodeClicked"
                    @on-expanded="nodeExpanded"
                    :multiple="true">
                </bk-tree>
                <div v-if="isEmpty">暂无数据</div>
                <bk-button class="tree-search-btn" @click="searchSelected">searchSelected</bk-button>
            </div>
        </div>
        <div class="example-item">
            <div style="display: flex;">
                <div class=" flex-1">
                    <bk-tree
                        ref="tree2"
                        :is-delete-root="false"
                        :data="treeData4"
                        :has-border="true"
                        :node-key="'id'"
                        :draggable="true"
                        @on-click="nodeClicked4"
                        @on-expanded="nodeExpanded4"
                        :multiple="false">
                    </bk-tree>
                </div>
                <div class="">
                    <bk-tree
                        ref="tree2"
                        :is-delete-root="false"
                        :data="treeData4"
                        :has-border="true"
                        :node-key="'id'"
                        @on-click="nodeClicked4"
                        @on-expanded="nodeExpanded4"
                        :multiple="false">
                    </bk-tree>
                </div>
            </div>
        </div>
        <div class="example-item">
            <div class="tree3">
                <bk-tree ref="tree2"
                    :data="treeData2"
                    :multiple="false"
                    :draggable="true"
                    :node-key="'id'"
                    @async-load-nodes="asyncLoad2"
                    @on-drag-node="dragNodeEnd"
                    @on-expanded="nodeExpandeds">
                </bk-tree>
            </div>
        </div>
    </section>
</template>
<script>
    import { bkTree, bkButton } from '@'

    export default {
        components: {
            bkTree,
            bkButton
        },
        data () {
            return {
                isEmpty: false,
                searchword: '',
                initSelected: ['node-1'],
                treeData1: [{
                    name: 'tree node1',
                    title: 'tree node1',
                    expanded: true,
                    id: 1,
                    children: [
                        {
                            name: 'tree node 1-1',
                            title: 'tree node 1-1',
                            expanded: true,
                            children: [
                                { name: 'tree node 1-1-1', title: 'tree node 1-1-1', id: 2 },
                                { name: 'tree node 1-1-2', title: 'tree node 1-1-2', id: 3 },
                                { name: 'tree node 1-1-3', title: 'tree node 1-1-3', id: 4 }
                            ]
                        },
                        {
                            title: 'tree node 1-2',
                            name: 'tree node 1-2',
                            id: 5,
                            expanded: true,
                            children: [
                                { name: 'tree node 1-2-1', title: 'tree node 1-2-1', id: 6 },
                                { name: 'tree node 1-2-2', title: 'tree node 1-2-2', id: 7 }
                            ]
                        }
                    ]
                }],
                treeData4: [{
                    title: 'node1',
                    name: 'node1',
                    expanded: true,
                    id: 1,
                    children: [
                        {
                            title: 'node 1-1',
                            name: 'node 1-1',
                            expanded: true,
                            children: [
                                { title: 'node 1-1-1', name: 'node 1-1-1', id: 2 },
                                { title: 'node 1-1-2', name: 'node 1-1-2', id: 3 },
                                { title: 'node 1-1-3', name: 'node 1-1-3', id: 4 }
                            ]
                        },
                        {
                            title: 'node 1-2',
                            name: 'node 1-2',
                            id: 5,
                            expanded: true,
                            children: [
                                { title: 'node 1-2-1', name: 'node 1-2-1', id: 6 },
                                { title: 'node 1-2-2', name: 'node 1-2-2', id: 7 }
                            ]
                        }
                    ]
                }],
                treeData2: [{
                    title: 'node1',
                    name: 'node1',
                    expanded: false,
                    async: true
                }]
            }
        },
        methods: {
            back () {
                window.history.go(-1)
            },
            searchSelected () {
                console.log(this.$refs.tree1.getNode('id'))
            },
            nodeExpanded (node, expanded) {
                console.log(node)
                console.log(expanded)
            },
            nodeExpandeds (node, expanded) {
                console.log(node)
                console.log(expanded)
            },
            nodeClicked (node) {
                console.log(node)
            },
            nodeClicked4 (node) {
                console.log(node)
            },
            nodechekced4 (node, v) {
                console.log(node)
                console.log(v)
            },
            nodeExpanded4 (node, expanded) {
                console.log(node)
                console.log(expanded)
            },
            nodechekced (node, v) {
                console.log(node)
                console.log(v)
            },
            dragNodeEnd (dragNode, targetNode) {
                console.log(dragNode)
                console.log(targetNode)
            },
            tpl (node, ctx) {
                let titleClass = node.selected ? 'node-title node-selected' : 'node-title'
                if (node.searched) titleClass += ' node-searched'
                return <span>
                    <span class={titleClass} domPropsInnerHTML={node.title} onClick={() => {
                        this.$refs.tree1.nodeSelected(node)
                    }}></span>
                    <button class="treebtn3" onClick={() => this.$refs.tree1.delNode(node.parent, node)}>delete</button>
                    <button class="treebtn3" onClick={() => this.$refs.tree1.addNode(node, { title: 'sync node', id: 88 })}>add</button>
                </span>
            },
            async asyncLoad1 (node) {
                this.$set(node, 'loading', true)
                const pro = new Promise((resolve, reject) => {
                    setTimeout(resolve, 2000, ['async node1', 'async node2'])
                })
                this.$refs.tree1.addNodes(node, await pro)
                this.$set(node, 'loading', false)
            },
            async asyncLoad2 (node) {
                this.$set(node, 'loading', true)
                const pro = await new Promise((resolve, reject) => {
                    setTimeout(resolve, 2000, [{ name: 'test1', title: 'test1', async: true, id: 99 }, { name: 'test1', title: 'test2', async: true, id: 97 }, { name: 'test1', title: 'test3', id: 96 }])
                })
                pro.forEach((el) => {
                    if (!node.hasOwnProperty('children')) {
                        this.$set(node, 'children', [])
                    }
                    node.children.push(el)
                })
                this.$set(node, 'loading', false)
            },
            search () {
                this.$refs.tree1.searchNode(this.searchword)
                // console.log(this.$refs.tree1.getSearchResult())
                this.isEmpty = this.$refs.tree1.getSearchResult().isEmpty
            },
            beforeChange (node) {
                console.log('111')
                console.log(node)
            }
        }
    }
</script>
<style lang="postcss">
    .tree3 {
        /* float: left; */
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        border: 1px dotted #ccccdd;
        overflow: auto;
        height: 800px;
    }
    .treebtn1 {
        background-color: transparent;
        border: 1px solid #ccc;
        padding: 1px 3px;
        border-radius: 5px;
        margin-right: 5px;
        color: rgb(148, 147, 147);
    }
    .treebtn2 {
        background-color: transparent;
        border: 1px solid #ccc;
        padding: 3px 5px;
        border-radius: 5px;
        margin-left: 5px;
        color: rgb(97, 97, 97);
    }
    .treebtn3 {
        background-color: transparent;
        border: 1px solid #ccc;
        padding: 3px 5px;
        border-radius: 5px;
        margin-left: 5px;
        color: rgb(63, 63, 63);
    }
    .tree-search-input {
        width: 70%;
        padding: 5px 8px;
        outline: none;
        border-radius: 6px;
        border:1px solid #ccc;
        vertical-align: top;
    }
    .tree-search-btn {
        width: 25%;
        /*padding: 6px 8px;*/
        outline: none;
        border-radius: 6px;
        background-color: rgb(218, 218, 218);
        border:1px solid rgb(226, 225, 225);
        color: rgb(117, 117, 117);
    }
</style>
