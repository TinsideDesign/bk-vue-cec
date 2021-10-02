<script>
    import Vue from 'vue'
    import { bkButton, bkPopconfirm } from '@'

    export default {
        components: {
            bkButton,
            bkPopconfirm
        },
        data () {
            return {}
        },
        methods: {
            confirm () {
                this.$bkMessage({
                    theme: 'success',
                    message: 'confirm'
                })
            }
        }
    }
</script>

<style lang="postcss" scoped>
    .demo-custom {
        font-size: 14px;
        line-height: 24px;
        color: #63656e;
        padding-bottom: 10px;
        .content-icon {
            color: #EA3636;
            position: absolute;
            top: 20px;
        }
        .content-text {
            display: inline-block;
            margin-left: 20px;
        }
    }
</style>

[[toc]]

## Popconfirm 弹出确认框

区别于使用模态的 Info 弹窗，弹出确认框是非模态的、符合就近原则的，尽量减少对流程的打断干扰

### 基础样式 {page=#/popconfirm}

:::demo `bkPopconfirm`是基于`bkPopover`改造而来，继承了`bkPopover`所有属性，具体请参考`bkPopover`文档，本文主要列出`bkPopconfirm`独有或不同的属性。基础样式由标题、正文和按钮构成。
```html
<template>
    <bk-popconfirm
        title="确认删除该脚本？"
        content="删除操作无法撤回，请谨慎操作！"
        @confirm="confirm">
        <bk-button>删除</bk-button>
    </bk-popconfirm>
</template>
<script>
    import { bkPopconfirm } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkPopconfirm
        },
        methods: {
            confirm () {
                this.$bkMessage({
                    theme: 'success',
                    message: 'confirm'
                })
            }
        }
    }
</script>
```
:::

### 简单样式 {page=#/popconfirm}

:::demo 简单样式由正文和按钮构成。
```html
<template>
    <bk-popconfirm
        content="删除结果数据时，将同时删除该结果数据下的所有样本曲线，请确认！"
        width="280"
        @confirm="confirm">
        <bk-button>删除</bk-button>
    </bk-popconfirm>
</template>
<script>
    import { bkPopconfirm } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkPopconfirm
        },
        methods: {
            confirm () {
                this.$bkMessage({
                    theme: 'success',
                    message: 'confirm'
                })
            }
        }
    }
</script>
```
:::

### 自定义样式 {page=#/popconfirm}

:::demo 自定义`slot`可以处理更复杂的样式。
```html
<template>
    <bk-popconfirm trigger="click" :ext-cls="'asadsadsads'" width="280">
        <div slot="content">
            <div class="demo-custom">
                <i class="bk-icon icon-info-circle-shape pr5 content-icon"></i>
                <div class="content-text">删除结果数据时，将同时删除该结果数据下的所有样本曲线！</div>
            </div>
        </div>
        <bk-button>删除</bk-button>
    </bk-popconfirm>
</template>
<script>
    import { bkPopconfirm } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkPopconfirm
        }
    }
</script>
<style lang="postcss" scoped>
    .demo-custom {
        font-size: 14px;
        line-height: 24px;
        color: #63656e;
        padding-bottom: 10px;
        .content-icon {
            color: #EA3636;
            position: absolute;
            top: 20px;
        }
        .content-text {
            display: inline-block;
            margin-left: 20px;
        }
    }
</style>
```
:::

### 属性 {page=#/popconfirm}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| title | 标题 | String | —— | —— |
| content | 正文 | String | —— | —— |
| trigger | 触发方式，与`bk-popover`配置相同 | String | click,focusin,mouseenter 等，参照[tippy文档](https://atomiks.github.io/tippyjs/v6/all-props/#trigger) | 'mouseenter focus' |
| confirm-text | 确认按钮文字 | String | — | — |
| cancel-text | 取消按钮文字 | String | — | — |
| ext-cls | 配置 **pop 弹层**自定义样式类名，传入的类会被加在 pop 弹层的 DOM `.tippy-popper` 上 | String | —— | —— |
| ext-popover-cls | 配置 **pop 弹层主内容区域**自定义样式类名，传入的类会被加在 pop 弹层主内容区域的 DOM `.bk-popconfirm-content` 上 | String | —— | —— |

### 事件 {page=#/popconfirm}
| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| confirm | 点击确定按钮触发的事件| —— |
| cancel | 点击取消按钮触发的事件 | —— |

### 插槽(slot) {page=#/popconfirm}
| 插槽名称 | 说明 |
|------|------|
| content | title部分的插槽 |
