import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 解决编程式导航报错
// https://github.com/vuejs/vue-router/issues/2881#issuecomment-520554378

// 在vue-router 3.1.0之后，编程式路由导航内部使用Promise语法，如果路由跳转时没有指定成功和失败回调函数，就返回一个Promise，且内部会判断，要跳转的路劲是否变化
// 没有变化，返回失败的Promise，变化，返回成功的Promise

/* 
  解决办法1：可以在跳转时指定成功和失败的回调函数，也可以使用catch处理错误。缺点：只能解决一时
  解决办法2：修改原型上的push和replace方法
*/

// 原型上修改push方法
const originPush = VueRouter.prototype.push  // 先将之前的存储到一个变量当中
const originReplace = VueRouter.prototype.replace // 同上

// 修改VueRouter原型上的push 用于解决重复跳转时报错的问题
VueRouter.prototype.push = function (location, okCallBack, errCallBack) {
  if (okCallBack === undefined && errCallBack === undefined) {
    // 上面的判断成立的话，表示没有传递这两个参数
    originPush.call(this, location).catch(() => { })  // 统一处理报错的问题 一劳永逸
  } else {
    originPush.call(this, location, okCallBack, errCallBack)
  }
}

// 修改VueRouter原型上的replace 用于解决重复跳转时报错的问题
VueRouter.prototype.replace = function (location, okCallBack, errCallBack) {
  if (okCallBack === undefined && errCallBack === undefined) {
    // 上面的判断成立的话，表示没有传递这两个参数
    originReplace.call(this, location).catch(() => { })  // 统一处理报错的问题 一劳永逸
  } else {
    originReplace.call(this, location, okCallBack, errCallBack)
  }
}

// 由于vue-loader版本太高，导致报错：Failed to mount component
// 解决方法：https://blog.csdn.net/suixaingjun/article/details/88798829
import Home from '@/views/Home/index.vue';
import Search from '@/views/Search/index.vue';
import Detail from '@/views/Detail/index.vue';
import AddCartSuccess from '@/views/AddCartSuccess/index.vue';


const routes = [
  { path: "/", redirect: "/home" },
  { path: "/login", component: import('@/views/Login/index.vue'), name: 'login', meta: { isHiddenFooter: true } },
  { path: "/register", component: import('@/views/Register/index.vue'), name: "register", meta: { isHiddenFooter: true } },
  // { path: "/home", component: import('@/views/Home/index.vue'), name: "home" },
  { path: "/home", component: Home, name: "home", meta: {isShowTypeNav: true} },
  { path: "/search", component: Search, name: 'search'},
  // props:会将之前传入的params参数用props接收
  {path: "/detail/:id", component: Detail, name: "detail", props: true},
  {path: "/addcartsuccess", component: AddCartSuccess, name: "addcartsuccess"}
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  // 让页面滚动到顶部
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});

export default router;
