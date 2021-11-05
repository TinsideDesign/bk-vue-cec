<script>
    import { bkFixedNavbar, bkButton, bkSwitcher } from '@'

    export default {
        components: {
            bkFixedNavbar,
            bkButton,
            bkSwitcher
        },
        data() {
            return {
                position: 'middle',
                navItems: [
                    {
                        icon: 'icon-weixin-shape',
                        text: '联系',
                        tooltip: '可以通过T-insideQQ联系我们',
                        action: () => {
                            window.open('http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzgwMDgwMjAwMV80NDMwOTZfODAwODAyMDAxXzJf')
                        }
                    },
                    {
                        icon: 'icon-order-shape',
                        text: '反馈',
                        action: () => {
                            window.open('https://bk.tencent.com/s-mart/community?page=1&keyword=%255BT-inside%255D&sort=latest')
                        }
                    }
                ],
                showNav: false
            }
        }
    }
</script>
<style>
    .config-panel, .position-config {
        display: flex;
        align-items: center;
    }
</style>

[[toc]]

## FixedNavbar 悬浮导航

### 基础用法 {page=#/exception}

:::demo 提供悬浮导航的容器，容器传入一个列表`navItems`来显示，`navItems`的每个元素包含`icon`、`text`分别作为其图表以及文字的展示，`tooltip`的配置可以参考Tooltips 工具提示，`action`传入一个函数，作为点击元素的回调。

```html
<template>
    <div class="config-panel mb20">
        <span class="mr20 f14">右侧悬浮导航</span>
        <bk-switcher v-model="showNav" class="mr20"></bk-switcher>
    </div>
    <div class="position-config" v-show="showNav">
        <span class="mr20 f14">悬浮导航位置</span>
        <div class="bk-button-group">
            <bk-button @click="position = 'top'" :class="position === 'top' ? 'is-selected' : ''" >top</bk-button>
            <bk-button @click="position = 'middle'" :class="position === 'middle' ? 'is-selected' : ''" >middle</bk-button>
            <bk-button @click="position = 'bottom'" :class="position === 'bottom' ? 'is-selected' : ''" >bottom</bk-button>
        </div>
    </div>
    <bk-fixed-navbar v-if="showNav"
        :position="position"
        :nav-items="navItems"></bk-fixed-navbar>
</template>
<script>
    import { bkFixedNavbar, bkButton, bkSwitcher } from '@'

    export default {
        components: {
            bkFixedNavbar,
            bkButton,
            bkSwitcher
        },
        data() {
            return {
                position: 'middle',
                navItems: [
                    {
                        icon: 'icon-weixin-shape',
                        text: '联系',
                        tooltip: '可以通过T-insideQQ联系我们',
                        action: () => {
                            window.open('http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzgwMDgwMjAwMV80NDMwOTZfODAwODAyMDAxXzJf')
                        }
                    },
                    {
                        icon: 'icon-order-shape',
                        text: '反馈',
                        action: () => {
                            window.open('https://bk.tencent.com/s-mart/community?page=1&keyword=%255BT-inside%255D&sort=latest')
                        }
                    }
                ],
                showNav: false
            }
        }
    }
</script>
```

:::

### 属性 {page=#/exception}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| position | 位置 | String | `middle`、`top`、`bottom`  | `middle` |
| navItems | 导航元素列表| Array | 传入一个数组，数组的每个元素都是一个对象，属性包括`icon`，`text`，`tooltip`和`action`， 详见示例 | [] |
| ext-cls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `.bk-fixed-navbar-wrapper` 上 | String | —— | —— |
