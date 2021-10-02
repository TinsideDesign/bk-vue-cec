<script>
    import { bkCollapse, bkCollapseItem } from '@'
    export default {
        components: {
            bkCollapse,
            bkCollapseItem
        },
        data () {
            return {
                isShow: false,
                activeName: ['1'],
                activeNameDisabled: ['1', '2']
            }
        },
        methods: {
            handlerClick (activeName) {
                alert(activeName)
            },

            handleAfterLeave () {
                alert('after-leave')
            },

            handleBeforeEnter () {
                alert('before-enter')
            }
        }
    }
</script>

<style lang="postcss">
    .no-trigger-area {
        flex: 1;
        .no-trigger-text {
            margin-left: 10px;
            cursor: pointer;
            font-style: italic;
            color: #979ba5;
            &:hover {
                color: #EA3636;
            }
        }
    }
    .my-menu {
        width: 300px;
        border: 1px solid #eee;
        .custom-icon {
            margin: 0 15px 0 20px;
            font-size: 16px;
        }
        .list {
            list-style: none;
            margin: 0;
            padding: 0;
            > li {
                font-size: 14px;
                height: 36px;
                line-height: 36px;
                padding-left: 50px;
                position: relative;
                color: #63656e;
            }
        }
    }
</style>

[[toc]]

## Collapse 折叠面板

### 基础用法 {page=#/collapse}

:::demo 默认配置 `activeName` 为激活的 collaspse-item 的 `name`，也可以不配置，bk-collaspse-item 的 `name` 作为唯一标识符，如果不填写默认为当前的 `item` 的 `index`

```html
<template>
    <bk-collapse v-model="activeName">
        <bk-collapse-item name="1">
            方案成熟
            <div slot="content" class="f13">拥有支撑数百款腾讯业务的经验沉淀，兼容各种复杂的系统架构，生于运维 · 精于运维;</div>
        </bk-collapse-item>

        <bk-collapse-item name="2">
            覆盖全面
            <div slot="content" class="f13">
                从配置管理，到作业执行、任务调度和监控自愈，再通过运维大数据分析辅助运营决策，全方位覆盖业务运营的全周期保障管理。
            </div>
        </bk-collapse-item>

        <bk-collapse-item name="3">
            开放平台
            <div slot="content" class="f13">
                开放的PaaS，具备强大的开发框架和调度引擎，以及完整的运维开发培训体系，助力运维快速转型升级。
            </div>
        </bk-collapse-item>

        <bk-collapse-item name="4">
            高效运营
            <div slot="content" class="f13">
                通过TI运维平台体系，能够帮助企业快速实现运维基础服务自动化，从而加速DevOps转型实现工具文化，最大化提高运营效率。
            </div>
        </bk-collapse-item>
    </bk-collapse>
</template>

<script>
    import { bkCollapse, bkCollapseItem } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkCollapse,
            bkCollapseItem
        },
        data () {
            return {
                activeName: ['1']
            }
        }
    }
</script>
```
:::

### 是否使用手风琴模式 {page=#/collapse}

:::demo 可以配置参数 `accordion` 来确定是否使用手风琴模式

```html
<template>
    <bk-collapse accordion>
        <bk-collapse-item name="1">
            方案成熟
            <div slot="content" class="f13">拥有支撑数百款腾讯业务的经验沉淀，兼容各种复杂的系统架构，生于运维 · 精于运维</div>
        </bk-collapse-item>

        <bk-collapse-item name="2">
            覆盖全面
            <div slot="content" class="f13">
                从配置管理，到作业执行、任务调度和监控自愈，再通过运维大数据分析辅助运营决策，全方位覆盖业务运营的全周期保障管理。
            </div>
        </bk-collapse-item>

        <bk-collapse-item name="3">
            开放平台
            <div slot="content" class="f13">
                开放的PaaS，具备强大的开发框架和调度引擎，以及完整的运维开发培训体系，助力运维快速转型升级。
            </div>
        </bk-collapse-item>

        <bk-collapse-item name="4">
            高效运营
            <div slot="content" class="f13">
                通过TI运维平台体系，能够帮助企业快速实现运维基础服务自动化，从而加速DevOps转型实现工具文化，最大化提高运营效率。
            </div>
        </bk-collapse-item>
    </bk-collapse>
</template>
<script>
    import { bkCollapse, bkCollapseItem } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkCollapse,
            bkCollapseItem
        }
    }
</script>
```
:::

