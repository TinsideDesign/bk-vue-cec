<script>
    import { bkTag, bkButton, bkInput } from '@'

    export default {
        components: {
            bkTag,
            bkButton,
            bkInput
        },
        data () {
            return {
                isAddTag: false,
                value: '',
                defaultTags: ['企业邮箱', '腾讯视频', 'TI运维平台', '企业微信'],
                tags: ['企业邮箱', '腾讯视频', 'TI运维平台', '企业微信'],
                checkedTags: []
            }
        },
        methods: {
            /** 点击新增tag */
            addTag () {
                this.isAddTag = !this.isAddTag
                this.$nextTick(() => {
                    this.$refs.tagInput.$refs.input.focus()
                })
            },
            /** 新增tag */
            handleAddTag (value) {
                if (value) {
                    this.defaultTags.push(value)
                }
                this.isAddTag = false
                this.value = ''
            },
            closeTag (key) {
                const index = this.defaultTags.findIndex(item => item === key)
                this.defaultTags.splice(index, 1)
            },
            close (e) {
                console.log('关闭Tag', e)
            },
            /** 点击选中 */
            change (checked, tag) {
                this.checkedTags = checked ? [...this.checkedTags, tag] : this.checkedTags.filter(item => item !== tag)
            }
        }
    }
</script>
<style>
.tag-view {
    margin-top: 8px;
}
.tag-view .new-tag-btn {
    color: #979ba5;
    padding: 0;
    min-width: 28px;
    margin-left: 10px;
}
.new-tag-input {
    width: 100px;
    margin-left: 10px;
}
.custom-tag {
    color: #531dab;
    background: #f9f0ff;
}
</style>

[[toc]]

## Tag 标签

用于标记事物的属性 & 维度和分类的小标签


### 基础用法 {page=#/tags}
:::demo 通过 `theme` 设置不同的主题， `success / info / warning / danger`.  也可通过 `ext-cls` 配置自定义样式类名

```html
<template>
    <div class="tag-view">
        <bk-tag>TInside</bk-tag>
        <bk-tag theme="success">企业邮箱</bk-tag>
        <bk-tag theme="info">腾讯视频</bk-tag>
        <bk-tag theme="warning">TI运维平台</bk-tag>
        <bk-tag theme="danger">企业微信</bk-tag>
        <bk-tag ext-cls="custom-tag">企业微信</bk-tag>
    </div>
</template>
<script>
    import { bkTag } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkTag
        }
    }
</script>
<style lang="postcss">
    .tag-view {
        margin-top: 8px;
    }
    .custom-tag {
        color: #531dab;
        background: #f9f0ff;
    }
</style>
```
:::

### 自定义圆角 {page=#/tags}
:::demo 通过 `radius` 配置项可自定义圆角大小

```html
<template>
    <bk-tag>TInside</bk-tag>
    <bk-tag theme="success" radius="5px">企业邮箱</bk-tag>
    <bk-tag theme="info" radius="10px">腾讯视频</bk-tag>
    <bk-tag theme="warning" radius="45px">TI运维平台</bk-tag>
    <bk-tag theme="danger" radius="45%">企业微信</bk-tag>
</template>
<script>
    import { bkTag } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkTag
        }
    }
</script>
```
:::

### 带图标Icon标签 {page=#/tags}
可以添加 icon 的 Tag
:::demo 通过 `icon` 属性给 Tag 添加 icon

```html
<template>
    <bk-tag icon="icon-weixin">微信</bk-tag>
    <bk-tag icon="icon-qq">QQ</bk-tag>
    <bk-tag icon="icon-bk">TInside</bk-tag>
    <bk-tag icon="icon-sina">新浪</bk-tag>
</template>
<script>
    import { bkTag } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkTag
        }
    }
</script>
```
:::

### 可关闭标签 {page=#/tags}
点击关闭标签
:::demo 通过设置 `closable` 定义 Tag 是否可移除

```html
<template>
    <bk-tag closable @close="close">企业邮箱</bk-tag>
    <bk-tag closable @close="close">腾讯视频</bk-tag>
    <bk-tag closable @close="close">TI运维平台</bk-tag>
</template>
<script>
    import { bkTag } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkTag
        },
        methods: {
            close (e) {
                console.log(e)
            }
        }
    }
</script>
```
:::

### 动态编辑标签 {page=#/tags}
可以动态删除和添加 (回车添加)
:::demo

