/*
 * 自定义组件库路由
 * /component/tab
 * @Date: 2022-02-16 15:20:12
 * @LastEditors: zhangwen
 * @LastEditTime: 2022-02-16 15:44:28
 * @FilePath: /vue_practice_project/src/router/component.js
 */
import Index from "@/components/Index";

const componentRoute = [
  {
    path: "/component",
    component: Index,
    meta: {
      title: "组件库",
      hideTabbar: true
    }
  }
];

export default componentRoute;
