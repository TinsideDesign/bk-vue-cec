<script>
    import { bkForm, bkButton, bkSelect, bkFormItem, bkInput, bkRadioGroup, bkRadio, bkOption, bkCheckboxGroup, bkCheckbox, bkSwitcher, bkDatePicker } from '@'
    export default {
        data () {
            return {
                isChecking: false,
                formData: {
                    name: '',
                    isPublic: true,
                    linkWay: ['wx'],
                    project: [],
                    desc: '',
                    date: ''
                },
                dynamicFormData: {
                    name: '',
                    emails: [
                        {
                            value: ''
                        }
                    ]
                },
                customDesc: 'hello world',
                projectList: [
                    {
                        id: 1,
                        name: '项目一'
                    },
                    {
                        id: 2,
                        name: '项目二'
                    },
                    {
                        id: 3,
                        name: '项目三'
                    }
                ],
                rules: {
                    name: [
                        {
                            required: true,
                            message: '必填项',
                            trigger: 'blur'
                        },
                        {
                            min: 3,
                            message: function (val) {
                                return `${val}不能小于3个字符`
                            },
                            trigger: 'blur'
                        },
                        {
                            max: 10,
                            message: '不能多于10个字符',
                            trigger: 'blur'
                        },
                        {
                            validator: this.checkName,
                            message: '不能等于admin',
                            trigger: 'blur'
                        }
                    ],
                    email: [
                        {
                            required: true,
                            message: '请输入邮箱地址',
                            trigger: 'blur'
                        },
                        {
                            regex: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
                            message: '请输入正确邮箱地址',
                            trigger: 'blur'
                        }
                    ],
                    project: [
                        {
                            required: true,
                            message: '请选择项目',
                            trigger: 'blur'
                        }
                    ],
                    date: [
                        {
                            required: true,
                            message: '请选择日期',
                            trigger: 'blur'
                        },
                        {
                            required: true,
                            message: '请选择日期',
                            trigger: 'change'
                        }
                    ]
                },
                formItems: [
                    {
                        type: 'input',
                        key: 'name',
                        value: '',
                        name: '单行文本',
                        placeholder: '请填写内容',
                        labelWidth: 150,
                        isDisabled: false,
                        verifValue: /^1[34578]\\d{9}$/,
                        verifInfo: '',
                    },
                    {
                        type: 'select',
                        key: 'select',
                        value: '',
                        name: '下拉框',
                        placeholder: '请填写内容',
                        labelWidth: 150,
                        isDisabled: false,
                        options: [
                            {
                                key: '1',
                                value: '选项一'
                            },
                            {
                                key: '2',
                                value: '选项二'
                            }
                        ]
                    }
                ]
            }
        },
        components: {
            bkForm,
            bkButton,
            bkFormItem,
            bkInput,
            bkRadioGroup,
            bkRadio,
            bkCheckboxGroup,
            bkCheckbox,
            bkSwitcher,
            bkDatePicker,
            bkSelect,
            bkOption
        },
        methods: {
            async checkName (val) {
                const resutl = await this.asyncCheck(val)
                return resutl
            },
            async asyncCheck (val) {
                // 模拟异步请求
                const p = new Promise((resolve, reject) => {
                    setTimeout(() => {
                        if (val === 'admin') {
                            reject(false)
                        } else {
                            resolve(true)
                        }
                    }, 2000)
                })
                const result = await p.then(res => {
                    return true
                }).catch(res => {
                    return false
                })
                return result
            },
            submitData () {
                alert(JSON.stringify(this.formData))
            },
            changeDate (oldDay, newDay) {
                this.formData.date = newDay
            },
            validate1 () {
                this.isChecking = true
                this.$refs.validateForm1.validate().then(validator => {
                    alert('验证成功！')
                    this.isChecking = false
                }, validator => {
                    this.isChecking = false
                    // 显示第一个出错位置
                    // alert(`${validator.field}：${validator.content}`)
                })
            },
            validate2 () {
                this.isChecking = true
                this.$refs.validateForm2.validate().then(validator => {
                    alert('验证成功！')
                    this.isChecking = false
                }, validator => {
                    this.isChecking = false
                    // 显示第一个出错位置
                    // alert(`${validator.field}：${validator.content}`)
                })
            },
            clearError1 () {
                this.$refs.validateForm1.clearError()
            },
            clearError2 () {
                this.$refs.validateForm2.clearError()
            },
            addEmail () {
                this.dynamicFormData.emails.push({ value: '' })
            },
            checkData () {
                this.$refs.dynamicForm.validate().then(validator => {
                    alert('验证成功！')
                }, validator => {
                    // 显示第一个出错位置
                    alert(validator.content)
                })
            }
        }
    }
