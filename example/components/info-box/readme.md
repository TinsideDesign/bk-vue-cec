<script>
    import { bkButton } from '@'

    export default {
        components: {
            bkButton
        },
        data () {
            return {

            }
        },
        created () {
            this.lang = localStorage.getItem('lang') || 'zhCN'
        },
        methods: {
            defaultInfoBox1 () {
                this.$bkInfo({
                    title: '确认要删除？',
                    renderDirective: 'if'
                })
            },
            defaultInfoBox2 () {
                this.$bkInfo({
                    title: '请确认是否重置',
                    okText: '按钮1',
                    cancelText: '按钮2',
                    subTitle: '重置SecureKey，需要自行修改templates中的callback地址字段！'
                })
            },
            asyncInfoBoxSuccess () {
                this.$bkInfo({
                    title: '确认要删除？',
                    confirmLoading: true,
                    confirmFn: async () => {
                        try {
                            await new Promise(resolve => {
                                setTimeout(() => {
                                    resolve('成功')
                                }, 1500)
                            })
                            this.$bkMessage({
                                message: '删除成功',
                                theme: 'success'
                            })
                            return true
                        } catch (e) {
                            console.warn(e)
                            return false
                        }
                    }
                })
            },
            asyncInfoBoxFailed () {
                this.$bkInfo({
                    title: '确认要删除？',
                    confirmLoading: true,
                    confirmFn: async () => {
                        try {
                            await new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    reject('失败')
                                }, 1500)
                            })
                            return true
                        } catch (e) {
                            console.warn(e)
                            this.$bkMessage({
                                message: '删除失败',
                                theme: 'error'
                            })
                            return false
                        }
                    }
                })
            },
            successInfoBox () {
                const h = this.$createElement

                this.$bkInfo({
                    type: 'success',
                    title: '添加用户成功',
                    showFooter: false,
                    extCls: 'sdasa',
                    subHeader: h('a', {
                        style: {
                            color: '#006DFF',
                            textDecoration: 'none',
                            cursor: 'pointer'
                        }
                    }, '继续添加')
                })
            },
            errorInfoBox () {
                const a = this.$bkInfo({
                    type: 'error',
                    title: '添加用户失败',
                    subTitle: '此窗口3秒后关闭',
                    showFooter: false
                })

                let num = 3
                let t = setInterval(() => {
                    a.subTitle = `此窗口${--num}秒后关闭`
                    if (num === 0) {
                        clearInterval(t)
                        a.close()
                    }
                }, 1000)
            },
            warningInfoBox () {
                this.$bkInfo({
                    type: 'warning',
                    title: '此操作存在安全风险',
                    confirmFn (vm) {
                        console.warn(vm)
                    },
                    cancelFn (vm) {
                        console.warn(vm)
                    },
                    afterLeaveFn (vm) {
                        console.log(vm)
                    },
                    stateChangeFn (state) {
                        console.log(state)
                    }
                })
            },
            loadingInfoBox () {
                this.$bkInfo({
                    type: 'loading',
                    showFooter: false,
                    title: 'loading',
                    subTitle: '请稍等…'
                })
            },
            vnodeInfoBox () {
                const h = this.$createElement

                this.$bkInfo({
                    title: '支持VNode的提示框',
                    subHeader: h('div', {
                        style: {
                            color: 'red'
                        }
                    }, 'Hello World')
                })
            },
            maskCloseInfoBox () {
                this.$bkInfo({
                    title: '点击遮罩关闭',
                    maskClose: true
                })
            },
            escCloseInfoBox () {
                this.$bkInfo({
                    title: 'ESC 关闭',
                    escClose: true
                })
            },
            closeIconInfoBox () {
                this.$bkInfo({
                    title: '不显示右上角的关闭 X',
                    closeIcon: false
                })
            },
            colorfulInfoBox () {
                this.$bkInfo({
                    title: '自定义配色',
                    subTitle: '配置 theme 字段，支持 default, primary, success, warning, danger，默认为 primary',
                    theme: 'success'
                })
            },
            customIconInfoBox () {
                this.$bkInfo({
                    type: 'success',
                    title: '操作成功',
                    subTitle: '继续>>',
                    icon: 'check-circle',
                    showFooter: false
                })
            },
            customWidthInfoBox () {
                this.$bkInfo({
                    type: 'success',
                    title: '自定义宽度800',
                    width: 800,
                    showFooter: false
                })
            },
            customContainer1 () {
                this.$bkInfo({
                    title: '".idx1" HTMLElement',
                    container: document.querySelector('.idx1')
                })
            },
            customContainer2 () {
                this.$bkInfo({
                    title: '"idx2" VNode',
                    container: this.$refs.idx2
                })
            },
            customContainer3 () {
                this.$bkInfo({
                    title: '".idx3" String',
                    container: '.idx3'
                })
            }
        }
    }
</script>

[[toc]]

## Info 提示框

模态对话框组件，可用于消息提示，成功提示，错误提示，后续操作询问等

