<script>
    import { bkTab, bkTabPanel, bkButton } from '@'

    export default {
        components: {
            bkTab,
            bkTabPanel,
            bkButton
        },
        data () {
            return {
                panels: [
                    { name: 'mission', label: '任务报表', count: 10 },
                    { name: 'config', label: '加速配置', count: 20 },
                    { name: 'hisitory', label: '历史版本', count: 30 },
                    { name: 'deleted', label: '已归档加速任务', count: 40 }
                ],
                active: 'mission',
                type: ['card', 'border-card', 'unborder-card'],
                tabPositions: ['left', 'right', 'top'],
                currentPosition: 'left',
                currentType: 'card',
                sortType: 'replace'
            }
        },
        methods: {
            toggleType () {
                const currentIndex = this.type.indexOf(this.currentType)
                const nextIndex = (currentIndex + 1) % 3
                this.currentType = this.type[nextIndex]
            },
            togglePosition () {
                const currentIndex = this.tabPositions.indexOf(this.currentPosition)
                const nextIndex = (currentIndex + 1) % 3
                this.currentPosition = this.tabPositions[nextIndex]
            },
            addPanel () {
                const name = Math.random()
                this.panels.push({
                    name,
                    label: '新标签页',
                    count: 50
                })
                this.active = name
            },
            closePanel (index, panel) {
                this.panels.splice(index, 1)
            },
            beforeToggle () {
                return window.confirm('确定要切换选项卡吗')
            },
            sortChange (draggingIndex, dropIndex) {
                console.log('sortChange')
                console.log(draggingIndex, dropIndex)
            },
        }
    }
</script>

<style lang="postcss">
    .panel-icon,
    .panel-name,
    .panel-count {
        display: inline-block;
        vertical-align: middle;
        margin: 0 3px;
    }
    .panel-count {
        min-width: 16px;
        height: 16px;
        padding: 0 4px ;
        line-height: 16px;
        border-radius: 8px;
        text-align: center;
        font-style: normal;
        font-size: 12px;
        color: #fff;
        background-color: #C4C6CC;
    }
    .setting-icon {
        display: inline-block;
        vertical-align: top;
        margin: 17px;
        cursor: pointer;
    }
</style>

[[toc]]

## Tab 选项卡

### 基础用法 {page=#/tab}

:::demo 通过配置 `active` 属性，设置默认显示子面板

```html
<template>
    <bk-tab :active.sync="active" type="unborder-card">
        <bk-tab-panel
            v-for="(panel, index) in panels"
            v-bind="panel"
            :key="index">
        </bk-tab-panel>
    </bk-tab>
</template>
<script>
    import { bkTab, bkTabPanel } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTab,
            bkTabPanel
        },
        data () {
            return {
                panels: [
                    { name: 'mission', label: '任务报表', count: 10 },
                    { name: 'config', label: '加速配置', count: 20 },
                    { name: 'hisitory', label: '历史版本', count: 30 },
                    { name: 'deleted', label: '已归档加速任务', count: 40 }
                ],
                active: 'mission'
            }
        }
    }
</script>
```
:::

### 选项卡样式 {page=#/tab}

:::demo 通过配置 `type` 属性，设置选项卡样式。支持的属性有 `card`, `border-card`, `unborder-card`, `vertical-card`

```html
<template>
    <div>
        <bk-button @click="toggleType">切换样式</bk-button>
        <bk-tab :active.sync="active" :type="currentType" style="margin-top: 20px;">
            <bk-tab-panel
                v-for="(panel, index) in panels"
                v-bind="panel"
                :key="index">
            </bk-tab-panel>
        </bk-tab>
    </div>
</template>
<script>
    import { bkTab, bkTabPanel, bkButton } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTab,
            bkTabPanel,
            bkButton
        },
        data () {
            return {
                panels: [
                    { name: 'mission', label: '任务报表', count: 10 },
                    { name: 'config', label: '加速配置', count: 20 },
                    { name: 'hisitory', label: '历史版本', count: 30 },
                    { name: 'deleted', label: '已归档加速任务', count: 40 }
                ],
                active: 'mission',
                type: ['card', 'border-card', 'unborder-card', 'vertical-card'],
                currentType: 'card'
            }
        },
        methods: {
            toggleType () {
                const currentIndex = this.type.indexOf(this.currentType)
                const nextIndex = (currentIndex + 1) % 3
                this.currentType = this.type[nextIndex]
            }
        }
    }
</script>
```

