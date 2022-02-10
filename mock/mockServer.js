/*
 * @Date: 2022-02-10 14:46:49
 * @LastEditors: zhangwen
 * @LastEditTime: 2022-02-10 15:45:44
 * @FilePath: /vue_practice_project/mock/mockServer.js
 */
const express = require("express");
const Mock = require("mockjs");
const app = new express();
const fs = require("fs");
const Resolve = require("path").resolve;

// 开放接口数据
fs.readFile(Resolve(__dirname,'./dataJSON/config.json'), 'utf-8', function(err, data){
  if(err){
    console.log(err)
  } else {
    let dataObj = JSON.parse(data);
    // conf.json 配置数据
    app.all('/', function(req, res){
      res.json(dataObj)
    })
    // json 文件数据
    for(let key  in dataObj){
      console.log("url",dataObj[key].url)
      app.all(dataObj[key].url, function(request, response){
        fs.readFile(Resolve(__dirname, './dataJSON',dataObj[key].path), 'utf-8', function(err, data) {
          if(err) {
            console.log(err);
          } else {
            response.json(Mock.mock(JSON.parse(data)));
          }
        })
      })
    }
  }
});

app.listen("3000");
console.log("Home\nhttp://localhost:3000")