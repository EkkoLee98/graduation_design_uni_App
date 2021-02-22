(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/comments-box/comments-box"],{"03dc":function(n,e,t){"use strict";t.r(e);var o=t("6c4b"),r=t.n(o);for(var u in o)"default"!==u&&function(n){t.d(e,n,(function(){return o[n]}))}(u);e["default"]=r.a},"1b55":function(n,e,t){"use strict";t.r(e);var o=t("4596"),r=t("03dc");for(var u in r)"default"!==u&&function(n){t.d(e,n,(function(){return r[n]}))}(u);t("5e22");var c,i=t("f0c5"),f=Object(i["a"])(r["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],c);e["default"]=f.exports},4596:function(n,e,t){"use strict";t.d(e,"b",(function(){return r})),t.d(e,"c",(function(){return u})),t.d(e,"a",(function(){return o}));var o={commentsBox:function(){return Promise.resolve().then(t.bind(null,"1b55"))}},r=function(){var n=this,e=n.$createElement;n._self._c},u=[]},"5e22":function(n,e,t){"use strict";var o=t("636e"),r=t.n(o);r.a},"636e":function(n,e,t){},"6c4b":function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=t("856e"),r=function(){Promise.resolve().then(function(){return resolve(t("1b55"))}.bind(null,t)).catch(t.oe)},u={name:"comments-box",components:{commentsBox:r},props:{comments:{type:Object,default:function(){return{}}},reply:{type:Boolean,default:!1}},filters:{formatTime:function(n){return(0,o.parseTime)(n)}},data:function(){return{}},methods:{commentsReply:function(n){this.$emit("reply",n)}}};e.default=u}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/comments-box/comments-box-create-component',
    {
        'components/comments-box/comments-box-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("1b55"))
        })
    },
    [['components/comments-box/comments-box-create-component']]
]);
