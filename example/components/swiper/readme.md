<script>
    import { bkSwiper } from '@'
    import firstSwiper from '../../img/firstswiper.jpg'
    import secondSwiper from '../../img/secondswiper.jpg'
    export default {
        components: {
            bkSwiper
        },
        data () {
            return {
                pics: [
                    { url: firstSwiper, link: 'https://www.npmjs.com/package/bk-vue-cec' },
                    { url: secondSwiper },
                    { url: firstSwiper, link: 'https://www.npmjs.com/package/bk-vue-cec' },
                    { url: secondSwiper },
                    { url: firstSwiper, link: 'https://www.npmjs.com/package/bk-vue-cec' },
                    { url: secondSwiper },
                    { url: firstSwiper, link: 'https://www.npmjs.com/package/bk-vue-cec' },
                    { url: secondSwiper }
                ],
                // list: [firstSwiper, secondSwiper, firstSwiper, secondSwiper, firstSwiper, secondSwiper],
                list: ['text1', 'text2', 'text3', 'text4', 'text5', 'text6'],
                height: 300,
                width: 900,
                height1: 50,
                width1: 600
            }
        },
        methods: {
            showIndex (val) {
                console.log(`current index is ${val}`)
            }
        }
    }
</script>
<style lang="postcss">
    .swiper {
        width: 100%;
        height: 300px;
    }
    .swiper-img img {
        height: 100%;
        width: 100%;
    }
</style>

[[toc]]

## Swiper 轮播图

轮播图组件，用于展示图片

### 基础用法 {page=#/swiper}

:::demo 需要传入一个图片列表，轮播图的大小通过css来控制。通过属性`loop-time`控制轮播间隔时间

```html
<template>
    <bk-swiper :pics="pics" class="swiper" :loop-time="4000"></bk-swiper>
</template>
<script>
    import { bkSwiper } from '{{BASE_LIB_NAME}}'
    import firstSwiper from '../../img/firstswiper.jpg'
    import secondSwiper from '../../img/secondswiper.jpg'

    export default {
        components: {
            bkSwiper
        },
        data () {
            return {
                pics: [
                    { url: firstSwiper, link: 'https://www.npmjs.com/package/bk-vue-cec' },
                    { url: secondSwiper },
                    { url: firstSwiper, link: 'https://www.npmjs.com/package/bk-vue-cec' },
                    { url: secondSwiper },
                    { url: firstSwiper, link: 'https://www.npmjs.com/package/bk-vue-cec' },
                    { url: secondSwiper },
                    { url: firstSwiper, link: 'https://www.npmjs.com/package/bk-vue-cec' },
                    { url: secondSwiper }
                ]
            }
        }
    }
</script>
<style >
    .swiper {
        width: 100%;
        height: 300px;
    }
</style>
```
:::

### 参数控制 {page=#/swiper}

:::demo 通过`is-loop`控制是否开启轮播，当前图片索引改变的时候触发`index-change`事件，可以使用组件属性`currentIndex`获取当前页索引。

```html
<template>
    <bk-swiper :pics="pics" class="swiper" :is-loop="false" @index-change="showIndex" ref="swiper"></bk-swiper>
</template>
<script>
    import { bkSwiper } from '{{BASE_LIB_NAME}}'
    import firstSwiper from '../../img/firstswiper.jpg'
    import secondSwiper from '../../img/secondswiper.jpg'

    export default {
        components: {
            bkSwiper
        },
        data () {
            return {
                pics: [
                    { url: firstSwiper, link: 'https://www.npmjs.com/package/bk-vue-cec' },
                    { url: secondSwiper },
                    { url: firstSwiper, link: 'https://www.npmjs.com/package/bk-vue-cec' },
                    { url: secondSwiper },
                    { url: firstSwiper, link: 'https://www.npmjs.com/package/bk-vue-cec' },
                    { url: secondSwiper },
                    { url: firstSwiper, link: 'https://www.npmjs.com/package/bk-vue-cec' },
                    { url: secondSwiper }
                ]
            }
        },
        methods: {
            showIndex (val) {
                console.log(`current index is ${val}`)
            }
        }
    }
</script>
<style lang="postcss">
    .swiper {
        width: 100%;
        height: 300px;
    }
</style>
```
:::

### 控制轮播图高宽 {page=#/swiper}

:::demo 通过`width`和`height`控制轮播图的高宽，如果不传则以轮播图的CSS样式控制高宽。

```html
<template>
    <bk-swiper :pics="pics" :height="height" :width="width" :is-loop="false"></bk-swiper>
</template>
<script>
    import { bkSwiper } from '{{BASE_LIB_NAME}}'
    import firstSwiper from '../../img/firstswiper.jpg'
    import secondSwiper from '../../img/secondswiper.jpg'

    export default {
        components: {
            bkSwiper
        },
        data () {
            return {
                pics: [
                    { url: firstSwiper, link: 'https://www.npmjs.com/package/bk-vue-cec' },
                    { url: secondSwiper },
                    { url: firstSwiper, link: 'https://www.npmjs.com/package/bk-vue-cec' },
                    { url: secondSwiper },
                    { url: firstSwiper, link: 'https://www.npmjs.com/package/bk-vue-cec' },
                    { url: secondSwiper },
                    { url: firstSwiper, link: 'https://www.npmjs.com/package/bk-vue-cec' },
                    { url: secondSwiper }
                ],
                height: 300,
                width: 900
            }
        }
    }
</script>
```
:::

### 轮播内容通过slot自定义 {page=#/swiper}

:::demo 传递`list`属性指定数据列表，通过默认插槽来自定义轮播内容。

```html
<template>
    <bk-swiper :list="list" :height="height1" :width="width1" class="swiper-img">
        <template slot-scope="item">
            <div style="text-align: center;">{{item.data}}</div>
        </template>
    </bk-swiper>
</template>
<script>
    import { bkSwiper } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkSwiper
        },
        data () {
            return {
                list: ['text1', 'text2', 'text3', 'text4', 'text5', 'text6'],
                height1: 50,
                width1: 600
            }
        }
    }
</script>
<style>
    .swiper-img img {
        height: 100%;
        width: 100%;
    }
</style>
```
:::

### 属性 {page=#/swiper}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| pics | 图片列表 | Array | — | — |
| list | 数据列表，传了list以list为主 | Array | — | — |
| is-loop | 是否开启图片轮播 | Boolean | — | true |
| loop-time | 轮播间隔 | Number | — | 8000 |
| height | 轮播容器高度 | Number/String | —— | 容器CSS高度 |
| width | 轮播容器宽度 | Number/String | —— | 容器CSS宽度 |
| ext-cls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `.bk-swiper-home` 上 | String | —— | —— |

### 事件 {page=#/swiper}
| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| index-change | 图片索引改变时触发该事件 | 当前图片的索引 |

### 方法 {page=#/swiper}
| 方法名称 | 说明 | 传入参数 |
|------|------|------|
| changeIndex | 用于改变当前图片的索引 | 图片的索引 |

### 插槽 {page=#/swiper}
| name | 说明 |
|---|---|
| —— | 匿名插槽, 传递`data`数据给自定义内容 |
