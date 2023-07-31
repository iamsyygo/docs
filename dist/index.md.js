import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.cc2b3d55.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{"layout":"home","hero":{"name":"Aoe","text":"文档、笔记、工具...","tagline":"Documentation, Notes, Tools...","image":{"src":"/logo.svg","alt":"Aoe"},"actions":[{"theme":"brand","text":"开始阅读 🥽","link":"/notes/vue3-略知一二"},{"theme":"alt","text":"API 示例 🌰","link":"/api-examples"}]},"features":[{"title":"pnpm","icon":"⏳","details":"速度快、节省磁盘空间的软件包管理器，内置对单个源码仓库中包含多个软件包的支持","link":"https://pnpm.io/"},{"title":"Vite","icon":"⚡️","details":"下一代前端工具，基于 ES Modules 打包，开发环境基于浏览器原生 ES imports 开发","link":"https://vitejs.dev/"},{"title":"Vue","icon":"🖖","details":"渐进式 JavaScript 框架，易用、灵活、高效，可用于开发 Web 界面、单页应用等","link":"https://v3.vuejs.org/"},{"title":"TypeScript","icon":"🏷","details":"JavaScript 的超集，可编译为纯 JavaScript，支持类型系统、泛型、接口等","link":"https://www.typescriptlang.org/"},{"title":"Monorepo","icon":"🛟","details":"一种管理项目的方式，将多个项目放在一个仓库中，以便更好的管理和复用代码"},{"title":"Node.js","icon":"🚀","details":"一个基于 Chrome V8 引擎的 JavaScript 运行环境，可用于开发 Web 服务端应用","link":"https://nodejs.org/"},{"title":"NestJS","icon":"🐱","details":"用于构建高效、可扩展的服务端应用程序的渐进式 Node.js 框架","link":"https://nestjs.com/"},{"title":"Nginx","icon":"🌐","details":"一个高性能的 HTTP 和反向代理服务器，也是一个 IMAP/POP3/SMTP 代理服务器","link":"https://nginx.org/"}]},"headers":[],"relativePath":"index.md","filePath":"index.md","lastUpdated":1690715805000}');
const _sfc_main = { name: "index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
