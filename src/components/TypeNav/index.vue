<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div class="nav-left" @mouseleave="handlerTypeNav(false)" @mouseenter="handlerTypeNav(true)">
        <h2 class="all">全部商品分类</h2>
        <div class="sort" v-show="isShowNav">
          <div class="all-sort-list2" @click="btnSearch">
            <div
              class="item"
              v-for="c1 in categoryListData.slice(0, 15)"
              :key="c1.categoryId"
            >
              <h3>
                <a :data-id1="c1.categoryId" :data-name="c1.categoryName">{{
                  c1.categoryName
                }}</a>
              </h3>
              <div class="item-list clearfix">
                <div class="subitem">
                  <dl
                    class="fore"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dt>
                      <a
                        :data-id2="c2.categoryId"
                        :data-name="c2.categoryName"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a
                          :data-id3="c3.categoryId"
                          :data-name="c3.categoryName"
                          >{{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
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
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "TypeNav",
  data() {
    return {
      isShowNav: true,
    };
  },
  computed: {
    ...mapState("home", ["categoryListData"]),
  },
  methods: {
    btnSearch(event) {
      let { id1, id2, id3, name} = event.target.dataset
      // console.log(event.target.dataset);
      if(name){
        let location = {name: "search"}
        let query = { categoryName: name}
        if(id1) query.category1Id = id1
        else if(id2) query.category2Id = id2
        else query.category3Id = id3

        location.query = query

        // 判断之前有没有params参数，合并参数
        location.params = this.$route.params
        // console.log(location);
        this.$router.push(location)
      }
    },
    // 鼠标进入或离开的事件函数
    handlerTypeNav(bool) {
      // 如果在search中，鼠标离开隐藏，在home组件中，鼠标离开不能隐藏
      if (!this.$route.meta.isShowTypeNav) {
        // 能进来就说明是search页面，search没有meta(!undefined = true)
        this.isShowNav = bool;
      }
    },
  },
  mounted(){
    // 页面是search就直接隐藏
    if(!this.$route.meta.isShowTypeNav){
      this.isShowNav = false
    }
  }
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
      border-top: 2px solid #e1251b;
      box-sizing: border-box;
      z-index: 999;
      cursor: pointer;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
            &:hover {
              background-color: #a9e;
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
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

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

          &:hover {
            .item-list {
              display: block;
            }
          }
        }

      }
    }
  }
}
</style>
