import { reqGetSearchInfo } from "@/api";

export default {
  namespaced: true,
  actions: {
    // 获得search的数据
    async getSearchList({commit}, params={}) {
        // 调用参数时候起码有一个空独享
        // params当用户派发action的时候，第二个参数才攒递过来，默认至少是一个空对象
      let result = await reqGetSearchInfo(params);

      console.log(result)
    //   console.log('=====')
      if(result.code == 200){
        console.log(result)
          commit("GETSEARCHLIST",result.data)
      }
    },
  },
  mutations: {
    GETSEARCHLIST(state, searchList){
        state.searchList = searchList

    }

  },
//   在项目中为了简化数据而生
//   将来获取的数据简化
  getters: {
    goodsList(state){
      return state.searchList.goodsList||{} ;
  },
   //品牌数据
   tradeMarkList(state){
    return state.searchList.trademarkList;
  },
  //平台属性
  attrsList(state){
      return state.searchList.attrsList;
  }
  },
  state: {
    searchList:{},
  },
};
