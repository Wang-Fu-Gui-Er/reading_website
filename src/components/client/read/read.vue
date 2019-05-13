<template>
    <div class="read">
        <div class="read-content">
            <header>
                <span @click="$router.push(`book?bookId=${bookId}`)" class="read-header">
                    <font-awesome-icon icon="external-link-alt"></font-awesome-icon>
                    退出阅读
                </span>
            </header>
            <div class="main-content">
                <header>
                    <div class="title">
                        第{{curChapter.sequence}}章: {{curChapter.title}}
                    </div>
                </header>
                <div class="text" @mouseup="noteText">
                    {{content}}
                </div>
            </div>
            <div class="features">
                <div @click="changeShelfConfig(bookId, !isOnShelf)" class="shelf" :class="{'on-shelf': isOnShelf}">
                    <font-awesome-icon icon="bookmark"></font-awesome-icon>
                    {{isOnShelf ? '已' : ''}}加入书架
                </div>
                <div class="note">
                    <font-awesome-icon icon="sticky-note"></font-awesome-icon>
                    笔记
                </div>
                <!-- <div class="reading-mode">
                    <font-awesome-icon icon="book-open"></font-awesome-icon>
                    阅读模式
                </div> -->
                <div @click="changeChapter(chapterIndex - 1)" class="prev" v-if="chapterIndex > 0">
                    <font-awesome-icon icon="arrow-up"></font-awesome-icon>
                    上一章: {{chapter[chapterIndex - 1].title}}
                </div>
                <div class="" v-else>
                    没有上一章
                </div>
                <div @click="changeChapter(chapterIndex + 1)" class="next" v-if="chapterIndex < (chapter.length - 1)">
                    <font-awesome-icon icon="arrow-down"></font-awesome-icon>
                    下一章: {{chapter.length > 0 && chapter[chapterIndex + 1].title}}
                </div>
                <div class v-else>
                    没有下一章
                </div>
            </div>
        </div>
        <div class="mouse-tail">
            
        </div>
    </div>
</template>

<script>
const _ = require('lodash');

import { mapState, mapMutations } from 'vuex';

import { getStore } from '@/common/js/storage';
import getUserInfo from '@/common/js/getUserInfo';
import changeShelfConfig from '@/common/js/changeShelfConfig';
import initShelf from '@/common/js/initShelf';

import { getAllChapter, getChapterContent } from '@/api/api';

export default {
    data() {
        return {
            chapterIndex: 0,
            curChapter: {},
            bookId: null,
            content: ''
        }
    },
    created() {
        const {bookId, chapterIndex} = this.$route.query;
        this.bookId = bookId;
        this.chapterIndex = parseInt(chapterIndex, 10);
        this.initChapter();
        this.getContent();
        this.initShelf(this.userInfo, bookId);
    },
    computed: {
        ...mapState(['chapter', 'isOnShelf']),
    },
    mixins: [getUserInfo, changeShelfConfig, initShelf],
    methods: {
        ...mapMutations(['SET_CHAPTER']),
        async initChapter() {
            // FIXME: 该方案仍需调整
            let chapter = Object.assign([], this.chapter);
            if (chapter.length > 0) {
                return;
            }
            chapter = getStore('chapter');
            if (!chapter || chapter.length == 0) {
                try {
                    chapter = await getAllChapter({bookId: this.bookId});
                }
                catch(err) {
                    this.$router.push({name: 'mainPage'});
                }
            }
            if (!_.isEqual(chapter, this.chapter)) {
                this.SET_CHAPTER(chapter);
            }
        },
        async getContent(chapterIndex = this.chapterIndex) {
            const curChapter = this.chapter[chapterIndex];
            const chapterPath = curChapter.chapterPath;
            const content = await getChapterContent({chapterPath});
            this.curChapter = curChapter;
            this.content = content;
        },
        changeChapter(chapterIndex) {
            this.chapterIndex = chapterIndex;
            this.getContent();
            this.$router.push(`read?bookId=${this.bookId}&chapterIndex=${chapterIndex}`);
        },
        noteText() {
            const text = window.getSelection().toString();
            console.log(text)
        }
    }
}

</script>

<style lang="scss" scoped>
    .read {
        // min-width: 1152px;
        padding: 0 6vw;
        min-height: 100vh;
        background: #ede8d5;
        box-shadow: inset 0px 0px 8px 1px $tabGrey;
        position: relative;
        .read-content {
            display: flex;
            .read-header {
                display: inline-block;
                margin-top: 10vh;
                color: $darkGreen;
                cursor: pointer;
            }
            header, .features {
                margin-top: 5vh;
            }
            header {
                flex: 1.5;
            }
            .main-content {
                flex: 6;
                box-shadow: 0px 0px 8px 1px $tabGrey;
                padding: 15px 5rem;
                background-color: #faf7ed;
                header {
                    font-size: 14px;
                    padding-bottom: 10px;
                    border-bottom: .6px solid $grey;
                    margin-bottom: 10px;;
                }
                .text {
                    padding-bottom: 20px;
                    color: #494c49;
                    line-height: 3rem;
                    font-family: 'Noto Sans SC', sans-serif;
                }
            }
            .features {
                flex: 2;
                // margin-left: 10vw;
                font-size: 2vmin;
                text-align: center;
                > div {
                    margin: 0 20px;
                }
                .shelf, .note, .prev, .next {
                    cursor: pointer;
                }
                .shelf {
                    color: #494c49;
                    margin-top: 10vh;
                    &:hover {
                        color: $green;
                    }
                }
                .on-shelf {
                    color: $green;
                }
                .note {
                    color: #415062;
                    margin-top: 10vh;
                    margin-bottom: 3vh;
                }
                .prev, .next {
                    white-space: nowrap;
                    margin: 0 20px;
                    position: relative;
                    &::after {
                        content: '';
                        position: absolute;
                        background-color: $anotherGrey;
                        bottom: -1px;
                        left: 0px;
                        left: 10%;
                        width: 80%;
                        height: 1px;
                        margin: 0 auto;
                        transform: scale(0);
                        transition: all .8s;
                    }
                    &:hover {
                        color: $anotherGrey;
                        &::after {
                            transform: scale(1);
                        }
                    }
                }
                .prev {
                    margin-bottom: 1vh;
                }
            }
        }
        .mouse-tail {
            width: 100px;
            height: 100px;
            background-color: #333;
        }
    }
</style>
