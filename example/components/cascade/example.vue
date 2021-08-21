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
    <bk-cascade
        v-model="value"
        :list="list"
        clearable
        style="width: 250px;"
        @change="handleChange">
    </bk-cascade>
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
                                        name: '五华区',
                                        children: [
                                            {
                                                id: '111',
                                                name: '111',
                                                children: [
                                                    {
                                                        id: '222',
                                                        name: '222',
                                                        children: [
                                                            {
                                                                id: '333',
                                                                name: '333',
                                                                children: [
                                                                    {
                                                                        id: '444',
                                                                        name: '444'
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
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
                                id: null,
                                name: '临沧市'
                            },
                            {
                                id: 0,
                                name: '大理'
                            },
                            {
                                id: '',
                                name: '玉溪'
                            }
                        ]
                    }]
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
