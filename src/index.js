/*
 * Tencent is pleased to support the open source community by making
 * 科技内在设计（T-inside） available.
 *
 * Copyright (C) 2021 THL A29 Limited, a Tencent company.  All rights reserved.
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
 * @file bk-magic-vue main entry
 *
 * Copyright © 2020-2021 T-inside Design. All Rights Reserved. T-inside 版权所有
 */

import './ui/common.css'

import bkFixedNavbar from './components/fixed-navbar'
import bkTransition from './components/transition'
import bkAlert from './components/alert'
import bkAnimateNumber from './components/animate-number'
import bkBadge from './components/badge'
import bkButton from './components/button'
import bkCheckbox from './components/checkbox'
import bkCheckboxGroup from './components/checkbox-group'
import bkCollapse from './components/collapse'
import bkCollapseItem from './components/collapse-item'
import bkColorPicker from './components/color-picker'
import bkComposeFormItem from './components/compose-form-item'
import bkDatePicker from './components/date-picker'
import bkDialog from './components/dialog'
import bkDiff from './components/diff'
import bkDropdownMenu from './components/dropdown-menu'
import bkException from './components/exception'
import bkForm from './components/form'
import bkFormItem from './components/form-item'
import bkIcon from './components/icon'
import bkInfoBox from './components/info-box'
import bkInput from './components/input'
import bkLoading from './components/loading'
import bkMessage from './components/message'
import bkNotify from './components/notify'
import bkOption from './components/option'
import bkOptionGroup from './components/option-group'
import bkPagination from './components/pagination'
import bkPopover from './components/popover'
import bkPopconfirm from './components/popconfirm'
import bkProcess from './components/process'
import bkProgress from './components/progress'
import bkRadio from './components/radio'
import bkRadioButton from './components/radio-button'
import bkRadioGroup from './components/radio-group'
import bkRoundProgress from './components/round-progress'
import bkSelect from './components/select'
import bkSideslider from './components/sideslider'
import bkSlider from './components/slider'
import bkSteps from './components/steps'
import bkSwitcher from './components/switcher'
import bkTab from './components/tab'
import bkTabPanel from './components/tab-panel'
import bkTable from './components/table'
import bkTableColumn from './components/table-column'
import bkTableSettingContent from './components/table-setting-content'
import bkTagInput from './components/tag-input'
import bkTimePicker from './components/time-picker'
import bkTimeline from './components/timeline'
import bkTransfer from './components/transfer'
import bkTree from './components/tree'
import bkUpload from './components/upload'
import bkTooltips from './directives/tooltips.js'
import bkContainer from './components/container'
import bkCol from './components/col'
import bkRow from './components/row'
import bkRate from './components/rate'
import bkStar from './components/star'
import bkSwiper from './components/swiper'
import bkVirtualScroll from './components/virtual-scroll'
import bkZoomImage from './components/zoom-image'
import bkVersionDetail from './components/version-detail'

import bkClickoutside from './directives/clickoutside'
import bkSearchSelect from './components/search-select'

import bkBigTree from './components/big-tree'

import bkNavigation from './components/navigation'
import bkNavigationMenu from './components/navigation-menu'
import bkNavigationMenuItem from './components/navigation-menu-item'
import bkNavigationMenuGroup from './components/navigation-menu-group'
import bkLink from './components/link'

import bkOverflowTips from './directives/overflow-tips'
import bkCopy from './directives/copy'

import locale from './locale'
import lang from './locale/lang'

import bkCascade from './components/cascade'

import bkCard from './components/card'
import bkImage from './components/image'
import bkImageViewer from './components/image-viewer'
// import { bkBreadcrumb, bkBreadcrumbItem } from './components/breadcrumb'
import bkBreadcrumb from './components/breadcrumb'
import bkBreadcrumbItem from './components/breadcrumb-item'
import bkDivider from './components/divider'
// import '@icon-cool/bk-icon-magic_box'

import bkTag from './components/tag'
import bkResizeLayout from './components/resize-layout'
import bkSpin from './components/spin'

import bkVirtualRender from './components/virtual-render'

