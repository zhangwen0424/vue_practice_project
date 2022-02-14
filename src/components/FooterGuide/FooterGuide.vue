<!--
 * @Date: 2022-02-10 16:57:36
 * @LastEditors: zhangwen
 * @LastEditTime: 2022-02-14 18:22:24
 * @FilePath: /vue_practice_project/src/components/FooterGuide/FooterGuide.vue
-->
<template>
  <div>
    <mt-tabbar v-model="activedId" fixed>
      <mt-tab-item v-for="v of tabbars" :key="v.id" :id="v.id">
        <i :class="'iconfont icon-' + v.icon"></i>
        <div>{{ v.title }}</div>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: "FooterGuide",
  data() {
    return {
      activedId: "home",
      tabbars: [
        {
          id: "home",
          title: "首页",
          icon: "shop"
        },
        {
          id: "search",
          title: "搜索",
          icon: "search"
        },
        {
          id: "order",
          title: "订单",
          icon: "filedone"
        },
        {
          id: "profile",
          title: "我的",
          icon: "user"
        }
      ]
    };
  },
  computed: {},
  watch: {
    /**
     * 页签切换时，切换路由地址
     */
    // activedId(value){
    //   this.changeUrl('/'+value);
    // },
    activedId: {
      handler(value) {
          this.changeUrl("/" + value);
      },
      immediate: true
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
  },
  methods: {
    // 根据路由，获取选中的页签id
    getPath() {
      let index = this.$data.tabbars.find(tab => {
        return "/" + tab.id == this.$route.path;
      });
      // console.log("getPath",index.id)
      return index ? index.id : "";
    },
    // 切换路由
    changeUrl(path) {
      // console.log("changeUrl",path);
      console.log(this.$router);
      // debugger;
      this.$router.push({ path: path });
    }
  },
  mounted() {
    // console.log(this.$data);
    // this.$data.activedId = this.getPath() || 'home';
  }
};
</script>

<style scoped>
.iconfont {
  font-size: 25px;
}
</style>
