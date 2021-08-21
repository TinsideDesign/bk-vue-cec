<script>
    import { bkNavigation, bkNavigationMenu, bkNavigationMenuItem, bkNavigationMenuGroup, bkSelect, bkOption, bkPopover, bkButton } from '@'
    export default {
        name: 'monitor-navigation',
        components: {
            bkNavigation,
            bkNavigationMenu,
            bkNavigationMenuItem,
            bkNavigationMenuGroup,
            bkSelect,
            bkOption,
            bkPopover,
            bkButton
        },
        data () {
            return {
                navActive: 0,
                navMap: [
                    {
                        nav: 'left-right',
                        needMenu: true,
                        name: '左右结构导航'
                    },
                    {
                        nav: 'top-bottom',
                        needMenu: true,
                        name: '上下结构导航'
                    },
                    {
                        nav: 'top-bottom',
                        needMenu: false,
                        name: '上下结构无侧栏导航'
                    }
                ],
                nav: {
                    list: [
                        {
                            name: '首页',
                            icon: 'icon-tree-application-shape',
                            url: '/overview/',
                            open: true,
                            children: [
                                {
                                    name: '首页一',
                                    active: true
                                },
                                {
                                    name: '首页二'
                                }
                            ]
                        },
                        {
                            name: '测试页',
                            icon: 'icon-tree-group-shape',
                            url: '/bp/',
                            group: true
                        },
                        {
                            name: '测试页二',
                            icon: 'icon-tree-module-shape',
                            url: '/component/',
                            disabled: true

                        },
                        {
                            name: '测试页三',
                            icon: 'icon-tree-process-shape',
                            url: '/uptime_check/summary/'
                        },
                        {
                            name: 'aaaa',
                            icon: 'icon-weixin-shape',
                            url: '/operation_monitor/'
                        },
                        {
                            name: '一级菜单',
                            icon: 'icon-tree-process-shape',
                            url: '/config/',
                            children: [
                                {
                                    name: '二级菜单1'
                                },
                                {
                                    name: '二级菜单2',
                                    children: [
                                        {
                                            name: '监控配置22'
                                        },
                                        {
                                            name: '监控配置23'
                                        },
                                        {
                                            name: '监控配置24'
                                        }
                                    ]
                                },
                                {
                                    name: '二级菜单3'
                                },
                                {
                                    name: '二级菜单4'
                                },
                                {
                                    name: '二级菜单5'
                                },
                                {
                                    name: '二级菜单6'
                                },
                                {
                                    name: '二级菜单7'
                                },
                                {
                                    name: '二级菜单8'
                                },
                                {
                                    name: '二级菜单9'
                                },
                                {
                                    name: '二级菜单10'
                                }
                            ]
                        },
                        {
                            name: '保时捷',
                            icon: 'icon-clock-shape',
                            url: '/datasource/',
                            children: []
                        },
                        {
                            name: '阿斯顿马丁',
                            icon: 'icon-qq-shape',
                            url: '/event_center/list/'
                        },
                        {
                            name: '兰博基尼',
                            icon: 'icon-empty-shape',
                            url: '/biz_manage/'
                        },
                        {
                            name: '法拉利',
                            icon: 'icon-apps-shape',
                            url: '/dashboard/',
                            group: true
                        },
                        {
                            name: '测试',
                            icon: 'icon-weixin-shape',
                            url: '/blank/'
                        }
                    ],
                    list2: [
                        {
                            name: '计算资源',
                            children: [
                                {
                                    name: '集群',
                                    href: '/#/navigation/example',
                                    icon: 'icon-tree-application-shape'
                                },
                                {
                                    name: '节点',
                                    href: '/',
                                    icon: 'icon-tree-application-shape'
                                },
                                {
                                    name: '服务',
                                    href: '/',
                                    icon: 'icon-tree-application-shape'
                                }
                            ]
                        },
                        {
                            name: '配置',
                            children: [
                                {
                                    name: '模板集',
                                    href: '/#/navigation/example',
                                    active: true,
                                    icon: 'icon-tree-application-shape'
                                },
                                {
                                    name: '变量管理',
                                    title: true,
                                    href: '/3',
                                    icon: 'icon-tree-application-shape'
                                },
                                {
                                    name: 'Metric管理',
                                    title: true,
                                    href: '/4',
                                    icon: 'icon-tree-application-shape'
                                }
                            ]
                        },
                        {
                            name: '其他配置',
                            children: [
                                {
                                    name: '模板设置',
                                    active: true,
                                    icon: 'icon-tree-application-shape',
                                    children: [
                                        {
                                            name: '测试页一'
                                        },
                                        {
                                            name: '测试页二'
                                        },
                                        {
                                            name: '测试页三'
                                        }
                                    ]
                                },
                                {
                                    name: '应用配置',
                                    title: true,
                                    href: '/3',
                                    icon: 'icon-tree-application-shape'
                                },
                                {
                                    name: '网络',
                                    title: true,
                                    href: '/4',
                                    icon: 'icon-tree-application-shape'
                                }
                            ]
                        }
                    ],
                    id: '首页一',
                    navId: '集群',
                    toggle: false,
                    submenuActive: false,
                    title: 'TInside测试平台'
                },
                header: {
                    list: [
                        {
                            name: '作业平台',
                            id: 1,
                            show: true
                        },
                        {
                            name: '配置平台',
                            id: 2,
                            show: true
                        },
                        {
                            name: '监控平台',
                            id: 3,
                            show: true,
                            navList: [
                                {
                                    name: '插件管理',
                                    id: 1
                                },
                                {
                                    name: '采集配置',
                                    id: 2
                                },
                                {
                                    name: '策略配置',
                                    id: 3
                                },
                                {
                                    name: '事件中心',
                                    id: 4
                                }
                            ],
                            navActive: 2
                        },
                        {
                            name: '蓝盾平台',
                            id: 4,
                            show: true
                        }
                    ],
                    selectList: [
                        {
                            name: '英雄联盟',
                            id: 1
                        },
                        {
                            name: '和平精英',
                            id: 2
                        },
                        {
                            name: '王者荣耀',
                            id: 3
                        }
                    ],
                    active: 2,
                    bizId: 1
                },
                message: {
                    list: [
                        {
                            message: '你的“20181212112308”单据已通过',
                            date: '刚刚'
                        },
                        {
                            message: '你的“20181212112308”单据被驳回',
                            date: '45分钟前'
                        },
                        {
                            message: '你的“20181212112308”单据部分被驳回',
                            date: '3天前'
                        },
                        {
                            message: '你的“20181212112308”单据部分被驳回',
                            date: '12月14日'
                        },
                        {
                            message: 'jinnyyang 提醒了你',
                            date: '12月14日'
                        },
                        {
                            message: 'edwinwu 重新申请了“201812121108”内关于“TInside作业平台”“TInside作业平台”',
                            date: '12月14日'
                        },
                        {
                            message: '你的“20181212112308”单据部分被驳回',
                            date: '12月14日'
                        },
                        {
                            message: 'jinnyyang 提醒了你',
                            date: '12月14日'
                        },
                        {
                            message: 'edwinwu 重新申请了“201812121108”内关于“TInside作业平台”的权限申请。',
                            date: '12月14日'
                        }
                    ]
                },
                user: {
                    list: [
                        '项目管理',
                        '权限中心',
                        '退出'
                    ]
                }
            }
        },
        computed: {
            curNav () {
                return this.navMap[this.navActive]
            },
            curHeaderNav () {
                return this.header.list[this.header.active] || {}
            }
        },
        mounted () {
            /* 以下代码是为了自适应例子父级的宽高而设置 */
            this.handleResize()
            window.addEventListener('resize', this.handleResize)
            /* 以上代码是为了自适应例子父级的宽高而设置 */
        },
        beforeDestroy () {
            /* 以下代码是为了自适应例子父级的宽高而设置 */
            window.removeEventListener('resize', this.handleResize)
            /* 以上代码是为了自适应例子父级的宽高而设置 */
        },
        methods: {
            handleSelect (id, item) {
                this.nav.id = id
                console.info(`你选择了${id}`)
            },
            handleNavSelect (id, item) {
                this.nav.navId = id
                console.info(`你选择了${id}`)
            },
            handleToggle (v) {
                this.nav.toggle = v
            },
            beforeNavChange (newId, oldId) {
                console.info(newId, oldId)
                return true
            },
            handleChangeNav () {
                this.navActive = (this.navActive + 1) % 3
            },
            handleResize (e) {
                if (window.innerWidth > 1615) {
                    this.header.list.forEach(item => (item.show = true))
                } else if (window.innerWidth > 1515) {
                    this.header.list[0].show = false
                } else if (window.innerWidth > 1415) {
                    this.header.list[0].show = false
                    this.header.list[1].show = false
                } else if (window.innerWidth > 1315) {
                    this.header.list[0].show = false
                    this.header.list[1].show = false
                    this.header.list[2].show = false
                }
            }
        }
    }
