(self["webpackChunkassignment_2_1"]=self["webpackChunkassignment_2_1"]||[]).push([[588],{5588:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>x});var a=function(){var e=this,t=e._self._c;return t("div",{staticClass:"container"},[t("form",{staticClass:"search-form",on:{submit:function(t){return t.preventDefault(),e.searchRecipesHandler.apply(null,arguments)}}},[t("b-form-group",{staticClass:"results-input",attrs:{label:"Search"}},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.searchQuery,expression:"searchQuery"}],staticClass:"search-input",attrs:{"aria-label":"Search",type:"text",placeholder:"Search for recipes..."},domProps:{value:e.searchQuery},on:{input:function(t){t.target.composing||(e.searchQuery=t.target.value)}}})]),t("b-form-group",{staticClass:"results-count",attrs:{label:"Results count"}},[t("b-form-select",{model:{value:e.resultsCount,callback:function(t){e.resultsCount=t},expression:"resultsCount"}},[t("option",{attrs:{value:"5"}},[e._v("5")]),t("option",{attrs:{value:"10"}},[e._v("10")]),t("option",{attrs:{value:"15"}},[e._v("15")])])],1),t("b-form-group",{staticClass:"filter-by",attrs:{label:"Filter by"}},[t("b-form-select",{model:{value:e.filterBy,callback:function(t){e.filterBy=t},expression:"filterBy"}},e._l(e.filterByOptions,(function(r){return t("option",{key:r.value,domProps:{value:r.value}},[e._v(" "+e._s(r.text)+" ")])})),0)],1),t("b-form-group",{staticClass:"cuisine-type",attrs:{label:"Cuisine Type"}},[t("b-form-select",{model:{value:e.cuisineType,callback:function(t){e.cuisineType=t},expression:"cuisineType"}},e._l(e.cuisineTypeOptions,(function(r){return t("option",{key:r.value,domProps:{value:r.value}},[e._v(" "+e._s(r.text)+" ")])})),0)],1),t("b-form-group",{staticClass:"meal-type",attrs:{label:"Meal Type"}},[t("b-form-select",{model:{value:e.mealType,callback:function(t){e.mealType=t},expression:"mealType"}},e._l(e.mealTypeOptions,(function(r){return t("option",{key:r.value,domProps:{value:r.value}},[e._v(" "+e._s(r.text)+" ")])})),0)],1),t("b-form-group",{staticClass:"sort-by",attrs:{label:"Sort by"}},[t("b-form-select",{model:{value:e.sortBy,callback:function(t){e.sortBy=t},expression:"sortBy"}},e._l(e.sortByOptions,(function(r){return t("option",{key:r.value,domProps:{value:r.value}},[e._v(" "+e._s(r.text)+" ")])})),0)],1),t("button",{staticClass:"search-button",attrs:{type:"submit"}},[e._v("Search")])],1),e.filteredRecipes.length?t("div",{staticClass:"recipe-list"},e._l(e.filteredRecipes,(function(e,r){return t("RecipePreview",{key:r,staticClass:"recipe-item",attrs:{recipe:e}})})),1):e.loading||e.filteredRecipes.length?e._e():t("div",{staticClass:"no-recipes"},[e._v(" No recipes found. ")])])},s=[],i=r(4048),l=r(388),n=(r(2231),r(6547)),o=function(){var e=this,t=e._self._c;return t("router-link",{staticClass:"recipe-preview",attrs:{to:{name:"recipe",params:{recipeId:e.recipe.id}}}},[t("div",{staticClass:"recipe-body"},[e.image_load?t("img",{staticClass:"recipe-image",attrs:{src:e.recipe.image}}):e._e()]),t("div",{staticClass:"recipe-footer"},[t("div",{staticClass:"recipe-title",attrs:{title:e.recipe.title}},[e._v(" "+e._s(e.recipe.title)+" ")]),t("ul",{staticClass:"recipe-overview"},[t("li",[e._v(e._s(e.recipe.readyInMinutes)+" minutes")]),t("li",[e._v(e._s(e.recipe.aggregateLikes)+" likes")])])])])},u=[];r(4009);const c={mounted:function(){var e=this;this.axios.get(this.recipe.image).then((function(){e.image_load=!0}))},data:function(){return{image_load:!0}},props:{recipe:{type:Object,required:!0},id:{type:Number,required:!0},title:{type:String,required:!0},readyInMinutes:{type:Number,required:!0},image:{type:String,required:!0},_instructions:{type:String,required:!0},aggregateLikes:{type:Number,required:!1,default:function(){}}}},p=c;var v=r(1656),m=(0,v.A)(p,o,u,!1,null,"4cec116b",null);const y=m.exports;var f=r(6285);const d={components:{RecipeDetails:y,RecipePreview:f.A},data:function(){return{lastUserName:"",searchQuery:"",filteredRecipes:[],resultsCount:5,sortBy:"likes",filterBy:"",cuisineType:"",mealType:"",loading:!1,sortByOptions:[{value:"likes",text:"Likes"},{value:"time",text:"Time to Make"}],filterByOptions:[{value:"",text:"None"},{value:"vegetarian",text:"Vegetarian"},{value:"vegan",text:"Vegan"},{value:"gluten free",text:"Gluten Free"}],cuisineTypeOptions:[{value:"",text:"None"},{value:"African",text:"African"},{value:"Asian",text:"Asian"},{value:"American",text:"American"},{value:"British",text:"British"},{value:"Cajun",text:"Cajun"},{value:"Caribbean",text:"Caribbean"},{value:"Chinese",text:"Chinese"},{value:"Eastern European",text:"Eastern European"},{value:"European",text:"European"},{value:"French",text:"French"},{value:"German",text:"German"},{value:"Greek",text:"Greek"},{value:"Indian",text:"Indian"},{value:"Irish",text:"Irish"},{value:"Italian",text:"Italian"},{value:"Japanese",text:"Japanese"},{value:"Jewish",text:"Jewish"},{value:"Korean",text:"Korean"},{value:"Latin American",text:"Latin American"},{value:"Mediterranean",text:"Mediterranean"},{value:"Mexican",text:"Mexican"},{value:"Middle Eastern",text:"Middle Eastern"},{value:"Nordic",text:"Nordic"},{value:"Southern",text:"Southern"},{value:"Spanish",text:"Spanish"},{value:"Thai",text:"Thai"},{value:"Vietnamese",text:"Vietnamese"}],mealTypeOptions:[{value:"",text:"None"},{value:"main course",text:"Main Course"},{value:"side dish",text:"Side Dish"},{value:"dessert",text:"Dessert"},{value:"appetizer",text:"Appetizer"},{value:"salad",text:"Salad"},{value:"bread",text:"Bread"},{value:"breakfast",text:"Breakfast"},{value:"soup",text:"Soup"},{value:"beverage",text:"Beverage"},{value:"sauce",text:"Sauce"},{value:"marinade",text:"Marinade"},{value:"fingerfood",text:"Fingerfood"},{value:"snack",text:"Snack"},{value:"drink",text:"Drink"}],recentSearch:{query:"",resultsCount:5,sortBy:"",filterBy:"",cuisineType:"",mealType:""}}},mounted:function(){var e=localStorage.getItem("lastUserName");this.$root.store.username&&this.$root.store.username===e?(this.searchQuery=localStorage.getItem("lastSearchQuery")||"",this.resultsCount=parseInt(localStorage.getItem("resultsCount"),10)||5,this.sortBy=localStorage.getItem("sortBy")||"likes",this.filterBy=localStorage.getItem("filterBy")||"",this.cuisineType=localStorage.getItem("cuisineType")||"",this.mealType=localStorage.getItem("mealType")||"",this.searchRecipesHandler()):(localStorage.removeItem("lastSearchQuery"),localStorage.removeItem("resultsCount"),localStorage.removeItem("sortBy"),localStorage.removeItem("filterBy"),localStorage.removeItem("cuisineType"),localStorage.removeItem("mealType")),localStorage.setItem("lastUserName",this.$root.store.username)},methods:{searchRecipesHandler:function(){var e=this;return(0,l.A)((0,i.A)().mark((function t(){return(0,i.A)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.lastUserName=e.$root.store.username,e.loading=!0,t.prev=2,t.next=5,(0,n.G9)({query:e.searchQuery,resultsCount:e.resultsCount,sortBy:e.sortBy,filterBy:e.filterBy,cuisineType:e.cuisineType,mealType:e.mealType});case 5:e.filteredRecipes=t.sent,e.$root.store.username?(localStorage.setItem("lastSearchQuery",e.searchQuery),localStorage.setItem("resultsCount",e.resultsCount),localStorage.setItem("sortBy",e.sortBy),localStorage.setItem("filerBy",e.filterBy),localStorage.setItem("cuisineType",e.cuisineType),localStorage.setItem("mealType",e.mealType),localStorage.setItem("lastUserName",e.lastUserName)):localStorage.setItem("lastSearchQuery",""),t.next=12;break;case 9:t.prev=9,t.t0=t["catch"](2),console.error("An error occurred while fetching the recipes:",t.t0);case 12:return t.prev=12,e.loading=!1,t.finish(12);case 15:case"end":return t.stop()}}),t,null,[[2,9,12,15]])})))()}},watch:{sortBy:{handler:"searchRecipesHandler",immediate:!0}}},g=d;var h=(0,v.A)(g,a,s,!1,null,"775b0d20",null);const x=h.exports},7292:(e,t,r)=>{var a=r(200),s=r(2074),i=r(281),l=r(5362),n=r(9163).trim,o=r(5073),u=a.parseInt,c=a.Symbol,p=c&&c.iterator,v=/^[+-]?0x/i,m=i(v.exec),y=8!==u(o+"08")||22!==u(o+"0x16")||p&&!s((function(){u(Object(p))}));e.exports=y?function(e,t){var r=n(l(e));return u(r,t>>>0||(m(v,r)?16:10))}:u},7809:(e,t,r)=>{var a=r(281);e.exports=a(1..valueOf)},4009:(e,t,r)=>{"use strict";var a=r(1605),s=r(6926),i=r(5077),l=r(200),n=r(9720),o=r(281),u=r(4977),c=r(6490),p=r(3054),v=r(7658),m=r(2328),y=r(874),f=r(2074),d=r(4789).f,g=r(7632).f,h=r(3610).f,x=r(7809),b=r(9163).trim,I="Number",S=l[I],_=n[I],C=S.prototype,T=l.TypeError,N=o("".slice),k=o("".charCodeAt),B=function(e){var t=y(e,"number");return"bigint"==typeof t?t:A(t)},A=function(e){var t,r,a,s,i,l,n,o,u=y(e,"number");if(m(u))throw T("Cannot convert a Symbol value to a number");if("string"==typeof u&&u.length>2)if(u=b(u),t=k(u,0),43===t||45===t){if(r=k(u,2),88===r||120===r)return NaN}else if(48===t){switch(k(u,1)){case 66:case 98:a=2,s=49;break;case 79:case 111:a=8,s=55;break;default:return+u}for(i=N(u,2),l=i.length,n=0;n<l;n++)if(o=k(i,n),o<48||o>s)return NaN;return parseInt(i,a)}return+u},E=u(I,!S(" 0o1")||!S("0b1")||S("+0x1")),w=function(e){return v(C,e)&&f((function(){x(e)}))},M=function(e){var t=arguments.length<1?0:S(B(e));return w(this)?p(Object(t),this,M):t};M.prototype=C,E&&!s&&(C.constructor=M),a({global:!0,constructor:!0,wrap:!0,forced:E},{Number:M});var R=function(e,t){for(var r,a=i?d(t):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","),s=0;a.length>s;s++)c(t,r=a[s])&&!c(e,r)&&h(e,r,g(t,r))};s&&_&&R(n[I],_),(E||s)&&R(n[I],S)},2231:(e,t,r)=>{var a=r(1605),s=r(7292);a({global:!0,forced:parseInt!=s},{parseInt:s})}}]);
//# sourceMappingURL=588.8c9d16ea.js.map