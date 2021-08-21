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
 * @file loading directive
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import Vue from 'vue'
import ViewModel from './loading.vue'

const Model = Vue.extend(ViewModel)

function show (el, options) {
    if (!el.$vm) {
        el.$vm = el.viewmodel.$mount()
        el.appendChild(el.$vm.$el)
    }
    el.$vm.duration = 0
    Vue.nextTick(() => {
        el.$vm.isShow = true
    })
}

function toggle (el, options) {
    if (!el.$vm) {
        el.$vm = el.viewmodel.$mount()
        el.appendChild(el.$vm.$el)
    }

    clearTimeout(el.$vm.timer)

    if (options.isLoading) {
        Vue.nextTick(() => {
            el.$vm.isShow = true
        })
    } else {
        const delay = isNaN(options.delay) ? 0 : Number(options.delay)
        if (delay > 0) {
            el.$vm.timer = setTimeout(() => {
                el.$vm.isShow = false
            }, delay)
        } else {
            el.$vm.isShow = false
        }
    }

    if (options.title) {
        el.$vm.title = options.title
    }
}

const bkLoading = {
    inserted (el, binding) {
        const value = binding.value

        const position = getComputedStyle(el).position
        const options = {}

        if (!position || position !== 'relative' || position !== 'absolute') {
            el.style.position = 'relative'
        }

        for (const key in value) {
            if (key !== 'isLoading') {
                options[key] = value[key]
            }
        }

        options.type = 'directive'
        options.opacity = options.opacity || 0.9
        options.color = options.color || '#ffffff'
        // 如果配置项有 zIndex 选项，遮罩层的层叠顺序使用配置项的 zIndex，否则使用层叠顺序管理器自动生成的 zIndex
        options.hasZIndexOption = typeof options.zIndex === 'number' && !Number.isNaN(options.zIndex)

        el.viewmodel = new Model({
            data: options
        })

        // 在第一次渲染时，immediate为true立即显示
        if (options.immediate) {
            show(el, binding.value)
        } else {
            toggle(el, binding.value)
        }
    },
    update (el, binding) {
        toggle(el, binding.value)
    }
}

export default bkLoading
