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

export const getNodeId = (data, tree) => {
    const idKey = tree.nodeOptions.idKey
    if (typeof idKey === 'function') {
        return idKey(data)
    }
    return data[idKey]
}

export const getNodeIcon = (data, tree) => {
    const icon = {
        expand: tree.expandIcon,
        collapse: tree.collapseIcon,
        node: tree.nodeIcon
    }
    if (typeof icon.node === 'function') {
        icon.node = icon.node(data)
    }
    return icon
}

export const isNullOrUndefined = value => {
    return value === null || value === undefined
}

export const convertToArray = value => {
    return Array.isArray(value) ? value : [value]
}

export const checkIsLazy = (node, tree) => {
    if (typeof tree.lazyMethod !== 'function') {
        return false
    }
    if (typeof tree.lazyDisabled === 'boolean') {
        return !tree.lazyDisabled
    } else if (typeof tree.lazyDisabled === 'function') {
        return !tree.lazyDisabled(node)
    }
    return true
}
