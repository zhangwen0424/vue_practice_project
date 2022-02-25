<!--
 * @Date: 2022-02-10 16:53:19
 * @LastEditors: zhangwen
 * @LastEditTime: 2022-02-25 15:31:08
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

    <nut-row>
      <nut-swiper
        direction="horizontal"
        :loop="false"
        :autoPlay="2000"
        :paginationVisible="true"
        :swiperData="swiperData"
      >
        <div class="nut-swiper-slide gray">
          <span>page 1</span>
        </div>
        <div class="nut-swiper-slide gray_1">
          <span>page 2</span>
        </div>
        <div class="nut-swiper-slide gray">
          <span>page 3</span>
        </div>
        <div class="nut-swiper-slide gray_1">
          <span>page 4</span>
        </div></nut-swiper
      >
    </nut-row>
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
      category: [],
      // loginUser: ""
      // loginUser: this.$route.meta.loginUser || ""
    };
  },
  computed: {
    ...mapState("user", ["loginUser"])
  },
  components: { HeaderTop },
  methods: {},
  mounted() {}
};
</script>

<style scoped></style>
