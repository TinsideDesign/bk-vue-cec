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

import Tippy from '@/utils/tippy'
import '@/ui/overflow-tips.css'
import { checkOverflow } from '@/utils/util'

function beforeShow (instance) {
    const { reference } = instance
    const { props } = reference._bk_overflow_tips_
    const isOverflow = checkOverflow(reference)
    if (isOverflow) {
        instance.setContent(props.content
            ? props.content : props.allowHTML
                ? reference.innerHTML : reference.textContent)
        return true
    }
    return false
}

function setupOnShow (props, customProps) {
    props.onShow = instance => {
        if (typeof customProps.onShow === 'function') {
            const result = customProps.onShow(instance)
            if (!result) return false
        }
        return beforeShow(instance)
    }
}

function setupTheme (props, customProps) {
    const theme = ['bk-overflow-tips']
    if (customProps.theme) {
        theme.push(customProps.theme)
    }
    props.theme = theme.join(' ')
}

const defaultProps = {
    arrow: true,
    interactive: true,
    delay: 150,
    allowHTML: false,
    maxWidth: 400,
    boundary: 'window',
    placement: 'top'
}

const overflowTips = {
    inserted (el, binding = {}) {
        const customProps = typeof binding.value === 'object' ? binding.value : {}
        const props = Object.assign({ ...defaultProps }, customProps)
        setupOnShow(props, customProps)
        setupTheme(props, customProps)
        el._bk_overflow_tips_ = {
            props: props, // 指令配置的props单独存储方便后续做判断
            instance: Tippy(el, props)
        }
    },
    update (el, binding) {
        const { props, instance } = el._bk_overflow_tips_
        const customProps = typeof binding.value === 'object' ? binding.value : {}
        Object.assign(props, customProps)
        setupOnShow(props, customProps)
        instance.set(props)
    },
    unbind (el) {
        el._tippy && el._tippy.destroy()
        delete el._bk_overflow_tips_
    },
    setDefaultProps (props) {
        Object.assign(defaultProps, props)
    }
}

overflowTips.install = Vue => {
    Vue.directive('bk-overflow-tips', overflowTips)
}

export default overflowTips
