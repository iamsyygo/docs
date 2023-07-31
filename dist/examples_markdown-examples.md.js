import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.cc2b3d55.js";
const __pageData = JSON.parse('{"title":"Markdown 使用示例","description":"","frontmatter":{},"headers":[],"relativePath":"examples/markdown-examples.md","filePath":"examples/markdown-examples.md","lastUpdated":1689167996000}');
const _sfc_main = { name: "examples/markdown-examples.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="markdown-使用示例" tabindex="-1">Markdown 使用示例 <a class="header-anchor" href="#markdown-使用示例" aria-label="Permalink to &quot;Markdown 使用示例&quot;">​</a></h1><p>这个页面展示一些内置的 Markdown 扩展使用示例</p><h2 id="语法高亮显示" tabindex="-1">语法高亮显示 <a class="header-anchor" href="#语法高亮显示" aria-label="Permalink to &quot;语法高亮显示&quot;">​</a></h2><p>VitePress 提供语法高亮显示的 <a href="https://github.com/shikijs/shiki" target="_blank" rel="noreferrer">Shiki</a>, 与 line-highlighting 等附加功能:</p><p><strong>使用</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">\`\`\`js{4}</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">export default {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">  data () {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">    return {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">      msg: &#39;Markdown 扩展使用示例!&#39;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">    }</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">  }</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">}</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">\`\`\`</span></span></code></pre></div><p><strong>效果</strong></p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight has-highlighted-lines"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF", "font-style": "italic" })}">export</span><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}"> </span><span style="${ssrRenderStyle({ "color": "#89DDFF", "font-style": "italic" })}">default</span><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}"> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">  </span><span style="${ssrRenderStyle({ "color": "#F07178" })}">data</span><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}"> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">()</span><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}"> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#F07178" })}">    </span><span style="${ssrRenderStyle({ "color": "#89DDFF", "font-style": "italic" })}">return</span><span style="${ssrRenderStyle({ "color": "#F07178" })}"> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">{</span></span>
<span class="line highlighted"><span style="${ssrRenderStyle({ "color": "#F07178" })}">      msg</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">:</span><span style="${ssrRenderStyle({ "color": "#F07178" })}"> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&#39;</span><span style="${ssrRenderStyle({ "color": "#C3E88D" })}">Markdown 扩展使用示例!</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">&#39;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#F07178" })}">    </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">}</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#F07178" })}">  </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">}</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">}</span></span></code></pre></div><h2 id="自定义容器" tabindex="-1">自定义容器 <a class="header-anchor" href="#自定义容器" aria-label="Permalink to &quot;自定义容器&quot;">​</a></h2><p><strong>使用</strong></p><div class="language-md"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">::: info</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">这是一个信息框.</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">:::</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">::: tip</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">这是一个提示.</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">:::</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">::: warning</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">这是一个警告.</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">:::</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">::: danger</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">这是一个危险的警告.</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">:::</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">::: details</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">这是一个细节.</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">:::</span></span></code></pre></div><p><strong>Output</strong></p><div class="info custom-block"><p class="custom-block-title">INFO</p><p>这是一个信息框.</p></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>这是一个提示.</p></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>这是一个警告.</p></div><div class="danger custom-block"><p class="custom-block-title">DANGER</p><p>这是一个危险的警告.</p></div><details class="details custom-block"><summary>Details</summary><p>这是一个细节.</p></details><h2 id="更多" tabindex="-1">更多 <a class="header-anchor" href="#更多" aria-label="Permalink to &quot;更多&quot;">​</a></h2><p><a href="https://vitepress.dev/guide/markdown" target="_blank" rel="noreferrer">查看更多文档 markdown 的完整列表扩展</a></p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("examples/markdown-examples.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const markdownExamples = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  markdownExamples as default
};
