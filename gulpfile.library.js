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
 * @file gulp 编译 library
 *       npm run build:library
 *       npm run build:source
 *       npm run build:min
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

const gulp = require('gulp')
const { rollup } = require('rollup')
const { terser } = require('rollup-plugin-terser')
const rollupCopy = require('rollup-plugin-copy')
const rollupGzip = require('rollup-plugin-gzip').default
const plugins = require('./build/rollup-plugin')
const pkg = require('./package.json')

const external = Object.keys(Object.assign({}, pkg.peerDependencies) || {})

async function sourceLibrary () {
    const bundle = await rollup({
        external,
        input: 'src/index.js',
        plugins: plugins,
        onwarn (warning) {
            if (warning.code === 'UNUSED_EXTERNAL_IMPORT') {
                // eslint-disable-next-line no-useless-return
                return
            }
        }
    })

    bundle.write({
        file: 'dist/bk-magic-vue.js',
        format: 'umd',
        name: 'bkMagicVue',
        sourcemap: false,
        exports: 'named',
        globals: {
            vue: 'Vue'
        }
    })
}

async function minLibrary () {
    const bundle = await rollup({
        external,
        input: 'src/index.js',
        plugins: plugins.concat(
            terser(),
            rollupGzip({
                gzipOptions: {
                    level: 9
                }
            }),
            rollupCopy({
                targets: [
                    { src: 'lib/ui/fonts', dest: 'dist' },
                    { src: 'lib/ui/images', dest: 'dist' },
                    { src: 'lib/ui/bk-magic-vue.css', dest: 'dist' },
                    // // { src: 'lib/ui/bk-magic-vue.css.map', dest: 'dist' },
                    { src: 'lib/ui/bk-magic-vue.min.css', dest: 'dist' },
                    { src: 'lib/ui/bk-magic-vue.min.css.map', dest: 'dist' },
                    { src: 'lib/ui/bk-magic-vue.min.css.gz', dest: 'dist' }
                ],
                verbose: false
            })
        ),
        onwarn (warning) {
            if (warning.code === 'UNUSED_EXTERNAL_IMPORT') {
                // eslint-disable-next-line no-useless-return
                return
            }
        }
    })

    bundle.write({
        file: 'dist/bk-magic-vue.min.js',
        format: 'umd',
        name: 'bkMagicVue',
        sourcemap: true,
        exports: 'named',
        globals: {
            vue: 'Vue'
        }
    })
}

const idx = (process.env.NODE_ENV || '').split(':')[1]

if (idx === 'source') {
    gulp.task('build-library', sourceLibrary)
} else if (idx === 'min') {
    gulp.task('build-library', minLibrary)
} else {
    gulp.task('build-library', gulp.parallel(sourceLibrary, minLibrary))
}

// gulp.task('dist', gulp.series(
//     gulp.parallel(
//         gulp.series(
//             cleanDev,
//             gulp.parallel(
//                 gulp.series(
//                     sprite,
//                     compileCss
//                 ),
//                 compileJs,
//                 copyHtml
//             )
//         ),
//         cleanDist
//     ),
//     reversion,
//     replace
// ))
