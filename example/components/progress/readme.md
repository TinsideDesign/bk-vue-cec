<script>
    import { bkProgress, bkButton } from '@'
    export default {
        components: {
            bkButton,
            bkProgress
        },
        data () {
            return {
                percent: 0.3
            }
        },
        methods: {
            changeRadius (event) {
                this.percent = Number(Math.random())
            }
        }
    }
</script>

[[toc]]

## Progress 进度条

进度条

### 基础用法 {page=#/progress}

:::demo `percent` 是 0 到 1 之间的数值，提供 5 种主题，由 `theme` 属性来定义，可选的主题有 `primary`, `warning`, `success`, `danger`，默认为 primary, 由 `color` 属性来自定义颜色值。

```html
<template>
    <div class="progress">
        <div class="mb10">
            <bk-progress :percent="0"></bk-progress>
        </div>
        <div class="mb10">
            <bk-progress :percent="0.28"></bk-progress>
        </div>
        <div class="mb10">
            <bk-progress :theme="'warning'" :percent="0.46"></bk-progress>
        </div>
        <div class="mb10">
            <bk-progress :theme="'danger'" :percent="0.73"></bk-progress>
        </div>
        <div class="mb10">
            <bk-progress :theme="'success'" :percent="0.9"></bk-progress>
        </div>
    </div>
</template>
<script>
    import { bkProgress } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkProgress
        }
    }
</script>
```
:::

### 大小设置 {page=#/progress}

:::demo 可以使用 `size` 属性来配置进度条的尺寸，可接受 `small` `large`，也可配置`strokeWidth`线宽

```html
<template>
    <div class="progress">
        <div>
            <div class="mb10">
                <bk-progress :size="'small'" :percent="0"></bk-progress>
            </div>
            <div class="mb10">
                <bk-progress :size="'small'" :percent="0.28"></bk-progress>
            </div>
            <div class="mb10">
                <bk-progress :size="'small'" :theme="'warning'" :percent="0.46"></bk-progress>
            </div>
            <div class="mb10">
                <bk-progress :size="'small'" :theme="'danger'" :percent="0.73"></bk-progress>
            </div>
            <div class="mb10">
                <bk-progress :size="'small'" :theme="'success'" :percent="0.9"></bk-progress>
            </div>
        </div>
        <div>
            <div class="mb10">
                <bk-progress :size="'large'" :percent="0"></bk-progress>
            </div>
            <div class="mb10">
                <bk-progress :size="'large'" :percent="0.28"></bk-progress>
            </div>
            <div class="mb10">
                <bk-progress :size="'large'" :theme="'warning'" :percent="0.46"></bk-progress>
            </div>
            <div class="mb10">
                <bk-progress :size="'large'" :theme="'danger'" :percent="0.73"></bk-progress>
            </div>
            <div class="mb10">
                <bk-progress :size="'large'" :theme="'success'" :percent="0.9"></bk-progress>
            </div>
        </div>
    </div>
</template>
<script>
    import { bkProgress } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkProgress
        }
    }
</script>
```
:::

### 百分比内显 {page=#/progress}

:::demo Progress 组件可通过 `text-inside` 属性来将进度条描述置于进度条内部, `titleStyle` 属性来调整百分数显示的样式

```html
<template>
    <div class="progress">
        <div>
            <bk-progress :text-inside="true" :stroke-width='18' :percent="0.46"></bk-progress>
        </div>
    </div>
</template>
<script>
    import { bkProgress } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkProgress
        }
    }
</script>
```
:::

### 改变值 {page=#/progress}

:::demo 通过改变 `percent` 改变进度

```html
<template>
    <div class="round">
       <bk-progress :percent="percent"></bk-progress>
    </div>
    <bk-button type="primary" @click="changeRadius">
        改变值
    </bk-button>
</template>
<script>
    import { bkProgress, bkButton } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton,
            bkProgress
        },
        data () {
            return {
                percent: 0.3
            }
        },
        methods: {
            changeRadius (event) {
                this.percent = Number(Math.random())
            }
        }
    }
</script>
```
:::


### 属性 {page=#/progress}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| theme | 显示类型 | String | `primary` / `warning` / `success` / `danger` | `primary` |
| percent | 进度百分比 | Number | 0 < `percent` < 1 | —— |
| size | 尺寸 | String | `small` / `normal` / `large` |`normal`|
| stroke-width | 进度条的宽度，单位 px | Number | —— | —— |
| text-inside | 进度条显示文字内置在进度条内 | Boolean | `true` `false` | false |
| color | 进度条背景色 | String | —— | —— |
| show-text | 是否显示进度条文字内容 | Boolean | `true` / `false` | true |
| title-style | 设置 title 的样式 | Object | —— | `{ fontSize: '16px', verticalAlign: 'middle' }` |
| ext-cls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `.bk-progress` 上 | String | —— | —— |
| fixed | 精确到小数点位数 | Number | 0 <= `fixed` <= 20 | 0 |
