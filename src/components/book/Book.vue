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
                            <div class="chapter left-green" v-for="item, index in curChapter" :key="item.id">
                                第{{index === (curChapter - 1) ? chapterZero : chapterZero.slice(0, -1)}}{{item.sequence}}章: {{item.title}}
                            </div>
                        </div>
                        <div class="book-basic-pager">
                            <el-pagination
                                layout="total, prev, pager, next"
                                :total="chapterLength"
                                @current-change="getCurChapter"
                                >
                            </el-pagination>
                        </div>
                    </div>
                    <div class="book-score">
                        <header>图书评论</header>
                        <div class="book-score-content">
                            <div class="left">
                                <div>综合评分</div>
                                <div>{{bookGrade.avgScore}}</div>
                            </div>
                            <div class="right">
                                <div class="grade" v-for="item, index of bookGrade.gradeArr" :key="item.id">
                                    <span class="star-num">
                                        {{5 - index}}星
                                    </span>
                                    <star :score="Number(index)"></star>
                                    <span class="star-people">
                                        {{item}} 人
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="command">

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

import { getBookDetail, getAllChapter, getBookGrade, getBookCommand } from '@/api/api';
import getZero from '@/common/js/getZero';

import star from '@/common/vue/star';

export default {
    data() {
        return {
            book: {},
            bookMenu: ['简介', '目录', '评论'],
            bookMenuIndex: 0,
            chapterZero: '',
            allChapter: [],
            curChapter: [],
            chapterLength: 0,
            people: [],
            bookGrade: {
                avgScore: 0,
                gradeArr: []
            }
        }
    },
    components: {
        star
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
            const bookGrade = await getBookGrade({bookId: this.curBookId});
            const chapterLength = allChapter.length;
            this.book = bookDetail;
            this.allChapter = allChapter;
            this.chapterLength = chapterLength;
            this.getCurChapter();
            this.mapBookGrade(bookGrade)
        },
        getCurChapter(curPage = 1, chapterLength = this.chapterLength, allChapter = this.allChapter) {
            const curChapter = allChapter.filter((item, index) => index >= (curPage - 1) * 10 && index < curPage * 10);
            const chapterZero = getZero(chapterLength, curChapter[0]);
            this.curChapter = curChapter;
            this.chapterZero = chapterZero;
        },
        mapBookGrade(bookGrade) {
            let mapBookGrade = {};
            mapBookGrade.avgScore = bookGrade.avgScore.toFixed(1);
            mapBookGrade.gradeArr = Array.of(bookGrade.oneNum, bookGrade.twoNum, bookGrade.threeNum, bookGrade.fourNum, bookGrade.fiveNum);
            this.bookGrade = mapBookGrade;
        }
    }
}
</script>

<style lang="scss">
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
                color: $grey;
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
                        position: relative;
                        padding-left: 5px;
                        &::after {
                            content: '';
                            border-radius: 1px;
                            width: 4px;
                            height: 17px;
                            background-color: $green;
                            position: absolute;
                            left: -3px;
                            top: 50%;
                            transform: translateY(-50%);
                        }
                    }
                    > div:not(:first-of-type) {
                        padding-top: 30px;
                        header {
                            margin-bottom: 5px;
                        }
                        .book-introduction-content {
                            text-indent: 2em;
                        }
                    }
                    .book-chapter {
                        header {
                            padding: 5px 0;
                            border-bottom: 1px solid $littleGrey;
                        }
                        .book-chapter-content {
                            .chapter {
                                width: 40em;
                                padding: 5px 0 5px 3px;
                                color: $darkGreen;
                                cursor: pointer;
                                &:hover {
                                    color: $darkHoverGreen;
                                }
                            }
                        }
                        .book-basic-pager {
                            display: flex;
                            justify-content: flex-end;
                            .el-pagination button:hover {
                                color: $green;
                            }
                            .el-pager {
                                li:hover{
                                    color: $green;
                                }
                                .active {
                                    color: $green;
                                }
                            }
                        }
                    }
                    .book-score {
                        .book-score-content {
                            display: flex;
                            justify-content: space-between;
                            font-size: 14px;
                            > div{
                                flex: 1;
                            }
                            .left {
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                justify-content: center;
                                > div {
                                    margin: 5px 0;
                                }
                            }
                            .right {
                                .grade {
                                    width: 70%;
                                    display: flex;
                                    div {
                                        display: inline-block;
                                        flex: 1;
                                    }
                                    > span {
                                        white-space: nowrap;
                                        &:last-of-type {
                                            flex: 1;
                                        }
                                    }
                                    .star-img {
                                        position: relative;
                                        >img {
                                            position: absolute;
                                            left: 50%;
                                            transform: translateX(-50%);
                                            max-width: initial;
                                            max-height: initial;
                                        }
                                    }
                                }
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
