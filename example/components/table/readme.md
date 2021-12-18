<script>
    import Vue from 'vue'
    import { bkTable, bkTableColumn, bkButton, bkInput, bkTooltips, bkTableSettingContent, bkPopover } from '@'

    Vue.use(bkTooltips)

    export default {
        components: {
            bkTable,
            bkTableColumn,
            bkButton,
            bkInput,
            bkTableSettingContent,
            bkPopover
        },
        data () {
            const settingFields = [{
                id: 'ip',
                label: '名称/内网IP',
                disabled: true
            }, {
                id: 'source',
                label: '来源'
            }, {
                id: 'status',
                label: '状态'
            }, {
                id: 'create_time',
                label: '创建时间'
            }, {
                id: 'desc',
                label: '描述'
            }]
            return {
                bottomLoadingOptions: {
                    size: 'small',
                    isLoading: false
                },
                size: 'small',
                sourceFilters: [{ text: 'QQ', value: 'QQ' }, { text: '微信', value: '微信' }],
                statusFilters: [{ text: '正常', value: '正常' }, { text: '创建中', value: '创建中' }],
                data: [
                    {
                        ip: '192.168.0.1',
                        source: 'QQ',
                        status: '创建中',
                        create_time: '2018-05-25 15:02:24',
                        children: [
                            {
                                name: '用户管理',
                                count: '23',
                                creator: 'person2',
                                create_time: '2017-10-10 11:12',
                                desc: '用户管理'
                            },
                            {
                                name: '模块管理',
                                count: '2',
                                creator: 'person1',
                                create_time: '2017-10-10 11:12',
                                desc: '无数据测试'
                            }
                        ]
                    },
                    {
                        ip: '192.168.0.2,192.168.0.27,192.168.0.22,192.168.0.23,192.168.0.212,192.168.0.213.192.168.0.214,192.168.0.215,192.168.0.216',
                        source: '微信',
                        status: '正常',
                        create_time: '2018-05-25 15:02:24',
                        children: [
                            {
                                name: '用户管理',
                                count: '23',
                                creator: 'person2',
                                create_time: '2017-10-10 11:12',
                                desc: '用户管理'
                            },
                            {
                                name: '模块管理',
                                count: '2',
                                creator: 'person1',
                                create_time: '2017-10-10 11:12',
                                desc: '无数据测试'
                            }
                        ]
                    },
                    {
                        ip: '192.168.0.3',
                        source: 'QQ',
                        status: '创建中',
                        create_time: '2018-05-25 15:02:24',
                        children: [
                            {
                                name: '用户管理',
                                count: '23',
                                creator: 'person2',
                                create_time: '2017-10-10 11:12',
                                desc: '用户管理'
                            },
                            {
                                name: '模块管理',
                                count: '2',
                                creator: 'person1',
                                create_time: '2017-10-10 11:12',
                                desc: '无数据测试'
                            }
                        ]
                    }
                ],
                tableData: [
                    {
                        ip: '192.168.0.1',
                        source: 'QQ',
                        status: '创建中',
                        create_time: '2018-05-25 15:02:24'
                    },
                    {
                        ip: '192.168.0.2',
                        source: '微信',
                        status: '正常',
                        create_time: '2018-05-25 15:02:24'
                    },
                    {
                        ip: '192.168.0.2',
                        source: '微信',
                        status: '正常',
                        create_time: '2018-05-25 15:02:24'
                    },
                    {
                        ip: '192.168.0.2',
                        source: '微信',
                        status: '正常',
                        create_time: '2018-05-25 15:02:24'
                    },
                    {
                        ip: '192.168.0.2',
                        source: '微信',
                        status: '正常',
                        create_time: '2018-05-25 15:02:24'
                    },
                    {
                        ip: '192.168.0.2',
                        source: '微信',
                        status: '正常',
                        create_time: '2018-05-25 15:02:24'
                    },
                    {
                        ip: '192.168.0.2',
                        source: '微信',
                        status: '正常',
                        create_time: '2018-05-25 15:02:24'
                    },
                    {
                        ip: '192.168.0.2',
                        source: '微信',
                        status: '正常',
                        create_time: '2018-05-25 15:02:24'
                    },
                    {
                        ip: '192.168.0.2',
                        source: '微信',
                        status: '正常',
                        create_time: '2018-05-25 15:02:24'
                    },
                    {
                        ip: '192.168.0.3',
                        source: 'QQ',
                        status: '创建中',
                        create_time: '2018-05-25 15:02:24'
                    }
                ],
                longData: new Array(100).fill('').map((item, index) => ({
                    ip: '192.168.0.1',
                    source: 'QQ' + index,
                    status: '创建中',
                    create_time: '2018-05-25 15:02:24',
                    desc: 'Table 的高度，默认为自动高度。如果 height 为 Number 类型，单位 px；如果 height 为 String 类型，则这个高度会设置为 Table 的 style.height 的值，Table 的高度会受控于外部样式。'
                })),
                pagination: {
                    current: 1,
                    count: 500,
                    limit: 20
                },
                setting: {
                    max: 3,
                    fields: settingFields,
                    selectedFields: settingFields.slice(0, 4),
                    size: 'small'
                }
            }
        },
        methods: {
            handleScrollToBottom() {
                this.bottomLoadingOptions.isLoading = true
                    setTimeout(() => {
                        this.tableData = this.tableData.concat(this.tableData)
                        this.bottomLoadingOptions.isLoading = false
                }, 2000)
            },
            clearSort(){
                this.$refs.table.clearSort()
            },
            clearFilter(){
                this.$refs.table.clearFilter()
            },
            handlePageLimitChange () {
                console.log('handlePageLimitChange', arguments)
            },
            toggleTableSize () {
                const size = ['small', 'medium', 'large']
                const index = (size.indexOf(this.size) + 1) % 3
                this.size = size[index]
            },
            handlePageChange (page) {
                this.pagination.current = page
            },
            remove (row) {
                const index = this.data.indexOf(row)
                if (index !== -1) {
                    this.data.splice(index, 1)
                }
            },
            reset (row) {
                row.status = '创建中'
            },
            renderHeader (h, data) {
                const directive = {
                    name: 'bkTooltips',
                    content: '指定对标题或者专有词汇的补充说明，并可以说明“禁止”“注意”等要求性文字',
                    placement: 'right'
                }
                return <a class="custom-header-cell" v-bk-tooltips={ directive }>{ data.column.label }</a>
            },
            handleRowMouseEnter (index) {
                console.info(`进入行：${index}`)
            },
            handleRowMouseLeave (index) {
                console.info(`退出行：${index}`)
            },
            handleSettingChange ({ fields, size }) {
                this.setting.size = size
                this.setting.selectedFields = fields
            },
            sourceFilterMethod(value, row, column) {
                const property = column.property
                return row[property] === value
            },
            statusFilterMethod(value, row, column) {
                const property = column.property
                return row[property] === value
            }
        }
    }
