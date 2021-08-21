<script>
    import { bkButton, bkDialog, bkInput, bkSideslider } from '@'
    export default {
        components: {
            bkButton,
            bkDialog,
            bkInput,
            bkSideslider
        },
        data () {
            return {
                exampleSetting1: {
                    primary: {
                        visible: false,
                        headerPosition: 'left'
                    },
                    directive: {
                        visible: false,
                        headerPosition: 'left'
                    }
                },
                exampleSetting2: {
                    custom1: {
                        visible: false,
                        position: {
                            top: 100
                        }
                    },
                    custom2: {
                        visible: false,
                        headerPosition: 'left',
                        okText: '按钮1',
                        cancelText: '按钮2',
                        headerPosition: 'left'
                    },
                    custom3: {
                        visible: false,
                        width: 480,
                        headerPosition: 'left'
                    },
                    custom4: {
                        visible: false,
                        width: 480,
                        headerPosition: 'left'
                    },
                    custom5: {
                        visible: false,
                        draggable: false,
                        headerPosition: 'left'
                    },
                    custom6: {
                        visible: false,
                        closeIcon: false,
                        headerPosition: 'left'
                    }
                },
                exampleSetting3: {
                    custom1: {
                        visible: false,
                        loading: false,
                        countdown: 3,
                        timer: null,
                        headerPosition: 'left'
                    }
                },
                exampleSetting4: {
                    fullscreen: true,
                    visible: false,
                },
                exampleSetting5: {
                    primary: {
                        visible: false,
                        headerPosition: 'left'
                    }
                },
                exampleSetting6: {
                    custom: {
                        visible: false,
                        headerPosition: 'left',
                        okText: '按钮1',
                        cancelText: '按钮2',
                        headerPosition: 'left',
                        sliderVisible: false
                    }
                }
            }
        },
        created () {
            this.lang = localStorage.getItem('lang') || 'zhCN'
        },
        methods: {
            confirm () {
                this.exampleSetting3.custom1.loading = true
                this.exampleSetting3.custom1.timer = setInterval(() => {
                    this.exampleSetting3.custom1.countdown -= 1
                    if (this.exampleSetting3.custom1.countdown === 0) {
                        this.exampleSetting3.custom1.visible = false
                        this.exampleSetting3.custom1.loading = false
                        clearInterval(this.exampleSetting3.custom1.timer)
                    }
                }, 1000)
            },
            cancel () {
                console.warn('cancel')
            },
            valueChange (val) {
                console.warn('valueChange', val)
                if (!val) {
                    clearInterval(this.exampleSetting3.custom1.timer)
                }
            },
            afterLeave () {
                console.warn('afterLeave')
                this.exampleSetting3.custom1.countdown = 3
            }
        }
    }
</script>

[[toc]]

## Dialog 对话框

可完全定制内容的弹框

