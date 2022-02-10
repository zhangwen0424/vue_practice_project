<!--
 * @Date: 2022-02-10 16:57:36
 * @LastEditors: zhangwen
 * @LastEditTime: 2022-02-10 17:35:12
 * @FilePath: /vue_practice_project/src/components/FooterGuide/FooterGuide.vue
-->
<template>
  <div>
    <mt-tabbar v-model="selected">
      <mt-tab-item id="home">首页</mt-tab-item>
      <mt-tab-item id="search">搜索</mt-tab-item>
      <mt-tab-item id="order">订单</mt-tab-item>
      <mt-tab-item id="profile">我的</mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      selected: "home"
    };
  },
  methods: {},
  mounted() {}
};
</script>

<style scoped></style>
