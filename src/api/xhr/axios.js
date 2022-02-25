/*
 * @Date: 2022-02-17 14:39:22
 * @LastEditors: zhangwen
 * @LastEditTime: 2022-02-25 13:53:28
 * @FilePath: /vue_practice_project/src/api/xhr/axios.js
 */

import axios from "axios";
import qs from "qs";
import { Toast } from "@nutui/nutui";

// axios post 请求后端 body 中接收不到数据
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";
// axios.defaults.withCredentials = true;

const baseURL = "/api";

// 创建 axios 实例，方便统一管理
const xhr = axios.create({
  baseURL: baseURL,
  timeout: 10000
});

// 请求拦截器
xhr.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么（可以在这里给头部添加token）
    // console.log("axios请求拦截器的config：",config);
    // if(sessionStorage.getItem("token")){
    //   config.headers.access_token = sessionStorage.getItem("token")
    // }
    return config;
  },
  err => {
    // 对请求错误做些什么
    console.log("请求错误:", error);

    return Promise.reject(error);
  }
);

// 响应拦截器
xhr.interceptors.response.use(
  response => {
    /**
     * 对响应数据判断:
     *  如果成功返回数据，就通过return把数据返出去
     *  如果请求不成功，就在拦截器这里统一处理（组件的代码就不用关注错误的情况了）
     */
    return response.data;
  },
  error => {
    console.log("响应错误:", error);
    Toast.fail("操作失败！");
    return Promise.reject(error);
  }
);

export { xhr };
