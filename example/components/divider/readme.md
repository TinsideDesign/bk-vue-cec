<script>
    import { bkDivider } from '@'

    export default {
        components: {
            bkDivider
        },
        data () {
            return {

            }
        },
        methods: {
        }
    }
</script>

[[toc]]

## Divider 分割线

区分内容 的 分割线

### 基础用法 {page=#/divider}

:::demo

```html
<template>
    <div>
        <div>第1段落</div>
        <bk-divider>分割线</bk-divider>
        <div>第2段落</div>
        <bk-divider align="left">分割线</bk-divider>
        <div>第3段落</div>
        <bk-divider align="right">分割线</bk-divider>
        <div>第4段落</div>
        <bk-divider type="dashed">分割线</bk-divider>
        <div>第5段落</div>
        <bk-divider direction="vertical">分割线</bk-divider>
    </div>
</template>
<script>
    import { bkDivider } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkDivider
        }
    }
</script>
```
:::



### 属性 {page=#/card}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| direction | 分割线方向 | String | horizontal , vertical | horizontal |
| align   | 分割线位置 | String | left , right , center | center |
| color   | 分割线颜色 | String | - | #dde4eb |
| width   | 分割线宽度 | Number | - | 0 |
| type   | 分割线类型，border-style类型 | String | solid, dashed | solid |
