<script>
    import { bkSlider } from '@'

    export default {
        components: {
            bkSlider
        },
        data () {
            return {
                value: 0,
                valueDisable: 25,
                value1: [5, 20],
                customContent: {
                    0: {
                        label: '糟糕'
                    },
                    20: {
                        label: '一般'
                    },
                    40: {
                        label: '还行',
                        tip: '还行勉勉强强'
                    },
                    60: {
                        label: '满意'
                    },
                    80: {
                        label: '很好'
                    },
                    100: {
                        label: '非常满意'
                    }
                }
            }
        }
    }
</script>
<style>
    .demo {
        margin: 30px 10px;
    }
    .demo1 {
        margin: 30px 50px;
    }
    .demo2 .bk-slider-label:last-child {
        color: #EA3636
    }
    .slot {
        margin: 30px 30px;
    }
</style>

[[toc]]

## Slider 滑动选择器

用于操作反馈的中间态(loading)、成功、失败等

### 基础用法 {page=#/slider}

:::demo 使用 `v-model` 将变量与 slider 滑杆进行数据绑定，默认最大值 `max-value` 为 100, 默认最小值为 `min-value` 0

```html
<template>
    <div>
        <bk-slider v-model="value"></bk-slider>
    </div>
</template>
<script>
    import { bkSlider } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkSlider
        },
        data() {
            return {
                value: 20
            }
        }
    }
</script>
```
:::

### 禁用设置 {page=#/slider}

:::demo 可以使用 `disable` 属性默认 `false`

```html
<template>
    <div>
        <bk-slider v-model="valueDisable" :disable="true"></bk-slider>
    </div>
</template>
<script>
    import { bkSlider } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkSlider
        },
        data() {
            return {
                valueDisable: 20
            }
        }
    }
</script>
```
:::

### 分段式 {page=#/slider}

:::demo 可以使用 `range` 属性默认 `false`

```html
<template>
    <div>
        <bk-slider v-model="value1" :range="true"></bk-slider>
    </div>
</template>
<script>
    import { bkSlider } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkSlider
        },
        data() {
            return {
                value1: [5, 20]
            }
        }
    }
</script>
```
:::

### 首尾标签 {page=#/slider}

:::demo 可以使用 `show-between-label` 属性默认 `false`

```html
<template>
    <div>
        <bk-slider v-model="value" :show-between-label="true" ext-cls="demo"><bk-slider>
    </div>
</template>
<script>
    import { bkSlider } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkSlider
        },
        data() {
            return {
                value: 0
            }
        }
    }
</script>
<style>
    .demo {
        margin: 30px 10px;
    }
</style>
```
:::

### 刻度 {page=#/slider}

:::demo 可以使用 `show-interval` 属性默认 `false`

```html
<template>
    <div>
        <bk-slider v-model="value" :step="5" :show-interval="true" :show-button-label="true" ext-cls="demo" :show-tip="false"><bk-slider>
    </div>
</template>
<script>
    import { bkSlider } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkSlider
        },
        data() {
            return {
                value: 0
            }
        }
    }
</script>
<style>
    .demo {
        margin: 30px 10px;
    }
</style>
```
:::

:::demo 可以使用 `show-interval` 属性默认 `false`,可以使用 `show-interval-label` 属性默认 `false`

```html
<template>
    <div>
        <bk-slider v-model="value" :step="10" :show-interval="true" :show-interval-label="true" ext-cls="demo"><bk-slider>
    </div>
</template>
<script>
    import { bkSlider } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkSlider
        },
        data() {
            return {
                value: 0
            }
        }
    }
</script>
<style>
    .demo {
        margin: 30px 10px;
    }
</style>
```
:::
:::demo `interval-label-unit` 可设置单位

```html
<template>
    <div>
        <bk-slider v-model="value" :step="10" :show-interval="true" :show-interval-label="true" ext-cls="demo" :interval-label-unit="'%'"><bk-slider>
    </div>
</template>
<script>
    import { bkSlider } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkSlider
        },
        data() {
            return {
                value: 0
            }
        }
    }
</script>
<style>
    .demo {
        margin: 30px 10px;
    }
</style>
```
:::

### 带输入的选择 {page=#/slider}

:::demo 可以使用 `show-input` 属性默认 `false`

```html
<template>
    <div>
        <bk-slider v-model="value" :show-input="true"></bk-slider>
    </div>
</template>
<script>
    import { bkSlider } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkSlider
        },
        data() {
            return {
                value: 0
            }
        }
    }
</script>
```
:::
:::demo

```html
<template>
    <div>
        <bk-slider v-model="value1" :show-input="true" :range="true"></bk-slider>
    </div>
</template>
<script>
    import { bkSlider } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkSlider
        },
        data() {
            return {
                value1: [5, 20]
            }
        }
    }
</script>
```
:::

