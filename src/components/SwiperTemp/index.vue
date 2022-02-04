<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide v-for="item in repeatData" :key="item.id">
        <img :src="item.imgUrl" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: "SwiperTemp",
  props: ["repeatData"],
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        // 设置分页器
        pagination: {
          el: ".swiper-pagination",
          // 设置点击可切换
          clickable: true,
        },
        // 设置前进后退按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        // 设置自动轮播
        autoplay: {
          delay: 3000, // 5秒切换一次
        },
        // 设置轮播可循环
        loop: true,
      },
    };
  },
};
</script>

<style lang="less" scoped></style>
