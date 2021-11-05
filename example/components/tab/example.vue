<template>
    <div>
        <div>
            <bk-tab :sortable="true" @sort-change="sortChange" sort-type="jump" :active.sync="active" type="unborder-card">
                <bk-tab-panel
                    v-for="(panel, index) in panels"
                    v-bind="panel"

                    :key="index">
                    <div>{{panel.label}}-{{panel.count}}</div>
                </bk-tab-panel>
                <bk-tab-panel :name="'unsortable'" :label="'unsortable'" :sortable="false">unsortable</bk-tab-panel>
            </bk-tab>
        </div>
        <div style="margin-top: 50px;">
            <bk-tab :active.sync="active" :sortable="true">
                <bk-tab-panel
                    v-for="(panel, index) in panels2"
                    v-bind="panel"
                    :key="index">
                    <div>{{panel.label}}-{{panel.count}}</div>
                </bk-tab-panel>
            </bk-tab>
        </div>
    </div>
</template>
<script>
    import { bkTab, bkTabPanel } from '@'

    export default {
        components: {
            bkTab,
            bkTabPanel
        },
        data () {
            return {
                panels: [
                    { name: 'mission', label: '任务报表', count: 10 },
                    { name: 'config', label: '加速配置', count: 20, sortable: false },
                    { name: 'history', label: '历史版本', count: 30, visible: false },
                    { name: 'history1', label: '历史版本aa', count: 30, visible: true },
                    { name: 'history12', label: '历史版本aa1', count: 30, visible: true },
                    { name: 'history13', label: '历史版本aa2', count: 30, visible: true },
                    { name: 'history14', label: '历史版本aa4', count: 30, visible: true },
                    { name: 'history2', label: '历史版本bb', count: 30, visible: false },
                    { name: 'deleted', label: '已归档加速任务', count: 40 }
                ],
                panels2: [
                    { name: 'mission', label: '任务报表2', count: 10 },
                    { name: 'config', label: '加速配置2', count: 20 },
                    { name: 'history', label: '历史版本2', count: 30 },
                    { name: 'deleted', label: '已归档加速任务2', count: 40 }
                ],
                active: 'mission'
            }
        },
        methods: {
            sortChange (draggingIndex, dropIndex) {
                // this.swapArr(this.panels, draggingIndex, dropIndex)
                console.log('sortChange')
                console.log(draggingIndex, dropIndex)
            },
            swapArr (arr, a, b) {
                const swap = arr[a]
                arr[a] = arr[b]
                arr[b] = swap
            }
        }
    }
</script>
