<!--
 * Tencent is pleased to support the open source community by making
 * 科技内在设计（T-inside） available.
 *
 * Copyright (C) 2021 TID Limited, a DAO.  All rights reserved.
 *
 * 科技内在设计（T-inside） is licensed under the MIT License.
 *
 * License for 科技内在设计（T-inside）:
 *
 *
 * Terms of the MIT License:
 * ---------------------------------------------------
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
 * to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of
 * the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
 * THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
-->

<script>
    export default {
        name: 'message-center',
        props: {
            messageList: {
                type: Array,
                default () {
                    return [
                        {
                            message: '你的“20181212112308”单据已通过',
                            date: '刚刚'
                        },
                        {
                            message: '你的“20181212112308”单据被驳回',
                            date: '45分钟前'
                        },
                        {
                            message: '你的“20181212112308”单据部分被驳回',
                            date: '3天前'
                        },
                        {
                            message: '你的“20181212112308”单据部分被驳回',
                            date: '12月14日'
                        },
                        {
                            message: 'jinnyyang 提醒了你',
                            date: '12月14日'
                        },
                        {
                            message: 'edwinwu 重新申请了“201812121108”内关于“TInside作业平台”“TInside作业平台”',
                            date: '12月14日'
                        },
                        {
                            message: '你的“20181212112308”单据部分被驳回',
                            date: '12月14日'
                        },
                        {
                            message: 'jinnyyang 提醒了你',
                            date: '12月14日'
                        },
                        {
                            message: 'edwinwu 重新申请了“201812121108”内关于“TInside作业平台”的权限申请。',
                            date: '12月14日'
                        }
                    ]
                }
            }
        },
        render (h) {
            const { messageList = [] } = this
            const listItem = this._l(messageList, (item, index) => {
                return (
                    <li class={{ 'message-item': true }}>
                        <span class={{ 'message-item-desc': true }}>{item.message}</span>
                        <span class={{ 'message-item-date': true }}>{item.date}</span>
                    </li>
                )
            })
            return (
                <div class={{ 'message-center': true }}>
                    <h5 class={{ 'message-center-header': true }}>消息中心</h5>
                    <ul class={{ 'message-center-list': true }}>
                        {listItem}
                    </ul>
                    <div class={{ 'message-center-footer': true }}>
                        进入消息中心
                    </div>
                </div>
            )
        }
    }
</script>
<style lang="postcss">
.message-center {
    display: flex;
    flex-direction: column;
    width: 360px;
    background-color: #FFFFFF;
    border: 1px solid #E2E2E2;
    border-radius: 2px;
    box-shadow: 0px 3px 4px 0px rgba(64,112,203,0.06);
    color: #979BA5;
    font-size: 12px;
    &-header {
        flex: 0 0 48px;
        display: flex;
        align-items: center;
        color: #313238;
        font-size: 14px;
        padding: 0 20px;
        margin: 0;
        border-bottom: 1px solid #F0F1F5;
    }
    &-list {
        flex: 1;
        max-height: 450px;
        overflow: auto;
        margin: 0;
        display: flex;
        flex-direction: column;
        padding: 0;
        .message-item {
            display: flex;
            width: 100%;
            padding: 0 20px;
            &-desc {
                padding: 13px 0;
                line-height: 16px;
                min-height: 42px;
                flex: 1;
                flex-wrap: wrap
            }
            &-date {
                padding: 13px 0;
                margin-left: 16px;
            }
            &:hover {
                cursor: pointer;
                background: #F0F1F5;
            }
        }
    }
    &-footer {
        flex: 0 0 42px;
        border-top: 1px solid #F0F1F5;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #006DFF;
    }
}
</style>
