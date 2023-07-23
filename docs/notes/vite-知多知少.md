# ⛵️ vite-知多知少

### **下一代前端开发与构建工具**

在实际开发中，编写的代码往往是不能被浏览器直接识别的，比如 ES6、TypeScript、Vue 文件等

所以必须通过**构建工具**来对代码进行转换、编译，类似的工具有 Webpack、Rollup、Parcel 和 本文介绍的 Vite

⚠️ **Vite2、3 使用的是 Rollup2、Vite4 则是 Rollup3**

🛵 使用原生 ESM 文件，**无需打包**!

🪂 对 TypeScript、JSX、CSS 等**支持开箱即用**

🥽 可选 “多页应用” 或 “库” 模式的预配置 Rollup 构建

🛟 在开发和构建之间共享 Rollup-superset 插件接口

[Vite 升级内容](https://cn.vitejs.dev/guide/migration.html)

## 🥥 开发阶段

### 🛵 使用原生 ESM 文件，**无需打包**

webpack: run serve 时，将所有的 ES6、Typescript、Vue 等文件进行编译打包**合并文件(如 build.js)**转化后再进行浏览访问

vite: run dev 时，基于浏览器支持的原生 ESM(**ES 模块化**)，进行简单的转换(**不合并文件**)，浏览器直接访问，**提高开发效率**

- **ES6 转 ES6，webpack 中会进行转化 ES5**
- typescript 转 ES6
- jsx、vue 进行简单转化
- **使用 ESBuild 进行代码转换(即使简单转化)，比 bable 性能优越**，快 10-100 倍
- 生产打包环境使用 Rollup 进行打包

在浏览器支持原生 ESM 前，javascript 并没有提供支持模块化开发的功能，所以模块化构建工具出现

然而随着项目代码的增加，javascript 代码文件逐渐增加，打包工具来到性能瓶颈时期，对于一些文件修改 HMR 热替换、服务器启动所需时间逐渐增加

**没经过打包构建的代码**

即使浏览器支持模块化，**在不使用构建工具模块化开发时，使用** **import** **ESM 需要输入完整后缀文件名称**

```
../node-model/lodash-es/lodash.defaults.js
```

![](https://cdn.jsdelivr.net/gh/iamsyygo/Store@master/image/202307232321754.png)

### 🪂 为什么浏览器支持原生 ESM 开发，还需要构建工具

- 使用 import ESM 需要输入完整后缀文件名称
- `lodash.defaults.js`文件里存在其他 import 文件时浏览器同样需要依次加载进来，发送 http 请求这些 js 文件
- ts、vue 这些文件浏览器同样还是不支持

**基于以上浏览器 ESM 的优点和缺点，Vite 诞生**

Vite 如何解决 ESM 三大缺点

- 使用 vite 时无需在 import 时拼接完整文件后缀名称，vite 自动查找，并且可以通过配置，使 vite 可以自动查找更多文件
- 在使用三方依赖包时，不需要输入完整的三方包地址

在 vite.config.ts 中，可以添加后缀配置自动查找规则，需要注意的是配置的顺序，尽可能减少自动查找后缀文件名的配置，减少 vite 的性能消耗

1. **CommonJS 和 UMD 兼容性:** 在开发阶段中，Vite 的开发服务器将所有代码视为原生 ES 模块。因此，Vite 必须先将以 CommonJS 或 UMD 形式提供的依赖项转换为 ES 模块。在转换 CommonJS 依赖项时，Vite 会进行智能导入分析，这样即使模块的导出是动态分配的（例如 React），具名导入（named imports）也能正常工作：**js**

```tsx
// 符合预期
import React, { useState } from 'react'
```

1. **性能：** 为了提高后续页面的加载性能，Vite 将那些具有许多内部模块的 ESM 依赖项转换为单个模块。

**直接使用**`**import _ from 'lodash-es'**`

当直接使用 lodash-es 时，vite 会到 node_modules 中查找 lodash-es 的 package.json 文件，然后读取 package.json 中的 module 字段，然后再去加载 lodash-es/dist/lodash.js 文件。

**原生 ES 引入不支持裸模块导入，Vite 将在服务的所有源文件中检测此类裸模块导入，预构建和重写导入合法 url**

也就是会直接到 node_modules 查找相应的文件，**将这些文件(lodash.defaults.js)里面引入的一些其它文件打包合并至一个文件里面** **lodash-es_lodash\_\_default.js[🥽 简单合并]**

- 使用 lodash-es 包名导入与使用 相对路径导入不同的是，vite 会根据路径不同，自动导入不同的模块
- 使用包名导入，vite 会自动去 node_modules 中查找
- 使用相对路径导入，vite 会自动根据路径查找

![](https://cdn.jsdelivr.net/gh/iamsyygo/Store@master/image/202307232321857.png)

**假如在 Vite 工程中同样是使用**`**../node-model/lodash-es/lodash.defaults.js**` **这样的地址 import，还是会存在原生 ESM 的缺点问题(加载请求 lodash.defaults.js 里的所有 import 文件)**

![](https://cdn.jsdelivr.net/gh/iamsyygo/Store@master/image/202307232322529.png)

### 🍟 vite 如何加载转化文件

**对于 ts 文件代码，可以看到上图控制台中还是与原生 ESm 一样加载 main.ts，但是浏览器确可以成功解析执行！因为 vite 在浏览器加载请求 ts 时候会对这些 ts 浏览器无法识别的文件代码进行转化，\*\***在服务器中使用 esbuild 对这些文件进行转化\***\*，再返回**

**🧶 请求 main.ts，里面加载的是经过转换的 js 代码**

vite 会在 run dev 的时候，启用一个服务器，假设这个服务在浏览器访问请求 main.ts 原封不动返回，浏览器是无法识别 ts 文件，所以 vite 在这里对 ts 文件做进一步的转换

早期 的 vite 使用的是 koa 作为服务器，koa 对于 vite 转化文件是过于“重”的一个 node 服务，**对于请求转化来说 connect 更加擅长，之后 vite2 开始**使用的是 connect，connect 是一个轻量级的服务区：

- 允许开发人员根据需要选择和组合中间件，以构建自定义的请求处理流程
- connect 提供丰富的中间件集合
- 具有较低的性能开销，它通过**使用流水线处理请求**，并利用异步和事件驱动的特性，提供高性能的请求处理能力 👍🏽

![](https://cdn.jsdelivr.net/gh/iamsyygo/Store@master/image/202307232322808.jpeg)

### 🍯 对 css scss less postcss 支持

vite 遵循快速开发原则，自带以上等原生样式工具配置，使用时仅需安装对应工具即可，无需在 `vite.config.ts`中添加

```bash
pnpm add sass

# 默认不会自动补全浏览器样式后缀，使用需安装postcss、postcss-preset-env即可
pnpm add postcss postcss-preset-env
```

🫵🏾 使用 postcss 时，虽然 vite 自带很多配置，但是需要手动在目录下创建 postcss.config.js 文件

### 🌴 对 TS 的原生支持以及底层原理

vite 对 typescript 原生支持，直接使用即可，直接使用 ESBuild 进行编译。

查看浏览器的请求可以发现，请求的文件依然是 .ts 后缀的：

- vite 服务中的 connect 会对请求进行转发
- 通过 ESBuild 进行编译
- 获取编译后的代码进行返回
- 浏览器直接解析
- 查看请求中 .ts 文件请求，文件结果已经是编译后的 js 代码

需要注意的是：

⚠️ 开发阶段 vite 使用的是 ESBuild 进行的打包，到生产阶段时 vite 选择的是 babel 进行打包

- ESBuild 打到速度是极快的
- ESBuild 对目前来说还是存在一定问题

### 🌽 vite 对 vue 的支持

无需多余的配置，安装插件:

```bash
pnpm add @vitejs/plugin-vue -D
```

与样式配置不一样的是，需要在`vite.config.ts`添加插件：

```typescript
// vite.config.ts
import vue from '@vitejs/plugin-vue'
export default {
  plugins: [vue()],
}
```

👍🏽 由于使用的是 ts 文件，所以 vite 同样提供对于配置文件的类型提示支持：

```typescript
export declare function defineConfig(config: UserConfigExport): UserConfigExport

// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  plugins: [vue()],
})
```

🎢 请求 vue 文件经过编译后的代码：

![](./assets/202307232317124.png)

源代码：

```html
<script setup lang="ts"></script>

<style scoped></style>
<template>
  <h1>Vite</h1>
</template>
```

🛟 Vue3 Jsx 的支持，Vue2 需要安装其他插件

```bash
pnpm add @vitejs/plugin-vue-jsx -D

# vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
export default defineConfig({
  plugins: [vue(), vueJsx()],
})
```

### ⏳ vite 对 react 的支持

vite 中对于 react 无需安装任何插件即可进行编译解析，同样通过 ESBuild 进行编译

其实 vite 对 react 的支持主要还是用 esbuild 一部分得替代了原来@babel/preset-react 的作用，另外一块就是封装了官方的 react-refresh，来支持 react 的热更新

🏎️ 有趣的是，vite 为减少每次 run dev 的性能消耗，会将一些三方依赖进行缓存，在上图浏览器 vue 编译后的源码中可以看到，import 三方依赖时是在 `node_moduls/.vite`中加载到，vite 将这些三方依赖缓存到.vite 中

以上都是开发阶段关于 vite 的一些内容

---

## 🎒 打包阶段

vite 提供如下命令进行打包

```bash
npx vite build

# 打包预览
npx vite preview
```

当然如果需要更加细粒的打包配置，可以通过`vite.config.ts`配置

### 🥽 ESBuild

**代码构建编译工具**

**它是用 Go 语言编写的，并可以编译为本地代码。**

**大多数前端打包工具都是基于 JavaScript 实现的，而 ESBuild 则选择使用 Go 语言编写，两种语言各自有其擅长的场景，但是在资源打包这种 CPU 密集场景下，Go 更具性能优。一般来说，JS 的操作是毫秒级，而 Go 则是纳秒级。**

**JavaScript：源码 -- (V8 转)字节码 -- 机器代码**

**Go：源码 -- 机器代码**

- 超快构建速度，并且**不需要缓存**
- **支持 ES6 和 commonJs 的模块化**
- **支持 ES6 的 Tree Shaking**
- **支持 Go Javascript 的 API**
- **支持 TypeScript JSX 等语法的编译**
- **支持 SourceMap**
- **支持代码压缩**
- **支持扩展其它插件**
- **充分利用 CPU 多内核，饱和运行**
- **从 0 开始编写的 ESBuild，无任何第三方插件，性能兼容更加好，无历史包裹**

[**关于一些打包工具以及 ESBuild 介绍**](https://xie.infoq.cn/article/0fe61dab01a92d7df22525803)

**ESBuild 重要功能还在开发当中，不够成熟，特别是代码分割和 css 处理方面，所以生产环境下使用的 Rollup，在这方面更加成熟和灵活**

## 🔩 脚手架

vite 提供开箱即用的脚手架功能

```typescript
pnpm create vite

// 选择模板...
// 可以使用社区的模板
```

**👑 搭建 Vite 脚手架**

**添加 bin 命令并创建可执行文件，**指定当前脚本要执行所需要的解释程序

```typescript
// package.json
"bin": "dist/bin.js"

// bin/index.ts
#! /usr/bin/env node
// 表示在/usr/bin/env路径下使用环境变量 node 执行当前文件
```

当用户进行安装依赖时，发现当前依赖中的 `package.json` 存在 bin 时，会自动安装到项目的 `node_modules/bin` 目录中的，在此当执行相关命令时，会先到该目录中先查找相关命令可执行文件

要设置包的主入口，最好在 package.json 中同时定义 "exports" 和 "main"

```json
{
  "main": "./main.js",
  "exports": "./main.js"
}
```

**当定义 "exports" 字段时，所有子路径都会被封闭，不再对使用者开放。**例如，require('pkg/xxx.js') 会抛出 [ERR_PACKAGE_PATH_NOT_EXPORTED](https://link.juejin.cn?target=https%3A%2F%2Fnodejs.org%2Fapi%2Ferrors.html%23errors_err_package_path_not_exported) 错误。

这不是一个严格意义上的封闭，因为直接 require 任何绝对路径，如 require('/path/to/node_modules/pkg/xxx.js') 仍然会加载 xxx.js。

作者：字节大力智能
链接：https://juejin.cn/post/6972006652631318564
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

在本地环境进行执行文件开发时可以使用 `npm link`进行创建全局的软链接

初始化 ts 配置文件，项目使用的是 ts 文件进行开发

```typescript
tsc --init
```

1、安装 `tj` 开发的命令行参数解析工具 [commander](https://github.com/tj/commander.js)

```bash
pnpm add commander -D
```

2、添加 ` "resolveJsonModule": true` `tsconfig.json` 配置，使得能在文件中能`import` 导入 json 文件，并安装 `@types/ndoe`

```typescript
#! /usr/bin/env node
import { program } from 'commander'
import packageJson from './package.json'
const argv = process.argv
program.version(packageJson.version, '-v --version', '查看当前版本')

program.option('-d --dest <dest>', '获取目标文件目录')
program.parse(argv)

// 输出参数
console.log(program.opts().dest) // ./src/view


// 其中 <dest> 为占位符
xxx --dest ./src/view
```

当 package.json 中的 type 字段被设置为 "module" 时，Node.js 会将项目视为 ECMAScript 模块（ES 模块）的上下文，而不是 CommonJS 模块的上下文。这意味着在该项目中，你应该使用 import 和 export 语法来导入和导出模块，而不是使用 require 和 module.exports。

需要注意的是：

**在 ECMAScript 模块中，对导入文件的扩展名是敏感的。如果在导入语句中省略了文件的扩展名，Node.js 将无法正确解析模块路径。需要确保导入语句中的文件扩展名与实际的文件扩展名匹配。**

当使用 ts 时，需要修改编译后的模块代码

```json
{
  "compilerOptions": {
    "target": "ESNext", // 设置编译的版本
    "lib": ["ESNext"],
    "module": "CommonJS", // 设置编译后运行在相应的模块系统
    "rootDir": "./",
    "baseUrl": ".",
    "declaration": true,
    "outDir": "dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  },
  "exclude": ["node_modules", "dist"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

**同时的也需要设置 package.json 的 type 字段，如果使用的是 module 则需要使用完整的文件路径包括文件名后缀**

**🧶 如果需要在 node 中运行代码直接运行 ts 是不支持的，可以使用** `**ts-****node**` 它可以直接的运行 ts 代码，使用起来很方便

```json
{
// 编译选项
  "compilerOptions": {
    /* Basic Options */ 基础配置
    // "incremental": true,                   /* 启用增量编译  Enable incremental compilation   */
    "target": "es5",                          /*指定ECMAScript目标版本,默认ES3  Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'. */
    "module": "commonjs",                     /*指定编译模块化代码的生成，node环境使用commonjs Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */
    // "lib": [],                             /*指定要包含在编译中的库文件，例如是node环境还是浏览器环境，node环境使用es2015-es2020 ，如果是浏览器环境直接使用dom就好了 Specify library files to be included in the compilation. */
    // "allowJs": true,                       /*允许编译javascript文件  Allow javascript files to be compiled. */
    // "checkJs": true,                       /*报告.js文件中的错误  Report errors in .js files. */
    // "jsx": "preserve",                     /*指定JSX代码生成 Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
    // "declaration": true,                   /*生成相应的.d.ts的文件 Generates corresponding '.d.ts' file. */
    // "declarationMap": true,                /*为每个对应对象生成一个sourcemap .d.ts文件 Generates a sourcemap for each corresponding '.d.ts' file. */
    // "sourceMap": true,                     /*生成.map文件  Generates corresponding '.map' file. */
    // "outFile": "./",                       /*输出单个文件位置  Concatenate and emit output to single file. */
    // "outDir": "./",                        /*输出文件到文件夹的位置，例如vue打包后的结果是到dist文件夹里面  Redirect output structure to the directory. */
    // "rootDir": "./",                       /*指定输入文件的根目录。用于控制输出目录结构 Specify the root directory of input files. Use to control the output directory structure with --outDir. */
    // "composite": true,                     /*项目是否需要编译 Enable project compilation */
    // "tsBuildInfoFile": "./",               /*指定文件去保存编译信息，应该和日志文件一样吧 Specify file to store incremental compilation information */
    // "removeComments": true,                /*编译是否需要移除注释信息 Do not emit comments to output. */
    // "noEmit": true,                        /*不生成输出文件 Do not emit outputs. */
    // "importHelpers": true,                 /*从 tslib 导入辅助工具函数 Import emit helpers from 'tslib'. */
    // "downlevelIteration": true,            /*全面支持es5,es3 使用for-of的迭代，解构等， Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
    // "isolatedModules": true,               /*将每个文件转换为一个单独的模块 Transpile each file as a separate module (similar to 'ts.transpileModule'). */

    /* 严格模式的配置 Strict Type-Checking Options */
    "strict": true,                           /*启用所有严格的类型检查选项 Enable all strict type-checking options. */
    // "noImplicitAny": true,                 /*如果编译器无法根据变量的使用来判断类型时，将用 any 类型代替 Raise error on expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,              /*启用严格null检查 Enable strict null checks. */
    // "strictFunctionTypes": true,           /*启用严格的function类型检查 Enable strict checking of function types. */
    // "strictBindCallApply": true,           /*启用严格的bind,call 和apply的严格检查 Enable strict 'bind', 'call', and 'apply' methods on functions. */
    // "strictPropertyInitialization": true,  /*启用严格检查类实例化的属性 Enable strict checking of property initialization in classes. */
    // "noImplicitThis": true,                /*当 this 表达式值为 any 类型的时候，生成一个错误 Raise error on 'this' expressions with an implied 'any' type. */
    // "alwaysStrict": true,                  /* 以严格模式检查每个模块，并在每个文件里加入 'use strict' Parse in strict mode and emit "use strict" for each source file. */

    /*额外的检查 Additional Checks */
    // "noUnusedLocals": true,                /*报告没有使用的变量错误的地方 Report errors on unused locals. */
    // "noUnusedParameters": true,            /*报告参数没有使用 Report errors on unused parameters. */
    // "noImplicitReturns": true,             /*报告函数返回值不匹配的错误 Report error when not all code paths in function return a value. */
    // "noFallthroughCasesInSwitch": true,    /*报告switch中的case的错误 Report errors for fallthrough cases in switch statement. */
    // "noUncheckedIndexedAccess": true,      /*报告值为undefined的错误 Include 'undefined' in index signature results */

    /*模块解析配置 Module Resolution Options */
    // "moduleResolution": "node",            /*解析模式使用的策略 Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
    // "baseUrl": "./",                       /*用于解析非绝对模块名称的基本目录 Base directory to resolve non-absolute module names. */
    // "paths": {},                           /*模块名到基于 baseUrl 的路径映射的列表 A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
    // "rootDirs": [],                        /*根文件夹列表，其组合内容表示项目运行时的结构内容 List of root folders whose combined content represents the structure of the project at runtime. */
    // "typeRoots": [],                       /*包含类型定义的文件夹列表 List of folders to include type definitions from. */
    // "types": [],                           /*编译类型声明文件 Type declaration files to be included in compilation. */
    // "allowSyntheticDefaultImports": true,  /*允许从没有默认导出的模块中进行默认导入。这并不影响代码执行，只是类型检查  Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
    "esModuleInterop": true,                  /*通过为所有导入创建名称空间对象，实现CommonJS和ES模块之间的互操作性。意味着“allowSyntheticDefaultImports” Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
    // "preserveSymlinks": true,              /*不适用绝对路径 Do not resolve the real path of symlinks. */
    // "allowUmdGlobalAccess": true,          /*允许从模块中访问UMD全局变量 Allow accessing UMD globals from modules. */

    /*sourcemap的配置选项 Source Map Options */
    // "sourceRoot": "",                      /*指定TypeScript源文件的路径，以便调试器定位。当TypeScript文件的位置是在运行时指定时使用此标记。路径信息会被加到sourceMap里。 Specify the location where debugger should locate TypeScript files instead of source locations. */
    // "mapRoot": "",                         /*指定调试器应该找到映射文件而不是生成文件的位置 Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,               /* 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件 Emit a single file with source maps instead of having a separate file. */
    // "inlineSources": true,                 /*将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性 Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */

    /*实验性的配置 Experimental Options */
    // "experimentalDecorators": true,        /*启用ES7的装饰器 Enables experimental support for ES7 decorators. */
    // "emitDecoratorMetadata": true,         /*装饰器提供元数据的支持 Enables experimental support for emitting type metadata for decorators. */

    /*高级配置 Advanced Options */
    "skipLibCheck": true,                     /*跳过声明文件的类型检查 Skip type checking of declaration files. */
    "forceConsistentCasingInFileNames": true  /*禁止对同一文件使用大小写不一致的引用 Disallow inconsistently-cased references to the same file. */
  }
}
```

ECMAScript 模块不支持直接 `import xx from 'xxx.json'`，需要使用 fs 或者 createRequire 等方法读取，这是和 CommonJs 不同的是，后者可以直接 require 直接导入读取

**Vite 的插件机制是基于 Rollup 的插件机制实现的，但是又进行了一些扩展。Vite 的插件机制是通过钩子函数实现的，当 Vite 运行时，会通过钩子函数调用插件中的方法，插件可以在这些方法中干预 Vite 的构建过程。**

[**通用的钩子**](https://cn.vitejs.dev/guide/api-plugin.html#universal-hooks)

[**Vite 独有的钩子**](https://cn.vitejs.dev/guide/api-plugin.html#vite-specific-hooks)**，**这些钩子会被 Rollup 忽略。

**Rollup 的插件机制实现主要基于两点:**

- **Rollup 维护各个插件接口的 Hook 列表，插件可以向这些列表中添加回调函数**
- **在执行对应过程时，Rollup 会依次触发这些 Hook 列表中的回调函数**
- **插件可以通过 Rollup 提供的 addHook 方法相对应的 Hook 列表中添加回调函数**

## 🕶️ 巧妙之处

**Vite 主要将用户插件进行重新排序，然后和内置的插件配置合并，再传递给 Rollup 进行调用打包**

一个 Vite 插件可以额外指定一个 enforce 属性（类似于 webpack 加载器）**来调整它的应用顺序**。enforce 的值可以是 pre 或 post。解析后的插件将按照以下顺序排列：

- Alias
- 带有 enforce: 'pre' 的用户插件
- Vite 核心插件
- 没有 enforce 值的用户插件
- Vite 构建用的插件
- 带有 enforce: 'post' 的用户插件
- Vite 后置构建插件（最小化，manifest，报告）

```javascript
// vite/node/config.ts
export async function resolveConfig() {

  const rawUserPlugins = (
    (await asyncFlatten(config.plugins || [])) as Plugin[]
  ).filter(filterPlugin)

  const [prePlugins, normalPlugins, postPlugins] =
    sortUserPlugins(rawUserPlugins)

  const userPlugins = [...prePlugins, ...normalPlugins, ...postPlugins]
  // ...
}
```

**【以下内容精简摘自 vite 官网】：**

### 🛟 config - 在解析 Vite 配置前调用

在 Vite 插件配置中，有一个叫做`config`的钩子函数，用于**在构建过程中配置** Vite 的选项。插件可以使用 config 钩子来修改 Vite 的配置。然而，**Vite 在调用 config 钩子之前会解析所有的用户插件，并根据它们的配置进行初始化。**

也就是说，**在 config 钩子被调用之前，Vite 已经完成了对插件的解析和初始化**。因此，如果在 config 钩子中尝试注入其他插件，这些插件将不会被正确识别和应用。

换句话说，如果想在 Vite 中使用某个插 5 件，应该在配置文件`vite.config.ts`中直接声明和配置该插件，而不是尝试在 config 钩子中动态注入它们。

虽然它可以返回一个**将被深度合并到现有配置中的部分配置对象，或者直接改变配置，但是它并不能动态注入新的插件**

```javascript
// 返回部分配置（推荐）
const partialConfigPlugin = () => ({
  name: 'return-partial',
  config: () => ({
    resolve: {
      alias: {
        foo: 'bar',
      },
    },
  }),
})
```

### 🌻 configResolved - 解析 Vite 配置后调用

使用这个钩子读取和存储最终解析的配置。

```javascript
const examplePlugin = () => {
  let config

  return {
    name: 'read-config',

    configResolved(resolvedConfig) {
      // 存储最终解析的配置🌅
      config = resolvedConfig
    },

    // 在其他钩子中使用存储的配置
    transform(code, id) {
      // 使用
      if (config.command === 'serve') {
        // dev: 由开发服务器调用的插件
      } else {
        // build: 由 Rollup 调用的插件
      }
    },
  }
}
```

### 🛟 configureServer - 用于开发服务的配置

可在内部服务应用程序中添加自定义中间件，配置更多开发的服务配置

```javascript
const myPlugin = () => ({
  name: 'configure-server',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      // 自定义请求处理...
    })
  },
})
```

### 🍟 transformIndexHtml 转换 index.html

钩子接收当前的 HTML 字符串和转换上下文，可以是异步的。

```javascript
const htmlPlugin = () => {
  return {
    name: 'html-transform',
    transformIndexHtml(html) {
      return html.replace(/<title>(.*?)<\/title>/, `<title>Title replaced!</title>`)
    },
  }
}
```

### 🌽 handleHotUpdate - 执行自定义 HMR 更新处理

##### 钩子可以选择:

过滤和缩小受影响的模块列表，使 HMR 更准确。

返回一个空数组，并通过向客户端发送自定义事件来执行完整的自定义 HMR 处理

```tsx
// 钩子接收一个带有以下签名的上下文对象
interface HmrContext {
  file: string
  timestamp: number
  modules: Array<ModuleNode>
  read: () => string | Promise<string>
  server: ViteDevServer
}
```

**使用** **apply** **属性指明它们仅在** **'build'** **或** **'serve'** **模式时调用，也可以是一个函数**

```tsx
function myPlugin() {
  return {
    name: 'build-only',
    apply: 'build', // 或 'serve'
  }
}
```
