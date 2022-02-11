<!--
 * @Date: 2022-02-10 17:03:22
 * @LastEditors: zhangwen
 * @LastEditTime: 2022-02-11 14:57:54
 * @FilePath: /vue_practice_project/src/components/HeaderTop/HeaderTop.vue
-->
<template>
  <div>
    <mt-header fixed :title="title"></mt-header>
  </div>
</template>

<script>
export default {
  name: 'HeaderTop',
  data () {
    return {
      msg: ''
    }
  },
  props: {
    title: String,
  },
  methods: {

  },
  mounted () {

  }
}
</script>

<style scoped>

</style>
