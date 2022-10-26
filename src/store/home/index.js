
import { reqCategoryList, reqmock ,reqmockfloor} from "@/api/index"
export default {
    namespaced:true,
    actions:{
        // 通过封装的axios发请求得到数据需要引进
        // {commit}用于结构赋值把context中的commit直接赋给commit == context.commit
        async CategoryList({commit}){
            let result = await reqCategoryList()
            if(result.code==200){
                commit('CATEGORYLIST',result.data)
            }
        },
        async getBannerList({commit}){
            let result = await reqmock();

            if(result.code == 200){
                commit('BANNERLIST',result.banner)
            }
        },
        async getFloorList({commit}){
            let result = await reqmockfloor()
            if(result.code==200){
                commit('FLOORLIST',result.floor)
            }
        }
    },
    mutations:{
        // state 是路由中state的值
        CATEGORYLIST(state,CategoryList){
            state.CategoryList = CategoryList.slice(0,16)
            
        },
        BANNERLIST(state,BannerList){
            state.BannerList = BannerList
            // console.log(state.BannerList)
        },
        FLOORLIST(state,FloorList){
            state.FloorList = FloorList
        }
    },
    getters:{},
    state:{ 
        CategoryList:[],
        BannerList:[],
        FloorList:[]
    },
}