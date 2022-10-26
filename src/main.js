// 引入Vue
import Vue from 'vue'
// 引入app标签
import App from './App.vue'
// 引入路由
import router from './Router'
// 引入vue异步路由管理加快首屏加载时间vue3特性
// import {defineAsyncComponent} from "vue"
import store from "./store/index"
// 注册全局组件---三级联动组件---全局组件
import TypeNav from '@/components/TypeNav/TypeNav'
// const TypeNav = defineAsyncComponent(()=>import('@/components/TypeNav/TypeNav'))
// 轮播图
import Carousel from '@/components/Carousel'
// 分页器组件
import Pagination from '@/components/Pagination'
// 引入轮播图库插件
import "swiper/css/swiper.css"

// 统一引入
import *as API from '@/api/index'
import BigRobot from '@/assets/1.gif'

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// elementUi引入组件（按需引入提高性能减少内存占用）
import { Button,MessageBox,Form,Input ,FormItem, Select,Option,Tabs,TabPane,
  OptionGroup,} from 'element-ui'

// 全局注册组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
// 方法一elementui注册方式一
Vue.component(Button.name, Button)
// Vue.component(Form.name, Form)
Vue.component(Input.name, Input)
Vue.use(Form)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(FormItem)
Vue.use(Tabs)
Vue.use(TabPane)
// 方法二挂載在原型上
// 方法二挂載在原型上
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
// 关闭生产模式
Vue.config.productionTip = false

// 引入mockServer.js  js----mock数据
import "@/mock/mockServe"
// import { reqGetSearchInfo } from '@/api'
// console.log(reqGetSearchInfo({}))

// 引入插件（进行路由懒加载）
import VueLazyload from "vue-lazyload";
import myPlugins from "@/plugins/myPlugins";
// 注册插件
Vue.use(VueLazyload,{
  // 懒加载默认图片
  loading:BigRobot
})
Vue.use(myPlugins,{
  // 自定义插件
    name:'cos'
})
// 全局引入element-ui组件库
// Vue.use(ElementUI)
// 引入表单验证就行
import '@/plugins/validata'
import VeeValidate from 'vee-validate';

const vm = new Vue({
  // 注册挂载app标签
  beforeCreate() {
    Vue.prototype.$bus = this;
    // 挂载Api接口，在每个环节不需要在引入
    Vue.prototype.$API = API
  },
  render: h => h(App),
  // 注册路由用 ES6语法
  // 此每个组件都有 $route and $router
  router,
  // 注册仓库：
  store
}).$mount('#app')

