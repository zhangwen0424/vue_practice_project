/*
 * 首页导航路由
 * /home
 * @Date: 2022-02-16 15:27:54
 * @LastEditors: zhangwen
 * @LastEditTime: 2022-02-16 15:40:28
 * @FilePath: /vue_practice_project/src/router/home.js
 */

import Home from "@/pages/Home/Home";

const homeRoute = [
  {
    path: "/",
    component: Home,
    meta: {
      title: "首页"
    }
  },
  {
    path: "/home",
    component: Home,
    meta: {
      title: "首页"
    }
  }
];

export default homeRoute;
