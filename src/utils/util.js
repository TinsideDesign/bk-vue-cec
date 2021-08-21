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
 * @file 工具方法
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

/**
 *  对元素添加样式类
 *
 *  @param node {NodeElement} 指定的DOM元素
 *  @param className {String} 类名
 */
export function addClass (node, className) {
    const classNames = className.split(' ')
    if (node.nodeType === 1) {
        if (!node.className && classNames.length === 1) {
            node.className = className
        } else {
            let setClass = ' ' + node.className + ' '
            classNames.forEach((cl) => {
                if (setClass.indexOf(' ' + cl + ' ') < 0) {
                    setClass += cl + ' '
                }
            })
            const rtrim = /^\s+|\s+$/
            node.className = setClass.replace(rtrim, '')
        }
    }
}

/**
 *  对元素删除样式类
 *
 *  @param node {NodeElement} 指定的DOM元素
 *  @param className {String} 类名
 */
export function removeClass (node, className) {
    const classNames = className.split(' ')
    if (node.nodeType === 1) {
        let setClass = ' ' + node.className + ' '
        classNames.forEach((cl) => {
            setClass = setClass.replace(' ' + cl + ' ', ' ')
        })
        const rtrim = /^\s+|\s+$/
        node.className = setClass.replace(rtrim, '')
    }
}

/**
 * 获取元素相对于页面的高度
 *
 * @param node {Object} 指定的 DOM 元素
 *
 * @return {number} 高度值
 */
export function getActualTop (node) {
    let actualTop = node.offsetTop
    let current = node.offsetParent

    while (current !== null) {
        actualTop += current.offsetTop
        current = current.offsetParent
    }

    return actualTop
}

/**
 * 获取元素相对于页面左侧的宽度
 *
 * @param node {Object} 指定的 DOM 元素
 *
 * @return {number} 宽度值
 */
export function getActualLeft (node) {
    let actualLeft = node.offsetLeft
    let current = node.offsetParent

    while (current !== null) {
        actualLeft += current.offsetLeft
        current = current.offsetParent
    }

    return actualLeft
}

export const requestAnimationFrame = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.oRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function (callback) {
        window.setTimeout(callback, 1000 / 60)
    }
export const cancelAnimationFrame = window.cancelAnimationFrame
    || window.webkitCancelAnimationFrame
    || window.mozCancelAnimationFrame
    || window.oCancelAnimationFrame
    || window.msCancelAnimationFrame
    || function (id) {
        window.clearTimeout(id)
    }

/**
 * 格式化月份
 *
 * @param {string} month 月份值
 * @param {string} locale 语言
 * @param {boolean} isShort 是否简写月份
 *
 * @return {string} 格式化后的月份
 */
const monthLong = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
}

const monthShort = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec'
}

export function formatMonth (month, locale = 'en-US', isShort = false) {
    if (locale === 'en-US') {
        return isShort ? monthShort[month] : monthLong[month]
    }
    return month
}

// 获取唯一随机数
export function uuid () {
    let id = ''
    const randomNum = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)

    for (let i = 0; i < 7; i++) {
        id += randomNum
    }
    return id
}

/**
 * 格式化数字为百分比形式
 *
 * @param {Number} val 数字
 *
 * @return {string} 百分比形式字符串
 */
export function formatPercentage (val) {
    return `${Number((val * 100).toFixed(3))}%`
}

/**
 * 深拷贝扩展对象
 * @param target
 * @param ...sources
 * @returns {object}
 */
export function deepAssign (target, ...sources) {
    const sourcesArray = [...sources]
    const length = sourcesArray.length
    if (typeof target !== 'object' && typeof target !== 'function') {
        target = {}
    }
    if (length === 0) {
        target = this
    }

    sourcesArray.forEach(source => {
        for (const key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                const targetValue = target[key]
                if (Array.isArray(targetValue)) {
                    target[key].push(...(source[key] || []))
                } else if (typeof targetValue === 'object') {
                    target[key] = deepAssign(targetValue, source[key])
                } else {
                    target[key] = source[key]
                }
            }
        }
    })

    return target
}

export function parsePixels (value, defaultValue) {
    let pixels = parseInt(value)
    if (isNaN(pixels)) {
        pixels = defaultValue
    }
    return pixels + 'px'
}

/**
 * 获取 cookie
 *
 * @param {string} name 要获取的 cookie name
 *
 * @return {string} cookie 值
 */
export function getCookie (name) {
    let arr = []
    const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    // eslint-disable-next-line no-cond-assign
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2])
    }
    return null
}

export function getTag (value) {
    if (value === null) {
        return '[object Null]'
    }
    return toString.call(value)
}

export function isNumber (value) {
    return typeof value === 'number' || (getTag(value) === '[object Number]')
}

export function isString (value) {
    const type = typeof value
    return type === 'string' || (type === 'object' && value !== null && getTag(value) === '[object String]')
}

export function isArray (value) {
    return Array.isArray(value)
}

export function isEmpty (value) {
    return (value === undefined || value === null
        || (isString(value) && value === '') || (isArray(value) && value.length === 0))
}

export function isHtmlElement (node) {
    return node && node.nodeType === Node.ELEMENT_NODE
}
/**
 * 函数防抖
 * @param {Function} cb
 * @param {Number} interval
 * @param params rest参数列表
 * @return {Function}
 * @example input.oninput = debounce(cb， 200， param); function cb(e, param) {};
 */
export function debounce (cb, interval = 300, ...params) {
    let timer = null
    return e => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            cb(e, ...params)
        }, interval)
    }
}

/**
 * 复制
 * @param {*} text
 */
export const copyText = (text) => {
    const textarea = document.createElement('textarea')
    document.body.appendChild(textarea)
    textarea.value = text
    textarea.select()
    if (document.execCommand('copy')) {
        document.execCommand('copy')
    } else {
        console.warn('unsupported this function, please use Google Chrome.')
    }
    document.body.removeChild(textarea)
}

/**
 * 判断元素是否溢出容器
 * @param {*} el
 * @returns
 */
export function checkOverflow (el) {
    if (!el) return false

    const createDom = (el, css) => {
        const dom = document.createElement('div')
        const width = parseFloat(css['width']) ? Math.ceil(parseFloat(css['width'])) + 'px' : css['width']
        dom.style.cssText = `
        width: ${width};
        line-height: ${css['line-height']};
        font-size: ${css['font-size']};
        word-break: ${css['word-break']};
        padding: ${css['padding']};
    `
        dom.textContent = el.textContent
        return dom
    }

    let isOverflow = false
    try {
        const css = window.getComputedStyle(el, null)
        const lineClamp = css.webkitLineClamp
        if (lineClamp !== 'none') {
            const targetHeight = parseFloat(css.height)
            const dom = createDom(el, css)
            document.body.appendChild(dom)
            const domHeight = window.getComputedStyle(dom, null)['height']
            document.body.removeChild(dom)
            isOverflow = targetHeight < parseFloat(domHeight)
        } else {
            isOverflow = el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight
        }
    } catch (e) {
        console.warn('There is an error when check element overflow state: ', e)
    }
    return isOverflow
}
