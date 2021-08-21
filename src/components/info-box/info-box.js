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
 * @file info-box
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import Vue from 'vue'
import { isVNode } from '@/utils/dom'
import InfoBox from '@/components/dialog/dialog.vue'

const InfoBoxConstructor = Vue.extend(InfoBox)
const instancesList = []
let seed = 0

const Info = function (opts = {}) {
    const id = 'bkInfoBox' + seed++

    if (typeof opts === 'string') {
        opts = {
            title: opts
        }
    }

    const instance = new InfoBoxConstructor()

    instance.id = id
    instance.name = 'bk-info-box'

    if (opts.width) {
        instance.width = opts.width
    }
    // 当 confirmFn 为异步函数时确定按钮自动 loading
    instance.confirmLoading = Boolean(opts.confirmLoading)
    // 显示/隐藏
    instance.value = true
    // 标题
    instance.title = opts.title
    // 二级标题
    instance.subTitle = opts.subTitle
    // type
    instance.type = opts.type || ''
    // 是否显示 footer
    instance.showFooter = opts.showFooter !== false

    instance.closeIcon = opts.closeIcon !== false

    instance.maskClose = opts.maskClose
    instance.escClose = opts.escClose
    instance.theme = opts.theme || 'primary'
    instance.icon = opts.icon
    instance.extCls = opts.extCls
    instance.okText = opts.okText
    instance.cancelText = opts.cancelText
    instance.zIndex = opts.zIndex || instance.zIndex

    if (isVNode(opts.subHeader)) {
        instance.$slots[opts.type ? 'type-sub-header' : 'sub-header'] = opts.subHeader
    }

    if (isVNode(opts.header)) {
        instance.$slots[opts.type ? 'type-header' : 'header'] = opts.header
    }

    instance.confirmFn = opts.confirmFn && typeof opts.confirmFn === 'function'
        ? async () => {
            instance.closeIcon = false
            const res = await opts.confirmFn(instance)
            instance.closeIcon = opts.closeIcon !== false
            if (!res && typeof res !== 'undefined') {
                return
            }
            Info.close(id)
        } : () => {
            Info.close(id)
        }

    instance.cancelFn = opts.cancelFn && typeof opts.cancelFn === 'function'
        ? opts.cancelFn
        : () => {}

    instance.afterLeaveFn = opts.afterLeaveFn && typeof opts.afterLeaveFn === 'function'
        ? opts.afterLeaveFn
        : () => {}

    instance.stateChangeFn = opts.stateChangeFn && typeof opts.stateChangeFn === 'function'
        ? opts.stateChangeFn
        : () => {}

    instance.onClose = function () {
        Info.close(id, opts.onClose)
    }

    let ref = document.body
    const container = opts.container
    if (container) {
        instance.ignoreExistMask = false
        if (typeof container !== 'string') {
            ref = container instanceof Element
                ? container
                : (container instanceof Vue ? container.$el : document.querySelector(container))
        } else {
            const element = document.querySelector(container)
            if (element) {
                ref = element
            } else {
                throw new Error(`没有找到 ${element} 节点`)
            }
        }
        instance.transfer = false
    } else {
        instance.transfer = true
    }

    instance.$mount()
    instance.$dom = instance.$el

    ref.appendChild(instance.$el)
    instancesList.push(instance)
    return instance
}

Info.close = (id, optsClose) => {
    const len = instancesList.length
    for (let index = 0; index < len; index++) {
        const targetInstance = instancesList[index]
        if (id === targetInstance.id) {
            targetInstance.value = false
            if (typeof optsClose === 'function') {
                optsClose(targetInstance)
            }
            instancesList.splice(index, 1)
            targetInstance.$on('after-leave', () => {
                targetInstance.$el.parentNode.removeChild(targetInstance.$el)
            })
            break
        }
    }
}

Vue.prototype.$bkInfo = Info

export default Info
