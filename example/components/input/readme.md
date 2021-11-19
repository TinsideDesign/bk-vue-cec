<script>
    import { bkInput, bkDropdownMenu, bkButton } from '@'

    export default {
        components: {
            bkInput,
            bkDropdownMenu,
            bkButton
        },
        data () {
            return {
                value: '',
                date: '2018-10-01',
                searchText: '测试',
                isDropdownShow: false,
                env: 1,
                numberInputValue: '',
                precision: 3,
                nativeAttributes: {
                    autocomplete: 'off',
                    autofocus: true
                },

                nativeAttributes1: {
                    autocomplete: 'on',
                    autofocus: true
                }
            }
        },
        methods: {
            handlerChange (value, event) {
                alert(value)
            },
            dropdownShow () {
                this.isDropdownShow = true
            },
            dropdownHide () {
                this.isDropdownShow = false
            },
            triggerHandler (env) {
                this.$refs.dropdown.hide()
                this.env = env
            },
            handlerIconClick (value) {
                console.log(value)
                alert('click')
            }
        }
    }
</script>

<style lang="postcss">
    .input-demo {
        width: 500px;
    }
    .input-pass-demo {
        width: 500px;
        .control-icon {
            cursor: pointer;
        }
    }
</style>

[[toc]]

## Input 输入框

表单组件，文本输入框，在原生控件基础上进行了功能扩展

### 基础输入框 {page=#/input}

::: demo 使用 `bk-input` 标签配置输入框组件
``` html
<template>
    <div class="input-demo">
        <bk-input :clearable="true" v-model="value"></bk-input>
    </div>
</template>
<script>
    import { bkInput } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkInput
        },
        data () {
            return {
                value: ''
            }
        }
    }
</script>
<style lang="postcss">
    .input-demo {
        width: 500px;
    }
</style>
```
:::

### hover 时才显示 clear 按钮{page=#/input}

::: demo 配置`show-clear-only-hover`为true时，清除按钮在hover时才会显示
``` html
<template>
    <div class="input-demo">
        <bk-input :clearable="true" v-model="value" :show-clear-only-hover="true"></bk-input>
    </div>
</template>
<script>
    import { bkInput } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkInput
        },
        data () {
            return {
                value: ''
            }
        }
    }
</script>
<style lang="postcss">
    .input-demo {
        width: 500px;
    }
</style>
```
:::

### 14px 字号 {page=#/input}

::: demo 通过配置 `font-size` 属性为 `medium` 来设置文本框的字号为 `14px`

``` html
<template>
    <div class="input-demo">
        <bk-input :clearable="true" v-model="value" :font-size="'medium'"></bk-input>
    </div>
</template>
<script>
    import { bkInput } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkInput
        },
        data () {
            return {
                value: ''
            }
        }
    }
</script>
<style lang="postcss">
    .input-demo {
        width: 500px;
    }
</style>
```
:::

### 数字输入框 {page=#/input}

::: demo 通过配置 `type` 属性为 `number` 来设置数字类型输入，通过设置 `max`，`min` 设置最大最小值, 设置 `precision` 保留小数位(初始值会被四舍五入，例如：numberInputValue=4.5，precision=0时，值会被四舍五入为5)。**数字输入框时，`clearable` 配置不生效。**

``` html
<template>
    <div class="input-demo">
        <bk-input type="number" :max="1000" :min="-1000" :precision="precision" v-model="numberInputValue"></bk-input>
    </div>
</template>
<script>
    import { bkInput } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkInput
        },
        data () {
            return {
                numberInputValue: '',
                precision: 3
            }
        }
    }
</script>
<style lang="postcss">
    .input-demo {
        width: 500px;
    }
</style>
```
:::

### 多行文本输入框 {page=#/input}

::: demo 通过配置 `type` 属性为 `textarea` 来显示多行文本输入框

``` html
<template>
    <div class="input-demo">
        <bk-input
            placeholder="请输入20个字符以内"
            :type="'textarea'"
            :rows="3"
            :maxlength="255"
            v-model="value">
        </bk-input>
    </div>
</template>
<script>
    import { bkInput } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkInput
        },
        data () {
            return {
                value: ''
            }
        }
    }
</script>
<style lang="postcss">
    .input-demo {
        width: 500px;
    }
</style>
```
:::

### 带清空操作输入框 {page=#/input}

