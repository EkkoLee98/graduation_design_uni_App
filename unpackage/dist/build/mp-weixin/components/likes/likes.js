(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/likes/likes"],{2291:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i(n("a34a"));function i(t){return t&&t.__esModule?t:{default:t}}function a(t,e,n,o,i,a,r){try{var u=t[a](r),c=u.value}catch(s){return void n(s)}u.done?e(c):Promise.resolve(c).then(o,i)}function r(t){return function(){var e=this,n=arguments;return new Promise((function(o,i){var r=t.apply(e,n);function u(t){a(r,o,i,u,c,"next",t)}function c(t){a(r,o,i,u,c,"throw",t)}u(void 0)}))}}var u={props:{item:{type:Object,default:function(){return{}}},types:{type:String,default:""}},data:function(){return{like:!1}},computed:{author:function(){return t.getStorageSync("author")}},watch:{item:{handler:function(t){this.author.articleLikesIds.includes(t.id)?this.like=!0:this.like=!1},immediate:!0,deep:!0}},created:function(){},methods:{likeTap:function(){var e=this;return r(o.default.mark((function n(){var i;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return e.like=!e.like,t.showLoading(),n.next=4,e.$myRequest({methods:"POST",data:e.$axios.adornParams({id:e.item.id,aid:e.author.id,type:"like",status:e.like?"1":"0"}),header:{token:t.getStorageSync("token")||"","Content-Type":"application/x-www-form-urlencoded"},url:"/arct/article/save/option"});case 4:i=n.sent,0===i.data.code&&(t.showToast({title:e.like?"收藏成功":"取消收藏",icon:"none"}),e.getAuthor(),t.hideLoading()),t.hideLoading(),console.log(i);case 8:case"end":return n.stop()}}),n)})))()},getAuthor:function(){var e=this;return r(o.default.mark((function n(){var i;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$myRequest({methods:"GET",data:e.$axios.adornParams(),header:{token:t.getStorageSync("token")||""},url:"/arct/author/info/".concat(t.getStorageSync("author").id)});case 2:i=n.sent,t.setStorageSync("author",i.data.author),console.log(e.author);case 5:case"end":return n.stop()}}),n)})))()},setUpdateLikes:function(){var e=this;t.showLoading(),this.$api.update_like({user_id:"5fbe4b44822f1e0001eab420",article_id:this.item._id}).then((function(n){t.hideLoading(),t.showToast({title:e.like?"收藏成功":"取消收藏",icon:"none"}),t.$emit("update_article",e.types),console.log(n)})).catch((function(){t.hideLoading()}))}}};e.default=u}).call(this,n("543d")["default"])},"291b":function(t,e,n){"use strict";n.r(e);var o=n("cec3"),i=n("b49c");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("d903");var r,u=n("f0c5"),c=Object(u["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],r);e["default"]=c.exports},"32bd":function(t,e,n){},b49c:function(t,e,n){"use strict";n.r(e);var o=n("2291"),i=n.n(o);for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);e["default"]=i.a},cec3:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return o}));var o={uniIcons:function(){return Promise.all([n.e("common/vendor"),n.e("components/uni-icons/uni-icons")]).then(n.bind(null,"7005"))}},i=function(){var t=this,e=t.$createElement;t._self._c},a=[]},d903:function(t,e,n){"use strict";var o=n("32bd"),i=n.n(o);i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/likes/likes-create-component',
    {
        'components/likes/likes-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("291b"))
        })
    },
    [['components/likes/likes-create-component']]
]);