<script>
    import { bkSwitcher, bkButton } from '@'

    export default {
        components: {
            bkSwitcher,
            bkButton
        },
        data () {
            return {
                isSelected: true,
                isDisabled: true,
                isOutline: true,
                isSquare: true,
                showText: true,
                demo1: true,
                loadingDemo: true,
                value1: true,
                value2: false,
                isLoading: false
            }
        },
        methods: {
            changeStatus () {
                this.demo1 = !this.demo1
            },
            change (val) {
                alert(val)
            },
            requestHandler (lastValue) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        console.log(lastValue)
                        resolve()
                    }, 3000)
                })
            },
            handleChange (val) {
                this.isLoading = true
                // 模拟异步处理
                setTimeout(() => {
                    this.isLoading = false
                    this.loadingDemo = val
                }, 3000)
            }
        }
    }
</script>
<style lang="postcss">
    .demo-box .bk-switcher {
        margin-right: 20px;
    }
</style>

[[toc]]

## Switcher 开关

在两种状态之间的切换

:::exampleLink [更多示例](#/switcher/example)

### 基础用法 {page=#/switcher}

:::demo 可以通过 `value / v-model` 属性来定义开关状态，

```html
<template>
    <div>
        <bk-switcher v-model="demo1"></bk-switcher>
        <bk-switcher v-model="demo1" show-text></bk-switcher>
    </div>
</template>
<script>
    import { bkSwitcher } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkSwitcher,
            isLoading: false
        },
        data () {
            return {
                demo1: true
            }
        },
        methods: {
            changeStatus () {
                this.demo1 = !this.demo1
            }
        }
    }
</script>
<style lang="postcss">
    .demo-box .bk-switcher {
        margin-right: 20px;
    }
</style>
```
:::

### 尺寸 {page=#/switcher}

:::demo 可以通过 `size` 属性来定义开关的尺寸，需要更大或更小尺寸时使用 `large`、`small` 值配置，不配置即为默认尺寸。当设置 `show-text` 时将显示为特定尺寸同时 `size` 将失效。

```html
<template>
    <div>
        <bk-switcher v-model="demo1" size="large"></bk-switcher>
        <bk-switcher v-model="demo1"></bk-switcher>
        <bk-switcher v-model="demo1" size="small"></bk-switcher>
        <!-- 配置 show-text 时 size 失效 -->
        <bk-switcher v-model="demo1" size="small" show-text></bk-switcher>
    </div>
</template>
<script>
    import { bkSwitcher } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkSwitcher
        },
        data () {
            return {
                demo1: true
            }
        }
    }
</script>
<style lang="postcss">
    .demo-box .bk-switcher {
        margin-right: 20px;
    }
</style>
```
:::

### 主题 {page=#/switcher}

:::demo 可以通过 `theme` 属性来定义开关的主题

```html
<template>
    <div>
        <bk-switcher v-model="demo1" theme="success"></bk-switcher>
        <bk-switcher v-model="demo1" theme="primary"></bk-switcher>
    </div>
</template>
<script>
    import { bkSwitcher } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkSwitcher
        },
        data () {
            return {
                demo1: true
            }
        }
    }
</script>
<style lang="postcss">
    .demo-box .bk-switcher {
        margin-right: 20px;
    }
</style>
```
:::

### 禁用状态 {page=#/switcher}

不可用状态

:::demo 可以使用 `disabled` 属性来定义开关是否禁用，它接受一个 `Boolean` 值

```html
<template>
    <div class="mb20">
        <span class="mr5 f14">选中时禁用</span>
        <bk-switcher v-model="value1" :disabled="true"></bk-switcher>
        <bk-switcher v-model="value1" theme="primary" :disabled="true"></bk-switcher>
    </div>
    <div class="mb20">
        <span class="mr5 f14">未选中时禁用</span>
        <bk-switcher v-model="value2" :disabled="true"></bk-switcher>
    </div>
</template>
<script>
    import { bkSwitcher } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkSwitcher
        },
        data () {
            return {
                value1: true,
                value2: false
            }
        }
    }
</script>
<style lang="postcss">
    .demo-box .bk-switcher {
        margin-right: 20px;
    }
</style>
```
:::

### 前置状态检测 {page=#/switcher}

:::demo 可以通过 `pre-check` 接收一个函数来做前置状态检测，返回 `false`状态切换失败；返回`true`状态切换成功；返回一个`promise`，`resolve`状态切换成功，`reject`状态切换失败

```html
<template>
    <div>
        <bk-switcher v-model="loadingDemo" :pre-check="requestHandler"></bk-switcher>
    </div>
</template>
<script>
    import { bkSwitcher } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkSwitcher
        },
        data () {
            return {
                loadingDemo: true
            }
        },
        methods: {
            requestHandler (lastValue) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        console.log(lastValue)
                        resolve()
                    }, 3000)
                })
            }
        }
    }
</script>
<style lang="postcss">
    .demo-box .bk-switcher {
        margin-right: 20px;
    }
</style>
```
:::


### 属性 {page=#/switcher}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| value | 是否打开 | Boolean | —— | false |
| disabled | 是否禁用 | Boolean | —— | false |
| show-text | 是否显示文本 | Boolean | —— | false |
| on-text | 打开状态显示的文本 | String | 建议 1 到 3 个字符，过长显示不全 | ON |
| off-text | 关闭状态显示文本 | String | 建议 1 到 3 个字符，过长显示不全 | OFF |
| size | 尺寸，显示文本时此属性无效 | String | `large` `small` | '' |
| theme | 主题 | String | `primary` `success` | success |
| is-outline | 是否为描边效果 | Boolean | —— | false |
| is-square | 是否为方形效果 | Boolean | —— | false |
| true-value | switcher的真值 | Boolean | —— | true |
| false-value | switcher的假值 | Boolean | —— | false |
| pre-check | 状态切换的前置检测接收操作后的状态（lastValue），返回true，false，Promise | Function | —— | -- |

### 事件 {page=#/switcher}
| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| change | 状态发生变化时回调函数 | 新状态值（Boolean）|
