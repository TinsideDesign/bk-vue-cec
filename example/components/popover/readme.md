<script>
    import Vue from 'vue'
    import { bkButton, bkPopover } from '@'

    Vue.use(bkPopover)

    export default {
        components: {
            bkButton,
            bkPopover
        },
        data () {
            return {
                disabled: false,
                instance: null
            }
        },
        beforeDestroy () {
            this.instance && this.instance.destroy()
        },
        methods: {
            show () {
                alert('show')
            },
            hide () {
                alert('hide')
            },
            handleEnter (e) {
                this.instance = this.instance || this.$bkPopover(e.target, { content: 'hello world', arrow: true, placement: 'left' })
                this.instance.show(1000)
            },
            handleLeave (e) {
                this.instance && this.instance.hide(100)
            },
            hideRef (e) {
                this.$refs['popover'].hideHandler()
            },
            showRef () {
                this.$refs['popover'].showHandler()
            }
        }
    }
</script>

<style lang="postcss">
    .top,
    .bottom {
        position: relative;
        left: 80px;
    }
    .top div ~ div {
        margin-left: 10px;
    }
    .bottom div ~ div {
        margin-left: 10px;
    }
    .center {
        margin: 10px auto;
        position: relative;
    }
    .center-left {
        float: left;
        position: relative;
    }
    .center-right {
        position: relative;
        left: 260px;
    }
</style>

[[toc]]

## Popover 弹出框提示

当鼠标指向页面元素时给出简单的提示

### 基础用法 {page=#/popover}

:::demo 最简单的用法。`bkPopover` 内的文本使用了 `white-space: nowrap;`，即不自动换行，如需展示很多内容并自动换行时，建议给内容 `slot` 增加样式 `white-space: normal;`。
```html
<template>
    <bk-popover content="这里是提示文字">
        <div class="bk-text-primary f14">当鼠标经过这段文字时，会显示一个气泡框</div>
    </bk-popover>
</template>
<script>
    import { bkButton, bkPopover } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkPopover
        }
    }
</script>
```
:::

### 超长内容 {page=#/popover}

:::demo 通过自定义 `slot` 显示多行文本或更复杂的样式。
```html
<template>
    <bk-popover placement="top" width="500" :ext-cls="'aaaaaa'">
        <bk-button>超长</bk-button>
        <div slot="content" style="white-space: normal;">
            <div class="pt10 pb5 pl10 pr10">今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错</div>
        </div>
    </bk-popover>
</template>
<script>
    import { bkButton, bkPopover } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton,
            bkPopover
        },
        data () {
            return {
                disabled: false
            }
        }
    }
</script>
```
:::

### 超长内容并控制内容区宽度 {page=#/popover}

:::demo 通过自定义 `slot` 显示多行文本或更复杂的样式。
```html
<template>
    <bk-popover placement="top" width="300">
        <bk-button>超长</bk-button>
        <div slot="content" style="white-space: normal;">
            <div class="pt10 pb5 pl10 pr10">今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错</div>
        </div>
    </bk-popover>
</template>
<script>
    import { bkButton, bkPopover } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton,
            bkPopover
        }
    }
</script>
```
:::

### 不同位置 {page=#/popover}

:::demo 通过 `placement` 属性展示十二种方位的提示。

```html
<template>
    <div class="top">
        <bk-popover content="Top Left 文字提示" placement="top-start">
            <bk-button>上左</bk-button>
        </bk-popover>
        <bk-popover content="Top Center 文字提示" placement="top">
            <bk-button>上边</bk-button>
        </bk-popover>
        <bk-popover content="Top Right 文字提示" placement="top-end">
            <bk-button>上右</bk-button>
        </bk-popover>
    </div>
    <div class="center">
        <div class="center-left">
            <bk-popover content="Left Top 文字提示" placement="left-start">
                <bk-button>左上</bk-button>
            </bk-popover><br><br>
            <bk-popover content="Left Center 文字提示" placement="left">
                <bk-button>左边</bk-button>
            </bk-popover><br><br>
            <bk-popover content="Left Bottom 文字提示" placement="left-end">
                <bk-button>左下</bk-button>
            </bk-popover>
        </div>
        <div class="center-right">
            <bk-popover content="Right Top 文字提示" placement="right-start">
                <bk-button>右上</bk-button>
            </bk-popover><br><br>
            <bk-popover content="Right Center 文字提示" placement="right">
                <bk-button>右边</bk-button>
            </bk-popover><br><br>
            <bk-popover content="Right Bottom 文字提示" placement="right-end">
                <bk-button>右下</bk-button>
            </bk-popover>
        </div>
    </div>
    <div class="bottom">
        <bk-popover content="Bottom Left 文字提示" placement="bottom-start">
            <bk-button>下左</bk-button>
        </bk-popover>
        <bk-popover content="Bottom Center 文字提示" placement="bottom">
            <bk-button>下边</bk-button>
        </bk-popover>
        <bk-popover content="Bottom Right 文字提示" placement="bottom-end">
            <bk-button>下右</bk-button>
        </bk-popover>
    </div>
</template>
<script>
    import { bkButton, bkPopover } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton,
            bkPopover
        }
    }
</script>
<style lang="postcss">
    .top,
    .bottom {
        position: relative;
        left: 80px;
    }
    .top div ~ div {
        margin-left: 10px;
    }
    .bottom div ~ div {
        margin-left: 10px;
    }
    .center {
        margin: 10px auto;
        position: relative;
    }
    .center-left {
        float: left;
        position: relative;
    }
    .center-right {
        position: relative;
        left: 260px;
    }
</style>
```
:::

