<!--
 * Tencent is pleased to support the open source community by making
 * 科技内在设计（T-inside） available.
 *
 * Copyright (C) 2021 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * 科技内在设计（T-inside） is licensed under the MIT License.
 *
 * License for 科技内在设计（T-inside）:
 *
 *
 * Terms of the MIT License:
 * ---------------------------------------------------
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
 * to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of
 * the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
 * THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
-->

<template>
    <div class="bk-diff" :class="classes" ref="html">
        <div v-highlight v-html="html" />
    </div>
</template>

<script>
    import { createPatch } from 'diff'
    import { Diff2Html } from 'diff2html'
    import hljs from 'highlight.js/lib/core'

    // rollup v1 版本中支持 dynamic import 来做 code split，但是有几个问题，所以这里不使用 dynamic import
    // 1. 必须设置 output.dir，output.file 和 output.dir 只能二选一，output.dir 不设置的话，其他 chunk 文件不会写到文件里。
    // 2. dynamic import 不支持通配符 https://github.com/rollup/rollup/issues/2097
    // 3. UMD and IIFE output formats are not supported for code-splitting builds https://github.com/rollup/rollup/issues/2072
    import css from 'highlight.js/lib/languages/css'
    import java from 'highlight.js/lib/languages/java'
    import javascript from 'highlight.js/lib/languages/javascript'
    import json from 'highlight.js/lib/languages/json'
    import scss from 'highlight.js/lib/languages/scss'
    import less from 'highlight.js/lib/languages/less'
    import stylus from 'highlight.js/lib/languages/stylus'
    import shell from 'highlight.js/lib/languages/shell'
    import bash from 'highlight.js/lib/languages/bash'
    import cpp from 'highlight.js/lib/languages/cpp'
    import go from 'highlight.js/lib/languages/go'
    import xml from 'highlight.js/lib/languages/xml'
    import python from 'highlight.js/lib/languages/python'
    import typescript from 'highlight.js/lib/languages/typescript'
    import sql from 'highlight.js/lib/languages/sql'
    import ruby from 'highlight.js/lib/languages/ruby'
    import vim from 'highlight.js/lib/languages/vim'
    import php from 'highlight.js/lib/languages/php'
    import perl from 'highlight.js/lib/languages/perl'
    import powershell from 'highlight.js/lib/languages/powershell'
    import makefile from 'highlight.js/lib/languages/makefile'

    [
        { lang: 'java', mod: java },
        { lang: 'javascript', mod: javascript },
        { lang: 'json', mod: json },
        { lang: 'css', mod: css },
        { lang: 'scss', mod: scss },
        { lang: 'less', mod: less },
        { lang: 'stylus', mod: stylus },
        { lang: 'shell', mod: shell },
        { lang: 'bash', mod: bash },
        { lang: 'cpp', mod: cpp },
        { lang: 'go', mod: go },
        { lang: 'xml', mod: xml },
        { lang: 'python', mod: python },
        { lang: 'typescript', mod: typescript },
        { lang: 'sql', mod: sql },
        { lang: 'ruby', mod: ruby },
        { lang: 'vim', mod: vim },
        { lang: 'php', mod: php },
        { lang: 'perl', mod: perl },
        { lang: 'powershell', mod: powershell },
        { lang: 'makefile', mod: makefile }
    ].forEach(item => {
        hljs.registerLanguage(item.lang, item.mod)
    })

    export default {
        name: 'bk-diff',
        directives: {
            highlight: el => {
                const blocks = el.querySelectorAll('code')
                blocks.forEach(block => {
                    hljs.highlightElement(block)
                })
            }
        },
        props: {
            oldContent: {
                type: String,
                default: ''
            },
            newContent: {
                type: String,
                default: ''
            },
            context: {
                type: Number,
                default: Infinity
            },
            format: {
                type: String,
                default: 'line-by-line'
            },
            theme: {
                type: String,
                default: 'light',
                validator: value => {
                    return ['light', 'dark'].includes(value)
                }
            },
            language: {
                type: String,
                required: true
            },
            // 外部设置的 class name
            extCls: {
                type: String,
                default: ''
            }
        },
        computed: {
            html () {
                function htmlReplace (html) {
                    return html.replace(
                        /<span class="d2h-code-line-ctn">(.+?)<\/span>/g,
                        '<span class="d2h-code-line-ctn"><code>$1</code></span>'
                    )
                }
                const oldContent = this.oldContent + '\n// --end--'
                const newContent = this.newContent + `\n// -- end--`

                const args = ['', oldContent, newContent, '', '', {
                    context: this.context
                }
                ]
                const dd = createPatch(...args)
                const outStr = Diff2Html.getJsonFromDiff(dd, {
                    inputFormat: 'diff',
                    outputFormat: this.format,
                    showFiles: false,
                    matching: 'lines'
                })
                const html = Diff2Html.getPrettyHtml(outStr, {
                    inputFormat: 'json',
                    outputFormat: this.format,
                    showFiles: false,
                    matching: 'lines'
                })
                return htmlReplace(html)
            },
            classes () {
                return [this.theme, this.extCls, `format-${this.format}`]
            }
        },
        watch: {
            language: {
                handler (language) {
                    hljs.configure({
                        languages: [language]
                    })
                },
                immediate: true
            }
        }
    }
</script>

<style>
    @import '../../ui/diff.css';
</style>
