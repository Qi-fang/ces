(function(e){function n(n){for(var r,o,c=n[0],l=n[1],s=n[2],u=0,d=[];u<c.length;u++)o=c[u],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&d.push(a[o][0]),a[o]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);f&&f(n);while(d.length)d.shift()();return i.push.apply(i,s||[]),t()}function t(){for(var e,n=0;n<i.length;n++){for(var t=i[n],r=!0,o=1;o<t.length;o++){var c=t[o];0!==a[c]&&(r=!1)}r&&(i.splice(n--,1),e=l(l.s=t[0]))}return e}var r={},o={app:0},a={app:0},i=[];function c(e){return l.p+"js/"+({category:"category",convert:"convert",duihuan:"duihuan",friends:"friends",login:"login",mybankcards:"mybankcards",myboke:"myboke",new:"new",personal:"personal",recommend:"recommend",register:"register",renz:"renz",tixian:"tixian"}[e]||e)+"."+{category:"464c1409",convert:"662eb0c0",duihuan:"597a17ab",friends:"ec7db1f8",login:"b25799c3",mybankcards:"816e77e7",myboke:"abe08df0",new:"364c9bb6",personal:"e338306c",recommend:"0988404e",register:"9cac202a",renz:"d4e941a6",tixian:"53a4ca93"}[e]+".js"}function l(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,l),t.l=!0,t.exports}l.e=function(e){var n=[],t={category:1,convert:1,duihuan:1,friends:1,login:1,mybankcards:1,myboke:1,new:1,personal:1,recommend:1,register:1,renz:1,tixian:1};o[e]?n.push(o[e]):0!==o[e]&&t[e]&&n.push(o[e]=new Promise((function(n,t){for(var r="css/"+({category:"category",convert:"convert",duihuan:"duihuan",friends:"friends",login:"login",mybankcards:"mybankcards",myboke:"myboke",new:"new",personal:"personal",recommend:"recommend",register:"register",renz:"renz",tixian:"tixian"}[e]||e)+"."+{category:"8399e9d3",convert:"ee39cbcc",duihuan:"0accfe7b",friends:"b786e8ec",login:"b43ec4aa",mybankcards:"d97b6035",myboke:"5212d6ef",new:"308f9ce7",personal:"f5317797",recommend:"1d6dc564",register:"abf06b31",renz:"fae93fc3",tixian:"081f2cfc"}[e]+".css",a=l.p+r,i=document.getElementsByTagName("link"),c=0;c<i.length;c++){var s=i[c],u=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(u===r||u===a))return n()}var d=document.getElementsByTagName("style");for(c=0;c<d.length;c++){s=d[c],u=s.getAttribute("data-href");if(u===r||u===a)return n()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=n,f.onerror=function(n){var r=n&&n.target&&n.target.src||a,i=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=r,delete o[e],f.parentNode.removeChild(f),t(i)},f.href=a;var m=document.getElementsByTagName("head")[0];m.appendChild(f)})).then((function(){o[e]=0})));var r=a[e];if(0!==r)if(r)n.push(r[2]);else{var i=new Promise((function(n,t){r=a[e]=[n,t]}));n.push(r[2]=i);var s,u=document.createElement("script");u.charset="utf-8",u.timeout=120,l.nc&&u.setAttribute("nonce",l.nc),u.src=c(e);var d=new Error;s=function(n){u.onerror=u.onload=null,clearTimeout(f);var t=a[e];if(0!==t){if(t){var r=n&&("load"===n.type?"missing":n.type),o=n&&n.target&&n.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",d.name="ChunkLoadError",d.type=r,d.request=o,t[1](d)}a[e]=void 0}};var f=setTimeout((function(){s({type:"timeout",target:u})}),12e4);u.onerror=u.onload=s,document.head.appendChild(u)}return Promise.all(n)},l.m=e,l.c=r,l.d=function(e,n,t){l.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,n){if(1&n&&(e=l(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(l.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)l.d(t,r,function(n){return e[n]}.bind(null,r));return t},l.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(n,"a",n),n},l.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},l.p="",l.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],u=s.push.bind(s);s.push=n,s=s.slice();for(var d=0;d<s.length;d++)n(s[d]);var f=u;i.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"39f9":function(e,n,t){"use strict";var r=t("a00c"),o=t.n(r);o.a},"56d7":function(e,n,t){"use strict";t.r(n);t("cadf"),t("551c"),t("f751"),t("097d");var r=t("2b0e"),o=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("router-link",{ref:"elMain1",style:e.elMain1,attrs:{"data-index":1,to:"/recommend"}},[t("div",{attrs:{id:"div"}},[t("i",{staticClass:"el-icon-user le"}),t("i",{staticClass:"el-icon-user cen"}),t("i",{staticClass:"el-icon-user ri"})]),e._v("推荐\n\t")]),t("router-link",{ref:"elMain2",style:e.elMain2,attrs:{"data-index":2,to:"/new"}},[t("i",{staticClass:"el-icon-present"}),e._v("活动\n\t")]),t("router-link",{ref:"elMain3",style:e.elMain3,attrs:{"data-index":3,to:"/convert"}},[t("i",{staticClass:"el-icon-money"}),e._v("兑换\n\t")]),t("router-link",{ref:"elMain4",style:e.elMain4,attrs:{"data-index":4,to:"/friends"}},[t("i",{staticClass:"el-icon-chat-dot-square"}),e._v("博客\n\t")]),t("router-link",{ref:"elMain5",style:e.elMain5,attrs:{"data-index":5,to:"/personal"}},[t("i",{staticClass:"el-icon-user"}),e._v("我的\n\t")]),e.isShow?t("router-view"):e._e()],1)},a=[],i={provide:function(){return{reload:this.reload}},data:function(){return{dat:[],elMain1:{color:""},elMain2:{color:""},elMain3:{color:""},elMain4:{color:""},elMain5:{color:""},isShow:!0}},methods:{reload:function(){this.isShow=!1,this.$nextTick((function(){this.isShow=!0}))}},watch:{"$route.path":function(e,n){"/new"===e?(this.elMain1.color="",this.elMain2.color="#ff6700",this.elMain3.color="",this.elMain4.color="",this.elMain5.color=""):"/convert"===e?(this.elMain1.color="",this.elMain2.color="",this.elMain3.color="#ff6700",this.elMain4.color="",this.elMain5.color=""):"/friends"===e||"/personal/myboke"===e||"/friends/pl"===e?(this.elMain1.color="",this.elMain2.color="",this.elMain3.color="",this.elMain4.color="#ff6700",this.elMain5.color=""):"/personal"===e||"/personal/category"===e||"/personal/mybankcards"===e||"/personal/tixian"===e||"/personal/duihuan"===e||"/personal/renz"===e?(this.elMain1.color="",this.elMain2.color="",this.elMain3.color="",this.elMain4.color="",this.elMain5.color="#ff6700"):(this.elMain1.color="#ff6700",this.elMain2.color="",this.elMain3.color="",this.elMain4.color="",this.elMain5.color="")}}},c=i,l=(t("39f9"),t("2877")),s=Object(l["a"])(c,o,a,!1,null,"6df7fb27",null),u=s.exports,d=t("8c4f");r["default"].use(d["a"]);var f=new d["a"]({mode:"hash",base:"",routes:[{path:"/",redirect:"/recommend"},{path:"/register",name:"register",component:function(){return t.e("register").then(t.bind(null,"ea78"))}},{path:"/login",name:"login",component:function(){return t.e("login").then(t.bind(null,"89d2"))}},{path:"/recommend",name:"recommend",component:function(){return t.e("recommend").then(t.bind(null,"7c58"))}},{path:"/new",name:"new",component:function(){return t.e("new").then(t.bind(null,"581b"))}},{path:"/convert",name:"convert",component:function(){return t.e("convert").then(t.bind(null,"c09c"))}},{path:"/friends",name:"friends",meta:{keepAlive:!0},component:function(){return t.e("friends").then(t.bind(null,"87e6"))},children:[]},{path:"/personal",name:"personal",component:function(){return t.e("personal").then(t.bind(null,"3b2b"))},children:[{path:"myboke",name:"myboke",meta:{keepAlive:!0},component:function(){return t.e("myboke").then(t.bind(null,"fe1b"))}},{path:"category",name:"category",meta:{keepAlive:!0},component:function(){return t.e("category").then(t.bind(null,"fb32"))}},{path:"mybankcards",name:"mybankcards",component:function(){return t.e("mybankcards").then(t.bind(null,"98b5"))}},{path:"tixian",name:"tixian",component:function(){return t.e("tixian").then(t.bind(null,"5ae1"))}},{path:"renz",name:"renz",component:function(){return t.e("renz").then(t.bind(null,"3d75"))}},{path:"duihuan",name:"duihuan",component:function(){return t.e("duihuan").then(t.bind(null,"8129"))}}]}]}),m=t("2f62");r["default"].use(m["a"]);var p=new m["a"].Store({state:{top:0,countt:100},mutations:{setHomeListTop:function(e,n){e.top=n},add:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return e.countt+=n},remove:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return e.countt-=n}},getters:{home_list_top:function(e){return e.top}},actions:{setHomeListTop:function(e,n){var t=e.commit;e.state;t("setHomeListTop",n)},actionsadd:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return e.commit("add",n)},actionsremove:function(e){var n=e.commit,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return n("remove",t)}}}),h=t("4328"),b=t.n(h),g=t("bc3a"),v=t.n(g),y=(t("b619"),t("77ed"),t("7f7f"),t("bd86")),k=t("96eb"),M=t.n(k),w=M.a.Random;M.a.mock("http://localhost:8081/test/city","get",(function(){for(var e=[],n=0;n<20;n++){var t,r=(t={ID:w.natural(1,1e5),ranking:n+1,d_total:w.natural(100,990),w_total:w.natural(1e3,9900),m_total:w.natural(1e4,99e3),all_total:w.natural(1e5,99e4),d_money:w.natural(1,100),w_money:w.natural(10,500),m_money:w.natural(100,1e3),all_money:w.natural(1e3,1e4),phone:w.natural(13e9,18999999999),cname:w.cname(),title:w.csentence(1,15),content:w.csentence(1,50),picture:w.dataImage("300x250","mock的图片"),date:w.datetime("yyyy-MM-dd A HH:mm"),img:w.dataImage("300x250","mock的图片"),new_content:w.csentence(1,50),friends_title:w.csentence(1,15),friends_content:w.csentence(1,50),friends_number:w.natural(1,99),friends_message:w.natural(1,20),message_content:w.csentence(1,50),friends_picture:w.dataImage("90x90","mock的图片"),image:w.dataImage("300x250","mock的图片"),bg:w.dataImage("420x250","mock的图片"),background:w.dataImage("300x250","mock的图片")},Object(y["a"])(t,"picture",w.dataImage("300x250","mock的图片")),Object(y["a"])(t,"token",w.float(1,10)),t);e.push(r)}return{cityList:e}})),M.a.mock("http://localhost:8081/test/cityInfo","post",(function(e){var n=JSON.parse(e.body);return{img:w.image("200x100","#4A7BF7",n.name)}}));var x=t("6944"),_=t.n(x),O=(t("0808"),t("5c96")),S=t.n(O);t("0fae"),t("66b8");r["default"].prototype.$axios=v.a,r["default"].prototype.$http="https://www.tuijianb.com/restApi",r["default"].prototype.$qs=b.a,r["default"].config.productionTip=!1,r["default"].use(_.a,{defaultOptions:{zIndex:9999,navbar:!1,title:!1,toolbar:!1,tooltip:!1,movable:!1,zoomable:!1,rotatable:!1,scalable:!1}});var j=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this;window.plus?e.call(n):document.addEventListener("plusready",e.bind(n))};r["default"].mixin({beforeCreate:function(){var e=this;j((function(){e.plusReady=!0}),this)},methods:{onPlusReady:j}}),r["default"].use(S.a),f.beforeEach((function(e,n,t){if("/login"===e.path)t();else{var r=localStorage.getItem("token");r?t():t({name:"login"})}t()})),new r["default"]({router:f,store:p,render:function(e){return e(u)}}).$mount("#app")},"66b8":function(e,n,t){},a00c:function(e,n,t){}});
//# sourceMappingURL=app.c6862da8.js.map