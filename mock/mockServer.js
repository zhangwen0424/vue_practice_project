/*
 * @Date: 2022-02-10 14:46:49
 * @LastEditors: zhangwen
 * @LastEditTime: 2022-02-25 15:07:47
 * @FilePath: /vue_practice_project/mock/mockServer.js
 */
const express = require("express");
const Mock = require("mockjs");
const app = new express();
const fs = require("fs");
const bodyParse = require("body-parser");
const Resolve = require("path").resolve;

//设置跨域访问
app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

// 用于复杂对象正确解析
app.use(bodyParse.urlencoded({ extended: true }));

// 开放接口数据
fs.readFile(Resolve(__dirname, "./dataJSON/config.json"), "utf-8", function(
  err,
  data
) {
  if (err) {
    console.log(err);
  } else {
    let dataObj = JSON.parse(data);
    // conf.json 配置数据
    app.all("/", function(req, res) {
      res.json(dataObj);
    });
    // json 文件数据
    for (let key in dataObj) {
      console.log("url", dataObj[key].url);
      app.all(dataObj[key].url, function(request, response) {
        fs.readFile(
          Resolve(__dirname, "./dataJSON", dataObj[key].path),
          "utf-8",
          function(err, data) {
            if (err) {
              console.log(err);
            } else {
              response.json(Mock.mock(JSON.parse(data)));
            }
          }
        );
      });
    }
  }
});

const users_path = Resolve(__dirname, "./dataJSON/user/list.json");
// 注册用户
app.post("/register", async (req, res) => {
  let { account } = req.body;
  let users = fs.readFileSync(users_path);
  users = JSON.parse(users);
  let user = users.find(u => u.account == account);
  if (user) {
    Object.assign(user, req.body);
  } else {
    users.push(req.body);
  }
  fs.writeFileSync(users_path, JSON.stringify(users));
  res.json({ code: 0, data: req.body });
});
// 登陆用户
app.post("/login", async (req, res) => {
  let { account, password } = req.body;
  let users = fs.readFileSync(users_path);
  users = JSON.parse(users);
  let user = users.find(u => u.account == account);
  if (!user) {
    res.json({ code: 1, msg: "用户未注册!" });
  }
  if (user.password != password) {
    res.json({ code: 1, msg: "用户密码输入错误!" });
  }
  res.json({ code: 0, data: req.body });
});

app.listen("3000");
console.log("Home\nhttp://localhost:3000");
