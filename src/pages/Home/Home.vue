<!--
 * @Date: 2022-02-10 16:53:19
 * @LastEditors: zhangwen
 * @LastEditTime: 2022-02-11 15:01:27
 * @FilePath: /vue_practice_project/src/pages/Home/Home.vue
-->
<template>
  <div>
    <HeaderTop title="闵行区宜山路1618号新意城T座"></HeaderTop>
  </div>
</template>

<script>
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
export default {
  name: "Home",
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
