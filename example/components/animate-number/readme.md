<script>
    import { bkAnimateNumber, bkButton } from '@'

    export default {
        components: {
            bkAnimateNumber,
            bkButton
        },
        data () {
            return {
                value: 20,
                digits: 2
            }
        },
        methods: {
            addValue () {
                this.value += 10
            }
        }
    }
</script>

[[toc]]

## AnimateNumber 动画数字

给数字加上动画效果

### 基础用法 {page=#/animate-number}

:::demo 需要传递 `value` 属性，来展示数字的大小

```html
<template>
    <bk-animate-number :value="value"></bk-animate-number>
</template>
<script>
    import { bkAnimateNumber } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkAnimateNumber
        },
        data () {
            return {
                value: 20
            }
        }
    }
</script>
```
:::

### 控制小数位数 {page=#/animate-number}

:::demo 可以传递 `digits` 属性，来控制数字的小数位

```html
<template>
    <bk-animate-number :value="value" :digits="digits"></bk-animate-number>
</template>
<script>
    import { bkAnimateNumber } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkAnimateNumber
        },
        data () {
            return {
                value: 20,
                digits: 2
            }
        }
    }
</script>
```

:::

### 触发动画效果 {page=#/animate-number}

:::demo 数字每次变化，都会触发动画效果

```html
<template>
    <bk-button @click="addValue" class="mr10">加10</bk-button>
    <bk-animate-number :value="value" :digits="digits"></bk-animate-number>
</template>
<script>
    import { bkAnimateNumber, bkButton } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkAnimateNumber,
            bkButton
        },
        data () {
            return {
                value: 20,
                digits: 2
            }
        },
        methods: {
            addValue () {
                this.value += 10
            }
        }
    }
</script>
```
:::

### 属性 {page=#/animate-number}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| value | 显示的数字 | Number | — | — |
| digits | 数字的位数 | Number | — | 0 |
| ext-cls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `span` 上 | String | —— | —— |
