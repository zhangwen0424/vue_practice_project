<!--
 * @Date: 2022-02-10 16:57:17
 * @LastEditors: zhangwen
 * @LastEditTime: 2022-02-11 16:57:54
 * @FilePath: /vue_practice_project/src/pages/Profile/Profile.vue
-->
<template>
  <div>
    <HeaderTop title="我的"></HeaderTop>
  </div>
</template>

<script>
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
export default {
  name: "Profile",
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
