<script>
    import { bkDropdownMenu } from '@'
    export default {
        components: {
            bkDropdownMenu
        },
        data () {
            return {
                isDropdownShow: false,
                isLargeDropdownShow: false,
                isTextDropdownShow: false
            }
        },
        methods: {
            dropdownShow () {
                this.isDropdownShow = true
            },
            dropdownHide () {
                this.isDropdownShow = false
            },
            triggerHandler () {
                // do
                this.$refs.dropdown.hide()
            },
            largeDropdownShow () {
                this.isLargeDropdownShow = true
            },
            largeDropdownHide () {
                this.isLargeDropdownShow = false
            },
            triggerHandler () {
                this.$refs.dropdown.hide()
            },
            largeTriggerHandler () {
                this.$refs.largeDropdown.hide()
            }
        }
    }
</script>
<style>
.dropdown-trigger-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #c4c6cc;
    height: 32px;
    min-width: 68px;
    border-radius: 2px;
    padding: 0 15px;
}
.dropdown-trigger-text {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    min-width: 68px;
    color: #006DFF;
    cursor: pointer;
}
.dropdown-trigger-text .bk-icon {
    font-size: 22px;
}
.dropdown-trigger-btn.bk-icon {
    font-size: 18px;
    color: #979BA5;
}
.dropdown-trigger-btn .bk-icon {
    font-size: 22px;
}
.dropdown-trigger-btn:hover {
    cursor: pointer;
    border-color: #979ba5;
}
</style>

[[toc]]

## DropdownMenu 下拉菜单

### 基础用法 {page=#/dropdown-menu}

:::demo `slot[name=dropdown-trigger]` 配置触发对象，`slot[name=dropdown-content]` 配置下拉菜单

```html
<template>
    <bk-dropdown-menu @show="dropdownShow" @hide="dropdownHide" ref="dropdown">
        <div class="dropdown-trigger-btn" style="padding-left: 19px;" slot="dropdown-trigger">
            <span>更多操作</span>
            <i :class="['bk-icon icon-angle-down',{'icon-flip': isDropdownShow}]"></i>
        </div>
        <ul class="bk-dropdown-list" slot="dropdown-content">
            <li><a href="javascript:;" @click="triggerHandler">生产环境</a></li>
            <li><a href="javascript:;" @click="triggerHandler">预发布环境</a></li>
            <li><a href="javascript:;" @click="triggerHandler">测试环境</a></li>
            <li><a href="javascript:;" @click="triggerHandler">正式环境</a></li>
            <li><a href="javascript:;" @click="triggerHandler">开发环境</a></li>
            <li><a href="javascript:;" @click="triggerHandler">调试环境</a></li>
        </ul>
    </bk-dropdown-menu>
</template>
<script>
    import { bkDropdownMenu } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkDropdownMenu
        },
        data () {
            return {
                isDropdownShow: false,
                isLargeDropdownShow: false
            }
        },
        methods: {
            dropdownShow () {
                this.isDropdownShow = true
            },
            dropdownHide () {
                this.isDropdownShow = false
            },
            triggerHandler () {
                this.$refs.dropdown.hide()
            }
        }
    }
</script>
<style>
.dropdown-trigger-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #c4c6cc;
    height: 32px;
    min-width: 68px;
    border-radius: 2px;
    padding: 0 15px;
    color: #63656E;
}
.dropdown-trigger-btn.bk-icon {
    font-size: 18px;
}
.dropdown-trigger-btn .bk-icon {
    font-size: 22px;
}
.dropdown-trigger-btn:hover {
    cursor: pointer;
    border-color: #979ba5;
}
</style>
```
:::

### 对齐方式 {page=#/dropdown-menu}
:::demo 通过配置参数 `align` 可以让下拉菜单以触发对象左对齐或右对齐，默认为左对齐

