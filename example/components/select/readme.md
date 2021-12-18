<script>
    import { bkSelect, bkOption, bkOptionGroup, bkBigTree, bkStar } from '@'
    import Vue from 'vue'
    Vue.use(bkSelect)
    let seed = 0
    export default {
        components: {
            bkOption,
            bkOptionGroup,
            bkBigTree,
            bkStar
        },
        data () {
            const options = Array(30).fill(0).map((_, index) => {
                return {
                    id: index,
                    name: 'Option-' + index,
                    collection: Math.round(Math.random())
                }
            })
            return {
                options: options,
                hoverId: -1,
                value: 3,
                multipleValue: [1],
                groupValue: ['1-1'],
                list: [
                    { id: 1, name: '爬山' },
                    { id: 2, name: '跑步' },
                    { id: 3, name: '打球' },
                    { id: 4, name: '跳舞' },
                    { id: 5, name: '健身' },
                    { id: 6, name: '骑车' },
                    { id: 7, name: 'k8s' },
                    { id: 8, name: 'K8S' },
                    { id: 9, name: 'mesos' },
                    { id: 10, name: 'MESOS' }
                ],
                virtualList: new Array(10000).fill(1).map((a, b) => ({ key: b, display: b })),
                groupList: [
                    {
                        id: 1,
                        name: '爬山',
                        showCollapse: true,
                        isCollapse: true,
                        children: [
                            { id: '1-1', name: '爬山-1' },
                            { id: '1-2', name: '爬山-2' }
                        ]
                    },
                    {
                        id: 2,
                        name: '跑步',
                        showCollapse: true,
                        isCollapse: false,
                        children: [
                            { id: '2-1', name: '跑步-1' },
                            { id: '2-2', name: '跑步-2' }
                        ]
                    },
                    {
                        id: 3,
                        name: '骑车',
                        showCollapse: true,
                        readonly: true,
                        children: [
                            { id: '3-1', name: '骑车-1' },
                            { id: '3-2', name: '骑车-2' }
                        ]
                    }
                ],
                selectValue: ['node-3'],
                treeData: this.getNodes(null, 2, 3)
            }
        },
        methods: {
            handleMouseEnter (id) {
                this.hoverId = id
            },
            handleMouseLeave () {
                this.hoverId = -1
            },
            handleCollection (option) {
                option.collection = option.collection > 0 ? 0 : 1
            },
            handleToggle () {
                // 收藏置顶
                this.options = this.options.sort((pre, next) => {
                    return next.collection - pre.collection
                })
            },
            handleGroupCollapse (isCollapse) {
                console.log('isCollapse', isCollapse)
            },
            handleCreate () {
                this.list.push({
                    id: Math.random(),
                    name: `新增项-${this.list.length}`
                })
            },
            handleDeleteOption (deleteOption) {
                this.list = this.list.filter(option => option !== deleteOption)
            },
            getNodes (parent, childCount, deep) {
                const nodes = []
                for (let i = 0; i < childCount; i++) {
                    const node = {
                        id: `node-${seed}`,
                        level: parent ? parent.level + 1 : 0,
                        name: `node-name-${seed++}`
                    }
                    if (node.level < deep) {
                        node.children = this.getNodes(node, childCount, deep)
                    }
                    nodes.push(node)
                }
                return nodes
            },
            remote (keyword) {
                this.$refs.tree && this.$refs.tree.filter(keyword)
            },
            handleCheckChange (id, checked) {
                this.selectValue = [...id]
            },
            handleValuesChange (options) {
                this.$refs.tree && this.$refs.tree.setChecked(options.id, { emitEvent: true, checked: false })
            },
            handleClear() {
                this.$refs.tree && this.$refs.tree.removeChecked({ emitEvent: false })
            }
        }
    }
</script>

