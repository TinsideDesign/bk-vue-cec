<script>
    import { bkTagInput } from '@'
    import mingJPG from '../../img/ming.jpg'
    import hongJPG from '../../img/hong.jpg'
    import huaJPG from '../../img/hua.jpg'
    import baiJPG from '../../img/bai.jpg'

    export default {
        components: {
            bkTagInput
        },
        data () {
            return {
                allowCreate: true,
                hasDeleteIcon: true,
                maxData: 5,
                saveKey: 'item',
                searchKey: 'item',
                multipleSelected: [],
                multipleSearchKey: ['username', 'nickname'],
                multipleList: [
                    { username: 'HelloWorld', nickname: 'HelloWorld' },
                    { username: 'Jack', nickname: '杰克' },
                    { username: 'Json', nickname: '杰森' },
                    { username: 'Jane', nickname: '简' },
                    { username: 'Arman', nickname: '阿尔曼' }
                ],
                displayKey: 'label',
                placeholder: '请输入城市',
                tag1: ['shenzhen'],
                tags: ['shenzhen', 'guangzhou'],
                tagsWithDisabled: [],
                tagList: ['3-1', '3-2'],
                sports: [],
                sportList: [
                    { item: 'football', label: '足球' },
                    { item: 'basketball', label: '篮球' },
                    { item: 'badminton', label: '羽毛球' },
                    { item: 'volleyball', label: '排球' },
                    { item: 'baseball', label: '棒球' }
                ],
                list: [
                    { id: 'shenzhen', name: '深圳' },
                    { id: 'guangzhou', name: '广州' },
                    { id: 'beijing', name: '北京' },
                    { id: 'shanghai', name: '上海' },
                    { id: 'hangzhou', name: '杭州' },
                    { id: 'nanjing', name: '南京' },
                    { id: 'chognqing', name: '重庆' },
                    { id: 'taibei', name: '台北' },
                    { id: 'haikou', name: '海口' }
                ],
                listWithDisabledItem: [
                    { id: 'shenzhen', name: '深圳', disabled: true},
                    { id: 'guangzhou', name: '广州'},
                    { id: 'beijing', name: '北京', disabled: true },
                    { id: 'shanghai', name: '上海', disabled: true },
                    { id: 'hangzhou', name: '杭州' },
                    { id: 'nanjing', name: '南京' },
                    { id: 'chognqing', name: '重庆' },
                    { id: 'taibei', name: '台北' },
                    { id: 'haikou', name: '海口' }
                ],
                members: [],
                singleMembers: [],
                memberList: [
                    {
                        english_name: '1',
                        chinese_name: '分组一',
                        children: [
                            {
                                chinese_name: '小明',
                                english_name: 'h_ming',
                                avatar: mingJPG
                            },
                            {
                                chinese_name: '小红',
                                english_name: 'h_hong',
                                avatar: hongJPG
                            }
                        ]
                    },
                    {
                        english_name: '2',
                        chinese_name: '分组二',
                        children: [
                            {
                                chinese_name: '小华1',
                                english_name: 'h_hua1',
                                avatar: huaJPG
                            },
                            {
                                chinese_name: '小白2',
                                english_name: 'h_bai2',
                                avatar: baiJPG
                            },
                             {
                                chinese_name: '小华3',
                                english_name: 'h_hua3',
                                avatar: huaJPG
                            },
                            {
                                chinese_name: '小白4',
                                english_name: 'h_bai4',
                                avatar: baiJPG
                            },
                             {
                                chinese_name: '小华5',
                                english_name: 'h_hua5',
                                avatar: huaJPG
                            },
                            {
                                chinese_name: '小白6',
                                english_name: 'h_bai6',
                                avatar: baiJPG
                            },
                             {
                                chinese_name: '小华7',
                                english_name: 'h_hua7',
                                avatar: huaJPG
                            },
                            {
                                chinese_name: '小白8',
                                english_name: 'h_bai8',
                                avatar: baiJPG
                            }
                        ]
                    }
                ],
                list1: [
                    {
                        id: '1',
                        name: '华中地区',
                        children: [
                            { id: '1-1', name: '河南省', desc: '河南省河南省' },
                            { id: '1-2', name: '湖北省', desc: '湖北省湖北省' },
                            { id: '1-3', name: '湖南省', desc: '湖南省湖南省' }
                        ]
                    },
                    {
                        id: '2',
                        name: '华北地区',
                        children: [
                            { id: '2-1', name: '北京市', desc: '北京市北京市' },
                            { id: '2-2', name: '山西省', desc: '山西省山西省' },
                            { id: '2-3', name: '河北省', desc: '河北省河北省' }
                        ]
                    },
                    {
                        id: '3',
                        name: '华南地区',
                        children: [
                            { id: '3-1', name: '广东省', desc: '广东省广东省' },
                            { id: '3-2', name: '海南省', desc: '海南省海南省' }
                        ]
                    }
                ]
            }
        },
        methods: {
            change (tags) {
                alert(tags)
            },
            select () {

            },
            remove () {

            },
            tpl (node, ctx, highlightKeyword) {
                const parentClass = 'bk-selector-node'
                const textClass = 'text'
                const innerHtml = `${highlightKeyword(node.item)} (${node.label})`
                return (
                    <div class={parentClass}>
                        <span class={textClass} domPropsInnerHTML={innerHtml}></span>
                    </div>
                )
            },
            multipleTpl (node, ctx, highlightKeyword) {
                const parentClass = 'bk-selector-node'
                const textClass = 'text'
                const innerHtml = `${highlightKeyword(node.username)} (${node.nickname})`
                return (
                    <div class={parentClass}>
                        <span class={textClass} domPropsInnerHTML={innerHtml}></span>
                    </div>
                )
            },
            renderMemberTag (node) {
                const parentClass = 'tag'
                const textClass = 'text'
                const avatarClass = 'avatar'

                return (
                    <div class={parentClass}>
                        <img class={avatarClass} src={node.avatar} />
                        <span class={textClass}>{node.english_name}</span>
                    </div>
                )
            },
            renderMerberList (node, ctx, highlightKeyword) {
                const parentClass = 'bk-selector-node bk-selector-member'
                const textClass = 'text'
                const imgClass = 'avatar'
                const innerHtml = `${highlightKeyword(node.english_name)} (${node.chinese_name})`
                return (
                    <div class={parentClass}>
                        <img class={imgClass} src={node.avatar} />
                        <span class={textClass} domPropsInnerHTML={innerHtml}></span>
                    </div>
                )
            }
        }
    }
