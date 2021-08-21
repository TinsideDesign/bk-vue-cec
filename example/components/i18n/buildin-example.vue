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
            单独使用组件库内置的语言包
        </h2>
        <div class="example-item" style="height: 400px">
            <bk-date-picker class="mr15" :type="'datetime'" :open="true" v-model="initDateTime"></bk-date-picker>
            <bk-button type="primary submit" title="切换中英文" @click="handleClick">
                切换中英文
            </bk-button>
            <span class="bk-text-primary">当前为{{curLang === 'zhCN' ? '中文' : '英文'}}</span>
        </div>
    </section>
</template>

<script>
    import { bkDatePicker, bkButton, locale, lang } from '@'
    // import { bkDatePicker, bkButton } from '@'

    export default {
        components: {
            bkDatePicker,
            bkButton
        },
        data () {
            return {
                initDateTime: new Date(),
                curLang: ''
            }
        },
        created () {
            // 获取语言标识
            this.curLang = localStorage.getItem('curLang') || 'zhCN'
            // 根据语言包标识设置组件库的语言，目前语言包支持中文和英文，对应的标识分别为 zhCN, enUS
            locale.use(lang[this.curLang])
        },
        methods: {
            back () {
                window.location.href = '#/i18n?anchor=dan-du-shi-yong-zu-jian-ku-nei-zhi-de-yu-yan-bao-example'
            },
            handleClick (event) {
                // 当前为中文时
                if (this.curLang === 'zhCN') {
                    // 切换英文
                    localStorage.setItem('curLang', 'enUS')
                } else { // 当前为英文时
                    // 切换中文
                    localStorage.setItem('curLang', 'zhCN')
                }
                this.$nextTick(() => {
                    window.location.reload()
                })
            }
        }
    }
</script>