:::

### 选项卡位置 {page=#/tab}

:::demo 通过配置 `tab-position` 属性，设置选项卡位置。支持的属性有 `left`, `right`, `top`。当 `tab-position` 属性配置为 `left` 和 `right` 时，`addable` 属性以及 `closable` 属性无效。


```html
<template>
    <div>
        <bk-button @click="togglePosition">切换位置</bk-button>
        <bk-tab :active.sync="active" style="margin-top: 20px;" :tab-position="currentPosition">
            <bk-tab-panel
                v-for="(panel, index) in panels"
                v-bind="panel"
                :key="index">
            </bk-tab-panel>
        </bk-tab>
    </div>
</template>
<script>
    import { bkTab, bkTabPanel, bkButton } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTab,
            bkTabPanel,
            bkButton
        },
        data () {
            return {
                panels: [
                    { name: 'mission', label: '任务报表', count: 10 },
                    { name: 'config', label: '加速配置', count: 20 },
                    { name: 'hisitory', label: '历史版本', count: 30 },
                    { name: 'deleted', label: '已归档加速任务', count: 40 }
                ],
                active: 'mission',
                tabPositions: ['left', 'right', 'top']
                currentPosition: 'left'
            }
        },
        methods: {
            togglePosition () {
                const currentIndex = this.tabPositions.indexOf(this.currentPosition)
                const nextIndex = (currentIndex + 1) % 3
                this.currentPosition = this.tabPositions[nextIndex]
            }
        }
    }
</script>
```
:::

### 可增删的选项卡 {page=#/tab}

:::demo 配置 `addable` 属性可动态添加选项卡；配置 `closable` 可以动态删除选项卡

```html
<template>
    <bk-tab addable closable
        :active.sync="active"
        :type="currentType"
        @add-panel="addPanel"
        @close-panel="closePanel">
        <bk-tab-panel
            v-for="(panel, index) in panels"
            v-bind="panel"
            :key="index">
        </bk-tab-panel>
    </bk-tab>
</template>
<script>
    import { bkTab, bkTabPanel } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTab,
            bkTabPanel
        },
        data () {
            return {
                panels: [
                    { name: 'mission', label: '任务报表', count: 10 },
                    { name: 'config', label: '加速配置', count: 20 },
                    { name: 'hisitory', label: '历史版本', count: 30 },
                    { name: 'deleted', label: '已归档加速任务', count: 40 }
                ],
                active: 'mission',
                type: ['card', 'border-card', 'unborder-card', 'vertical-card'],
                currentType: 'card'
            }
        },
        methods: {
            addPanel () {
                const name = Math.random()
                this.panels.push({
                    name,
                    label: '新标签页',
                    count: 50
                })
                this.active = name
            },
            closePanel (index, panel) {
                this.panels.splice(index, 1)
            }
        }
    }
</script>
```
:::

### 自定义选项卡内容 {page=#/tab}

:::demo 通过使用 slot 自定义选项卡内容

