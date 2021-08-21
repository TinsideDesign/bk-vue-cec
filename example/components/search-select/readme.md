<script>
    import { bkSearchSelect } from '@'
    export default {
        name: 'demo',
        components: {
            bkSearchSelect
        },
        data () {
            return {
                data: [
                    {
                        name: '实例状态',
                        id: '1',
                        remote: true,
                        multiable: true,
                        children: [
                            {
                                name: '创建中',
                                id: '1-2'
                            },
                            {
                                name: '运行中',
                                id: '1-3'
                            },
                            {
                                name: '已关机',
                                id: '1-4'
                            }
                        ]
                    },
                    {
                        name: '实例业务',
                        id: '2',
                        remote: true,
                        children: [
                            {
                                name: '王者荣耀',
                                id: '2-1'
                            },
                            {
                                name: '刺激战场',
                                id: '2-2'
                            },
                            {
                                name: '绝地求生',
                                id: '2-3'
                            }
                        ]
                    },
                    {
                        name: 'IP地址',
                        id: '3',
                    },
                    {
                        name: '实例名',
                        id: '4'
                    },
                    {
                        name: '实例地址',
                        id: '5'
                    },
                    {
                        name: '使用率',
                        id: '6',
                        conditions:[
                            {
                                name:'>',
                                id:'>'
                            },
                            {
                                name:'>=',
                                id:'>='
                            },
                            {
                                name:'<=',
                                id:'<='
                            },
                            {
                                name:'<',
                                id:'<'
                            },
                            {
                                name:'=',
                                id:'='
                            }
                        ]
                    }
                ],
                data2: [
                    {
                        name: '实例状态',
                        id: '1',
                        remote: true,
                        multiable: true,
                        children: [
                            {
                                name: '创建中',
                                id: '1-2'
                            },
                            {
                                name: '运行中',
                                id: '1-3'
                            },
                            {
                                name: '已关机',
                                id: '1-4'
                            }
                        ]
                    },
                    {
                        name: '实例业务',
                        id: '2',
                        children: [
                            {
                                name: '王者荣耀',
                                id: '2-1'
                            },
                            {
                                name: '刺激战场',
                                id: '2-2'
                            },
                            {
                                name: '绝地求生',
                                id: '2-3'
                            }
                        ],
                        conditions:[
                            {
                                name:'>',
                                id:'>'
                            },
                            {
                                name:'>=',
                                id:'>='
                            },
                            {
                                name:'<=',
                                id:'<='
                            },
                            {
                                name:'<',
                                id:'<'
                            },
                            {
                                name:'=',
                                id:'='
                            }
                        ]
                    },
                    {
                        name: 'IP地址',
                        id: '3',
                    },
                    {
                        name: '实例名',
                        id: '4'
                    },
                    {
                        name: '实例地址',
                        id: '5'
                    },
                    {
                        name: '使用率',
                        id: '6',
                        conditions:[
                            {
                                name:'>',
                                id:'>'
                            },
                            {
                                name:'>=',
                                id:'>='
                            },
                            {
                                name:'<=',
                                id:'<='
                            },
                            {
                                name:'<',
                                id:'<'
                            },
                            {
                                name:'=',
                                id:'='
                            }
                        ]
                    }
                ],
                demo1: {
                    value: [{ name: 'hello world' }]
                },
                demo2: {
                    value: [{ name: 'hello world' }]
                },
                demo3: {
                    value: [],
                    remoteData: [
                        {
                            name: '远程数据一',
                            id: '3'
                        },
                        {
                            name: '远程数据二',
                            id: '4'
                        },
                        {
                            name: '远程数据三',
                            id: '5'
                        },
                        {
                            name: '远程数据四',
                            id: '6'
                        }
                    ]
                },
                demo4: {
                    value: [{ 'name': '测试一' }, { 'name': '测试二' }]
                },
                demo5: {
                    value: []
                },
                demo6: {
                    value: [
                        {
                            name: '功能组件，用于将搜索查询项集中在一个选择器中，搜索查询更加便捷、简单功能组件，用于将搜索查询项集中在一个选择器中，搜索查询更加便捷、简单功能组件，用于将搜索查询项集中在一个选择器中，搜索查询更加便捷、简单功能组件，用于将搜索查询项集中在一个选择器中，搜索查询更加便捷、简单功能组件，用于将搜索查询项集中在一个选择器中，搜索查询更加便捷、简单功能组件，用于将搜索查询项集中在一个选择器中，搜索查询更加便捷、简单功能组件，用于将搜索查询项集中在一个选择器中，搜索查询更加便捷、简单'
                        },
                        {
                            name: '功能组件，用于将搜索查询项集中在一个选'
                        },
                        {
                            name: '当前配置 readonly 属性，只读'
                        }
                    ]
                },
                demo7: {
                    data: [
                        {
                            name: 'IP',
                            id: 'ip',
                            placeholder: '请输入格式xxx.xxx.xxx',
                            multiable: true,
                            validate (values, item) {
                                const validate = (values || []).reduce((ret, cur) => {
                                    ret = ret && /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(cur.name)
                                    return ret
                                }, true)

                                return !validate ? '格式错误: 请输入正确的IP格式' : true
                            },
                            children: [
                                {
                                    name: '10.1.0.11',
                                    id: '10.1.0.11'
                                },
                                {
                                    name: '192.10.23.123',
                                    id: '192.10.23.123'
                                },
                                {
                                    name: '192.10.23.12',
                                    id: '192.10.23.12'
                                }
                            ]
                        },
                        {
                            name: '告警级别',
                            id: 'level',
                            placeholder: '格式：0，1，2',
                            validate (v, item) {
                                const validate = (v || []).reduce((ret, cur) => {
                                    ret = ret && /^[0-2]$/.test(cur.name)
                                    return ret
                                }, true)
                                return !validate ? '格式错误: 请输入0, 1, 2' : true
                            }
                        },
                        {
                            name: '告警状态',
                            id: 'status',
                            placeholder: '格式：未恢复，已关闭，已恢复',
                            validate (v, item) {
                                const validate = (v || []).reduce((ret, cur) => {
                                    ret = ret && /^(未恢复|已关闭|已恢复)$/.test(cur.name)
                                    return ret
                                }, true)
                                return !validate ? '格式错误: 请输入 未恢复，已关闭，已恢复' : true
                            },
                            children: [
                                {
                                    name: '未恢复',
                                    id: '未恢复'
                                },
                                {
                                    name: '已关闭',
                                    id: '已关闭'
                                },
                                {
                                    name: '已恢复',
                                    id: '已恢复'
                                }
                            ]
                        }
                    ],
                    values: []
                }
            }
        },
        methods: {
            handleFilterMenuMethod (list, filter) {
                return list.filter(item => item.name.includes(filter))
            },
            handleFilterChildeMenuMethod (list, filter) {
                return list.filter(item => item.name.includes(filter))
            },
            handleRemoteMethod (filter) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(this.demo3.remoteData)
                    }, 1000)
                })
                // return this.demo3.remoteData
            }
        }
    }
