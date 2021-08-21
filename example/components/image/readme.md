<script>
    import { bkImage } from '@'
    export default {
        components: {
            bkImage
        },
        data () {
            return {
                fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
                src: './example/static/images/preview/0.png',
                srcList: [
                    './example/static/images/preview/0.png',
                    './example/static/images/preview/1.png',
                    './example/static/images/preview/2.png',
                    './example/static/images/preview/3.png',
                    './example/static/images/preview/33.png',
                    './example/static/images/preview/4.png',
                    './example/static/images/preview/55.png',
                    './example/static/images/preview/5.png',
                    './example/static/images/preview/6.png',
                ],
                previewSrc: './example/static/images/preview/0.png',
            }
        }
    }
</script>
<style lang="postcss">
    .demo-image {
        .block {
            padding: 30px 0;
            text-align: center;
            border-right: solid 1px #eff2f6;
            display: inline-block;
            width: 20%;
            box-sizing: border-box;
            vertical-align: top;
            &:last-child {
                border-right: none;
            }
        }

        .demonstration {
            display: block;
            color: #8492a6;
            font-size: 14px;
            margin-bottom: 20px;
        }
    }
    .demo-image-lazy {
        height: 400px;
        overflow-y: auto;
        .bk-image {
            display: block;
            min-height: 200px;
            margin-bottom: 10px;
            &:last-child {
                margin-bottom: 0;
            }
        }
    }
    .placeholder-box {
        width: 100px;
        height: 100px;
    }
    .image-box {
        height: 71px;
    }
</style>

[[toc]]

## Image 图片

图片容器，在保留原生img的特性下，支持懒加载，自定义占位、加载失败等

### 基础用法 {page=#/image}

:::demo 直接使用图片组件

```html
<template>
    <bk-image fit="contain" :src="src" style="width: 200px;"></bk-image>
</template>
<script>
    import { bkImage } from '{{BASE_LIB_NAME}}'
    export default {
        data () {
            return {
                src: './example/static/images/preview/0.png'
            }
        }
    }
</script>
```
:::

### 图片适配容器 {page=#/image}

:::demo 可通过`fit`确定图片如何适应到容器框，同原生 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)。
```html
<template>
    <div class="demo-image">
        <div class="block" v-for="fit in fits" :key="fit">
            <span class="demonstration">{{ fit }}</span>
            <bk-image style="width: 100px; height: 100px" :src="src" :fit="fit"></bk-image>
        </div>
    </div>
</template>

<script>
    import { bkImage } from '{{BASE_LIB_NAME}}'
    export default {
        data () {
            return {
                fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
                src: './example/static/images/preview/0.png'
            }
        }
    }
</script>
<style lang="postcss">
    .demo-image {
        .block {
            padding: 30px 0;
            text-align: center;
            border-right: solid 1px #eff2f6;
            display: inline-block;
            width: 20%;
            box-sizing: border-box;
            vertical-align: top;
            &:last-child {
                border-right: none;
            }
        }

        .demonstration {
            display: block;
            color: #8492a6;
            font-size: 14px;
            margin-bottom: 20px;
        }
    }
</style>
```
:::

### 占位内容 {page=#/image}

:::demo 可通过`slot = placeholder`可自定义占位内容
```html
<template>
    <div class="demo-image">
        <div class="block">
            <span class="demonstration">默认</span>
            <bk-image :src="src" class="image-box"></bk-image>
        </div>
        <div class="block">
            <span class="demonstration">自定义</span>
            <bk-image :src="src" class="image-box">
                <div slot="placeholder" class="image-slot">
                    加载中<span class="dot">...</span>
                </div>
            </bk-image>
        </div>
    </div>
</template>

<script>
    import { bkImage } from '{{BASE_LIB_NAME}}'
    export default {
        data () {
            return {
                src: './example/static/images/preview/0.png'
            }
        }
    }
</script>
<style lang="postcss">
    .demo-image {
        .block {
            padding: 30px 0;
            text-align: center;
            border-right: solid 1px #eff2f6;
            display: inline-block;
            width: 20%;
            box-sizing: border-box;
            vertical-align: top;
            &:last-child {
                border-right: none;
            }
        }

        .demonstration {
            display: block;
            color: #8492a6;
            font-size: 14px;
            margin-bottom: 20px;
        }
    }
    .image-box {
        height: 71px;
    }
</style>
```
:::

### 加载失败 {page=#/image}

