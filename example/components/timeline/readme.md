<script>
    import { bkTimeline, bkButton, bkInput, bkContainer, bkCol, bkRow } from '@'

    export default {
        components: {
            bkTimeline,
            bkButton,
            bkInput,
            bkContainer,
            bkCol,
            bkRow
        },
        data () {
            const list = [
                { tag: '由pony上线到TInside市场 ', content: '<span class="timeline-update-time">2019-12-15 11:00</span>', size: 'large' },
                { tag: '由tony部署到生产环境并发布至应用市场', content: '<span class="timeline-update-time">2019-12-12 11:23</span>' },
                { tag: '由allen部署到预发布环境', content: '<span class="timeline-update-time">2019-12-12 10:20</span>' },
                { tag: '由allen上线到TInside市场', content: '<span class="timeline-update-time">2019-12-09 11:23</span>' }
            ]
            return {
                list,
                lineList: [
                    { tag: '一天前', content: '由pony上线到TInside市场', type: 'default' },
                    { tag: '16:59', content: '由tony部署到生产环境并发布至应用市场', type: 'primary' },
                    { tag: '一天前', content: '由allen部署到预发布环境', type: 'warning' },
                    { tag: '2天前', content: '由allen上线到TInside市场', type: 'success' },
                    { tag: '一周前', content: '由tony部署到生产环境并发布至应用市场', type: 'danger' }
                ],
                dataList: [
                    { tag: '一天前', content: '由<strong>pony</strong>上线到TInside市场' },
                    { tag: '16:59', content: '<div style="color: red;">由<strong>tony</strong>部署到生产环境并发布至应用市场</div>' },
                    { tag: '一天前', content: '由<strong>allen</strong>部署到预发布环境' },
                    { tag: '2天前', content: '<div>由<strong>allen</strong>上线到<span style="color: #3c96ff;">TInside市场</span></div>' },
                    { tag: '一周前', content: '由<strong>tony</strong>部署到<p style="color: #F95F5BD9">生产环境</p>并发布至<strong>应用市场</strong>' }
                ],
                timelineList: [
                    { tag: '一天前', content: '由<strong>pony</strong>上线到TInside市场' },
                    { tag: '16:59', content: '<div style="color: #F95F5BD9;">由<strong>tony</strong>部署到生产环境并发布至应用市场</div>' },
                    { tag: '一天前', content: '由<strong>allen</strong>部署到预发布环境' },
                    { tag: '2天前', content: '<div>由<strong>allen</strong>上线到<span style="color: #3c96ff;">TInside市场</span></div>' },
                    { tag: '一周前', content: '由<strong>tony</strong>部署到<p style="color: #F95F5BD9">生产环境</p>并发布至<strong>应用市场</strong>' },
                    {
                        tag: '10:56',
                        content: this.$createElement('p', {
                            style: {
                                color: 'red'
                            }
                        }, '由pony推广到市场')
                    },
                    {
                        tag: '18:57',
                        content: this.$createElement('p', {
                            style: {
                                color: 'blue'
                            }
                        }, '由allen宣传')
                    }
                ],
                statusList1: [
                    { tag: 'pony审批通过，并附“同意”', content: '<span class="timeline-update-time">2020-03-06 11:23</span>', color: 'green', filled: true },
                    { tag: 'tony审批通过，并附“同意”', content: '<span class="timeline-update-time">2020-03-07 10:20</span>', color: 'green', filled: true },
                    { tag: 'allen正在审批', color: 'blue', size: 'large' },
                    { tag: '等待mark审批' }
                ],
                statusList2: [
                    { tag: 'pony审批通过，并附“同意”', content: '<span class="timeline-update-time">2020-03-06 11:23</span>', color: 'green', filled: true },
                    { tag: 'tony审批通过，并附“同意”', content: '<span class="timeline-update-time">2020-03-07 10:20</span>', color: 'green', filled: true },
                    { tag: 'allen审批不通过，并附“不同意”', content: '<span class="timeline-update-time">2020-03-07 22:20</span>', color: 'red', size: 'large' },
                    { tag: '等待mark审批' }
                ],
                statusList3: [
                    { tag: 'pony审批通过，并附“同意”', content: '<span class="timeline-update-time">2020-03-06 11:23</span>', color: 'green', filled: true },
                    { tag: 'tony审批通过，并附“同意”', content: '<span class="timeline-update-time">2020-03-07 10:20</span>', color: 'green', filled: true },
                    { tag: 'allen暂停审批', content: '<span class="timeline-update-time">2020-03-07 10:20</span>', color: 'yellow', size: 'large' },
                    { tag: '等待mark审批' }
                ],
                customIconList1: [
                    { tag: 'pony审批通过，并附“同意”', content: '<span class="timeline-update-time">2020-03-06 11:23</span>', color: 'green', filled: true },
                    { tag: 'tony审批通过，并附“同意”', content: '<span class="timeline-update-time">2020-03-07 10:20</span>', color: 'green', filled: true },
                    {
                        tag: 'allen审批不通过，并附“不同意”',
                        content: '<span class="timeline-update-time">2020-03-07 22:20</span>',
                        color: 'red',
                        icon: this.$createElement('i', {
                            class: 'bk-icon icon-close-circle',
                            style: { color: 'red' }
                        })
                    },
                    { tag: '等待mark审批' }
                ],
                customIconList2: [
                    {
                        tag: '<b>管理员</b>',
                        content: '<div class="timeline-content"><p style="color: #63656e;">由pony上线到TInside市场</p><p><span class="timeline-update-time">2019-12-12 11:23</span></p></div>',
                        color: 'green',
                        filled: true
                    },
                    {
                        tag: '<b>组长</b>',
                        content: '<div class="timeline-content"><p style="color: #63656e;">由tony部署到生产环境并发布至应用市场</p><p><span class="timeline-update-time">2019-12-12 11:23</span></p></div>',
                        color: 'green',
                        filled: true
                    },
                    {
                        tag:'<b>总监</b>',
                        content: '由allen部署到预发布环境',
                        color: 'blue',
                        icon: 'image'
                    },
                    { tag: '<b>总经理</b>', content: '由allen上线到TInside市场' },
                ],
                moreList: [
                    { tag: '一天前', content: '由<strong>pony</strong>上线到TInside市场', color: 'green', filled: true },
                    {
                        tag: '10:56',
                        color: 'blue',
                        size: 'large',
                        content: this.$createElement(bkTimeline, {
                            props: {
                                list
                            }
                        })
                    },
                    { tag: '2天前', content: '<div>由<strong>allen</strong>上线到<span style="color: #3c96ff;">TInside市场</span></div>' },
                    {
                        tag: '18:57',
                        content: this.getInputContent()
                    },
                    { tag: '一周前', content: '由<strong>tony</strong>部署到<p style="color: #F95F5BD9">生产环境</p>并发布至<strong>应用市场</strong>' }
                ]
            }
        },
        methods: {
            select (data) {
                alert('选择了：' + data.tag)
            },
            dataSelect (data) {
                alert('选择了：' + data.tag)
            },
            selected (data) {
                alert('选择了：' + data.tag)
            },
            hasSelected (data) {
                alert('选择了：' + data.tag)
            },
            getInputContent () {
                return (
                    <div style="display: flex;">
                        <bk-input size="small" placeholder="请输入审批意见，非必填" />
                        <bk-button style="margin-left: 4px;" theme="primary" size="small">同意</bk-button>
                        <bk-button style="margin-left: 4px;" theme="default" size="small">驳回</bk-button>
                    </div>
                )
            }
        }
    }
