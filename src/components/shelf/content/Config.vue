<template>
    <div class="config">
        <el-form ref="form" label-position="left" :rules="rules" :model="userBaseInfoDO" label-width="120px">
            <el-form-item label="头像:" prop="avatar">
                <div class="avatar" @click="$refs.file.click()">
                    <img :src="userBaseInfoDO.headPicPath" alt="头像">
                    <input ref="file" type="file" accept="image/png, image/jpeg, image/gif, image/jpg" style="display:none" @change="uploadAvatar">
                </div>
            </el-form-item>
            <el-form-item label="用户id:" prop="id">
                <div>
                    {{userBaseInfoDO.id}}
                </div>
            </el-form-item>
            <el-form-item class="inline" label="用户名:" prop="nickName">
                <template v-if="!isEdit.nickName">
                    <span class="nickname">
                        {{userBaseInfoDO.nickName}}
                    </span>
                    <span class="icon">
                        <font-awesome-icon @click="isEdit.nickName = true" icon="edit"></font-awesome-icon>
                    </span>
                </template>
                <template v-else>
                    <el-input v-model="temp.nickName"></el-input>
                    <el-button size="mini" type="primary" @click="uploadChange">保存</el-button>
                    <el-button size="mini" @click="isEdit.nickName = false">取消</el-button>
                </template>
            </el-form-item>
            <el-form-item class="inline" label="Email:" prop="email">
                <template v-if="!isEdit.email">
                    <span class="email">
                        {{userBaseInfoDO.email}}
                    </span>
                    <span class="icon">
                        <font-awesome-icon @click="changeItem('email')" icon="edit"></font-awesome-icon>
                    </span>
                </template>
                <template v-else>
                    <el-input v-model="temp.email"></el-input>
                    <el-button size="mini" type="primary" @click="uploadChange">保存</el-button>
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
            <el-form-item class="inline" label="修改密码:" prop="password">
                <template v-if="!isEdit.password">
                    <span class>
                        <font-awesome-icon @click="changeItem('password')" icon="edit"></font-awesome-icon>
                    </span>
                </template>
                <template v-else>
                    <label for="oldPass">旧密码: </label><el-input v-model="temp.password"></el-input>
                    <label for="newPass">新密码: </label><el-input v-model="temp.password"></el-input>
                    <label for="checkPass">确认密码: </label><el-input v-model="temp.password"></el-input>
                    <el-button size="mini" type="primary" @click="uploadChange">保存</el-button>
                    <el-button size="mini" @click="notChangeItem('password')">取消</el-button>
                </template>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import getUserInfo from '@/common/js/getUserInfo';
import getBase64Image from '@/common/js/getBase64Image';

import {updateUserInfo} from '@/api/api'

export default {
    data() {
        return {
            userBaseInfoDO: {
            },
            rules: {
                email: [
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }
                ],
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
    created() {
        const userInfo = this.getUserInfo();
        this.userBaseInfoDO = userInfo;
        // this.temp = Object.assign({}, userInfo); // 浅拷贝
        this.temp = {
            nickName: userInfo.nickName,
            email: userInfo.email,
            password: userInfo.password
        }
    },
    methods: {
        uploadChange() {
            updateUserInfo({userBaseInfoDO: this.updateUserInfo});
        },
        uploadAvatar(e) {
            const event = e.target || e.srcElement;
            const base64Promise = getBase64Image(event.files[0]);
            base64Promise.then(res => {
                this.userBaseInfoDO.headPicPath = res;
                this.uploadChange();
            })
        },
        changeItem(item) {
            this.temp[item] = this.userBaseInfoDO[item];
            this.isEdit[item] = true;
        },
        notChangeItem(item) {
            // this.userBaseInfoDO[item] = this.temp[item];
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
        .inline {
            .el-form-item__content {
                display: flex;
                align-items: center;
            }
            button {
                width: 6rem;
                height: 2rem;
                &:first-of-type {
                    margin-left: 1rem;
                }
            }
        }
        .icon {
            margin-left: 8px;
            color: $grey;
            cursor: pointer;
        }
    }
</style>