:::exampleLink [更多示例](#/dialog/example)

### 基本用法 {page=#/dialog}

:::demo 默认配置的对话框。通过 `value` 设置弹框的显示与隐藏，支持 `v-model` 双向绑定。通过 `theme` 属性配置弹框中不同的主题确认按钮；通过 `maskClose` 配置是否允许点击遮罩关闭弹框，默认为 `true`。通过 `escClose` 配置是否启用 esc 按键关闭弹框，默认为 `true`。

```html
<template>
    <div>
        <bk-button theme="primary" @click="exampleSetting1.primary.visible = true">
            primary
        </bk-button>
        <bk-dialog v-model="exampleSetting1.primary.visible"
            theme="primary"
            :mask-close="false"
            :header-position="exampleSetting1.primary.headerPosition"
            title="这是标题">
            primary 主题，点击遮罩不会关闭弹框，esc 按键会关闭弹框
        </bk-dialog>
    </div>
</template>

<script>
    import { bkButton, bkDialog } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton,
            bkDialog
        },
        data () {
            return {
                exampleSetting1: {
                    primary: {
                        visible: false,
                        headerPosition: 'left'
                    }
                }
            }
        }
    }
</script>
```
:::

### v-if 指令 {page=#/dialog}

:::demo 通过 `render-directive` 设置弹框使用 `v-if` 还是 `v-show` 指令。`render-directive` 为 `if` 时，弹框通过 `v-if` 渲染即在弹框出现之前，页面**不会提前渲染弹框的 DOM 结构**；`render-directive` 为 `show` 时，弹框通过 `v-show` 渲染即在弹框出现之前，页面**会提前渲染弹框的 DOM 结构**。默认值为 `show`。

```html
<template>
    <div>
        <bk-button @click="exampleSetting1.directive.visible = true">
            v-if
        </bk-button>
        <bk-dialog v-model="exampleSetting1.directive.visible"
            :render-directive="'if'"
            :mask-close="false"
            :header-position="exampleSetting1.directive.headerPosition"
            title="这是标题">
            通过 v-if 渲染的。弹框消失后，页面不会有弹框的 DOM 结构
        </bk-dialog>
    </div>
</template>

<script>
    import { bkButton, bkDialog } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton,
            bkDialog
        },
        data () {
            return {
                exampleSetting1: {
                    directive: {
                        visible: false,
                        headerPosition: 'left'
                    }
                }
            }
        }
    }
</script>
```
:::

### 自定义内容以及弹框配置 {page=#/dialog}

:::demo 自定义设置弹框中展示的内容。通过 `width` 设置弹框的宽度，支持数字和百分比。通过 `showFooter` 配置是否显示 `footer`。通过 `footerPosition` 配置 `footer` 按钮的位置，支持 `left`, `center`, `right` 三个配置。通过不设置 `title` 和 `slot header` 可配置出无 `header` 的弹框。通过设置 `draggable` 属性来设置是否允许弹框拖拽。通过 `closeIcon` 属性设置是否显示右上角的关闭 icon，此属性为 true 时，`esc-close` 和 `mask-close` 会被强制设置为 `false`。

```html
<template>
    <div>
        <bk-button @click="exampleSetting2.custom1.visible = true" class="mr10">
            设置宽度
        </bk-button>
        <bk-dialog v-model="exampleSetting2.custom1.visible"
            width="720"
            :position="exampleSetting2.custom1.position"
            title="文本标题">
            <p>【首部及导言】</p>
            <p>欢迎您使用TI运维平台软件及服务。</p>
            <p>为使用TI运维平台软件（以下简称本软件）及服务，您应当阅读并遵守《TI运维平台软件许可及服务协议》（以下简称本协议），以及《腾讯服务协议》。请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款，以及开通或使用某项服务的单独协议，并选择接受或不接受。限制、免责条款可能以加粗形式提示您注意。</p>
            <p>除非您已阅读并接受本协议所有条款，否则您无权下载、安装或使用本软件及相关服务。您的下载、安装、使用、登录等行为即视为您已阅读并同意上述协议的约束。</p>
            <p>一、【协议的范围】</p>
            <p>1.1【协议适用主体范围】</p>
            <p>本协议是您与腾讯之间关于您下载、安装、使用、复制本软件，以及使用腾讯相关服务所订立的协议。</p>
            <p>1.2【协议关系及冲突条款】</p>
            <p>本协议被视为《腾讯服务协议》（链接地址:http://www.qq.com/contract.shtml，若链接地址变更的，则以变更后的链接地址所对应的内容为准；其他链接地址变更的情形，均适用前述约定。）的补充协议，是其不可分割的组成部分是其不可分割的组成部分。</p>
        </bk-dialog>

        <bk-button @click="exampleSetting2.custom2.visible = true" class="mr10">
            配置按钮文案
        </bk-button>
        <bk-dialog v-model="exampleSetting2.custom2.visible"
            :header-position="exampleSetting2.custom2.headerPosition"
            :ok-text="exampleSetting2.custom2.okText"
            :cancel-text="exampleSetting2.custom2.cancelText"
            :header-position="exampleSetting2.custom2.headerPosition"
            title="描述">
            配置按钮文案
        </bk-dialog>

        <bk-button @click="exampleSetting2.custom3.visible = true" class="mr10">
            自定义内容1
        </bk-button>
        <bk-dialog v-model="exampleSetting2.custom3.visible" title="填写名称"
            :header-position="exampleSetting2.custom3.headerPosition"
            :width="exampleSetting2.custom3.width">
            <bk-input :placeholder="'文字个数不超过8个汉字'" style="margin-bottom: 15px;">
            </bk-input>
        </bk-dialog>

        <bk-button @click="exampleSetting2.custom4.visible = true" class="mr10">
            自定义内容2
        </bk-button>
        <bk-dialog v-model="exampleSetting2.custom4.visible" title="描述"
            :header-position="exampleSetting2.custom4.headerPosition"
            :width="exampleSetting2.custom4.width">
            <bk-input :placeholder="'文字个数不超过8个汉字'" :type="'textarea'"
                :rows="5" style="margin-bottom: 15px;">
            </bk-input>
        </bk-dialog>

        <bk-button  @click="exampleSetting2.custom5.visible = true" class="mr10">
            不允许拖拽
        </bk-button>
        <bk-dialog v-model="exampleSetting2.custom5.visible"
            :header-position="exampleSetting2.custom5.headerPosition"
            :draggable="exampleSetting2.custom5.draggable">
            <p slot="header">文本标题</p>
            不允许拖拽
        </bk-dialog>

        <bk-button  @click="exampleSetting2.custom6.visible = true" class="mr10">
            不显示关闭 icon
        </bk-button>
        <bk-dialog v-model="exampleSetting2.custom6.visible"
            :header-position="exampleSetting2.custom6.headerPosition"
            :close-icon="exampleSetting2.custom6.closeIcon">
            <p slot="header">文本标题</p>
            不显示关闭 icon
        </bk-dialog>
    </div>
</template>

<script>
    import { bkButton, bkDialog, bkInput } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton,
            bkDialog,
            bkInput
        },
        data () {
            return {
                exampleSetting2: {
                    custom1: {
                        visible: false,
                        position: {
                            top: 100
                        }
                    },
                    custom2: {
                        visible: false,
                        headerPosition: 'left',
                        okText: '按钮1',
                        cancelText: '按钮2'
                    },
                    custom3: {
                        visible: false,
                        width: 480,
                        headerPosition: 'left'
                    },
                    custom4: {
                        visible: false,
                        width: 480,
                        headerPosition: 'left'
                    },
                    custom5: {
                        visible: false,
                        draggable: false,
                        headerPosition: 'left'
                    },
                    custom6: {
                        visible: false,
                        closeIcon: false,
                        headerPosition: 'left'
                    }
                }
            }
        }
    }
</script>
```
:::

### 异步 {page=#/dialog}

:::demo 通过 `loading` 属性配置异步关闭效果，开启则需手动设置`value`来关闭对话框。

```html
<template>
    <div>
        <bk-button @click="exampleSetting3.custom1.visible = true">
            异步关闭
        </bk-button>
        <bk-dialog v-model="exampleSetting3.custom1.visible"
            :header-position="exampleSetting3.custom1.headerPosition"
            :loading="exampleSetting3.custom1.loading"
            @confirm="confirm"
            @cancel="cancel"
            @value-change="valueChange"
            @after-leave="afterLeave"
            title="文本标题">
            点击确定后 {{exampleSetting3.custom1.countdown}} 秒关闭
        </bk-dialog>
    </div>
</template>
<script>
    import { bkButton, bkDialog } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton,
            bkDialog
        },
        data () {
            return {
                exampleSetting3: {
                    custom1: {
                        visible: false,
                        loading: false,
                        countdown: 3,
                        headerPosition: 'left',
                        timer: null
                    }
                }
            }
        },
        methods: {
            confirm () {
                this.exampleSetting3.custom1.loading = true
                this.exampleSetting3.custom1.timer = setInterval(() => {
                    this.exampleSetting3.custom1.countdown -= 1
                    if (this.exampleSetting3.custom1.countdown === 0) {
                        this.exampleSetting3.custom1.visible = false
                        this.exampleSetting3.custom1.loading = false
                        clearInterval(this.exampleSetting3.custom1.timer)
                    }
                }, 1000)
            },
            cancel () {
                console.warn('cancel')
            },
            valueChange (val) {
                console.warn('valueChange', val)
                if (!val) {
                    clearInterval(this.exampleSetting3.custom1.timer)
                }
            },
            afterLeave () {
                console.warn('afterLeave')
                this.exampleSetting3.custom1.countdown = 3
            }
        }
    }
</script>
```

:::

### 全屏弹框 {page=#/dialog}

:::demo 通过 `fullscreen` 属性配置全屏弹框，当设置为全屏弹框时，`draggable` 配置不生效即弹框不能拖动。

```html
<template>
    <div>
        <bk-button @click="exampleSetting4.visible = true">
            全屏弹框
        </bk-button>
        <bk-dialog v-model="exampleSetting4.visible"
            :fullscreen="exampleSetting4.fullscreen"
            title="全屏弹框标题">
            <p>【首部及导言】</p>
            <p>欢迎您使用TI运维平台软件及服务。</p>
            <p>为使用TI运维平台软件（以下简称本软件）及服务，您应当阅读并遵守《TI运维平台软件许可及服务协议》（以下简称本协议），以及《腾讯服务协议》。请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款，以及开通或使用某项服务的单独协议，并选择接受或不接受。限制、免责条款可能以加粗形式提示您注意。</p>
            <p>除非您已阅读并接受本协议所有条款，否则您无权下载、安装或使用本软件及相关服务。您的下载、安装、使用、登录等行为即视为您已阅读并同意上述协议的约束。</p>
            <p>一、【协议的范围】</p>
            <p>1.1【协议适用主体范围】</p>
            <p>本协议是您与腾讯之间关于您下载、安装、使用、复制本软件，以及使用腾讯相关服务所订立的协议。</p>
            <p>1.2【协议关系及冲突条款】</p>
            <p>本协议被视为《腾讯服务协议》（链接地址:http://www.qq.com/contract.shtml，若链接地址变更的，则以变更后的链接地址所对应的内容为准；其他链接地址变更的情形，均适用前述约定。）的补充协议，是其不可分割的组成部分是其不可分割的组成部分。</p>
        </bk-dialog>
    </div>
</template>

<script>
    import { bkButton, bkDialog } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkButton,
            bkDialog
        },
        data () {
            return {
                exampleSetting4: {
                    fullscreen: true,
                    visible: false
                }
            }
        }
    }
</script>
```
:::

### 嵌套弹框 {page=#/dialog}

:::demo 通过`multi-instance` 配置是否嵌套弹框同时存在，默认为 true，多个弹框叠加， 设置为 false 只保留最后一个, 如果需要在弹出框内部嵌套侧栏，请设置 sideslider `transfer="true"`

```html
<template>
    <div>
        <bk-button theme="primary" @click="exampleSetting5.primary.visible = true">
            primary
        </bk-button>
        <bk-dialog v-model="exampleSetting5.primary.visible"
            theme="primary"
            :mask-close="false"
            title="这是标题">
            primary 主题，点击遮罩不会关闭弹框，esc 按键会关闭弹框
                <bk-button @click="exampleSetting6.custom.visible = true" class="mr10">
                    打开嵌套弹窗
                </bk-button>
                <bk-dialog v-model="exampleSetting6.custom.visible"
                    :header-position="exampleSetting6.custom.headerPosition"
                    :ok-text="exampleSetting6.custom.okText"
                    :cancel-text="exampleSetting6.custom.cancelText"
                    :header-position="exampleSetting6.custom.headerPosition"
                    title="描述">
                    配置按钮文案
                </bk-dialog>
                <bk-button :type="'primary'" @click="exampleSetting6.custom.sliderVisible = true">打开侧滑弹窗</bk-button>
                <bk-sideslider :transfer="true" :is-show.sync="exampleSetting6.custom.sliderVisible" :quick-close="true">
                    <div slot="content">
                        如果需要在弹出框内部嵌套侧栏，请设置 sideslider transfer="true"
                    </div>
                </bk-sideslider>
        </bk-dialog>
    </div>
</template>
<script>
    import { bkButton, bkDialog, bkSideslider } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton,
            bkDialog,
            bkSideslider
        },
        data () {
            return {
                exampleSetting5: {
                    primary: {
                        visible: false,
                        headerPosition: 'left'
                    }
                },
                exampleSetting6: {
                    custom: {
                        visible: false,
                        headerPosition: 'left',
                        okText: '按钮1',
                        cancelText: '按钮2',
                        sliderVisible: false
                    }
                }
            }
        }
    }
</script>
```
:::

### 属性 {page=#/dialog}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| value | 是否显示弹框，支持 `v-model` 双向绑定 | Boolean | —— | false |
| title | 弹框的标题，不设置 `title` 和 `slot header` 可配置出无 `header` 的弹框 | String | —— | —— |
| render-directive | 弹框的渲染方式 | Boolean | `if` / `show` | `show` |
| ok-text | 确定按钮的文字 | String | —— | —— |
| cancel-text | 取消按钮的文字 | String | —— | —— |
| theme | 颜色 按钮类型 | String | `primary`, `success`, `warning`, `danger` | `primary` |
| position | 设置层的位置，接收 `top`, `left` 两个属性。 | Object | —— | —— |
| width | 弹框的宽度，支持数字和百分比 | Number/String | —— | 400 |
| show-mask | 是否允许出现遮罩 | Boolean | —— | true |
| mask-close | 是否允许点击遮罩关闭弹框 | Boolean | —— | true |
| close-icon | 是否显示右上角的关闭 icon，此属性为 false 时，`esc-close` 和 `mask-close` 会被强制设置为 `false`。 | Boolean | —— | true |
| esc-close | 是否允许 `esc` 按键关闭弹框 | Boolean | —— | true |
| fullscreen | 是否全屏弹框，当设置全屏弹框时，`draggable` 属性无效 | Boolean | —— | false |
| header-position | 显示 `header` 的位置 | String |  `left`, `center` | `center` |
| show-footer | 是否显示 `footer` | Boolean | —— | true |
| footer-position | 显示 `footer` 的位置 | String |  `left`, `center`, `right` | `right` |
| draggable | 是否允许弹框拖拽，当设置全屏弹框时，`draggable` 属性无效 | Boolean | —— | true |
| scrollable | 弹框出现时，是否允许页面滚动 | Boolean | true / false | false |
| transfer | 控制弹框是否出现在 body 内 | Boolean | true / false | true |
| auto-close | 点击确认时是否自动关闭弹窗 | Boolean | true / false | true |
| on-close | 点击取消时触发的回调方法，参数是`Dialog`的`this对象` | Function | —— | —— |
| confirm-fn | 点击确认时触发的回调方法，参数是`Dialog`的`this对象` | Function | —— | —— |
| ext-cls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `.bk-dialog-wrapper`上 | String | —— | —— |


### 事件 {page=#/dialog}
| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| confirm | 点击确定按钮触发的事件| —— |
| cancel | 点击取消按钮触发的事件，主动调用关闭才会触发，通过改变双向绑定的值关闭弹框时不会触发 | —— |
| value-change | 弹框显示状态变化的回调函数 | —— |
| after-leave | 弹框消失的动画结束后触发的回调函数 | —— |

### 插槽(slot) {page=#/dialog}
| 插槽名称 | 说明 |
|------|------|
| 匿名插槽 | 没有名字的插槽，会被渲染到dialog的主体上 |
| header | title部分的插槽，dialog头部区域 |
| footer | 确认和取消按钮部分的插槽，dialog底部区域 |
| tools | 工具栏插槽，顶部区域 |