</script>

<style lang="postcss">
    .bk-table-header .custom-header-cell {
        color: inherit;
        text-decoration: underline;
        text-decoration-style: dashed;
        text-underline-position: under;
    }
    .dot-menu {
        display: inline-block;
        vertical-align: middle;
    }

    .tippy-tooltip.dot-menu-theme {
        padding: 0;
    }
    .dot-menu-trigger {
        display: block;
        width: 30px;
        height: 30px;
        line-height: 30px;
        border-radius: 50%;
        text-align: center;
        font-size: 0;
        cursor: pointer;
    }
    .dot-menu-trigger:hover {
        color: #006DFF;
        background-color: #DCDEE5;
    }
    .dot-menu-trigger:before {
        content: "";
        display: inline-block;
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background-color: currentColor;
        box-shadow: 0 -4px 0 currentColor, 0 4px 0 currentColor;
    }
    .dot-menu-list {
        margin: 0;
        padding: 5px 0;
        min-width: 50px;
        list-style: none;
    }
    .dot-menu-list .dot-menu-item {
        padding: 0 10px;
        font-size: 12px;
        line-height: 26px;
        cursor: pointer;
        &:hover {
            background-color: #eaf3ff;
            color: #006DFF;
        }
    }
</style>

[[toc]]

## Table 表格

用于各种数据展示的表格

### 基础表格 {page=#/table}

:::demo

```html
<template>
    <div>
        <div>
            <bk-button theme="primary" @click="toggleTableSize">修改size</bk-button>
            <span class="ml10">当前尺寸：{{size}}</span>
        </div>
        <div class="mt10 f12">Table 的尺寸, 可用于控制表格显示文本的最大行数——small(1行) / medium(2行) / large(3行)。</div>
        <bk-table style="margin-top: 15px;"
            :data="data"
            :size="size"
            :pagination="pagination"
            @row-mouse-enter="handleRowMouseEnter"
            @row-mouse-leave="handleRowMouseLeave"
            @page-change="handlePageChange"
            @page-limit-change="handlePageLimitChange">
            <bk-table-column type="selection" width="60"></bk-table-column>
            <bk-table-column type="index" label="序列" width="60"></bk-table-column>
            <bk-table-column label="名称/内网IP" prop="ip"></bk-table-column>
            <bk-table-column label="来源" prop="source"></bk-table-column>
            <bk-table-column label="状态" prop="status"></bk-table-column>
            <bk-table-column label="创建时间" prop="create_time" ></bk-table-column>
            <bk-table-column label="操作" width="150">
                <template slot-scope="props">
                    <bk-button class="mr10" theme="primary" text :disabled="props.row.status === '创建中'" @click="reset(props.row)">重置</bk-button>
                    <bk-button class="mr10" theme="primary" text @click="remove(props.row)">移除</bk-button>
                    <bk-popover class="dot-menu" placement="bottom-start" theme="dot-menu light" trigger="click" :arrow="false" offset="15" :distance="0">
                        <span class="dot-menu-trigger"></span>
                        <ul class="dot-menu-list" slot="content">
                            <li class="dot-menu-item">导入</li>
                            <li class="dot-menu-item">导出</li>
                        </ul>
                    </bk-popover>
                </template>
            </bk-table-column>
        </bk-table>
    </div>
</template>
<script>
    import { bkTable, bkTableColumn, bkButton, bkPopover } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTable,
            bkTableColumn,
            bkButton,
            bkPopover
        },
        data () {
            return {
                size: 'small',
                data: [
                    {
                        ip: '192.168.0.1',
                        source: 'QQ',
                        status: '创建中',
                        create_time: '2018-05-25 15:02:24',
                        children: [
                            {
                                name: '用户管理',
                                count: '23',
                                creator: 'person2',
                                create_time: '2017-10-10 11:12',
                                desc: '用户管理'
                            },
                            {
                                name: '模块管理',
                                count: '2',
                                creator: 'person1',
                                create_time: '2017-10-10 11:12',
                                desc: '无数据测试'
                            }
                        ]
                    },
                    {
                        ip: '192.168.0.2',
                        source: '微信',
                        status: '正常',
                        create_time: '2018-05-25 15:02:24',
                        children: [
                            {
                                name: '用户管理',
                                count: '23',
                                creator: 'person2',
                                create_time: '2017-10-10 11:12',
                                desc: '用户管理'
                            },
                            {
                                name: '模块管理',
                                count: '2',
                                creator: 'person1',
                                create_time: '2017-10-10 11:12',
                                desc: '无数据测试'
                            }
                        ]
                    },
                    {
                        ip: '192.168.0.3',
                        source: 'QQ',
                        status: '创建中',
                        create_time: '2018-05-25 15:02:24',
                        children: [
                            {
                                name: '用户管理',
                                count: '23',
                                creator: 'person2',
                                create_time: '2017-10-10 11:12',
                                desc: '用户管理'
                            },
                            {
                                name: '模块管理',
                                count: '2',
                                creator: 'person1',
                                create_time: '2017-10-10 11:12',
                                desc: '无数据测试'
                            }
                        ]
                    }
                ],
                pagination: {
                    current: 1,
                    count: 500,
                    limit: 20
                }
            }
        },
        methods: {
            handlePageLimitChange () {
                console.log('handlePageLimitChange', arguments)
            },
            toggleTableSize () {
                const size = ['small', 'medium', 'large']
                const index = (size.indexOf(this.size) + 1) % 3
                this.size = size[index]
            },
            handlePageChange (page) {
                this.pagination.current = page
            }
        }
    }
</script>

<style>
    .dot-menu {
        display: inline-block;
        vertical-align: middle;
    }

    .tippy-tooltip.dot-menu-theme {
        padding: 0;
    }
    .dot-menu-trigger {
        display: block;
        width: 30px;
        height: 30px;
        line-height: 30px;
        border-radius: 50%;
        text-align: center;
        font-size: 0;
        cursor: pointer;
    }
    .dot-menu-trigger:hover {
        color: #006DFF;
        background-color: #DCDEE5;
    }
    .dot-menu-trigger:before {
        content: "";
        display: inline-block;
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background-color: currentColor;
        box-shadow: 0 -4px 0 currentColor, 0 4px 0 currentColor;
    }
    .dot-menu-list {
        margin: 0;
        padding: 5px 0;
        min-width: 50px;
        list-style: none;
    }
    .dot-menu-list .dot-menu-item {
        padding: 0 10px;
        font-size: 12px;
        line-height: 26px;
        cursor: pointer;
        &:hover {
            background-color: #eaf3ff;
            color: #006DFF;
        }
    }
</style>
```
:::

