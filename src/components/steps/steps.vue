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
    <div :class="[wrapperCls, extCls]">
        <div class="bk-step" v-for="(step, index) in defaultSteps" :key="index"
            :class="{
                'bk-step-no-content': !step.title,
                done: isDone(index),
                current: isCurrent(index),
                [`bk-step-${currentStatus}`]: currentStatus && isCurrent(index)
            }">
            <span class="bk-step-indicator"
                :class="'bk-step-' + (iconType(step) ? 'icon' : 'number')"
                :style="{ cursor: controllable ? 'pointer' : '' }"
                @click="jumpTo(index + 1)">
                <!-- loading状态图标 -->
                <i class="bk-icon icon-circle-4-1 icon-loading" v-if="(isCurrent(index) && currentStatus === 'loading') || isLoadingStatus(step)"></i>

                <!-- 配置的图标 -->
                <i class="bk-icon" v-else-if="iconType(step)" :class="'icon-' + isIcon(step)"></i>

                <!-- 非icon时的完成与错误状态使用图标代替数字显示 -->
                <i class="bk-icon icon-close icon-error" v-else-if="(isCurrent(index) && currentStatus === 'error') || isErrorStatus(step)"></i>
                <i class="bk-icon icon-check-1 icon-finish" v-else-if="isDone(index)"></i>

                <span class="number" v-else>
                    {{isIcon(step)}}
                </span>
            </span>
            <div class="bk-step-content" v-if="step.title">
                <div class="bk-step-title" :style="{ cursor: controllable ? 'pointer' : '' }" @click="jumpTo(index + 1)">
                    {{step.title}}
                </div>
                <div class="bk-step-description" v-if="step.description" :title="step.description">
                    {{step.description}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    /**
     *  bk-steps
     *  @module components/steps
     *  @desc 步骤条组件
     *  @param steps {Array} - 组件步骤内容，数组中的元素可以是对象，可以是数字，可以是字符串，也可以是三者混合元素是对象时，有两个可选的key：title和icon；当元素是数字或字符串时，组件会将其解析成对象形式下的icon的值；素是字符串时，使用蓝鲸icon
     *  @param curStep {Number} - 当前步骤的索引值，从1开始；支持.sync修饰符
     *  @param controllable {Boolean} - 步骤可否被控制前后跳转，默认为false
     *  @param theme {String} - 组件的主题色
     *  @example
     *  <bk-steps
            :cur-step.sync="curStep"
            :steps="step"
            :theme="theme"
            controllable>
        </bk-steps>
     */
    import locale from 'bk-magic-vue/lib/locale'

    export default {
        name: 'bk-steps',
        mixins: [locale.mixin],
        props: {
            steps: {
                type: Array,
                default: () => []
            },
            curStep: {
                type: Number,
                default: 1
            },
            controllable: {
                type: Boolean,
                default: false
            },
            direction: {
                type: String,
                default: 'horizontal',
                validator (val) {
                    return ['horizontal', 'vertical'].includes(val)
                }
            },
            status: {
                type: String,
                default: '',
                validator (val) {
                    return ['', 'error', 'loading'].includes(val)
                }
            },
            lineType: {
                type: String,
                default: 'dashed',
                validator (val) {
                    return ['dashed', 'solid'].includes(val)
                }
            },
            size: {
                type: String,
                default: '',
                validator (val) {
                    return ['', 'small'].includes(val)
                }
            },
            theme: {
                type: String,
                default: 'primary'
            },
            // 外部设置的 class name
            extCls: {
                type: String,
                default: ''
            },
            beforeChange: {
                type: Function,
                default: null
            }
        },
        data () {
            return {
                defaultSteps: [],
                currentStatus: this.status
            }
        },
        computed: {
            wrapperCls () {
                const wrapperCls = [
                    'bk-steps',
                    `bk-steps-${this.direction}`,
                    `bk-steps-${this.lineType}`,
                    `bk-steps-${this.theme}`
                ]

                if (this.size) {
                    wrapperCls.push(`bk-steps-${this.size}`)
                }

                return wrapperCls
            }
        },
        watch: {
            status (val) {
                this.currentStatus = val
            },

            steps: {
                handler (val) {
                    this.updateSteps(val)
                },
                deep: true
            }
        },
        created () {
            this.defaultSteps.splice(0, this.defaultSteps.length, ...[
                {
                    title: this.t('bk.steps.step1'),
                    icon: 1
                },
                {
                    title: this.t('bk.steps.step2'),
                    icon: 2
                },
                {
                    title: this.t('bk.steps.step3'),
                    icon: 3
                }
            ])
            if (this.steps && this.steps.length) {
                this.updateSteps(this.steps)
            }
        },
        methods: {
            updateSteps (steps) {
                const defaultSteps = []
                steps.forEach(step => {
                    if (typeof step === 'string') {
                        defaultSteps.push(step)
                    } else {
                        defaultSteps.push({
                            title: step.title,
                            icon: step.icon,
                            description: step.description,
                            status: step.status
                        })
                    }
                })
                this.defaultSteps.splice(0, this.defaultSteps.length, ...defaultSteps)
            },
            iconType (step) {
                const icon = step.icon

                if (icon) {
                    return typeof icon === 'string'
                }
                return typeof step === 'string'
            },
            isIcon (step) {
                return step.icon ? step.icon : step
            },
            isCurrent (index) {
                return this.curStep === (index + 1)
            },
            isDone (index) {
                return this.curStep > (index + 1) || this.defaultSteps[index].status === 'done'
            },
            isLoadingStatus (step) {
                return step.status === 'loading'
            },
            isErrorStatus (step) {
                return step.status === 'error'
            },
            async jumpTo (index) {
                try {
                    if (this.controllable && index !== this.curStep) {
                        if (typeof this.beforeChange === 'function') {
                            await new Promise(async (resolve, reject) => {
                                const confirmed = await this.beforeChange(index)
                                confirmed ? resolve(confirmed) : reject(confirmed)
                            })
                        }
                        this.$emit('update:curStep', index)
                        this.$emit('step-changed', index)
                    }
                } catch (e) {
                    console.warn(e)
                }
            }
        }
    }
</script>
<style>
    @import '../../ui/steps.css';
</style>