```html
<template>
    <bk-tab :active.sync="active">
        <bk-tab-panel
            v-for="(panel, index) in panels"
            v-bind="panel"
            :key="index">
            <template slot="label">
                <i class="panel-icon bk-icon icon-cog-shape"></i>
                <span class="panel-name">{{panel.name}}</span>
                <i class="panel-count">{{panel.count}}</i>
            </template>
        </bk-tab-panel>
    </bk-tab>
</template>
<script>
    import { bkTab, bkTabPanel, bkButton } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTab,
            bkTabPanel,
            bkButton
        },
        data () {
            return {
                panels: [
                    { name: 'mission', label: '任务报表', count: 10 },
                    { name: 'config', label: '加速配置', count: 20 },
                    { name: 'hisitory', label: '历史版本', count: 30 },
                    { name: 'deleted', label: '已归档加速任务', count: 40 }
                ],
                active: 'mission'
            }
        }
    }
</script>

<style lang="postcss">
    .panel-icon,
    .panel-name,
    .panel-count {
        display: inline-block;
        vertical-align: middle;
        margin: 0 3px;
    }
    .panel-count {
        min-width: 16px;
        height: 16px;
        padding: 0 4px ;
        line-height: 16px;
        border-radius: 8px;
        text-align: center;
        font-style: normal;
        font-size: 12px;
        color: #fff;
        background-color: #C4C6CC;
    }
</style>
```
:::

### 扩展配置 {page=#/tab}
:::demo 通过使用slot扩展选项卡功能

```html
<template>
    <bk-tab :active.sync="active">
        <template slot="setting">
            <i class="setting-icon bk-icon icon-cog-shape"></i>
        </template>
        <bk-tab-panel
            v-for="(panel, index) in panels"
            v-bind="panel"
            :key="index">
        </bk-tab-panel>
    </bk-tab>
</template>
<script>
    import { bkTab, bkTabPanel, bkButton } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTab,
            bkTabPanel,
            bkButton
        },
        data () {
            return {
                panels: [
                    { name: 'mission', label: '任务报表', count: 10 },
                    { name: 'config', label: '加速配置', count: 20 },
                    { name: 'hisitory', label: '历史版本', count: 30 },
                    { name: 'deleted', label: '已归档加速任务', count: 40 }
                ],
                active: 'mission'
            }
        }
    }
</script>
<style lang="postcss">
    .setting-icon {
        display: inline-block;
        vertical-align: top;
        margin: 17px;
        cursor: pointer;
    }
</style>
```
:::

### 可滚动的卡片 {page=#/tab}

:::demo 当选项卡过多时，可以滚动

```html
<template>
    <bk-tab>
        <bk-tab-panel
            v-for="n in 50"
            :name="n"
            :label="`Tab-${n}`"
            :key="n">
        </bk-tab-panel>
    </bk-tab>
</template>
<script>
    import { bkTab, bkTabPanel } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTab,
            bkTabPanel
        },
        data () {
            return {
            }
        }
    }
</script>
```
:::

### 切换前调用钩子函数的选项卡 {page=#/tab}

:::demo 在选项卡切换前，通过设置 `before-toggle` 属性，调用钩子函数(支持异步函数)，可以阻止选项卡的切换

```html
<template>
    <bk-tab :before-toggle="beforeToggle">
        <bk-tab-panel
            v-for="n in 50"
            :name="n"
            :label="`Tab-${n}`"
            :key="n">
        </bk-tab-panel>
    </bk-tab>
</template>
<script>
    import { bkTab, bkTabPanel } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTab,
            bkTabPanel
        },
        data () {
            return {
            }
        },
        methods: {
            beforeToggle () {
                return window.confirm('确定要切换选项卡吗')
            }
        }
    }
</script>
```
:::
### 拖拽排序 {page=#/tab}

:::demo sortType 为replace时，为交换位置；为jump时，为插入当前位置。bk-tab :sortable="true" 。tab 可拖拽排序。bk-tab-panel :unsortable="ture",此选项不可排序

```html

<template>
    <div>
        <div class="mb15">
            <bk-button @click="sortType === 'replace' ? sortType='insert' : sortType='replace'">修改排序方式</bk-button>
            <span class="ml30">sortType:{{sortType}}</span>
        </div>
        <bk-tab :sortable="true" @sort-change="sortChange" :sort-type="sortType" :active.sync="active" type="unborder-card">
            <bk-tab-panel
              v-for="(panel, index) in panels"
              v-bind="panel"

              :key="index">
                <div>{{panel.label}}-{{panel.count}}</div>
            </bk-tab-panel>
        </bk-tab>
    </div>
</template>
<script>
import { bkTab, bkTabPanel, bkButton } from '{{BASE_LIB_NAME}}'
export default {
    components: {
        bkTab,
        bkTabPanel,
        bkButton
    },
    data() {
        return {
            panels: [
                { name: 'mission', label: '任务报表', count: 10 },
                { name: 'config', label: '加速配置', count: 20 },
                { name: 'deleted', label: '已归档加速任务', count: 40 }
            ],
            sortType: 'replace'
        }
    },
    methods: {
        sortChange(draggingIndex, dropIndex) {
            console.log('sortChange')
            console.log(draggingIndex, dropIndex)
        },
    }
}
</script>
```
:::

