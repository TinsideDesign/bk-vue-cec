<script>
    import { bkButton } from '@'

    export default {
        components: {
            bkButton
        },
        data () {
            return {
                title: '你好！欢迎你使用TI运维平台产品',
                message: '你好，你申请的功能权限现已开通，请及时登录查询。如有疑问，请与TI运维平台管理人员联系或关注微信公众账号。',
                placement: {
                    topLeft: 'top-left',
                    topRight: 'top-right',
                    bottomLeft: 'bottom-left',
                    bottomRight: 'bottom-right'
                }
            }
        },
        methods: {
            handleDefault () {
                this.$bkNotify({
                    title: this.title,
                    message: this.message,
                    limitLine: 3,
                    offsetY: 80
                })
            },
            handleHideTitle () {
                this.$bkNotify({
                    message: this.message,
                    limitLine: 3,
                    offsetY: 80
                })
            },
            handleSingle (config) {
                config.title = this.title
                config.message = this.message
                config.offsetY = 80
                config.limitLine = 3
                this.$bkNotify(config)
            },
            handleVNodeMessage () {
                const h = this.$createElement
                this.$bkNotify({
                    title: this.title,
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
            handleLongExtend () {
                this.$bkNotify({
                    title: this.title,
                    message: '测试环境，仅限制业务【TInside作业平台内部版】下IP测试环境，仅限制业务【TInside作业平台内部版】下IP测试环境，'
                        + '仅限制业务【TInside作业平台内部版】下IP测试环境，仅限制业务【TInside作业平台内部版】下IP测试环境，'
                        + '仅限制业务【TInside作业平台内部版】下IP测试环境，仅限制业务【TInside作业平台内部版】下'
                        + 'IP: 10.140.53.22/10.208.168.23/10.208.168.25/10.195.24.104/10.123.135.15/10.49.175.29/'
                        + '10.49.175.49/10.222.137.101/10.223.41.90/10.173.168.35 可用',
                    theme: 'error',
                    offsetY: 80,
                    showViewMore: true,
                    limitLine: 2,
                    onViewMoreHandler () {
                        this.limitLine = 0
                        this.showViewMore = false
                    }
                })
            },
            handleLongJump () {
                this.$bkNotify({
                    title: this.title,
                    message: '测试环境，仅限制业务【TInside作业平台内部版】下IP测试环境，仅限制业务【TInside作业平台内部版】下IP测试环境，'
                        + '仅限制业务【TInside作业平台内部版】下IP测试环境，仅限制业务【TInside作业平台内部版】下IP测试环境，'
                        + '仅限制业务【TInside作业平台内部版】下IP测试环境，仅限制业务【TInside作业平台内部版】下'
                        + 'IP: 10.140.53.22/10.208.168.23/10.208.168.25/10.195.24.104/10.123.135.15/10.49.175.29/'
                        + '10.49.175.49/10.222.137.101/10.223.41.90/10.173.168.35 可用',
                    theme: 'error',
                    offsetY: 80,
                    showViewMore: true,
                    limitLine: 2,
                    onViewMoreHandler () {
                        alert('跳转链接')
                    }
                })
            }
        }
    }
</script>

[[toc]]

## Notify 通知提示

用来给用户推送通知提示信息，通知可配置为从界面的四个角出现

### 基础用法 {page=#/notify}

:::demo 使用默认配置的通知提示

```html
<template>
    <bk-button type="primary" @click="handleDefault">默认配置的通知提示</bk-button>
    <bk-button type="primary" @click="handleHideTitle">默认没有标题</bk-button>
</template>

<script>
    import { bkButton } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton
        },
        data () {
            return {
                title: '你好！欢迎你使用TI运维平台产品',
                message: '你好，你申请的功能权限现已开通，请及时登录查询。如有疑问，请与TI运维平台管理人员联系或关注微信公众账号。'
            }
        },
        methods: {
            handleDefault () {
                this.$bkNotify({
                    title: this.title,
                    message: this.message,
                    limitLine: 3,
                    offsetY: 80
                })
            },
            handleHideTitle () {
                this.$bkNotify({
                    message: this.message,
                    limitLine: 3,
                    offsetY: 80
                })
            }
        }
    }
</script>
```
:::


### 内置主题 {page=#/notify}

:::demo 通知提示提供通知、失败、警告、成功四种主题
```html
<template>
    <bk-button theme="primary" @click="handleSingle({theme:'primary'})">通知</bk-button>
    <bk-button theme="success" @click="handleSingle({theme: 'success'})">成功</bk-button>
    <bk-button theme="warning" @click="handleSingle({theme: 'warning'})">警告</bk-button>
    <bk-button theme="danger" @click="handleSingle({theme: 'error'})">失败</bk-button>
</template>

<script>
    import { bkButton } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton
        },
        data () {
            return {
                title: '你好！欢迎你使用TI运维平台产品',
                message: '你好，你申请的功能权限现已开通，请及时登录查询。如有疑问，请与TI运维平台管理人员联系或关注微信公众账号。'
            }
        },
        methods: {
            handleSingle (config) {
                config.title = this.title
                config.message = this.message
                config.offsetY = 80
                config.limitLine = 3
                this.$bkNotify(config)
            }
        }
    }
</script>
```
:::


### 通知出现的位置 {page=#/notify}

:::demo 通知出现可以从 6 个方向出现：左上角、顶部居中、右上角、左下角、底部居中、右下角

```html
<template>
    <p>
        <bk-button theme="danger" @click="handleSingle({position: placement.topLeft, theme: 'error'})">左上角</bk-button>
        <bk-button theme="success" @click="handleSingle({position: placement.topRight, theme: 'success'})">右上角</bk-button>
    </p>
    <p>
        <bk-button theme="warning" @click="handleSingle({position: placement.bottomLeft, theme: 'warning'})">左下角</bk-button>
        <bk-button theme="primary" @click="handleSingle({position: placement.bottomRight, theme: 'primary'})">右下角</bk-button>
    </p>
</template>

<script>
    import { bkButton } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton
        },
        data () {
            return {
                title: '你好！欢迎你使用TI运维平台产品',
                message: '你好，你申请的功能权限现已开通，请及时登录查询。如有疑问，请与TI运维平台管理人员联系或关注微信公众账号。'
                placement: {
                    topLeft: 'top-left',
                    topRight: 'top-right',
                    bottomLeft: 'bottom-left',
                    bottomRight: 'bottom-right'
                }
            }
        },
        methods: {
            handleSingle (config) {
                config.title = this.title
                config.message = this.message
                config.offsetY = 80
                config.limitLine = 3
                this.$bkNotify(config)
            }
        }
    }
</script>
```
:::


### 通知关闭 {page=#/notify}

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
                title: '你好！欢迎你使用TI运维平台产品',
                message: '你好，你申请的功能权限现已开通，请及时登录查询。如有疑问，请与TI运维平台管理人员联系或关注微信公众账号。'
            }
        },
        methods: {
            handleSingle (config) {
                config.title = this.title
                config.message = this.message
                config.offsetY = 80
                config.limitLine = 3
                this.$bkNotify(config)
            }
        }
    }
