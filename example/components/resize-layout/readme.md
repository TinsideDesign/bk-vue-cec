<script>
    import { bkResizeLayout, bkRadioGroup, bkRadioButton } from '@'

    export default {
        components: {
            bkResizeLayout,
            bkRadioGroup,
            bkRadioButton
        },
        data () {
            return {
                placement: 'left',
                immediate: false
            }
        },
        methods: {}
    }
</script>

[[toc]]

## ResizeLayout 可拉伸布局

通过拉伸侧栏调整布局大小

### 基础用法 {page=#/resize-layout}

:::demo 通过`placement`设置侧栏布局位置

```html
<template>
    <div>
        <bk-radio-group v-model="placement">
            <bk-radio-button value="left">left</bk-radio-button>
            <bk-radio-button value="right">right</bk-radio-button>
            <bk-radio-button value="top">top</bk-radio-button>
            <bk-radio-button value="bottom">bottom</bk-radio-button>
        </bk-radio-group>
        <bk-resize-layout :placement="placement" style="height: 500px;margin-top: 20px;">
            <div slot="aside">aside</div>
            <div slot="main">main</div>
        </bk-resize-layout>
    </div>
</template>
```
:::

### 实时拉伸 {page=#/resize-layout}

:::demo 设置`immediate`属性为`true`, 开启实时拉伸效果

```html
<template>
    <bk-resize-layout :immediate="true" style="height: 500px;">
        <div slot="aside">aside</div>
        <div slot="main">main</div>
    </bk-resize-layout>
</template>
```
:::

### 限制拉伸范围 {page=#/resize-layout}

:::demo 通过设置`min`, `max`, 控制拉伸范围

```html
<template>
    <bk-resize-layout :immediate="true" :min="50" :max="400" style="height: 500px;">
        <div slot="aside">aside</div>
        <div slot="main">main</div>
    </bk-resize-layout>
</template>
```
:::

### 最小化 {page=#/resize-layout}

:::demo 通过设置`auto-minimize`为`true`或具体的像素值(默认为`50`), 实现自动最小化

```html
<template>
    <bk-resize-layout :auto-minimize="true" style="height: 500px;">
        <div slot="aside">aside</div>
        <div slot="main">main</div>
    </bk-resize-layout>
</template>
```
:::

### 可折叠 {page=#/resize-layout}

:::demo 设置`collapsible`属性为`true`, 开启折叠功能

```html
<template>
    <bk-resize-layout :collapsible="true" style="height: 500px;">
        <div slot="aside">aside</div>
        <div slot="main">main</div>
    </bk-resize-layout>
</template>
```
:::

### 嵌套 {page=#/resize-layout}

:::demo 多层嵌套

```html
<template>
    <bk-resize-layout :collapsible="true" style="height: 500px;">
        <bk-resize-layout slot="aside" placement="top" :border="false" style="height: 100%">
            <div slot="aside">aside-top</div>
            <div slot="main">main-1</div>
        </bk-resize-layout>
        <bk-resize-layout slot="main" placement="bottom" :border="false" style="height: 100%">
            <div slot="aside">aside-bottom</div>
            <div slot="main">main-2</div>
        </bk-resize-layout>
    </bk-resize-layout>
</template>
```
:::

### bk-resize-layout 属性 {page=#/resize-layout}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| initial-divide | 初始化分隔侧栏大小 | String / Number | —— | 20% |
| placement | 侧栏在布局中的位置 | String | left / right / top / bottom | left |
| min | 侧栏最小像素宽度 | Number | —— | 100 |
| max | 侧栏最大像素宽度 | Number | —— | Inifinity |
| disabled | 是否禁用 | Boolean | true/false  | false  |
| immediate | 是否实时拉伸 | Boolean | true / false  | false  |
| collapsible | 是否开启折叠功能 | Boolean | true / false  | false  |
| auto-minimize | 是否自定最小化 | Boolean,Number | —— | false  |
| border | 是否显示外边框 | Boolean | true / false  | true  |
| ext-cls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM .bk-resize-layout 上 | String | —— | —— |

### bk-resize-layout 事件{page=#/resize-layout}
| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| before-resize | 拉伸前出发的回调 | event |
| resizing | 拉伸前出发的回调 | width/height |
| after-resize | 拉伸后触发的回调 | width/height |
| collapse-change | 展开/折叠状态变更事件 | collapsed |

### bk-resize-layout 插槽 {page=#/resize-layout}
| name | 说明 |
|---|---|
| aside | 侧栏内容 |
| main | 主要内容 |
| collapse-trigger | 替换折叠功能的触发器，自定义触发器时需要调用组件的setCollapse函数, 参数为折叠状态collapsed, 缺省时默认进行切换 |
