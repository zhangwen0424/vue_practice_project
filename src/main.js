// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import fastclick from "fastclick";

// 引入 Vuex 状态管理库
import store from "./store";
// 引入 UI 组件库
import "./plugins"

Vue.config.productionTip = false;

// 消除点击延迟(移动设备有 300ms 延迟响应点击事件)
fastclick.attach(document.body);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>",
  store
});
