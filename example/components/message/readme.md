<script>
    import { bkButton } from '@'

    export default {
        components: {
            bkButton
        },
        data () {
            return {
                defaultMessage: '选择你导入的构建机并填写相关信息，系统将为你安装必要的软件',
                primaryMessage: '选择你导入的构建机并填写相关信息，系统将为你安装必要的软件',
                errorMessage: '系统错误，请稍后重试',
                warningMessage: '系统即将于19：00-21：00进行升个级，请及时保存你的资料',
                successMessage: '恭喜！你提交的申请已经审核通过，请及时跟进了解下一步操作方式'
            }
        },
        methods: {
            handleDefault () {
                this.$bkMessage({
                    message: this.defaultMessage,
                    offsetY: 80
                })
            },
            handleSingle (config) {
                config.message = this.defaultMessage
                config.offsetY = 80
                this.$bkMessage(config)
            },
            handlePrimary (config) {
                config.message = this.primaryMessage
                config.offsetY = 80
                this.$bkMessage(config)
            },
            handleError (config) {
                config.message = this.errorMessage
                config.offsetY = 80
                this.$bkMessage(config)
            },
            handleWarning (config) {
                config.message = this.warningMessage
                config.offsetY = 80
                this.$bkMessage(config)
            },
            handleSuccess (config) {
                config.message = this.successMessage
                config.offsetY = 80
                this.$bkMessage(config)
            },
            handleVNodeMessage () {
                const h = this.$createElement
                this.$bkMessage({
                    message: h('p', {
                        style: {
                            margin: 0
                        }
                    }, [
                        '这是',
                        h('span', {
                            style: {
                                color: 'red',
                            }
                        },'自定义'),
                        '输入渲染的内容'
                    ]),
                    offsetY: 80
                })
            },
            handleLong () {
                this.$bkMessage({
                    message: '测试环境，仅限制业务【TInside作业平台内部版】下IP测试环境，仅限制业务【TInside作业平台内部版】下IP测试环境，'
                        + '仅限制业务【TInside作业平台内部版】下IP测试环境，仅限制业务【TInside作业平台内部版】下IP测试环境，'
                        + '仅限制业务【TInside作业平台内部版】下IP测试环境，仅限制业务【TInside作业平台内部版】下'
                        + 'IP: 10.140.53.22/10.208.168.23/10.208.168.25/10.195.24.104/10.123.135.15/10.49.175.29/'
                        + '10.49.175.49/10.222.137.101/10.223.41.90/10.173.168.35 可用',
                    theme: 'error',
                    offsetY: 80,
                    ellipsisLine: 2
                })
            },
            handleCopyMessage () {
                this.$bkMessage({
                    message: '测试环境，仅限制业务【TInside作业平台内部版】下IP测试环境，仅限制业务【TInside作业平台内部版】下IP测试环境，'
                        + '仅限制业务【TInside作业平台内部版】下IP测试环境，仅限制业务【TInside作业平台内部版】下IP测试环境，'
                        + '仅限制业务【TInside作业平台内部版】下IP测试环境，仅限制业务【TInside作业平台内部版】下'
                        + 'IP: 10.140.53.22/10.208.168.23/10.208.168.25/10.195.24.104/10.123.135.15/10.49.175.29/'
                        + '10.49.175.49/10.222.137.101/10.223.41.90/10.173.168.35 可用',
                    theme: 'error',
                    offsetY: 80,
                    ellipsisLine: 2,
                    ellipsisCopy: true
                })
            }
        }
    }
</script>

[[toc]]

## Message 消息提示

用户操作后的消息提示，用于成功、失败、警告等消息提醒。

消息提醒的内容建议不超过一行，超过一行的内容默认做截断处理。如显示的内容较多，请选择 Notify 组件的提示方式。

### 基础用法 {page=#/message}

:::demo 使用默认配置的消息提示

```html
<template>
    <bk-button type="primary" @click="handleDefault">默认配置的消息提示</bk-button>
</template>

<script>
    import { bkButton } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton
        },
        data () {
            return {
                defaultMessage: '你好！欢迎你使用TI运维平台产品'
            }
        },
        methods: {
            handleDefault () {
                this.$bkMessage({
                    message: this.defaultMessage,
                    offsetY: 80
                })
            }
        }
    }
</script>
```
:::


