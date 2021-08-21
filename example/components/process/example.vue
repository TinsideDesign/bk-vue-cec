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
    <section>
        <h2>
            <i href="javascript:void(0)" class="back-icon bk-icon icon-arrows-left" @click="back"></i>
            Process 更多示例
        </h2>
        <div class="example-item">
            <bk-button type="primary" v-if="process <= list.length" @click="next1" style="margin-top: 20px; margin-bottom: 20px;">{{process === list.length ? '完成' : '下一步' }}</bk-button>
            <bk-button type="primary" @click="reset1" style="margin-top: 20px; margin-bottom: 20px;" v-else>重置</bk-button>
            <bk-process
                :list="list"
                :cur-process.sync="process"
                :display-key="'content'"
                @process-changed="change"
                :controllable="true">
            </bk-process>
        </div>
        <div class="example-item">
            <bk-button type="primary" v-if="processCopy <= listCopy.length" @click="next" style="margin-top: 20px; margin-bottom: 20px;">{{processCopy === listCopy.length ? '完成' : '下一步' }}</bk-button>
            <bk-button type="primary" @click="reset" style="margin-top: 20px; margin-bottom: 20px;" v-else>重置</bk-button>
            <bk-process
                :list="listCopy"
                :cur-process.sync="processCopy"
                :show-steps="true"
                :display-key="'content'"
                @process-changed="changeCopy"
                :controllable="true"
            ></bk-process>
        </div>
    </section>
</template>
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
                processCopy: 1,
                listCopy: [
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
                ],
                list: [
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
                        content: '测试部署'
                    },
                    {
                        content: '开发完成'
                    }
                ]
            }
        },
        created () {},
        methods: {
            back () {
                window.history.go(-1)
            },
            asyncEvent () {
                try {
                    setTimeout(() => {
                        const data = [
                            {
                                content: '创建应用'
                            },
                            {
                                content: '完善资料'
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
                        this.list = [...data]
                    }, 1000)
                } catch (e) {} finally {
                    this.process = 3
                }
            },
            change (index, data) {
                console.log(index)
                console.log(data)
            },
            changeCopy (index, data) {
                console.log(index)
                console.log(data)
            },
            changeList () {
                this.listCopy = [...this.list]
            },
            next () {
                this.processCopy++
            },
            reset () {
                this.processCopy = 1
            },
            next1 () {
                this.process++
            },
            reset1 () {
                this.process = 1
            }
        }
    }
</script>
