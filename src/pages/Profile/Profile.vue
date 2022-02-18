<!--
 * @Date: 2022-02-10 16:57:17
 * @LastEditors: zhangwen
 * @LastEditTime: 2022-02-18 18:30:14
 * @FilePath: /vue_practice_project/src/pages/Profile/Profile.vue
-->
<template>
  <div>
    <HeaderTop title="我的"></HeaderTop>

    <nut-row>
      <nut-cell :is-link="true" link-url="/login" :show-icon="true">
        <div slot="avatar"><nut-avatar></nut-avatar></div>
        <span slot="title">登陆|注册</span>
        <span slot="sub-title">暂无绑定手机号</span>
        <nut-icon
          type="right"
          slot="icon"
          color="#848484"
          size="small"
        ></nut-icon
      ></nut-cell>
    </nut-row>
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

<style scoped>
.login {
  height: 50px;
}
</style>
