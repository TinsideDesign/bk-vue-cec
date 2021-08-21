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
 * @file gulp 编译单个组件，这里不会编译样式
 *       npm run build:component
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

const { readdirSync, statSync } = require('fs')
const { extname, relative, join, basename } = require('path')
const chalk = require('chalk')
const gulp = require('gulp')
const { rollup } = require('rollup')
// const { terser } = require('rollup-plugin-terser')

const plugins = require('./build/rollup-plugin')
const pkg = require('./package.json')

const external = Object.keys(Object.assign({}, pkg.dependencies, pkg.peerDependencies) || {})

/**
 * src/components 下所有组 js 文件
 *
 * @type {Array}
 */
const componentFileList = []

/**
 * 遍历 src/components 下的 js 文件
 *
 * @param {string} filePath 遍历的目录
 */
;(function walkTpl (filePath) {
    const dirList = readdirSync(filePath)
    dirList.forEach(item => {
        if (statSync(filePath + '/' + item).isDirectory()) {
            if (extname(item) !== '.bak') {
                walkTpl(filePath + '/' + item)
            }
        } else {
            const ext = extname(item)
            if (ext === '.js' && item === 'index.js') {
                componentFileList.push({
                    name: basename(filePath),
                    path: relative('.', filePath + '/' + item)
                })
            }
        }
    })
})(join(__dirname, 'src/components'))

// componentFileList.push(
//     {
//         name: 'locale',
//         path: './src/locale/index.js'
//     },
//     {
//         name: 'localeMixin',
//         path: './src/mixins/locale.js'
//     },
//     {
//         name: 'lang',
//         path: './src/locale/lang/index.js'
//     }
// )

const utilFileList = [
    {
        name: 'tippy',
        path: './src/utils/tippy/index.js'
    },
    {
        name: 'pop-manager',
        path: './src/utils/pop-manager.js'
    },
    {
        name: 'z-index-manager',
        path: './src/utils/z-index-manager.js'
    },
    {
        name: 'z-index-manager',
        path: './src/utils/z-index-manager.js'
    },
    {
        name: 'deepmerge',
        path: './src/utils/deepmerge.js'
    },
    {
        name: 'svg-icon',
        path: './src/utils/svg-icon.js'
    },
    {
        name: 'pinyin',
        path: './src/utils/pinyin/index.js'
    }
]

const mixinsFileList = [
    {
        name: 'emitter',
        path: './src/mixins/emitter.js'
    },
    {
        name: 'scrollbar',
        path: './src/mixins/scrollbar.js'
    }
]

const localeFileList = [
    {
        name: 'index',
        path: './src/locale/index.js'
    },
    {
        name: 'index',
        path: './src/locale/lang/index.js'
    },
    {
        name: 'en-US',
        path: './src/locale/lang/en-US.js'
    },
    {
        name: 'zh-CN',
        path: './src/locale/lang/zh-CN.js'
    }
]

/**
 * src/directives 下需要打包出来的 js 文件
 *
 * @type {Array}
 */
const directiveFileList = [
    {
        name: 'clickoutside',
        path: './src/directives/clickoutside.js'
    },
    {
        name: 'tooltips',
        path: './src/directives/tooltips.js'
    },
    {
        name: 'overflow-tips',
        path: './src/directives/overflow-tips.js'
    },
    {
        name: 'transfer-dom',
        path: './src/directives/transfer-dom.js'
    }
]

