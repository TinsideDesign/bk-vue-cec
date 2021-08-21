[[toc]]

## 自定义配置

本节介绍如何自定义设置组件命名空间及默认属性

### 设置命名空间(namespace) {page=#/config}

全局引入时设置命名空间, 所有组件的前缀都将被更改:
```js
    import Vue from 'vue'
    import bkVueCec from '{{BASE_LIB_NAME}}'

    Vue.use(bkVueCec, {
        namespace: 'custom'
    })
```
统一设置时，使用方法如下:
```html
    <!-- 命名空间为"custom" -->
    <custom-button></custom-button>
    <custom-input></custom-input>
```


按需引入时设置命名空间, 可对不同的组件设置不同的命名空间
```js
    import Vue from 'vue'
    import { bkButton, bkInput } from '{{BASE_LIB_NAME}}'

    Vue.use(bkButton, {
        namespace: 'my'
    })
    Vue.use(bkInput, {
        namespace: 'his'
    })
```

独立设置时，使用方法如下:
```html
    <!-- 命名空间为"my" -->
    <my-button></my-button>

    <!-- 命名空间为"his" -->
    <his-input></his-input>
```

### 设置默认属性 {page=#/config}

全局引入
```js
    import Vue from 'vue'
    import bkVueCec from '{{BASE_LIB_NAME}}'

    Vue.use(bkVueCec, {
        'bk-button': {
            theme: 'primary'
        },
        'bk-input': {
            clearable: true
        }
    })
```
上述配置将更改button组件的默认主题为primary、默认开启input的可清除功能


按需引入
```js
    import Vue from 'vue'
    import { bkButton, bkInput } from '{{BASE_LIB_NAME}}'

    Vue.use(bkButton, {
        theme: 'primary'
    })
    Vue.use(bkInput, {
        clearable: true
    })
```
上述配置后的表现与全局引入具有相同的效果
