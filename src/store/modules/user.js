/*
 * @Date: 2022-02-22 13:13:42
 * @LastEditors: zhangwen
 * @LastEditTime: 2022-02-22 16:37:37
 * @FilePath: /vue_practice_project/src/store/modules/user.js
 */

import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

const state = {
  userList: {},
  loginUser: "",
  loginTime: ""
};
const getters = {};
const actions = {};
const mutations = {
  /**
   * 注册
   * @param {*} state
   * @param {*} obj {account, password}
   */
  REGISTER(state, obj) {
    state.userList[obj.account] = {
      password: obj.password,
      registerTime: new Date().valueOf()
    };
  },
  /**
   * 登陆
   * @param {*} state
   * @param {*} obj {account, password}
   */
  LOGIN(state, obj) {
    state.loginUser = obj.account;
    state.loginTime = new Date().valueOf();
    state.userList[obj.account].lastLogin = state.loginTime;
  },
  /**
   * 登出
   * @param {*} state
   * @param {*} obj
   */
  LOGOUT(state) {
    state.loginUser = "";
    state.loginTime = "";
  }
};

export default {
  namespaced: true, //开启命名空间
  state,
  getters,
  actions,
  mutations
};