### 自定义面板标题 {page=#/collapse}

:::demo 可以 `template` 去自定义面板标题

```html
<template>
    <bk-collapse v-model="activeName" class="my-menu">
        <bk-collapse-item name="1">
            <i class="bk-icon icon-sitemap custom-icon"></i>集群
            <div slot="content">
                <ul class="list">
                    <li>生产环境</li>
                    <li>预发布环境</li>
                </ul>
            </div>
        </bk-collapse-item>
        <bk-collapse-item name="2">
            <i class="bk-icon icon-work-manage custom-icon"></i>节点
            <div slot="content">
                <ul class="list">
                    <li>生产环境</li>
                    <li>预发布环境</li>
                </ul>
            </div>
        </bk-collapse-item>
        <bk-collapse-item name="3">
            <i class="bk-icon icon-sitemap custom-icon"></i>变量
            <div slot="content">
                <ul class="list">
                    <li>生产环境</li>
                    <li>预发布环境</li>
                </ul>
            </div>
        </bk-collapse-item>
    </bk-collapse>
</template>
<script>
    import { bkCollapse, bkCollapseItem } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkCollapse,
            bkCollapseItem
        }
    }
</script>
<style lang="postcss">
    .my-menu {
        width: 300px;
        border: 1px solid #eee;
        .custom-icon {
            margin: 0 15px 0 20px;
            font-size: 16px;
        }
        .list {
            list-style: none;
            margin: 0;
            padding: 0;
            > li {
                font-size: 14px;
                height: 36px;
                line-height: 36px;
                padding-left: 50px;
                position: relative;
                color: #63656e;
            }
        }
    }
</style>
```

:::

### 自定义触发区域 {page=#/collapse}

:::demo 使用`custom-trigger-area`可设置非触发区域，放置在`v-slot:no-trigger`中的元素，不响应鼠标默认的hover和点击事件，可配置自定义事件

```html
<template>
    <bk-collapse v-model="activeName">
        <bk-collapse-item name="1" :custom-trigger-area="true">
            方案成熟
            <span slot="no-trigger" class="no-trigger-text">自定义触发区，可自定义鼠标事件,不响应组件鼠标事件</span>
            <div slot="content" class="f13">拥有支撑数百款腾讯业务的经验沉淀，兼容各种复杂的系统架构，生于运维 · 精于运维;</div>
        </bk-collapse-item>

        <bk-collapse-item name="2" :custom-trigger-area="true">
            覆盖全面
            <span slot="no-trigger" class="no-trigger-text">自定义触发区，可自定义鼠标事件,不响应组件鼠标事件</span>
            <div slot="content" class="f13">
                从配置管理，到作业执行、任务调度和监控自愈，再通过运维大数据分析辅助运营决策，全方位覆盖业务运营的全周期保障管理。
            </div>
        </bk-collapse-item>

        <bk-collapse-item name="3" :custom-trigger-area="true">
            开放平台
            <span slot="no-trigger" class="no-trigger-text">自定义触发区，可自定义鼠标事件,不响应组件鼠标事件</span>
            <div slot="content" class="f13">
                开放的PaaS，具备强大的开发框架和调度引擎，以及完整的运维开发培训体系，助力运维快速转型升级。
            </div>
        </bk-collapse-item>

        <bk-collapse-item name="4" :custom-trigger-area="true">
            高效运营
            <span slot="no-trigger" class="no-trigger-text">自定义触发区，可自定义鼠标事件,不响应组件鼠标事件</span>
            <div slot="content" class="f13">
                通过TI运维平台体系，能够帮助企业快速实现运维基础服务自动化，从而加速DevOps转型实现工具文化，最大化提高运营效率。
            </div>
        </bk-collapse-item>
    </bk-collapse>
</template>

<script>
    import { bkCollapse, bkCollapseItem } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkCollapse,
            bkCollapseItem
        },
        data () {
            return {
                activeName: ['1']
            }
        }
    }
</script>
```
:::

