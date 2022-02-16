import Vue from "vue";
// import Mint from "mint-ui";
// 使用mint-ui插件
// Vue.use(Mint)
// mint-ui组件按需加载
import "mint-ui/lib/style.css";
import { Header, Navbar, Tabbar, TabItem } from "mint-ui";
Vue.component(Header.name, Header);
Vue.component(Navbar.name, Navbar);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
