import{d as p,c,o as u,J as d,E as l,b as m,S as f,U as h,C as g,_ as v,ae as s,Q as r,ah as y,ai as A,aj as S,ak as w,al as x,am as C,an as P,ao as E,ap as I,aq as b,M as L,u as R,q as T,k as F,ar as N,as as D,at as V}from"./chunks/framework.40a7f398.js";import{t as i}from"./chunks/theme.0c97e8be.js";import{U as $}from"./chunks/useConfigInject.fb0436f2.js";const j=["innerHTML"],k=p({__name:"SvgImage",props:{svg:{}},setup(e){return(t,a)=>(u(),c("figure",{class:"svg-image-root",innerHTML:t.svg},null,8,j))}});const B=e=>(f("data-v-45112783"),e=e(),h(),e),M={class:"not-found"},O=B(()=>g("div",{style:{"font-size":"18px","font-weight":"bold"}},"页面找不到 🦆",-1)),H=p({__name:"NotFound",setup(e){return(t,a)=>(u(),c("div",M,[d(m($),{imageStyle:{height:"300px"}},{description:l(()=>[O]),_:1})]))}});const U=v(H,[["__scopeId","data-v-45112783"]]),q={...i,Layout(){return s(i.Layout,null,{"not-found":()=>s(U)})},enhanceApp({app:e}){e.component("SvgImage",k)}};function _(e){if(e.extends){const t=_(e.extends);return{...t,...e,async enhanceApp(a){t.enhanceApp&&await t.enhanceApp(a),e.enhanceApp&&await e.enhanceApp(a)}}}return e}const n=_(q),z=p({name:"VitePressApp",setup(){const{site:e}=R();return T(()=>{F(()=>{document.documentElement.lang=e.value.lang,document.documentElement.dir=e.value.dir})}),N(),D(),V(),n.setup&&n.setup(),()=>s(n.Layout)}});async function G(){const e=Q(),t=J();t.provide(A,e);const a=S(e.route);return t.provide(w,a),t.component("Content",x),t.component("ClientOnly",C),Object.defineProperties(t.config.globalProperties,{$frontmatter:{get(){return a.frontmatter.value}},$params:{get(){return a.page.value.params}}}),n.enhanceApp&&await n.enhanceApp({app:t,router:e,siteData:P}),{app:t,router:e,data:a}}function J(){return E(z)}function Q(){let e=r,t;return I(a=>{let o=b(a);return e&&(t=o),(e||t===o)&&(o=o.replace(/\.js$/,".lean.js")),r&&(e=!1),L(()=>import(o),[])},n.NotFound)}r&&G().then(({app:e,router:t,data:a})=>{t.go().then(()=>{y(t.route,a.site),e.mount("#app")})});export{G as createApp};