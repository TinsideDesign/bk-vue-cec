<script>
    import { bkBigTree, bkInput, bkButton } from '@'
    export default {
        components: {
            bkBigTree,
            bkInput,
            bkButton
        },
        data () {
            return {
                filter: '',
                isShowCheckbox: false,
                isShowLinkLine: false,
                isShowLinkLine2: true,
                data: this.getNodes(null, 10, 2),
                tree: [
                        { identifier: 1, folder: false, name: '文件1' },
                        { identifier: 2, folder: true, name: '目录1' },
                        {
                            identifier: 3,
                            folder: true,
                            name: '目录2',
                            children: [
                                { identifier: 31, folder: false, name: '文件2-1' },
                                { identifier: 32,
                                  folder: true,
                                  name: '目录2-1',
                                  children: [
                                      { identifier: 321, folder: false, name: '文件2-2-1' },
                                      { identifier: 322,
                                        folder: true,
                                        name: '目录2-1',
                                        children: [

                                        ] },
                                      { identifier: 323, folder: true, name: '目录2-1' }
                                  ] },
                                { identifier: 33, folder: true, name: '目录2-1' }
                            ]
                        }
                    ]
            }
        },
        methods: {
            getNodes (parent, childCount, deep) {
                const nodes = []
                for (let i = 0; i < childCount; i++) {
                    const node = {
                        id: parent ? `${parent.id}-${i}` : `${i}`,
                        level: parent ? parent.level + 1 : 0,
                        name: parent ? `${parent.name}-${i}` : `node-${i}`
                    }
                    if (node.level < deep) {
                        node.children = this.getNodes(node, 3, deep)
                    }
                    nodes.push(node)
                }
                return nodes
            },
            setChecked () {
                this.isShowCheckbox = true
                this.$refs.tree3.setChecked(1)
            },
            setData () {
                const data = this.getNodes(null, 2, parseInt(Math.random() * 5) + 2)
                this.$refs.tree3.setData(data)
            },
            addNode () {
                const str = Math.random().toString(16)
                this.$refs.tree3.addNode({ id: str.substring(4, 10), name: str.substring(4, 8) })
            },
            removeChecked () {
                this.$refs.tree3.removeChecked()
            },
            search () {
                this.$refs.tree3.filter(this.filter)
            }
        }
    }
</script>

[[toc]]

## Big Tree 大树

非递归渲染的树组件，适用于渲染大量树节点，更快的渲染速度，更少的内存使用，并且节点状态不污染原始数据


### 基础用法 {page=#/big-tree}

:::demo 同步数据渲染, 通过设置 `show-checkbox` 开启节点勾选功能。

```html
<template>
    <section>
        <bk-big-tree ref="tree"
            :show-checkbox="isShowCheckbox"
            :data="data"
            :show-link-line="isShowLinkLine"
            :default-expanded-nodes="[0,'0-2']"
            node-icon="bk-icon icon-text-file">
        </bk-big-tree>
    </section>
</template>
<script>
    import { bkBigTree, bkInput, bkButton } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkBigTree,
            bkInput,
            bkButton
        },
        data () {
            return {
                isShowCheckbox: false,
                isShowLinkLine: false,
                data: this.getNodes(null, 20, 2),
                checkList: []
            }
        },
        methods: {
            getNodes (parent, childCount, deep) {
                const nodes = []
                for (let i = 0; i < childCount; i++) {
                    const node = {
                        id: parent ? `${parent.id}-${i}` : `${i}`,
                        level: parent ? parent.level + 1 : 0,
                        name: parent ? `${parent.name}-${i}` : `node-${i}`
                    }
                    if (node.level < deep) {
                        node.children = this.getNodes(node, 3, deep)
                    }
                    nodes.push(node)
                }
                return nodes
            }
        }
    }
</script>
```
:::

### 插槽 {page=#/big-tree}

:::demo 同步数据渲染, 通过设置 `show-checkbox` 开启节点勾选功能。

