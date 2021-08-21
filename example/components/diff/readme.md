<script>
    import { bkDiff } from '@'
    import oldStr from './old'
    import newStr from './new'
    export default {
        components: {
            bkDiff
        },
        data () {
            return {
                oldCode: oldStr,
                newCode: newStr,
                context: 20
            }
        }
    }
</script>

[[toc]]

## Diff 差异对比

### 基本用法 {page=#/diff}

:::demo 配置对比内容 `old-content` 和 `new-content`
```html
<template>
    <bk-diff :old-content="oldCode" :new-content="newCode" language="javascript"></bk-diff>
</template>
<script>
    import { bkDiff } from '{{BASE_LIB_NAME}}'
    import oldStr from './old'
    import newStr from './new'

    export default {
        components: {
            bkDiff
        },
        data () {
            return {
                oldCode: oldStr,
                newCode: newStr,
                context: 20
            }
        }
    }
    // old.js 内容
    export default `
    Vue.component('app-exception', Exception)
    // Vue.component('app-auth', AuthComponent)

    auth.requestCurrentUser().then(user => {
        injectCSRFTokenToHeaders()
        if (!user.isAuthenticated) {
            auth.redirectToLogin()
        } else {
            global.bus = bus
            global.mainComponent = new Vue({
                el: '#app',
                router,
                store,
                template: '<App/>',
                components: {
                    App
                }
            })
        }
    }, err => {
        let message
        if (err.status === 403) {
            message = 'Sorry，您的权限不足!'
            if (err.data && err.data.msg) {
                message = err.data.msg
            }
        } else {
            message = '服务暂时未响应，请稍后再试。'
        }

        const divStyle = ''
            + 'text-align: center;'
            + 'width: 400px;'
            + 'margin: auto;'
            + 'position: absolute;'
            + 'top: 50%;'
            + 'left: 50%;'
            + 'transform: translate(-50%, -50%);'

        const h2Style = 'font-size: 20px;color: #979797; margin: 32px 0;font-weight: normal'
    })
    `
    // new.js 内容
    export default `
    Vue.component('app-exception', Exception)
    Vue.component('app-auth', AuthComponent)

    auth.requestCurrentUser().then(user => {
        injectCSRFTokenToHeaders()
        if (!user.isAuthenticated) {
            auth.redirectToLogin()
        } else {
            global.bus = bus
            global.mainComponent = new Vue({
                el: '#app',
                router,
                store,
                template: '<App/>',
                components: {
                    App
                }
            })
        }
    }, err => {
        let message
        if (err.status === 403) {
            message = 'Sorry，您的权限不足!'
            if (err.data && err.data.msg) {
                message = err.data.msg
            }
        } else {
            message = '无法连接到后端服务，请稍候再试。'
        }

        const divStyle = ''
            + 'text-align: left;'
            + 'width: 400px;'
            + 'margin: auto;'
            + 'position: absolute;'
            + 'left: 50%;'
            + 'transform: translate(-50%, -50%);'

        const h2Style = 'font-size: 20px;color: #979797; margin: 32px 0;font-weight: normal'
    })
    `
</script>

```
:::

### 展示方式配置 {page=#/diff}

:::demo 配置展示方式`format`

```html
<template>
    <bk-diff :old-content="oldCode" :new-content="newCode" :format="'side-by-side'" language="javascript"></bk-diff>
</template>
<script>
    import { bkDiff } from '{{BASE_LIB_NAME}}'
    import oldStr from './old'
    import newStr from './new'

    export default {
        components: {
            bkDiff
        },
        data () {
            return {
                oldCode: oldStr,
                newCode: newStr
            }
        }
    }
</script>

```

:::
### 暗黑主题配置 {page=#/diff}

:::demo 配置 `context`
```html
<template>
    <bk-diff :old-content="oldCode" :new-content="newCode" :format="'side-by-side'" :context="context" language="javascript" theme="dark"></bk-diff>
</template>
<script>
    import { bkDiff } from '{{BASE_LIB_NAME}}'
    import oldStr from './old'
    import newStr from './new'

    export default {
        components: {
            bkDiff
        },
        data () {
            return {
                oldCode: oldStr,
                newCode: newStr,
                context: 20
            }
        }
    }
</script>

```
:::

### 不隐藏行数配置 {page=#/diff}

:::demo 配置 `context`
```html
<template>
    <bk-diff :old-content="oldCode" :new-content="newCode" :format="'side-by-side'" language="javascript" :context="context"></bk-diff>
</template>
<script>
    import { bkDiff } from '{{BASE_LIB_NAME}}'
    import oldStr from './old'
    import newStr from './new'

    export default {
        components: {
            bkDiff
        },
        data () {
            return {
                oldCode: oldStr,
                newCode: newStr,
                context: 20
            }
        }
    }
</script>

```
:::

### 属性 {page=#/diff}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| old-content | 旧内容 | String | —— | —— |
| new-content | 新内容 | String | —— | —— |
| context | 不同地方间隔多少行不隐藏 | Number | —— |
| theme | 主题风格 | String | light，dark | light |
| format | 展示方式 | String | `line-by-line`，`side-by-side`  | `line-by-line` |
| ext-cls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `.bk-diff` 上 | String | —— | —— |
