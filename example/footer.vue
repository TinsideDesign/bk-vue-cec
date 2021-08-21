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
    <div class="magic-footer">
        <div class="magic-copyright">
            <p>
                <a href="https://www.lanxin.cn/" id="contact-us" class="link magic-contact">
                    <img src="./img/lanxin.png" style="width:17px;">蓝信交谈
                </a>
                Copyright © 2020-<span id="cur_year">{{year}}</span> T-inside design 版权所有
            </p>
        </div>
        <!-- <div class="magic-button">
            <a href="javascript:void(0);" class="magic-top" v-show="showBackTop" @click="backTop">
                <img src="./img/back_top.png" alt="返回顶部" />
            </a>
            <a href="https://bk.tencent.com/s-mart/community" target="_blank" class="magic-feedback">
                <img src="./img/feedback.png" alt="反馈" />
            </a>
        </div> -->
    </div>
</template>

<script>
    export default {
        data () {
            return {
                year: new Date().getFullYear(),
                showBackTop: false
            }
        },
        mounted () {
            window.addEventListener('scroll', this.toggleBackTop)
            try {
                setTimeout(() => {
                    window.__WPA.create({
                        nameAccount: '800802001',
                        customEle: document.getElementById('contact-us')
                    })
                }, 1000)
            } catch (err) {
                // do
            }
        },
        destroyed () {
            window.removeEventListener('scroll', this.toggleBackTop)
        },
        methods: {
            /**
             * 获取页面滚动高度，判断是否出现返回顶部
             */
            toggleBackTop () {
                let scrollTop = 0
                let bodyScrollTop = 0
                let documentScrollTop = 0

                if (document.body) {
                    bodyScrollTop = document.body.scrollTop
                }

                if (document.documentElement) {
                    documentScrollTop = document.documentElement.scrollTop
                }

                scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop
                this.showBackTop = scrollTop > 0
            },

            /**
             * 返回到页面顶部
             */
            backTop () {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                })
            }
        }
    }
</script>

<style scoped lang="postcss">
    .magic-footer {
        min-width: 950px;
        text-align: center;
        margin-left: 300px;
    }
    .magic-copyright {
        color: #555;
        text-align: center;
        margin-bottom: 30px;
        font: 13px/24px "hiragino sans gb", "microsoft yahei";
        .magic-contact {
            color: #555;
            padding-right: 10px;
            margin-right: 10px;
            border-right: 1px solid #ddd;
            display: inline-block;
            text-decoration: none;
            img {
                width: 17px;
                vertical-align: middle;
                margin-right: 5px;
            }
            span {
                vertical-align: middle;
            }
        }
    }

    .magic-button {
        position: fixed;
        right: 10px;
        bottom: 50px;
    }

    .magic-button a {
        display: block;
        width: 38px;
        height: 38px;
        line-height: 35px;
        text-align: center;
        background: #9a9a9a;
        border-radius: 2px;
    }

    .magic-button a:hover {
        background: #454545;
    }

    .magic-button {
        .magic-feedback {
            margin-top: 5px;
            img {
                vertical-align: middle;
            }
        }
    }
</style>