```html
<template>
    <section>
        <bk-big-tree ref="tree"
            :selectable="true"
            :default-expanded-nodes="['0']"
            :default-selected-node="'0-2'"
            :show-checkbox="isShowCheckbox"
            :data="data"
            :show-link-line="isShowLinkLine"
            node-icon="bk-icon icon-text-file">
            <div slot-scope="{node,data}">层级：{{node.level+1}}，名称： {{data.name}}</div>
        </bk-big-tree>
    </section>
</template>
<script>
    import { bkBigTree, bkInput, bkButton } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkBigTree,
            bkInput,
            bkButton
        },
        data () {
            return {
                isShowCheckbox: false,
                isShowLinkLine: false,
                data: this.getNodes(null, 20, 2),
                checkList: []
            }
        },
        methods: {
            getNodes (parent, childCount, deep) {
                const nodes = []
                for (let i = 0; i < childCount; i++) {
                    const node = {
                        id: parent ? `${parent.id}-${i}` : `${i}`,
                        level: parent ? parent.level + 1 : 0,
                        name: parent ? `${parent.name}-${i}` : `node-${i}`
                    }
                    if (node.level < deep) {
                        node.children = this.getNodes(node, 3, deep)
                    }
                    nodes.push(node)
                }
                return nodes
            }
        }
    }
</script>
```
:::

### 文件树 {page=#/big-tree}

:::demo 同步数据渲染, 通过设置 `show-checkbox` 开启节点勾选功能。

```html
<template>
    <section>
        <div class="mb10">
            <bk-button @click="isShowCheckbox=!isShowCheckbox">是否显示节点复选框</bk-button>
        </div>
        <bk-big-tree ref="tree"
            :options="{ nameKey: 'name',folderKey: 'folder',idKey: 'identifier' }"
            :show-checkbox="isShowCheckbox"
            :data="tree"
            :default-expanded-nodes="[]"
            :show-link-line="isShowLinkLine2"
            node-icon="bk-icon icon-text-file">
        </bk-big-tree>
    </section>
</template>
<script>
    import { bkBigTree, bkInput, bkButton } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkBigTree,
            bkInput,
            bkButton
        },
        data () {
            return {
                isShowCheckbox: false,
                isShowLinkLine: true,
                isShowLinkLine2: true,
                tree: [
                        { identifier: 1, folder: false, name: '文件1' },
                        { identifier: 2, folder: true, name: '目录1' },
                        {
                            identifier: 3,
                            folder: true,
                            name: '目录2',
                            children: [
                                { identifier: 31, folder: false, name: '文件2-1' },
                                { identifier: 32,
                                  folder: true,
                                  name: '目录2-1',
                                  children: [
                                      { identifier: 321, folder: false, name: '文件2-2-1' },
                                      { identifier: 322,
                                        folder: true,
                                        name: '目录2-1',
                                        children: [

                                        ] },
                                      { identifier: 323, folder: true, name: '目录2-1' }
                                  ] },
                                { identifier: 33, folder: true, name: '目录2-1' }
                            ]
                        }
                ]
                checkList: []
            }
        },
        methods: {
        }
    }
</script>
```

:::

### 实例 事件 {page=#/big-tree}

::: demo

```html
<template>
    <section>
        <div class="mb10">
            <bk-button @click="addNode()">添加结点：addNode</bk-button>
            <bk-button @click="setChecked()">勾选结点1：setChecked</bk-button>
            <bk-button @click="removeChecked()">重置选择框：removeChecked</bk-button>
            <bk-button @click="setData()">更换数据：setData</bk-button>
        </div>
        <div class="mb10">
            <bk-input v-model="filter" @change="search" :right-icon="'bk-icon icon-search'" class="mb10" style="width: 300px;">
                <template slot="prepend">
                    <div class="group-text">搜索</div>
                </template>
            </bk-input>
        </div>
        <bk-big-tree ref="tree3"
            :show-checkbox="isShowCheckbox"
            :data="data"
            :show-link-line="isShowLinkLine2"
            node-icon="bk-icon icon-text-file">
        </bk-big-tree>
    </section>
</template>
<script>
    import { bkBigTree, bkInput, bkButton } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkBigTree,
            bkInput,
            bkButton
        },
        data () {
            return {
                filter: '',
                isShowCheckbox: true,
                isShowLinkLine: false,
                isShowLinkLine2: true,
                data: this.getNodes(null, 20, 2),
                checkList: []
            }
        },
        methods: {
            getNodes (parent, childCount, deep) {
                const nodes = []
                for (let i = 0; i < childCount; i++) {
                    const node = {
                        id: parent ? `${parent.id}-${i}` : `${i}`,
                        level: parent ? parent.level + 1 : 0,
                        name: parent ? `${parent.name}-${i}` : `node-${i}`
                    }
                    if (node.level < deep) {
                        node.children = this.getNodes(node, 3, deep)
                    }
                    nodes.push(node)
                }
                return nodes
            }
        },
        setChecked () {
            this.isShowCheckbox = true
            this.$refs.tree3.setSelected(1)
            this.$refs.tree3.setExpanded(1)
            this.$refs.tree3.setChecked(1)
        },
        setData () {
            const data = this.getNodes(null, 2, parseInt(Math.random() * 5) + 2)
            this.$refs.tree3.setData(data)
        },
        addNode () {
            const str = Math.random().toString(16)
            this.$refs.tree3.addNode({ id: str.substring(4, 10), name: str.substring(4, 8) })
        },
        removeChecked () {
            this.$refs.tree3.removeChecked()
        },
        search () {
            this.$refs.tree.filter(this.filter)
        }
    }
</script>
```

