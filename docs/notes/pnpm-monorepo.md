---
title: pnpm-monorepo
---

# ⏳ 使用 pnpm 管理 Monorepo

:::tip 🌅 介绍
Pnpm 是一个快速、零配置的 JavaScript 项目管理工具，它使用了一种独特的方式来存储依赖，以此来减少磁盘空间和提高安装速度。内置对 Monorepo 的支持，可以很好的解决 Monorepo 项目中的 “幽灵依赖” 问题。

Monorepo 是一种管理项目的方式，它可以将多个项目放在一个仓库中，这样可以更好的复用代码、依赖、工程配置等，提高开发、协作效率，同时也可以减少维护成本。

:::

## 📦 安装 pnpm

```bash
# 使用 npm 安装 pnpm
npm install -g pnpm
```

## 🛠 初始化 Monorepo

```bash
# 初始化 Monorepo
pnpm init

# 创建 pnpm-workspace.yaml
touch pnpm-workspace.yaml

# 创建 packages 目录
mkdir packages

# 创建子项目
cd packages
npx vite create <project-name>

```

## 🔗 添加配置

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
```

:::tip 🛟 what does it mean?
`pnpm-workspace.yaml` 是 pnpm 的配置文件，它用于配置 Monorepo 的工作空间，这里配置 `packages/*`，表示 `packages` 目录下的所有子目录都是一个子项目。
:::

**创建 npmrc 文件，配置 pnpm 作为包管理器**

```bash
# 创建 npmrc 文件
touch .npmrc

# 使用 pnpm 作为包管理器
package-manager=pnpm
hoist-pattern[]=ts-node
engine-strict=true
progress=true
```

```json
// package.json
{
  "scripts": {
    "preinstall": "node -e \"if (!process.env.npm_config_user_agent.includes('pnpm')) throw new Error('You must use pnpm to install dependencies')\"" // [!code error]
  },
  "engines": {
    "node": "^14.18.0 ||>=16.18.0",
    "pnpm": ">=7.26.3"
  },
  "packageManager": "pnpm@7.26.3"
}
```

## 📦 安装依赖

```bash
# 安装依赖, 在根目录执行
pnpm install
```

此时，会在根目录生成一个 `pnpm-lock.yaml` 文件，它用于记录所有子项目的依赖信息。

## 🚀 开发

```bash
# 进入子项目
cd packages/<project-name>

# 启动开发服务器
pnpm dev
```

:::tip 🌻 如何在根目录执行 `pnpm dev`？
在根目录的 `package.json` 中添加如下配置：
`--filter  -F` 参数用于指定执行的子项目，`<project-name>` 为子项目名称。

```json
{
  "scripts": {
    "dev": "pnpm run dev --filter packages/<project-name>"
  }
}
```

或者

```json
{
  "scripts": {
    "dev": "pnpm run dev -F packages/<project-name>"
  }
}
```

:::

## 🍯 pnpm 命令

- `pnpm install` 安装依赖
- `-r` 递归执行命令，比如 `pnpm -r run build` 会递归执行**所有子项目**的 `build` 命令
- `--filter` 指定执行的子项目，比如 `pnpm run build --filter packages/<project-name>` 会执行指定子项目的 `build` 命令
  需要注意的是执行的顺序会安装依赖的相互依赖关系来决定，而不是根据文件夹的顺序来决定。这样在构建一个产物时，可以先构建依赖的子项目，再构建依赖的子项目，以此类推。
- `pnpm run watch -r` 监听所有子项目的文件变化，自动执行 `build` 命，or `pnpm run watch --filter packages/<project-name>` 监听指定子项目的文件变化，自动执行 `build` 命令，增加`--parallel` 参数可以并行执行
