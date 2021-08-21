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
 * @file jest 配置文件
 *       使用 .babelrc 而不是 babel.config.js，因此这里单独建立 jest.config.js，主要是为了设置 jest.babel.js 以及 no-cache
 *       npm test
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

module.exports = {
    rootDir: '../',
    setupFiles: ['<rootDir>/__test__/setup', 'jest-canvas-mock'],
    moduleFileExtensions: [
        'js',
        'json',
        'vue'
    ],
    moduleNameMapper: {
        '^@$': '<rootDir>/src/index',
        '^@/(.*)$': '<rootDir>/src/$1',
        '^bk-magic-vue/lib/locale$': '<rootDir>/src/locale',
        '^bk-magic-vue/lib/locale/lang$': '<rootDir>/src/locale/lang',
        '^bk-magic-vue/lib/locale/lang/en-US$': '<rootDir>/src/locale/lang/en-US',
        '^bk-magic-vue/lib/locale/lang/zh-CN$': '<rootDir>/src/locale/lang/en-US'
    },
    transform: {
        '^.+\\.js$': '<rootDir>/__test__/jest.babel.js',
        '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
        '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$': 'jest-transform-stub'
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/(?!popper.js)'],
    snapshotSerializers: [
        '<rootDir>/node_modules/jest-serializer-vue'
    ],
    testMatch: [
        '**/__test__/components/**/*.test.(js)|**/__test__/*.(js)'
    ],
    collectCoverage: false,
    collectCoverageFrom: [
        'src/**/*.{js,vue}',
        '!**/node_modules/**'
    ],
    coverageReporters: [
        'html',
        // 'text',
        'text-summary'
    ]
}
