import Mock from 'mockjs'

// json数据默认对外暴露（没有暴露却能引用
// webpack默认对外暴露的：图片、JSON数据格式
import banner from "./banner.json"
import floor from "./floor.json"
// 第一个参数是请求的地址

// 记得开头的  
// 200出现5次连续的
// Mock.mock("/mock/banner",'method' ,{code|5:200,banner})
Mock.mock("/mock/banner",'get',{code:200,banner})
Mock.mock("/mock/floor",'get' ,{code:200,floor})