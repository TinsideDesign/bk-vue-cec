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
        <bk-search-select
            :data="demo7.data"
            v-model="values">
        </bk-search-select>
    </div>
</template>

<script>
    import { bkSearchSelect } from '@'

    export default {
        name: 'demo',
        components: {
            bkSearchSelect
        },
        data () {
            return {
                demo7: {
                    data: [
                        {
                            name: 'IP',
                            id: 'ip',
                            placeholder: '请输入格式xxx.xxx.xxx',
                            multiable: true,
                            validate (values, item) {
                                const validate = (values || []).reduce((ret, cur) => {
                                    ret = ret && /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(cur.name)
                                    return ret
                                }, true)

                                return !validate ? '格式错误: 请输入正确的IP格式' : true
                            },
                            children: [
                                {
                                    name: '10.1.0.11',
                                    id: '10.1.0.11'
                                },
                                {
                                    name: '192.10.23.123',
                                    id: '192.10.23.123'
                                },
                                {
                                    name: '192.10.23.12',
                                    id: '192.10.23.12'
                                }
                            ]
                        },
                        {
                            name: '告警状态',
                            id: 'status',
                            placeholder: '格式：0，1，2',
                            validate (v, item) {
                                console.info(v, item)
                                const validate = (v || []).reduce((ret, cur) => {
                                    ret = ret && /^[0-2]$/.test(cur.name)
                                    return ret
                                }, true)
                                return !validate ? '格式错误: 请输入0, 1, 2' : true
                            }
                        },
                        {
                            name: 'test-3',
                            id: 'test-3'
                        }
                    ],
                    values: []
                }
            }
        }
    }
 </script>
