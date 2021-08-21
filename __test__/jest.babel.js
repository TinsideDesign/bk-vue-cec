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
 * @file jest babel 配置文件
 *       直接使用 babel-jest 的话，会去找 babel.config.js 而不是 .babelrc，因此这里单独对 babel-jest 做 babel 的配置
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

const presets = [
    [
        '@babel/preset-env',
        {
            'modules': 'commonjs',
            'corejs': 2,
            'spec': true,
            'targets': {
                'browsers': ['> 1%', 'last 2 versions', 'not ie <= 8'],
                'node': 'current'
            },
            'useBuiltIns': 'usage',
            'debug': false
        }
    ],
    ['@vue/babel-preset-jsx']
]

const plugins = [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-transform-async-to-generator',
    '@babel/plugin-transform-object-assign',
    '@babel/plugin-syntax-dynamic-import',
    'date-fns',
    '@vue/babel-plugin-transform-vue-jsx',
    '@babel/plugin-syntax-jsx'
]

const comments = true

module.exports = require('babel-jest').createTransformer({
    presets,
    plugins,
    comments
})
