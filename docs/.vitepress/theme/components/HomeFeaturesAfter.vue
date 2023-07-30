<template>
  <div>
    <template v-for="(item, idx) in introduceItems" :key="idx">
      <home-introduce :values="item"> </home-introduce>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import HomeIntroduce from './HomeIntroduce.vue'

const introduceItems = reactive([
  {
    title: '🪴 技术栈',
    desc: `<div>🌻 熟练 Javascript、Typescript、Vue、Node等技术；</div><div>🌾 熟悉前端工程化、组件化、模块化开发；</div><div>🌷 能快速独立完成前端开发，对前端性能优化有一定的了解；</div>`,
    img: 'https://cdn.jsdelivr.net/gh/iamsyygo/Store@master/image/202307301859828.png',
  },
  {
    title: 'Vue 驱动',
    desc: '享受 Vue 的开发体验，可以在 Markdown 中使用 Vue 组件，又可以使用 Vue 来开发自定义主题。',
    img: 'https://cdn.jsdelivr.net/gh/iamsyygo/Store@master/image/202307291708127.png',
  },
  {
    title: '高性能',
    desc: 'VuePress 会为每个页面预渲染生成静态的 HTML，同时，每个页面被加载的时候，将作为一个 SPA 运行。',
    img: 'https://cdn.jsdelivr.net/gh/iamsyygo/Store@master/image/202307301343672.png',
  },
  {
    title: 'vscode 主题',
    desc: '个人最喜欢的 vscode 主题，也是我目前使用的主题，给人一种清新的感觉，不会太过于刺眼，也不会太过于单调。',
    img: 'https://cdn.jsdelivr.net/gh/iamsyygo/Store@master/image/202307301914066.png',
  },
])
</script>

<style scoped></style>
