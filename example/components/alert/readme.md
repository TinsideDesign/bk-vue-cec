<script>
    import { bkAlert, bkButton } from '@'

    export default {
        components: {
            bkAlert,
            bkButton
        },
        data () {
            return {}
        }
    }
</script>
<style>
    .demo-block.demo-alert .bk-alert{
        margin-bottom: 20px;
        &:last-child{
            margin-bottom: 0;
        }
    }
</style>

[[toc]]

## Alert 警告

页面上面的提示信息

### 基础用法 {page=#/alert}

:::demo 需要传递 `type` 属性指定使用那种风格

```html
<template>
    <div>
        <bk-alert type="success" title="成功的提示文字"></bk-alert>
        <bk-alert type="info" title="消息的提示文字"></bk-alert>
        <bk-alert type="warning" title="警告的提示文字"></bk-alert>
        <bk-alert type="error" title="错误的提示文字"></bk-alert>
    </div>
</template>
<script>
    import { bkAlert } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkAlert
        }
    }
</script>
<style>
    .demo-block.demo-alert .bk-alert{
        margin-bottom: 20px;
    }
</style>
```
:::

### 是否可关闭 {page=#/alert}
::: demo 设置`closable`属性
```html
<template>
    <div>
        <bk-alert type="info" title="消息的提示文字" closable></bk-alert>
    </div>
</template>
<script>
    import { bkAlert } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkAlert
        }
    }
</script>
<style>

</style>
```
:::

### 自定义关闭按钮 {page=#/alert}
::: demo 设置`close-text`属性
```html
<template>
    <div>
        <bk-alert type="success" title="成功的提示文字" closable close-text="继续努力"></bk-alert>
        <bk-alert type="info" title="消息的提示文字" closable close-text="下次见！"></bk-alert>
        <bk-alert type="warning" title="警告的提示文字" closable close-text="删掉"></bk-alert>
        <bk-alert type="error" title="错误的提示文字" closable></bk-alert>
    </div>
</template>
<script>
    import { bkAlert } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkAlert
        }
    }
</script>
<style>
    .demo-block.demo-alert .bk-alert{
        margin-bottom: 20px;
    }
</style>
```
:::

### 是否显示图标 {page=#/alert}
::: demo 设置`show-icon`属性
```html
<template>
    <div>
        <bk-alert type="success" title="成功的提示文字" :show-icon="false"></bk-alert>
        <bk-alert type="info" title="消息的提示文字" :show-icon="false"></bk-alert>
        <bk-alert type="warning" title="警告的提示文字" :show-icon="false"></bk-alert>
        <bk-alert type="error" title="错误的提示文字" :show-icon="false"></bk-alert>
    </div>
</template>
<script>
    import { bkAlert } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkAlert
        }
    }
</script>
<style>

</style>
```
:::
### 自定义slot {page=#/alert}
::: demo 使用slot
```html
<template>
    <div>
        <bk-alert type="success" :show-icon="false">
            <div slot="title">成功的提示文字</div>
        </bk-alert>
        <bk-alert type="info" :show-icon="false">
            <div slot="title">消息的提示文字</div>
        </bk-alert>
        <bk-alert type="warning" :show-icon="false">
            <div slot="title">警告的提示文字</div>
        </bk-alert>
        <bk-alert type="error" :show-icon="false">
            <bk-button slot="title" text>这是一个button</bk-button>
        </bk-alert>
    </div>
</template>
<script>
    import { bkAlert, bkButton } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkAlert,
            bkButton
        }
    }
</script>
<style>

</style>
```
:::


### 属性 {page=#/alert}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| type | 主题 | String | info/success/warning/error | info |
| title | 标题 | String | - | - |
| closable | 是否可以关闭 | Boolean | true/false | false |
| close-text | 自定义关闭按钮 | String | - | - |
| show-icon | 是否显示按钮 | Boolean | true/false | true |

### 事件 {page=#/alert}
| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| close | 关闭事件  | 事件对象 event |
