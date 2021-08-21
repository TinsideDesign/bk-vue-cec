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

import tinycolor from 'tinycolor2'

/**
 * 根据饱和度面板、色值面板或普通色值标准化颜色信息
 * @param {String|Object} colorParam - 色值信息
 * @param {String} colorParam.h - 色相
 * @param {String} colorParam.s - 饱和度
 * @param {String} [colorParam.l] - 亮度
 * @param {String} [colorParam.v] - 明度
 * @param {String} colorParam.a - 透明度
 * @returns {Object} - 转化后的色值对象
 */
export function formatColor (colorParam) {
    if (colorParam === '') {
        colorParam = '#FFFFFF'
    }
    // 如果参数不合法会返回黑色#000相关信息
    const tinyColor = tinycolor(colorParam)
    const hsl = tinyColor.toHsl()
    const hsv = tinyColor.toHsv()

    // 因为饱和度为0时，颜色不受色相值影响，色相会置零，但是这里需要在面板中保存色相值
    if (hsl.s === 0) {
        hsl.h = hsv.h = colorParam.h || 0
    }

    // when the hsv.v is less than 0.0164 (base on test)
    // because of possible loss of precision
    // the result of hue and saturation would be miscalculated
    if (hsv.v < 0.0164) {
        hsv.h = colorParam.h || 0
        hsv.s = colorParam.s || 0
    }
    if (hsl.l < 0.01) {
        hsl.h = colorParam.h || 0
        hsl.s = colorParam.s || 0
    }

    return {
        hsl,
        hsv,
        hex: tinyColor.toHexString().toUpperCase(),
        rgba: tinyColor.toRgb()
    }
}

/**
 * 返回指定闭区间数值
 * @param {Number} value
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */
export function clamp (value, min, max) {
    if (value < min) {
        return min
    }

    if (value > max) {
        return max
    }

    return value
}

/**
 * 移动端获取事件位置
 * @param {Object} e
 * @param {String} prop
 * @returns {Number}
 */
export function getTouches (e, prop) {
    return e.touches ? e.touches[0][prop] : 0
}

/**
 * 转化 rgba 色值字符串
 * @param {Object} rgba
 * @returns {String}
 */
export function toRGBAString (rgba) {
    const { r, g, b, a } = rgba

    return `rgba(${[r, g, b, a].join(',')})`
}
