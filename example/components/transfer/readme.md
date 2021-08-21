<script>
    import { bkTransfer } from '@'

    export default {
        components: {
            bkTransfer
        },
        data () {
            return {
                title: ['服务列表', '已选服务'],
                emptyContent: ['无数据', '未选择任何服务'],
                emptyRtxContent: ['无数据', '未选择任何人员'],
                rtxList: [
                    { name: 'zhangsan', code: 1 },
                    { name: 'lisi', code: 2 },
                    { name: 'laowang', code: 3 },
                    { name: 'zhaosi', code: 4 },
                    { name: 'liuer', code: 5 },
                    { name: 'zhousan', code: 6 },
                    { name: 'huangwu', code: 7 },
                    { name: 'tianliu', code: 8 }
                ],
                rtxValue: [1, 5, 7],
                list: [
                    { service_code: 'pipeline', service_name: '流水线' },
                    { service_code: 'codecc', service_name: '代码检查' },
                    { service_code: 'bcs', service_name: '容器服务' },
                    { service_code: 'artifactory', service_name: '版本仓库' },
                    { service_code: 'ticket', service_name: '凭证管理' },
                    { service_code: 'code', service_name: '代码库' },
                    { service_code: 'experience', service_name: '版本体验' },
                    { service_code: 'environment', service_name: '环境管理' }
                ],
                value: ['artifactory', 'ticket', 'code', 'experience'],
                generalList: [1, 4, 9,'ab', 8, 5, 'bc', 3],
                generalValue: [1, 4, 9, 'bc'],
                sourceLength: 0,
                targetLength: 0
            }
        },
        methods: {
            change (sourceList, targetList, targetValueList) {
                this.sourceLength = sourceList.length
                this.targetLength = targetList.length
                console.log(sourceList)
                console.log(targetList)
                console.log(targetValueList)
            },
            addAll () {
                const list = []
                this.rtxList.forEach(item => {
                    list.push(item.code)
                })
                this.rtxValue = [...list]
            },
            removeAll () {
                this.rtxValue = []
            }
        }
    }
</script>
<style lang="postcss">
    .left-header label,
    .right-header label {
        display: inline-block;
        font-size: 12px;
    }
    .add-all {
        display: inline-block;
        float: right;
        cursor: pointer;
        font-size: 14px;
        span {
            color: #006DFF;
            &.disabled {
                cursor: not-allowed;
                opacity: 0.5;
            }
        }
    }
    .add-all {
        display: inline-block;
        float: right;
        cursor: pointer;
        font-size: 12px;
    }
    .add-all span {
        color: #006DFF;
    }
    .disabled  {
        cursor: not-allowed;
        opacity: 0.5;
    }
    .remove-all {
        display: inline-block;
        float: right;
        cursor: pointer;
        font-size: 12px;
    }
    .remove-all span {
        color: #F95F5B;
    }
    .empty-content {
        position: relative;
        top: 145px;
        text-align: center;
    }
</style>

[[toc]]

## Transfer 穿梭框

