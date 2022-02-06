<template>
  <div class="outer">
    <!-- 三级分类导航 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--面包屑导航-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <span href="#">全部结果</span>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-show="searchParams.categoryName">
              {{ searchParams.categoryName }}<i @click="delCategoryName">×</i>
            </li>
            <li class="with-x" v-show="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="delKeyword">×</i>
            </li>
            <li class="with-x" v-show="searchParams.trademark">
              {{ trademarkName }}<i @click="delTrademark">×</i>
            </li>
            <li
              class="with-x"
              v-for="(item, index) in searchParams.props"
              :key="item.id"
            >
              {{ item | formatPropName }}<i @click="delProp(index)">×</i>
            </li>
          </ul>
        </div>

        <!-- 搜索器 -->
        <SearchSelector
          @getTrademark="addTrademarkToCrumbs"
          @getAttr="addAttrToCrumbs"
        />

        <!--商品展示区-->
        <div class="details clearfix">
          <!-- 列表操作区 -->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- 这里需要传一个字符串，后面切割出来是个字符 -->
                <li class="" @click="handlerOrder('1')">
                  <a href="javascript:void(0);">综合<span>{{upAndDown? "⬆":"⬇"}}</span></a>
                </li>
                <li class="" @click="handlerOrder('2')">
                  <a href="javascript:void(0);">价格<span>{{upAndDown? "⬆":"⬇"}}</span></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="item in goodList" :key="item.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="javascript:void(0);"
                      ><img :src="item.defaultImg"
                    /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ item.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a href="javascript:void(0);" :title="item.title">{{
                      item.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="javascript:void(0);"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器: 总条数、当前页、每页展示数、连贯页 -->
          <Pagination :total="searchInfo.total" :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :coherent="5" @changePageNo="changePageNo"></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector";

export default {
  name: "Search",
  components: {
    SearchSelector,
  },
  computed: {
    ...mapGetters(["goodList"]),
    ...mapState("search", ["searchInfo"]),
    trademarkName() {
      const { trademark } = this.searchParams;
      return trademark ? trademark.split(":")[1] : "";
    },
    upAndDown(){
      //1: 综合,2: 价格 asc: 升序,desc: 降序
      
      return this.searchParams.order.split(":")[1] === "asc"
    }
  },
  filters: {
    formatPropName(rawPropName) {
      const nameAttr = rawPropName.split(":");
      // 不需要第一位的属性id
      return nameAttr[2] + ":" + nameAttr[1];
    },
  },
  data() {
    return {
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        props: [], // 商品属性
        trademark: "",
        // 综合升序
        order: "1:asc", // 排序方式
        /* searchInfo默认返回
          pageNo: 1
          pageSize: 10
          total: 195
          totalPages: 20 */
        // 这两个必须携带
        pageNo: 1, // 当前页
        pageSize: 5, // 一页显示数
      },
      synthesize: true,
      price: true,
    };
  },
  methods: {
    // 将 getSearchInfo 映射为 this.$store.dispatch("search/getSearchInfo", this.searchParams)
    // 解决代码冗余（调用异步的函数）
    ...mapActions("search", ["getSearchInfo"]),
    // 移除导航项
    delCategoryName() {
      /* 
				1.将当前对应面包屑数据删除掉
				2.重新发送请求，搜索数据
				3.浏览器的路径需要变化，不然刷新数据就回来了
			*/
      const { keyword } = this.$route.query;
      this.$router.push({
        name: "search",
        query: { keyword },
      });
    },
    // 移除关键词
    delKeyword() {
      const { query } = this.$route;
      this.$router.push({
        name: "search",
        query: {
          ...query,
          keyword: undefined, // 路由会将值为undefined的参数过滤掉
        },
      });
      // 触发事件，清空文本框
      this.$bus.$emit("delKeyword");
    },
    // 添加品牌到面包屑上
    addTrademarkToCrumbs(item) {
      this.searchParams.trademark = `${item.tmId}:${item.tmName}`;
      this.getSearchInfo(this.searchParams);
    },
    // 移除品牌
    delTrademark() {
      this.searchParams.trademark = undefined;
      this.getSearchInfo(this.searchParams);
    },
    // 添加售卖属性
    addAttrToCrumbs({ item, attr }) {
      // 根据接口要求 需要 属性id:属性值:属性名
      const prop = `${item.attrId}:${attr}:${item.attrName}`;
      // 避免多次重复添加,没有prop就添加
      if (!this.searchParams.props.includes(prop)) {
        this.searchParams.props.push(prop);
        // console.log(this.searchParams);
        this.getSearchInfo(this.searchParams);
      }
    },
    // 移除售卖属性
    delProp(index) {
      this.searchParams.props.splice(index, 1);
      this.getSearchInfo(this.searchParams);
    },
    // 改变当前页
    changePageNo(currentPage) {
      // console.log(currentPage);
      this.searchParams.pageNo = currentPage;
      this.getSearchInfo(this.searchParams);
    },
    // 点击的是综合还是价格
    handlerOrder(num){
      let [oldNum, oldType] = this.searchParams.order.split(":")
      // 默认是在综合升序
      if(oldNum === num){
        this.price = false
        if(this.synthesize){
          this.searchParams.order = `${oldNum}:${oldType === "asc"? "desc": "asc"}`
        }else{
          this.searchParams.order = `${oldNum}:${oldType}`
        }
        this.price = true
      }else{
        // 点第一次过来，直接升序排序，点第二次为降序
        this.synthesize = false
        if(this.price){
          this.searchParams.order = `${num}:${oldType === "asc"? "desc": "asc"}`
        }else{
          this.searchParams.order = `${num}:${oldType}`
        }
        this.synthesize = true
      }
      console.log(this.searchParams.order);
      this.getSearchInfo(this.searchParams)
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        // 三级分类不可能同时将真正的数据一并发送给服务器，只能是有一个带着分类名称发给服务器
        Object.assign(this.searchParams, {
          category1Id: undefined,
          category2Id: undefined,
          category3Id: undefined,
          categoryName: undefined,
          keyword: undefined,
        });

        // 把路由传递过来的参数整合到searchParams中，供后面发送请求使用
        Object.assign(this.searchParams, this.$route.query);

        this.getSearchInfo(this.searchParams);
      },
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
                    margin-left: 5px;
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
    }
  }
}
</style>
