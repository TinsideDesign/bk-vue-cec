<script>
    import { bkButton } from '@'

    export default {
        components: {
            bkButton
        },
        data () {
            return {
                groupSetting1: {
                    selected: 'shenzhen'
                },
                groupSetting2: {
                    selected: 'beijing'
                },
                groupSetting3: {
                    selected: 'other'
                }
            }
        },
        methods: {
            handleClick (event) {
                console.log(event)
                alert('button clicked!')
            },
            toggleLock (e) {
                const iconNode = e.currentTarget.querySelector('.bk-icon')
                const classList = iconNode.classList
                if (classList.contains('icon-unlock-shape')) {
                    classList.remove('icon-unlock-shape')
                    classList.add('icon-lock-shape')
                } else if (classList.contains('icon-lock-shape')) {
                    classList.remove('icon-lock-shape')
                    classList.add('icon-unlock-shape')
                }
            }
        }
    }
</script>

[[toc]]

## Button 基础按钮
常用的操作按钮

<!-- :::exampleLink [更多示例](#/button/example) -->

### 基础按钮 {page=#/button}

:::demo 基础按钮提供 5 种主题，由 `theme` 属性来定义，可选的主题有 `default`, `primary`, `warning`, `success`, `danger`，默认为 `default`。

```html
<template>
    <bk-button :theme="'default'" type="submit" :title="'基础按钮'" @click="handleClick" class="mr10">
        基础按钮
    </bk-button>
    <bk-button :theme="'primary'" :title="'主要按钮'" class="mr10">
        主要按钮
    </bk-button>
</template>
<script>
    import { bkButton } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton
        },
        methods: {
            handleClick (event) {
                console.log(event)
                alert('button clicked!')
            }
        }
    }
</script>
```
:::

### 禁用按钮 {page=#/button}

:::demo 配置 `disabled` 属性来使按钮禁用

```html
<template>
    <bk-button title="disabled" :disabled="true" class="mr10">基础按钮</bk-button>
    <bk-button :theme="'primary'" :title="'主要按钮'" :disabled="true" class="mr10">主要按钮</bk-button>
</template>
<script>
    import { bkButton } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton
        }
    }
</script>
```
:::

### 图标按钮 {page=#/button}

带图标的按钮可增强辨识度。

:::demo 可以使用 `icon` 属性来定义按钮中文字左侧的图标，使用 `iconRight` 来定义按钮中文字右侧的图标。图标类名参照[TInside ICON](ICON_URL)（可省略类名中的 `icon-` 前缀）。***特别的，当 `icon` 或 `iconRight` 设置为 `loading` 的时候，会显示转圈的 loading 效果。***

```html
<template>
    <bk-button theme="default" title="新增" icon="plus" class="mr10">新增</bk-button>
    <bk-button theme="default" title="右侧" icon-right="icon-angle-down" class="mr10">下拉</bk-button>
    <bk-button title="toggle-lock" icon="icon-unlock-shape" @click="toggleLock" class="mr10"></bk-button>
    <bk-button title="loading" icon="loading" :disabled="true" class="mr10">loading</bk-button>
</template>
<script>
    import { bkButton } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton
        },
        data () {
            return {
            }
        },
        methods: {
            toggleLock (e) {
                const iconNode = e.currentTarget.querySelector('.bk-icon')
                const classList = iconNode.classList
                if (classList.contains('icon-unlock-shape')) {
                    classList.remove('icon-unlock-shape')
                    classList.add('icon-lock-shape')
                } else if (classList.contains('icon-lock-shape')) {
                    classList.remove('icon-lock-shape')
                    classList.add('icon-unlock-shape')
                }
            }
        }
    }
</script>
```
:::

### 按钮组 {page=#/button}

:::demo 可以把按钮放在容器 `div.bk-button-group`，实现按钮组效果。在按钮中添加 `is-selected` 类即可实现按钮选中效果。

```html
<template>
    <div class="mb15">
        <div class="bk-button-group">
            <bk-button @click="groupSetting1.selected = 'beijing'" :class="groupSetting1.selected === 'beijing' ? 'is-selected' : ''" size="small">北京</bk-button>
            <bk-button @click="groupSetting1.selected = 'shanghai'" :class="groupSetting1.selected === 'shanghai' ? 'is-selected' : ''" size="small">上海</bk-button>
            <bk-button @click="groupSetting1.selected = 'guangzhou'" :class="groupSetting1.selected === 'guangzhou' ? 'is-selected' : ''" size="small">广州</bk-button>
            <bk-button @click="groupSetting1.selected = 'shenzhen'" :class="groupSetting1.selected === 'shenzhen' ? 'is-selected' : ''" size="small">深圳</bk-button>
            <bk-button @click="groupSetting1.selected = 'other'" :class="groupSetting1.selected === 'other' ? 'is-selected' : ''" size="small" icon-right="icon-angle-down">其它</bk-button>
        </div>
    </div>
    <div class="mb15">
        <div class="bk-button-group">
            <bk-button @click="groupSetting2.selected = 'beijing'" :class="groupSetting2.selected === 'beijing' ? 'is-selected' : ''">北京</bk-button>
            <bk-button @click="groupSetting2.selected = 'shanghai'" :class="groupSetting2.selected === 'shanghai' ? 'is-selected' : ''">上海</bk-button>
            <bk-button @click="groupSetting2.selected = 'guangzhou'" :class="groupSetting2.selected === 'guangzhou' ? 'is-selected' : ''">广州</bk-button>
            <bk-button @click="groupSetting2.selected = 'shenzhen'" :class="groupSetting2.selected === 'shenzhen' ? 'is-selected' : ''">深圳</bk-button>
            <bk-button @click="groupSetting2.selected = 'other'" :class="groupSetting2.selected === 'other' ? 'is-selected' : ''" icon-right="icon-angle-down">其它</bk-button>
        </div>
    </div>
    <div>
        <div class="bk-button-group">
            <bk-button @click="groupSetting3.selected = 'beijing'" :class="groupSetting3.selected === 'beijing' ? 'is-selected' : ''" size="large">北京</bk-button>
            <bk-button @click="groupSetting3.selected = 'shanghai'" :class="groupSetting3.selected === 'shanghai' ? 'is-selected' : ''" size="large">上海</bk-button>
            <bk-button @click="groupSetting3.selected = 'guangzhou'" :class="groupSetting3.selected === 'guangzhou' ? 'is-selected' : ''" size="large">广州</bk-button>
            <bk-button @click="groupSetting3.selected = 'shenzhen'" :class="groupSetting3.selected === 'shenzhen' ? 'is-selected' : ''" size="large">深圳</bk-button>
            <bk-button @click="groupSetting3.selected = 'other'" :class="groupSetting3.selected === 'other' ? 'is-selected' : ''" size="large" icon-right="icon-angle-down">其它</bk-button>
        </div>
    </div>
</template>
<script>
    import { bkButton } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton
        },
        data () {
            return {
                groupSetting1: {
                    selected: 'shenzhen'
                },
                groupSetting2: {
                    selected: 'beijing'
                },
                groupSetting3: {
                    selected: 'other'
                }
            }
        }
    }
</script>
```
:::

### 尺寸 {page=#/button}

除了默认尺寸还提供另外两种尺寸，可根据不同场景选择合适的按钮

:::demo 可以使用 `size` 属性来定义按钮的尺寸，可接受 `small` `large`

```html
<template>
    <div class="mb15">
        <span class="f14 mr10" style="display: inline-block;width: 60px;">小尺寸</span>
        <bk-button size="small" class="mr10">基础按钮</bk-button>
        <bk-button size="small" icon="plus" class="mr10">新增</bk-button>
        <bk-button size="small" icon-right="icon-angle-down" class="mr10">下拉</bk-button>
        <bk-button size="small" :loading="true" class="mr10">loading</bk-button>
        <bk-button theme="primary" size="small" :loading="true" class="mr10">loading</bk-button>
        <bk-button theme="primary" size="small" title="成功" icon="icon-bk">成功</bk-button>
    </div>
    <div class="mb15">
        <span class="f14 mr10" style="display: inline-block;width: 60px;">正常尺寸</span>
        <bk-button class="mr10">基础按钮</bk-button>
        <bk-button icon="plus" class="mr10">新增</bk-button>
        <bk-button icon-right="icon-angle-down" class="mr10">下拉</bk-button>
        <bk-button :loading="true" class="mr10">loading</bk-button>
        <bk-button theme="primary" :loading="true" class="mr10">loading</bk-button>
        <bk-button theme="primary" title="成功" icon="icon-bk">成功</bk-button>
    </div>
    <div>
        <span class="f14 mr10" style="display: inline-block;width: 60px;">大尺寸</span>
        <bk-button size="large" class="mr10">基础按钮</bk-button>
        <bk-button size="large" icon="plus" class="mr10">新增</bk-button>
        <bk-button size="large" icon-right="icon-angle-down" class="mr10">下拉</bk-button>
        <bk-button size="large" :loading="true" class="mr10">loading</bk-button>
        <bk-button theme="primary" size="large" :loading="true" class="mr10">loading</bk-button>
        <bk-button theme="primary" size="large" title="成功" icon="icon-bk">成功</bk-button>
    </div>
</template>
<script>
    import { bkButton } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton
        }
    }
</script>
```
:::

### 文字按钮 {page=#/button}

:::demo 通过设置 `text` 属性来配置文字按钮。文字按钮同样提供 5 种主题，由 `theme` 属性来定义，可选的主题有 `default`,`primary`,`warning`,`success`,`danger`，默认为 `default`。另外可以使用 `disabled` 属性来定义按钮是否禁用，它接受一个 `Boolean` 值，从设计角度而言，对于文字按钮，我们仅提倡使用 主要按钮 与 危险按钮 两种

```html
<template>
    <div style="display: flex;">
        <div class="mr10" style="text-align: center;">
            <bk-button :text="true" title="文字按钮" theme="default">
                默认按钮
            </bk-button>
        </div>
        <div class="mr10" style="text-align: center;">
            <bk-button :text="true" title="文字按钮" theme="primary">
                主要按钮
            </bk-button>
        </div>
        <div class="mr10" style="text-align: center;">
            <bk-button :text="true" title="文字按钮" theme="warning">
                警告按钮
            </bk-button>
        </div>
        <div class="mr10" style="text-align: center;">
            <bk-button :text="true" title="文字按钮" theme="success">
                成功按钮
            </bk-button>
        </div>
        <div class="mr10" style="text-align: center;">
            <bk-button :text="true" title="文字按钮" theme="danger">
                危险按钮
            </bk-button>
        </div>
        <div class="mr10" style="text-align: center;">
            <bk-button title="文字按钮" :text="true" :disabled="true">
                禁用状态
            </bk-button>
        </div>
    </div>
</template>
<script>
    import { bkButton } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton
        }
    }
</script>
```
:::

### 加载中状态 {page=#/button}

点击按钮后如果需要进行数据异步操作，建议在按钮上显示加载状态

:::demo 可以使用 `loading` 属性来定义按钮是否显示加载中状态，它接受一个 `Boolean` 值。

```html
<template>
    <bk-button theme="default" title="加载中按钮" :loading="true" class="mr10">主要按钮</bk-button>
    <bk-button theme="primary" title="加载中按钮" :loading="true" class="mr10">主要按钮</bk-button>
    <bk-button theme="success" title="加载中按钮" :loading="true" class="mr10">主要按钮</bk-button>
    <bk-button theme="warning" title="加载中按钮" :loading="true" class="mr10">主要按钮</bk-button>
    <bk-button theme="danger" title="加载中按钮" :loading="true" class="mr10">主要按钮</bk-button>
</template>
<script>
    import { bkButton } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton
        }
    }
</script>
```
:::

### 反色按钮 {page=#/button}

:::demo 通过配置 `outline` 属性来实现反色按钮的效果，其中主题为 `default` 的按钮（默认按钮）不会有反色效果

```html
<template>
    <bk-button theme="default" title="反色按钮" :outline="true" class="mr10">
        默认按钮
    </bk-button>
    <bk-button theme="primary" title="反色按钮" :outline="true" class="mr10">
        主要按钮
    </bk-button>
    <bk-button theme="success" title="反色按钮" :outline="true" class="mr10">
        成功按钮
    </bk-button>
    <bk-button theme="warning" title="反色按钮" :outline="true" class="mr10">
        警告按钮
    </bk-button>
    <bk-button theme="danger" title="反色按钮" :outline="true" class="mr10">
        危险按钮
    </bk-button>
</template>
<script>
    import { bkButton } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton
        }
    }
</script>
```
:::

### mousehover 颜色自定义 {page=#/button}

:::demo 提供 4 种 mousehover 颜色主题，由 `hover-theme` 属性来定义，可选的主题有 `primary`, `warning`, `success`, `danger`。当设置了 `hover-theme` 属性时，`theme` 和 `text` 失效。

```html
<template>
    <bk-button title="primary" :text="true" :hover-theme="'primary'" class="mr10">
        primary
    </bk-button>
    <bk-button title="warning" :hover-theme="'warning'" class="mr10">
        warning
    </bk-button>
    <bk-button title="success" :hover-theme="'success'" class="mr10">
        success
    </bk-button>
    <bk-button title="danger" :hover-theme="'danger'" class="mr10">
        danger
    </bk-button>
</template>
<script>
    import { bkButton } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton
        }
    }
</script>
```
:::


### 属性 {page=#/button}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| theme | 按钮类型 | String | 可以用按钮样式【`default` `primary` `success` `warning` `danger`】 | `default` |
| hover-theme | mouseover 按钮类型，当设置了此属性时，`theme` 和 `text` 失效 | String | 可以用按钮样式【`primary` `success` `warning` `danger`】 | —— |
| size | 尺寸 | String |`small` `normal` `large` |`normal`|
| title | title 文案 | String | —— |
| icon | 左侧图标，设置为 loading 的时候，会显示转圈的 loading 效果。 | String | 参考[TInside ICON](ICON_URL)| —— |
| icon-right | 右侧图标，设置为 loading 的时候，会显示转圈的 loading 效果。 | String |参考[TInside ICON](ICON_URL)| —— |
| disabled | 是否禁用 | Boolean | `true` `false` | `false` |
| loading | 是否加载中 | Boolean | `true` `false` | `false` |
| outline | 是否显示反色按钮 | Boolean | `true` `false` | `false` |
| text | 是否是文字按钮 | Boolean | `true` `false` | `false` |
| ext-cls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `button` 上 | String | —— | —— |

### 事件 {page=#/button}
| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| click | 点击事件  | 事件对象 event |