</script>

[[toc]]

## Form 表单

由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据

### 基础用法 {page=#/form}

::: demo 使用 `bk-form` 标签配置表单
``` html
<template>
    <div style="width: 600px;">
        <bk-form :label-width="200" :model="formData">
            <bk-form-item label="项目名称" :required="true" :property="'name'" :desc="customDesc">
                <bk-input v-model="formData.name"></bk-input>
            </bk-form-item>
            <bk-form-item label="是否公开" desc="hello desc" :desc-type="'icon'">
                <bk-switcher size="small" v-model="formData.isPublic">
                </bk-switcher>
            </bk-form-item>
            <bk-form-item label="项目联系">
                <bk-checkbox-group v-model="formData.linkWay">
                    <bk-checkbox :label="'qq'" class="mr20">
                        <i class="bk-icon mr5 icon-qq"></i>QQ
                    </bk-checkbox>
                    <bk-checkbox :label="'wx'" class="mr20">
                        <i class="bk-icon mr5 icon-weixin"></i>微信
                    </bk-checkbox>
                    <bk-checkbox :label="'weibo'">
                        <i class="bk-icon mr5 icon-sina"></i>微博
                    </bk-checkbox>
                </bk-checkbox-group>
            </bk-form-item>
            <bk-form-item label="日期">
                <bk-date-picker
                    :timer="false"
                    :init-date.sync="formData.date"
                    :disabled="false"
                    style="width: 100%;"
                    @change="changeDate">
                </bk-date-picker>
            </bk-form-item>
            <bk-form-item label="项目描述">
                <bk-input type="textarea" v-model="formData.desc" placeholder="请输入描述"></bk-input>
            </bk-form-item>
            <bk-form-item>
                <bk-button style="margin-right: 3px;" theme="primary" title="提交" @click.stop.prevent="submitData">提交</bk-button>
                <bk-button ext-cls="mr5" theme="default" title="取消">取消</bk-button>
            </bk-form-item>
        </bk-form>
    </div>
</template>
<script>
    import { bkForm, bkFormItem, bkButton, bkInput, bkSwitcher, bkCheckboxGroup, bkCheckbox, bkDatePicker } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkForm,
            bkFormItem,
            bkButton,
            bkInput,
            bkSwitcher,
            bkCheckboxGroup,
            bkCheckbox,
            bkDatePicker
        },
        data () {
            return {
                formData: {
                    name: '',
                    isPublic: true,
                    linkWay: ['wx'],
                    desc: '',
                    date: ''
                },
                customDesc: 'hello world'
            }
        },
        methods: {
            submitData () {
                alert(JSON.stringify(this.formData))
            },
            changeDate (oldDay, newDay) {
                this.formData.date = newDay
            }
        }
    }
</script>
```
:::

### 垂直布局表单 {page=#/form}

::: demo 使用 `bk-form` 标签配置表单，通过`form-type="vertical"`实现垂直布局