</script>

[[toc]]

## SearchSelect 查询选择器
功能组件，用于将搜索查询项集中在一个选择器中，搜索查询更加便捷、简单

### 基础使用 {page=#/searchselect}
::: demo 基础使用

``` html
<template>
    <div>
        <bk-search-select clearable :show-popover-tag-change="true" :data="data" v-model="demo1.value"></bk-search-select>
    </div>
</template>

<script>
    import { bkSearchSelect } from '{{BASE_LIB_NAME}}'

    export default {
        name: 'demo',
        components: {
            bkSearchSelect
        },
        data () {
            return {
                data: [
                    {
                        name: '实例状态',
                        id: '1',
                        multiable: true,
                        children: [
                            {
                                name: '创建中',
                                id: '1-2'
                            },
                            {
                                name: '运行中',
                                id: '1-3'
                            },
                            {
                                name: '已关机',
                                id: '1-4'
                            }
                        ]
                    },
                    {
                        name: '实例业务',
                        id: '2',
                        children: [
                            {
                                name: '王者荣耀',
                                id: '2-1'
                            },
                            {
                                name: '刺激战场',
                                id: '2-2'
                            },
                            {
                                name: '绝地求生',
                                id: '2-3'
                            }
                        ]
                    },
                    {
                        name: 'IP地址',
                        id: '3'
                    },
                    {
                        name: '实例名',
                        id: '4'
                    },
                    {
                        name: '实例地址',
                        id: '5'
                    },
                    {
                        name: '测试六',
                        id: '6'
                    }
                ],
                demo1: {
                    value: [{ name: 'hello world' }]
                }
            }
        },
        methods: {
        }
    }
 </script>


```

