/*
 * @Date: 2022-01-27 17:58:06
 * @LastEditors: zhangwen
 * @LastEditTime: 2022-02-10 14:37:29
 * @FilePath: /vue_practice_project/mock/db.js
 */
const Mock = require("mockjs");
// 数据源
// const user = require("user");

const demo = Mock.mock({
  "array|10": [{
    id: "@id",
    name: "@cname",
    "age|18-25": 22,
    url: "@url",
    sex: "girl",
    birthday:"@date('yyyy-mm-dd')",
    "sort|+1":1, 
  }]
});

module.exports = function() {
  return {
    demo
  };
};
