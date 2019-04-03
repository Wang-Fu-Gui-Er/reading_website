<template>
    <div class="book-detail">
        <div class="book-detail-container">
            <div class="container-left">
                <div class="book-content">
                    <div class="left">
                        <div class="cover">
                            <img :src="book.bookPic" alt="">
                        </div>
                        <!-- <i class="fas fa-igloo"></i> -->
                        <!-- <font-awesome-icon icon="heart"></font-awesome-icon> -->
                        <div class="cover-icon">
                            <font-awesome-icon :icon="['far', 'heart']"></font-awesome-icon>
                            <span class="line">|</span>
                            <font-awesome-icon icon="download"></font-awesome-icon>
                            <span class="line">|</span>
                            <font-awesome-icon icon="share-alt"></font-awesome-icon>
                        </div>
                    </div>
                    <div class="right">
                        <div class="right-top">
                            <div class="bookName">
                                {{book.bookName}}
                                <span class="isOver" :style="book.isOver ? 'border: 1px solid #ccc;' : ''">
                                    {{book.isOver ? '完结' : '连载'}}
                                </span>
                            </div>
                            <div class="author">
                                <span class="label">作者</span>
                                {{book.authorName}}
                            </div>
                        </div>
                        <div class="right-bottom">
                            <div>加入书架</div>
                            <div>开始阅读</div>
                        </div>
                    </div>
                </div>
                <div class="book-buttom">
                    <div class="book-menu">
                        <span v-for="(item, index) in bookMenu" :class="bookMenuIndex === index ? 'is-select' : ''" :key="index">{{item}}</span>
                    </div>
                    <div class="book-introduction">
                        <header class="left-green">图书简介</header>
                        <div class="book-introduction-content">
                            {{book.bookDesc}}
                        </div>
                    </div>
                    <div class="book-chapter">
                        <header>目录(共{{book.chapNum}}章)</header>
                        <div class="book-chapter-content">
                            <div class="chapter" v-for="item in curChapter" :key="item.id">
                                <!-- 第{{chapterZero}}{{item}} -->
                            </div>
                        </div>
                        <div class="book-basic-pager">
                            <el-pagination
                                layout="total, prev, pager, next"
                                :total="chapterLength">
                            </el-pagination>
                        </div>
                    </div>
                    <div class="book-introduction">
                        <header>图书简介</header>
                        <div class="book-introduction-content">
                            {{book.bookDesc}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-right">
                <div></div>
                &nbsp;
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';

import { getBookDetail, getAllChapter } from '@/api/api';
import getZero from '@/common/js/getZero';

export default {
    data() {
        return {
            book: {},
            bookMenu: ['简介', '目录', '评论'],
            bookMenuIndex: 0,
            chapterZero: '',
            allChapter: [],
            curChapter: [],
            chapterLength: 0
        }
    },
    computed: {
        ...mapState([
            'curBookId'
        ])
    },
    created() {
        this.initConfig();
    },
    methods: {
        async initConfig() {
            const bookDetail = await getBookDetail({bookId: this.curBookId});
            const allChapter = await getAllChapter({bookId: this.curBookId});
            const chapterLength = allChapter.length;
            // console.log(chapterLength)
            const curChapter = chapterLength > 10 ? allChapter.map((item, index) => index < 10) : allChapter;
            const chapterZero = getZero(chapterLength);
            this.book = bookDetail;
            this.allChapter = allChapter;
            this.curChapter = curChapter;
            this.chapterZero = chapterZero;
            this.chapterLength = chapterLength;
        }
    }
}
</script>

<style lang="scss" scoped>
    .book-detail {
        background: #FFFFFA;
        .book-detail-container {
            width: $width;
            margin: 0 auto;
            padding-top: 40px;
            display: flex;
            .container-left {
                flex: 3;
                padding: 0 30px;
                .book-content {
                    display: flex;
                    .left {
                        flex: 1;
                        .cover {
                            width: 200px;
                            height: 269px;
                            border-radius: 4px;
                            box-shadow: 0px 0px 6px 1px $grey;
                        }
                        .cover-icon {
                            width: 180px;
                            margin: 10px auto 0px;
                            display: flex;
                            justify-content: space-evenly;
                            align-items: center;
                            color: $otherGrey;
                            > svg {
                                cursor: pointer;
                                &:hover {
                                    color: $green;
                                }
                            }
                            .line {
                                
                            }
                        }
                    }
                    .right {
                        flex: 4;
                        margin-left: 30px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-evenly;
                        .right-top {
                            .bookName {
                                font-size: 20px;
                                font-weight: 300;
                                .isOver {
                                    text-align: center;
                                    padding: 2px;
                                    font-size: 13px;
                                    font-weight: 400;
                                    border-radius: 3px;
                                }
                            }
                            .author {
                                margin-top: 8px;
                                font-size: 10px;
                                .label {
                                    color: $grey;
                                    width: 48px;
                                    letter-spacing: 10px;
                                    position: relative;
                                    &::after {
                                        content: ':';
                                        position: absolute;
                                        right: -5px;
                                        top: 50%;
                                        transform: translateY(-50%);
                                    }
                                }
                            }
                        }
                        .right-bottom {
                            display: flex;
                            // justify-content: space-evenly;
                            div {
                                display: inline-block;
                                width: 120px;
                                height: 42px;
                                line-height: 42px;
                                border-radius: 5px;
                                text-align: center;
                                cursor: pointer;
                                &:nth-of-type(1) {
                                    color: $fontColor;
                                    border: 1px solid $fontColor;
                                    &:hover {
                                        color: $hoverGreen;
                                        border-color: $hoverGreen;
                                    }
                                }
                                &:nth-of-type(2) {
                                    color: white;
                                    background-color: $green;
                                    border: 1px solid $green;
                                    margin-left: 30px;
                                    &:hover {
                                        background-color: $hoverGreen;
                                        border-color: $hoverGreen;
                                    }
                                }
                            }
                        }
                    }
                }
                .book-buttom {
                    width: 100%;
                    padding: 10px 5px 5px;
                    border-top: 1px solid $littleGrey;
                    margin-top: 10px;
                    .book-menu {
                        border-bottom: 1px solid $fontTopGrey;
                        span {
                            display: inline-block;
                            width: 95px;
                            height: 35px;
                            line-height: 35px;
                            text-align: center;
                        }
                        .is-select {
                            border-bottom: 2px solid $green;
                            z-index: 2;
                        }
                    }
                    .left-green {
                        border-left: 3px solid $green;
                    }
                    > div:not(:first-of-type) {
                        padding-top: 30px;
                        header {
                            padding: 2px 0 5px 5px;
                            height: 22px;
                            line-height: 22px;
                            // margin-bottom: 3px;
                            // padding-left: 5px;
                        }
                        .book-introduction-content {
                            text-indent: 2em;
                        }
                    }
                    .book-chapter {
                        header {
                            border-bottom: 1px solid $littleGrey;
                        }
                        .book-chapter-content {
                            .chapter {
                                // overflow: hidden;
                                // white-space: nowrap;
                                width: 40em;
                                @include single-overflow;
                            }
                        }
                    }
                }
            }
            .container-right {
                flex: 1;
            }
        }
    }
</style>
