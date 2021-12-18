<!--
 * Tencent is pleased to support the open source community by making
 * 科技内在设计（T-inside） available.
 *
 * Copyright (C) 2021 TID Limited, a DAO.  All rights reserved.
 *
 * 科技内在设计（T-inside） is licensed under the MIT License.
 *
 * License for 科技内在设计（T-inside）:
 *
 *
 * Terms of the MIT License:
 * ---------------------------------------------------
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
 * to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of
 * the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
 * THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
-->

<template>
    <header class="magic-header">
        <a href="//cec.ti.design/" class="logo">
            <img src="./img/ti-text.svg" alt="" style="width:120px;">
            <span class="text"> - 驱动斑斓白屏</span>
        </a>
        <ul class="clearfix">
            <!--<li class="dropdown nav-dropdown" id="nav_index" style="position: relative;">
                <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true">
                    <span>组件库</span>
                    <span class="caret"></span>
                    <div class="new-feature" style="right: 0px; top: 12px;"><span>NEW</span></div>
                </button>
                <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                    <li><a role="meneitem" target="_blank" href="//cec.ti.design/#"><span>PC端(普通版)</span></a>
                    </li>
                    <li><a role="meneitem" target="_blank" href="//cec.ti.design/#index?isPro=1"><span>PC端(标准版)</span></a>
                    </li>
                    <li style="position: relative;">
                        <a role="meneitem" href="#/">
                            <span>
                                Vue组件
                                <div class="new-feature" style="top: 0; right: 0;"><span>NEW</span></div>
                            </span>
                        </a>
                    </li>
                    <li><a role="meneitem" target="_blank" href="//cec.ti.design/#mobile/show"><span>移动端</span></a>
                    </li>
                    <li><a role="meneitem" target="_blank" href="//cec.ti.design/#components"><span>组件预览</span></a>
                    </li>
                </ul>
            </li>
            <li class="dropdown nav-dropdown">
                <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true">
                    <span>可视化布局</span>
                    <span class="caret"></span>
                </button>
                <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                    <li><a role="meneitem" target="_blank" href="//cec.ti.design/#build/show"><span>PC端</span></a>
                    </li>
                    <li><a role="meneitem" target="_blank" href="//cec.ti.design/#mobile_build/show"><span>移动端</span></a>
                    </li>
                    <li><a role="meneitem" target="_blank" href="//cec.ti.design/#wx_build/show"><span>微信小程序</span></a>
                    </li>
                </ul>
            </li>
            <li id="example_index"><a target="_blank" href="//cec.ti.design/#templates"><span>套餐样例</span></a>
            </li>
            <li id="plugin_index"><a target="_blank" href="//cec.ti.design/#plugin">插件列表</a>
            </li>
            <li class="dropdown magic-doc-list nav-dropdown" id="nav-dropdown">
                <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true">
                    <span>帮助文档</span>
                    <span class="caret"></span>
                </button>
                <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                    <li><a role="meneitem" target="_blank" href="//cec.ti.design/#doc/show?id=html_structure">前端规范</a>
                    </li>
                    <li><a role="meneitem" target="_blank" href="//cec.ti.design/#design">设计规范</a>
                    </li>
                    <li><a role="meneitem" target="_blank" href="//cec.ti.design/#css">辅助样式</a>
                    </li>
                    <li><a role="meneitem" target="_blank" href="//cec.ti.design/#about/show">模版下载</a>
                    </li>
                </ul>
            </li>
            <li id="nav_start" style="margin-left:1px;"><a target="_blank" href="//cec.ti.design/#start"><span>新手起步</span></a>
            </li>
            <li class="fr header-user" style="display:none;" id="header_user_box">
                <div class="fr logout"> <span class="magic-poweroff">退出</span>

                </div>
                <div class="fr" id="magic_user">
                    <img src="" alt="" class="avatar">
                    <a class="name" target="_blank" href="//cec.ti.design/#mytemplates"></a>
                </div>
            </li>-->
        </ul>
    </header>
</template>

