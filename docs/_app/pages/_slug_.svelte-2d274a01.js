import{_ as c}from"../chunks/preload-helper-ec9aa979.js";import{S as v,i as w,s as E,w as l,l as f,x as y,y as m,g as d,o as u,p as g,q as o,d as h,B as k,n as $}from"../chunks/vendor-15527e3e.js";function j(a){let e,s,t;var n=a[0].default;function i(r){return{}}return n&&(e=new n(i())),{c(){e&&l(e.$$.fragment),s=f()},l(r){e&&y(e.$$.fragment,r),s=f()},m(r,p){e&&m(e,r,p),d(r,s,p),t=!0},p(r,p){if(n!==(n=r[0].default)){if(e){$();const _=e;u(_.$$.fragment,1,0,()=>{k(_,1)}),g()}n?(e=new n(i()),l(e.$$.fragment),o(e.$$.fragment,1),m(e,s.parentNode,s)):e=null}},i(r){t||(e&&o(e.$$.fragment,r),t=!0)},o(r){e&&u(e.$$.fragment,r),t=!1},d(r){r&&h(s),e&&k(e,r)}}}function O(a){let e,s,t=a[0]&&j(a);return{c(){t&&t.c(),e=f()},l(n){t&&t.l(n),e=f()},m(n,i){t&&t.m(n,i),d(n,e,i),s=!0},p(n,[i]){n[0]?t?(t.p(n,i),i&1&&o(t,1)):(t=j(n),t.c(),o(t,1),t.m(e.parentNode,e)):t&&($(),u(t,1,1,()=>{t=null}),g())},i(n){s||(o(t),s=!0)},o(n){u(t),s=!1},d(n){t&&t.d(n),n&&h(e)}}}const b={"../pages/archive.md":()=>c(()=>import("../chunks/archive-6f71d5b7.js"),["chunks/archive-6f71d5b7.js","chunks/vendor-15527e3e.js"]),"../pages/blog.md":()=>c(()=>import("../chunks/blog-ebc84a60.js"),["chunks/blog-ebc84a60.js","chunks/vendor-15527e3e.js"]),"../pages/index.md":()=>c(()=>import("../chunks/index-4cd30842.js"),["chunks/index-4cd30842.js","chunks/vendor-15527e3e.js"]),"../pages/projects.md":()=>c(()=>import("../chunks/projects-00676cf5.js"),["chunks/projects-00676cf5.js","chunks/vendor-15527e3e.js"])},A=async({params:a})=>{const e=`../pages/${a.slug}.md`;return Object.keys(b).indexOf(e)===-1?{}:{props:{page:await b[e]().then(t=>t)}}};function x(a,e,s){let{page:t}=e;return a.$$set=n=>{"page"in n&&s(0,t=n.page)},[t]}class I extends v{constructor(e){super();w(this,e,x,O,E,{page:0})}}export{I as default,A as load};