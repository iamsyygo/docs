import { defineConfig } from 'vitepress'
// import vue from '@vitejs/plugin-vue'
import sidebar from './sidebar'
import textTagTransform from './plugins/textTagTransform'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Aoe',
  lang: 'zh-CN',
  base: '/docs/',
  description: '开发文档、规范、示例等...',
  cleanUrls: true,
  lastUpdated: true,
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/logo.svg',
      },
    ],
    // https://unpkg.com/gsap@3/dist/ScrollTrigger.min.js
    [
      'script',
      {
        src: 'https://unpkg.com/gsap@3/dist/ScrollTrigger.min.js',
      },
    ],
  ],
  themeConfig: {
    logo: '/logo.svg',
    search: {
      provider: 'local',
    },
    lastUpdatedText: '上次更新',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '🏡 主页', link: '/' },
      { text: '📚 文档', link: '/notes/pnpm-monorepo' },
      { text: '🌻 日志', link: '/log/index.md' },
      { text: '🌰 示例', link: '/examples/markdown-examples' },
      { text: '🕶️ 关于', link: '/about' },
    ],
    sidebarMenuLabel: '目录',
    sidebar,
  },
  // appearance: true,
  markdown: {
    theme: 'material-theme-palenight',
    // anchor: {},
    // config(md) {
    //   md.use(textTagTransform)
    // },
  },
  vite: {
    plugins: [],
    optimizeDeps: {
      include: ['gsap'],
    },
    build: {
      rollupOptions: {
        // 将 'gsap/ScrollTrigger.js' 标记为外部依赖，不会被打包到输出文件中
        external: ['gsap'],
        output: {
          // 对于 'gsap/ScrollTrigger.js'，采用 IIFE 格式进行输出
          // 这样它在浏览器中可以正确加载和使用 CommonJS 模块
          format: 'esm',
          globals: {
            gsap: 'gsap', // 将 'gsap/ScrollTrigger.js' 映射为全局对象 'gsap'
          },
        },
      },
    },
  },
  vue: {
    script: {
      defineModel: true,
      propsDestructure: true,
    },
    //
  },
})
