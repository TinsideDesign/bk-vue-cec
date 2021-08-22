<script>
    import { bkLink } from '@'

    export default {
        components: {
            bkLink
        },
        data () {
            return {}
        }
    }
</script>

[[toc]]

## Link 文字链接

文字链接即文字超链接，基于尽可能帮助运维人员封装更多场景的基础组件，我们针对 原生按钮 需求封装为 文字按钮，针对 原生超链接 需求封装为 文字链接

### 基础用法 {page=#/link}

:::demo 基础的文字链接用法

```html
<template>
    <div>
        <bk-link theme="default" href="/" target="_blank">默认链接</bk-link>
        <bk-link theme="primary">主要链接</bk-link>
        <bk-link theme="success">成功链接</bk-link>
        <bk-link theme="warning">警告链接</bk-link>
        <bk-link theme="danger">危险链接</bk-link>
    </div>
</template>

<script>
    import { bkLink } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkLink
        }
    }
</script>
```
:::

### 禁用状态 {page=#/link}

:::demo 文字链接不可用状态

```html
<template>
    <div>
        <bk-link disabled theme="default" href="/" target="_blank">默认链接</bk-link>
        <bk-link disabled theme="primary">主要链接</bk-link>
        <bk-link disabled theme="success">成功链接</bk-link>
        <bk-link disabled theme="warning">警告链接</bk-link>
        <bk-link disabled theme="danger">危险链接</bk-link>
    </div>
</template>

<script>
    import { bkLink } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkLink
        }
    }
</script>
```
:::

### 下划线 {page=#/link}

:::demo 文字链接下划线

```html
<template>
    <div>
        <bk-link underline theme="default" href="/" target="_blank">默认链接</bk-link>
        <bk-link underline theme="primary">主要链接</bk-link>
        <bk-link underline theme="success">成功链接</bk-link>
        <bk-link underline theme="warning">警告链接</bk-link>
        <bk-link underline theme="danger">危险链接</bk-link>
    </div>
</template>

<script>
    import { bkLink } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkLink
        }
    }
</script>
```
:::

### 图标 {page=#/link}

:::demo 带图标的文字链接

```html
<template>
    <div>
        <bk-link theme="primary" icon="bk-icon icon-cog-shape">左侧图标</bk-link>
        <bk-link theme="primary" icon="bk-icon icon-cog-shape" icon-placement="right">右侧图标</bk-link>
    </div>
</template>

<script>
    import { bkLink } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkLink
        }
    }
</script>
```
:::

### 属性 {page=#/link}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| theme | 文字链接主题色| String | `default` `primary` `success` `warning` `danger` | default |
| href | 文字链接地址 | String | —— | —— |
| disabled | 是否禁用 | Boolean | —— | false |
| underline | 是否显示下划线 | Boolean | —— | false |
| icon | 图标类名 | String | —— | —— |
| icon-placement | 图标位置 | String | `left` `right` | left |

### 事件 {page=#/link}
| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| click | 文字链接点击事件 | event |