</script>
```
:::


### 通知的个数限制 {page=#/notify}

:::demo 配置 `limit` 字段限定通知通知出现的个数
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
                title: '你好！欢迎你使用TI运维平台产品',
                message: '你好，你申请的功能权限现已开通，请及时登录查询。如有疑问，请与TI运维平台管理人员联系或关注微信公众账号。'
            }
        },
        methods: {
            handleSingle (config) {
                config.title = this.title
                config.message = this.message
                config.offsetY = 80
                config.limitLine = 3
                this.$bkNotify(config)
            }
        }
    }
</script>
```
:::


### 自定义通知内容 VNode {page=#/notify}

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
            return {
                title: '你好！欢迎你使用TI运维平台产品',
            }
        },
        methods: {
            handleVNodeMessage () {
                const h = this.$createElement
                this.$bkNotify({
                    title: '',
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


### 超长通知内容 {page=#/notify}

:::demo 当通知内容会出现多行的时候，组件默认会截取，只保留两行文本。自定义查看更多的效果，需要手动配置`showViewMore`是否展示"查看更多"按钮，以及点击回调函数`onViewMoreHandler`。

```html
<template>
    <bk-button type="primary" @click="handleLongExtend">超长提示文案展开</bk-button>
    <bk-button type="primary" @click="handleLongJump">超长提示文案跳转链接</bk-button>
</template>

<script>
    import { bkButton } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton
        },
        data () {
            return {
                title: '你好！欢迎你使用TI运维平台产品',
                message: '测试环境，仅限制业务【TInside作业平台内部版】下IP测试环境，仅限制业务【TInside作业平台内部版】下IP测试环境，'
                        + '仅限制业务【TInside作业平台内部版】下IP测试环境，仅限制业务【TInside作业平台内部版】下IP测试环境，'
                        + '仅限制业务【TInside作业平台内部版】下IP测试环境，仅限制业务【TInside作业平台内部版】下'
                        + 'IP: 10.140.53.22/10.208.168.23/10.208.168.25/10.195.24.104/10.123.135.15/10.49.175.29/'
                        + '10.49.175.49/10.222.137.101/10.223.41.90/10.173.168.35 可用',
            }
        },
        methods: {
            handleLongExtend () {
                this.$bkNotify({
                    title: this.title,
                    message: '测试环境，仅限制业务【TInside作业平台内部版】下IP测试环境，仅限制业务【TInside作业平台内部版】下IP测试环境，'
                        + '仅限制业务【TInside作业平台内部版】下IP测试环境，仅限制业务【TInside作业平台内部版】下IP测试环境，'
                        + '仅限制业务【TInside作业平台内部版】下IP测试环境，仅限制业务【TInside作业平台内部版】下'
                        + 'IP: 10.140.53.22/10.208.168.23/10.208.168.25/10.195.24.104/10.123.135.15/10.49.175.29/'
                        + '10.49.175.49/10.222.137.101/10.223.41.90/10.173.168.35 可用',
                    theme: 'error',
                    offsetY: 80,
                    showViewMore: true,
                    limitLine: 2,
                    onViewMoreHandler () {
                        this.limitLine = 0
                        this.showViewMore = false
                    }
                })
            },
            handleLongJump () {
                this.$bkNotify({
                    title: this.title,
                    message: '测试环境，仅限制业务【TInside作业平台内部版】下IP测试环境，仅限制业务【TInside作业平台内部版】下IP测试环境，'
                        + '仅限制业务【TInside作业平台内部版】下IP测试环境，仅限制业务【TInside作业平台内部版】下IP测试环境，'
                        + '仅限制业务【TInside作业平台内部版】下IP测试环境，仅限制业务【TInside作业平台内部版】下'
                        + 'IP: 10.140.53.22/10.208.168.23/10.208.168.25/10.195.24.104/10.123.135.15/10.49.175.29/'
                        + '10.49.175.49/10.222.137.101/10.223.41.90/10.173.168.35 可用',
                    theme: 'error',
                    offsetY: 80,
                    showViewMore: true,
                    limitLine: 2,
                    onViewMoreHandler () {
                        alert('跳转链接')
                    }
                })
            }
        }
    }
</script>
```
:::


### 属性 {page=#/notify}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| theme | 组件主题色 | String | primary / success / warning / error | primary |
| icon | 组件左侧图标 | String | 参考[TInside ICON](ICON_URL) | info |
| title | 组件的标题 | String | —— | —— |
| message | 组件显示的文字内容，支持字符串或用 `this.$createElement` 生成的 DOM 片段 | String / DOMElement | —— | —— |
| position | 组件出现的方向 | String | top-left/top-center/top-right/bottom-left/bottom-center/bottom-right | top-center |
| delay | 组件延时关闭时间，值为 0 时需要手动关闭 | Number | —— | 5000 |
| dismissable | 是否显示右侧关闭 icon | Boolean | —— | true |
| limit | 组件个数限制，默认不限制个数，设置为 0 时，清除所有实例 | Number | —— | —— |
| limitLine | 文字内容的最大行数，默认为两行，值为 0 时文字内容全部显示 | Number | —— | 2 |
| showViewMore | 是否显示`显示更多`按钮，配合`limitLine`使用 | Boolean | —— | false |
| offsetX | 组件出现时距离视口的水平偏移量 | Number | —— | 10 |
| offsetY | 组件出现时距离视口的垂直偏移量 | Number | —— | 30 |
| onViewMoreHandler | `显示更多`按钮点击回调函数 | Function | —— | —— |
| onClose | 关闭组件时的回调函数, 参数为组件实例 | Function | —— | —— |
| ext-cls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `.bk-notify` 上 | String | —— | —— |

### 方法 {page=#/notify}
手动关闭组件时，可以调用 `this.$bkNotify` 返回实例的 `close` 方法
| 方法 | 说明 |
| --- | --- |
| close | 关闭当前的组件 |
