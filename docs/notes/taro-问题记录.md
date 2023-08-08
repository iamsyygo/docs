# 🌴 Taro Vue3

### 📝 问题记录

1、编译宏 defineAppConfig、definePageConfig 报 typescript 未定义错误

- [x] 可能是创建的模板初始化时为配置完整类型导致的

```typescript
// types/global.d.ts
/// <reference types="@tarojs/taro" />
```

2、路径别名配置

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}

// config/index.js
const { resolve } = require('path')

const config = {
  // ellipsis some code
  alias: {
    '@': resolve(__dirname, '..', 'src'),
  },
}
```

3、使用 Vant Weapp

> 使用原生组件，将不再具备多端兼容能力。推荐 Vant Weapp 社区衍生库 `@antmjs/vantui`， 它是基于 Vant Weapp 开发的多端组件库

```bash
# 建议使用--production选项，可以减少安装一些业务无关的开发环境 npm 包，从而减少整个小程序包的大小
pnpm add vant-weapp -S --production
```

> 开始构建 npm 包前，检查参与构建 npm 的 package.json 是否在 project.config.json 的 miniprogramRoot 定义目录之内，miniprogramRoot 默认为 `/dist`，package.json 在其外部，npm 构建无法正常工作。
>
> - packNpmManually 为 true 时，需要手动配置 packNpmRelationList，false 时，自动构建 npm
> - packNpmRelationList 配置项，用于配置需要构建的 npm 包的 package.json 路径和构建后的路径
> - packageJsonPath 为 package.json 的路径
> - miniprogramNpmDistDir 为构建后的路径，默认为 miniprogram_npm

```json
{
  "miniprogramRoot": "./dist",
  // ellipsis some code...
  "setting": {
    // ellipsis some code...
    "packNpmManually": true,
    "packNpmRelationList": [
      {
        "packageJsonPath": "./package.json",
        "miniprogramNpmDistDir": "./"
      }
    ]
  }
}
```

开始构建 npm 包时发现报错

> 由于此工程是一个 taro 编译构建的工程，每次重新编译后，都会重新生成 dist 目录(`package.json` 文件会被清空，又不能提供工程根目录的 `package.json` 它带有其他不必要的依赖 taro、vue 等)，所以此方法不适用

> 转使用 copy 配置

```typescript
// config/index.js
copy: {
   patterns: [{ from: "node_modules/vant-weapp/dist/", to: "src/components/vant-weapp" }],
   options: {},
 }
```

使用页面配置

```typescript
{
  "usingComponents": {
    // 此路径应以 taro 开发路径为准
    "van-button": "../../components/vant-weapp/button/index"
  }
}

// or
function resolveVant(name: string) {
  return `../../components/vant-weapp/${name}/index`;
}

export default definePageConfig({
  navigationBarTitleText: "首页",
  enableShareTimeline: true,
  enablePullDownRefresh: false,
  usingComponents: {
    "van-button": resolveVant("button"),
  },
});

```

默认情况会将 wxss 也一同复制

配置 vant 的路径别名

````typescript
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@vant/*": ["src/components/vant-weapp/*"]
    }
  }
}

// config/index.js
{
  alias: {
    "@vant": resolve(__dirname, "..", "src/components/vant-weapp"),
  },
}
```

4、 安装对应最新基础库的定义文件，增强开发体验

```bash
pnpm add miniprogram-api-typings -D
````

安装后手动导入：

`import 'miniprogram-api-typings';`
或者在 ts 配置中指定：

在 tsconfig.json 中指定 `types: ["miniprogram-api-typings"]`
或者通过 三斜杠指令 引用：

`/// <reference path="node_modules/miniprogram-api-typings/index.d.ts" />`

```json
// 微信小程序 API 的 TypeScript 类型定义文件
// tsconfig.json
{
  "compilerOptions": {
    "types": ["miniprogram-api-typings"]
  }
}
```
