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
        <div>
            单选
            <bk-cascade
                v-model="value3"
                :check-any-level="true"
                :filterable="true"
                trigger="hover"
                :list="list2"
                class="mb40 mt5"
                clearable
                style="width: 250px;"
                @change="handleChange">
            </bk-cascade>
        </div>
        <div>
            多选
            <bk-cascade
                v-model="value2"
                multiple
                :check-any-level="true"
                :filterable="true"
                trigger="hover"
                :list="list2"
                class="mb40 mt5"

                clearable
                style="width: 250px;"
                @change="handleChange">
            </bk-cascade>
        </div>
        <div>
            多选
            <bk-cascade
                v-model="value"
                multiple
                :check-any-level="true"
                :list="list2"
                class="mb40 mt5"
                clearable
                style="width: 250px;"
                @change="handleChange">
            </bk-cascade>
        </div>
        <div>
            多选
            <bk-cascade
                v-model="value"
                multiple
                :check-any-level="true"
                :list="list2"
                class="mb40 mt5"
                clearable
                :filterable="true"
                style="width: 250px;"
                @change="handleChange">
            </bk-cascade>
        </div>
    </div>
</template>
<script>
    import { bkCascade } from '@'

    export default {
        components: {
            bkCascade
        },
        data () {
            return {
                value: ['yunnan', null],
                value2: ['yunnan', null],
                value3: [],
                list: [
                    {
                        id: 'hunan',
                        name: '湖南',
                        children: [
                            {
                                id: 'changsha',
                                name: '长沙'
                            },
                            {
                                id: 'yueyang',
                                name: '岳阳'
                            }
                        ]
                    }, {
                        id: 'guangxi',
                        name: '广西'
                    }, {
                        id: 'yunnan',
                        name: '云南',
                        children: [
                            {
                                id: 'kunming',
                                name: '昆明',
                                children: [
                                    {
                                        id: 'wuhuaqu',
                                        name: '五华区'
                                    },
                                    {
                                        id: 'guanduqu',
                                        name: '官渡区'
                                    },
                                    {
                                        id: 'xishanqu',
                                        name: '西山区'
                                    }
                                ]
                            },
                            {
                                id: 'dali',
                                name: '大理'
                            }
                        ]
                    }
                ],
                list2: [
                    {
                        'id': 32823,
                        'name': 'gsdk',
                        'children': [
                            {
                                'id': 227461,
                                'name': 'cache'
                            },
                            {
                                'id': 227462,
                                'name': 'cloud_control'
                            },
                            {
                                'id': 591213,
                                'name': 'h5https'
                            },
                            {
                                'id': 227463,
                                'name': 'Speed'
                            }
                        ]
                    },
                    {
                        'id': 52400,
                        'name': 'idip_cmd_redis',
                        'children': [
                            {
                                'id': 591214,
                                'name': 'h5https'
                            },
                            {
                                'id': 421283,
                                'name': 'Speed'
                            },
                            {
                                'id': 421281,
                                'name': 'cache'
                            },
                            {
                                'id': 421282,
                                'name': 'cloud_control'
                            }
                        ]
                    },
                    {
                        'id': 66760,
                        'name': 'cloud_logsvr',
                        'children': [
                            {
                                'id': 591212,
                                'name': 'h5https'
                            },
                            {
                                'id': 489871,
                                'name': 'Speed'
                            },
                            {
                                'id': 489869,
                                'name': 'cache'
                            },
                            {
                                'id': 489870,
                                'name': 'cloud_control'
                            }
                        ]
                    },
                    {
                        'id': 72130,
                        'name': 'GEMlogsvr',
                        'children': [
                            {
                                'id': 511244,
                                'name': 'logsvr'
                            }
                        ]
                    },
                    {
                        'id': 89165,
                        'name': 'GEM开发编译',
                        'children': [
                            {
                                'id': 564955,
                                'name': '蓝盾编译'
                            }
                        ]
                    },
                    {
                        'id': 93047,
                        'name': 'GEM服务号',
                        'children': [
                            {
                                'id': 603742,
                                'name': 'image'
                            },
                            {
                                'id': 603743,
                                'name': 'modelTrain'
                            }
                        ]
                    },
                    {
                        'id': 32822,
                        'name': 'gem端游',
                        'children': [
                            {
                                'id': 227459,
                                'name': 'proxy'
                            },
                            {
                                'id': 235843,
                                'name': 'spark'
                            },
                            {
                                'id': 227460,
                                'name': 'spider'
                            }
                        ]
                    },
                    {
                        'id': 94139,
                        'name': 't_bot文档',
                        'children': [
                            {
                                'id': 626613,
                                'name': 'server'
                            },
                            {
                                'id': 626612,
                                'name': 'proxy'
                            }
                        ]
                    },
                    {
                        'id': 95507,
                        'name': 'tgem管理机',
                        'children': [
                            {
                                'id': 661187,
                                'name': 'logsvr'
                            }
                        ]
                    },
                    {
                        'id': 5003813,
                        'name': 'gem服务节点',
                        'children': [
                            {
                                'id': 5007455,
                                'name': 'server'
                            }
                        ]
                    },
                    {
                        'id': 108443,
                        'name': '服务集群',
                        'children': [
                            {
                                'id': 924194,
                                'name': 'pod'
                            },
                            {
                                'id': 925920,
                                'name': 'master'
                            }
                        ]
                    },
                    {
                        'id': 110423,
                        'name': '天美编译加速',
                        'children': [
                            {
                                'id': 973877,
                                'name': 'UE4编译加速'
                            },
                            {
                                'id': 973878,
                                'name': 'Unity编译加速'
                            }
                        ]
                    }
                ]
            }
        },
        methods: {
            handleChange (newValue, oldValue, selectList) {
                console.log(newValue, oldValue, selectList)
            },
            back () {
                window.history.go(-1)
            }
        }
    }
</script>
<style lang="postcss">
.bk-form-checkbox {
  margin-right: 30px;
}
</style>