</script>

<style >
/* 以下样式是为了适应例子父级的宽高而设置 */
.bk-navigation {
    width:calc(100vw - 530px) !important;
    height:calc(100vh - 140px) !important;
    outline:1px solid #ebebeb;
}
.bk-navigation .bk-navigation-wrapper {
    height:calc(100vh - 252px)!important;
}
/* 以上样式是为了适应例子父级的宽高而设置 */

.monitor-navigation-header {
    -webkit-box-flex:1;
    -ms-flex:1;
    flex:1;
    height:100%;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align:center;
    -ms-flex-align:center;
    align-items:center;
    font-size:14px;
}
.monitor-navigation-header .header-nav {
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    padding:0;
    margin:0;
}
.monitor-navigation-header .header-nav-item {
    list-style:none;
    height:50px;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align:center;
    -ms-flex-align:center;
    align-items:center;
    margin-right:40px;
    color:#96A2B9;
    min-width:56px
}
.monitor-navigation-header .header-nav-item.item-active {
    color:#FFFFFF !important;
}
.monitor-navigation-header .header-nav-item:hover {
    cursor:pointer;
    color:#D3D9E4;
}
.monitor-navigation-header .header-title {
    color:#63656E;
    font-size:16px;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align:center;
    -ms-flex-align:center;
    align-items:center;
    margin-left:-6px;
}
.monitor-navigation-header .header-title-icon {
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align:center;
    -ms-flex-align:center;
    align-items:center;
    width:28px;
    height:28px;
    font-size:28px;
    color:#006DFF;
    cursor:pointer;
}
.monitor-navigation-header .header-select {
    width:240px;
    margin-left:auto;
    margin-right:34px;
    border:none;
    background:#252F43;
    color:#D3D9E4;
    -webkit-box-shadow:none;
    box-shadow:none
}
.monitor-navigation-header .header-select.is-left {
    background:#F0F1F5;
    color:#63656E;
}
.monitor-navigation-header .header-mind {
    color:#768197;
    font-size:16px;
    position:relative;
    height:32px;
    width:32px;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align:center;
    -ms-flex-align:center;
    align-items:center;
    -webkit-box-pack:center;
    -ms-flex-pack:center;
    justify-content:center;
    margin-right:8px
}
.monitor-navigation-header .header-mind.is-left {
    color:#63656E;
}
.monitor-navigation-header .header-mind.is-left:hover {
    color:#006DFF;
    background:#F0F1F5
}
.monitor-navigation-header .header-mind-mark {
    position:absolute;
    right:8px;
    top:8px;
    height:7px;
    width:7px;
    border:1px solid #27334C;
    background-color:#EA3636;
    border-radius:100%
}
.monitor-navigation-header .header-mind-mark.is-left {
    border-color:#F0F1F5;
}
.monitor-navigation-header .header-mind:hover {
    background:-webkit-gradient(linear,right top, left top,from(rgba(37,48,71,1)),to(rgba(38,50,71,1)));
    background:linear-gradient(270deg,rgba(37,48,71,1) 0%,rgba(38,50,71,1) 100%);
    border-radius:100%;
    cursor:pointer;
    color:#D3D9E4;
}
.monitor-navigation-header .header-help {
    color:#768197;
    font-size:16px;
    position:relative;
    height:32px;
    width:32px;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align:center;
    -ms-flex-align:center;
    align-items:center;
    -webkit-box-pack:center;
    -ms-flex-pack:center;
    justify-content:center;
    margin-right:8px
}
.monitor-navigation-header .header-help.is-left {
    color:#63656E;
}
.monitor-navigation-header .header-help.is-left:hover {
    color:#006DFF;
    background:#F0F1F5
}
.monitor-navigation-header .header-help:hover {
    background:-webkit-gradient(linear,right top, left top,from(rgba(37,48,71,1)),to(rgba(38,50,71,1)));
    background:linear-gradient(270deg,rgba(37,48,71,1) 0%,rgba(38,50,71,1) 100%);
    border-radius:100%;
    cursor:pointer;
    color:#D3D9E4;
}
.monitor-navigation-header .header-user {
    height:100%;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align:center;
    -ms-flex-align:center;
    align-items:center;
    -webkit-box-pack:center;
    -ms-flex-pack:center;
    justify-content:center;
    color:#96A2B9;
    margin-left:8px;
}
.monitor-navigation-header .header-user .bk-icon {
    margin-left:5px;
    font-size:12px;
}
.monitor-navigation-header .header-user.is-left {
    color:#63656E;
}
.monitor-navigation-header .header-user.is-left:hover {
    color:#006DFF
}
.monitor-navigation-header .header-user:hover {
    cursor:pointer;
    color:#D3D9E4;
}
.monitor-navigation-content {
    height:calc(100% - 84px);
    background:#FFFFFF;
    -webkit-box-shadow:0px 2px 4px 0px rgba(25,25,41,0.05);
    box-shadow:0px 2px 4px 0px rgba(25,25,41,0.05);
    border-radius:2px;
    border:1px solid rgba(220,222,229,1);
}
.monitor-navigation-footer {
    height:52px;
    width:100%;
    margin:32px 0 0;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align:center;
    -ms-flex-align:center;
    align-items:center;
    -webkit-box-pack:center;
    -ms-flex-pack:center;
    justify-content:center;
    border-top:1px solid #DCDEE5;
    color:#63656E;
    font-size:12px;
}
.monitor-navigation-message {
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-orient:vertical;
    -webkit-box-direction:normal;
    -ms-flex-direction:column;
    flex-direction:column;
    width:360px;
    background-color:#FFFFFF;
    border:1px solid #E2E2E2;
    border-radius:2px;
    -webkit-box-shadow:0px 3px 4px 0px rgba(64,112,203,0.06);
    box-shadow:0px 3px 4px 0px rgba(64,112,203,0.06);
    color:#979BA5;
    font-size:12px;
}
.monitor-navigation-message .message-title {
    -webkit-box-flex:0;
    -ms-flex:0 0 48px;
    flex:0 0 48px;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align:center;
    -ms-flex-align:center;
    align-items:center;
    color:#313238;
    font-size:14px;
    padding:0 20px;
    margin:0;
    border-bottom:1px solid #F0F1F5;
}
.monitor-navigation-message .message-list {
    -webkit-box-flex:1;
    -ms-flex:1;
    flex:1;
    max-height:450px;
    overflow:auto;
    margin:0;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-orient:vertical;
    -webkit-box-direction:normal;
    -ms-flex-direction:column;
    flex-direction:column;
    padding:0;
}
.monitor-navigation-message .message-list-item {
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    width:100%;
    padding:0 20px;
}
.monitor-navigation-message .message-list-item .item-message {
    padding:13px 0;
    line-height:16px;
    min-height:42px;
    -webkit-box-flex:1;
    -ms-flex:1;
    flex:1;
    -ms-flex-wrap:wrap;
    flex-wrap:wrap;
    color:#63656E;
}
.monitor-navigation-message .message-list-item .item-date {
    padding:13px 0;
    margin-left:16px;
    color:#979BA5;
}
.monitor-navigation-message .message-list-item:hover {
    cursor:pointer;
    background:#F0F1F5;
}
.monitor-navigation-message .message-footer {
    -webkit-box-flex:0;
    -ms-flex:0 0 42px;
    flex:0 0 42px;
    border-top:1px solid #F0F1F5;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align:center;
    -ms-flex-align:center;
    align-items:center;
    -webkit-box-pack:center;
    -ms-flex-pack:center;
    justify-content:center;
    color:#006DFF;
}
.monitor-navigation-nav {
    width:150px;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-orient:vertical;
    -webkit-box-direction:normal;
    -ms-flex-direction:column;
    flex-direction:column;
    background:#FFFFFF;
    border:1px solid #E2E2E2;
    -webkit-box-shadow:0px 3px 4px 0px rgba(64,112,203,0.06);
    box-shadow:0px 3px 4px 0px rgba(64,112,203,0.06);
    padding:6px 0;
    margin:0;
    color:#63656E;
}
.monitor-navigation-nav .nav-item {
    -webkit-box-flex:0;
    -ms-flex:0 0 32px;
    flex:0 0 32px;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align:center;
    -ms-flex-align:center;
    align-items:center;
    padding:0 20px;
    list-style:none
}
.monitor-navigation-nav .nav-item:hover {
    color:#006DFF;
    cursor:pointer;
    background-color:#F0F1F5;
}
.monitor-navigation-admin {
    width:170px #63656E;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-orient:vertical;
    -webkit-box-direction:normal;
    -ms-flex-direction:column;
    flex-direction:column;
    background:#FFFFFF;
    border:1px solid #E2E2E2;
    -webkit-box-shadow:0px 3px 4px 0px rgba(64,112,203,0.06);
    box-shadow:0px 3px 4px 0px rgba(64,112,203,0.06);
    padding:6px 0;
    margin:0;
    color:#63656E;
}
.monitor-navigation-admin .nav-item {
    -webkit-box-flex:0;
    -ms-flex:0 0 32px;
    flex:0 0 32px;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align:center;
    -ms-flex-align:center;
    align-items:center;
    padding:0 20px;
    list-style:none
}
.monitor-navigation-admin .nav-item:hover {
    color:#006DFF;
    cursor:pointer;
    background-color:#F0F1F5;
}
.tippy-popper .tippy-tooltip.navigation-message-theme {
    padding:0;
    border-radius:0;
    -webkit-box-shadow:none;
    box-shadow:none;
}
</style>

