<!--
 * @Date: 2022-02-10 16:53:19
 * @LastEditors: zhangwen
 * @LastEditTime: 2022-02-14 13:06:36
 * @FilePath: /vue_practice_project/src/pages/Home/Home.vue
-->
<template>
  <div>
    <HeaderTop title="闵行区宜山路1618号新意城T座">
      <template slot="left">
        <router-link to="/search" slot="left">
          <i class="iconfont icon-search"></i>
        </router-link>
      </template>
      <template v-slot:right>
        <router-link to="/login">
          登陆
        </router-link>
        |
        <span>注册</span>
      </template>
    </HeaderTop>
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
