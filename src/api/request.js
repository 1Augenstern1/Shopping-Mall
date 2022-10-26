// 对axios进行二次封装
import axios from "axios";
// 引入进度条模块
// start方法 进度条开始 done 进度条结束
import nprogress from "nprogress";
// 引入进度条样式
import "nprogress/nprogress.css"
// 引如vuex的store 把临时身份通过header传送
import store from "@/store";
// 利用axios对象的方法create 创建一个axios
const requests = axios.create({
    //可以给请求路径中添加一些参数 z
    baseURL: "/api",
    //设置请求时间（5S）
    timeout: 5000
});
// 请求拦截器
requests.interceptors.request.use(config=>{
    // if(store.state.detailVuex.uuid_token){
        
    // }
    
    // 配置对象，有一个很重要的属性，headers请求头
    // 假日登录了用登录身份
    if(store.state.user.token){
        // 临时用户头信息，当用户登录时取消
        config.headers.token = store.state.user.token        
    }else{
        // 没有登录那么使用uuid头
          // 请求头添加一个字段（userTempId）：请求头需要和后台的沟通
          config.headers.userTempId = store.state.detailVuex.uuid_token
    }
    nprogress.start()
    return config
})
// 响应拦截器
requests.interceptors.response.use((res)=>{
    // 成功回调
    nprogress.done()
    return res.data;
}, (err)=>{
    // 失败回调
    return Promise.reject(err);
} )

export default requests