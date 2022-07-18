<template>
  <div id="Test">
  本页面不使用
  </div>
</template>

<script>
export default {
  name: "Test",
  // 模板引入
  components: {},
  // 数据
  data() {
    return {
      time: "", //时间获取
    };
  },
  // 方法
  methods: {
   
  },
  // 创建后
  created() {

  },
  // 挂载后
  mounted() {},

  // 更新后
  updated() {},
  // 销毁
  beforeDestroy() {
  },
};
</script>

<style lang="less" scoped>
#Home {
  .breadcrumb {
    margin: 1rem;
  }
  .adminBox {
    display: flex;
    line-height: 6rem;
    justify-content: space-between;
    :nth-child(1) {
      font-size: 1.4rem;
    }
  }
}
</style>
