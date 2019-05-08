<template>
    <div @wheel="mouseScroll" class="book-detail">
        <div class="book-detail-container">
            <div class="container-left">
                <div class="book-content">
                    <div class="left">
                        <div class="cover">
                            <img :src="book.bookPic" alt="">
                        </div>
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
                            <div @click="changeShelfConfig(book.id, false)" v-if="isOnShelf">已加入书架</div>
                            <div @click="changeShelfConfig(book.id, true)" v-else>
                                加入书架
                            </div>
                            <div @click="$router.push(`/read?bookId=${curBookId}&chapterIndex=0`)">开始阅读</div>
                        </div>
                    </div>
                </div>
                <div class="book-buttom" ref="bottom">
                    <div class="book-menu" :class="{fixed: isFixed}">
                        <!-- TODO: 找出bug的原因 -->
                        <!-- <a v-for="(item, index) in bookMenu" :key="index" @click="bookMenuIndex = index" :class="bookMenuIndex === index ? 'is-select' : ''" :href="`book/#${index}?bookId=${$route.query.bookId}`">{{item}}</a> -->
                        <a v-for="(item, index) in bookMenu" :key="index" @click="bookMenuIndex = index" :class="bookMenuIndex === index ? 'is-select' : ''" :href="`#${index}`">{{item}}</a>
                    </div>
                    <div id="1" ref="intro" class="book-introduction">
                        <header class="left-green">图书简介</header>
                        <div class="book-introduction-content">
                            {{book.bookDesc}}
                        </div>
                    </div>
                    <div id="2" ref="chapter" class="book-chapter">
                        <header>目录(共{{book.chapNum}}章)</header>
                        <div class="book-chapter-content">
                            <div class="chapter left-green" v-for="(item, index) in curChapter" :key="item.id">
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
                    <div id="3" ref="command" class="book-score">
                        <header>图书评论</header>
                        <div class="book-score-content">
                            <div class="left">
                                <div>综合评分</div>
                                <div>{{bookGrade.avgScore}}</div>
                            </div>
                            <div class="right">
                                <div class="grade" v-for="(item, index) of bookGrade.gradeArr" :key="item.id">
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
                            <div class="header">
                                <div class="total">共有{{command.page.totalNum}}条评论</div>
                                <div class="sort" @click="changeCommandSort">
                                    <button :class="commandSort === 'sort' ? 'select' : ''" data-sort="time">最新排序</button>
                                    <button :class="commandSort === 'hot' ? 'select' : ''" data-sort="hot">最热排序</button>
                                </div>
                            </div>
                            <user-command :bookName="book.bookName" :bookId="book.id"></user-command>
                            <div class="user" v-for="item in command.data" :key="item.id">
                                <div class="avatar">
                                    <img :src="item.headPicPath" alt="">
                                </div>
                                <div class="middle">
                                    <div class="nick">
                                        <span>{{item.nickName}}</span>
                                        <span class="date">
                                            {{item.updated}}
                                        </span>
                                    </div>
                                    <div class="user-command">
                                        {{item.comment}}
                                    </div>
                                </div>
                                <div class="like">
                                    <div class="like-container">
                                        <font-awesome-icon class="nice" icon="thumbs-up"></font-awesome-icon>
                                        <span class="like-num">
                                            {{item.likeNum}}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="pager">
                                <el-pagination
                                    layout="total, prev, pager, next"
                                    :total="command.page.totalNum"
                                    @current-change="mapCommand(commandSort, $event)"
                                    >
                                </el-pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-right">
                <div class="score">
                    <div class="avgScore">
                        综合分数: {{book.avgScore ? book.avgScore.toFixed(1) : 0}}
                    </div>
                    <div class="smallCate">
                        分类: {{book.smallCateName}}
                    </div>
                </div>
                <div class="author">
                    <div class="avatar">
                        <img :src="authorInfo.authorPic" alt="">
                    </div>
                    <div class="name">
                        {{authorInfo.authorName}}
                    </div>
                    <div class="weibo">
                        微博: {{authorInfo.weiboName}}
                    </div>
                    <div class="desc">
                        简介: {{authorInfo.authorDesc}}
                    </div>
                    <div class="masterpiece">
                        代表作: {{authorInfo.represenWorks}}
                    </div>
                </div>
                <div class="recommand">
                    <div class="title">
                        相似推荐
                    </div>
                    <div class="recommand-item" v-for="item in recommand" @click="clickBook(item.id)"  :key="item.id">
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

