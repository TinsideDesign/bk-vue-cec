<script>
    import { bkSteps, bkContainer, bkCol, bkRow } from '@'

    export default {
        components: {
            bkSteps,
            bkContainer,
            bkCol,
            bkRow
        },
        data () {
            return {
                iconSteps: ['edit2', 'image', 'check-1'],
                stepDesc: [
                    { title: '步骤一', icon: 1, description: '这里是描述文本' },
                    { title: '步骤二', icon: 2, description: '这里是描述文本' },
                    { title: '步骤三', icon: 3, description: '这里是描述文本' }
                ],
                iconCurStep: 2,
                objectSteps: [
                    { title: '订单详情', icon: 'order' },
                    { title: '收件人信息', icon: 'user' },
                    { title: '支付', icon: 'id' },
                    { title: '完成', icon: 'check-1' }
                ],
                controllableSteps: {
                    controllable: true,
                    steps: [
                        { title: '基本信息', icon: 1 },
                        { title: '详细信息', icon: 2 },
                        { title: '实名认证', icon: 3 }
                    ],
                    curStep: 1
                },
                customStatusSteps: {
                    controllable: true,
                    steps: [
                        { title: '基本信息', icon: 1, status: 'done' },
                        { title: '详细信息', icon: 2, status: 'done' },
                        { title: '实名认证', icon: 3, status: 'error' }
                    ],
                    curStep: 1
                }
            }
        },
        methods: {
            stepChanged (index) {
                alert(`当前步骤index：${index}`)
            },
            changeStepStatus (index) {
                this.customStatusSteps.steps.forEach(step => step.status = 'done')
                this.customStatusSteps.steps[index - 1].status = 'loading'
            }
        }
    }
</script>

<style lang="postcss">
    .custom-icon {
        .icon-image, .icon-order, .icon-user, .icon-id {
            font-size: 14px;
        }
        .icon-user {
            left: 0.5px;
        }
        &.bk-steps-vertical {
            .icon-user {
                left: 0.2px;
            }
        }
    }
</style>

[[toc]]

## Steps 步骤

引导用户按步骤完成流程的组件

### 基础用法 {page=#/steps}

:::demo 使用默认配置的组件

```html
<template>
    <bk-steps ext-cls="custom-icon"></bk-steps>
</template>
<script>
    import { bkSteps } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkSteps
        }
    }
</script>
<style lang="postcss">
    .custom-icon {
        .icon-image, .icon-order, .icon-user, .icon-id {
            font-size: 14px;
        }
    }
</style>
```
:::

### 添加描述文本 {page=#/steps}

:::demo 在 `steps` 数据中使用 `description` 字段添加描述文本

```html
<template>
    <bk-steps ext-cls="custom-icon" :steps="stepDesc" :cur-step="2"></bk-steps>
</template>
<script>
    import { bkSteps } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkSteps
        },
        data () {
            return {
                stepDesc: [
                    { title: '步骤一', icon: 1, description: '这里是描述文本' },
                    { title: '步骤二', icon: 2, description: '这里是描述文本' },
                    { title: '步骤三', icon: 3, description: '这里是描述文本' }
                ]
            }
        }
    }
</script>
<style lang="postcss">
    .custom-icon {
        .icon-image, .icon-order, .icon-user, .icon-id {
            font-size: 14px;
        }
    }
</style>
```
:::

### 实线 {page=#/steps}

:::demo 指定 `line-type` 值为 `solid` 显示为实线

```html
<template>
    <bk-steps ext-cls="custom-icon" line-type="solid" :cur-step="2"></bk-steps>
</template>
<script>
    import { bkSteps } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkSteps
        }
    }
</script>
<style lang="postcss">
    .custom-icon {
        .icon-image, .icon-order, .icon-user, .icon-id {
            font-size: 14px;
        }
    }
</style>
```
:::

### 自定义步骤内容 {page=#/steps}

