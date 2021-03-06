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

### vue 集成 axios 之后，发送的 post 请求默认为 payload 方式

Axios 会自动将对象转化为 json 格式的字符串使用 application/json 的请求头向后端服务接口传递参数。而一般情况下，后端获取参数，请求头的需要是 application/www-x-form-urlencoded

一般 post 不允许发送复杂数据类型，比如 object 和 array，而 jquery 的 ajax 封装了这个方法，使得可以发送复杂数据格式，然而 vue 指定的 ajax 插件 axios 没有封装这样的功能.content-type 字段用于描述数据实体的类型，就是指定客户端要发送的数据类型

post 请求中常见的 content-type 的值有四种

- 1.application/x-www-form-urlencoded
  最常见的 post 的数据类型，也是表单提交的数据类型，jquery 的 ajax 默认也是这个
- 2.multipart/form-data
  文件上传时要使用的数据类型
- 3.application/json
  json 格式的数据类型，也是 axios 的默认类型
- 4.text/xml
  现在这个很少用了，基本没见过

axios 默认的数据类型为 application/json，一般后台不能接受到 post 的请求的信息体，就是因为不能正确识别 json 请求，只要修改一 下 content-type 就可以，

```js
headers: {
'Content-Type': 'application/x-www-form-urlencoded', //指定消息格式
}
```

### vue 项目启动 no such file or directory, scandir node-sass/vendor

cnpm rebuild node-sass

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

### 性能分析工具 webpack-bundle-analyzer

#### 安装

npm install webpack-bundle-analyzer –save-dev

#### 配置

//在 build/webpack.prod.config.js 中的 module.exports = webpackConfig 这句话的上面增加

```js
if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

// 该插件的默认配置，一般无需修改

new BundleAnalyzerPlugin({
  // 可以是`server`，`static`或`disabled`。
  // 在`server`模式下，分析器将启动 HTTP 服务器来显示软件包报告。
  // 在“静态”模式下，会生成带有报告的单个 HTML 文件。
  // 在`disabled`模式下，你可以使用这个插件来将`generateStatsFile`设置为`true`来生成 Webpack Stats JSON 文件。
  analyzerMode: "server",
  // 将在“服务器”模式下使用的主机启动 HTTP 服务器。
  analyzerHost: "127.0.0.1",
  // 将在“服务器”模式下使用的端口启动 HTTP 服务器。
  analyzerPort: 8888,
  // 路径捆绑，将在`static`模式下生成的报告文件。
  // 相对于捆绑输出目录。
  reportFilename: "report.html",
  // 模块大小默认显示在报告中。
  // 应该是`stat`，`parsed`或者`gzip`中的一个。
  // 有关更多信息，请参见“定义”一节。
  defaultSizes: "parsed",
  // 在默认浏览器中自动打开报告
  openAnalyzer: true,
  // 如果为 true，则 Webpack Stats JSON 文件将在 bundle 输出目录中生成
  generateStatsFile: false,
  // 如果`generateStatsFile`为`true`，将会生成 Webpack Stats JSON 文件的名字。
  // 相对于捆绑输出目录。
  statsFilename: "stats.json",
  // stats.toJson（）方法的选项。
  // 例如，您可以使用`source：false`选项排除统计文件中模块的来源。
  // 在这里查看更多选项：https： //github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
  statsOptions: null,
  logLevel: "info" // 日志级别。可以是'信息'，'警告'，'错误'或'沉默'。
});
```

#### 启动

npm run build --report

### vuex 中模块自动导入工具

利用 webpack 中的 require.context

语法: require.context(directory, useSubdirectories = false, regExp = /^.//);

- directory {String} -读取文件的路径
- useSubdirectories {Boolean} -是否遍历文件的子目录
- regExp {RegExp} -匹配文件的正则

```js
// 前端 vuex 中的 modules 自动导入
const files = require.context("./modules", false, /\.js\$/);
const modules = {};
files.keys().forEach(key => {
  files(key).default &&
    (modules[key.replace(/(\.\/|\.js)/g, "")] = files(key).default);
});
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

**引入 moment.js 日期插件**
yarn add moment --save-dev
main.js 中引入 moment.js

```js
import moment from "moment";
Vue.prototype.$moment = moment;
```

**引入 dayjs 日期插件**
大小只有 2kb，相比较与 moment.js 更轻量
yarn add dayjs -D

**xhr 请求后端接口**
跨域设置代理

```js
devServer: {
    proxy: config.dev.proxyTable,
}

proxyTable: {
      "/api": {
        pathRewrite: { "^/api": "/" }, //请求路径是否需要重写，这里是指是否要去掉/api，放在前面才生效
        target: "http://localhost:3000",
        changeOrigin: true // 支持跨域,用于控制请求头中的host值
      }
  },
```

**vuex 中 action 中请求结果通知 vue**

1. vuex 中 action 可以通过 this.\_vm 访问 vue 实例
2. vuex 中 action 返回 Promise 对象，vm 中通过 then 获取结果。

```js
acitons = {
  a_login() {
    return Promise.resolve("处理结果");
  }
};
method{
  async login(){
    let res = await this.a_login()
    console.log(res);
  }
}
```