:::exampleLink [更多示例](#/transfer/example)

### 基础用法 {page=#/transfer}

:::demo 默认配置 `source-list` 和 `display-key`，`source-list` 为必传 `source-list` 可以是普通数组。当 `source-list` 为普通数组时，`display-key` 可不传。

```html
<template>
    <bk-transfer :source-list="list" :display-key="'service_name'" :setting-key="'service_code'" @change="change" :show-overflow-tips="true">
    </bk-transfer>
</template>
<script>
    import { bkTransfer } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTransfer
        },
        data() {
            return {
                list: [
                    { service_code: 'pipeline', service_name: '流水线' },
                    { service_code: 'codecc', service_name: '代码检查' },
                    { service_code: 'bcs', service_name: '容器服务' },
                    { service_code: 'artifactory', service_name: '版本仓库' },
                    { service_code: 'ticket', service_name: '凭证管理' },
                    { service_code: 'code', service_name: '代码库' },
                    { service_code: 'experience', service_name: '版本体验' },
                    { service_code: 'environment', service_name: '环境管理' }
                ]
            }
        },
        methods: {
            change (sourceList, targetList, targetValueList) {
                console.log(sourceList)
                console.log(targetList)
                console.log(targetValueList)
            }
        }
    }
</script>
```

:::

### 配置 target-list 以及设置排序 {page=#/transfer}

:::demo 配置 `sortable` 以及 `sort-key` 使得操作数据时数据的排序不变，配置 `target-list` 设置默认选择的数据。`sortable` 为 true 时开启排序功能，为 false 时则关闭，`sort-key` 为排序所依据的 key 值。注意：当 `source-list` 为普通数组时，开启排序时默认按照数组 index 排序，此时可不传 `sort-key`。
```html
<template>
    <bk-transfer
        :target-list="value"
        :source-list="list"
        :title="title"
        :empty-content="emptyContent"
        :display-key="'service_name'"
        :sort-key="'service_code'"
        :setting-key="'service_code'"
        :sortable="true"
        @change="change">
    </bk-transfer>
</template>
<script>
    import { bkTransfer } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTransfer
        },
        data () {
            return {
                title: ['服务列表', '已选服务'],
                emptyContent: ['无数据', '未选择任何服务'],
                list: [
                    { service_code: 'pipeline', service_name: '流水线' },
                    { service_code: 'codecc', service_name: '代码检查' },
                    { service_code: 'bcs', service_name: '容器服务' },
                    { service_code: 'artifactory', service_name: '版本仓库' },
                    { service_code: 'ticket', service_name: '凭证管理' },
                    { service_code: 'code', service_name: '代码库' },
                    { service_code: 'experience', service_name: '版本体验' },
                    { service_code: 'environment', service_name: '环境管理' }
                ],
                value: ['artifactory', 'ticket', 'code', 'experience']
            }
        },
        methods: {
            change (sourceList, targetList, targetValueList) {
                console.log(sourceList)
                console.log(targetList)
                console.log(targetValueList)
            }
        }
    }
</script>
```
:::

### 普通数组配置 {page=#/transfer}

:::demo 此时根据 index 排序；`display-key` 和 `sort-key` 以及 `setting-key` 可不传。

```html
<template>
    <bk-transfer :source-list="generalList" :target-list="generalValue" :sortable="true" @change="change">
    </bk-transfer>
</template>
<script>
    import { bkTransfer } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTransfer
        },
        data() {
            return {
                generalList: [1, 4, 9,'ab', 8, 5, 'bc', 3],
                generalValue: [1, 4, 9, 'bc']
            }
        },
        methods: {
            change (sourceList, targetList, targetValueList) {
                console.log(sourceList)
                console.log(targetList)
                console.log(targetValueList)
            }
        }
    }
</script>
```
:::

### 自定义 header 和无数据时显示内容 {page=#/transfer}

:::demo 配置 slot 为 `left-header` 或 `right-header` 可自定义 header 内容，配置 slot 为 `left-empty-content` 和 `right-empty-content` 可自定义数据为空时所显示的内容(注意：当配置了 slot 时，其 `title` 和 `empty-content` 可不配置)

```html
<template>
    <bk-transfer
        :source-list="rtxList"
        :target-list="rtxValue"
        :display-key="'name'"
        :sort-key="'code'"
        :setting-key="'code'"
        :sortable="true"
        @change="change">
        <div slot="left-header" class="left-header">
            <label>{{'企业微信列表(' + this.sourceLength + ')'}}</label>
            <div class="add-all">
                <span @click="addAll" v-if="this.sourceLength">选择全部</span>
                <span v-else class="disabled">选择全部</span>
            </div>
        </div>
        <div slot="right-header" class="right-header">
            <label>{{'已选人员(' + this.targetLength + ')'}}</label>
            <div class="remove-all">
                <span @click="removeAll" v-if="this.targetLength">全部移除</span>
                <span class="disabled" v-else>全部移除</span>
            </div>
        </div>
        <div slot="left-empty-content">
            <div class="empty-content">
                数据为空
            </div>
        </div>
        <div slot="right-empty-content">
            <div class="empty-content">
                未选择任何数据
            </div>
        </div>
    </bk-transfer>
</template>
<script>
    import { bkTransfer } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTransfer
        },
        data() {
            return {
                rtxList: [
                    { name: 'zhangsan', code: 1 },
                    { name: 'lisi', code: 2 },
                    { name: 'laowang', code: 3 },
                    { name: 'zhaosi', code: 4 },
                    { name: 'liuer', code: 5 },
                    { name: 'zhousan', code: 6 },
                    { name: 'huangwu', code: 7 },
                    { name: 'tianliu', code: 8 }
                ],
                rtxValue: [1, 5, 7],
                sourceLength: 0,
                targetLength: 0
            }
        },
        methods: {
            change (sourceList, targetList, targetValueList) {
                this.sourceLength = sourceList.length
                this.targetLength = targetList.length
                console.log(sourceList)
                console.log(targetList)
                console.log(targetValueList)
            },
            addAll () {
                const list = []
                this.rtxList.forEach(item => {
                    list.push(item.code)
                })
                this.rtxValue = [...list]
            },
            removeAll () {
                this.rtxValue = []
            }
        }
    }
</script>
<style lang="postcss">
    .left-header label,
    .right-header label {
        display: inline-block;
        font-size: 12px;
    }
    .add-all {
        display: inline-block;
        float: right;
        cursor: pointer;
        font-size: 14px;
        span {
            color: #006DFF;
            &.disabled {
                cursor: not-allowed;
                opacity: 0.5;
            }
        }
    }
    .add-all {
        display: inline-block;
        float: right;
        cursor: pointer;
        font-size: 12px;
    }
    .add-all span {
        color: #006DFF;
    }
    .disabled  {
        cursor: not-allowed;
        opacity: 0.5;
    }
    .remove-all {
        display: inline-block;
        float: right;
        cursor: pointer;
        font-size: 12px;
    }
    .remove-all span {
        color: #F95F5B;
    }
    .empty-content {
        position: relative;
        top: 145px;
        text-align: center;
    }
</style>
```
:::

### 自定义 选项卡 模板 {page=#/transfer}

:::demo 配置 slot 为 `source-option` 或 `target-option` 可自定义 选项卡 内容。

```html
<template>
    <bk-transfer
        :source-list="rtxList"
        :target-list="rtxValue"
        :display-key="'name'"
        :sort-key="'code'"
        :setting-key="'code'"
        :sortable="true"
        @change="change">
        <div slot="source-option" slot-scope="data">
            code: {{ data.code }}, name: {{ data.name }}
        </div>
        <div slot="target-option" slot-scope="data">
            code: {{ data.code }}, name: {{ data.name }}
        </div>
    </bk-transfer>
</template>
<script>
    import { bkTransfer } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTransfer
        },
        data() {
            return {
                rtxList: [
                    { name: 'zhangsan', code: 1 },
                    { name: 'lisi', code: 2 },
                    { name: 'laowang', code: 3 },
                    { name: 'zhaosi', code: 4 },
                    { name: 'liuer', code: 5 },
                    { name: 'zhousan', code: 6 },
                    { name: 'huangwu', code: 7 },
                    { name: 'tianliu', code: 8 }
                ],
                rtxValue: [1, 5, 7]
            }
        }
    }
</script>
```
:::

### 左侧带搜索 {page=#/transfer}

:::demo 配置 `searchable` 启用搜索功能

```html
<template>
    <bk-transfer
        :source-list="rtxList"
        :target-list="rtxValue"
        :display-key="'name'"
        :sort-key="'code'"
        :setting-key="'code'"
        :sortable="true"
        :searchable="true"
        @change="change">
        <div slot="left-header" class="left-header">
            <label>{{'企业微信列表(' + this.sourceLength + ')'}}</label>
            <div class="add-all">
                <span @click="addAll" v-if="this.sourceLength">选择全部</span>
                <span v-else class="disabled">选择全部</span>
            </div>
        </div>
        <div slot="right-header" class="right-header">
            <label>{{'已选人员(' + this.targetLength + ')'}}</label>
            <div class="remove-all">
                <span @click="removeAll" v-if="this.targetLength">全部移除</span>
                <span class="disabled" v-else>全部移除</span>
            </div>
        </div>
        <div slot="left-empty-content">
            <div class="empty-content">
                数据为空
            </div>
        </div>
        <div slot="right-empty-content">
            <div class="empty-content">
                未选择任何数据
            </div>
        </div>
    </bk-transfer>
</template>
<script>
    import { bkTransfer } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTransfer
        },
        data() {
            return {
                rtxList: [
                    { name: 'zhangsan', code: 1 },
                    { name: 'lisi', code: 2 },
                    { name: 'laowang', code: 3 },
                    { name: 'zhaosi', code: 4 },
                    { name: 'liuer', code: 5 },
                    { name: 'zhousan', code: 6 },
                    { name: 'huangwu', code: 7 },
                    { name: 'tianliu', code: 8 }
                ],
                rtxValue: [1, 5, 7],
                sourceLength: 0,
                targetLength: 0
            }
        },
        methods: {
            change (sourceList, targetList, targetValueList) {
                this.sourceLength = sourceList.length
                this.targetLength = targetList.length
                console.log(sourceList)
                console.log(targetList)
                console.log(targetValueList)
            },
            addAll () {
                const list = []
                this.rtxList.forEach(item => {
                    list.push(item.code)
                })
                this.rtxValue = [...list]
            },
            removeAll () {
                this.rtxValue = []
            }
        }
    }
</script>
<style lang="postcss">
    .left-header label,
    .right-header label {
        display: inline-block;
        font-size: 12px;
    }
    .add-all {
        display: inline-block;
        float: right;
        cursor: pointer;
        font-size: 14px;
        span {
            color: #006DFF;
            &.disabled {
                cursor: not-allowed;
                opacity: 0.5;
            }
        }
    }
    .add-all {
        display: inline-block;
        float: right;
        cursor: pointer;
        font-size: 12px;
    }
    .add-all span {
        color: #006DFF;
    }
    .disabled  {
        cursor: not-allowed;
        opacity: 0.5;
    }
    .remove-all {
        display: inline-block;
        float: right;
        cursor: pointer;
        font-size: 12px;
    }
    .remove-all span {
        color: #F95F5B;
    }
    .empty-content {
        position: relative;
        top: 145px;
        text-align: center;
    }
</style>
```
:::

### 属性 {page=#/transfer}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| title | 顶部 title | Array | ——  | ['左侧列表', '右侧列表'] |
| empty-content | 无数据时显示文案 | Array | —— | ['无数据', '未选择任何项'] |
| display-key | 循环 list 时，显示字段的 key 值 | String | —— | name |
| setting-key | 具有唯一标识的 key 值 | String | —— | id |
| sort-key | 排序所依据的 key | String | —— | —— |
| searchable | 是否允许左侧搜索（以display-key来匹配） | Boolean | —— | false |
| sortable | 是否设置排序 | Boolean | —— | false |
| source-list | 穿梭框数据源(必传) | Array | —— | —— |
| target-list | 已选择的数据 | Array | —— | [] |
| always-show-close | 是否一直显示关闭icon | Boolean | —— | true |
| show-overflow-tips | 文本溢出时，是否使用气泡显示全部内容 | Boolean | —— | false |
| ext-cls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `.bk-transfer` 上 | String | —— | —— |

### 事件 {page=#/transfer}
| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| change | 数据源改变触发(targetValueList 表示所选数据的 setting-key 值) | sourceList/targetList/targetValueList |

### 插槽(slot) {page=#/transfer}
| name | 说明 |
|---|---|
| left-header | 左侧头部插槽 |
| right-header | 右侧头部插槽 |
| left-empty-content | 左侧无数据时插槽 |
| right-empty-content | 右侧无数据时插槽 |
| source-option | 左侧选项卡插槽 |
| target-option | 右侧选项卡插槽 |
