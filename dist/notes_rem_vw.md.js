import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.cc2b3d55.js";
const __pageData = JSON.parse('{"title":"🛟 rem+vw","description":"","frontmatter":{},"headers":[],"relativePath":"notes/rem+vw.md","filePath":"notes/rem+vw.md","lastUpdated":1690715805000}');
const _sfc_main = { name: "notes/rem+vw.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="🛟-rem-vw" tabindex="-1">🛟 rem+vw <a class="header-anchor" href="#🛟-rem-vw" aria-label="Permalink to &quot;🛟 rem+vw&quot;">​</a></h1><blockquote><p>🌻 rem+vw 如何实现响应式布局，它的局限是什么</p></blockquote><p>&quot;rem&quot; 和 &quot;vw&quot; 都是用于实现响应式布局的单位，它们都是相对于视口的尺寸而言的，但用法和特点略有不同。</p><ol><li>rem (root em): &quot;rem&quot; 是相对于根元素（通常是 <code>&lt;html&gt;</code> 标签）字体大小的单位。当设置根元素的字体大小为 16px 时，1rem 就等于 16px，2rem 就等于 32px，依此类推。因此，通过设置根元素的字体大小，可以轻松地控制整个页面中所有使用 rem 单位的元素的大小。</li><li>vw (viewport width): &quot;vw&quot; 表示视口宽度的百分比。1vw 等于视口宽度的 1%。例如，如果视口宽度为 1000px，1vw 就等于 10px。</li></ol><p>实现响应式布局的步骤：</p><ul><li>设置 <code>&lt;html&gt;</code> 标签的字体大小，以便使用 rem 单位进行布局。例如，可以将根元素的字体大小设置为 16px。</li><li>使用 rem 单位来定义元素的尺寸，例如宽度、高度、边距等。</li><li>使用 vw 单位来定义元素的尺寸或间距，以便根据视口宽度进行调整。</li></ul><p>响应式布局的优点：</p><ul><li>简化了页面的布局和缩放调整过程。</li><li>提供了一种相对于视口的尺寸单位，使得元素在不同设备上表现更一致。</li></ul><p>然而，rem+vw 布局也有一些局限性：</p><ol><li>兼容性：虽然 rem 和 vw 单位在现代浏览器中得到支持，但在一些旧版本浏览器中可能存在问题，需要针对性的兼容处理。</li><li>精确度：使用 rem 和 vw 单位可能导致尺寸的精确度不高，尤其是在一些特定的设计要求下。</li><li>特定场景问题：在某些情况下，使用 rem 和 vw 单位可能会带来一些奇怪的行为，例如视口宽度较小时，元素可能会变得过小或不可读。</li><li>复杂布局：对于复杂的布局，仅仅使用 rem+vw 可能不足以满足需求，可能需要结合其他响应式布局技术来实现更复杂的效果。</li></ol><p>总体而言，rem+vw 是一种方便的响应式布局方法，但在使用时需要注意它的局限性，并在特定场景下做出权衡。对于复杂的项目，通常需要综合考虑多种布局技术来实现最佳的响应式效果。</p><blockquote><p>🚁 设计稿 750px，得到 1rem 等于 10px 的响应式，如何计算 root 的 font-size 的大小</p></blockquote><p>如果你想要实现 1rem 等于 10px 的响应式布局，我们可以按照以下计算方法来设置根元素（root）的字体大小：</p><ol><li>计算 1rem 等于多少 vw： 由于 1rem 等于 10px，我们需要将其转换为 vw 单位。假设设计稿的宽度为 750px，我们可以使用以下计算： 1rem = 10px 1vw = 设计稿宽度 / 100 = 750px / 100 = 7.5px</li><li>计算根元素的字体大小： 因为 1vw 等于 7.5px，我们希望 1rem 等于 10px，所以根元素的字体大小应该是： 根元素的字体大小 = 1rem / 1vw = 10px / 7.5px ≈ 1.333vw</li></ol><p>因此，你可以将根元素的字体大小设置为 1.333vw，这样 1rem 就等于 10px。在 CSS 中设置如下：</p><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#FFCB6B" })}">html</span><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}"> </span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}">  </span><span style="${ssrRenderStyle({ "color": "#B2CCD6" })}">font-size</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">:</span><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}"> </span><span style="${ssrRenderStyle({ "color": "#F78C6C" })}">1.333vw</span><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">;</span><span style="${ssrRenderStyle({ "color": "#A6ACCD" })}"> </span><span style="${ssrRenderStyle({ "color": "#676E95", "font-style": "italic" })}">/* 1rem equals 10px */</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#89DDFF" })}">}</span></span></code></pre></div><p>请注意，由于使用了 vw 单位，这个设置将根据视口宽度进行调整，实现了响应式的效果，但也需要注意兼容性问题，特别是在一些旧版本浏览器上可能存在一些差异。因此，在实际应用中，建议进行兼容性测试并根据实际情况进行调整。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("notes/rem+vw.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const rem_vw = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  rem_vw as default
};
