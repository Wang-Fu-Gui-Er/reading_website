<template>
  <div class="main">
    <div class="write">
        <div class="head">
            <div class="left">
              <div class="image">
                <img src="../assets/logo.jpg" alt="">
              </div>
              <!-- select返回的值设在status里面 -->
              <!-- <div class="search"> -->
                <el-autocomplete
                  v-model="state4"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="请输入内容"
                  @select="handleSelect"
                >
                <i
                  class="el-icon-search el-input__icon"
                  slot="suffix">
                </i>
                </el-autocomplete>
                <!-- <input type="text"> -->
              <!-- </div> -->
            </div>
        <div class="tail">
          <template v-if="!isLogin">
            <a href="http://">登陆</a>
            <span class="sperate_line">
              |
            </span>
            <a href="">注册</a>
          </template>
          <template v-else>
            {{name}}
          </template>
          <span class="sperate_line">|</span>
          <a href="">意见反馈</a>
        </div>
      </div>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="2">分类</el-menu-item>
        <el-menu-item index="3">有声书物</el-menu-item>
        <el-menu-item index="4">分享会</el-menu-item>
        <el-menu-item index="5">榜单</el-menu-item>
      </el-menu>
      <div class="sort">
        <header>分类</header>
        <div class="content">
          <el-button size="mini" plain v-for="item in sort">
            {{item}}
          </el-button>
        </div>
      </div>
    </div>
    <!-- <block></block> -->
    <div class="yellow">
      <div class="inner-content">
        <div class="line"></div>
        <div class="moreable" v-for="item,typeIndex in moreable">
          <div class="head">
            {{item.name}}
            <span class="more" v-if="item.isMore">更多></span>
          </div>
          <div class="content">
            <div v-for="book,bookIndex in books[item.nick]" v-on:mouseout="leaveBook(typeIndex, bookIndex)" v-on:mouseover="hoverBook(typeIndex, bookIndex)" class="book">
              <div :class="{hover: book.isHover}" class="bottom">
                <div class="cover">
                  <img src="../assets/book_cover.jpeg" alt="">
                </div>
                
              </div>
              <!-- <div v-if="book.isHover" class="top"> -->
              <div class="top">
                <div class="score">{{book.score}}</div>
                <div class="star">
                  <img src="../assets/lack_star.png" alt="">
                  <img style="clip:rect(auto,{{book.score}}%,auto,auto);" src="../assets/full_star.png" alt="">
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
let _ = require('lodash');
export default {
  name: 'mainPage',
  data () {
    return {
      restaurants: [],
      state4: '',
      timeout:  null,
      isLogin: false,
      name: '',
      activeIndex: '1',
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
          score: 4.5,
          isFinish: false
        }]
      }
    }
  },
  mounted() {
    this.restaurants = this.loadAll();
  },
  methods: {
    loadAll() {
      return []
    },
    querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      console.log(item);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    hoverBook(typeIndex, bookIndex) {
      this.$set(this.books[this.moreable[typeIndex].nick][bookIndex], 'isHover', true);
    },
    leaveBook(typeIndex, bookIndex) {
      this.$set(this.books[this.moreable[typeIndex].nick][bookIndex], 'isHover', false);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main {
  // 这个地方要调整一下
  .write{
    width: 900px;
    margin: 0 auto;
  }
  .head {
    height: 100px;
    .left{
      float: left;
      height: 100px;
      .image{
        height: 100px;
        img{
          vertical-align: middle;
          height: 100px;
        }
        display: inline-block;
      }
    }
    .tail {
      float: right;
      font-size: 12px;
      a {
        color: #666;
        text-decoration: none;
        &:hover{
          color: #aaa;
        }

      }
    }
  }
  .sort{
    margin: 20px 0;
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
            // margin: 0 auto;
            width: 100%;
            position: absolute;
            height: 100%;
            margin-top: 20%;
            // font-size: 10px;
            >div {
              height: 20%;
              // padding: 30px 0px;
              // line-height: 50%;
            }
            .star {
              position: relative;
              >img {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                
              }
            }
          }
        }
        
      }
    }
    }
  }
}
</style>
