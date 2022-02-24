/*
 * @Date: 2022-02-17 16:02:55
 * @LastEditors: zhangwen
 * @LastEditTime: 2022-02-24 17:31:08
 * @FilePath: /vue_practice_project/src/api/login.js
 */
import { xhr } from "./xhr/axios";
import qs from "qs";

// 注册账号
const reqRegister = userInfo => {
  return xhr.post("/register", qs.stringify(userInfo));
  // return xhr.post("/register", "userName='admin'&pwd='admin'");
};
// 登陆账号
const reqLogin = ({ account, password }) => {
  return xhr.post("/login", account, password);
};
export { reqLogin, reqRegister };
