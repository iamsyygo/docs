import { defineConfig } from 'vitepress'
import vue from '@vitejs/plugin-vue'
import sidebar from './sidebar'

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
    // theme: '',
    // anchor: {},
  },
  vite: {
    plugins: [],
  },
})
