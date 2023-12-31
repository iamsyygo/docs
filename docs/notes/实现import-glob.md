# 🐳 vite `import.meta.glob` 实现

参考资料：

- https://vitejs.dev/guide/features.html#glob-import

> 🛟 学习【Anthony Fu】实现 vite 插件 import.meta.glob

### 🤿 三方依赖

- 使用到文件扫描工具 `fast-glob`，它是一个快速的文件扫描工具，支持 glob 语法。

## 🌴 匹配代码中的 `import.meta.globNext`

> 此 regex 用于匹配 `import.meta.globNext` 代码
>
> ```typescript
> // 此正则还会在插件不断增强时进行调整
> const globNextRegex = /\bimport\.meta\.globNext(?:<\w+>)?\(['"](.+)['"]\)/g
> ```
>
> - `import.meta.globNext` 是 ci 插件提供的一个方法
> - `?:` 表示不捕获分组，例如 `(?:<\w+>)?` 表示匹配 `<\w+>` 0 次或 1 次
> - `\w` 匹配字母、数字、下划线
> - `?` 匹配前面的子表达式零次或一次，例如 `\w+?` 表示匹配一个或多个字母、数字、下划线，但是尽可能少的匹配
> - `\b` 匹配单词边界
> - `['"]` 匹配单引号或双引号
> - `(.+)` 匹配任意字符，至少一个

```typescript
export default function (options: Options = {}): Plugin {
  return {
    name: 'vite-plugin-import-glob',
    transform(code, id, options) {
      const match = code.match(globNextRegex) // [!code --]

      // there may be multiple matches in a single file
      const matches = Array.from(code.matchAll(globNextRegex)) // [!code ++]

      if (!matches.length) return
    },
  }
}
```

```js
[
  [
    'import.meta.globNext("./utils/*.ts")',
    // 匹配的代码 // [!code focus]
    './utils/*.ts', // [!code focus]
    // 匹配开始的索引 // [!code focus]
    index: 632, // [!code focus]
    input: 'import "./style.css";\n' +
      'import typescriptLogo from "./typescript.svg";\n' +
      'document.querySelector("#app").innerHTML = `\n' +
      '  <div>\n' +
      '    <a href="https://vitejs.dev" target="_blank">\n' +
      '      <img src="/vite.svg" class="logo" alt="Vite logo" />\n' +
      '    </a>\n' +
      '    <a href="https://www.typescriptlang.org/" target="_blank">\n' +
      '      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />\n' +
      '    </a>\n' +
      '    <h1>Vite + TypeScript</h1>\n' +
      '    <div class="card">\n' +
      '      <button id="counter" type="button"></button>\n' +
      '    </div>\n' +
      '    <p class="read-the-docs">\n' +
      '      Click on the Vite and TypeScript logos to learn more\n' +
      '    </p>\n' +
      '  </div>\n' +
      '`;\n' +
      'const data = import.meta.globNext("./utils/*.ts");\n' +
      'Promise.all(data.map((item) => item())).then((res) => {\n' +
      '  console.log(res);\n' +
      '});\n',
    groups: undefined
  ]
]
```

```js
{
  code: 'import "./style.css";\n' +
    'import typescriptLogo from "./typescript.svg";\n' +
    'document.querySelector("#app").innerHTML = `\n' +
    '  <div>\n' +
    '    <a href="https://vitejs.dev" target="_blank">\n' +
    '      <img src="/vite.svg" class="logo" alt="Vite logo" />\n' +
    '    </a>\n' +
    '    <a href="https://www.typescriptlang.org/" target="_blank">\n' +
    '      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />\n' +
    '    </a>\n' +
    '    <h1>Vite + TypeScript</h1>\n' +
    '    <div class="card">\n' +
    '      <button id="counter" type="button"></button>\n' +
    '    </div>\n' +
    '    <p class="read-the-docs">\n' +
    '      Click on the Vite and TypeScript logos to learn more\n' +
    '    </p>\n' +
    '  </div>\n' +
    '`;\n' +
    'const data = import.meta.globNext("./utils/*.ts");\n' +
    'Promise.all(data.map((item) => item())).then((res) => {\n' +
    '  console.log(res);\n' +
    '});\n',
  id: '/Volumes/aoe/web-design/codes/vite-plugin-import-glob/src/main.ts'
}
```

```typescript
{
  glob: './utils/*.ts', // 匹配的 glob
  id: '/Volumes/aoe/web-design/codes/vite-plugin-import-glob/src/main.ts' // 匹配到API的文件绝对路径
}
```

## 🌻 文件扫描

```typescript
for (const match of matches) {
  const files = await fg(match[1], { cwd: dirname(id), dot: true })
  console.log(files) // [ './utils/date.ts', './utils/index.ts' ]
}
```

## 🌲 替换代码(异步)

```typescript
 async transform(code, id, options) {
      const matches = Array.from(code.matchAll(globNextRegex))
      if (!matches.length) return
      for (const match of matches) { // [!code focus:9]
        const files = await fg(match[1], { cwd: dirname(id), dot: true })
        console.log(files)
        const start = match.index!
        const end = start + match[0].length
        const replacement = `{ ${files.map(file => `'${file}':()=>import('${file}')`).join(', ')} }`
        code = code.slice(0, start) + replacement + code.slice(end)
      }
    }