:::

### 自定义过滤列表 {page=#/searchselect}
::: demo 自定义过滤列表

``` html
<template>
    <div>
        <bk-search-select
            :data="data"
            v-model="demo2.value"
            filter
            :filter-children-method="handleFilterChildeMenuMethod"
            :filter-menu-method="handleFilterMenuMethod"></bk-search-select>
    </div>
</template>

<script>
    import { bkSearchSelect } from '{{BASE_LIB_NAME}}'

    export default {
        name: 'demo',
        components: {
            bkSearchSelect
        },
        data () {
            return {
                data: [
                    {
                        name: '实例状态',
                        id: '1',
                        multiable: true,
                        children: [
                            {
                                name: '创建中',
                                id: '1-2'
                            },
                            {
                                name: '运行中',
                                id: '1-3'
                            },
                            {
                                name: '已关机',
                                id: '1-4'
                            }
                        ]
                    },
                    {
                        name: '实例业务',
                        id: '2',
                        children: [
                            {
                                name: '王者荣耀',
                                id: '2-1'
                            },
                            {
                                name: '刺激战场',
                                id: '2-2'
                            },
                            {
                                name: '绝地求生',
                                id: '2-3'
                            }
                        ]
                    },
                    {
                        name: 'IP地址',
                        id: '3'
                    },
                    {
                        name: '实例名',
                        id: '4'
                    },
                    {
                        name: '实例地址',
                        id: '5'
                    },
                    {
                        name: '测试六',
                        id: '6'
                    }
                ],
                demo2: {
                    value: [{ name: 'hello world' }]
                }
            }
        },
        methods: {
            handleFilterMenuMethod (list, filter) {
                return list.filter(item => item.name.includes(filter))
            },
            handleFilterChildeMenuMethod (list, filter) {
                return list.filter(item => item.name.includes(filter))
            }
        }
    }

</script>


```

:::

### 远程加载列表 {page=#/searchselect}
::: demo 远程加载列表

``` html
<template>
    <div>
        <bk-search-select
            :data="data"
            v-model="demo3.value"
            :remote-method="handleRemoteMethod"
        ></bk-search-select>
    </div>
</template>

 <script>
    import { bkSearchSelect } from '{{BASE_LIB_NAME}}'

    export default {
        name: 'demo',
        components: {
            bkSearchSelect
        },
        data () {
            return {
                data: [
                    {
                        name: '实例状态',
                        id: '1',
                        remote: true,
                        multiable: true,
                        children: [
                            {
                                name: '创建中',
                                id: '1-2'
                            },
                            {
                                name: '运行中',
                                id: '1-3'
                            },
                            {
                                name: '已关机',
                                id: '1-4'
                            }
                        ]
                    },
                    {
                        name: '实例业务',
                        id: '2',
                        remote: true,
                        children: [
                            {
                                name: '王者荣耀',
                                id: '2-1'
                            },
                            {
                                name: '刺激战场',
                                id: '2-2'
                            },
                            {
                                name: '绝地求生',
                                id: '2-3'
                            }
                        ]
                    },
                    {
                        name: 'IP地址',
                        id: '3',
                        remote: false,
                    },
                    {
                        name: '实例名',
                        id: '4',
                        remote: false,
                    },
                    {
                        name: '实例地址',
                        id: '5'
                    },
                    {
                        name: '测试六',
                        id: '6'
                    }
                ],
                demo3: {
                    value: [],
                    remoteData: [
                        {
                            name: '远程数据一',
                            id: '3'
                        },
                        {
                            name: '远程数据二',
                            id: '4'
                        },
                        {
                            name: '远程数据三',
                            id: '5'
                        },
                        {
                            name: '远程数据四',
                            id: '6'
                        }
                    ]
                }
            }
        },
        methods: {
            handleRemoteMethod (filter) {
                return  this.demo3.remoteData

                // return new Promise((resolve) => {
                //     setTimeout(() => {
                //         resolve(this.demo3.remoteData)
                //     }, 3000)
                // })
            }
        }
    }
</script>


```

