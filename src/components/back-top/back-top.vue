<template>
    <transition name="bk-fade-in-linear">
        <div class="bk-back-to-top"
            v-if="visible"
            :style="positionStyle"
            @click="scrollTop">
            <slot>
                <i class="bk-icon icon-angle-up-line"></i>
            </slot>
        </div>
    </transition>
</template>

<script>
    import zIndexManager from '@/utils/z-index-manager.js'
    import { throttle } from 'throttle-debounce'
    export default {
        name: 'bk-back-top',
        props: {
            bottom: {
                type: Number,
                default: 40
            },
            right: {
                type: Number,
                default: 40
            },
            target: {
                type: String,
                default: ''
            },
            visibilityHeight: {
                type: Number,
                default: 200
            }
        },
        data () {
            return {
                visible: false,
                zIndex: 0,
                container: document,
                el: document.documentElement
            }
        },
        computed: {
            positionStyle () {
                return `right: ${this.right}px;
                    bottom: ${this.bottom}px;
                    z-index: ${this.zIndex}`
            }
        },
        watch: {
            visible (val) {
                if (val) {
                    this.zIndex = zIndexManager.nextTickIndex(2)
                }
            }
        },
        mounted () {
            this._lazyScrollHandler = throttle(30, this.scrollHandler)
            if (this.target) {
                this.el = document.querySelector(this.target)
                if (!this.el) {
                    throw new Error('target does not exist')
                }
                this.container = this.el
            }
            this.container.addEventListener('scroll', this._lazyScrollHandler)
        },
        methods: {
            clickHandler () {
                this.$emit('click')
            },
            scrollTop () {
                this.el.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                })
            },
            scrollHandler () {
                this.visible = this.el.scrollTop >= this.visibilityHeight
            }
        }
    }
</script>
<style>
    @import '../../ui/back-top.css';
</style>
