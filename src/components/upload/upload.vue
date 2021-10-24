<!--
 * Tencent is pleased to support the open source community by making
 * 科技内在设计（T-inside） available.
 *
 * Copyright (C) 2021 THL A29 Limited, a Tencent company.  All rights reserved.
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
    <div :class="['bk-upload', theme, extCls]">
        <!--多图上传，预览-->
        <template v-if="theme === 'picture' && multiple && fileList.length">
            <div :class="{ fail: file.errorMsg }" class="pic-item" v-for="(file, index) in fileList" :key="index">
                <img :src="file.url">
                <div class="uploading-status" v-if="file.status === 'running'">
                    <span>{{ t('bk.uploadFile.uploading') }}</span>
                    <div class="progress-bar-wrapper">
                        <div class="progress-bar uploading" :style="{ width: fileList[0].progress }"></div>
                    </div>
                </div>
                <div class="mask" v-if="file.done || file.errorMsg">
                    <div class="fail-tips" v-if="file.errorMsg" v-bk-tooltips.top="file.errorMsg"></div>
                    <i class="bk-icon icon-close delete-file" @click="deleteFile(index, file)"></i>
                </div>
            </div>
        </template>
        <div
            class="file-wrapper"
            tabindex="0"
            :class="{ 'isdrag': isdrag }"
            :bk-lableName="labelText"
            v-bk-tooltips="{
                disabled: theme !== 'picture' || multiple || fileList.length === 0 || fileList.length > 1 || !fileList[0].errorMsg,
                content: fileList.length && fileList[0].errorMsg
            }"
            @keydown="handleWrapEnter">
            <div v-if="theme === 'draggable'">
                <i class="bk-icon upload-icon icon-upload-cloud"></i>
                <p class="text-area">
                    <span class="drop-upload">{{dragText}}</span>
                    <span class="click-upload">{{clickText}}</span>
                </p>
            </div>
            <div v-if="theme === 'picture'" class="picture-btn">
                <template>
                    <div v-if="multiple || fileList.length === 0" class="upload-btn">
                        <i class="bk-icon icon-plus-line"></i>
                        <div>{{ t('bk.uploadFile.click') }}</div>
                    </div>
                    <div v-else :class="{ fail: !multiple && fileList.length && fileList[0].errorMsg }" class="pic-item">
                        <div class="uploading-status" v-if="fileList[0].status === 'running'">
                            <span>{{ t('bk.uploadFile.uploading') }}</span>
                            <div class="progress-bar-wrapper">
                                <div class="progress-bar uploading" :style="{ width: fileList[0].progress }"></div>
                            </div>
                        </div>
                        <div class="fail-status" v-if="fileList[0].errorMsg" v-bk-tooltips.top="fileList[0].errorMsg">
                            <i class="bk-icon icon-image error-pic"></i>
                            <div class="reupload">{{ t('bk.uploadFile.reupload') }}</div>
                            <i class="bk-icon icon-close delete-file error" @click="deleteFile(0, fileList[0])"></i>
                        </div>
                        <div class="uploaded-status" v-if="fileList[0].status === 'done' && !fileList[0].errorMsg">
                            <img :src="fileList[0].url">
                            <div class="mask">
                                {{ t('bk.uploadFile.replace') }}
                                <i class="bk-icon icon-close delete-file" @click="deleteFile(0, fileList[0])"></i>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
            <input ref="uploadel" tabindex="-1" @change="selectFile" :accept="acceptTypes" :multiple="multiple" :disabled="disabled" type="file">
        </div>
        <p class="tip" v-if="tip">{{tip}}</p>
        <div class="all-file" v-if="fileList.length && theme !== 'picture'">
            <div v-for="(file, index) in fileList" :key="index">
                <div :class="{ 'file-item-fail': file.errorMsg }" class="file-item">
                    <div class="file-icon">
                        <img v-if="isImageType(file.type)" :src="file.url">
                        <i v-else :class="getIcon(file)"></i>
                    </div>
                    <!-- <i v-if="!file.done" class="bk-icon icon-close close-upload" @click="deleteFile(index, file)"></i> -->
                    <i class="bk-icon icon-close close-upload" @click="deleteFile(index, file)"></i>
                    <div class="file-info">
                        <div class="file-name"><span>{{file.name}}</span></div>
                        <div class="file-message">
                            <span class="upload-speed" v-show="!file.done && file.status === 'running'">{{speed}}{{unit}}</span>
                            <span class="file-size" v-show="!file.done">{{filesize(file.size)}}</span>
                            <span class="file-size done" v-show="file.done">{{t('bk.uploadFile.uploadDone')}}</span>
                        </div>
                        <p v-if="file.errorMsg" v-bk-overflow-tips class="error-msg">{{file.errorMsg}}</p>
                        <div v-else class="progress-bar-wrapper">
                            <div
                                :class="{
                                    'success': file.done,
                                    'uploading': file.status === 'running' && !file.errorMsg
                                }"
                                class="progress-bar"
                                :style="{ width: file.progress }">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    /**
     * bk-upload
     * @module components/upload
     * @desc 文件上传组件
     * @param url（必传） {string}   文件上传到服务器的地址
     * @param name       {string}   - 服务器读取文件的key， 默认为'uplaod_file'
     * @param size       {number}   - 允许上传的文件大小
     * @param multiple   {boolean}  - 是否支持多选
     * @param accept     {string}   - 允许上传的文件类型
     * @param header     {string}   - 请求头
     * @param theme      {string}   - 主题，默认'draggable'，可选项：['draggable','button', 'picture']
     */
    import locale from 'bk-magic-vue/lib/locale'
    import defaultRequest from './request'
    import { uuid } from '@/utils/util'
    import bkOverflowTips from '../../directives/overflow-tips'

    export default {
        name: 'bk-upload',
        directives: {
            bkOverflowTips
        },
        mixins: [locale.mixin],
        props: {
            theme: {
                type: String,
                default: 'draggable'
            },
            files: {
                type: Array,
                default: () => ([])
            },
            name: {
                type: String,
                default: 'upload_file'
            },
            multiple: {
                type: Boolean,
                default: true
            },
            accept: {
                type: String
            },
            delayTime: {
                type: Number,
                default: 0
            },
            url: {
                required: true,
                type: String
            },
            size: {
                type: [Number, Object],
                default: function () {
                    return {
                        maxFileSize: 5,
                        maxImgSize: 1
                    }
                }
            },
            handleResCode: {
                type: Function,
                default: function (res) {
                    if (res && res.code === 0) {
                        return true
                    }
                    return false
                }
            },
            header: [Array, Object],
            tip: {
                type: String,
                default: ''
            },
            validateName: {
                type: RegExp
            },
            withCredentials: {
                type: Boolean,
                default: false
            },
            limit: Number,
            /**
             * 自定义扩展长传属性
             * 格式: { name: 'attrName', value: Object }
             */
            formDataAttributes: {
                type: Array,
                default: () => []
            },
            // 外部设置的 class name
            extCls: {
                type: String,
                default: ''
            },
            customRequest: Function
        },
        data () {
            // let acceptTypes = this.accept
            // if (this.theme === 'picture' && this.accept === undefined) {
            //     acceptTypes = 'image/png,image/jpeg,image/jpg'
            // }

            return {
                dragText: '',
                clickText: '',
                showDialog: true,
                labelText: '',
                fileList: [],
                width: 0,
                barEl: null,
                fileIndex: null,
                speed: 0,
                total: 0,
                unit: 'kb/s',
                isdrag: false,
                progress: 0
                // acceptTypes: acceptTypes
            }
        },
        computed: {
            // 头像上传模式下，图片上传过程中不能重复上传
            disabled () {
                return this.theme === 'picture' && !this.multiple && this.fileList.length === 1 && this.fileList[0].status === 'running'
            },

            acceptTypes () {
                if (this.theme === 'picture' && this.accept === undefined) {
                    return 'image/png,image/jpeg,image/jpg'
                }

                return this.accept
            }
        },
        watch: {
            'fileIndex' (val) {
                if (val !== null && val < this.fileList.length) {
                    if (!this.fileList[val].done) {
                        this.uploadFile(this.fileList[val])
                    } else {
                        this.fileIndex++
                    }
                }
            },
            'files': {
                immediate: true,
                deep: true,
                handler (list) {
                    this.fileList = list.map(item => {
                        this.fileIndex++
                        return Object.assign({
                            status: 'done',
                            done: true,
                            progress: '100%',
                            name: `image.png${uuid()}`
                        }, item)
                    })
                }
            }
        },
        created () {
            this.dragText = this.t('bk.uploadFile.drag')
            this.clickText = this.t('bk.uploadFile.click')
            this.labelText = this.t('bk.uploadFile.uploadLabel')
        },
        mounted () {
            /** 初始化拖拽上传 */
            if (this.theme === 'draggable') {
                const uploadEl = this.$refs.uploadel
                uploadEl.addEventListener('dragenter', e => {
                    this.isdrag = true
                })
                uploadEl.addEventListener('dragleave', e => {
                    this.isdrag = false
                })
                uploadEl.addEventListener('dragend', e => {
                    this.isdrag = false
                })
            }
        },
        methods: {
            isImageType (fileType) {
                return fileType ? fileType.split('/').includes('image') : false
            },
            getValidTypeFiles (files) {
                return files.filter(file => {
                    const { type, name } = file
                    const extension = name.indexOf('.') > -1 ? `.${name.split('.').pop()}` : ''
                    const baseType = type.replace(/\/.*$/, '')
                    return this.acceptTypes.split(',')
                        .map(type => type.trim())
                        .filter(type => type)
                        .some(acceptedType => {
                            if (/\..+$/.test(acceptedType)) {
                                return extension === acceptedType
                            }
                            if (/\/\*$/.test(acceptedType)) {
                                return baseType === acceptedType.replace(/\/\*$/, '')
                            }
                            if (/^[^\/]+\/[^\/]+$/.test(acceptedType)) {
                                return type === acceptedType
                            }
                            return false
                        })
                })
            },
            filesize (val) {
                const size = val / 1000
                if (size < 1) {
                    return `${val.toFixed(3)} KB`
                }
                const index = size.toString().indexOf('.')
                return `${size.toString().slice(0, index + 2)} MB`
            },
            // 处理外层容器 focus 时的 enter 按键事件
            handleWrapEnter (e) {
                if (e.target !== e.currentTarget) {
                    return
                }
                if ((e.keyCode === 13 || e.keyCode === 32) && this.$refs.uploadel) {
                    this.$refs.uploadel.value = null
                    this.$refs.uploadel.click()
                }
            },
            selectFile (e) {
                const originalFiles = Array.from(e.target.files)
                const files = this.acceptTypes ? this.getValidTypeFiles(originalFiles) : originalFiles
                if (!files.length) {
                    e.target.value = ''
                    return
                }
                if (typeof this.limit === 'number'
                    && this.limit !== 1
                    && (files.length + this.fileList.length) > this.limit) {
                    e.target.value = ''
                    this.$emit('on-exceed', e.target.files, this.fileList)
                    return
                }
                const me = this
                files.forEach((file, i) => {
                    const fileObj = {
                        name: file.name,
                        originSize: file.size,
                        size: file.size / 1000,
                        maxFileSize: null,
                        maxImgSize: null,
                        type: file.type,
                        fileHeader: '',
                        origin: file,
                        url: '',
                        base64: '',
                        status: '',
                        done: false,
                        responseData: '',
                        speed: null,
                        errorMsg: '',
                        progress: ''
                    }

                    const index = fileObj.type.indexOf('/')
                    const type = fileObj.type.slice(0, index)
                    fileObj.fileHeader = type
                    if (typeof me.size === 'number') {
                        fileObj.maxFileSize = me.size
                        fileObj.maxImgSize = me.size
                    } else {
                        fileObj.maxFileSize = me.size.maxFileSize
                        fileObj.maxImgSize = me.size.maxImgSize
                    }

                    // accept props 是否只允许上传图片
                    const onlyAcceptImage = !(me.accept || '').split(',').some(acc => acc.indexOf('image') < 0)
                    if (type === 'image' || onlyAcceptImage) {
                        me.handleImage(fileObj, file)
                    }
                    if (type !== 'image' && fileObj.size > (fileObj.maxFileSize * 1000)) {
                        fileObj.errorMsg = me.t('bk.uploadFile.fileExceedMsg', {
                            fileName: fileObj.name,
                            size: fileObj.maxFileSize
                        })
                    }
                    if (me.validateName) {
                        if (!me.validateName.test(fileObj.name)) {
                            fileObj.errorMsg = me.t('bk.uploadFile.invalidFileName')
                        }
                    }
                    if ((me.theme === 'picture' && !me.multiple) || me.limit === 1) { // 上传文件 limit 设置为 1 或者头像上传时，只保留一条数据
                        me.fileList = [fileObj]
                    } else {
                        me.fileList.push(fileObj)
                    }
                })
                const len = this.fileList.length
                const fileIndex = this.fileIndex
                if (len - 1 === fileIndex) {
                    this.uploadFile(this.fileList[fileIndex])
                } else {
                    this.fileIndex = 0
                }
                e.target.value = ''
            },
            hideFileList () {
                if (this.delayTime) {
                    setTimeout(() => {
                        this.fileList = []
                    }, this.delayTime)
                }
            },
            uploadFile (fileObj) {
                if (fileObj.errorMsg) {
                    this.fileIndex += 1
                    fileObj.progress = 100 + '%'
                    this.$emit('on-error', fileObj, this.fileList)
                    return
                }
                const uploadProgress = e => {
                    if (e.lengthComputable) {
                        const percentComplete = Math.round(e.loaded * 100 / e.total)
                        const kb = Math.round(e.loaded / 1000)
                        fileObj.progress = percentComplete + '%'
                        this.speed = kb - this.total
                        this.total = kb
                        this.unit = 'kb/s'
                        if (this.speed > 1000) {
                            this.speed = Math.round(this.speed / 1000)
                            this.unit = 'mb/s'
                        }
                        this.$emit('on-progress', e, fileObj, this.fileList)
                    }
                    fileObj.status = 'running'
                }
                const options = {
                    fileName: this.name,
                    fileObj: fileObj,
                    fileList: this.fileList,
                    data: this.formDataAttributes || [],
                    withCredentials: this.withCredentials,
                    method: 'POST',
                    header: this.header,
                    url: this.url,
                    onProgress: (event) => {
                        uploadProgress(event)
                    },
                    onSuccess: (reponseText, fileObj) => {
                        this.handleSuccess(reponseText, fileObj)
                    },
                    onError: (fileObj, fileList, response) => {
                        this.$emit('on-error', fileObj, fileList, response)
                    },
                    onDone: (fileObj) => {
                        this.handleDone(fileObj)
                    }
                }
                this.isdrag = false
                const request = this.customRequest || defaultRequest
                request(options)
            },
            handleSuccess (response, file) {
                if (this.handleResCode(response)) {
                    file.done = true
                    file.responseData = response
                    this.$emit('on-success', file, this.fileList)
                } else {
                    file.errorMsg = response.message || this.t('bk.uploadFile.uploadFailed')
                    this.$emit('on-error', file, this.fileList)
                }
            },
            handleDone (file) {
                this.fileIndex += 1
                this.unit = 'kb/s'
                this.total = 0
                file.status = 'done'
                if (this.fileIndex === this.fileList.length) {
                    this.$emit('on-done', this.fileList)
                    this.hideFileList()
                }
            },
            handleImage (fileObj, file) {
                if (fileObj.size > (fileObj.maxImgSize * 1000)) {
                    fileObj.errorMsg = this.t('bk.uploadFile.imageExceedMsg', { imgSize: fileObj.maxImgSize })
                    return false
                }
                const reader = new FileReader()
                reader.onload = (e) => {
                    this.smallImage(reader.result, fileObj)
                }
                reader.readAsDataURL(file)
                return true
            },

            smallImage (result, fileObj) {
                const img = new Image()
                const canvas = document.createElement('canvas')
                const context = canvas.getContext('2d')
                img.onload = () => {
                    const originWidth = img.width
                    const originHeight = img.height
                    const maxWidth = this.theme === 'picture' ? 90 : 36
                    const maxHeight = maxWidth
                    let targetWidth = originWidth
                    let targetHeight = originHeight
                    if (originWidth > maxWidth || originHeight > maxHeight) {
                        if (originWidth / originHeight > maxWidth / maxHeight) {
                            targetWidth = maxWidth
                            targetHeight = Math.round(maxWidth * (originHeight / originWidth))
                        } else {
                            targetWidth = maxWidth
                            targetHeight = maxHeight
                        }
                    }
                    canvas.width = targetWidth
                    canvas.height = targetHeight
                    context.clearRect(0, 0, targetWidth, targetHeight)
                    context.drawImage(img, 0, 0, targetWidth, targetHeight)
                    const base64 = canvas.toDataURL()
                    fileObj['url'] = base64
                    fileObj['base64'] = base64
                }
                img.src = result
            },
            getIcon (file) {
                const zipType = ['application/zip', 'application/rar', 'application/tar', 'application/gz']
                if (zipType.includes(file.type)) {
                    return 'bk-icon icon-compressed-file'
                }
                return 'bk-icon icon-text-file'
            },
            deleteFile (index, file) {
                if (file.xhr) {
                    file.xhr.abort()
                }
                this.fileList.splice(index, 1)
                const len = this.fileList.length
                if (!len) {
                    this.fileIndex = null
                }
                // if (index === 0 && len) {
                //     this.fileIndex = 0
                //     this.uploadFile(this.fileList[0])
                // }
                this.$emit('on-delete', file, this.fileList)
            }
        }
    }
</script>
<style>
    @import '../../ui/upload.css';
</style>
