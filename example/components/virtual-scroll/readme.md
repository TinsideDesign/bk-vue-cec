<script>
    import { bkVirtualScroll, bkButton } from '@'
    import magicBoxPng from '../../img/magic.png'

    export default {
        components: {
            bkVirtualScroll,
            bkButton
        },

        mounted () {
            this.drawList()
        },

        methods: {
            addList () {
                const list = new Array(10000).fill(1)
                this.$refs.numberVirtualScroll.addListData(list)
            },

            drawList () {
                const item = { text: 'T-inside', pic: magicBoxPng }
                const numberList = new Array(10000000)
                if (this.$refs.numberVirtualScroll) {
                    this.$refs.numberVirtualScroll.setListData(numberList.fill(1))
                }
                const domList = new Array(100000)
                if (this.$refs.domVirtualScroll) {
                    this.$refs.domVirtualScroll.setListData(domList.fill(item))
                }
            },

            listChange (list) {
                console.log(list)
            }
        }
    }
</script>
<style lang="postcss">
    .number-virtual-scroll {
        height: 300px !important;
        width: 100%;
        background: black;
        color: #ffffff;
        font-family: Consolas, "Courier New", monospace;
        font-weight: normal;
        cursor: text;
        white-space: nowrap;
        letter-spacing: 0px;
        font-size: 12px;
        line-height: 16px;
        .item-txt {
            padding: 0 20px;
        }
    }
    .dom-virtual-scroll {
        height: 300px !important;
        width: 100%;
        background: black;
        color: #ffffff;
        font-family: Consolas, "Courier New", monospace;
        font-weight: normal;
        cursor: text;
        white-space: nowrap;
        letter-spacing: 0px;
        font-size: 12px;
        line-height: 30px;
        img {
            height: 20px;
        }
        .dom-virtual {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            border-bottom: 1px solid #fff;
        }
    }
</style>

[[toc]]

## VirtualScroll 虚拟滚动

### 基本使用方法 {page=#/virtual-scroll}

:::demo 可以通过`list`指定列表数据，后续改动list都会触发`setListData`方法更新数据。如果数据比较大，推荐在页面mounted的时候，调用`addListData`或者`setListData`方法添加数据，可以通过配置`show-index`来控制index是否显示，配置`item-height`来确定单个元素的高度。每次页面滚动会触发`change`事件，该事件的回调参数是最新展示的数据集合。

```html
<template>
    <bk-virtual-scroll ref="numberVirtualScroll"
        class="number-virtual-scroll"
        :show-index="true"
        :item-height="16"
        @change="listChange"
    >
        <template slot-scope="item">
            <span class="item-txt">{{item.data}}</span>
        </template>
    </bk-virtual-scroll>
    <bk-button @click="addList">添加数据</bk-button>
</template>
<script>
    import { bkVirtualScroll, bkButton } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkVirtualScroll,
            bkButton
        },

        mounted () {
            this.drawList()
        },

        methods: {
            addList () {
                const list = new Array(10000).fill(1)
                this.$refs.numberVirtualScroll.addListData(list)
            },

            drawList () {
                const list = new Array(10000000).fill(1)
                this.$refs.numberVirtualScroll.setListData(list)
            },

            listChange (list) {
                console.log(list)
            }
        }
    }
</script>
<style lang="postcss">
    .number-virtual-scroll {
        height: 300px;
        width: 100%;
        color: #ffffff;
        font-family: Consolas, "Courier New", monospace;
        font-weight: normal;
        cursor: text;
        white-space: nowrap;
        letter-spacing: 0px;
        font-size: 12px;
        line-height: 16px;
        .item-txt {
            padding: 0 20px;
        }
    }
</style>
```
:::

### 使用slot自定义区域内容 {page=#/virtual-scroll}

:::demo 给数据集合传入的数据，会在每个slot中原样返回，使用返回的数据绘制区域的内容即可。

```html
<template>
    <bk-virtual-scroll ref="domVirtualScroll"
        class="dom-virtual-scroll"
        :item-height="30"
    >
        <template slot-scope="item">
            <section class="dom-virtual">
                <img :src="item.data.pic">
                <span>{{item.data.text}}</span>
            </section>
        </template>
    </bk-virtual-scroll>
</template>
<script>
    import { bkVirtualScroll } from '{{BASE_LIB_NAME}}'
    import magicBoxPng from '../../img/magic.png'

    export default {
        components: {
            bkVirtualScroll
        },

        mounted () {
            this.drawList()
        },

        methods: {
            drawList () {
                const item = { text: 'T-inside', pic: magicBoxPng }
                const list = new Array(100000).fill(item)
                this.$refs.domVirtualScroll.setListData(list)
            }
        }
    }
</script>
<style lang="postcss">
    .dom-virtual-scroll {
        height: 300px !important;
        width: 100%;
        background: black;
        color: #ffffff;
        font-family: Consolas, "Courier New", monospace;
        font-weight: normal;
        cursor: text;
        white-space: nowrap;
        letter-spacing: 0px;
        font-size: 12px;
        line-height: 30px;
        img {
            height: 20px;
        }
        .dom-virtual {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            border-bottom: 1px solid #fff;
        }
    }
</style>
```
:::

### 属性 {page=#/virtual-scroll}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| item-height | 单个元素的高度 | Number | ——  | 16 |
| show-index | 是否显示序号 | Boolean | —— | false |
| list | 数据集合，数据变化会调用setListData，如果数据量比较大，推荐调用方法添加数据 | Array | ——  | [] |
| ext-cls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `.bk-scroll-home` 上 | String | —— | —— |

### 方法 {page=#/virtual-scroll}
| 参数 | 说明 | 参数 |
|------|------|------|
| addListData | 给列表集合添加数据 | 数据集合 |
| setListData | 设置列表集合数据 | 数据集合 |
| scrollPageByIndex | 根据序号滚动页面 | 序号 |
| drawMinNav | 根据序号在滚动条绘制定位点 | 序号集合 |

### 事件 {page=#/virtual-scroll}
| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| change | 列表纵向滚动触发的事件 | 滚动后视口展示的数据集合 |
| horizontal-scroll | 列表横向滚动触发的事件 | 底部滚动条距离左侧的距离 |

### 插槽 {page=#/virtual-scroll}
| 插槽名称 | 说明 | 参数 |
|------|------|------|
| default | 内容区插槽 | 当前行数据 |
| index | 索引区插槽 | 当前行索引 |