``` html
<template>
    <div style="width: 600px;">
        <bk-form :label-width="200" form-type="vertical">
            <bk-form-item label="项目名称" :required="true">
                <bk-input v-model="formData.name"></bk-input>
            </bk-form-item>
            <bk-form-item label="项目联系">
                <bk-checkbox-group v-model="formData.linkWay">
                    <bk-checkbox :label="'qq'" class="mr20">
                        <i class="bk-icon mr5 icon-qq"></i>QQ
                    </bk-checkbox>
                    <bk-checkbox :label="'wx'" class="mr20">
                        <i class="bk-icon mr5 icon-weixin"></i>微信
                    </bk-checkbox>
                    <bk-checkbox :label="'weibo'">
                        <i class="bk-icon mr5 icon-sina"></i>微博
                    </bk-checkbox>
                </bk-checkbox-group>
            </bk-form-item>
            <bk-form-item label="项目描述">
                <bk-input type="textarea" v-model="formData.desc"></bk-input>
            </bk-form-item>
            <bk-form-item class="mt20">
                <bk-button style="margin-right: 3px;" theme="primary" title="提交" @click.stop.prevent="submitData">提交</bk-button>
                <bk-button ext-cls="mr5" theme="default" title="取消">取消</bk-button>
            </bk-form-item>
        </bk-form>
    </div>
</template>
<script>
    import { bkForm, bkFormItem, bkButton, bkInput, bkCheckboxGroup, bkCheckbox } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkForm,
            bkFormItem,
            bkButton,
            bkInput,
            bkCheckboxGroup,
            bkCheckbox
        },
        data () {
            return {
                formData: {
                    name: '',
                    linkWay: ['wx'],
                    desc: ''
                }
            }
        },
        methods: {
            submitData () {
                alert(JSON.stringify(this.formData))
            }
        }
    }
</script>
```
:::

### 行内布局表单 {page=#/form}

::: demo 使用 `bk-form` 标签配置表单，通过`form-type="inline`实现行内布局

``` html
<template>
    <div>
        <bk-form form-type="inline">
            <bk-form-item label="名称">
                <bk-input placeholder="名称" v-model="formData.name"></bk-input>
            </bk-form-item>
            <bk-form-item label="日期">
                <bk-date-picker placeholder="日期" :timer="false" v-model="formData.date"></bk-date-picker>
            </bk-form-item>
            <bk-form-item>
                <bk-button ext-cls="mr5" theme="primary" title="提交">搜索</bk-button>
            </bk-form-item>
        </bk-form>
    </div>
</template>
<script>
    import { bkForm, bkFormItem, bkButton, bkInput, bkDatePicker } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkForm,
            bkFormItem,
            bkButton,
            bkInput,
            bkDatePicker
        },
        data () {
            return {
                formData: {
                    name: '',
                    date: ''
                }
            }
        },
        methods: {}
    }
</script>
```
:::

### 表单验证 (tooltips) {page=#/form}

::: demo 使用 `bk-form` 标签配置表单，通过`rules`配置校验规则

