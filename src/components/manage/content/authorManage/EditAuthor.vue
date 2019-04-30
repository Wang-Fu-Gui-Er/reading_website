<template>
    <div class="edit-author">
        <div class="back" @click="$router.back()">
            <img src="../../../../assets/img/return.svg" alt="返回">
        </div>
        <div class="title">
            {{editAuthorStatus === 'add' ? '添加' : '修改'}}作者
        </div>
        <el-form ref="form" label-position="left" :model="author" label-width="120px">
            <el-form-item label="作者名:" prop="authorName">
                <el-input v-model="author.authorName"></el-input>
            </el-form-item>
            <el-form-item class="author-pic" label="头像:" prop="authorPic">
                <img :src="author.authorPic" alt="">
                <input ref="file" type="file" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadAvatar">
            </el-form-item>
            <el-form-item label="微博昵称:" prop="weiboName">
                <el-input v-model="author.weiboName"></el-input>
            </el-form-item>
            <el-form-item label="简介: ">
                <el-input type="textarea" v-model="author.authorDesc"></el-input>
            </el-form-item>
            <el-form-item label="代表作品: " prop="represenWorks">
                <el-input v-model="author.represenWorks"></el-input>
            </el-form-item>
            <el-form-item class="button">
                <el-button size="mini" type="primary" @click="submitForm">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

import { mapState } from 'vuex';

import { getAuthorInfo } from '@/api/api';

export default {
    data() {
        return {
            author: {
                authorName: null,
                authorPic: null,
                weiboName: null,
                authorDesc: null,
                represenWorks: null
            },
        }
    },
    computed: {
        ...mapState(['editAuthorStatus', 'editAuthorId'])
    },
    created() {
        if (this.editAuthorStatus === 'edit') {
            this.initAuthor();
        }
    },
    methods: {
        async initAuthor() {
            const authorId = this.editAuthorId;
            const author = await getAuthorInfo({authorId});
            this.author = author;
        },
        uploadAvatar(e) {
            const event = e.target || e.srcElement;
            const formData = new FormData()
            formData.append('uploadfile', event.files[0]);
            this.author.authorPic = formData;
        },
        async submitForm() {
            const bookDO = this.author;
            const msg = this.editBookStatus === 'edit' ? '修改' : '添加';
            try {
                await alterBook({bookDO});
                this.$message({
                    message: `${msg}成功`,
                    type: 'success'
                });
                this.$router.back();
            }
            catch(err) {
                this.$message({
                    message: `${msg}失败`,
                    type: 'error'
                });
            }
        }
    }
}

</script>

<style lang="scss" scoped>
    .edit-author {
        color: $grey;
        .back {
            color: $blue;
            width: 1.5rem;
            height: 1.5rem;
            cursor: pointer;
            img {
                color: $blue;
            }
        }
        .author-pic {
            img {
                width: 3rem;
                height: 3rem;
                border-radius: 50%;
            }
        }
        .title {
            margin: 20px 0;
            font-size: 18px;
            font-weight: bold;
        }
    }
</style>
