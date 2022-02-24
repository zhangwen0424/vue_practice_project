/*
 * @Date: 2022-02-22 13:13:42
 * @LastEditors: zhangwen
 * @LastEditTime: 2022-02-24 17:31:10
 * @FilePath: /vue_practice_project/src/store/modules/user.js
 */

import Vuex from "vuex";
import Vue from "vue";
import moment from "moment";

Vue.use(Vuex);

import { $login } from "@/api";

const state = {
  userList: {},
  loginUser: "",
  loginTime: ""
};
const getters = {};
const actions = {
  // 注册发送异步请求
  a_register({ commit }, userInfo) {
    userInfo.registerTime = moment().format("YYYY-MM-DD HH:mm:ss");
    let result = $login.reqRegister(userInfo);
    if (result.code == 0) {
      commit(REGISTER, userInfo);
    }
  }
};
const mutations = {
  /**
   * 注册
   * @param {*} state
   * @param {*} obj {account, password}
   */
  REGISTER(state, obj) {
    state.userList[obj.account] = {
      password: obj.password,
      registerTime: moment().format("YYYY-MM-DD HH:mm:ss")
    };
  },
  /**
   * 登陆
   * @param {*} state
   * @param {*} obj {account, password}
   */
  LOGIN(state, obj) {
    if (state.userList[obj.account]) {
      state.loginUser = obj.account;
      state.loginTime = moment().format("YYYY-MM-DD HH:mm:ss");
      state.userList[obj.account].lastLogin = state.loginTime;
    }
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
