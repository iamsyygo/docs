interface LogContent {
  text: string
  type: 'add' | 'fix' | 'change' | 'remove'
}

interface DataLog {
  color: string
  title: string
  date: string
  list: LogContent[]
}

const data: DataLog[] = [
  {
    color: '#3eaf7c',
    title: 'V1.0.9 版本发布',
    date: '2021-01-01',
    list: [
      { text: '初始化项目', type: 'add' },
      { text: '修复项目', type: 'fix' },
      { text: '修改项目', type: 'change' },
      { text: '删除项目', type: 'remove' },
    ],
  },
  {
    color: '#3eaf7c',
    title: 'V1.0.4 版本发布',
    date: '2021-01-01',
    list: [
      { text: '初始化项目', type: 'add' },
      { text: '修复项目', type: 'fix' },
      { text: '修改项目', type: 'change' },
      { text: '删除项目', type: 'remove' },
    ],
  },
  {
    color: '#3eaf7c',
    title: 'V1.0.1 版本发布',
    date: '2021-01-01',
    list: [
      { text: '初始化项目', type: 'add' },
      { text: '修复项目', type: 'fix' },
      { text: '修改项目', type: 'change' },
      { text: '删除项目', type: 'remove' },
    ],
  },
]

export default data
