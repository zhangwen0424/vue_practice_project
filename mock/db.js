/*
 * @Date: 2022-01-27 17:58:06
 * @LastEditors: zhangwen
 * @LastEditTime: 2022-01-27 18:08:44
 * @FilePath: /vue_practice_project/mock/db.js
 */
const Mock = require("mockjs");
// 数据源
// const user = require("user");

const demo = Mock.mock({
  name: "mornki",
  "age|18-25": 22,
  sex: "girl"
});

module.exports = function() {
  return {
    demo
  };
};
