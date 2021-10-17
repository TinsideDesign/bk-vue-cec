/*
 * Tencent is pleased to support the open source community by making
 * 科技内在设计（T-inside） available.
 *
 * Copyright (C) 2021 TID Limited, a DAO.  All rights reserved.
 *
 * 科技内在设计（T-inside） is licensed under the MIT License.
 *
 * License for 科技内在设计（T-inside）:
 *
 * ---------------------------------------------------
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
 * to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of
 * the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
 * THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
*/

/**
 * @file example 文档左侧导航配置
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

export default {
    // 文档页面分组数据，groupId 为分组标题，components 为当前组内的组件
    groups: [
        {
            components: [
                {
                    id: 'what-this',
                    name: '这是什么'
                },
                {
                    id: 'install',
                    name: '安装'
                },
                {
                    id: 'start',
                    name: '快速上手'
                },
                {
                    id: 'config',
                    name: '自定义配置'
                },
                {
                    id: 'i18n',
                    name: '国际化'
                },
                {
                    id: 'spec',
                    name: '代码规范'
                },
                {
                    id: 'changelog',
                    name: '更新日志'
                },
            ]
        },
        {
            groupId: '基础',
            components: [
                {
                    id: 'color',
                    name: 'Color 色彩'
                },
                {
                    id: 'font',
                    name: 'Font 字体'
                },
                {
                    id: 'icon',
                    name: 'Icon 图标'
                },
                {
                    id: 'button',
                    name: 'Button 基础按钮'
                },
                {
                    id: 'link',
                    name: 'Link 文字链接'
                },
                {
                    id: 'transition',
                    name: 'Transition 过渡动画'
                }
            ]
        },
        {
            groupId: '布局',
            components: [
                {
                    id: 'grid',
                    name: 'Grid 栅格'
                },
                {
                    id: 'resize-layout',
                    name: 'ResizeLayout 可拉伸布局'
                }
            ]
        },
        {
            groupId: '导航',
            components: [
                {
                    'id': 'navigation',
                    'name': 'Navigation 导航'
                },
                {
                    id: 'tab',
                    name: 'Tab 选项卡'
                },
                {
                    id: 'steps',
                    name: 'Steps 步骤'
                },
                {
                    id: 'process',
                    name: 'Process 步骤'
                },
                {
                    id: 'breadcrumb',
                    name: 'Breadcrumb 面包屑'
                },
                {
                    id: 'divider',
                    name: 'Divider 分割线'
                },
                {
                    id: 'fixedNavbar',
                    name: 'FixedNavbar 悬浮导航'
                },
                {
                    id: 'affix',
                    name: 'Affix 图钉'
                }
            ]
        },
        {
            groupId: '表单',
            components: [
                {
                    id: 'input',
                    name: 'Input 输入框'
                },
                {
                    id: 'radio',
                    name: 'Radio 单选框'
                },
                {
                    id: 'checkbox',
                    name: 'Checkbox 多选框'
                },
                {
                    id: 'select',
                    name: 'Select 下拉选框'
                },
                {
                    id: 'cascade',
                    name: 'Cascade 级联选框'
                },
                {
                    id: 'switcher',
                    name: 'Switcher 开关'
                },
                {
                    id: 'colorPicker',
                    name: 'ColorPicker 颜色选择器'
                },
                {
                    id: 'datePicker',
                    name: 'DatePicker 日期选择器'
                },
                {
                    id: 'timePicker',
                    name: 'TimePicker 时间选择器'
                },
                {
                    id: 'tag',
                    name: 'TagInput 标签输入框'
                },
                {
                    id: 'upload',
                    name: 'Upload 文件上传'
                },
                {
                    id: 'searchselect',
                    name: 'SearchSelect 查询选择器'
                },
                {
                    id: 'slider',
                    name: 'Slider 滑动选择器'
                },
                {
                    id: 'transfer',
                    name: 'Transfer 穿梭框'
                },
                {
                    id: 'rate',
                    name: 'Rate 评分'
                },
                {
                    id: 'componseFormItem',
                    name: 'ComposeFormItem 表单项组合'
                },
                {
                    id: 'form',
                    name: 'Form 表单'
                }
            ]
        },
        {
            groupId: '数据',
            components: [
                {
                    id: 'animateNumber',
                    name: 'AnimateNumber 动画数字'
                },
                {
                    id: 'badge',
                    name: 'Badge 标记'
                },
                {
                    id: 'collapse',
                    name: 'Collapse 折叠面板'
                },
                {
                    id: 'diff',
                    name: 'Diff 差异对比'
                },
                {
                    id: 'dropdownMenu',
                    name: 'DropdownMenu 下拉菜单'
                },
                {
                    id: 'swiper',
                    name: 'Swiper 轮播'
                },
                {
                    id: 'pagination',
                    name: 'Pagination 分页'
                },
                {
                    id: 'roundProgress',
                    name: 'RoundProgress 圆形进度'
                },
                {
                    id: 'progress',
                    name: 'Progress 进度条'
                },
                {
                    id: 'timeline',
                    name: 'Timeline 时间轴'
                },
                {
                    id: 'tree',
                    name: 'Tree 树'
                },
                {
                    id: 'bigTree',
                    name: 'Big Tree 大树'
                },
                {
                    id: 'table',
                    name: 'Table 表格'
                },
                {
                    id: 'tags',
                    name: 'Tag 标签'
                },
                {
                    id: 'virtualScroll',
                    name: 'VirtualScroll 虚拟滚动'
                },
                {
                    id: 'zoomImage',
                    name: 'ZoomImage 缩放图组件'
                },
                {
                    id: 'image',
                    name: 'Image 可预览的图片'
                }
            ]
        },
        {
            groupId: '反馈',
            components: [
                {
                    id: 'alert',
                    name: 'Alert 警告'
                },
                {
                    id: 'exception',
                    name: 'Exception 异常提示'
                },
                {
                    id: 'loading',
                    name: 'Loading 加载'
                },
                {
                    id: 'infoBox',
                    name: 'Info 提示框'
                },
                {
                    id: 'message',
                    name: 'Message 消息提示'
                },
                {
                    id: 'notify',
                    name: 'Notify 通知提示'
                },
                {
                    id: 'tooltips',
                    name: 'Tooltips 工具提示'
                },
                {
                    id: 'popover',
                    name: 'Popover 弹出框提示'
                },
                {
                    id: 'popconfirm',
                    name: 'Popconfirm 弹出确认框'
                },
                {
                    id: 'dialog',
                    name: 'Dialog 对话框'
                },
                {
                    id: 'sideSlider',
                    name: 'Sideslider 侧栏'
                },
                {
                    id: 'card',
                    name: 'Card 卡片'
                },
                {
                    id: 'spin',
                    name: 'Spin 加载中'
                }
            ]
        },
        {
            groupId: '其他',
            components: [
                {
                    id: 'directives',
                    name: '自定义指令'
                },
                {
                    id: 'versionDetail',
                    name: '版本更新明细业务组件'
                }
            ]
        }
    ]
}