::: demo 通过配置 `clearable` 属性为 `true` 来启用有文本时允许清空操作

``` html
<template>
    <div class="input-demo">
        <bk-input
            :maxlength="255"
            :placeholder="'搜索'"
            :clearable="true"
            :show-word-limit="true"
            :right-icon="'bk-icon icon-search'"
            v-model="value">
        </bk-input>
    </div>
</template>
<script>
    import { bkInput } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkInput
        },
        data () {
            return {
                value: ''
            }
        }
    }
</script>
<style lang="postcss">
    .input-demo {
        width: 500px;
    }
</style>
```
:::

### 密码框 {page=#/input}

::: demo 通过配置 `type` 属性为 `password` 来设置密码框；通过配置 `password-icon` 属性来设置切换显示密码的 `icon`

``` html
<template>
    <p class="mb5">默认的切换显示密码 icon：</p>
    <div class="input-pass-demo">
        <bk-input :type="'password'" v-model="value"></bk-input>
    </div>

    <p class="mb5">自定义的切换显示密码 icon：</p>
    <div class="input-pass-demo">
        <bk-input :type="'password'" :clearable="true" v-model="value" :password-icon="['icon-back', 'icon-next']"></bk-input>
    </div>
</template>
<script>
    import { bkInput } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkInput
        },
        data () {
            return {
                value: ''
            }
        }
    }
</script>
<style lang="postcss">
    .input-pass-demo {
        width: 500px;
        .control-icon {
            cursor: pointer;
        }
    }
</style>
```
:::

### 带 icon 输入框 {page=#/input}

::: demo 通过配置 `left-icon`, `right-icon`，来让输入框在左边、右边显示图标，通过配置`left-icon-click`、`right-icon-click`来监听icon点击
``` html
<template>
    <div class="input-demo">
        <bk-input
            :placeholder="'搜索'"
            :left-icon="'bk-icon icon-search'"
            v-model="value"
            @left-icon-click="handlerIconClick">
        </bk-input>
        <bk-input
            clearable
            style="margin-top: 10px;"
            :placeholder="'搜索'"
            :right-icon="'bk-icon icon-search'"
            v-model="value"
            @right-icon-click="handlerIconClick">
        </bk-input>
    </div>
</template>
<script>
    import { bkInput } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkInput
        },
        data () {
            return {
                value: ''
            }
        },
        methods: {
            handlerIconClick (value) {
                console.log(value)
                alert('click')
            }
        }
    }
</script>
<style lang="postcss">
    .input-demo {
        width: 500px;
    }
</style>
```
:::

### 组合型输入框 {page=#/input}

::: demo 通过配置 `slot=prepend`, `slot=append`，来让组合输入框

``` html
<template>
    <div class="input-demo">
        <bk-input v-model="value">
            <template slot="prepend">
                <div class="group-text">http://</div>
            </template>
        </bk-input>
        <br />
        <bk-input v-model="value" :right-icon="'bk-icon icon-search'" :clearable="true">
            <template slot="prepend">
                <div class="group-text">http://</div>
            </template>
            <template slot="append">
                <div class="group-text">.com</div>
            </template>
        </bk-input>
        <br/>
        <bk-input v-model="value" :right-icon="'bk-icon icon-search'" :clearable="true" :font-size="'medium'">
            <bk-dropdown-menu class="group-text" @show="dropdownShow" @hide="dropdownHide" ref="dropdown" slot="prepend" :font-size="'medium'">
                <bk-button type="primary" slot="dropdown-trigger">
                    <span v-if="env === 1">测试环境</span>
                    <span v-if="env === 2">预发布环境</span>
                    <span v-if="env === 3">正式环境</span>
                    <i :class="['bk-icon icon-angle-down',{'icon-flip': isDropdownShow}]"></i>
                </bk-button>
                <ul class="bk-dropdown-list" slot="dropdown-content">
                    <li><a href="javascript:;" @click="triggerHandler(1)">测试环境</a></li>
                    <li><a href="javascript:;" @click="triggerHandler(2)">预发布环境</a></li>
                    <li><a href="javascript:;" @click="triggerHandler(3)">正式环境</a></li>
                </ul>
            </bk-dropdown-menu>
            <template slot="append">
                <div class="group-text">.com</div>
            </template>
        </bk-input>
    </div>
</template>
<script>
    import { bkInput, bkDropdownMenu, bkButton } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkInput,
            bkDropdownMenu,
            bkButton
        },
        data () {
            return {
                date: '2018-10-01',
                searchText: '测试',
                isDropdownShow: false,
                env: 1
            }
        },
        methods: {
            dropdownShow () {
                this.isDropdownShow = true
            },
            dropdownHide () {
                this.isDropdownShow = false
            },
            triggerHandler (env) {
                this.$refs.dropdown.hide()
                this.env = env
            }
        }
    }
</script>
<style lang="postcss">
    .input-demo {
        width: 500px;
    }
</style>
```
:::

