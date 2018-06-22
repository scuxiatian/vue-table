<template>
    <el-dialog :visible.sync="localShow" :title="title" :before-close="beforeClose">
        <!-- 插槽区 -->
        <slot></slot>
        <!-- 按钮区 -->
        <span slot="footer">
            <el-button type="success" icon="el-icon-check" @click="save">保存</el-button>
            <el-button type="danger" icon="el-icon-close" @click="close">关闭</el-button>
        </span>
    </el-dialog>
</template>

<script>
    export default {
        props: {
            show: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: '对话框'
            }
        },
        data() {
            return {
                localShow: this.show
            }
        },
        watch: {
            show(val) {
                this.localShow = val
            }
        },
        methods: {
            beforeClose() {
                this.close()
            },
            close() {
                this.$emit('close')
            },
            save() {
                this.$emit('save')
            }
        }
    }
</script>