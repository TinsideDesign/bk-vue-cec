<script>
    import { bkDatePicker } from '@'

    export default {
        components: {
            bkDatePicker
        },
        data () {
            return {
                value: '',
                open: false,
                initDateTime: new Date(),
                initDateTimeRange: [new Date(), new Date()],
                initDateTimeRange4UpToNow: [],
                options: {
                    shortcuts: [
                        {
                            text: '今天',
                            value () {
                                const end = new Date()
                                const start = new Date()
                                return [start, end]
                            },
                            onClick: picker => {
                                console.error(picker)
                            }
                        },
                        {
                            text: '近7天',
                            value () {
                                const end = new Date()
                                const start = new Date()
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                                return [start, end]
                            }
                        },
                        {
                            text: '近15天',
                            value () {
                                const end = new Date()
                                const start = new Date()
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 15)
                                return [start, end]
                            }
                        },
                        {
                            text: '近30天',
                            value () {
                                const end = new Date()
                                const start = new Date()
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                                return [start, end]
                            }
                        }
                    ]
                },
                shortcuts: [
                    {
                        text: '今天',
                        value () {
                            const end = new Date()
                            const start = new Date()
                            return [start, end]
                        },
                        onClick: picker => {
                            console.error(picker)
                        }
                    },
                    {
                        text: '近7天',
                        value () {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                            return [start, end]
                        }
                    },
                    {
                        text: '近15天',
                        value () {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 15)
                            return [start, end]
                        }
                    },
                    {
                        text: '近30天',
                        value () {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                            return [start, end]
                        }
                    }
                ],
                timePickerOptions: {
                    disabledHours: [1, 2, 3, 4, 5, 10],
                    disabledMinutes: [1, 2, 3, 4, 5, 10],
                    disabledSeconds: [10, 10, 20],
                    hideDisabledOptions: true
                }
            }
        },
        methods: {
            handleClick () {
                this.open = !this.open
            },
            handleChange (date) {
                console.warn('handleChange', date)
                this.value = date
            },
            handleOk () {
                console.error('handleOK')
                this.open = false
            },
            change4UpToNow (date, type) {
                console.log('change4UpToNow change', date, type)
            },
            openChange4UpToNow (state) {
                console.log('openChange4UpToNow openChange', state)
            },
            pickSuccess4UpToNow () {
                console.log('pickSuccess4UpToNow pickSuccess')
            },
            changeTest (date, type) {
                console.log('changeTest change', date, type)
            },
            openChangeTest (state) {
                console.log('openChangeTest openChange', state)
            },
            pickSuccessTest () {
                console.log('pickSuccessTest pickSuccess')
            },
            shortcutChange (value, index) {
                console.log('shortcutChange', value, index)
            }
        }
    }
</script>
<style lang="postcss">
    .custom-footer-wrapper {
        color: red;
    }
    .custom-footer {
        text-align: center;
    }
</style>

[[toc]]

## DatePicker 日期选择器

