<!--
 * @Date: 2022-02-16 14:06:31
 * @LastEditors: zhangwen
 * @LastEditTime: 2022-02-18 13:49:45
 * @FilePath: /vue_practice_project/src/components/TabControl/TabControl.vue
-->
<template>
  <div :class="['TabControl']">
    <div
      :class="[
        'tab-default',
        activedId == v.id ? 'tab-active' : '' //激活样式
      ]"
      v-for="v of tabs"
      :id="v.id"
      :key="v.id"
      @click="changTab(v)"
    >
      <strong>{{ v.title }}</strong>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      activedId: ""
    };
  },
  watch: {
    value(value) {
      this.activedId = value;
    }
  },
  props: {
    //  激活项
    value: String,
    // 选项
    tabs: {
      type: Array,
      default: () => {
        return [
          { id: 1, title: "选项 1" },
          { id: 2, title: "选项 2" }
        ];
      }
    },
    // 选项回调
    tabSwitch: Function
  },
  methods: {
    changTab(v) {
      this.$data.activedId = v.id;
      this.tabSwitch(v);
    }
  },
  mounted() {
    this.$data.activedId = this.value ? this.value : this.tabs[0].id;
  }
};
</script>

<style scoped lang="scss">
.TabControl {
  text-align: center;
  margin-bottom: 10px;
  .tab-default {
    display: inline-block;
    margin: 0px 10px;
  }
  .tab-active {
    color: $primary-color;
    border-bottom: 2px solid $primary-color;
  }
}
</style>