[[toc]]

## Navigation 导航

用于统一布局的导航，通过配置navigation-type来设置不同的导航类型

### 基本用法 {page=#/navigation}

:::demo 使用bk-navigation来布局普通的导航页面  bk-menu 及 bk-menu-item 也可以单独使用
```html
<template>
    <div class="monitor-navigation">
        <div style="margin-bottom: 20px">
            <bk-button theme="primary" @click="handleChangeNav">切换导航类型：{{curNav.name}}</bk-button>
        </div>
        <bk-navigation
            :header-title="nav.id"
            :side-title="nav.title"
            :default-open="false"
            :navigation-type="curNav.nav"
            :need-menu="curNav.needMenu"
            @toggle="handleToggle">
            <template slot="header">
                <div class="monitor-navigation-header">
                    <ol class="header-nav" v-if="curNav.nav === 'top-bottom'">
                        <bk-popover v-for="(item,index) in header.list" :key="item.id" theme="light navigation-message" :arrow="false" offset="0, -5"  placement="bottom" :tippy-options="{ 'hideOnClick': false, flipBehavior: ['bottom'] }">
                            <li v-show="item.show" class="header-nav-item" :class="{ 'item-active': index === header.active }">
                                {{item.name}}
                            </li>
                            <template slot="content">
                                <ul class="monitor-navigation-nav">
                                    <li class="nav-item" v-for="headerNavItem in curHeaderNav.navList" :key="headerNavItem.id">
                                        {{headerNavItem.name}}
                                    </li>
                                </ul>
                            </template>
                        </bk-popover>
                    </ol>
                    <div v-else class="header-title">
                        <span class="header-title-icon">
                            <svg class="icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4756"><path d="M416 480h320v64H416l96 96-48 48-176-176 176-176 48 48-96 96z" p-id="4757"></path></svg>
                        </span>
                        {{nav.id}}
                    </div>
                    <bk-select class="header-select" :class="{ 'is-left': curNav.nav === 'left-right' }" v-model="header.bizId" :clearable="false" searchable>
                        <bk-option v-for="option in header.selectList"
                            :key="option.id"
                            :id="option.id"
                            :name="option.name">
                        </bk-option>
                    </bk-select>
                    <bk-popover theme="light navigation-message" :arrow="false" offset="-150, 5" trigger="mouseenter" :tippy-options="{ 'hideOnClick': false }">
                        <div class="header-mind" :class="{ 'is-left': curNav.nav === 'left-right' }">
                            <svg style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <path d="M32,56c-1.3,0-2.6-0.6-3.4-1.6h-4.5c0.5,1.5,1.4,2.7,2.6,3.7c3.1,2.5,7.5,2.5,10.6,0c1.2-1,2.1-2.3,2.6-3.7h-4.5C34.6,55.4,33.3,56,32,56z"></path>
                                <path d="M53.8,49.1L50,41.5V28c0-8.4-5.8-15.7-14-17.6V8c0-2.2-1.8-4-4-4s-4,1.8-4,4v2.4c-8.2,1.9-14,9.2-14,17.6v13.5l-3.8,7.6c-0.3,0.6-0.3,1.3,0.1,1.9c0.4,0.6,1,1,1.7,1h40c0.7,0,1.3-0.4,1.7-1C54,50.4,54.1,49.7,53.8,49.1z"></path>
                            </svg>
                            <span class="header-mind-mark" :class="{ 'is-left': curNav.nav === 'left-right' }"></span>
                        </div>
                        <template slot="content">
                            <div class="monitor-navigation-message">
                                <h5 class="message-title">消息中心</h5>
                                <ul class="message-list">
                                    <li class="message-list-item" v-for="(item,index) in message.list" :key="index">
                                        <span class="item-message">{{item.message}}</span>
                                        <span class="item-date">{{item.date}}</span>
                                    </li>
                                </ul>
                                <div class="message-footer">进入消息中心</div>
                            </div>
                        </template>
                    </bk-popover>
                    <div class="header-help" :class="{ 'is-left': curNav.nav === 'left-right' }">
                        <svg class="bk-icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <path d="M32,4C16.5,4,4,16.5,4,32c0,3.6,0.7,7.1,2,10.4V56c0,1.1,0.9,2,2,2h13.6C36,63.7,52.3,56.8,58,42.4S56.8,11.7,42.4,6C39.1,4.7,35.6,4,32,4z M31.3,45.1c-1.7,0-3-1.3-3-3s1.3-3,3-3c1.7,0,3,1.3,3,3S33,45.1,31.3,45.1z M36.7,31.7c-2.3,1.3-3,2.2-3,3.9v0.9H29v-1c-0.2-2.8,0.7-4.4,3.2-5.8c2.3-1.4,3-2.2,3-3.8s-1.3-2.8-3.3-2.8c-1.8-0.1-3.3,1.2-3.5,3c0,0.1,0,0.1,0,0.2h-4.8c0.1-4.4,3.1-7.4,8.5-7.4c5,0,8.3,2.8,8.3,6.9C40.5,28.4,39.2,30.3,36.7,31.7z"></path>
                        </svg>
                    </div>
                    <bk-popover theme="light navigation-message" :arrow="false" offset="-20, 10" placement="bottom-start" :tippy-options="{ 'hideOnClick': false }">
                        <div class="header-user" :class="{ 'is-left': curNav.nav === 'left-right' }">
                            Liang
                            <i class="bk-icon icon-down-shape"></i>
                        </div>
                        <template slot="content">
                            <ul class="monitor-navigation-admin">
                                <li class="nav-item" v-for="userItem in user.list" :key="userItem">
                                    {{userItem}}
                                </li>
                            </ul>
                        </template>
                    </bk-popover>
                </div>
            </template>
            <template slot="menu">
                <bk-navigation-menu
                    ref="menu"
                    @select="handleSelect"
                    :default-active="nav.id"
                    :before-nav-change="beforeNavChange"
                    :toggle-active="nav.toggle">
                    <bk-navigation-menu-item
                        v-for="item in nav.list"
                        :key="item.name"
                        :has-child="item.children && !!item.children.length"
                        :group="item.group"
                        :icon="item.icon"
                        :disabled="item.disabled"
                        :url="item.url"
                        :id="item.name">
                        <span>{{item.name}}</span>
                        <div slot="child">
                            <bk-navigation-menu-item
                                :key="child.name"
                                v-for="child in item.children"
                                :id="child.name"
                                :disabled="child.disabled"
                                :icon="child.icon"
                                :default-active="child.active">
                                <span>{{child.name}}</span>
                            </bk-navigation-menu-item>
                        </div>
                    </bk-navigation-menu-item>
                </bk-navigation-menu>
            </template>
            <div class="monitor-navigation-content">

            </div>
            <template slot="footer">
                <div class="monitor-navigation-footer">
                    Copyright © 2020-{{new Date().getFullYear()}} T-Inside Design. All Rights Reserved. T-inside Design 版权所有
                </div>
            </template>
        </bk-navigation>
    </div>
</template>

<script>
    import { bkNavigation, bkNavigationMenu, bkNavigationMenuItem, bkSelect, bkOption, bkPopover, bkButton } from '{{BASE_LIB_NAME}}'
    export default {
        name: 'monitor-navigation',
        components: {
            bkNavigation,
            bkNavigationMenu,
            bkNavigationMenuItem,
            bkSelect,
            bkOption,
            bkPopover,
            bkButton
        },
        data () {
            return {
                navActive: 0,
                navMap: [
                    {
                        nav: 'left-right',
                        needMenu: true,
                        name: '左右结构导航'
                    },
                    {
                        nav: 'top-bottom',
                        needMenu: true,
                        name: '上下结构导航'
                    },
                    {
                        nav: 'top-bottom',
                        needMenu: false,
                        name: '上下结构无侧栏导航'
                    }
                ],
                nav: {
                    list: [
                        {
                            name: '首页',
                            icon: 'icon-tree-application-shape',
                            url: '/overview/',
                            open: true,
                            children: [
                                {
                                    name: '首页一',
                                    active: true
                                },
                                {
                                    name: '首页二'
                                }
                            ]
                        },
                        {
                            name: '测试页',
                            icon: 'icon-tree-group-shape',
                            url: '/bp/',
                            group: true
                        },
                        {
                            name: '测试页二',
                            icon: 'icon-tree-module-shape',
                            url: '/component/',
                            disabled: true

                        },
                        {
                            name: '测试页三',
                            icon: 'icon-tree-process-shape',
                            url: '/uptime_check/summary/'
                        },
                        {
                            name: 'aaaa',
                            icon: 'icon-weixin-shape',
                            url: '/operation_monitor/'
                        },
                        {
                            name: '一级菜单',
                            icon: 'icon-tree-process-shape',
                            url: '/config/',
                            children: [
                                {
                                    name: '二级菜单1'
                                },
                                {
                                    name: '二级菜单2',
                                    children: [
                                        {
                                            name: '监控配置22'
                                        },
                                        {
                                            name: '监控配置23'
                                        },
                                        {
                                            name: '监控配置24'
                                        }
                                    ]
                                },
                                {
                                    name: '二级菜单3'
                                },
                                {
                                    name: '二级菜单4'
                                },
                                {
                                    name: '二级菜单5'
                                },
                                {
                                    name: '二级菜单6'
                                },
                                {
                                    name: '二级菜单7'
                                },
                                {
                                    name: '二级菜单8'
                                },
                                {
                                    name: '二级菜单9'
                                },
                                {
                                    name: '二级菜单10'
                                }
                            ]
                        },
                        {
                            name: '保时捷',
                            icon: 'icon-clock-shape',
                            url: '/datasource/',
                            children: []
                        },
                        {
                            name: '阿斯顿马丁',
                            icon: 'icon-qq-shape',
                            url: '/event_center/list/'
                        },
                        {
                            name: '兰博基尼',
                            icon: 'icon-empty-shape',
                            url: '/biz_manage/'
                        },
                        {
                            name: '法拉利',
                            icon: 'icon-apps-shape',
                            url: '/dashboard/',
                            group: true
                        },
                        {
                            name: '测试',
                            icon: 'icon-weixin-shape',
                            url: '/blank/'
                        }
                    ],
                    id: '首页一',
                    toggle: false,
                    submenuActive: false,
                    title: 'TInside测试平台'
                },
                header: {
                    list: [
                        {
                            name: '作业平台',
                            id: 1,
                            show: true
                        },
                        {
                            name: '配置平台',
                            id: 2,
                            show: true
                        },
                        {
                            name: '监控平台',
                            id: 3,
                            show: true,
                            navList: [
                                {
                                    name: '插件管理',
                                    id: 1
                                },
                                {
                                    name: '采集配置',
                                    id: 2
                                },
                                {
                                    name: '策略配置',
                                    id: 3
                                },
                                {
                                    name: '事件中心',
                                    id: 4
                                }
                            ],
                            navActive: 2
                        },
                        {
                            name: '蓝盾平台',
                            id: 4,
                            show: true
                        }
                    ],
                    selectList: [
                        {
                            name: '英雄联盟',
                            id: 1
                        },
                        {
                            name: '和平精英',
                            id: 2
                        },
                        {
                            name: '王者荣耀',
                            id: 3
                        }
                    ],
                    active: 2,
                    bizId: 1
                },
                message: {
                    list: [
                        {
                            message: '你的“20181212112308”单据已通过',
                            date: '刚刚'
                        },
                        {
                            message: '你的“20181212112308”单据被驳回',
                            date: '45分钟前'
                        },
                        {
                            message: '你的“20181212112308”单据部分被驳回',
                            date: '3天前'
                        },
                        {
                            message: '你的“20181212112308”单据部分被驳回',
                            date: '12月14日'
                        },
                        {
                            message: 'jinnyyang 提醒了你',
                            date: '12月14日'
                        },
                        {
                            message: 'edwinwu 重新申请了“201812121108”内关于“TInside作业平台”“TInside作业平台”',
                            date: '12月14日'
                        },
                        {
                            message: '你的“20181212112308”单据部分被驳回',
                            date: '12月14日'
                        },
                        {
                            message: 'jinnyyang 提醒了你',
                            date: '12月14日'
                        },
                        {
                            message: 'edwinwu 重新申请了“201812121108”内关于“TInside作业平台”的权限申请。',
                            date: '12月14日'
                        }
                    ]
                },
                user: {
                    list: [
                        '项目管理',
                        '权限中心',
                        '退出'
                    ]
                }
            }
        },
        computed: {
            curNav () {
                return this.navMap[this.navActive]
            },
            curHeaderNav () {
                return this.header.list[this.header.active] || {}
            }
        },
        methods: {
            handleSelect (id, item) {
                this.nav.id = id
                console.info(`你选择了${id}`)
            },
            handleToggle (v) {
                this.nav.toggle = v
            },
            beforeNavChange (newId, oldId) {
                console.info(newId, oldId)
                return true
            },
            handleChangeNav () {
                this.navActive = (this.navActive + 1) % 3
            }
        }
    }
</script>

<style>

/* 以下样式是为了适应例子父级的宽高而设置 */
.bk-navigation {
    width:calc(100vw - 530px) !important;
    height:calc(100vh - 140px) !important;
    outline:1px solid #ebebeb;
}
.bk-navigation .bk-navigation-wrapper {
    height:calc(100vh - 252px)!important;
}
/* 以上样式是为了适应例子父级的宽高而设置 */

.monitor-navigation-header {
    -webkit-box-flex:1;
    -ms-flex:1;
    flex:1;
    height:100%;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align:center;
    -ms-flex-align:center;
    align-items:center;
    font-size:14px;
}
.monitor-navigation-header .header-nav {
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    padding:0;
    margin:0;
}
.monitor-navigation-header .header-nav-item {
    list-style:none;
    height:50px;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align:center;
    -ms-flex-align:center;
    align-items:center;
    margin-right:40px;
    color:#96A2B9;
    min-width:56px
}
.monitor-navigation-header .header-nav-item.item-active {
    color:#FFFFFF !important;
}
.monitor-navigation-header .header-nav-item:hover {
    cursor:pointer;
    color:#D3D9E4;
}
.monitor-navigation-header .header-title {
    color:#63656E;
    font-size:16px;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align:center;
    -ms-flex-align:center;
    align-items:center;
    margin-left:-6px;
}
.monitor-navigation-header .header-title-icon {
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align:center;
    -ms-flex-align:center;
    align-items:center;
    width:28px;
    height:28px;
    font-size:28px;
    color:#006DFF;
    cursor:pointer;
}
.monitor-navigation-header .header-select {
    width:240px;
    margin-left:auto;
    margin-right:34px;
    border:none;
    background:#252F43;
    color:#D3D9E4;
    -webkit-box-shadow:none;
    box-shadow:none
}
.monitor-navigation-header .header-select.is-left {
    background:#F0F1F5;
    color:#63656E;
}
.monitor-navigation-header .header-mind {
    color:#768197;
    font-size:16px;
    position:relative;
    height:32px;
    width:32px;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align:center;
    -ms-flex-align:center;
    align-items:center;
    -webkit-box-pack:center;
    -ms-flex-pack:center;
    justify-content:center;
    margin-right:8px
}
.monitor-navigation-header .header-mind.is-left {
    color:#63656E;
}
.monitor-navigation-header .header-mind.is-left:hover {
    color:#006DFF;
    background:#F0F1F5
}
.monitor-navigation-header .header-mind-mark {
    position:absolute;
    right:8px;
    top:8px;
    height:7px;
    width:7px;
    border:1px solid #27334C;
    background-color:#EA3636;
    border-radius:100%
}
.monitor-navigation-header .header-mind-mark.is-left {
    border-color:#F0F1F5;
}
.monitor-navigation-header .header-mind:hover {
    background:-webkit-gradient(linear,right top, left top,from(rgba(37,48,71,1)),to(rgba(38,50,71,1)));
    background:linear-gradient(270deg,rgba(37,48,71,1) 0%,rgba(38,50,71,1) 100%);
    border-radius:100%;
    cursor:pointer;
    color:#D3D9E4;
}
.monitor-navigation-header .header-help {
    color:#768197;
    font-size:16px;
    position:relative;
    height:32px;
    width:32px;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align:center;
    -ms-flex-align:center;
    align-items:center;
    -webkit-box-pack:center;
    -ms-flex-pack:center;
    justify-content:center;
    margin-right:8px
}
.monitor-navigation-header .header-help.is-left {
    color:#63656E;
}
.monitor-navigation-header .header-help.is-left:hover {
    color:#006DFF;
    background:#F0F1F5
}
.monitor-navigation-header .header-help:hover {
    background:-webkit-gradient(linear,right top, left top,from(rgba(37,48,71,1)),to(rgba(38,50,71,1)));
    background:linear-gradient(270deg,rgba(37,48,71,1) 0%,rgba(38,50,71,1) 100%);
    border-radius:100%;
    cursor:pointer;
    color:#D3D9E4;
}
.monitor-navigation-header .header-user {
    height:100%;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align:center;
    -ms-flex-align:center;
    align-items:center;
    -webkit-box-pack:center;
    -ms-flex-pack:center;
    justify-content:center;
    color:#96A2B9;
    margin-left:8px;
}
.monitor-navigation-header .header-user .bk-icon {
    margin-left:5px;
    font-size:12px;
}
.monitor-navigation-header .header-user.is-left {
    color:#63656E;
}
.monitor-navigation-header .header-user.is-left:hover {
    color:#006DFF
}
.monitor-navigation-header .header-user:hover {
    cursor:pointer;
    color:#D3D9E4;
}
.monitor-navigation-content {
    height:calc(100% - 84px);
    background:#FFFFFF;
    -webkit-box-shadow:0px 2px 4px 0px rgba(25,25,41,0.05);
    box-shadow:0px 2px 4px 0px rgba(25,25,41,0.05);
    border-radius:2px;
    border:1px solid rgba(220,222,229,1);
}
.monitor-navigation-footer {
    height:52px;
    width:100%;
    margin:32px 0 0;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align:center;
    -ms-flex-align:center;
    align-items:center;
    -webkit-box-pack:center;
    -ms-flex-pack:center;
    justify-content:center;
    border-top:1px solid #DCDEE5;
    color:#63656E;
    font-size:12px;
}
.monitor-navigation-message {
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-orient:vertical;
    -webkit-box-direction:normal;
    -ms-flex-direction:column;
    flex-direction:column;
    width:360px;
    background-color:#FFFFFF;
    border:1px solid #E2E2E2;
    border-radius:2px;
    -webkit-box-shadow:0px 3px 4px 0px rgba(64,112,203,0.06);
    box-shadow:0px 3px 4px 0px rgba(64,112,203,0.06);
    color:#979BA5;
    font-size:12px;
}
.monitor-navigation-message .message-title {
    -webkit-box-flex:0;
    -ms-flex:0 0 48px;
    flex:0 0 48px;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align:center;
    -ms-flex-align:center;
    align-items:center;
    color:#313238;
    font-size:14px;
    padding:0 20px;
    margin:0;
    border-bottom:1px solid #F0F1F5;
}
.monitor-navigation-message .message-list {
    -webkit-box-flex:1;
    -ms-flex:1;
    flex:1;
    max-height:450px;
    overflow:auto;
    margin:0;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-orient:vertical;
    -webkit-box-direction:normal;
    -ms-flex-direction:column;
    flex-direction:column;
    padding:0;
}
.monitor-navigation-message .message-list-item {
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    width:100%;
    padding:0 20px;
}
.monitor-navigation-message .message-list-item .item-message {
    padding:13px 0;
    line-height:16px;
    min-height:42px;
    -webkit-box-flex:1;
    -ms-flex:1;
    flex:1;
    -ms-flex-wrap:wrap;
    flex-wrap:wrap;
    color:#63656E;
}
.monitor-navigation-message .message-list-item .item-date {
    padding:13px 0;
    margin-left:16px;
    color:#979BA5;
}
.monitor-navigation-message .message-list-item:hover {
    cursor:pointer;
    background:#F0F1F5;
}
.monitor-navigation-message .message-footer {
    -webkit-box-flex:0;
    -ms-flex:0 0 42px;
    flex:0 0 42px;
    border-top:1px solid #F0F1F5;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align:center;
    -ms-flex-align:center;
    align-items:center;
    -webkit-box-pack:center;
    -ms-flex-pack:center;
    justify-content:center;
    color:#006DFF;
}
.monitor-navigation-nav {
    width:150px;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-orient:vertical;
    -webkit-box-direction:normal;
    -ms-flex-direction:column;
    flex-direction:column;
    background:#FFFFFF;
    border:1px solid #E2E2E2;
    -webkit-box-shadow:0px 3px 4px 0px rgba(64,112,203,0.06);
    box-shadow:0px 3px 4px 0px rgba(64,112,203,0.06);
    padding:6px 0;
    margin:0;
    color:#63656E;
}
.monitor-navigation-nav .nav-item {
    -webkit-box-flex:0;
    -ms-flex:0 0 32px;
    flex:0 0 32px;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align:center;
    -ms-flex-align:center;
    align-items:center;
    padding:0 20px;
    list-style:none
}
.monitor-navigation-nav .nav-item:hover {
    color:#006DFF;
    cursor:pointer;
    background-color:#F0F1F5;
}
.monitor-navigation-admin {
    width:170px #63656E;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-orient:vertical;
    -webkit-box-direction:normal;
    -ms-flex-direction:column;
    flex-direction:column;
    background:#FFFFFF;
    border:1px solid #E2E2E2;
    -webkit-box-shadow:0px 3px 4px 0px rgba(64,112,203,0.06);
    box-shadow:0px 3px 4px 0px rgba(64,112,203,0.06);
    padding:6px 0;
    margin:0;
    color:#63656E;
}
.monitor-navigation-admin .nav-item {
    -webkit-box-flex:0;
    -ms-flex:0 0 32px;
    flex:0 0 32px;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align:center;
    -ms-flex-align:center;
    align-items:center;
    padding:0 20px;
    list-style:none
}
.monitor-navigation-admin .nav-item:hover {
    color:#006DFF;
    cursor:pointer;
    background-color:#F0F1F5;
}
.tippy-popper .tippy-tooltip.navigation-message-theme {
    padding:0;
    border-radius:0;
    -webkit-box-shadow:none;
    box-shadow:none;
}
</style>

```
:::

