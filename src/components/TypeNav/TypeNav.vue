<template>
  <div>
    <div class="type-nav">
      <div class="container">
        <div @mouseleave="leaveIndex" @mouseenter="enSearch">
          <h2 class="all">全部商品分类</h2>
          <transition name='sort' >
            <div class="sort" v-show="show">
              <!-- 事件的委派 -->
              <div class="all-sort-list2" @click="getSearch">
                <div
                  class="item"
                  v-for="(c1, index) in CategoryList"
                  :key="c1.categoryId"
                   @mouseover="ChangeIndex(index)"
                 
                >
                  <h3  :class="{ cul: currentIndex == index }">
                    <!-- 自定义属性要加data 这ES5 -->
                    <a
                      :data-categoryName="c1.categoryName"
                      :data-category1Id="c1.categoryId"
                    >
                      {{ c1.categoryName }}
                    </a>
                  </h3>
                  <div
                    class="item-list clearfix"
                    :style="{
                      display: currentIndex == index ? 'block' : 'none',
                    }"
                  >
                    <div
                      class="subitem"
                      v-for="(c2, index) in c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dl class="fore">
                        <dt>
                          <a
                            :data-categoryName="c2.categoryName"
                            :data-category2Id="c2.categoryId"
                          >
                            {{ c2.categoryName }}
                          </a>
                        </dt>
                        <dd>
                          <em
                            v-for="(c3, index) in c2.categoryChild"
                            :key="c3.categoryId"
                          >
                            <a
                              :data-categoryName="c3.categoryName"
                              :data-category3Id="c3.categoryId"
                            >
                              {{ c3.categoryName }}
                            </a>
                          </em>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <nav class="nav">
          <a href="###">服装城</a>
          <a href="###">美妆馆</a>
          <a href="###">尚品汇超市</a>
          <a href="###">全球购</a>
          <a href="###">闪购</a>
          <a href="###">团购</a>
          <a href="###">有趣</a>
          <a href="###">秒杀</a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import "animate";
import { mapState } from "vuex";
// 按需引入节流插件
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: "-1",
      show: true,
    };
  },
  methods: {
    ChangeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    leaveIndex() {
      if (this.$route.path != "/home") {
        this.show = false;
      }
      this.currentIndex = -1;
    },
    // 使用声明式导航由于循环出多个组件，会出现卡顿现象
    // 最好的就是编程式导航 + 事件委派 （存在问题）  由于有多个字节点， 那么如何确定点击的是a标签（且是几级a标签）然后再进行跳转呢
    getSearch1(event) {
      // 解决问题一 给 a标签定义一个属性值 解决问题二 依旧是给a标签定义一个属性值
      // 节点有一个属性dataset，可以获得节点的自定义属性信息
      let element = event.target;
      // 注意浏览器会把自定义属性的名字改为全部小写
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      if (categoryname) {
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1id = category1id;
        } else if (category2id) {
          query.category2id = category2id;
        } else {
          query.category3id = category3id;
        }
        if (this.$route.params) {
          // 把用户搜索栏里的值params传过来
        location.query = query;
          //params
          location.params = this.$route.params;
          //如有有params参数也需要携带给search模块
          //home->search确实需要记录历史
          //search->search不需要存储历史记录
          // 命令式导航
          if (this.$route.path != "/home") {
            this.$router.replace(location);
          } else {
            this.$router.push(location);
          }
        }
        // location.query = query;
        // // console.log(location);
        // this.$router.push(location)
      }
    },
        getSearch(event) {
      //点击a标签进行路由跳转：父节点代理的子节点的类型很多 div h3 dd dt em a
      //通过event可以获取到当前触发事件的节点
      let nodeElement = event.target;
      //给a标签添加自定义属性data-categoryName，保证这个节点带data-categoryName，一定是a标签
      //可以通过节点的dataset属性获取相应节点的自定义属性，返回的是一个对象KV【自定义属性相关的】
      //如果带有categoryname字段的一定是a标签
      let { categoryname, category1id, category2id, category3id } =
        nodeElement.dataset;
      //执行if语句：只能区分点击的标签是不是a
      if (categoryname) {
        //准备路由跳转的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        //一级分类的a标签
        if (category1id) {
          query.category1Id = category1id;
          //二级分类的a标签
        } else if (category2id) {
          query.category2Id = category2id;
          //三级分类a标签
        } else {
          query.category3Id = category3id;
        }
        //路由跳转之前：看一下有没有params参数，如果有params参数需要携带给search
        if (this.$route.params) {
          //query参数
          location.query = query;
          //params
          location.params = this.$route.params;
          //如有有params参数也需要携带给search模块
          //home->search确实需要记录历史
          //search->search不需要存储历史记录
          if (this.$route.path != "/home") {
            this.$router.replace(location);
          } else {
            this.$router.push(location);
          }
        }
      }
    },
    enSearch() {
      this.show = true;
    },
  },
  mounted() {
    this.$store.dispatch("homeVuex/CategoryList");
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  
  computed: {
    // 使用对象写法，右侧可以需要一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
    // 注入一个参数state，其实就是大仓库的数据
    ...mapState({ CategoryList: (state) => state.homeVuex.CategoryList }),
    // ...mapState({CategoryList:'homeVuex/state.CategoryList'})
  },
};
</script>

<style lang="less" scoped>

.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;
    


    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
   
      .all-sort-list2 {
        .item {
          h3 {
            line-height: 28px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
              display: block;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 70px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 570px;
                  padding: 3px 0 0;
                  // overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cul {
          background-color: skyblue;
        }
      }
    }
    .sort-enter {
      height: 0;
      opacity: 0;
      width: 0;  

    }
    .sort-enter-to{
      height: 460px;
      width: 200px;
      opacity: 1;
    }
    .sort-enter-active{
      transition:all .5s linear;
      // 防止字体提前出现
      overflow: hidden;
    }
  }
}
</style>>
