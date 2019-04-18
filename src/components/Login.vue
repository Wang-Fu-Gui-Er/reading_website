<template>
    <el-dialog
        class="login"
        title="登陆"
        :visible.sync="isLogin"
        width="40%"
        :close-on-click-modal="false"
        :before-close="close">
        <el-form ref="form" label-position="left" :rules="rules" :model="login" label-width="120px">
            <el-form-item  ref="mail" label="邮箱:" prop="email">
                <el-input v-model="login.email"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="password">
                <el-input ref="password" type="password" v-model="login.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item class="button">
                <el-button type="primary" @click="submitForm">提交</el-button>
                <el-button @click="close">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>

import { userLogin } from '@/api/api';

import { mapMutations } from 'vuex';

import setUserInfo from '@/common/js/setUserInfo';

export default {
    model: {
        prop: 'isLogin',
        event: 'closeLogin'
    },
    props: ['isLogin'],
    data() {
        // FIXME: 写在这里肯定有问题
        return {
            login: {
                email: '',
                password: '',
            },
            rules: {
                email: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ]
            }
        }
    },
    mixins:[setUserInfo],
    methods: {
        ...mapMutations(['UPDATE_USERINFO']),
        submitForm() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.loginUser();
                } else {
                    return false;
                }
            });
        },
        async loginUser() {
            const login = this.login;
            try {
                const userInfo = await userLogin({
                    email: login.email,
                    password: login.password
                });
                this.storageUserInfo(userInfo);
                this.$message({
                    message: '登陆成功',
                    type: 'success'
                });
                this.$emit('initUserConfig');
                this.close();
            }
            catch(err) {
                this.$message({
                    message: '登陆失败',
                    type: 'error'
                });
            }
        },
        close() {
            this.$refs.form.resetFields();
            this.$emit('closeLogin', false);
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