### 折叠功能 {page=#/table}

:::demo

```html
<template>
    <bk-table
        :data="data"
        :size="size"
        :pagination="pagination"
        @page-change="handlePageChange">
        <bk-table-column type="expand" width="30">
            <template slot-scope="props">
                <bk-table :data="props.row.children" :outer-border="false" :header-cell-style="{background: '#fff', borderRight: 'none'}">
                    <bk-table-column type="selection" width="50"></bk-table-column>
                    <bk-table-column prop="name" label="任务名称"></bk-table-column>
                    <bk-table-column prop="count" label="节点数量"></bk-table-column>
                    <bk-table-column prop="creator" label="创建人"></bk-table-column>
                    <bk-table-column prop="create_time" label="创建时间"></bk-table-column>
                    <bk-table-column prop="desc" label="描述"></bk-table-column>
                </bk-table>
            </template>
        </bk-table-column>
        <bk-table-column type="index" label="序列" width="60"></bk-table-column>
        <bk-table-column label="名称/内网IP" prop="ip"></bk-table-column>
        <bk-table-column label="来源" prop="source"></bk-table-column>
        <bk-table-column label="状态" prop="status"></bk-table-column>
        <bk-table-column label="创建时间" prop="create_time" ></bk-table-column>
        <bk-table-column label="操作" width="150">
            <template slot-scope="props">
                <bk-button class="mr10" theme="primary" text :disabled="props.row.status === '创建中'" @click="reset(props.row)">重置</bk-button>
                <bk-button class="mr10" theme="primary" text @click="remove(props.row)">移除</bk-button>
            </template>
        </bk-table-column>
    </bk-table>
</template>
<script>
    import { bkTable, bkTableColumn, bkButton } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTable,
            bkTableColumn,
            bkButton
        },
        data () {
            return {
                size: 'small',
                data: [
                    {
                        ip: '192.168.0.1',
                        source: 'QQ',
                        status: '创建中',
                        create_time: '2018-05-25 15:02:24',
                        children: [
                            {
                                name: '用户管理',
                                count: '23',
                                creator: 'person2',
                                create_time: '2017-10-10 11:12',
                                desc: '用户管理'
                            },
                            {
                                name: '模块管理',
                                count: '2',
                                creator: 'person1',
                                create_time: '2017-10-10 11:12',
                                desc: '无数据测试'
                            }
                        ]
                    },
                    {
                        ip: '192.168.0.2',
                        source: '微信',
                        status: '正常',
                        create_time: '2018-05-25 15:02:24',
                        children: [
                            {
                                name: '用户管理',
                                count: '23',
                                creator: 'person2',
                                create_time: '2017-10-10 11:12',
                                desc: '用户管理'
                            },
                            {
                                name: '模块管理',
                                count: '2',
                                creator: 'person1',
                                create_time: '2017-10-10 11:12',
                                desc: '无数据测试'
                            }
                        ]
                    },
                    {
                        ip: '192.168.0.3',
                        source: 'QQ',
                        status: '创建中',
                        create_time: '2018-05-25 15:02:24',
                        children: [
                            {
                                name: '用户管理',
                                count: '23',
                                creator: 'person2',
                                create_time: '2017-10-10 11:12',
                                desc: '用户管理'
                            },
                            {
                                name: '模块管理',
                                count: '2',
                                creator: 'person1',
                                create_time: '2017-10-10 11:12',
                                desc: '无数据测试'
                            }
                        ]
                    }
                ],
                pagination: {
                    current: 1,
                    count: 500,
                    limit: 15
                }
            }
        },
        methods: {
            handlePageChange (page) {
                this.pagination.current = page
            },
            remove (row) {
                const index = this.data.indexOf(row)
                if (index !== -1) {
                    this.data.splice(index, 1)
                }
            },
            reset (row) {
                row.status = '创建中'
            }
        }
    }
</script>
```
:::

