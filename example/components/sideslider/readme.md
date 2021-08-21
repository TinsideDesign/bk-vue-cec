<script>
    import { bkButton, bkSideslider, bkSelect, bkOption, bkOptionGroup, bkDialog } from '@'
    //  import { bkSelect, bkOption } from '@'

    export default {
        components: {
            bkButton,
            bkSideslider,
            bkSelect,
            bkOption,
            bkOptionGroup,
            bkDialog
        },
        data () {
            return {
                defaultSettings: {
                    isShow: false
                },
                customSettings: {
                    isShow: false,
                    title: '更多参数配置'
                },
                footerSetting: {
                    isShow: false,
                    height: '200px'
                },
                moreSettings: {
                    isShow: false,
                    quickClose: true,
                    width: 500,
                    direction: 'left'
                },
                multi1: {
                    isShow: false,
                    quickClose: true,
                    width: 1000
                },
                multi2: {
                    isShow: false,
                    quickClose: true,
                    width: 500
                },
                dialog1: {
                    primary: {
                        visiable: false,
                        headerPosition: 'left'
                    }
                },
                dialog2: {
                    custom2: {
                        visiable: false,
                        headerPosition: 'left',
                        okText: '按钮1',
                        cancelText: '按钮2'
                    }
                },
                exampleSetting5: {
                    primary: {
                        visiable: false,
                        headerPosition: 'left'
                    }
                },
                exampleSetting6: {
                    custom: {
                        visiable: false,
                        headerPosition: 'left',
                        okText: '按钮1',
                        cancelText: '按钮2',
                        headerPosition: 'left'
                    }
                },
                select: {
                    value: '',
                    multipleValue: [1],
                    groupValue: ['1-1'],
                    list: [
                        { id: 1, name: '爬山' },
                        { id: 2, name: '跑步' },
                        { id: 3, name: '打球' },
                        { id: 4, name: '跳舞' },
                        { id: 5, name: '健身' },
                        { id: 6, name: '骑车' },
                        { id: 7, name: 'k8s' },
                        { id: 8, name: 'K8S' },
                        { id: 9, name: 'mesos' },
                        { id: 10, name: 'MESOS' }
                    ],
                    groupList: [
                        {
                            id: 1,
                            name: '爬山',
                            children: [
                                { id: '1-1', name: '爬山-1' },
                                { id: '1-2', name: '爬山-2' }
                            ]
                        },
                        {
                            id: 2,
                            name: '跑步',
                            children: [
                                { id: '2-1', name: '跑步-1' },
                                { id: '2-2', name: '跑步-2' }
                            ]
                        }
                    ]
                }
            }
        },
        methods: {
            shownMoreSettings () {
                console.log('组件已打开')
            },
            hiddenMoreSettings () {
                console.log('组件已关闭')
            },
            beforeClose () {
                alert('确定关闭侧栏?')
                return true
            },
            animationEnd () {
                alert('关闭动画已结束')
            },
            handleSetHeight (v) {
                this.footerSetting.height = v ? '1000px' : '400px'
            }
        }
    }
</script>

[[toc]]

## Sideslider 侧栏

提供一个从两侧滑入的组件，供用户填写/查看更多信息

### 基础用法 {page=#/sideslider}

:::demo 使用默认配置的组件

```html
<template>
    <div>
        <bk-button :type="'primary'" @click="defaultSettings.isShow = true">默认配置</bk-button>
        <bk-sideslider :is-show.sync="defaultSettings.isShow" :quick-close="true">
            <div slot="content">
            </div>
        </bk-sideslider>
    </div>
</template>

<script>
    import { bkButton, bkSideslider } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton,
            bkSideslider
        },
        data () {
            return {
                defaultSettings: {
                    isShow: false
                }
            }
        }
    }
</script>
```
:::

### 自定义标题和内容 {page=#/sideslider}

:::demo 配置 `title` 参数和添加 `slot`

