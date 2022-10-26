<template>
  <div>
    <!-- 商品分类三层列表 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread 面包屑，带有x的结构的-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类面包屑 -->
            <li v-if="searchParams.categoryName" class="with-x">
              {{ searchParams.categoryName }}
              <i @click="removeCategoryName">x</i>
            </li>
            <!-- 关键字面包屑 -->
            <li v-if="searchParams.keyword" class="with-x">
              {{ searchParams.keyword }} <i @click="removeKeyword">x</i>
            </li>
            <li v-if="searchParams.trademark" class="with-x">
              {{ searchParams.trademark.split(":")[1] }}
              <i @click="removeTrademark($event)">x</i>
            </li>
            <li
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
              class="with-x"
            >
              {{ attrValue.split(":")[1] }}
              <i @click="removeAttrInfo(index)">x</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector
          @checkTradeMarkInfo="checkTradeMarkInfo"
          @attrInfo="attrInfo"
        />
        <!-- 自定义参数的第一个是子组件触发的名字，里边的是父组件执行逗得名 -->
        <!--details  -->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changSort(1)">
                  <!-- class只能单引号 -->
                  <a href="#"
                    >综合<span 
                      v-show="isOne"
                      class="iconfont"
                      :class="{
                        'icon-long-arrow-down': isDesc,
                        'icon-long-arrow-up': isAsc,
                      }"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: istwo }" @click="changSort(2)">
                  <a href="#"   class="iconfont"
                    >销量<span
                      v-show="istwo"
                      :class="{
                        'icon-long-arrow-down': isDesc,
                        'icon-long-arrow-up': isAsc,
                      }"
                    ></span
                  ></a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li> 
                  <a href="#">价格⬆</a>
                </li>
                <li>
                  <a href="#">价格⬇</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(goods, index) in goodsList"
                :key="goods.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="item.html" target="_blank">

                      <router-link :to="`/detail/${goods.id}`" >
                        <img v-lazy="goods.defaultImg"/>
                      </router-link>

                    </a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ goods.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <router-link class="sui-btn btn-bordered btn-danger" :to="`/detail/${goods.id}`">加入购物车</router-link>
      
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagination  :pageNo ='searchParams.pageNo' :pageSize = 'searchParams.pageSize' :total='total' :continues='5' @getpageNo="getpageNo" />
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import { remove } from "nprogress";
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  data() {
    return {
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        //关键字
        keyword: "",
        // 平台售卖属性
        props: [],
        // 品牌
        trademark: "",
        // 排序
        order: "1.Desc",
        // 当前页数
        pageNo: 1,
        // 没一页数据个数
        pageSize: 5,
      },
    };
  },
  components: {
    SearchSelector,
  },
  beforeMount() {
    // 在发送请求之前，把接口需要传递的参数，进行整理（整理好参数，服务器会返回查询到的数据）
    // Object.assign()拷贝的是属性值，如果源对象的属性值是一个指向对象的指针，
    // 那也只拷贝那个指针。所以如果对象的属性值为基础类型，对于通过Object.assign()拷贝的那个属性而言是深拷贝；
    // 如果对象的属性值为引用，对于通过通过Object.assign()拷贝的那个属性而言其实是浅拷贝的

    Object.assign(this.searchParams, this.$route.query, this.$route.params);

    console.log(this.searchParams);
  },
  mounted() {
    // 在发送信号前给参数【searchParams参数发生变化有数值带给服务器】
    // 给searchilist发post请求测试返回数据的类型
    this.getData();
  },
  methods: {
    getData() {
      this.$store.dispatch("searchVuex/getSearchList", this.searchParams);
    },
    // pus(){
    //   console.log(goodsList)
    // }
    // 重发数据清空id
    removeCategoryId() {
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
    },
    removeKeyword() {
      this.searchParams.keyword = undefined;
      this.removeCategoryId();
      this.getData();
      this.$bus.$emit("clear");
      if (this.$route.params) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
    },
    // 删除属性内容
    removeAttrInfo(index) {
      this.searchParams.props.splice(index, 1);
      this.getData();
    },
    //删除面包屑内容
    removeCategoryName() {
      // 虽然是undefind提高性能，因为id和name可有可无，即使属性值为空的字符串还是会吧相应指端返回给服务器
      this.searchParams.categoryName = undefined;
      this.removeCategoryId();
      this.getData();
      // 在当前路由下自己挑自己
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    checkTradeMarkInfo(trademark) {
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getData();
    },
    attrInfo(attr, attrValue) {
      let myprops = this.searchParams.props;
      let props = `${attr.attrId}:${attrValue}:${attr.attrName} `;
      if (myprops.indexOf(props)) {
        this.searchParams.props.push(props);
        this.getData();
      }
    },
    removeTrademark(event) {
      console.log(event);
      this.searchParams.trademark = undefined;
      this.getData();
    },
    changSort(flag){
      let originFlag = this.searchParams.order.split(':')[0]
      let originSort = this.searchParams.order.split(':')[1]
      console.log(originFlag)
      console.log(originSort)
      let neworder =  ''
      // 升序和降序变换
      if(flag == originFlag){
        neworder = `${originFlag}:${originSort == 'Desc'?'Asc':'Desc'}`
      }else{
        // 点击的是价格
        neworder = `${flag}:${'Desc'}`
      }
      console.log(neworder)
      this.searchParams.order = neworder
      this.getData()
    },
    getpageNo(pageNo){
      this.searchParams.pageNo = pageNo
      this.getData()
    }
  },
  computed: {
    ...mapState({
      searchList: (state) => state.searchVuex.searchList,
    }),
    // 该写法传递的是数组(开启命名空间后写法)
    ...mapGetters({ goodsList: "searchVuex/goodsList" }),
    // ...mapGetters(['goodsList'])
    isOne() {
      return this.searchParams.order.indexOf(1) != -1;
    },
    istwo() {
      return this.searchParams.order.indexOf(2) != -1;
    },
    isAsc() {
      return this.searchParams.order.indexOf("Asc") != -1;
    },
    isDesc() {
      return this.searchParams.order.indexOf("Desc") != -1;
    },
    ...mapState({
      total:(state) => state.searchVuex.searchList.total
    })
  },
  watch: {
    $route(oldvalue, newvalue) {
      this.removeCategoryId();
      // 再次发送信息需要再次整理
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      this.getData();
    },
  },
};
</script>
<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>