import { MarkdownRenderer } from 'vitepress'

// 对markdown中的文本标签进行转换 e.g. <xxx> => `<xxx>`
export default function (md: MarkdownRenderer, options = {}) {
  const { render } = md
  md.render = (...args) => {
    const [src] = args
    // const reg = /<(\w+)>/g
    // 如果这个markdown是一个vue组件的话，那么这个正则会匹配到vue组件的标签，导致vue组件无法正常渲染，所以需要加上一个负向断言

    // 只匹配文本，不匹配代码块中的文本标签
    const reg = /(?<!`)<(?!\w+>)(\w+)>/g

    const newSrc = src.replace(reg, (match, p1) => {
      return `\`<${p1}>\``
    })
    args[0] = newSrc
    return render.apply(md, args)
  }
}