:::demo 可通过`slot = error`可自定义加载失败内容
```html
<template>
    <div class="demo-image">
        <div class="block">
            <span class="demonstration">默认</span>
            <bk-image class="placeholder-box"></bk-image>
        </div>
        <div class="block">
            <span class="demonstration">自定义</span>
            <bk-image class="placeholder-box">
                <div slot="error" class="image-slot">
                    <i class="bk-icon icon-image"></i>
                    <div class="mt5">加载失败</div>
                </div>
            </bk-image>
        </div>
        <div class="block">
            <span class="demonstration">加载失败容错地址</span>
            <bk-image
                fit="contain"
                :src="'./example/static/images/preview/09.png'"
                :fallback="'./example/static/images/preview/0.png'"
                class="placeholder-box">
            </bk-image>
        </div>

    </div>
</template>
<style lang="postcss">
    .demo-image {
        .block {
            padding: 30px 0;
            text-align: center;
            border-right: solid 1px #eff2f6;
            display: inline-block;
            width: 20%;
            box-sizing: border-box;
            vertical-align: top;
            &:last-child {
                border-right: none;
            }
        }

        .demonstration {
            display: block;
            color: #8492a6;
            font-size: 14px;
            margin-bottom: 20px;
        }
    }
    .placeholder-box {
        width: 100px;
        height: 100px;
    }
</style>
```
:::

### 大图预览 {page=#/image}

:::demo 可通过 `previewSrcList` 开启预览大图的功能。
```html
<template>
    <div>
        <bk-image style="width: 200px;" :src="previewSrc" :preview-src-list="srcList"></bk-image>
    </div>
</template>

<script>
    import { bkImage } from '{{BASE_LIB_NAME}}'
    export default {
        data () {
            return {
                previewSrc: './example/static/images/preview/0.png',
                srcList: [
                    './example/static/images/preview/0.png',
                    './example/static/images/preview/1.png',
                    './example/static/images/preview/2.png',
                    './example/static/images/preview/3.png',
                    './example/static/images/preview/33.png',
                    './example/static/images/preview/4.png',
                    './example/static/images/preview/55.png',
                    './example/static/images/preview/5.png',
                    './example/static/images/preview/6.png',
                ]
            }
        }
    }
</script>

```
:::

### 懒加载 {page=#/image}

:::demo 可通过`lazy`开启懒加载功能，当图片滚动到可视范围内才会加载。可通过`scroll-container`来设置滚动容器，若未定义，则为最近一个`overflow`值为`auto`或`scroll`的父元素。
```html
<template>
    <div class="demo-image-lazy">
        <bk-image v-for="url in srcList" :key="url" :src="url" lazy></bk-image>
    </div>
</template>

<script>
    import { bkImage } from '{{BASE_LIB_NAME}}'
    export default {
        data () {
            return {
                srcList: [
                    './example/static/images/preview/0.png',
                    './example/static/images/preview/1.png',
                    './example/static/images/preview/2.png',
                    './example/static/images/preview/3.png',
                    './example/static/images/preview/33.png',
                    './example/static/images/preview/4.png',
                    './example/static/images/preview/55.png',
                    './example/static/images/preview/5.png',
                    './example/static/images/preview/6.png',
                ]
            }
        }
    }
</script>
<style lang="postcss">
    .demo-image-lazy {
        height: 400px;
        overflow-y: auto;
        .bk-image {
            display: block;
            min-height: 200px;
            margin-bottom: 10px;
            &:last-child {
                margin-bottom: 0;
            }
        }
    }
</style>
```
:::

### image 属性 {page=#/image}
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| src | 图片源，同原生 | String | —— | —— |
| fit | 确定图片如何适应容器框，同原生 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) | String | fill / contain / cover / none / scale-down | - |
| alt | 原生 alt | String | —— | —— |
| referrer-policy | 原生 referrerPolicy | String | —— | —— |
| lazy | 是否开启懒加载 | Boolean | —— | false |
| scroll-container | 开启懒加载后，监听 scroll 事件的容器 | String / HTMLElement | — | 最近一个 overflow 值为 auto 或 scroll 的父元素 |
| fallback |加载失败容错地址,会被 Slots error 覆盖 | String | —— | —— |
| preview-src-list | 开启图片预览功能 | Array | —— | —— |
| z-index | 设置图片预览的 z-index | Number | —— | 2000 |
| isShowPreviewTitle |预览图片图片时，是否显示头部信息 | String | —— | —— |

### image 方法 {page=#/image}
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| load | 图片加载成功触发 | (e: Event) |
| error | 图片加载失败触发 | (e: Error) |

### Slots {page=#/image}
| 名称    | 说明         |
|---------|-------------|
| placeholder | 图片未加载的占位内容 |
| error | 图片加载失败的内容 |

### image-viewer 属性 {page=#/image}
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| urlList | 预览图片地址集合 | Array | —— | [] |
| isShowTitle | 预览图片地址集合 | Boolean | —— | false |
| onSwitch |切换图片 | Function | —— | —— |
| onClose | 关闭预览 | Function | —— | —— |
| initialIndex | z-index | Number | —— | 2000 |

### image-viewer 方法 {page=#/image}
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| hide | 点击关闭按钮 | —— |
| change | 当前预览图片的索引值 | index |
