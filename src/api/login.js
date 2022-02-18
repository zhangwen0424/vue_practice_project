/*
 * @Date: 2022-02-17 16:02:55
 * @LastEditors: zhangwen
 * @LastEditTime: 2022-02-18 14:03:39
 * @FilePath: /vue_practice_project/src/api/login.js
 */
import { commonInstance as xhr } from "./xhr/axios";

// 注册账号
const register = () => {
  return xhr.get("/register");
};
export { register };
