import {reqAddressInfo, reqOrderinfo} from '@/api';
export default {
    namespanamespaced: true,
    actions:{
        // 获取用户地址信息
        async getUSerAddress({commit}){
            let res = await reqAddressInfo()
            if(res.code == 200){
                commit('GETUSERADDRESS',res.data)
                return 'ok'
            }else
            {
                return Promise.reject(new Error('false'))
            }
        },
        async getOrderInfo({commit}){
            let res = await reqOrderinfo()
            console.log(res)
            if(res.code == 200){
                commit("GETORDERINFO",res.data)
                return 'ok'
            }else
            {
                return Promise.reject(new Error('false'))
            }
        }
    },
    mutations:{
        GETUSERADDRESS(state,address){
            state.address = address
        },
        GETORDERINFO(state,orderInfo){
            state.orderInfo = orderInfo
        }
    },
    getters:{},
    state:{
        address:[],
        orderInfo:{}
    }
}