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

import DICT from './dict'

const FIRST_PINYIN_UNIHAN = '\u963F'
const LAST_PINYIN_UNIHAN = '\u9FFF'

const LATIN = 1
const PINYIN = 2
const UNKNOWN = 3

let supported = null
let COLLATOR

function patchDict (patchers) {
    if (!patchers) return
    if (typeof patchers === 'function') {
        patchers = [patchers]
    }
    if (patchers.forEach) {
        patchers.forEach(p => {
            typeof p === 'function' && p(DICT)
        })
    }
}

function isSupported (force) {
    if (!force && supported !== null) {
        return supported
    }
    if (typeof Intl === 'object' && Intl.Collator) {
        COLLATOR = new Intl.Collator(['zh-Hans-CN', 'zh-CN'])
        supported = Intl.Collator.supportedLocalesOf(['zh-CN']).length === 1
    } else {
        supported = false
    }
    return supported
}

function genToken (ch) {
    // Access DICT here, give the chance to patch DICT.
    const UNIHANS = DICT.UNIHANS
    const PINYINS = DICT.PINYINS
    const EXCEPTIONS = DICT.EXCEPTIONS
    const token = {
        source: ch
    }

    // First check EXCEPTIONS map, then search with UNIHANS table.
    if (ch in EXCEPTIONS) {
        token.type = PINYIN
        token.target = EXCEPTIONS[ch]
        return token
    }

    let offset = -1
    let cmp
    if (ch.charCodeAt(0) < 256) {
        token.type = LATIN
        token.target = ch
        return token
    } else {
        cmp = COLLATOR.compare(ch, FIRST_PINYIN_UNIHAN)
        if (cmp < 0) {
            token.type = UNKNOWN
            token.target = ch
            return token
        } else if (cmp === 0) {
            token.type = PINYIN
            offset = 0
        } else {
            cmp = COLLATOR.compare(ch, LAST_PINYIN_UNIHAN)
            if (cmp > 0) {
                token.type = UNKNOWN
                token.target = ch
                return token
            } else if (cmp === 0) {
                token.type = PINYIN
                offset = UNIHANS.length - 1
            }
        }
    }

    token.type = PINYIN
    if (offset < 0) {
        let begin = 0
        let end = UNIHANS.length - 1
        while (begin <= end) {
            offset = ~~((begin + end) / 2)
            const unihan = UNIHANS[offset]
            cmp = COLLATOR.compare(ch, unihan)

            // Catch it.
            if (cmp === 0) {
                break
            } else if (cmp > 0) {
                // Search after offset.
                begin = offset + 1
            } else {
                // Search before the offset.
                end = offset - 1
            }
        }
    }

    if (cmp < 0) {
        offset--
    }

    token.target = PINYINS[offset]
    if (!token.target) {
        token.type = UNKNOWN
        token.target = token.source
    }
    return token
}

function parse (str) {
    if (typeof str !== 'string' || !isSupported()) {
        return str
    }
    return str.split('').map(v => genToken(v))
}

export default {
    isSupported,
    parse,
    patchDict,
    genToken, // inner usage
    convertToPinyin (str, lowerCase, separator) {
        return parse(str).map(v => {
            if (lowerCase && v.type === PINYIN) {
                return v.target.toLowerCase()
            }
            return v.target
        }).join(separator || '')
    }
}