```

![](https://cdn.jsdelivr.net/gh/iamsyygo/Store@master/image/202308241638222.png)

![](https://cdn.jsdelivr.net/gh/iamsyygo/Store@master/image/202308241640273.png)

### 💅🏽 optimization

::: tip
**1、使用 `match.index!` 获取匹配开始的索引位置较为不安全，有可能同时匹配多个 `import.meta.globNext`，导致索引位置不准确**
:::

使用 `magic-string` 库，它可以帮助我们处理字符串，包括替换、删除、插入等操作。可以使用它来对代码进行优化，使用原本的 `match.index` 获取匹配开始的索引进行修改，不需要关注索引位置是否准确。并且拥有`SourceMap`功能，可以帮助生成 `SourceMap`(原本的方式直接`return code`可能导致`SourceMap`不准确)

```typescript
import ms from 'magic-string' // [!code ++]

async function transform(code, id, options) {
  const matches = Array.from(code.matchAll(globNextRegex))
  if (!matches.length) return
  const s = new ms(code)
  for (const match of matches) {
    const files = await fg(match[1], { cwd: dirname(id), dot: true })
    console.log(files)
    const start = match.index!
    const end = start + match[0].length
    const replacement = `{ ${files.map(file => `'${file}':()=>import('${file}')`).join(', ')} }`
    code = code.slice(0, start) + replacement + code.slice(end) // [!code --]
    s.overwrite(start, end, replacement) // [!code ++]
  }
  return code // [!code --]
  return {
    code: s.toString(), // [!code ++]
    map: s.generateMap(), // [!code ++]
  }
}
```

::: tip
**2、提供参数配置方案**
:::

```typescript
interface ImportMeta {
  globNext<T>(glob: string | string[], options: Options): Record<string, () => Promise<T>>
}

interface Options {
  as: 'raw' | 'string' | 'url' | 'array' | 'object'
  eager: boolean
}

import.meta.globNext('./utils/*.ts', { as: 'raw', eager: true })

// or