:::

### 属性 {page=#/big-tree}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| data | 同步渲染数据，异步数据请使用组件实例的`setData`方法进行渲染 | Array | —— | —— |
| options | 配置项 | Object | —— | —— |
| options.idKey | 节点的id取值 | String, Function(data) | —— | `id` |
| options.nameKey | 节点的name取值 | String | —— | `name` |
| options.childrenKey | 节点的children取值 | String | —— | `children` |
| options.isFolder | 结点是否为目录 | Boolean | —— | `false` |
| show-checkbox | 是否显示节点复选框，为Function时返回true显示 | Boolean, Function(data) | —— | `false` |
| check-strictly | 在显示复选框的情况下，是否严格的遵循父子互相关联的做法 | Boolean | —— | `true` |
| check-only-available-strictly | 在显示复选框且严格的遵循父子互相关联的情况下，是否仅关联可用节点(可用指非禁用且仍能在树结构中呈现) | Boolean | —— | `false` |
| disable-strictly | 禁用/启用节点时，是否严格的遵循子节点跟随当前节点一同变化的做法 | Boolean | —— | `true` |
| show-link-line | 是否显示层级连线 | Boolean | —— | `false` |
| expand-icon | 折叠时的图标 | String | —— | `bk-icon icon-down-shape` |
| collapse-icon | 展开时的图标 | String | —— | `bk-icon icon-down-shape` |
| node-icon | 节点的图标 | String, Function | —— | —— |
| default-expand-all | 默认展开全部节点 | Boolean | —— | `false` |
| default-expanded-nodes | 默认展开的节点id集合 | Array | —— | —— |
| default-checked-nodes | 默认勾选的节点id集合 | Array | —— | —— |
| default-selected-node | 默认选中的节点id，selectable为false时无效 | String,Number | —— | —— |
| selectable | 节点是否可以选中 | Boolean | —— | `false` |
| before-select | 选中节点前的回调函数，返回false时将终止后续的选中动作 | Function(node) | —— | —— |
| before-check | 复选节点前的回调函数，返回false时将终止后续的复选动作 | Function(node/[node]) | —— | —— |
| expand-on-click | 点击节点时展开/折叠 | Boolean | —— | `true` |
| check-on-click | 点击节点时复选/取消复选 | Boolean | —— | `false` |
| filter-method | 筛选节点的方法, 默认按节点的名称进行筛选 | Function(keyword, node) | —— | —— |
| display-matched-node-descendants | 筛选时，节点命中后，是否显示后代节点 | Boolean | —— | `false` |
| lazy-method | 异步加载子节点的方法，返回的数据格式为{ data: childData/[childData], leaf: [childId] }，仅支持加载一层，如果需要手动阻止继续加载下一层级，可在leaf字段中写入不继续加载的节点的id | Function(node) | —— | —— |
| lazy-disabled | 是否禁用异步加载节点，当配置了lazy-method后如果一些节点明确不需要进行异步加载可通过此属性配置 | Function, Boolean | Function(node) | —— |
| loading-class | 节点处于异步加载子节点时的类名 | String | —— | `node-loading` |
| node-width | 节点宽度(px)，设定该值后，将动态判断是否应用宽度 | String,Number | —— | —— |
| ext-cls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `.bk-big-tree` 上 | String | —— | —— |
| use-default-empty | 无搜索结果时，是否显示默认的无结果UI,使用了`empty`插槽后此配置无效 | Boolean | —— | `false` |
| height | 容器高度，设置此属性可开启虚拟滚动，支持渲染大量数据 | Number | —— | —— |
| node-height | 单个节点的高度，用于虚拟滚动的数据计算， | Number | —— | `32` |
| configurable | 仅作为数据展示用时，可将此属性配置为`false`，从而节省渲染开销，但会导致数据失去响应式的能力 | Boolean | —— | `true` |
| padding | 节点左侧缩进的距离，默认为 16 | Number | —— | 16 |