</script>

<style lang="postcss">
    .bk-custom-selector {
        .tag-list {
            > li {
                height: 22px;
            }

            .key-node {
                border: none !important;
                background: none !important;

                .tag {
                    background: none;
                    height: 22px;
                    line-height: 22px;

                    .avatar {
                        width: 22px;
                        height: 22px;
                        float: left;
                        margin-right: 8px;
                        border-radius: 50%;
                        vertical-align: middle;
                        border:1px solid #C4C6CC;
                    }
                }
            }
        }
    }
    .bk-selector-list {
        .bk-selector-member {
            padding: 0 10px;
            display: flex;
            align-items: center;
        }
        .avatar {
            width: 22px;
            height: 22px;
            border: 1px solid #C4C6CC;
            border-radius: 50%;
        }
    }
</style>

[[toc]]

## TagInput 标签输入框

常用于对标签列表的填写、关键字的输入

### 基础用法 {page=#/tag}

:::demo 可以通过 `bk-tag-input` 来使用组件，其中 `list` 属性为下拉选择列表选项

```html
<template>
    <bk-tag-input
        :placeholder="placeholder"
        v-model="tags"
        :list="list">
    </bk-tag-input>
    <p>请输入<code>州</code>来体验下搜索效果</p>
</template>
<script>
    import { bkTagInput } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTagInput
        },
        data () {
            return {
                placeholder: '请输入城市',
                tags: ['shenzhen'],
                list: [
                    { id: 'shenzhen', name: '深圳' },
                    { id: 'guangzhou', name: '广州' },
                    { id: 'beijing', name: '北京' },
                    { id: 'shanghai', name: '上海' },
                    { id: 'hangzhou', name: '杭州' },
                    { id: 'nanjing', name: '南京' },
                    { id: 'chognqing', name: '重庆' },
                    { id: 'taibei', name: '台北' },
                    { id: 'haikou', name: '海口' }
                ]
            }
        }
    }
</script>
```
:::