```html
<template>
    <div>
        <bk-button :type="'primary'" @click="customSettings.isShow = true">自定义标题和内容</bk-button>
        <bk-sideslider :is-show.sync="customSettings.isShow" :quick-close="true">
            <div slot="header">{{ customSettings.title }}</div>
            <div class="p20" slot="content">
                自定义内容
            </div>
        </bk-sideslider>
    </div>
</template>

<script>
    import { bkButton, bkSideslider } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton,
            bkSideslider
        },
        data () {
            return {
                customSettings: {
                    isShow: false,
                    title: '更多参数配置'
                }
            }
        }
    }
</script>
```
:::

### 自定义footer {page=#/sideslider}

:::demo 配置`footer`插槽，`footer`插槽内容会随着内容区的高度变化而变化

```html
<template>
    <div>
        <bk-button :type="'primary'" @click="footerSetting.isShow = true">配置footer</bk-button>
        <bk-sideslider :is-show.sync="footerSetting.isShow">
            <div slot="content">
                <div style="text-align: center; padding-top: 20px;" :style="{height: footerSetting.height, }">
                    我是内容区，当前高度{{footerSetting.height}}
                </div>
            </div>
            <div slot="footer">
                <bk-button style="margin-left: 30px;" theme="primary" @click="handleSetHeight(true)">
                    设置内容高度1000px
                </bk-button>
                <bk-button theme="default" @click="handleSetHeight(false)">设置内容高度400px</bk-button>
            </div>
        </bk-sideslider>
    </div>
</template>

<script>
    import { bkButton, bkSideslider } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton,
            bkSideslider
        },
        data () {
            return {
                defaultSettings: {
                    isShow: false,
                    height: '200px'
                }
            }
        },
        methods: {
            handleSetHeight (v) {
                this.footerSetting.height = v ? '1000px' : '400px'
            }
        }
    }
</script>
```
:::

### 更多自定义配置 {page=#/sideslider}

:::demo 配置`quickClose`可定义点击遮罩关闭组件，配置`width`可定义组件宽度，配置`direction`可定义组件滑出的方向，可配置显示/关闭组件时的回调函数，可配置关闭前钩子函数`before-close`，函数返回`Boolean`类型值，可配置关闭动画结束时的回调函数
```html
<template>
    <div>
        <bk-button :type="'primary'" @click="moreSettings.isShow = true">更多自定义配置1</bk-button>

        <bk-sideslider
            :is-show.sync="moreSettings.isShow"
            :quick-close="moreSettings.quickClose"
            :width="moreSettings.width"
            :direction="moreSettings.direction"
            @shown="shownMoreSettings"
            @hidden="hiddenMoreSettings"
            @animation-end="animationEnd"
            :before-close="beforeClose">
            <div slot="content">
                <bk-button theme="primary" @click="dialog1.primary.visiable = true">
                    嵌套Dialog
                </bk-button>
                <bk-dialog v-model="dialog1.primary.visiable"
                    theme="primary"
                    :mask-close="false"
                    title="这是标题">
                    primary 主题，点击遮罩不会关闭弹框，esc 按键会关闭弹框
                    <bk-button @click="dialog2.custom2.visiable = true" class="mr10">
                        配置按钮文案
                    </bk-button>
                    <bk-dialog v-model="dialog2.custom2.visiable"
                        :header-position="dialog2.custom2.headerPosition"
                        :ok-text="dialog2.custom2.okText"
                        :cancel-text="dialog2.custom2.cancelText"
                        :header-position="dialog2.custom2.headerPosition"
                        title="描述">
                        配置按钮文案
                    </bk-dialog>
                </bk-dialog>
            </div>
        </bk-sideslider>
    </div>
</template>

<script>
    import { bkButton, bkSideslider } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton,
            bkSideslider
        },
        data () {
            return {
                moreSettings: {
                    isShow: false,
                    quickClose: true,
                    width: 500,
                    direction: 'left'
                }
            }
        },
        methods: {
            shownMoreSettings () {
                alert('组件已打开')
            },
            hiddenMoreSettings () {
                alert('组件已关闭')
            },
            beforeClose () {
                alert('确定关闭侧栏?')
                return true
            },
            animationEnd () {
                alert('关闭动画已结束')
            }
        }
    }
</script>
```
:::

