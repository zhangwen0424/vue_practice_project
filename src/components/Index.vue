<!--
 * @Date: 2022-02-16 14:09:15
 * @LastEditors: zhangwen
 * @LastEditTime: 2022-02-16 17:37:12
 * @FilePath: /vue_practice_project/src/components/Index.vue
-->
<template>
  <div class="container">
    <h4>选项卡(TabControl)</h4>
    <TabControl
      :tabs="[
        { id: 'login', title: '登陆' },
        { id: 'register', title: '注册' }
      ]"
      defaultValue="register"
    ></TabControl>
    <hr />
  </div>
</template>

<script>
import TabControl from "@/components/TabControl/TabControl";
export default {
  name: "Index",
  data() {
    return {
      msg: ""
    };
  },
  components: { TabControl },
  methods: {},
  mounted() {}
};
</script>

<style scoped lang="scss">
.container {
  text-align: left;
  hr {
    margin: 20px 0px;
    border-bottom: 1px solid #eee;
  }
}
</style>
