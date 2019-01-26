<template>
  <div class="main">
    <div class="write">
        <div class="head">
            <div class="left">
              <div class="image">
                <img src="../assets/img/logo.jpg" alt="">
              </div>
              <!-- select返回的值设在status里面 -->
              <!-- <div class="search"> -->
                <el-autocomplete
                  v-model="state4"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="请输入内容"
                  @select="search"
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
    </div>
    <router-view></router-view>
    <div class="footer">
      如有问题欢迎联系<a href="www.baidu.com">意见反馈</a>
    </div>
    <div class="sticky">
      <div class="up">
        <img src="../assets/img/up.png" alt="">
      </div>
      <div class="text">意见反馈</div>
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
    search(item) {
      console.log(item);
    },
    handleSelect(key) {
      let menuIndex = parseInt(key);
      let path = '/';
      if (menuIndex === 2) {
        path = '/sort'
      }
      this.$router.push({path});
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import url('./../assets/css/common.scss');

.main {
  // 这个地方要调整一下
  // width: 100vw;
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
      margin-top: 8px;
      float: right;
      font-size: 12px;
    }
  }
  .footer {
    height: 40px;
    line-height: 40px;
    text-align: center;
    a {
      text-decoration: underline;
    }
  }
  .sticky {
    position: fixed;
    right: 0px;
    bottom: 0px;
    width: 40px;
    text-align: center;
    margin-right: 10px;
    margin-bottom: 10px;
    .up {
      margin: 0 auto;
      width: 20px;
      height: 20px;
      img {
        width: 100%;
        height: 100%;
        vertical-align: middle;
      }
    }
    .text {
      border: 1px solid #ccc;
      width: 40px;
    }
  }
}
</style>
