<template>
    <div class="book-manage">
        <div class="search">
            <el-input
                size="small"
                placeholder="请输入搜索内容"
                v-model="search.searchKey"
                @blur="searchBook(search)">
                <el-button slot="append" @click="searchBook(search)" icon="el-icon-search"></el-button>
            </el-input>
        </div>
        <div class="total">
            共为你检索到{{page.totalNum}}条结果
        </div>
        <div class="addBook">
            <button @click="editBook('add')">添加新书</button>
        </div>
        <div class="book">
            <div class="book-item" v-for="item in book" :key="item.id">
                <div class="book-pic">
                    <img :src="item.bookPic" alt="">
                </div>
                <div class="content">
                    <div class="book-name">
                        {{item.bookName}}
                    </div>
                    <div class="author-name">
                        {{item.authorName}}
                    </div>
                    <div class="alter">
                        <button @click="editBook('edit', item.id)">修改图书</button>
                        <button @click="editChapter(item.id)">修改章节</button>
                        <button @click="deleteBook(item.id)">删除图书</button>
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

import { getAllBooks, getSearchBook, delBook } from '@/api/api';
import { mapMutations } from 'vuex';

export default {
    data() {
        return {
            book: [],
            search: {
                pageNum: 1,
                pageSize: 10,
                searchType: 'book',
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
        ...mapMutations(['CHANGE_EDIT_BOOK_STATUS', 'CHANGE_EDIT_BOOK_ID']),
        async searchBook(pageNum) {
            const search = this.search;
            if (typeof pageNum === 'number') {
                search.pageNum = pageNum;
            }
            const {data, page} = search.searchkey ? await getAllBooks(search) : await getSearchBook(search);
            this.book = data;
            this.page = page;
        },
        editBook(status, bookId) {
            if (status === 'edit') {
                this.CHANGE_EDIT_BOOK_ID(bookId);
            }
            this.CHANGE_EDIT_BOOK_STATUS(status);
            this.$router.push('editBook');
        },
        editChapter(bookId) {
            this.CHANGE_EDIT_BOOK_ID(bookId);
            this.$router.push('editChapter');
        },
        deleteBook(id) {
            delBook({id});
            this.reload();
        }
    }
}
</script>

<style lang="scss" scoped>
    .book-manage {
        .addBook, .book {
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
        .book {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-row-gap: 10px;
            grid-gap: 10px;
            color: $grey;
            .book-item {
                display: flex;
                .book-pic {
                    width: 8rem;
                    height: 8rem;
                }
                .content {
                    margin-left: 1rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    // align-items: center;
                    .alter {
                        button + button {
                            margin-right: 2px;
                            margin-top: 2px;
                        }
                    }
                }
            }
        }
    }
</style>
