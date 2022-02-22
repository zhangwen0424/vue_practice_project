<!--
 * @Date: 2022-02-10 16:53:19
 * @LastEditors: zhangwen
 * @LastEditTime: 2022-02-22 16:51:33
 * @FilePath: /vue_practice_project/src/pages/Home/Home.vue
-->
<template>
  <div>
    <HeaderTop title="闵行区宜山路1618号新意城T座">
      <template slot="left">
        <router-link to="/search" slot="left">
          <i class="iconfont icon-search"></i>
        </router-link>
      </template>
      <template v-slot:right>
        <router-link to="/login" v-if="!loginUser">
          登陆
        </router-link>
        <router-link to="/profile" v-else> 您好！{{ loginUser }} </router-link>
        <span v-if="!loginUser">|</span>
        <router-link to="/register" v-if="!loginUser">
          注册
        </router-link>
      </template>
    </HeaderTop>
  </div>
</template>

<script>
import { mapState } from "vuex";
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
// import·
export default {
  name: "Home",
  data() {
    return {
      // loginUser: ""
      // loginUser: this.$route.meta.loginUser || ""
    };
  },
  computed: {
    ...mapState("user", ["loginUser"])
  },
  components: { HeaderTop },
  methods: {},
  mounted() {
    // console.log(this);
    // this.loginUser = this.$route.meta.loginUser || "";
    // let user = localStorage.getItem("loginUser");
    // let time = localStorage.getItem("loginTime");
    // let now = new Date().valueOf();
    // if (!user || now - time > 10 * 1000) {
    //   this.loginUser = user;
    // } else {
    //   this.loginUser = "";
    // }
  }
};
</script>

<style scoped></style>
