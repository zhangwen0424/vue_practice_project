/*
 * @Date: 2022-02-17 16:02:55
 * @LastEditors: zhangwen
 * @LastEditTime: 2022-02-25 15:06:08
 * @FilePath: /vue_practice_project/src/api/login.js
 */
import { xhr } from "./xhr/axios";
import qs from "qs";

// 注册账号
const reqRegister = userInfo => {
  return xhr.post("/register", qs.stringify(userInfo));
};
// 登陆账号
const reqLogin = userInfo => {
  return xhr.post("/login", qs.stringify(userInfo));
};
// 用户列表
const reqUserList = () => {
  return xhr.get("/user/list");
};
export { reqLogin, reqRegister, reqUserList };
