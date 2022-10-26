import {reqGoodsInfo,reqAddOrupdataShopCart} from "@/api";
// 封装有课身份模块uuid ---》 生成一个随机的字符串
import {getUUID} from '@/utils/uuid_token'
export default {
    namespanamespaced: true,
    actions:{
        // 获取产品信息
        async getGoddsInfo({commit},skuId){
            let res = await reqGoodsInfo(skuId)
            if(res.code == 200){
                commit("GETGOODINFO",res.data)
            }
        },
        // 将商品发送到购物车
        // 此处假如购物车前台把参数带给服务器，服务器写入数据成功，但是并没有其他的数据，只返回code = 200 代表操作成功
        // 不返回数据因此不用三连环
       async AddOrupdataShopCart({commit},{skuId,skuNum}){
            let res = await reqAddOrupdataShopCart(skuId,skuNum)
            console.log(res)
            // 确定购物车信息时候是成功
            if(res.code == '200'){
                return 'ok'
            }
            else{
                return Promise.reject(new error("false")) ;
            }
        //    当前函数执行返回promise对象
        }
        
    },
    mutations:{
        GETGOODINFO(state,goodInfo){
            state.goodInfo = goodInfo
        }
    },
    getters:{
        categoryView(state){
        //   当前计算出的属性值起码是个空对象，那么报错就会消失
            return state.goodInfo.categoryView||{}
        },
        skuInfo(state){
            return state.goodInfo.skuInfo || {}
        },
        // 简化商品属性
        spuSaleAttrList(state){
            return state.goodInfo.spuSaleAttrList || []
        }
    },
    state:{
        goodInfo:{},
        // 临时身份
        uuid_token:getUUID()
    },
}