```html
<template>
    <bk-dropdown-menu :align="'right'">
        <template slot="dropdown-trigger">
            <span class="dropdown-trigger-btn bk-icon icon-cog-shape"><span>
        </template>
        <ul class="bk-dropdown-list" slot="dropdown-content">
            <li><a href="javascript:;">生产环境</a></li>
            <li><a href="javascript:;">预发布环境</a></li>
            <li><a href="javascript:;">测试环境</a></li>
            <li><a href="javascript:;">正式环境</a></li>
        </ul>
    </bk-dropdown-menu>
</template>
<script>
    import { bkDropdownMenu } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkDropdownMenu
        }
    }
</script>
<style>
.dropdown-trigger-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #c4c6cc;
    height: 32px;
    min-width: 68px;
    border-radius: 2px;
    padding: 0 15px;
    color: #63656E;
}
.dropdown-trigger-btn.bk-icon {
    font-size: 18px;
    color: #979BA5;
}
.dropdown-trigger-btn .bk-icon {
    font-size: 22px;
}
.dropdown-trigger-btn:hover {
    cursor: pointer;
    border-color: #979ba5;
}
</style>
```
:::

### 14px 字号 {page=#/dropdown-menu}

::: demo 通过配置 `font-size` 属性为 `medium` 来设置字号为 `14px`

``` html
<template>
    <bk-dropdown-menu @show="largeDropdownShow" @hide="largeDropdownHide" ref="largeDropdown" :font-size="'medium'">
        <div class="dropdown-trigger-btn" slot="dropdown-trigger">
            更多操作
        </div>
        <ul class="bk-dropdown-list" slot="dropdown-content">
            <li><a href="javascript:;" @click="largeTriggerHandler">生产环境</a></li>
            <li><a href="javascript:;" @click="largeTriggerHandler">预发布环境</a></li>
            <li><a href="javascript:;" @click="largeTriggerHandler">测试环境</a></li>
            <li><a href="javascript:;" @click="largeTriggerHandler">正式环境</a></li>
        </ul>
    </bk-dropdown-menu>
</template>
<script>
    import { bkDropdownMenu } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkDropdownMenu
        },
        data () {
            return {
                isLargeDropdownShow: false
            }
        },
        methods: {
            largeDropdownShow () {
                this.isLargeDropdownShow = true
            },
            largeDropdownHide () {
                this.isLargeDropdownShow = false
            },
            largeTriggerHandler () {
                this.$refs.largeDropdown.hide()
            }
        }
    }
</script>
<style>
.dropdown-trigger-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #c4c6cc;
    height: 32px;
    min-width: 68px;
    border-radius: 2px;
    padding: 0 15px;
    color: #63656E;
}
.dropdown-trigger-btn.bk-icon {
    font-size: 18px;
}
.dropdown-trigger-btn .bk-icon {
    font-size: 22px;
}
.dropdown-trigger-btn:hover {
    cursor: pointer;
    border-color: #979ba5;
}
</style>
```
:::

### 其它应用 {page=#/dropdown-menu}

:::demo  通过 `slot[name=dropdown-trigger]` 来配置触发对象

```html
<template>
    <bk-dropdown-menu :align="'center'">
        <div class="dropdown-trigger-btn" slot="dropdown-trigger">
            <i class="bk-icon icon-area-chart"></i>
            <span>预览</span>
        </div>
        <div slot="dropdown-content">
            <img src="../../img/vue-logo-normal.svg" style="vertical-align: middle; padding: 5px; height: 168px;">
        </div>
    </bk-dropdown-menu>
</template>
<script>
    import { bkDropdownMenu } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkDropdownMenu
        }
    }
</script>
<style>
.dropdown-trigger-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #c4c6cc;
    height: 32px;
    min-width: 68px;
    border-radius: 2px;
    padding: 0 15px;
    color: #63656E;
}
.dropdown-trigger-btn.bk-icon {
    font-size: 18px;
}
.dropdown-trigger-btn .bk-icon {
    font-size: 22px;
}
.dropdown-trigger-btn:hover {
    cursor: pointer;
    border-color: #979ba5;
}
</style>
```
:::



### 点击触发 {page=#/dropdown-menu}

:::demo 通过`trigger`设置触发事件类型

