<template>
    <el-dialog
        class="register"
        title="注册"
        :visible.sync="isRegister"
        width="40%"
        :close-on-click-modal="false"
        :before-close="close">
        <el-form ref="form" label-position="left" :rules="rules" :model="register" label-width="120px">
            <el-form-item  label="用户名:" prop="username">
                <el-input v-model="register.username"></el-input>
            </el-form-item>
            <el-form-item  ref="mail" label="邮箱:" prop="email">
                <el-input v-model="register.email"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="password">
                <el-input ref="password" type="password" v-model="register.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码:" prop="checkPassword">
                <el-input type="password" v-model="register.checkPassword" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item class="verifycode" label="请输入验证码:" prop="verifyCode">
                <el-input v-model="register.verifyCode"></el-input>
                <el-button type="primary" plain @click="sendVerificationMail">发送验证码</el-button>
            </el-form-item>
            <el-form-item class="button">
                <el-button type="primary" @click="submitForm">提交</el-button>
                <el-button @click="close">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>

</template>
<script>


import {sendVerifyCode, checkVerifyCode, userRegister} from '@/api/api';

export default {
    model: {
        prop: 'isRegister',
        event: 'closeRegister'
    },
    props: ['isRegister'],
    data() {
        // FIXME: 写在这里肯定有问题
        const validatePass = (rule, value, callback) => {
            if (value !== this.$refs.password.value) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };

        const validateVerfifyCode = async (rule, value, callback) => {
            checkVerifyCode({
                email: this.register.email,
                checkVerifyCode: value,
                type: 0
            }).then(res => {
                if (data) {
                    callback();
                }
                else {
                    callback(new Error('验证码错误!'))
                }
            }).catch(err => {
                callback(new Error('验证码错误!'))
            })
        }
        return {
            register: {
                username: '',
                email: '',
                password: '',
                checkPassword: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                email: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
                checkPassword: [
                    { required: true, message: '请输入确认密码', trigger: 'blur' },
                    { validator: validatePass, trigger: 'blur' }
                ],
                verifyCode: [
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                    { validator: validateVerfifyCode, trigger: ['blur', 'change'] }
                ]
            }
        }
    },
    methods: {
        submitForm() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    const _this = this;
                    this.$confirm('确认注册?')
                    .then(() => _this.registerUser())
                    .catch(err => console.err(err));
                } else {
                    return false;
                }
            });
        },
        async registerUser() {
            const register = this.register;
            try {
                await userRegister({
                    email: register.email,
                    password: register.password
                });
                this.$message({
                    message: '注册成功',
                    type: 'success'
                });
                this.close();
            }
            catch(err) {
                this.$message({
                    message: '注册失败',
                    type: 'error'
                });
            }
        },
        sendVerificationMail() {
            this.$refs.mail.validate('', inValid => {
                if (!inValid) {
                    sendVerifyCode({
                        email: this.register.email,
                        type: 0
                    })
                }
            })
        },
        close() {
            this.$refs.form.resetFields();
            this.$emit('closeRegister', false);
        }
    }
}
</script>
<style lang="scss">
    .register {
        .button {
            button{
                &:nth-of-type(1) {
                    margin-left: 60px;
                }
                &:nth-of-type(2){
                    margin-left: 80px;
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
    }
</style>
