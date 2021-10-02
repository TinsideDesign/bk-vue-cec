[[toc]]

## 更新日志

<div class="changelog-wrapper">

### 0.0.8 {page=#/changelog}
###### 2021.10.2

* **[add]**:
    - [TagInput 标签输入框](#/tag) 增加 clear 按钮在 hover 才显示的交互
    - [Dialog 对话框](#/dialog) 增加 dialog 关闭时逻辑 beforeClose
* **[fix]**:
    - [Table 表格](#/table) 修复 table-column 宽度计算的问题；修复 Table 虚拟滚动自适应宽度样式问题
    - [Swiper 轮播图](#/swiper) 修复动态设置 list/pics 属性时没有更新尺寸的问题
    - [Form 表单](#/form) 表单验证问题修复
    - [TimePicker 时间选择器](#/time-picker) 修复禁止选择的时间，滚动可以选择的问题
    - [Dialog 对话框](#/dialog) 修复当内容区文字出现下划线，下划线会消失的问题
    - [Info 提示框](#/info-box) 同样修复了当内容区文字出现下划线，下划线会消失的问题
* **[update]**:
    - 取消修复先前更改为纯白的 form 组件背景色，建议对应用户添加白色背景区域解决该问题
    - 导出 bkVirtualRender 组件以及 css

---

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
