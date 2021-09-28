[[toc]]

## 更新日志

<div class="changelog-wrapper">

### 0.0.7 {page=#/changelog}
###### 2021.09.28

* **[add]**:
    - [Spin 加载中](#/spin) 新增 Spin 组件
    - [v-bk-copy 复制指令](#/directives?anchor=v-bk-copy) 新增复制指令
    - [Table 表格](#/table) 新增虚拟滚动，解决单分页大批量数据渲染问题
* **[fix]**:
    - [Upload 文件上传](#/upload) 修复 upload 组件图片回填没有动态监听的问题
    - [Tab 选项卡](#/tab) 修复 `type` 配置为 `unborder-card` 时，标识选中的边框样式位置不正确的问题；修复组件 tab 在部分场景下一开始下划线没有，点击后才出现的问题
    - [Cascade 级联选框](#/cascade) 修复多选框不能选择的问题；cascade 级联选框 搜索选中第三层目录时，handleChange 回调方法里的 selectList 参数为空的问题
    - [Table 表格](#/table) 修复调用 clearFilter 方法时会出现栈溢出的问题
    - [Form 表单](#/form) 修复部分 form 组件的背景色没有设置的问题

---

### 0.0.6 {page=#/changelog}
###### 2021.9.26

* **[add]**:
    - [DropdownMenu 下拉菜单](#/dropdown-menu) 增加position-fixed属性支持
* **[fix]**:
    - [Button 基础按钮](#/button) 为 文字按钮 增加其它主题支持的前提下，确保默认主题为“primary”以和bk-magic-vue兼容
* **[update]**:
    - [Slider 滑动选择器](#/slider) 滑动结束时会删除绑定的事件，排除异常隐患
    - [Tree 树](#/tree) 拖拽时候，鼠标样式去掉绿色加号

---

### 0.0.5 {page=#/changelog}
###### 2021.8.21

* **[add]**:
    - 现在bk-vue-cec在安装后，将配合vetur，在开发人员编写代码时进行自动化组件提示了
* **[fix]**:
    - [Button 基础按钮](#/button) 为 文字按钮 增加其它主题

---

### 0.0.4 {page=#/changelog}
###### 2021.8.18

进一步完善相关文档

---

### 0.0.3 {page=#/changelog}
###### 2021.8.16

`bk-vue-cec` 基于bk-magic-vue输出的更加符合运维场景的组件库

</div>
<script>
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual'
    }
    else {
        window.onunload= () => window.scrollTo(0, 0)
    }
    import { getActualTop } from '../../../src/utils/util'
    export default {
        components: {
        },
        data () {
            return {
            }
        },
        watch: {
            '$route' (to, from) {
                const ver = to.query.v
                if (!ver) {
                    window.scrollTo(0, 0)
                    return
                }
                this.jumpVer(ver)
            }
        },
        mounted () {
            const ver = this.$route.query.v
            if (!ver) {
                return
            }
            this.jumpVer(ver)
        },
        methods: {
            jumpVer (ver) {
                const node = document.getElementById(ver)
                if (!node) {
                    window.scrollTo(0, 0)
                    return
                }
                this.$nextTick(() => {
                    const top = getActualTop(node)
                    window.scrollTo(0, top - 70)
                })
            }
        }
    }
</script>
