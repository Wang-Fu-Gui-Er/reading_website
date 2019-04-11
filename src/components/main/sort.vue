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
                    <div class="book"
                        @mouseover="hoverBook($event, index)"
                        @mouseout="leaveBook(index)"
                        :style="item.isHover ? 'background: #f5f5f2' : ''"
                        v-for="item, index in book" :key="item.id">
                        <div class="book-img">
                            <img :src="item.bookPic" alt="">
                        </div>
                        <div class="book-name">
                            {{item.bookName}}
                        </div>
                        <div class="author-name">
                            {{item.authorName}}
                        </div>
                        <div class="tool-tip" :class="{left: item.isEnd, show: item.isHover}">
                            <div class="score">评分: {{item.avgScore}}</div>
                            <div class="over">
                                {{item.isOver ? '已完结' : '连载中'}}
                            </div>
                            <div class="description">
                                简介: {{item.bookDesc}}
                            </div>
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
        },
        hoverBook(e, index) {
            const viewWidth = window.innerWidth || document.documentElement.clientWidth;
            const isEnd = viewWidth - e.x < 11 * 16 * 2 - 20;
            this.$set(this.book[index], 'isEnd', isEnd);
            this.$set(this.book[index], 'isHover', true);
        },
        leaveBook(index) {
            this.$set(this.book[index], 'isHover', false);
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
        padding-top: 3rem;
        padding-bottom: 3rem;
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
                    z-index: 5;
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
                            z-index: 5;
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
                    grid-template-columns: repeat(auto-fill, 11rem);
                    grid-auto-columns: dense;
                    grid-row-gap: 60px;
                    grid-column-gap: 80px;
                    .book {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        font-weight: 400;
                        position: relative;
                        padding: 10px;
                        .book-img {
                            width: 8.4rem;
                            height: 11rem;
                        }
                        .book-name, .author-name {
                            padding-top: 8px;
                        }
                        .book-name {
                            font-size: 15px;
                            font-weight: 500;
                        }
                        .author-name {
                            font-size: 12px;
                        }
                        .tool-tip {
                            opacity: 0;
                            // visibility: visible;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            width: 8rem;
                            height: 13rem;
                            z-index: 2;
                            position: absolute;
                            left: calc(11rem + 13px);
                            top: 50%;
                            transform: translateY(-50%);
                            border-radius: 3px;
                            background-color: #fdfcfc;
                            border: 1px solid $grey;
                            padding: 0 15px;
                            &::before {
                                content: '';
                                width: 0px;
                                height: 0;
                                position: absolute;
                                top: 50%;
                                left: -13px;
                                transform: translateY(-50%);
                                border-top: 13px solid transparent;
                                border-bottom: 13px solid transparent;
                                border-right: 13px solid #000;
                            }
                            &::after {
                                content: '';
                                width: 0px;
                                height: 0;
                                position: absolute;
                                top: 50%;
                                left: -12px;
                                transform: translateY(-50%);
                                border-top: 13px solid transparent;
                                border-bottom: 13px solid transparent;
                                border-right: 13px solid #fdfcfc;
                            }
                            > div {
                                padding-top: 10px;
                            }
                            .score, .over {
                                text-align: center;
                            }
                            .description {
                                @include muti-overflow(5);
                            }
                        }
                        .show {
                            opacity: 1;
                            transition: all 1s;
                            // visibility: visible;
                        }
                        .left {
                            left: initial;
                            right: calc(11rem + 13px);
                            &::before {
                                content: '';
                                width: 0px;
                                height: 0;
                                position: absolute;
                                top: 50%;
                                left: initial;
                                right: -13px;
                                transform: translateY(-50%);
                                border-top: 13px solid transparent;
                                border-bottom: 13px solid transparent;
                                border-right: initial;
                                border-left: 13px solid #000;
                            }
                            &::after {
                                content: '';
                                width: 0px;
                                height: 0;
                                position: absolute;
                                top: 50%;
                                left: initial;
                                right: -12px;
                                transform: translateY(-50%);
                                border-top: 13px solid transparent;
                                border-bottom: 13px solid transparent;
                                border-right: initial;
                                border-left: 13px solid #fdfcfc;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
