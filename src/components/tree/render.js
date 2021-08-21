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
 * @file tree render
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

export default {
    name: 'render',
    functional: true,
    props: {
        node: Object,
        tpl: Function
    },
    render (h, ct) {
        const titleClass = ct.props.node.selected ? 'node-title node-selected' : 'node-title'
        if (ct.props.tpl) {
            // 防止某些情况下 h 不能自动注入而报错，需将 h 参数抛出；一般来说 h 默认是第一参数，但是现在改为第一参数会导致已经使用的用户都需要修改，所以先放在最后。
            return ct.props.tpl(ct.props.node, h)
        }
        return (
            <span domPropsInnerHTML={ct.props.node.name} title={ct.props.node.title} class={titleClass}
                style='user-select: none'
                onClick={() => ct.parent.nodeSelected(ct.props.node)}>
            </span>
        )
    }
}