import { getBookDetail, getAllChapter, getBookGrade, getBookCommand, getAuthorInfo, getBookRecommnad, checkOnShelf } from '@/api/api';
import getZero from '@/common/js/getZero';
import getUserInfo from '@/common/js/getUserInfo';
import changeShelfConfig from '@/common/js/changeShelfConfig';
import initShelf from '@/common/js/initShelf';

import star from '@/common/vue/star';
import userCommand from './userCommand';

import { setStore } from '@/common/js/storage';

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
            },
            commandSort: 'time',
            command: {
                data: [],
                page: {
                    totalNum: 0
                }
            },
            recommand: [],
            authorInfo: {
            },
            curBookId: 0,
            isFixed: false,
        }
    },
    components: {
        star,
        userCommand
    },
    inject: ['reload'],
    mixins: [getUserInfo, changeShelfConfig, initShelf],
    created() {
        this.curBookId = this.$route.query.bookId;
        this.initConfig();
    },
    computed: {
        ...mapState(['isOnShelf'])
    },
    methods: {
        ...mapMutations(['SET_CHAPTER']),
        ...mapActions(['getShelfStatus']),
        async initConfig() {
            const bookId = this.curBookId
            const [bookDetail, allChapter, bookGrade] = await Promise.all([
                getBookDetail({bookId}),
                getAllChapter({bookId}),
                getBookGrade({bookId})
            ]);
            const chapterLength = allChapter.length;
            const authorId = bookDetail.authorId;
            const authorInfo = await getAuthorInfo({authorId});
            const recommand = await getBookRecommnad({smallCateId: bookDetail.smallCateId});
            this.book = bookDetail;
            this.allChapter = allChapter;
            this.chapterLength = chapterLength;
            this.authorInfo = authorInfo;
            this.recommand = recommand;

            this.getCurChapter();
            this.mapCommand();
            this.mapBookGrade(bookGrade);
            this.initShelf(this.userInfo, bookId);

            this.SET_CHAPTER(allChapter);
            setStore('chapter', allChapter);
        },
        getCurChapter(curPage = 1, chapterLength = this.chapterLength, allChapter = this.allChapter) {
            const curChapter = allChapter.filter((item, index) => index >= (curPage - 1) * 10 && index < curPage * 10);
            const chapterZero = getZero(chapterLength, curChapter[0]);
            this.curChapter = curChapter;
            this.chapterZero = chapterZero;
        },
        mapBookGrade(bookGrade) {
            const mapBookGrade = {
                avgScore: bookGrade.avgScore.toFixed(1),
                gradeArr: Array.of(bookGrade.oneNum, bookGrade.twoNum, bookGrade.threeNum, bookGrade.fourNum, bookGrade.fiveNum)
            };
            this.bookGrade = mapBookGrade;
        },
        async mapCommand(sort = 'time', pageNum = 1, pageSize = 10) {
            const command = await getBookCommand({
                bookId: this.curBookId,
                sort, pageNum, pageSize
            });
            this.command = command;
        },
        changeCommandSort(e) {
            const event = e.target || e.srcElement;
            const sort = event.dataset.sort;
            const isSelectTime = this.isSelectTime;
            if (sort === this.commandSort) {
                return;
            }
            this.mapCommand(sort);
            this.commandSort = sort;
        },
        mouseScroll() {
            if (this.$refs.chapter.getBoundingClientRect().top < 0) {
                if (this.$refs.command.getBoundingClientRect().top < 0) {
                    this.bookMenuIndex = 2
                }
                else {
                    this.bookMenuIndex = 1;
                }
            }
            else {
                this.bookMenuIndex = 0
            }

            // 这是为了修复未知原因导致的position: sticky失效问题
            this.isFixed = this.$refs.bottom.getBoundingClientRect().top < 0 ? true : false;
        },
        clickBook(id) {
            this.$router.push(`book?bookId=${id}`);
            this.reload();
        }
    }
}
</script>