:::demo 配置 `steps` 参数，具体内容参考下方属性表格

```html
<template>
    <bk-steps ext-cls="custom-icon" class="mb40" :steps="iconSteps" :cur-step.sync="iconCurStep"></bk-steps>
    <bk-steps ext-cls="custom-icon" theme="success" :steps="objectSteps" :cur-step.sync="iconCurStep"></bk-steps>
</template>

<script>
    import { bkSteps } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkSteps
        },
        data () {
            return {
                iconSteps: ['edit2', 'image', 'check-1'],
                iconCurStep: 2,
                objectSteps: [
                    { title: '订单详情', icon: 'order' },
                    { title: '收件人信息', icon: 'user' },
                    { title: '支付', icon: 'id' },
                    { title: '完成', icon: 'check-1' }
                ]
            }
        }
    }
</script>
<style lang="postcss">
    .custom-icon {
        .icon-image, .icon-order, .icon-user, .icon-id {
            font-size: 14px;
        }
    }
</style>
```
:::

### 垂直方向 {page=#/steps}

:::demo 配置 `direction` 参数，`vertical` 为垂直方向，默认为 `horizontal`

```html
<template>
    <bk-container :col="12">
        <bk-row>
            <bk-col :span="4">
                <div style="height: 200px;">
                    <bk-steps ext-cls="custom-icon" direction="vertical"></bk-steps>
                </div>
            </bk-col>
            <bk-col :span="4">
                <div style="height: 300px;">
                    <bk-steps ext-cls="custom-icon" direction="vertical" :steps="iconSteps" :cur-step.sync="iconCurStep"></bk-steps>
                </div>
            </bk-col>
            <bk-col :span="4">
                <div style="height: 400px;">
                    <bk-steps ext-cls="custom-icon" theme="success" direction="vertical" :cur-step.sync="iconCurStep" :steps="objectSteps"></bk-steps>
                </div>
            </bk-col>
        </bk-row>
    </bk-container>
</template>

<script>
    import { bkSteps, bkContainer, bkCol, bkRow } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkSteps,
            bkContainer,
            bkCol,
            bkRow
        },
        data () {
            return {
                iconSteps: ['edit2', 'image', 'check-1'],
                iconCurStep: 2,
                objectSteps: [
                    { title: '订单详情', icon: 'order' },
                    { title: '收件人信息', icon: 'user' },
                    { title: '支付', icon: 'id' },
                    { title: '完成', icon: 'check-1' }
                ]
            }
        }
    }
</script>

<style lang="postcss">
    .custom-icon {
        .icon-image, .icon-order, .icon-user, .icon-id {
            font-size: 14px;
        }
    }
</style>
```
:::

### 小尺寸 {page=#/steps}

:::demo 指定 `size` 值为 `small` 显示为小尺寸

```html
<template>
    <bk-steps class="mb40" size="small"></bk-steps>
    <div style="height: 200px">
        <bk-steps ext-cls="custom-icon" direction="vertical" size="small"></bk-steps>
    </div>
</template>
<script>
    import { bkSteps } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkSteps
        }
    }
</script>
<style lang="postcss">
    .custom-icon {
        .icon-image, .icon-order, .icon-user, .icon-id {
            font-size: 14px;
        }
    }
</style>
```
:::

### 错误和加载中状态 {page=#/steps}

:::demo 使用 `status` 属性设置当前步骤状态为错误或加载中，分别对应 `error`、`loading` 值，清空则还原为默认状态

```html
<template>
    <bk-steps ext-cls="custom-icon" class="mb40" status="error" :cur-step="2"></bk-steps>
    <bk-steps ext-cls="custom-icon" theme="success" status="loading" :steps="objectSteps" :cur-step="2"></bk-steps>
</template>
<script>
    import { bkSteps } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkSteps
        },
        data () {
            return {
                objectSteps: [
                    { title: '订单详情', icon: 'order' },
                    { title: '收件人信息', icon: 'user' },
                    { title: '支付', icon: 'id' },
                    { title: '完成', icon: 'check-1' }
                ]
            }
        }
    }
</script>
<style lang="postcss">
    .custom-icon {
        .icon-image, .icon-order, .icon-user, .icon-id {
            font-size: 14px;
        }
    }
</style>
```
:::