``` html
<template>
    <div style="width: 600px;">
        <bk-form :label-width="200" :model="formData" :rules="rules" ref="validateForm1">
            <bk-form-item label="项目名称" :required="true" :property="'name'">
                <bk-input v-model="formData.name" placeholder="请输入3到10个以内的字符，不能为admin"></bk-input>
                <p class="mt5 mb0 f12" slot="tip">ps: 输入admin可以体验下异步验证效果</p>
            </bk-form-item>
            <bk-form-item label="所属项目" :required="true" :property="'project'">
                <bk-select v-model="formData.project" searchable multiple>
                    <bk-option v-for="option in projectList"
                        :key="option.id"
                        :id="option.id"
                        :name="option.name">
                    </bk-option>
                </bk-select>
            </bk-form-item>
            <bk-form-item label="日期" :required="true" :property="'date'">
                <bk-date-picker placeholder="请选择" :timer="false" v-model="formData.date" :disabled="false" style="width: 100%;">
                </bk-date-picker>
            </bk-form-item>
            <bk-form-item label="项目描述">
                <bk-input type="textarea" v-model="formData.desc"></bk-input>
            </bk-form-item>
            <bk-form-item>
                <bk-button style="margin-right: 3px;" theme="primary" title="提交" @click.stop.prevent="validate1" :loading="isChecking">提交</bk-button>
                <bk-button ext-cls="mr5" theme="default" title="清除错误提示" @click.stop.prevent="clearError1">清除错误提示</bk-button>
            </bk-form-item>
        </bk-form>
    </div>
</template>
<script>
    import { bkForm, bkFormItem, bkButton, bkInput, bkDatePicker } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkForm,
            bkFormItem,
            bkButton,
            bkInput,
            bkDatePicker
        },
        data () {
            return {
                formData: {
                    name: '',
                    date: '',
                    project: [],
                    desc: ''
                },
                projectList: [
                    {
                        id: 1,
                        name: '项目一'
                    },
                    {
                        id: 2,
                        name: '项目二'
                    },
                    {
                        id: 3,
                        name: '项目三'
                    }
                ],
                rules: {
                    name: [
                        {
                            required: true,
                            message: '必填项',
                            trigger: 'blur'
                        },
                        {
                            min: 3,
                            message: function (val) {
                                return `${val}不能小于3个字符`
                            },
                            trigger: 'blur'
                        },
                        {
                            max: 10,
                            message: '不能多于10个字符',
                            trigger: 'blur'
                        },
                        {
                            validator: this.checkName,
                            message: '不能等于admin',
                            trigger: 'blur'
                        }
                    ],
                    project: [
                        {
                            required: true,
                            message: '请选择项目',
                            trigger: 'blur'
                        }
                    ],
                    date: [
                        {
                            required: true,
                            message: '请选择日期',
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        methods: {
            async checkName (val) {
                const resutl = await this.asyncCheck(val)
                return resutl
            },
            async asyncCheck (val) {
                // 模拟异步请求
                const p = new Promise((resolve, reject) => {
                    setTimeout(() => {
                        if (val === 'admin') {
                            reject(false)
                        } else {
                            resolve(true)
                        }
                    }, 2000)
                })
                const result = await p.then(res => {
                    return true
                }).catch(res => {
                    return false
                })
                return result
            },
            validate1 () {
                this.isChecking = true
                this.$refs.validateForm1.validate().then(validator => {
                    alert('验证成功！')
                    this.isChecking = false
                }, validator => {
                    this.isChecking = false
                    // 显示第一个出错位置
                    // alert(`${validator.field}：${validator.content}`)
                })
            },
            clearError1 () {
                this.$refs.validateForm1.clearError()
            }
        }
    }
</script>
```
:::

### 表单验证 (normal) {page=#/form}

::: demo 使用 `bk-form` 标签配置表单，通过`rules`配置校验规则

