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
 * @file example router
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import Vue from 'vue'
import VueRouter from 'vue-router'

const Install = () => import(/* webpackChunkName: 'install' */'./components/install/readme.md')
const Start = () => import(/* webpackChunkName: 'start' */'./components/start/readme.md')
const Config = () => import(/* webpackChunkName: 'config' */'./components/config/readme.md')
const Spec = () => import(/* webpackChunkName: 'spec' */'./components/spec/readme.md')
const Color = () => import(/* webpackChunkName: 'color' */'./components/color/readme.md')
const ColorPicker = () => import(/* webpackChunkName: 'color-picker' */'./components/color-picker/readme.md')
const ColorPickerExample = () => import(/* webpackChunkName: 'color-picker' */'./components/color-picker/example')
const ComposeFormItem = () => import(/* webpackChunkName: 'compose-form-item' */'./components/compose-form-item/readme.md')
const Font = () => import(/* webpackChunkName: 'font' */'./components/font/readme.md')
const Alert = () => import(/* webpackChunkName: 'alert' */'./components/alert/readme.md')
const AnimateNumber = () => import(/* webpackChunkName: 'animate-number' */'./components/animate-number/readme.md')
const Button = () => import(/* webpackChunkName: 'button' */'./components/button/readme.md')
const ButtonExample = () => import(/* webpackChunkName: 'button' */'./components/button/example')
const DropdownMenu = () => import(/* webpackChunkName: 'dropdown-menu' */'./components/dropdown-menu/readme.md')
const SideSlider = () => import(/* webpackChunkName: 'sideslider' */'./components/sideslider/readme.md')
const SideSliderExample = () => import(/* webpackChunkName: 'sideslider' */'./components/sideslider/example')
const Switcher = () => import(/* webpackChunkName: 'switcher' */'./components/switcher/readme.md')
const SwitcherExample = () => import(/* webpackChunkName: 'switcher' */'./components/switcher/example')
const TagInput = () => import(/* webpackChunkName: 'tag-input' */'./components/tag-input/readme.md')
const TagInputExample = () => import(/* webpackChunkName: 'tag-input' */'./components/tag-input/example')
const Dialog = () => import(/* webpackChunkName: 'dialog' */'./components/dialog/readme.md')
const DialogExample = () => import(/* webpackChunkName: 'dialog' */'./components/dialog/example')
const Loading = () => import(/* webpackChunkName: 'loading' */'./components/loading/readme.md')
const Message = () => import(/* webpackChunkName: 'message' */'./components/message/readme.md')
const Notify = () => import(/* webpackChunkName: 'notify' */'./components/notify/readme.md')
const Tooltips = () => import(/* webpackChunkName: 'tooltips' */'./components/tooltips/readme.md')
const TooltipsExample = () => import(/* webpackChunkName: 'tooltips' */'./components/tooltips/example')
const Steps = () => import(/* webpackChunkName: 'steps' */'./components/steps/readme.md')
const Badge = () => import(/* webpackChunkName: 'badge' */'./components/badge/readme.md')
const Icon = () => import(/* webpackChunkName: 'info-box' */'./components/icon/readme.md')
const InfoBox = () => import(/* webpackChunkName: 'info-box' */'./components/info-box/readme.md')
const InfoBoxExample = () => import(/* webpackChunkName: 'info-box' */'./components/info-box/example')
const Popover = () => import(/* webpackChunkName: 'popover' */'./components/popover/readme.md')
const Popconfirm = () => import(/* webpackChunkName: 'popconfirm' */'./components/popconfirm/readme.md')
const PopconfirmExample = () => import(/* webpackChunkName: 'popconfirm' */'./components/popconfirm/example')
const TimePicker = () => import(/* webpackChunkName: 'time-picker' */'./components/time-picker/readme.md')
const TimePickerExample = () => import(/* webpackChunkName: 'time-picker' */'./components/time-picker/example')
const DatePicker = () => import(/* webpackChunkName: 'date-picker' */'./components/date-picker/readme.md')
const DatePickerExample = () => import(/* webpackChunkName: 'date-picker' */'./components/date-picker/example')
const Form = () => import(/* webpackChunkName: 'form' */'./components/form/readme.md')
const Pagination = () => import(/* webpackChunkName: 'pagination' */'./components/pagination/readme.md')
const Changelog = () => import(/* webpackChunkName: 'changelog' */'./components/changelog/readme.md')
const I18N = () => import(/* webpackChunkName: 'i18n' */'./components/i18n/readme.md')
const I18NBuildinExample = () => import(/* webpackChunkName: 'i18n' */'./components/i18n/buildin-example.vue')
const VueI18NExample = () => import(/* webpackChunkName: 'i18n' */'./components/i18n/vue-i18n-example.vue')
const VueI18NCustomExample = () => import(/* webpackChunkName: 'i18n' */'./components/i18n/vue-i18n-custom-example.vue')
const Transfer = () => import(/* webpackChunkName: 'transfer' */'./components/transfer/readme.md')
const TransferExample = () => import(/* webpackChunkName: 'transfer' */'./components/transfer/example')
const Tree = () => import(/* webpackChunkName: 'tree' */'./components/tree/readme.md')
const TreeExample = () => import(/* webpackChunkName: 'tree' */'./components/tree/example')
const Round = () => import(/* webpackChunkName: 'round-progress' */'./components/round-progress/readme.md')
const Progress = () => import(/* webpackChunkName: 'progress' */'./components/progress/readme.md')
const Timeline = () => import(/* webpackChunkName: 'timeline' */'./components/timeline/readme.md')
const Upload = () => import(/* webpackChunkName: 'upload' */'./components/upload/readme.md')
const UploadExample = () => import(/* webpackChunkName: 'upload' */'./components/upload/example')
const Collapse = () => import(/* webpackChunkName: 'collapse' */'./components/collapse/readme.md')
const Process = () => import(/* webpackChunkName: 'process' */'./components/process/readme.md')
const ProcessExample = () => import(/* webpackChunkName: 'process' */'./components/process/example')
const Exception = () => import(/* webpackChunkName: 'exception' */'./components/exception/readme.md')
const Input = () => import(/* webpackChunkName: 'input' */'./components/input/readme.md')
const InputExample = () => import(/* webpackChunkName: 'input' */'./components/input/example')
const Radio = () => import(/* webpackChunkName: 'radio' */'./components/radio/readme.md')
const RadioExample = () => import(/* webpackChunkName: 'radio' */'./components/radio/example')
const Checkbox = () => import(/* webpackChunkName: 'checkbox' */'./components/checkbox/readme.md')
const CheckboxExample = () => import(/* webpackChunkName: 'checkbox' */'./components/checkbox/example')
const Table = () => import(/* webpackChunkName: 'table' */'./components/table/readme.md')
const TableExample = () => import(/* webpackChunkName: 'table' */'./components/table/example.vue')
const Diff = () => import(/* webpackChunkName: 'diff' */'./components/diff/readme.md')
const Tab = () => import(/* webpackChunkName: 'tab' */'./components/tab/readme.md')
const TabExample = () => import(/* webpackChunkName: 'tab' */'./components/tab/example.vue')
const Select = () => import(/* webpackChunkName: 'select' */'./components/select/readme.md')
const SelectExample = () => import(/* webpackChunkName: 'select' */'./components/select/example')
const Slider = () => import(/* webpackChunkName: 'slider' */'./components/slider/readme.md')
const Grid = () => import(/* webpackChunkName: 'grid' */'./components/grid/readme.md')
const GridExample = () => import(/* webpackChunkName: 'grid' */'./components/grid/example')
const Directives = () => import(/* webpackChunkName: 'directives' */'./components/directives/readme.md')
const Navigation = () => import(/* webpackChunkName: 'navigation' */'./components/navigation/readme.md')
const NavigationExample = () => import(/* webpackChunkName: 'navigation-example' */'./components/navigation/demo')
const SearchSelect = () => import(/* webpackChunkName: 'search-select' */'./components/search-select/readme.md')
const SearchSelectExample = () => import(/* webpackChunkName: 'search-select-example' */'./components/search-select/example')
const Rate = () => import(/* webpackChunkName: 'rate' */'./components/rate/readme.md')
const Swiper = () => import(/* webpackChunkName: 'swiper' */'./components/swiper/readme.md')
const BigTreeExample = () => import(/* webpackChunkName: 'big-tree' */'./components/big-tree/example.vue')
const BigTree = () => import(/* webpackChunkName: 'big-tree' */'./components/big-tree/readme.md')
const VirtualScroll = () => import(/* webpackChunkName: 'virtual-scroll' */'./components/virtual-scroll/readme.md')
const Link = () => import(/* webpackChunkName: 'link' */'./components/link/readme.md')
const LinkExample = () => import(/* webpackChunkName: 'link' */'./components/link/example.vue')
const Cascade = () => import(/* webpackChunkName: 'cascade' */'./components/cascade/readme.md')
const CascadeExample = () => import(/* webpackChunkName: 'cascade' */'./components/cascade/example')
const ZoomImage = () => import(/* webpackChunkName: 'virtual-scroll' */'./components/zoom-image/readme.md')
const VersionDetail = () => import(/* webpackChunkName: 'version-detaill' */'./components/version-detail/readme.md')
const CardDetail = () => import(/* webpackChunkName: 'card-detaill' */'./components/card/readme.md')
const Transition = () => import(/* webpackChunkName: 'animate' */'./components/transition/readme.md')
const Image = () => import(/* webpackChunkName: 'image' */'./components/image/readme.md')
const Breadcrumb = () => import(/* webpackChunkName: 'image' */'./components/breadcrumb/readme.md')
const Divider = () => import(/* webpackChunkName: 'image' */'./components/divider/readme.md')
const PaginationExample = () => import(/* webpackChunkName: 'pagination-example' */'./components/pagination/example.vue')
const Tag = () => import(/* webpackChunkName: 'tag' */'./components/tag/readme.md')
const ResizeLayout = () => import(/* webpackChunkName: 'resize' */'./components/resize-layout/readme.md')
const FixedNavbar = () => import(/* webpackChunkName: 'fixed-narbar' */'./components/fixed-navbar/readme.md')
const WhatThis = () => import(/* webpackChunkName: 'whatthis' */'./components/whatthis/readme.md')

