<!--
 * @Date: 2021-12-01 17:10:48
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-12-01 17:36:03
 * @FilePath: /vue_demo/src/components/TabBar.vue
-->
<template>
  <mt-tabbar fixed v-model="selected">
      <mt-tab-item id="首页" v-for="(item,index) in tabs" :key="index">
        <img :src="('../assets/icon/'+item.src)">
        <!-- {{'./assets/icon/'+item.src}} -->
        <!-- png> -->
        <png>
          <!-- <use xlink:href=""> -->
        </png>
        <span class="iconfont icon-undo"></span>
        {{item.title}}
      </mt-tab-item>
     <!--  <mt-tab-item id="订单">
        <img slot="icon" src="../assets/image/.png">
        {{$route.meta.title}}
      </mt-tab-item>
      <mt-tab-item id="发现">
        <img slot="icon" src="../assets/100x100.png">
        发现
      </mt-tab-item>
      <mt-tab-item id="我的">
        <img slot="icon" src="../assets/100x100.png">
        我的
      </mt-tab-item> -->
    </mt-tabbar>
</template>

<script>
export default {
  name: 'TabBar',
  data(){
    return {
      tabs: [
        { title: '我的', src: 'user.png' },
        { title: '代办', src: 'undo.png' },
        { title: '已办', src: 'fiedone.png' },
        { title: '设置', src: 'setting.png' },
      ]
    }
  },
  methods: {

  },
  mounted () {

  }
}
</script>

<style scoped>

</style>
