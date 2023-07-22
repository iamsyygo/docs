<template>
  <div class="not-found">
    <Empty
      :imageStyle="{
        height: '300px',
      }">
      <template #description>
        <div style="font-size: 18px; font-weight: bold">页面找不到 🦆</div>
      </template>
    </Empty>
  </div>
</template>

<script setup lang="ts">
import { Empty } from 'ant-design-vue'
</script>
<style scoped>
.not-found {
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
