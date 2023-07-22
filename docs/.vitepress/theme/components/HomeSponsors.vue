<template>
  <div class="home-sponsors-warp">
    <!-- <text-rotation :list="list" /> -->
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
// import TextRotation from './TextRotation.vue'
const list = reactive([
  '货拉拉，拉货搬家的货运平台',
  '丁香医生，一起发现健康生活',
  '小米运动，智能穿戴管理平台',
  '飞猪旅行，特价票限时抢购',
  '微光，遇见温暖的陪伴',
  '淘票票，淘出好时光',
])
</script>

<style scoped>
.home-sponsors-warp {
  width: 100%;
  height: 300px;
}
</style>
