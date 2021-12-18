<!--
 * Tencent is pleased to support the open source community by making
 * 科技内在设计（T-inside） available.
 *
 * Copyright (C) 2021 THL A29 Limited, a Tencent company.  All rights reserved.
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

<template>
    <div style="position: absolute; top: -100000px; left: -100000px;" :data-transfer="transfer" v-transfer-dom>
        <div
            ref="dialog_wrapper"
            class="bk-dialog-wrapper"
            :class="[showMask ? '' : 'bk-dialog-no-mask', wrapShow ? '' : 'bk-dialog-hidden', extCls]"
            :style="wrapStyles"
            @mousedown.stop="wrapClickHandler">
            <transition :name="contentTransitionName" @after-leave="animationFinish">
                <!-- info-box -->
                <template v-if="isInfoBox">
                    <div class="bk-dialog bk-info-box" :style="[mainStyles]" v-show="visible">
                        <div :class="[
                            'bk-dialog-content',
                            isDraggable ? 'bk-dialog-content-drag' : '',
                            (isDraggable && dragData.dragging) ? 'bk-dialog-content-dragging' : ''
                        ]" ref="content" :style="[contentStyles]" @click="contentClickHandler">
                            <div class="bk-dialog-tool" @mousedown.left="moveStartHandler">
                                <slot name="tools"></slot>
                            </div>
                            <template v-if="type">
                                <div class="bk-dialog-type-body" :class="type === 'loading' ? 'loading' : ''">
                                    <slot name="type-body">
                                        <template v-if="type === 'loading'">
                                            <img src="../../ui/images/default_loading.png" alt="loading" class="bk-dialog-loading">
                                        </template>
                                        <template v-else>
                                            <i class="bk-icon bk-dialog-mark" :class="['bk-dialog-' + type, 'icon-' + calcIcon]"></i>
                                        </template>
                                    </slot>
                                </div>
                                <div class="bk-dialog-type-header" v-if="title || $slots['type-header']"
                                    :class="[type === 'loading' ? 'loading' : '', subTitle || $slots['type-sub-header'] ? 'has-sub-header' : '']">
                                    <div class="header">
                                        <slot name="type-header">{{title}}</slot>
                                    </div>
                                </div>
                                <div class="bk-dialog-type-sub-header" :class="type === 'loading' ? 'loading' : ''" v-if="subTitle || $slots['type-sub-header']">
                                    <div class="header">
                                        <slot name="type-sub-header">{{subTitle}}</slot>
                                    </div>
                                </div>
                                <div class="bk-dialog-footer" v-if="showFooter">
                                    <slot name="footer">
                                        <div class="footer-wrapper">
                                            <bk-button type="button" name="confirm" :loading="buttonLoading" :theme="theme" @click.native="okHandler">
                                                {{localeOkText}}
                                            </bk-button>
                                            <bk-button type="button" name="cancel" :disabled="buttonLoading" @click.native="cancelHandler">
                                                {{localeCancelText}}
                                            </bk-button>
                                        </div>
                                    </slot>
                                </div>
                            </template>
                            <template v-else>
                                <div class="bk-dialog-header" v-if="showHead">
                                    <slot name="header"><div class="bk-dialog-header-inner">{{title}}</div></slot>
                                </div>
                                <div class="bk-dialog-sub-header" :class="(subTitle || $slots['sub-header']) ? 'has-sub' : ''">
                                    <slot name="sub-header"><div class="bk-dialog-header-inner">{{subTitle}}</div></slot>
                                </div>
                                <div class="bk-dialog-footer" v-if="showFooter">
                                    <slot name="footer">
                                        <div class="footer-wrapper">
                                            <bk-button type="button" name="confirm" :loading="buttonLoading" :theme="theme" @click.native="okHandler">
                                                {{localeOkText}}
                                            </bk-button>
                                            <bk-button type="button" name="cancel" :disabled="buttonLoading" @click.native="cancelHandler">
                                                {{localeCancelText}}
                                            </bk-button>
                                        </div>
                                    </slot>
                                </div>
                            </template>
                            <i class="bk-dialog-close bk-icon icon-close" v-if="closeIcon" @click.stop="cancelHandler"></i>
                        </div>
                    </div>
                </template>
                <!-- dialog -->
                <template v-else>
                    <div :class="[
                        'bk-dialog',
                        fullscreen ? 'bk-dialog-fullscreen' : '',
                        (fullscreen && !showHead) ? 'bk-dialog-fullscreen-no-header' : '',
                        (fullscreen && !showFooter) ? 'bk-dialog-fullscreen-no-footer' : ''
                    ]" :style="[mainStyles]" v-if="shouldRender || visible" v-show="visible">
                        <div :class="[
                            'bk-dialog-content',
                            showMask ? '' : 'bk-dialog-content-no-mask',
                            isDraggable ? 'bk-dialog-content-drag' : '',
                            (isDraggable && dragData.dragging) ? 'bk-dialog-content-dragging' : ''
                        ]" ref="content" :style="[contentStyles]" @click="contentClickHandler">
                            <div class="bk-dialog-tool" @mousedown.left="moveStartHandler">
                                <slot name="tools"></slot>
                            </div>
                            <div :class="{ 'bk-dialog-header': true, 'header-on-left': headerPosition === 'left' }" v-if="showHead" :style="{ textAlign: headerPosition }">
                                <slot name="header"><div :class="{ 'bk-dialog-header-inner': true, 'header-center': headerPosition === 'center' }">{{title}}</div></slot>
                            </div>
                            <div class="bk-dialog-body"><slot></slot></div>
                            <div class="bk-dialog-footer" :style="{ textAlign: footerPosition }" v-if="showFooter">
                                <slot name="footer">
                                    <div class="footer-wrapper">
                                        <bk-button type="button" name="confirm" :loading="buttonLoading" :theme="theme" @click.native="okHandler">
                                            {{localeOkText}}
                                        </bk-button>
                                        <bk-button type="button" name="cancel" :disabled="buttonLoading" @click.native="cancelHandler">
                                            {{localeCancelText}}
                                        </bk-button>
                                    </div>
                                </slot>
                            </div>
                            <i class="bk-dialog-close bk-icon icon-close" v-if="closeIcon" @click.stop="cancelHandler"></i>
                        </div>
                    </div>
                </template>
            </transition>
        </div>
    </div>
