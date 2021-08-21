<script>
    import Vue from 'vue'
    import { bkButton, bkTooltips } from '@'

    Vue.use(bkTooltips)

    export default {
        components: {
            bkButton
        },
        data () {
            return {
                seconds: 5,
                longConfig: {
                    onShow (instance) {
                        console.log('instance', instance)
                    },
                    width: 240,
                    placement: 'right-start',
                    content: '鼠标移入显示移出消失，浮层不承载复杂文本和操作。'
                },
                htmlConfig: {
                    allowHtml: true,
                    width: 240,
                    trigger: 'click',
                    theme: 'light',
                    content: '#demo-html1',
                    placement: 'right-start',
                    onShow: () => {
                        // this.seconds = 5
                        // let timer = setInterval(() => {
                        //     this.seconds--
                        //     console.log(this.seconds)
                        //     if (this.seconds <= 0) {
                        //         clearInterval(timer)
                        //     }
                        // }, 1000)
                    }
                },
                baseUsage: {
                    left: {
                        content: '提示信息',
                        html: '<div style="color: cyan">html content</div>',
                        showOnInit: true,
                        placements: ['left']
                    },
                    right: {
                        content: '提示信息',
                        showOnInit: true,
                        placements: ['right']
                    },
                    top: {
                        content: '提示信息',
                        showOnInit: true,
                        placements: ['top']
                    },
                    topStart: {
                        content: '提示信息',
                        showOnInit: true,
                        placements: ['top-start']
                    },
                    topEnd: {
                        content: '提示信息',
                        showOnInit: true,
                        placements: ['top-end']
                    },
                    bottom: {
                        content: '提示信息',
                        showOnInit: true,
                        placements: ['bottom']
                    },
                    bottomStart: {
                        content: '提示信息',
                        showOnInit: true,
                        placements: ['bottom-start']
                    },
                    bottomEnd: {
                        content: '提示信息',
                        showOnInit: true,
                        placements: ['bottom-end']
                    }
                },
                themeUsage: {
                    light: {
                        content: 'light 主题',
                        theme: 'light',
                        duration: 0
                    },
                    dark: {
                        content: '默认 dark 主题1',
                        html: '<div style="color:red">12312</div>'
                    }
                },
                titleUsage: {
                    title: '这是 title',
                    content: '这是 content'
                },
                listenerConfig: {
                    onShow: this.onShow,
                    onClose: this.onClose,
                    content: '这是内容'
                }
            }
        },
        methods: {
            onShow () {
                this.$bkMessage({
                    theme: 'success',
                    message: 'onShow'
                })
            },
            onClose () {
                this.$bkMessage({
                    theme: 'error',
                    message: 'onClose'
                })
            },
            confirm (event) {
                this.seconds++
            },
            cancel (event) {
                this.$refs.tooltipsHtml._tippy.hide()
            }
        }
    }
</script>

<style lang="postcss">
    .tooltips-demo {
        width: 480px;
        height: 212px;
        position: relative;

        span {
            position: absolute;
            color: #006DFF;
            font-size: 18px;
            cursor: pointer;
            width: 18px;
            height: 30px;
            text-align: center;
            line-height: 34px;
        }

        .top-start {
            left: 116px;
            top: 67px;
        }

        .top-middle {
            left: 239px;
            top: 67px;
        }

        .top-end {
            left: 362px;
            top: 67px;
        }

        .right {
            left: 362px;
            top: 95px;
        }

        .bottom-end {
            left: 362px;
            top: 123px;
        }

        .bottom-middle {
            left: 239px;
            top: 123px;
        }

        .bottom-start {
            left: 116px;
            top: 123px;
        }

        .left {
            left: 116px;
            top: 95px;
        }
    }

    .demo-html1 {
        p {
            font-size: 14px;
            line-height: 19px;
            color: #63656E;
            margin: 0;
            padding: 7px 0;
        }
        div {
            text-align: right;
        }
    }
</style>

[[toc]]

## Tooltips 工具提示 （指令）

当鼠标指向页面元素时给出简单的提示

