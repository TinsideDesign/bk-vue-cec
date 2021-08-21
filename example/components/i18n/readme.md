[[toc]]

## 国际化

`bk-vue-cec` 组件库已支持国际化，默认的语言是中文，可以设置成其他语言。目前组件库支持中文 `zh-CN` 和英文 `en-US` 语言包。

### 单独使用组件库内置的语言包 {page=#/i18n}

[example](#/i18n/buildin-example)

```html
<!-- 完整代码 -->
<template>
    <section>
        <h2>
            <i href="javascript:void(0)" class="back-icon bk-icon icon-arrows-left" @click="back"></i>
            单独使用组件库内置的语言包
        </h2>
        <div class="example-item" style="height: 400px">
            <bk-date-picker class="mr15" :type="'datetime'" :open="true" v-model="initDateTime"></bk-date-picker>
            <bk-button type="primary submit" title="切换中英文" @click="handleClick">
                切换中英文
            </bk-button>
            <span class="bk-text-primary">当前为{{curLang === 'zhCN' ? '中文' : '英文'}}</span>
        </div>
    </section>
</template>

<script>
    import { bkDatePicker, bkButton, locale, lang } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkDatePicker,
            bkButton
        },
        data () {
            return {
                initDateTime: new Date(),
                curLang: ''
            }
        },
        created () {
            // 获取语言标识
            this.curLang = localStorage.getItem('curLang') || 'zhCN'
            // 根据语言包标识设置组件库的语言，目前语言包支持中文和英文，对应的标识分别为 zhCN, enUS
            locale.use(lang[this.curLang])
        },
        methods: {
            back () {
                window.location.href = '#/i18n?anchor=dan-du-shi-yong-zu-jian-ku-nei-zhi-de-yu-yan-bao-example'
            },
            handleClick (event) {
                // 当前为中文时
                if (this.curLang === 'zhCN') {
                    // 切换英文
                    localStorage.setItem('curLang', 'enUS')
                } else { // 当前为英文时
                    // 切换中文
                    localStorage.setItem('curLang', 'zhCN')
                }
                this.$nextTick(() => {
                    window.location.reload()
                })
            }
        }
    }
</script>
```

### 结合 vue-i18n@6+ 使用 {page=#/i18n}

[vue-i18n-example](#/i18n/vue-i18n-example)

```html
<!-- 完整代码 -->
<template>
    <div>
        <h2>
            <i href="javascript:void(0)" class="back-icon bk-icon icon-arrows-left" @click="back"></i>
            结合 vue-i18n@6+ 使用
        </h2>
        <div class="example-item" style="height: 400px">
            <bk-date-picker class="mr15" :type="'datetime'" :open="true" v-model="initDateTime"></bk-date-picker>
            <bk-button type="primary submit" title="切换中英文" @click="handleClick">
                切换中英文
            </bk-button>
            <span class="bk-text-primary">当前为{{curLang === 'zhCN' ? '中文' : '英文'}}</span>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import VueI18n from 'vue-i18n'
    import { bkDatePicker, bkButton, locale, lang } from '{{BASE_LIB_NAME}}'

    Vue.use(VueI18n)

    // 设置 bk-vue-cec 的语言包到 VueI18n 中
    const messages = {
        zhCN: Object.assign(lang.zhCN),
        enUS: Object.assign(lang.enUS)
    }

    // 获取当前的语言
    const curLocale = localStorage.getItem('curLang') || 'zhCN'

    // 实例化 VueI18n 对象
    const i18n = new VueI18n({
        locale: curLocale,
        fallbackLocale: 'zhCN',
        messages,
        missing (locale, path) {
            const parsedPath = i18n._path.parsePath(path)
            return parsedPath[parsedPath.length - 1]
        }
    })

    // 设置 bk-vue-cec 中 i18n 的处理函数，这句的意思是把 bk-vue-cec 中 i18n 的处理设置为 vue-i18n 的处理。
    // 如果和 vue-i18n 一起使用，那么这一句是必须的。
    locale.i18n((key, value) => i18n.t(key, value))

    export default {
        components: {
            bkDatePicker,
            bkButton
        },
        data () {
            return {
                initDateTime: new Date(),
                curLang: ''
            }
        },
        created () {
            // 获取语言标识
            this.curLang = localStorage.getItem('curLang') || 'zhCN'
        },
        methods: {
            back () {
                window.location.href = '#/i18n?anchor=jie-he-vue-i18n-at-6-shi-yong-vue-i18n-example'
            },
            handleClick (event) {
                // 当前为中文时
                if (this.curLang === 'zhCN') {
                    localStorage.setItem('curLang', 'enUS')
                } else { // 当前为英文时
                    localStorage.setItem('curLang', 'zhCN')
                }
                this.$nextTick(() => {
                    window.location.reload()
                })
            }
        }
    }
</script>
```

### 使用 bk-vue-cec 以及 vue-i18n@6+ 来支持业务项目的国际化 {page=#/i18n}

[vue-i18n-custom-example](#/i18n/vue-i18n-custom-example)

```html
<!-- 完整代码 -->
<template>
    <div>
        <h2>
            <i href="javascript:void(0)" class="back-icon bk-icon icon-arrows-left" @click="back"></i>
            使用 bk-vue-cec 以及 vue-i18n@6+ 来支持业务项目的国际化
        </h2>
        <div class="example-item" style="height: 400px">
            <bk-date-picker class="mr15" :type="'datetime'" :open="true" v-model="initDateTime"></bk-date-picker>
            <bk-button type="primary submit" title="切换中英文" @click="handleClick">
                切换中英文
            </bk-button>
            <span class="bk-text-primary">当前为{{curLang === 'zhCN' ? '中文' : '英文'}}</span>
        </div>
        <div class="example-item">
            <div class="bk-text-primary">项目中、非组件内部的文案</div>
            <p class="bk-text-danger">{{t('testName.word1')}}</p>
            <p class="bk-text-danger">{{t('testName.word2', {key1: 'val1', key2: 'val2'})}}</p>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import VueI18n from 'vue-i18n'
    import { bkDatePicker, bkButton, locale, lang } from '{{BASE_LIB_NAME}}'

    Vue.use(VueI18n)

    const cn = {
        testName: {
            word1: '单词1',
            word2: '{key1} 是 {key2}'
        }
    }

    const en = {
        testName: {
            word1: 'word1',
            word2: '{key1} is {key2}'
        }
    }

    // 把自己项目的语言包与 bk-magic 的语言包合并
    const messages = {
        zhCN: Object.assign(lang.zhCN, cn),
        enUS: Object.assign(lang.enUS, en)
    }

    // 获取当前的语言
    const curLocale = localStorage.getItem('curLang') || 'zhCN'

    // 实例化 VueI18n 对象
    const i18n = new VueI18n({
        locale: curLocale,
        fallbackLocale: 'zhCN',
        messages,
        missing (locale, path) {
            const parsedPath = i18n._path.parsePath(path)
            return parsedPath[parsedPath.length - 1]
        }
    })

    // 设置 bk-vue-cec 中 i18n 的处理函数，这句的意思是把 bk-vue-cec 中 i18n 的处理设置为 vue-i18n 的处理。
    // 如果和 vue-i18n 一起使用，那么这一句是必须的。
    locale.i18n((key, value) => i18n.t(key, value))

    export default {
        mixins: [locale.mixin],
        components: {
            bkDatePicker,
            bkButton
        },
        data () {
            return {
                initDateTime: new Date(),
                curLang: ''
            }
        },
        created () {
            // 获取语言标识
            this.curLang = localStorage.getItem('curLang') || 'zhCN'
        },
        methods: {
            back () {
                window.location.href = '#/i18n?anchor=shi-yong-bk-vue-cec-yi-ji-vue-i18n-at-6'
                    + '-lai-zhi-chi-ye-wu-xiang-mu-de-guo-ji-hua-vue-i18n-custom-example'
            },
            handleClick (event) {
                // 当前为中文时
                if (this.curLang === 'zhCN') {
                    localStorage.setItem('curLang', 'enUS')
                } else { // 当前为英文时
                    localStorage.setItem('curLang', 'zhCN')
                }
                this.$nextTick(() => {
                    window.location.reload()
                })
            }
        }
    }
</script>
```

### CDN 使用 {page=#/i18n}

使用 CDN 直接在页面上引入 `bk-vue-cec` 时，国际化本质上是一致的，只是获取 `lang`, `locale` 的方式有一些不一样，其他与上面一致。

```js
// 引入 bk-vue-cec 组件库 bk-vue-cec.min.js 后，页面上会存在 bkMagicVue 全局属性
console.log(window.bkMagicVue)

const bkMagicVue = window.bkMagicVue
const locale = bkMagicVue.locale
const langPkg = bkMagicVue.langPkg
```

### 语言包格式 {page=#/i18n}

这里我们提供英文语言包的示例，可根据此示例来设置新的语言包。

```js
export default {
    bk: {
        // 语言包标识，新建自己的语言包时，这个标识必须设置
        lang: 'en-US',
        datePicker: {
            test: 'we{vari}hello {ccc}!@#$%^&&*({})',
            // 选择日期
            selectDate: 'Select Date',
            selectTime: 'Select Time',
            clear: 'Clear',
            ok: 'OK',
            weekdays: {
                sun: 'Sun',
                mon: 'Mon',
                tue: 'Tue',
                wed: 'Wed',
                thu: 'Thu',
                fri: 'Fri',
                sat: 'Sat'
            },
            hour: 'Hour',
            min: 'Minute',
            sec: 'Second'
        },
        dialog: {
            ok: 'OK',
            cancel: 'CANCEL'
        },
        exception: {
            403: 'Forbidden',
            404: 'Not Found',
            500: 'Internal Server Error...',
            building: 'building...'
        },
        form: {
            validPath: 'Please configure a valid path'
        },
        input: {
            input: 'Please input'
        },
        notify: {
            showMore: 'Show more'
        },
        select: {
            selectAll: 'Select All',
            pleaseselect: 'Please select',
            searchPlaceholder: 'Input keyword to search',
            dataEmpty: 'No options',
            searchEmpty: 'No matched options'
        },
        sideslider: {
            title: 'Title'
        },
        tagInput: {
            placeholder: 'Please input and press ENTER to finish'
        },
        transfer: {
            left: 'Left',
            total: ' (Total {total})',
            addAll: 'Add All',
            emptyContent: 'No Data',
            right: 'Right',
            removeAll: 'Remove All',
            emptySelected: 'No Selected'
        },
        tree: {
            emptyText: 'No Data'
        },
        steps: {
            step1: 'Step1',
            step2: 'Step2',
            step3: 'Step3'
        },
        uploadFile: {
            drag: 'Try dragging an file here or',
            click: 'click to upload',
            uploadDone: 'Upload finished',
            fileExceedMsg: '{fileName} cannot exceed {size} MB',
            invalidFileName: 'FileName is not valid',
            invalidImageFormat: 'Only upload JPG | PNG | JPEG',
            imageExceedMsg: 'Image Size cannot exceed ${imgSize} MB',
            uploadLabel: 'Upload Files'
        },
        navigation: {
            headerTitle: 'Program name'
        },
        searchSelect: {
            placeholder: 'Please enter',
            emptyText: 'Included key worth filtering query must have a value',
            condition: 'Or',
            remoteEmptyText: 'Query no data',
            remoteLoadingText: 'Loading...'
        },
        table: {
            emptyText: 'No Data',
            sumText: 'Summary'
        }
    }
}
```