### hover 时才显示 clear 按钮 {page=#/tag}

:::demo 设置 `showClearOnlyHover` 为`true`，则其clear按钮在hover时才会显示。 可以比较与上一例子交互的不同之处

```html
<template>
    <bk-tag-input
        :placeholder="placeholder"
        show-clear-only-hover
        v-model="tags"
        :list="list">
    </bk-tag-input>
    <p>请输入<code>州</code>来体验下搜索效果</p>
</template>
<script>
    import { bkTagInput } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkTagInput
        },
        data () {
            return {
                placeholder: '请输入城市',
                tags: ['shenzhen'],
                list: [
                    { id: 'shenzhen', name: '深圳' },
                    { id: 'guangzhou', name: '广州' },
                    { id: 'beijing', name: '北京' },
                    { id: 'shanghai', name: '上海' },
                    { id: 'hangzhou', name: '杭州' },
                    { id: 'nanjing', name: '南京' },
                    { id: 'chognqing', name: '重庆' },
                    { id: 'taibei', name: '台北' },
                    { id: 'haikou', name: '海口' }
                ]
            }
        }
    }
</script>
```
:::

### 多个字段搜索 {page=#/tag}

:::demo 可以通过设置 `search-key` 为数组，搜索时匹配多个字段

```html
<template>
    <bk-tag-input
        placeholder="请输入 username 或 nickname"
        display-key="username"
        save-key="username"
        :tpl="multipleTpl"
        :list="multipleList"
        :search-key="multipleSearchKey"
        v-model="multipleSelected">
    </bk-tag-input>
    <p>请输入<code>J</code>或<code>杰克</code>来体验下搜索效果</p>
</template>
<script>
    import { bkTagInput } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTagInput
        },
        data () {
            return {
                multipleSelected: [],
                multipleSearchKey: ['username', 'nickname'],
                multipleList: [
                    { username: 'HelloWorld', nickname: 'HelloWorld' },
                    { username: 'Jack', nickname: '杰克' },
                    { username: 'Json', nickname: '杰森' },
                    { username: 'Jane', nickname: '简' },
                    { username: 'Arman', nickname: '阿尔曼' }
                ]
            }
        },
        methods: {
            multipleTpl (node, ctx, highlightKeyword) {
                const parentClass = 'bk-selector-node'
                const textClass = 'text'
                const innerHtml = `${highlightKeyword(node.username)} (${node.nickname})`
                return (
                    <div class={parentClass}>
                        <span class={textClass} domPropsInnerHTML={innerHtml}></span>
                    </div>
                )
            }
        }
    }
</script>
```
:::

### 触发方式 {page=#/tag}

:::demo 可以通过配置`trigger`来设置下拉框的显示方式，有`focus`（获焦点时显示）,`search`（搜索时显示）两种

```html
<template>
    <bk-tag-input
        v-model="tags"
        :list="list"
        :placeholder="placeholder"
        :trigger="'focus'"
        :allow-next-focus="false">
    </bk-tag-input>
    <p>请输入<code>州</code>来体验下搜索效果</p>
</template>
<script>
    import { bkTagInput } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTagInput
        },
        data () {
            return {
                placeholder: '请输入城市',
                tags: ['shenzhen'],
                list: [
                    { id: 'shenzhen', name: '深圳' },
                    { id: 'guangzhou', name: '广州' },
                    { id: 'beijing', name: '北京' },
                    { id: 'shanghai', name: '上海' },
                    { id: 'hangzhou', name: '杭州' },
                    { id: 'nanjing', name: '南京' },
                    { id: 'chognqing', name: '重庆' },
                    { id: 'taibei', name: '台北' },
                    { id: 'haikou', name: '海口' }
                ]
            }
        }
    }
</script>
```
:::

### 支持输入自定义标签 {page=#/tag}

:::demo 可以通过 `allow-create` 属性来输入自定义标签，按 Enter 键结束；其中 `has-delete-icon` 设置可显示标签删除按钮

