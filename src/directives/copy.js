/*
 * Tencent is pleased to support the open source community by making
 * 科技内在设计（T-inside） available.
 *
 * Copyright (C) 2021 TID Limited, a DAO.  All rights reserved.
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
const bkCopy = {
    /**
     * @descripttion:
     * @param {*} el 作用的 dom 对象
     * @param {*} value 传给指令的值
     * @param {*} vnode 虚拟节点
     * @return {*}
     */
    bind (el, { value }, vnode) {
        el.$value = value
        el.copyHandler = () => {
            const that = vnode.context
            if (!el.$value) {
                that.$bkMessage({ theme: 'warning', message: '无复制内容', delay: 2000, dismissable: false })
                return
            }
            const textarea = document.createElement('textarea')
            // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
            textarea.readOnly = true
            // 移除屏幕范围
            textarea.style.position = 'absolute'
            textarea.style.left = '-9999px'
            textarea.value = el.$value
            document.body.appendChild(textarea)
            textarea.select()
            const result = document.execCommand('Copy')
            if (result) {
                that.$bkMessage({ theme: 'success', message: '复制成功', delay: 2000, dismissable: false })
            }
            document.body.removeChild(textarea)
        }
        // 绑定点击事件
        el.addEventListener('click', el.copyHandler)
    },
    // 当传进来的值更新的时候触发
    componentUpdated (el, { value }) {
        el.$value = value
    },
    // 指令与元素解绑的时候，移除事件绑定
    unbind (el) {
        el.removeEventListener('click', el.copyHandler)
    }

}

bkCopy.install = Vue => {
    Vue.directive('bkCopy', bkCopy)
}

export default bkCopy