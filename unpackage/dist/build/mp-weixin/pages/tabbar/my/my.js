(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabbar/my/my"],{"2bcb":function(t,e,n){"use strict";n.r(e);var r=n("b4b2"),o=n.n(r);for(var u in r)"default"!==u&&function(t){n.d(e,t,(function(){return r[t]}))}(u);e["default"]=o.a},"494f":function(t,e,n){"use strict";n.r(e);var r=n("b782"),o=n("2bcb");for(var u in o)"default"!==u&&function(t){n.d(e,t,(function(){return o[t]}))}(u);n("d31e");var a,c=n("f0c5"),i=Object(c["a"])(o["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],a);e["default"]=i.exports},b4b2:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=u(n("a34a")),o=n("2f62");function u(t){return t&&t.__esModule?t:{default:t}}function a(t,e,n,r,o,u,a){try{var c=t[u](a),i=c.value}catch(f){return void n(f)}c.done?e(i):Promise.resolve(i).then(r,o)}function c(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var u=t.apply(e,n);function c(t){a(u,r,o,c,i,"next",t)}function i(t){a(u,r,o,c,i,"throw",t)}c(void 0)}))}}function i(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function f(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(Object(n),!0).forEach((function(e){s(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function s(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var l={data:function(){return{userInfo:{}}},computed:f({},(0,o.mapState)(["userinfo"])),onLoad:function(){console.log(this.userInfo),this.userInfo=t.getStorageSync("author"),this.getAuthor()},onShow:function(){this.getAuthor()},methods:{getAuthor:function(){var e=this;return c(r.default.mark((function n(){var o;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$myRequest({methods:"GET",data:e.$axios.adornParams(),header:{token:t.getStorageSync("token")||""},url:"/arct/author/info/".concat(t.getStorageSync("author").id)});case 2:o=n.sent,t.setStorageSync("author",o.data.author),e.userInfo=o.data.author;case 5:case"end":return n.stop()}}),n)})))()},myInfo:function(){t.navigateTo({url:"/pages/sys/my_info"})},open:function(){t.navigateTo({url:"/pages/my-article/my-article"})},feedback:function(){t.navigateTo({url:"/pages/feedback/feedback"})},myLike:function(){t.switchTab({url:"/pages/tabbar/follow/follow"})}}};e.default=l}).call(this,n("543d")["default"])},b782:function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return r}));var r={uniIcons:function(){return Promise.all([n.e("common/vendor"),n.e("components/uni-icons/uni-icons")]).then(n.bind(null,"7005"))}},o=function(){var t=this,e=t.$createElement;t._self._c},u=[]},c8d2:function(t,e,n){"use strict";(function(t){n("7fe4");r(n("66fd"));var e=r(n("494f"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},d31e:function(t,e,n){"use strict";var r=n("f09a"),o=n.n(r);o.a},f09a:function(t,e,n){}},[["c8d2","common/runtime","common/vendor"]]]);