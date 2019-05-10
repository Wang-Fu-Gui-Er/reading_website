<template>
  <div class="main">
    <div class="write">
        <div class="head">
            <div class="left">
              <div class="image">
                <img src="../assets/img/logo.jpg" alt="">
              </div>
              <div v-if="!userInfo.isAdmin" class="select">
                <el-input
                  size="small"
                  placeholder="请输入搜索内容"
                  v-model="elmSearch.searchKey"
                  @blur="searchBook(elmSearch)">
                  <el-select v-model="elmSearch.searchType" slot="prepend" placeholder="请选择">
                    <el-option label="作者" value="author"></el-option>
                    <el-option label="图书" value="book"></el-option>
                  </el-select>
                  <el-button slot="append" @click="searchBook(elmSearch)" icon="el-icon-search"></el-button>
                </el-input>
              </div>
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
            <div class="drop-down" :class="{show: isDrop, 'not-show': !isDrop, 'admin-drop': userInfo.isAdmin}">
              <div v-if="!userInfo.isAdmin" @click="$router.push('/shelf');">我的书架</div>
              <div @click="userLogOut">退出</div>
            </div>
          </template>
          <span v-if="!userInfo.isAdmin" class="sperate-line">|</span>
          <a v-if="!userInfo.isAdmin" @click="isFallback = true">意见反馈</a>
        </div>
      </div>
      <el-menu v-if="!userInfo.isAdmin" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @click.native="handleSelect($event)">
        <el-menu-item v-for="(item, index) in menu" :key="index" :data-path="item.path" :index="index.toString()">{{item.text}}</el-menu-item>
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

import { mapMutations, mapState } from 'vuex';

import Register from './client/Register.vue';
import Login from './client/Login.vue';
import Fallback from './client/Fallback.vue';

import getUserInfo from '@/common/js/getUserInfo';

// 首屏优化考虑一下
export default {
  name: 'mainPage',
  data () {
    return {
      isLogin: false,
      name: '',
      activeIndex: '0',
      menu: [{path: '/', text: '首页'}, {path: '/sort', text: '分类'}, {text: '有声书物'}, {path: '/list', text: '榜单'}, {text: '分享会'}],
      isRegister: false,
      isUserLogin: false,
      isFallback: false,
      isDrop: false,
      elmSearch: {
        searchType: 'book',
        searchKey: ''
      }
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
  computed: {
    ...mapState([
      'search'
    ])
  },
  inject:  ['reload'],
  mixins:[getUserInfo],
  methods: {
    ...mapMutations([
      'CHANGE_SEARCH'
    ]),
    initUserConfig() {
      const userInfo = this.getUserInfo();
      if (userInfo && Object.keys(userInfo).length !== 0) {
        if (userInfo.isAdmin) {
          this.$router.push({name: 'bookManage'});
        }
        this.isUserLogin = true;
      }
      // this.reload();
    },
    searchBook(elmSearch) {
      const search = this.search;
      if (!(search.searchType === elmSearch.searchType && search.searchKey === elmSearch.searchKey)) {
        this.CHANGE_SEARCH(elmSearch);
      }
      this.$router.push({name: 'search'});
    },
    handleSelect(e) {
      const path = e.target.dataset.path;
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
      this.$router.push({name: 'mainPage'});
    }
  },
  watch: {
    '$route.path' (value) {
      
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
    height: 120px;
    .left{
      float: left;
      height: 100px;
      display: flex;
      align-items: center;
      .image{
        width: 190px;
        // height: 100px;
        @media screen and (max-width: 568px) {
            width: 80px;
        }
        display: inline-block;
      }
      .select {
        // height: 30px;
        .el-input-group__prepend {
          width: 36px;
        }
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
        width: auto;
        > div {
          white-space: nowrap;
          cursor: pointer;
          &:hover {
            color: $fontColor;
          }
        }
      }
      .admin-drop {
        right: 0px;
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