```html
<template>
    <bk-tag-input
        v-model="tag1"
        :placeholder="placeholder"
        :list="list"
        :allow-create="allowCreate"
        :has-delete-icon="hasDeleteIcon">
    </bk-tag-input>
</template>
<script>
    import { bkTagInput } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTagInput
        },
        data () {
            return {
                placeholder: '请输入城市',
                allowCreate: true,
                hasDeleteIcon: true,
                tag1: ['shenzhen'],
                list: [
                    { id: 'shenzhen', name: '深圳' },
                    { id: 'guangzhou', name: '广州' },
                    { id: 'beijing', name: '北京' },
                    { id: 'shanghai', name: '上海' },
                    { id: 'hangzhou', name: '杭州' },
                    { id: 'nanjing', name: '南京' },
                    { id: 'chognqing', name: '重庆' },
                    { id: 'taibei', name: '台北' },
                    { id: 'haikou', name: '海口' }
                ]
            }
        }
    }
</script>
```
:::

### 支持输入后失焦点自动匹配 {page=#/tag}

:::demo 可以通过 `allow-auto-match` 属性来配置输入时失焦点后，如果完全匹配则自动选中，如果自定义则自动输入

```html
<template>
    <bk-tag-input
        v-model="tag1"
        :placeholder="placeholder"
        :list="list"
        :allow-create="allowCreate"
        :allow-auto-match="true"
        :has-delete-icon="hasDeleteIcon">
    </bk-tag-input>
</template>
<script>
    import { bkTagInput } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTagInput
        },
        data () {
            return {
                placeholder: '请输入城市',
                allowCreate: true,
                hasDeleteIcon: true,
                tag1: ['shenzhen'],
                list: [
                    { id: 'shenzhen', name: '深圳' },
                    { id: 'guangzhou', name: '广州' },
                    { id: 'beijing', name: '北京' },
                    { id: 'shanghai', name: '上海' },
                    { id: 'hangzhou', name: '杭州' },
                    { id: 'nanjing', name: '南京' },
                    { id: 'chognqing', name: '重庆' },
                    { id: 'taibei', name: '台北' },
                    { id: 'haikou', name: '海口' }
                ]
            }
        }
    }
</script>
```
:::


### 更多自定义配置 {page=#/tag}

:::demo 通过 `save-key` 属性定义选中选项保存的 key 值，自定义 `display-key` 属性为选中项展示的名称，`search-key` 属性为搜索索引，`tpl` 自定义下拉列表展示

```html
<template>
    <bk-tag-input
        :save-key="saveKey"
        :search-key="searchKey"
        :display-key="displayKey"
        v-model="sports"
        :list="sportList"
        :tpl="tpl">
    </bk-tag-input>
    <p>请输入关键字<code>football</code>来体验下搜索效果</p>
</template>
<script>
    import { bkTagInput } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTagInput
        },
        data () {
            return {
                saveKey: 'item',
                searchKey: 'label',
                displayKey: 'label',
                sports: [],
                sportList: [
                    { item: 'football', label: '足球' },
                    { item: 'basketball', label: '篮球' },
                    { item: 'badminton', label: '羽毛球' },
                    { item: 'volleyball', label: '排球' },
                    { item: 'baseball', label: '棒球' }
                ]
            }
        },
        methods: {
            tpl (node, ctx, highlightKeyword) {
                const parentClass = 'bk-selector-node'
                const textClass = 'text'
                const innerHtml = `${highlightKeyword(node.item)} (${node.label})`
                return (
                    <div class={parentClass}>
                        <span class={textClass} domPropsInnerHTML={innerHtml}></span>
                    </div>
                )
            }
        }
    }
</script>
```
:::

### 带分组 {page=#/tag}

:::demo 可以通过配置`use-group`来启用分组功能， 数据源必须加上`children`的配置

