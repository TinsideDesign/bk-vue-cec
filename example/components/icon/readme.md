<script>
    import { bkIcon, bkButton } from '@'
    import '@/utils/svg-icon'

    export default {
        components: {
            bkIcon
        },

        data () {
            return {
                smallIcons: [
                    'angle-double-down', 'angle-double-left', 'angle-double-right', 'angle-double-up', 'angle-left', 'angle-down', 'angle-right', 'angle-up', 'arrows-left', 'arrows-right', 'arrows-down', 'arrows-up', 'check-1', 'close', 'edit2', 'plus'
                ],

                shapeIcons: [
                    'apps-shape', 'arrows-down-circle-shape', 'arrows-down-shape', 'arrows-left-circle-shape', 'arrows-left-shape', 'arrows-m-down-shape', 'arrows-m-left-shape', 'arrows-m-right-shape', 'arrows-m-up-shape', 'arrows-right-circle-shape', 'arrows-right-shape', 'arrows-up-circle-shape', 'arrows-up-shape', 'back-shape', 'block-shape', 'calendar-shape', 'check-circle-shape', 'circle-shape', 'clipboard-shape', 'clock-shape', 'close-circle-shape', 'close3-shape', 'cog-shape', 'cry-shape', 'dashboard-2-shape', 'dashboard-shape', 'data-shape', 'data2-shape', 'dialogue-empty-shape', 'dialogue-shape', 'dispirited-shape', 'down-shape', 'email-shape', 'empty-shape', 'exclamation-circle-shape', 'exclamation-triangle-shape', 'eye-shape', 'eye-slash-shape', 'file-plus-shape', 'file-shape', 'folder-open-shape', 'folder-plus-shape', 'folder-shape', 'heart-shape', 'home-shape', 'id-shape', 'image-shape', 'info-circle-shape', 'left-shape', 'lock-shape', 'minus-circle-shape', 'minus-square-shape', 'mobile-shape', 'next-shape', 'order-shape', 'panel-shape', 'password-shape', 'pc-shape', 'pie-chart-shape', 'pipeline-shape', 'play-circle-shape', 'play-shape', 'plus-circle-shape', 'plus-square-shape', 'qq-shape', 'question-circle-shape', 'right-shape', 'save-shape', 'sina-shape', 'sitemap-shape', 'smile-shape', 'star-shape', 'stop-shape', 'tree-application-shape', 'tree-group-shape', 'tree-module-shape', 'tree-process-shape', 'unlock-shape', 'up-shape', 'user-shape', 'weixin-shape', 'rtx'
                ],

                lineIcons:  [
                    'apps', 'area-chart', 'arrows-down-circle', 'arrows-left-circle', 'arrows-right-circle', 'arrows-up-circle', 'back', 'back2', 'bar-chart', 'bk', 'calendar', 'chain', 'check-circle', 'circle-2-1', 'circle-4-1', 'circle', 'clipboard', 'clock', 'close-circle', 'code', 'cog', 'cry', 'dashboard-2', 'dashboard', 'data', 'data2', 'dedent', 'delete', 'dialogue-empty', 'dialogue', 'dispirited', 'docker', 'download', 'edit', 'ellipsis', 'email', 'empty', 'end', 'exclamation-circle', 'exclamation-triangle', 'exclamation', 'execute', 'eye-slash', 'eye', 'file-plus', 'file', 'folder-open', 'folder-plus', 'folder', 'full-screen', 'heart', 'hide', 'home', 'id', 'image', 'indent', 'info-circle', 'info', 'key', 'line-chart', 'list', 'lock', 'minus-circle', 'minus-square', 'minus', 'mobile', 'monitors-cog', 'monitors', 'more', 'move', 'next', 'order', 'panel-permission', 'panel', 'panels', 'password', 'pause', 'pc', 'pie-chart', 'pipeline', 'play', 'play2', 'play3', 'plus-circle', 'plus-square', 'project', 'qq', 'question-circle', 'question', 'refresh', 'save', 'script-file', 'script-files', 'search', 'sina', 'sitemap', 'smile', 'sort', 'star', 'stop', 'tree-application', 'tree-module', 'tree-process', 'un-full-screen', 'unlock', 'upload', 'user', 'weixin', 'work-manage'
                ]
            }
        },

        methods: {
            copyIconName (name) {
                const input = document.createElement('input')
                document.body.appendChild(input)

                const icon = `<bk-icon type="${name}" />`
                input.setAttribute('value', icon)
                input.select()
                if (document.execCommand('copy')) {
                    document.execCommand('copy')
                    this.$bkMessage({
                        theme: 'success',
                        message: `复制${icon}成功`
                    })
                }
                document.body.removeChild(input)
            },
            copySVGIconName (name) {
                const input = document.createElement('input')
                document.body.appendChild(input)

                const icon = `<bk-icon type="${name}" svg />`
                input.setAttribute('value', icon)
                input.select()
                if (document.execCommand('copy')) {
                    document.execCommand('copy')
                    this.$bkMessage({
                        theme: 'success',
                        message: `复制${icon}成功`
                    })
                }
                document.body.removeChild(input)
            }
        }
    }