const router = new VueRouter({
    // mode: 'history',
    routes: [
        {
            name: 'install',
            path: '/install',
            component: Install
        },
        {
            name: 'fixedNavbar',
            path: '/fixed-navbar',
            component: FixedNavbar
        },
        {
            name: 'alert',
            path: '/alert',
            component: Alert
        },
        {
            name: 'transition',
            path: '/transition',
            component: Transition
        },
        {
            name: 'exception',
            path: '/exception',
            component: Exception
        },
        {
            name: 'roundProgress',
            path: '/round-progress',
            component: Round
        },
        {
            name: 'progress',
            path: '/progress',
            component: Progress
        },
        {
            name: 'timeline',
            path: '/timeline',
            component: Timeline
        },
        {
            name: 'treeExample',
            path: '/tree/example',
            component: TreeExample
        },
        {
            name: 'tree',
            path: '/tree',
            component: Tree
        },
        {
            name: 'transfer',
            path: '/transfer',
            component: Transfer
        },
        {
            name: 'transferExample',
            path: '/transfer/example',
            component: TransferExample
        },
        {
            name: 'changelog',
            path: '/changelog',
            component: Changelog
        },
        {
            name: 'home',
            path: '/',
            component: WhatThis,
            alias: '/index.html',
            children: [
                {
                    name: 'what-this',
                    path: 'what-this',
                    component: WhatThis,
                    alias: ''
                }
            ]
        },
        {
            name: 'start',
            path: '/start',
            component: Start
        },
        {
            name: 'config',
            path: '/config',
            component: Config
        },
        {
            name: 'spec',
            path: '/spec',
            component: Spec
        },
        {
            name: 'color',
            path: '/color',
            component: Color
        },
        {
            name: 'colorPicker',
            path: '/color-picker',
            component: ColorPicker
        },
        {
            name: 'colorPickerExample',
            path: '/color-picker/example',
            component: ColorPickerExample
        },
        {
            name: 'componseFormItem',
            path: '/compose-form-item',
            component: ComposeFormItem
        },
        {
            name: 'font',
            path: '/font',
            component: Font
        },
        {
            name: 'icon',
            path: '/icon',
            component: Icon
        },
        {
            name: 'button',
            path: '/button',
            component: Button
        },
        {
            name: 'buttonExample',
            path: '/button/example',
            component: ButtonExample
        },
        {
            name: 'animateNumber',
            path: '/animate-number',
            component: AnimateNumber
        },
        {
            name: 'dropdownMenu',
            path: '/dropdown-menu',
            component: DropdownMenu
        },
        {
            name: 'badge',
            path: '/badge',
            component: Badge
        },
        {
            name: 'dialog',
            path: '/dialog',
            component: Dialog
        },
        {
            name: 'dialogExample',
            path: '/dialog/example',
            component: DialogExample
        },
        {
            name: 'switcher',
            path: '/switcher',
            component: Switcher
        },
        {
            name: 'switcherExample',
            path: '/switcher/example',
            component: SwitcherExample
        },
        {
            name: 'tag',
            path: '/tag',
            component: TagInput
        },
        {
            name: 'tagExample',
            path: '/tag/example',
            component: TagInputExample
        },
        {
            name: 'loading',
            path: '/loading',
            component: Loading
        },
        {
            name: 'sideSlider',
            path: '/sideslider',
            component: SideSlider
        },
        {
            name: 'sideSliderExample',
            path: '/sideslider/example',
            component: SideSliderExample
        },
        {
            name: 'steps',
            path: '/steps',
            component: Steps
        },
        {
            name: 'message',
            path: '/message',
            component: Message
        },
        {
            name: 'notify',
            path: '/notify',
            component: Notify
        },
        {
            name: 'tooltips',
            path: '/tooltips',
            component: Tooltips
        },
        {
            name: 'tooltipsExample',
            path: '/tooltips/example',
            component: TooltipsExample
        },
        {
            name: 'infoBox',
            path: '/info-box',
            component: InfoBox
        },
        {
            name: 'infoBoxExample',
            path: '/info-box/example',
            component: InfoBoxExample
        },
        {
            name: 'popover',
            path: '/popover',
            component: Popover
        },
        {
            name: 'popconfirm',
            path: '/popconfirm',
            component: Popconfirm
        },
        {
            name: 'popconfirmExample',
            path: '/popconfirm/example',
            component: PopconfirmExample
        },
        {
            name: 'datePicker',
            path: '/date-picker',
            component: DatePicker
        },
        {
            name: 'datePickerExample',
            path: '/date-picker/example',
            component: DatePickerExample
        },
        {
            name: 'timePicker',
            path: '/time-picker',
            component: TimePicker
        },
        {
            name: 'timePickerExample',
            path: '/time-picker/example',
            component: TimePickerExample
        },
        {
            name: 'upload',
            path: '/upload',
            component: Upload
        },
        {
            name: 'uploadExample',
            path: '/upload/example',
            component: UploadExample
        },
        {
            name: 'pagination',
            path: '/pagination',
            component: Pagination
        },
        {
            name: 'paginationExample',
            path: '/pagination/example',
            component: PaginationExample
        },
        {
            name: 'i18n',
            path: '/i18n',
            component: I18N
        },
        {
            name: 'vueI18NCustomExample',
            path: '/i18n/vue-i18n-custom-example',
            component: VueI18NCustomExample
        },
        {
            name: 'vueI18NExample',
            path: '/i18n/vue-i18n-example',
            component: VueI18NExample
        },
        {
            name: 'i18nExample',
            path: '/i18n/buildin-example',
            component: I18NBuildinExample
        },
        {
            name: 'collapse',
            path: '/collapse',
            component: Collapse
        },
        {
            name: 'process',
            path: '/process',
            component: Process
        },
        {
            name: 'processExample',
            path: '/process/example',
            component: ProcessExample
        },
        {
            name: 'table',
            path: '/table',
            component: Table
        },
        {
            name: 'tableExample',
            path: '/table/example',
            component: TableExample
        },
        {
            name: 'form',
            path: '/form',
            component: Form
        },
        {
            name: 'input',
            path: '/input',
            component: Input
        },
        {
            name: 'inputExample',
            path: '/input/example',
            component: InputExample
        },
        {
            name: 'radio',
            path: '/radio',
            component: Radio
        },
        {
            name: 'radioExample',
            path: '/radio/example',
            component: RadioExample
        },
        {
            name: 'checkbox',
            path: '/checkbox',
            component: Checkbox
        },
        {
            name: 'checkboxExample',
            path: '/checkbox/example',
            component: CheckboxExample
        },
        {
            name: 'diff',
            path: '/diff',
            component: Diff
        },
        {
            name: 'tab',
            path: '/tab',
            component: Tab
        },
        {
            name: 'tabExample',
            path: '/tabExample',
            component: TabExample
        },
        {
            name: 'select',
            path: '/select',
            component: Select
        },
        {
            name: 'selectExample',
            path: '/select/example',
            component: SelectExample
        },
        {
            name: 'slider',
            path: '/slider',
            component: Slider
        },
        {
            name: 'grid',
            path: '/grid',
            component: Grid
        },
        {
            name: 'gridExample',
            path: '/grid/example',
            component: GridExample
        },
        {
            name: 'directives',
            path: '/directives',
            component: Directives
        },
        {
            name: 'navigation',
            path: '/navigation',
            component: Navigation
        },
        {
            name: 'navigation-example',
            path: '/navigation/example',
            component: NavigationExample
        },
        {
            name: 'searchselect',
            path: '/searchselect',
            component: SearchSelect
        },
        {
            name: 'searchselectExample',
            path: '/searchselect/example',
            component: SearchSelectExample
        },
        {
            name: 'rate',
            path: '/rate',
            component: Rate
        },
        {
            name: 'swiper',
            path: '/swiper',
            component: Swiper
        },
        {
            name: 'bigTree',
            path: '/big-tree',
            component: BigTree
        },
        {
            name: 'bigTreeExample',
            path: '/big-tree/example',
            component: BigTreeExample
        },
        {
            name: 'virtualScroll',
            path: '/virtual-scroll',
            component: VirtualScroll
        },
        {
            name: 'link',
            path: '/link',
            component: Link
        },
        {
            name: 'linkExample',
            path: '/link/example',
            component: LinkExample
        },
        {
            name: 'cascade',
            path: '/cascade',
            component: Cascade
        }, {
            name: 'cascadeExample',
            path: '/cascade-example',
            component: CascadeExample
        },
        {
            name: 'zoomImage',
            path: '/zoom-image',
            component: ZoomImage
        },
        {
            name: 'versionDetail',
            path: '/version-detail',
            component: VersionDetail
        },
        {
            name: 'card',
            path: '/card',
            component: CardDetail
        },
        {
            name: 'image',
            path: '/image',
            component: Image
        },
        {
            name: 'breadcrumb',
            path: '/breadcrumb',
            component: Breadcrumb
        },
        {
            name: 'divider',
            path: '/divider',
            component: Divider
        },
        {
            name: 'tags',
            path: '/tags',
            component: Tag
        }, {
            name: 'resize-layout',
            path: '/resize-layout',
            component: ResizeLayout
        }
    ]
})

Vue.use(VueRouter)

router.beforeEach((to, from, next) => {
    next()
})

router.afterEach(route => {
})

export default router