### 线性表格 {page=#/table}

:::demo

```html
<template>
    <div>
        <bk-table
            :data="data"
            :size="size"
            :outer-border="false"
            :header-border="false"
            :header-cell-style="{background: '#fff'}"
            :pagination="pagination"
            @page-change="handlePageChange">
            <bk-table-column type="selection" width="60"></bk-table-column>
            <bk-table-column type="index" label="序列" width="60"></bk-table-column>
            <bk-table-column label="名称/内网IP" prop="ip" :render-header="renderHeader"></bk-table-column>
            <bk-table-column label="来源" prop="source"></bk-table-column>
            <bk-table-column label="状态" prop="status"></bk-table-column>
            <bk-table-column label="创建时间" prop="create_time" ></bk-table-column>
            <bk-table-column label="操作" width="150">
                <template slot-scope="props">
                    <bk-button class="mr10" theme="primary" text :disabled="props.row.status === '创建中'" @click="reset(props.row)">重置</bk-button>
                    <bk-button class="mr10" theme="primary" text @click="remove(props.row)">移除</bk-button>
                </template>
            </bk-table-column>
        </bk-table>
    </div>
</template>
<script>
    import Vue from 'vue'
    import { bkTable, bkTableColumn, bkButton, bkInput, bkTooltips } from '{{BASE_LIB_NAME}}'

    Vue.use(bkTooltips)

    export default {
        components: {
            bkTable,
            bkTableColumn,
            bkButton,
            bkInput
        },
        data () {
            return {
                size: 'small',
                data: [
                    {
                        ip: '192.168.0.1',
                        source: 'QQ',
                        status: '创建中',
                        create_time: '2018-05-25 15:02:24',
                        children: [
                            {
                                name: '用户管理',
                                count: '23',
                                creator: 'person2',
                                create_time: '2017-10-10 11:12',
                                desc: '用户管理'
                            },
                            {
                                name: '模块管理',
                                count: '2',
                                creator: 'person1',
                                create_time: '2017-10-10 11:12',
                                desc: '无数据测试'
                            }
                        ]
                    },
                    {
                        ip: '192.168.0.2',
                        source: '微信',
                        status: '正常',
                        create_time: '2018-05-25 15:02:24',
                        children: [
                            {
                                name: '用户管理',
                                count: '23',
                                creator: 'person2',
                                create_time: '2017-10-10 11:12',
                                desc: '用户管理'
                            },
                            {
                                name: '模块管理',
                                count: '2',
                                creator: 'person1',
                                create_time: '2017-10-10 11:12',
                                desc: '无数据测试'
                            }
                        ]
                    },
                    {
                        ip: '192.168.0.3',
                        source: 'QQ',
                        status: '创建中',
                        create_time: '2018-05-25 15:02:24',
                        children: [
                            {
                                name: '用户管理',
                                count: '23',
                                creator: 'person2',
                                create_time: '2017-10-10 11:12',
                                desc: '用户管理'
                            },
                            {
                                name: '模块管理',
                                count: '2',
                                creator: 'person1',
                                create_time: '2017-10-10 11:12',
                                desc: '无数据测试'
                            }
                        ]
                    }
                ],
                pagination: {
                    current: 1,
                    count: 500,
                    limit: 15
                }
            }
        },
        methods: {
            handlePageChange (page) {
                this.pagination.current = page
            },
            remove (row) {
                const index = this.data.indexOf(row)
                if (index !== -1) {
                    this.data.splice(index, 1)
                }
            },
            reset (row) {
                row.status = '创建中'
            },
            renderHeader (h, data) {
                const directive = {
                    name: 'bkTooltips',
                    content: '指定对标题或者专有词汇的补充说明，并可以说明“禁止”“注意”等要求性文字',
                    placement: 'right'
                }
                return <a class="custom-header-cell" v-bk-tooltips={ directive }>{ data.column.label }</a>
            }
        }
    }
</script>
<style lang="postcss">
    .bk-table-header .custom-header-cell {
        color: inherit;
        text-decoration: underline;
        text-decoration-style: dashed;
        text-underline-position: under;
    }
</style>
```
:::


### 设置功能 {page=#/table}

:::demo 通过配置`bk-table-column`的`type`属性为`setting`即可开启此功能，组件内置了一个默认设置内容`bk-table-setting-content`

```html
<template>
    <div>
        <bk-table style="margin-top: 15px;"
            :data="data"
            :size="setting.size">
            <bk-table-column
                v-for="field in setting.selectedFields"
                :key="field.id"
                :label="field.label"
                :prop="field.id">
            </bk-table-column>
            <bk-table-column type="setting">
                <bk-table-setting-content
                    :fields="setting.fields"
                    :selected="setting.selectedFields"
                    :max="setting.max"
                    :size="setting.size"
                    @setting-change="handleSettingChange">
                </bk-table-setting-content>
            </bk-table-column>
        </bk-table>
    </div>
</template>
<script>
    import { bkTable, bkTableColumn, bkTableSettingContent } from '{{BASE_LIB_NAME}}'

    export default {
        components: {
            bkTable,
            bkTableColumn,
            bkTableSettingContent
        },
        data () {
            const fields = [{
                id: 'ip',
                label: '名称/内网IP',
                disabled: true
            }, {
                id: 'source',
                label: '来源'
            }, {
                id: 'status',
                label: '状态'
            }, {
                id: 'create_time',
                label: '创建时间'
            }]
            return {
                data: [{
                        ip: '192.168.0.1',
                        source: 'QQ',
                        status: '创建中',
                        create_time: '2018-05-25 15:02:24',
                    }, {
                        ip: '192.168.0.2',
                        source: '微信',
                        status: '正常',
                        create_time: '2018-05-25 15:02:24'
                    }, {
                        ip: '192.168.0.3',
                        source: 'QQ',
                        status: '创建中',
                        create_time: '2018-05-25 15:02:24'
                    }
                ],
                setting: {
                    max: 3,
                    fields: settingFields,
                    selectedFields: settingFields.slice(0, 4),
                    size: 'small'
                }
            }
        },
        methods: {
            handleSettingChange ({ fields, size }) {
                this.setting.size = size
                this.setting.selectedFields = fields
            }
        }
    }
</script>
```
:::

