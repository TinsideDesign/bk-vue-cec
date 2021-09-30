<script>
    import { bkTimePicker } from '@'

    export default {
        components: {
            bkTimePicker
        },
        data () {
            return {
                initTime: '12:12:12',
                initTimeCustom1: '13:13:13',
                initTimeCustom2: new Date(),
                initTimeRange1: ['00:00:00', '23:59:59'],
                initTimeRange2: ['23:00:00', '10:00:00']
            }
        }
    }
</script>

[[toc]]

## TimePicker 时间选择器

:::exampleLink [更多示例](#/time-picker/example)

### 基础用法 {page=#/time-picker}

:::demo 通过 `v-model` 或者 `value` 设置初始值

```html
<template>
    <div>
        <bk-time-picker v-model="initTime" :placeholder="'选择时间'"></bk-time-picker>
    </div>
</template>
<script>
    import { bkTimePicker } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTimePicker
        },
        data () {
            return {
                initTime: '12:12:12'
            }
        }
    }
</script>
```
:::

### 开启时间范围 {page=#/time-picker}

:::demo 通过设置 `type` 属性为 `timerange` 来开启时间设置

```html
<template>
    <div>
        <bk-time-picker v-model="initTimeRange1" :placeholder="'选择时间范围'" :type="'timerange'"></bk-time-picker>
    </div>
</template>
<script>
    import { bkTimePicker } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTimePicker
        },
        data () {
            return {
                initTimeRange1: ['00:00:00', '23:59:59']
            }
        }
    }
</script>
```
:::

### 允许时间段进行跨天选择 {page=#/time-picker}

:::demo 通过设置 `allow-cross-day` 属性为 `true` 允许时间段进行跨天选择, 即起始时间大于终止时间, 此属性只在`type="timerange"`时生效

```html
<template>
    <div>
        <bk-time-picker
            v-model="initTimeRange2"
            :placeholder="'选择时间范围'"
            :type="'timerange'"
            :allow-cross-day="true">
        </bk-time-picker>
    </div>
</template>
<script>
    import { bkTimePicker } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTimePicker
        },
        data () {
            return {
                initTimeRange2: ['23:00:00', '10:00:00']
            }
        }
    }
</script>
```
:::

### 自定义格式化 {page=#/time-picker}

:::demo 通过设置 `format` 属性自定义格式化的值

```html
<template>
    <div>
        <bk-time-picker v-model="initTimeCustom1" :format="'HH时mm分ss秒'"></bk-time-picker>
    </div>
</template>
<script>
    import { bkTimePicker } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTimePicker
        },
        data () {
            return {
                initTimeCustom1: '13:13:13'
            }
        }
    }
</script>
```
:::

### 自定义格式化，不显示秒 {page=#/time-picker}

:::demo 在 `format` 属性中不设置秒即可隐藏秒

```html
<template>
    <div>
        <bk-time-picker v-model="initTimeCustom2" :format="'HH时mm分'"></bk-time-picker>
    </div>
</template>
<script>
    import { bkTimePicker } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTimePicker
        },
        data () {
            return {
                initTimeCustom2: new Date()
            }
        }
    }
</script>
```
:::

### 可编辑 {page=#/time-picker}

:::demo 通过设置 `editable` 属性为 `true` 设置可编辑

```html
<template>
    <div>
        <bk-time-picker v-model="initTime" :placeholder="'选择时间'" :editable="true"></bk-time-picker>
    </div>
</template>
<script>
    import { bkTimePicker } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTimePicker
        },
        data () {
            return {
                initTime: '12:12:12'
            }
        }
    }
</script>
```

:::

### 非回车模式 {page=#/time-picker}

:::demo 切换时分秒就会将值写入到文本框中

```html
<template>
    <div>
        <bk-time-picker :enter-mode="false" :placeholder="'请选择时间'"></bk-time-picker>
    </div>
</template>
<script>
    import { bkTimePicker } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTimePicker
        }
    }
</script>
```
:::

### 简约风格时间选择器 {page=#/time-picker}

:::demo 通过属性`behavior`配置简约风格

```html
<template>
    <div>
        <bk-time-picker behavior="simplicity" v-model="initTime" :placeholder="'选择时间'"></bk-time-picker>
    </div>
</template>
<script>
    import { bkTimePicker } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTimePicker
        },
        data () {
            return {
                initTime: '12:12:12'
            }
        }
    }
</script>
```
:::

### 属性 {page=#/time-picker}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| enter-mode | 是否开启回车模式 | Boolean | true / false | true |
| type | 类型 | String | time / timerange | time |
| allow-cross-day | 是否允许时间段进行跨天选择, 即起始时间大于终止时间, 此属性只在type为timerange时生效 | Boolean | true / false | false |
| value | 时间选择器组件的值，可以是 Date 或字符串或数组，只有在 timerange 类型时才支持数组 | Date / String / Array | -- | -- |
| editable | 设置文本框是否可编辑 | Boolean | true / false | true |
| format | 格式，不配置 ss 时即不显示秒 | String | —— | HH:mm:ss |
| steps | 面板的时间间隔，数组的三项分别对应小时、分钟、秒。例如设置为 [1, 15, 20] 时，面板中分钟的备选项为：00、15、30、45，秒的备选项为：00、20、40。 | Array | -- | [] |
| placement | 面板出现的位置  | String | top, top-start, top-end, bottom, bottom-start, bottom-end, left, left-start, left-end, right, right-start, right-end | bottom-start |
| placeholder | 占位文案  | String | -- | '' |
| open | 控制面板的显示与隐藏 | Boolean | true / false | false |
| disabled | 是否禁用 | Boolean | true / false | false |
| disabled-hours | 不可选小时数，数组中的小时数将为仅用状态| Array | -- | [] |
| disabled-minutes| 不可选分钟数，数组中的分钟数将为仅用状态 | Array | -- | [] |
| disabled-seconds| 不可选分秒数，数组中的秒数将为仅用状态 | Array | -- | [] |
| hide-disabled-options | 是否隐藏禁止选择的小时、分钟、秒 | Boolean | true / false | false |
| font-size | 设置组件主体内容字体大小 | String | `normal`（12px），`medium`（14px），`large`（16px） | normal |
| ext-cls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `.bk-date-picker` 上 | String | —— | —— |
| behavior | 风格设置(simplicity:简约 normal:正常) | String | 'normal'/'simplicity' | normal |

### 事件 {page=#/time-picker}
| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| change | 时间改变事件，参数为当前选择的时间 | time |
| open-change | 面板弹出或收起事件，参数为面板展开收起的状态 | state |
