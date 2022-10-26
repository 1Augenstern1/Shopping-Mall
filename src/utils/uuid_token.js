import {v4 as uuidv4} from 'uuid'
// 生成一个随机字符串，且每次执行都不能发生变化，游客身份吃鸡存储
export const getUUID = () =>{
    // 此案在本地存储查看uuid  
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    // 如果没有
    if(!uuid_token){
        // 如果没，生成游客临时身份
        uuid_token = uuidv4()
        //
        localStorage.setItem("UUIDTOKEN",uuid_token)
    }
    // 有返回值，没有返回值undefind
    return uuid_token
}