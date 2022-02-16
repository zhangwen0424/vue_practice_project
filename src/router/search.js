/*
 * 搜索
 * /search
 * @Date: 2022-02-16 15:31:07
 * @LastEditors: zhangwen
 * @LastEditTime: 2022-02-16 15:41:19
 * @FilePath: /vue_practice_project/src/router/search.js
 */
import Search from "@/pages/Search/Search";

const searchRoute = [
  {
    path: "/search",
    component: Search,
    meta: {
      title: "搜索"
    }
  }
];

export default searchRoute;
