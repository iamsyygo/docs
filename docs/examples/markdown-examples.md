# Markdown 使用示例

这个页面展示一些内置的 Markdown 扩展使用示例

## 语法高亮显示

VitePress 提供语法高亮显示的 [Shiki](https://github.com/shikijs/shiki), 与 line-highlighting 等附加功能:

**使用**

````
```js{4}
export default {
  data () {
    return {
      msg: 'Markdown 扩展使用示例!'
    }
  }
}
```
````

**效果**

```js{4}
export default {
  data () {
    return {
      msg: 'Markdown 扩展使用示例!'
    }
  }
}
```

## 自定义容器

**使用**

```md
::: info
这是一个信息框.
:::

::: tip
这是一个提示.
:::

::: warning
这是一个警告.
:::

::: danger
这是一个危险的警告.
:::

::: details
这是一个细节.
:::
```

**Output**

::: info
这是一个信息框.
:::

::: tip
这是一个提示.
:::

::: warning
这是一个警告.
:::

::: danger
这是一个危险的警告.
:::

::: details
这是一个细节.
:::

## 更多

[查看更多文档 markdown 的完整列表扩展](https://vitepress.dev/guide/markdown)
