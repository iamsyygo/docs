import { DefaultTheme } from 'vitepress'
const sidebar: DefaultTheme.Config['sidebar'] = {
  '/notes/': [
    {
      text: '文档 📚',
      collapsed: true,
      items: [
        { text: '🏟️ vue3 略知一二', link: '/notes/vue3-略知一二' },
        { text: '⛵️ vite 知多知少', link: '/notes/vite-知多知少' },
        { text: '🛟 rem+vw', link: '/notes/rem+vw' },
        { text: '🛥️ el-collapse-transition 看一看', link: '/notes/el-collapse-transition' },
        { text: '🌈 Hex、RGB 也会看', link: '/notes/hex-rgb' },
        { text: '🤿 进制 进击', link: '/notes/计算机进制' },
        { text: '🌴 taro 问题记录', link: '/notes/taro-问题记录' },
        { text: '🎢 TypeScript 类型声明文件', link: '/notes/ts 类型声明文件介绍' },
        { text: '🐳 vite `import.meta.glob` 实现', link: `/notes/实现import_glob` },
        { text: 'Pnpm and Monorepo', link: '/notes/pnpm-monorepo' },
      ],
    },
  ],
  '/examples/': [
    {
      text: '示例 🌰',
      collapsed: true,
      items: [
        { text: 'Markdown Examples', link: '/examples/markdown-examples' },
        { text: 'Runtime API Examples', link: '/note/api-examples' },
      ],
    },
  ],
  '/log/': [],
  '/about': [],
}

export default sidebar
