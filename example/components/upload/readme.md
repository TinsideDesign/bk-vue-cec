<script>
    import { bkUpload } from '@'

    export default {
        components: {
            bkUpload
        },
        data () {
            return {
                delay: true,
                limit: 2,
                files1: [
                    {
                        name: 'image.png',
                        status: 'done',
                        url: './example/static/images/preview/2.png'
                    }
                ]
            }
        },
        methods: {
            testSuccess (file, fileList) {
                console.log(file, fileList, 'success')
            },
            testProgress (e, file, fileList) {
                console.log(e, file, fileList, 'progress')
            },
            testErr (file, fileList) {
                console.log(file, fileList, 'error')
            },
            testDone (fileList) {
                console.log(fileList, 'done')
            },
            testExceed (file, fileList) {
                this.$bkMessage({
                    theme: 'error',
                    message: `最多上传${this.limit}个文件`,
                    offsetY: 80
                })
            },
            handleRes (response) {
                console.log(response)
                if (response.id) {
                    return true
                }
                return false
            }
        }
    }
</script>

[[toc]]

## Upload 文件上传

### 基础用法 {page=#/upload}

:::demo 上传组件提供图片和文件上传的功能，由 `accept` 属性来定义允许上传的文件类型，默认为 `*`

```html
<template>
    <bk-upload
        :tip="'只允许上传JPG、PNG、JPEG、ZIP的文件'"
        :with-credentials="true"
        :handle-res-code="handleRes"
        @on-success="testSuccess"
        @on-progress="testProgress"
        @on-done="testDone"
        @on-error="testErr"
        :url="'https://jsonplaceholder.typicode.com/posts/'"
    ></bk-upload>
</template>
<script>
    import { bkUpload } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkUpload
        },
        methods: {
            testSuccess (file, fileList) {
                console.log(file, fileList, 'success')
            },
            testProgress (e, file, fileList) {
                console.log(e, file, fileList, 'progress')
            },
            testDone () {
                console.log('done')
            },
            testErr (file, fileList) {
                console.log(file, fileList, 'error')
            },
            handleRes (response) {
                if (response.id) {
                    return true
                }
                return false
            }
        }
    }
</script>
```

:::

### 上传图片 {page=#/upload}

:::demo 配置 accept 属性，限制用户只允许上传 jpg、jpeg、png 格式的图片

```html
<template>
    <bk-upload
        :tip="'只允许上传JPG、PNG、JPEG的文件'"
        :with-credentials="true"
        :handle-res-code="handleRes"
        :url="'https://jsonplaceholder.typicode.com/posts/'"
        :accept="'image/png,image/jpeg,image/jpg'"
    ></bk-upload>
    <br />
</template>
<script>
    import { bkUpload } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkUpload
        },
        methods: {
            handleRes (response) {
                if (response.id) {
                    return true
                }
                return false
            }
        }
    }
</script>
```

:::

### 上传 zip 文件 {page=#/upload}

:::demo 配置 accept 属性，限制用户只允许上传 zip 格式的文件

```html
<template>
    <bk-upload
        :tip="'只允许上传ZIP的文件'"
        :with-credentials="true"
        :handle-res-code="handleRes"
        :url="'https://jsonplaceholder.typicode.com/posts/'"
        :accept="'.zip'"
    ></bk-upload>
</template>
<script>
    import { bkUpload } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkUpload
        },
        methods: {
            handleRes (response) {
                if (response.id) {
                    return true
                }
                return false
            }
        }
    }
</script>
```

:::

### 设置文件大小 {page=#/upload}

:::demo 配置 size 属性，限制上传文件的大小

```html
<template>
    <bk-upload
        :tip="'最大上传5(Mb)的文件'"
        :with-credentials="true"
        :handle-res-code="handleRes"
        :url="'https://jsonplaceholder.typicode.com/posts/'"
        :size="5"
    ></bk-upload>
</template>
<script>
    import { bkUpload } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkUpload
        },
        methods: {
            handleRes (response) {
                if (response.id) {
                    return true
                }
                return false
            }
        }
    }
</script>
```

:::

### 设置上传文件个数 {page=#/upload}

:::demo 配置 limit 属性，设置上传文件个数

```html
<template>
    <bk-upload
        :tip="'最多上传2个文件'"
        :with-credentials="true"
        :handle-res-code="handleRes"
        :url="'https://jsonplaceholder.typicode.com/posts/'"
        :limit="limit"
        @on-exceed="testExceed"
    ></bk-upload>
</template>
<script>
    import { bkUpload } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkUpload
        },
        data () {
            return {
                limit: 2
            }
        },
        methods: {
            handleRes (response) {
                if (response.id) {
                    return true
                }
                return false
            },
            testExceed (file, fileList) {
                this.$bkMessage({
                    theme: 'error',
                    message: `最多上传${this.limit}个文件`,
                    offsetY: 80
                })
            }
        }
    }
</script>
```

