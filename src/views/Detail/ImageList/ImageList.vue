<template>
  <div class="swiper-container">
    <swiper class="swiper-wrapper" :options="swiperOption">
      <swiper-slide
        class="swiper-slide"
        v-for="(item,index) in skuInfo.skuImageList"
        :key="item.id"
      >
        <img :src="item.imgUrl" :class="{active: currentImg === index}" @click="changeImg(item.imgUrl, index)" />
      </swiper-slide>
      <div class="swiper-button-next" slot="button-next"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
    </swiper>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ImageList",
  data(){
    return {
      swiperOption: {
        slidesPerView: "auto",
        // 设置前进后退按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        spaceBetween: 50
      },
      currentImg: ''
    }
  },
  computed: {
    ...mapGetters(["skuInfo"]),
  },
  methods: {
    changeImg(imgUrl, index){
      // 选中那个将索引赋值给currentImg,用来做active的显示
      this.currentImg = index
      // 需要修改兄弟组件里的属性（触发事件）
      this.$bus.$emit('getImg', imgUrl)

    }
  }
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 402px;

  .swiper-slide {
    width: 56px;
    height: 56px;
    padding: 0 12px;
    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }
  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }

  
}
</style>