### 自定义内容 {page=#/popover}

:::demo 自定义 `slot` 显示多行文本或更复杂的样式。

```html
<template>
    <bk-popover placement="top">
        <bk-button>多行</bk-button>
        <div slot="content">
            <div class="bk-text-primary pt10 pb5 pl10 pr10">显示多行信息</div>
            <div class="bk-text-primary pt5 pb10 pl10 pr10"><i>可以自定义样式</i></div>
        </div>
    </bk-popover>
</template>
<script>
    import { bkButton, bkPopover } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton,
            bkPopover
        },
        data () {
            return {
                disabled: false
            }
        }
    }
</script>
```
:::


### 延时显示 {page=#/popover}

:::demo 设置属性 `delay` 延时显示文字提示，单位毫秒。
```html
<template>
    <bk-popover placement="top" content="文字提示" :delay="1000">
        <bk-button>延时1秒显示</bk-button>
    </bk-popover>
</template>
<script>
    import { bkButton, bkPopover } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton,
            bkPopover
        }
    }
</script>
```
:::

### 总是显示 {page=#/popover}

:::demo 设置属性 `always` 总是显示提示框
```html
<template>
    <bk-popover placement="right" content="文字提示" :always="true">
        <bk-button>总是显示</bk-button>
    </bk-popover>
</template>
<script>
    import { bkButton, bkPopover } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton,
            bkPopover
        }
    }
</script>
```
:::

### 自定义回调函数 {page=#/popover}

:::demo 自定义显示以及隐藏时的回调函数。
```html
<template>
    <bk-popover placement="bottom" content="文字提示" :on-show="show" :on-hide="hide">
        <bk-button>自定义回调函数</bk-button>
    </bk-popover>
</template>
<script>
    import { bkButton, bkPopover } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton,
            bkPopover
        },
        data () {
            return {
            }
        },
        methods: {
            show () {
                this.$bkMessage({
                    theme: 'success',
                    message: 'onShow'
                })
            },
            hide () {
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

### 使用Vue.prototype.$bkPopover自定义popver {page=#/popover}

:::demo 使用 Vue.prototype.$bkPopover 自定义 popver

```html

<template>
    <bk-button @mouseenter.native='handleEnter' @mouseleave.native='handleLeave'>测试$bkPopover</bk-button>
</template>
<script>
    import Vue from 'vue'
    import { bkButton, bkPopover } from '{{BASE_LIB_NAME}}'

    Vue.use(bkPopover)

    export default {
        components: {
            bkButton
        },
        data () {
            return {
                instance: null
            }
        },
        methods: {
            handleEnter (e) {
                this.instance = this.instance || this.$bkPopover(e.target, { content: 'hello world', arrow: true , placement: 'left'})
                this.instance.show(1000)
            },
            handleLeave (e) {
                this.instance && this.instance.hide(100)
            },
            beforeDestory () {
                this.instance && this.instance.destroy(true)
            }
        }
    }
</script>
```
:::

### 引用(ref) 方法 {page=#/popover}
| 参数 | 说明    |
| ---- | ------ |
| showHandler | 显示组件 popover.showHandler()
| hideHandler | 隐藏组件 popover.hideHandler()
:::demo 调用popover 方法

```html

<template>
    <div>
        <bk-popover ref="popover" placement="bottom" content="文字提示" :always="true">
            <bk-button>ref引用调用</bk-button>
        </bk-popover>
        <div class="mt15">
            <bk-button @click="showRef">显示</bk-button>
            <bk-button @click="hideRef">隐藏</bk-button>
        </div>
    </div>
</template>
<script>
    import { bkButton, bkPopover } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkButton,
            bkPopover
        },
        data () {
            return {
            }
        },
        methods: {
            hideRef (e) {
                this.$refs['popover'].hideHandler()
            },
            showRef(){
                this.$refs['popover'].showHandler()
            }
        }
    }
</script>
```
:::

### 属性 {page=#/popover}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| placement | 组件显示位置 | String | top, top-start, top-end, bottom, bottom-start, bottom-end, left, left-start, left-end, right, right-start, right-end | bottom |
| delay | 延迟显示，单位毫秒 | Number | —— | 0 |
| width | 提示框的内容容器的宽度 | Number, String | —— | 'auto' |
| max-width | 提示框的内容容器的最大宽度 | Number, String | —— | 'auto' |
| always | 是否总是可见 | Boolean | true, false | false |
| content | 显示的内容 | String | —— | '' |
| disabled | 是否禁用提示框 | Boolean | true, false | false |
| transfer | 将弹层放置于 document.body 内，使其不受父级样式影响，方便布局 | Boolean | true, false | false |
| on-show | 显示提示框时触发 | Function | —— | function () {} |
| on-hide | 隐藏提示框时触发 | Function | —— | function () {} |
| tippy-options | 更多的其他tippyjs参数参考[tippyjs参数](https://atomiks.github.io/tippyjs/v5/all-props/) | Object | —— | {} |
| ext-cls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `.tippy-popper` 上 | String | —— | —— |
| z-index | 弹出层的 `z-index` | Number | —— | 2500 |

### 全局使用$bkPopover自定义浮窗 {page=#/popover}

| 参数 | 说明    |
| ---- | ------ |
| Vue.prototype.$bkPopover | [tippyjs参数](https://atomiks.github.io/tippyjs/v5/all-props/) |
