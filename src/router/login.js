/*
 * @Date: 2022-02-16 15:42:35
 * @LastEditors: zhangwen
 * @LastEditTime: 2022-02-16 15:44:25
 * @FilePath: /vue_practice_project/src/router/login.js
 */
import Login from "@/pages/Login/Login";

const loginRoute = [
  {
    path: "/login",
    component: Login,
    meta: {
      title: "登陆",
      hideTabbar: true
    }
  },
  {
    path: "/register",
    component: Login,
    meta: {
      title: "注册",
      hideTabbar: true
    }
  }
];
export default loginRoute;
