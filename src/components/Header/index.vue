<template>
  <div>
    <header class="header">
      <!-- 头部的第一行 -->
      <div class="top">
        <div class="container">
          <div class="loginList">
            <p>花江汇欢迎您！</p>
            <p v-if="!userName" >
              <span>请</span>
              <router-link to="./Login">登录</router-link>
              <router-link class="register" to="./register">免费注册</router-link>
            </p>
            <!-- 登录后 -->
            <p v-else >
              <a > {{userName}}</a>
              <a class="register"></a>
              <a @click="logout">退出登录</a>
            </p>
          </div>
          <div class="typeList">
            <router-link to="/center" >我的订单</router-link>
            <router-link to="/ShopCart">我的购物车</router-link>
            <a href="###">我的花江汇</a>
            <a href="###">花江汇会员</a>
            <a href="###">企业采购</a>
            <a href="###">关注花江汇</a>
            <a href="###">合作招商</a>
            <a href="###">商家后台</a>
          </div>
        </div>
      </div>
      <!--头部第二行 搜索区域-->
      <div class="bottom">
        <h1 class="logoArea">
          <router-link class="logo" to="/home">
            <img src="@/assets/logo.png" alt="" />
          </router-link>
        </h1>
        <div class="searchArea">
          <form action="###" class="searchForm">
            <input
              type="text"
              id="autocomplete"
              class="input-error input-xxlarge"
              v-model="keyword"
            />
            <button
              class="sui-btn btn-xlarge btn-danger"
              type="button"
              @click="goSearch()"
            >
              搜索
            </button>
          </form>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      keyword: "",
      
    };
  },
  mounted() {
    // 通过全局总线在删除搜索栏面包屑时候删除搜索栏的内容
    this.$bus.$on('clear', ()=>{
      this.keyword = ''
    })
  },
  methods: {
    // 路由传参
    // 第一种 字符串形式
    goSearch() {
      // this.$router.push('/search/'+this.keyword+'?k='+this.keyword.toUpperCase())
      // 方式二 模板字符串
      // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
      //方式三 对象写法
      // this.$router.push({
      //   // params必须使用name形式，query可以使用path的形式
      //   name: "search",
      //   params: { keyword: this.keyword },
      // },);
      // 面试题 1、params能不能结合path一起用，不可以的，对象写法可以是path和那name但是两种方式都能用的是query
      //        2、如何设置params可以穿可以不穿，要求传递时候不传递的话路径会出现问题
      //          设置可传可以不传递的方式，在参数背后加一个问号
      //        3、params传递空的怎么办 并上undefined  params: { keyword: ''||undefined },
      //        4、路由组件能不能传递props数据
      //            可以在路由上写
      //              方式一 布尔值写法 props：true  只能传递params
      //              方式二 对象写法   props：{a:1,b:2} 额外传递一些参数
      //              方式三 函数写法   props:()=>{ return{keyword: $router.params.keyword , k:$route.query.k} }
       
      // 通过给push方法传递相应的回调可以解决警告问题
      console.log(this.$route.query)
      // 把有query的参数也传递过去
      if(this.$route.query){
        let location = {name:"search", params:{keyword:this.keyword || undefined } }
        location.query = this.$route.query
        this.$router.push(location)
         console.log(this.$route.params)
      }
    },
    // 退出登录
    async logout(){
      // 通知服务器退出登录，清楚一些token
      try {
        await this.$store.dispatch('UserLogout')
        // 跳转login 或者 home
        this.$router.push('/home')
      } catch (error) {
        
      }
      // 移除token(在厂库进行)
      
    }
  },
  computed:{
    // 用户名信息
    userName(){
      return this.$store.state.user.UserInfo.name
    }
  }
};
</script>

<style lang="less" scoped>
html{
  min-width: fit-content;
}
body{
  width: 100%;
}
.header {
   
  & > .top {
  
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;
        cursor: pointer;
        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>