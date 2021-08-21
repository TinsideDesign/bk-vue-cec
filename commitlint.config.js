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

module.exports = {
    // commit message 格式
    // type(scope?): subject
    // example:
    // docs(input,radio): 输入框和单选框文档更新
    // Common types: [build,ci,chore,docs,feat,fix,perf,refactor,revert,style,test]
    extends: ['@commitlint/config-conventional'],
    // Available rules: https://commitlint.js.org/#/reference-rules
    // Level [0, 1, 2]: 0 disables the rule. For 1 it will be considered a warning for 2 an error.
    // Applicable [always,never]: never inverts the rule.
    // Value: value to use for this rule.
    rules: {
        // scope 建议写上修改内容涉及的组件，不写 scope 会抛出警告
        'scope-empty': [1, 'never'],
        'type-enum': [
            2,
            'always',
            [
                'feature', // 新增功能
                'feat', // 新增功能
                'bugfix', // bug 修复
                'docs', // 文档示例(documentation)
                'minor', // '式｜拼写，不影响程序逻辑的代码修改
                'optimization', // 功能优化
                'perf', // 性能优化
                'merge', // 分支操作
                'build', // 项目构建、持续集成、工程化方面的提交
                'refactor', // 重构代码(既没有新增功能，也没有修复 bug)
                'test', // 新增测试用例或是更新现有测试
                'revert', // 回滚某个更早之前的提交
                'chore' // 不属于以上类型的其他类型
            ]
        ],
        'subject-case': [
            0
        ]
    }
}
