<template>
    <div class="author-manage">
        <div class="search">
            <el-input
                size="small"
                placeholder="请输入搜索内容"
                v-model="search.searchKey"
                @blur="searchBook(search)">
                <el-button slot="append" @click="searchBook(search)" icon="el-icon-search"></el-button>
            </el-input>
        </div>
        <div class="addBook">
            <button @click="editBook('add')">添加作者</button>
        </div>
        <div class="author">
            <div class="author-item" v-for="item in author" :key="item.id">
                <div class="author-pic">
                    <img :src="item.bookPic" alt="">
                </div>
                <div class="content">
                    <div class="author-name">
                        {{item.bookName}}
                    </div>
                    <div class="author-name">
                        {{item.authorName}}
                    </div>
                    <div class="alter">
                        <button @click="editBook('edit')">修改</button>
                        <button @click="deleteBook(item.id)">删除</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="pager">
            <el-pagination
                layout="total, prev, pager, next"
                :total="page.totalNum"
                @current-change="searchBook"
                >
            </el-pagination>
        </div>
    </div>
</template>

<script>

import { searchAuthor, delBook } from '@/api/api';
import { mapMutations } from 'vuex';

export default {
    data() {
        return {
            author: [],
            search: {
                pageNum: 1,
                pageSize: 10,
                searchType: 'author',
                searchkey: ''
            },
            page: {},
            pagerType: 'all',
        }
    },
    created() {
        this.searchBook();
    },
    inject:  ['reload'],
    methods: {
        ...mapMutations(['CHANGE_EDIT_BOOK_STATUS']),
        async searchBook(pageNum) {
            const search = this.search;
            if (typeof pageNum === 'number') {
                search.pageNum = pageNum;
            }
            const {data, page} = search.searchkey ? await searchAuthor() : await searchAuthor(search);
            this.author = data;
            this.page = page;
        },
        editBook(status) {
            this.CHANGE_EDIT_BOOK_STATUS(status);
            this.$router.push({name: 'edit'});
        },
        deleteBook(id) {
            delBook({id});
            this.reload();
        }
    }
}
</script>

<style lang="scss" scoped>
    .author-manage {
        .addBook, .author {
            button {
                margin: 0;
                padding: 0;
                border: 1px solid $butonBg;
                outline: none;
                padding: 3px 5px;
                cursor: pointer;
                &:hover {
                    background-color: $greyWhite;
                }
            }
        }
        .search {
            width: 15rem;
        }
        .total {
            margin: 1vh 0;
            font-size: 12px;
            color: $otherGrey;
        }
        .addBook {
            display: flex;
            justify-content: flex-end;
            button {
                padding: 5px 15px;
                border-radius: 5px;
                color: $grey;
                background-color: $addBookGreen;
            }
        }
        .author {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-row-gap: 10px;
            grid-gap: 10px;
            color: $grey;
            .author-item {
                display: flex;
                .author-pic {
                    width: 6rem;
                    height: 8rem;
                }
                .content {
                    margin-left: 1rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    // align-items: center;
                }
            }
        }
        .pager {
            margin-top: 3vh;
            text-align: center;
            .el-pagination {
                display: inline-block;
            }
        }
    }
</style>