``` html
<template>
    <div style="width: 600px;">
        <bk-form :label-width="200" :model="formData" :rules="rules" ref="validateForm2">
            <bk-form-item
                label="项目名称"
                :required="true"
                :property="'name'"
                :error-display-type="'normal'">
                <bk-input v-model="formData.name" placeholder="请输入3到10个以内的字符，不能为admin"></bk-input>
                <p class="mt5 mb0 f12" slot="tip">ps: 输入admin可以体验下异步验证效果</p>
            </bk-form-item>
            <bk-form-item
                label="所属项目"
                :required="true"
                :property="'project'"
                :error-display-type="'normal'">
                <bk-select v-model="formData.project" searchable multiple>
                    <bk-option v-for="option in projectList"
                        :key="option.id"
                        :id="option.id"
                        :name="option.name">
                    </bk-option>
                </bk-select>
            </bk-form-item>
            <bk-form-item
                label="日期"
                :required="true"
                :property="'date'"
                :icon-offset="35"
                :error-display-type="'normal'">
                <bk-date-picker placeholder="请选择" :timer="false" v-model="formData.date" :disabled="false" style="width: 100%;">
                </bk-date-picker>
            </bk-form-item>
            <bk-form-item
                label="项目描述"
                :error-display-type="'normal'">
                <bk-input type="textarea" v-model="formData.desc"></bk-input>
            </bk-form-item>
            <bk-form-item>
                <bk-button style="margin-right: 3px;" theme="primary" title="提交" @click.stop.prevent="validate2" :loading="isChecking">提交</bk-button>
                <bk-button ext-cls="mr5" theme="default" title="清除错误提示" @click.stop.prevent="clearError2">清除错误提示</bk-button>
            </bk-form-item>
        </bk-form>
    </div>
</template>
<script>
    import { bkForm, bkFormItem, bkButton, bkInput, bkDatePicker } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkForm,
            bkFormItem,
            bkButton,
            bkInput,
            bkDatePicker
        },
        data () {
            return {
                formData: {
                    name: '',
                    date: '',
                    project: [],
                    desc: ''
                },
                projectList: [
                    {
                        id: 1,
                        name: '项目一'
                    },
                    {
                        id: 2,
                        name: '项目二'
                    },
                    {
                        id: 3,
                        name: '项目三'
                    }
                ],
                rules: {
                    name: [
                        {
                            required: true,
                            message: '必填项',
                            trigger: 'blur'
                        },
                        {
                            min: 3,
                            message: function (val) {
                                return `${val}不能小于3个字符`
                            },
                            trigger: 'blur'
                        },
                        {
                            max: 10,
                            message: '不能多于10个字符',
                            trigger: 'blur'
                        },
                        {
                            validator: this.checkName,
                            message: '不能等于admin',
                            trigger: 'blur'
                        }
                    ],
                    project: [
                        {
                            required: true,
                            message: '请选择项目',
                            trigger: 'blur'
                        }
                    ],
                    date: [
                        {
                            required: true,
                            message: '请选择日期',
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        methods: {
            async checkName (val) {
                const resutl = await this.asyncCheck(val)
                return resutl
            },
            async asyncCheck (val) {
                // 模拟异步请求
                const p = new Promise((resolve, reject) => {
                    setTimeout(() => {
                        if (val === 'admin') {
                            reject(false)
                        } else {
                            resolve(true)
                        }
                    }, 2000)
                })
                const result = await p.then(res => {
                    return true
                }).catch(res => {
                    return false
                })
                return result
            },
            validate2 () {
                this.isChecking = true
                this.$refs.validateForm2.validate().then(validator => {
                    alert('验证成功！')
                    this.isChecking = false
                }, validator => {
                    this.isChecking = false
                    // 显示第一个出错位置
                    // alert(`${validator.field}：${validator.content}`)
                })
            },
            clearError2 () {
                this.$refs.validateForm2.clearError()
            }
        }
    }
</script>
```
:::

### 动态表单验证 {page=#/form}

::: demo 使用 `bk-form` 标签配置表单，使用`validate`可以实现动态表单验证

