<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <!-- 控制Footer组件在login和register中不显示 -->
    <Footer v-show="!$route.meta.isHiddenFooter"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header/index.vue';
import Footer from "@/components/Footer/index.vue";
import "@/assets/css/reset.css";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted(){
    // 优化TypeNav组件里的请求重复（集中式数据管理）
    this.$store.dispatch("home/getCateGoryListData");
  }
};
</script>
<style>

</style>
