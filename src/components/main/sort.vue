<template>
    <div class="sort">
        <div class="sort-content">
            <div class="sort-left">
                <div class="menu">
                    <header>全部图书分类</header>
                    <ul class="menu-content">
                        <li
                            v-for="item, index in allCategory"
                            :key="index"
                            @mouseleave="toggleTab(index, false)"
                            @mouseenter="toggleTab(index, true)"
                            @click="toBook">
                            {{item.bigCategoryDO.cateName}}
                            <div class="secSort" v-if="item.isShow">
                                <span v-for="secItem in item.smallCategoryList" :key="secItem.id">
                                    {{secItem.cateName}}
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="sort-right">
                <div class="sort-book">
                    <div class="book" v-for="item in book">
                        <div class="book-img">
                            <img :src="item.bookPic" alt="">
                        </div>
                        <div class="book-name">
                            {{item.bookName}}
                        </div>
                        <div class="author-name">
                            {{item.authorName}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState, mapActions, mapMutations} from 'vuex';

import {getAllBooks} from '@/api/api.js';
import getAllCategory from './common/getAllCategory';
import {getStore} from '@/common/js/storage'

export default {
    data() {
        return {
            allCategory: [],
            isShowSecSort: false,
            book: []
        }
    },
    created() {
        this.initConfig();
    },
    methods: {
        toggleTab(index, isShow) {
            this.$set(this.allCategory[index], 'isShow', isShow);
        },
        toBook(e) {
            e.stopPropagation();
        },
        async initConfig() {
            if (!getStore('allCategory')) {
                await getAllCategory();
            }
            const allCategory = getStore('allCategory');
            let {data, page} = await getAllBooks({pageNum: 1, pageSize: 10});
            data.map(item => item.avgScore = item.avgScore.toFixed(1));
            this.book = data;
            this.allCategory = allCategory;
        }
    }
}
</script>
<style lang="scss" scoped>
    ul > li {
        list-style: none;
    }
    .sort {
        background-color: #fdfdfb;
        padding-top: 20px;
        .sort-content {
            width: $width;
            margin: 0 auto;
            display: flex;
            .menu {
                width: $menuWidth;
                background-color: rgb(245, 244, 242);
                header {
                    text-align: center;
                    height: 40px;
                    line-height: 40px;
                    background-color: #676a6d;
                    color: #fff;
                }
                .menu-content {
                    padding-left: 0px;
                    margin: 0px;
                    li {
                        font-size: 15px;
                        padding: 10px 0 10px 20px;
                        position: relative;
                        &::after {
                            content: '>';
                            position: absolute;
                            right: 7px;
                            top: 8px;
                            color: #ccc;
                        }
                        &:hover {
                            background-color: #f2f2f2;
                        }
                        .secSort {
                            position: absolute;
                            padding: 5px;
                            width: 320px;
                            top: 0px;
                            left: $menuWidth;
                            display: flex;
                            flex-wrap: wrap;
                            background-color: #f2f2f2;
                            border: .8px solid #ccc;
                            span {
                                height: 30px;
                                padding: 0 10px;
                                line-height: 30px;
                                cursor: pointer;
                                &:hover {
                                    text-decoration: underline;
                                }
                            }
                        }
                    }
                }
            }
            .sort-right {
                flex-grow: 1;
                margin-left: 2rem;
                .sort-book {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, 10rem);
                    grid-template-rows: repeat(auto-fill, 10rem);
                    .book {
                        .book-img {
                            width: 5rem;
                            height: 3rem;
                        }
                    }
                }
            }
        }
    }
</style>
