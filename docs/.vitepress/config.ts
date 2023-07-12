import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Aoe',
  lang: 'zh-CN',
  base: '/aoe-docs/',
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
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '🏡 主页', link: '/' },
      { text: '📚 文档', link: '/notes/pnpm-monorepo' },
      { text: '🌻 日志', link: '/log/index.md' },
      { text: '🔗 示例', link: '/examples/markdown-examples' },
      { text: '🕶️ 关于', link: '/about' },
    ],
    sidebarMenuLabel: '目录',
    sidebar: {
      '/notes/': [
        {
          text: '目录',
          collapsed: true,
          items: [
            { text: 'Pnpm and Monorepo', link: '/note/pnpm-monorepo' },
            { text: 'Runtime API Examples', link: '/note/api-examples' },
          ],
        },
      ],
      '/examples/': [
        {
          text: 'Examples',
          collapsed: true,
          items: [
            { text: 'Markdown Examples', link: '/examples/markdown-examples' },
            { text: 'Runtime API Examples', link: '/note/api-examples' },
          ],
        },
      ],
      '/log/': [],
      '/about': [],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/iamsyygo' },
      { icon: 'discord', link: '' },
      { icon: 'twitter', link: '' },
      // { icon: { svg: '' }, link: '' },
    ],
  },
})