### 事件 {page=#/big-tree}
| 事件名称 | 说明 | 参数 |
|------|------|------|
| select-change | 选中的节点发生变化时触发 | TreeNode |
| check-change | 复选节点发生变化时触发 | id/[id], checked |
| expand-change | 展开/折叠节点时触发 | TreeNode |
| disable-change | 禁用/启用节点时触发 | TreeNode/[TreeNode] |

### 实例 {page=#/big-tree}
| 事件名称 | 说明 | 参数 |
|------|------|------|
| setData | 因组件内部对`data`属性不是响应式的，所以异步数据需要主动调用此方法设置 | data |
| getNodeById | 根据id获取节点实例,返回TreeNode对象 | id |
| addNode | 添加节点, 默认插入到指定父节点的末尾, options可选参数为parentId, insertIndex, expandParent | data/[data], parentId, insertIndex 或者 data/[data], options |
| removeNode | 移除节点 | id/[id] |
| setSelected | 设置选中的节点，options.emitEvent是否触发select-change事件,options.beforeSelect是否调用`before-select`属性配置的方法 | `id, options = { emitEvent: false, beforeSelect: true }` |
| removeChecked | 取消所有复选的节点，options.emitEvent是否触发check-change事件 | `options = { emitEvent: false }` |
| setChecked | 设置节点复选状态, options.emitEvent是否触发check-change事件, options.beforeCheck是否调用`before-check`属性配置的方法, options.checked复选状态 | `id/[id], options = { emitEvent: false, beforeCheck: true, checked: true }` |
| setExpanded | 设置节点的展开/折叠状态, options.emitEvent是否触发expand-change事件, options.expanded展开/折叠状态 | `id/[id], options = { emitEvent: false, expanded: true }` |
| setDisabled | 设置节点的禁用/启用状态, options.emitEvent是否触发disable-change事件, options.disabled禁用/启用状态 | `id/[id], options = { emitEvent: false, disabled: true }` |
| filter | 筛选节点, 默认按照节点的`name`进行筛选，可通过`filter-method`方法自定义筛选过程 | keyword |

### 插槽 {page=#/big-tree}
| name | 说明 |
|------|------|
|——|匿名作用域插槽, 提供node、data两个props|
| empty |搜索结果为空时的插槽，使用此插槽后`use-default-empty`配置将无效|

### TreeNode 对象说明(请勿直接修改该对象的属性, 而是通过树实例暴露的方法设置) {page=#/big-tree}
| name | 说明 |
|------|------|
| node.data | 节点的原始数据 |
| node.id | 节点id |
| node.name | 节点的显示的名称 |
| node.vNode | 节点的vue实例 |
| node.tree | 节点所在的树组件实例 |
| node.icon | 节点的icon集合，包含expand/collapse/node三种icon |
| node.level | 节点的层级 |
| node.index | 节点在所有树节点中的索引 |
| node.parent | 当前节点的父节点 |
| node.isLeaf | 是否是子节点 |
| node.children | 节点的子节点 |
| node.parents | 节点的祖先节点 |
| node.descendants | 节点的子孙节点 |
| node.isFirst | 节点是否是父节点的第一个节点 |
| node.isLast | 节点是否是父节点的最后一个节点 |
| node.hasCheckbox | 节点是否显示复选框 |
| node.collapseIcon | 节点折叠时的图标 |
| node.expandIcon | 节点展开时的图标 |
| node.nodeIcon | 节点内容的图标 |
| node.checked | 节点是否被勾选 |
| node.selected | 节点是否被选中 |
| node.expanded | 节点是否展开 |
| node.disabled | 节点是否禁用 |
| node.matched | 节点是否匹配筛选结果 |
| node.visible | 节点是否显示 |
| node.indeterminate | 在有复选框时，节点是否处于半选状态 |