### 分组用法 {page=#/navigation}

:::demo 使用 bk-navigation-menu-group 来布局分组的普通的导航页面
```html
<template>
    <div class="monitor-navigation">
        <div style="margin-bottom: 20px">
            <bk-button theme="primary" @click="handleChangeNav">切换导航类型：{{curNav.name}}</bk-button>
        </div>
        <bk-navigation
            :header-title="nav.navId"
            :side-title="nav.title"
            :default-open="false"
            :navigation-type="curNav.nav"
            :need-menu="curNav.needMenu"
            @toggle="handleToggle">
            <template slot="header">
                <div class="monitor-navigation-header">
                    <ol class="header-nav" v-if="curNav.nav === 'top-bottom'">
                        <bk-popover v-for="(item,index) in header.list" :key="item.id" theme="light navigation-message" :arrow="false" offset="0, -5"  placement="bottom" :tippy-options="{ 'hideOnClick': false, flipBehavior: ['bottom'] }">
                            <li v-show="item.show" class="header-nav-item" :class="{ 'item-active': index === header.active }">
                                {{item.name}}
                            </li>
                            <template slot="content">
                                <ul class="monitor-navigation-nav">
                                    <li class="nav-item" v-for="headerNavItem in curHeaderNav.navList" :key="headerNavItem.id">
                                        {{headerNavItem.name}}
                                    </li>
                                </ul>
                            </template>
                        </bk-popover>
                    </ol>
                    <div v-else class="header-title">
                        <span class="header-title-icon">
                            <svg class="icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4756"><path d="M416 480h320v64H416l96 96-48 48-176-176 176-176 48 48-96 96z" p-id="4757"></path></svg>
                        </span>
                        {{nav.navId}}
                    </div>
                    <bk-select class="header-select" :class="{ 'is-left': curNav.nav === 'left-right' }" v-model="header.bizId" :clearable="false" searchable>
                        <bk-option v-for="option in header.selectList"
                            :key="option.id"
                            :id="option.id"
                            :name="option.name">
                        </bk-option>
                    </bk-select>
                    <bk-popover theme="light navigation-message" :arrow="false" offset="-150, 5" trigger="mouseenter" :tippy-options="{ 'hideOnClick': false }">
                        <div class="header-mind" :class="{ 'is-left': curNav.nav === 'left-right' }">
                            <svg style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <path d="M32,56c-1.3,0-2.6-0.6-3.4-1.6h-4.5c0.5,1.5,1.4,2.7,2.6,3.7c3.1,2.5,7.5,2.5,10.6,0c1.2-1,2.1-2.3,2.6-3.7h-4.5C34.6,55.4,33.3,56,32,56z"></path>
                                <path d="M53.8,49.1L50,41.5V28c0-8.4-5.8-15.7-14-17.6V8c0-2.2-1.8-4-4-4s-4,1.8-4,4v2.4c-8.2,1.9-14,9.2-14,17.6v13.5l-3.8,7.6c-0.3,0.6-0.3,1.3,0.1,1.9c0.4,0.6,1,1,1.7,1h40c0.7,0,1.3-0.4,1.7-1C54,50.4,54.1,49.7,53.8,49.1z"></path>
                            </svg>
                            <span class="header-mind-mark" :class="{ 'is-left': curNav.nav === 'left-right' }"></span>
                        </div>
                        <template slot="content">
                            <div class="monitor-navigation-message">
                                <h5 class="message-title">消息中心</h5>
                                <ul class="message-list">
                                    <li class="message-list-item" v-for="(item,index) in message.list" :key="index">
                                        <span class="item-message">{{item.message}}</span>
                                        <span class="item-date">{{item.date}}</span>
                                    </li>
                                </ul>
                                <div class="message-footer">进入消息中心</div>
                            </div>
                        </template>
                    </bk-popover>
                    <div class="header-help" :class="{ 'is-left': curNav.nav === 'left-right' }">
                        <svg class="bk-icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <path d="M32,4C16.5,4,4,16.5,4,32c0,3.6,0.7,7.1,2,10.4V56c0,1.1,0.9,2,2,2h13.6C36,63.7,52.3,56.8,58,42.4S56.8,11.7,42.4,6C39.1,4.7,35.6,4,32,4z M31.3,45.1c-1.7,0-3-1.3-3-3s1.3-3,3-3c1.7,0,3,1.3,3,3S33,45.1,31.3,45.1z M36.7,31.7c-2.3,1.3-3,2.2-3,3.9v0.9H29v-1c-0.2-2.8,0.7-4.4,3.2-5.8c2.3-1.4,3-2.2,3-3.8s-1.3-2.8-3.3-2.8c-1.8-0.1-3.3,1.2-3.5,3c0,0.1,0,0.1,0,0.2h-4.8c0.1-4.4,3.1-7.4,8.5-7.4c5,0,8.3,2.8,8.3,6.9C40.5,28.4,39.2,30.3,36.7,31.7z"></path>
                        </svg>
                    </div>
                    <bk-popover theme="light navigation-message" :arrow="false" offset="-20, 10" placement="bottom-start" :tippy-options="{ 'hideOnClick': false }">
                        <div class="header-user" :class="{ 'is-left': curNav.nav === 'left-right' }">
                            Liang
                            <i class="bk-icon icon-down-shape"></i>
                        </div>
                        <template slot="content">
                            <ul class="monitor-navigation-admin">
                                <li class="nav-item" v-for="userItem in user.list" :key="userItem">
                                    {{userItem}}
                                </li>
                            </ul>
                        </template>
                    </bk-popover>
                </div>
            </template>
            <template slot="menu">
                <bk-navigation-menu
                    ref="menu"
                    @select="handleNavSelect"
                    :default-active="nav.navId"
                    :unique-opened="true"
                    :before-nav-change="beforeNavChange"
                    :toggle-active="nav.toggle">
                    <bk-navigation-menu-group
                        v-for="item in nav.list2"
                        :key="item.name"
                        :group-name="item.name">
                        <bk-navigation-menu-item
                            :key="child.name"
                            v-for="child in item.children"
                            :id="child.name"
                            :disabled="child.disabled"
                            :icon="child.icon"
                            :href="child.href"
                            :has-child="child.children && !!child.children.length"
                            :default-active="child.active">
                            <span>{{child.name}}</span>
                            <div slot="child">
                                <bk-navigation-menu-item
                                    :key="set.name"
                                    v-for="set in child.children"
                                    :id="set.name"
                                    :disabled="set.disabled"
                                    :href="set.href"
                                    :default-active="set.active">
                                    <span>{{set.name}}</span>
                                </bk-navigation-menu-item>
                            </div>
                        </bk-navigation-menu-item>
                    </bk-navigation-menu-group>
                </bk-navigation-menu>
            </template>
            <div class="monitor-navigation-content">

            </div>
            <template slot="footer">
                <div class="monitor-navigation-footer">
                    Copyright © 2020-{{new Date().getFullYear()}} T-Inside Design. All Rights Reserved. T-inside Design 版权所有
                </div>
            </template>
        </bk-navigation>
    </div>
</template>

<script>
    import { bkNavigation, bkNavigationMenu, bkNavigationMenuItem, bkNavigationMenuGroup, bkSelect, bkOption, bkPopover, bkButton } from '{{BASE_LIB_NAME}}'
    export default {
        name: 'monitor-navigation',
        components: {
            bkNavigation,
            bkNavigationMenu,
            bkNavigationMenuItem,
            bkNavigationMenuGroup,
            bkSelect,
            bkOption,
            bkPopover,
            bkButton
        },
        data () {
            return {
                navActive: 0,
                navMap: [
                    {
                        nav: 'left-right',
                        needMenu: true,
                        name: '左右结构导航'
                    },
                    {
                        nav: 'top-bottom',
                        needMenu: true,
                        name: '上下结构导航'
                    },
                    {
                        nav: 'top-bottom',
                        needMenu: false,
                        name: '上下结构无侧栏导航'
                    }
                ],
                nav: {
                    list2: [
                        {
                            name: '计算资源',
                            children: [
                                {
                                    name: '集群',
                                    href: '/#/navigation/example',
                                    icon: 'icon-tree-application-shape'
                                },
                                {
                                    name: '节点',
                                    href: '/',
                                    icon: 'icon-tree-application-shape'
                                },
                                {
                                    name: '服务',
                                    href: '/',
                                    icon: 'icon-tree-application-shape'
                                }
                            ]
                        },
                        {
                            name: '配置',
                            children: [
                                {
                                    name: '模板集',
                                    href: '/#/navigation/example',
                                    active: true,
                                    icon: 'icon-tree-application-shape'
                                },
                                {
                                    name: '变量管理',
                                    title: true,
                                    href: '/3',
                                    icon: 'icon-tree-application-shape'
                                },
                                {
                                    name: 'Metric管理',
                                    title: true,
                                    href: '/4',
                                    icon: 'icon-tree-application-shape'
                                }
                            ]
                        },
                        {
                            name: '其他配置',
                            children: [
                                {
                                    name: '模板设置',
                                    active: true,
                                    icon: 'icon-tree-application-shape',
                                    children: [
                                        {
                                            name: '测试页一'
                                        },
                                        {
                                            name: '测试页二'
                                        },
                                        {
                                            name: '测试页三'
                                        }
                                    ]
                                },
                                {
                                    name: '应用配置',
                                    title: true,
                                    href: '/3',
                                    icon: 'icon-tree-application-shape'
                                },
                                {
                                    name: '网络',
                                    title: true,
                                    href: '/4',
                                    icon: 'icon-tree-application-shape'
                                }
                            ]
                        }
                    ],
                    navId: '集群',
                    toggle: false,
                    submenuActive: false,
                    title: 'TInside测试平台'
                },
                header: {
                    list: [
                        {
                            name: '作业平台',
                            id: 1,
                            show: true
                        },
                        {
                            name: '配置平台',
                            id: 2,
                            show: true
                        },
                        {
                            name: '监控平台',
                            id: 3,
                            show: true,
                            navList: [
                                {
                                    name: '插件管理',
                                    id: 1
                                },
                                {
                                    name: '采集配置',
                                    id: 2
                                },
                                {
                                    name: '策略配置',
                                    id: 3
                                },
                                {
                                    name: '事件中心',
                                    id: 4
                                }
                            ],
                            navActive: 2
                        },
                        {
                            name: '蓝盾平台',
                            id: 4,
                            show: true
                        }
                    ],
                    selectList: [
                        {
                            name: '英雄联盟',
                            id: 1
                        },
                        {
                            name: '和平精英',
                            id: 2
                        },
                        {
                            name: '王者荣耀',
                            id: 3
                        }
                    ],
                    active: 2,
                    bizId: 1
                },
                message: {
                    list: [
                        {
                            message: '你的“20181212112308”单据已通过',
                            date: '刚刚'
                        },
                        {
                            message: '你的“20181212112308”单据被驳回',
                            date: '45分钟前'
                        },
                        {
                            message: '你的“20181212112308”单据部分被驳回',
                            date: '3天前'
                        },
                        {
                            message: '你的“20181212112308”单据部分被驳回',
                            date: '12月14日'
                        },
                        {
                            message: 'jinnyyang 提醒了你',
                            date: '12月14日'
                        },
                        {
                            message: 'edwinwu 重新申请了“201812121108”内关于“TInside作业平台”“TInside作业平台”',
                            date: '12月14日'
                        },
                        {
                            message: '你的“20181212112308”单据部分被驳回',
                            date: '12月14日'
                        },
                        {
                            message: 'jinnyyang 提醒了你',
                            date: '12月14日'
                        },
                        {
                            message: 'edwinwu 重新申请了“201812121108”内关于“TInside作业平台”的权限申请。',
                            date: '12月14日'
                        }
                    ]
                },
                user: {
                    list: [
                        '项目管理',
                        '权限中心',
                        '退出'
                    ]
                }
            }
        },
        computed: {
            curNav () {
                return this.navMap[this.navActive]
            },
            curHeaderNav () {
                return this.header.list[this.header.active] || {}
            }
        },
        methods: {
            handleNavSelect (id, item) {
                this.nav.navId = id
                console.info(`你选择了${id}`)
            },
            handleToggle (v) {
                this.nav.toggle = v
            },
            beforeNavChange (newId, oldId) {
                console.info(newId, oldId)
                return true
            },
            handleChangeNav () {
                this.navActive = (this.navActive + 1) % 3
            }
        }
    }
</script>

<style>

/* 以下样式是为了适应例子父级的宽高而设置 */
.bk-navigation {
    width:calc(100vw - 530px) !important;
    height:calc(100vh - 140px) !important;
    outline:1px solid #ebebeb;
}
.bk-navigation .bk-navigation-wrapper {
    height:calc(100vh - 252px)!important;
}
/* 以上样式是为了适应例子父级的宽高而设置 */

.monitor-navigation-header {
    -webkit-box-flex:1;
    -ms-flex:1;
    flex:1;
    height:100%;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align:center;
    -ms-flex-align:center;
    align-items:center;
    font-size:14px;
}
.monitor-navigation-header .header-nav {
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    padding:0;
    margin:0;
}
.monitor-navigation-header .header-nav-item {
    list-style:none;
    height:50px;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align:center;
    -ms-flex-align:center;
    align-items:center;
    margin-right:40px;
    color:#96A2B9;
    min-width:56px
}
.monitor-navigation-header .header-nav-item.item-active {
    color:#FFFFFF !important;
}
.monitor-navigation-header .header-nav-item:hover {
    cursor:pointer;
    color:#D3D9E4;
}
.monitor-navigation-header .header-title {
    color:#63656E;
    font-size:16px;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align:center;
    -ms-flex-align:center;
    align-items:center;
    margin-left:-6px;
}
.monitor-navigation-header .header-title-icon {
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align:center;
    -ms-flex-align:center;
    align-items:center;
    width:28px;
    height:28px;
    font-size:28px;
    color:#006DFF;
    cursor:pointer;
}
.monitor-navigation-header .header-select {
    width:240px;
    margin-left:auto;
    margin-right:34px;
    border:none;
    background:#252F43;
    color:#D3D9E4;
    -webkit-box-shadow:none;
    box-shadow:none
}
.monitor-navigation-header .header-select.is-left {
    background:#F0F1F5;
    color:#63656E;
}
.monitor-navigation-header .header-mind {
    color:#768197;
    font-size:16px;
    position:relative;
    height:32px;
    width:32px;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align:center;
    -ms-flex-align:center;
    align-items:center;
    -webkit-box-pack:center;
    -ms-flex-pack:center;
    justify-content:center;
    margin-right:8px
}
.monitor-navigation-header .header-mind.is-left {
    color:#63656E;
}
.monitor-navigation-header .header-mind.is-left:hover {
    color:#006DFF;
    background:#F0F1F5
}
.monitor-navigation-header .header-mind-mark {
    position:absolute;
    right:8px;
    top:8px;
    height:7px;
    width:7px;
    border:1px solid #27334C;
    background-color:#EA3636;
    border-radius:100%
}
.monitor-navigation-header .header-mind-mark.is-left {
    border-color:#F0F1F5;
}
.monitor-navigation-header .header-mind:hover {
    background:-webkit-gradient(linear,right top, left top,from(rgba(37,48,71,1)),to(rgba(38,50,71,1)));
    background:linear-gradient(270deg,rgba(37,48,71,1) 0%,rgba(38,50,71,1) 100%);
    border-radius:100%;
    cursor:pointer;
    color:#D3D9E4;
}
.monitor-navigation-header .header-help {
    color:#768197;
    font-size:16px;
    position:relative;
    height:32px;
    width:32px;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align:center;
    -ms-flex-align:center;
    align-items:center;
    -webkit-box-pack:center;
    -ms-flex-pack:center;
    justify-content:center;
    margin-right:8px
}
.monitor-navigation-header .header-help.is-left {
    color:#63656E;
}
.monitor-navigation-header .header-help.is-left:hover {
    color:#006DFF;
    background:#F0F1F5
}
.monitor-navigation-header .header-help:hover {
    background:-webkit-gradient(linear,right top, left top,from(rgba(37,48,71,1)),to(rgba(38,50,71,1)));
    background:linear-gradient(270deg,rgba(37,48,71,1) 0%,rgba(38,50,71,1) 100%);
    border-radius:100%;
    cursor:pointer;
    color:#D3D9E4;
}
.monitor-navigation-header .header-user {
    height:100%;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align:center;
    -ms-flex-align:center;
    align-items:center;
    -webkit-box-pack:center;
    -ms-flex-pack:center;
    justify-content:center;
    color:#96A2B9;
    margin-left:8px;
}
.monitor-navigation-header .header-user .bk-icon {
    margin-left:5px;
    font-size:12px;
}
.monitor-navigation-header .header-user.is-left {
    color:#63656E;
}
.monitor-navigation-header .header-user.is-left:hover {
    color:#006DFF
}
.monitor-navigation-header .header-user:hover {
    cursor:pointer;
    color:#D3D9E4;
}
.monitor-navigation-content {
    height:calc(100% - 84px);
    background:#FFFFFF;
    -webkit-box-shadow:0px 2px 4px 0px rgba(25,25,41,0.05);
    box-shadow:0px 2px 4px 0px rgba(25,25,41,0.05);
    border-radius:2px;
    border:1px solid rgba(220,222,229,1);
}
.monitor-navigation-footer {
    height:52px;
    width:100%;
    margin:32px 0 0;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align:center;
    -ms-flex-align:center;
    align-items:center;
    -webkit-box-pack:center;
    -ms-flex-pack:center;
    justify-content:center;
    border-top:1px solid #DCDEE5;
    color:#63656E;
    font-size:12px;
}
.monitor-navigation-message {
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-orient:vertical;
    -webkit-box-direction:normal;
    -ms-flex-direction:column;
    flex-direction:column;
    width:360px;
    background-color:#FFFFFF;
    border:1px solid #E2E2E2;
    border-radius:2px;
    -webkit-box-shadow:0px 3px 4px 0px rgba(64,112,203,0.06);
    box-shadow:0px 3px 4px 0px rgba(64,112,203,0.06);
    color:#979BA5;
    font-size:12px;
}
.monitor-navigation-message .message-title {
    -webkit-box-flex:0;
    -ms-flex:0 0 48px;
    flex:0 0 48px;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align:center;
    -ms-flex-align:center;
    align-items:center;
    color:#313238;
    font-size:14px;
    padding:0 20px;
    margin:0;
    border-bottom:1px solid #F0F1F5;
}
.monitor-navigation-message .message-list {
    -webkit-box-flex:1;
    -ms-flex:1;
    flex:1;
    max-height:450px;
    overflow:auto;
    margin:0;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-orient:vertical;
    -webkit-box-direction:normal;
    -ms-flex-direction:column;
    flex-direction:column;
    padding:0;
}
.monitor-navigation-message .message-list-item {
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    width:100%;
    padding:0 20px;
}
.monitor-navigation-message .message-list-item .item-message {
    padding:13px 0;
    line-height:16px;
    min-height:42px;
    -webkit-box-flex:1;
    -ms-flex:1;
    flex:1;
    -ms-flex-wrap:wrap;
    flex-wrap:wrap;
    color:#63656E;
}
.monitor-navigation-message .message-list-item .item-date {
    padding:13px 0;
    margin-left:16px;
    color:#979BA5;
}
.monitor-navigation-message .message-list-item:hover {
    cursor:pointer;
    background:#F0F1F5;
}
.monitor-navigation-message .message-footer {
    -webkit-box-flex:0;
    -ms-flex:0 0 42px;
    flex:0 0 42px;
    border-top:1px solid #F0F1F5;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align:center;
    -ms-flex-align:center;
    align-items:center;
    -webkit-box-pack:center;
    -ms-flex-pack:center;
    justify-content:center;
    color:#006DFF;
}
.monitor-navigation-nav {
    width:150px;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-orient:vertical;
    -webkit-box-direction:normal;
    -ms-flex-direction:column;
    flex-direction:column;
    background:#FFFFFF;
    border:1px solid #E2E2E2;
    -webkit-box-shadow:0px 3px 4px 0px rgba(64,112,203,0.06);
    box-shadow:0px 3px 4px 0px rgba(64,112,203,0.06);
    padding:6px 0;
    margin:0;
    color:#63656E;
}
.monitor-navigation-nav .nav-item {
    -webkit-box-flex:0;
    -ms-flex:0 0 32px;
    flex:0 0 32px;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align:center;
    -ms-flex-align:center;
    align-items:center;
    padding:0 20px;
    list-style:none
}
.monitor-navigation-nav .nav-item:hover {
    color:#006DFF;
    cursor:pointer;
    background-color:#F0F1F5;
}
.monitor-navigation-admin {
    width:170px #63656E;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-orient:vertical;
    -webkit-box-direction:normal;
    -ms-flex-direction:column;
    flex-direction:column;
    background:#FFFFFF;
    border:1px solid #E2E2E2;
    -webkit-box-shadow:0px 3px 4px 0px rgba(64,112,203,0.06);
    box-shadow:0px 3px 4px 0px rgba(64,112,203,0.06);
    padding:6px 0;
    margin:0;
    color:#63656E;
}
.monitor-navigation-admin .nav-item {
    -webkit-box-flex:0;
    -ms-flex:0 0 32px;
    flex:0 0 32px;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-align:center;
    -ms-flex-align:center;
    align-items:center;
    padding:0 20px;
    list-style:none
}
.monitor-navigation-admin .nav-item:hover {
    color:#006DFF;
    cursor:pointer;
    background-color:#F0F1F5;
}
.tippy-popper .tippy-tooltip.navigation-message-theme {
    padding:0;
    border-radius:0;
    -webkit-box-shadow:none;
    box-shadow:none;
}
</style>

```
:::