<style lang="postcss">
    .custom-option .icon-close {
        display: none;
        position: absolute;
        right: 0;
        top: 3px;
        font-size: 26px;
        width: 26px;
        height: 26px;
        line-height: 26px;
        text-align: center;
    }
    .custom-option:hover .icon-close {
        display: block;
    }
    .icon-plus-circle {
        display: inline-block;
        vertical-align: -1px;
        font-size: 12px;
        margin-right: 4px;
    }
    .select-collection {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>

[[toc]]

## Select 下拉选框

将动作或菜单折叠到下拉菜单中，支持单选和多选

<!-- :::exampleLink [更多示例](#/select/example) -->

### 基础用法 {page=#/select}

:::demo 基础数据展示

```html
<template>
    <bk-select :disabled="false" v-model="value" style="width: 250px;"
        ext-cls="select-custom"
        ext-popover-cls="select-popover-custom"
        searchable>
        <bk-option v-for="option in list"
            :key="option.id"
            :id="option.id"
            :name="option.name">
        </bk-option>
    </bk-select>
</template>
<script>
    import { bkSelect, bkOption } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkSelect,
            bkOption
        },
        data (s) {
            return {
                value: '',
                list: [
                    { id: 1, name: '爬山' },
                    { id: 2, name: '跑步' },
                    { id: 3, name: '打球' },
                    { id: 4, name: '跳舞' },
                    { id: 5, name: '健身' },
                    { id: 6, name: '骑车' },
                    { id: 7, name: 'k8s' },
                    { id: 8, name: 'K8S' },
                    { id: 9, name: 'mesos' },
                    { id: 10, name: 'MESOS' }
                ]
            }
        }
    }
</script>
```
:::

### 多选 {page=#/select}

:::demo 开启 `multiple` 属性进行多选，注意此时 `v-model` 对应的值应是数组，可开启 `show-select-all` 属性提供一键全选功能; 在多选情况下，可以通过配置`display-tag`属性，已选择的结果将以标签形式显示

```html
<template>
    <div>
        <bk-select style="width: 250px;"
            searchable
            multiple
            show-select-all
            v-model="multipleValue">
            <bk-option v-for="option in list"
                :key="option.id"
                :id="option.id"
                :name="option.name">
            </bk-option>
        </bk-select>

        <bk-select style="width: 250px;margin-top: 10px;"
            searchable
            multiple
            display-tag
            v-model="multipleValue">
            <bk-option v-for="option in list"
                :key="option.id"
                :id="option.id"
                :name="option.name">
            </bk-option>
        </bk-select>
    </div>
</template>
<script>
    import { bkSelect, bkOption } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkSelect,
            bkOption
        },
        data () {
            return {
                value: '',
                list: [
                    { id: 1, name: '爬山' },
                    { id: 2, name: '跑步' },
                    { id: 3, name: '打球' },
                    { id: 4, name: '跳舞' },
                    { id: 5, name: '健身' },
                    { id: 6, name: '骑车' },
                    { id: 7, name: 'k8s' },
                    { id: 8, name: 'K8S' },
                    { id: 9, name: 'mesos' },
                    { id: 10, name: 'MESOS' }
                ]
            }
        }
    }
</script>
```
:::

### 分组 {page=#/select}

:::demo 嵌套 `bk-option-group` 进行分组展示

```html
<template>
    <bk-select multiple v-model="groupValue" style="width: 250px;">
        <bk-option-group
            v-for="(group, index) in groupList"
            :name="group.name"
            :key="index">
            <bk-option v-for="option in group.children"
                :key="option.id"
                :id="option.id"
                :name="option.name">
            </bk-option>
        </bk-option-group>
    </bk-select>
</template>
<script>
    import { bkSelect, bkOptionGroup, bkOption } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkSelect,
            bkOptionGroup,
            bkOption
        },
        data () {
            return {
                value: '',
                groupList: [
                    {
                        id: 1,
                        name: '爬山',
                        children: [
                            { id: '1-1', name: '爬山-1' },
                            { id: '1-2', name: '爬山-2' }
                        ]
                    },
                    {
                        id: 2,
                        name: '跑步',
                        children: [
                            { id: '2-1', name: '跑步-1' },
                            { id: '2-2', name: '跑步-2' }
                        ]
                    }
                ]
            }
        }
    }
</script>
```
:::

### 分组-全选 {page=#/select}

:::demo 嵌套 `bk-option-group` 进行分组展示， 设置 `show-select-all` 设置分组是否支持全选

```html
<template>
    <bk-select multiple v-model="groupValue" style="width: 250px;">
        <bk-option-group
            :show-select-all="true"
            v-for="(group, index) in groupList"
            :name="group.name"
            :key="index">
            <bk-option v-for="option in group.children"
                :key="option.id"
                :id="option.id"
                :name="option.name">
            </bk-option>
        </bk-option-group>
    </bk-select>
</template>
<script>
    import { bkSelect, bkOptionGroup, bkOption } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkSelect,
            bkOptionGroup,
            bkOption
        },
        data () {
            return {
                value: '',
                groupList: [
                    {
                        id: 1,
                        name: '爬山',
                        children: [
                            { id: '1-1', name: '爬山-1' },
                            { id: '1-2', name: '爬山-2' }
                        ]
                    },
                    {
                        id: 2,
                        name: '跑步',
                        children: [
                            { id: '2-1', name: '跑步-1' },
                            { id: '2-2', name: '跑步-2' }
                        ]
                    }
                ]
            }
        }
    }
</script>
```
:::

### 分组-展开\收起功能 {page=#/select}

:::demo 嵌套 `bk-option-group` 设置 `show-collapse` 进行分组展开\收起设置，通过设置`is-collapse`来控制每个分组的展开\收起,`is-collapse`支持`sync`数据同步设置. 如果想要设置单个分组只读，请使用`readonly`设置

```html
<template>
    <div class="mb15">
        <span class="f14">开启展开\收起功能 <code>:show-collapse="true"</code>, 设置默认收起 <code>:is-collapse="true"</code>，<code>is-collapse</code>可设置<code>.sync</code></span>
        <bk-select multiple v-model="groupValue" style="width: 250px; margin-top:10px;">
            <bk-option-group
                v-for="(group, index) in groupList"
                :name="group.name"
                :key="index"
                :show-collapse="true"
                :show-select-all="true"
                :is-collapse.sync="group.isCollapse"
                @collapse="handleGroupCollapse">
                <bk-option v-for="option in group.children"
                    :key="option.id"
                    :id="option.id"
                    :name="option.name">
                </bk-option>
            </bk-option-group>
        </bk-select>
    </div>
    <div>
        <span class="f14">设置展开\收起只做展示，禁止点击 <code>:readonly="true"</code></span>
        <bk-select multiple v-model="groupValue" style="width: 250px; margin-top:10px;">
            <bk-option-group
                v-for="(group, index) in groupList"
                :name="group.name"
                :key="index"
                :show-collapse="group.showCollapse"
                :is-collapse.sync="group.isCollapse"
                :readonly="true"
                @collapse="handleGroupCollapse">
                <bk-option v-for="option in group.children"
                    :key="option.id"
                    :id="option.id"
                    :name="option.name">
                </bk-option>
            </bk-option-group>
        </bk-select>
    </div>
</template>
<script>
    import { bkSelect, bkOptionGroup, bkOption } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkSelect,
            bkOptionGroup,
            bkOption
        },
        data () {
            return {
                value: '',
                groupList: [
                    {
                        id: 1,
                        name: '爬山',
                        isCollapse: true,
                        children: [
                            { id: '1-1', name: '爬山-1' },
                            { id: '1-2', name: '爬山-2' }
                        ]
                    },
                    {
                        id: 2,
                        name: '跑步',
                        isCollapse: false,
                        children: [
                            { id: '2-1', name: '跑步-1' },
                            { id: '2-2', name: '跑步-2' }
                        ]
                    },
                    {
                        id: 3,
                        name: '骑车',
                        readonly: true,
                        children: [
                            { id: '3-1', name: '骑车-1' },
                            { id: '3-2', name: '骑车-2' }
                        ]
                    }
                ]
            }
        },
        methods: {
            handleGroupCollapse (isCollapse) {
                console.log('isCollapse', isCollapse)
            }
        }
    }
</script>
```
:::

### 自定义模板 {page=#/select}

:::demo 使用作用域插槽自定义列表内容，如自定义模板进行删除候选项

```html
<template>
    <bk-select v-model="value" style="width: 250px;">
        <bk-option class="custom-option"
            v-for="option in list"
            :key="option.id"
            :id="option.id"
            :name="option.name">
            <span>{{option.name}}</span>
            <i class="bk-icon icon-close" @click.stop="handleDeleteOption(option)"></i>
        </bk-option>
    </bk-select>
</template>
<script>
    import { bkSelect, bkOption } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkSelect,
            bkOption
        },
        data () {
            return {
                value: '',
                list: [
                    { id: 1, name: '爬山' },
                    { id: 2, name: '跑步' },
                    { id: 3, name: '打球' },
                    { id: 4, name: '跳舞' },
                    { id: 5, name: '健身' },
                    { id: 6, name: '骑车' },
                    { id: 7, name: 'k8s' },
                    { id: 8, name: 'K8S' },
                    { id: 9, name: 'mesos' },
                    { id: 10, name: 'MESOS' }
                ]
            }
        },
        methods: {
            handleDeleteOption (deleteOption) {
                this.list = this.list.filter(option => option !== deleteOption)
            }
        }
    }
</script>
<style lang="postcss">
    .custom-option .icon-close {
        display: none;
        position: absolute;
        right: 0;
        top: 3px;
        font-size: 26px;
        width: 26px;
        height: 26px;
        line-height: 26px;
        text-align: center;
    }
    .custom-option:hover .icon-close {
        display: block;
    }
</style>
```
:::

### 前置icon {page=#/select}

:::demo 通过`prefix-icon`属性给下拉选框添加图标

```html
<template>
    <bk-select style="width: 250px;" prefix-icon="bk-icon icon-sort">
        <bk-option id="name" name="按名称排序"></bk-option>
        <bk-option id="ip" name="按IP排序"></bk-option>
    </bk-select>
</template>
```
:::


### 尺寸 {page=#/select}

:::demo 通过`size`属性给下拉选框设置不同大小，不设置为默认大小，可选值 `large`、`small`

```html
<template>
        <bk-select style="width: 250px; margin-top: 10px;" size="large" v-model="value" searchable>
        <bk-option v-for="option in list"
            :key="option.id"
            :id="option.id"
            :name="option.name">
        </bk-option>
    </bk-select>

    <bk-select style="width: 250px; margin-top: 10px;" v-model="value" searchable>
        <bk-option v-for="option in list"
            :key="option.id"
            :id="option.id"
            :name="option.name">
        </bk-option>
    </bk-select>

    <bk-select style="width: 250px; margin-top: 10px;" size="small" v-model="value" searchable>
        <bk-option v-for="option in list"
            :key="option.id"
            :id="option.id"
            :name="option.name">
        </bk-option>
    </bk-select>

    <bk-select multiple v-model="groupValue" style="width: 250px; margin-top: 10px;" size="large">
        <bk-option-group
            v-for="(group, index) in groupList"
            :name="group.name"
            :key="index">
            <bk-option v-for="option in group.children"
                :key="option.id"
                :id="option.id"
                :name="option.name">
            </bk-option>
        </bk-option-group>
    </bk-select>

    <bk-select style="width: 250px; margin-top: 10px;" prefix-icon="bk-icon icon-sort" size="small">
        <bk-option id="name" name="按名称排序"></bk-option>
        <bk-option id="ip" name="按IP排序"></bk-option>
    </bk-select>
</template>
<script>
    import { bkSelect, bkOption, bkOptionGroup } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkSelect,
            bkOption,
            bkOptionGroup
        },
        data () {
            return {
                value: '',
                groupValue: ['1-1'],
                list: [
                    { id: 1, name: '爬山' },
                    { id: 2, name: '跑步' },
                    { id: 3, name: '打球' },
                    { id: 4, name: '跳舞' },
                    { id: 5, name: '健身' },
                    { id: 6, name: '骑车' },
                    { id: 7, name: 'k8s' },
                    { id: 8, name: 'K8S' },
                    { id: 9, name: 'mesos' },
                    { id: 10, name: 'MESOS' }
                ],
                groupList: [
                    {
                        id: 1,
                        name: '爬山',
                        children: [
                            { id: '1-1', name: '爬山-1' },
                            { id: '1-2', name: '爬山-2' }
                        ]
                    },
                    {
                        id: 2,
                        name: '跑步',
                        children: [
                            { id: '2-1', name: '跑步-1' },
                            { id: '2-2', name: '跑步-2' }
                        ]
                    }
                ]
            }
        }
    }
</script>
```
:::

### 扩展用法 {page=#/select}

:::demo 使用 `extension` 插槽进行扩展

```html
<template>
    <bk-select v-model="value" style="width: 250px;">
        <bk-option v-for="option in list"
            :key="option.id"
            :id="option.id"
            :name="option.name">
        </bk-option>
        <div slot="extension" @click="handleCreate" style="cursor: pointer;">
            <i class="bk-icon icon-plus-circle"></i>新增
        </div>
    </bk-select>
</template>
<script>
    import { bkSelect, bkOption } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkSelect,
            bkOption
        },
        data () {
            return {
                value: '',
                list: [
                    { id: 1, name: '爬山' },
                    { id: 2, name: '跑步' },
                    { id: 3, name: '打球' },
                    { id: 4, name: '跳舞' },
                    { id: 5, name: '健身' },
                    { id: 6, name: '骑车' },
                    { id: 7, name: 'k8s' },
                    { id: 8, name: 'K8S' },
                    { id: 9, name: 'mesos' },
                    { id: 10, name: 'MESOS' }
                ]
            }
        },
        methods: {
            handleCreate () {
                this.list.push({
                    id: Math.random(),
                    name: `新增项-${this.list.length}`
                })
            }
        }
    }
</script>
<style lang="postcss">
    .icon-plus-circle {
        display: inline-block;
        vertical-align: -1px;
        font-size: 12px;
        margin-right: 4px;
    }
</style>
```
:::

### 拼音搜索 {page=#/select}

:::demo 配置`search-with-pinyin`属性来设置是否启用拼音搜索功能及支持首字母快速搜索匹配

```html
<template>
    <bk-select :disabled="false"
        :search-with-pinyin="true"
        v-model="value"
        style="width: 250px;"
        ext-cls="select-custom"
        ext-popover-cls="select-popover-custom"
        searchable>
        <bk-option v-for="option in list"
            :key="option.id"
            :id="option.id"
            :name="option.name">
        </bk-option>
    </bk-select>
</template>
<script>
    import { bkSelect, bkOption } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkSelect,
            bkOption
        },
        data (s) {
            return {
                value: '',
                list: [
                    { id: 1, name: '爬山' },
                    { id: 2, name: '跑步' },
                    { id: 3, name: '打球' },
                    { id: 4, name: '跳舞' },
                    { id: 5, name: '健身' },
                    { id: 6, name: '骑车' },
                    { id: 7, name: 'k8s' },
                    { id: 8, name: 'K8S' },
                    { id: 9, name: 'mesos' },
                    { id: 10, name: 'MESOS' }
                ]
            }
        }
    }
</script>
```
:::

### 开启虚拟滚动 {page=#/select}

:::demo 配置`enable-virtual-scroll`和`list`属性来开启虚拟滚动。还需要传入`id-Key`和`display-key`，用于展示数据。可以通过`virtual-scroll-render`函数自定义内容，通过`item-height`控制虚拟滚动单行元素高度。

```html
<template>
    <bk-select :disabled="false"
        :search-with-pinyin="true"
        v-model="value"
        style="width: 250px;"
        ext-cls="select-custom"
        ext-popover-cls="select-popover-custom"
        searchable
        enable-virtual-scroll
        :list="virtualList"
        id-Key="key"
        display-key="display">
    </bk-select>
</template>
<script>
    import { bkSelect, bkOption } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkSelect,
            bkOption
        },
        data (s) {
            return {
                value: 3,
                virtualList: new Array(10000).fill(1).map((a, b) => ({ key: b, display: b }))
            }
        }
    }
</script>
```
:::

### tree-select {page=#/select}

::: demo select组件slot可以放置bk-big-tree组件，额外添加一些逻辑实现tree-select效果
```html
<template>
    <section>
        <bk-select
            ref="select"
            searchable
            multiple
            v-model="selectValue"
            :remote-method="remote"
            :display-tag="true"
            :tag-fixed-height="false"
            :show-empty="false"
            @tab-remove="handleValuesChange"
            @clear="handleClear">
            <bk-big-tree
                :data="treeData"
                show-checkbox
                class="tree-select"
                ref="tree"
                :default-checked-nodes="selectValue"
                @check-change="handleCheckChange">
            </bk-big-tree>
        </bk-select>
    </section>
</template>

<script>
    import { bkSelect, bkBigTree } from '@'
    let seed = 0
    export default {
        components: {
            bkSelect,
            bkBigTree
        },
        data () {
            return {
                selectValue: ['node-0'],
                treeData: this.getNodes(null, 2, 3)
            }
        },
        methods: {
            getNodes (parent, childCount, deep) {
                const nodes = []
                for (let i = 0; i < childCount; i++) {
                    const node = {
                        id: `node-${seed}`,
                        level: parent ? parent.level + 1 : 0,
                        name: `node-name-${seed++}`
                    }
                    if (node.level < deep) {
                        node.children = this.getNodes(node, childCount, deep)
                    }
                    nodes.push(node)
                }
                return nodes
            },
            remote (keyword) {
              this.$refs.tree && this.$refs.tree.filter(keyword)
            },
            handleCheckChange (id, checked) {
                this.selectValue = [...id]
            },
            handleValuesChange (options) {
                this.$refs.tree && this.$refs.tree.setChecked(options.id, { emitEvent: true, checked: false })
            },
            handleClear() {
                this.$refs.tree && this.$refs.tree.removeChecked({ emitEvent: false })
            }
        }
    }
</script>

<style scoped>
>>> .node-folder-icon {
  margin-left: 10px !important;
}
</style>
```
:::

### 收藏案例 {page=#/select}
::: demo 可以利用bk-option提供的默认slot自定义一些业务组件
```html
<template>
    <section>
        <bk-select searchable v-model="value" @toggle="handleToggle">
            <bk-option v-for="option in options"
                :key="option.id"
                v-bind="option">
                <div class="select-collection" @mouseenter="handleMouseEnter(option.id)" @mouseleave="handleMouseLeave(option.id)">
                    <span>{{ option.name }}</span>
                    <bk-star :rate="option.collection"
                        :max-stars="1" v-if="(hoverId === option.id || option.collection)"
                        @click.native.stop="handleCollection(option)">
                    </bk-star>
                </div>
            </bk-option>
        </bk-select>
    </section>
</template>

<script>
    import { bkSelect, bkOption, bkStar } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkSelect,
            bkOption,
            bkStar
        },
        data () {
            const options = Array(30).fill(0).map((_, index) => {
                return {
                    id: index,
                    name: 'Option-' + index,
                    collection: Math.round(Math.random())
                }
            })
            return {
                value: 1,
                options: options,
                hoverId: -1
            }
        },
        methods: {
            handleMouseEnter (id) {
                this.hoverId = id
            },
            handleMouseLeave () {
                this.hoverId = -1
            },
            handleCollection (option) {
                option.collection = option.collection > 0 ? 0 : 1
            },
            handleToggle () {
                // 收藏置顶
                this.options = this.options.sort((pre, next) => {
                    return next.collection - pre.collection
                })
            }
        }
    }
</script>

<style scoped>
.select-collection {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
```
:::

### 简约风格选择器 {page=#/select}

:::demo 通过属性`behavior`配置简约风格

```html
<template>
    <bk-select
        :disabled="false"
        v-model="value"
        style="width: 250px;"
        ext-cls="select-custom"
        behavior='simplicity'
        ext-popover-cls="select-popover-custom"
        searchable>
        <bk-option v-for="option in list"
            :key="option.id"
            :id="option.id"
            :name="option.name">
        </bk-option>
    </bk-select>
</template>
<script>
    import { bkSelect, bkOption } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkSelect,
            bkOption
        },
        data (s) {
            return {
                value: '',
                list: [
                    { id: 1, name: '爬山' },
                    { id: 2, name: '跑步' },
                    { id: 3, name: '打球' },
                    { id: 4, name: '跳舞' },
                    { id: 5, name: '健身' },
                    { id: 6, name: '骑车' },
                    { id: 7, name: 'k8s' },
                    { id: 8, name: 'K8S' },
                    { id: 9, name: 'mesos' },
                    { id: 10, name: 'MESOS' }
                ]
            }
        }
    }
</script>
```
:::

### bk-select 下拉选框属性 {page=#/select}

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| value | 当前被选中的值，支持 `v-model` | String / Array / Number | —— | —— |
| multiple | 是否多选 | Boolean | —— | false |
| display-tag | 是否将选择的结果以标签的形式显示，仅当开启`multiple`时生效 | Boolean | —— | false |
| is-tag-width-limit | 是否对标签进行宽度限制，超出显示`...` | Boolean | —— | true |
| collapse-tag | 当以标签形式显示选择结果时，是否合并溢出的结果以数字显示 | Boolean | —— | true |
| show-select-all | 是否显示全选选项，仅当开启`multiple`时生效 | Boolean | —— | false |
| scroll-height | 下拉列表滚动高度 | Number | —— | 216 |
| placeholder | 未选择数据时的占位 | String | —— | 请选择 |
| disabled | 是否禁用 | Boolean | —— | false |
| readonly | 是否只读 | Boolean | —— | false |
| size | 尺寸 | String | `large` `small` | —— |
| loading | 是否加载中 | Boolean | —— | false |
| clearable | 是否允许清空 | Boolean | —— | true |
| searchable | 是否显示搜索框 | Boolean | —— | false |
| search-ignore-case | 搜索选项时是否忽略大小写 | Boolean | —— | true |
| popover-min-width | 设置下拉列表的最小宽度, 默认的列表宽度跟组件保持一致 | Number | —— | —— |
| popover-width | 设置下拉列表的宽度, 默认的列表宽度跟组件保持一致 | Number | —— | —— |
| popover-options | 透传至下拉列表所在的popover组件的tippyOptions选项 | Object | —— | —— |
| remote-method | 远程搜索方法（可返回 Promise 或者直接返回数据），函数的参数为搜索关键字 | Function | —— | —— |
| font-size | 设置下拉已选择及列表的字体大小 | String | `normal`（12px），`medium`（14px），`large`（16px） | normal |
| ext-cls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `.bk-select` 上 | String | —— | —— |
| ext-popover-cls | 配置自定义样式类名，传入的类会被加在下拉菜单的 DOM `.bk-select-dropdown-content` 上 | String | —— | —— |
| z-index | 弹出层的 `z-index` | Number | —— | 2500 |
| prefix-icon | 配置在下拉选框前面的icon类名 | String | —— | —— |
| search-placeholder | 搜索框占位 | String | —— | 输入关键字搜索 |
| search-with-pinyin | 搜索的时候是否加入中文转换为拼音搜索 | Boolean | —— | false |
| enable-virtual-scroll | 是否开启虚拟滚动 | Boolean | —— | false |
| virtual-scroll-render | 虚拟滚动内容的render,参数分别为数据和 createElement 函数 | Function | —— | —— |
| list | 开启虚拟滚动的时候需要传入的数据列表 | Array | —— | —— |
| id-Key | 虚拟滚动数据，值的key值 | String | —— | id |
| display-key | 虚拟滚动数据，显示字段的key值 | String | —— | name |
| item-height | 虚拟滚动单行元素的高度 | Number | —— | 32 |
| show-empty| 是否展示空数据的提示 | Boolean | —— | true |
| show-on-init | 是否在初始化的时候展示下拉列表 | Boolean | —— | false |
| behavior | 风格设置(simplicity:简约 normal:正常) | String | 'normal'/'simplicity' | normal |

### bk-select 下拉选框事件 {page=#/select}

| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| selected | 选择列表时调用，多选时，回调参数均为数组 | value, option(s) |
| toggle | 切换下拉折叠状态时调用 | Boolean |
| change | 选项发生变化时调用 | newValue, oldValue |
| clear | 清空已选项时调用 | oldValue |
| tab-remove | 删除tab时触发 | options |

### bk-select 选项卡插槽(slot) {page=#/select}

| name | 说明 |
|---|---|
| —— | 默认作用域插槽，用以自定义下拉列表展示格式, 作用域插槽参数为 `{option, optionIndex, group, groupIndex}` |
| extension | 固定在下拉列表最后的内容 |
| trigger | 可用于自定义选框的触发者,作用域插槽参数为该组件的props中的属性

### bk-option 下拉框选项属性 {page=#/select}
**（使用 v-for 添加选项时，如果有动态数据，请勿使用 index 作为 key 进行绑定，这将会引起更新错误）**

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| id | 当前选项的值，必填 | —— | —— | —— |
| name | 当前选项展示的文本，必填 | —— | —— | —— |
| disabled | 是否禁用当前选项 | Boolean | —— | false |

### bk-option-group 下拉框分组属性 {page=#/select}

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| name | 当前分组名称，必填 | —— | —— | —— |
| show-count | 是否显示分组子选项总数 | Boolean | —— | true |
| show-collapse | 是否显示分组收起\展开 | Boolean | —— | false |
| show-select-all | 是否支持支持分组全选 | Boolean | —— | false |
| is-collapse | 分组子选项是否收起，必须设置了`show-collapse`为`true`此配置项才生效，此配置项支持`sync`同步操作 | Boolean | —— | false |
| readonly | 分组展开收起功能是否只读，必须设置了`show-collapse`为`true`此配置项才生效 | Boolean | —— | false |

### bk-option-group 下拉框分组事件 {page=#/select}

| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| collapse | 开启展开\收起分组功能时，回调事件 | isCollapse：Boolean |

### 全局使用$bkToPinyin自定义浮窗 {page=#/select}

| 参数 | 说明    |
| ---- | ------ |
| Vue.prototype.$bkToPinyin | 接受3个参数 str(需要转换为拼音的词条), lowerCase（是否转换为小写）, separator（拼音之间的分割符） |
