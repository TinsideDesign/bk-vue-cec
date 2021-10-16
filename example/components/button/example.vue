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
            Button 按钮更多示例
        </h2>
        <div class="example-item">
            <p>
                <span class="bk-text-minor">基本按钮</span>
            </p>
            <bk-button type="primary submit" title="主要按钮" @click="handleClick">
                主要按钮
            </bk-button>
            <bk-button type="default button">
                default
            </bk-button>
            <bk-button type="primary submit">
                primary
            </bk-button>
            <bk-button type="warning reset">
                warning
            </bk-button>
            <bk-button type="success">
                success
            </bk-button>
            <bk-button type="danger">
                danger
            </bk-button>
        </div>
        <div class="example-item">
            <p>
                <a class="bk-text-danger">禁用</a>
            </p>
            <bk-button type="primary" title="禁用按钮" :disabled="isDisabled">
                禁用按钮
            </bk-button>
        </div>
        <div class="example-item">
            <p>
                <a class="bk-text-danger">loading</a>
            </p>
            <bk-button type="primary" title="loading 按钮" :loading="isLoading">
                loading 按钮
            </bk-button>
        </div>
        <div class="example-item">
            <p>
                <a class="bk-text-danger">不同 size</a>
            </p>
            <bk-button type="primary" size="small">
                小按钮
            </bk-button>
            <bk-button type="primary">
                正常按钮
            </bk-button>
            <bk-button type="primary" size="large">
                大按钮
            </bk-button>
        </div>
        <div class="example-item">
            <p>
                <a class="bk-text-danger">按钮组</a>
            </p>
            <div class="bk-button-group">
                <bk-button type="default">
                    <span>北京</span>
                </bk-button>
                <bk-button type="default">
                    <span>上海</span>
                </bk-button>
                <bk-button type="default">
                    <span>广州</span>
                </bk-button>
                <bk-button type="default">
                    <span>深圳</span>
                </bk-button>
                <bk-button type="default">
                    <span>其它</span><span class="bk-icon icon-angle-down"></span>
                </bk-button>
            </div>
        </div>
        <div class="example-item">
            <p>
                <a class="bk-text-danger">图标</a>
            </p>
            <bk-button type="primary" icon="bk">
                成功
            </bk-button>
            <bk-button type="primary" icon="weixin">
                微信
            </bk-button>
            <bk-button type="primary" icon="qq">
                QQ
            </bk-button>
            <bk-button type="primary" icon="user">
                user
            </bk-button>
        </div>
    </section>
</template>

<script>
    import { bkButton } from '@'
    
    export default {
        components: {
            bkButton
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
                console.log(event)
                alert('button clicked!')
            }
        }
    }
</script>
