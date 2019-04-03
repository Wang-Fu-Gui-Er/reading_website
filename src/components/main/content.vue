<template>
    <div class="main-page-content">
        <div class="main-sort">
        <header>分类</header>
        <div class="content">
            <el-button size="mini" plain v-for="item in sort" :key="item.id">
            {{item}}
            </el-button>
        </div>
    </div>
    <!-- <block></block> -->
    <div class="yellow"
        v-loading="moreLoading"
        element-loading-text="拼命加载中"
        element-loading-background="#f6f5ee">
        <div class="inner-content">
            <div class="moreable" v-for="item, typeIndex in moreable" :key="typeIndex">
            <div class="line" v-if="typeIndex > 0"></div>
            <div class="head">
                {{item.name}}
                <span class="more" v-if="item.isMore">
                    更多>
                </span>
                <span v-else>
                </span>
            </div>
            <div class="content">
                <div class="book"
                    v-for="book, bookIndex in books[typeIndex]"
                    :key="bookIndex"
                    @click="clickBook(book.id)"
                    @mouseout="isHoverBook(typeIndex, bookIndex, false)"
                    @mouseover="isHoverBook(typeIndex, bookIndex, true)">
                <div :class="{hover: book.isHover}" class="bottom">
                    <div class="cover">
                        <img :src="book.bookPic" alt="">
                    </div>
                </div>
                <div class="top" :class="{bookHover: book.isHover}">
                    <div class="score">{{book.avgScore}}</div>
                    <div class="star">
                        <img src="../../assets/img/lack_star.png" alt="">
                        <img :style="'clip:rect(auto,'+ book.avgScore * 84 / 5 +'px,auto,auto);'" src="../../assets/img/full_star.png" alt="">
                    </div>
                    <div class="isFinish">{{book.isOver ? '完结' : '连载'}}</div>
                </div>
                <div :title="book.bookName" class="book_name">
                    {{book.bookName}}
                </div>
                <div :title="book.authorName" class="author_name">
                    {{book.authorName}}
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

import {getSecSort, getBook} from '@/api/api';
import getAllCategory from './common/getAllCategory.js';

export default {
    name: 'mainPageContent',
    data() {
        return {
            sort: [],
            moreable: [{
                name: '新书推荐',
                isMore: true
            }, {
                name: '最受好评',
                isMore: false
            }, {
                name: '经典推荐',
                isMore: true
            }],
            books: [],
            moreLoading: true
        }
    },
    created() {
        this.initConfig();
        getAllCategory(); // 为优化用户体验 提前请求分类的东西
    },
    computed: {
    },
    methods: {
        ...mapMutations([
            'CHANGE_CURRENT_BOOKID'
        ]),
        isHoverBook(typeIndex, bookIndex, isHover) {
            this.$set(this.books[typeIndex][bookIndex], 'isHover', isHover);
        },
        async initConfig() {
            const sort = await getSecSort().then(res => res.map(item => item.cateName));
            const moreable = ['newly', 'favorable', 'classic'];
            const allPromises = moreable.map(item => getBook({
                recommendType: item,
                pageNum: 1,
                pageSize: 50
            }));
            const books = await Promise.all(allPromises).then(res => res.map(item => {
                let data = item.data;
                data.map(book => {
                    book.avgScore = book.avgScore.toFixed(1);
                    return book;
                });
                return data;
            }));
            this.sort = sort;
            this.books = books;
            this.moreLoading = false;
        },
        clickBook(bookId) {
            this.CHANGE_CURRENT_BOOKID(bookId);
            this.$router.push('/book');
        }
    }
}
</script>

<style lang="scss" scoped>
.main-sort {
    width: $width;
    margin: 20px auto;
    display: flex;
    flex-direction: row;
    align-items: center;

    header {
        text-align: center;
        flex-basis: 100px;
    }
    .content {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        // display: grid;
        // grid-gap: 10px;
        // grid-template-columns: repeat(auto-fit, 68px);
        // grid-row-gap: 10px;
        .el-button {
            // margin: 0px;
            margin: 5px 10px 0;
        }
    }
}

.yellow {
    width: 100%;
    min-width: 100vw;
    margin-top: 10px;
    background-color: #f6f5ee;

    .inner-content {
        width: $width;
        margin: 0 auto;

        .line {
            // wid
            height: 1px;
            background: linear-gradient(90deg, #f6f5ee 2%, #ccc 20%, #ccc 80%, #f6f5ee 98%);
        }

        .moreable {
            padding-top: 20px;
            .head {
                height: 50px;
                line-height: 50px;
                text-align: center;
                font-size: 23px;
                margin: 10px 0;
                @media screen and (max-width: 568px) {
                    font-size: 16px;
                }
                span {
                    float: right;
                    font-size: 10px;
                    width: 32px;
                    height: 50px;
                }
            }

            .content {
                // display: flex;
                // flex-wrap: wrap;
                display: grid;
                grid-gap: 40px;
                grid-template-columns: repeat(auto-fill, 125px);
                // grid-template-rows: repeat(2, 100px);
                // justify-content: space-around;
                .book {
                    // flex-basis: 125px;
                    // flex-spacing: 50px;
                    flex-direction: column;
                    display: flex;
                    text-align: center;
                    justify-content: center;
                    width: 125px;
                    margin: 0 1rem 20px;
                    cursor: pointer;
                    position: relative;
                    @media screen and (max-width: 568px) {
                        margin: 0 2px 20px;
                    }
                    .book_name,
                    .author_name {
                        font-family: Hiragino Sans GB;
                        @include single-overflow;
                    }

                    .book_name {
                        margin-top: 3px;
                        font-size: 15px;
                    }

                    .author_name {
                        font-size: 8px;
                    }

                    .bottom {
                        text-align: center;
                        // overflow: hidden;
                        .cover {
                            width: 125px;
                            height: 162px;
                            margin: 0 auto;
                            // margin-bottom: -2px;
                            text-align: center;
                            border-radius: 4px;
                            overflow: hidden;
                            // border: 1px solid red;
                            box-shadow: 0 3px 5px #b0b0b0, 2px 2px 2px 1px rgba(0, 0, 0, 0.2), -2px 3px 5px #b0b0b0;

                        }
                    }
                    @media screen and (max-width: 568px) {
                        .bottom .cover {
                            width: 80px;
                            height: 103px;
                        }
                    }
                    .hover {
                        transition: all .3s;
                        filter: blur(3px);
                    }

                    .top {
                        width: 100%;
                        position: absolute;
                        height: 80%;
                        top: 0px;
                        // margin-top: 20%;

                        >div {
                            position: absolute;
                            bottom: 0px;
                            top: 80%;
                            left: 50%;
                            transform: translateX(-50%);
                            opacity: 0;
                        }

                        .star {
                            >img {
                                position: absolute;
                                left: 50%;
                                transform: translateX(-50%);
                                max-width: initial;
                                max-height: initial;
                            }
                        }
                    }

                    .bookHover {
                        >div {
                            transition: all .6s ease-in;
                            opacity: 1;

                            &:first-of-type {
                                top: 20%;
                            }

                            &:nth-of-type(2) {
                                top: 40%;
                                transition-delay: .5s;
                            }

                            &:nth-of-type(3) {
                                top: 60%;
                                transition-delay: 1s;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