:::

### 点击按钮上传 {page=#/upload}

:::demo 设置 theme 属性为 button

```html
<template>
    <bk-upload
        :theme="'button'"
        :tip="'最大上传5(Mb)的文件'"
        :with-credentials="true"
        :handle-res-code="handleRes"
        :url="'https://jsonplaceholder.typicode.com/posts/'"
        :size="5"
    ></bk-upload>
</template>
<script>
    import { bkUpload } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkUpload
        },
        methods: {
            handleRes (response) {
                if (response.id) {
                    return true
                }
                return false
            }
        }
    }
</script>
```

:::

### 照片墙 {page=#/upload}

:::demo 设置 theme 属性为 picture，限制文件类型为图片类型，比如：png，jpeg，jpg

```html
<template>
    <bk-upload
        :theme="'picture'"
        :with-credentials="true"
        :handle-res-code="handleRes"
        :url="'https://jsonplaceholder.typicode.com/posts/'"
    ></bk-upload>
</template>
<script>
    import { bkUpload } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkUpload
        },
        methods: {
            handleRes (response) {
                if (response.id) {
                    return true
                }
                return false
            }
        }
    }
</script>
```

:::

### 头像上传 {page=#/upload}

:::demo 设置 theme 属性为 picture，multiple 属性设置为 false，并限制文件类型为图片类型，比如：png，jpeg，jpg

```html
<template>
    <bk-upload
        :theme="'picture'"
        :multiple="false"
        :with-credentials="true"
        :handle-res-code="handleRes"
        :url="'https://jsonplaceholder.typicode.com/posts/'"
    ></bk-upload>
</template>
<script>
    import { bkUpload } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkUpload
        },
        methods: {
            handleRes (response) {
                if (response.id) {
                    return true
                }
                return false
            }
        }
    }
</script>
```

:::

### 编辑头像 {page=#/upload}

:::demo files填入已经上传过的图片

```html
<template>
    <bk-upload
        :files="files1"
        :theme="'picture'"
        :multiple="false"
        :with-credentials="true"
        :handle-res-code="handleRes"
        :url="'https://jsonplaceholder.typicode.com/posts/'"
    ></bk-upload>
</template>
<script>
    import { bkUpload } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkUpload
        },
        data () {
            return {
                files1: [
                    {
                        name: 'image.png',
                        status: 'done',
                        url: './example/static/images/preview/2.png'
                    }
                ]
            }
        },
        methods: {
            handleRes (response) {
                if (response.id) {
                    return true
                }
                return false
            }
        }
    }
</script>
```

:::

### 属性 {page=#/upload}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| theme| 上传组件类型 | String | 支持拖拽和点击(draggable)、按钮(button)、图片卡片(picture) | 'draggable' |
| accept | 可选的文件类型。theme为 picture时且accept没有配置时，可接受文件文类型为：'image/png,image/jpeg,image/jpg'。 | String | 参考 [input 元素的 accept 属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept)，尽量使用文件扩展名 | —— |
| url | 服务器地址（必传） | String | —— | 0 |
| header | 请求头 `{ name: " ", value: " " }` | Array,Object | —— | —— |
| handle-res-code | 处理返回码的函数，默认参数 response，需要返回 true 或 false | Function | —— | true |
| multiple | 是否支持多选 | Boolean | `true` / `false` | true |
| name | 后台读取文件的 key | String | —— | 'upload_file' |
| size | 限制上传文件体积 `{ maxFileSize: 1, maxImgSize: 1 }`| Number, Object| —— | 5(MB) |
| limit | 限制上传文件个数| Number | —— | —— |
| form-data-attributes | 自定义上传属性 | `Array | [{ name: 'attrName', value: Object }]` | —— | —— |
| with-credentials | 是否允许带上 cookie | Boolean | —— | false |
| tip | 提示信息 | String | —— | —— |
| delay-time | 上传完毕后列表消失时间 | Number | -- | 0 |
| validate-name | 用来验证文件名是否合法的 | RegExp | -- | -- |
| custom-request | 覆盖默认的上传行为，自定义上传的实现 | Function | -- | -- |
| ext-cls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `.bk-upload` 上 | String | —— | —— |
| files | 默认图片 | Array | —— | —— |

### 事件 {page=#/upload}
| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| on-done | 所有文件上传完毕后的事件 | fileList |
| on-progress | 文件上传进行时的事件 | e, file，fileList |
| on-success | 文件上传成功后的事件 | file，fileList |
| on-error | 文件上传失败后的事件 | file，fileList |
| on-exceed | 文件上传个数超出限制后的事件 | file，fileList |
| on-delete | 文件上传成功后，点击删除文件触发的事件 | file（删除的哪个文件对象），fileList（删除后的文件列表） |
