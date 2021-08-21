<script>
    import { bkPagination } from '@'

    export default {
        components: {
            bkPagination
        },
        data () {
            return {
                defaultPaging: {
                    current: 1,
                    limit: 10,
                    count: 300
                },
                compactPaging: {
                    current: 1,
                    limit: 10,
                    count: 300,
                    type: 'compact'
                },
                pagingConfigOne: {
                    current: 1,
                    limit: 10,
                    count: 300,
                    align: 'center',
                    showLimit: false
                },
                pagingConfigTwo: {
                    current: 1,
                    limit: 20,
                    count: 300,
                    location: 'left',
                    align: 'right',
                    showLimit: true,
                    limitList: [20, 50, 100]
                }
            }
        },
        methods: {
            pageChange (page) {
                console.warn(page)
            }
        }
    }
</script>

[[toc]]

## Pagination 分页

分页显示数据

### 基础用法 {page=#/pagination}

:::demo 默认配置的组件

```html
<template>
    <bk-pagination
        :current.sync="defaultPaging.current"
        :count.sync="defaultPaging.count"
        :limit="defaultPaging.limit">
    </bk-pagination>
</template>

<script>
    import { bkPagination } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkPagination
        },
        data () {
            return {
                defaultPaging: {
                    current: 1,
                    limit: 10,
                    count: 300
                }
            }
        }
    }
</script>
```
:::

### 紧凑效果 {page=#/pagination}

:::demo 配置 `type` 字段

```html
<template>
    <bk-pagination
        :current.sync="compactPaging.current"
        :count.sync="compactPaging.count"
        :limit.sync="compactPaging.limit"
        :type="compactPaging.type">
    </bk-pagination>
</template>

<script>
    import { bkPagination } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkPagination
        },
        data () {
            return {
                compactPaging: {
                    current: 1,
                    limit: 10,
                    count: 300,
                    type: 'compact'
                }
            }
        }
    }
</script>
```
:::

### 小型分页 {page=#/pagination}

:::demo 配置 `small` 字段，在空间有限的情况下使用。

```html
<template>
    <bk-pagination
        small
        :current.sync="compactPaging.current"
        :count.sync="compactPaging.count"
        :limit="compactPaging.limit" />
</template>

<script>
    import { bkPagination } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkPagination
        },
        data () {
            return {
                compactPaging: {
                    current: 1,
                    limit: 10,
                    count: 300
                }
            }
        }
    }
</script>
```
:::

### 尺寸 {page=#/pagination}

:::demo 配置 `size` 字段

```html
<template>
    <bk-pagination
        size="small"
        :current.sync="defaultPaging.current"
        :limit.sync="defaultPaging.limit"
        :count="defaultPaging.count">
    </bk-pagination>
</template>

<script>
    import { bkPagination } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkPagination
        },
        data () {
            return {
                defaultPaging: {
                    current: 1,
                    limit: 10,
                    count: 300
                }
            }
        }
    }
</script>
```
:::

### 配置每页显示条数和控件位置 {page=#/pagination}

:::demo 通过 `show-limit` 字段配置是否显示"每页显示条数控件"，通过 `limit-list` 配置"每页显示条数可选项列表"，通过 `align` 和 `location` 配置"分页控件"和"每页显示条数控件"的位置。

```html
<template>
    <div>
        <bk-pagination
            size="small"
            :current.sync="pagingConfigOne.current"
            :limit="pagingConfigOne.limit"
            :count="pagingConfigOne.count"
            :align="pagingConfigOne.align"
            :show-limit="pagingConfigOne.showLimit">
        </bk-pagination>
        <div style="height: 20px;"></div>
        <bk-pagination
            size="small"
            :current.sync="pagingConfigTwo.current"
            :limit="pagingConfigTwo.limit"
            :count="pagingConfigTwo.count"
            :location="pagingConfigTwo.location"
            :align="pagingConfigTwo.align"
            :show-limit="pagingConfigTwo.showLimit"
            :limit-list="pagingConfigTwo.limitList">
        </bk-pagination>
    </div>
</template>

<script>
    import { bkPagination } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkPagination
        },
        data () {
            return {
                pagingConfigOne: {
                    current: 1,
                    limit: 10,
                    count: 300,
                    align: 'center'
                    showLimit: false
                },
                pagingConfigTwo: {
                    current: 1,
                    limit: 20,
                    count: 300,
                    location: 'left',
                    align: 'right',
                    showLimit: true,
                    limitList: [20, 50, 100]
                }
            }
        }
    }
</script>
```
:::

### 属性 {page=#/pagination}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| count | 总数据量 | Number | —— | —— |
| current | 当前页码，正整数，支持`.sync`修饰符 | Number | —— | —— |
| limit | 每页显示条数(须存在于`limit-list`中) ，支持`.sync`修饰符| Number | —— | —— |
| limit-list | 每页显示条数可选项列表 | Array | —— | [10, 20, 50, 100] |
| show-limit | 是否显示每页显示条数控件 | Boolean | `false` `true` | true |
| location | 每页显示条数控件位置 | String | `left` / `right` | right |
| align | 分页控件位置，优先级高于location | String | `left` / `center` / `right` | left |
| type | 组件外观类型 | String | `default` `compact` | default |
| size | 页码尺寸大小 | String | `default` `small` | default |
| small | 小型分页 | Boolean | `false` `true` | false |
| show-total-count | 总计 | Boolean | `false` `true` | false |
| ext-cls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `.bk-page` 上 | String | —— | —— |

### 事件 {page=#/pagination}
| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| change | 当前页码变化时的回调 | 变化后的页码 |
| limit-change | 当前分页尺寸变化时的回调 | 变化后的分页尺寸 |
