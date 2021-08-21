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
 * @file upload 组件单测
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

/* global beforeEach, afterEach */
import Upload from '@/components/Upload'
import { mountComponent, createTestComp } from '../helpers'
import { mount } from '@vue/test-utils'

const events = {}
const headers = {}
let formdata
const createMockXHR = (responseJSON) => {
    const mockXHR = {
        open: jest.fn(),
        abort: jest.fn(),
        send: jest.fn(data => {
            formdata = data
        }),
        setRequestHeader: jest.fn((header, value) => {
            headers[header] = value
        }),
        readyState: 4,
        status: 200,
        upload: {
            events: {},
            addEventListener: (name, fn) => {
                // console.log(events, 'triggerEvent')
                events[name] = fn
            },
            triggerEvent: (name, e) => {
                events[name](e)
            }
        },
        responseText: JSON.stringify(
            responseJSON || {}
        )
    }
    return mockXHR
}

describe('Upload', () => {
    const oldXMLHttpRequest = window.XMLHttpRequest
    let mockXHR = null

    beforeEach(() => {
        formdata = null
        mockXHR = createMockXHR({
            code: 0
        })
        window.XMLHttpRequest = jest.fn(() => mockXHR)
    })

    afterEach(() => {
        window.XMLHttpRequest = oldXMLHttpRequest
    })

    it('render the correct markup and content', () => {
        const uploadWrapper = mountComponent(Upload, {
            propsData: {
                url: '/upload'
            }
        })

        expect(uploadWrapper.name()).toBe('bk-upload')
        expect(uploadWrapper.classes()).toContain('bk-upload')
        expect(uploadWrapper.classes('dragable')).toBe(true)
        expect(uploadWrapper.find('.drop-upload').exists()).toBe(true)
        expect(uploadWrapper.find('input[type="file"]').exists()).toBe(true)

        // 切换theme
        uploadWrapper.setProps({
            theme: 'button'
        })
        expect(uploadWrapper.props('theme')).toBe('button')
        expect(uploadWrapper.classes('button')).toBe(true)
    })

    it('test file size', () => {
        let i = 0
        let fileContent = ''
        while (i < 10000) {
            fileContent += 'test'
            i++
        }
        const file = new Blob([JSON.stringify({ hello: fileContent }, null, 4)], {
            type: 'application/json'
        })
        file.name = 'test.json'

        const uploadWrapper = mountComponent(Upload, {
            propsData: {
                url: '/upload',
                size: 0.01
            }
        })

        const files = [file]
        const uploader = uploadWrapper.vm
        uploader.selectFile({ target: { files } })

        expect(uploadWrapper.find('.error-msg').exists()).toBe(true)
    })

    it('test only accept image', () => {
        const file = new Blob([JSON.stringify({ hello: 'world' }, null, 4)], {
            type: 'application/json'
        })
        file.name = 'test.json'

        const uploadWrapper = mountComponent(Upload, {
            propsData: {
                url: '/upload',
                accept: 'image/png,image/jpeg,image/jpg'
            }
        })

        const files = [file]
        const uploader = uploadWrapper.vm
        uploader.selectFile({ target: { files } })

        expect(uploadWrapper.find('.error-msg').exists()).toBe(true)
    })

    it('test custom formdata/header', () => {
        const file = new Blob([JSON.stringify({ hello: 'world' }, null, 4)], {
            type: 'application/json'
        })
        file.name = 'test.json'
        const files = [file]

        const uploadWrapper = mountComponent(Upload, {
            propsData: {
                url: '/upload',
                header: { name: 'foo', value: 'test' },
                formDataAttributes: [{ name: 'foo', value: 'test' }]
            }
        })

        const uploader = uploadWrapper.vm
        uploader.selectFile({ target: { files } })

        expect(formdata.get('foo')).toBe('test')
        expect(headers).toEqual({ foo: 'test' })
    })

    it('test upload event', (done) => {
        const file = new Blob([JSON.stringify({ hello: 'world' }, null, 4)], {
            type: 'application/json'
        })
        file.name = 'success.json'
        const files = [file]

        const uploadWrapper = mount(createTestComp(`
            <bk-upload
                ref="upload"
                @on-success="testSuccess"
                @on-progress="testProgress"
                @on-done="testDone"
                @on-error="testErr"
                :url="'/upload'"
            ></bk-upload>
        `, {
            components: {
                bkUpload: Upload
            },
            methods: {
                testSuccess (file, fileList) {
                    expect(file.name).toBe('success.json')
                },
                testProgress (e, file, fileList) {
                    expect(file.progress).toBe('2%')
                },
                testDone (fileList) {
                    expect(fileList.length).toBe(1)
                },
                testErr (file, fileList) {
                    expect(file.errorMsg).toBe('upload failed')
                    done()
                }
            }
        }))

        const uploader = uploadWrapper.find({ ref: 'upload' }).vm
        uploader.selectFile({ target: { files } })

        mockXHR.onreadystatechange()

        mockXHR.status = 400
        setTimeout(() => {
            mockXHR.onreadystatechange()
        }, 100)

        mockXHR.upload.triggerEvent('progress', { lengthComputable: true, loaded: 20000, total: 1000000 })
    })

    it('test ui event', () => {
        const file = new Blob([JSON.stringify({ hello: 'world' }, null, 4)], {
            type: 'application/json'
        })
        file.name = 'test.json'
        const files = [file]

        const uploadWrapper = mountComponent(Upload, {
            propsData: {
                url: '/upload'
            }
        })

        const uploader = uploadWrapper.vm
        uploader.selectFile({ target: { files } })

        uploadWrapper.find({ ref: 'uploadel' }).trigger('dragenter')
        expect(uploadWrapper.vm.isdrag).toBe(true)

        expect(uploadWrapper.find('.all-file').exists()).toBe(true)
        uploadWrapper.find('.close-upload').trigger('click')
        expect(uploadWrapper.find('.all-file').exists()).toBe(false)
        expect(uploader.fileList.length).toBe(0)
    })
})
