<template>
  <div class="pagination">
    <!-- 当返回0条数据和pageNo为2时，上一页同样要禁用 -->
    <button @click="$emit('changePageNo', pageNo - 1)" :disabled="pageNo === 1 || totalPage < 1">上一页</button>
    <button @click="$emit('changePageNo', 1)" v-show="startAndEnd.start > 1">1</button>
    <button v-show="startAndEnd.start > 2">...</button>
    <button
      @click="$emit('changePageNo', index + startAndEnd.start)"
      :class="{ active: pageNo === index + startAndEnd.start }"
      v-for="(item, index) in startAndEnd.end - startAndEnd.start + 1"
      :key="item"
    >
      {{ index + startAndEnd.start }}
    </button>
    <button v-show="startAndEnd.end < totalPage - 1">...</button>
    <button @click="$emit('changePageNo', totalPage)" v-show="startAndEnd.end < totalPage">{{ totalPage }}</button>
    <button @click="$emit('changePageNo', pageNo + 1)" :disabled="pageNo === totalPage || totalPage < 1">下一页</button>
    <span>共{{ total }}条</span>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["total", "pageNo", "pageSize", "coherent"],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },

    startAndEnd() {
      const { pageNo, coherent, totalPage } = this;
      let start, end;
      // 判断连贯页是否大于总页数
      if (coherent > totalPage) {
        start = 1;
        end = totalPage;
      } else {
        start = pageNo - Math.floor(coherent / 2);
        end = pageNo + Math.floor(coherent / 2);
        // 起始页小于1的处理
        if (start < 1) {
          start = 1;
          end = coherent;
        }
        // 结束页大于总页数的处理
        if (end > totalPage) {
          // 总页数 - 连贯页（18 - 5 + 1） 13 14 15 16 17 18
          start = totalPage - coherent + 1;
          end = totalPage;
        }
      }
      // console.log(start, end);
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #c81623;
      color: #fff;
    }
  }
  span {
    display: inline-block;
    line-height: 28px;
    font-size: 14px;
    color: gray;
    vertical-align: middle;
  }
}
</style>