async function sourceComponent () {
    external.push(
        'bk-magic-vue/lib/locale',
        'bk-magic-vue/lib/locale/lang',
        'bk-magic-vue/lib/locale/lang/zh-CN',
        'bk-magic-vue/lib/locale/lang/en-US'
    )

    const config = {
        external,
        // treeshake: false,
        plugins: plugins,
        onwarn (warning) {
            if (warning.code === 'UNUSED_EXTERNAL_IMPORT') {
                return false
            }
        }
    }

    const utilPromises = []
    const utilEntryNames = []
    utilFileList.forEach(entry => {
        if (entry.name !== 'js') {
            config.input = entry.path
            utilPromises.push(rollup(config))
            utilEntryNames.push(entry.name)
        }
    })
    try {
        const utilRet = await Promise.all(utilPromises)
        utilRet.forEach((b, index) => {
            b.write({
                file: `./lib/utils/${utilEntryNames[index]}.js`,
                format: 'umd',
                name: 'library',
                sourcemap: false,
                exports: 'named',
                globals: {
                    vue: 'Vue'
                }
            })
        })
    } catch (e) {
        console.log(chalk(`compile-component-source error in compile util: ${e}`))
    }

    const mixinsPromises = []
    const mixinsEntryNames = []
    mixinsFileList.forEach(entry => {
        if (entry.name !== 'js') {
            config.input = entry.path
            mixinsPromises.push(rollup(config))
            mixinsEntryNames.push(entry.name)
        }
    })
    try {
        const mixinsRet = await Promise.all(mixinsPromises)
        mixinsRet.forEach((b, index) => {
            b.write({
                file: `./lib/mixins/${mixinsEntryNames[index]}.js`,
                format: 'umd',
                name: 'library',
                sourcemap: false,
                exports: 'named',
                globals: {
                    vue: 'Vue'
                }
            })
        })
    } catch (e) {
        console.log(chalk(`compile-component-source error in compile mixins: ${e}`))
    }

    const localePromises = []
    const localeEntryNames = []
    localeFileList.forEach(entry => {
        if (entry.name !== 'js') {
            config.input = entry.path
            localePromises.push(rollup(config))
            localeEntryNames.push(entry.name)
        }
    })
    try {
        const localeRet = await Promise.all(localePromises)
        localeRet.forEach((b, index) => {
            const path = localeFileList[index].path
            b.write({
                file: path.indexOf('/lang/') > -1
                    ? `./lib/locale/lang/${localeEntryNames[index]}.js`
                    : `./lib/locale/${localeEntryNames[index]}.js`,
                format: 'umd',
                name: 'library',
                sourcemap: false,
                exports: 'named',
                globals: {
                    vue: 'Vue'
                }
            })
        })
    } catch (e) {
        console.log(chalk(`compile-component-source error in compile locale: ${e}`))
    }

    const directivePromises = []
    const directiveEntryNames = []
    directiveFileList.forEach(entry => {
        if (entry.name !== 'js') {
            config.input = entry.path
            directivePromises.push(rollup(config))
            directiveEntryNames.push(entry.name)
        }
    })
    try {
        const directiveRet = await Promise.all(directivePromises)
        directiveRet.forEach((b, index) => {
            b.write({
                file: `./lib/directives/${directiveEntryNames[index]}.js`,
                format: 'umd',
                name: 'library',
                sourcemap: false,
                exports: 'named',
                globals: {
                    vue: 'Vue'
                }
            })
        })
    } catch (e) {
        console.log(chalk(`compile-component-source error in compile directive: ${e}`))
    }

    const componentPromises = []
    const componentEntryNames = []
    componentFileList.forEach(entry => {
        if (entry.name !== 'js') {
            config.input = entry.path
            componentPromises.push(rollup(config))
            componentEntryNames.push(entry.name)
        }
    })
    try {
        const componentRet = await Promise.all(componentPromises)
        componentRet.forEach((b, index) => {
            b.write({
                file: `./lib/${componentEntryNames[index]}.js`,
                format: 'umd',
                name: 'library',
                sourcemap: false,
                exports: 'named',
                globals: {
                    vue: 'Vue'
                }
            })
        })
    } catch (e) {
        console.log(chalk(`compile-component-source error in compile component: ${e}`))
    }
}

// eslint-disable-next-line no-unused-vars
/* async function minComponent () {
    const config = {
        external,
        plugins: plugins.concat(
            terser()
        ),
        onwarn (warning) {
            if (warning.code === 'UNUSED_EXTERNAL_IMPORT') {
                return false
            }
        }
    }

    const componentPromises = []
    const componentEntryNames = []
    componentFileList.forEach(entry => {
        if (entry.name !== 'js') {
            config.input = entry.path
            componentPromises.push(rollup(config))
            componentEntryNames.push(entry.name)
        }
    })

    try {
        const componentRet = await Promise.all(componentPromises)
        componentRet.forEach((b, index) => {
            b.write({
                file: `./lib/${componentEntryNames[index]}.js`,
                format: 'umd',
                name: 'library',
                sourcemap: false,
                exports: 'named',
                globals: {
                    vue: 'Vue'
                }
            })
        })
    } catch (e) {
        console.log(chalk(`compile-component-source error in compile component: ${e}`))
    }

    const directivePromises = []
    const directiveEntryNames = []
    directiveFileList.forEach(entry => {
        if (entry.name !== 'js') {
            config.input = entry.path
            directivePromises.push(rollup(config))
            directiveEntryNames.push(entry.name)
        }
    })
    try {
        const directiveRet = await Promise.all(directivePromises)
        directiveRet.forEach((b, index) => {
            b.write({
                file: `./lib/directives/${directiveEntryNames[index]}.js`,
                format: 'umd',
                name: 'library',
                sourcemap: false,
                exports: 'named',
                globals: {
                    vue: 'Vue'
                }
            })
        })
    } catch (e) {
        console.log(chalk(`compile-component-source error in compile directive: ${e}`))
    }
} */

// 不打 component 的 min，按需引入时，由项目的打包处理
// gulp.task('build-component', gulp.parallel(sourceComponent, minComponent))
gulp.task('build-component', gulp.parallel(sourceComponent))
