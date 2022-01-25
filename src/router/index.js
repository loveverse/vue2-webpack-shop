import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);


// 原型上修改push方法
const originPush = VueRouter.prototype.push  // 先将之前的存储到一个变量当中
const originReplace = VueRouter.prototype.replace // 同上

// 修改VueRouter原型上的push 用于解决重复跳转时报错的问题
VueRouter.prototype.push = function(location,okCallBack,errCallBack){
  if(okCallBack === undefined && errCallBack === undefined){
    // 上面的判断成立的话，表示没有传递这两个参数
    originPush.call(this,location).catch(()=>{})  // 统一处理报错的问题 一劳永逸
  }else {
    originPush.call(this,location,okCallBack,errCallBack)
  }
}

// 修改VueRouter原型上的replace 用于解决重复跳转时报错的问题
VueRouter.prototype.replace = function(location,okCallBack,errCallBack){
  if(okCallBack === undefined && errCallBack === undefined){
    // 上面的判断成立的话，表示没有传递这两个参数
    originReplace.call(this,location).catch(()=>{})  // 统一处理报错的问题 一劳永逸
  }else {
    originReplace.call(this,location,okCallBack,errCallBack)
  }
}

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/login", component: import("@/views/Login/index.vue") },
  { path: "/register", component: import("@/views/Register/index.vue") },
  { path: "/home", component: import("@/views/Home/index.vue") },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