### 带状态输入框 {page=#/input}

::: demo 通过配置 `disabled`, `readonly`，来让输入框禁用、只读
``` html
<template>
    <div class="input-demo">
        <bk-input :placeholder="'日期'" :disabled="true" v-model="date"></bk-input>
        <bk-input style="margin-top: 10px;" :placeholder="'搜索'" :readonly="true" v-model="searchText"></bk-input>
    </div>
</template>
<script>
    import { bkInput } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkInput
        },
        data () {
            return {
                date: '2018-10-01',
                searchText: '测试'
            }
        }
    }
</script>
<style lang="postcss">
    .input-demo {
        width: 500px;
    }
</style>
```
:::

### 尺寸 {page=#/input}

::: demo 通过配置 `size` 属性指定输入框的尺寸，支持 `large`、`small`，不设置即为默认尺寸
``` html
<template>
    <div class="input-demo">
        <bk-input size="large" v-model="value"></bk-input>
        <bk-input style="margin-top: 10px;" v-model="value"></bk-input>
        <bk-input style="margin-top: 10px;" size="small" v-model="value"></bk-input>

        <bk-input style="margin-top: 10px;" size="small" clearable v-model="value">
            <template slot="prepend">
                <div class="group-text">http://</div>
            </template>
        </bk-input>
        <bk-input style="margin-top: 10px;" size="large" v-model="value" :right-icon="'bk-icon icon-search'" :clearable="true">
            <template slot="prepend">
                <div class="group-text">http://</div>
            </template>
            <template slot="append">
                <div class="group-text">.com</div>
            </template>
        </bk-input>
        <bk-input style="margin-top: 10px;" size="large" v-model="value" :right-icon="'bk-icon icon-search'" :clearable="true" :font-size="'medium'">
            <bk-dropdown-menu class="group-text" @show="dropdownShow" @hide="dropdownHide" ref="dropdown" slot="prepend" :font-size="'medium'">
                <bk-button type="primary" slot="dropdown-trigger">
                    <span v-if="env === 1">测试环境</span>
                    <span v-if="env === 2">预发布环境</span>
                    <span v-if="env === 3">正式环境</span>
                    <i :class="['bk-icon icon-angle-down',{'icon-flip': isDropdownShow}]"></i>
                </bk-button>
                <ul class="bk-dropdown-list" slot="dropdown-content">
                    <li><a href="javascript:;" @click="triggerHandler(1)">测试环境</a></li>
                    <li><a href="javascript:;" @click="triggerHandler(2)">预发布环境</a></li>
                    <li><a href="javascript:;" @click="triggerHandler(3)">正式环境</a></li>
                </ul>
            </bk-dropdown-menu>
            <template slot="append">
                <div class="group-text">.com</div>
            </template>
        </bk-input>

        <bk-input style="margin-top: 10px;" type="number" size="small" v-model="numberInputValue"></bk-input>
        <bk-input style="margin-top: 10px;" type="number" size="large" v-model="numberInputValue"></bk-input>
    </div>
</template>
<script>
    import { bkInput } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkInput
        },
        data () {
            return {
                numberInputValue: '',
                value: ''
            }
        }
    }
</script>
<style lang="postcss">
    .input-demo {
        width: 500px;
    }
</style>
```
:::

### 事件回调 {page=#/input}

::: demo 支持 `keyup` `enter` `keypress` `keydown` `change` `focus` `blur` 回调事件
``` html
<template>
    <div class="input-demo">
        <bk-input v-model="value" @change="handlerChange">
        </bk-input>
    </div>
</template>
<script>
    import { bkInput } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkInput
        },
        data () {
            return {
                value: ''
            }
        },
        methods: {
            handlerChange (value, event) {
                alert(value)
            }
        }
    }
</script>
<style lang="postcss">
    .input-demo {
        width: 500px;
    }
</style>
```
:::

