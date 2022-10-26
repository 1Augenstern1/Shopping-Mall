// 对axios进行二次封装
import axios from "axios";
// 引入进度条模块
// start方法 进度条开始 done 进度条结束
import nprogress from "nprogress";
// 引入进度条样式
import "nprogress/nprogress.css"
// 利用axios对象的方法create 创建一个axios
const requests = axios.create({
    //可以给请求路径中添加一些参数 
    baseURL: "/mock",
    //设置请求时间（5S）
    timeout: 5000
});
// 请求拦截器
requests.interceptors.request.use(config=>{
    // 配置对象，有一个很重要的属性，headers请求头
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