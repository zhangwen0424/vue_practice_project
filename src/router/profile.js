/*
 * 我的路由
 * /profile
 * @Date: 2022-02-16 15:37:19
 * @LastEditors: zhangwen
 * @LastEditTime: 2022-02-16 15:38:39
 * @FilePath: /vue_practice_project/src/router/profile.js
 */
import Profile from "@/pages/Profile/Profile";

const profileRoute = [
  {
    path: "/profile",
    component: Profile,
    meta: {
      title: "我的"
    }
  }
];
export default profileRoute;
