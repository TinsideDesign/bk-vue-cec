<script>
    import { bkComposeFormItem, bkInput, bkSelect, bkOption, bkDatePicker, bkTimePicker, bkColorPicker } from '@'

    export default {
        components: {
            bkComposeFormItem,
            bkInput,
            bkSelect,
            bkOption,
            bkDatePicker,
            bkTimePicker,
            bkColorPicker
        },
        data () {
            return {
                value1: 'qq',
                value2: 'qq'
            }
        }
    }
</script>
<style>

</style>

[[toc]]

## ComposeFormItem 表单项组合

多个表单项组合排版的布局风格

### 基础用法 {page=#/compose-form-item}

:::demo 组合 bk-select 和 bk-input

```html
<template>
    <bk-compose-form-item>
        <bk-select v-model="value1" style="width: 100px" :clearable="false">
            <bk-option id="qq" name="QQ"></bk-option>
            <bk-option id="weixin" name="微信"></bk-option>
        </bk-select>
        <bk-input v-if="value1 === 'qq'" key="qq" placeholder="请输入QQ账号"></bk-input>
        <bk-input v-if="value1 === 'weixin'" key="weixin" placeholder="请输入微信账号"></bk-input>
    </bk-compose-form-item>
</template>
<script>
    import { bkComposeFormItem, bkInput, bkSelect, bkOption, bkColorPicker } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkComposeFormItem,
            bkInput,
            bkSelect,
            bkOption,
            bkColorPicker
        },
        data () {
            return {
                value1: 'qq'
            }
        }
    }
</script>
```

:::

### 更多组合 {page=#/compose-form-item}

:::demo 组合多种表单项

```html
<template>
    <bk-compose-form-item>
        <bk-select v-model="value2" style="width: 120px" :clearable="false">
            <bk-option id="qq" name="QQ"></bk-option>
            <bk-option id="weixin" name="微信"></bk-option>
            <bk-option id="date" name="日期-时间"></bk-option>
        </bk-select>
        <template v-if="value2 === 'qq'">
            <bk-select key="age" style="width: 80px" :clearable="false">
                <bk-option id="boy" name="男"></bk-option>
                <bk-option id="girl" name="女"></bk-option>
            </bk-select>
            <bk-input key="qq" placeholder="请输入QQ账号"></bk-input>
            <bk-input key="nickname" placeholder="请输入昵称"></bk-input>
        </template>
        <template  v-if="value2 === 'weixin'">
            <bk-input key="weixin" placeholder="请输入微信账号"></bk-input>
            <bk-input key="remark" placeholder="备注"></bk-input>
        </template>
        <template v-if="value2 === 'date'">
            <bk-date-picker key="date" placeholder="请选择日期"></bk-date-picker>
            <bk-time-picker key="dateTime" placeholder="请选择时间"></bk-time-picker>
        </template>
    </bk-compose-form-item>
</template>
<script>
    import { bkComposeFormItem, bkInput, bkSelect, bkOption, bkDatePicker, bkTimePicker } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkComposeFormItem,
            bkInput,
            bkSelect,
            bkOption,
            bkDatePicker,
            bkTimePicker
        },
        data () {
            return {
                value2: 'qq'
            }
        }
    }
</script>
```

:::



### 属性 {page=#/compose-form-item}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| head-background-color | 第一个表单项的背景色 | String | 颜色值 | #FAFBFD |
| tail-background-color | 最后一个表单项的背景色 | String | 颜色值 | - |