### 筛序与排序 {page=#/table}

:::demo 配置`bk-table-column`的`filters`属性启用排序功能，配置`bk-table-column`的`sortable`属性启用排序功能

```html

<template>
    <div>
        <div class="mb10">
            <bk-button @click="clearSort">清空排序条件</bk-button>
            <bk-button @click="clearFilter">清空过滤条件</bk-button>
        </div>
        <bk-table :data="data" ref="table">
            <bk-table-column type="selection" width="60"></bk-table-column>
            <bk-table-column label="名称/内网IP" prop="ip" sortable></bk-table-column>
            <bk-table-column label="来源" prop="source"
                             :filters="sourceFilters"
                             :filter-method="sourceFilterMethod"
                             :filter-multiple="false">
            </bk-table-column>
            <bk-table-column label="状态" prop="status"
                             :filters="statusFilters"
                             :filter-method="statusFilterMethod"
                             :filter-multiple="true">
            </bk-table-column>
            <bk-table-column label="创建时间" prop="create_time"></bk-table-column>
        </bk-table>
    </div>
</template>
<script>
import { bkTable, bkTableColumn, bkButton } from '{{BASE_LIB_NAME}}'
export default {
    components: {
        bkTable,
        bkTableColumn,
        bkButton
    },
    data () {
        return {
            sourceFilters: [{ text: 'QQ', value: 'QQ' }, { text: '微信', value: '微信' }],
            statusFilters: [{ text: '正常', value: '正常' }, { text: '创建中', value: '创建中' }],
            data: [
                {
                    ip: '192.168.0.1',
                    source: 'QQ',
                    status: '创建中',
                    create_time: '2018-05-25 15:02:24',
                    children: [
                        {
                            name: '用户管理',
                            count: '23',
                            creator: 'person2',
                            create_time: '2017-10-10 11:12',
                            desc: '用户管理'
                        },
                        {
                            name: '模块管理',
                            count: '2',
                            creator: 'person1',
                            create_time: '2017-10-10 11:12',
                            desc: '无数据测试'
                        }
                    ]
                },
                {
                    ip: '192.168.0.2',
                    source: '微信',
                    status: '正常',
                    create_time: '2018-05-25 15:02:24',
                    children: [
                        {
                            name: '用户管理',
                            count: '23',
                            creator: 'person2',
                            create_time: '2017-10-10 11:12',
                            desc: '用户管理'
                        },
                        {
                            name: '模块管理',
                            count: '2',
                            creator: 'person1',
                            create_time: '2017-10-10 11:12',
                            desc: '无数据测试'
                        }
                    ]
                },
                {
                    ip: '192.168.0.3',
                    source: 'QQ',
                    status: '创建中',
                    create_time: '2018-05-25 15:02:24',
                    children: [
                        {
                            name: '用户管理',
                            count: '23',
                            creator: 'person2',
                            create_time: '2017-10-10 11:12',
                            desc: '用户管理'
                        },
                        {
                            name: '模块管理',
                            count: '2',
                            creator: 'person1',
                            create_time: '2017-10-10 11:12',
                            desc: '无数据测试'
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        clearSort () {
            this.$refs.table.clearSort()
        },
        clearFilter () {
            this.$refs.table.clearFilter()
        },
        sourceFilterMethod (value, row, column) {
            const property = column.property
            return row[property] === value
        },
        statusFilterMethod (value, row, column) {
            const property = column.property
            return row[property] === value
        }
    }
}
</script>
<script>
import BkButton from './button';
export default {
    components: { BkButton }
};
</script>
```
:::


### 虚拟滚动渲染配置 {page=#/table}

:::demo 通过配置`bk-table`的`virtual-render`属性开启内置虚拟滚动

```html
<template>
    <div>
        <bk-table style="margin-top: 15px;"
            :data="longData"
            :virtual-render="true"
            height="200px">
            <bk-table-column
                v-for="field in setting.fields"
                :key="field.id"
                :label="field.label"
                :prop="field.id">
            </bk-table-column>
        </bk-table>
    </div>
</template>
<script>
    import { bkTable, bkTableColumn, bkTableSettingContent } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkTable,
            bkTableColumn,
            bkTableSettingContent
        },
        data () {
            return {
                longData: new Array(100).fill('').map((item, index) => ({
                    ip: '192.168.0.1',
                    source: 'QQ' + index,
                    status: '创建中',
                    create_time: '2018-05-25 15:02:24',
                    desc: 'Table 的高度，默认为自动高度。如果 height 为 Number 类型，单位 px；如果 height 为 String 类型，则这个高度会设置为 Table 的 style.height 的值，Table 的高度会受控于外部样式。'
                })),
                setting: {
                    max: 3,
                    fields: settingFields,
                    selectedFields: settingFields.slice(0, 3),
                    size: 'small'
                    fields: [{
                                id: 'ip',
                                label: '名称/内网IP',
                                disabled: true
                            }, {
                                id: 'source',
                                label: '来源'
                            }, {
                                id: 'status',
                                label: '状态'
                            }, {
                                id: 'create_time',
                                label: '创建时间'
                            }, {
                                id: 'desc',
                                label: '描述'
                            }]
                }
            }
        }
    }
</script>
```
:::

### 底部加载 {page=#/table}