<style scoped lang="postcss">
    .magic-header-box {
        display: flex;
        height: 236px;
        background: #000;
        .magic-header {
            background: none;
        }
    }
    .header-static {
        .magic-header {
            background: rgba(0, 0, 0, .8);
        }
    }
    .magic-header {
        height: 62px;
        /*height: 72px;*/
        margin: auto;
        min-width: 1200px;
        /* background: #070d3a; */
        background: #FFFFFF;
        transition: all ease 0.3s;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        z-index: 1001;
        box-shadow: 0 2px 8px #f0f1f2;
        a.logo {
            display: flex;
            float: left;
            margin-top: 16px;
            margin-left: 20px;
            width: 270px;
            text-decoration: none;
            align-items: center;
            img {
                float: left;
            }
            .text {
                margin-left: 10px;
                color: #000;
                font-weight: bold;
            }
        }
        >ul {
            padding: 0;
            margin: 0;
            min-width: 1200px;
            >li {
                float: left;
                font-size: 14px;
                line-height: 62px;
                list-style: none;
            }
            .active {
                > {
                    a, .btn {
                        color: #ffb83e;
                    }
                }
            }
        }
        .dropdown-menu {
            margin-top: -5px;
            &:after {
                top: -33px;
            }
        }
        .btn {
            &:hover {
                color: #ffb83e;
            }
            .caret {
                margin-left: 0;
            }
        }
        > ul > li > a {
            width: 114px;
            text-align: center;
            margin-left: -1px;
            color: white;
            text-decoration: none;
            display: block;
            > span {
                padding: 0 22px;
            }
        }
        .caret {
            display: inline-block;
            width: 0;
            height: 0;
            margin-left: 2px;
            vertical-align: middle;
            border-top: 4px dashed;
            border-right: 4px solid transparent;
            border-left: 4px solid transparent;
        }
        .new-feature {
            position: absolute;
            height: 20px;
            line-height: 20px;
            top: 10px;
            right: -4px;
            transform: scale(0.6);
            span {
                background-color: #ffb74f;
                color: #343153;
                border-radius: 5px;
                font-size: 12px;
                padding: 0 4px;
                font-weight: 700;
            }
        }
    }
    .nav-dropdown button {
        background: none !important;
        border: none !important;
        color: #fff !important;
        outline: none;
    }
    .btn {
        display: inline-block;
        padding: 6px 12px;
        margin-bottom: 0;
        font-size: 14px;
        font-weight: 400;
        line-height: 1.42857143;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        background-image: none;
        border: 1px solid transparent;
        border-radius: 4px;
    }
    button, html input[type="button"], input[type="reset"], input[type="submit"] {
        -webkit-appearance: button;
        cursor: pointer;
    }
    #nav_index {
        width: 115px;
    }
    .nav-dropdown {
        float: right;
    }
    .dropdown, .dropup {
        position: relative;
    }
    .magic-header .dropdown-menu {
        margin-top: -5px;
    }
    .nav-dropdown .dropdown-menu {
        width: 116px;
        min-width: auto;
        padding: 10px 0;
        background: #fff;
        border: none;
        border-radius: 4px;
    }
    .dropdown-menu {
        border-radius: 0;
    }
    .dropdown {
        &:hover {
            .dropdown-menu {
                display: inline-block;
            }
        }
    }
    .dropdown-menu {
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 1000;
        display: none;
        float: left;
        min-width: 160px;
        padding: 5px 0;
        margin: 2px 0 0;
        font-size: 14px;
        text-align: left;
        list-style: none;
        background-color: #fff;
        -webkit-background-clip: padding-box;
        background-clip: padding-box;
        border: 1px solid #ccc;
        border: 1px solid rgba(0, 0, 0, .15);
        border-radius: 4px;
        -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
        box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
    }
    .magic-header .dropdown-menu:after {
        top: -33px;
    }
    .nav-dropdown .dropdown-menu:after {
        height: 25px;
        content:'▲';
        color: #fff;
        position: absolute;
        top: -33px;
        left: 45%;
    }
    .dropdown-toggle {
        width: 113px;
    }
    .nav-dropdown .dropdown-menu > li > a {
        color: #999;
        padding: 6px 0;
        background: none;
        text-align: center;
        text-decoration: none;
    }
    .dropdown-menu>li>a {
        display: block;
        padding: 3px 20px;
        clear: both;
        font-weight: 400;
        line-height: 1.42857143;
        color: #333;
        white-space: nowrap;
    }
    .nav-dropdown .dropdown-menu > li > a:hover {
        color: #ffb83e;
    }
</style>
