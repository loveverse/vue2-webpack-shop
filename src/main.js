import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import TypeNav from '@/components/TypeNav/index.vue';
import SwiperTemp from '@/components/SwiperTemp/index.vue';
import Pagination from '@/components/Pagination/index.vue';
import '@/mock/mockServe'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper)


Vue.config.productionTip = false;

// 全局注册TypeNav
Vue.component("TypeNav",TypeNav)
Vue.component("SwiperTemp", SwiperTemp)
Vue.component("Pagination", Pagination)

new Vue({
  router,
  store,
  render: (h) => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this;
  },
}).$mount("#app");
