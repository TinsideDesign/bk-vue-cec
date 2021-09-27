<script>
    import { bkSpin } from '@'

    export default {
        components: {
            bkSpin
        },
        data () {
            return {}
        },
        methods: {}
    }
</script>
<style lang="postcss">
    .test-slot-bottom {
        display: inline-block;
        width: 100%;
        height: 150px;
        line-height: 150px;
        text-align: center;
        border: 1px solid #eee;
    }
    .test-slot-right {
        width: 100%;
        height: 150px;
        line-height: 150px;
        text-align: center;
        border: 1px solid #eee;
        border-top: none;
    }
</style>

[[toc]]

## Spin 加载中

用于页面的加载中状态

### 主题 {page=#/spin}

:::demo 基础加载提供 5 种主题，由 `theme` 属性来定义，可选的主题有 `primary`, `warning`, `success`, `danger`, `info`，默认为 `primary`

```html
<template>
    <bk-spin></bk-spin>
    <bk-spin theme="warning"></bk-spin>
    <bk-spin theme="info"></bk-spin>
</template>
<script>
    import { bkSpin } from '{{BASE_LIB_NAME}}'
    export default {
        data () { },
        components: {
            bkSpin
        }
    }
</script>
```
:::

### 各种大小 {page=#/spin}

:::demo 基础加载提供 4 种大小，由 `size` 属性来定义，可选的主题有 `large`, `normal`, `small`, `mini` 默认为 `small`

```html
<template>
    <bk-spin size="mini"></bk-spin>
    <bk-spin size="small"></bk-spin>
    <bk-spin size="normal"></bk-spin>
    <bk-spin size="large"></bk-spin>
</template>
<script>
    import { bkSpin } from '{{BASE_LIB_NAME}}'
    export default {
        data () { },
        components: {
            bkSpin
        }
    }
</script>
```
:::

### 自定义icon {page=#/spin}

:::demo 使用icon属性，支持自定义icon

```html
<template>
    <bk-spin icon="circle-2-1"></bk-spin>
</template>
<script>
    import { bkSpin } from '{{BASE_LIB_NAME}}'
    export default {
        data () { },
        components: {
            bkSpin
        }
    }
</script>
```
:::

### 是否loading效果 {page=#/spin}

:::demo 通过 spinning 属性定义是否loading效果

```html
<template>
    <bk-spin :spinning="false"></bk-spin>
</template>
<script>
    import { bkSpin } from '{{BASE_LIB_NAME}}'
    export default {
        data () { },
        components: {
            bkSpin
        }
    }
</script>
```
:::

### 自定义插槽位置 {page=#/spin}

:::demo 通过 placement 属性定义插槽展示位置

```html
<template>
    <div class="test-slot-bottom">
        <bk-spin>spin默认下边插槽内容</bk-spin>
    </div>
    <div class="test-slot-right">
        <bk-spin placement="right">spin右边插槽内容</bk-spin>
    </div>
</template>
<script>
    import { bkSpin } from '{{BASE_LIB_NAME}}'
    export default {
        data () { },
        components: {
            bkSpin
        }
    }
</script>
<style lang="postcss">
    .test-slot-bottom {
        display: inline-block;
        line-height: 150px;
        width: 100%;
        height: 150px;
        text-align: center;
        border: 1px solid #eee;
    }
    .test-slot-right {
        width: 100%;
        height: 150px;
        line-height: 150px;
        text-align: center;
        border: 1px solid #eee;
        border-top: none;
    }
</style>
```
:::



### 属性 {page=#/spin}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| theme | 加载类型 | String | `primary` `success` `warning` `danger` | `primary` |
| size | 尺寸 | String |`large` `normal` `small` `mini`|`small`|
| icon | 自定义的加载图标 | String | 参考[蓝鲸 ICON](#/icon)| —— |
| spinning | 是否为加载中状态 | Boolean | true/false | true |
| placement | 插槽的位置 | String | `right` `bottom` | bottom |

### 插槽 {page=#/spin}
| name | 说明 |
|------|------|
|——|匿名作用域插槽, 自定义 spin 的内容|