### 设置bk-collapse-item隐藏方式 {page=#/collapse}

:::demo 可以通过设置 `content-hidden-type` 配置内容隐藏方式，默认是 `none`，收起时，不渲染内容组件; `hidden` 模式渲染组件，通过设置 `display:none` 不显示在页面

```html
<template>
    <bk-collapse v-model="activeName" class="my-menu">
        <bk-collapse-item name="1">
            <i class="bk-icon icon-sitemap custom-icon"></i>集群
            <div slot="content">
                <ul class="list">
                    <li>生产环境</li>
                    <li>预发布环境</li>
                </ul>
            </div>
        </bk-collapse-item>
        <bk-collapse-item name="2" content-hidden-type="hidden">
            <i class="bk-icon icon-work-manage custom-icon"></i>节点
            <div slot="content">
                <ul class="list">
                    <li>生产环境</li>
                    <li>预发布环境</li>
                </ul>
            </div>
        </bk-collapse-item>
        <bk-collapse-item name="3" content-hidden-type="hidden">
            <i class="bk-icon icon-sitemap custom-icon"></i>变量
            <div slot="content">
                <ul class="list">
                    <li>生产环境</li>
                    <li>预发布环境</li>
                </ul>
            </div>
        </bk-collapse-item>
    </bk-collapse>
</template>
<script>
    import { bkCollapse, bkCollapseItem } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkCollapse,
            bkCollapseItem
        }
    }
</script>
<style lang="postcss">
    .my-menu {
        width: 300px;
        border: 1px solid #eee;
        .custom-icon {
            margin: 0 15px 0 20px;
            font-size: 16px;
        }
        .list {
            list-style: none;
            margin: 0;
            padding: 0;
            > li {
                font-size: 14px;
                height: 36px;
                line-height: 36px;
                padding-left: 50px;
                position: relative;
                color: #63656e;
            }
        }
    }
</style>
```

:::

### 点击事件 {page=#/collapse}

:::demo 单击事件 `item-click` 回调参数为显示当前展开项的 name

```html
<template>
    <bk-collapse @item-click="handlerClick">
        <bk-collapse-item name="1">
            方案成熟
            <div slot="content" class="f13">拥有支撑数百款腾讯业务的经验沉淀，兼容各种复杂的系统架构，生于运维 · 精于运维</div>
        </bk-collapse-item>

        <bk-collapse-item name="2">
            覆盖全面
            <div slot="content" class="f13">
                从配置管理，到作业执行、任务调度和监控自愈，再通过运维大数据分析辅助运营决策，全方位覆盖业务运营的全周期保障管理。
            </div>
        </bk-collapse-item>

        <bk-collapse-item name="3">
            开放平台
            <div slot="content" class="f13">
                开放的PaaS，具备强大的开发框架和调度引擎，以及完整的运维开发培训体系，助力运维快速转型升级。
            </div>
        </bk-collapse-item>

        <bk-collapse-item name="4">
            高效运营
            <div slot="content" class="f13">
                通过TI运维平台体系，能够帮助企业快速实现运维基础服务自动化，从而加速DevOps转型实现工具文化，最大化提高运营效率。
            </div>
        </bk-collapse-item>
    </bk-collapse>
</template>
<script>
    import { bkCollapse, bkCollapseItem } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkCollapse,
            bkCollapseItem
        },
        methods: {
            handlerClick (activeName) {
                alert(activeName)
            }
        }
    }
</script>
```
:::

### 设置bk-collapse-item disabled {page=#/collapse}

:::demo 设置bk-collapse-item disabled

