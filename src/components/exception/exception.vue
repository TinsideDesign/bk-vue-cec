<!--
 * Tencent is pleased to support the open source community by making
 * 科技内在设计（T-inside） available.
 *
 * Copyright (C) 2021 THL A29 Limited, a Tencent company.  All rights reserved.
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
    <div class="bk-exception" :class="extCls">
        <div class="bk-exception-img" :class="scene + '-img'">
            <img class="exception-image" :src="images[type]" :alt="type" />
        </div>
        <div class="bk-exception-text" :class="scene + '-text'">
            <slot>{{tipText[type]}}</slot>
        </div>
    </div>
</template>
<script>
    import Building from '@/ui/images/exceptions/building.svg'
    import notFound from '@/ui/images/exceptions/404.svg'
    import permissions from '@/ui/images/exceptions/403.svg'
    import maintain from '@/ui/images/exceptions/500.svg'
    import empty from '@/ui/images/exceptions/empty.svg'
    import searchEmpty from '@/ui/images/exceptions/search-empty.svg'
    import login from '@/ui/images/exceptions/login.svg'
    import locale from 'bk-magic-vue/lib/locale'

    export default {
        name: 'bk-exception',
        mixins: [locale.mixin],
        props: {
            type: {
                type: [String, Number],
                default: 404,
                validator (value) {
                    return ['404', '403', '500', 'building', 'empty', 'search-empty', 'login'].indexOf(value + '') > -1
                }
            },
            scene: {
                type: String,
                default: 'page',
                valudator (value) {
                    return ['page', 'part'].indexOf(value) > -1
                }
            },
            // 外部设置的 class name
            extCls: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                images: {
                    403: permissions,
                    404: notFound,
                    500: maintain,
                    building: Building,
                    empty: empty,
                    'search-empty': searchEmpty,
                    login: login
                },
                tipText: {}
            }
        },
        created () {
            this.tipText = Object.assign({}, {
                403: this.t('bk.exception.403'),
                404: this.t('bk.exception.404'),
                500: this.t('bk.exception.500'),
                building: this.t('bk.exception.building'),
                empty: this.t('bk.exception.empty'),
                'search-empty': this.t('bk.exception.searchEmpty'),
                login: this.t('bk.exception.login')
            })
        }
    }
</script>
<style>
    @import '../../ui/exception.css';
</style>
