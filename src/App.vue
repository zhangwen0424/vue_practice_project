<template>
  <div>
    <!-- 顶部提醒框 -->
    <nut-notify
      :showPopup="notifyShow || false"
      :type="notifyType || 'success'"
      :msg="notifyMsg || '成功'"
    >
      <span>{{ notifyMsg }}</span>
    </nut-notify>

    <div id="app">
      <keep-alive :include="['Home']">
        <router-view></router-view>
      </keep-alive>

      <FooterGuide v-show="!$route.meta.hideTabbar"></FooterGuide>
    </div>
  </div>
</template>

<script>
import FooterGuide from "./components/FooterGuide/FooterGuide.vue";
import { mapState } from "vuex";
export default {
  name: "App",
  components: {
    FooterGuide
  },
  computed: {
    ...mapState("notify", ["notifyShow", "notifyType", "notifyMsg"])
  }
};
</script>

<style>
/* mint-ui组件样式 */
/* @import "https://unpkg.com/mint-ui/lib/style.css"; */
body {
  margin: 0px;
  padding: 0px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
  /* margin-top: 0px; */
}
.nut-notify {
  position: absolute;
  width: 100%;
}
.router-link-active,
a {
  text-decoration: none;
}
</style>
