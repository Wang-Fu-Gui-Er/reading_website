<template>
  <div class="main">
    <div class="head">
      <div class="left">
        <div class="image">
            <img src="../assets/logo.jpg" alt="">
          </div>
          <!-- select返回的值设在status里面 -->
          <el-select
            v-model="value9"
            multiple
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :loading="loading">
            <el-option
              v-for="item in options4"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      </div>
      
      <div class="tail">
        <template v-if="!isLogin">
          <a href="http://">登陆</a>/
          <a href="">注册</a>
        </template>
        <template v-else>
          {{name}}
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mainPage',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      options4: [],
      value9: [],
      list: [],
      loading: false,
      states: [],
      isLogin: false,
      name: ''
    }
  },
  mounted() {
      this.list = this.states.map(item => {
        return { value: item, label: item };
      });
    },
  methods: {
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options4 = this.list.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options4 = [];
      }
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
    line-height: 100px;
    // display: flex;
    // align-items: center;
    // justify-content: center;
    .left{
      float: left;
      height: 100px;
      // line-height: 100px;
      // position: relative;
      .image{
        img{
          height: 100px;
        }
        display: inline-block;
      }
      // white-space: nowrap;
    }
    .tail {
      float: right;
    }
  }
}
</style>
