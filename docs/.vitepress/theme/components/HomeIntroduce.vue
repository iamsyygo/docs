<template>
  <div class="home-introduce-warp">
    <div class="introduce-left" ref="left">
      <img :src="values?.img" alt="" />
    </div>
    <div class="introduce-right" ref="right">
      <slot name="right">
        <div class="introduce-title mb10">{{ values.title }}</div>
        <div class="introduce-content" v-html="values.desc" ref="desc"></div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, PropType, getCurrentScope, ref } from 'vue'
import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// gsap.registerPlugin(ScrollTrigger)

interface IntroduceItem {
  title: string
  desc: string
  img: string
}
// defineSlots<{
//   right: IntroduceItem
// }>
const left = ref<HTMLElement | null>()
const right = ref<HTMLElement | null>()
const desc = ref<HTMLElement | null>()

const { values = {} } = defineProps<{
  values: IntroduceItem
}>()
const initGsapScroll = (target: HTMLElement) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: target,
      start: 'top 80%',
      end: 'bottom 90%',
      scrub: 1,
    },
  })
  tl.to(target, {
    opacity: 1,
    x: 0,
    duration: 1,
  })

  tl.to(right.value!, {
    opacity: 1,
    x: 0,
    duration: 1,
  })

  // desc.value!.childNodes.forEach((item, index) => {
  //   tl.to(item, {
  //     opacity: 1,
  //     x: 0,
  //     duration: 0.5,
  //   })
  // })
}
onMounted(() => {
  setTimeout(() => {
    // @ts-ignore
    console.log(window.ScrollTrigger)
    gsap.registerPlugin(window.ScrollTrigger)
    initGsapScroll(left.value!)
  }, 500)
})
</script>

<style scoped lang="scss">
.home-introduce-warp {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  width: 100%;
  height: 600px;
  padding: 10px 30px;
  margin: 10px 30px;
}

.introduce-right,
.introduce-left {
  flex: 1 1 400px;
}

.introduce-left {
  height: 100%;
  padding: 10px 30px;
  transform: translateX(-100px);
  opacity: 0;
  img {
    height: 100%;
    object-fit: contain;
  }
}
.introduce-right {
  height: 100%;
  line-height: 1.5;
  padding: 30px;
  text-align: center;
  transform: translateX(100px);
  opacity: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .introduce-title {
    font-size: max(1.5rem, 15px);
    font-weight: 900;
  }

  .introduce-content {
    text-align: left;
    padding: 10px 20px;
    font-size: max(1rem, 12px);
    font-weight: 400;
  }
}
</style>
