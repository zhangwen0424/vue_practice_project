# vue_practice_project

[toc]

> vue练习项目

## 项目启动

``` bash
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

### json-server模拟数据

node>12
 1. yarn add json-server  
 2. 创建db.json
 3. 启动mock服务
    cd dbjson
    json-server --watch --port 3001 db.json 

### mock.js 模拟数据

[mockjs示例](http://mockjs.com/examples.html)

1. yarn add mockjs --save-dev
2. 创建 mock/db.js(commonjs引入 mockjs)
3. 启动 mock 服务
    cd mock
    json-server db.js

### 快捷指令

package.json 中输入：
```
"mock": "node_modules/.bin/json-server --watch mock/db.js --port 3000",
    "mockdev": "npm run mock & npm run dev",
```