```html
<template>
    <bk-tag-input
        v-model="tagList"
        :list="list1"
        :use-group="true"
        :trigger="'focus'">
    </bk-tag-input>
    <p>请输入关键字<code>省</code>来体验下搜索效果</p>
</template>
<script>
    import { bkTagInput } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTagInput
        },
        data () {
            return {
                tagList: [],
                list1: [
                    {
                        id: '1',
                        name: '华中地区',
                        children: [
                            { id: '1-1', name: '河南省' },
                            { id: '1-2', name: '湖北省' },
                            { id: '1-3', name: '湖南省' }
                        ]
                    },
                    {
                        id: '2',
                        name: '华北地区',
                        children: [
                            { id: '2-1', name: '北京市' },
                            { id: '2-2', name: '山西省' },
                            { id: '2-3', name: '河北省' }
                        ]
                    },
                    {
                        id: '3',
                        name: '华南地区',
                        children: [
                            { id: '3-1', name: '广东省' },
                            { id: '3-2', name: '海南省，' }
                        ]
                    }
                ]
            }
        }
    }
</script>
```
:::

### 带tooltip {page=#/tag}

:::demo 可以通过配置`tooltip-key`来让选中的标签在鼠标移上去时显示提示文案

```html
<template>
    <bk-tag-input
        v-model="tagList"
        :list="list1"
        :tooltip-key="'desc'"
        :use-group="true"
        :trigger="'focus'">
    </bk-tag-input>
    <p>请输入关键字<code>省</code>来体验下搜索效果</p>
</template>
<script>
    import { bkTagInput } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTagInput
        },
        data () {
            return {
                tagList: [],
                list1: [
                    {
                        id: '1',
                        name: '华中地区',
                        children: [
                            { id: '1-1', name: '河南省', desc: '河南省河南省' },
                            { id: '1-2', name: '湖北省', desc: '湖北省湖北省' },
                            { id: '1-3', name: '湖南省', desc: '湖南省湖南省' }
                        ]
                    },
                    {
                        id: '2',
                        name: '华北地区',
                        children: [
                            { id: '2-1', name: '北京市', desc: '北京市北京市' },
                            { id: '2-2', name: '山西省', desc: '山西省山西省' },
                            { id: '2-3', name: '河北省', desc: '河北省河北省' }
                        ]
                    },
                    {
                        id: '3',
                        name: '华南地区',
                        children: [
                            { id: '3-1', name: '广东省', desc: '广东省广东省' },
                            { id: '3-2', name: '海南省', desc: '海南省海南省' }
                        ]
                    }
                ]
            }
        }
    }
</script>
```
:::

### 列表项禁用
:::demo 可以通过 `disabled` 属性来禁用列表中的某些项，禁止用户选择

```html
<template>
    <bk-tag-input
        v-model="tagsWithDisabled"
        :list="listWithDisabledItem"
        :trigger="'focus'">
    </bk-tag-input>
</template>
<script>
    import { bkTagInput } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTagInput
        },
        data () {
            return {
                tagsWithDisabled: [],
                listWithDisabledItem: [
                    { id: 'shenzhen', name: '深圳', disabled: true },
                    { id: 'guangzhou', name: '广州'},
                    { id: 'beijing', name: '北京', disabled: true },
                    { id: 'shanghai', name: '上海', disabled: true },
                    { id: 'hangzhou', name: '杭州' },
                    { id: 'nanjing', name: '南京' },
                    { id: 'chognqing', name: '重庆' },
                    { id: 'taibei', name: '台北' },
                    { id: 'haikou', name: '海口' }
                ]
            }
        }
    }
</script>
```
:::


### 禁用状态 {page=#/tag}

:::demo 可以通过 `disabled` 属性来禁用组件

```html
<template>
    <bk-tag-input
        v-model="tags"
        :list="list"
        :disabled="true">
    </bk-tag-input>
</template>
<script>
    import { bkTagInput } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTagInput
        },
        data () {
            return {
                tags: ['shenzhen', 'guangzhou'],
                list: [
                    { id: 'shenzhen', name: '深圳' },
                    { id: 'guangzhou', name: '广州' },
                    { id: 'beijing', name: '北京' },
                    { id: 'shanghai', name: '上海' },
                    { id: 'hangzhou', name: '杭州' },
                    { id: 'nanjing', name: '南京' },
                    { id: 'chognqing', name: '重庆' },
                    { id: 'taibei', name: '台北' },
                    { id: 'haikou', name: '海口' }
                ]
            }
        }
    }
</script>
```
:::


