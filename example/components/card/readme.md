<script>
    import { bkCard } from '@'

    export default {
        components: {
            bkCard
        },
        data () {
            return {
                title: '卡片标题',
                icons: ['icon-right-shape', 'icon-down-shape'],
                status: false
            }
        },
        methods: {
            saveEdit (title) {
                console.log(title)
            }
        }
    }
</script>
<style>
    .demo-block.demo-card .card-demo {
        width: 400px;
        display: inline-block;
        float: left;
        margin-right: 20px;
        .bk-card {
            margin-bottom: 20px;
        }
        .foot-main {
            width: 100%;
            height: 100%;
            background: #fafbfd;
            color: #979ba5;
            span {
                display: inline-block;
                width: 33.3%;
                line-height: 50px;
                float: left;
                text-align: center;
                font-size: 18px;
            }
            span:hover {
                background: #f0f1f5;
                color: #63656e;
                cursor: pointer;
            }
        }
        .bk-card-body {
            p {
                margin-top: 0;
                margin-bottom: 10px;
                &:last-child {
                    margin-bottom: 0;
                }
            }
        }
    }
</style>

[[toc]]

## Card 卡片

卡片是一种容器，可以将信息聚合展示。

### 基础用法 {page=#/card}

:::demo 通过配置`footer`插槽，自定义 Card 中底部内容 的展示。同理使用`header`插槽， 可自定义 Card 中顶部内容展示

```html
<template>
    <div class="card-demo">
        <bk-card title="卡片标题">
            <p>卡片内容 1</p>
            <p>卡片内容 2</p>
            <p>卡片内容 3</p>
        </bk-card>
    </div>
    <div class="card-demo">
        <bk-card title="卡片标题" :show-foot="true" :show-head="false">
            <p>卡片内容 1</p>
            <p>卡片内容 2</p>
            <p>卡片内容 3</p>
            <div slot="footer" class="foot-main">
                <span><i class="bk-icon icon-dialogue"></i></span>
                <span><i class="bk-icon icon-cog"></i></span>
                <span><i class="bk-icon icon-delete"></i></span>
            </div>
        </bk-card>
    </div>
</template>
<script>
    import { bkCard } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkCard
        }
    }
</script>
<style lang="postcss">
    .card-demo {
        width: 400px;
        display: inline-block;
        float: left;
        margin-right: 20px;
    }
    .foot-main {
        width: 100%;
        height: 100%;
        background: #fafbfd;
        color: #979ba5;
        span {
            display: inline-block;
            width: 33.3%;
            line-height: 50px;
            float: left;
            text-align: center;
            font-size: 18px;
        }
        span:hover {
            background: #f0f1f5;
            color: #63656e;
            cursor: pointer;
        }
    }
    .bk-card-body {
        p {
            margin-top: 0;
            margin-bottom: 10px;
            &:last-child {
                margin-bottom: 0;
            }
        }
    }
</style>
```
:::

### 内嵌卡片 {page=#/card}
:::demo

```html
<template>
    <div class="card-demo">
        <bk-card title="卡片标题" :border="false">
           <bk-card title="卡片标题">
                <p>卡片内容 1</p>
                <p>卡片内容 2</p>
                <p>卡片内容 3</p>
            </bk-card>
            <bk-card title="卡片标题">
                <p>卡片内容 1</p>
                <p>卡片内容 2</p>
                <p>卡片内容 3</p>
            </bk-card>
        </bk-card>
    </div>
</template>
<script>
    import { bkCard } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkCard
        }
    }
</script>
<style lang="postcss">
    .card-demo {
        width: 400px;
        display: inline-block;
        float: left;
        margin-right: 20px;
    }
    .bk-card-body {
        p {
            margin-top: 0;
            margin-bottom: 10px;
            &:last-child {
                margin-bottom: 0;
            }
        }
    }
</style>
```
:::
### 卡片 - 展开收起 {page=#/card}
:::demo 通过配置`is-collapse`属性为`true`即可开启展开&收起功能； `collapse-icons`可自定义展开&收起的icons，如`['icon-right-shape', 'icon-down-shape']`； `collapse-status`可配置默认展开或收起，支持`sync`数据同步设置

```html
<template>
    <div class="card-demo">
        <bk-card title="卡片标题" :is-collapse="true" :collapse-icons="icons">
            <p>卡片内容 1</p>
            <p>卡片内容 2</p>
            <p>卡片内容 3</p>
        </bk-card>
    </div>
    <div class="card-demo">
        <bk-card title="卡片标题" :is-collapse="true" :position="'right'" :collapse-status.sync="status">
            <p>卡片内容 1</p>
            <p>卡片内容 2</p>
            <p>卡片内容 3</p>
        </bk-card>
    </div>
</template>
<script>
    import { bkCard } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkCard
        },
        data () {
            return {
                icons: ['icon-right-shape', 'icon-down-shape'],
                status: false
            }
        }
    }
</script>
<style lang="postcss">
    .card-demo {
        width: 400px;
        display: inline-block;
        float: left;
        margin-right: 20px;
    }
    .bk-card-body {
        p {
            margin-top: 0;
            margin-bottom: 10px;
            &:last-child {
                margin-bottom: 0;
            }
        }
    }
</style>
```
:::

### 编辑标题 {page=#/card}
:::demo 通过配置`isEdit`属性为`true`即可开启标题功能，enter或失焦保存

```html
<template>
    <div class="card-demo">
        <bk-card :title="title" :is-edit="true" @edit="saveEdit">
            <p>卡片内容 1</p>
            <p>卡片内容 2</p>
            <p>卡片内容 3</p>
        </bk-card>
    </div>
</template>
<script>
    import { bkCard } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkCard
        },
        data () {
            return {
                title: '卡片标题',
                icons: ['icon-right-shape', 'icon-down-shape']
            }
        },
        methods: {
            saveEdit (title) {
                console.log(title)
            }
        }
    }
</script>
<style lang="postcss">
    .card-demo {
        width: 400px;
        display: inline-block;
        float: left;
        margin-right: 20px;
    }
    .bk-card-body {
        p {
            margin-top: 0;
            margin-bottom: 10px;
            &:last-child {
                margin-bottom: 0;
            }
        }
    }
</style>
```
:::


### 属性 {page=#/card}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| title | 卡片标题 | String | - | - |
| is-collapse | 是否支持展开&收起 | Boolean | true/false | false |
| collapse-icons | 支持自定义展开 & 收起的icon | Array | - | ['icon-down-shape', 'icon-up-shape'] |
| collapse-status | 展开 & 收起状态 | Boolean | true/false | true |
| position | 展开icon的显示位置 | String | left/right | left |
| showHead | 是否显示头部 | Boolean | true/false | true |
| showFoot | 是否显示底部 | Boolean | true/false | false |
| isEdit | 是否启用编辑标题功能 | Boolean | true/false | false |
| border | 是否显示边框 | Boolean | true/false | true |

### 插槽 {page=#/card}
| name | 说明 |
|------|------|
| header |可用该插槽，自定义 Card 中顶部内容 的展示|
|——|匿名作用域插槽, 自定义 Card 中间内容的展示|
| footer |可用该插槽，自定义 Card 中底部内容 的展示|

### 事件 {page=#/card}
| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| edit | 编辑标题事件  | title |