</script>
<style>
    h3.icon-title {
        margin: 10px 0 20px;
    }
    .icon-wrapper {
        display: flex;
        flex-flow: row wrap;
        margin: 0;
        padding: 0;
        li {
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            width: 36px;
            height: 36px;
            margin-right: 15px;
            margin-bottom: 15px;
            font-size: 20px;
            border: 1px solid #c4c6cc;
        }
    }
</style>

[[toc]]

## Icon 图标

`bk-vue-cec` 图标集

### 图标列表 {page=#/icon}

:::demo 通过 type 来指定使用哪种 icon，点击图标复制。

```html
<template>
    <h3 class="icon-title">小图标</h3>
    <ul class="icon-wrapper">
        <li v-for="icon in smallIcons" :key="icon" :title="icon" @click="copyIconName(icon)">
            <bk-icon :type="icon" />
        </li>
    </ul>
    <h3 class="icon-title">填充图标</h3>
    <ul class="icon-wrapper">
        <li v-for="icon in shapeIcons" :key="icon" :title="icon" @click="copyIconName(icon)">
            <bk-icon :type="icon" />
        </li>
    </ul>
    <h3 class="icon-title">线性图标</h3>
    <ul class="icon-wrapper">
        <li v-for="icon in lineIcons" :key="icon" :title="icon" @click="copyIconName(icon)">
            <bk-icon :type="icon" />
        </li>
    </ul>
</template>
<script>
    import { bkIcon } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkIcon
        },

        data () {
            return {
                smallIcons: [
                    'angle-double-down', 'angle-double-left', 'angle-double-right', 'angle-double-up', 'angle-left', 'angle-down', 'angle-right', 'angle-up', 'arrows-left', 'arrows-right', 'arrows-down', 'arrows-up', 'check-1', 'close', 'edit2', 'plus'
                ],

                lineIcons:  [
                    'apps', 'area-chart', 'arrows-down-circle', 'arrows-left-circle', 'arrows-right-circle', 'arrows-up-circle', 'back', 'back2', 'bar-chart', 'bk', 'calendar', 'chain', 'check-circle', 'circle-2-1', 'circle-4-1', 'circle', 'clipboard', 'clock', 'close-circle', 'code', 'cog', 'cry', 'dashboard-2', 'dashboard', 'data', 'data2', 'dedent', 'delete', 'dialogue-empty', 'dialogue', 'dispirited', 'docker', 'download', 'edit', 'ellipsis', 'email', 'empty', 'end', 'exclamation-circle', 'exclamation-triangle', 'exclamation', 'execute', 'eye-slash', 'eye', 'file-plus', 'file', 'folder-open', 'folder-plus', 'folder', 'full-screen', 'heart', 'hide', 'home', 'id', 'image', 'indent', 'info-circle', 'info', 'key', 'line-chart', 'list', 'lock', 'minus-circle', 'minus-square', 'minus', 'mobile', 'monitors-cog', 'monitors', 'more', 'move', 'next', 'order', 'panel-permission', 'panel', 'panels', 'password', 'pause', 'pc', 'pie-chart', 'pipeline', 'play', 'play2', 'play3', 'plus-circle', 'plus-square', 'project', 'qq', 'question-circle', 'question', 'refresh', 'save', 'script-file', 'script-files', 'search', 'sina', 'sitemap', 'smile', 'sort', 'star', 'stop', 'tree-application', 'tree-module', 'tree-process', 'un-full-screen', 'unlock', 'upload', 'user', 'weixin', 'work-manage'
                ],

                shapeIcons: [
                    'apps-shape', 'arrows-down-circle-shape', 'arrows-down-shape', 'arrows-left-circle-shape', 'arrows-left-shape', 'arrows-m-down-shape', 'arrows-m-left-shape', 'arrows-m-right-shape', 'arrows-m-up-shape', 'arrows-right-circle-shape', 'arrows-right-shape', 'arrows-up-circle-shape', 'arrows-up-shape', 'back-shape', 'block-shape', 'calendar-shape', 'check-circle-shape', 'circle-shape', 'clipboard-shape', 'clock-shape', 'close-circle-shape', 'close3-shape', 'cog-shape', 'cry-shape', 'dashboard-2-shape', 'dashboard-shape', 'data-shape', 'data2-shape', 'dialogue-empty-shape', 'dialogue-shape', 'dispirited-shape', 'down-shape', 'email-shape', 'empty-shape', 'exclamation-circle-shape', 'exclamation-triangle-shape', 'eye-shape', 'eye-slash-shape', 'file-plus-shape', 'file-shape', 'folder-open-shape', 'folder-plus-shape', 'folder-shape', 'heart-shape', 'home-shape', 'id-shape', 'image-shape', 'info-circle-shape', 'left-shape', 'lock-shape', 'minus-circle-shape', 'minus-square-shape', 'mobile-shape', 'next-shape', 'order-shape', 'panel-shape', 'password-shape', 'pc-shape', 'pie-chart-shape', 'pipeline-shape', 'play-circle-shape', 'play-shape', 'plus-circle-shape', 'plus-square-shape', 'qq-shape', 'question-circle-shape', 'right-shape', 'save-shape', 'sina-shape', 'sitemap-shape', 'smile-shape', 'star-shape', 'stop-shape', 'tree-application-shape', 'tree-group-shape', 'tree-module-shape', 'tree-process-shape', 'unlock-shape', 'up-shape', 'user-shape', 'weixin-shape', 'rtx'
                ]
            }
        }
    }
</script>
<style>
    h3.icon-title {
        margin: 10px 0 20px;
    }
    .icon-wrapper {
        display: flex;
        flex-flow: row wrap;
        margin: 0;
        padding: 0;
        li {
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            width: 36px;
            height: 36px;
            margin-right: 15px;
            margin-bottom: 15px;
            font-size: 20px;
            border: 1px solid #c4c6cc;
        }
    }
</style>
```
:::
### 使用 svg 图标（支持彩色图标） {page=#/icon}

