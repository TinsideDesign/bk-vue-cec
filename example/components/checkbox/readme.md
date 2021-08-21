<script>
    import { bkCheckbox, bkCheckboxGroup } from '@'

    export default {
        components: {
            bkCheckbox,
            bkCheckboxGroup
        },
        data () {
            return {
                demo1: ['value2', 'value4'],
                demo2: 'yes',
                demo3: 'no',
                demo4: ['value1'],
                demo5: ['wx'],
                demo6: ['wx']
            }
        },
        methods: {
            handlerChange (newValue, oldValue) {
                alert(`newValue: ${newValue}，oldValue: ${oldValue}`)
            }
        }
    }
</script>
<style lang="postcss">
    .bk-form-checkbox {
        margin-right: 30px;
    }
</style>

[[toc]]

## Checkbox 多选框

表单-多选框，在一组选项中进行多选

:::exampleLink [更多示例](#/checkbox/example)

### 基础多选框 {page=#/checkbox}

::: demo 使用 `bk-checkbox` 标签配置多选框，并结合 `bk-checkbox-group` 使用
``` html
<template>
    <div>
        <p class="mb5">我的选择：{{demo1}}</p>
        <bk-checkbox-group v-model="demo1">
            <bk-checkbox :value="'value1'">未选择</bk-checkbox>
            <bk-checkbox :value="'value2'">已选择</bk-checkbox>
            <bk-checkbox :value="'value3'" :disabled="true">未选择禁用</bk-checkbox>
            <bk-checkbox :value="'value4'" :disabled="true">已选择禁用</bk-checkbox>
        </bk-checkbox-group>
    </div>
</template>
<script>
    import { bkCheckbox, bkCheckboxGroup } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkCheckbox,
            bkCheckboxGroup
        },
        data () {
            return {
                demo1: ['value2', 'value4'],
            }
        }
    }
</script>
<style lang="postcss">
    .bk-form-checkbox {
        margin-right: 30px;
    }
</style>
```
:::

### 半选多选框 {page=#/checkbox}

::: demo 使用 `indeterminate` 属性配置半选框
``` html
<template>
    <div>
        <bk-checkbox-group>
            <bk-checkbox :value="'indeterminateValue'" :indeterminate="true">我是半选</bk-checkbox>
        </bk-checkbox-group>
    </div>
</template>
<script>
    import { bkCheckbox, bkCheckboxGroup } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkCheckbox,
            bkCheckboxGroup
        },
        data () {
            return {}
        }
    }
</script>
<style lang="postcss">
    .bk-form-checkbox {
        margin-right: 30px;
    }
</style>
```
:::

### 单个选框（双向数据绑定） {page=#/checkbox}

::: demo 单个用法，可允许通过 `true-value`，`false-value` 配置真假值，注：`v-model` 绑定的变量和真假值同数据类型
``` html
<template>
    <div>
        <p class="mb5">我的选择：{{demo2}}</p>
        <bk-checkbox
            :true-value="'yes'"
            :false-value="'no'"
            v-model="demo2">
            是否启用白名单
        </bk-checkbox>
    </div>
</template>
<script>
    import { bkCheckbox } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkCheckbox
        },
        data () {
            return {
                demo2: 'yes'
            }
        }
    }
</script>
<style lang="postcss">
    .bk-form-checkbox {
        margin-right: 30px;
    }
</style>
```
:::

### 单个选框（初始化选中状态） {page=#/checkbox}

::: demo 初始化选中状态，配置 `bk-checkbox` 的 `checked` 属性
``` html
<template>
    <div>
        <p class="mb5">我的选择：{{demo3}}</p>
        <bk-checkbox
            :checked="true"
            :true-value="'yes'"
            :false-value="'no'"
            v-model="demo3">
            是否启用白名单
        </bk-checkbox>
    </div>
</template>
<script>
    import { bkCheckbox } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkCheckbox
        },
        data () {
            return {
                demo3: 'no'
            }
        }
    }
</script>
<style lang="postcss">
    .bk-form-checkbox {
        margin-right: 30px;
    }
</style>
```
:::

### 禁用状态 {page=#/checkbox}

::: demo 不可选状态，配置 `bk-checkbox` 的 `disabled` 属性

``` html
<template>
    <div>
        <bk-checkbox-group v-model="demo4">
            <bk-checkbox :value="'value1'">工作</bk-checkbox>
            <bk-checkbox :value="'value2'" :disabled="true">休假</bk-checkbox>
        </bk-checkbox-group>
    </div>
</template>
<script>
    import { bkCheckbox, bkCheckboxGroup } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkCheckbox,
            bkCheckboxGroup
        },
        data () {
            return {
                demo4: ['value1']
            }
        }
    }
</script>
<style lang="postcss">
    .bk-form-checkbox {
        margin-right: 30px;
    }
</style>
```
:::

### 自定义配置 {page=#/checkbox}

::: demo 通过 `slot` 配置更加丰富

``` html
<template>
    <div>
        <bk-checkbox-group v-model="demo5">
            <bk-checkbox :value="'qq'">
                <i class="bk-icon mr5 icon-qq"></i>QQ
            </bk-checkbox>
            <bk-checkbox :value="'wx'">
                <i class="bk-icon mr5 icon-weixin"></i>微信
            </bk-checkbox>
            <bk-checkbox :value="'weibo'">
                <i class="bk-icon mr5 icon-sina"></i>微博
            </bk-checkbox>
        </bk-checkbox-group>
    </div>
</template>
<script>
    import { bkCheckbox, bkCheckboxGroup } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkCheckbox,
            bkCheckboxGroup
        },
        data () {
            return {
                demo5: ['wx']
            }
        }
    }
</script>
<style lang="postcss">
    .bk-form-checkbox {
        margin-right: 30px;
    }
</style>
```
:::

### 回调事件 {page=#/checkbox}

::: demo 提供 `change` 回调事件

``` html
<template>
    <div>
        <bk-checkbox-group v-model="demo6" @change="handlerChange">
            <bk-checkbox :value="'qq'">
                <i class="bk-icon mr5 icon-qq"></i>QQ
            </bk-checkbox>
            <bk-checkbox :value="'wx'">
                <i class="bk-icon mr5 icon-weixin"></i>微信
            </bk-checkbox>
            <bk-checkbox :value="'weibo'">
                <i class="bk-icon mr5 icon-sina"></i>微博
            </bk-checkbox>
        </bk-checkbox-group>
    </div>
</template>
<script>
    import { bkCheckbox, bkCheckboxGroup } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkCheckbox,
            bkCheckboxGroup
        },
        data () {
            return {
                demo6: ['wx']
            }
        },
        methods: {
            handlerChange (newValue, oldValue) {
                alert(`newValue: ${newValue}，oldValue: ${oldValue}`)
            }
        }
    }
</script>
<style lang="postcss">
    .bk-form-checkbox {
        margin-right: 30px;
    }
</style>
```
:::

### bk-checkbox 属性 {page=#/checkbox}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| name | 名称 | String | —— | —— |
| value | checkbox 的真值，与 checkbox-group 结合时通过配置 value | String / Number / Boolean | —— | undefined |
| true-value | checkbox 的真值 | String / Number / Boolean | —— | true |
| false-value | checkbox 的假值 | String / Number / Boolean | —— | false |
| disabled | 是否禁用 | Boolean | true/false  | false  |
| checked | 初始化选中状态，如果 `v-model` 绑定的值也会相应改变，这个属性在 `check-group` 里无效 | Boolean | true / false  | undefined  |
| indeterminate | 是否半选 | Boolean | true/false  | false  |
| ext-cls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `.bk-form-checkbox` 上 | String | —— | —— |
| before-change | 在选中状态发生变更前执行的函数，返回`false`将中断状态变更 | Function | —— | —— |

### bk-checkbox 事件{page=#/checkbox}
| 事件名称 | 说明 | 回调参数 |
|---------|------|---------|
| change | 显示时触发此回调函数 | 当前值 |

### bk-checkbox-group 属性 {page=#/checkbox}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| name | 名称 | String | —— | —— |

### bk-checkbox-group 事件 {page=#/checkbox}
| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| change | 显示时触发此回调函数 | 当前值，原来值 |
