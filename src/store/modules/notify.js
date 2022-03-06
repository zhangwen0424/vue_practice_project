/*
 * 顶部提示栏
 * @Date: 2022-02-22 11:23:56
 * @LastEditors: zhangwen
 * @LastEditTime: 2022-03-06 14:25:14
 * @FilePath: /vue_practice_project/src/store/modules/notify.js
 */
import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex);

// 状态数据
const state = {
  // 顶部提醒框
  notifyShow: false,
  notifyType: "success",
  notifyMsg: "成功",
  // 配色
  $primary_color: "#26a2ff"
};
// 处理 state 中的数据
const getters = {};
// 响应组件中的动作
const actions = {};
// 修改 state，和 devtool 交互
const mutations = {
  SHOWNOTIFY(state, data) {
    // console.log("data", data);
    typeof data.notifyShow != "undefined" &&
      (state.notifyShow = data.notifyShow);
    typeof data.notifyType != "undefined" &&
      (state.notifyType = data.notifyType);
    typeof data.notifyMsg != "undefined" && (state.notifyMsg = data.notifyMsg);
    setTimeout(() => {
      state.notifyShow = false;
    }, 3000);
    return Promise.resolve();
  }
};

export default {
  namespaced: true, //开启命名空间
  state,
  getters,
  actions,
  mutations
};