### 内置主题 {page=#/message}

:::demo 通知提示提供消息、失败、警告、成功四种主题

```html
<template>
    <bk-button theme="primary" @click="handlePrimary({theme:'primary'})">消息</bk-button>
    <bk-button theme="success" @click="handleSuccess({theme: 'success'})">成功</bk-button>
    <bk-button theme="warning" @click="handleWarning({theme: 'warning'})">警告</bk-button>
    <bk-button theme="danger" @click="handleError({theme: 'error'})">失败</bk-button>
</template>

<script>
    import { bkButton } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton
        },
        data () {
            return {
                primaryMessage: '选择你导入的构建机并填写相关信息，系统将为你安装必要的软件',
                errorMessage: '系统错误，请稍后重试',
                warningMessage: '系统即将于19：00-21：00进行升个级，请及时保存你的资料',
                successMessage: '恭喜！你提交的申请已经审核通过，请及时跟进了解下一步操作方式'
            }
        },
        methods: {
            handlePrimary (config) {
                config.message = this.primaryMessage
                config.offsetY = 80
                this.$bkMessage(config)
            },
            handleError (config) {
                config.message = this.errorMessage
                config.offsetY = 80
                this.$bkMessage(config)
            },
            handleWarning (config) {
                config.message = this.warningMessage
                config.offsetY = 80
                this.$bkMessage(config)
            },
            handleSuccess (config) {
                config.message = this.successMessage
                config.offsetY = 80
                this.$bkMessage(config)
            }
        }
    }
</script>
```
:::

### 消息关闭 {page=#/message}

:::demo 配置 `delay` 字段定义通知自动关闭的时间，当值为 `0` 时不自动关闭。配置 `dismissable` 字段控制是否显示右侧的手动关闭 icon。
```html
<template>
    <bk-button type="primary" @click="handleSingle({delay: 10000})">10s 后关闭</bk-button>
    <bk-button type="primary" @click="handleSingle({delay: 0})">不自动关闭</bk-button>
    <bk-button type="primary" @click="handleSingle({dismissable: false})">不显示关闭 icon</bk-button>
</template>

<script>
    import { bkButton } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton
        },
        data () {
            return {
                defaultMessage: '你好！欢迎你使用TI运维平台产品'
            }
        },
        methods: {
            handleSingle (config) {
                config.message = this.defaultMessage
                config.offsetY = 80
                this.$bkMessage(config)
            }
        }
    }
</script>
```
:::


### 消息的个数限制 {page=#/message}

:::demo 配置 `limit` 字段限定消息通知出现的个数
```html
<template>
    <bk-button type="primary" @click="handleSingle({limit: 1})">只有 1 条</bk-button>
    <bk-button type="primary" @click="handleSingle({limit: 5, delay: 0})">同时出现最多 5 条</bk-button>
    <bk-button type="primary" @click="handleSingle({limit: 0})">清除所有</bk-button>
</template>

<script>
    import { bkButton } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton
        },
        data () {
            return {
                defaultMessage: '你好！欢迎你使用TI运维平台产品'
            }
        },
        methods: {
            handleSingle (config) {
                config.message = this.defaultMessage
                config.offsetY = 80
                this.$bkMessage(config)
            }
        }
    }
</script>
```
:::


### 自定义消息内容 VNode {page=#/message}

:::demo `message` 支持字段传入 VNode 渲染
```html
<template>
    <bk-button type="primary" @click="handleVNodeMessage()">自定义提示内容样式</bk-button>
</template>

<script>
    import { bkButton } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton
        },
        data () {
            return {}
        },
        methods: {
            handleVNodeMessage () {
                const h = this.$createElement
                this.$bkMessage({
                    message: h('p', {
                        style: {
                            margin: 0
                        }
                    }, [
                        '这是',
                        h('span', {
                            style: {
                                color: 'red',
                            }
                        },'自定义'),
                        '输入渲染的内容'
                    ]),
                    offsetY: 80
                })
            }
        }
    }
</script>
```
:::


