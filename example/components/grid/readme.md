<script>
    import { bkContainer, bkCol, bkRow } from '@'
    export default {
        components: {
            bkContainer,
            bkCol,
            bkRow
        }
    }
</script>
<style lang="postcss">
    .demo-grid {
        .wrapper {
            overflow: hidden;
            border: 1px solid #ddd;
            border-radius: 2px;
            padding: 20px 0;
        }
        .content {
            background-color: #E6F0FF;
            height: 100%;
            line-height: 60px;
            border-radius: 2px;
            font-size: 12px;
        }

        .bk-grid-row {
            text-align: center;
        }

        .bk-grid-row + .bk-grid-row {
            margin-top: 30px;
        }

        .flex {
            .bk-grid-row + .bk-grid-row {
                margin-top: 10px;
            }
        }
    }
</style>

[[toc]]

## Grid 栅格
通过栅格系统，迅速简便地创建布局。

:::exampleLink [更多示例](#/grid/example)

### 基础布局 {page=#/grid}

:::demo 创建基础的栅格布局。默认采用 24 栅格系统，将区域进行 24 等分。

```html
<template>
    <div class="wrapper">
        <bk-container>
            <bk-row>
                <bk-col><div class="content">1/24</div></bk-col>
                <bk-col><div class="content">1/24</div></bk-col>
                <bk-col><div class="content">1/24</div></bk-col>
                <bk-col><div class="content">1/24</div></bk-col>
                <bk-col><div class="content">1/24</div></bk-col>
                <bk-col><div class="content">1/24</div></bk-col>
                <bk-col><div class="content">1/24</div></bk-col>
                <bk-col><div class="content">1/24</div></bk-col>
                <bk-col><div class="content">1/24</div></bk-col>
                <bk-col><div class="content">1/24</div></bk-col>
                <bk-col><div class="content">1/24</div></bk-col>
                <bk-col><div class="content">1/24</div></bk-col>
                <bk-col><div class="content">1/24</div></bk-col>
                <bk-col><div class="content">1/24</div></bk-col>
                <bk-col><div class="content">1/24</div></bk-col>
                <bk-col><div class="content">1/24</div></bk-col>
                <bk-col><div class="content">1/24</div></bk-col>
                <bk-col><div class="content">1/24</div></bk-col>
                <bk-col><div class="content">1/24</div></bk-col>
                <bk-col><div class="content">1/24</div></bk-col>
                <bk-col><div class="content">1/24</div></bk-col>
                <bk-col><div class="content">1/24</div></bk-col>
                <bk-col><div class="content">1/24</div></bk-col>
                <bk-col><div class="content">1/24</div></bk-col>
            </bk-row>
        </bk-container>
    </div>
</template>
<script>
    import { bkContainer, bkCol, bkRow } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkContainer,
            bkCol,
            bkRow
        }
    }
</script>
<style lang="postcss">
    .demo-grid {
        .wrapper {
            overflow: hidden;
            border: 1px solid #ddd;
            border-radius: 2px;
            padding: 20px 0;
        }
        .content {
            background-color: #E6F0FF;
            height: 100%;
            line-height: 60px;
            border-radius: 2px;
            font-size: 12px;
        }

        .bk-grid-row {
            text-align: center;
        }

        .bk-grid-row + .bk-grid-row {
            margin-top: 30px;
        }

        .flex {
            .bk-grid-row + .bk-grid-row {
                margin-top: 10px;
            }
        }
    }
</style>
```
:::

### 自定义设置栅格数以及整个栅格容器的左右边距 {page=#/grid}

:::demo 通过 `bk-container` 的 `col` 属性来设置栅格数，这里设置成 `12`，将区域进行 `12` 等分，通过 `bk-container` 的 `margin` 属性来整个栅格容器的左右边距。

```html
<template>
    <div class="wrapper">
        <bk-container :col="12" :margin="6">
            <bk-row>
                <bk-col><div class="content">1/12</div></bk-col>
                <bk-col><div class="content">1/12</div></bk-col>
                <bk-col><div class="content">1/12</div></bk-col>
                <bk-col><div class="content">1/12</div></bk-col>
                <bk-col><div class="content">1/12</div></bk-col>
                <bk-col><div class="content">1/12</div></bk-col>
                <bk-col><div class="content">1/12</div></bk-col>
                <bk-col><div class="content">1/12</div></bk-col>
                <bk-col><div class="content">1/12</div></bk-col>
                <bk-col><div class="content">1/12</div></bk-col>
                <bk-col><div class="content">1/12</div></bk-col>
                <bk-col><div class="content">1/12</div></bk-col>
            </bk-row>
        </bk-container>
    </div>
</template>
<script>
    import { bkContainer, bkCol, bkRow } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkContainer,
            bkCol,
            bkRow
        }
    }
</script>
<style lang="postcss">
    .demo-grid {
        .wrapper {
            overflow: hidden;
            border: 1px solid #ddd;
            border-radius: 2px;
            padding: 20px 0;
        }
        .content {
            background-color: #E6F0FF;
            height: 100%;
            line-height: 60px;
            border-radius: 2px;
            font-size: 12px;
        }

        .bk-grid-row {
            text-align: center;
        }

        .bk-grid-row + .bk-grid-row {
            margin-top: 30px;
        }

        .flex {
            .bk-grid-row + .bk-grid-row {
                margin-top: 10px;
            }
        }
    }
</style>
```
:::

### 自定义设置栅格之间的边距以及每个栅格的占位数 {page=#/grid}

:::demo 通过 `bk-container` 的 `gutter` 属性来设置栅格之间的间隔，通过 `bk-col` 的 `span` 属性来设置栅格的占位数。

```html
<template>
    <div class="wrapper">
        <bk-container :col="12" :gutter="4">
            <bk-row>
                <bk-col><div class="content">1/12</div></bk-col>
                <bk-col><div class="content">1/12</div></bk-col>
                <bk-col><div class="content">1/12</div></bk-col>
                <bk-col><div class="content">1/12</div></bk-col>
                <bk-col><div class="content">1/12</div></bk-col>
                <bk-col><div class="content">1/12</div></bk-col>
                <bk-col><div class="content">1/12</div></bk-col>
                <bk-col><div class="content">1/12</div></bk-col>
                <bk-col><div class="content">1/12</div></bk-col>
                <bk-col><div class="content">1/12</div></bk-col>
                <bk-col><div class="content">1/12</div></bk-col>
                <bk-col><div class="content">1/12</div></bk-col>
            </bk-row>
            <bk-row>
                <bk-col :span="7"><div class="content">7/12</div></bk-col>
                <bk-col :span="5"><div class="content">5/12</div></bk-col>
            </bk-row>
        </bk-container>
    </div>
</template>
<script>
    import { bkContainer, bkCol, bkRow } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkContainer,
            bkCol,
            bkRow
        }
    }
</script>
<style lang="postcss">
    .demo-grid {
        .wrapper {
            overflow: hidden;
            border: 1px solid #ddd;
            border-radius: 2px;
            padding: 20px 0;
        }
        .content {
            background-color: #E6F0FF;
            height: 100%;
            line-height: 60px;
            border-radius: 2px;
            font-size: 12px;
        }

        .bk-grid-row {
            text-align: center;
        }

        .bk-grid-row + .bk-grid-row {
            margin-top: 30px;
        }

        .flex {
            .bk-grid-row + .bk-grid-row {
                margin-top: 10px;
            }
        }
    }
</style>
```
:::

### 自定义设置栅格的顺序以及栅格的偏移 {page=#/grid}

:::demo 通过 `bk-col` 的 `push` 和 `pull` 属性来设置栅格的顺序。通过 `bk-col` 的 `offset` 属性设置栅格的偏移。

```html
<template>
    <div class="wrapper">
        <bk-container :col="12">
            <bk-row>
                <bk-col :span="7" :push="5"><div class="content">7/12 (push: 5)</div></bk-col>
                <bk-col :span="5" :pull="7"><div class="content">5/12 (pull: 7)</div></bk-col>
            </bk-row>
            <bk-row>
                <bk-col :span="3" :push="9"><div class="content">3/12 (push: 9)</div></bk-col>
                <bk-col :span="9" :pull="3"><div class="content">9/12 (pull: 3)</div></bk-col>
            </bk-row>
            <bk-row>
                <bk-col :span="4" :offset="3"><div class="content">4/12 (offset: 3)</div></bk-col>
                <bk-col :span="5"><div class="content">5/12</div></bk-col>
            </bk-row>
            <bk-row>
                <bk-col :span="4" :push="8"><div class="content">4/12 (push: 8)</div></bk-col>
                <bk-col :span="3" :offset="-4"><div class="content">3/12 (offset: -4)</div></bk-col>
            </bk-row>
        </bk-container>
    </div>
</template>
<script>
    import { bkContainer, bkCol, bkRow } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkContainer,
            bkCol,
            bkRow
        }
    }
</script>
<style lang="postcss">
    .demo-grid {
        .wrapper {
            overflow: hidden;
            border: 1px solid #ddd;
            border-radius: 2px;
            padding: 20px 0;
        }
        .content {
            background-color: #E6F0FF;
            height: 100%;
            line-height: 60px;
            border-radius: 2px;
            font-size: 12px;
        }

        .bk-grid-row {
            text-align: center;
        }

        .bk-grid-row + .bk-grid-row {
            margin-top: 30px;
        }

        .flex {
            .bk-grid-row + .bk-grid-row {
                margin-top: 10px;
            }
        }
    }
</style>
```
:::

### flex 布局 {page=#/grid}

:::demo 通过 `bk-container` 的 `flex` 属性来开启 `flex` 布局，配合 `bk-col`, `bk-row` 的嵌套使用来实现更复杂的布局。

```html
<template>
    <div class="wrapper flex">
        <bk-container flex :col="12">
            <bk-row>
                <bk-col :span="4"><div class="content">4/12</div></bk-col>
                <bk-col :span="8">
                    <bk-row>
                        <bk-col :span="4"><div class="content">4/12</div></bk-col>
                        <bk-col :span="4"><div class="content">4/12</div></bk-col>
                    </bk-row>
                    <bk-row>
                        <bk-col :span="3"><div class="content">3/12</div></bk-col>
                        <bk-col :span="5"><div class="content">5/12</div></bk-col>
                    </bk-row>
                </bk-col>
            </bk-row>
        </bk-container>
    </div>
</template>
<script>
    import { bkContainer, bkCol, bkRow } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkContainer,
            bkCol,
            bkRow
        }
    }
</script>
<style lang="postcss">
    .demo-grid {
        .wrapper {
            overflow: hidden;
            border: 1px solid #ddd;
            border-radius: 2px;
            padding: 20px 0;
        }
        .content {
            background-color: #E6F0FF;
            height: 100%;
            line-height: 60px;
            border-radius: 2px;
            font-size: 12px;
        }

        .bk-grid-row {
            text-align: center;
        }

        .bk-grid-row + .bk-grid-row {
            margin-top: 30px;
        }

        .flex {
            .bk-grid-row + .bk-grid-row {
                margin-top: 10px;
            }
        }
    }
</style>
```
:::

### 栅格布局集合 {page=#/grid}

:::demo 栅格布局集合

```html
<template>
    <div class="wrapper">
        <bk-container :col="12">
            <bk-row>
                <bk-col :span="0"><div class="content">12/12</div></bk-col>
            </bk-row>
            <bk-row>
                <bk-col :span="6"><div class="content">6/12</div></bk-col>
                <bk-col :span="6"><div class="content">6/12</div></bk-col>
            </bk-row>
            <bk-row>
                <bk-col :span="4"><div class="content">4/12</div></bk-col>
                <bk-col :span="4"><div class="content">4/12</div></bk-col>
                <bk-col :span="4"><div class="content">4/12</div></bk-col>
            </bk-row>
            <bk-row>
                <bk-col :span="3"><div class="content">3/12</div></bk-col>
                <bk-col :span="3"><div class="content">3/12</div></bk-col>
                <bk-col :span="3"><div class="content">3/12</div></bk-col>
                <bk-col :span="3"><div class="content">3/12</div></bk-col>
            </bk-row>
            <bk-row>
                <bk-col :span="2"><div class="content">2/12</div></bk-col>
                <bk-col :span="2"><div class="content">2/12</div></bk-col>
                <bk-col :span="2"><div class="content">2/12</div></bk-col>
                <bk-col :span="2"><div class="content">2/12</div></bk-col>
                <bk-col :span="2"><div class="content">2/12</div></bk-col>
                <bk-col :span="2"><div class="content">2/12</div></bk-col>
            </bk-row>
            <bk-row>
                <bk-col :span="1"><div class="content">1/12</div></bk-col>
                <bk-col :span="1"><div class="content">1/12</div></bk-col>
                <bk-col :span="1"><div class="content">1/12</div></bk-col>
                <bk-col :span="1"><div class="content">1/12</div></bk-col>
                <bk-col :span="1"><div class="content">1/12</div></bk-col>
                <bk-col :span="1"><div class="content">1/12</div></bk-col>
                <bk-col :span="1"><div class="content">1/12</div></bk-col>
                <bk-col :span="1"><div class="content">1/12</div></bk-col>
                <bk-col :span="1"><div class="content">1/12</div></bk-col>
                <bk-col :span="1"><div class="content">1/12</div></bk-col>
                <bk-col :span="1"><div class="content">1/12</div></bk-col>
                <bk-col :span="1"><div class="content">1/12</div></bk-col>
            </bk-row>
            <bk-row>
                <bk-col :span="8"><div class="content">8/12</div></bk-col>
                <bk-col :span="4"><div class="content">4/12</div></bk-col>
            </bk-row>
            <bk-row>
                <bk-col :span="3"><div class="content">3/12</div></bk-col>
                <bk-col :span="6"><div class="content">6/12</div></bk-col>
                <bk-col :span="3"><div class="content">3/12</div></bk-col>
            </bk-row>
        </bk-container>
    </div>
</template>
<script>
    import { bkContainer, bkCol, bkRow } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkContainer,
            bkCol,
            bkRow
        }
    }
</script>
<style lang="postcss">
    .demo-grid {
        .wrapper {
            overflow: hidden;
            border: 1px solid #ddd;
            border-radius: 2px;
            padding: 20px 0;
        }
        .content {
            background-color: #E6F0FF;
            height: 100%;
            line-height: 60px;
            border-radius: 2px;
            font-size: 12px;
        }

        .bk-grid-row {
            text-align: center;
        }

        .bk-grid-row + .bk-grid-row {
            margin-top: 30px;
        }

        .flex {
            .bk-grid-row + .bk-grid-row {
                margin-top: 10px;
            }
        }
    }
</style>
```
:::

### bk-container 属性 {page=#/grid}

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| col | 栅格数 | Number | —— | `24` |
| gutter | 栅格之间的间距 | Number | —— | `20` |
| margin | 栅格容器的左右外边距 | Number | —— | `20` |
| flex | 是否启用 `flex` 布局 | Boolean | `true` / `false` | `false` |
| ext-cls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `.bk-grid-container` 上 | String | —— | —— |

### bk-col 属性 {page=#/grid}

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| span | 栅格的占位格数，当设置为 0 时，则自动设置为 col 相当于 width: 100% | Number | —— | `1` |
| offset | 栅格的偏移 | Number | —— | `0` |
| pull | 栅格向左移动格数 | Number | —— | `0` |
| push | 栅格向右移动格数 | Number | —— | `0` |
