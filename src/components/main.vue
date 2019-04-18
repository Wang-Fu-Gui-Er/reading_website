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
        <div class="tail" @mouseover="hoverUser(true)" @mouseout="hoverUser(false)">
          <template v-if="!isUserLogin">
            <a @click="isLogin = true">登陆</a>
            <span class="sperate-line">
              |
            </span>
            <a @click="isRegister = true">注册</a>
          </template>
          <template v-else>
            <span class="userImage">
              <img :src="userInfo.headPicPath" alt="">
            </span>
            <span class="username">
              {{userInfo.nickName}}
            </span>
            <span class="arrow">
              <font-awesome-icon icon="angle-down"></font-awesome-icon>
            </span>
            <div class="drop-down" :class="{show: isDrop, 'not-show': !isDrop}">
              <div @click="$router.push('/shelf');">我的书架</div>
              <div @click="userLogOut">退出</div>
            </div>
          </template>
          <span class="sperate-line">|</span>
          <a @click="isFallback = true">意见反馈</a>
        </div>
      </div>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item v-for="item, index in menu" :key="index" :index="index.toString()">{{item}}</el-menu-item>
      </el-menu>
    </div>
    <router-view></router-view>
    <Register v-model="isRegister"></Register>
    <Login v-model="isLogin" @initUserConfig="initUserConfig"></Login>
    <Fallback v-model="isFallback"></Fallback>
    <div class="footer">
      如有问题欢迎联系<a @click="isFallback = true">意见反馈</a>
    </div>
    <div class="sticky">
      <div class="up">
        <img src="../assets/img/up.png" alt="">
      </div>
      <div class="text" @click="isFallback = true">意见反馈</div>
    </div>
  </div>
</template>

<script>
const _ = require('lodash');

import Register from './Register.vue';
import Login from './Login.vue';
import Fallback from './Fallback.vue';

import getUserInfo from '@/common/js/getUserInfo';

// 首屏优化考虑一下
export default {
  name: 'mainPage',
  data () {
    return {
      restaurants: [],
      state4: '',
      timeout:  null,
      isLogin: false,
      name: '',
      activeIndex: '0',
      menu: ['首页', '分类', '有声书物', '分享会', '榜单'],
      isRegister: false,
      isUserLogin: false,
      isFallback: false,
      isDrop: false
    }
  },
  components: {
    Register,
    Login,
    Fallback
  },
  created() {
    // may change later
    const pathArr = this.$route.path.split('/');
    const curRoute = pathArr.length > 0 ? pathArr[1] : '';
    const routeArr = ['', 'sort'];
    const activeIndex = routeArr.findIndex(item => item === curRoute);
    this.activeIndex = activeIndex.toString();

    this.initUserConfig();
  },
  mixins:[getUserInfo],
  mounted() {
    this.restaurants = this.loadAll();
  },
  methods: {
    initUserConfig() {
      const userInfo = this.getUserInfo();
      if (userInfo && Object.keys(userInfo).length !== 0) {
        this.isUserLogin = true;
      }
    },
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
      return state => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    search(item) {
      // console.log(item);
    },
    handleSelect(key) {
      let menuIndex = parseInt(key);
      let path = '/';
      if (menuIndex === 1) {
        path = '/sort'
      }
      this.$router.push({path});
    },
    hoverUser(flag) {
      if (this.isUserLogin) {
        this.isDrop = flag;
      }
    },
    userLogOut() {
      this.clearUserInfo();
      this.isUserLogin = false;
    }
  }
}
</script>

<style lang="scss">


.main {
  // 这个地方要调整一下
  // min-width: 1179px;
  min-height: 100vh;
  overflow: hidden;
  position: relative;
  > div {
    // min-width: 800px;
  }
  .write{
    width: $width;
    margin: 0 auto;
  }
  .head {
    height: 100px;
    .left{
      float: left;
      height: 100px;
      .image{
        width: 190px;
        // height: 100px;
        @media screen and (max-width: 568px) {
            width: 80px;
        }
        display: inline-block;
      }
    }
    .tail {
      margin-top: 8px;
      float: right;
      font-size: 12px;
      height: 25px;
      line-height: 25px;
      color: $grey;
      position: relative;
      &:hover {
        .arrow {
          transform: rotate(180deg);
        }
      }
      .userImage {
        display: inline-block;
        width: 25px;
        height: 25px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .username {
        margin-left: 8px;
      }
      .arrow {
        display: inline-block;
        height: 11px;
        width: 7.5px;
        line-height: 11px;
        transform: rotateX(0deg);
        transition: transform 1s;
        transform-origin: center;
      }
      .drop-down {
        transition: opacity 1s;
        opacity: 0;
        padding: 2px 8px;
        border-radius: 3px;
        border: .7px solid $greyHover;
        position: absolute;
        right: 60px;
        top: 30px;
        > div {
          cursor: pointer;
          &:hover {
            color: $fontColor;
          }
        }
      }
      .show {
        opacity: 1;
      }
      .not-show {
        opacity: 0;
      }
    }
  }
  .footer {
    position: absolute;
    bottom: 0px;
    // display: flex;
    // justify-content: flex-end;
    width: 100vw;
    height: 10vh;
    line-height: 10vh;
    text-align: center;
    color: $grey;
    border-top: .7px solid $littleGrey;
    background-color: $greyWhite;
    a {
      color: black;
      text-decoration: underline;
    }
  }
  .sticky {
    position: fixed;
    right: 0px;
    bottom: 0px;
    width: 50px;
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
      }
    }
    .text {
      padding: 5px;
      border: 1px solid #ccc;
      width: 40px;
    }
  }
}
</style>