### 自定义 {page=#/slider}

:::demo 可以使用 `show-custom-label` `custom-content` `show-custom-tip` 属性进行自定义

```html
<template>
    <div>
        <bk-slider v-model="value" :show-custom-label="true" :custom-content="customContent" ext-cls="demo1" :step="20" :show-custom-tip="true"></bk-slider>
    </div>
</template>
<script>
    import { bkSlider } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkSlider
        },
        data() {
            return {
                value: 0,
                customContent: {
                    0: {
                        label: '糟糕'
                    },
                    20: {
                        label: '一般'
                    },
                    40: {
                        label: '还行',
                        tip: '还行勉勉强强'
                    },
                    60: {
                        label: '满意'
                    },
                    80: {
                        label: '很好'
                    },
                    100: {
                        label: '非常满意'
                    }
                }
            }
        }
    }
</script>
<style>
    .demo1 {
        margin: 30px 50px;
    }
</style>
```
:::

### 垂直滑块 {page=#/slider}

:::demo 可以使用 `vertical` 属性默认 `false`

```html
<template>
    <div>
        <bk-slider v-model="value" :vertical="true" height="200px"></bk-slider>
    </div>
</template>
<script>
    import { bkSlider } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkSlider
        },
        data() {
            return {
                value: 0
            }
        }
    }
</script>
```
:::

:::demo

```html
<template>
    <div>
        <bk-slider v-model="value" :vertical="true" height="400px" :step="20" interval-label-unit="℃" :show-interval-label="true" :show-interval="true"
        ext-cls="demo2"></bk-slider>
    </div>
</template>
<script>
    import { bkSlider } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkSlider
        },
        data() {
            return {
                value: 0
            }
        }
    }
</script>
<style>
.demo2 .bk-slider-label:last-child {
    color: #EA3636
}
</style>
```
:::

### 插槽 {page=#/slider}

:::demo

```html
<template>
    <div>
        <bk-slider v-model="value" :show-custom-label="true" :custom-content="customContent" ext-cls="demo1" :step="20" :show-custom-tip="true">
            <template slot="start">
                <div class="slot"><i class="bk-icon icon-dispirited-shape" style="font-size: 50px;"></i></div>
            </template>
            <template slot="end">
                <div class="slot"><i class="bk-icon icon-smile-shape" style="font-size: 50px;"></i></div>
            </template>
        </bk-slider>
    </div>
</template>
<script>
    import { bkSlider } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkSlider
        },
        data() {
            return {
                value: 0,
                customContent: {
                    0: {
                        label: '糟糕'
                    },
                    20: {
                        label: '一般'
                    },
                    40: {
                        label: '还行',
                        tip: '还行勉勉强强'
                    },
                    60: {
                        label: '满意'
                    },
                    80: {
                        label: '很好'
                    },
                    100: {
                        label: '非常满意'
                    }
                }
            }
        }
    }
</script>
<style>
.slot {
    margin: 30px 30px;
}
</style>
```
:::

### 属性 {page=#/slider}
| 参数      | 说明       | 类型          | 可选值           | 默认值 |
| --------- | ---------- | ------------- | ---------------- | ------ |
| disable   | 拖拽禁用   | Boolean       | `true` / `false` | false  |
| range   | 是否为范围选择   | Boolean       | `true` / `false` | false  |
| value     | 使用v-model，将指定变量与slider的值进行绑定| Number/Array | ——               | 0      |
| min-value | 最小值设置 | Number        | ——               | 0      |
| max-value | 最大值设置 | Number        | ——               | 100    |
| show-tip  | 显示提示   | Boolean       | `true` / `false` | true   |
| ext-cls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `.bk-slider` 上 | String | —— | —— |
| step | 滑块每一步移动的距离 | Number | —— | 1 |
| show-interval | 是否显示间断点 | Boolean | `true` / `false` | false |
| show-interval-label | 是否显示间断点下的标签 | Boolean | `true` / `false` | false |
| interval-label-unit | 标签单位 | String | —— | —— |
| show-button-label | 滑块下是否显示value值 | Boolean | `true` / `false` | false |
| button-label-unit | 滑块下是否显示单位 | String | —— | —— |
| show-between-label | 首尾标签 | Boolean | `true` / `false` | false |
| show-input | 带输入的选择 | Boolean | `true` / `false` | false |
| custom-content | 自定义内容 | Object | —— | —— |
| show-custom-label | 是否显示自定义标签 | Boolean | `true` / `false` | false |
| show-custom-tip | 是否显示自定义tip | Boolean | `true` / `false` | false |
| vertical | 是否为垂直模式 | Boolean | `true` / `false` | false |
| height | 垂直模式高度 | String | —— | `200px` |

### 事件 {page=#/slider}
| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| change | 鼠标弹起时触发 | value |
