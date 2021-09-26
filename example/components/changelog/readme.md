[[toc]]

## 更新日志

<div class="changelog-wrapper">

### 0.0.6 {page=#/changelog}
###### 2021.9.26

* **[add]**:
    - [DropdownMenu 下拉菜单](#/dropdown-menu) 增加position-fixed属性支持
* **[fix]**:
    - [Button 基础按钮](#/button) 为 文字按钮 增加其它主题支持的前提下，确保默认主题为“primary”以和bk-magic-vue兼容
* **[update]**:
    - [Slider 滑动选择器](#/slider) 增加position-fixed属性支持
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
