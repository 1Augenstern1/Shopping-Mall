import Vue from 'vue'
import routes from './routes'
import VueRouter from 'vue-router'
import store from '@/store';
// 注册路由组件
Vue.use(VueRouter)
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
// 重写push方法(原因)因为返回的值是一个promise对象，需要有成功以及失败的回调的结果
VueRouter.prototype.push = function(location,resolve,reject){
    // call 和 apply区别，传递参数的写法不同， call 用逗号隔开，apply传递数组
    // console.log(location,reject,resolve)
    if(resolve && reject){
        console.log('有成功和失败回调')
        originPush.call(this,location,resolve,reject)
    }else{
        // 传递回调
        console.log('没有成功和失败回调')
        originPush.call(this,location,()=>{},()=>{})
    }
}
// 重写replace方法
VueRouter.prototype.replace = function(location,resolve,reject){
    // call 和 apply区别，传递参数的写法不同， call 用逗号隔开，apply传递数组
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject)
    }else{
        // 传递回调
        originReplace.call(this,location,()=>{},()=>{})
    }
}
// 路由实例化
const router = new VueRouter({
    // 第一：路径前面需要有/（不是二级路由时候）
    // 第二 路径中的单词要求都是小写
    // es6特性解构赋值
    routes,
    // 滚动行为控制（处理跳转页面后滚轮在底部情况）
    scrollBehavior (to, from, savedPosition) {
        return {y:0 }
    }
})
// 全局守卫 在跳转前决定能不能跳转
router.beforeEach(async(to,from,next)=>{
    //  to 要去的路由
    //  from 跳转的起点
    //  next 放行的 ‘ 函数 ’
    //  next()直接放行  
    //  next（"/login"）放行到指定路由
    //  next（false）重置
    // 用户只有登录了才能去购物车
    // 登录了就不能去login

    // 用户信息
    let  name = store.state.user.UserInfo.name
    let  token = store.state.user.token
    if(token){
        // 登录了
        if(to.path == '/login'){
            next('/home')
        }else{
            // 登陆了去的不是logon
            if(name){
                // 用户信息还在（在searche界面刷新后由于vuex不会一直保留信息内容，因此会丢失，因此需要分析）
                console.log(name)
                next()
            }else{
                // 没有用户信息了 派发action并且让仓库存储
                try {
                    await store.dispatch('reqUserInfo')
                    
                    next()
                } catch (error) {
                    // token失效（有可能是服务器返回的token过期了）
                    // 删除token并且重新登陆
                    await store.dispatch('UserLogout')
                    next('/login')
                }
            }
        }
    }else{
        // 未登录不能去交易想关的（pay/paysuccess）
        let topath = to.path
        if( topath.indexOf('/trade') !=-1 || topath.indexOf('/pay')!=-1 || topath.indexOf('/center')!=-1){
            // 未登录时想要跳转的地址
            
            next('/login?redirect='+topath)
            setTimeout(() => {
                alert('请先登录在前往'+topath)
            }, 30);
        }
        next()
    }
})

export default router