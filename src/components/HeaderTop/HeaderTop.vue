<!--
 * @Date: 2022-02-10 17:03:22
 * @LastEditors: zhangwen
 * @LastEditTime: 2022-02-18 16:58:32
 * @FilePath: /vue_practice_project/src/components/HeaderTop/HeaderTop.vue
-->
<template>
  <div>
    <mt-header :title="title">
      <!-- Header中通过 slot="left/right" 属性识别插槽位置 -->
      <slot name="left" slot="left"></slot>
      <slot name="right" slot="right"></slot>
    </mt-header>
  </div>
</template>

<script>
export default {
  name: "HeaderTop",
  data() {
    return {
      msg: ""
    };
  },
  props: {
    title: String
  },
  methods: {},
  mounted() {}
};
</script>

<style scoped></style>
