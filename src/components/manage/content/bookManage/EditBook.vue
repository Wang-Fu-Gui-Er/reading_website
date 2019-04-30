<template>
    <div class="edit-book">
        <div class="back" @click="$router.back()">
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
            <el-form-item class="book-pic" label="封面图:" prop="bookPic">
                <img :src="book.bookPic" alt="">
                <input ref="file" type="file" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadAvatar">
            </el-form-item>
            <el-form-item label="是否完结:" prop="isOver">
                <el-switch v-model="book.isOver"></el-switch>
            </el-form-item>
            <el-form-item label="是否出版:" prop="isPublished">
                <el-switch v-model="book.isPublished"></el-switch>
            </el-form-item>
            <el-form-item label="分类:" prop="sort">
                <el-select v-model="book.bigCateName" placeholder="请选择大类" @change="changeBigCate">
                    <el-option v-for="item in sortArr.bigCateArr" :key="item.id" :label="item.cateName" :value="item.id"></el-option>
                </el-select>
                -
                <el-select v-model="book.smallCateName" placeholder="请选择小类">
                    <el-option v-for="item in sortArr.smallCateArr" :key="item.id" :label="item.cateName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="图书简介: ">
                <el-input type="textarea" v-model="book.bookDesc"></el-input>
            </el-form-item>
            <el-form-item label="图书地址:" prop="bookPath">
                <input ref="file" type="file" @change="uploadBook">
                {{book.bookPath}}
            </el-form-item>
            <el-form-item class="button">
                <el-button size="mini" type="primary" @click="submitForm">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

import { mapState } from 'vuex';

import { searchAuthor, getAllCategory, upload, getBookDetail, alterBook } from '@/api/api';

export default {
    data() {
        return {
            book: {
                bookName: null,
                authorName: null,
                buyPath: null,
                isOver: false,
                isPublished: false,
                bigCateId: null,
                smallCateId: null,
                bookDesc: null,
                bookPic: null,
                bookPath: null
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
        ...mapState(['editBookStatus', 'editBookId'])
    },
    created() {
        this.init();
    },
    methods: {
        async init() {
            if (this.editBookStatus === 'edit') {
                const bookId = this.editBookId;
                const book = await getBookDetail({bookId});
                this.book = book;
            }
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
            const formData = new FormData()
            formData.append('uploadfile', event.files[0]);
            this.book.bookPic = formData;
        },
        async uploadBook(e) {
            const event = e.target || e.srcElement;
            const uploadData = await upload({file: event.files[0], type: 'book'});
            const bookPath = uploadData.bookPath;
            this.book.bookPath = bookPath;
        },
        changeBigCate(bigCate) {
            const allCategory = this.sortArr.allCategory;
            const smallCateItem = allCategory.find(item => item.bigCategoryDO.id === bigCate);
            const smallCateArr = smallCateItem.smallCategoryList;
            this.$set(this.book, 'smallCateId', null);
            this.sortArr.smallCateArr = smallCateArr;
        },
        async submitForm() {
            const bookDO = this.book;
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
    .edit-book {
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
        .book-pic {
            img {
                width: 6rem;
                height: 8rem;
            }
        }
        .title {
            margin: 20px 0;
            font-size: 18px;
            font-weight: bold;
        }
    }
</style>
