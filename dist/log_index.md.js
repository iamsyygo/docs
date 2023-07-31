import { defineComponent, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { Timeline, TimelineItem, Card } from "ant-design-vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.cc2b3d55.js";
const data = [
  {
    color: "#3eaf7c",
    title: "V1.0.9 版本发布",
    date: "2021-01-01",
    list: [
      { text: "初始化项目", type: "add" },
      { text: "修复项目", type: "fix" },
      { text: "修改项目", type: "change" },
      { text: "删除项目", type: "remove" }
    ]
  },
  {
    color: "#3eaf7c",
    title: "V1.0.4 版本发布",
    date: "2021-01-01",
    list: [
      { text: "初始化项目", type: "add" },
      { text: "修复项目", type: "fix" },
      { text: "修改项目", type: "change" },
      { text: "删除项目", type: "remove" }
    ]
  },
  {
    color: "#3eaf7c",
    title: "V1.0.1 版本发布",
    date: "2021-01-01",
    list: [
      { text: "初始化项目", type: "add" },
      { text: "修复项目", type: "fix" },
      { text: "修改项目", type: "change" },
      { text: "删除项目", type: "remove" }
    ]
  }
];
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{"0":"日","1":"志"},"headers":[],"relativePath":"log/index.md","filePath":"log/index.md","lastUpdated":1690023781000}');
const __default__ = { name: "log/index.md" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(unref(Timeline), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(data), (item, i) => {
              _push2(ssrRenderComponent(unref(TimelineItem), {
                key: i,
                color: item.color
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Card), {
                      hoverable: "",
                      bodyStyle: {
                        padding: "0px 16px"
                      }
                    }, {
                      title: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="${ssrRenderClass(_ctx.$style["item-title"])}"${_scopeId3}><div${_scopeId3}>${ssrInterpolate(item.title)}</div><div class="date-title"${_scopeId3}>${ssrInterpolate(item.date)}</div></div>`);
                        } else {
                          return [
                            createVNode("div", {
                              class: _ctx.$style["item-title"]
                            }, [
                              createVNode("div", null, toDisplayString(item.title), 1),
                              createVNode("div", { class: "date-title" }, toDisplayString(item.date), 1)
                            ], 2)
                          ];
                        }
                      }),
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<ol${_scopeId3}><!--[-->`);
                          ssrRenderList(item.list, (c, idx) => {
                            _push4(`<li${_scopeId3}>${ssrInterpolate(c.text)}</li>`);
                          });
                          _push4(`<!--]--></ol>`);
                        } else {
                          return [
                            createVNode("ol", null, [
                              (openBlock(true), createBlock(Fragment, null, renderList(item.list, (c, idx) => {
                                return openBlock(), createBlock("li", { key: idx }, toDisplayString(c.text), 1);
                              }), 128))
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(Card), {
                        hoverable: "",
                        bodyStyle: {
                          padding: "0px 16px"
                        }
                      }, {
                        title: withCtx(() => [
                          createVNode("div", {
                            class: _ctx.$style["item-title"]
                          }, [
                            createVNode("div", null, toDisplayString(item.title), 1),
                            createVNode("div", { class: "date-title" }, toDisplayString(item.date), 1)
                          ], 2)
                        ]),
                        default: withCtx(() => [
                          createVNode("ol", null, [
                            (openBlock(true), createBlock(Fragment, null, renderList(item.list, (c, idx) => {
                              return openBlock(), createBlock("li", { key: idx }, toDisplayString(c.text), 1);
                            }), 128))
                          ])
                        ]),
                        _: 2
                      }, 1024)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(data), (item, i) => {
                return openBlock(), createBlock(unref(TimelineItem), {
                  key: i,
                  color: item.color
                }, {
                  default: withCtx(() => [
                    createVNode(unref(Card), {
                      hoverable: "",
                      bodyStyle: {
                        padding: "0px 16px"
                      }
                    }, {
                      title: withCtx(() => [
                        createVNode("div", {
                          class: _ctx.$style["item-title"]
                        }, [
                          createVNode("div", null, toDisplayString(item.title), 1),
                          createVNode("div", { class: "date-title" }, toDisplayString(item.date), 1)
                        ], 2)
                      ]),
                      default: withCtx(() => [
                        createVNode("ol", null, [
                          (openBlock(true), createBlock(Fragment, null, renderList(item.list, (c, idx) => {
                            return openBlock(), createBlock("li", { key: idx }, toDisplayString(c.text), 1);
                          }), 128))
                        ])
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1032, ["color"]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const style0 = {
  "item-title": "_item-title_fpcyu_2",
  "date-title": "_date-title_fpcyu_9"
};
const cssModules = {
  "$style": style0
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("log/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules]]);
export {
  __pageData,
  index as default
};
