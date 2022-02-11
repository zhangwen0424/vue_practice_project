<!--
 * @Date: 2022-02-10 16:57:36
 * @LastEditors: zhangwen
 * @LastEditTime: 2022-02-11 16:56:13
 * @FilePath: /vue_practice_project/src/components/FooterGuide/FooterGuide.vue
-->
<template>
  <div>
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="home">首页</mt-tab-item>
      <mt-tab-item id="search">
        <i class="fas fa-search"></i>
        搜索</mt-tab-item
      >
      <mt-tab-item id="order">订单</mt-tab-item>
      <mt-tab-item id="profile">我的</mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: "FooterGuide",
  data() {
    return {
      selected: this.$route.path.replace('/','') || "home"
    };
  },
  watch: {
    selected(){
      console.log(this.$router)
      this.$router.replace('/'+this.$data.selected);
    }
  },
  methods: {},
  mounted() {}
};
</script>

<style scoped></style>