### bk-navigation 属性 {page=#/navigation}
| 参数 | 说明    | 类型      | 可选值       | 默认值   |
| ---- | ------ | --------- | ----------- | -------- |
| nav-width | 左侧导航栏缩小宽度 | String/Number | —— | 60 |
| hover-width | 左侧导航栏固定、hover放大效果宽度 | String/Number | —— | 260 |
| side-title | 左侧导航标题 | String | —— |——|
| header-title | 右侧内容栏头部标题 | String | —— | 栏目名称 |
| hover-leave-delay | 左侧导航栏hover离开缩回延迟时间 | String/Number | —— | 0 |
| default-open | 是否默认展开左侧栏 | Boolean | —— | false |
| theme-color | 左侧栏主题色 | String | —— | #182132 |
| head-height | 导航上测栏的高度 | String/Number | —— | 52 |
| navigation-type | 导航布局结构类型 | String | left-right/top-bottom | left-right |
| need-menu | 是否需要左侧导航条 | Boolean | —— | true |
| ext-cls | 配置自定义样式类名，传入的类会被加在组件最外层的 DOM `.navigation-bar` 上 | String | —— | —— |

### bk-navigation 事件 {page=#/navigation}
| 事件名称 | 说明 | 回调参数 |
|---------|------|---------|
| hover | 鼠标进入左侧导航栏后触发 | Boolean |
| leave | 鼠标离开左侧导航栏后触发 | Boolean |
| toggle | 左侧导航栏缩回或伸展触发 | Boolean |
| toggle-click | 点击左侧导航栏底部固定导航按钮触发 | Boolean |