const components = {
    bkFixedNavbar,
    bkTransition,
    bkAlert,
    bkBadge,
    bkButton,
    bkAnimateNumber,
    bkCheckbox,
    bkCheckboxGroup,
    bkCollapse,
    bkCollapseItem,
    bkColorPicker,
    bkComposeFormItem,
    bkDatePicker,
    bkDialog,
    bkDiff,
    bkDropdownMenu,
    bkException,
    bkForm,
    bkFormItem,
    bkIcon,
    bkInput,
    bkOption,
    bkOptionGroup,
    bkPagination,
    bkPopover,
    bkPopconfirm,
    bkProcess,
    bkProgress,
    bkRadio,
    bkRadioButton,
    bkRadioGroup,
    bkRoundProgress,
    bkSelect,
    bkSideslider,
    bkSlider,
    bkSteps,
    bkSwitcher,
    bkTab,
    bkTabPanel,
    bkTable,
    bkTableColumn,
    bkTableSettingContent,
    bkTagInput,
    bkTimePicker,
    bkTimeline,
    bkTransfer,
    bkTree,
    bkUpload,
    bkContainer,
    bkCol,
    bkRow,
    bkNavigation,
    bkNavigationMenu,
    bkNavigationMenuItem,
    bkNavigationMenuGroup,
    bkSearchSelect,
    bkRate,
    bkStar,
    bkSwiper,
    bkVirtualScroll,
    bkZoomImage,
    bkBigTree,
    bkLink,
    bkCascade,
    bkVersionDetail,
    bkCard,
    bkImage,
    bkImageViewer,
    bkBreadcrumb,
    bkBreadcrumbItem,
    bkDivider,
    bkTag,
    bkResizeLayout,
    bkSpin,
    bkVirtualRender
}

const directives = {
    bkClickoutside,
    bkTooltips,
    bkLoading,
    bkOverflowTips,
    bkCopy
}

export function install (Vue, opts = {}) {
    locale.use(opts.locale)
    locale.i18n(opts.i18n)

    Vue.prototype.$BK_EL = {
        zIndex: opts.zIndex || 2000
    }

    Object.values(components).forEach(component => {
        Vue.use(component, {
            namespace: opts.namespace,
            ...(opts[component.name] || {})
        })
    })

    Object.values(directives).forEach(directive => {
        Vue.use(directive)
    })
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

const bkMagic = {
    ...components,
    ...directives,
    bkMessage,
    bkNotify,
    bkInfoBox,
    locale,
    lang,
    install
}

export default bkMagic

// 组件单独抛出，方便 import { bkBadge } from 'bk-magic-vue' 这样引用
export {
    bkFixedNavbar,
    bkTransition,
    bkAlert,
    bkBadge,
    bkButton,
    bkAnimateNumber,
    bkCheckbox,
    bkCheckboxGroup,
    bkClickoutside,
    bkCollapse,
    bkCollapseItem,
    bkColorPicker,
    bkComposeFormItem,
    bkDatePicker,
    bkDialog,
    bkDiff,
    bkDropdownMenu,
    bkException,
    bkForm,
    bkFormItem,
    bkIcon,
    bkInfoBox,
    bkInput,
    bkLoading,
    bkMessage,
    bkNotify,
    bkOption,
    bkOptionGroup,
    bkPagination,
    bkPopover,
    bkPopconfirm,
    bkProcess,
    bkProgress,
    bkRadio,
    bkRadioButton,
    bkRadioGroup,
    bkRoundProgress,
    bkSelect,
    bkSideslider,
    bkSlider,
    bkSteps,
    bkSwitcher,
    bkTab,
    bkTabPanel,
    bkTable,
    bkTableColumn,
    bkTableSettingContent,
    bkTagInput,
    bkTimePicker,
    bkTimeline,
    bkTransfer,
    bkTree,
    bkUpload,
    bkTooltips,
    bkContainer,
    bkCol,
    bkRow,
    bkNavigation,
    bkNavigationMenu,
    bkNavigationMenuItem,
    bkNavigationMenuGroup,
    bkSearchSelect,
    locale,
    lang,
    bkRate,
    bkStar,
    bkSwiper,
    bkVirtualScroll,
    bkZoomImage,
    bkBigTree,
    bkLink,
    bkOverflowTips,
    bkCopy,
    bkCascade,
    bkVersionDetail,
    bkCard,
    bkImage,
    bkImageViewer,
    bkBreadcrumb,
    bkBreadcrumbItem,
    bkDivider,
    bkTag,
    bkResizeLayout,
    bkSpin,
    bkVirtualRender
}
