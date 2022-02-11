<template>
  <div id="app">
    <!-- 头部 -->
    <!-- <mt-header fixed key="" :title="$route.meta.title">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
        <mt-button @click="handleClose">关闭</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header> -->
    <!-- 内容 -->
    <!-- <router-view/> -->
    <!-- 底部 -->
    <router-view></router-view>
    <FooterGuide keep-alive></FooterGuide>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
export default {
  name: 'App',
  components: {
    FooterGuide,
  }
}
</script>

<style>
/* mint-ui组件样式 */
@import "https://unpkg.com/mint-ui/lib/style.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
