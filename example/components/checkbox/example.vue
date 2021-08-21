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
            Checkbox 多选框更多示例
        </h2>
        <div class="example-item">
            <bk-checkbox-group v-model="value">
                <bk-checkbox :label="'value0'">0</bk-checkbox>
                <bk-checkbox :label="'value1'">1</bk-checkbox>
                <bk-checkbox :label="'value2'">2</bk-checkbox>
                <bk-checkbox :label="'value3'">3</bk-checkbox>
                <bk-checkbox :label="'value4'">4</bk-checkbox>
                <bk-checkbox :label="'value5'">5</bk-checkbox>
                <bk-checkbox :label="'value6'">6</bk-checkbox>
                <bk-checkbox :label="'value7'">7</bk-checkbox>
                <bk-checkbox :label="'value8'">8</bk-checkbox>
                <bk-checkbox :label="'value9'">9</bk-checkbox>
                <bk-checkbox :label="'value10'">10</bk-checkbox>
                <bk-checkbox :label="'value11'">11</bk-checkbox>
                <bk-checkbox :label="'value12'">12</bk-checkbox>
                <bk-checkbox :label="'value13'">13</bk-checkbox>
                <bk-checkbox :label="'value14'">14</bk-checkbox>
                <bk-checkbox :label="'value15'">15</bk-checkbox>
                <bk-checkbox :label="'value16'">16</bk-checkbox>
                <bk-checkbox :label="'value17'">17</bk-checkbox>
                <bk-checkbox :label="'value18'">18</bk-checkbox>
                <bk-checkbox :label="'value19'">19</bk-checkbox>
            </bk-checkbox-group>
        </div>
    </section>
</template>

<script>
    import { bkCheckbox, bkCheckboxGroup } from '@'

    export default {
        components: {
            bkCheckbox,
            bkCheckboxGroup
        },
        data () {
            return {
                value: ['value2', 'value4']
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
    .bk-form-checkbox {
        margin-right: 30px;
    }
</style>
