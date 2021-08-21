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
    <bk-tag-input
        v-model="tag1"
        :placeholder="placeholder"
        :list="list"
        :display-key="'name'"
        :search-key="'id'"
        :allow-create="allowCreate"
        :has-delete-icon="hasDeleteIcon"
        :filter-callback="filterCallback"
        @change="change">
    </bk-tag-input>
</template>
<script>
    import { bkTagInput } from '@'

    export default {
        components: {
            bkTagInput
        },
        data () {
            return {
                placeholder: '请输入城市',
                allowCreate: true,
                hasDeleteIcon: true,
                tag1: [],
                list: [
                    // { id: 'shenzhen', name: '深圳' },
                    // { id: 'guangzhou', name: '广州' },
                    // { id: 'beijing', name: '北京' },
                    // { id: 'shanghai', name: '上海' },
                    // { id: 'hangzhou', name: '杭州' },
                    // { id: 'nanjing', name: '南京' },
                    // { id: 'chognqing', name: '重庆' },
                    // { id: 'taibei', name: '台北' },
                    // { id: 'haikou', name: '海口' }
                ]
            }
        },
        methods: {
            filterCallback (val, searchKey, data) {
                return [
                    { id: 'sss', name: val + '--sss' },
                    { id: 'kkk', name: val + '--kkk' }
                ]
                // return new Promise((resolve, reject) => {
                //     setTimeout(() => {
                //         resolve([
                //             { id: 'sadas', name: val + '--dd深圳' },
                //             { id: 'kkk', name: val + '--ee广州' }
                //         ])
                //     }, 1000)
                // })
            },
            change (tags) {
                console.error(tags)
            }
        }
    }
</script>
