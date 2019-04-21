<template>
    <el-dialog
        class="fallback"
        title="意见反馈"
        :visible.sync="isFallback"
        width="40%"
        :close-on-click-modal="false"
        :before-close="close">
        <el-form ref="form" label-position="left" :rules="rules" :model="fallback" label-width="120px">
            <el-form-item label="类型:" prop="type" required>
                <el-select v-model="fallback.type" placeholder="请选择反馈类型">
                    <el-option v-for="item in type" :key="item.id" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标题" prop="title" required>
                <el-input v-model="fallback.title" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="详细描述:" prop="detail" required>
                <el-input type="textarea" placeholder="请输入详细描述" v-model="fallback.detail"></el-input>
            </el-form-item>
            <el-form-item label="联系方式:" prop="email" required>
                <el-input placeholder="请输入邮箱地址" v-model="fallback.email"></el-input>
            </el-form-item>
            <el-form-item class="button">
                <el-button type="primary" @click="submitForm">提交</el-button>
                <el-button @click="close">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>

import {userFallback} from '@/api/api';

export default {
    model: {
        prop: 'isFallback',
        event: 'closeDialog'
    },
    props: ['isFallback'],
    data() {
        return {
            fallback: {
                type: '',
                detail: '',
                email: '',
                title: '',
            },
            rules: {
                email: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ]
            },
            type: [{
                label: '缺失',
                value: 0
            }, {
                label: '举报',
                value: 1
            }, {
                label: '建议',
                value: 2
            }]
        }
    },
    methods: {
        submitForm() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.onFallback();
                } else {
                    return false;
                }
            });
        },
        async onFallback() {
            const register = this.register;
            try {
                await userFallback(this.fallback);
                this.$message({
                    message: '反馈成功',
                    type: 'success'
                });
                this.close();
            }
            catch(err) {
                this.$message({
                    message: '反馈失败',
                    type: 'error'
                });
            }
        },
        close() {
            this.$refs.form.resetFields();
            this.$emit('closeDialog', false);
        }
    }
}
</script>
<style lang="scss">
    .login {
        .button {
            .el-form-item__content {
                display: flex;
                // width: 100%;
                justify-content: space-evenly;
                button{
                    // flex: 1;
                }
            }
        }
        .verifycode {
            .el-form-item__content {
                display: flex;
                button {
                    margin-left: 20px;
                }
            }
            .el-button--primary.is-plain:focus, .el-button--primary.is-plain:hover {
                background: #ecf5ff;
                border-color: #409EFF;
                color: #2a90f9;
            }
        }
        .el-dialog__header, .el-dialog__body {
            // padding: 0 30px;
        }
    }
</style>
