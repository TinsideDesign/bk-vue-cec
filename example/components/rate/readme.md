<script>
    import { bkRate } from '@'

    export default {
        components: {
            bkRate
        },
        data () {
            return {
                showRate: 3.3,
                rate: 5,
                tooltips: [1, 2, 3, 4, 5]
            }
        },
        methods: {
            chooseRate (val) {
                console.log(val)
            }
        }
    }
</script>

[[toc]]

## Rate 评分

评分组件，支持展示分数和评分

### 展示分数 {page=#/rate}

:::demo 如果是展示，需要设置`edit`为false，再传递 `rate` 属性，来展示评分的数字，配置 `tooltips` 属性，来展示文案

```html
<template>
    <bk-rate :rate="showRate" :edit="false"></bk-rate>
</template>
<script>
    import { bkRate } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkRate
        },
        data () {
            return {
                showRate: 3.3
            }
        }
    }
</script>
```
:::

### 评分 {page=#/rate}

:::demo 如果是评分，需要设置`edit`为true，默认为true；传递 `rate` 属性，来展示评分的数字；事件chooseRate会在打分的时候触发，参数为选中的值

```html
<template>
    <bk-rate :rate.sync="rate" :edit="true" @score="chooseRate" :tooltips="tooltips"></bk-rate>
</template>
<script>
    import { bkRate } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkRate
        },
        data () {
            return {
                rate: 5,
                tooltips: [1, 2, 3, 4, 5]
            }
        },
        methods: {
            chooseRate (val) {
                console.log(val)
            }
        }
    }
</script>
```
:::

### 控制组件的大小 {page=#/rate}

:::demo 可以通过传递`width`和`height`来控制组件的大小

```html
<template>
    <bk-rate :rate="showRate" :edit="false" :width="18" :height="18"></bk-rate>
</template>
<script>
    import { bkRate } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkRate
        },
        data () {
            return {
                showRate: 3.3
            }
        }
    }
</script>
```
:::

### 属性 {page=#/rate}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| rate | 显示的分数 | Number | — | 0 |
| tooltips | 展示的文案，数组中的每一项对应每一颗星星的文案 | Array | — | — |
| edit | 是否可编辑 | Boolean | — | true |
| width | 星星的宽度 | Number | — | 15 |
| height | 星星的高度 | Number | — | 16 |
| ext-cls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `.bk-score-group` 上 | String | — | — |

### 事件{page=#/rate}
| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| score | 评分的时候触发该回调事件 | 选中的值 |
