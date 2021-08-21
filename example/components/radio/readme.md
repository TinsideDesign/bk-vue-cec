<script>
    import { bkRadio, bkRadioButton, bkRadioGroup } from '@'

    export default {
        components: {
            bkRadio,
            bkRadioButton,
            bkRadioGroup
        },
        data () {
            return {
                demo1: 'value1',
                demo2: false,
                demo3: 'valu1',
                demo4: 'wx',
                demo5: 'value2'
            }
        },
        methods: {
            handlerChange (value) {
                alert(value)
            }
        }
    }
</script>
<style lang="postcss">
    .bk-form-radio {
        margin-right: 30px;
    }
</style>

[[toc]]

## Radio 单选框

表单-单选框，在一组选项中进行单选

:::exampleLink [更多示例](#/radio/example)

### 基础单选框 {page=#/radio}

::: demo 使用 `bk-radio` 标签配置单选框
``` html
<template>
    <div>
        <bk-radio-group v-model="demo1">
            <bk-radio :value="'value1'">已选择</bk-radio>
            <bk-radio :value="'value2'" :disabled="true">未选择禁用</bk-radio>
        </bk-radio-group><br>
        <bk-radio-group v-model="demo5">
            <bk-radio :value="'value1'">未选择</bk-radio>
            <bk-radio :value="'value2'" :disabled="true">已选择禁用</bk-radio>
        </bk-radio-group>
    </div>
</template>
<script>
    import { bkRadio, bkRadioGroup } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkRadio,
            bkRadioGroup
        },
        data () {
            return {
                demo1: 'value1',
                demo5: 'value2'
            }
        }
    }
</script>
<style lang="postcss">
    .bk-form-radio {
        margin-right: 30px;
    }
</style>
```
:::

### 单个选框（初始选中状态） {page=#/radio}

::: demo 使用 `bk-radio` 标签，配置 `checked` 属性
``` html
<template>
    <div>
        <bk-radio :checked="true" v-model="demo2">
            是否启用白名单
        </bk-radio>
    </div>
</template>
<script>
    import { bkRadio } from '{{BASE_LIB_NAME}}'

    export default {
        data () {
            return {
                demo2: false
            }
        }
    }
</script>
<style lang="postcss">
    .bk-form-radio {
        margin-right: 30px;
    }
</style>
```
:::


### 禁用状态 {page=#/radio}

::: demo 不可选状态，配置 `radio` 的 `disabled` 属性

``` html
<template>
    <div>
        <bk-radio-group v-model="demo3">
            <bk-radio :value="'value1'">工作</bk-radio>
            <bk-radio :value="'value2'" :disabled="true">休假</bk-radio>
        </bk-radio-group>
    </div>
</template>
<script>
    import { bkRadio, bkRadioGroup } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkRadio,
            bkRadioGroup
        },
        data () {
            return {
                demo3: 'work'
            }
        }
    }
</script>
<style lang="postcss">
    .bk-form-radio {
        margin-right: 30px;
    }
</style>
```
:::

### 自定义配置 {page=#/radio}

::: demo 通过 `slot` 配置更加丰富

``` html
<template>
    <div>
        我的选择：{{demo4}}
        <bk-radio-group v-model="demo4">
            <bk-radio :value="'qq'">
                <i class="bk-icon mr5 icon-qq"></i>QQ
            </bk-radio>
            <bk-radio :value="'wx'">
                <i class="bk-icon mr5 icon-weixin"></i>微信
            </bk-radio>
            <bk-radio :value="'weibo'">
                <i class="bk-icon mr5 icon-sina"></i>微博
            </bk-radio>
        </bk-radio-group>
    </div>
</template>
<script>
    import { bkRadio, bkRadioGroup } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkRadio,
            bkRadioGroup
        },
        data () {
            return {
                demo4: 'wx'
            }
        }
    }
</script>
<style lang="postcss">
    .bk-form-radio {
        margin-right: 30px;
    }
</style>
```
:::

### 回调事件 {page=#/radio}

::: demo 提供 `change` 回调事件

``` html
<template>
    <div>
        <bk-radio-group v-model="demo4" @change="handlerChange">
            <bk-radio :value="'qq'">
                <i class="bk-icon mr5 icon-qq"></i>QQ
            </bk-radio>
            <bk-radio :value="'wx'">
                <i class="bk-icon mr5 icon-weixin"></i>微信
            </bk-radio>
            <bk-radio :value="'weibo'">
                <i class="bk-icon mr5 icon-sina"></i>微博
            </bk-radio>
        </bk-radio-group>
    </div>
</template>
<script>
    import { bkRadio, bkRadioGroup } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkRadio,
            bkRadioGroup
        },
        data () {
            return {
                demo4: 'wx'
            }
        },
        methods: {
            handlerChange (value) {
                alert(value)
            }
        }
    }
</script>
<style lang="postcss">
    .bk-form-radio {
        margin-right: 30px;
    }
</style>
```
:::

### radio-button {page=#/radio}

::: demo 单选的按钮样式

``` html
<template>
    <div>
        <bk-radio-group v-model="demo4" @change="handlerChange">
            <bk-radio-button value="QQ">
                QQ
            </bk-radio-button>
            <bk-radio-button value="微信">
                微信
            </bk-radio-button>
            <bk-radio-button value="企业微信">
                企业微信
            </bk-radio-button>
            <bk-radio-button value="微博" disabled>
                微博
            </bk-radio-button>
        </bk-radio-group>
    </div>
</template>
<script>
    import { bkRadioButton, bkRadioGroup } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkRadio,
            bkRadioButton
        },
        data () {
            return {
                demo4: 'wx'
            }
        },
        methods: {
            handlerChange (value) {
                alert(value)
            }
        }
    }
</script>
<style lang="postcss">
    .bk-form-radio {
        margin-right: 30px;
    }
</style>
```
:::

### bk-radio 属性 {page=#/radio}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| name | 名称 | String | —— | —— |
| value | radio的真值 | String / Number / Boolean | —— |
| disabled | 是否禁用 | Boolean | true / false  | false  |
| checked | 初始化选中状态，如果 `v-model` 绑定的值也会相应改变，这个属性在 `radio-group` 里无效 | Boolean | true / false  | undefined  |
| ext-cls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `.bk-form-radio` 上 | String | —— | —— |

### bk-radio 事件{page=#/radio}
| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| change | 当前单选框被选中时触发此回调函数 | 当前单选框的值 |

### bk-radio-group 属性 {page=#/radio}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| name | 名称 | String | —— | —— |

### bk-radio-group 事件 {page=#/radio}
| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| change | 单选组选中的值改变时触发此回调函数 | 当前单选组选中值 |
