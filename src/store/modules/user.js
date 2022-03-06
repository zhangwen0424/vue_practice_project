/*
 * 登陆用户
 * @Date: 2022-02-22 13:13:42
 * @LastEditors: zhangwen
 * @LastEditTime: 2022-03-06 14:25:42
 * @FilePath: /vue_practice_project/src/store/modules/user.js
 */

import Vuex from "vuex";
import Vue from "vue";
import * as dayjs from "dayjs";

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
  async a_register({ commit }, userInfo) {
    userInfo.registerTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
    let result = await $login.reqRegister(userInfo);
    if (result.code == 0) {
      // 更新用户清单 userList
      let users = await $login.reqUserList();
      users && commit("USERS", users);
      return Promise.resolve({ code: 0, msg: "注册成功！" });
    } else {
      return Promise.resolve({ code: 1, msg: "注册失败！" });
    }
  },
  // 登陆发送异步请求
  async a_login({ commit }, userInfo) {
    let res = await $login.reqLogin(userInfo);
    if (res.code == 0) {
      userInfo.loginTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
      commit("LOGIN", userInfo);
      return Promise.resolve({ code: 0, msg: "登陆成功！" });
    } else {
      return Promise.resolve({ code: 1, msg: "登陆失败！" + res.msg });
    }
  }
};
const mutations = {
  /**
   * 获取用户列表数据
   * @param {*} state
   * @param {*} userList
   */
  USERS(state, userList) {
    state.userList = userList;
  },
  /**
   * 登陆
   * @param {*} state
   * @param {*} obj {account, password}
   */
  LOGIN(state, obj) {
    state.loginUser = obj.account;
    state.loginTime = obj.loginTime;
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
