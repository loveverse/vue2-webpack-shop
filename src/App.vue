<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./components/Header/Header.vue";
import Footer from "./components/Footer/Footer.vue";
import "@/assets/css/reset.css";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
};
</script>
<style scoped></style>
