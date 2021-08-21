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
        <bk-select searchable :multiple="multiple" v-model="value" :remote-method="remote" :display-tag="true" :tag-fixed-height="false">
            <bk-option v-for="option in options"
                :key="option.id"
                v-bind="option">
            </bk-option>
        </bk-select>
        <div style="border: 1px solid #333; margin-top: 5px;"></div>
        <bk-button @click="multiple = !multiple">111</bk-button>
    </section>
</template>

<script>
    import { bkButton, bkSelect, bkOption } from '@'
    export default {
        components: {
            bkSelect,
            bkOption,
            bkButton
        },
        data () {
            const options = Array(30).fill(0).map((_, index) => {
                return {
                    id: index,
                    name: 'Option-' + index
                }
            })
            return {
                value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                old: options,
                options: options,
                multiple: true
            }
        },
        methods: {
            add () {
                this.options.unshift({
                    id: 'option',
                    name: 'option'
                })
            },
            remote (keyword) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        if (keyword) {
                            this.options = Array(25).fill(0).map((_, index) => {
                                return {
                                    id: index * 25,
                                    name: index * 25
                                }
                            })
                        } else {
                            this.options = this.old
                        }
                        resolve()
                    }, 1000)
                })
            }
        }
    }
</script>
