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
 * @file date util
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import fecha from './fecha'

/**
 * 设置时间，当天的零点时间
 *
 * @return {Date} date 对象
 */
export const initTime = () => {
    const date = new Date()
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    return date
}

/**
 * 根据 date 设置 h, m, s
 *
 * @param {Date} date date 对象
 * @param {number} h 小时数
 * @param {number} m 分钟数
 * @param {number} s 秒数
 *
 * @return {Date} date 对象
 */
export const mergeDateHMS = (date, h, m, s) => {
    const newDate = new Date(date.getTime())
    newDate.setHours(h)
    newDate.setMinutes(m)
    newDate.setSeconds(s)
    return newDate
}

export const getDayCountOfMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
}

export const toDate = date => {
    let _date = new Date(date)
    // IE patch start (#1422)
    if (isNaN(_date.getTime()) && typeof date === 'string') {
        _date = date.split('-').map(Number)
        _date[1] += 1
        _date = new Date(..._date)
    }
    // IE patch end

    if (isNaN(_date.getTime())) {
        return null
    }
    return _date
}

export const formatDate = (date, format) => {
    date = toDate(date)
    if (!date) {
        return ''
    }
    return fecha.format(date, format || 'yyyy-MM-dd')
}

export const parseDate = (string, format) => {
    return fecha.parse(string, format || 'yyyy-MM-dd')
}

// Parsers and Formaters
export const DEFAULT_FORMATS = {
    date: 'yyyy-MM-dd',
    month: 'yyyy-MM',
    year: 'yyyy',
    datetime: 'yyyy-MM-dd HH:mm:ss',
    time: 'HH:mm:ss',
    timerange: 'HH:mm:ss',
    daterange: 'yyyy-MM-dd',
    datetimerange: 'yyyy-MM-dd HH:mm:ss'
}

const DATE_FORMATTER = (value, format) => {
    return formatDate(value, format)
}

const DATE_PARSER = (text, format) => {
    return parseDate(text, format)
}

export const RANGE_SEPARATOR = ' - '

const RANGE_FORMATTER = (value, format) => {
    if (Array.isArray(value) && value.length === 2) {
        const start = value[0]
        const end = value[1]

        if (start && end) {
            return formatDate(start, format) + RANGE_SEPARATOR + formatDate(end, format)
        }
    } else if (!Array.isArray(value) && value instanceof Date) {
        return formatDate(value, format)
    }
    return ''
}

const RANGE_PARSER = (text, format) => {
    const array = Array.isArray(text) ? text : text.split(RANGE_SEPARATOR)
    if (array.length === 2) {
        const range1 = array[0]
        const range2 = array[1]

        return [
            range1 instanceof Date ? range1 : parseDate(range1, format),
            range2 instanceof Date ? range2 : parseDate(range2, format)
        ]
    }

    return []
}

export const TYPE_VALUE_RESOLVER_MAP = {
    default: {
        formatter (value) {
            if (!value) {
                return ''
            }
            return '' + value
        },
        parser (text) {
            if (text === undefined || text === '') {
                return null
            }
            return text
        }
    },
    date: {
        formatter: DATE_FORMATTER,
        parser: DATE_PARSER
    },
    datetime: {
        formatter: DATE_FORMATTER,
        parser: DATE_PARSER
    },
    daterange: {
        formatter: RANGE_FORMATTER,
        parser: RANGE_PARSER
    },
    datetimerange: {
        formatter: RANGE_FORMATTER,
        parser: RANGE_PARSER
    },
    timerange: {
        formatter: RANGE_FORMATTER,
        parser: RANGE_PARSER
    },
    time: {
        formatter: DATE_FORMATTER,
        parser: DATE_PARSER
    },
    month: {
        formatter: DATE_FORMATTER,
        parser: DATE_PARSER
    },
    year: {
        formatter: DATE_FORMATTER,
        parser: DATE_PARSER
    },
    multiple: {
        formatter (value, format) {
            return value.filter(Boolean).map(date => formatDate(date, format)).join(',')
        },
        parser (value, format) {
            const values = typeof value === 'string' ? value.split(',') : value
            return values.map(value => {
                if (value instanceof Date) {
                    return value
                }

                if (typeof value === 'string') {
                    value = value.trim()
                } else if (typeof value !== 'number' && !value) {
                    value = ''
                }

                return parseDate(value, format)
            })
        }
    },
    number: {
        formatter (value) {
            if (!value) {
                return ''
            }
            return '' + value
        },
        parser (text) {
            const result = Number(text)

            if (!isNaN(text)) {
                return result
            }

            return null
        }
    }
}

export const formatDateLabels = (() => {
    /*
      Formats:
      yyyy - 4 digit year
      m - month, numeric, 1 - 12
      mm - month, numeric, 01 - 12
      mmm - month, 3 letters, as in `toLocaleDateString`
      Mmm - month, 3 letters, capitalize the return from `toLocaleDateString`
      mmmm - month, full name, as in `toLocaleDateString`
      Mmmm - month, full name, capitalize the return from `toLocaleDateString`
    */
    const formats = {
        yyyy: date => date.getFullYear(),
        m: date => date.getMonth() + 1,
        mm: date => ('0' + (date.getMonth() + 1)).slice(-2),
        mmm: (date, locale) => {
            const monthName = date.toLocaleDateString(locale, {
                month: 'long'
            })
            return monthName.slice(0, 3)
        },
        Mmm: (date, locale) => {
            const monthName = date.toLocaleDateString(locale, {
                month: 'long'
            })
            return (monthName[0].toUpperCase() + monthName.slice(1).toLowerCase()).slice(0, 3)
        },
        mmmm: (date, locale) =>
            date.toLocaleDateString(locale, {
                month: 'long'
            }),
        Mmmm: (date, locale) => {
            const monthName = date.toLocaleDateString(locale, {
                month: 'long'
            })
            return monthName[0].toUpperCase() + monthName.slice(1).toLowerCase()
        }
    }
    const formatRegex = new RegExp(['yyyy', 'Mmmm', 'mmmm', 'Mmm', 'mmm', 'mm', 'm'].join('|'), 'g')

    return (locale, format, date) => {
        const componetsRegex = /(\[[^\]]+\])([^\[\]]+)(\[[^\]]+\])/
        const components = format.match(componetsRegex).slice(1)
        const separator = components[1]
        const labels = [components[0], components[2]].map(component => {
            const label = component.replace(/\[[^\]]+\]/, str => {
                return str.slice(1, -1).replace(formatRegex, match => formats[match](date, locale))
            })
            return {
                label: label,
                type: component.indexOf('yy') !== -1 ? 'year' : 'month'
            }
        })
        return {
            separator: separator,
            labels: labels
        }
    }
})()

export const clearHours = time => {
    const cloneDate = new Date(time)
    cloneDate.setHours(0, 0, 0, 0)
    return cloneDate.getTime()
}

export const isInRange = (time, a, b) => {
    if (!a || !b) {
        return false
    }
    const [start, end] = [a, b].sort()
    return time >= start && time <= end
}

export const siblingMonth = (src, diff) => {
    // lets copy it so we don't change the original
    const temp = new Date(src)
    const newMonth = temp.getMonth() + diff
    const newMonthDayCount = getDayCountOfMonth(temp.getFullYear(), newMonth)
    if (newMonthDayCount < temp.getDate()) {
        temp.setDate(newMonthDayCount)
    }
    temp.setMonth(newMonth)

    return temp
}
