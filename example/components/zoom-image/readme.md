<script>
    import { bkZoomImage } from '@'
    import image from '../../img/firstswiper.jpg'

    export default {
        components: {
            bkZoomImage
        },
        data () {
            return {
                image
            }
        }
    }
</script>
<style lang="postcss">
    .zoom-image {
        width: 100%;
        height: 300px;
    }
</style>

[[toc]]

## ZoomImage 缩放图组件

图片缩放组件，用于查看图片详情

### 用法 {page=#/zoom-image}

:::demo 需要传入图片地址`src`。可以把它当做`image`标签使用，通过CSS控制图片大小。然后这个图片就具备缩放以查看详情的能力（点击图片，图片会自适应全屏放大显示，还可以继续通过鼠标滚轮和拖拽进行图片缩放操作）

```html
<template>
    <bk-zoom-image :src="image" class="zoom-image"></bk-zoom-image>
</template>
<script>
    import { bkZoomImage } from '{{BASE_LIB_NAME}}'
    import image from '../../img/firstswiper.jpg'

    export default {
        components: {
            bkZoomImage
        },
        data () {
            return {
                image
            }
        }
    }
</script>
<style>
    .zoom-image {
        width: 100%;
        height: 300px;
    }
</style>
```
:::

### 属性 {page=#/zoom-image}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| src | 图片地址 | String | - | - |
| ext-cls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `.bk-zoom-image` 上 | String | - | - |