### bk-navigation 插槽 {page=#/navigation}
| name | 说明 |
|---|---|
| —— | 默认插槽，右侧内容设置 |
| side-icon | 左侧菜单头部icon插槽 |
| side-header | 左侧菜单头部插槽 |
| menu | 左侧menu插槽 |
| header | 右侧头部插槽 |
| header-set | 右侧头部title右侧内容插槽 |
| footer | 右侧底部footer插槽 |

### bk-navigation-menu 属性 {page=#/navigation}
| 参数 | 说明    | 类型      | 可选值       | 默认值   |
| ---- | ------ | --------- | ----------- | -------- |
| default-active | 默认选中的菜单栏目ID | String/Number | —— | —— |
| unique-opened | 左侧导航栏是否只保持一个子菜单的展开 | Boolean| —— | true |
| toggle-active | 左侧导航栏在伸缩时子级菜单是否一起展开和收回  | Boolean| —— | false |
| item-hover-bg-color | menu子项hover背景色 | String | —— | linear-gradient(90deg,rgba(37,48,71,1) 0%,rgba(32,42,60,1) 100%) |
| item-hover-color | menu子项hover字体颜色 | String | —— | #D3D9E4 |
| item-active-bg-color | menu子项选中背景色 | String | —— | linear-gradient(90deg,rgba(63,135,255,1) 0%,rgba(58,132,255,1) 100%) |
| item-active-color | menu子项选中字体色 | String | —— | #FFFFFF |
| item-default-bg-color | menu子项默认背景色 | String | —— | #182132 |
| item-default-color | menu子项默认字体色 | String | —— | #96A2B9 |
| item-default-icon-color | menu子项默认icon的颜色 | String | —— | #B0BDD5 |
| item-child-icon-default-color | menu子项的二级栏icon的颜色 | String | —— | #63656E |
| item-child-icon-hover-color | menu子项的二级栏icon hover动作的颜色 | String | —— | #D3D9E4 |
| item-active-icon-color | 选中时menu子项icon颜色 | String | —— | #FFFFFF |
| item-hover-icon-color | menu子项icon hover颜色 | String | —— | #D3D9E4 |
| item-child-icon-active-color | 子级item选中时icon颜色 | String | —— | #FFFFFF |
| sub-menu-open-bg-color | 父级menu展开后的背景色 | String | —— | #151D2C |
| before-nav-change | 手动点击 nav-item 子项之前触发判断是否改变 nav 导向，支持异步，返回 false 标识不改变 | Funticon | —— | true |