### 回调事件 {page=#/tag}

:::demo 当发生改变时提供 `change` 事件

```html
<template>
    <bk-tag-input
        v-model="tags"
        :list="list"
        @change="change"
        @select="select"
        @remove="remove">
    </bk-tag-input>
</template>
<script>
    import { bkTagInput } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTagInput
        },
        data () {
            return {
                tags: ['shenzhen', 'guangzhou'],
                list: [
                    { id: 'shenzhen', name: '深圳' },
                    { id: 'guangzhou', name: '广州' },
                    { id: 'beijing', name: '北京' },
                    { id: 'shanghai', name: '上海' },
                    { id: 'hangzhou', name: '杭州' },
                    { id: 'nanjing', name: '南京' },
                    { id: 'chognqing', name: '重庆' },
                    { id: 'taibei', name: '台北' },
                    { id: 'haikou', name: '海口' }
                ]
            }
        },
        methods: {
            change (tags) {
                alert(tags)
            },
            select () {

            },
            remove () {

            }
        }
    }
</script>
```
:::

### 综合例子（多选） {page=#/tag}

:::demo 可以通过传`tpl`方法来自定义下拉列表展示，通过`tagTpl`方法来自定义标签展示，可以通过配置`use-group`来启用分组功能， 数据源必须加上`children`的配置，通过`trigger`配置是否在获取焦点时展示搜索列表

```html
<template>
    <bk-tag-input
        class="bk-custom-selector"
        placeholder="请输入字母h来体验下搜索效果"
        v-model="members"
        :save-key="'english_name'"
        :display-key="'chinese_name'"
        :search-key="'english_name'"
        :trigger="'focus'"
        :use-group="true"
        :list="memberList"
        :tag-tpl="renderMemberTag"
        :tpl="renderMerberList">
    </bk-tag-input>
    <p>请输入字母<code>h</code>来体验下搜索效果</p>
</template>
<script>
    import { bkTagInput } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTagInput
        },
        data () {
            return {
                members: [],
                memberList: [
                    {
                        english_name: '1',
                        chinese_name: '分组一',
                        children: [
                            {
                                chinese_name: '小明',
                                english_name: 'h_ming',
                                avatar: mingJPG
                            },
                            {
                                chinese_name: '小红',
                                english_name: 'h_hong',
                                avatar: hongJPG
                            }
                        ]
                    },
                    {
                        english_name: '2',
                        chinese_name: '分组二',
                        children: [
                            {
                                chinese_name: '小华1',
                                english_name: 'h_hua1',
                                avatar: huaJPG
                            },
                            {
                                chinese_name: '小白2',
                                english_name: 'h_bai2',
                                avatar: baiJPG
                            },
                             {
                                chinese_name: '小华3',
                                english_name: 'h_hua3',
                                avatar: huaJPG
                            },
                            {
                                chinese_name: '小白4',
                                english_name: 'h_bai4',
                                avatar: baiJPG
                            },
                             {
                                chinese_name: '小华5',
                                english_name: 'h_hua5',
                                avatar: huaJPG
                            },
                            {
                                chinese_name: '小白6',
                                english_name: 'h_bai6',
                                avatar: baiJPG
                            },
                             {
                                chinese_name: '小华7',
                                english_name: 'h_hua7',
                                avatar: huaJPG
                            },
                            {
                                chinese_name: '小白8',
                                english_name: 'h_bai8',
                                avatar: baiJPG
                            }
                        ]
                    }
                ]
            }
        },
        methods: {
            renderMemberTag (node) {
                const parentClass = 'tag'
                const textClass = 'text'
                const avatarClass = 'avatar'

                return (
                    <div class={parentClass}>
                        <img class={avatarClass} src={node.avatar} />
                        <span class={textClass}>{node.english_name}</span>
                    </div>
                )
            },
            renderMerberList (node, ctx, highlightKeyword) {
                const parentClass = 'bk-selector-node bk-selector-member'
                const textClass = 'text'
                const imgClass = 'avatar'
                const innerHtml = `${highlightKeyword(node.english_name)} (${node.chinese_name})`
                return (
                    <div class={parentClass}>
                        <img class={imgClass} src={node.avatar} />
                        <span class={textClass} domPropsInnerHTML={innerHtml}></span>
                    </div>
                )
            }
        }
    }
</script>
<style lang="postcss">
    .bk-custom-selector {
        .tag-list {
            > li {
                height: 22px;
            }

            .key-node {
                border: none !important;
                background: none !important;

                .tag {
                    background: none;
                    height: 22px;
                    line-height: 22px;

                    .avatar {
                        width: 22px;
                        height: 22px;
                        float: left;
                        margin-right: 8px;
                        border-radius: 50%;
                        vertical-align: middle;
                        border:1px solid #C4C6CC;
                    }
                }
            }
        }
    }
    .bk-selector-list {
        .bk-selector-member {
            padding: 0 10px;
            display: flex;
            align-items: center;
        }
        .avatar {
            width: 22px;
            height: 22px;
            border: 1px solid #C4C6CC;
            border-radius: 50%;
        }
    }
</style>

```
:::