```html
<template>
    <bk-collapse v-model="activeNameDisabled">
        <bk-collapse-item name="1">
            方案成熟
            <div slot="content" class="f13">拥有支撑数百款腾讯业务的经验沉淀，兼容各种复杂的系统架构，生于运维 · 精于运维</div>
        </bk-collapse-item>

        <bk-collapse-item name="2" disabled>
            覆盖全面
            <div slot="content" class="f13">
                从配置管理，到作业执行、任务调度和监控自愈，再通过运维大数据分析辅助运营决策，全方位覆盖业务运营的全周期保障管理。
            </div>
        </bk-collapse-item>

        <bk-collapse-item name="3">
            开放平台
            <div slot="content" class="f13">
                开放的PaaS，具备强大的开发框架和调度引擎，以及完整的运维开发培训体系，助力运维快速转型升级。
            </div>
        </bk-collapse-item>

        <bk-collapse-item name="4">
            高效运营
            <div slot="content" class="f13">
                通过TI运维平台体系，能够帮助企业快速实现运维基础服务自动化，从而加速DevOps转型实现工具文化，最大化提高运营效率。
            </div>
        </bk-collapse-item>
    </bk-collapse>
</template>
<script>
    import { bkCollapse, bkCollapseItem } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkCollapse,
            bkCollapseItem
        },
        data () {
            return {
                activeNameDisabled: ['1', '2']
            }
        }
    }
</script>
```
:::

### 展开/收起 动画状态改变的回调事件 {page=#/collapse}

:::demo

```html
<template>
    <bk-collapse v-model="activeNameDisabled">
        <bk-collapse-item name="1" @after-leave="handleAfterLeave">
            方案成熟
            <div slot="content" class="f13">拥有支撑数百款腾讯业务的经验沉淀，兼容各种复杂的系统架构，生于运维 · 精于运维</div>
        </bk-collapse-item>

        <bk-collapse-item name="2">
            覆盖全面
            <div slot="content" class="f13">
                从配置管理，到作业执行、任务调度和监控自愈，再通过运维大数据分析辅助运营决策，全方位覆盖业务运营的全周期保障管理。
            </div>
        </bk-collapse-item>

        <bk-collapse-item name="3" @before-enter="handleBeforeEnter">
            开放平台
            <div slot="content" class="f13">
                开放的PaaS，具备强大的开发框架和调度引擎，以及完整的运维开发培训体系，助力运维快速转型升级。
            </div>
        </bk-collapse-item>

        <bk-collapse-item name="4">
            高效运营
            <div slot="content" class="f13">
                通过TI运维平台体系，能够帮助企业快速实现运维基础服务自动化，从而加速DevOps转型实现工具文化，最大化提高运营效率。
            </div>
        </bk-collapse-item>
    </bk-collapse>
</template>
<script>
    import { bkCollapse, bkCollapseItem } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkCollapse,
            bkCollapseItem
        },
        data () {
            return {
                activeNameDisabled: ['1', '2']
            }
        },
        methods: {
            handleAfterLeave () {
                console.log('after-leave')
                alert('after-leave')
            },

            handleBeforeEnter () {
                console.log('before-enter')
                alert('before-enter')
            }
        }
    }
</script>
```
:::

### bk-collapse 属性 {page=#/collapse}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| active-name | 当前激活面板的 name | Array / String | -- | -- |
| accordion | 是否使用手风琴效果 | Boolean | true, false | false |
| ext-cls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `.bk-collapse` 上 | String | —— | —— |

### bk-collapse 事件 {page=#/collapse}
| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| item-click | 点击时触发  | 激活状态 name 的集合 |

### bk-collapse-item 属性 {page=#/collapse}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| name | 唯一标识符，相当于 ID | String | -- | 默认为 index |
| ext-cls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `.bk-collapse-item` 上 | String | —— | —— |
| content-hidden-type |  配置内容隐藏方式，默认是 `none`，收起时，不渲染内容组件; `hidden` 模式渲染组件，通过设置 `display:none` 不显示在页面 | String | none, hidden | none |
| hide-arrow | 是否隐藏箭头 | Boolean | true, false | false|
| custom-trigger-area | 是否自定义触发区域，开启后，hide-arrow将不再生效，仅文字区域内可触发hover和点击效果 | Boolean | true, false | false|
| disabled | 是否禁用当前面板，禁用后展开过的面板会自动折叠 | Boolean | true, false | false|

### bk-collapse-item 事件 {page=#/collapse}
| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| before-enter | 动画开始前  | —— |
| after-leave | 动画结束后  | —— |