<style lang="scss">
    .book-detail {
        margin-bottom: 10vh;
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
                                cursor: not-allowed;
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
                        position: sticky;
                        top: 0px;
                        transition: all 1s;
                        z-index: 3;
                        border-bottom: 1px solid $fontTopGrey;
                        a {
                            display: inline-block;
                            width: 95px;
                            height: 35px;
                            line-height: 35px;
                            text-align: center;
                            text-decoration: none;
                        }
                        .is-select {
                            border-bottom: 2px solid $green;
                            z-index: 2;
                        }
                    }
                    .fixed {
                        opacity: 1;
                        background-color: #fff;
                        // margin-right: 40px;
                        width: 90%;
                        position: fixed;
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
                            button, li {
                                background-color: #FFFFFA;
                            }
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
                                        img {
                                            width: 87px;
                                            height: 19px;
                                        }
                                    }
                                    > span {
                                        display: inline-block;
                                        
                                        white-space: nowrap;
                                        &:last-of-type {
                                            flex: 1;
                                        }
                                    }
                                }
                            }
                        }
                        .command {
                            margin-top: 3vh;
                            border-top: 1px solid $littleGrey;
                            padding-top: 3vh;
                            .header {
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                .sort {
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
                                    .select {
                                        background-color: $butonBg;
                                    }
                                }
                            }
                            .user {
                                display: flex;
                                padding: 5vh 0;
                                + .user {
                                    border-top: 1px solid $littleGrey;
                                }
                                .avatar {
                                    flex: 1;
                                    display: flex;
                                    align-items: center;
                                    img {
                                        width: 45px;
                                        height: 45px;
                                        border-radius: 50%;
                                        overflow: hidden;
                                    }
                                }
                                .middle {
                                    flex: 5;
                                    .nick {
                                        font-size: 12px;
                                    }
                                    .date {
                                        color: $greyHover;
                                    }
                                    .user-command {
                                        margin-top: 1vh;
                                        font-size: 14px;
                                    }
                                }
                                .like {
                                    font-size: 14px;
                                    flex: 1;
                                    display: flex;
                                    flex-direction: column;
                                    justify-content: flex-end;
                                    .like-container {
                                        display: flex;
                                        // margin-left: 15px;
                                        justify-content: flex-end;
                                        .nice {
                                            cursor: pointer;
                                            &:hover {
                                                color: $green;
                                            }
                                        }
                                        .like-num {
                                            padding-left: 3px;
                                        }
                                    }
                                }
                            }
                            .pager {
                                margin: 2vh 0 3vh;
                                display: flex;
                                justify-content: center;
                                button, li {
                                    background-color: #FFFFFA;
                                }
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
                    }
                }
            }
            .container-right {
                flex: 1;
                color: $grey;
                > div {
                    border: .7px solid rgba(102, 102, 102, .6);
                    padding: 10px 20px;
                    border-radius: 5px;
                }
                > div + div {
                    margin-top: 1rem;
                }
                .author {
                    padding: 1.5rem 20px 1rem;
                    div + div {
                        margin-top: 1vmin;
                    }
                    .avatar, .name, .weibo {
                        text-align: center;
                    }
                    .avatar {
                        width: 5rem;
                        height: 5rem;
                        margin: 0 auto;
                        img {
                            border-radius: 50%;
                        }
                    }
                }
                .recommand {
                    padding: 10px 20px 25px;
                    > div + div {
                        margin-top: 2vh;
                    }
                    .title {
                        font-size: 18px;
                    }
                    .recommand-item {
                        cursor: pointer;
                        display: flex;
                        .book-pic {
                            width: 5rem;
                            height: 4rem;
                            min-width: 5rem;
                        }
                        .content {
                            display: flex;
                            flex-direction: column;
                            justify-content: space-around;
                            margin-left: .7rem;
                        }
                    }
                }
            }
        }
    }
</style>
