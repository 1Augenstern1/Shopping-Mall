// 通过调用外部函数的token存储做法相同
export const setToken = (token)=>{
    localStorage.setItem("TOKEN",token)
}
// 获取token
export const getToken = ()=>{
    return localStorage.getItem('TOKEN')
}
// 清楚token
export const removeToken = () =>{
    localStorage.removeItem('TOKEN')
}