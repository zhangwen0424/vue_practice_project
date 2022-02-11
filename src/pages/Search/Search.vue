<!--
 * @Date: 2022-02-10 16:55:21
 * @LastEditors: zhangwen
 * @LastEditTime: 2022-02-11 16:43:34
 * @FilePath: /vue_practice_project/src/pages/Search/Search.vue
-->
<template>
  <div>
    <HeaderTop title="搜索"></HeaderTop>
  </div>
</template>

<script>
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
export default {
  name: "Search",
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