</script>

<style lang="postcss">
    .timeline-update-time {
        font-size: 12px;
        color: #979ba5;
    }
    .timeline-content {
        p {
            margin-top: 0;
            margin-bottom: 8px;
        }
    }
    .timeline-custom-title {
        font-size: 12px;
        cursor: pointer;
    }
</style>

[[toc]]

## Timeline 时间轴

### 基础用法 {page=#/timeline}

:::demo 默认配置 `list`，`list` 为必传。可根据具体的应用场景，灵活地配置 `list.tag` 和 `list.content`，可以将时间作为标题，也可以作为内容的一部分。

```html
<template>
    <bk-timeline :list="list" @select="select"></bk-timeline>
</template>
<script>
    import { bkTimeline } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTimeline
        },
        data () {
            return {
                list: [
                    { tag: '由pony上线到TInside市场 ', content: '<span class="timeline-update-time">2019-12-15 11:00</span>', size: 'large' },
                    { tag: '由tony部署到生产环境并发布至应用市场', content: '<span class="timeline-update-time">2019-12-12 11:23</span>' },
                    { tag: '由allen部署到预发布环境', content: '<span class="timeline-update-time">2019-12-12 10:20</span>' },
                    { tag: '由allen上线到TInside市场', content: '<span class="timeline-update-time">2019-12-09 11:23</span>' }
                ]
            }
        },
        methods: {
            select (data) {
                alert('选择了：' + data.tag)
            }
        }
    }
</script>
<style lang="postcss">
    .timeline-update-time {
        font-size: 12px;
        color: #979ba5;
    }
</style>
```
:::

