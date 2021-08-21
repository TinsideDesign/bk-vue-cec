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
            Upload 文件上传更多示例
        </h2>
        <div class="example-item">
            <bk-upload
                :files="files"
                :tip="'只允许上传JPG、PNG、JPEG、ZIP的文件'"
                :with-credentials="true"
                :handle-res-code="handleRes"
                :header="[{ name: 'Access-Control-Allow-Origin', value: '*' }]"
                @on-success="testSuccess"
                @on-progress="testProgress"
                @on-done="testDone"
                @on-error="testErr"
                @on-delete="testDel"
                :multiple="true"
                :url="'https://jsonplaceholder.typicode.com/posts/'"
            ></bk-upload>
        </div>
        <div class="mt50">
            <bk-upload
                :files="files"
                :handle-res-code="handleRes"
                :theme="'picture'"
                :multiple="true"
                :with-credentials="true"
                :url="'https://jsonplaceholder.typicode.com/posts/'"
            ></bk-upload>
        </div>
        <div class="mt50">
            <bk-upload
                :files="files"
                :handle-res-code="handleRes"
                :theme="'picture'"
                :multiple="false"
                :with-credentials="true"
                :url="'https://jsonplaceholder.typicode.com/posts/'"
            ></bk-upload>
        </div>
    </section>
</template>

<script>
    import { bkUpload } from '@'

    export default {
        components: {
            bkUpload
        },
        data () {
            return {
                files: [
                    {
                        name: 'image.png',
                        status: 'done',
                        url: './example/static/images/preview/0.png'
                    }
                ]
            }
        },
        methods: {
            testSuccess (file, fileList) {
                console.log(file, fileList, 'success')
            },
            testProgress (e, file, fileList) {
                console.log(e, file, fileList, 'progress')
            },
            testDone () {
                console.log('done')
            },
            testErr (file, fileList) {
                console.log(file, fileList, 'error')
            },
            testDel (file, fileList) {
                console.log(file, fileList, 'testDeltestDeltestDeltestDeltestDel')
            },
            back () {
                window.history.go(-1)
            },
            handleRes (response) {
                if (response.id) {
                    return true
                }
                return false
            }
        }
    }
</script>
