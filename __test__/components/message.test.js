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
 * @file message 组件单测
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import bkMessage from '@/components/Message/message.js'

describe('message test', () => {
    afterEach(() => {
        const bkMessageInstance = document.querySelector('.bk-message')
        if (!bkMessageInstance) {
            return
        }
        bkMessageInstance.parentNode.removeChild(bkMessageInstance)
        bkMessageInstance.__vue__.$destroy()
    })
    it('message element exist', () => {
        bkMessage({
            message: '选择填写相关信息'
        })
        expect(document.querySelector('.bk-message')).toBeTruthy()
    })
    it('props theme and icon', () => {
        bkMessage({
            message: '选择填写相关信息',
            theme: 'warning',
            icon: 'icon-test'
        })

        expect(document.querySelector('.bk-message-warning')).toBeTruthy()
        expect(document.querySelector('.icon-test')).toBeTruthy()
    })
    it('props message', () => {
        bkMessage({
            message: '选择填写相关信息',
            theme: 'warning'
        })

        expect(document.querySelector('.bk-message-content').textContent).toEqual('选择填写相关信息')
    })
    it('props auto close', done => {
        bkMessage({
            message: '选择填写相关信息',
            theme: 'warning',
            delay: 500
        })
        setTimeout(() => {
            expect(document.querySelector('.bk-message')).toBeFalsy()
            done()
        }, 1000)
    })
    it('props manual close', done => {
        bkMessage({
            message: '选择填写相关信息',
            theme: 'warning',
            delay: 0
        })
        setTimeout(() => {
            const bkMessage = document.querySelector('.bk-message')
            bkMessage.querySelector('.icon-close').click()
            setTimeout(() => {
                expect(bkMessage).toBeTruthy()
                done()
            }, 800)
        }, 500)
    })
    it('props dismissable', done => {
        bkMessage({
            message: '选择填写相关信息',
            dismissable: false
        })
        expect(document.querySelector('.bk-message-close')).toBeFalsy()
        done()
    })
    it('props limit', done => {
        bkMessage({
            message: '消息1'
        })
        setTimeout(() => {
            bkMessage({
                message: '消息2',
                limit: 1
            })
            setTimeout(() => {
                expect(document.querySelectorAll('.bk-message').length).toEqual(1)
                done()
            }, 500)
        }, 500)
    })
    it('props offsetY', done => {
        const message = bkMessage({
            message: 'offsetY test',
            offsetY: 100
        })

        expect(message.verticalOffset).toEqual(100 + message.spacing)
        done()
    })
    it('props ellipsisLine', () => {
        const message = bkMessage({
            message: '选择填写相关信息',
            ellipsisLine: 2
        })

        expect(message.ellipsisStyle['--line']).toEqual(2)
    })
    it('call instance close', done => {
        const message = bkMessage({
            message: '选择填写相关信息'
        })

        setTimeout(() => {
            message.close()
            setTimeout(() => {
                expect(document.querySelector('.bk-message')).toBeFalsy()
                done()
            }, 800)
        }, 800)
    })
})
