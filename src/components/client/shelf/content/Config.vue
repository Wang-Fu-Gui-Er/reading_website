<template>
    <div class="config">
        <el-form ref="form" label-position="left" :rules="rules" :model="temp" label-width="120px">
            <el-form-item label="头像:" prop="avatar">
                <div class="avatar" @click="$refs.file.click()">
                    <img :src="userBaseInfoDO.headPicPath" alt="头像">
                    <input ref="file" type="file" accept="image/png, image/jpeg, image/gif, image/jpg" style="display:none" @change="uploadAvatar">
                </div>
            </el-form-item>
            <el-form-item label="用户ID:" prop="id">
                <div>
                    {{userBaseInfoDO.id}}
                </div>
            </el-form-item>
            <el-form-item class="inline" label="用户名:" prop="nickName">
                <template v-if="!isEdit.nickName">
                    <span class="nickname">
                        {{userBaseInfoDO.nickName}}
                    </span>
                    <span class="icon icon-left">
                        <font-awesome-icon @click="isEdit.nickName = true" icon="edit"></font-awesome-icon>
                    </span>
                </template>
                <template v-else>
                    <el-input v-model="temp.nickName"></el-input>
                    <el-button size="mini" type="primary" @click="uploadChange('nickName')">保存</el-button>
                    <el-button size="mini" @click="isEdit.nickName = false">取消</el-button>
                </template>
            </el-form-item>
            <el-form-item class="inline" label="Email:" prop="email">
                <template v-if="!isEdit.email">
                    <span class="email">
                        {{userBaseInfoDO.email}}
                    </span>
                    <span class="icon icon-left">
                        <font-awesome-icon @click="isEdit.email = true" icon="edit"></font-awesome-icon>
                    </span>
                </template>
                <template v-else>
                    <el-input v-model="temp.email"></el-input>
                    <el-button size="mini" type="primary" @click="uploadChange('email')">保存</el-button>
                    <el-button size="mini" @click="notChangeItem('email')">取消</el-button>
                </template>
            </el-form-item>
            <el-form-item label="创建账号时间:" prop="created">
                <div>
                    {{userBaseInfoDO.created}}
                </div>
            </el-form-item>
            <el-form-item label="更新账号时间:" prop="updated">
                <div>
                    {{userBaseInfoDO.updated}}
                </div>
            </el-form-item>
            <el-form-item class label="修改密码:" prop="password">
                <template v-if="!isEdit.password">
                    <span class="icon">
                        <font-awesome-icon @click="isEdit.password = true" icon="edit"></font-awesome-icon>
                    </span>
                </template>
                <template v-else>
                    <div class="item">
                        <label for="oldPass">旧密码: </label><el-input v-model="temp.password" type="password"></el-input>
                    </div>
                    <div class="item">
                        <label for="newPass">新密码: </label><el-input ref="password" v-model="temp.newPass" type="password"></el-input>
                    </div>
                    <div class="item">
                        <label for="checkPass">确认密码: </label><el-input v-model="temp.checkPass" type="password"></el-input>
                    </div>
                    <el-button size="mini" type="primary" @click="uploadChange('password')">保存</el-button>
                    <el-button size="mini" @click="notChangeItem('password')">取消</el-button>
                </template>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import getUserInfo from '@/common/js/getUserInfo';

import {updateUserInfo} from '@/api/api';

export default {
    data() {
        return {
            userBaseInfoDO: {
            },
            rules: {
            },
            isEdit: {
                nickName: false,
                email: false,
                password: false
            },
            temp: {
            }
        }
    },
    mixins: [getUserInfo],
    inject: ['reload'],
    created() {
        const userInfo = this.getUserInfo();
        this.userBaseInfoDO = userInfo;
        this.temp = {
            nickName: userInfo.nickName,
            email: userInfo.email,
            password: null,
            newPass: null,
            checkPass: null,
            headPicPath: null
        }
    },
    methods: {
        validator(item) {
            let isValid = true;
            let msg = null;
            const value = this.temp[item];
            if (item === 'email') {
                const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                isValid = reg.test(value);
                msg = !value ? '邮件不可为空' : (isValid ? null : '邮件格式错误');
            }
            else if (item === 'nickName') {
                if (!value) {
                    msg = '用户名不可为空';
                    isValid = false;
                }
            }
            else if (item === 'password') {
                if (value !== this.userBaseInfoDO.password) {
                    msg = '旧密码输入错误';
                    isValid = false;
                }
                else if (this.temp.newPass !== this.temp.checkPass) {
                    msg = '两次密码输入不一致';
                    isValid = false;
                }
            }
            return [isValid, msg];
        },
        async uploadChange(item) {
            const [isValid, msg] = this.validator(item);
            if (isValid) {
                this.userBaseInfoDO[item] = this.temp[item]
                await updateUserInfo({userBaseInfoDO: this.userBaseInfoDO});
                this.isEdit[item] = false;
                this.$message({
                    message: '更新用户信息成功',
                    type: 'success'
                });
                this.reload();
            }
            else {
                this.$message({
                    message: `${msg}`,
                    type: 'error'
                });
            }
        },
        uploadAvatar(e) {
            const event = e.target || e.srcElement;
            const formData = new FormData()
            formData.append('uploadfile', event.files[0]);
            this.temp.headPicPath = formData;
            this.uploadChange('headPicPath');
        },
        notChangeItem(item) {
            this.temp[item] = this.userBaseInfoDO[item];
            this.isEdit[item] = false;
        }
    }
}
</script>

<style lang="scss">
    .config {
        width: 100%;
        .avatar {
            cursor: pointer;
            width: 4rem;
            height: 4rem;
            border-radius: 50%;
            overflow: hidden;
        }
        button {
            width: 6rem;
            height: 2rem;
        }
        .inline {
            .el-form-item__content {
                display: flex;
                align-items: center;
            }
            button:first-of-type {
                margin-left: 1rem;
            }
        }
        .el-form-item__label::before {
            content: ''!important;
            margin: 0px!important;
        }
        .item {
            display: flex;
            margin-bottom: 1rem;
            label {
                width: 100px;
            }
        }
        .icon-left {
            margin-left: 8px;
        }
        .icon {
            color: $grey;
            cursor: pointer;
        }
    }
</style>
