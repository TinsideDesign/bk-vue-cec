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
            Transfer 按钮更多示例
        </h2>
        <div class="example-item">
            <bk-transfer
                :source-list="listCopy"
                :target-list="value"
                :display-key="'service_name'"
                :setting-key="'service_code'"
                :sort-key="key"
                :title="title"
                :empty-content="emptyContent"
                :sortable="true"
                @change="change">
                <div slot="source-option" slot-scope="data">
                    {{ data.service_name }}
                </div>
                <div slot="target-option" slot-scope="data">
                    {{ data.service_name }}
                </div>
            </bk-transfer>
            <p>
                <bk-button type="default" @click.stop="changeList">改变数据源</bk-button>
                <bk-button type="default" @click.stop="changeKey">改变排序key</bk-button>
            </p>
        </div>
    </section>
</template>
<script>
    import { bkTransfer, bkButton } from '@'
    export default {
        components: {
            bkTransfer,
            bkButton
        },
        data () {
            return {
                key: 'service_code',
                title: ['服务列表', '已选服务'],
                emptyContent: ['无数据', '未选择任何服务'],
                list: [
                    { service_code: 'pipeline', service_name: '流水线' },
                    { service_code: 'codecc', service_name: '代码检查' },
                    { service_code: 'bcs', service_name: '容器服务' },
                    { service_code: 'artifactory', service_name: '版本仓库' },
                    { service_code: 'ticket', service_name: '凭证管理' },
                    { service_code: 'code', service_name: '代码库' },
                    { service_code: 'experience', service_name: '版本体验' },
                    { service_code: 'environment', service_name: '环境管理' }
                ],
                listCopy: [],
                value: ['artifactory', 'ticket', 'code', 'experience']
            }
        },
        created () {},
        methods: {
            back () {
                window.history.go(-1)
            },
            change (sourceList, targetList, setingKeyList) {
                console.log(sourceList)
                console.log(targetList)
                console.log(setingKeyList)
            },
            changeList () {
                this.listCopy.splice(0, this.listCopy.length, ...this.list)
                console.log(this.listCopy)
            },
            changeKey () {
                this.key = 'service_name'
            }
        }
    }
</script>
<style lang="postcss">
    .test {
        width: 70%;
    }
    .left-header,
    .right-header {
        label {
            display: inline-block;
        }
    }
    .left-header {
        .add-all {
            display: inline-block;
            float: right;
            cursor: pointer;
            font-size: 14px;
            span {
                color: #3c96ff;
                &.disabled {
                    cursor: not-allowed;
                    opacity: 0.5;
                }
            }
        }
    }
    .right-header {
        .remove-all {
            display: inline-block;
            float: right;
            cursor: pointer;
            font-size: 14px;
            span {
                color: #FF5656;
                &.disabled {
                    cursor: not-allowed;
                    opacity: 0.5;
                }
            }
        }
    }
</style>