<!-- :::exampleLink [更多示例](#/tooltips/example) -->

### 基础用法（通过绑定对象来配置） {page=#/tooltips}
:::demo 通过指令配置简单的 tooltips
```html
<template>
    <div class="tooltips-demo">
        <span v-bk-tooltips="baseUsage.topStart" class="top-start">
            <i class="bk-icon icon-info-circle-shape"></i>
        </span>
        <span v-bk-tooltips="baseUsage.top" class="top-middle">
            <i class="bk-icon icon-info-circle-shape"></i>
        </span>
        <span v-bk-tooltips="baseUsage.topEnd" class="top-end">
            <i class="bk-icon icon-info-circle-shape"></i>
        </span>
        <span v-bk-tooltips="baseUsage.right" class="right">
            <i class="bk-icon icon-info-circle-shape"></i>
        </span>
        <span v-bk-tooltips="baseUsage.bottomEnd" class="bottom-end">
            <i class="bk-icon icon-info-circle-shape"></i>
        </span>
        <span v-bk-tooltips="baseUsage.bottom" class="bottom-middle">
            <i class="bk-icon icon-info-circle-shape"></i>
        </span>
        <span v-bk-tooltips="baseUsage.bottomStart" class="bottom-start">
            <i class="bk-icon icon-info-circle-shape"></i>
        </span>
        <span v-bk-tooltips="baseUsage.left" class="left">
            <i class="bk-icon icon-info-circle-shape"></i>
        </span>
    </div>
</template>
<script>
    import Vue from 'vue'
    import { bkTooltips } from '{{BASE_LIB_NAME}}'

    Vue.use(bkTooltips)

    export default {
        data () {
            return {
                baseUsage: {
                    left: {
                        content: '提示信息',
                        html: '<div style="color: cyan">html content</div>',
                        showOnInit: true,
                        placements: ['left']
                    },
                    right: {
                        content: '提示信息',
                        showOnInit: true,
                        placements: ['right']
                    },
                    top: {
                        content: '提示信息',
                        showOnInit: true,
                        placements: ['top']
                    },
                    topStart: {
                        content: '提示信息',
                        showOnInit: true,
                        placements: ['top-start']
                    },
                    topEnd: {
                        content: '提示信息',
                        showOnInit: true,
                        placements: ['top-end']
                    },
                    bottom: {
                        content: '提示信息',
                        showOnInit: true,
                        placements: ['bottom']
                    },
                    bottomStart: {
                        content: '提示信息',
                        showOnInit: true,
                        placements: ['bottom-start']
                    },
                    bottomEnd: {
                        content: '提示信息',
                        showOnInit: true,
                        placements: ['bottom-end']
                    }
                }
            }
        }
    }
</script>
```
:::

### 基础用法（通过指令配置） {page=#/tooltips}
:::demo 通过绑定对象来配置 tooltips
```html
<template>
    <div class="tooltips-demo">
        <span v-bk-tooltips.top-start="'提示信息'" class="top-start">
            <i class="bk-icon icon-info-circle-shape"></i>
        </span>
        <span v-bk-tooltips.top="'提示信息'" class="top-middle">
            <i class="bk-icon icon-info-circle-shape"></i>
        </span>
        <span v-bk-tooltips.top-end="'提示信息'" class="top-end">
            <i class="bk-icon icon-info-circle-shape"></i>
        </span>
        <span v-bk-tooltips.right="'提示信息'" class="right">
            <i class="bk-icon icon-info-circle-shape"></i>
        </span>
        <span v-bk-tooltips.bottom-end="'提示信息'" class="bottom-end">
            <i class="bk-icon icon-info-circle-shape"></i>
        </span>
        <span v-bk-tooltips.bottom="'提示信息'" class="bottom-middle">
            <i class="bk-icon icon-info-circle-shape"></i>
        </span>
        <span v-bk-tooltips.bottom-start="'提示信息'" class="bottom-start">
            <i class="bk-icon icon-info-circle-shape"></i>
        </span>
        <span v-bk-tooltips.left="'提示信息'" class="left">
            <i class="bk-icon icon-info-circle-shape"></i>
        </span>
    </div>
</template>
<script>
    import Vue from 'vue'
    import { bkTooltips } from '{{BASE_LIB_NAME}}'

    Vue.use(bkTooltips)

    export default {
        data () {
            return {}
        }
    }
</script>
```
:::


### 多行文字 {page=#/tooltips}
:::demo 长内容通过设置 `width` 属性来控制组件的宽度。`width` 默认值为 `auto`。
```html
<template>
    <a class="bk-text-danger f14" v-bk-tooltips="longConfig">长内容</a>
</template>
<script>
    import Vue from 'vue'
    import { bkTooltips } from '{{BASE_LIB_NAME}}'

    Vue.use(bkTooltips)

    export default {
        data () {
            return {
                longConfig: {
                    onShow (instance) {
                        console.log('instance', instance)
                    },
                    width: 240,
                    placement: 'right-start',
                    content: '鼠标移入显示移出消失，浮层不承载复杂文本和操作。'
                }
            }
        }
    }
</script>
```
:::


### HTML 模版 {page=#/tooltips}
:::demo 长内容通过设置 `width` 属性来控制组件的宽度。`width` 默认值为 `auto`。
```html
<template>
    <div id="demo-html1" class="demo-html1">
        <p>鼠标移入显示移出消失，浮层不承载复杂文本和操作。{{seconds}}</p>
        <div>
            <bk-button :text="true" title="primary" @click="confirm">+1</bk-button>
            <bk-button :text="true" title="primary" @click="cancel">关闭</bk-button>
        </div>
    </div>
    <a class="bk-text-danger f14" v-bk-tooltips="htmlConfig" ref="tooltipsHtml">显示模版本内容</a>
</template>
<script>
    import Vue from 'vue'
    import { bkButton, bkTooltips } from '{{BASE_LIB_NAME}}'

    Vue.use(bkTooltips)

    export default {
        components: {
            bkButton
        },
        data () {
            return {
                seconds: 5,
                htmlConfig: {
                    allowHtml: true,
                    width: 240,
                    trigger: 'click',
                    theme: 'light',
                    content: '#demo-html1',
                    placement: 'right-start',
                    onShow: () => {
                        // this.seconds = 5
                        // let timer = setInterval(() => {
                        //     this.seconds--
                        //     console.log(this.seconds)
                        //     if (this.seconds <= 0) {
                        //         clearInterval(timer)
                        //     }
                        // }, 1000)
                    }
                }
            }
        },
        methods: {
            confirm (event) {
                this.seconds++
            },
            cancel (event) {
                this.$refs.tooltipsHtml._tippy.hide()
            }
        }
    }
</script>
```
:::


### 点击触发 {page=#/tooltips}
:::demo 通过给 `v-bk-tooltips` 配置 `click` 修饰符来设置点击触发 tooltips
```html
<template>
    <div class="f14">
        <a v-bk-tooltips.click="titleUsage" class="bk-text-danger mr15">click me</a>
    </div>
</template>
<script>
    import Vue from 'vue'
    import { bkTooltips } from '{{BASE_LIB_NAME}}'

    Vue.use(bkTooltips)

    export default {
        data () {
            return {
                titleUsage: {
                    title: '这是 title',
                    content: '这是 content'
                }
            }
        }
    }
</script>
```
:::



### 不同主题 {page=#/tooltips}
:::demo 通过配置 `theme` 属性来设置主题，支持 `dark`, `light` 两种配置，默认为 `dark`。
```html
<template>
    <div class="tooltips-demo">
        <a v-bk-tooltips="'默认 dark 主题'" class="bk-text-danger mr15">指令（dark）</a>
        <a v-bk-tooltips.light="'light 主题'" class="bk-text-danger mr15">指令（light）</a>
        <a v-bk-tooltips="themeUsage.dark" class="bk-text-danger mr15">对象（dark）</a>
        <a v-bk-tooltips="themeUsage.light" class="bk-text-danger mr15">对象（light）</a>
    </div>
</template>
<script>
    import Vue from 'vue'
    import { bkTooltips } from '{{BASE_LIB_NAME}}'

    Vue.use(bkTooltips)

    export default {
        data () {
            return {
                themeUsage: {
                    light: {
                        content: 'light 主题',
                        theme: 'light',
                        duration: 0
                    },
                    dark: {
                        content: '默认 dark 主题1',
                        html: '<div style="color:red">12312</div>'
                    }
                }
            }
        }
    }
</script>
```
:::

### 监听显示和隐藏 {page=#/tooltips}
:::demo 设置 `onShow` 和 `onClose` 方法来监听组件的显示和隐藏回调
```html
<template>
    <a class="bk-text-danger f14" v-bk-tooltips="listenerConfig">监听</a>
</template>
<script>
    import Vue from 'vue'
    import { bkTooltips } from '{{BASE_LIB_NAME}}'

    Vue.use(bkTooltips)

    export default {
        data () {
            return {
                listenerConfig: {
                    onShow: this.onShow,
                    onClose: this.onClose,
                    content: '这是内容'
                }
            }
        },
        methods: {
            onShow () {
                this.$bkMessage({
                    theme: 'success',
                    message: 'onShow'
                })
            },
            onClose () {
                this.$bkMessage({
                    theme: 'error',
                    message: 'onClose'
                })
            }
        }
    }
</script>
```
:::

### 属性 {page=#/tooltips}
| 参数 | 说明    | 类型      | 可选值       | 默认值   |
| ---- | ------ | --------- | ----------- | -------- |
| content | 提示信息内容 | String | —— | —— |
| html | 提示信息内容，可配置 html 字符串，当此配置存在时，`content` 配置会失效 | String | —— | —— |
| showOnInit | 是否在初始化时默认显示 | Boolean | `true` / `false` | `false` |
| width | 设置 tip 的宽度 | Number | -- | 自适应 |
| theme | 主题颜色 | String | `dark` / `light` | `dark` |
| placement | 设置组件显示的位置 | String | `auto-start`, `auto`, `auto-end`, `top-start`, `top`, `top-end`, `right-start`, `right`, `right-end`, `bottom-end`, `bottom`, `bottom-start`, `left-end`, `left`, `left-start` | `top` |
| placements | 设置组件显示的位置，设置为数组，数组里的项表示组件显示位置的优先级，会结合页面的大小以及位置来自动计算 | Array | `auto-start`, `auto`, `auto-end`, `top-start`, `top`, `top-end`, `right-start`, `right`, `right-end`, `bottom-end`, `bottom`, `bottom-start`, `left-end`, `left`, `left-start` | `[top]` |
| trigger | 触发方式 | String | `mouseenter`, `mouseover`, `click` | `mouseenter` |
| delay | 延迟的时间，毫秒。如果是数组，那么数组第一项表示出现的延迟时间，第二项表示消失的延迟时间；如果是数字，那么出现和消失都是这个延迟时间 | Array/Number | -- | `[0, 20]` |
| duration | 动画的时间，毫秒。延迟的时间，毫秒。如果是数组，那么数组第一项表示出现的动画的持续时间，第二项表示消失的动画持续时间；如果是数字，那么出现和消失的动画持续时间都是这个时间 | Array/Number | —— | `0` |
| distance | tip 出现于触发节点的距离，参照 `placement` 的方向 | Number | -- | 10 |
| appendTo | 设置 tip 出现在哪个节点上，本参数要设置为 `Function`，返回要设置的 dom 节点 | Function | -- | () => document.body |
| zIndex | 设置 tip 的 z-index | Number | -- | 9999 |
| onShow | tip 显示时的回调函数 | Function | -- | -- |
| onShown | tip 显示完成的回调函数 | Function | -- | -- |
| onHide / onClose | tip 消失时的回调函数 | Function | -- | -- |
| onHidden | tip 消失完成的回调函数 | Function | -- | -- |
| extCls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `.tippy-popper` 上 | String | —— | —— |
| disabled | 是否禁用tooltips | Boolean | —— | —— |
| allowHtml | 确定是否将内容字符串解析为HTML而不是文本 | Boolean | `true` / `false` | false |