:::

### 多选子列表 {page=#/searchselect}
::: demo 多选子列表

``` html
<template>
    <div>
        <bk-search-select
            :data="data"
            v-model="demo4.value"
        ></bk-search-select>
    </div>
</template>

<script>
    import { bkSearchSelect } from '{{BASE_LIB_NAME}}'

    export default {
        name: 'demo',
        components: {
            bkSearchSelect
        },
        data () {
            return {
                data: [
                    {
                        name: '实例状态',
                        id: '1',
                        multiable: true,
                        children: [
                            {
                                name: '创建中',
                                id: '1-2'
                            },
                            {
                                name: '运行中',
                                id: '1-3'
                            },
                            {
                                name: '已关机',
                                id: '1-4'
                            }
                        ]
                    },
                    {
                        name: '实例业务',
                        id: '2',
                        children: [
                            {
                                name: '王者荣耀',
                                id: '2-1'
                            },
                            {
                                name: '刺激战场',
                                id: '2-2'
                            },
                            {
                                name: '绝地求生',
                                id: '2-3'
                            }
                        ]
                    },
                    {
                        name: 'IP地址',
                        id: '3'
                    },
                    {
                        name: '实例名',
                        id: '4'
                    },
                    {
                        name: '实例地址',
                        id: '5'
                    },
                    {
                        name: '测试六',
                        id: '6'
                    }
                ],
                demo4: {
                    value: []
                }
            }
        },
        methods: {

        }
    }
</script>


```

:::

### 配置子项搜索条件 {page=#/searchselect}
::: demo 配置子项搜索条件 此功能与multiable是互斥的 如果同时配置则multiable的权重将更大

``` html
<template>
    <div>
        <bk-search-select
            :data="data2"
            v-model="demo5.value"
        ></bk-search-select>
    </div>
</template>

<script>
    import { bkSearchSelect } from '{{BASE_LIB_NAME}}'

    export default {
        name: 'demo',
        components: {
            bkSearchSelect
        },
        data () {
            return {
                data2: [
                    {
                        name: '实例状态',
                        id: '1',
                        multiable: true,
                        children: [
                            {
                                name: '创建中',
                                id: '1-2'
                            },
                            {
                                name: '运行中',
                                id: '1-3'
                            },
                            {
                                name: '已关机',
                                id: '1-4'
                            }
                        ]
                    },
                    {
                        name: '实例业务',
                        id: '2',
                        multiable: true,
                        children: [
                            {
                                name: '王者荣耀',
                                id: '2-1'
                            },
                            {
                                name: '刺激战场',
                                id: '2-2'
                            },
                            {
                                name: '绝地求生',
                                id: '2-3'
                            }
                        ],
                        conditions:[
                            {
                                name:'>',
                                id:'>'
                            },
                            {
                                name:'>=',
                                id:'>='
                            },
                            {
                                name:'<=',
                                id:'<='
                            },
                            {
                                name:'<',
                                id:'<'
                            },
                            {
                                name:'=',
                                id:'='
                            }
                        ]
                    },
                    {
                        name: 'IP地址',
                        id: '3',
                    },
                    {
                        name: '实例名',
                        id: '4'
                    },
                    {
                        name: '实例地址',
                        id: '5'
                    },
                    {
                        name: '使用率',
                        id: '6',
                        conditions:[
                            {
                                name:'>',
                                id:'>'
                            },
                            {
                                name:'>=',
                                id:'>='
                            },
                            {
                                name:'<=',
                                id:'<='
                            },
                            {
                                name:'<',
                                id:'<'
                            },
                            {
                                name:'=',
                                id:'='
                            }
                        ]
                    }
                ],
                demo5: {
                    value: []
                }
            }
        },
        methods: {

        }
    }
</script>


```

:::
### 配置子项校验及自定义placeholder提示 {page=#/searchselect}
::: demo 配置子项校验及自定义placeholder提示，校验的信息既可以通过validate函数返回也可以通过validate-message属性传入或者通过validate插槽设置

