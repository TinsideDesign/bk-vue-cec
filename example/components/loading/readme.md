<script>
    import { bkButton, bkLoading } from '@'
    export default {
        components: {
            bkButton,
            bkLoading
        },
        directives: {
            bkloading: bkLoading.directive
        },
        data () {
            return {
                basicLoading: true,
                textLoading: true,
                testDelayLoading: true
            }
        },
        methods: {
            showLoading () {
                const h = this.$createElement

                this.$bkLoading({
                    title: h('span', {
                        style: {
                            color: 'red'
                        }
                    }, '加载中'),
                    afterLeave () {
                        console.warn('全屏加载消失完毕')
                    }
                })

                setTimeout(() => {
                    this.$bkLoading.hide()
                }, 3000)
            },
            toggleLoading () {
                this.testDelayLoading = !this.testDelayLoading
            }
        }
    }
</script>

<style lang="postcss">
    .test-dom {
        height: 300px;
        line-height: 300px;
        border: 1px solid #eee;
        text-align: center;
    }
</style>

[[toc]]

## Loading 加载

覆盖正在加载数据的组件一个 loading 层

### 基础用法 {page=#/loading}

:::demo 组件提供了自定义指令 `v-bkloading`，方便对指定 dom 节点添加 loading 效果
```html
<template>
    <div class="test-dom" v-bkloading="{ isLoading: basicLoading, zIndex: 10 }">
        内容
    </div>
</template>

<script>
    export default {
        data () {
            return {
                basicLoading: true
            }
        }
    }
</script>
<style lang="postcss">
    .test-dom {
        height: 300px;
        line-height: 300px;
        border: 1px solid #eee;
        text-align: center;
    }
</style>
```
:::

### 标签用法 {page=#/loading}
:::demo 除指令用法外，组件还提供标签用法
```html
<template>
    <bk-loading :is-loading="basicLoading" :title="'数据加载中'">
        <div class="test-dom">
            内容
        </div>
    </bk-loading>
</template>

<script>
    export default {
        data () {
            return {
                basicLoading: true
            }
        }
    }
</script>
<style lang="postcss">
    .test-dom {
        height: 300px;
        line-height: 300px;
        border: 1px solid #eee;
        text-align: center;
    }
</style>
```
:::

### 配置大小 {page=#/loading}

:::demo 传入 `size`，可以配置 loading 效果大小
```html
<template>
    <div class="test-dom" v-bkloading="{isLoading: basicLoading, size: 'mini', zIndex: 10}">
        内容
    </div>
</template>

<script>
    export default {
        data () {
            return {
                basicLoading: true
            }
        }
    }
</script>
<style lang="postcss">
    .test-dom {
        height: 300px;
        line-height: 300px;
        border: 1px solid #eee;
        text-align: center;
    }
</style>
```
:::

### 配置主题 {page=#/loading}

:::demo 传入 `theme`，可以配置 loading 效果主题
```html
<template>
    <div class="test-dom" v-bkloading="{isLoading: basicLoading, theme: 'primary', zIndex: 10}">
        内容
    </div>
</template>

<script>
    export default {
        data () {
            return {
                basicLoading: true
            }
        }
    }
</script>
<style lang="postcss">
    .test-dom {
        height: 300px;
        line-height: 300px;
        border: 1px solid #eee;
        text-align: center;
    }
</style>
```
:::

### 隐藏推迟 {page=#/loading}

:::demo 传入 `deloy`，可以配置 loading 效果在隐藏时推迟
```html
<template>
    <div>
        <bk-button class="mb10" type="primary" @click="toggleLoading">{{testDelayLoading ? '隐藏（两秒后消失）' : '显示'}}</bk-button>
        <div class="test-dom" v-bkloading="{ isLoading: testDelayLoading, delay: 2000, zIndex: 10 }">
            内容
        </div>
    </div>

</template>

<script>
    export default {
        data () {
            return {
                testDelayLoading: true
            }
        },
        methods: {
            toggleLoading () {
                this.testDelayLoading = !this.testDelayLoading
            }
        }
    }
</script>
<style lang="postcss">
    .test-dom {
        height: 300px;
        line-height: 300px;
        border: 1px solid #eee;
        text-align: center;
    }
</style>
```
:::

