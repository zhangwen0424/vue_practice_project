// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import fastclick from 'fastclick'

// mint-ui组件按需加载
// import { Header } from 'mint-ui'
// Vue.component(Header.name, Header)

Vue.config.productionTip = false
// 使用mint-ui插件
Vue.use(Mint)
// 消除点击延迟
fastclick.attach(document.body);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
