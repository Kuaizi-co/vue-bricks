!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("vue-bricks",[],e):"object"==typeof exports?exports["vue-bricks"]=e():t["vue-bricks"]=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/dist/",e(e.s=2)}([function(t,e,n){function r(t){n(9)}var i=n(7)(n(1),n(8),r,"data-v-221bd178",null);t.exports=i.exports},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(4),i=n(3);e.default={name:"bricks",props:{data:{type:Array,required:!0},sizes:{type:Array,required:!0},packed:{type:String,default:"data-packed"},position:{type:Boolean,default:!1},container:{type:[HTMLElement,window]},offset:{type:Number,default:function(t){return 0}}},data:function(){return{len:0}},watch:{data:function(t){this.len>=t.length||0===this.len?this.packLayout():this.updateLayout(),this.len=t.length},sizes:function(t){this.updateLayout()},packed:function(t){this.updateLayout()},position:function(t){this.updateLayout()}},methods:{updateLayout:function(){var t=this;this.$nextTick(function(e){return t.bricks.update()})},packLayout:function(){var t=this;this.$nextTick(function(e){return t.bricks.pack()})},pack:function(){this.bricks.pack()},resize:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.bricks.resize(t)},update:function(){this.bricks.update()}},mounted:function(){var t=this;this.bricks=n.i(r.a)({container:this.$el,sizes:this.sizes,packed:this.packed,position:this.position}),this.bricks.on("pack",function(){for(var e=arguments.length,n=Array(e),r=0;r<e;r++)n[r]=arguments[r];t.$emit("pack",n)}),this.bricks.on("update",function(){for(var e=arguments.length,n=Array(e),r=0;r<e;r++)n[r]=arguments[r];t.$emit("update",n)}),this.bricks.on("resize",function(){for(var e=arguments.length,n=Array(e),r=0;r<e;r++)n[r]=arguments[r];t.$emit("resize",n)}),this.bricks.resize(!0).pack(),this.scrollEmitter=new i.a(this.container,{offset:this.offset}),this.scrollEmitter.on("reach",function(){return t.$emit("reach")})},destroyed:function(){this.scrollEmitter.destroy()}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(0),i=n.n(r);i.a.install=function(t){t.component(i.a.name,i.a)},e.default=i.a},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),o=function(){function t(e,n){r(this,t),this.$el=e||window,this.props=Object.assign({offset:0},n),this._eventList=[],this._initEvent()}return i(t,[{key:"_initEvent",value:function(){var t=this,e=function(){return t.calcReach()};this.$el.addEventListener("scroll",e,!1)}},{key:"calcReach",value:function(){var t=this.$el===window?document.body||document.documentElement:this.$el,e=t.scrollHeight;t.scrollTop+window.innerHeight+this.props.offset>=e&&this.fire()}},{key:"on",value:function(t,e){this._eventList.push({name:t,list:[e]})}},{key:"off",value:function(t,e){this._eventList=e?this._eventList.filter(function(n){return n.name===t&&(n.list=n.list.filter(function(t){return t!==e})),n}):this._eventList.filter(function(e){return e.name!==t})}},{key:"fire",value:function(t){var e=this._eventList;t&&(e=e.some(function(e){return e.name===t})),e.forEach(function(t){t.list.forEach(function(t){return t()})})}},{key:"destroy",value:function(){var t=this,e=function(){return t.calcReach()};this.$el.removeEventListener("scroll",e,!1)}}]),t}();e.a=o},function(t,e,n){"use strict";var r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},i=function(){function t(t,e){return a[t]=a[t]||[],a[t].push(e),this}function e(e,n){return n._once=!0,t(e,n),this}function n(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return e?a[t].splice(a[t].indexOf(e),1):delete a[t],this}function i(t){for(var e=this,r=arguments.length,i=Array(r>1?r-1:0),o=1;o<r;o++)i[o-1]=arguments[o];var s=a[t]&&a[t].slice();return s&&s.forEach(function(r){r._once&&n(t,r),r.apply(e,i)}),this}var o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=Object.create(null);return r({},o,{on:t,once:e,off:n,emit:i})},o=function(){function t(t){t.forEach(function(t){return t()})}function e(t){arguments.length>1&&void 0!==arguments[1]?arguments[1]:document;return Array.prototype.slice.call(t)}function n(t){return Array.apply(null,Array(t)).map(function(){return 0})}function r(){return z.map(function(t){return t.mq&&window.matchMedia("(min-width: "+t.mq+")").matches}).indexOf(!0)}function o(){k=r()}function a(){x=-1===k?z[z.length-1]:z[k]}function s(){w=n(x.columns)}function u(){$=R[b?"new":"all"]()}function c(){0!==$.length&&(j=$.map(function(t){return t.clientWidth}),M=$.map(function(t){return t.clientHeight}))}function f(){$.forEach(function(t,e){_=w.indexOf(Math.min.apply(Math,w)),t.style.position="absolute",E=w[_]+"px",C=_*j[e]+_*x.gutter+"px",A?(t.style.top=E,t.style.left=C):t.style.transform="translate3d("+C+", "+E+", 0)",t.setAttribute(T,""),L=j[e],O=M[e],L&&O&&(w[_]+=O+x.gutter)})}function l(){S.style.position="relative",S.style.width=x.columns*L+(x.columns-1)*x.gutter+"px",S.style.height=Math.max.apply(Math,w)-x.gutter+"px"}function d(){g||(window.requestAnimationFrame(p),g=!0)}function p(){k!==r()&&(h(),q.emit("resize",x)),g=!1}function h(){return b=!1,t(N.concat(U)),q.emit("pack")}function v(){return b=!0,t(U),q.emit("update")}function m(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],e=t?"addEventListener":"removeEventListener";return window[e]("resize",d),q}var y=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},b=void 0,g=void 0,k=void 0,x=void 0,_=void 0,w=void 0,E=void 0,C=void 0,L=void 0,O=void 0,$=void 0,j=void 0,M=void 0,T=0===y.packed.indexOf("data-")?y.packed:"data-"+y.packed,z=y.sizes.slice().reverse(),A=!1!==y.position,S=y.container.nodeType?y.container:document.querySelector(y.container),R={all:function(){return e(S.children)},new:function(){return e(S.children).filter(function(t){return!t.hasAttribute(""+T)})}},N=[o,a,s],U=[u,c,f,l],q=i({pack:h,update:v,resize:m});return q};e.a=o},function(t,e,n){e=t.exports=n(6)(),e.push([t.i,".vue-bricks[data-v-221bd178]{position:relative;margin:0 auto}.vue-bricks--item[data-v-221bd178]{float:left;position:absolute;top:100%;left:50%;opacity:0;transition:all .5s cubic-bezier(.55,0,.1,1)}.vue-bricks--item[data-packed][data-v-221bd178],.vue-bricks--item[packed][data-v-221bd178]{top:0;left:0;opacity:1}",""])},function(t,e){t.exports=function(){var t=[];return t.toString=function(){for(var t=[],e=0;e<this.length;e++){var n=this[e];n[2]?t.push("@media "+n[2]+"{"+n[1]+"}"):t.push(n[1])}return t.join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},i=0;i<this.length;i++){var o=this[i][0];"number"==typeof o&&(r[o]=!0)}for(i=0;i<e.length;i++){var a=e[i];"number"==typeof a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),t.push(a))}},t}},function(t,e){t.exports=function(t,e,n,r,i){var o,a=t=t||{},s=typeof t.default;"object"!==s&&"function"!==s||(o=t,a=t.default);var u="function"==typeof a?a.options:a;e&&(u.render=e.render,u.staticRenderFns=e.staticRenderFns),r&&(u._scopeId=r);var c;if(i?(c=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),n&&n.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(i)},u._ssrRegister=c):n&&(c=n),c){var f=u.functional,l=f?u.render:u.beforeCreate;f?u.render=function(t,e){return c.call(e),l(t,e)}:u.beforeCreate=l?[].concat(l,c):[c]}return{esModule:o,exports:a,options:u}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vue-bricks"},t._l(t.data,function(e,r){return n("div",{key:r,staticClass:"vue-bricks--item"},[t._t("default",null,{item:e})],2)}))},staticRenderFns:[]}},function(t,e,n){var r=n(5);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);n(10)("1e6b82e8",r,!0)},function(t,e,n){function r(t){for(var e=0;e<t.length;e++){var n=t[e],r=f[n.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++)r.parts[i](n.parts[i]);for(;i<n.parts.length;i++)r.parts.push(o(n.parts[i]));r.parts.length>n.parts.length&&(r.parts.length=n.parts.length)}else{for(var a=[],i=0;i<n.parts.length;i++)a.push(o(n.parts[i]));f[n.id]={id:n.id,refs:1,parts:a}}}}function i(){var t=document.createElement("style");return t.type="text/css",l.appendChild(t),t}function o(t){var e,n,r=document.querySelector('style[data-vue-ssr-id~="'+t.id+'"]');if(r){if(h)return v;r.parentNode.removeChild(r)}if(m){var o=p++;r=d||(d=i()),e=a.bind(null,r,o,!1),n=a.bind(null,r,o,!0)}else r=i(),e=s.bind(null,r),n=function(){r.parentNode.removeChild(r)};return e(t),function(r){if(r){if(r.css===t.css&&r.media===t.media&&r.sourceMap===t.sourceMap)return;e(t=r)}else n()}}function a(t,e,n,r){var i=n?"":r.css;if(t.styleSheet)t.styleSheet.cssText=y(e,i);else{var o=document.createTextNode(i),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(o,a[e]):t.appendChild(o)}}function s(t,e){var n=e.css,r=e.media,i=e.sourceMap;if(r&&t.setAttribute("media",r),i&&(n+="\n/*# sourceURL="+i.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}var u="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!u)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var c=n(11),f={},l=u&&(document.head||document.getElementsByTagName("head")[0]),d=null,p=0,h=!1,v=function(){},m="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());t.exports=function(t,e,n){h=n;var i=c(t,e);return r(i),function(e){for(var n=[],o=0;o<i.length;o++){var a=i[o],s=f[a.id];s.refs--,n.push(s)}e?(i=c(t,e),r(i)):i=[];for(var o=0;o<n.length;o++){var s=n[o];if(0===s.refs){for(var u=0;u<s.parts.length;u++)s.parts[u]();delete f[s.id]}}}};var y=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(t,e){t.exports=function(t,e){for(var n=[],r={},i=0;i<e.length;i++){var o=e[i],a=o[0],s=o[1],u=o[2],c=o[3],f={id:t+":"+i,css:s,media:u,sourceMap:c};r[a]?r[a].parts.push(f):n.push(r[a]={id:a,parts:[f]})}return n}}])});
//# sourceMappingURL=index.js.map