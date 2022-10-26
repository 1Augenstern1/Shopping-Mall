

let myPlugins = {}

// install固定方法 当插注册时候调用第一个参数为Vue本身，第二个为传入的对象
myPlugins.install = function(Vue,options){
    // console.log(Vue)
    // console.log(options)
    // 自定义指令的关键（全局组件） elment是绑定元素，params是元素内容(能够操作dom元素)
     Vue.directive(options.name,(element,params)=>{
        // console.log(element)
        // console.log(params)
     })
}

export default myPlugins