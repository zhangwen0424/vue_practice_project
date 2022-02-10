# vue_practice_project

[toc]

> vue 练习项目

## 项目启动

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 模拟数据和代理请求

参考：https://segmentfault.com/a/1190000012693158

### json-server 模拟数据

node>12

1.  yarn add json-server
2.  创建 db.json
3.  启动 mock 服务
    cd dbjson
    json-server --watch --port 3001 db.json

### mock.js 模拟数据

[mockjs 文档示例](http://mockjs.com/examples.html)

1. yarn add mockjs --save-dev
2. 创建 mock/db.js(commonjs 引入 mockjs)
3. 启动 mock 服务
   cd mock
   json-server db.js

### 快捷指令

package.json 中输入：

```
"mock": "node_modules/.bin/json-server --watch mock/db.js --port 3000",
"mockdev": "npm run mock & npm run dev",
```

### mockjs 热更新

启动： npm run mockServer
package.json 中 scripts 中配置：“mockServer”:"nodemon ./mock/mockServer.js"

配置文件目录

- mock
  - dataJSON
    - test
      - test.json
  - mockServer.js
- nodemon.json

mockServer.js

```
{
  "name":"mornki",
  "age":30,
  "sex":"girl"
}
```

test.json

```js
const express = require("express");
const Mock = require("mockjs");
const app = new express();
const fs = require("fs");
const Resolve = require("path").resolve;

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

app.listen("3000");
console.log("Home\nhttp://localhost:3000");
```

nodemon.json

```json
{
  "watch": ["./mock/"]
}
```

## 项目开发流程

### 页面结构拆分

vue-router 的理解和使用
router-view/router-link/keep-alive
$router: 路由器对象, 包含一些操作路由的功能函数, 来实现编程式导航(跳转路由)
    $route: 当前路由对象, 一些当前路由信息数据的容器, path/meta/query/params

1. 组件拆分

- 项目路由拆分
  - 底部导航组件: FooterGuide
  - 导航路由组件: Msite/Search/Order/Profile
  - 登陆路由组件: Login
- 抽取组件
  - 头部组件: HeaderTop, 通过 slot 来实现组件通信标签结构
  - 商家列表组件: ShopList

2. 组件切换

- 静态组件
- FooterGuide 的显示/隐藏: 通过路由的 meta

### 登陆路由组件功能
