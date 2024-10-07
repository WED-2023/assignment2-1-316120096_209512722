(self["webpackChunkassignment_2_1"]=self["webpackChunkassignment_2_1"]||[]).push([[422],{1041:(e,t,r)=>{"use strict";r.d(t,{A:()=>d});var n=function(){var e=this,t=e._self._c;return t("div",{staticClass:"generic-page",style:e.backgroundStyle},[t("h1",{staticClass:"title"},[e._v(e._s(e.pageName))]),t("div",{staticClass:"recipes-grid"},[e.isLoading?t("div",{staticClass:"loading"},[t("div",{staticClass:"loading-spinner"}),t("p",[e._v("Loading recipes...")])]):e.error?t("div",{staticClass:"error"},[t("div",{staticClass:"error-icon"},[e._v("❌")]),t("h2",[e._v("Oops! Something went wrong.")]),t("p",[e._v(e._s(e.error))])]):e.items.length>0?t("div",{staticClass:"recipe-list"},e._l(e.items,(function(r){return t("div",{key:r.id,class:e.isFamilyRecipe?"family-recipe":"recipe-item-container"},[t("div",{staticClass:"recipe-header"},[e.isFamilyRecipe?t("div",{staticClass:"recipe-details"},[t("span",{staticClass:"recipe-creator"},[e._v("Made by: "+e._s(r.whomade))]),t("span",{staticClass:"recipe-occasion"},[e._v("For: "+e._s(r.whenmade))])]):e._e()]),t("RecipePreview",{staticClass:"recipe-item",attrs:{recipe:r}})],1)})),0):t("div",{staticClass:"no-generic"},[t("div",{staticClass:"empty-icon"},[e._v("📖")]),t("h2",[e._v(e._s(e.newPageMessage.header))]),t("p",[e._v(" "+e._s(e.newPageMessage.body)+" ")])])])])},a=[],i=r(4048),s=r(9201),o=r(388),c=(r(115),r(9581),r(8743),r(4913),r(6285));const u={name:"GenericPage",components:{RecipePreview:c.A},props:{isFamilyRecipe:{type:Boolean,default:!1},pageName:{type:String,required:!0},fetchData:{type:Function,required:!0},newPageMessage:{type:{header:String,body:String},default:{header:"Your Taste Gallery Awaits!",body:"Every masterpiece starts with a blank canvas. Begin your culinary journey and fill this space with your favorite flavors. 🎨👨‍🍳"}},background:{type:String,default:null}},computed:{backgroundStyle:function(){return this.isFamilyRecipe?{backgroundImage:"linear-gradient(-70deg, #ddd6f3 0%, #faaca8 100%, #faaca8 100%)"}:"linear-gradient(to top, #dfe9f3 0%, white 100%)"}},data:function(){return{items:[],placeholderColors:["#FFD700","#FF6B6B","#4ECDC4","#FF9F1C","#2EC4B6","#E71D36"],isLoading:!1,error:null}},mounted:function(){this.fetchItems()},methods:{fetchItems:function(){var e=this;return(0,o.A)((0,i.A)().mark((function t(){var r,n;return(0,i.A)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.isLoading=!0,e.error=null,t.prev=2,t.next=5,e.fetchData();case 5:r=t.sent,n=r.response.data.recipes,e.items=n.map((function(e){return(0,s.A)({},e)})),t.next=14;break;case 10:t.prev=10,t.t0=t["catch"](2),console.error(t.t0),e.error="Failed to fetch recipes. Please try again later.";case 14:return t.prev=14,e.isLoading=!1,t.finish(14);case 17:case"end":return t.stop()}}),t,null,[[2,10,14,17]])})))()},exploreRecipes:function(){this.$router.push("/explore")},getPlaceholderImage:function(e){var t=this.getColorFromString(e);return"https://via.placeholder.com/300x200/".concat(t.slice(1),"/ffffff?text=").concat(encodeURIComponent(e))},getColorFromString:function(e){for(var t=0,r=0;r<e.length;r++)t=(t<<5)-t+e.charCodeAt(r),t|=0;var n=Math.abs(t)%this.placeholderColors.length;return this.placeholderColors[n]},onImageError:function(e){e.image=this.getPlaceholderImage(e.title)}},filters:{truncate:function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"...";return e&&e.length>t?e.slice(0,t)+r:e||"No description available"}}},l=u;var p=r(1656),f=(0,p.A)(l,n,a,!1,null,"158c8c42",null);const d=f.exports},422:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>g});var n=function(){var e=this,t=e._self._c;return t("GenericPage",{attrs:{pageName:"My Culinary Gems 💎🍽️",fetchData:e.fetchFavorites}})},a=[],i=r(4048),s=r(388),o=(r(3515),r(4117),r(4895),r(9581),r(5086),r(9979),r(4602),r(1041)),c=r(4201),u=r(8302);const l={name:"FavoritesPage",components:{GenericPage:o.A},data:function(){return{recipes:[]}},methods:{fetchFavorites:function(){var e=this;return(0,s.A)((0,i.A)().mark((function t(){var r,n,a,s;return(0,i.A)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,(0,c.OV)(e.$root.store.username);case 3:if(r=t.sent,!r.response.data.recipes||!Array.isArray(r.response.data.recipes)){t.next=12;break}return n=r.response.data.recipes.map((function(e){return(0,u.jS)(e.recipe_id)})),t.next=8,Promise.all(n);case 8:return a=t.sent,console.log("favoritwew:",a),s=a.map((function(e){return{id:e.id,title:e.title,image:e.image,servings:e.servings,readyInMinutes:e.readyInMinutes,summary:e.summary,aggregateLikes:e.aggregateLikes,whomade:e.whomade||"Unknown Chef",whenmade:e.whenmade||"No Occasion"}})),t.abrupt("return",{response:{data:{recipes:s}}});case 12:t.next=18;break;case 14:throw t.prev=14,t.t0=t["catch"](0),console.error("Error fetching favorite recipes:",t.t0),new Error("Failed to fetch favorite recipes.");case 18:case"end":return t.stop()}}),t,null,[[0,14]])})))()}}},p=l;var f=r(1656),d=(0,f.A)(p,n,a,!1,null,null,null);const g=d.exports},1137:(e,t,r)=>{"use strict";var n=r(3938),a=r(9751),i=TypeError;e.exports=function(e){if(n(this),"string"===e||"default"===e)e="string";else if("number"!==e)throw i("Incorrect hint");return a(this,e)}},7809:(e,t,r)=>{var n=r(281);e.exports=n(1..valueOf)},7787:(e,t,r)=>{var n=r(6490),a=r(7485),i=r(1137),s=r(1602),o=s("toPrimitive"),c=Date.prototype;n(c,o)||a(c,o,i)},4009:(e,t,r)=>{"use strict";var n=r(1605),a=r(6926),i=r(5077),s=r(200),o=r(9720),c=r(281),u=r(4977),l=r(6490),p=r(3054),f=r(7658),d=r(2328),g=r(874),v=r(2074),h=r(4789).f,m=r(7632).f,y=r(3610).f,b=r(7809),w=r(9163).trim,_="Number",C=s[_],O=o[_],P=C.prototype,A=s.TypeError,I=c("".slice),F=c("".charCodeAt),N=function(e){var t=g(e,"number");return"bigint"==typeof t?t:E(t)},E=function(e){var t,r,n,a,i,s,o,c,u=g(e,"number");if(d(u))throw A("Cannot convert a Symbol value to a number");if("string"==typeof u&&u.length>2)if(u=w(u),t=F(u,0),43===t||45===t){if(r=F(u,2),88===r||120===r)return NaN}else if(48===t){switch(F(u,1)){case 66:case 98:n=2,a=49;break;case 79:case 111:n=8,a=55;break;default:return+u}for(i=I(u,2),s=i.length,o=0;o<s;o++)if(c=F(i,o),c<48||c>a)return NaN;return parseInt(i,n)}return+u},j=u(_,!C(" 0o1")||!C("0b1")||C("+0x1")),k=function(e){return f(P,e)&&v((function(){b(e)}))},S=function(e){var t=arguments.length<1?0:C(N(e));return k(this)?p(Object(t),this,S):t};S.prototype=P,j&&!a&&(P.constructor=S),n({global:!0,constructor:!0,wrap:!0,forced:j},{Number:S});var x=function(e,t){for(var r,n=i?h(t):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","),a=0;n.length>a;a++)l(t,r=n[a])&&!l(e,r)&&y(e,r,m(t,r))};a&&O&&x(o[_],O),(j||a)&&x(o[_],C)},6012:(e,t,r)=>{var n=r(1605),a=r(5077),i=r(5318).f;n({target:"Object",stat:!0,forced:Object.defineProperties!==i,sham:!a},{defineProperties:i})},678:(e,t,r)=>{var n=r(1605),a=r(2074),i=r(5476),s=r(7632).f,o=r(5077),c=!o||a((function(){s(1)}));n({target:"Object",stat:!0,forced:c,sham:!o},{getOwnPropertyDescriptor:function(e,t){return s(i(e),t)}})},3101:(e,t,r)=>{var n=r(1605),a=r(5077),i=r(5816),s=r(5476),o=r(7632),c=r(2057);n({target:"Object",stat:!0,sham:!a},{getOwnPropertyDescriptors:function(e){var t,r,n=s(e),a=o.f,u=i(n),l={},p=0;while(u.length>p)r=a(n,t=u[p++]),void 0!==r&&c(l,t,r);return l}})},7899:(e,t,r)=>{var n=r(1605),a=r(2612),i=r(1641),s=r(2074),o=s((function(){i(1)}));n({target:"Object",stat:!0,forced:o},{keys:function(e){return i(a(e))}})},6611:(e,t,r)=>{var n=r(6100),a=r(8237);n("toPrimitive"),a()},9201:(e,t,r)=>{"use strict";r.d(t,{A:()=>c});r(3534),r(17),r(8476),r(8743),r(6012),r(5852),r(678),r(3101),r(7899),r(5086),r(8379);var n=r(4119);r(6611),r(3515),r(4117),r(7787),r(4009);function a(e,t){if("object"!==(0,n.A)(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var a=r.call(e,t||"default");if("object"!==(0,n.A)(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}function i(e){var t=a(e,"string");return"symbol"===(0,n.A)(t)?t:String(t)}function s(e,t,r){return t=i(t),t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){s(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}}}]);
//# sourceMappingURL=422.7aa25e39.js.map