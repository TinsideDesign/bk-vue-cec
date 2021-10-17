<script>
    import { bkAffix, bkButton } from '@'

    export default {
        components: {
            bkAffix,
            bkButton
        },
        methods: {
            change(status) {
                this.$bkMessage({
                    message: '当前状态' + status,
                    offsetY: 80
                })
            }
        }
    }
</script>
<style>
    #affix-demo.scrollable-container {
        height: 100px;
        overflow-y: scroll;
    }
    #affix-demo .background {
        padding-top: 60px;
        height: 300px;
        background-color: #9b9b9b;
    }
</style>

[[toc]]

## Affix 图钉

使用图钉，可以将内容固定在屏幕上，并且不随页面的滚动而滚动。

### 基础用法 {page=#/affix}

:::demo 不传值时：默认直接固定在最顶端

```html
<template>
    <bk-affix>
        <bk-button theme="primary">固定在顶部</bk-button>
    </bk-affix>
</template>
<script>
    import { bkAffix, bkButton } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkAffix,
            bkButton
        }
    }
</script>
```
:::

### 固定在顶部 {page=#/affix}
::: demo 设置`offset-top`属性

```html
<template>
    <bk-affix :offset-top="100">
        <bk-button theme="primary">固定在顶部100px</bk-button>
    </bk-affix>
</template>
<script>
    import {bkAffix, bkButton} from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkAffix,
            bkButton
        }
    }
</script>
```
:::

### 对象层级 {page=#/affix}
::: demo 设置`z-index`属性，设置affix对象的层级

```html
<template>
    <bk-affix :offset-top="200" :z-index="10">
        <bk-button theme="primary">固定在顶部200px，层级为10</bk-button>
    </bk-affix>
</template>
<script>
    import {bkAffix, bkButton} from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkAffix,
            bkButton
        }
    }
</script>
```
:::

### 固定在底部 {page=#/affix}
::: demo 设置`offset-bottom`属性, offset-top和offset-bottom只可以设置一个，如果都设置会使用offset-bottom
```html
<template>
    <bk-affix :offset-bottom="100">
        <bk-button theme="primary">固定在底部100px</bk-button>
    </bk-affix>
</template>
<script>
    import { bkAffix, bkButton } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkAffix,
            bkButton
        }
    }
</script>
```
:::

### 固定状态改变时的回调 {page=#/affix}
::: demo 设置`on-change`属性，固定状态改变时的回调
```html
<template>
    <bk-affix :offset-top="300" @change="change">
        <bk-button theme="primary">固定在顶部300px，固定状态改变时的回调</bk-button>
    </bk-affix>
</template>
<script>
    import { bkAffix, bkButton } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkAffix,
            bkButton
        },
        methods: {
            change(status) {
                this.$bkMessage({
                    message: '当前状态' + status,
                    offsetY: 80
                })
            }
        }
    }
</script>
```
:::

### 设置滚动容器 {page=#/affix}
::: demo 设置`target`属性，target为需要监听其滚动事件容器的id，默认为 window。
```html
<template>
    <div id="affix-demo" class="scrollable-container">
        <div class="background">
            <bk-affix :target="'#affix-demo'">
                <bk-button theme="primary">固定在target容器顶部位置</bk-button>
            </bk-affix>
        </div>
    </div>
</template>
<script>
    import { bkAffix, bkButton } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkAffix,
            bkButton
        },
        methods: {
            change(status) {
                this.$bkMessage({
                    message: '当前状态' + status,
                    offsetY: 80
                })
            }
        }
    }
</script>
<style>
    #affix-demo.scrollable-container {
        height: 100px;
        overflow-y: scroll;
    }
    #affix-demo .background {
        padding-top: 60px;
        height: 300px;
        background-color: #8f8f89;
        overflow: auto
    }
</style>
```
:::

### 属性 {page=#/alert}
| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| offset-top | 距离窗口顶部达到指定偏移量后触发 | Number| 0 |
| offset-bottom | 距离窗口底部达到指定偏移量后触发 | Number | - |
| z-index | 设置 affix 对象的层级 | Number | 1000 |
| target | 设置 affix 需要监听其滚动事件容器的id | String | window |

### 事件 {page=#/alert}
| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| change | 在固定状态发生改变时触发  | true/false |