<!-- :::exampleLink [更多示例](#/date-picker/example) -->

### 基础用法 {page=#/date-picker}

:::demo 通过 `v-model` 或者 `value` 设置初始值

```html
<template>
    <div>
        <bk-date-picker class="mr15" v-model="initDateTime" :placeholder="'选择日期'" :ext-popover-cls="'custom-popover-cls'"></bk-date-picker>
    </div>
</template>
<script>
    import { bkDatePicker } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkDatePicker
        },
        data () {
            return {
                initDateTime: new Date()
            }
        }
    }
</script>
```
:::

### 开启日期范围 {page=#/date-picker}

:::demo 通过设置 `type` 属性为 `daterange` 来开启时间设置

```html
<template>
    <div>
        <bk-date-picker class="mr15" :placeholder="'选择日期范围'" :type="'daterange'"></bk-date-picker>
    </div>
</template>
<script>
    import { bkDatePicker } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkDatePicker
        }
    }
</script>
```

:::

### 开启时间设置 {page=#/date-picker}

:::demo 通过设置 `type` 属性为 `datetime` 来开启时间设置

```html
<template>
    <div>
        <bk-date-picker v-model="initDateTime" :placeholder="'选择日期时间'" :type="'datetime'"></bk-date-picker>
    </div>
</template>
<script>
    import { bkDatePicker } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkDatePicker
        },
        data () {
            return {
                initDateTime: new Date()
            }
        }
    }
</script>
```

:::

### 开启日期时间范围设置 {page=#/date-picker}

:::demo 通过设置 `type` 属性为 `datetimerange` 来开启时间设置

```html
<template>
    <div>
        <bk-date-picker v-model="initDateTimeRange" :placeholder="'选择日期时间范围'" :type="'datetimerange'"></bk-date-picker>
    </div>
</template>
<script>
    import { bkDatePicker } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkDatePicker
        },
        data () {
            return {
                initDateTimeRange: [new Date(), new Date()]
            }
        }
    }
</script>
```

:::

### 快捷方式设置 {page=#/date-picker}

:::demo 通过设置 `shortcuts` 属性来设置快捷方式

```html
<template>
    <div>
        <p class="mb5">点击 shortcuts 不会关闭弹层，只在 datetimerange 生效，因为 datetimerange 带有时间选择</p>
        <bk-date-picker :shortcuts="shortcuts" :type="'datetimerange'"></bk-date-picker>
        <p class="mb5">点击 shortcuts 会关闭弹层</p>
        <bk-date-picker :shortcuts="shortcuts" :type="'datetimerange'" :shortcut-close="true" :use-shortcut-text="true"
            @change="changeTest"
            @open-change="openChangeTest"
            @pick-success="pickSuccessTest"></bk-date-picker>
        <p class="mb5">默认值为 shortcuts 中的选项</p>
        <bk-date-picker :shortcuts="shortcuts" :type="'datetimerange'" :shortcut-close="true" :use-shortcut-text="true"
            :shortcut-selected-index="2"
            @change="changeTest"
            @open-change="openChangeTest"
            @shortcut-change="shortcutChange"
            @pick-success="pickSuccessTest"></bk-date-picker>
        <p class="mb5">快捷选项插槽</p>
        <bk-date-picker
            :value="initDateTimeRange"
            :type="'datetimerange'">
            <div slot="shortcuts">自定义插槽</div>
        </bk-date-picker>
    </div>
</template>
<script>
    import { bkDatePicker } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkDatePicker
        },
        data () {
            return {
                shortcuts: [
                    {
                        text: '今天',
                        value () {
                            const end = new Date()
                            const start = new Date()
                            return [start, end]
                        },
                        onClick: picker => {
                            console.error(picker)
                        }
                    },
                    {
                        text: '近7天',
                        value () {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                            return [start, end]
                        }
                    },
                    {
                        text: '近15天',
                        value () {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 15)
                            return [start, end]
                        }
                    },
                    {
                        text: '近30天',
                        value () {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                            return [start, end]
                        }
                    }
                ]
            }
        },
        methods: {
            changeTest (date, type) {
                console.log('changeTest change', date, type)
            },
            openChangeTest (state) {
                console.log('openChangeTest openChange', state)
            },
            pickSuccessTest () {
                console.log('pickSuccessTest pickSuccess')
            },
            shortcutChange (value, index) {
                console.log('shortcutChange', value, index)
            }
        }
    }
</script>
```

:::

### 可编辑 {page=#/date-picker}

:::demo 通过设置 `editable` 属性为 `true` 设置可编辑

```html
<template>
    <div>
        <bk-date-picker v-model="initDateTimeRange" :placeholder="'选择日期时间范围'" :type="'datetimerange'" :editable="true"></bk-date-picker>
    </div>
</template>
<script>
    import { bkDatePicker } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkDatePicker
        },
        data () {
            return {
                initDateTimeRange: ['2019-05-01 11:00:00', '2019-12-31 23:23:23'],
            }
        }
    }
</script>
```

:::

### 通过slot自定义展示样式 {page=#/date-picker}

:::demo 通过 `slot` 和 `open`属性自定义展现样式

```html
<template>
    <div>
        <bk-date-picker :open="open" :value="value"
            @change="handleChange"
            @pick-success="handleOk"
        >
            <a slot="trigger" href="javascript:void(0)" @click="handleClick">
                <template v-if="value === ''">Select date</template>
                <template v-else>{{value}}</template>
            </a>
        </bk-date-picker>
    </div>
</template>
<script>
    import { bkDatePicker } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkDatePicker
        },
        data () {
            return {
                value: '',
                open: false
            }
        },
        methods: {
            handleClick () {
                this.open = !this.open
            },
            handleChange (date) {
                this.value = date
            },
            handleOk () {
                console.error('handleOK')
                this.open = false
            }
        }
    }
</script>
```
:::

### 日期选择器中配置时间选择器的属性 {page=#/date-picker}

:::demo 通过 `time-picker-options` 配置日期选择器中的时间选择器的属性

```html
<template>
    <div>
        <bk-date-picker :time-picker-options="timePickerOptions" :type="'datetime'"></bk-date-picker>
    </div>
</template>
<script>
    import { bkDatePicker } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkDatePicker
        },
        data () {
            return {
                timePickerOptions: {
                    disabledHours: [1, 2, 3, 4, 5, 10],
                    disabledMinutes: [1, 2, 3, 4, 5, 10],
                    disabledSeconds: [10, 10, 20],
                    hideDisabledOptions: true
                }
            }
        }
    }
</script>
```
:::

### 日期范围以及日期时间范围选择器终止时间配置为“至今” {page=#/date-picker}

:::demo 在日期范围选择器和日期时间范围选择器中（即 type 为 `daterange` 或者 `datetimerange`），通过设置 `up-to-now` 属性为 `true` 使终止时间为“至今”。**需要注意的是，“至今”表示结束时间，因此只有在范围选择器中选了一个时间之后，同时满足选择的第一个时间早于当前时间时间，“至今”才可用**。

```html
<template>
    <div>
        <bk-date-picker v-model="initDateTimeRange4UpToNow"
            :placeholder="'选择日期时间范围'"
            :type="'datetimerange'"
            :up-to-now="true"
            @change="change4UpToNow"
            @open-change="openChange4UpToNow"
            @pick-success="pickSuccess4UpToNow"></bk-date-picker>
    </div>
</template>
<script>
    import { bkDatePicker } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkDatePicker
        },
        data () {
            return {
                initDateTimeRange4UpToNow: []
            }
        },
        methods: {
            change4UpToNow (date, type) {
                console.log('change4UpToNow change', date, type)
            },
            openChange4UpToNow (state) {
                console.log('openChange4UpToNow openChange', state)
            },
            pickSuccess4UpToNow () {
                console.log('pickSuccess4UpToNow pickSuccess')
            }
        }
    }
</script>
```

:::

### 自定义 footer {page=#/date-picker}

:::demo 可以通过 `slot="footer"` 来增加自定义的 footer，同时可以配置 `footer-slot-cls` 来为 footer 的 wrapper 容器设置自定义的样式。**不存在 footer slot 时，`footer-slot-cls` 配置无效**

```html
<template>
    <div>
        <bk-date-picker v-model="initDateTimeRange" :placeholder="'选择日期时间范围'" :type="'datetimerange'" :footer-slot-cls="'custom-footer-wrapper'">
            <div slot="footer" class="custom-footer">
                我是自定义 footer
            </div>
        </bk-date-picker>
    </div>
</template>
<script>
    import { bkDatePicker } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkDatePicker
        },
        data () {
            return {
                initDateTimeRange: [new Date(), new Date()]
            }
        }
    }
</script>
<style lang="postcss">
    .custom-footer-wrapper {
        color: red;
    }
    .custom-footer {
        text-align: center;
    }
</style>
```
:::

### 简约风格日期选择器 {page=#/date-picker}

:::demo 通过属性`behavior`配置简约风格

```html
<template>
    <div>
        <bk-date-picker
            behavior='simplicity'
            class="mr15"
            v-model="initDateTime"
            :placeholder="'选择日期'">
        </bk-date-picker>
    </div>
</template>
<script>
    import { bkDatePicker } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkDatePicker
        },
        data () {
            return {
                initDateTime: new Date()
            }
        }
    }
</script>
```
:::

### 属性 {page=#/date-picker}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| type | 类型 | String | date / daterange / datetime / datetimerange / month / year | date  |
| value | 日历组件的值，可以是 Date 或字符串或数组，只有在 daterange 和 datetimerange 类型时才支持数组 | Date / String / Array | -- | -- |
| editable | 设置文本框是否可编辑 | Boolean | true / false | true |
| format | 格式 | String | —— | date: yyyy-MM-dd <br/> month: yyyy-MM <br/> year: yyyy <br/> datetime: yyyy-MM-dd HH:mm:ss <br/> time: HH:mm:ss <br/> timerange: HH:mm:ss <br/> daterange: yyyy-MM-dd <br/> datetimerange: yyyy-MM-dd HH:mm:ss |
| readonly | 是否只读 | Boolean | true / false | false |
| disabled | 是否禁用 | Boolean | true / false | false |
| clearable | 是否可清空 | Boolean | true / false | true |
| open | 控制日历面板的显示与隐藏 | Boolean | true / false | false |
| multiple | 是否允许选择多个日期，multiple 只支持 date 类型 | Boolean | true / false | false |
| time-picker-options | 支持 datetime 和 datetimerange 类型，在 DatePicker 中配置 [TimePicker 的属性](#/time-picker?anchor=shu-xing) | Object | -- | {} |
| start-date | 设置日历面板默认显示的日期 | Date | -- | -- |
| placeholder | 占位文案  | String | -- | '' |
| placement | 日历面板出现的位置  | String | top, top-start, top-end, bottom, bottom-start, bottom-end, left, left-start, left-end, right, right-start, right-end | bottom-start |
| transfer | 控制日历面板是否出现在 body 内 | Boolean | true / false | false |
| shortcuts | 配置快捷选择日期 | Object | -- | -- |
| shortcut-close | 配置点击 shortcuts 是否关闭弹层 | Boolean | true / false | false |
| options | 额外配置，目前包括不可选日期的配置，具体如下 | Object | -- | {} |
| options.disabledDate | 配置不可选的日期，参数为当前的日期，返回 true 禁用这天，否则不禁用 | Function | -- | -- |
| font-size | 设置组件主体内容字体大小 | String | `normal`（12px），`medium`（14px），`large`（16px） | normal |
| ext-cls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `.bk-date-picker` 上 | String | —— | —— |
| ext-popover-cls | 配置自定义样式类名，传入的类会被加在弹出的日历面板 DOM `.bk-date-picker-dropdown` 上 | String | —— | —— |
| up-to-now | 在日期范围选择器和日期时间范围选择器中（即 type 为 `daterange` 或者 `datetimerange`），设置 `up-to-now` 为 `true` 可使配置终止时间为“至今” | Boolean | —— | false |
| use-shortcut-text | 开启后，点击选中配置的快捷项时，输入框显示的内容为选中的快捷文案，且不可编辑 | Boolean | true / false | false |
| shortcut-selected-index | 选中的快捷项index | Number | -1 | —— |
| footer-slot-cls | 自定义 footer 的容器的样式，**只有存在自定义 footer 时才会生效** | string | -- | —— |
| header-slot-cls | 自定义 header 的容器的样式，**只有存在自定义 header 时才会生效** | string | -- | —— |
| behavior | 风格设置(simplicity:简约 normal:正常) | String | 'normal'/'simplicity' | normal |

### 事件 {page=#/date-picker}
| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| change | 日期改变事件，参数为当前选择的日期以及当前日历组件的类型 | date, type |
| clear | 日历面板点击清空事件，无参数 | -- |
| open-change | 日历面板弹出或收起事件，参数为日历面板展开收起的状态 | state |
| pick-success | 日历面板选择日期后，点击确定选择成功的事件，无参数 | -- |
| shortcut-change | 快捷项改变事件 | value, index |

### 插槽(slot) {page=#/date-picker}
| 名称 | 说明 |
|------|------|
| trigger | 可用该插槽配合`open`属性，自定义日期选择器的展示 |
| footer | 可用该插槽，自定义日期选择器 footer 的展示 |
| header | 可用该插槽，自定义日期选择器 header 的展示 |
| shortcuts | datetimerange、daterange类型可用该插槽，自定义时间范围选择器快捷选项区域的展示 |
