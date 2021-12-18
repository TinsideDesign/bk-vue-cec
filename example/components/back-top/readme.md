<script>
    import { bkBackTop } from '@'

    export default {
        components: {
            bkBackTop
        }
    }
</script>
<style lang="postcss">
    .back-top-description {
        font-size: 14px;
    }
</style>

[[toc]]

## BackTop 返回顶部

点击按钮快速回到页面顶部，可以配置显示的位置和条件

### 基础用法 {page=#/back-top}

:::demo 当滑动页面高度超过200（默认值）时，右下角会显示回到顶部按钮，点击回到顶部
```html
<template>
    <span class="back-top-description">滑动页面至底部，可以看到右下角的返回顶部按钮</span>
    <bk-back-top></bk-back-top>
</template>
<script>
    import { bkBackTop } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
          bkBackTop
        }
    }
</script>
```
:::

### 可自定义显示内容 {page=#/back-top}

:::demo 默认插槽可自定义其内容，传入`bottom`和`right`以控制其位置
```html
<template>
    <span class="back-top-description">滑动页面至底部，可以看到右下角的返回顶部按钮</span>
    <bk-back-top :bottom="100" :right="40">
      <span>顶</span>
    </bk-back-top>
</template>
<script>
    import { bkBackTop } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
          bkBackTop
        }
    }
</script>
```
:::

### 属性 {page=#/back-top}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| right | 控制组件显示的位置，距离有页面右侧的距离 | Number | —— | 40 |
| bottom | 控制组件显示的位置，距离有页面底部的距离 | Number / String | —— | 40 |
| target | 	触发滚动的对象 | String | —— | —— |
| visibility-height | 滚动高度达到此参数值才出现 | Number | —— | 200 |

### 事件 {page=#/back-top}
| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| click | 点击按钮所触发的事件 | —— |