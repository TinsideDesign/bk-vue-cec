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
 * @file vue-markdown-loader conf
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

/* eslint-disable max-len */

const markdownItContainer = require('markdown-it-container')
const MarkdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const markdownItAttrs = require('markdown-it-attrs')
const markdownItTOC = require('markdown-it-table-of-contents')
const markdownItReplaceLink = require('markdown-it-replace-link')
const { slugify } = require('transliteration')

const { strip } = require('./strip-tags')
const { convert } = require('./util')
const markdownItReplace = require('./markdown-it-replace')
const markdownItHighlightjs = require('./md-highlight')

const replaceLink = (link, env) => {
    if (link === 'ICON_URL') {
        return '#/icon'
    }
    return link
}

const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    replaceLink
})

const position = {
    false: 'push',
    true: 'unshift'
}

const createTips = cls => {
    return [markdownItContainer, cls, {
        render: (tokens, idx) => {
            const token = tokens[idx]
            const title = token.info.trim().slice(cls.length).trim() || ''
            if (token.nesting === 1) {
                if (title) {
                    return `<div class="${cls} tips-block with-title"><p class="tips-block-title">${title}</p>\n`
                }
                return `<div class="${cls} tips-block">\n`
            }
            return '</div>\n'
        }
    }]
}

module.exports = {
    raw: true,
    preventExtract: true,
    replaceLink,
    use: [
        [markdownItReplace, {
            replaceStr: 'bk-vue-cec'
        }],
        [markdownItReplaceLink],
        [markdownItHighlightjs],
        [markdownItAttrs],
        [markdownItTOC, {
            includeLevel: [3],
            slugify: slugify,
            format: str => {
                const title = str.replace(/\s*\{.*\}/, '') // {page=#/button}
                    .replace(/\s*\[.*\]\(.*\)/, '') // [example](#/i18n/buildin-example)
                    // .replace(/\s*\*.*\*/, '') // *2019.08.15*
                return `<span class="toc-link-content" v-bk-tooltips.left="'${title}'" title="${title}">${title}</span>`
            },
            transformLink: link => {
                return link.replace(/-page.*/, '').replace('#', '')
                // .replace(/\s*-\d{4}\.\d{1,2}\.\d{1,2}/, '') // 2.1.1-2019.08.15
            }
        }],
        [markdownItAnchor, {
            level: 3,
            slugify: slugify,
            permalink: true,
            permalinkBefore: true,
            permalinkClass: 'header-anchor',
            permalinkSymbol: '<svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>',
            permalinkHref: (slug, state) => {
                // slug = slug.replace(/\s*-\d{4}\.\d{1,2}\.\d{1,2}/, '') // 2.1.1-2019.08.15
                return `?anchor=${slug}`
            },
            renderPermalink: (slug, opts, state, idx) => {
                const space = () => Object.assign(new state.Token('text', '', 0), { content: ' ' })
                const attrs = state.tokens[idx].attrs

                const href = attrs[0][0] === 'page'
                    ? attrs[0][1] + opts.permalinkHref(slug, state)
                    : opts.permalinkHref(slug, state)

                const linkTokens = [
                    Object.assign(new state.Token('link_open', 'a', 1), {
                        attrs: [
                            ['class', opts.permalinkClass],
                            ['href', href],
                            ['aria-hidden', 'true'],
                            ['anchor-link', slug]
                        ]
                    }),
                    Object.assign(new state.Token('html_block', '', 0), { content: opts.permalinkSymbol }),
                    new state.Token('link_close', 'a', -1)
                ]

                linkTokens[position[!opts.permalinkBefore]](space())
                state.tokens[idx + 1].children[position[opts.permalinkBefore]](...linkTokens)
            }
        }],
        createTips('tip'),
        createTips('info'),
        createTips('warning'),
        createTips('danger'),
        [
            markdownItContainer,
            'demo',
            {
                validate: params => {
                    return params.trim().match(/^demo\s*(.*)$/)
                },
                render: (tokens, idx) => {
                    const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)

                    if (tokens[idx].nesting === 1) {
                        const description = (m && m.length > 1) ? m[1] : ''
                        const descriptionHTML = description ? md.use(markdownItReplaceLink).render(description) : ''

                        const content = tokens[idx + 1].content

                        const html = convert(
                            strip(content, ['script', 'style'])
                        ).replace(/(<[^>]*)=""(?=.*>)/g, '$1')

                        return ``
                            + `<code-block class="demo-box">`
                            + `<div class="source" slot="source">${html}</div>`
                            + descriptionHTML
                            + `<div class="highlight" slot="highlight">`
                    }
                    return '</div></code-block>\n'
                }
            }
        ],
        [markdownItContainer, 'exampleLink', {
            validate: params => {
                return params.trim().match(/^exampleLink\s*(.*)$/)
            },
            render: (tokens, idx) => {
                const m = tokens[idx].info.trim().match(/^exampleLink\s*(.*)$/)

                if (tokens[idx].nesting === 1) {
                    const description = (m && m.length > 1) ? m[1] : ''
                    const descriptionHTML = description ? md.render(description) : ''
                    return `<div class="example-link">${descriptionHTML}</div>`
                }
                return ''
            }
        }],
        [markdownItContainer, 'changelogVer', {
            validate: params => {
                return params.trim().match(/^changelogVer\s*(.*)$/)
            },
            render: (tokens, idx) => {
                const m = tokens[idx].info.trim().match(/^changelogVer\s*(.*)$/)

                if (tokens[idx].nesting === 1) {
                    const description = (m && m.length > 1) ? m[1] : ''
                    const descriptionHTML = description ? md.renderInline(description) : ''
                    const idAttr = /v=([^)]*)/.test(description)
                        ? ` id="${RegExp.$1}"`
                        : ''
                    return `<h3${idAttr}>${descriptionHTML}</h3>`
                }
                return ''
            }
        }]
    ]
}