:::info
注意：如果要以 svg 的方式使用图标，需要单独引入
```js
import '{{BASE_LIB_NAME}}/lib/utils/svg-icon'
```
:::

:::demo 通过 type 来指定使用哪种 icon，点击图标复制。设置`svg="true"`以 svg 的方式使用图标，方便引入彩色 icon。

```html
<template>
    <ul class="icon-wrapper">
        <li v-for="icon in shapeIcons" :key="icon" :title="icon" @click="copySVGIconName(icon)">
            <bk-icon :type="icon" svg />
        </li>
    </ul>
</template>
<script>
    import { bkIcon } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkIcon
        },

        data () {
            return {
                shapeIcons: [
                    "apps-shape", "arrows-down-circle-shape", "arrows-down-shape", "arrows-left-circle-shape", "arrows-left-shape", "arrows-m-down-shape", "arrows-m-left-shape", "arrows-m-right-shape", "arrows-m-up-shape", "arrows-right-circle-shape", "arrows-right-shape", "arrows-up-circle-shape", "arrows-up-shape", "back-shape", "block-shape", "calendar-shape", "check-circle-shape", "circle-shape", "clipboard-shape", "clock-shape", "close-circle-shape", "close3-shape", "cog-shape", "cry-shape", "dashboard-2-shape", "dashboard-shape", "data-shape", "data2-shape", "dialogue-empty-shape", "dialogue-shape", "dispirited-shape", "down-shape", "email-shape", "empty-shape", "exclamation-circle-shape", "exclamation-triangle-shape", "eye-shape", "eye-slash-shape", "file-plus-shape", "file-shape", "folder-open-shape", "folder-plus-shape", "folder-shape", "heart-shape", "home-shape", "id-shape", "image-shape", "info-circle-shape", "left-shape", "lock-shape", "minus-circle-shape", "minus-square-shape", "mobile-shape", "next-shape", "order-shape", "panel-shape", "password-shape", "pc-shape", "pie-chart-shape", "pipeline-shape", "play-circle-shape", "play-shape", "plus-circle-shape", "plus-square-shape", "qq-shape", "question-circle-shape", "right-shape", "save-shape", "sina-shape", "sitemap-shape", "smile-shape", "star-shape", "stop-shape", "tree-application-shape", "tree-group-shape", "tree-module-shape", "tree-process-shape", "unlock-shape", "up-shape", "user-shape", "weixin-shape", "rtx"
                ]
            }
        }
    }
</script>
```
:::
### 自定义Icon组件 {page=#/icon}

```html
const MyIcon = bkIcon.create({
    fontLibrary: 'my-icon', // 默认bk-icon
    prefix: 'my' // icon
})

Vue.component('MyIcon', MyIcon)

<my-icon type="qq" />
```

### 属性 {page=#/icon}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| type | 图标类型 | String | 图标名 | - |
| svg | 使用svg输出图标 | Boolean | true/false | false |
| width | 使用svg图标时有效 | String | - | 1em |
| height | 使用svg图标时有效 | String | - | 1em |