### bk-navigation-menu 插槽 {page=#/navigation}
| name | 说明 |
|---|---|
| —— | 默认插槽，用于设置菜单子项 子项inject接受bk-menu实例 |

### bk-navigation-menu-item 属性 {page=#/navigation}
| 参数 | 说明    | 类型      | 可选值       | 默认值   |
| ---- | ------ | --------- | ----------- | -------- |
| id | 唯一标示ID | String/Number | 必填项 | —— |
| disabled | 是否禁用 | Boolean| —— | false |
| icon | 图标 | String/ Object/ Array| —— | —— |
| has-child | 是否有子项 | Boolean| —— | false |
| group | 是否分组标示 | Boolean| —— | false |
| title | 是否标题标示 | Boolean| —— | false |

### bk-navigation-menu-item 事件 {page=#/navigation}
| 事件名称 | 说明 | 回调参数 |
|---------|------|---------|
| click | click事件回调 | id |
| sub-menu-click | 子项父级菜单栏click事件回调 | id |
| open | 打开子事件回调 | Boolean |
| close | 关闭子菜单事件回调 | Boolean |

### bk-navigation-menu-item 插槽 {page=#/navigation}
| name | 说明 |
|---|---|
| —— | 默认插槽，用于设置菜单子项显示内容 |
| child | 用以设置子菜单插槽 |

### bk-navigation-menu-group 属性 {page=#/navigation}
| 参数 | 说明    | 类型      | 可选值       | 默认值   |
| ---- | ------ | --------- | ----------- | -------- |
| groupName | 分组名称 | String | —— | —— |

### bk-navigation-menu-group 插槽 {page=#/navigation}
| name | 说明 |
|---|---|
| group | 用以设置分组名称的插槽 |

### bk-navigation-menu-group 事件 {page=#/navigation}
| 事件名称 | 说明 | 回调参数 |
|---------|------|---------|
| click | click事件回调 | MouseEvent groupName |
