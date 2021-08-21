[[toc]]

## 更新日志

<div class="changelog-wrapper">

### 0.0.4 {page=#/changelog}
###### 2021.8.18

进一步优化了文档。

### 0.0.3 {page=#/changelog}
###### 2021.8.16

`bk-vue-cec` 基于bk-magic-vue输出的更加符合运维场景的CEC组件库。

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