:::demo 配置`scroll-loading`属性设置表格底部加载样式，结合`scroll-end`监听表格滚动至底部事件进行分页加载

```html

<template>
    <div>
        <bk-table
            :data="tableData"
            :max-height="220"
            :scroll-loading="bottomLoadingOptions"
            ref="table"
            @scroll-end="handleScrollToBottom">
            <bk-table-column label="名称/内网IP" prop="ip"></bk-table-column>
            <bk-table-column label="来源" prop="source"></bk-table-column>
            <bk-table-column label="状态" prop="status"></bk-table-column>
            <bk-table-column label="创建时间" prop="create_time"></bk-table-column>
        </bk-table>
    </div>
</template>
<script>
    import {
        bkTable,
        bkTableColumn
    } from '{{BASE_LIB_NAME}}'
    export default {
        components: {
            bkTable,
            bkTableColumn
        },
        data() {
            return {
                bottomLoadingOptions: {
                    size: 'small',
                    isLoading: false
                },
                tableData: [{
                        ip: '192.168.0.1',
                        source: 'QQ',
                        status: '创建中',
                        create_time: '2018-05-25 15:02:24'
                    },
                    {
                        ip: '192.168.0.2',
                        source: '微信',
                        status: '正常',
                        create_time: '2018-05-25 15:02:24'
                    },
                    {
                        ip: '192.168.0.2',
                        source: '微信',
                        status: '正常',
                        create_time: '2018-05-25 15:02:24'
                    },
                    {
                        ip: '192.168.0.2',
                        source: '微信',
                        status: '正常',
                        create_time: '2018-05-25 15:02:24'
                    },
                    {
                        ip: '192.168.0.2',
                        source: '微信',
                        status: '正常',
                        create_time: '2018-05-25 15:02:24'
                    },
                    {
                        ip: '192.168.0.2',
                        source: '微信',
                        status: '正常',
                        create_time: '2018-05-25 15:02:24'
                    },
                    {
                        ip: '192.168.0.2',
                        source: '微信',
                        status: '正常',
                        create_time: '2018-05-25 15:02:24'
                    },
                    {
                        ip: '192.168.0.2',
                        source: '微信',
                        status: '正常',
                        create_time: '2018-05-25 15:02:24'
                    },
                    {
                        ip: '192.168.0.2',
                        source: '微信',
                        status: '正常',
                        create_time: '2018-05-25 15:02:24'
                    },
                    {
                        ip: '192.168.0.3',
                        source: 'QQ',
                        status: '创建中',
                        create_time: '2018-05-25 15:02:24'
                    }
                ]
            }
        },
        methods: {
            handleScrollToBottom() {
                this.bottomLoadingOptions.isLoading = true
                setTimeout(() => {
                    this.tableData = this.tableData.concat(this.tableData)
                    this.bottomLoadingOptions.isLoading = false
                }, 2000)
            }
        }
    }
</script>
```
:::

### bk-table 属性 {page=#/table}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| data | 显示的数据 | Array | —— | —— |
| height | Table 的高度，默认为自动高度。如果 height 为 Number 类型，单位 px；如果 height 为 String 类型，则这个高度会设置为 Table 的 style.height 的值，Table 的高度会受控于外部样式。 | String/Number | —— | —— |
| max-height | Table 的最大高度 | String / Number | —— | —— |
| stripe | 是否为斑马纹 Table | Boolean | —— | false |
| border | 是否带有边框 | Boolean | —— | false |
| outer-border | 是否带有外边框 | Boolean | —— | false |
| row-border | 是否带有横向边框, 当 border 为 true 时，此属性设置无效 | Boolean | —— | true |
| col-border | 是否带有纵向边框, 当 border 为 true 时，此属性设置无效 | Boolean | —— | false |
| size | Table 的尺寸, 用于控制表格显示文本的最大行数 | String | small(1行) / medium(2行) / large(3行) | small |
| fit | 列的宽度是否自动撑开 | Boolean | —— | true |
| show-header | 是否显示表头 | Boolean | —— | true |
| highlight-current-row | 是否高亮当前行 | Boolean | —— | false |
| row-class-name | 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className | `Function({row, rowIndex}) / String` | —— | —— |
| row-style | 行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style | `Function({row, rowIndex}) / Object` | —— | —— |
| cell-class-name | 单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className | `Function({row, column, rowIndex, columnIndex}) / String` | —— | —— |
| cell-style | 单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style | `Function({row, column, rowIndex, columnIndex}) / Object` | —— | —— |
| cell-attributes | 单元格的 DOM 原生属性 | `Function({ rowIndex, cellIndex, row, column }) / Object` | —— | —— |
| header-border | 表头是否带有边框分割 | Boolean | —— | false |
| header-row-class-name | 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className | `Function({row, rowIndex}) / String` | —— | —— |
| header-row-style | 表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style | `Function({row, rowIndex}) / Object` | —— | —— |
| header-cell-class-name | 表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className | `Function({row, column, rowIndex, columnIndex}) / String` | —— | —— |
| header-cell-style | 表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style | `Function({row, column, rowIndex, columnIndex}) / Object` | —— | —— |
| header-cell-attributes | 表头单元格的 DOM 原生属性 | `Function({rowIndex, cellIndex, columns, column}) / Object` | —— | —— |
| row-key | 行数据的 Key，用来优化 Table 的渲染；在使用 reserve-selection 功能的情况下，该属性是必填的。类型为 String 时，支持多层访问：user.info.id，但不支持 user.info[0].id，此种情况请使用 Function | `Function(row) / String` | —— | —— |
| empty-text | 空数据时显示的文本内容，也可以通过 slot="empty" 设置 | String | —— | 暂无数据 |
| default-expand-all | 是否默认展开所有行，当 Table 中存在 type="expand" 的 Column 的时候有效 | Boolean | —— | false |
| expand-row-keys | 可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组 | Array | —— | —— |
| default-sort | 默认的排序列的 prop 和顺序。它的 prop 属性指定默认的排序的列，order指定默认排序的顺序 | Object | `order`:ascending,descending | 如果只指定了 prop, 没有指定 order, 则默认顺序是 ascending |
| show-summary | 是否在表尾显示合计行 | Boolean | —— | false |
| sum-text | 合计行第一列的文本 | String | —— | 合计 |
| summary-method | 自定义的合计计算方法 | Function({ columns, data }) | —— | —— |
| span-method | 合并行或列的计算方法 | `Function({ row, column, rowIndex, columnIndex })` | —— | —— |
| select-on-indeterminate | 在多选表格中，当仅有部分行被选中时，点击表头的多选框时的行为。若为 true，则选中所有行；若为 false，则取消选择所有行 | Boolean | —— | true |
| pagination | Table 的分页。`current` 属性表示当前页码,`count` 属性表示数据总量 | Object | —— | —— |
| auto-scroll-to-top | Table 分页变化时，表格是否自动滚动到顶部 | Boolean | —— | false |
| scroll-loading | 表格底部loading加载效果，可以配合表格scroll-end事件使用，它的值同v-bkloading相同 | Object | —— | `{ isLoading: false }` |
| ext-cls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `.bk-table` 上 | String | —— | —— |
| virtual-render | 内置的虚拟滚动配置 | Boolean, Object | false / true / { virtual-render 配置 } | false |