### 嵌套 {page=#/sideslider}

:::demo

```html
<template>
    <div>
        <bk-button :type="'primary'" @click="multi1.isShow = true">父级Sideslider</bk-button>
        <bk-sideslider
            :is-show.sync="multi1.isShow"
            :quick-close="multi1.quickClose"
            :width="multi1.width">
            <div slot="content">
                父级Sideslider
                <bk-button :type="'primary'" @click="multi2.isShow = true">打开嵌套Sideslider</bk-button>
               <bk-sideslider
                    :is-show.sync="multi2.isShow"
                    :width="multi2.width">
                    <div slot="content">
                        嵌套Sideslider
                        <bk-button theme="primary" @click="exampleSetting5.primary.visiable = true">
                            Open Dialog
                        </bk-button>
                        <bk-dialog v-model="exampleSetting5.primary.visiable"
                            theme="primary"
                            :mask-close="false"
                            title="这是标题">
                            primary 主题，点击遮罩不会关闭弹框，esc 按键会关闭弹框
                            <bk-button @click="exampleSetting6.custom.visiable = true" class="mr10">
                                Open Dialog
                            </bk-button>
                            <bk-dialog v-model="exampleSetting6.custom.visiable"
                                :header-position="exampleSetting6.custom.headerPosition"
                                :ok-text="exampleSetting6.custom.okText"
                                :cancel-text="exampleSetting6.custom.cancelText"
                                :header-position="exampleSetting6.custom.headerPosition"
                                title="描述">
                                <bk-select multiple v-model="select.groupValue" style="width: 250px;">
                                    <bk-option-group
                                        v-for="(group, index) in select.groupList"
                                        :name="group.name"
                                        :key="index">
                                        <bk-option v-for="option in group.children"
                                            :key="option.id"
                                            :id="option.id"
                                            :name="option.name">
                                        </bk-option>
                                    </bk-option-group>
                                </bk-select>
                            </bk-dialog>
                        </bk-dialog>
                    </div>
                </bk-sideslider>
            </div>
        </bk-sideslider>
    </div>
</template>

<script>
    import { bkButton, bkSideslider } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton,
            bkSideslider
        },
        data () {
            return {
                multi1: {
                    isShow: false,
                    quickClose: true,
                    width: 1000
                },
                multi2: {
                    isShow: false,
                    quickClose: true,
                    width: 500
                }
            }
        },
        methods: {
            shownMoreSettings () {
                alert('组件已打开')
            },
            hiddenMoreSettings () {
                alert('组件已关闭')
            },
            beforeClose () {
                alert('确定关闭侧栏?')
                return true
            },
            animationEnd () {
                alert('关闭动画已结束')
            }
        }
    }
</script>
```
:::

### 属性 {page=#/sideslider}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| is-show | 是否显示组件，支持 .sync 修饰符 | Boolean | —— | false |
| title | 自定义组件标题 | String | —— | —— |
| quick-close | 是否支持点击遮罩关闭组件 | Boolean | —— | false |
| show-mask | 是否允许出现遮罩 | Boolean | —— | true |
| width | 组件的宽度 | Number | —— | 400 |
| direction | 组件滑出的方向 | String | left / right | right |
| before-close | 关闭前钩子函数 | Function | —— | —— |
| ext-cls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `.bk-sideslider` 上 | String | —— | —— |
| transfer | 控制 sidslider 是否出现在 body 内 | Boolean | true / false | false |

### 事件 {page=#/sideslider}
| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| shown | 显示组件后的回调函数 | —— |
| hidden | 关闭组件后的回调函数 | —— |
| animation-end | 关闭组件后动画结束的回调函数 | —— |

### 插槽 {page=#/sideslider}
| name | 说明 |
|---|---|
| content | 用于设置侧栏内容区 |
| footer | 用于设置侧栏底部区 |
