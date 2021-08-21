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
    <section>
        <bk-big-tree ref="tree"
            default-expand-all
            :show-checkbox="true"
            :display-matched-node-descendants="true"
            :check-only-available-strictly="true"
            :data="data"
            :show-link-line="hasLine"
            :configurable="true">
        </bk-big-tree>
    </section>
</template>

<script>
    import { bkBigTree, bkInput } from '@'
    let seed = 0
    export default {
        components: {
            bkBigTree,
            // eslint-disable-next-line vue/no-unused-components
            bkInput
        },
        data () {
            return {
                filter: '',
                hasLine: false,
                data: this.getNodes(null, 2, 3)
            }
        },
        methods: {
            getNodes (parent, childCount, deep) {
                const nodes = []
                for (let i = 0; i < childCount; i++) {
                    const node = {
                        id: `node-${seed}`,
                        level: parent ? parent.level + 1 : 0,
                        name: `node-${seed++}`
                    }
                    if (node.level < deep) {
                        node.children = this.getNodes(node, childCount, deep)
                    }
                    nodes.push(node)
                }
                return nodes
            },
            lazyMethod () {
                return new Promise(resolve => {
                    setTimeout(() => {
                        const random = Math.random()
                        resolve({
                            data: {
                                id: random,
                                name: random
                            }
                        })
                    }, 10)
                })
            },
            lazyDisabled (node) {
                return typeof node.data.id === 'number' ? node.data.id > 0.5 : false
            }
        }
    }
</script>