``` html
<template>
    <div style="width: 600px;">
        <bk-form :label-width="200" :model="dynamicFormData" ref="dynamicForm">
            <bk-form-item
                label="名称"
                :required="true"
                :rules="rules.name"
                :property="'name'">
                <bk-input v-model="dynamicFormData.name" placeholder="请输入3到10个以内的字符"></bk-input>
            </bk-form-item>
            <bk-form-item
                label="Email"
                v-for="(mail, index) in dynamicFormData.emails"
                :required="true"
                :rules="rules.email"
                :icon-offset="95"
                :property="'emails.' + index + '.value'"
                :key="index">
                <bk-input v-model="mail.value" placeholder="请输入邮箱地址">
                    <template slot="append">
                        <bk-button icon="plus" theme="primary" style="border: none; height: 30px; border-radius: 0;" @click="addEmail">新增</bk-button>
                    </template>
                </bk-input>
            </bk-form-item>
            <bk-form-item>
                <bk-button style="margin-right: 3px;" theme="primary" title="提交" @click.stop.prevent="checkData">提交</bk-button>
                <bk-button ext-cls="mr5" theme="default" title="取消">取消</bk-button>
            </bk-form-item>
        </bk-form>
    </div>
</template>
<script>
    import { bkForm, bkFormItem, bkButton, bkInput, bkDatePicker } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkForm,
            bkFormItem,
            bkButton,
            bkInput,
            bkDatePicker
        },
        data () {
            return {
                dynamicFormData: {
                    name: '',
                    emails: [
                        {
                            value: ''
                        }
                    ]
                },
                rules: {
                    name: [
                        {
                            required: true,
                            message: '必填项',
                            trigger: 'blur'
                        },
                        {
                            min: 3,
                            message: function (val) {
                                return `${val}不能小于3个字符`
                            },
                            trigger: 'blur'
                        },
                        {
                            max: 10,
                            message: '不能多于10个字符',
                            trigger: 'blur'
                        },
                        {
                            validator: function (val) {
                                return val !== 'admin'
                            },
                            message: '不能等于admin',
                            trigger: 'blur'
                        }
                    ],
                    email: [
                        {
                            required: true,
                            message: '请输入邮箱地址',
                            trigger: 'blur'
                        },
                        {
                            regex: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
                            message: '请输入正确邮箱地址',
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        methods: {
            addEmail () {
                this.dynamicFormData.emails.push({ value: '' })
            },
            checkData () {
                this.$refs.dynamicForm.validate().then(validator => {
                    alert('验证成功！')
                }, validator => {
                    // 显示第一个出错位置
                    alert(validator.content)
                })
            }
        }
    }
</script>
```
:::


### bk-form 属性 {page=#/form}

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| form-type | 表单类型, 水平布局（horizontal）和垂直布局（vertical） | String | `horizontal`,`vertical`, `inline` | `horizontal` |
| label-width | 表单项 label 宽度 | Number | —— | 150 |
| model | 数据 | Object | —— | —— |
| rules | 表单项验证规则 | Object | —— | —— |
| ext-cls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `.bk-form` 上 | String | —— | —— |

### bk-form 方法 {page=#/form}

| 函数名 | 说明 | 参数 |
|------|------|------|
| validate | 对所有的表单项进行手动触发校验 | 校验后的回调函数 |
| clearError | 对所有的表单项的错误提示清除 | -- |

### bk-form-item 属性 {page=#/form}

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| property | 必须结合 bk-form 的 model 属性来配置，用于从整个 model 获取值，通过此值再结合校验规则进行校验 | String | —— | —— |
| label | 表单项 label 显示的内容 | String | —— | —— |
| label-width | 表单项 label 宽度, 如果没有设置则使用 bk-form 的 `label-width` | Number | —— | `150` |
| error-display-type | 表单项错误提示的方式，有tooltips和行展示效果 | String | `tooltips` / `normal` | `tooltips` |
| desc | 表单项 label描述信息, 具体用法和v-bk-tooltips指令一致，详情可参考[v-bk-tooltips参数](#/tooltips) | String, Object | —— | —— |
| desc-type | 表单项 label描述信息展示方式，包括下划线和图标两种方式 | String | `border` / `icon` |`border` |
| desc-icon | 表单项 label描述信息展示为图标时配置，仅在desc-type为`icon`时生效 | String | 参考[ICON](#/icon) | -- |
| required | 是否必填，在 label 会显示红色的* | Boolean | `true` / `false` | `false` |
| rules | 定义表单项的校验规则, 一条规则包含：触发方式 `trigger`，可选值有 'blur', 'change', 显示：message, 校验规则：required、min、max，也可以自定正则regex, 以及自定义方法validator，在自定义方法里可以实现异步验证，详情看表单验证例子 | Array | —— | —— |
| icon-offset | 当表单项校验错误时，会有一个红色感叹 icon 出现，此属性可定位 icon 的偏移位置 | Number | —— | `8` |
| ext-cls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `.bk-form-item` 上 | String | —— | —— |
| auto-check | 一旦渲染完成，自动启用检查一次 | Boolean | `true` / `false` | `false` |

### bk-form-item 插槽 {page=#/form}
| name | 说明 |
|---|---|
| tip | 自定表单项提示内容 |
