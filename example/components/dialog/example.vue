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
        <!-- <h2>
            <i href="javascript:void(0)" class="back-icon bk-icon icon-arrows-left" @click="back"></i>
            Dialog 对话框更多示例
        </h2>
        <div class="example-item">
            <bk-button @click="visiable1 = true">
                mount in body
            </bk-button>
            <bk-dialog v-model="visiable1" :mask-close="true">
                mount in body
            </bk-dialog>
        </div> -->
        <!-- <div class="example-item">
            <bk-button :theme="'success'" @click="visiable2 = true">
                mount in parentNode
            </bk-button>
            <bk-dialog v-model="visiable2" :theme="'success'" :mask-close="true" :transfer="false">
                mount in parentNode
            </bk-dialog>
        </div> -->
        <div class="example-item">
            <bk-button type="default" @click="dialog1 = true">showDialog1</bk-button>
            <bk-button type="default" @click="dialog2 = true">showDialog2</bk-button>

            <bk-dialog v-model="dialog1">
                <bk-button @click="dialog2 = true">innerShowDialog2</bk-button>
            </bk-dialog>
            <bk-dialog v-model="dialog2">
                dialog2
            </bk-dialog>
        </div>
        <div class="example-item">
            <bk-button type="default" @click="nestedDialog1 = true">showNestedDialog1</bk-button>

            <bk-dialog v-model="nestedDialog1" :transfer="false">
                <bk-button @click="nestedDialog2 = true">showNestedDialog2</bk-button>
                <bk-dialog v-model="nestedDialog2">
                    nestedDialog2
                </bk-dialog>
            </bk-dialog>
        </div>

        <div class="example-item">
            <bk-button type="default" @click="aaa">dddd</bk-button>
            <bk-dialog v-model="ddd" :render-directive="'if'">
                sasddsadas
            </bk-dialog>
        </div>
        
        <div class="example-item">
            <bk-button type="default" @click="ccc">ccc</bk-button>
            <bk-dialog v-model="cccShow" width="500" @cancel="active = 'mission'">
                <bk-tab :active.sync="active" type="unborder-card">
                    <bk-tab-panel
                        v-for="(panel, index) in panels2"
                        v-bind="panel"
                        :key="index">
                        <div>{{panel.label}}-{{panel.count}}</div>
                    </bk-tab-panel>
                </bk-tab>
            </bk-dialog>
        </div>

        <div class="example-item">
            <bk-button type="default" @click="tabPosClick">tabPos</bk-button>
            <bk-dialog v-model="tabPosShow" width="500" @cancel="active = 'mission'">
                <bk-tab :active.sync="active" type="unborder-card" :tab-position="'left'">
                    <bk-tab-panel
                        v-for="(panel, index) in panels2"
                        v-bind="panel"
                        :key="index">
                        <div>{{panel.label}}-{{panel.count}}</div>
                    </bk-tab-panel>
                </bk-tab>
            </bk-dialog>
        </div>
    </section>
</template>

<script>
    import { bkButton, bkDialog, bkTab, bkTabPanel } from '@'
    export default {
        components: {
            bkButton,
            bkDialog,
            bkTab,
            bkTabPanel
        },
        data () {
            return {
                visiable1: false,
                visiable2: false,
                dialog1: false,
                dialog2: false,
                nestedDialog1: false,
                nestedDialog2: false,
                ddd: false,
                cccShow: false,
                tabPosShow: false,
                panels2: [
                    { name: 'mission', label: '任务报表任务报表任务报表任务报表', count: 10 },
                    { name: 'config', label: '加速配置2', count: 20 },
                    { name: 'hisitory', label: '历史版本2', count: 30 },
                    { name: 'deleted', label: '已归档加速任务2', count: 40 }
                ],
                active: 'mission'
            }
        },
        methods: {
            back () {
                window.history.go(-1)
            },

            aaa () {
                this.ddd = true
            },
            ccc () {
                this.cccShow = true
            },
            tabPosClick () {
                this.tabPosShow = true
            }
        }
    }
</script>