import.meta.globNext(['./utils/*.ts', '!**/index.ts'], { as: 'raw', eager: true })
```

调整正则匹配规则：

- `[]` 匹配方括号内的任意字符
- `*?` 匹配前面的子表达式零次或多次，但尽可能少的匹配
- `\s\S` 匹配任意字符，包括换行符

注意匹配后的字符串需要重新处理，不符合 `magic-string overwrite` 的参数要求

```typescript
const globNextRegex = /\bimport\.meta\.globNext(?:<\w+>)?\(([\s\S]*?)\)/g // [!code focus]
[
  'import.meta.globNext("./utils/*.ts")',
  '"./utils/*.ts"', // [!code focus]
  index: 543,
  input: 'import "./style.css";\n' +
    'import typescriptLogo from "./typescript.svg";\n' +
    'const app = document.querySelector("#app");\n' +
    'const html = `\n' +
    '<div>\n' +
    '  <a href="https://vitejs.dev" target="_blank">\n' +
    '    <img src="/vite.svg" class="logo" alt="Vite logo" />\n' +
    '  </a>\n' +
    '  <a href="https://www.typescriptlang.org/" target="_blank">\n' +
    '    <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />\n' +
    '  </a>\n' +
    '  <h1>Vite + TypeScript</h1>\n' +
    '  <div class="card">\n' +
    '    <button  type="button"> 🐟 </button>\n' +
    '  </div>\n' +
    '  <p id="content">\n' +
    '  </p>\n' +
    '</div>\n' +
    '`;\n' +
    'const data1 = import.meta.globNext("./utils/*.ts");\n' +
    'console.log("🛵 - imports", data1);\n' +
    'Promise.all(Object.values(data1).map((item) => item())).then((res) => {\n' +
    '  console.log("🛵 - result", res);\n' +
    '  app.innerHTML = html;\n' +
    '  app.querySelector("#content").textContent = JSON.stringify(res);\n' +
    '});\n' +
    'const data2 = import.meta.globNext(["./utils/*.ts", "!**/index.ts"]);\n' +
    'console.log("🚀 - imports", data2);\n',
  groups: undefined
]
[
  'import.meta.globNext(["./utils/*.ts", "!**/index.ts"])',
  '["./utils/*.ts", "!**/index.ts"]',// [!code focus]
  index: 833,
  input: 'import "./style.css";\n' +
    'import typescriptLogo from "./typescript.svg";\n' +
    'const app = document.querySelector("#app");\n' +
    'const html = `\n' +
    '<div>\n' +
    '  <a href="https://vitejs.dev" target="_blank">\n' +
    '    <img src="/vite.svg" class="logo" alt="Vite logo" />\n' +
    '  </a>\n' +
    '  <a href="https://www.typescriptlang.org/" target="_blank">\n' +
    '    <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />\n' +
    '  </a>\n' +
    '  <h1>Vite + TypeScript</h1>\n' +
    '  <div class="card">\n' +
    '    <button  type="button"> 🐟 </button>\n' +
    '  </div>\n' +
    '  <p id="content">\n' +
    '  </p>\n' +
    '</div>\n' +
    '`;\n' +
    'const data1 = import.meta.globNext("./utils/*.ts");\n' +
    'console.log("🛵 - imports", data1);\n' +
    'Promise.all(Object.values(data1).map((item) => item())).then((res) => {\n' +
    '  console.log("🛵 - result", res);\n' +
    '  app.innerHTML = html;\n' +
    '  app.querySelector("#content").textContent = JSON.stringify(res);\n' +
    '});\n' +
    'const data2 = import.meta.globNext(["./utils/*.ts", "!**/index.ts"]);\n' +
    'console.log("🚀 - imports", data2);\n',
  groups: undefined
]

// 处理匹配的字符串，后期考虑使用 acorn 库进行处理 // [!code focus]
match[1].slice(1,-1) // [!code focus]
```

::: tip
3、使用 `acorn` 处理函数参数
:::

```typescript
import type { Literal, ArrayExpression } from 'estree'

