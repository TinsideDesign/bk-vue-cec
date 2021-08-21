/*
 * Tencent is pleased to support the open source community by making
 * 科技内在设计（T-inside） available.
 *
 * Copyright (C) 2021 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * 科技内在设计（T-inside） is licensed under the MIT License.
 *
 * License for 科技内在设计（T-inside）:
 *
 * ---------------------------------------------------
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
 * to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of
 * the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
 * THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
*/

/**
 * @file 国际化逻辑
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import Vue from 'vue'
import bkLang from 'bk-magic-vue/lib/locale/lang'
import deepmerge from '@/utils/deepmerge'

let curLang = bkLang.zhCN

// Vue.locale = () => {}

let merged = false
/**
 * 检测是否使用 vue-i18n，如果使用了，那么会用 vue-i18n 的 $t 来取值
 */
let i18nHandler = function () {
    const i18n = Object.getPrototypeOf(this || Vue).$t
    // vuei18n 6.x 没有 locale 方法
    if (typeof i18n === 'function' && !!Vue.locale) {
        if (!merged) {
            merged = true
            Vue.locale(
                Vue.config.lang,
                deepmerge(curLang, Vue.locale(Vue.config.lang) || {}, { clone: true })
            )
        }
        return i18n.apply(this, arguments)
    }
}

/**
 * 转义特殊字符
 *
 * @param {string} str 待转义字符串
 *
 * @return {string} 结果
 */
export const escape = str => String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1')

/**
 * 根据语言环境获取对应的值
 *
 * @param {string} path 词语的路径，对应语言包文件里的 key 的路径
 * @param {Object} data 要替换的值
 *
 * @return {string} 对应语言包的值
 */
export const t = function (path, data) {
    let value = i18nHandler.apply(this, arguments)
    if (value !== null && typeof value !== 'undefined') {
        return value
    }

    const arr = path.split('.')
    let current = curLang
    const len = arr.length

    for (let i = 0; i < len; i++) {
        value = current[arr[i]]
        if (i === len - 1) {
            if (data && typeof value === 'string') {
                return value.replace(/\{(?=\w+)/g, '').replace(/(\w+)\}/g, '$1')
                    .replace(new RegExp(Object.keys(data).map(escape).join('|'), 'g'), $0 => data[$0])
            }
            return value
        }
        if (!value) {
            return ''
        }
        current = value
    }
    return ''
}

/**
 * 使用某种语言
 *
 * @param {Object} l 使用的语言包
 */
export const use = function (l) {
    if (l) {
        curLang = deepmerge(curLang, l)
    }
}

/**
 * 自定义 i18n 的处理函数
 *
 * @param {Function} fn i18n 处理函数
 */
export const i18n = function (fn) {
    i18nHandler = fn || i18nHandler
}

export const getCurLang = function () {
    return curLang
}

const mixin = {
    methods: {
        t (...args) {
            return t.apply(this, args)
        }
    }
}

Vue.prototype.bkLocale = {
    use,
    t,
    i18n,
    getCurLang,
    lang: bkLang,
    // 语言处理的 mixin，给组件加上一个 t 方法，组件在需要根据语言切换的地方，只要加入这个 mixin 并在输出的地方使用 t(key) 即可
    // 例如 t(datePicker.today)
    mixin: mixin
}

export default { use, t, i18n, getCurLang, lang: bkLang, mixin: mixin }
