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
 * @file highlight.js markdown-it 插件
 *      https://github.com/valeriangalliat/markdown-it-highlightjs/
 */

const hljs = require('highlight.js')

const maybe = f => {
    try {
        return f()
    } catch (e) {
        return false
    }
}

// Highlight with given language.
const highlight = (code, lang) =>
    // maybe(() => hljs.highlight(lang, code, true).value) || ''
    maybe(() => hljs.highlight(code, { language: lang, ignoreIllegals: true }).value) || ''

// Highlight with given language or automatically.
const highlightAuto = (code, lang) =>
    lang
        ? highlight(code, lang)
        : maybe(() => hljs.highlightAuto(code).value) || ''

// Wrap a render function to add `hljs` class to code blocks.
const wrap = render =>
    function (...args) {
        return render.apply(this, args)
            .replace('<code class="', '<code class="hljs ')
            .replace('<code>', '<code class="hljs">')
    }

const highlightjs = (md, opts) => {
    opts = Object.assign({}, highlightjs.defaults, opts)

    md.renderer.rules.table_open = () => '<table class="table">'

    md.options.highlight = opts.auto ? highlightAuto : highlight
    md.renderer.rules.fence = wrap(md.renderer.rules.fence)

    if (opts.code) {
        md.renderer.rules.code_block = wrap(md.renderer.rules.code_block)
    }
}

highlightjs.defaults = {
    auto: true,
    code: true
}

module.exports = highlightjs