</template>

<script>
    /**
     *  bk-dialog
     *  @module components/dialog
     *  @desc 弹窗组件
     *  @param isShow {Boolean} - 是否显示弹窗，默认为false；支持.sync修饰符
     *  @param width {Number} - 弹窗的宽度
     *  @param title {String} - 弹窗的标题
     *  @param content {String, Boolean} - 弹窗的内容
     *  @param hasHeader {Boolean} - 是否显示头部，默认为true
     *  @param draggable {Boolean} - 弹层是否可以拖拽, 默认为false
     *  @param extCls {String} - 自定义的样式，传入的CSS类会被加在组件最外层的DOM上
     *  @param padding {Number, String} - 弹窗内容区的内边距
     *  @param closeIcon {Boolean} - 是否显示关闭按钮，默认为true
     *  @param theme {String} - 组件的主题色，可选 primary warning success danger，默认为primary
     *  @param confirm {String} - 确定按钮的文字
     *  @param cancel {String} - 取消按钮的文字
     *  @param maskClose {Boolean} - 是否允许点击遮罩关闭弹窗，默认为true
     *  @param needCheck {Boolean} - 是否阻止按confirm按钮时隐藏
     *  @param hasFooter {Boolean} - 是否显示footer
     *  @param {escClose} [Boolean] 是否允许 esc 关闭，默认为 true
     *  @example
     *  <bk-dialog
            :is-show.sync="textDialog.show"
            :content="textDialog.content"
            :width="textDialog.width"
            :close-icon="textDialog.closeIcon">
            <div class="text-dialog-content" slot="content">
                <p>我是测试内容</p>
            </div>
        </bk-dialog>
    */
    import locale from 'bk-magic-vue/lib/locale'
    import bkButton from '@/components/button'
    import scrollbarMixins from '@/mixins/scrollbar'
    // import { transferIndex, transferIncrease } from '@/utils/transfer-queue'
    import { addEvent, removeEvent, findChildComponents } from '@/utils/dom'
    import popManager from '@/utils/pop-manager.js'
    import transferDom from '@/directives/transfer-dom'
    import zIndex from '@/mixins/z-index'
    import { uuid } from '@/utils/util'

    export default {
        name: 'bk-dialog',
        components: {
            bkButton
        },
        directives: {
            transferDom
        },
        mixins: [locale.mixin, scrollbarMixins, zIndex],
        props: {
            // 控制是否显示，用 value 便于 v-model 双向绑定
            value: {
                type: Boolean,
                default: false
            },

            // 对话框标题，如果使用 slot 自定义了页头，则 title 无效。info-box 会使用到
            title: {
                type: String
            },

            // 确认按钮文案
            okText: {
                type: String
            },

            // 取消按钮文案
            cancelText: {
                type: String
            },

            // 按钮的 theme
            theme: {
                type: String,
                default: 'primary',
                validator (value) {
                    if (['primary', 'warning', 'success', 'danger'].indexOf(value) < 0) {
                        console.error(`theme property is not valid: '${value}'`)
                        return false
                    }
                    return true
                }
            },

            // 遮罩的 transitionName
            // maskTransitionName: {
            //     type: String,
            //     default: 'fade'
            // },

            // // 内容的 transitionName
            // contentTransitionName: {
            //     type: String,
            //     default: 'ease'
            // },

            // 设置调整浮层位置，该属性设置的是 .bk-dialog
            position: {
                type: Object
            },
            beforeClose: {
                type: Function,
                default: () => true
            },
            // 外部设置的 class name
            extCls: {
                type: String,
                default: ''
            },

            // 对话框宽度，当屏幕尺寸小于 768px 时，宽度会变为自动 auto。当其值不大于 100 时以百分比显示，大于 100 时为像素
            width: {
                type: [Number, String],
                default: 400
            },

            // 是否显示遮罩
            showMask: {
                type: Boolean,
                default: true
            },

            // 是否允许点击遮罩关闭弹框
            maskClose: {
                type: Boolean,
                default: true
            },

            // 是否显示右上角的关闭按钮，关闭后 Esc 按键也将关闭
            closeIcon: {
                type: Boolean,
                default: true
            },

            // 是否允许 esc 按钮关闭
            escClose: {
                type: Boolean,
                default: true
            },

            // 是否全屏
            fullscreen: {
                type: Boolean,
                default: false
            },

            // header 按钮的位置，左中右
            headerPosition: {
                type: String,
                default: 'center',
                validator (value) {
                    if (['left', 'center'].indexOf(value) < 0) {
                        console.error(`headerPosition property is not valid: '${value}'`)
                        return false
                    }
                    return true
                }
            },

            // 显示 footer
            showFooter: {
                type: Boolean,
                default: true
            },

            // footer 按钮的位置，左中右
            footerPosition: {
                type: String,
                default: 'right',
                validator (value) {
                    if (['left', 'center', 'right'].indexOf(value) < 0) {
                        console.error(`footerPosition property is not valid: '${value}'`)
                        return false
                    }
                    return true
                }
            },

            // 是否可拖拽，如果 fullscreen 为 true，那么 draggable 配置无效
            draggable: {
                type: Boolean,
                default: true
            },

            // 页面是否可以滚动
            scrollable: {
                type: Boolean,
                default: false
            },

            // 点击确定按钮时，确定按钮是否显示 loading 状态，开启则需手动设置 value 来关闭对话框
            loading: {
                type: Boolean,
                default: false
            },

            // 点击确定按钮时，确定按钮是否显示 loading 状态，异步 confirmFn 未返回结果时自动开启 loading
            confirmLoading: {
                type: Boolean,
                default: false
            },

            // 弹框的 z-index
            zIndex: {
                type: Number,
                default: 1000
            },

            // 用于 info-box
            confirmFn: {
                type: Function,
                default: null
            },

            // 用于 info-box
            onClose: {
                type: Function,
                default () {}
            },

            // 用于 info-box
            type: {
                type: String,
                default: '',
                validator (value) {
                    if (['', 'success', 'warning', 'danger', 'loading'].indexOf(value) < 0) {
                        console.error(`type property is not valid: '${value}'`)
                        return false
                    }
                    return true
                }
            },

            // 用于 info-box
            subTitle: {
                type: String
            },

            transfer: {
                type: Boolean,
                default: true
            },

            autoClose: {
                type: Boolean,
                default: true
            },

            renderDirective: {
                type: String,
                default: 'show',
                validator (value) {
                    if (['show', 'if'].indexOf(value) < 0) {
                        console.error(`type render-directive is not valid: '${value}'`)
                        return false
                    }
                    return true
                }
            },

            /**
             * 是否允许多个弹框同时存在
             *  */
            multiInstance: {
                type: Boolean,
                default: true
            },

            /**
             * 遮罩ZIndex是否忽略已存在的遮罩
            */
            ignoreExistMask: {
                type: Boolean,
                default: true
            }
        },
        data () {
            return {
                // 当前 dialog 的 index，便于点击 esc 关闭的时候关闭正确的 dialog
                visible: this.value,
                // 遮罩的 transitionName
                maskTransitionName: 'fade',
                // 内容的 transitionName
                contentTransitionName: 'ease',
                wrapShow: false,
                showHead: true,
                buttonLoading: false,
                dragData: {
                    x: null,
                    y: null,
                    dragX: null,
                    dragY: null,
                    dragging: false
                },
                dialogIndex: 0,
                popUid: '',
                uuid: uuid()
            }
        },
        computed: {
            calcIcon () {
                let _icon = ''

                if (this.icon) {
                    return this.icon
                }

                switch (this.type) {
                    case 'success':
                        _icon = 'check-1'
                        break
                    case 'error':
                        _icon = 'close'
                        break
                    case 'warning':
                        _icon = 'exclamation'
                        break
                }

                return _icon
            },
            wrapStyles () {
                return {
                    zIndex: this.transfer ? this.dialogIndex : this.dialogIndex + 1
                }
            },
            mainStyles () {
                const ret = {}

                const width = parseInt(this.width, 10)

                const styleWidth = this.dragData.x !== null
                    ? { top: 0 }
                    : { width: width <= 100 ? `${width}%` : `${width}px` }

                Object.assign(ret, styleWidth)

                if (this.position) {
                    const left = this.position.left
                    if (left !== undefined && left !== null) {
                        ret.left = `${left}px`
                    }

                    const top = this.position.top
                    if (top !== undefined && top !== null) {
                        ret.top = `${top}px`
                    }
                }

                return ret
            },
            contentStyles () {
                const ret = {}

                if (this.isDraggable) {
                    if (this.dragData.x !== null) {
                        let left = 0
                        if (this.position) {
                            if (this.position.left !== undefined && this.position.left !== null) {
                                left = this.position.left
                            }
                        }
                        ret.left = `${this.dragData.x - left}px`
                    }
                    if (this.dragData.y !== null) {
                        let top = 0
                        if (this.position) {
                            if (this.position.top !== undefined && this.position.top !== null) {
                                top = this.position.top
                            }
                        }
                        ret.top = `${this.dragData.y - top}px`
                    }

                    const width = parseInt(this.width, 10)
                    const styleWidth = {
                        width: width <= 100 ? `${width}%` : `${width}px`
                    }

                    Object.assign(ret, styleWidth)
                }

                return ret
            },
            localeOkText () {
                if (this.okText === undefined) {
                    return this.t('bk.dialog.ok')
                }
                return this.okText
            },
            localeCancelText () {
                if (this.cancelText === undefined) {
                    return this.t('bk.dialog.cancel')
                }
                return this.cancelText
            },
            isDraggable () {
                if (!this.fullscreen) {
                    return this.draggable
                }
                return false
            },
            isInfoBox () {
                return this.$root.name === 'bk-info-box'
            },
            shouldRender () {
                return this.renderDirective === 'show'
            }
        },
        watch: {
            value (val) {
                this.visible = val
            },
            visible (val) {
                if (val === false) {
                    this.buttonLoading = false
                    this.timer = setTimeout(() => {
                        this.wrapShow = false
                        if (this.isDraggable) {
                            this.dragData = Object.assign({}, {
                                x: null,
                                y: null,
                                dragX: null,
                                dragY: null,
                                dragging: false
                            })
                        }
                        // 遮罩消失后执行 addScrollEffect
                        this.removeScrollEffect()
                    }, 300)
                    this.showMask && popManager.hide(this.popUid)
                } else {
                    // 遮罩出现前执行 addScrollEffect
                    this.addScrollEffect()
                    this.$nextTick(() => {
                        if (this.timer) {
                            clearTimeout(this.timer)
                        }

                        this.wrapShow = true

                        if (!this.fullscreen) {
                            setTimeout(() => {
                                const contentNode = this.$refs.content
                                const height = parseInt(window.getComputedStyle(contentNode).height, 10)
                                if (height >= window.innerHeight) {
                                    contentNode.style.marginBottom = '50px'
                                }
                            }, 0)
                        }

                        this.dialogIndex = this.getLocalZIndex()
                        // 简单 hack，之后重构
                        if (this.showMask) {
                            const options = {
                                tplAction: 'keepAll',
                                zIndex: this.dialogIndex,
                                ignoreExistMask: this.ignoreExistMask
                            }
                            this.popUid = popManager.show(`bk-dialog-${this.uuid}`, this.$el, options)
                        }
                    })
                }
                this.$emit('value-change', val)
                typeof this.stateChangeFn === 'function' && this.stateChangeFn(val)
            },
            loading (val) {
                if (!val) {
                    this.buttonLoading = false
                }
            },
            scrollable (val) {
                // if (!val) {
                //     this.addScrollEffect()
                // } else {
                //     this.removeScrollEffect()
                // }
            },
            title (val) {
                if (this.$slots.header === undefined) {
                    this.showHead = !!val
                }
            }
        },
        mounted () {
            if (this.visible) {
                this.wrapShow = true
            }

            let showHead = true

            if (this.$slots.header === undefined && !this.title) {
                showHead = false
            }

            this.showHead = showHead

            if (this.escClose) {
                addEvent(document, 'keydown', this.escCloseHandler)
            }
        },
        beforeDestroy () {
            if (this.escClose) {
                removeEvent(document, 'keydown', this.escCloseHandler)
            }
            this.removeScrollEffect()
            this.visible && this.showMask && popManager.hide(this.popUid)
        },
        methods: {
            /**
             * 获取当前 dialog 的 index，便于点击 esc 关闭的时候关闭正确的 dialog
             *
             * @return {number} index 索引
             */
            getDialogIndex () {
                return this.getLocalZIndex()
            },

            /**
             * mask 遮罩点击事件
             */
            maskClickHandler () {
                if (this.maskClose && this.showMask && this.closeIcon) {
                    this.close()
                }
            },

            /**
             * 弹框 wrapper .bk-dialog-wrapper 的点击事件，这个层与 .bk-dialog-mask 同级，因此点击它就相当于点击了 .bk-dialog-mask
             *
             * @param {Object} e 事件对象
             */
            wrapClickHandler (e) {
                const classList = e.target.classList
                if (classList.contains('bk-dialog-wrapper')) {
                    this.maskClickHandler()
                }
            },

            /**
             * 弹框内容区 .bk-dialog-content 的点击事件
             *
             * @param {Object} e 事件对象
             */
            contentClickHandler (e) {
                if (this.isDraggable) {
                    // this.dialogIndex = this.getDialogIndex()
                }
            },

            /**
             * escClose handler
             *
             * @param {Object} e 事件对象
             */
            escCloseHandler (e) {
                if (this.visible && this.closeIcon) {
                    if (e.keyCode === 27) {
                        let first = null
                        if (this.isInfoBox) {
                            first = this.$root
                        } else {
                            const dialogs = findChildComponents(this.$root, 'bk-dialog').filter(
                                item => item.$data.visible && item.$props.closeIcon
                            )

                            first = dialogs.sort((a, b) => {
                                return a.$data.dialogIndex < b.$data.dialogIndex ? 1 : -1
                            })[0]
                        }

                        this.$nextTick(() => {
                            first && first.close()
                        })
                    }
                }
            },

            /**
             * 拖动开始事件回调
             *
             * @param {Object} e 事件对象
             */
            moveStartHandler (e) {
                if (!this.isDraggable) {
                    return false
                }

                const content = this.$refs.content
                const rect = content.getBoundingClientRect()

                this.dragData.x = rect.x
                this.dragData.y = rect.y

                this.dragData.contentRect = rect
                this.dragData.dialogRect = this.$el.getBoundingClientRect()

                const distance = { x: e.clientX, y: e.clientY }

                this.dragData.dragX = distance.x
                this.dragData.dragY = distance.y

                this.dragData.dragging = true

                addEvent(window, 'mousemove', this.moveHandler)
                addEvent(window, 'mouseup', this.moveEndHandler)
            },

            /**
             * 拖动中事件回调
             *
             * @param {Object} e 事件对象
             */
            moveHandler (e) {
                const dragData = this.dragData

                if (!dragData.dragging) {
                    return false
                }

                const distance = { x: e.clientX, y: e.clientY }

                const diffDistance = {
                    x: distance.x - dragData.dragX,
                    y: distance.y - dragData.dragY
                }

                if (dragData.x <= 0 && diffDistance.x < 0) {
                    dragData.x = 0
                } else if (dragData.x + dragData.contentRect.width >= window.innerWidth && diffDistance.x > 0) {
                    dragData.x = window.innerWidth - dragData.contentRect.width
                } else {
                    dragData.x += diffDistance.x
                }
                dragData.dragX = distance.x

                if (dragData.y <= 0 && diffDistance.y < 0) {
                    dragData.y = 0
                } else if (dragData.y + dragData.contentRect.height >= window.innerHeight && diffDistance.y > 0) {
                    dragData.y = window.innerHeight - dragData.contentRect.height
                } else {
                    dragData.y += diffDistance.y
                }
                dragData.dragY = distance.y

                this.dragData = { ...dragData }
            },

            /**
             * 拖动结束回调函数
             */
            moveEndHandler () {
                this.dragData.dragging = false
                removeEvent(window, 'mousemove', this.moveHandler)
                removeEvent(window, 'mouseup', this.moveEndHandler)
            },

            /**
             *  关闭弹框
             */
            async close () {
                let shouldClose = true
                if (typeof this.beforeClose === 'function') {
                    shouldClose = await this.beforeClose()
                }
                if (shouldClose) {
                    this.visible = false
                    typeof this.onClose === 'function' && this.onClose()
                    this.$emit('input', false)
                    this.$emit('cancel')
                    typeof this.cancelFn === 'function' && this.cancelFn(this)
                }
            },

            /**
             * .bk-dialog after-leave 回调，弹框消失的动画结束后触发
             */
            animationFinish () {
                this.$emit('after-leave')
                typeof this.afterLeaveFn === 'function' && this.afterLeaveFn(this)
            },

            /**
             * 取消按钮点击事件
             *
             * @param {Objecy} e 事件对象
             */
            cancelHandler (e) {
                this.close()
            },

            /**
             * 确定按钮点击事件
             *
             * @param {Objecy} e 事件对象
             */
            okHandler (e) {
                // 防止在loading状态中多次触发
                if (this.loading) return false

                // 先执行confirm，用户可以在confirm里设计loading状态等处理
                this.$emit('confirm')

                // 在下个tick微任务去做后续处理
                this.$nextTick(async () => {
                    if (this.loading) {
                        this.buttonLoading = true
                    } else {
                        if (typeof this.confirmFn === 'function') { // 用于 info-box
                            if (this.confirmLoading) {
                                try {
                                    this.buttonLoading = true
                                    await this.confirmFn(this)
                                } catch (e) {
                                    console.warn(e)
                                } finally {
                                    this.buttonLoading = false
                                }
                            } else {
                                this.confirmFn(this)
                            }
                        } else {
                            if (this.autoClose) {
                                this.visible = false
                                this.$emit('input', false)
                            }
                        }
                    }
                })
            }
        }
    }
</script>
<style>
    @import '../../ui/dialog.css';
</style>