### 综合例子（单选） {page=#/tag}

:::demo 可以通过传`tpl`方法来自定义下拉列表展示，通过`tagTpl`方法来自定义标签展示，可以通过配置`use-group`来启用分组功能， 数据源必须加上`children`的配置，通过`trigger`配置是否在获取焦点时展示搜索列表

```html
<template>
    {{singleMembers}}
    <bk-tag-input
        class="bk-custom-selector"
        placeholder="请输入字母h来体验下搜索效果"
        v-model="singleMembers"
        :max-data="1"
        :save-key="'english_name'"
        :display-key="'chinese_name'"
        :search-key="'english_name'"
        :trigger="'focus'"
        :use-group="true"
        :list="memberList"
        :tag-tpl="renderMemberTag"
        :tpl="renderMerberList">
    </bk-tag-input>
    <p>请输入字母<code>h</code>来体验下搜索效果</p>
</template>
<script>
    import { bkTagInput } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTagInput
        },
        data () {
            return {
                singleMembers: [],
                memberList: [
                    {
                        english_name: '1',
                        chinese_name: '分组一',
                        children: [
                            {
                                chinese_name: '小明',
                                english_name: 'h_ming',
                                avatar: mingJPG
                            },
                            {
                                chinese_name: '小红',
                                english_name: 'h_hong',
                                avatar: hongJPG
                            }
                        ]
                    },
                    {
                        english_name: '2',
                        chinese_name: '分组二',
                        children: [
                            {
                                chinese_name: '小华1',
                                english_name: 'h_hua1',
                                avatar: huaJPG
                            },
                            {
                                chinese_name: '小白2',
                                english_name: 'h_bai2',
                                avatar: baiJPG
                            },
                             {
                                chinese_name: '小华3',
                                english_name: 'h_hua3',
                                avatar: huaJPG
                            },
                            {
                                chinese_name: '小白4',
                                english_name: 'h_bai4',
                                avatar: baiJPG
                            },
                             {
                                chinese_name: '小华5',
                                english_name: 'h_hua5',
                                avatar: huaJPG
                            },
                            {
                                chinese_name: '小白6',
                                english_name: 'h_bai6',
                                avatar: baiJPG
                            },
                             {
                                chinese_name: '小华7',
                                english_name: 'h_hua7',
                                avatar: huaJPG
                            },
                            {
                                chinese_name: '小白8',
                                english_name: 'h_bai8',
                                avatar: baiJPG
                            }
                        ]
                    }
                ]
            }
        },
        methods: {
            renderMemberTag (node) {
                const parentClass = 'tag'
                const textClass = 'text'
                const avatarClass = 'avatar'

                return (
                    <div class={parentClass}>
                        <img class={avatarClass} src={node.avatar} />
                        <span class={textClass}>{node.english_name}</span>
                    </div>
                )
            },
            renderMerberList (node, ctx, highlightKeyword) {
                const parentClass = 'bk-selector-node bk-selector-member'
                const textClass = 'text'
                const imgClass = 'avatar'
                const innerHtml = `${highlightKeyword(node.english_name)} (${node.chinese_name})`
                return (
                    <div class={parentClass}>
                        <img class={imgClass} src={node.avatar} />
                        <span class={textClass} domPropsInnerHTML={innerHtml}></span>
                    </div>
                )
            }
        }
    }
</script>
<style lang="postcss">
    .bk-custom-selector {
        .tag-list {
            > li {
                height: 22px;
            }

            .key-node {
                border: none !important;
                background: none !important;

                .tag {
                    background: none;
                    height: 22px;
                    line-height: 22px;

                    .avatar {
                        width: 22px;
                        height: 22px;
                        float: left;
                        margin-right: 8px;
                        border-radius: 50%;
                        vertical-align: middle;
                        border:1px solid #C4C6CC;
                    }
                }
            }
        }
    }
    .bk-selector-list {
        .bk-selector-member {
            padding: 0 10px;
            display: flex;
            align-items: center;
        }
        .avatar {
            width: 22px;
            height: 22px;
            border: 1px solid #C4C6CC;
            border-radius: 50%;
        }
    }
</style>

```
:::


