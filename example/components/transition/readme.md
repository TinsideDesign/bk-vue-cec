<script>
    import { bkButton } from '@'
    import { bkTransition} from '@'

    export default {
        components: {
            bkButton,
            bkTransition
        },
        data () {
            return {
                fadeShow: true,
                zoomShow: true,
                moveShow: true,
                collapse: true
            }
        },
        methods: {
            clickHandle (animateShow) {
                this[animateShow] = !this[animateShow]
            }
        }
    }
</script>
<style>
    .card-layout {
        margin-top: 20px;
        margin-bottom: -20px;
    }
    .card {
        display: inline-flex;
        margin-right:20px;
        width: 200px;
        height: 100px;
        background: #006DFF;
        color: #fff;
        text-align: center;
        border-radius: 2px;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
    }
</style>

[[toc]]

## Transition 过渡动画

T-inside提供了一些通用动画，可配合`transition`直接使用

### fade 淡入淡出 {page=#/transition}

:::demo 提供了`fade-in`系列和`slide-in`系列的六种淡入、淡出动画

```html
<template>
    <bk-button @click="clickHandle('fadeShow')">Click to animate</bk-button>
    <div class="card-layout">
        <transition name="bk-fade-in-linear">
            <div v-show="fadeShow" class="card fade-animate-card">.fade-linear</div>
        </transition>
        <transition name="bk-fade-in-ease">
            <div v-show="fadeShow" class="card fade-animate-card">.fade-ease</div>
        </transition>
        <transition name="bk-slide-fade-left">
            <div v-show="fadeShow" class="card fade-animate-card">.slide-fade-left</div>
        </transition>
        <transition name="bk-slide-fade-right">
            <div v-show="fadeShow" class="card fade-animate-card">.slide-fade-right</div>
        </transition>
        <transition name="bk-slide-fade-up">
            <div v-show="fadeShow" class="card fade-animate-card">.slide-fade-up</div>
        </transition>
        <transition name="bk-slide-fade-down">
            <div v-show="fadeShow" class="card fade-animate-card">.slide-fade-down</div>
        </transition>
    </div>
</template>
<script>
    import { bkButton } from '{{BASE_LIB_NAME}}'
    import { bkTransition} from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton,
            bkTransition
        },
        data () {
            return {
                fadeShow: true
            }
        },
        methods: {
            clickHandle (animateShow) {
                this[animateShow] = !this[animateShow]
            }
        }
    }
</script>
<style>
    .card-layout {
        margin-top: 20px;
        margin-bottom: -20px;
    }
    .card {
        display: inline-flex;
        margin-right:20px;
        width: 200px;
        height: 100px;
        background: #006DFF;
        color: #fff;
        text-align: center;
        border-radius: 2px;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
    }
</style>
```
:::

### zoom 缩放 {page=#/transition}

:::demo 使用`zoom`实现缩放的出、入动画

```html
<template>
    <bk-button @click="clickHandle('zoomShow')">Click to animate</bk-button>
    <div class="card-layout">
        <transition name="bk-zoom">
            <div v-show="zoomShow" class="card zoom">.zoom</div>
        </transition>
    </div>
</template>
<script>
    import { bkButton } from '{{BASE_LIB_NAME}}'
    import { bkTransition} from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton,
            bkTransition
        },
        data () {
            return {
                zoomShow: true
            }
        },
        methods: {
            clickHandle (animateShow) {
                this[animateShow] = !this[animateShow]
            }
        }
    }
</script>
<style>
    .card-layout {
        margin-top: 20px;
        margin-bottom: -20px;
    }
    .card {
        display: inline-flex;
        margin-right:20px;
        width: 200px;
        height: 100px;
        background: #006DFF;
        color: #fff;
        text-align: center;
        border-radius: 2px;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
    }
</style>
```
:::

### 移入移出 {page=#/transition}

:::demo 与`slide-fade-in`不同，移入移出`move-in`动画将移动该元素100%宽度/高度，可用于侧栏、顶栏的弹出

```html
<template>
    <bk-button @click="clickHandle('moveShow')">Click to animate</bk-button>
    <div class="card-layout">
        <transition name="bk-move-in-left">
            <div v-show="moveShow" class="card move-in-left">.move-in-left</div>
        </transition>
        <transition name="bk-move-in-right">
            <div v-show="moveShow" class="card move-in-right">.move-in-right</div>
        </transition>
        <transition name="bk-move-in-up">
            <div v-show="moveShow" class="card move-in-right">.move-in-up</div>
        </transition>
        <transition name="bk-move-in-down">
            <div v-show="moveShow" class="card move-in-right">.move-in-down</div>
        </transition>
    </div>
</template>
<script>
    import { bkButton } from '{{BASE_LIB_NAME}}'
    import { bkTransition} from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton,
            bkTransition
        },
        data () {
            return {
                moveShow: true
            }
        },
        methods: {
            clickHandle (animateShow) {
                this[animateShow] = !this[animateShow]
            }
        }
    }
</script>
<style>
    .card-layout {
        margin-top: 20px;
        margin-bottom: -20px;
    }
    .card {
        display: inline-flex;
        margin-right:20px;
        width: 200px;
        height: 100px;
        background: #006DFF;
        color: #fff;
        text-align: center;
        border-radius: 2px;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
    }
</style>
```
:::

### 过渡配置与面板展开 {page=#/transition}

:::demo 使用`<bk-transition></bk-transition>`，可以配置动画效果和时间；特别地，`name`传入"collapse"可以使用面板展开效果，该过渡不建议自定义配置。

```html
<template>
    <bk-button @click="clickHandle('collapse')">Click to animate</bk-button>
    <div class="card-layout" style="height: 100px">
        <bk-transition name="collapse" >
            <div v-show="collapse">
                <div class="card">
                    collapse面板展开
                </div>
            </div>
        </bk-transition>
    </div>
    <div class="card-layout" style="height: 100px; margin-bottom: 20px;">
        <bk-transition name="bk-fade-in-linear" duration-time="3s">
            <div v-show="collapse" style="display: inline-block; margin-top: 20px;">
                <div class="card">
                    'bk-fade-in-linear' + 'linear'
                </div>
            </div>
        </bk-transition>
        <bk-transition name="bk-fade-in-linear" duration-time="3s" duration-type="ease-in-out">
            <div v-show="collapse" style="display: inline-block; margin-top: 20px;">
                <div class="card">
                    'bk-fade-in-linear' + 'ease-in-out'
                </div>
            </div>
        </bk-transition>
    </div>
</template>
<script>
    import { bkButton } from '{{BASE_LIB_NAME}}'
    import { bkTransition} from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkButton,
            bkTransition
        },
        data () {
            return {
                collapse: true
            }
        },
        methods: {
            clickHandle (animateShow) {
                this[animateShow] = !this[animateShow]
            }
        }
    }
</script>
<style>
    .card-layout {
        margin-top: 20px;
        margin-bottom: -20px;
    }
    .card {
        display: inline-flex;
        margin-right:20px;
        width: 200px;
        height: 100px;
        background: #006DFF;
        color: #fff;
        text-align: center;
        border-radius: 2px;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
    }
</style>
```
:::


### 属性 {page=#/badge}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| name | 动画效果插槽 | String | `collapse` `bk-fade-in-linear` `bk-fade-in-ease` `bk-slide-fade-left`等，详见demo的各配置，可在css中自定义transition效果| —— |
| duration-time | 动画持续时间 | String | '.3s' | —— |
| duration-type | 动画时间函数类型 | String | 'linear' | 参考CSS属性`transition-timing-function` |
