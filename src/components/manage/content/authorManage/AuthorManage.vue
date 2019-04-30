<template>
    <div class="author-manage">
        <div class="search">
            <el-input
                size="small"
                placeholder="请输入搜索内容"
                v-model="authorName"
                @blur="searchAuthor(authorName)">
                <el-button slot="append" @click="searchAuthor(authorName)" icon="el-icon-search"></el-button>
            </el-input>
        </div>
        <div class="addBook">
            <button @click="edit('add')">添加作者</button>
        </div>
        <div class="author">
            <div class="author-item" v-for="item in author" :key="item.id">
                <div class="author-pic">
                    <img :src="item.authorPic" alt="">
                </div>
                <div class="content">
                    <div class="author-name">
                        {{item.authorName}}
                    </div>
                    <div class="alter">
                        <button @click="edit('edit', item.id)">修改</button>
                        <button @click="delAuthor(item.id)">删除</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { searchAuthor, delAuthor } from '@/api/api';
import { mapMutations } from 'vuex';

export default {
    data() {
        return {
            author: [],
            authorName: ''
        }
    },
    created() {
        this.searchAuthor();
    },
    inject:  ['reload'],
    methods: {
        ...mapMutations(['CHANGE_EDIT_AUTHOR_STATUS', 'CHANGE_EDIT_AUTHOR_ID']),
        async searchAuthor(authorName = this.authorName) {
            const author = await searchAuthor({authorName});
            this.author = author;
        },
        edit(status, authorId) {
            if (status === 'edit') {
                this.CHANGE_EDIT_AUTHOR_ID(authorId);
            }
            this.CHANGE_EDIT_AUTHOR_STATUS(status);
            this.$router.push({name: 'editAuthor'});
        },
        delete(authorId) {
            delAuthor({authorId});
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
            margin-top: 2vh;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-row-gap: 10px;
            grid-gap: 30px;
            color: $grey;
            .author-item {
                display: flex;
                .author-pic {
                    width: 3rem;
                    height: 3rem;
                    img {
                        border-radius: 50%;
                    }
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
    }
</style>
