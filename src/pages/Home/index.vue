<template>
  <div>
      <!-- 三级联动已经注册全局组件 -->
      <TypeNav/>
      <List/>      
      <TodayRecommend/>
      <Rank/>
      <Like/>
      <Floor v-for="(floor, index) in  FloorList" :key="floor.id" :list='floor' />
      <Brand/>
  </div>
</template>

<script>
// 引入其余组件
import List from './List/List.vue'
// import TodayRecommend from './TodayRecommend/TodayRecommend.vue'
// import Floor  from './Floor/Floor.vue'

// import Rank  from './Rank/Rank.vue'
// import Brand  from './Brand/Brand.vue'
// import Like from './Like/Like.vue'
import {mapState} from 'vuex'
export default {

components:{
  List:()=>({
    // 需要加载的组件 (这个 `import` 函数会返回一个 `Promise` 对象。)
                component: import('./List/List.vue'),
                // 异步组件加载时使用的组件
                loading: List,
                // 加载失败时使用的组件
                error: List,
                // 展示加载时组件的延时时间。默认值是 200 (毫秒)
                delay: 200,
                // 如果提供了超时时间且组件加载也超时了，
                // 则使用加载失败时使用的组件。默认值是：`Infinity`
                timeout: 3000,
  }),
  TodayRecommend:()=>import('./TodayRecommend/TodayRecommend.vue'),
  Brand:()=>import( './Brand/Brand.vue'),
  Like:()=>import('./Like/Like.vue'),
  Rank:()=>import('./Rank/Rank.vue'),
  Floor:()=>import('./Floor/Floor.vue'),
  Like:()=>import('./Like/Like.vue')
},
mounted(){
  // 获取购物列表
  this.$store.dispatch("homeVuex/getFloorList")
  // 获取登录信息
  this.$store.dispatch('reqUserInfo')
},
computed:{
  ...mapState({"FloorList":(state)=>state.homeVuex.FloorList
  })
}
}
</script>

<style>

</style>