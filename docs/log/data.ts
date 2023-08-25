interface LogContent {
  text: string
  type: 'add' | 'fix' | 'change' | 'remove' | 'chore' | 'beautify'
  images?: string[]
}

interface DataLog {
  color: string
  date: string
  title: string
  list: LogContent[]
}

export const typeMap = {
  add: '📦',
  fix: '🐛',
  change: '🎨',
  remove: '🗑️',
  chore: '🔧',
  beautify: '🌈',
}

const data: DataLog[] = [
  {
    color: '#3eaf7c',
    title: '8、24！！！',
    date: '2023-08-24',
    list: [{ text: '添加实现import_glob文档', type: 'add' }],
  },
  {
    color: '#3eaf7c',
    title: '好快好快一年，就已经快到国庆了🥶',
    date: '2023-08-21',
    list: [{ text: '添加ts 类型声明文件介绍文档', type: 'add' }],
  },
  {
    color: '#3eaf7c',
    title: 'V1.1.5 版本发布',
    date: '2023-07-25',
    list: [
      { text: '添加计算机进制了解文档', type: 'add' },
      { text: '添加 Hex、RGB 了解文档', type: 'add' },
    ],
  },
  {
    color: '#3eaf7c',
    title: '🤿 夏天啊，好想去🏊',
    date: '2023-07-20',
    list: [
      {
        text: '优化首页，添加 gsap 动画',
        type: 'beautify',
        images: ['https://cdn.jsdelivr.net/gh/iamsyygo/Store@master/image/202308012307004.png'],
      },
      { text: '修复 ssr 下 scrolltrigger 报错', type: 'fix' },
      { text: '添加 cdn 引入 gsap', type: 'add' },
      { text: '添加 el-collapse-transition 动画源码剖析文档', type: 'add' },
    ],
  },
  {
    color: '#3eaf7c',
    title: 'V1.1.3 版本发布',
    date: '2023-05-29',
    list: [
      { text: '添加 vite 文档', type: 'add' },
      { text: '添加 rem + vw 文档', type: 'add' },
      { text: '改改bug', type: 'fix' },
    ],
  },
  {
    color: '#3eaf7c',
    title: 'V1.1.2 版本发布',
    date: '2023-05-15',
    list: [
      { text: '添加部署成功时邮箱通知', type: 'add' },
      { text: '修复 md 文档语法错误', type: 'fix' },
      { text: '尝试添加插件进行解决语法错误', type: 'change' },
      { text: '持续补充 vue 文档', type: 'change' },
    ],
  },
  {
    color: '#3eaf7c',
    title: 'V1.1.1 版本发布',
    date: '2023-04-05',
    list: [
      {
        text: '使用 gtihub actions 自动部署',
        type: 'add',
        images: ['https://cdn.jsdelivr.net/gh/iamsyygo/Store@master/image/202308012308312.png'],
      },
      { text: '添加 github actions 配置文件 yml', type: 'add' },
      { text: '修复 yml 文件中的 bug', type: 'fix' },
      { text: '开始部署该文档：https://iamsyygo.github.io/docs', type: 'change' },
    ],
  },
  {
    color: '#3eaf7c',
    title: 'V1.0.9 版本发布',
    date: '2023-02-23',
    list: [
      { text: '抽离工程配置文件', type: 'change' },
      { text: '添加日志页面', type: 'add' },
      { text: '添加示例页面', type: 'add' },
      { text: '添加关于页面', type: 'add' },
      { text: '美化 404 页面', type: 'beautify' },
    ],
  },
  {
    color: '#3eaf7c',
    title: '🛟 有时也要抬抬头看看天空',
    date: '2023-01-10',
    list: [
      { text: '撰写 vue 文档', type: 'add' },
      { text: '修复图片打包问题', type: 'fix' },
      { text: '使用 PicGo 上传图片，配置 GitHub 图床', type: 'add' },
      { text: '优化文档图片展示', type: 'chore' },
      { text: '持续优化工程内容', type: 'chore' },
    ],
  },
  {
    color: '#3eaf7c',
    title: '⛵️ V1.0.1 船新版本发布',
    date: '2022-12-11',
    list: [
      {
        text: '文档初始化，起飞 🛫️',
        type: 'add',
        images: ['https://cdn.jsdelivr.net/gh/iamsyygo/Store@master/image/202308012304638.png'],
      },
      { text: '优化内部文件结构', type: 'change' },
      { text: '制定文档规范', type: 'chore' },
      { text: '优化文档工程内容代码', type: 'chore' },
    ],
  },
]

export default data