### 节点状态 {page=#/timeline}

:::demo 在 `list` 数据源中配置 `size` `color` `filled` 属性呈现不同状态。绿色代表成功/已完成，蓝色代表正在进行，红色代表错误/失败，黄色代表告警/暂停，灰色代表未开始。实心代表已完成。

```html
<template>
    <bk-container :col="12">
        <bk-row>
            <bk-col :span="4">
                <bk-timeline :list="statusList1"></bk-timeline>
            </bk-col>
            <bk-col :span="4">
                <bk-timeline :list="statusList2"></bk-timeline>
            </bk-col>
            <bk-col :span="4">
                <bk-timeline :list="statusList3"></bk-timeline>
            </bk-col>
        </bk-row>
    </bk-container>
</template>
<script>
    import { bkTimeline, bkContainer, bkCol, bkRow } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTimeline,
            bkContainer,
            bkCol,
            bkRow
        },
        data () {
            return {
                statusList1: [
                    { tag: 'pony审批通过，并附“同意”', content: '<span class="timeline-update-time">2020-03-06 11:23</span>', color: 'green', filled: true },
                    { tag: 'tony审批通过，并附“同意”', content: '<span class="timeline-update-time">2020-03-07 10:20</span>', color: 'green', filled: true },
                    { tag: 'allen正在审批', color: 'blue', size: 'large' },
                    { tag: '等待mark审批' }
                ],
                statusList2: [
                    { tag: 'pony审批通过，并附“同意”', content: '<span class="timeline-update-time">2020-03-06 11:23</span>', color: 'green', filled: true },
                    { tag: 'tony审批通过，并附“同意”', content: '<span class="timeline-update-time">2020-03-07 10:20</span>', color: 'green', filled: true },
                    { tag: 'allen审批不通过，并附“不同意”', content: '<span class="timeline-update-time">2020-03-07 22:20</span>', color: 'red', size: 'large' },
                    { tag: '等待mark审批' }
                ],
                statusList3: [
                    { tag: 'pony审批通过，并附“同意”', content: '<span class="timeline-update-time">2020-03-06 11:23</span>', color: 'green', filled: true },
                    { tag: 'tony审批通过，并附“同意”', content: '<span class="timeline-update-time">2020-03-07 10:20</span>', color: 'green', filled: true },
                    { tag: 'allen暂停审批', content: '<span class="timeline-update-time">2020-03-07 10:20</span>', color: 'yellow', size: 'large' },
                    { tag: '等待mark审批' }
                ]
            }
        }
    }
</script>
<style lang="postcss">
    .timeline-update-time {
        font-size: 12px;
        color: #979ba5;
    }
    .timeline-content {
        p {
            margin-top: 0;
            margin-bottom: 8px;
        }
    }
</style>
```
:::

### 自定义节点图标 {page=#/timeline}

:::demo 在 `list` 数据源中配置 `icon` 属性，支持 VNode。

```html
<template>
    <bk-container :col="12">
        <bk-row>
            <bk-col :span="6">
                <bk-timeline :list="customIconList1"></bk-timeline>
            </bk-col>
            <bk-col :span="6">
                <bk-timeline :list="customIconList2"></bk-timeline>
            </bk-col>
        </bk-row>
    </bk-container>
</template>
<script>
    import { bkTimeline, bkContainer, bkCol, bkRow} from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTimeline,
            bkContainer,
            bkCol,
            bkRow
        },
        data () {
            return {
                customIconList1: [
                    { tag: 'pony审批通过，并附“同意”', content: '<span class="timeline-update-time">2020-03-06 11:23</span>', color: 'green', filled: true },
                    { tag: 'tony审批通过，并附“同意”', content: '<span class="timeline-update-time">2020-03-07 10:20</span>', color: 'green', filled: true },
                    {
                        tag: 'allen审批不通过，并附“不同意”',
                        content: '<span class="timeline-update-time">2020-03-07 22:20</span>',
                        color: 'red',
                        icon: this.$createElement('i', {
                            class: 'bk-icon icon-close-circle',
                            style: { color: 'red' }
                        })
                    },
                    { tag: '等待mark审批' }
                ],
                customIconList2: [
                    {
                        tag: '<b>管理员</b>',
                        content: '<div class="timeline-content"><p style="color: #63656e;">由pony上线到TInside市场</p><p><span class="timeline-update-time">2019-12-12 11:23</span></p></div>',
                        color: 'green',
                        filled: true
                    },
                    {
                        tag: '<b>组长</b>',
                        content: '<div class="timeline-content"><p style="color: #63656e;">由tony部署到生产环境并发布至应用市场</p><p><span class="timeline-update-time">2019-12-12 11:23</span></p></div>',
                        color: 'green',
                        filled: true
                    },
                    {
                        tag:'<b>总监</b>',
                        content: '由allen部署到预发布环境',
                        color: 'blue',
                        icon: 'image'
                    },
                    { tag: '<b>总经理</b>', content: '由allen上线到TInside市场' },
                ]
            }
        }
    }
</script>
<style lang="postcss">
    .timeline-update-time {
        font-size: 12px;
        color: #979ba5;
    }
    .timeline-content {
        p {
            margin-top: 0;
            margin-bottom: 8px;
        }
    }
</style>
```
:::