:::exampleLink [更多示例](#/tabExample)

### bk-tab 选项卡属性 {page=#/tab}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| active | 当前显示的选项卡名称，支持`sync`修饰符 | —— | —— | —— |
| type | 选项卡样式 | String | `card` / `border-card` / `unborder-card` | `border-card` |
| tab-position | 选项卡位置 | String | `left` / `right` / `top` | `top` |
| closable | 是否可关闭选项卡 | Boolean | `true` / `false` | `false` |
| addable | 是否可新增选项卡 | Boolean | `true` / `false` | `false` |
| sortable | 标签是否可拖拽排序 | Boolean | `true` / `false` | `false` |
| sort-type | 标签拖拽排序的方式 | Boolean | `replace(交互位置)` / `insert(插入)` | `replace` |
| label-height | 选项卡label的高度 | Number | —— | 50 |
| scroll-step | 可滚动时，每次滚动的像素 | Number | —— | 200 |
| before-toggle | 切换选项卡前的钩子函数, 支持异步函数 | Function(panelName, panelInstance) | —— | —— |
| ext-cls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `.bk-tab` 上 | String | —— | —— |
| validate-active | 是否校验ActiveName，true：如果active匹配不到，默认激活第一个Tab，触发tab-change；false：active匹配不到不显示 | Boolean | `true` / `false` | `true` |
| show-header | 是否显示选项卡头部 | Boolean | `true` / `false` | `true` |
| change-on-hover | 鼠标悬停tab时进行切换 | Boolean | `true` / `false` | `false` |
| change-on-hover-delay | 鼠标悬停切换tab的延时，单位为毫秒 | Number | —— | `1000` |

### bk-tab 选项卡事件 {page=#/tab}
| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| tab-change | 选项卡切换时调用 | name |
| close-panel | 关闭选项卡时调用 | index, panel |
| add-panel | 新增选项卡时调用 | —— |
| sort-change | 标签拖动交互位置后调用 | dragTabIndex（拖动的tab的index）,dropTabIndex |
| on-drag-tab | 标签拖动时调用 | dragTabIndex,dragEvent|

### bk-tab 选项卡插槽 {page=#/tab}
| name | 说明 |
|---|---|
| setting | 插入至选项卡右上角的扩展内容 |

### bk-tab-panel 选项卡面板属性 {page=#/tab}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| name | 选项卡唯一标识 | —— | —— | —— |
| label | 选项卡默认显示的文本 | —— | —— | —— |
| render-label | 用于自定义选项卡label的内容的渲染函数，此配置优先级比`label`插槽更高 | Function(h, name) | —— | —— |
| closable | 是否可关闭选项卡，设置此属性后，`bk-tab` 上的 `closable` 属性将不会作用于该 `bk-tab-panel` | Boolean | `true` / `false` | `false` |
| visible | 是否显示选项卡 | Boolean | `true` / `false` | `true` |
| disabled | 选项卡是否禁用 | Boolean | `true` / `false` | `false` |
| sortable | 选项卡标签是否可拖拽排序 | Boolean | `true` / `false` | `true` |
| render-directive | 切换面板时的渲染方式 | String | `if` / `show` | `show` |

### bk-tab-panel 选项卡面板插槽 {page=#/tab}
| name | 说明 |
|---|---|
| label | 替换默认显示的选项卡文案的内容，当内容需要动态改变时，请选择使用`render-label`配置 |
