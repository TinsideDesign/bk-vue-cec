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
            Grid 栅格更多示例
        </h2>
        <div class="example-item">
            <div class="wrapper custom">
                <bk-container :col="4">
                    <bk-row>
                        <bk-col :span="1"><div class="content">1/4</div></bk-col>
                        <bk-col :span="1"><div class="content">1/4</div></bk-col>
                        <bk-col :span="1"><div class="content">1/4</div></bk-col>
                        <bk-col :span="1"><div class="content">1/4</div></bk-col>
                    </bk-row>
                    <bk-row>
                        <bk-col :span="1"><div class="content">1/4</div></bk-col>
                        <bk-col :span="1"><div class="content">1/4</div></bk-col>
                        <bk-col :span="1"><div class="content">1/4</div></bk-col>
                        <bk-col :span="1"><div class="content">1/4</div></bk-col>
                    </bk-row>
                    <bk-row>
                        <bk-col :span="1"><div class="content">1/4</div></bk-col>
                        <bk-col :span="1"><div class="content">1/4</div></bk-col>
                        <bk-col :span="1"><div class="content">1/4</div></bk-col>
                        <bk-col :span="1"><div class="content">1/4</div></bk-col>
                    </bk-row>
                    <bk-row>
                        <bk-col :span="1"><div class="content">1/4</div></bk-col>
                        <bk-col :span="1"><div class="content">1/4</div></bk-col>
                        <bk-col :span="1"><div class="content">1/4</div></bk-col>
                        <bk-col :span="1"><div class="content">1/4</div></bk-col>
                    </bk-row>
                </bk-container>
            </div>
        </div>
        <div class="example-item">
            <div class="wrapper">
                <bk-container :col="12" :gutter="40">
                    <bk-row>
                        <bk-col :span="0">
                            <div class="content">12/12</div>
                        </bk-col>
                    </bk-row>
                    <bk-row>
                        <bk-col :span="6">
                            <div class="content">6/12</div>
                        </bk-col>
                        <bk-col :span="6">
                            <div class="content">6/12</div>
                        </bk-col>
                    </bk-row>
                    <bk-row>
                        <bk-col :span="4">
                            <div class="content">4/12</div>
                        </bk-col>
                        <bk-col :span="4">
                            <div class="content">4/12</div>
                        </bk-col>
                        <bk-col :span="4">
                            <div class="content">4/12</div>
                        </bk-col>
                    </bk-row>
                    <bk-row>
                        <bk-col :span="3">
                            <div class="content">3/12</div>
                        </bk-col>
                        <bk-col :span="3">
                            <div class="content">3/12</div>
                        </bk-col>
                        <bk-col :span="3">
                            <div class="content">3/12</div>
                        </bk-col>
                        <bk-col :span="3">
                            <div class="content">3/12</div>
                        </bk-col>
                    </bk-row>
                    <bk-row>
                        <bk-col :span="2">
                            <div class="content">2/12</div>
                        </bk-col>
                        <bk-col :span="2">
                            <div class="content">2/12</div>
                        </bk-col>
                        <bk-col :span="2">
                            <div class="content">2/12</div>
                        </bk-col>
                        <bk-col :span="2">
                            <div class="content">2/12</div>
                        </bk-col>
                        <bk-col :span="2">
                            <div class="content">2/12</div>
                        </bk-col>
                        <bk-col :span="2">
                            <div class="content">2/12</div>
                        </bk-col>
                    </bk-row>
                    <bk-row>
                        <bk-col :span="1">
                            <div class="content">1/12</div>
                        </bk-col>
                        <bk-col :span="1">
                            <div class="content">1/12</div>
                        </bk-col>
                        <bk-col :span="1">
                            <div class="content">1/12</div>
                        </bk-col>
                        <bk-col :span="1">
                            <div class="content">1/12</div>
                        </bk-col>
                        <bk-col :span="1">
                            <div class="content">1/12</div>
                        </bk-col>
                        <bk-col :span="1">
                            <div class="content">1/12</div>
                        </bk-col>
                        <bk-col :span="1">
                            <div class="content">1/12</div>
                        </bk-col>
                        <bk-col :span="1">
                            <div class="content">1/12</div>
                        </bk-col>
                        <bk-col :span="1">
                            <div class="content">1/12</div>
                        </bk-col>
                        <bk-col :span="1">
                            <div class="content">1/12</div>
                        </bk-col>
                        <bk-col :span="1">
                            <div class="content">1/12</div>
                        </bk-col>
                        <bk-col :span="1">
                            <div class="content">1/12</div>
                        </bk-col>
                    </bk-row>
                    <bk-row>
                        <bk-col :span="8">
                            <div class="content">8/12</div>
                        </bk-col>
                        <bk-col :span="4">
                            <div class="content">4/12</div>
                        </bk-col>
                    </bk-row>
                    <bk-row>
                        <bk-col :span="3">
                            <div class="content">3/12</div>
                        </bk-col>
                        <bk-col :span="6">
                            <div class="content">6/12</div>
                        </bk-col>
                        <bk-col :span="3">
                            <div class="content">3/12</div>
                        </bk-col>
                    </bk-row>
                </bk-container>
            </div>
        </div>
        <div class="example-item">
            <div class="wrapper">
                <bk-container :gutter="15">
                    <bk-row>
                        <bk-col :span="8">
                            <div class="content">8/24</div>
                        </bk-col>
                        <bk-col :span="16">
                            <div class="content">16/24</div>
                        </bk-col>
                    </bk-row>
                    <bk-row>
                        <bk-col :span="6">
                            <div class="content">6/24</div>
                        </bk-col>
                        <bk-col :span="6">
                            <div class="content">6/24</div>
                        </bk-col>
                        <bk-col :span="6">
                            <div class="content">6/24</div>
                        </bk-col>
                        <bk-col :span="6">
                            <div class="content">6/24</div>
                        </bk-col>
                    </bk-row>
                    <bk-row>
                        <bk-col :span="12">
                            <div class="content">12/24</div>
                        </bk-col>
                        <bk-col :span="6">
                            <div class="content">6/24</div>
                        </bk-col>
                        <bk-col :span="4">
                            <div class="content">4/24</div>
                        </bk-col>
                        <bk-col :span="2">
                            <div class="content">2/24</div>
                        </bk-col>
                    </bk-row>
                </bk-container>
            </div>
        </div>
        <div class="example-item">
            <div class="wrapper">
                <bk-container :col="4">
                    <bk-row>
                        <bk-col :span="1">
                            <div class="content">1/4</div>
                        </bk-col>
                        <bk-col :span="1">
                            <div class="content">1/4</div>
                        </bk-col>
                        <bk-col :span="1">
                            <div class="content">1/4</div>
                        </bk-col>
                        <bk-col :span="1">
                            <div class="content">1/4</div>
                        </bk-col>
                    </bk-row>
                </bk-container>
            </div>
        </div>
        <div class="example-item flex">
            <div class="wrapper">
                <bk-container flex :col="12" :gutter="15">
                    <bk-row>
                        <bk-col :span="4">
                            <div class="content">4/12</div>
                        </bk-col>
                        <bk-col :span="8">
                            <bk-row>
                                <bk-col :span="4">
                                    <div class="content">4/12</div>
                                </bk-col>
                                <bk-col :span="4">
                                    <div class="content">4/12</div>
                                </bk-col>
                            </bk-row>
                            <bk-row>
                                <bk-col :span="3">
                                    <div class="content">3/12</div>
                                </bk-col>
                                <bk-col :span="5">
                                    <div class="content">5/12</div>
                                </bk-col>
                            </bk-row>
                        </bk-col>
                    </bk-row>
                </bk-container>
            </div>
        </div>
        <div class="example-item">
            <div class="wrapper">
                <bk-container>
                    <bk-row>
                        <bk-col :span="8" :offset="8">
                            <div class="content">8/24 (offset: 8)</div>
                        </bk-col>
                        <bk-col :span="8">
                            <div class="content">8/24</div>
                        </bk-col>
                    </bk-row>
                    <bk-row>
                        <bk-col :span="8" :push="16">
                            <div class="content">8/24 (push: 16)</div>
                        </bk-col>
                        <bk-col :span="16" :pull="8">
                            <div class="content">16/24 (pull: 8)</div>
                        </bk-col>
                    </bk-row>
                </bk-container>
            </div>
        </div>
    </section>
</template>

<script>
    import { bkContainer, bkCol, bkRow } from '@'

    export default {
        components: {
            bkContainer,
            bkCol,
            bkRow
        },
        data () {
            return {
            }
        },
        methods: {
            back () {
                window.history.go(-1)
            },
            handleClick (event) {
                console.log(event)
                alert('button clicked!')
            }
        }
    }
</script>

<style lang="postcss">
    .example-item {
        .wrapper {
            overflow: hidden;
            border: 1px solid #ddd;
            border-radius: 2px;
            padding: 20px 0;
            &.custom {
                width: 180px;
                height: 180px;
                .content {
                    line-height: 23px;
                }
                .bk-grid-row + .bk-grid-row {
                    margin-top: 15px;
                }
            }
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
