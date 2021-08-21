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
            Radio 单选框更多示例
        </h2>
        <div class="example-item">
            <bk-radio-group v-model="value">
                <bk-radio :label="'value0'">0</bk-radio>
                <bk-radio :label="'value1'">1</bk-radio>
                <bk-radio :label="'value2'">2</bk-radio>
                <bk-radio :label="'value3'">3</bk-radio>
                <bk-radio :label="'value4'">4</bk-radio>
                <bk-radio :label="'value5'">5</bk-radio>
                <bk-radio :label="'value6'">6</bk-radio>
                <bk-radio :label="'value7'">7</bk-radio>
                <bk-radio :label="'value8'">8</bk-radio>
                <bk-radio :label="'value9'">9</bk-radio>
                <bk-radio :label="'value10'">10</bk-radio>
                <bk-radio :label="'value11'">11</bk-radio>
                <bk-radio :label="'value12'">12</bk-radio>
                <bk-radio :label="'value13'">13</bk-radio>
                <bk-radio :label="'value14'">14</bk-radio>
                <bk-radio :label="'value15'">15</bk-radio>
                <bk-radio :label="'value16'">16</bk-radio>
                <bk-radio :label="'value17'">17</bk-radio>
                <bk-radio :label="'value18'">18</bk-radio>
                <bk-radio :label="'value19'">19</bk-radio>
            </bk-radio-group>
        </div>
    </section>
</template>

<script>
    import { bkRadio, bkRadioGroup } from '@'

    export default {
        components: {
            bkRadio,
            bkRadioGroup
        },
        data () {
            return {
                value: 'value2'
            }
        },
        methods: {
            back () {
                window.history.go(-1)
            }
        }
    }
</script>
<style lang="postcss">
    .bk-form-radio {
        margin-right: 30px;
    }
</style>
