<!--
 * @Date: 2022-02-10 16:57:02
 * @LastEditors: zhangwen
 * @LastEditTime: 2022-02-11 16:56:42
 * @FilePath: /vue_practice_project/src/pages/Order/Order.vue
-->
<template>
  <div>
    <HeaderTop title="订单列表"></HeaderTop>
  </div>
</template>

<script>
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
export default {
  name: "Order",
  data() {
    return {
      msg: ""
    };
  },
  components: { HeaderTop },
  methods: {},
  mounted() {}
};
</script>

<style scoped></style>
