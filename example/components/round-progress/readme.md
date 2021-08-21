<script>
    import { bkRoundProgress, bkButton } from '@'

    export default {
        components: {
            bkButton,
            bkRoundProgress
        },
        data () {
            return {
                title: '成功',
                percent: 0.7,
                percent1: 0.3,
                numShow: false,
                width: '100px',
                width1: '50px',
                width2: '150px',
                numStyle: {
                    fontSize: '12px',
                    color: '#333'
                },
                config: {
                    strokeWidth: 10,
                    bgColor: '#f0f1f5',
                    activeColor: '#6FC77E'
                },
                config1: {
                    strokeWidth: 10,
                    bgColor: '#f0f1f5',
                    activeColor: '#006DFF'
                },
                config2: {
                    strokeWidth: 10,
                    bgColor: '#f0f1f5',
                    activeColor: '#F95F5B'
                }
            }
        },
        methods: {
            changeRadius (event) {
                this.percent1 = Number(Math.random())
            }
        }
    }
</script>

[[toc]]

## RoundProgress 圆形进度

环形进度条

### 基础用法 {page=#/round-progress}

:::demo `percent` 是 0 到 1 之间的数值，`width` 设置圆环大小，`config` 配置线的粗细 `strokeWidth`，颜色显示，默认配置 `numShow` 为 `true`

```html
<template>
    <div class="round">
        <bk-round-progress :title="title" :width="width" :percent="percent" :config="config">
        </bk-round-progress>
    </div>
</template>
<script>
    import { bkRoundProgress } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkRoundProgress
        },
        data () {
            return {
                title: '成功',
                percent: 0.7,
                width: '100px',
                config: {
                    strokeWidth: 10,
                    bgColor: '#f0f1f5',
                    activeColor: '#6FC77E'
                }
            }
        }
    }
</script>
```
:::

### 不同颜色 {page=#/round-progress}

:::demo 默认配置 `config` 中 `activeColor` 的颜色值改变颜色，默认为 `green`

```html
<template>
    <div class="round">
        <bk-round-progress :width="width" :percent="percent" :config="config"></bk-round-progress>
        <bk-round-progress :width="width" :percent="percent" :config="config1"></bk-round-progress>
        <bk-round-progress :width="width" :percent="percent" :config="config2"></bk-round-progress>
    </div>
</template>
<script>
    import { bkRoundProgress } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkRoundProgress
        },
        data () {
            return {
                percent: 0.7,
                width: '100px',
                config: {
                    strokeWidth: 10,
                    bgColor: '#f0f1f5',
                    activeColor: '#6FC77E'
                },
                config1: {
                    strokeWidth: 10,
                    bgColor: '#f0f1f5',
                    activeColor: '#006DFF'
                },
                config2: {
                    strokeWidth: 10,
                    bgColor: '#f0f1f5',
                    activeColor: '#F95F5B'
                }
            }
        }
    }
</script>
```
:::

### 大小设置 {page=#/round-progress}

:::demo 默认配置 `width` 大小

```html
<template>
    <div class="round">
        <bk-round-progress :width="width1" :percent="percent" :num-style="numStyle" :config="config"></bk-round-progress>
        <bk-round-progress :width="width" :percent="percent" :config="config"></bk-round-progress>
        <bk-round-progress :width="width2" :percent="percent" :config="config"></bk-round-progress>
    </div>
</template>
<script>
    import { bkRoundProgress } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkRoundProgress
        },
        data () {
            return {
                percent: 0.7,
                width1: '50px',
                width: '100px',
                width2: '150px',
                numStyle: {
                    fontSize: '12px',
                    color: '#333'
                },
                config: {
                    strokeWidth: 10,
                    bgColor: '#f0f1f5',
                    activeColor: '#6FC77E'
                }
            }
        }
    }
</script>
```
:::

### 改变值 {page=#/round-progress}

:::demo 通过改变 `percent` 改变进度

```html
<template>
    <div class="round">
        <bk-round-progress :width="width" :percent="percent1" :config="config"></bk-round-progress>
    </div>
    <bk-button type="primary" @click="changeRadius">
        改变值
    </bk-button>
</template>
<script>
    import { bkRoundProgress } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkRoundProgress
        },
        data () {
            return {
                percent1: 0.3,
                width: '100px',
                config: {
                    strokeWidth: 10,
                    bgColor: '#f0f1f5',
                    activeColor: '#6FC77E'
                }
            }
        },
        methods: {
            changeRadius (event) {
                this.percent1 = Number(Math.random())
            }
        }
    }
</script>
```
:::

### 内容调整 {page=#/round-progress}

:::demo 默认配置 `width` 大小

```html
<template>
    <div class="round">
        <bk-round-progress :width="width" :percent="percent" :num-style="numStyle" :config="config"></bk-round-progress>
        <bk-round-progress :width="width" :percent="percent" :num-style="numStyle" :num-unit="'天'" :config="config"></bk-round-progress>
        <bk-round-progress :width="width" :percent="percent" :num-style="numStyle" :num-unit="''" :config="config"></bk-round-progress>
        <bk-round-progress :width="width" :percent="percent" :config="config" :num-style="numStyle" content="初步达成"></bk-round-progress>
    </div>
</template>
<script>
    import { bkRoundProgress } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkRoundProgress
        },
        data () {
            return {
                percent: 0.7,
                width1: '50px',
                width: '100px',
                width2: '150px',
                numStyle: {
                    fontSize: '12px',
                    color: '#333'
                },
                config: {
                    strokeWidth: 10,
                    bgColor: '#f0f1f5',
                    activeColor: '#6FC77E'
                }
            }
        }
    }
</script>
```
:::
### 属性 {page=#/round-progress}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| percent | 显示目前进度 | Number | `0 < percent < 1` | 0 |
| width | 圆环的直径 | String | —— | `100px` |
| num-unit | 值的单位 | String | —— | `%` |
| content | 设置的内容，当设置此属性时，进度条会直接显示此属性的内容，不会显示进度值 | String | —— | -- |
| num-show | 是否显示目前百分数值（默认显示） | Boolean | `true` / `false` | true |
| num-style | 设置显示百分数的样式 | Object | —— | `{fontSize: '16px'}`
| title | 是否显示标题（默认不显示） | String | —— | —— |
| title-style | 设置 title 的样式 | Object | —— | `{fontSize: '16px'}`
| config | 设置进度圆环的颜色 bgColor、宽度 strokeWidth、背景色 bgColor | Object | -- | `{strokeWidth: 5, bgColor: 'gray', activeColor: 'green'}` |
| ext-cls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `.bk-round-progress` 上 | String | —— | —— |
