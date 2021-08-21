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

function broadcast (componentName, eventName, params) {
    this.$children.forEach(child => {
        const name = child.$options.name

        if (name === componentName) {
            child.$emit.apply(child, [eventName].concat(params))
        } else {
            // todo 如果 params 是空数组，接收到的会是 undefined
            broadcast.apply(child, [componentName, eventName].concat([params]))
        }
    })
}
export default {
    methods: {
        dispatch (componentName, eventName, params) {
            let parent = this.$parent || this.$root
            let name = parent.$options.name

            while (parent && (!name || name !== componentName)) {
                parent = parent.$parent

                if (parent) {
                    name = parent.$options.name
                }
            }

            if (parent) {
                parent.$emit.apply(parent, [eventName].concat(params))
            }
        },
        broadcast (componentName, eventName, params) {
            broadcast.call(this, componentName, eventName, params)
        },
        findComponentDownward (context, componentName) {
            const childrens = context.$children
            let children = null

            if (childrens.length) {
                for (const child of childrens) {
                    const name = child.$options.name
                    if (name === componentName) {
                        children = child
                        break
                    } else {
                        children = this.findComponentDownward(child, componentName)
                        if (children) break
                    }
                }
            }
            return children
        },
        findComponentUpward (context, componentName, componentNames) {
            if (typeof componentName === 'string') {
                componentNames = [componentName]
            } else {
                componentNames = componentName
            }

            let parent = context.$parent
            let name = parent.$options.name
            while (parent && (!name || componentNames.indexOf(name) < 0)) {
                parent = parent.$parent
                if (parent) name = parent.$options.name
            }
            return parent
        }
    }
}
