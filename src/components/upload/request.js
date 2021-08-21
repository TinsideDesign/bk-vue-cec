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

import { t } from 'bk-magic-vue/lib/locale'
const parseResponse = (response) => {
    if (!response) {
        return response || {}
    }
    try {
        return JSON.parse(response)
    } catch (error) {
        return response || {}
    }
}

export default function upload (options) {
    const xhr = new XMLHttpRequest()
    options.fileObj.xhr = xhr

    const formData = new FormData()
    options.data.forEach(item => {
        formData.append(item.name, item.value)
    })
    formData.append(options.fileName, options.fileObj.origin)

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            const reponseText = parseResponse(xhr.responseText || xhr.response)
            if (xhr.status < 200 || xhr.status >= 300) {
                options.fileObj.progress = 100 + '%'
                options.fileObj.errorMsg = reponseText.message || t('bk.uploadFile.uploadFailed')
                options.onError(options.fileObj, options.fileList, xhr.response)
            } else {
                options.onSuccess(reponseText, options.fileObj)
            }
            options.onDone(options.fileObj)
        }
    }

    xhr.upload.addEventListener('progress', options.onProgress, false)
    xhr.withCredentials = options.withCredentials
    xhr.open(options.method, options.url, true)
    if (options.header) {
        if (Array.isArray(options.header)) {
            options.header.forEach(head => {
                const headerKey = head.name
                const headerVal = head.value
                xhr.setRequestHeader(headerKey, headerVal)
            })
        } else {
            const headerKey = options.header.name
            const headerVal = options.header.value
            xhr.setRequestHeader(headerKey, headerVal)
        }
    }
    xhr.send(formData)

    return {
        abort () {
            xhr.abort()
        }
    }
}
