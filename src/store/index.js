import Vue from "vue"
import Vuex from 'vuex'

import homeVuex from './home'
import searchVuex from "./search"
import detailVuex from "./detail"
import shopCart from './shopCart/shopCart'
import user from './user';
import trade from './trade/index';
// 注册插件 Vuex
Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        homeVuex,
        searchVuex,
        detailVuex,
        shopCart,
        user,
        trade
    }
})



// import Vue from 'vue'
// import Vuex from 'vuex'
 
// Vue.use(Vuex)
 
// const state = {
//   pjtnews: 0,
//   count: 1
// }
 
// const mutations = {
//   add(state) {
//     state.count += 1;
//   },
//   reduce(state) {
//     state.count -= 1;
//   }
// }
// export default new Vuex.Store({
//   state,
//   mutations
// });