### 节点样式可配置 {page=#/timeline}

:::demo 在 `list` 数据源中配置 `type` 属性（值可取 defult, primary, warning, success, danger），默认为 defult

```html
<template>
    <bk-timeline :list="lineList" @select="dataSelect">
    </bk-timeline>
</template>
<script>
    import { bkTimeline } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTimeline
        },
        data() {
            return {
                lineList: [
                    { tag: '一天前', content: '由pony上线到TInside市场', type: 'default' },
                    { tag: '16:59', content: '由tony部署到生产环境并发布至应用市场', type: 'primary' },
                    { tag: '一天前', content: '由allen部署到预发布环境', type: 'warning' },
                    { tag: '2天前', content: '由allen上线到TInside市场', type: 'success' },
                    { tag: '一周前', content: '由tony部署到生产环境并发布至应用市场', type: 'danger' }
                ]
            }
        },
        methods: {
            dataSelect (data) {
                alert('选择了：' + data.tag)
            }
        }
    }
</script>
```
:::

### 可配置 HTML 模板 {page=#/timeline}

:::demo 对 `list` 数据源中的 `content` 属性配置正确的 HTML 模板内容(注意：你的站点上动态渲染的任意 HTML 可能会非常危险，因为它很容易导致 XSS 攻击)

```html
<template>
    <bk-timeline :list="dataList" @select="selected">
    </bk-timeline>
</template>
<script>
    import { bkTimeline } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTimeline
        },
        data() {
            return {
                dataList: [
                    { tag: '一天前', content: '由<strong>pony</strong>上线到TInside市场' },
                    { tag: '16:59', content: '<div style="color: red;">由<strong>tony</strong>部署到生产环境并发布至应用市场</div>' },
                    { tag: '一天前', content: '由<strong>allen</strong>部署到预发布环境' },
                    { tag: '2天前', content: '<div>由<strong>allen</strong>上线到<span style="color: #3c96ff;">TInside市场</span></div>' },
                    { tag: '一周前', content: '由<strong>tony</strong>部署到<p style="color: #F95F5BD9">生产环境</p>并发布至<strong>应用市场</strong>' }
                ]
            }
        },
        methods: {
            selected (data) {
                alert('选择了：' + data.tag)
            }
        }
    }
</script>
```
:::

### 支持 VNode {page=#/timeline}

:::demo 对 `list` 数据源中的 `content` 属性配置 VNode

```html
<template>
    <bk-timeline :list="timelineList" @select="hasSelected">
    </bk-timeline>
</template>
<script>
    import { bkTimeline } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTimeline
        },
        data() {
            return {
                timelineList: [
                    { tag: '一天前', content: '由<strong>pony</strong>上线到TInside市场' },
                    { tag: '16:59', content: '<div style="color: #F95F5BD9;">由<strong>tony</strong>部署到生产环境并发布至应用市场</div>' },
                    { tag: '一天前', content: '由<strong>allen</strong>部署到预发布环境' },
                    { tag: '2天前', content: '<div>由<strong>allen</strong>上线到<span style="color: #3c96ff;">TInside市场</span></div>' },
                    { tag: '一周前', content: '由<strong>tony</strong>部署到<p style="color: #F95F5BD9">生产环境</p>并发布至<strong>应用市场</strong>' },
                    {
                        tag: '10:56',
                        content: this.$createElement('p', {
                            style: {
                                color: 'red'
                            }
                        }, '由pony推广到市场')
                    },
                    {
                        tag: '18:57',
                        content: this.$createElement('p', {
                            style: {
                                color: 'blue'
                            }
                        }, '由allen宣传')
                    }
                ]
            }
        },
        methods: {
            hasSelected (data) {
                alert('选择了：' + data.tag)
            }
        }
    }
</script>
```
:::

