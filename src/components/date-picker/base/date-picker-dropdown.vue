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
    <div class="bk-date-picker-dropdown" :class="className" :style="styles"><slot></slot></div>
</template>

<script>
    import Popper from 'popper.js/dist/esm/popper.js'

    import { transferIndex, transferIncrease } from '@/utils/transfer-queue'

    export default {
        name: 'DatePickerDropdown',
        props: {
            placement: {
                type: String,
                default: 'bottom-start'
            },
            className: {
                type: String
            },
            transfer: {
                type: Boolean
            }
        },
        data () {
            return {
                popper: null,
                popperStatus: false,
                tIndex: this.handleGetIndex()
            }
        },
        computed: {
            styles () {
                const style = {}

                if (this.transfer) {
                    style['z-index'] = 1060 + this.tIndex
                }

                return style
            }
        },
        created () {
            this.$on('on-update-popper', this.update)
            this.$on('on-destroy-popper', this.destroy)
        },
        beforeDestroy () {
            if (this.popper) {
                this.popper.destroy()
            }
        },
        methods: {
            update () {
                if (this.popper) {
                    this.$nextTick(() => {
                        this.popper.update()
                        this.popperStatus = true
                    })
                } else {
                    this.$nextTick(() => {
                        this.popper = new Popper(this.$parent.$refs.reference, this.$el, {
                            placement: this.placement,
                            modifiers: {
                                computeStyle: {
                                    gpuAcceleration: false
                                },
                                preventOverflow: {
                                    boundariesElement: 'window'
                                }
                            },
                            onCreate: () => {
                                this.resetTransformOrigin()
                                this.$nextTick(this.popper.update())
                            },
                            onUpdate: () => {
                                this.resetTransformOrigin()
                            }
                        })
                    })
                }
                this.tIndex = this.handleGetIndex()
            },
            destroy () {
                if (this.popper) {
                    setTimeout(() => {
                        if (this.popper && !this.popperStatus) {
                            this.popper.destroy()
                            this.popper = null
                        }
                        this.popperStatus = false
                    }, 300)
                }
            },
            resetTransformOrigin () {
                if (!this.popper) {
                    return
                }

                const xPlacement = this.popper.popper.getAttribute('x-placement')
                const placementStart = xPlacement.split('-')[0]
                const placementEnd = xPlacement.split('-')[1]
                const leftOrRight = xPlacement === 'left' || xPlacement === 'right'
                if (!leftOrRight) {
                    this.popper.popper.style.transformOrigin
                        = placementStart === 'bottom' || (placementStart !== 'top' && placementEnd === 'start')
                            ? 'center top'
                            : 'center bottom'
                }
            },
            handleGetIndex () {
                transferIncrease()
                return transferIndex
            }
        }
    }
</script>