```html
<template>
    <div class="tag-view">
        <template v-for="tag in defaultTags">
            <bk-tag
                closable
                :key="tag"
                @close="closeTag(tag)">
            {{tag}}
            </bk-tag>
        </template>
        <bk-button
            v-if="!isAddTag"
            ext-cls="new-tag-btn"
            icon="plus"
            size="small"
            @click="addTag">
        </bk-button>
        <bk-input
            v-else
            ref="tagInput"
            class="new-tag-input"
            size="small"
            v-model="value"
            @enter="handleAddTag"></bk-input>
    </div>
</template>
<script>
    import { bkTag } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkTag
        },
        data () {
            return {
                isAddTag: false,
                value: '',
                defaultTags: ['企业邮箱', '腾讯视频', 'TI运维平台', '企业微信']
            }
        },
        methods: {
            addTag () {
                this.isAddTag = !this.isAddTag
            },
            handleAddTag (value) {
                if (value) {
                    this.defaultTags.push(value)
                }
                this.isAddTag = false
                this.value = ''
            },
            closeTag (key) {
                const index = this.defaultTags.findIndex(item => item === key)
                this.defaultTags.splice(index, 1)
            }
        }
    }
</script>
<style lang="postcss">
    .tag-view {
        margin-top: 8px;
    }
    .tag-view .new-tag-btn {
        color: #979ba5;
        padding: 0;
        min-width: 28px;
        margin-left: 10px;
    }
    .new-tag-input {
        width: 100px;
        margin-left: 10px;
    }
</style>
```
:::

### 不同样式 {page=#/tags}
基础样式，填充式，描边式
:::demo 通过 `type` 设置不同的样式，默认是基础样式，还提供填充式（filled），描边式（stroke）

```html
<template>
    <div class="tag-view">
        <bk-tag>TInside</bk-tag>
        <bk-tag theme="success">企业邮箱</bk-tag>
        <bk-tag theme="info">腾讯视频</bk-tag>
        <bk-tag theme="warning">TI运维平台</bk-tag>
        <bk-tag theme="danger">企业微信</bk-tag>
    </div>
    <div class="tag-view">
        <bk-tag type="stroke">TInside</bk-tag>
        <bk-tag theme="success" type="stroke">企业邮箱</bk-tag>
        <bk-tag theme="info" type="stroke">腾讯视频</bk-tag>
        <bk-tag theme="warning" type="stroke">TI运维平台</bk-tag>
        <bk-tag theme="danger" type="stroke">企业微信</bk-tag>
    </div>
    <div class="tag-view">
        <bk-tag type="filled">TInside</bk-tag>
        <bk-tag theme="success" type="filled">企业邮箱</bk-tag>
        <bk-tag theme="info" type="filled">腾讯视频</bk-tag>
        <bk-tag theme="warning" type="filled">TI运维平台</bk-tag>
        <bk-tag theme="danger" type="filled">企业微信</bk-tag>
    </div>
</template>
<script>
    import { bkTag } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkTag
        }
    }
</script>
```
:::

### 可选择标签 {page=#/tags}
点击后即可选中, 再次点击取消
:::demo  配置 `checkable` 实现点击切换选中效果，`checked` 可设置标签的选中状态

```html
<template>
    <template v-for="tag in tags">
        <bk-tag
            checkable
            :checked="checkedTags.indexOf(tag) > -1"
            :key="tag"
            @change="checked => change(checked, tag)">
        {{tag}}
        </bk-tag>
    </template>
</template>
<script>
    import { bkTag } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkTag
        },
        data () {
            return {
                tags: ['企业邮箱', '腾讯视频', 'TI运维平台', '企业微信'],
                checkedTags: []
            }
        },
        methods: {
            change (checked, tag) {
                this.checkedTags = checked ? [...this.checkedTags, tag] : this.checkedTags.filter(item => item !== tag)
            }
        }
    }
</script>

```
:::


### 属性 {page=#/tags}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| closable | 标签是否可以关闭 | Boolean | true / false | false |
| icon | 设置图标 | String | - | -  |
| theme | 主题 | String | success / info / warning / danger | -  |
| effect | 类型 | String | filled(填充式) / stroke(描边式) | - |
| checkable | 是否点击选中 | Boolean | true / false | false |
| checked | 设置标签的选中状态，跟 checkable 配合使用 | Boolean | true / false | false |
| radius | 标签圆角设置 | String | - | 2px |
| ext-cls | 配置自定义样式类名 | String | - | - |


### 事件 {page=#/tags}
| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| close | 关闭 Tag 时触发的事件  | event |
| change | 当可选择标签时，点击 Tag 时触发的事件  | 新状态值（Boolean） |
