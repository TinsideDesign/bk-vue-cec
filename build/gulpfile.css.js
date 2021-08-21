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
 * @file css gulp
 *       npm run build:css
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

const gulp = require('gulp')
const postcss = require('gulp-postcss')
const rename = require('gulp-rename')
const sourceMap = require('gulp-sourcemaps')
const gzip = require('gulp-gzip')

function copyFontsImages (done) {
    gulp.src('../src/ui/fonts/**').pipe(gulp.dest('../lib/ui/fonts'))
    gulp.src('../src/ui/images/**').pipe(gulp.dest('../lib/ui/images'))
    done()
}

function compileCssSource () {
    return gulp.src(['../src/ui/*.css'])
        .pipe(postcss())
        .pipe(rename(path => {
            if (path.basename === 'bk') {
                path.basename = 'bk-magic-vue'
            }
        }))
        // .pipe(sourceMap.write('.'))
        .pipe(gulp.dest('../lib/ui'))
}

function compileCssMin () {
    return gulp.src(['../src/ui/*.css'])
        .pipe(sourceMap.init())
        .pipe(postcss({ min: true }))
        .pipe(rename(path => {
            if (path.basename === 'bk') {
                path.basename = 'bk-magic-vue'
            }
            path.extname = '.min' + path.extname
        }))
        .pipe(sourceMap.write('.'))
        .pipe(gulp.dest('../lib/ui'))
}

function gzipCssMin () {
    return gulp.src(['../lib/ui/bk-magic-vue.min.css'])
        .pipe(gzip({ gzipOptions: { level: 9 } }))
        .pipe(gulp.dest('../lib/ui'))
}

gulp.task('build-css', gulp.series(
    copyFontsImages,
    gulp.parallel(
        compileCssSource,
        compileCssMin
    ),
    gzipCssMin
))
