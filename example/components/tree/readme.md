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
                treeListOne: [
                    {
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
                    }
                ],
                treeListThree: [
                    {
                        name: 'async nodes',
                        expanded: false,
                        openedIcon: 'icon-folder-open',
                        closedIcon: 'icon-folder',
                        async: true,
                        id: 1
                    }
                ],
                treeListTwo: [
                    {
                        name: '集群[批量启动进程模块1]',
                        expanded: true,
                        openedIcon: 'icon-folder-open',
                        closedIcon: 'icon-folder',
                        id: 1,
                        children: [
                            { name: 'testwa.fda.1.1', icon: 'icon-file', id: 2 },
                            { name: 'testwa.fda.1.2', icon: 'icon-file', title: 'testwa.fda.1.2', id: 3 },
                            { name: 'testwa.fda.1.3', icon: 'icon-file', id: 4, parentId: 1 },
                            {
                                name: '集群[批量启动进程子模块1]',
                                openedIcon: 'icon-folder-open',
                                closedIcon: 'icon-folder',
                                expanded: true,
                                id: 5,
                                children: [
                                    { name: 'testwa.fda.2.1', icon: 'icon-file', id: 6 },
                                    { name: 'testwa.fda.2.2', icon: 'icon-file', id: 7 },
                                    { name: 'testwa.fda.2.3', icon: 'icon-file', id: 8 }
                                ]
                            },
                            { name: '集群[批量启动进程子模块2]', icon: 'icon-file', id: 9 },
                            { name: '集群[批量启动进程子模块3]', icon: 'icon-file', id: 10 },
                            { name: '集群[批量启动进程子模块4]', icon: 'icon-file', id: 11 }
                        ]
                    }
                ],
                treeListFour: [
                    {
                        name: '集群[批量启动进程模块1]',
                        expanded: true,
                        openedIcon: 'icon-folder-open',
                        closedIcon: 'icon-folder',
                        id: 1,
                        children: [
                            { name: 'testwa.fda.1.1', icon: 'icon-file', id: 2 },
                            { name: 'testwa.fda.1.2', icon: 'icon-file', title: 'testwa.fda.1.2', id: 3 },
                            { name: 'testwa.fda.1.3', icon: 'icon-file', id: 4 },
                            {
                                name: '集群[批量启动进程子模块1]',
                                openedIcon: 'icon-folder-open',
                                closedIcon: 'icon-folder',
                                expanded: true,
                                id: 5,
                                children: [
                                    { name: 'testwa.fda.2.1', icon: 'icon-file', id: 6 },
                                    { name: 'testwa.fda.2.2', icon: 'icon-file', id: 7 },
                                    { name: 'testwa.fda.2.3', icon: 'icon-file', id: 8 }
                                ]
                            },
                            {
                                name: '集群[批量启动进程子模块2]',
                                icon: 'icon-file',
                                id: 9
                            }
                        ]
                    }
                ],
                treeListFive: [
                    {
                        name: '集群[批量启动进程模块1]',
                        expanded: true,
                        openedIcon: 'icon-folder-open',
                        closedIcon: 'icon-folder',
                        id: 1,
                        children: [
                            { name: 'testwa.fda.1.1', icon: 'icon-file', id: 2 },
                            { name: 'testwa.fda.1.2', icon: 'icon-file', title: 'testwa.fda.1.2', id: 3 },
                            {
                                name: '集群[批量启动进程子模块1]',
                                openedIcon: 'icon-folder-open',
                                closedIcon: 'icon-folder',
                                id: 5,
                                expanded: true,
                                children: [
                                    { name: 'testwa.fda.2.1', icon: 'icon-file', id: 6 },
                                    { name: 'testwa.fda.2.2', icon: 'icon-file', id: 7 },
                                    { name: 'testwa.fda.2.3', icon: 'icon-file', id: 8 }
                                ]
                            },
                            {name: 'testwa.fda.1.3', icon: 'icon-file', id: 4 },
                            {name: '集群[批量启动进程子模块2]', icon: 'icon-file', id: 9 }
                        ]
                    }
                ],
                treeListSix: [
                    {
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
                                    { name: 'tree node 1-2-1', title: "tree node 1-2-1", id: 6 },
                                    { name: 'tree node 1-2-2', title: "tree node 1-2-2", id: 7 }
                                ]
                            }
                        ]
                    }
                ],
                searchWord: '',
                dragSort: false
            }
        },
        methods: {
            nodeClickOne (node) {
                console.log(node)
            },
            nodeClickTwo (node) {
                console.log(node)
            },
            nodeClickThree (node) {
                console.log(node)
            },
            nodeClickFour (node) {
                console.log(node)
            },
            nodeClickFive (node) {
                console.log(node)
            },
            nodeCheckOne (node, checked) {
                console.log(node)
                console.log(checked)
            },
            nodeCheckTwo (node, checked) {
                console.log(node)
                console.log(checked)
            },
            nodeCheckThree (node, checked) {
                console.log(node)
                console.log(checked)
            },
            nodeCheckFour (node, checked) {
                console.log(node)
                console.log(checked)
            },
            nodeExpandedOne (node, expanded) {
                console.log(node)
                console.log(expanded)
            },
            nodeExpandedTwo (node, expanded) {
                console.log(node)
                console.log(expanded)
            },
            nodeExpandedThree (node, expanded) {
                console.log(node)
                console.log(expanded)
            },
            nodeExpandedFour (node, expanded) {
                console.log(node)
                console.log(expanded)
            },
            nodeExpandedFive (node, expanded) {
                console.log(node)
                console.log(expanded)
            },
            dragNodeEnd (dragNode, targetNode) {
                console.log(dragNode)
                console.log(targetNode)
            },
            randomId () {
                return Math.ceil(Math.random() * 66) * Math.ceil(Math.random() * 88) + 1
            },
            async asyncLoadNodes (node) {
                this.$set(node, 'loading', true)
                let pro = await new Promise((resolve, reject) => {
                    setTimeout(resolve, 2000, [{name: 'async node', async: true, id: this.randomId()}, {name: 'async node', id: this.randomId()}])
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
                this.$refs.tree5.searchNode(this.searchWord)
                const searchResult = this.$refs.tree5.getSearchResult()
                this.isEmpty = searchResult.isEmpty
            },
            dragNodeEnd (dragNode, targetNode) {
                console.log(dragNode)
                console.log(targetNode)
            },
            nodeClickSix (node) {
                console.log(node)
            },
            nodeExpandedSix (node, expanded) {
                console.log(node)
                console.log(expanded)
            },
            tpl (node, ctx) {
                let titleClass = node.selected ? 'node-title node-selected' : 'node-title'
                return <span>
                    <span class={titleClass} domPropsInnerHTML={node.title} onClick={() => {this.$refs.tree6.nodeSelected(node)}}></span>
                    <span class="add-button" onClick={() => this.$refs.tree6.addNode(node, {name: 'add node', title: 'add node', id: this.randomId()})}>+</span>
                    <span class="delete-button" onClick={() => this.$refs.tree6.delNode(node.parent, node)}>-</span>
                </span>
            },
            openDragSort () {
                this.dragSort = !this.dragSort
            }
        }
    }
</script>
<style lang="postcss">
    .bk-form-input {
        box-sizing: border-box;
        height: 32px;
        line-height: 1;
        color: #666;
        background-color: #fff;
        border-radius: 2px;
        box-sizing: border-box;
        border: 1px solid #c3cdd7;
        padding: 0 10px;
        font-size: 14px;
        text-align: left;
        vertical-align: middle;
        outline: none;
        resize:none;
        transition: border linear .2s;
    }
    .add-button {
        width: 24px;
        height: 24px;
        line-height: 20px;
        display: inline-block;
        background-color: transparent;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-left: 5px;
        font-size: 12px;
        color: rgb(97, 97, 97);
        text-align: center;
        cursor: pointer;
    }
    .delete-button {
        width: 24px;
        height: 24px;
        line-height: 20px;
        display: inline-block;
        background-color: transparent;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-left: 5px;
        font-size: 12px;
        color: rgb(63, 63, 63);
        text-align: center;
        cursor: pointer;
    }
</style>

[[toc]]

## Tree 树

用清晰的层级结构展示信息，可展开或折叠。

:::exampleLink [更多示例](#/tree/example)

### 基础用法 {page=#/tree}

:::demo 默认配置 `data` 和 `node-key`，配置 `has-border` 显示边框

```html
<template>
    <bk-tree
        ref="tree1"
        :data="treeListOne"
        :node-key="'id'"
        :has-border="true"
        @on-click="nodeClickOne"
        @on-expanded="nodeExpandedOne">
    </bk-tree>
</template>
<script>
    import { bkTree } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTree
        },
        data () {
            return {
                treeListOne: [
                    {
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
                    }
                ]
            }
        },
        methods: {
            nodeClickOne (node) {
                console.log(node)
            },
            nodeExpandedOne (node, expanded) {
                console.log(node)
                console.log(expanded)
            }
        }
    }
</script>
```
:::

### 开启多选 {page=#/tree}

:::demo 配置 `multiple` 为 true 时开启多选，此时节点带有 checkbox

```html
<template>
    <bk-tree
        ref="tree2"
        :data="treeListTwo"
        :multiple="true"
        :node-key="'id'"
        :has-border="true"
        @on-click="nodeClickTwo"
        @on-check="nodeCheckTwo"
        @on-expanded="nodeExpandedTwo">
    </bk-tree>
</template>
<script>
    import { bkTree } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTree
        },
        data () {
            return {
                treeListTwo: [
                    {
                        name: '集群[批量启动进程模块1]',
                        expanded: true,
                        openedIcon: 'icon-folder-open',
                        closedIcon: 'icon-folder',
                        id: 1,
                        children: [
                            { name: 'testwa.fda.1.1', icon: 'icon-file', id: 2 },
                            { name: 'testwa.fda.1.2', icon: 'icon-file', title: 'testwa.fda.1.2', id: 3 },
                            { name: 'testwa.fda.1.3', icon: 'icon-file', id: 4, parentId: 1 },
                            {
                                name: '集群[批量启动进程子模块1]',
                                openedIcon: 'icon-folder-open',
                                closedIcon: 'icon-folder',
                                expanded: true,
                                id: 5,
                                children: [
                                    { name: 'testwa.fda.2.1', icon: 'icon-file', id: 6 },
                                    { name: 'testwa.fda.2.2', icon: 'icon-file', id: 7 },
                                    { name: 'testwa.fda.2.3', icon: 'icon-file', id: 8 }
                                ]
                            },
                            { name: '集群[批量启动进程子模块2]', icon: 'icon-file', id: 9 },
                            { name: '集群[批量启动进程子模块3]', icon: 'icon-file', id: 10 },
                            { name: '集群[批量启动进程子模块4]', icon: 'icon-file', id: 11 }
                        ]
                    }
                ]
            }
        },
        methods: {
            nodeClickTwo (node) {
                console.log(node)
            },
            nodeCheckTwo (node, checked) {
                console.log(node)
                console.log(checked)
            },
            nodeExpandedTwo (node, expanded) {
                console.log(node)
                console.log(expanded)
            }
        }
    }
</script>
```
:::

### 异步加载节点 {page=#/tree}

:::demo 在 `data` 数据源中给需要异步加载节点的节点设置属性 `async` 为 true 即可

```html
<template>
    <bk-tree
        ref="tree3"
        :data="treeListThree"
        :node-key="'id'"
        :has-border="true"
        @async-load-nodes="asyncLoadNodes"
        @on-click="nodeClickThree"
        @on-expanded="nodeExpandedThree">
    </bk-tree>
</template>
<script>
    import { bkTree } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTree
        },
        data () {
            return {
                treeListThree: [
                    {
                        name: 'async nodes',
                        expanded: false,
                        openedIcon: 'icon-folder-open',
                        closedIcon: 'icon-folder',
                        async: true,
                        id: 1
                    }
                ]
            }
        },
        methods: {
            nodeClickThree (node) {
                console.log(node)
            },
            nodeExpandedThree (node, expanded) {
                console.log(node)
                console.log(expanded)
            },
            randomId () {
                return Math.ceil(Math.random() * 66) * Math.ceil(Math.random() * 88) + 1
            },
            async asyncLoadNodes (node) {
                this.$set(node, 'loading', true)
                const pro = await new Promise((resolve, reject) => {
                    setTimeout(resolve, 2000, [{name: 'async node', async: true, id: this.randomId()}, {name: 'async node', id: this.randomId()}])
                })
                pro.forEach((el) => {
                    if (!node.hasOwnProperty('children')) {
                        this.$set(node, 'children', [])
                    }
                    node.children.push(el)
                })
                this.$set(node, 'loading', false)
            }
        }
    }
</script>
```
:::

### 设置节点拖拽 {page=#/tree}

:::demo 配置 `draggable` 为 true 时开启节点拖拽，配置 `drag-sort` 为 true 时开启节点拖拽时可交换位置（此时拖拽节点不支持更改层级）

```html
<template>
    <bk-button type="primary" @click="openDragSort">{{dragSort ? '关闭拖拽交换位置' : '开启拖拽交换位置'}}</bk-button>
    <bk-tree
        ref="tree4"
        :data="treeListFour"
        :node-key="'id'"
        :draggable="true"
        :drag-sort="dragSort"
        :has-border="true"
        @on-click="nodeClickFour"
        @drag-node-end="dragNodeEnd"
        @on-expanded="nodeExpandedFour">
    </bk-tree>
</template>
<script>
    import { bkTree } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTree
        },
        data () {
            return {
                treeListFour: [
                    {
                        name: '集群[批量启动进程模块1]',
                        expanded: true,
                        openedIcon: 'icon-folder-open',
                        closedIcon: 'icon-folder',
                        id: 1,
                        children: [
                            { name: 'testwa.fda.1.1', icon: 'icon-file', id: 2 },
                            { name: 'testwa.fda.1.2', icon: 'icon-file', title: 'testwa.fda.1.2', id: 3 },
                            { name: 'testwa.fda.1.3', icon: 'icon-file', id: 4 },
                            {
                                name: '集群[批量启动进程子模块1]',
                                openedIcon: 'icon-folder-open',
                                closedIcon: 'icon-folder',
                                expanded: true,
                                id: 5,
                                children: [
                                    { name: 'testwa.fda.2.1', icon: 'icon-file', id: 6 },
                                    { name: 'testwa.fda.2.2', icon: 'icon-file', id: 7 },
                                    { name: 'testwa.fda.2.3', icon: 'icon-file', id: 8 }
                                ]
                            },
                            {
                                name: '集群[批量启动进程子模块2]',
                                icon: 'icon-file',
                                id: 9
                            }
                        ]
                    }
                ],
                dragSort: false
            }
        },
        methods: {
            nodeClickFour (node) {
                console.log(node)
            },
            nodeExpandedFour (node, expanded) {
                console.log(node)
                console.log(expanded)
            },
            dragNodeEnd (dragNode, targetNode) {
                console.log(dragNode)
                console.log(targetNode)
            },
            openDragSort () {
                this.dragSort = !this.dragSort
            }
        }
    }
</script>
```
:::

### 节点过滤 {page=#/tree}

:::demo 通过 ref 调用 searchNode 方法进行过滤，调用 getSearchResult 方法 获取过滤返回结果

```html
<template>
    <input type="text" class="bk-form-input" v-model="searchWord" placeholder="search..." />
    <bk-button type="primary" style="margin-top: 10px;" @click="search">search</bk-button>
    <bk-tree
        ref="tree5"
        :data="treeListFive"
        :node-key="'id'"
        :multiple="true"
        :has-border="true"
        @on-click="nodeClickFive"
        @on-expanded="nodeExpandedFive">
    </bk-tree>
    <div v-if="isEmpty">未匹配到相关数据</div>
</template>
<script>
    import { bkTree, bkButton } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTree,
            bkButton
        },
        data () {
            return {
                isEmpty: false,
                searchWord: '',
                treeListFive: [
                    {
                        name: '集群[批量启动进程模块1]',
                        expanded: true,
                        openedIcon: 'icon-folder-open',
                        closedIcon: 'icon-folder',
                        id: 1,
                        children: [
                            { name: 'testwa.fda.1.1', icon: 'icon-file', id: 2 },
                            { name: 'testwa.fda.1.2', icon: 'icon-file', title: 'testwa.fda.1.2', id: 3 },
                            {
                                name: '集群[批量启动进程子模块1]',
                                openedIcon: 'icon-folder-open',
                                closedIcon: 'icon-folder',
                                id: 5,
                                expanded: true,
                                children: [
                                    { name: 'testwa.fda.2.1', icon: 'icon-file', id: 6 },
                                    { name: 'testwa.fda.2.2', icon: 'icon-file', id: 7 },
                                    { name: 'testwa.fda.2.3', icon: 'icon-file', id: 8 }
                                ]
                            },
                            { name: 'testwa.fda.1.3', icon: 'icon-file', id: 4 },
                            { name: '集群[批量启动进程子模块2]', icon: 'icon-file', id: 9 }
                        ]
                    }
                ]
            }
        },
        methods: {
            nodeClickFive (node) {
                console.log(node)
            },
            nodeExpandedFive (node, expanded) {
                console.log(node)
                console.log(expanded)
            },
            search () {
                this.$refs.tree5.searchNode(this.searchWord)
                const searchResult = this.$refs.tree5.getSearchResult()
                this.isEmpty = searchResult.isEmpty
            }
        }
    }
</script>
<style lang="postcss">
    .bk-form-input {
        box-sizing: border-box;
        height: 32px;
        line-height: 1;
        color: #666;
        background-color: #fff;
        border-radius: 2px;
        width: 80%;
        box-sizing: border-box;
        border: 1px solid #c3cdd7;
        padding: 0 10px;
        font-size: 14px;
        text-align: left;
        vertical-align: middle;
        outline: none;
        resize:none;
        transition: border linear .2s;
    }
</style>
```
:::

### 自定义模板 {page=#/tree}

:::demo 配置tpl函数返回节点模板内容

```html
<template>
    <bk-tree
        ref="tree6"
        :data="treeListSix"
        :node-key="'id'"
        :multiple="true"
        :tpl="tpl"
        :has-border="true"
        @on-click="nodeClickSix"
        @on-expanded="nodeExpandedSix">
    </bk-tree>
</template>
<script>
    import { bkTree } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTree
        },
        data () {
            return {
                treeListSix: [
                    {
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
                    }
                ]
            }
        },
        methods: {
            nodeClickSix (node) {
                console.log(node)
            },
            nodeExpandedSix (node, expanded) {
                console.log(node)
                console.log(expanded)
            },
            randomId () {
                return Math.ceil(Math.random() * 66) * Math.ceil(Math.random() * 88) + 1
            },
            tpl (node, ctx, h) {
                // 如果在某些情况下 h 不能自动注入而报错，需将 h 参数写上；一般来说 h 默认是第一参数，但是现在改为第一参数会导致已经使用的用户都需要修改，所以先放在最后。
                // 如果 h 能自动注入则可以忽略 h 参数，无需写上，否则 h 参数会重复。
                const titleClass = node.selected ? 'node-title node-selected' : 'node-title'
                return <span>
                    <span class={titleClass} domPropsInnerHTML={node.title} onClick={() => {this.$refs.tree6.nodeSelected(node)}}></span>
                    <span class="add-button" onClick={() => this.$refs.tree6.addNode(node, {name: 'add node', title: 'add node', id: this.randomId()})}>+</span>
                    <span class="delete-button" onClick={() => this.$refs.tree6.delNode(node.parent, node)}>-</span>
                </span>
            }
        }
    }
</script>
<style lang="postcss">
    .add-button {
        width: 24px;
        height: 24px;
        line-height: 20px;
        display: inline-block;
        background-color: transparent;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-left: 5px;
        font-size: 12px;
        color: rgb(97, 97, 97);
        text-align: center;
        cursor: pointer;
    }
    .delete-button {
        width: 24px;
        height: 24px;
        line-height: 20px;
        display: inline-block;
        background-color: transparent;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-left: 5px;
        font-size: 12px;
        color: rgb(63, 63, 63);
        text-align: center;
        cursor: pointer;
    }
</style>
```
:::

### 属性 {page=#/tree}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| data | tree 数据源（必传） | Array | ——  | —— |
| node-key | 具有唯一标识的key值（必传） | String | —— | id |
| show-icon | 节点是否可配置icon | Boolean | true / false | true |
| multiple | 单选/多选标识 | Boolean | —— | false |
| has-border | 是否显示边框 | Boolean | —— | false |
| draggable | 节点是否可拖拽 | Boolean | true / false | false |
| drag-sort | 节点拖拽时可交换位置（开启拖拽可交换位置后将不支持改变层级） | Boolean | true / false | false |
| drag-after-expanded | 节点拖拽后是否展开 | Boolean | Boolean | true |
| is-delete-root | 是否可删除根节点 | Boolean | true / false | false |
| opened-icon | 父级节点展开全局icon(优先级低于源数据中配置的icon) | String | —— | icon-folder-open |
| closed-icon | 父级节点收起全局icon(优先级低于源数据中配置的icon) | String | —— | icon-folder |
| node-icon | 子节点全局icon(优先级低于源数据中配置的icon) | String | —— | icon-file |
| tpl | 自定义模板 | Function | —— | —— |
| ext-cls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `.bk-tree` 上 | String | —— | —— |

### 事件 {page=#/tree}
| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| on-click | 节点点击触发 | node （当前点击节点） |
| on-check | 多选时，多选框 chang 触发 （单选时不生效） | node （当前选择节点） |
| on-expanded | 节点展开/收起触发 | node / expanded |
| on-drag-node | 节点拖拽结束触发 | dragNode / targetNode |
| async-load-nodes | 异步加载节点数据 | node （当前节点） |

### 方法 {page=#/tree}
| 方法名称 | 说明 | 参数 |
|------|------|------|
| getNode | 获取所需节点(多选时生效，单选时通过 on-click 事件可获取到) | keyParton(Array / String 自定义键值) |
| searchNode | 节点过滤 | filter （过滤器）/ data |
| getSearchResult | 获取节点过滤结果 | list(过滤返回节点)/ isEmpty(过滤返回是否为空标识) |
| addNode | 添加单个节点 | parent / newNode |
| addNodes | 添加多个节点 | parent / newChildren |
| delNode | 删除节点 | parent / node |
