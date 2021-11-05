<script>
    import { bkException, bkButton } from '@'

    export default {
        components: {
            bkException,
            bkButton
        },
        data() {
            return {
                isGray: false
            }
        }
    }
</script>
<style>
.exception-wrap {
    display: flex;
    flex-wrap: wrap;
}
.exception-wrap .exception-wrap-item {
    border: 1px solid #DCDEE5;
    margin: 10px;
    height: 420px;
    padding-top: 22px;
}
.exception-wrap-item.exception-part   {
    height: 260px;
    padding-top: 48px;
    flex: 1;
}
.exception-wrap-item.exception-gray {
    background-color: #F5F6FA;
}
.exception-wrap .exception-wrap-item .text-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #006DFF;
    font-size: 14px;
    margin-top: 12px;
}
.exception-wrap .exception-wrap-item .text-wrap.text-part {
    font-size: 12px;
    margin-top: 10px;
}
.exception-wrap .exception-wrap-item .text-subtitle {
    color: #979BA5;
    font-size: 14px;
    text-align: center;
    margin-top: 14px;
}
.text-wrap .text-btn {
    margin: 0 10px;
}
.text-wrap .text-btn:hover {
    cursor: pointer;
}
</style>

[[toc]]

## Exception 异常提示

### 基础用法 {page=#/exception}

:::demo 配置 `type` 为异常类型 `403`、`404`、`500`、`building`、`empty`、`search-empty`，也可以不配置，默认为 `404`

```html
<template>
    <div class="exception-wrap">
        <bk-exception class="exception-wrap-item" type="404">
            <span>页面不存在</span>
            <div class="text-wrap">
                <span class="text-btn">刷新页面</span>
                <span class="text-btn">返回首页</span>
            </div>
        </bk-exception>
        <bk-exception class="exception-wrap-item" type="building">
            <span>功能建设中</span>
            <div class="text-wrap">
                <span class="text-btn">返回首页</span>
            </div>
        </bk-exception>
        <bk-exception class="exception-wrap-item" type="403">
            <span>无业务权限</span>
            <div class="text-subtitle">你没有相应业务的访问权限，请前往申请相关业务权限</div>
            <div class="text-wrap">
                <span class="text-btn">去申请</span>
            </div>
        </bk-exception>
        <bk-exception class="exception-wrap-item" type="500">
            <span>拉取用户配置数据失败</span>
            <div class="text-wrap">
                <span class="text-btn">重新获取</span>
            </div>
        </bk-exception>
         <bk-exception class="exception-wrap-item" type="login">
            <span>请登入T-inside</span>
             <div class="text-wrap">
                <bk-button theme="primary" class="text-btn">登入</bk-button>
            </div>
        </bk-exception>
    </div>
</template>
<script>
    import { bkException, bkButton } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkException,
            bkButton
        }
    }
</script>
<style>
.exception-wrap .exception-wrap-item {
    border: 1px solid #DCDEE5;
    margin: 10px;
    height: 420px;
    padding-top: 22px;
}
.exception-wrap .exception-wrap-item .text-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #006DFF;
    font-size: 14px;
    margin-top: 12px;
}
.exception-wrap .exception-wrap-item .text-subtitle {
    color: #979BA5;
    font-size: 14px;
    text-align: center;
    margin-top: 14px;
}
.text-wrap .text-btn {
    margin: 0 5px;
}
.text-wrap .text-btn:hover {
    cursor: pointer;
}
</style>
```
:::

### 局部异常提示 {page=#/exception}

:::demo 配置 `scene` 为使用场景为 `part`

```html
<template>
    <div><bk-button theme="primary" @click="isGray = !isGray">切换{{!isGray ? '灰色' : '白色'}}背景</bk-button></div>
     <div class="exception-wrap">
        <bk-exception class="exception-wrap-item exception-part" type="403" scene="part" :class="{'exception-gray': isGray}">
            <span>没有权限</span>
            <div class="text-wrap text-part">
                <span class="text-btn">去申请</span>
            </div>
        </bk-exception>
        <bk-exception class="exception-wrap-item exception-part" type="empty" scene="part" :class="{'exception-gray': isGray}"> </bk-exception>
    </div>
    <div class="exception-wrap">
        <bk-exception class="exception-wrap-item exception-part" type="500" scene="part" :class="{'exception-gray': isGray}"> </bk-exception>
        <bk-exception class="exception-wrap-item exception-part" type="search-empty" scene="part" :class="{'exception-gray': isGray}"> </bk-exception>
    </div>
</template>
<script>
    import { bkException } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkException
        },
        data() {
            return {
                isGray: false
            }
        }
    }
</script>
<style>
.exception-wrap {
    display: flex;
    flex-wrap: wrap;
}
.exception-wrap .exception-wrap-item {
    border: 1px solid #DCDEE5;
    margin: 10px;
    height: 420px;
    padding-top: 22px;
}
.exception-wrap-item.exception-part   {
    height: 260px;
    padding-top: 48px;
    flex: 1;
}
.exception-wrap-item.exception-gray {
    background-color: #F5F6FA;
}
.exception-wrap .exception-wrap-item .text-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #006DFF;
    font-size: 14px;
    margin-top: 12px;
}
.exception-wrap .exception-wrap-item .text-wrap.text-part {
    font-size: 12px;
    margin-top: 10px;
}
.exception-wrap .exception-wrap-item .text-subtitle {
    color: #979BA5;
    font-size: 14px;
    text-align: center;
    margin-top: 14px;
}
.text-wrap .text-btn {
    margin: 0 10px;
}
.text-wrap .text-btn:hover {
    cursor: pointer;
}
</style>
```
:::

### 属性 {page=#/exception}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| type | 异常类型 | String / Number | `403`、`404`、`500`、`building`、`empty`、`search-empty`  | `404` |
| scene | 使用场景 | String | `page`（页面）、`part`（局部） | `page` |
| ext-cls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `.bk-exception` 上 | String | —— | —— |
