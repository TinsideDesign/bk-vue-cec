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
    <bk-pagination
        :current.sync="defaultPaging.current"
        :count.sync="defaultPaging.count"
        :limit="defaultPaging.limit"
        :small="small"
        show-total-count
        align="right"
        @change="handlePageChange"
        @limit-change="handleLimitChange">
    </bk-pagination>
</template>

<script>
    import { bkPagination } from '@'

    export default {
        components: {
            bkPagination
        },
        data () {
            return {
                defaultPaging: {
                    current: 5,
                    limit: 10,
                    count: 300
                },
                small: true
            }
        },
        mounted () {
            setTimeout(() => {
                this.defaultPaging.current = 10
            }, 5000)
        },
        methods: {
            handlePageChange (page) {
                console.log(page)
            },
            handleLimitChange (limit) {
                console.log(limit)
            }
        }
    }
</script>
