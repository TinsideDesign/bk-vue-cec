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
 * @file notify 组件单测
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import bkNotify from '@/components/Notify/notify.js'

describe('notify test', () => {
    afterEach(() => {
        const bkNotifyInstance = document.querySelector('.bk-notify')
        if (!bkNotifyInstance) {
            return
        }
        bkNotifyInstance.parentNode.removeChild(bkNotifyInstance)
        bkNotifyInstance.__vue__.$destroy()
    })
    it('notify element exist', () => {
        bkNotify({
            message: '你好，你申请的功能权限现已开通，请及时登录查询'
        })
        expect(document.querySelector('.bk-notify')).toBeTruthy()
    })
    it('props theme、icon and title', () => {
        bkNotify({
            message: '通知消息内容',
            title: '欢迎使用',
            theme: 'warning',
            icon: 'icon-test'
        })

        expect(document.querySelector('.bk-notify-warning')).toBeTruthy()
        expect(document.querySelector('.icon-test')).toBeTruthy()
        expect(document.querySelector('.bk-notify-content-title').textContent).toEqual('欢迎使用')
        expect(document.querySelector('.bk-notify-content-text').textContent.trim()).toEqual('通知消息内容')
    })
    it('props position', async done => {
        function getNotify (message, position) {
            return bkNotify({
                message,
                position
            })
        }
        const topLeft = getNotify('左上', 'top-left')
        const topCenter = getNotify('上中', 'top-center')
        const topRight = getNotify('右上', 'top-right')
        const bottomLeft = getNotify('左下', 'bottom-left')
        const bottomCenter = getNotify('下中', 'bottom-ceter')
        const bottomRight = getNotify('右下', 'bottom-right')
        await expect(topLeft.vDirection).toEqual('top')
        await expect(topLeft.hDirection).toEqual('left')
        await expect(topCenter.vDirection).toEqual('top')
        await expect(topRight.vDirection).toEqual('top')
        await expect(topRight.hDirection).toEqual('right')
        await expect(bottomLeft.vDirection).toEqual('bottom')
        await expect(bottomLeft.hDirection).toEqual('left')
        await expect(bottomCenter.vDirection).toEqual('bottom')
        await expect(bottomRight.vDirection).toEqual('bottom')
        await expect(bottomRight.hDirection).toEqual('right')
        bkNotify.batchClose()
        done()
    })
    it('props auto close', done => {
        bkNotify({
            message: '自动关闭消息通知',
            theme: 'warning',
            delay: 500
        })
        setTimeout(() => {
            expect(document.querySelector('.bk-notify')).toBeFalsy()
            done()
        }, 1000)
    })
    it('props manual close', done => {
        bkNotify({
            message: '手动关闭消息通知',
            theme: 'warning',
            delay: 0
        })
        setTimeout(() => {
            const bkNotify = document.querySelector('.bk-notify')
            bkNotify.querySelector('.icon-close').click()
            setTimeout(() => {
                expect(bkNotify).toBeTruthy()
                done()
            }, 800)
        }, 500)
    })
    it('props dismissable', done => {
        bkNotify({
            message: '不显示关闭icon',
            dismissable: false
        })
        expect(document.querySelector('.bk-notify-close')).toBeFalsy()
        done()
    })
    it('props showViewMore and limitLine', () => {
        const notify = bkNotify({
            message: '显示更多内容',
            limitLine: 4,
            showViewMore: true
        })
        const showMoreBtn = document.querySelector('.showMoreBtn')
        expect(showMoreBtn).toBeTruthy()
        expect(notify.limitLine).toEqual(4)
    })
    it('call instance close', done => {
        const notify = bkNotify({
            message: '调用关闭回调函数'
        })

        setTimeout(() => {
            notify.close()
            setTimeout(() => {
                expect(document.querySelector('.bk-notify')).toBeFalsy()
                done()
            }, 800)
        }, 800)
    })
})
