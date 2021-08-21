<script>
    import { bkBreadcrumb, bkBreadcrumbItem, bkInput } from '@'

    export default {
        components: {
            bkBreadcrumb,
            bkBreadcrumbItem,
            bkInput
        },
        data () {
            return {
                list: [
                    { title: '首页', link: { path: '/' } },
                    { title: '更新日志', link: { path: 'changelog' } },
                    { title: '快速上手', link: { path: 'start' } },
                    { title: '面包屑', link: null }
                ],
                separator: '/'
            }
        }
    }
</script>


[[toc]]

## Breadcrumb 面包屑

显示当前页面的路径，快速返回之前的任意页面。

### 基础用法 {page=#/breadcrumb}

:::demo 基础用法。通过设置 `bk-breadcrumb-item` 的 `to` 属性添加跳转链接。

```html
<template>
    <bk-breadcrumb>
        <bk-breadcrumb-item v-for="(item,index) in list" :key="index" :to="item.link">{{item.title}}</bk-breadcrumb-item>
    </bk-breadcrumb>
</template>
<script>
    import { bkBreadcrumb, bkBreadcrumbItem } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkBreadcrumb,
            bkBreadcrumbItem
        },
        data () {
            return {
                list: [
                    { title: '首页', link: { path: '/' } },
                    { title: '更新日志', link: { path: 'changelog' } },
                    { title: '快速上手', link: { path: 'start' } },
                    { title: '面包屑', link: null }
                ]
            }
        }
    }
</script>
```
:::

### 字符分割 {page=#/breadcrumb}

通过自定义 字符串 如：`>`  `|`  `/` 分割。

:::demo 通过设置 `bk-breadcrumb` 的 `separator` 属性设置分隔符，它只允许是字符串，默认为斜杠 `/`。

```html
<template>
    <div>
        <div>
            分割符：<bk-input v-model="separator" style="width: 100px"></bk-input>
        </div>
        <bk-breadcrumb :separator="separator">
            <bk-breadcrumb-item :to="{ path: '/' }">首页</bk-breadcrumb-item>
            <bk-breadcrumb-item><a href="#/changelog">更新日志</a></bk-breadcrumb-item>
            <bk-breadcrumb-item>快速上手</bk-breadcrumb-item>
            <bk-breadcrumb-item>面包屑</bk-breadcrumb-item>
            <bk-breadcrumb-item>
                <template>
                    <bk-input :clearable="true"></bk-input>
                </template>
            </bk-breadcrumb-item>
        </bk-breadcrumb>
    </div>
</template>
<script>
    import { bkBreadcrumb, bkBreadcrumbItem, bkInput } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkBreadcrumb,
            bkBreadcrumbItem,
            bkInput
        },
        data () {
            return {
                separator: '/'
            }
        }
     }
</script>
```
:::

### 图标分隔符 {page=#/breadcrumb}

:::demo 通过设置 `bk-breadcrumb` 的 `separator-class` 属性可使用相应的 `iconfont` 作为分隔符，注意这将使 `separator` 设置失效

```html
<template>
    <bk-breadcrumb separator-class="bk-icon icon-angle-right">
        <bk-breadcrumb-item :to="{ path: '/' }">首页</bk-breadcrumb-item>
        <bk-breadcrumb-item>更新日志</bk-breadcrumb-item>
        <bk-breadcrumb-item>快速上手</bk-breadcrumb-item>
        <bk-breadcrumb-item>面包屑</bk-breadcrumb-item>
    </bk-breadcrumb>
</template>
<script>
    import { bkBreadcrumb, bkBreadcrumbItem } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkBreadcrumb,
            bkBreadcrumbItem
        }
    }
</script>
```
:::

### Breadcrumb Attributes {page=#/breadcrumb}
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| separator | 分隔符 | string | — | 斜杠'/' |
| separator-class | 图标分隔符 class | string | — | - |

### Breadcrumb Item Attributes {page=#/breadcrumb}
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| to        | 路由跳转对象，同 `vue-router` 的 `to` | string/object | — | — |
| replace   | 在使用 to 进行路由跳转时，启用 replace 将不会向 history 添加新记录 | boolean | — | false |
