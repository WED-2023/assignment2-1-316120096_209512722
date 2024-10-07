(self["webpackChunkassignment_2_1"]=self["webpackChunkassignment_2_1"]||[]).push([[279],{1041:(e,t,r)=>{"use strict";r.d(t,{A:()=>d});var i=function(){var e=this,t=e._self._c;return t("div",{staticClass:"generic-page",style:e.backgroundStyle},[t("h1",{staticClass:"title"},[e._v(e._s(e.pageName))]),t("div",{staticClass:"recipes-grid"},[e.isLoading?t("div",{staticClass:"loading"},[t("div",{staticClass:"loading-spinner"}),t("p",[e._v("Loading recipes...")])]):e.error?t("div",{staticClass:"error"},[t("div",{staticClass:"error-icon"},[e._v("❌")]),t("h2",[e._v("Oops! Something went wrong.")]),t("p",[e._v(e._s(e.error))])]):e.items.length>0?t("div",{staticClass:"recipe-list"},e._l(e.items,(function(r){return t("div",{key:r.id,class:e.isFamilyRecipe?"family-recipe":"recipe-item-container"},[t("div",{staticClass:"recipe-header"},[e.isFamilyRecipe?t("div",{staticClass:"recipe-details"},[t("span",{staticClass:"recipe-creator"},[e._v("Made by: "+e._s(r.whomade))]),t("span",{staticClass:"recipe-occasion"},[e._v("For: "+e._s(r.whenmade))])]):e._e()]),t("RecipePreview",{staticClass:"recipe-item",attrs:{recipe:r}})],1)})),0):t("div",{staticClass:"no-generic"},[t("div",{staticClass:"empty-icon"},[e._v("📖")]),t("h2",[e._v(e._s(e.newPageMessage.header))]),t("p",[e._v(" "+e._s(e.newPageMessage.body)+" ")])])])])},a=[],n=r(4048),s=r(9201),o=r(388),c=(r(115),r(9581),r(8743),r(4913),r(6285));const l={name:"GenericPage",components:{RecipePreview:c.A},props:{isFamilyRecipe:{type:Boolean,default:!1},pageName:{type:String,required:!0},fetchData:{type:Function,required:!0},newPageMessage:{type:{header:String,body:String},default:{header:"Your Taste Gallery Awaits!",body:"Every masterpiece starts with a blank canvas. Begin your culinary journey and fill this space with your favorite flavors. 🎨👨‍🍳"}},background:{type:String,default:null}},computed:{backgroundStyle:function(){return this.isFamilyRecipe?{backgroundImage:"linear-gradient(-70deg, #ddd6f3 0%, #faaca8 100%, #faaca8 100%)"}:"linear-gradient(to top, #dfe9f3 0%, white 100%)"}},data:function(){return{items:[],placeholderColors:["#FFD700","#FF6B6B","#4ECDC4","#FF9F1C","#2EC4B6","#E71D36"],isLoading:!1,error:null}},mounted:function(){this.fetchItems()},methods:{fetchItems:function(){var e=this;return(0,o.A)((0,n.A)().mark((function t(){var r,i;return(0,n.A)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.isLoading=!0,e.error=null,t.prev=2,t.next=5,e.fetchData();case 5:r=t.sent,i=r.response.data.recipes,e.items=i.map((function(e){return(0,s.A)({},e)})),t.next=14;break;case 10:t.prev=10,t.t0=t["catch"](2),console.error(t.t0),e.error="Failed to fetch recipes. Please try again later.";case 14:return t.prev=14,e.isLoading=!1,t.finish(14);case 17:case"end":return t.stop()}}),t,null,[[2,10,14,17]])})))()},exploreRecipes:function(){this.$router.push("/explore")},getPlaceholderImage:function(e){var t=this.getColorFromString(e);return"https://via.placeholder.com/300x200/".concat(t.slice(1),"/ffffff?text=").concat(encodeURIComponent(e))},getColorFromString:function(e){for(var t=0,r=0;r<e.length;r++)t=(t<<5)-t+e.charCodeAt(r),t|=0;var i=Math.abs(t)%this.placeholderColors.length;return this.placeholderColors[i]},onImageError:function(e){e.image=this.getPlaceholderImage(e.title)}},filters:{truncate:function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"...";return e&&e.length>t?e.slice(0,t)+r:e||"No description available"}}},u=l;var p=r(1656),f=(0,p.A)(u,i,a,!1,null,"158c8c42",null);const d=f.exports},9279:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>p});var i=function(){var e=this,t=e._self._c;return t("GenericPage",{attrs:{pageName:"Family Recipes Treasures 🏠👑",fetchData:e.fetchFamilyRecipes,isFamilyRecipe:!0,newPageMessage:{header:"Welcome to the Family Recipe Treasures",body:"Delve into the heart of family traditions with our cherished recipes. Whether it's grandma's famous apple pie or dad's secret barbecue sauce, each dish tells a story. Start exploring and savor the memories!"}}})},a=[],n=r(1041),s=r(4201);const o={name:"FamilyRecipePage",components:{GenericPage:n.A},methods:{fetchFamilyRecipes:function(){return(0,s.mg)()}}},c=o;var l=r(1656),u=(0,l.A)(c,i,a,!1,null,null,null);const p=u.exports},1137:(e,t,r)=>{"use strict";var i=r(3938),a=r(9751),n=TypeError;e.exports=function(e){if(i(this),"string"===e||"default"===e)e="string";else if("number"!==e)throw n("Incorrect hint");return a(this,e)}},7809:(e,t,r)=>{var i=r(281);e.exports=i(1..valueOf)},7787:(e,t,r)=>{var i=r(6490),a=r(7485),n=r(1137),s=r(1602),o=s("toPrimitive"),c=Date.prototype;i(c,o)||a(c,o,n)},4009:(e,t,r)=>{"use strict";var i=r(1605),a=r(6926),n=r(5077),s=r(200),o=r(9720),c=r(281),l=r(4977),u=r(6490),p=r(3054),f=r(7658),d=r(2328),g=r(874),h=r(2074),v=r(4789).f,m=r(7632).f,y=r(3610).f,b=r(7809),w=r(9163).trim,_="Number",P=s[_],C=o[_],O=P.prototype,F=s.TypeError,I=c("".slice),N=c("".charCodeAt),A=function(e){var t=g(e,"number");return"bigint"==typeof t?t:E(t)},E=function(e){var t,r,i,a,n,s,o,c,l=g(e,"number");if(d(l))throw F("Cannot convert a Symbol value to a number");if("string"==typeof l&&l.length>2)if(l=w(l),t=N(l,0),43===t||45===t){if(r=N(l,2),88===r||120===r)return NaN}else if(48===t){switch(N(l,1)){case 66:case 98:i=2,a=49;break;case 79:case 111:i=8,a=55;break;default:return+l}for(n=I(l,2),s=n.length,o=0;o<s;o++)if(c=N(n,o),c<48||c>a)return NaN;return parseInt(n,i)}return+l},S=l(_,!P(" 0o1")||!P("0b1")||P("+0x1")),j=function(e){return f(O,e)&&h((function(){b(e)}))},k=function(e){var t=arguments.length<1?0:P(A(e));return j(this)?p(Object(t),this,k):t};k.prototype=O,S&&!a&&(O.constructor=k),i({global:!0,constructor:!0,wrap:!0,forced:S},{Number:k});var R=function(e,t){for(var r,i=n?v(t):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","),a=0;i.length>a;a++)u(t,r=i[a])&&!u(e,r)&&y(e,r,m(t,r))};a&&C&&R(o[_],C),(S||a)&&R(o[_],P)},6012:(e,t,r)=>{var i=r(1605),a=r(5077),n=r(5318).f;i({target:"Object",stat:!0,forced:Object.defineProperties!==n,sham:!a},{defineProperties:n})},678:(e,t,r)=>{var i=r(1605),a=r(2074),n=r(5476),s=r(7632).f,o=r(5077),c=!o||a((function(){s(1)}));i({target:"Object",stat:!0,forced:c,sham:!o},{getOwnPropertyDescriptor:function(e,t){return s(n(e),t)}})},3101:(e,t,r)=>{var i=r(1605),a=r(5077),n=r(5816),s=r(5476),o=r(7632),c=r(2057);i({target:"Object",stat:!0,sham:!a},{getOwnPropertyDescriptors:function(e){var t,r,i=s(e),a=o.f,l=n(i),u={},p=0;while(l.length>p)r=a(i,t=l[p++]),void 0!==r&&c(u,t,r);return u}})},7899:(e,t,r)=>{var i=r(1605),a=r(2612),n=r(1641),s=r(2074),o=s((function(){n(1)}));i({target:"Object",stat:!0,forced:o},{keys:function(e){return n(a(e))}})},6611:(e,t,r)=>{var i=r(6100),a=r(8237);i("toPrimitive"),a()},9201:(e,t,r)=>{"use strict";r.d(t,{A:()=>c});r(3534),r(17),r(8476),r(8743),r(6012),r(5852),r(678),r(3101),r(7899),r(5086),r(8379);var i=r(4119);r(6611),r(3515),r(4117),r(7787),r(4009);function a(e,t){if("object"!==(0,i.A)(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var a=r.call(e,t||"default");if("object"!==(0,i.A)(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}function n(e){var t=a(e,"string");return"symbol"===(0,i.A)(t)?t:String(t)}function s(e,t,r){return t=n(t),t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,i)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){s(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}}}]);
//# sourceMappingURL=279.c70e5201.js.map