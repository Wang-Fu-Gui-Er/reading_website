<template>
  <div class="main">
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
  </div>
</template>

<script>
export default {
  name: 'mainPage',
  data () {
    return {
      restaurants: [],
      state4: '',
      timeout:  null,
      isLogin: false,
      name: '',
      activeIndex: '1'
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main {
  width: 900px;
  margin: 0 auto;
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
}
</style>
