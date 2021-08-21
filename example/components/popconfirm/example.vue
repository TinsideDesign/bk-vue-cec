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
            Popconfirm 弹出确认框更多示例
        </h2>
        <div class="example-item">
            <p>
                <span class="bk-text-minor">基本</span>
            </p>
            <bk-popconfirm placement="right" :ext-cls="'asadsadsads'" :ext-popover-cls="'ext-popover-cls'">
                <div slot="content">
                    <div>
                        <i class="bk-icon icon-info-circle-shape pr5" style="color: red;"></i>
                        显示多行信息
                    </div>
                    <div>可以自定义自己想要的样式和内容</div>
                </div>
                <i class="bk-icon icon-info-circle-shape"></i>
            </bk-popconfirm>
        </div>
    </section>
</template>

<script>
    import { bkPopconfirm } from '@'

    export default {
        components: {
            bkPopconfirm
        },
        data () {
            return {
                isLoading: true,
                isDisabled: true
            }
        },
        methods: {
            back () {
                window.history.go(-1)
            },
            handleClick (event) {
            }
        }
    }
</script>