:::exampleLink [更多示例](#/info-box/example)

### 基础用法 {page=#/info-box}

:::demo 调用 `$bkInfo` 方法，配置 title, subTitle 等参数

```html
<template>
    <bk-button theme="primary" @click="defaultInfoBox1">默认配置的提示框1</bk-button>
    <bk-button theme="primary" @click="defaultInfoBox2">默认配置的提示框2</bk-button>
</template>

<script>
    import { bkButton } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton
        },
        methods: {
            defaultInfoBox1 () {
                this.$bkInfo({
                    title: '确认要删除？'
                })
            },
            defaultInfoBox2 () {
                this.$bkInfo({
                    title: '请确认是否重置',
                    subTitle: '重置SecureKey，需要自行修改templates中的callback地址字段！'
                })
            }
        }
    }
</script>
```
:::

### 异步 confirmFn 确定按钮自动开启 loading {page=#/info-box}

:::demo 调用 `$bkInfo` 方法，配置 title, confirmLoading, confirmFn 等参数

```html
<template>
    <bk-button theme="primary" @click="asyncInfoBoxSuccess">点击删除(成功)</bk-button>
    <bk-button theme="primary" @click="asyncInfoBoxFailed">点击删除(失败)</bk-button>
</template>

<script>
    import { bkButton } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton
        },
        methods: {
            asyncInfoBoxSuccess () {
                this.$bkInfo({
                    title: '确认要删除？',
                    confirmLoading: true,
                    confirmFn: async () => {
                        try {
                            await new Promise(resolve => {
                                setTimeout(() => {
                                    resolve('成功')
                                }, 1500)
                            })
                            this.$bkMessage({
                                message: '删除成功',
                                theme: 'success'
                            })
                            return true
                        } catch (e) {
                            console.warn(e)
                            return false
                        }
                    }
                })
            },
            asyncInfoBoxFailed () {
                this.$bkInfo({
                    title: '确认要删除？',
                    confirmLoading: true,
                    confirmFn: async () => {
                        try {
                            await new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    reject('失败')
                                }, 1500)
                            })
                            return true
                        } catch (e) {
                            console.warn(e)
                            this.$bkMessage({
                                message: '删除失败',
                                theme: 'error'
                            })
                            return false
                        }
                    }
                })
            }
        }
    }
</script>
```
:::

### 各种状态 {page=#/info-box}

:::demo 配置 type 的值，实现成功，错误，警告，加载中的不同类型
```html
<template>
    <bk-button theme="success" @click="successInfoBox">成功</bk-button>
    <bk-button theme="danger" @click="errorInfoBox">错误</bk-button>
    <bk-button theme="warning" @click="warningInfoBox">警告</bk-button>
    <bk-button @click="loadingInfoBox">加载中</bk-button>
</template>

<script>
    import { bkButton } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton
        },
        methods: {
            successInfoBox () {
                const h = this.$createElement

                this.$bkInfo({
                    type: 'success',
                    title: '添加用户成功',
                    showFooter: false,
                    subHeader: h('a', {
                        style: {
                            color: '#006DFF',
                            textDecoration: 'none',
                            cursor: 'pointer'
                        }
                    }, '继续添加')
                })
            },
            errorInfoBox () {
                const a = this.$bkInfo({
                    type: 'error',
                    title: '添加用户失败',
                    subTitle: '此窗口3秒后关闭',
                    showFooter: false
                })

                let num = 3
                let t = setInterval(() => {
                    a.subTitle = `此窗口${--num}秒后关闭`
                    if (num === 0) {
                        clearInterval(t)
                        a.close()
                    }
                }, 1000)
            },
            warningInfoBox () {
                this.$bkInfo({
                    type: 'warning',
                    title: '此操作存在安全风险',
                    confirmFn (vm) {
                        console.warn(vm)
                    },
                    cancelFn (vm) {
                        console.warn(vm)
                    },
                    afterLeaveFn (vm) {
                        console.log(vm)
                    }
                })
            },
            loadingInfoBox () {
                this.$bkInfo({
                    type: 'loading',
                    showFooter: false,
                    title: 'loading',
                    subTitle: '请稍等…'
                })
            }
        }
    }
</script>
```
:::

### 控制弹窗出现在哪个容器内 {page=#/info-box}

:::demo 通过配置 `container` 属性，来控制弹窗出现在哪个容器内。`container` 支持 `HTMLElement`, `VNode`, `String`

```html
<template>
    <bk-button theme="primary" @click="customContainer1">HTMLElement</bk-button>
    <div class="idx1 mb15">idx1</div>
    <bk-button theme="primary" @click="customContainer2">VNode</bk-button>
    <div ref="idx2" class="mb15">idx2</div>
    <bk-button theme="primary" @click="customContainer3">String</bk-button>
    <div class="idx3 mb15">idx3</div>
</template>

<script>
    import { bkButton } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton
        },
        methods: {
            customContainer1 () {
                this.$bkInfo({
                    title: '".idx1" HTMLElement',
                    container: document.querySelector('.idx1')
                })
            },
            customContainer2 () {
                this.$bkInfo({
                    title: '"idx2" VNode',
                    container: this.$refs.idx2
                })
            },
            customContainer3 () {
                this.$bkInfo({
                    title: '".idx3" String',
                    container: '.idx3'
                })
            }
        }
    }
</script>
```
:::

### 更多自定义配置 {page=#/info-box}

:::demo 支持VNode，点击遮罩关闭，自定义延时关闭，配色主题，特殊状态自定义图标等
```html
<template>
    <bk-button theme="primary" @click="vnodeInfoBox">支持VNode</bk-button>
    <bk-button theme="primary" @click="maskCloseInfoBox">点击遮罩关闭</bk-button>
    <bk-button theme="primary" @click="escCloseInfoBox">ESC 关闭</bk-button>
    <bk-button theme="primary" @click="closeIconInfoBox">不显示右上角的 X</bk-button>
    <bk-button theme="primary" @click="colorfulInfoBox">配色主题</bk-button>
    <bk-button theme="primary" @click="customIconInfoBox">自定义图标</bk-button>
    <bk-button theme="primary" @click="customWidthInfoBox">自定义宽度</bk-button>
</template>

<script>
    import { bkButton } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton
        },
        methods: {
            vnodeInfoBox () {
                const h = this.$createElement

                this.$bkInfo({
                    title: '支持VNode的提示框',
                    subHeader: h('div', {
                        style: {
                            color: 'red'
                        }
                    }, 'Hello World')
                })
            },
            maskCloseInfoBox () {
                this.$bkInfo({
                    title: '点击遮罩关闭',
                    maskClose: true
                })
            },
            escCloseInfoBox () {
                this.$bkInfo({
                    title: 'ESC 关闭',
                    escClose: true
                })
            },
            closeIconInfoBox () {
                this.$bkInfo({
                    title: '不显示右上角的关闭 X',
                    closeIcon: false
                })
            },
            colorfulInfoBox () {
                this.$bkInfo({
                    title: '自定义配色',
                    subTitle: '配置theme字段，支持primary, info, success, warning, danger',
                    theme: 'success'
                })
            },
            customIconInfoBox () {
                this.$bkInfo({
                    type: 'success',
                    title: '操作成功',
                    subTitle: '继续>>',
                    icon: 'check-circle',
                    showFooter: false
                })
            },
            customWidthInfoBox () {
                this.$bkInfo({
                    type: 'success',
                    title: '自定义宽度800',
                    width: 800,
                    showFooter: false
                })
            }
        }
    }
</script>
```
:::

### 属性 {page=#/info-box}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| extCls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `.bk-dialog-wrapper`上 | String | —— | —— |
| width | 弹框的宽度，支持数字和百分比 | Number/String | —— | 400 |
| type | 消息框的类型，配置此属性后，可支持显示 icon 等 | String | success, warning, error, loading | '' |
| title | 消息框的标题 | String | —— | —— |
| subHeader | 消息框的二级标题（当 subHeader 与 subTitle 同时存在并且 subHeader 是 VNode 时，subHeader 的优先级高于 subTitle，否则 subTitle 优先级更高），可以用 vm.$createElement 函数生成模版 | String/VNode | —— | —— |
| subTitle | 消息框的二级标题（当 subHeader 与 subTitle 同时存在并且 subHeader 是 VNode 时，subHeader 的优先级高于 subTitle，否则 subTitle 优先级更高） | String | —— | —— |
| showFooter | 是否显示底部按钮 | boolean | —— | true |
| theme | 消息框主按钮的颜色 | String | primary, success, warning, danger | primary |
| maskClose | 是否允许点击遮罩关闭弹框 | boolean | —— | false |
| escClose | 是否允许 `esc` 按键关闭弹框 | boolean | —— | false |
| closeIcon | 是否显示右上角的关闭 icon，此属性为 false 时，`esc-close` 和 `mask-close` 会被强制设置为 `false`。 | boolean | —— | true |
| okText | 确定按钮的文字 | String | —— | —— |
| cancelText | 取消按钮的文字 | String | —— | —— |
| container | 控制弹框出现在什么容器内 | HTMLElement / VNode / String | —— | document.body |
| icon | 消息框状态的图标，使用TInsideicon | String | 参考[TInside ICON](ICON_URL) | —— |
| confirmLoading | 异步 confirmFn 确定按钮自动开启 loading | Boolean | —— | false |
| confirmFn | 确认按钮点击回调函数，支持异步函数，函数返回false可阻止弹窗关闭 | Function | —— | —— |
| cancelFn | 取消按钮点击回调函数 | Function | —— | —— |
| stateChangeFn | 弹框显示状态变化的回调函数 | Function | —— | —— |
| afterLeaveFn | 弹框消失的动画结束后触发的回调函数 | Function | —— | —— |
