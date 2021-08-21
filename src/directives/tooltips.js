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
 * @file tooltips 指令 基于 tippy 封装
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import Vue from 'vue'
import Tippy, { getValidTippyProps } from '@/utils/tippy'
import '@/ui/tooltips.css'

/**
 * bk-tooltips
 * @param placement {String} - 定位
 * @param trigger {String} - 触发事件 - ‘mouseenter focus', 'click', 'manual'
 */
const defaultOptions = {
    duration: 0,
    arrow: true,
    size: 'small',
    trigger: 'mouseenter focus',
    theme: 'dark',
    interactive: true,
    content: '',
    allowHtml: false,
    extCls: ''
}

const validPlacements = [
    'auto-start',
    'auto',
    'auto-end',
    'top-start',
    'top',
    'top-end',
    'right-start',
    'right',
    'right-end',
    'bottom-end',
    'bottom',
    'bottom-start',
    'left-end',
    'left',
    'left-start'
]

const createTippy = (el, binding) => {
    const value = binding.value
    const options = { ...defaultOptions }

    if (typeof value === 'object') {
        Object.assign(options, value)
    } else {
        options.content = value
    }

    const placement = validPlacements.find(placement => binding.modifiers[placement])
    options.placement = options.placement || placement || (options.placements || ['top'])[0]

    const { click, light } = binding.modifiers
    if (click) {
        options.trigger = 'click'
    }
    if (light) {
        options.theme = 'light'
    }

    if (options.allowHtml) {
        const selector = options.content
        if (selector instanceof Vue) {
            options.content = selector.$el
        } else if (typeof selector === 'string') {
            const element = document.querySelector(selector)
            if (element) {
                options.content = element
            }
        }
    }

    if (options.html) {
        options.content = options.html
    }

    if (typeof options.onClose === 'function') {
        options.onHide = options.onClose
    }

    const validOptions = getValidTippyProps(options)
    return Tippy(el, validOptions)
}

const bkTooltips = {
    inserted (el, binding) {
        const disabled = typeof binding.value === 'object' ? binding.value.disabled : false
        if (!disabled) {
            el.tippyInstance = createTippy(el, binding)
        }
    },
    unbind (el) {
        el._tippy && el._tippy.destroy()
        el.tippyInstance = null
    },
    update (el, binding) {
        const value = binding.value
        const isObject = typeof value === 'object'
        const content = isObject ? value.content : value
        const disabled = isObject ? value.disabled : false
        if (disabled || !content) {
            el._tippy && el._tippy.destroy()
            el.tippyInstance = null
        } else if (content) {
            if (!el._tippy) {
                el.tippyInstance = createTippy(el, binding)
            } else {
                // TODO: 暂时先这样处理，如果是 html 那么再次实例化，如果不实例化只是更新 html 内容的话，那么第一次绑定的事件会消失
                if (typeof value === 'object' && binding.value.allowHtml) {
                    el.tippyInstance = createTippy(el, binding)
                } else {
                    el._tippy.setContent(content)
                }
            }
        }
    }
}

bkTooltips.install = Vue => {
    Vue.directive('bkTooltips', bkTooltips)
}

export default bkTooltips
