import { defineConfig } from 'vitepress'
// import vue from '@vitejs/plugin-vue'
import { viteExternalsPlugin } from 'vite-plugin-externals'
import sidebar from './sidebar'
import textTagTransform from './plugins/textTagTransform'
import { splitVendorChunkPlugin } from 'vite'

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
        href: '/docs/logo.svg',
      },
    ],
    [
      'script',
      {
        // src: 'https://unpkg.com/gsap@3/dist/ScrollTrigger.min.js',
        src: '/docs/ScrollTrigger.min.js',
      },
    ],
    // [
    //   'script',
    //   {
    //     src: 'https://unpkg.co/gsap@3/dist/gsap.min.js',
    //   },
    // ],
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
    plugins: [
      // viteExternalsPlugin({
      //   gsap: 'gsap',
      // }),
    ],
    // plugins: [splitVendorChunkPlugin()],
    // optimizeDeps: {
    //   include: ['gsap'],
    // },
    // build: {
    //   chunkSizeWarningLimit: 2000,
    //   rollupOptions: {
    //     // 将 'gsap/ScrollTrigger.js' 标记为外部依赖，不会被打包到输出文件中
    //     external: ['gsap'],
    //     output: {
    //       // 对于 'gsap/ScrollTrigger.js'，采用 IIFE 格式进行输出
    //       // 这样它在浏览器中可以正确加载和使用 CommonJS 模块
    //       // globals: {
    //       //   gsap: 'gsap', // 将 'gsap/ScrollTrigger.js' 映射为全局对象 'gsap'
    //       // },
    //       manualChunks(id) {
    //         if (id.includes('node_modules')) {
    //           return 'vendor'
    //         }
    //       },
    //       // 单独将 'gsap/ScrollTrigger.js' 打包为一个 chunk
    //       // chunkFileNames: 'gsap/ScrollTrigger.js',
    //     },
    //   },
    // },
  },
  vue: {
    script: {
      defineModel: true,
      propsDestructure: true,
    },
    //
  },
})