``` html
<template>
    <div>
        <bk-search-select
            :data="demo7.data"
            v-model="demo7.values">
        </bk-search-select>
    </div>
</template>

<script>
    import { bkSearchSelect } from '{{BASE_LIB_NAME}}'
    export default {
        name: 'demo',
        components: {
            bkSearchSelect
        },
        data () {
            return {
                demo7: {
                    data: [
                        {
                            name: 'IP',
                            id: 'ip',
                            placeholder: '请输入格式xxx.xxx.xxx',
                            multiable: true,
                            validate (values, item) {
                                const validate = (values || []).reduce((ret, cur) => {
                                    ret = ret && /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(cur.name)
                                    return ret
                                }, true)
                                return !validate ? '格式错误: 请输入正确的IP格式' : true
                            },
                            children: [
                                {
                                    name: '10.1.0.11',
                                    id: '10.1.0.11'
                                },
                                {
                                    name: '192.10.23.123',
                                    id: '192.10.23.123'
                                },
                                {
                                    name: '192.10.23.12',
                                    id: '192.10.23.12'
                                }
                            ]
                        },
                        {
                            name: '告警级别',
                            id: 'status',
                            placeholder: '格式：0，1，2',
                            validate (v, item) {
                                console.info(v, item)
                                const validate = (v || []).reduce((ret, cur) => {
                                    ret = ret && /^[0-2]$/.test(cur.name)
                                    return ret
                                }, true)
                                return !validate ? '格式错误: 请输入0, 1, 2' : true
                            }
                        },
                        {
                            name: '告警状态',
                            id: 'status',
                            placeholder: '格式：未恢复，已关闭，已恢复',
                            validate (v, item) {
                                const validate = (v || []).reduce((ret, cur) => {
                                    ret = ret && /^(未恢复|已关闭|已恢复)$/.test(cur.name)
                                    return ret
                                }, true)
                                return !validate ? '格式错误: 请输入 未恢复，已关闭，已恢复' : true
                            },
                            children: [
                                {
                                    name: '未恢复',
                                    id: '未恢复'
                                },
                                {
                                    name: '已关闭',
                                    id: '已关闭'
                                },
                                {
                                    name: '已恢复',
                                    id: '已恢复'
                                }
                            ]
                        }
                    ],
                    values: []
                }
            }
        }
    }
 </script>


```

:::
### 配置其他属性 {page=#/searchselect}
::: demo 配置其他属性

``` html
<template>
    <div>
        <bk-search-select readonly default-focus :wrap-zindex='100' :data="data" v-model="demo6.value"></bk-search-select>
    </div>
</template>

<script>
    import { bkSearchSelect } from '{{BASE_LIB_NAME}}'

    export default {
        name: 'demo-6',
        components: {
            bkSearchSelect
        },
        data () {
            return {
                data: [
                    {
                        name: '实例状态',
                        id: '1',
                        multiable: true,
                        children: [
                            {
                                name: '创建中',
                                id: '1-2'
                            },
                            {
                                name: '运行中',
                                id: '1-3'
                            },
                            {
                                name: '已关机',
                                id: '1-4'
                            }
                        ]
                    },
                    {
                        name: '实例业务',
                        id: '2',
                        children: [
                            {
                                name: '王者荣耀',
                                id: '2-1'
                            },
                            {
                                name: '刺激战场',
                                id: '2-2'
                            },
                            {
                                name: '绝地求生',
                                id: '2-3'
                            }
                        ]
                    },
                    {
                        name: 'IP地址',
                        id: '3'
                    },
                    {
                        name: '实例名',
                        id: '4'
                    },
                    {
                        name: '实例地址',
                        id: '5'
                    },
                    {
                        name: '测试六',
                        id: '6'
                    }
                ],
                demo6: {
                    value: [
                        {
                            name: '功能组件，用于将搜索查询项集中在一个选择器中，搜索查询更加便捷、简单功能组件，用于将搜索查询项集中在一个选择器中，搜索查询更加便捷、简单功能组件，用于将搜索查询项集中在一个选择器中，搜索查询更加便捷、简单功能组件，用于将搜索查询项集中在一个选择器中，搜索查询更加便捷、简单功能组件，用于将搜索查询项集中在一个选择器中，搜索查询更加便捷、简单功能组件，用于将搜索查询项集中在一个选择器中，搜索查询更加便捷、简单功能组件，用于将搜索查询项集中在一个选择器中，搜索查询更加便捷、简单'
                        },
                        {
                            name: '功能组件，用于将搜索查询项集中在一个选'
                        },
                        {
                            name: '当前配置 readonly 属性，只读'
                        }
                    ]
                }
            }
        },
        methods: {

        }
    }
 </script>
```

