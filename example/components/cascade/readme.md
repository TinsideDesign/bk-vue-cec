<script>
    import { bkCascade } from '@'

    export default {
        components: {
            bkCascade
        },
        data () {
            return {
                id: 1,
                value: [],
                seachValue: [],
                slotvalue: [],
                multipleValue: [['yunnan', 'kunming', 'guanduqu'], ['yunnan', 'dali'], ['yunnan', 'kunming', 'xishanqu']],
                checkAnyValue: ['yunnan', 'kunming'],
                list: [{
                    id: 'hunan',
                    name: '湖南',
                    children: [
                        {
                            id: 'changsha',
                            name: '长沙'
                        },
                        {
                            id: 'yueyang',
                            name: '岳阳'
                        }
                    ]
                }, {
                    id: 'guangxi',
                    name: '广西'
                }, {
                    id: 'yunnan',
                    name: '云南',
                    children: [
                        {
                            id: 'kunming',
                            name: '昆明',
                            children: [
                                {
                                    id: 'wuhuaqu',
                                    name: '五华区',
                                    children: [
                                        {
                                            id: '111',
                                            name: '111',
                                            children: [
                                                {
                                                    id: '222',
                                                    name: '222',
                                                    children: [
                                                        {
                                                            id: '333',
                                                            name: '333',
                                                            children: [
                                                                {
                                                                    id: '444',
                                                                    name: '444'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    id: 'guanduqu',
                                    name: '官渡区'
                                },
                                {
                                    id: 'xishanqu',
                                    name: '西山区'
                                }
                            ]
                        },
                        {
                            id: null,
                            name: '临沧市'
                        },
                        {
                            id: 0,
                            name: '大理'
                        },
                        {
                            id: '',
                            name: '玉溪'
                        }
                    ]
                }],
                disabledList: [{
                    id: 'hunan',
                    name: '湖南',
                    children: [
                        {
                            id: 'changsha',
                            disabled: true,
                            name: '长沙'
                        },
                        {
                            id: 'yueyang',
                            name: '岳阳'
                        }
                    ]
                }, {
                    id: 'guangxi',
                    name: '广西',
                    disabled: true
                }, {
                    id: 'yunnan',
                    name: '云南',
                    children: [
                        {
                            id: 'kunming',
                            name: '昆明',
                            children: [
                                {
                                    id: 'wuhuaqu',
                                    disabled: true,
                                    name: '五华区'
                                },
                                {
                                    id: 'guanduqu',
                                    name: '官渡区'
                                },
                                {
                                    id: 'xishanqu',
                                    name: '西山区'
                                }
                            ]
                        },
                       {
                            id: 0,
                            name: '大理'
                        },
                        {
                            id: '',
                            name: '玉溪'
                        }
                    ]
                }],
                remoteList: [{
                    id: 'hunan',
                    name: '湖南'
                }, {
                    id: 'guangxi',
                    name: '广西',
                    disabled: true
                }, {
                    id: 'yunnan',
                    name: '云南'
                }],
                multiple: true,
                checkAnyLevel: true,
                clearable: true,
                filterable: true,
                disabled: true,
                isRemote: true
            }
        },
        methods: {
            handleChange (newValue, oldValue, selectList) {
                console.log(newValue, oldValue, selectList)
            },
            handleClear (newValue, oldValue, selectList) {
                console.log(1, newValue, oldValue, selectList)
            },
            remoteMethod (item, resolve) {
                if (item.isLoading === false) {
                    resolve(item)
                } else {
                    this.$set(item, 'isLoading', true)
                    setTimeout(() => {
                        const res = {}
                        res.data = []
                        for (let i = 1; i <= 3; i++) {
                            this.id += i
                            res.data.push({
                                id: this.id,
                                name: '选项' + this.id
                            })
                        }
                        if (this.id > 20) {
                            res.data = []
                        }
                        item.children = res.data
                        // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                        resolve(item)
                    }, 1000)
                }
            }
        }
    }
</script>

<style>
    .custom-option .icon-close {
        display: none;
        position: absolute;
        right: 0;
        top: 0;
        font-size: 12px;
        width: 36px;
        height: 36px;
        line-height: 36px;
        text-align: center;
    }
    .custom-option:hover .icon-close {
        display: block;
    }
    .bk-slot-item {
        position: absolute;
        top: 8px;
        right: 25px;
        color: #979BA5;
        font-size: 12px;
        width: 16px;
        height: 16px;
        background-color: #F0F1F5;
        border-radius: 2px;
        text-align: center;
        line-height: 16px;
    }
    .bk-option {
        &:hover {
            .bk-slot-item {
                color: #FFF;
                background-color: #A2C5FD;
            }
        }
    }
    .is-selected {
        .bk-slot-item {
            color: #FFF;
            background-color: #A2C5FD;
        }
    }
    .is-disabled {
        &:hover {
            .bk-slot-item {
                color: #979BA5;
                background-color: #F0F1F5;
            }
        }
    }
</style>

## Cascade 级联选框
将动作或菜单折叠到下拉菜单中，支持单选和多选

### 基础用法 {page=#/cascade}

:::demo 基础数据展示

```html
<template>
    <bk-cascade
        v-model="value"
        :list="list"
        clearable
        style="width: 250px;"
        @change="handleChange">
    </bk-cascade>
    <script>
        import { bkCascade } from '{{BASE_LIB_NAME}}'

        export default {
            components: {
                bkCascade
            },
            data (s) {
                return {
                    value: [],
                    list: [
                        {
                            id: 'hunan',
                            name: '湖南',
                            children: [
                                {
                                    id: 'changsha',
                                    name: '长沙'
                                },
                                {
                                    id: 'yueyang',
                                    name: '岳阳'
                                }
                            ]
                        }, {
                            id: 'guangxi',
                            name: '广西'
                        }, {
                            id: 'yunnan',
                            name: '云南',
                            children: [
                                {
                                    id: 'kunming',
                                    name: '昆明',
                                    children: [
                                        {
                                            id: 'wuhuaqu',
                                            name: '五华区'
                                        },
                                        {
                                            id: 'guanduqu',
                                            name: '官渡区'
                                        },
                                        {
                                            id: 'xishanqu',
                                            name: '西山区'
                                        }
                                    ]
                                },
                                {
                                    id: 0,
                                    name: '大理'
                                },
                                {
                                    id: '',
                                    name: '玉溪'
                                }
                            ]
                        }
                    ]
                }
            }
        }
    </script>
</template>
```
:::

### 多选 {page=#/cascade}

:::demo 开启 multiple 属性进行多选，注意此时 v-model 对应的值应是二维数组

```html
<template>
    <bk-cascade
        v-model="multipleValue"
        multiple
        :list="list"
        class="mb20"
        filterable
        clearable
        style="width: 250px;"
        @change="handleChange"
        @clear="handleClear">
    </bk-cascade>
    <bk-cascade
        v-model="multipleValue"
        multiple
        :limit-one-line="true"
        clearable
        :list="list"
        :check-any-level="checkAnyLevel"
        style="width: 250px;">
    </bk-cascade>
    <script>
        import { bkCascade } from '{{BASE_LIB_NAME}}'

        export default {
            components: {
                bkCascade
            },
            data (s) {
                return {
                    multipleValue: [['yunnan', 'kunming', 'guanduqu'], ['yunnan', 'dali']],
                    list: [
                        {
                            id: 'hunan',
                            name: '湖南',
                            children: [
                                {
                                    id: 'changsha',
                                    name: '长沙'
                                },
                                {
                                    id: 'yueyang',
                                    name: '岳阳'
                                }
                            ]
                        }, {
                            id: 'guangxi',
                            name: '广西'
                        }, {
                            id: 'yunnan',
                            name: '云南',
                            children: [
                                {
                                    id: 'kunming',
                                    name: '昆明',
                                    children: [
                                        {
                                            id: 'wuhuaqu',
                                            name: '五华区'
                                        },
                                        {
                                            id: 'guanduqu',
                                            name: '官渡区'
                                        },
                                        {
                                            id: 'xishanqu',
                                            name: '西山区'
                                        }
                                    ]
                                },
                                {
                                    id: 'dali',
                                    name: '大理'
                                }
                            ]
                        }
                    ]
                }
            }
        }
    </script>
</template>
```
:::

### 选择即改变  {page=#/cascade}

:::demo 设置属性`check-any-level`点任何一级都可以选择。

```html
<template>
    <bk-cascade
        v-model="checkAnyValue"
        :list="list"
        :check-any-level="checkAnyLevel"
        style="width: 250px;">
    </bk-cascade>
    <script>
        import { bkCascade } from '{{BASE_LIB_NAME}}'

        export default {
            components: {
                bkCascade
            },
            data (s) {
                return {
                    checkAnyValue: ['yunnan', 'kunming'],
                    checkAnyLevel: true,
                    list: [
                        {
                            id: 'hunan',
                            name: '湖南',
                            children: [
                                {
                                    id: 'changsha',
                                    name: '长沙'
                                },
                                {
                                    id: 'yueyang',
                                    name: '岳阳'
                                }
                            ]
                        }, {
                            id: 'guangxi',
                            name: '广西'
                        }, {
                            id: 'yunnan',
                            name: '云南',
                            children: [
                                {
                                    id: 'kunming',
                                    name: '昆明',
                                    children: [
                                        {
                                            id: 'wuhuaqu',
                                            name: '五华区'
                                        },
                                        {
                                            id: 'guanduqu',
                                            name: '官渡区'
                                        },
                                        {
                                            id: 'xishanqu',
                                            name: '西山区'
                                        }
                                    ]
                                },
                                {
                                    id: 'dali',
                                    name: '大理'
                                }
                            ]
                        }
                    ]
                }
            }
        }
    </script>
</template>
```
:::

### 可搜索  {page=#/cascade}

:::demo 设置属性`filterable`可以快捷地搜索选项并选择。

```html
<template>
    <bk-cascade
        v-model="seachValue"
        :list="list"
        filterable
        style="width: 250px;">
    </bk-cascade>
    <script>
        import { bkCascade } from '{{BASE_LIB_NAME}}'

        export default {
            components: {
                bkCascade
            },
            data (s) {
                return {
                    seachValue: [],
                    list: [
                        {
                            id: 'hunan',
                            name: '湖南',
                            children: [
                                {
                                    id: 'changsha',
                                    name: '长沙'
                                },
                                {
                                    id: 'yueyang',
                                    name: '岳阳'
                                }
                            ]
                        }, {
                            id: 'guangxi',
                            name: '广西'
                        }, {
                            id: 'yunnan',
                            name: '云南',
                            children: [
                                {
                                    id: 'kunming',
                                    name: '昆明',
                                    children: [
                                        {
                                            id: 'wuhuaqu',
                                            name: '五华区'
                                        },
                                        {
                                            id: 'guanduqu',
                                            name: '官渡区'
                                        },
                                        {
                                            id: 'xishanqu',
                                            name: '西山区'
                                        }
                                    ]
                                },
                                {
                                    id: 'dali',
                                    name: '大理'
                                }
                            ]
                        }
                    ]
                }
            }
        }
    </script>
</template>
```
:::

### 禁用  {page=#/cascade}

:::demo 设置属性`disabled`可以将组建禁用掉，禁用某一项则在数据内加入`disabled: true`的属性。

```html
<template>
    <bk-cascade
        v-model="value"
        :list="disabledList"
        class="mb20"
        style="width: 250px;">
    </bk-cascade>
    <bk-cascade
        v-model="value"
        :list="disabledList"
        disabled
        style="width: 250px;">
    </bk-cascade>
    <script>
        import { bkCascade } from '{{BASE_LIB_NAME}}'

        export default {
            components: {
                bkCascade
            },
            data (s) {
                return {
                    value: [],
                    disabledList: [{
                        id: 'hunan',
                        name: '湖南',
                        children: [
                            {
                                id: 'changsha',
                                disabled: true,
                                name: '长沙'
                            },
                            {
                                id: 'yueyang',
                                name: '岳阳'
                            }
                        ]
                    }, {
                        id: 'guangxi',
                        name: '广西',
                        disabled: true
                    }, {
                        id: 'yunnan',
                        name: '云南',
                        children: [
                            {
                                id: 'kunming',
                                name: '昆明',
                                children: [
                                    {
                                        id: 'wuhuaqu',
                                        disabled: true,
                                        name: '五华区'
                                    },
                                    {
                                        id: 'guanduqu',
                                        name: '官渡区'
                                    },
                                    {
                                        id: 'xishanqu',
                                        name: '西山区'
                                    }
                                ]
                            },
                            {
                                id: 0,
                                name: '大理'
                            }
                        ]
                    }]
                }
            }
        }
    </script>
</template>
```
:::

### 自定义节点内容  {page=#/cascade}

:::demo 可以通过`scoped slot`对级联选择器的备选项的节点内容进行自定义，scoped slot传入`node`表示当前节点的 Node 的数据。

```html
<template>
    <bk-cascade
        v-model="slotvalue"
        :list="disabledList"
        style="width: 250px;">
        <template slot="prepend" slot-scope="{ node }">
            <span v-if="node.children" class="bk-slot-item">{{ node.children.length }}</span>
        </template>
    </bk-cascade>
    <script>
        import { bkCascade } from '{{BASE_LIB_NAME}}'

        export default {
            components: {
                bkCascade
            },
            data (s) {
                return {
                    slotvalue: [],
                    disabledList: [{
                        id: 'hunan',
                        name: '湖南',
                        children: [
                            {
                                id: 'changsha',
                                disabled: true,
                                name: '长沙'
                            },
                            {
                                id: 'yueyang',
                                name: '岳阳'
                            }
                        ]
                    }, {
                        id: 'guangxi',
                        name: '广西',
                        disabled: true
                    }, {
                        id: 'yunnan',
                        name: '云南',
                        children: [
                            {
                                id: 'kunming',
                                name: '昆明',
                                children: [
                                    {
                                        id: 'wuhuaqu',
                                        disabled: true,
                                        name: '五华区'
                                    },
                                    {
                                        id: 'guanduqu',
                                        name: '官渡区'
                                    },
                                    {
                                        id: 'xishanqu',
                                        name: '西山区'
                                    }
                                ]
                            },
                            {
                                id: 0,
                                name: '大理'
                            },
                            {
                                id: '',
                                name: '玉溪'
                            }
                        ]
                    }]
                }
            }
        }
    </script>
</template>
```
:::

### 动态加载  {page=#/cascade}

:::demo 可以通过`is-remote`开启动态加载，并通过`remote-method`来设置加载数据源的方法。为了更准确的显示节点的状态，对节点数据添加`isLoading`的状态来控制节点是否需要远程加载

```html
<template>
    <bk-cascade
        v-model="value"
        :list="remoteList"
        :is-remote="isRemote"
        :remote-method="remoteMethod"
        style="width: 250px;">
    </bk-cascade>
    <script>
        import { bkCascade } from '{{BASE_LIB_NAME}}'

        export default {
            components: {
                bkCascade
            },
            data (s) {
                return {
                    value: [],
                    isRemote: true,
                    remoteList: [{
                        id: 'hunan',
                        name: '湖南'
                    }, {
                        id: 'guangxi',
                        name: '广西',
                        disabled: true
                    }, {
                        id: 'yunnan',
                        name: '云南'
                    }]
                }
            },
            methods: {
                remoteMethod (item, resolve) {
                    if (item.isLoading === false) {
                        resolve(item)
                    } else {
                        this.$set(item, 'isLoading', true)
                        setTimeout(() => {
                            const res = {}
                            res.data = []
                            for (let i = 1; i <= 3; i++) {
                                this.id += i
                                res.data.push({
                                    id: this.id,
                                    name: '选项' + this.id
                                })
                            }
                            if (this.id > 20) {
                                res.data = []
                            }
                            item.children = res.data
                            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                            resolve(item)
                        }, 1000)
                    }
                }
            }
        }
    </script>
</template>
```
:::


### bk-cascade 级联选框属性 {page=#/cascade}

| 参数 | 说明    | 类型      | 可选值       | 默认值   |
| ---- | ------ | --------- | ----------- | -------- |
| value | 当前被选中的值,支持`v-model`, 多选时配置一个二维数组 | Array | —— | [] |
| multiple | 是否多选 | Boolean | —— | false |
| list | 可选项数据源 | Array | —— | [] |
| options | 配置项 | Object | —— | —— |
| options.idKey | 选项的id取值 | String | —— | `id` |
| options.nameKey | 选项的name取值 | String | —— | `name` |
| options.childrenKey | 选项的children取值 | String | —— | `children` |
| scroll-height | 下拉列表滚动高度 | Number | —— | 216 |
| scroll-width | 子版面的宽度 | Number | —— | 160 |
| placeholder | 未选择数据时的占位 | String | —— | 请选择 |
| disabled | 是否禁用 | Boolean | —— | false |
| clearable | 是否允许清空 | Boolean | —— | false |
| check-any-level | 是否允许选择任意一级 | Boolean | —— | false |
| filterable | 是否允许快捷搜索 | Boolean | —— | false |
| limit-one-line | 限制是否只显示一行，当显示为一行时，单个选项不允许删除。**（仅当 multiple 为 true 时生效）** | Boolean | —— | false |
| show-complete-name | 输入框中是否显示选中值的完整路径 | Boolean | —— | true |
| separator | 选项分隔符 | String | —— | ' / ' |
| trigger | 触发子菜单模式 | String | 'click', 'hover' | 'click' |
| remote-method | 远程搜索方法，具体配置看样例使用 | Function | —— | —— |
| is-remote | 开启远程加载，搭配remote-method一起使用 | Boolean | —— | false |
| popover-options | 透传至下拉列表所在的popover组件的tippyOptions选项 | Object | —— | —— |

| 事件名称 | 说明 | 回调参数 |
|---------|------|---------|
| toggle | 切换下拉折叠状态时调用 | Boolean |
| change | 选项发生变化时调用 | newValue, oldValue, selectList |
| clear | 清空选项时调用 | oldValue |
| search | 搜索输入时调用 | string, event |
