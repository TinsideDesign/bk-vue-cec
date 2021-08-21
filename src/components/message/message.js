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
 * @file message instance
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import Vue from 'vue'
import Message from './message.vue'

const MessageComponent = Vue.extend(Message)

const messageList = []
let seed = 0

const BkMessage = function (config) {
    // 限制个数为 0 时，清除所有实例
    if (config.limit === 0) {
        BkMessage.batchClose()
        return
    }

    if (config.limit > 0) {
        BkMessage.batchClose(config.limit)
    }

    const instanceId = `messageInstance_${Date.now()}_${seed++}`
    const offsetY = config.offsetY || 30 // 组件距视口顶部的偏移量
    const spacing = config.spacing || 10 // 组件间的垂直间距

    if (config.ellipsisLine === null || config.ellipsisLine === undefined || config.ellipsisLine === ''
        || isNaN(config.ellipsisLine)
    ) {
        config.ellipsisLine = 1
    }
    const ellipsisLine = config.ellipsisLine

    let verticalOffset = offsetY

    if (typeof config === 'string' || typeof config === 'number') {
        config = {
            message: config
        }
    }
    const configClose = config.onClose
    config.onClose = function () {
        BkMessage.close(instanceId, configClose)
    }

    const instance = new MessageComponent({
        data: config
    })

    if (config.message !== null
        && typeof config.message === 'object'
        && config.message.hasOwnProperty('componentOptions')
    ) {
        instance.$slots.default = [config.message]
        instance.message = null
    }

    instance.id = instanceId
    instance.spacing = spacing
    instance.ellipsisLine = ellipsisLine
    instance.verticalOffset = 0
    instance.$mount()
    instance.dom = instance.$el
    document.body.appendChild(instance.$el)

    messageList.forEach(item => {
        verticalOffset += (item.$el.offsetHeight + spacing)
    })
    instance.verticalOffset = verticalOffset
    instance.horizonOffset = spacing
    instance.visible = true
    messageList.push(instance)

    return instance
}
// 实例关闭回调
BkMessage.close = function (id, configClose) {
    let instanceIndex = -1
    messageList.some((item, index) => {
        if (item.id === id) {
            instanceIndex = index
            return true
        }
    })

    if (instanceIndex > -1) {
        const instance = messageList[instanceIndex]

        if (typeof configClose === 'function') {
            configClose(instance)
        }

        messageList.forEach((item, i) => {
            if (i > instanceIndex) {
                item.verticalOffset -= (instance.dom.offsetHeight + instance.spacing)
            }
        })

        messageList.splice(instanceIndex, 1)
    }
}
// 批量清除实例
BkMessage.batchClose = function (limit = 0) {
    const len = messageList.length

    if (limit <= len) {
        const InstancesShouldClose = messageList.slice(0, len - limit + 1)
        InstancesShouldClose.forEach(item => {
            item.close()
        })
    }
}

Vue.prototype.$bkMessage = BkMessage

export default BkMessage