:::

### 属性 {page=#/searchselect}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| data | 显示的数据 | Array | —— | —— |
| values | 选择中查询条件 支持v-model | Array | —— | —— |
| split-code | 查询条件分隔符 | String | —— | `|` |
| explain-code | 查询条件解释符 | String | —— | 空格 |
| placeholder | 输入框空白提示 | String | —— | 请输入 |
| empty-text | 包含键值得过滤查询查询时为空的提示 | String | —— | 包含键值得过滤查询必须有一个值 |
| max-height | 最大高度 | Number | —— | 120 |
| min-height | 最小高度 | Number | —— | 32 |
| strink | 当输入条件过多超出input最小值时是否伸缩input框 | Boolean | —— | true |
| show-delay | 列表弹窗动画延时时间 | Number | —— | 100 |
| display-key | 显示的字段名称 | String | —— | name |
| primary-key | 项目的唯一id字段名称 | String | —— | id |
| condition | 查询条件的其他关系值 | Object | —— | `{ name: '或'}` |
| filter | 是否过滤 | Boolean | —— | false |
| filter-children-method | 自定义过滤子列表的方法 | Function | —— | —— |
| filter-menu-method | 自定义过滤父列表的方法 | Function | —— | —— |
| remote-method | 自定义异步获取子列表的方法（必须有返回值，可返回 Promise 或者直接返回数据） | Function | —— | —— |
| remote-empty-text | 自定义异步获取子列表为空显示 | String | —— | 暂无数据 |
| remote-loading-text | 自定义异步获取子列表时loading显示 | String | —— | 加载中。。。 |
| show-condition | 是否显示条件选择 （或） | Boolean | —— | true |
| key-delay | 监听输入和过滤的延时间隔 | Number | —— | 300 |
| readonly | 是否只读 | Boolean | —— | false |
| wrap-zindex | 设置组件的层级高度 | Number、String | —— | 9 |
| popover-zindex | 设置下拉列表的层级高度 | Number | —— | 999 |
| default-focus | 组件初始化时是否获取焦点 | Boolean | —— | false |
| show-popover-tag-change | 生成或者删除标签时是否显示一级子列表 | Boolean | —— | true |
| input-type | 输入框类型 | String | text/number | text |
| clearable | 是否允许清空 | Boolean | —— | false |
| validate-message | 校验提示文本 | String | —— | '' |
| ext-cls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `.search-select-wrap` 上 | String | —— | —— |

### 事件 {page=#/searchselect}
| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| show-menu | 父列表显示时触发的事件 | menuInstance |
| input-change | 当用户输入时触发的事件 | event |
| input-cut | 当用户剪切内容时触发的事件 | event |
| input-click | 当用户点击input时触发的事件 | event |
| input-focus | 当单元格获取焦点时触发该事件 | event |
| menu-select | 当选择父列表项时触发该事件 | item, index |
| menu-child-select | 当选择子列表项时触发该事件 | item, index |
| change | 当输入内容发生变化时触发该事件 | list |
| key-delete | 当用户键入delete删除时会触发该事件  | item |
| key-enter | 当用户键入enter时会触发该事件 | event |
| child-checked | 当用户选中子项时触发该事件 | item, index, next |
| clear | 当用户点击清空时触发该事件 | event |
| search | 当用户点击搜索图标时触发该事件 | event |

### 方法 {page=#/searchselect}
| 方法名 | 说明 | 参数 |
|------|------|------|
| getMenuInstance | 获取menu实例方法 | —— |
| getChildMenuInstance | 获取子列表实例方法 | —— |
| getInputInstance | 获取input框实例 | —— |


### 插槽 {page=#/searchselect}
| 插槽名 | 说明 | 参数 |
|------|------|------|
| prefix | 输入框前插槽 | —— |
| nextfix | 输入框后插槽 | —— |
| validate | 输入校验提示插槽 | —— |
