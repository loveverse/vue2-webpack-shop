<template>
  <div class="spec-preview">
    <img ref="imgSmall" :src="skuInfo.skuDefaultImg" />
    <!-- 小图添加一个事件 -->
    <div class="event" @mousemove="move"></div>
    <div class="big">
      <img ref="imgBig" :src="skuInfo.skuDefaultImg" :style="{left: -2 * left + 'px', top: -2 * top + 'px'}" />
    </div>
    <div class="mask" :style="{left: left + 'px', top: top + 'px'}"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    name: "Zoom",
    computed: {
      ...mapGetters(["skuInfo"])
    },
    data(){
      return {
        left: 0,
        top: 0
      }
    },
    methods: {
      move(event){
        let x = event.offsetX - 100
        if(x < 0) x = 0
        if(x > 200) x = 200
        let y = event.offsetY - 100
        if(y < 0) y = 0
        if(y > 200) y = 200
        this.left = x
        this.top = y
      }
    },
    mounted(){
      // 接收兄弟组件传过来的数据（监听事件变化）
      this.$bus.$on('getImg', imgUrl => {
        // this.$nextTick(() => {
          // if(this.$refs.imgSmall){
            this.$refs.imgSmall.src = imgUrl
            this.$refs.imgBig.src = imgUrl
          // }
        // })
      })
    },
    // 组件销毁时移除事件
    beforeDestroy(){
      this.$bus.$off('getImg')
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>