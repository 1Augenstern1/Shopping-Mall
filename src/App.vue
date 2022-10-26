<template>
  <div>
    <!-- <h1 v-cos='mss' >花江汇</h1> -->
    <!-- 头标签 -->
    <!-- 在全局各个部分都会使用因此卸载app中 -->
    <Header></Header>
    <!-- 路由展示地点 -->
    <router-view></router-view>
    <!-- 底部标签 在show为true的地方可见-->
    <!-- <Footer v-show="$route.meta.show" ></Footer> -->
    <Footer ></Footer>
  </div>
</template>

<script>
// 引入组件
import Header from './components/Header/'
import Footer from './components/Footer'

export default {
  name: 'App',
  data() {
    return {
      mss:'123'
    }
  },
  components:{
    Header,
    Footer
  },
  mounted(){
    // console.log(this)
    // 把信息放在app的挂载避免出现信息多次请求 （提高性能）
     this.$store.dispatch("homeVuex/CategoryList");
  }
}
</script>

<style>
html{
  /* 长度 */
  min-width: fit-content;
}
</style>
