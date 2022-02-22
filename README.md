# vue_practice_project

[toc]

> vue 练习项目

## 遇到的问题

### 使用 mint-ui 首页加载样式闪烁

描述：刷新页面会展现 1s 样式乱掉的页面
原因： 项目中使用@import `@import "https://unpkg.com/mint-ui/lib/style.css"` 引入 mint-ui 样式，样式表 style.css 晚于 app.js 加载，出现样式渲染问题。
解决方案：在 main.js 中引入样式，会将样式文件前置，文件加载就应用样式文件。`import Mint from 'mint-ui'; import "mint-ui/lib/style.css"`

### 引入 nutui 后主题定制配置报错

描述： @vue/cli 4+版本创建的项目中，进行 nutui 主题颜色定制化提示 scss 文件未找到。main.js 中引入 scss 文件均报错。
原因：scss-loader 版本太高。
解决方案：
package.json 中加入下面代码后 cnpm i

```js
    "node-sass": "^4.14.1",
    "sass-loader": "^7.3.1",
```

## 项目启动

@vue/cli 脚手架工具
npm uninstall -g vue-cli 卸载旧版本 vue-cli 2 版本
npm i -g @vue/cli 使用 新版本
npm i -g @vue/cli-init 配置连接桥使用 vue-cli 2 版本的命令
vue -V 查看脚手架工具版本号
vue create vue_demo 快速创建 vue 项目

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

参考：<https://segmentfault.com/a/1190000012693158>

### json-server 模拟数据

node>12

1. yarn add json-server
2. 创建 db.json
3. 启动 mock 服务
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

### 页面拆分

vue-router 的理解和使用
router-view/router-link/keep-alive
$router: 路由器对象, 包含一些操作路由的功能函数, 来实现编程式导航(跳转路由)
    $route: 当前路由对象, 一些当前路由信息数据的容器, path/meta/query/params

#### 组件拆分

- 项目路由拆分

  - 底部导航组件: FooterGuide
  - 导航路由组件: Msite/Search/Order/Profile
  - 登陆路由组件: Login

- 抽取组件
  - 头部组件: HeaderTop, 通过 slot 来实现组件通信标签结构
  - 商家列表组件: ShopList
  - 标签页组件 FooterGuide 的显示/隐藏: 通过\$router.replace("跳转到的路由")

#### 字体图标引入

[阿里巴巴矢量图库]("https://www.iconfont.cn/?spm=a313x.7781069.1998910419.d4d0a486a")

- 新建项目
- 选择图标加入购物车
- 购物车图标添加到新建项目中
- 复制项目链接中图标地址到 vue 项目中的 index.html 中引入图标
- 通过 `<i class="iconfont icon-search"></i>`使用

#### UI 组件引入

移动端 UI 组件库

- mintui 组件少，功能少，滑动不灵敏
- mutui 京东风格 ui，支持 vue2,vue3,小程序

移动端 UI 组件

- 布局组件

  - Row 行
  - Col 列

- 导航组件

  - Header 顶部导航栏
  - Tabbar 底部标签栏
  - Navbar 导航选项卡

- 操作反馈组件

  - Notify 消息提示
  - Dialog 对话框

### 标签页切换和选中功能（FooterGuide）

```js
<mt-tabbar v-model="activedId" fixed>
watch: {
    /**
     * 页签切换时，切换路由地址
     */
    activedId(value){
      this.changeUrl('/'+value);
    },
    /**
     * 路由切换时更新页签
     */
    $route(to, from) {
      let path = this.getPath(to.path);
      if (path) {
        this.$data.activedId = path;
      }
    }
}
```

### 头部组件通信（HeaderTop）

slot 插槽

```vue
<!-- 放置插槽 -->
<slot name="left"></slot>
<!-- 使用插槽 -->
<template slot="left"></template>
<template v-slot:left></template>
```

### 登陆路由组件功能

**前端请求类型**

- multipart/form-data 处理表单，可上传文件或者键值对，因有键值对可以多文件上传
- application/x-www-from-urlencode 将表单数据转为键值对，name=mornki&age=20
- raw 可上传任意格式文本，text、json、xml、html 等文本格式
- binary 等同于 Content-Type:application/octet-stream 只可上传二进制数据，通常用来上传文件，因无键值一次只能上传一个文件

**input 自动聚焦**
放在 mounted 时，切换 tab 时无法自动聚焦。放在 beforeRouteEnter 中

```js
  beforeRouteEnter(to, from, next) {
    next(vm => {
      let $this = vm;
      $this.$refs.myInput.focus();
    });
```

**vuex 数据持久化**
Vuex 解决了多视图之间的数据共享问题。但是运用过程中又带来了一个新的问题是，Vuex 的状态存储并不能持久化。也就是说当你存储在 Vuex 中的 store 里的数据，只要一刷新页面，数据就丢失了。

引入 vuex-persist 插件，它就是为 Vuex 持久化存储而生的一个插件。不需要你手动存取 storage ，而是直接将状态保存至 cookie 或者 localStorage 中

```js
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import notify from "./modules/notify";
import user from "./modules/user";

// vuex 数据持久化
const vuexUser = new VuexPersist({
  key: "vuexUser", // string, 将状态存储在存储中的键。默认: 'vuex'
  storage: window.localStorage, //可传localStorage, sessionStorage, localforage 或者你自定义的存储对象. 接口必须要有get和set.  默认是: window.localStorage
  modules: ["user"] //string[], 要持久化的模块列表。
});

export default new Vuex.Store({
  modules: {
    notify, // 顶部提示栏
    user // 登陆用户
    // FooterGuide, //底部标签页
    // Common //公共状态
  },
  plugins: [vuexUser.plugin]
});
```

**vue-router 中获取 store 中的数据**

```js
import store from "../store";
router.beforeEach((to, from, next) => {
  console.log("store", store);
});
```

xhr 请求后端接口