### 属性 {page=#/tag}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| list | 下拉菜单所需的数据列表 | Array | —— | [] |
| placeholder | 空数据时显示的提示文案 | String | —— | 请输入并按 Enter 结束 |
| disabled | 是否禁用组件 | Boolean | —— | false |
| allow-next-focus | 多选时，是否允许选中后继续操作 | Boolean | —— | true |
| save-key | 循环 list 时，保存字段的 key 值 | String | —— | 'id' |
| search-key | 输入时，搜索的 key 值 | String/Array | —— | 'name' |
| display-key | 循环 list 时，显示字段的 key 值 | String | —— | 'name' |
| has-delete-icon | 是否显示删除按钮 | Boolean | —— | true |
| clearable | 是否允许清空 | Boolean | —— | true |
| allow-create | 是否允许自定义标签输入 | Boolean | —— | false |
| max-data | 是否限制可选个数，-1为不限制 | Number | —— | -1 |
| use-group | 是否显示分组 | Boolean | —— | false |
| max-result | 下拉列表搜索结果显示个数，默认为 10 | Number | —— | 10 |
| content-width | 自定义设置下拉弹框的宽度，单选会撑满因此失效 | Number | —— | 190 |
| content-max-height | 自定义设置下拉弹框的长度 | Number | —— | 300 |
| separator | 输入分隔符号，支持批量输入 | String | —— | —— |
| tpl | 自定义下拉列表模板 | Function | —— | —— |
| tag-tpl | 自定义标签模板 | Function | —— | —— |
| paste-fn | 批量粘贴处理文本返回格式 | Function | —— | —— |
| left-space | 文字与左边框距离 | Number | —— | 0 |
| trigger | 搜索列表触发展示方式，默认是输入关键字搜索时展示，也可以获取焦点是展示（用在数据量少的时候） | String | 'search' / 'focus' | 'search' |
| filter-callback | 过滤函数，参数 `(filterVal, filterKey, data)`，分别表示当前过滤的文本、当前数据使用的 key、所有数据，方便使用者根据自己的逻辑来筛选数据 | Function | —— | —— |
| ext-cls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `.bk-tag-selector` 上 | String | —— | —— |
| tooltip-key | 让选中的标签在鼠标移上去时显示提示文案 | String | —— | —— |
| allow-auto-match | 配置输入时失焦点后，如果完全匹配则自动选中，如果自定义则自动输入 | Boolean | —— | false |
| create-tag-validator | 自定义标签校验函数，返回 boolean，参数`(tag)`，tag表示当前输入值，在自定义标签时，可以自定义添加标签的校验 |
| show-clear-only-hover | 是否在只有hover的时候才显示clear清除按钮 | Boolean | —— | false |
| function | —— | —— | —— |

### 事件 {page=#/tag}
| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| change | 数据发生变化时回调函数 | tags |
| select | 选择数据后的回调函数 | |
| remove | 删除数据后的回调函数 | |
| removeAll | 一键清空数据后的回调函数 | |
| blur | 输入状态时失焦点的回调函数 | input, tags |
