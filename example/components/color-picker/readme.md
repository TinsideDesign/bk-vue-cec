<script>
    import { bkColorPicker } from '@'

    export default {
        components: {
            bkColorPicker
        },
        data () {
            return {
                color1: '',
                color2: '#006DFF',
                color3: '#006DFF',
                recommendColors: ['#000', '#333', '#666', '#999', 'FFF']
            }
        },
        methods: {
            change (v) {
                console.log(v)
            }
        }
    }
</script>

<style>
    .color-container {
        display: flex;
        > div {
            margin-right: 16px;
        }
    }
</style>

[[toc]]

## ColorPicker 颜色选择器

用于颜色选择，支持多种颜色格式，支持颜色预设。

:::exampleLink [更多示例](#/color-picker/example)

### 基础用法 {page=#/color-picker}

::: demo 使用 `bk-color-picker` 标签配置颜色选择器组件
``` html
<template>
    <div class='color-container'>
        <bk-color-picker v-model="color1" @change="change"></bk-color-picker>
        <bk-color-picker v-model="color1" :show-value="false"></bk-color-picker>
    </div>
</template>

<script>
    import { bkColorPicker } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkColorPicker
        },
        data () {
            return {
                color1: ''
            }
        },
        methods: {
            change (v) {
                console.log(v)
            }
        }
    }
</script>
```
:::

### 不同尺寸 {page=#/color-picker}

::: demo 选择器有三种尺寸：大、默认（中）、小。
``` html
<template>
    <div class='color-container'>
        <bk-color-picker v-model="color2" size="large"></bk-color-picker>
        <bk-color-picker v-model="color2"></bk-color-picker>
        <bk-color-picker v-model="color2" size="small"></bk-color-picker>
    </div>
</template>

<script>
    import { bkColorPicker } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkColorPicker
        },
        data () {
            return {
                color2: '3A84FF'
            }
        }
    }
</script>
```
:::

### 颜色预设 {page=#/color-picker}

::: demo 当 recommend 属性为 true 时显示推荐的颜色预设，为 false 时关闭预设，也可传入数组自定义预设。
``` html
<template>
    <div class='color-container'>
        <bk-color-picker v-model="color3" :recommend="false"></bk-color-picker>
        <bk-color-picker v-model="color3" :recommend="recommendColors"></bk-color-picker>
    </div>
</template>

<script>
    import { bkColorPicker } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkColorPicker
        },
        data () {
            return {
                color3: '3A84FF',
                recommendColors: ['#000', '#333', '#666', '#999', 'FFF']
            }
        }
    }
</script>
```
:::

### 属性 {page=#/color-picker}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| value | 当前选择的RGB颜色值，支持 v-model | String | —— | #006DFF |
| size | 有三种尺寸：大、默认（中）、小。 | String | 'large', 'small' | '' |
| show-value | 是否显示当前选择的RGB颜色值 | Boolean | true, false | true |
| transfer | 控制颜色面板是否出现在 body 内 | Boolean | true, false | false |
| disabled | 是否禁用 | Boolean | true, false | false |
| readonly | 是否只读 | Boolean | true, false | false |
| recommend | 是否显示预设值 | Boolean/Array | —— | true |
| ext-cls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `.bk-color-picker` 上 | String | —— | —— |

### 事件 {page=#/color-picker}

| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| change | 当前选择的RGB颜色值变化时调用 | value |