### HTML 原生属性透传 {page=#/input}

::: demo 支持 HTML input 标签所有原生属性，设置 password 禁用自动填充功能
``` html
<template>
    <div class="input-demo">
     <form>
        <bk-input v-model="value" :type="'password'" :native-attributes="nativeAttributes">
        </bk-input>

        <bk-input v-model="value" style="margin-top: 10px;" :type="'password'" :native-attributes="nativeAttributes1">
        </bk-input>
    </div>
    </form>
</template>
<script>
    import { bkInput } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkInput
        },
        data () {
            return {
                value: '',
                nativeAttributes: {
                    autocomplete: 'off',
                    autofocus: true
                },

                nativeAttributes1: {
                    autocomplete: 'on',
                    autofocus: true
                }
            }
        },
        methods: {
            handlerChange (value, event) {
                alert(value)
            }
        }
    }
</script>
<style lang="postcss">
    .input-demo {
        width: 500px;
    }
</style>
```
:::

### 简约风格输入框 {page=#/input}

::: demo 通过属性`behavior`配置简约风格
``` html
<template>
    <div class="input-demo">
        <bk-input behavior='simplicity' :clearable="true" v-model="value"></bk-input>
    </div>
</template>
<script>
    import { bkInput } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkInput
        },
        data () {
            return {
                value: ''
            }
        }
    }
</script>
<style lang="postcss">
    .input-demo {
        width: 500px;
    }
</style>
```
:::

### 属性 {page=#/input}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| type | 输入框类型 | String | `text`, `textarea`, `password`, `number`, `email`, `url`, `date` | `text` |
| input-style | 样式 | Object | -- | {} |
| placeholder | 空白提示 | String | ——  | —— |
| disabled | 是否禁用 | Boolean | true / false | false |
| readonly | 是否只读 | Boolean | true / false | false |
| clearable | 是否可清除。**数字输入框时，此配置不生效** | Boolean | true / false | false |
| maxlength | 最大输入长度 | Number | —— | —— |
| minlength | 最小输入长度 | Number | —— | —— |
| size | 输入框尺寸，只在 type!="textarea" 时有效，字号可通过 font-size 属性覆盖 | String | `large`（38px 14号字）<br>`small`（26px 12字号） | —— |
| name | 名称 | String | —— | —— |
| left-icon | 左边显示icon | String | —— | —— |
| right-icon | 右边显示icon | String | —— | —— |
| precision | 保留小数位 | Number | [0-16] | undefined |
| show-controls | type为number时，是否显示右侧控制箭头 | Boolean | Boolean | true |
| font-size | 设置输入框内容字体大小 | String | `normal`（12px），`medium`（14px），`large`（16px） | normal |
| password-icon | 设置密码框切换显示密码的 icon | Array | —— | `['icon-eye-slash', 'icon-eye']`。图标参考[ICON](#/icon)  |
| ext-cls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `.bk-form-control` 上 | String | —— | —— |
| native-attributes | Html input标签原生属性设置 | Object | —— | —— |
| show-word-limit | 是否显示输入字数统计，只在 `type = "text"` 或 `type = "textarea"` 时有效 | Boolean | true / false | —— |
| behavior | 简约风格设置(simplicity:简约 normal:正常 type=textarea时不生效) | String | 'normal'/'simplicity' | normal |
| show-clear-only-hover | 是否在只有 hover 的时候才显示 clear 清除按钮 | Boolean | —— | false |

### 事件 {page=#/input}

| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| change | 文本框内容变化时调用 | value, event |
| input | 文本框输入时调用 | value, event |
| focus | 文本框获取焦点时调用 | value, event |
| blur | 文本框失去焦点时调用 | value, event |
| keypress | 文本框输入按下键盘时调用 | value, event |
| keydown | 文本框输入按下键盘时调用 | value, event |
| keyup | 文本框输入按下键盘按键松开时调用 | value, event |
| enter | 文本框获取焦点时，按下回车时调用 | value, event |
| paste | 文本框粘贴内容时调用 | value, event |
| clear | 点击文本框的清除图标时调用 | value, event |
| left-icon-click | 点击配置的左图标时调用 | value, event |
| right-icon-click | 点击配置的右图标时调用 | value, event |
