(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/feedback/feedback"],{4115:function(e,n,t){"use strict";t.r(n);var a=t("c8aa"),u=t("679a");for(var c in u)"default"!==c&&function(e){t.d(n,e,(function(){return u[e]}))}(c);t("d947");var i,o=t("f0c5"),r=Object(o["a"])(u["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],i);n["default"]=r.exports},"679a":function(e,n,t){"use strict";t.r(n);var a=t("ffef"),u=t.n(a);for(var c in a)"default"!==c&&function(e){t.d(n,e,(function(){return a[e]}))}(c);n["default"]=u.a},"731e":function(e,n,t){},c8aa:function(e,n,t){"use strict";t.d(n,"b",(function(){return u})),t.d(n,"c",(function(){return c})),t.d(n,"a",(function(){return a}));var a={uniIcons:function(){return Promise.all([t.e("common/vendor"),t.e("components/uni-icons/uni-icons")]).then(t.bind(null,"7005"))}},u=function(){var e=this,n=e.$createElement;e._self._c},c=[]},d947:function(e,n,t){"use strict";var a=t("731e"),u=t.n(a);u.a},eb78:function(e,n,t){"use strict";(function(e){t("7fe4");a(t("66fd"));var n=a(t("4115"));function a(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])},ffef:function(e,n,t){"use strict";(function(e,a){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=c(t("a34a"));function c(e){return e&&e.__esModule?e:{default:e}}function i(e,n,t,a,u,c,i){try{var o=e[c](i),r=o.value}catch(s){return void t(s)}o.done?n(r):Promise.resolve(r).then(a,u)}function o(e){return function(){var n=this,t=arguments;return new Promise((function(a,u){var c=e.apply(n,t);function o(e){i(c,a,u,o,r,"next",e)}function r(e){i(c,a,u,o,r,"throw",e)}o(void 0)}))}}var r={data:function(){return{content:"",imageLists:[]}},methods:{del:function(e){this.imageLists.splice(e,1)},addImage:function(){var n=this,t=5-this.imageLists.length;e.chooseImage({count:t,success:function(e){var a=e.tempFilePaths;a.forEach((function(e,a){a<t&&n.imageLists.push({url:e})})),console.log(e)}})},submit:function(){var n=this;return o(u.default.mark((function t(){var a,c,i;return u.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:a=[],e.showLoading(),c=0;case 3:if(!(c<n.imageLists.length)){t.next=12;break}return i=n.imageLists[c].url,t.next=7,n.uploadFiles(i);case 7:i=t.sent,a.push(i);case 9:c++,t.next=3;break;case 12:n.updateFeedback({content:n.content,feedbackImages:a});case 13:case"end":return t.stop()}}),t)})))()},uploadFiles:function(e){return o(u.default.mark((function n(){var t;return u.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,a.uploadFile({filePath:e});case 2:return t=n.sent,console.log(t),n.abrupt("return",t.fileID);case 5:case"end":return n.stop()}}),n)})))()},updateFeedback:function(n){var t=n.content,a=n.feedbackImages;this.$api.update_feedback({content:t,feedbackImages:a}).then((function(n){e.hideLoading(),e.showToast({title:"反馈提交成功",icon:"none"}),setTimeout((function(){e.switchTab({url:"/pages/tabbar/my/my"})}),2e3)})).catch((function(){e.hideLoading(),e.showToast({title:"反馈提交失败 ",icon:"none"})}))}}};n.default=r}).call(this,t("543d")["default"],t("a9ff")["default"])}},[["eb78","common/runtime","common/vendor"]]]);