### 嵌套与输入框场景 {page=#/timeline}

:::demo 对 `list` 数据源中的 `content` 属性配置 VNode，实现出更多使用场景。嵌套的时间轴线条将自动变为虚线。

```html
<template>
    <bk-timeline :list="moreList">
    </bk-timeline>
</template>
<script>
    import { bkTimeline, bkButton, bkInput } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTimeline,
            bkButton,
            bkInput
        },
        data() {
            const list = [
                { tag: '一天前', content: '由pony上线到TInside市场' },
                { tag: '16:59', content: '由tony部署到生产环境并发布至应用市场' },
                { tag: '一天前', content: '由allen部署到预发布环境' },
                { tag: '2天前', content: '由allen上线到TInside市场' },
                { tag: '一周前', content: '由tony部署到生产环境并发布至应用市场' }
            ]
            return {
                moreList: [
                    { tag: '一天前', content: '由<strong>pony</strong>上线到TInside市场', color: 'green', filled: true },
                    {
                        tag: '10:56',
                        color: 'blue',
                        size: 'large',
                        content: this.$createElement(bkTimeline, {
                            props: {
                                list
                            }
                        })
                    },
                    { tag: '2天前', content: '<div>由<strong>allen</strong>上线到<span style="color: #3c96ff;">TInside市场</span></div>' },
                    {
                        tag: '18:57',
                        content: this.getInputContent()
                    },
                    { tag: '一周前', content: '由<strong>tony</strong>部署到<p style="color: #F95F5BD9">生产环境</p>并发布至<strong>应用市场</strong>' }
                ]
            }
        },
        methods: {
            getInputContent () {
                return (
                    <div style="display: flex;">
                        <bk-input size="small" placeholder="请输入审批意见，非必填" />
                        <bk-button style="margin-left: 4px;" theme="primary" size="small">同意</bk-button>
                        <bk-button style="margin-left: 4px;" theme="default" size="small">驳回</bk-button>
                    </div>
                )
            }
        }
    }
</script>
```
:::

### 支持 slot {page=#/timeline}

:::demo 使用具名 slot

```html
<template>
    <bk-timeline :list="list" @select="select">
        <template v-for="(item, index) in list">
            <div :key="index" :slot="`title${index}`"
                slot-scope="data"
                @click="select(data)"
                class="timeline-custom-title">
                <span>{{data.tag}}</span>
            </div>
        </template>
    </bk-timeline>
</template>
<script>
    import { bkTimeline } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTimeline
        },
        data () {
            return {
                list: [
                    { tag: '由pony上线到TInside市场 ', content: '<span class="timeline-update-time">2019-12-15 11:00</span>', size: 'large' },
                    { tag: '由tony部署到生产环境并发布至应用市场', content: '<span class="timeline-update-time">2019-12-12 11:23</span>' },
                    { tag: '由allen部署到预发布环境', content: '<span class="timeline-update-time">2019-12-12 10:20</span>' },
                    { tag: '由allen上线到TInside市场', content: '<span class="timeline-update-time">2019-12-09 11:23</span>' }
                ]
            }
        },
        methods: {
            select (data) {
                alert('选择了：' + data.tag)
            }
        }
    }
</script>
<style lang="postcss">
    .timeline-custom-title {
        font-size: 12px;
        cursor: pointer;
    }
</style>
```
:::

### 属性 {page=#/timeline}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| list | 时间轴数据源（必传）| Array | —— | —— |
| list[].tag | 标题（一般是时间标识）| String | —— | —— |
| list[].content | 内容| String/Object | —— | —— |
| list[].type | 节点样式 | String | default / primary / warning / success / danger | primary |
| list[].size | 节点大小 | String | large | —— |
| list[].color | 节点颜色 | String | blue / red / green / yellow / gray | gray |
| list[].icon | 节点图标，可使用[TInside ICON](ICON_URL)或者传入VNode自定义图标 | String/VNode | true / false | —— |
| list[].filled | 是否填充节点(实心) | Boolean | true / false | —— |
| ext-cls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `.bk-timeline` 上 | String | —— | —— |

### 事件 {page=#/timeline}
| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| select | 点击标题触发 | 相应点击项的数据data |

### 插槽 {page=#/sideslider}
| name | 说明 |
|---|---|
| `title${index}` | index为在list中的索引 |
