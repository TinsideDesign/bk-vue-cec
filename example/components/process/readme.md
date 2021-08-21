<script>
    import { bkProcess, bkButton } from '@'

    export default {
        components: {
            bkProcess,
            bkButton
        },
        data () {
            return {
                process: 1,
                loadingProcess: 2,
                list: [
                    {
                        content: '创建应用'
                    },
                    {
                        content: '完善资料',
                    },
                    {
                        content: '下载代码'
                    },
                    {
                        content: '测试部署'
                    },
                    {
                        content: '开发完成'
                    }
                ],
                loadingList: [
                    {
                        content: '创建应用'
                    },
                    {
                        content: '完善资料',
                        isLoading: true
                    },
                    {
                        content: '下载代码'
                    },
                    {
                        content: '测试部署',
                        isLoading: true
                    },
                    {
                        content: '开发完成'
                    }
                ],
                curProcess: 1,
                dataList: [
                    {
                        content: '创建应用',
                        steps: [
                            {
                                content: '创建应用1',
                                isLoading: true
                            },
                            {
                                content: '创建应用2',
                                isLoading: true
                            }
                        ]
                    },
                    {
                        content: '完善资料',
                        steps: [
                            {
                                content: '完善资料1',
                                isLoading: true
                            },
                            {
                                content: '完善资料2',
                                isLoading: true
                            }
                        ]
                    },
                    {
                        content: '下载代码',
                        steps: [
                            {
                                content: '下载代码1',
                                isLoading: false
                            },
                            {
                                content: '下载代码2',
                                isLoading: true
                            },
                            {
                                content: '下载代码3',
                                isLoading: false
                            },
                            {
                                content: '下载代码4',
                                isLoading: true
                            }
                        ]
                    },
                    {
                        content: '测试部署',
                        steps: [
                            {
                                content: '测试部署1',
                                isLoading: true
                            },
                            {
                                content: '测试部署2',
                                isLoading: false
                            }
                        ]
                    },
                    {
                        content: '开发完成',
                        steps: [
                            {
                                content: '开发完成1',
                                isLoading: true
                            },
                            {
                                content: '开发完成2',
                                isLoading: false
                            }
                        ]
                    }
                ]
            }
        },
        methods: {
            change (process, data) {
                alert('当前process:' + process)
                console.log(process)
                console.log(data)
            },
            changeEvent (process, data) {
                console.log(process)
                console.log(data)
            },
            changeProcess (process, data) {
                console.log(process)
                console.log(data)
            },
            next () {
                this.curProcess++
            },
            reset () {
                this.curProcess = 1
            }
        }
    }
</script>

[[toc]]

## Process 步骤

### 基础用法 {page=#/process}

:::demo 默认配置 `list`、`cur-process`、`display-key`，`list` 和 `cur-process` 以及 `display-key` 为必传，配置 `controllable` 可控制 process 前后跳转

```html
<template>
    <bk-process
        :list="list"
        :cur-process.sync="process"
        :display-key="'content'"
        @process-changed="change"
        :controllable="true"></bk-process>
</template>
<script>
    import { bkProcess } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkProcess
        },
        data () {
            return {
                process: 1,
                list: [
                    {
                        content: '创建应用'
                    },
                    {
                        content: '完善资料',
                    },
                    {
                        content: '下载代码'
                    },
                    {
                        content: '测试部署'
                    },
                    {
                        content: '开发完成'
                    }
                ]
            }
        },
        methods: {
            change (process, data) {
                alert('当前process:' + process)
                console.log(process)
                console.log(data)
            }
        }
    }
</script>
```
:::

### 增加loading {page=#/process}

:::demo 在 `list` 数据源中配置 `isLoading` 属性

```html
<template>
    <bk-process
        :list="loadingList"
        :cur-process.sync="loadingProcess"
        :display-key="'content'"
        @process-changed="changeEvent"
        :controllable="true"></bk-process>
</template>
<script>
    import { bkProcess } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkProcess
        },
        data () {
            return {
                loadingProcess: 2,
                loadingList: [
                    {
                        content: '创建应用'
                    },
                    {
                        content: '完善资料',
                        isLoading: true
                    },
                    {
                        content: '下载代码'
                    },
                    {
                        content: '测试部署',
                        isLoading: true
                    },
                    {
                        content: '开发完成'
                    }
                ]
            }
        },
        methods: {
            changeEvent (process, data) {
                console.log(process)
                console.log(data)
            }
        }
    }
</script>
```
:::

### 扩展 {page=#/process}

:::demo 在 `list` 数据源中配置 `steps` 属性

```html
<template>
    <div>
        <bk-button type="primary" v-if="curProcess <= dataList.length" @click="next" style="margin-top: 20px; margin-bottom: 20px;">{{curProcess === dataList.length ? '完成' : '下一步' }}</bk-button>
        <bk-button type="primary" @click="reset" style="margin-top: 20px; margin-bottom: 20px;" v-else>重置</bk-button>
        <bk-process
            :list="dataList"
            :cur-process.sync="curProcess"
            :display-key="'content'"
            :show-steps="true"
            :controllable="true"
            @process-changed="changeProcess"
        ></bk-process>
    </div>
</template>
<script>
    import { bkProcess, bkButton } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkProcess,
            bkButton
        },
        data () {
            return {
                curProcess: 1,
                dataList: [
                    {
                        content: '创建应用',
                        steps: [
                            {
                                content: '创建应用1',
                                isLoading: true
                            },
                            {
                                content: '创建应用2',
                                isLoading: true
                            }
                        ]
                    },
                    {
                        content: '完善资料',
                        steps: [
                            {
                                content: '完善资料1',
                                isLoading: true
                            },
                            {
                                content: '完善资料2',
                                isLoading: true
                            }
                        ]
                    },
                    {
                        content: '下载代码',
                        steps: [
                            {
                                content: '下载代码1',
                                isLoading: false
                            },
                            {
                                content: '下载代码2',
                                isLoading: true
                            },
                            {
                                content: '下载代码3',
                                isLoading: false
                            },
                            {
                                content: '下载代码4',
                                isLoading: true
                            }
                        ]
                    },
                    {
                        content: '测试部署',
                        steps: [
                            {
                                content: '测试部署1',
                                isLoading: true
                            },
                            {
                                content: '测试部署2',
                                isLoading: false
                            }
                        ]
                    },
                    {
                        content: '开发完成',
                        steps: [
                            {
                                content: '开发完成1',
                                isLoading: true
                            },
                            {
                                content: '开发完成2',
                                isLoading: false
                            }
                        ]
                    }
                ]
            }
        },
        methods: {
            changeProcess (process, data) {
                console.log(process)
                console.log(data)
            },
            next () {
                this.curProcess++
            },
            reset () {
                this.curProcess = 1
            }
        }
    }
</script>
```
:::

### 属性 {page=#/process}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| list | process 数据源（必传） | Array | —— | —— |
| display-key | 循环 list 时，显示字段的 key 值(必传) | String | —— |  ——  |
| controllable | 步骤可否被控制前后跳转 | Boolean | true/false | false |
| show-steps | 是否显示子步骤操作按钮 | Boolean | true/false | false |
| cur-process | 当前步骤的索引值（必传），支持 .sync 修饰符 | Number  | —— | 0 |
| ext-cls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `.bk-process` 上 | String | —— | —— |

### 事件 {page=#/process}
| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| process-changed | 当前步骤变化时的回调  | 变化后的步骤 process / 变化后 process 对于的数据 data |
