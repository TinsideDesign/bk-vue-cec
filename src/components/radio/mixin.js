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

export default {
    data () {
        return {
            current: '',
            group: false,
            groupName: this.name,
            parent: this.findComponentUpward(this, 'bk-radio-group')
        }
    },
    computed: {
        selected () {
            return this.current === this.localTrueValue
        },
        localTrueValue () {
            let localValue
            if (this.parent) {
                if (this.value === undefined && this.label === undefined) {
                    localValue = this.trueValue
                } else if (this.value !== undefined) {
                    localValue = this.value
                } else {
                    localValue = this.label
                }
            } else {
                localValue = this.trueValue
            }
            return localValue
        }
    },
    mounted () {
        if (this.parent) {
            this.groupName = this.parent.name
        }
        this.updateValue()
    },
    methods: {
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
        },
        getKeyDownSelected (target) {
            const ele = Array.prototype.find
                .call(target.children, node => node.nodeName === 'INPUT' && node.type === 'radio')
            return !ele.checked
        },
        handlerChange (event) {
            if (this.disabled) {
                return false
            }

            const selected = event.type === 'change' ? event.target.checked : this.getKeyDownSelected(event.target)
            const value = selected ? this.localTrueValue : this.falseValue
            this.$emit('input', value)
            this.$emit('change', value)

            if (this.parent) {
                this.parent.change({
                    value: value
                })
            }
        }
    }
}
