<script>
    import Vue from 'vue'
    import { bkButton, bkClickoutside, bkOverflowTips, bkInput, bkCopy } from '@'

    export default {
        components: {
            bkButton,
            bkInput
        },
        directives: {
            bkClickoutside,
            bkOverflowTips,
            bkCopy
        },
        data () {
            return {
                text: '点击测试'
            }
        },
        methods: {
            handleClickButton () {
                this.text = '点击了button'
            },
            handleClickOutSide (e) {
                this.text = `你点击了 x:${e.x} y:${e.y}`
            }
        }
    }
</script>

<style>
    .overflow {
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .input-demo {
        width: 500px;
    }

    .mt10 {
        margin-top:20px
    }
</style>

[[toc]]

## 自定义指令

一些常用自定义指令

### v-bk-clickoutside {page=#/directives}

:::demo 可以接受除绑定元素之外所有点击的响应

```html
<template>
    <bk-button @click="handleClickButton" v-bk-clickoutside="handleClickOutSide">{{text}}</bk-button>
</template>

<script>
    import { bkButton, bkClickoutside } from '{{BASE_LIB_NAME}}'

    export default {
        name: 'demo',
        components: {
            bkButton
        },
        directives: {
            bkClickoutside
        },
        data () {
            return {
                text: '测试'
            }
        },
        methods: {
            handleClickButton () {
                this.text = '点击了button'
            },
            handleClickOutSide (e) {
                this.text = `你点击了 x:${e.x} y:${e.y}`
            }
        }
    }
</script>
```
:::

### v-bk-clickoutside 指令回调 {page=#/clickoutside}
| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| click | 除绑定元素以外 click 回调 | mousedownEvent, mouseupEvent, el(绑定元素的dom) |



### v-bk-overflow-tips {page=#/directives}

:::demo 元素文本内容溢出后，自动添加tooltips显示全部内容

```html
<template>
    <div>
        <div class="overflow" v-bk-overflow-tips>
            元素文本内容溢出后，自动添加tooltips显示全部内容
        </div>
        <br>
        <div class="overflow" v-bk-overflow-tips="{ content: '这是自定义的溢出后的提示语' }">
            通过配置content，可以自定义内容溢出后的内容
        </div>
        <br>
        <div class="overflow" v-bk-overflow-tips="{ allowHTML: true, interactive: true }">
            默认读取溢出的文本内容，通过配置allowHTML,读取html内容.
            <a href="/" style="color: white;">首页</a>
        </div>
    </div>
</template>

<script>
    import { bkButton, bkOverflowTips } from '{{BASE_LIB_NAME}}'

    export default {
        directives: {
            bkOverflowTips
        }
    }
</script>
```
:::

### v-bk-clickoutside 参数配置 {page=#/clickoutside}
| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| click | 除绑定元素以外 click 回调 | mousedownEvent, mouseupEvent, el(绑定元素的dom) |

### v-bk-copy {page=#/directives}

:::demo 点击事件后，自动复制目标文本

```html
<template>
    <div>
        <div class="input-demo">
            <bk-input v-model="copyText"></bk-input>
            <bk-button :theme="'default'" class="mt20" v-bk-copy="copyText">
                点击复制
            </bk-button>
        </div>
    </div>
</template>

<script>
    import { bkInput, bkCopy, bkButton } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkButton,
            bkInput
        },
        directives: {
            bkCopy
        },
        data () {
            return {
                copyText: ''
            }
        }
    }
</script>

<style lang="postcss">
    .input-demo {
        width: 500px;
    }
    .mt20 {
        margin-top: 20px
    }
</style>
```
:::
### v-bk-copy 参数配置 {page=#/directives}
| 参数 | 说明 |
|------|------|
| copyText | 需要复制的文本 |