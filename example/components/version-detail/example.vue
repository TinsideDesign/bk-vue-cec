<!--
 * Tencent is pleased to support the open source community by making
 * 科技内在设计（T-inside） available.
 *
 * Copyright (C) 2021 TID Limited, a DAO.  All rights reserved.
 *
 * 科技内在设计（T-inside） is licensed under the MIT License.
 *
 * License for 科技内在设计（T-inside）:
 *
 *
 * Terms of the MIT License:
 * ---------------------------------------------------
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
 * to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of
 * the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
 * THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
-->

<template>
    <div>
        <bk-version-detail
            :current-version="2"
            :finished="finished"
            :show.sync="show"
            :version-list="versionList"
            :version-detail="versionDetail"
            :get-version-detail="handleGetVersionDetail"
            :get-version-list="handleGetVersionList">
            <template slot-scope="content">
                <div v-if="content.detail">
                    <h1>【{{content.detail}}】版本更新明细</h1>
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
