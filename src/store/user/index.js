import { reqGetCode ,reqRegister,reqUserLogin,reqUserInfo, reqLogout} from "@/api"
import {setToken,getToken,removeToken} from '@/utils/token';
export default {
    namespanamespaced: true,
     actions:{
        // 获取验证码，正常情况不需要服务器发送信息到本地，这里因为服务器不能发验证码
        async getCode({commit},phone){
            let res = await reqGetCode(phone)
            if(res.code == 200){
                commit("GETCODE",res.data)
                return 'ok'
            }else{
                return Promise.reject(new Error('false'))
            }
        },
        // user注册
        async userRegister({commit},user){
            let res = await reqRegister(user)
            if(res.code = 200){
                return 'ok'
            }else{
                return Promise.reject(new Error('false'))
            }
        },
        // user登录
        async reqUserLogin({commit},user){
            console.log(user)
            let res  =  await reqUserLogin(user)
            console.log(res)
            if(res.code == 200){
                commit('USERLOGIN',res.data.token)
                // 持久化存储token信息
                localStorage.setItem('TOKEN',res.data.token)
                // setToken(res.data.token) 调用外部函数
                return 'ok'
            }else
            {
                return Promise.reject(new Error('false'))
            }
        },
        // 获取用户信息
        async reqUserInfo({commit}){
            
            let res = await reqUserInfo()
            if(res.code == 200){
                commit('USERINFO',res.data)
                return 'ok'
            }
            else{
                return Promise.reject(new Error('false'))
            }
        },
        // 退出登录
        async UserLogout({commit}){
            let res = await reqLogout()
            console.log(res)
            // action不饿能操作state
            if(res.code == 200){
                // 清楚token和用户信息
                commit('CLEAR')
                return 'ok'
            }
            else{
                console.log('123')
                return Promise.reject(new Error())
            }
        }
    },
    mutations:{
        GETCODE(state,code){
            state.code = code
        },
        USERLOGIN(state,token){
            state.token = token
        },
        USERINFO(state,UserInfo){
            state.UserInfo = UserInfo || {}
        },
        CLEAR(state){
            // 删除token和用户信息
            state.token = ''
            state.UserInfo = ''
            removeToken()
        }
    },
    getters:{},
    state:{
        code:'',
        token:localStorage.getItem('TOKEN'),
        UserInfo:{}
    }
}