### 超长消息内容 {page=#/message}

:::demo 超长消息内容超出一行部分，默认做截断处理
```html
<template>
    <bk-button type="primary" @click="handleLong">超长提示文案</bk-button>
</template>

<script>
    import { bkButton } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton
        },
        data () {
            return {
                message: '测试环境，仅限制业务【TInside作业平台内部版】下IP测试环境，仅限制业务【TInside作业平台内部版】下IP测试环境，'
                        + '仅限制业务【TInside作业平台内部版】下IP测试环境，仅限制业务【TInside作业平台内部版】下IP测试环境，'
                        + '仅限制业务【TInside作业平台内部版】下IP测试环境，仅限制业务【TInside作业平台内部版】下'
                        + 'IP: 10.140.53.22/10.208.168.23/10.208.168.25/10.195.24.104/10.123.135.15/10.49.175.29/'
                        + '10.49.175.49/10.222.137.101/10.223.41.90/10.173.168.35 可用',
            }
        },
        methods: {
            handleLong () {
                this.$bkMessage({
                    message: this.message,
                    delay: 0,
                    theme: 'error',
                    offsetY: 80,
                    ellipsisLine: 2
                })
            }
        }
    }
</script>
```
:::



### 内容超出被截断时显示复制按钮

:::demo 内容超出被截断时显示复制按钮
```html
<template>
    <bk-button type="primary" @click="handleCopyMessage">内容超出被截断时显示复制按钮</bk-button>
</template>

<script>
    import { bkButton } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton
        },
        data () {
            return {
                message: '测试环境，仅限制业务【TInside作业平台内部版】下IP测试环境，仅限制业务【TInside作业平台内部版】下IP测试环境，'
                        + '仅限制业务【TInside作业平台内部版】下IP测试环境，仅限制业务【TInside作业平台内部版】下IP测试环境，'
                        + '仅限制业务【TInside作业平台内部版】下IP测试环境，仅限制业务【TInside作业平台内部版】下'
                        + 'IP: 10.140.53.22/10.208.168.23/10.208.168.25/10.195.24.104/10.123.135.15/10.49.175.29/'
                        + '10.49.175.49/10.222.137.101/10.223.41.90/10.173.168.35 可用',
            }
        },
        methods: {
            handleCopyMessage () {
                this.$bkMessage({
                    message: this.message,
                    theme: 'error',
                    offsetY: 80,
                    ellipsisLine: 2,
                    ellipsisCopy: true
                })
            }
        }
    }
</script>
```
:::
### 属性 {page=#/message}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| theme | 组件主题色 | String | primary / success / warning / error | primary |
| icon | 组件左侧图标 | String | 参考[ICON](#/icon) | info |
| message | 组件显示的文字内容，支持字符串或用 `this.$createElement` 生成的 DOM 片段 | String / DOM Element | —— | —— |
| delay | 组件延时关闭时间，值为 0 时需要手动关闭 | Number | —— | 3000 |
| dismissable | 是否显示右侧关闭 icon | Boolean | —— | true |
| offsetY | 组件出现时距离视口顶部的偏移量 | Number | —— | 30 |
| spacing | 多个组件之间的垂直距离 | Number | —— | 10 |
| limit | 组件个数限制，默认不限制个数，设置为 0 时，清除所有实例 | Number | —— | —— |
| ellipsisLine | 配置组件显示内容的行数，超过这个函数之后，内容就会被省略，默认值为 1，配置为 0 即表示显示全部内容 | Number | —— | 1 |
| onClose | 关闭组件时的回调函数, 参数为组件实例 | Function | —— | —— |
| extCls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `.bk-message` 上 | String | —— | —— |
| ellipsisCopy | 内容超出被截断时是否显示复制按钮 | Boolean | —— | false |

### 方法 {page=#/message}
手动关闭组件时，可以调用 `this.$bkMessage` 返回实例的 `close` 方法
| 方法 | 说明 |
| --- | --- |
| close | 关闭当前的组件 |