for (const match of matches) {
  // const args = match[1].slice(1, -1)
  const args = match[1]
  const ast = parse(args, { ecmaVersion: 'latest' })
  // console.log(ast)
  // @ts-ignore
  const expression = ast.body[0].expression as Literal | ArrayExpression
  console.log(expression, '🌴')

  // const files = await fg(glob, { cwd: dirname(id), dot: true })
  // const start = match.index!
  // const end = start + match[0].length
  // const replacement = `{ ${files.map(file => `'${file}':()=>import('${file}')`).join(', ')} }`
  // s.overwrite(start, end, replacement)
}
```

![](https://cdn.jsdelivr.net/gh/iamsyygo/Store@master/image/202308242138295.png)
![](https://cdn.jsdelivr.net/gh/iamsyygo/Store@master/image/202308242156895.png)

🤿 最终的：
![](https://cdn.jsdelivr.net/gh/iamsyygo/Store@master/image/202308242226766.png)
![](https://cdn.jsdelivr.net/gh/iamsyygo/Store@master/image/202308242225752.png)

::: tip
4、如何获取 `import.meta.globNext` 的第二个参数？？？
:::

- 改写 `match[1]`、`acorn` 解析方式，使用 `()` 包裹参数，或者 `[]` 也是可以的

  ```typescript
  const args = `(${match[1]})`

  // or
  const args = `[${match[1]}]`
  ```

  **在 js 中存在一种特殊的语法，将一段代码用 `()` 包裹，逗号分隔，可以将代码转换为表达式**，例如：
  这会将最后一个表达式的值作为整个括号表达式的值赋值给变量，但是前面的表达式会被执行（合法的语法）

  ```typescript
  const a = (1, 2, 3) // 3

  const s = (console.log('🐟'), 1, 2, 3) // 3
  ```

- 通过以上特殊语法方法和 `acorn`，能顺利的拿到第二个参数的值

  ```typescript
  const args = `[${match[1]}]`

  // @ts-ignore
  const ast = parse(args, { ecmaVersion: 'latest' }).body[0].expression as Literal | ArrayExpression

  console.log(ast, '🚁 - ast')
  ```

  ![](https://cdn.jsdelivr.net/gh/iamsyygo/Store@master/image/202308261447235.png)

  ```typescript
  for (const match of matches) {
    const args = `[${match[1]}]`

    // @ts-ignore
    const ast = parse(args, { ecmaVersion: 'latest' }).body[0].expression

    const args1 = ast.elements[0] as Literal | ArrayExpression
    const globs: string[] = []
    if (args1.type === 'Literal' && typeof args1.value === 'string') {
      globs.push(args1.value)
    }

    if (args1.type === 'ArrayExpression') {
      for (const element of args1.elements) {
        if (element?.type === 'Literal' && typeof element.value === 'string') {
          globs.push(element.value)
        }
      }
    }

    const args2 = ast.elements[1] as ObjectExpression | undefined
    const options: GlobOptions<boolean> = {}
    if (args2?.type === 'ObjectExpression') {
      for (const property of args2.properties) {
        // @ts-expect-error
        options[property.key.name] = property.value.value
      }
    }

    // console.log('🚀 - globs', globs)
    // console.log('🚀 - options', options)

    const query = options?.as ? `?${options.as}` : ''

    const files = await fg(globs, { cwd: dirname(id), dot: true })
    const start = match.index!
    const end = start + match[0].length

    if (options.eager) {
      // 同步处理
      const imports = files
        .map((file, idx) => `import * as ${importSyncPrefix}${idx} from '${file}${query}'`)
        .join('\n')

      // 在头部插入同步导入的代码
      s.prepend(`${imports}\n`)

      // 将 import.meta.globNext 替换为导入的变量
      const replacement = `{ ${files
        .map((_, idx) => `'${idx}':${importSyncPrefix}${idx}`)
        .join(',\n')} }`
      s.overwrite(start, end, replacement)
    } else {
      const replacement = `{ ${files
        .map(file => `'${file}':()=>import('${file}${query}')`)
        .join(',\n')} }`
      s.overwrite(start, end, replacement)
    }
  }
  ```

  ![](https://cdn.jsdelivr.net/gh/iamsyygo/Store@master/image/202308261508142.png)
  ![](https://cdn.jsdelivr.net/gh/iamsyygo/Store@master/image/202308261511555.png)
  ![](https://cdn.jsdelivr.net/gh/iamsyygo/Store@master/image/202308261524972.png)
  ![](https://cdn.jsdelivr.net/gh/iamsyygo/Store@master/image/202308261525330.png)

## 🛵 Harvest

- `path.dirname` 获取文件所在目录
  `path.dirname('/Volumes/aoe/web-design/codes/vite-plugin-import-glob/src/main.ts')`
  `/Volumes/aoe/web-design/codes/vite-plugin-import-glob/src`
- `fast-glob` 库，常用于文件扫描，可以同步或异步扫描文件
  `fast-glob.sync('./utils/*.ts')`
  `['./utils/a.ts', './utils/b.ts']`
- `Symbol.toStringTag` 在 js 中，`Symbol.toStringTag` 属性是一个内置的符号，它提供一种在调用对象的 toString() 方法时**自定义对象的字符串表示的方式。**对于模块来说，默认情况下 Symbol.toStringTag 属性设置为 "Module"，这有助于识别对象的类型。
- `magic-string` 库，可以帮助处理字符串，包括替换、删除、插入等操作。可以使用它对文件字符串进行修改而不需担心索引位置是否准确，并且可以帮助生成 `SourceMap`
- `acorn` 库，一个小型、快速的 js 解析器，完全用 js 编写，可以帮助解析 js 代码，生成 AST。ci 工程中使用它来解析 `globNext` 中的参数，以便于对参数进行处理
- `es-module-lexer` 库，也可以帮助解析 js 代码，生成 AST。作为性能示例，Angular 1 (720KiB) 在 5 毫秒内完全解析，而最快的 JS 解析器 Acorn 需要超过 100 毫秒。
- 事实上 `rollup` 的 `transform` 钩子 de 上下文中也提供 `this.parse` 方法，可以帮助解析 js 代码，生成 AST，所以也可以使用 `rollup` 提供的 `this.parse` 方法来解析 `globNext` 中的参数，以便于对参数进行处理
- `@types/estree` 能提供解析的 AST 类型定义，例如 `Program`、`ImportDeclaration`、`ImportExpression` 等
- 记录 `ts` bug
  对于 `Eager` 来说，它是会被 `options` 类型泛型映射的，也就是插入 options 之后，`Eager` 会被映射为 `true | false`，但是实际上效果并不是这样

  ```typescript
  interface GlobOptions<E extends boolean> {
    as: 'raw' | 'string' | 'url' | 'array' | 'object'
    // options 的 eager 会映射到 ImportMeta 的泛型参数 Eager，所以 Eager 可不传
    eager: E
  }
  // TODO: 待优化优化
  interface ImportMeta {
    globNext<T, Eager extends boolean = boolean>(
      glob: string | string[],
      options?: GlobOptions<Eager>,
    ): Eager extends true ? Record<string, T> : Record<string, () => Promise<T>>
  }

  const data1 = import.meta.globNext<Module>('./utils/*.ts')
  console.log('🛵 - imports', data1)

  // [!code error]
  const data2 = import.meta.globNext<Module>(['./utils/*.ts', '!**/index.ts'], { eager: true })
  console.log('🚀 - imports', data2)
  ```

::: tip
使用 `重载` 解决优化 ts 类型问题
:::

```typescript
// chore: 优化类型体操，使用`重载`的方式
interface ImportMeta {
  // 此重载排序顶层，默认时异步
  globNext<T>(
    glob: string | string[],
    options?: GlobOptions<false>,
  ): Record<string, () => Promise<T>>
  globNext<T>(glob: string | string[], options?: GlobOptions<true>): Record<string, T>
}
```

- 使用 `()` 包裹并且逗号分隔，这是在 js 中合法的，每一项都会被执行，但是只有最后一项的值会被返回 - 逗号操作符

  ```typescript
  const a = (1, 2, 3) // 3

  const s = (console.log('🐟'), 1, 2, 3) // 3
  ```

- `@ts-expect-error vs @ts-ignore`：虽然两者都可以用于绕过类型检查错误，但建议使用 `@ts-expect-error` 来精确标记预期的错误，并在代码修复后能够及时发现和解决这些问题。尽量避免使用 `@ts-ignore` 因为它可能会掩盖真正的问题，导致代码质量下降。
