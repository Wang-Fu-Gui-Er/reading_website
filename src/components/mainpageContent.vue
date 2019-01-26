<template>
    <div class="main-page-content">
        <div class="sort">
        <header>分类</header>
        <div class="content">
        <el-button size="mini" plain v-for="item in sort" :key="item.id">
        {{item}}
        </el-button>
    </div>
    </div>
    <!-- <block></block> -->
    <div class="yellow">
        <div class="inner-content">
            <div class="line"></div>
            <div class="moreable" v-for="item,typeIndex in moreable" :key="item.id">
            <div class="head">
                {{item.name}}
                <span class="more" v-if="item.isMore">更多></span>
            </div>
            <div class="content">
                <div v-for="book,bookIndex in books[item['nick']]" :key="item.id" v-on:mouseout="leaveBook(typeIndex, bookIndex)" v-on:mouseover="hoverBook(typeIndex, bookIndex)" class="book">
                <div :class="{hover: book.isHover}" class="bottom">
                    <div class="cover">
                    <img src="../assets/img/book_cover.jpeg" alt="">
                    </div>
                </div>
                <!-- <div v-if="book.isHover" class="top"> -->
                <div class="top" :class="{bookHover: book.isHover}">
                    <div class="score">{{book.score}}</div>
                    <div class="star">
                    <img src="../assets/img/lack_star.png" alt="">
                    <img :style="'clip:rect(auto,'+ book.score * 84 / 5 +'px,auto,auto);'" src="../assets/img/full_star.png" alt="">
                    </div>
                    <div class="isFinish">{{book.isFinish ? '完结' : '连载'}}</div>
                </div>
                <div class="book_name">
                    {{book.name}}
                </div>
                <div class="author_name">
                    {{book.author_name}}
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
export default {
    name: 'mainPageContent',
    data() {
        return {
            sort: ['成功学', '投资理财', '人际处事', '计算机','人物传记','言情小说','散文随笔','悬疑推理','市场营销','健康养生','演讲口才','演讲口才','演讲口才','演讲口才','演讲口才','演讲口才'],
            moreable: [{
                name: '热门推荐',
                nick: 'popular',
                isMore: true,
            }],
            books: {
                popular: [{
                name: '熊镇',
                author_name: '恩田陆',
                score: 0,
                isFinish: false
                },
                {
                name: '熊镇',
                author_name: '恩田陆',
                score: 4.5,
                isFinish: false
                },
                {
                name: '熊镇',
                author_name: '恩田陆',
                score: 4.5,
                isFinish: false
                },
                {
                name: '熊镇',
                author_name: '恩田陆',
                score: 4.5,
                isFinish: false
                },
                {
                name: '熊镇',
                author_name: '恩田陆',
                score: 5,
                isFinish: false
                },
                {
                name: '熊镇',
                author_name: '恩田陆',
                score: 4.5,
                isFinish: false
                },
                {
                name: '熊镇',
                author_name: '恩田陆',
                score: 4.5,
                isFinish: false
                }]
            }
        }
    },
    methods: {
        hoverBook(typeIndex, bookIndex) {
            this.$set(this.books[this.moreable[typeIndex].nick][bookIndex], 'isHover', true);
        },
        leaveBook(typeIndex, bookIndex) {
            this.$set(this.books[this.moreable[typeIndex].nick][bookIndex], 'isHover', false);
        }
    }
}
</script>

<style lang="scss" scoped>
.sort{
    width: 900px;
    // margin: 0 auto;
    margin: 20px auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    // justify-content: center;
    header {
        text-align: center;
        flex-basis: 100px;
    }
    .el-button {
        margin: 10px 0px 0px 10px;
    }
}
.yellow {
    margin-top: 10px;
    background-color: #f6f5ee;
.inner-content {
    width: 900px;
    // border-top: .5px solid #ccc;
    margin: 0 auto;
.line {
    // border: 1px solid #ccc;
    height: 1px;
    background: linear-gradient(left,#f6f5ee,#ccc,#f6f5ee);
    // filter: blur(1px);
}
.moreable {
    .head {
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 23px;
    margin: 10px 0;
    span {
        float: right;
        font-size: 10px;
    }
    }
    .content {
    display: flex;
    flex-wrap: wrap;
    // margin: 0 20px;
    .book {
        flex-basis: 125px;
        flex-direction: column;
        display: flex;
        text-align: center;
        justify-content: center;
        width: 125px;
        margin: 0 26px 20px;
        position: relative;
        .book_name,.author_name {
            font-family: Hiragino Sans GB;
        }
        .book_name{
            margin-top: 3px;
            font-size: 15px;
        }
        .author_name {
            font-size: 8px;
        }
        .bottom {
        // width: 100%;
        .cover {
            // margin: 0 auto;
            width: 125px;
            height: 165px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 4px;
            overflow: hidden;
            box-shadow: 0 3px 5px #b0b0b0, 2px 2px 2px 1px rgba(0, 0, 0, 0.2), -2px 3px 5px #b0b0b0;
            img {
            vertical-align: middle;
            height: 100%;
            }
        }
        }
        .hover {
            transition: all .3s;
            filter: blur(3px);
        }
        .top {
            width: 100%;
            position: absolute;
            height: 100%;
            margin-top: 20%;
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
            }
        }
    }
        .bookHover {
        >div {
            transition: all .6s ease-in;
            opacity: 1;
            &:first-of-type {
            top: 10%;
            // transition-delay: .6s;
            }
            &:nth-of-type(2) {
            top: 20%;
            transition-delay: .5s;
            }
            &:nth-of-type(3) {
            top: 40%;
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