### 配置文案 {page=#/loading}

:::demo 传入 `title`，值会被渲染到 loading 图标的下方
```html
<template>
    <div class="test-dom" v-bkloading="{ isLoading: textLoading, title: '数据加载中', zIndex: 10 }">
        内容
    </div>
</template>

<script>
    export default {
        data () {
            return {
                textLoading: true
            }
        }
    }
</script>
<style lang="postcss">
    .test-dom {
        height: 300px;
        line-height: 300px;
        border: 1px solid #eee;
        text-align: center;
    }
</style>
```
:::

### 配置 loading 遮罩的背景透明度与背景色 {page=#/loading}

:::demo loading 遮罩的背景透明度会由传入的 `opacity` 参数决定，此参数为 `0` 至 `1` 之间的数字，默认为 `0.9` 背景色则由`color`属性决定。

```html
<template>
    <div class="test-dom" v-bkloading="{ isLoading: textLoading, opacity: 1, color: '#3fd5df', zIndex: 10 }">
        内容
    </div>
</template>

<script>
    export default {
        data () {
            return {
                textLoading: true
            }
        }
    }
</script>
<style lang="postcss">
    .test-dom {
        height: 300px;
        line-height: 300px;
        border: 1px solid #eee;
        text-align: center;
    }
</style>
```
:::

### 配置 mode loading的显示形式 {page=#/loading}

:::demo 配置 mode 为 `spin` 可使其以spin的形式显示。

```html
<template>
    <div class="test-dom" v-bkloading="{ isLoading: textLoading, opacity: 1, zIndex: 10, theme: 'primary', mode: 'spin' }">
        内容
    </div>
</template>

<script>
    export default {
        data () {
            return {
                textLoading: true
            }
        }
    }
</script>
<style lang="postcss">
    .test-dom {
        height: 300px;
        line-height: 300px;
        border: 1px solid #eee;
        text-align: center;
    }
</style>
```
:::

### 全屏加载 {page=#/loading}

:::demo `loading` 组件还提供了绑定在 `Vue` 对象的原型方法
```html
<template>
    <bk-button type="primary" @click="showLoading">显示全屏加载，3s后关闭</bk-button>
</template>
<script>
    import { bkButton } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton
        },
        methods: {
            showLoading () {
                const h = this.$createElement

                this.$bkLoading({
                    title: h('span', {
                        style: {
                            color: 'red'
                        }
                    }, '加载中'),
                    afterLeave () {
                        console.log('全屏加载消失完毕')
                    }
                })

                setTimeout(() => {
                    this.$bkLoading.hide()
                }, 3000)
            }
        }
    }
</script>
```
:::

### 属性 {page=#/loading}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| isLoading | 一个 `boolean` 变量，控制组件的显示 | boolean | —— | —— |
| mode | loading 的显示形式，可选项: `normal`, `spin` | normal | —— | normal |
| title | 组件显示时的文案，支持使用 `createElement` 函数生成的 VNode | string | —— | —— |
| size | 组件显示大小配置 | string | large small mini | large |
| theme | 组件显示主题配置 | string | colorful default primary danger warning(spin模式下支持: default primary danger warning success) | colorful |
| delay | 组件消失推迟 | Number | —— | 0 |
| immediate | 组件在初始化完成后立即显示 | Boolean | —— | false |
| opacity | loading 遮罩的背景透明度 （注：如设置了 color 属性为 rgba 类型颜色则此属性将被覆盖） | number | 0 - 1 之间的小数 | 0.9 |
| color | loading 遮罩的背景色 支持 rgb/hex/rgba | rgb/hex/rgba | -- | #ffffff |
| zIndex | 如果配置项有 zIndex 选项，遮罩层的层叠顺序使用配置项的 zIndex，否则使用层叠顺序管理器自动生成的 zIndex | number | -- | -- |
| afterLeave | loading 消失完毕的回调函数 | Function | -- | -- |
| extCls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `.bk-loading` 上 | String | —— | —— |