### 可控制当前步骤 {page=#/steps}

:::demo 配置 `controllable` 参数，可实现点击步骤任意跳转
```html
<template>
    <bk-steps ext-cls="custom-icon"
        :controllable="controllableSteps.controllable"
        :steps="controllableSteps.steps"
        :cur-step.sync="controllableSteps.curStep"
        @step-changed="stepChanged">
    </bk-steps>
</template>
<script>
    import { bkSteps } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkSteps
        },
        data () {
            return {
                controllableSteps: {
                    controllable: true,
                    steps: [
                        { title: '基本信息', icon: 1 },
                        { title: '详细信息', icon: 2 },
                        { title: '实名认证', icon: 3 }
                    ],
                    curStep: 1
                }
            }
        },
        methods: {
            stepChanged (index) {
                alert(`当前步骤index：${index}`)
            }
        }
    }
</script>
<style lang="postcss">
    .custom-icon {
        .icon-image, .icon-order, .icon-user, .icon-id {
            font-size: 14px;
        }
    }
</style>
```
:::

### 自定义步骤状态 {page=#/steps}

:::demo 通过改变 `step.status` 的值改变指定步骤状态，支持 `done`、`loading`、`error`
```html
<template>
    <bk-steps ext-cls="custom-icon"
        :controllable="customStatusSteps.controllable"
        :steps="customStatusSteps.steps"
        :cur-step.sync="customStatusSteps.curStep"
        @step-changed="changeStepStatus">
    </bk-steps>
</template>
<script>
    import { bkSteps } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkSteps
        },
        data () {
            return {
                customStatusSteps: {
                    controllable: true,
                    steps: [
                        { title: '基本信息', icon: 1, status: 'done' },
                        { title: '详细信息', icon: 2, status: 'done' },
                        { title: '实名认证', icon: 3, status: 'error' }
                    ],
                    curStep: 1
                }
            }
        },
        methods: {
            changeStepStatus (index) {
                this.customStatusSteps.steps.forEach(step => step.status = 'done')
                this.customStatusSteps.steps[index - 1].status = 'loading'
            }
        }
    }
</script>
<style lang="postcss">
    .custom-icon {
        .icon-image, .icon-order, .icon-user, .icon-id {
            font-size: 14px;
        }
    }
</style>
```
:::

### 属性 {page=#/steps}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| steps | 组件步骤内容，数组中的元素可以是对象，可以是数字，可以是字符串，也可以是三者混合；<br>当元素是对象时，有四个可选的key：`title` `icon` `description` `status`；当元素是数字或字符串时，组件会将其解析成对象形式下的 `icon` 的值；当元素是字符串时，使用[ICON](#/icon) | Array | —— | —— |
| cur-step | 当前步骤的索引值，从 1 开始；支持 .sync 修饰符 | Number | —— | 1 |
| direction | 步骤条方向，支持水平（horizontal）和竖直（vertical）两种方向 | String | horizontal, vertical | horizontal |
| size | 指定大小，目前支持普通（不设置）和小尺寸（small） | String | small | —— |
| status | 指定当前步骤状态，不指定则为默认状态（是否完成） | String | error, loading | —— |
| controllable | 步骤可否被控制前后跳转 | Boolean | —— | false |
| theme | 组件的主题色 | String | primary, info, success, warning, danger | primary |
| ext-cls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `.bk-steps` 上 | String | —— | —— |
| before-change | 步骤切换前的钩子函数，支持异步函数 | Function(nextStep) | —— | —— |

### 事件 {page=#/steps}
| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| step-changed | 当前步骤变化时的回调 | 变化后的步骤 index |
