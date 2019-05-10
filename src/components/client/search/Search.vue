<template>
    <div class="search">
        <div class="search-left">
            <div class="total">
                为你找到相关图书{{page.totalNum}}本
            </div>
            <div class="book" v-for="item in book" :key="item.id">
                <div class="avatar">
                    <img :src="item.bookPic" alt="">
                </div>
                <div class="content">
                    <div class="book-name">
                        {{item.bookName}}
                    </div>
                    <div class="author-name">
                        作者: {{item.authorName}}
                    </div>
                    <div class="book-desc">
                        介绍: {{item.bookDesc}}
                    </div>
                </div>
            </div>
            <div class="pager">
                <el-pagination
                    layout="total, prev, pager, next"
                    :total="page.totalNum"
                    @current-change="getBook"
                    >
                </el-pagination>
            </div>
        </div>
        <div class="search-right">

        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex';

import { getSearchBook } from '@/api/api';

export default {
    data() {
        return {
            book: [],
            page: {}
        }
    },
    computed: {
        ...mapState([
            'search'
        ]),
    },
    created() {
        if (this.search.searchKey) {
            this.getBook();
        }
        else {
            this.$router.push({name: 'mainPage'});
        }
    },
    methods: {
        async getBook(pageNum = 1) {
            const search = this.search;
            search['pageNum'] = pageNum;
            const {data, page} = await getSearchBook(search);
            this.book = data;
            this.page = page;
        }
    }
}
</script>

<style lang="scss" scoped>
    .search {
        width: $width;
        margin: 3vh auto 14vh;
        display: flex;
        .search-left {
            color: $grey;
            .total {
                margin-bottom: 1vh;
                font-size: 12px;
                color: $otherGrey;
            }
            .book + .book {
                margin-top: 2vh;
            }
            .book {
                display: flex;
                .avatar {
                    flex-basis: 6rem;
                    min-width: 6rem;
                    width: 6rem;
                    height: 8rem;
                    .img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .content {
                    margin-left: 2rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                }
            }
            
        }
    }
</style>
