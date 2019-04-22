<template>
    <div class="edit-book">
        <div class="back">
            <img src="../../../../assets/img/return.svg" alt="返回">
        </div>
        <div class="title">
            {{editBookStatus === 'add' ? '添加' : '修改'}}图书
        </div>
        <el-form ref="form" label-position="left" :rules="rules" :model="book" label-width="120px">
            <el-form-item label="书名:" prop="bookName">
                <el-input v-model="book.bookName"></el-input>
            </el-form-item>
            <el-form-item label="作者:" prop="authorName">
                <el-autocomplete
                    v-model="book.authorName"
                    :fetch-suggestions="querySearchAsync"
                    placeholder="请输入作者名"
                ></el-autocomplete>
            </el-form-item>
            <el-form-item label="购买地址:" prop="buyPath">
                <el-input v-model="book.buyPath"></el-input>
            </el-form-item>
            <el-form-item label="封面图:" prop="bookPic">
                <input ref="file" type="file" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadAvatar">
            </el-form-item>
            <el-form-item label="是否完结:" prop="isOver">
                <el-switch v-model="book.isOver"></el-switch>
            </el-form-item>
            <el-form-item label="是否出版:" prop="isPublished">
                <el-switch v-model="book.isPublished"></el-switch>
            </el-form-item>
            <el-form-item label="分类:" prop="sort">
                <el-select v-model="book.bigCateId" placeholder="请选择大类" @change="changeBigCate">
                    <el-option v-for="item in sortArr.bigCateArr" :key="item.id" :label="item.cateName" :value="item.id"></el-option>
                </el-select>
                -
                <el-select v-model="book.smallCateId" placeholder="请选择小类">
                    <el-option v-for="item in sortArr.smallCateArr" :key="item.id" :label="item.cateName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="图书简介: ">
                <el-input type="textarea" v-model="book.bookDesc"></el-input>
            </el-form-item>
            <!-- <el-form-item label="标签:" prop="bookName">
                <el-input v-model="book.bookName"></el-input>
            </el-form-item> -->
            <el-form-item label="书名:" prop="bookName">
                <el-input v-model="book.bookName"></el-input>
            </el-form-item>
            <el-form-item class="button">
                <!-- <el-button type="primary" @click="submitForm">提交</el-button>
                <el-button @click="close">取消</el-button> -->
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

import { mapState } from 'vuex';

import { searchAuthor, getAllCategory } from '@/api/api';

import getBase64Image from '@/common/js/getBase64Image';

export default {
    data() {
        return {
            book: {
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
            },
            sortArr: {
                allCategory: [],
                bigCateArr: [],
                smallCateArr: []
            }
        }
    },
    computed: {
        ...mapState(['editBookStatus'])
    },
    created() {
        this.init();
    },
    methods: {
        async init() {
            const allCategory = await getAllCategory();
            const bigCateArr = allCategory.map(item => item.bigCategoryDO);
            this.sortArr.allCategory = allCategory;
            this.sortArr.bigCateArr = bigCateArr;
        },
        async querySearchAsync(queryString, cb) {
            if (queryString) {
                const authorArr = await searchAuthor({authorName: queryString});
                const mapAuthorArr = authorArr.map(item => ({value: item.authorName}));
                cb(mapAuthorArr);
            }
            else {
                cb([]);
            }
        },
        uploadAvatar(e) {
            const event = e.target || e.srcElement;
            const base64Promise = getBase64Image(event.files[0]);
            base64Promise.then(res => {
                this.book.bookPic = res;
            })
        },
        changeBigCate(bigCate) {
            const allCategory = this.sortArr.allCategory;
            const smallCateItem = allCategory.find(item => item.bigCategoryDO.id === bigCate);
            const smallCateArr = smallCateItem.smallCategoryList;
            this.$set(this.book, 'smallCateId', null);
            this.sortArr.smallCateArr = smallCateArr;
        }
    }
}

</script>

<style lang="scss" scoped>
    .edit-book {
        color: $grey;
        .back {
            color: $blue;
            width: 1.5rem;
            height: 1.5rem;
            img {
                color: $blue;
            }
        }
    }
</style>
