import {reqCartList,reqDeleteCartById,requpdataCheckedById} from '@/api'
import { get } from 'lodash'
export default {
    // namespaced: true,
    actions:{
       async getCartList({commit}){
            let res = await reqCartList()
            
            if(res.code == 200){
                commit('GETCARTLIST' ,res.data)
            }
        },
        async reqDeleteCartBySkuId({commit},skuId){
            // 不需要返回值
            let res = await reqDeleteCartById(skuId)

            if(res.code == 200){
                return 'ok'
            }else{
                console.log('vuex失败')
                return Promise.reject(new Error('faile'))
            }
        },
        async updataCheckedById({commit},{skuid,isChecked}){
            let res = await requpdataCheckedById(skuid,isChecked)
            if(res.code == 200){
                return 'ok'
            }
            else{
                return  Promise.reject(new Error('faile'))
            }
        },
        // 删除选中的产品（每删除一个返回一个promise）
        DeleteAllchecked({dispatch,getters}){
            console.log(getters)
            // 用promiseAll来存储每一次promise的返回值promise。all的方法只有数组中每个值都是返回成功时候才成功
            let promiseAll = []
            getters.cartList.cartInfoList.forEach(item => {
                console.log(item.isChecked)
                let promise = item.isChecked == 1? dispatch('reqDeleteCartBySkuId',item.skuId):'';
                promiseAll.push(promise)
            });
            console.log(promiseAll)
            return Promise.all(promiseAll)
        },
        // 改变所有购物车的点击状态（全选或者全不选）
        updataAllCartChecked({dispatch,getters},isChecked){
            let PromiseAll = []
            getters.cartList.cartInfoList.forEach(item=>{
                console.log(item.isChecked)
                let promise = dispatch('updataCheckedById',{
                    skuid:item.skuId,
                    isChecked
                })
                PromiseAll.push(promise)
            })
            return Promise.all(PromiseAll)
        }
    },
    mutations:{
        GETCARTLIST(state,cartList){
            state.cartList = cartList
        }

    },
    getters:{
        cartList(state){
            return state.cartList[0]||{}
        },

    },
    state:{
        cartList:[]
    },
}