[[toc]]

## 快速上手

本节介绍如何在项目中结合 `webpack` 一起使用 `bk-vue-cec`。

### 引入 bk-vue-cec {page=#/start}

`bk-vue-cec` 支持两种引入方式，一种是全量引入，一种是按需引入部分组件。我们先介绍如何完整引入 `bk-vue-cec`，随后在各个组件的介绍中，你可以在代码内找到按需引入的方法。

### 完整引入 {page=#/start}

在 `webpack` 入口 `main.js` 中如下配置：

```js
import Vue from 'vue'
import App from './App'
import router from './router'

// 全量引入 bk-vue-cec
import bkVueCec from '{{BASE_LIB_NAME}}'
// 全量引入 bk-vue-cec 样式，请注意这里的css依旧为 bk-magic-vue 而不是 bk-vue-cec
import '{{BASE_LIB_NAME}}/dist/bk-magic-vue.min.css'

Vue.use(bkVueCec)

new Vue({
    el: '#root',
    router,
    template: '<App />',
    components: {App}
})
```

### 全局配置 {page=#/start}

在引入组件库时，可以传入一个全局配置对象。该对象目前支持`zIndex` 字段。`zIndex` 设置弹框的初始 z-index（默认值：2000）。按照引入组件库的方式，具体操作如下：

完整引入：

```js
import Vue from 'vue'
import bkVueCec from '{{BASE_LIB_NAME}}'
Vue.use(bkVueCec, { zIndex: 3000 })
```

按需引入：

```js
import Vue from 'vue'
import { bkButton } from '{{BASE_LIB_NAME}}'

Vue.prototype.$BK_EL = { zIndex: 3000 }
Vue.use(bkButton)
```

按照以上设置，项目中弹框的初始 z-index 为 3000。

### 组件库暴露出来的一些工具方法 {page=#/start}

组件库暴露出内部一些与组件逻辑无关的、通用的方法，供有需要时单独使用。目前暴露出来的有四个，分别如下：

:::info
请注意，无论是全量引入还是按需引入组件库或者是根本没有引入组件库，都可以使用如下方式使用组件库提供的工具方法
:::

```js
// tippy 单独引入方式：
import tippy from '{{BASE_LIB_NAME}}/lib/utils/tippy'

// deepmerge 单独引入方式：
import deepmerge from '{{BASE_LIB_NAME}}/lib/utils/deepmerge'

// popManager 单独引入方式：
import popManager from '{{BASE_LIB_NAME}}/lib/utils/pop-manager'

// zIndexManager 单独引入方式：
import zIndexManager from '{{BASE_LIB_NAME}}/lib/utils/z-index-manager'

// pinyin 单独引入方式：
import pinyin from '{{BASE_LIB_NAME}}/lib/utils/pinyin'

// Icon 图标组件使用 svg 图标时，需要单独引入
import '{{BASE_LIB_NAME}}/lib/utils/svg-icon'
```
