<!--
 * @Date: 2022-02-10 17:12:18
 * @LastEditors: zhangwen
 * @LastEditTime: 2022-02-18 18:09:52
 * @FilePath: /vue_practice_project/src/pages/Login/Login.vue
-->
<template>
  <div class="login-container">
    <nut-navbar :rightShow="false" @on-click-back="$router.back()">
      <span></span>
    </nut-navbar>

    <nut-row type="flex" justify="center">
      <nut-col :span="12">
        <div class="flex-content">
          <!-- <strong class="app_title">吃货外卖</strong> -->
          <strong class="app_title">GISI登陆</strong>
        </div>
      </nut-col>
    </nut-row>

    <nut-row type="flex" justify="center" class="tabs">
      <nut-col :span="24">
        <TabControl
          :tabs="tabs"
          :value="$route.path.replace('/', '')"
          :tabSwitch="tabSwitch"
        ></TabControl>
      </nut-col>
    </nut-row>

    <form action="">
      <nut-row type="flex" justify="center">
        <nut-col :span="20">
          <nut-textinput
            placeholder="手机/邮箱/用户名"
            v-model="form.account"
          ></nut-textinput>
        </nut-col>
      </nut-row>

      <nut-row type="flex" justify="center">
        <nut-col :span="20">
          <nut-textinput
            placeholder="密码"
            type="password"
            v-model="form.password"
          >
          </nut-textinput>
        </nut-col>
      </nut-row>

      <nut-row
        type="flex"
        justify="center"
        v-show="activedId == 'login' ? false : true"
      >
        <nut-col :span="20">
          <nut-textinput
            placeholder="确认密码"
            type="password"
            v-model="confirmPassword"
          ></nut-textinput>
        </nut-col>
      </nut-row>

      <nut-row type="flex" justify="center">
        <nut-col :span="20" class="comment">
          <span>
            温馨提示：未注册帐号请先注册
          </span>
        </nut-col>
      </nut-row>

      <nut-row type="flex" justify="center">
        <nut-col :span="20">
          <nut-button block type="primary" @click="handleClick">{{
            activedTitle
          }}</nut-button>
        </nut-col>
      </nut-row>
    </form>
  </div>
</template>

<script>
import HeaderTop from "@/components/HeaderTop/HeaderTop";
import TabControl from "@/components/TabControl/TabControl";
import * as $http from "@/api/login";
import { mapMutations } from "vuex";
export default {
  name: "Login",
  components: { HeaderTop, TabControl },
  data() {
    return {
      activedId: "",
      tabs: [
        {
          id: "login",
          title: "登陆"
        },
        {
          id: "register",
          title: "注册"
        }
      ],
      form: {
        account: "", //账户
        password: "" //密码
      },
      confirmPassword: "" //确认密码
    };
  },
  computed: {
    activedTitle() {
      return this.activedId == "login" ? "登陆" : "注册";
    }
  },
  methods: {
    ...mapMutations(["SHOWNOTIFY"]),
    // 选项栏切换
    tabSwitch(index) {
      // console.log("index", index);
      this.activedId = index.id;
      if (this.$route.path != "/" + index.id) {
        this.$router.push("/" + index.id);
      }
    },
    // 验证登陆注册
    checkClick() {
      return new Promise((resolve, reject) => {
        if (!this.form.account) {
          resolve("请输入账号！");
        }
        if (!this.form.password) {
          resolve("请输入密码！");
        }
        if (this.activedId == "register") {
          if (!this.form.password) {
            resolve("请输入确认密码！");
          }
          if (this.form.password != this.confirmPassword) {
            resolve("两次密码输入不匹配！");
          }
        }
        resolve();
      });
    },
    // 处理登陆注册
    async handleClick() {
      let check = await this.checkClick();
      let notify = {
        notifyShow: true
      };
      if (!check) {
        let res = await this[this.activedId](this.form);
        if (!res) {
          Object.assign(notify, {
            notifyType: "success",
            notifyMsg: this.activedTitle + "成功!"
          });
          this.$store.commit("Common/SHOWNOTIFY", notify);
          setTimeout(() => {
            this.$router.replace({
              path: "/" + (this.activedId == "login" ? "" : "login")
            });
            this.activedId == "register"
              ? (this.$data.activedId = "login")
              : "";
          }, 2500);
        } else {
          Object.assign(notify, {
            notifyType: "warning",
            notifyMsg: res
          });
          this.$store.commit("Common/SHOWNOTIFY", notify);
        }
      } else {
        Object.assign(notify, {
          notifyType: "warning",
          notifyMsg: check
        });
        this.$store.commit("Common/SHOWNOTIFY", notify);
      }
    },
    // 注册
    register(data) {
      return new Promise((resolve, reject) => {
        localStorage.setItem(
          data.account,
          JSON.stringify({
            password: data.password,
            registerTime: new Date().valueOf()
          })
        );
        resolve();
      });
    },
    // 登陆
    login(data) {
      return new Promise((resolve, reject) => {
        let user = localStorage.getItem(data.account);
        if (user) {
          user = JSON.parse(user);
          if (user.password != data.password) {
            resolve("密码输入错误！");
          } else {
            localStorage.setItem("loginUser", data.account);
            localStorage.setItem("loginTime", new Date().valueOf());
            resolve();
          }
        } else {
          resolve("用户未注册！");
        }
      });
    }
  },
  mounted() {
    this.$data.activedId =
      this.$route.path.indexOf("login") != -1 ? "login" : "register";
  }
};
</script>

<style lang="scss">
.login-container {
  .app_title {
    line-height: 120px;
    font-size: 40px;
    color: $primary-color;
  }
  .tabs {
    margin-bottom: 10px;
  }
  form > .nut-row {
    margin-bottom: 20px;
  }
  .comment {
    font-size: 14px;
    text-align: left;
    color: #a2a4a9;
  }
}
</style>
