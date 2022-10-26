// 引入自己修改后的axios方法
import requests from "./request";
// 引入mock请求api
import mockRequest from './mockAjax'
// import { method } from "lodash";
// 三级联动接口
// /api/product/getBaseCategroyList get 无参数
// 发送的请求返回的结果是Promise对象
export const reqCategoryList = () => requests({ url: 'product/getBaseCategoryList', method: 'get' });
// 假数据
export const reqmock = () =>{let data =  mockRequest({ url: '/banner', method: 'get' }) 
console.log('')
console.log(data)
return data
}
// 假数据
export const reqmockfloor = () => mockRequest({ url: '/floor', method: 'get' });

//  请求搜索数据（带参数）
// 当前传送的数据起码是一个和空对象，然获取数据为错误
export const reqGetSearchInfo = (params) => {
    return requests({
        url: "/list",
        method: 'post',
        data: params
    })
};
// 详情页面接口
export const reqGoodsInfo = (skuId) => requests({
    url: `/item/${skuId}`,
    method: 'get'
})
// 购物车数据上传接口
export const reqAddOrupdataShopCart = (skuId, skuNum) => requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post'
})
// 购物车列表数据接口(获取数据)
export const reqCartList = () => requests({
    url: '/cart/cartList', method: 'get'
})
// 购物车产品数据接口，删除购物车信息
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })
// 修改商品选中状态
export const requpdataCheckedById = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' });
// 获取验证码
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })
// 注册账号
export const reqRegister = (data) => requests({ url: '/user/passport/register', data, method: "post" })
// 登录账号
export const reqUserLogin = (data) => requests({ url: '/user/passport/login', data, method: 'post' })
// 获取用户信息
export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })
// 退出登录
export const reqLogout = () => requests({ url: '/user/passport/logout', method: 'get' })
// 获取用户地址信息
export const reqAddressInfo = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' });
// 获取商品清单
export const reqOrderinfo = () => requests({
    url: '/order/auth/trade', method: 'get'
})
// 提交订单(此处用别的方式不用vuex（多练习）)
export const reqSubmitOrder = (tradeNo, data) => requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post'
})
// 获取支付信息
export const reqPayInfo = (orderId) => requests({
    url: `/payment/weixin/createNative/${orderId}`, method: 'get'
})
// 获取支付成功与否的请求
export const reqPayStatus = (orderId) => requests({
    url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'
})
// 获取个人中心数据
export const reqMyOrderList = (page,limit)=> requests({
    url:`/order/auth/${page}/${limit}`,
    method:'get'
})