```html
<template>
    <bk-dropdown-menu trigger="click" @show="dropdownShow" @hide="dropdownHide" ref="dropdown">
        <div class="dropdown-trigger-text" slot="dropdown-trigger">
            <span>点击触发</span>
            <i :class="['bk-icon icon-angle-down',{'icon-flip': isDropdownShow}]"></i>
        </div>
        <ul class="bk-dropdown-list" slot="dropdown-content">
            <li><a href="javascript:;" @click="triggerHandler">生产环境</a></li>
            <li><a href="javascript:;" @click="triggerHandler">预发布环境</a></li>
            <li><a href="javascript:;" @click="triggerHandler">测试环境</a></li>
            <li><a href="javascript:;" @click="triggerHandler">正式环境</a></li>
        </ul>
    </bk-dropdown-menu>
</template>
<script>
    import { bkDropdownMenu } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkDropdownMenu
        },
        data () {
            return {
                isTextDropdownShow: false
            }
        },
        methods: {
            dropdownShow () {
                this.isTextDropdownShow = true
            },
            dropdownHide () {
                this.isTextDropdownShow = false
            },
            triggerHandler () {
                this.$refs.dropdown.hide()
            }
        }
    }
</script>
<style>
.dropdown-trigger-text {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    min-width: 68px;
    color: #006DFF;
    cursor: pointer;
}
.dropdown-trigger-text .bk-icon {
    font-size: 22px;
}
</style>
```
:::

### position-fixed {page=#/dropdown-menu}

:::demo 通过 `:position-fixed="true"`控制下拉框定位

```html
<template>
    <div style="width: 200px;height: 50px;padding: 10px;;border: 1px solid #ccc;overflow: hidden;">
        <bk-dropdown-menu :position-fixed="true" trigger="click" @show="dropdownShow" @hide="dropdownHide" ref="dropdown">
            <div class="dropdown-trigger-btn " style="padding-left: 19px;" slot="dropdown-trigger">
                <span>点击触发</span>
                <i :class="['bk-icon icon-angle-down',{'icon-flip': isDropdownShow}]"></i>
            </div>
            <ul class="bk-dropdown-list" slot="dropdown-content">
                <li><a href="javascript:;" @click="triggerHandler">生产环境</a></li>
                <li><a href="javascript:;" @click="triggerHandler">预发布环境</a></li>
                <li><a href="javascript:;" @click="triggerHandler">测试环境</a></li>
                <li><a href="javascript:;" @click="triggerHandler">正式环境</a></li>
            </ul>
        </bk-dropdown-menu>
    </div>
</template>
<script>
    import { bkDropdownMenu } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkDropdownMenu
        },
        data () {
            return {
                isTextDropdownShow: false
            }
        },
        methods: {
            dropdownShow () {
                this.isTextDropdownShow = true
            },
            dropdownHide () {
                this.isTextDropdownShow = false
            },
            triggerHandler () {
                this.$refs.dropdown.hide()
            }
        }
    }
</script>
<style>
.dropdown-trigger-text {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    min-width: 68px;
    color: #3a84ff;
    cursor: pointer;
}
.dropdown-trigger-text .bk-icon {
    font-size: 22px;
}
</style>
```

:::

### 属性 {page=#/dropdown-menu}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| align | 与触发对象的对齐方式，包括左对齐，居中，右对齐三种方式 | String | `left`、`center`、`right` | `left` |
| trigger | 触发事件 | String | `click`、`mouseover`| `mouseover` |
| font-size | 设置下拉已选择及列表的字体大小 | String | `normal`（12px），`medium`（14px），`large`（16px） | normal |
| disabled | 禁用下拉菜单 | Boolean | `true`、`false`| `false` |
| position-fixed | 下拉框定位属性 | Boolean | `true`（使用position:fiexed来进行定位）、`false`（使用position:absoluted来进行定位）| `false` |
| ext-cls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `.bk-dropdown-menu` 上 | String | —— | —— |
| open-delay | 打开下拉菜单的延迟时间，单位为毫秒 | Number | —— |  0 |
| close-delay | 关闭下拉菜单的延迟时间，单位为毫秒 | Number | —— |  100 |

### 插槽(slot) {page=#/dropdown-menu}
| 名称 | 说明 |
|------|------|
| dropdown-trigger | 配置触发对象，即触发下拉列表显示的元素 |
| dropdown-content | 配置下拉列表 |

### 事件 {page=#/dropdown-menu}
| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| show | 显示时触发此回调函数 | —— |
| hide | 隐藏时触发此回调函数 | —— |