### virtual-render 配置 {page=#/table}
`virtual-render`支持简单配置 `true / false` 直接启用 / 禁用，如果需要进一步配置更多，请参考下面配置说明

`因为虚拟滚动需要根据lineHeight计算行高和渲染区域内的行数据，目前只支持每行行高固定的场景，所以针对内部折叠的Table目前无法支持虚拟滚动`

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| disabled | 是否禁用 | Boolean | true / false | undefined |
| height | 虚拟滚动区域高度，如果 height 为 Number 类型，单位 px；如果 height 为 String 类型，则这个高度会设置为 style.height 的值 | String / Number | —— | table.body.height |
| width | 虚拟滚动区域宽度，如果 width 为 Number 类型，单位 px；如果 width 为 String 类型，则这个高度会设置为 style.width 的值 | String / Number | —— | table.body.width |
| lineHeight | 虚拟滚动区域每行高度，如果 lineHeight 为 Number 类型，单位 px；如果 lineHeight 为 String 类型，则这个高度会设置为 style.height 的值 | String / Number | —— | table.body.row.height |

### bk-table 事件 {page=#/table}
| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| select | 当用户手动勾选数据行的 Checkbox 时触发的事件 | selection, row |
| select-all | 当用户手动勾选全选 Checkbox 时触发的事件 | selection |
| selection-change | 当选择项发生变化时会触发该事件 | selection |
| cell-mouse-enter | 当单元格 hover 进入时会触发该事件 | row, column, cell, event |
| cell-mouse-leave | 当单元格 hover 退出时会触发该事件 | row, column, cell, event |
| row-mouse-enter | 当表格行 hover 进入时会触发该事件 | index, row, event |
| row-mouse-leave | 当表格行 hover 退出时会触发该事件 | index, row, event |
| cell-click | 当某个单元格被点击时会触发该事件 | row, column, cell, event, rowIndex, columnIndex |
| cell-dblclick | 当某个单元格被双击击时会触发该事件  | row, column, cell, event, rowIndex, columnIndex |
| cell-contextmenu | 当某个单元格被鼠标右键点击时会触发该事件 | row, column, cell, event, rowIndex, columnIndex |
| row-click | 当某一行被点击时会触发该事件 | row, event, column, rowIndex, columnIndex |
| row-contextmenu | 当某一行被鼠标右键点击时会触发该事件 | row, event, column, rowIndex, columnIndex |
| row-dblclick | 当某一行被双击时会触发该事件 | row, event, column, rowIndex, columnIndex |
| header-click | 当某一列的表头被点击时会触发该事件 | column, event |
| header-contextmenu | 当某一列的表头被鼠标右键点击时触发该事件 | column, event |
| sort-change | 当表格的排序条件发生变化的时候会触发该事件 | `{ column, prop, order }` |
| filter-change | 当表格的筛选条件发生变化的时候会触发该事件，参数的值是一个对象，对象的 key 是 column 的 columnKey，对应的 value 为用户选择的筛选条件的数组。 | filters |
| current-change | 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性 | currentRow, oldCurrentRow |
| header-dragend | 当拖动表头改变了列的宽度的时候会触发该事件 | newWidth, oldWidth, column, event |
| expand-change | 当用户对某一行展开或者关闭的时候会触发该事件 | row, expandedRows |
| page-change | 当用户切换表格分页时会触发的事件 | newPage |
| page-limit-change | 当用户切换表格每页显示条数时会出发的事件 | limit |
| scroll-end | 当表格滚动到底部时触发该事件 | —— |

### bk-table 方法 {page=#/table}
| 方法名 | 说明 | 参数 |
|------|------|------|
| clearSelection | 用于多选表格，清空用户的选择 | —— |
| toggleRowSelection | 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中） | row, selected |
| toggleAllSelection | 用于多选表格，切换所有行的选中状态 | —— |
| toggleRowExpansion | 用于可展开表格，切换某一行的展开状态，如果使用了第二个参数，则是设置这一行展开与否（expanded 为 true 则展开） | row, expanded |
| setCurrentRow | 用于单选表格，设定某一行为选中行，如果调用时不加参数，则会取消目前高亮行的选中状态 | row |
| clearSort | 用于清空排序条件，数据会恢复成未排序的状态 | —— |
| clearFilter | 用于清空过滤条件，数据会恢复成未过滤的状态 | —— |
| doLayout | 对 Table 进行重新布局。当 Table 或其祖先元素由隐藏切换为显示时，可能需要调用此方法 | —— |
| sort | 手动对 Table 进行排序。参数 prop 属性指定排序列，order 指定排序顺序 | prop: string, order: string |

