<template>
    <div class="book-list">
        <div class="sort-book">
            <div class="book"
                :style="item.isHover ? 'background: #f5f5f2' : ''"
                v-for="(item, index) in book" :key="item.id"
                @click="$router.push(`book?bookId=${item.id}`)">
                <div class="book-img"
                    @mouseover="hoverBook($event, index)"
                    @mouseout="leaveBook(index)">
                    <img :src="item.bookPic" alt="">
                </div>
                <div class="book-name">
                    {{item.bookName}}
                </div>
                <div class="author-name">
                    {{item.authorName}}
                </div>
                <div class="tool-tip" :class="{left: item.isEnd, show: item.isHover, 'not-show': !item.isHover}">
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
        <div class="pager">
            <el-pagination
                layout="total, prev, pager, next"
                :total="page.totalNum"
                @current-change="$emit('get-book')"
                >
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    props: ['book', 'page'],
    methods: {
        hoverBook(e, index) {
            const viewWidth = window.innerWidth || document.documentElement.clientWidth;
            const isEnd = viewWidth - e.x < 11 * 16 * 2 - 20;
            this.$set(this.book[index], 'isEnd', isEnd);
            this.$set(this.book[index], 'isHover', true);
        },
        leaveBook(index) {
            this.$set(this.book[index], 'isHover', false);
        },
    }
}
</script>

<style lang="scss" scoped>
    .book-list {
        margin-top: 2vh;
        .sort-book {
            display: grid;
            grid-template-columns: repeat(auto-fill, 11rem);
            grid-auto-columns: dense;
            grid-row-gap: 60px;
            grid-column-gap: 80px;
            .book {
                cursor: pointer;
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
                    display: none;
                    transition: all 1s;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-around;
                    width: 8rem;
                    height: 13rem;
                    z-index: 2;
                    position: absolute;
                    left: calc(11rem + 13px);
                    top: 50%;
                    transform: translateY(-50%);
                    border-radius: 3px;
                    background-color: #fefef4;
                    border: .3px solid $grey;
                    padding: 8px 15px;
                    &::before {
                        content: '';
                        width: 0px;
                        height: 0;
                        position: absolute;
                        top: 50%;
                        left: -12.3px;
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
                        border-right: 13px solid #fefef4;
                    }
                    > div {
                        // padding-top: 10px;
                    }
                    .score, .over {
                        text-align: center;
                    }
                    .description {
                        @include muti-overflow(5);
                    }
                }
                .not-show {
                    display: none;
                    opacity: 0;
                    transition: all 1s;
                }
                @keyframes display {
                    to {
                        opacity: 1;
                    }
                }
                .show {
                    animation: display .7s linear forwards;
                    display: flex;
                    // opacity: 1;
                    transition: all 1s;
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
</style>
