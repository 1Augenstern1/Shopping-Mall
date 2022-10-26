
// import Home from '@/pages/Home'
// import Register from '@/views/Register'
// import Login from '@/views/Login'
// import Search from '@/pages/Search'
// import Detail from '@/views/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/views/Trade'
// import Pay from '@/views/Pay'
// import PaySuccess from '@/views/PaySuccess'
// import Center from '@/views/Center'
// 引入二级路由
// import Groupodrder from "@/views/Center/groupOrder"
// import myOrder from "@/views/Center/myOrder"
export default
// 路由懒加载，把不同路由对应的组件分割成代码块·，只有路由被访问的时候再加载响应的组件，这样更高效
[
    {
        // 不能加 . 
        path:'/home',
        // 路由懒加载实例
        component:() =>import('@/pages/Home') ,
        meta:{show:true}
    },
    {
        // 不能加 . 
        path:'/trade',
        component:() =>import('@/views/Trade') ,
        meta:{show:true},
        
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 重购物车出发能到达，别的地方会返回当前2
            if(from.path == '/ShopCart'){
                next()
            } 
            else{
                // 保持本身路由
                next(false)
            }
        }
    },
    {
        // 不能加 . 
        path:'/pay',
        component:() =>import('@/views/Pay') ,
        meta:{show:true},
        // beforeEnter: (to, from, next) => {
        //     if(from.path == '/trade'){
        //         next()
        //     }else{
        //         next(false)
        //     }
        // }
    },
    {
        // 不能加 . 
        path:'/paysuccess',
        component:()=>import('@/views/PaySuccess'),
        meta:{show:true}
    },
    {
        // 不能加 . 
        path:'/center',
        component:()=>import('@/views/Center'),
        meta:{show:true},
        // 二级路由
        children:[
            {
                path:'myorder',
                component:()=>import("@/views/Center/myOrder")
            },
            {
                path:'grouporder',
                component:()=>import("@/views/Center/groupOrder")
            },
            // 重定向
            {
                path:'/center',
                redirect:'/center/myorder'
            }
        ]
    },
    {
        // 不能加 . 
        path:'/detail/:skuId',
        component:()=>import('@/views/Detail'),
        meta:{show:true}
    },
    {
        // 不能加 . 
        path:'/AddCartSuccess/',
        name:'AddCartSuccess',
        component:()=>import('@/pages/AddCartSuccess') ,
        meta:{show:true}
    },
    {
        // 不能加 . 
        path:'/ShopCart',
        name:'ShopCart',
        component:() =>import('@/pages/ShopCart') ,
        meta:{show:true}
    },
    {
        path:'/register',
        name:'Register',
        component:()=>import('@/views/Register')      
    },
    {
        path:'/ChangePassword',
        name:'ChangePassword',
        component:()=>import('@/views/ChangePassword')      
    },
    {
        path:'/login',
        name:'Login',
        component:()=>import('@/views/Login')
    },
    {   name:'search',
        path:'/search/:keyword?',
        component:()=>import('@/pages/Search'),
        meta:{show:true},
        // 不设置时默认show是false

    //   4、路由组件能不能传递props数据
    //        方式一 布尔值写法 props：true  只能传递params
    //        方式二 对象写法   props：{a:1,b:2} 额外传递一些参数
    //        方式三 函数写法   props:()=>{ return{keyword: $router.params.keyword , k:$route.query.k} }
        // props:true
        props: (route) => ({ keyWord: route.params.keyWord, k: route.query.k })

    },
    // 重定向
    {
        path:'/',
        redirect:"/home"
    }
    ,

    // 一些组件通信路由跳转
    {
        path: '/communication',
        component: () => import('@/pages/Communication/Communication'),
        children: [
          {
            path: 'event',
            component: () => import('@/pages/Communication/EventTest/EventTest'),
            meta: {
              isHideFooter: true
            },
          },
          {
            path: 'model',
            component: () => import('@/pages/Communication/ModelTest/ModelTest'),
            meta: {
              isHideFooter: true
            },
          },
          {
            path: 'sync',
            component: () => import('@/pages/Communication/SyncTest/SyncTest'),
            meta: {
              isHideFooter: true
            },
          },
          {
            path: 'attrs-listeners',
            component: () => import('@/pages/Communication/AttrsListenersTest/AttrsListenersTest'),
            meta: {
              isHideFooter: true
            },
          },
          {
            path: 'children-parent',
            component: () => import('@/pages/Communication/ChildrenParentTest/ChildrenParentTest'),
            meta: {
              isHideFooter: true
            },
          },
          {
            path: 'scope-slot',
            component: () => import('@/pages/Communication/ScopeSlotTest/ScopeSlotTest'),
            meta: {
              isHideFooter: true
            },
          }
        ],
      },
]