### bk-table 插槽 {page=#/table}
| name | 说明 |
|---|---|
| prepend | 插入至表格第一行之前的内容 |
| append | 插入至表格最后一行之后的内容，如果需要对表格的内容进行无限滚动操作，可能需要用到这个 slot。若表格有合计行，该 slot 会位于合计行之上 |

### bk-table-column 属性 {page=#/table}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| type | 对应列的类型。如果设置了 selection 则显示多选框；如果设置了 index 则显示该行的索引（从 1 开始计算）；如果设置了 expand 则显示为一个可展开的按钮 | String | selection / index / expand / setting | —— |
| index | 如果设置了 type=index，可以通过传递 index 属性来自定义索引 | string, Function(index) | —— | —— |
| column-key | column 的 key，如果需要使用 filter-change 事件，则需要此属性标识是哪个 column 的筛选条件 | string | —— | —— |
| label | 显示的标题 | String | —— | —— |
| prop | 对应列内容的字段名，也可以使用 property 属性 | String | —— | —— |
| width | 对应列的宽度 | string  | —— | —— |
| min-width | 对应列的最小宽度，与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列 | string  | —— | —— |
| fixed | 列是否固定在左侧或者右侧，true 表示固定在左侧 | string, boolean  | true,left,right | —— |
| render-header | 列标题 Label 区域渲染使用的 Function | `Function(h, { column, $index })` | —— | —— |
| sortable | 对应列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件 | boolean, string  | true, false, 'custom' | false |
| sort-method | 对数据进行排序的时候使用的方法，仅当 sortable 设置为 true 的时候有效，需返回一个数字，和 Array.sort 表现一致 | Function(a, b)  | —— | —— |
| sort-by | 指定数据按照哪个属性进行排序，仅当 sortable 设置为 true 且没有设置 sort-method 的时候有效。如果 sort-by 为数组，则先按照第 1 个属性排序，如果第 1 个相等，再按照第 2 个排序，以此类推 | String/Array/Function(row, index)  | —— | —— |
| sort-orders | 数据在排序时所使用排序策略的轮转顺序，仅当 sortable 为 true 时有效。需传入一个数组，随着用户点击表头，该列依次按照数组中元素的顺序进行排序 | array  | 数组中的元素需为以下三者之一：ascending 表示升序，descending 表示降序，null 表示还原为原始顺序 | ['ascending', 'descending', null] |
| resizable | 对应列是否可以通过拖动改变宽度（需要在 bk-table 上设置 border 属性为真） | boolean  | —— | true |
| formatter | 用来格式化内容 | Function(row, column, cellValue, index)  | —— | —— |
| show-overflow-tooltip | 当内容过长被隐藏时显示 tooltip | Boolean  | —— | false |
| align | 对齐方式 | String  | left/center/right | left |
| header-align | 表头对齐方式，若不设置该项，则使用表格的对齐方式 | String  | left/center/right | —— |
| class-name | 列的 className | string  | —— | —— |
| label-class-name | 当前列标题的自定义类名 | string  | —— | —— |
| selectable | 仅对 type=selection 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选 | Function(row, index)  | —— | —— |
| reserve-selection | 仅对 type=selection 的列有效，类型为 Boolean，为 true 则会在数据更新之后保留之前选中的数据（需指定 row-key） | Boolean  | —— | false |
| filters | 数据过滤的选项，数组格式，数组中的元素需要有 text 和 value 属性。 | Array[{ text, value }]  | —— | —— |
| filter-placement | 过滤弹出框的定位 | String  | 与 Tooltip 的 placement 属性相同 | —— |
| filter-multiple | 数据过滤的选项是否多选 | Boolean  | —— | true |
| filter-method | 数据过滤使用的方法，如果是多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示 | Function(value, row, column)  | —— | —— |
| filter-searchable | 数据过滤是否可以进行关键字搜索 | Boolean  | —— | false |
| filtered-value | 选中的数据过滤项，如果需要自定义表头过滤的渲染方式，可能会需要此属性 | Array  | —— | —— |
| before-expand-change | 行折叠状态发生变化前的回调函数，返回JavaScript中的falsy类型值时会阻止折叠状态变化 | Function({ row, column, $index })  | —— | —— |
| before-select-change | 状态发生变化前的回调函数，返回false时会阻止勾选状态的变化 | Function(selected, { row, column, store, $index })  | —— | —— |
| before-select-all-change | 全选状态发生变化前的回调函数，返回false时会阻止全选状态的变化 | Function(selected, { column, store })  | —— | —— |


### bk-table-column 插槽 {page=#/table}
| name | 说明 |
|---|---|
| —— | 匿名作用域插槽，自定义列的内容，参数为 `{ row, column, $index }` |
| —— | 匿名插槽，当`bk-table-column`的`type`属性设置为`setting`时，通过此插槽提供需设置的内容 |

### bk-table-setting-content 属性 {page=#/table}
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| fields | 可选的字段列表 | Array | —— | —— |
| selected | 已选的字段列表 | Array | —— | —— |
| value-key | 字段的value对应的键 | String | —— | —— |
| label-key | 字段的label对应的键 | String | —— | —— |
| size | 当前表格的尺寸 | String | —— | —— |
| limit | 配置最多能选择多少个字段，配置该属性后，字段列表将不提供全选功能 | Number | —— | —— |

### bk-table-setting-content 事件 {page=#/table}
| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| setting-change | 表格设置发生变化时的事件 | Function({ fields, size }) |
| cancel | 取消配置表格时的事件 | —— |
