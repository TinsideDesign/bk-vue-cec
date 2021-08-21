<script>
    import { bkVersionDetail, bkButton } from '@'
    export default {
        components: {
            bkVersionDetail,
            bkButton
        },
        data () {
            return {
                finished: false,
                show: false,
                versionDetail: '',
                versionList: [
                    {
                        title: 'V3.2.3',
                        date: '2020.04.26'
                    },
                    {
                        title: 'V3.2.1',
                        date: '2020.04.25'
                    },
                    {
                        title: 'V3.2.0',
                        date: '2020.04.24'
                    },
                    {
                        title: 'V3.2.0',
                        date: '2020.04.23'
                    },
                    {
                        title: 'V3.1.3',
                        date: '2020.04.22'
                    },
                    {
                        title: 'V3.1.2',
                        date: '2020.04.20'
                    },
                    {
                        title: 'V3.1.1',
                        date: '2020.04.19'
                    },
                    {
                        title: 'V3.1.0',
                        date: '2020.04.18'
                    },
                    {
                        title: 'V3.0.3',
                        date: '2020.04.18'
                    }
                ],
                currentDetailList: []
            }
        },
        methods: {
            handleGetVersionList (v) {
                return new Promise(resolve => {
                    setTimeout(() => {
                        this.versionList.push({
                            title: 'V3.2.3 -- ' + (+Date.now()),
                            date: '2020.04.26'
                        })
                        this.finished = this.versionList.length > 15
                        resolve()
                    }, 1000)
                })
            },
            handleGetVersionDetail (v) {
                return new Promise(resolve => {
                    setTimeout(() => {
                        this.versionDetail = v.title
                        this.currentDetailList = [
                            '【新增】内置 ES6+ 语言转义能力增强',
                            '【新增】任务通知中心',
                            '【新增】控制台新增命令 cleanAppCache',
                            '【更新】上传时版本号推荐',
                            '【新增】云开发云调用快速启动模板',
                            '【新增】插件增加工具回退时的保护机制',
                            '【优化】素材管理，不再维护的提示',
                            '【新增】体验评分支持“iPhone X兼容”检验规则',
                            '【新增】sitemap，控制台显示当前页面是否索引',
                            '【更新】project.config.json 中新增设置 uploadWithSourceMap',
                            '【新增】createUDPSocket bindUDPSocket 改为同步接口',
                            '【新增】代码保护默认打开',
                            '【新增】增加设置是否工具启动默认打开项目',
                            '【新增】代码保护默认打开',
                            '【新增】增加设置是否工具启动默认打开项目'
                        ]
                        resolve()
                    }, 1000)
                })
            }
        }
    }
</script>

[[toc]]

## 版本更新明细显示组件

### 基础用法 {page=#/version-detail}

:::demo 版本更新明细组件 左测为展示版本标题和时间的列表,右侧为选择的版本的明细展示，组件通过`show`属性控制是否显示，左侧支持滑动加载及拖拽拉伸设置自定义宽度

```html
<template>
    <div>
        <bk-version-detail
            :current-version="versionList[0].title"
            :finished="finished"
            :show.sync="show"
            :version-list="versionList"
            :version-detail="versionDetail"
            :get-version-detail="handleGetVersionDetail"
            :get-version-list="handleGetVersionList">
            <template slot-scope="content">
                <div v-if="content.detail">
                    <h2>【{{content.detail}}】版本更新明细</h2>
                    <p v-for="(detial, index) in currentDetailList" :key="index">
                        {{detial}}
                    </p>
                </div>
            </template>
        </bk-version-detail>
        <bk-button @click="show = !show" theme="primary">点击查看日志详情</bk-button>
    </div>
</template>
<script>
    import { bkVersionDetail, bkButton } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkVersionDetail,
            bkButton
        },
        data () {
            return {
                finished: false,
                show: false,
                versionDetail: '',
                versionList: [
                    {
                        title: 'V3.2.3',
                        date: '2020.04.26'
                    },
                    {
                        title: 'V3.2.1',
                        date: '2020.04.25'
                    },
                    {
                        title: 'V3.2.0',
                        date: '2020.04.24'
                    },
                    {
                        title: 'V3.2.0',
                        date: '2020.04.23'
                    },
                    {
                        title: 'V3.1.3',
                        date: '2020.04.22'
                    },
                    {
                        title: 'V3.1.2',
                        date: '2020.04.20'
                    },
                    {
                        title: 'V3.1.1',
                        date: '2020.04.19'
                    },
                    {
                        title: 'V3.1.0',
                        date: '2020.04.18'
                    },
                    {
                        title: 'V3.0.3',
                        date: '2020.04.18'
                    }
                ],
                currentDetailList: []
            }
        },
        methods: {
            handleGetVersionList (v) {
                return new Promise(resolve => {
                    setTimeout(() => {
                        this.versionList.push({
                            title: 'V3.2.3 -- ' + (+Date.now()),
                            date: '2020.04.26'
                        })
                        this.finished = this.versionList.length > 15
                        resolve()
                    }, 1000)
                })
            },
            handleGetVersionDetail (v) {
                return new Promise(resolve => {
                    setTimeout(() => {
                        this.versionDetail = v.title
                        this.currentDetailList = [
                            '【新增】内置 ES6+ 语言转义能力增强',
                            '【新增】任务通知中心',
                            '【新增】控制台新增命令 cleanAppCache',
                            '【更新】上传时版本号推荐',
                            '【新增】云开发云调用快速启动模板',
                            '【新增】插件增加工具回退时的保护机制',
                            '【优化】素材管理，不再维护的提示',
                            '【新增】体验评分支持“iPhone X兼容”检验规则',
                            '【新增】sitemap，控制台显示当前页面是否索引',
                            '【更新】project.config.json 中新增设置 uploadWithSourceMap',
                            '【新增】createUDPSocket bindUDPSocket 改为同步接口',
                            '【新增】代码保护默认打开',
                            '【新增】增加设置是否工具启动默认打开项目',
                            '【新增】代码保护默认打开',
                            '【新增】增加设置是否工具启动默认打开项目'
                        ]
                        resolve()
                    }, 1000)
                })
            }
        }
    }
</script>


```

:::


### 属性 {page=#/version-detail}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| show | 是否显示 | Boolean | true/false | false |
| versionList | 版本列表 | {date: string, title: string}[] | —— | [] |
| versionDetail | 选择的版本的明细 | String | —— | '' |
| finished | 版本列表是否已经加载完成，如果未加载完成组件将自动加载到可滚动窗口后停止加载 | Boolean | true/false | true |
| getVersionList | 获取版本列表 | Function | —— | —— |
| getVersionDetail | 获取当前选中的版本的版本明细 | Function | —— | —— |
| currentVersion | 当前版本对应于数据’versionTitleName‘字段的值 | Sting | —— | —— |
| minLeftWidth | 左侧栏的最小宽度 | Number | —— | 180 |
| maxLeftWidth | 左侧栏的最大宽度 | Number | —— | 500 |
| versionTitleName | 左侧栏版本数据版本标题对应的字段名 | String | —— | title |
| versionSubTitleName | 左侧栏版本数据版本副标题对应的字段名 | String | —— | date |

### 事件 {page=#/version-detail}
| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| change | 组件弹窗显示值改变时触发 | show: boolean |

### 插槽 {page=#/version-detail}
| 插槽名称 | 说明 |
|------|------|
| item | 左侧栏列表子项插槽 绑定属性 `{item, index}` |
| default | 右侧显示版本详情数据插槽 绑定属性 `{detail, versionDetail}` |
