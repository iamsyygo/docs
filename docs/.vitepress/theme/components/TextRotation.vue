<template>
  <div class="interesting-mask" :style="{ '--text-height': height }">
    <span ref="items" v-for="(item, index) in list" :key="index">
      {{ item }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
const items = ref()

const { list, height } = withDefaults(
  defineProps<{
    list: string[]
    height: string
  }>(),
  {
    height: '110px',
  },
)
console.log(list)

const len = list.length
const idx = ref(0)
let timer: any = null
onMounted(() => {
  timer = setInterval(() => {
    items.value.forEach((item: any, index: number) => {
      if (index === idx.value) {
        item.classList.add('text-in')
        item.classList.remove('text-up')
      } else if (index === idx.value - 1) {
        item.classList.add('text-up')
        item.classList.remove('text-in')
      } else if (idx.value == 0 && index == len - 1 && item.classList.len) {
        item.classList.remove('text-in')
        item.classList.add('text-up')
      } else {
        item.classList.remove('text-up', 'text-in')
      }
    })
    idx.value = idx.value >= len - 1 ? 0 : idx.value + 1
  }, 2000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped lang="scss">
.interesting-mask {
  color: #1d1d1f;
  position: relative;
  height: var(--text-height);
  line-height: var(--text-height);
  overflow: hidden;
}

.interesting-mask > span {
  display: block;
  position: absolute;
  top: var(--text-height);
  font-size: calc(var(--text-height) * 0.8);
}

.text-up {
  transform: translateY(calc(var(--text-height) * -2));
  transition: all 2s;
}

.text-in {
  transform: translateY(calc(var(--text-height) * -1));
  transition: all 2s;
}
</style>
