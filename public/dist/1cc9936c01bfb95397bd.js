!function(e){function t(t){for(var r,o,i=t[0],l=t[1],u=t[2],d=0,m=[];d<i.length;d++)o=i[d],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&m.push(a[o][0]),a[o]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);for(s&&s(t);m.length;)m.shift()();return c.push.apply(c,u||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],r=!0,i=1;i<n.length;i++){var l=n[i];0!==a[l]&&(r=!1)}r&&(c.splice(t--,1),e=o(o.s=n[0]))}return e}var r={},a={0:0},c=[];function o(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=r,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var i=window.webpackJsonp=window.webpackJsonp||[],l=i.push.bind(i);i.push=t,i=i.slice();for(var u=0;u<i.length;u++)t(i[u]);var s=l;c.push([236,1]),n()}({236:function(e,t,n){n(237),e.exports=n(543)},440:function(e,t){},442:function(e,t){},473:function(e,t){},474:function(e,t){},542:function(e,t,n){},543:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(105),o=n(3),i=n.n(o),l=n(21),u=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(e){return t.reduce((function(t,n){return t||n(e)}),!1)}},s=u((function(e){return e?void 0:"Это поле обязательно"}),(function(e){if(!(e+"").startsWith("https://")&&!(e+"").startsWith("http://"))return"Укажите протокол"})),d=u((function(e){if(e)try{JSON.parse(e)}catch(e){return"Необходим JSON"}})),m=(n(429),n(53)),f=n.n(m),p=function(e){var t=e.className,n=void 0===t?"":t,r=e.text;return a.a.createElement("span",{className:"uk-position-absolute uk-overlay uk-padding-small ".concat(n)},a.a.createElement("div",{className:"uk-flex uk-flex-middle uk-height-1-1"},a.a.createElement("span",{className:"input-hint uk-active"},r)))};p.propTypes={className:i.a.string,text:i.a.string.required};var v=p;function b(){return(b=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function k(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function g(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?k(Object(n),!0).forEach((function(t){h(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):k(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function h(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var y=function(e){var t=f.a.AES.encrypt(JSON.stringify(e),"G8sKJhv0w7").toString();return f.a.enc.Base64.parse(t).toString(f.a.enc.Hex)},E=function(e){var t=f.a.enc.Hex.parse(e).toString(f.a.enc.Base64),n=f.a.AES.decrypt(t,"G8sKJhv0w7");return JSON.parse(n.toString(f.a.enc.Utf8))},O=function(e){return{set:function(t){return localStorage[e]=y(t)},list:function(){return localStorage[e]?E(localStorage[e]):void 0},get:function(t){var n;return null===(n=x[e].list())||void 0===n?void 0:n[t]},put:function(t,n){return x[e].set(g({},x[e].list(),h({},t,g({},n))))},del:function(t){var n=g({},x[e].list());delete n[t],x[e].set(n)},clear:function(){delete localStorage[e]}}},x={favorite:O("favorite"),history:O("history"),favicons:O("favicons")},j=function(e,t){var n=E(e),r=n.handlerType,a=n.method,c=n.redirectTo,o=n.link,i=new URL(o),l=i.hostname,u=i.pathname,s=i.search,d=[];d.push({text:r}),d.push({text:a}),c&&d.push({text:"redirect"}),x.favorite.put(e,{link:"/send?token=".concat(e),name:l+u+s,domain:l,labels:d}),t()},w=function(e,t){x.favorite.del(e),t()},N=function(e){var t=e.autofocus,n=void 0!==t&&t,r=e.input,c=e.icon,o=e.disabled,i=void 0!==o&&o,l=e.placeholder,u=void 0===l?"":l,s=e.meta.error&&e.meta.modified,d=e.meta.submitError&&!e.meta.active,m=e.meta.error,f=e.meta.error,p=s||d,k=m||f;return a.a.createElement("div",null,a.a.createElement("div",{className:"uk-inline uk-width-1-1 "},a.a.createElement("span",{className:"uk-form-icon","uk-icon":"icon: ".concat(c)}),a.a.createElement("input",b({},r,{autoFocus:n,disabled:i,placeholder:u,className:"uk-input ".concat(p?"uk-form-danger":"")})),p?a.a.createElement(v,{className:"uk-position-center-right",text:k}):void 0))},S=n(13),P=n(44);function T(){return(T=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function R(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var C=function(e){var t=e.clickHandler,n=e.visibilityTrigger,r=e.firstCheckbox,c=e.secondCheckbox,o=e.name,i=e.className,u=void 0===i?"":i,s=R(e,["clickHandler","visibilityTrigger","firstCheckbox","secondCheckbox","name","className"]),d=r.label?r.label:r.value+"",m=c.label?c.label:c.value+"",f=(d.length,m.length,d.length>=m.length?d:m);return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:"uk-hidden"},a.a.createElement(l.a,T({},r,{name:o,component:"input",type:"checkbox"})),a.a.createElement(l.a,T({},c,{name:o,component:"input",type:"checkbox"}))),a.a.createElement("button",T({className:"".concat(u," uk-position-relative uk-height-auto uk-flex uk-flex-middle uk-flex-center uk-button uk-button-secondary uk-padding-remove uk-margin-small-right"),onClick:t,type:"button"},s),a.a.createElement("div",null,a.a.createElement("span",{"uk-icon":"icon:  chevron-left"}),a.a.createElement("span",{className:"uk-invisible"},f),a.a.createElement("span",{"uk-icon":"icon:  chevron-right"})),a.a.createElement("div",{className:"uk-position-center"},a.a.createElement("span",null,n?d:m))))};C.propTypes={firstCheckbox:i.a.object.isRequired,secondCheckbox:i.a.object.isRequired,clickHandler:i.a.func.isRequired,visibilityTrigger:i.a.any.isRequired,name:i.a.string.isRequired,form:i.a.string,className:i.a.string};var q=C,F=n(35);function D(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function G(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?D(Object(n),!0).forEach((function(t){H(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):D(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function H(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function J(e,t,n,r,a,c,o){try{var i=e[c](o),l=i.value}catch(e){return void n(e)}i.done?t(l):Promise.resolve(l).then(r,a)}function M(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var c=e.apply(t,n);function o(e){J(c,r,a,o,i,"next",e)}function i(e){J(c,r,a,o,i,"throw",e)}o(void 0)}))}}var V={sendRequest:Object(F.b)("send-request",function(){var e=M(regeneratorRuntime.mark((function e(t){var n,r,a,c,o,i,l,u,s,d,m,f,p,v,b,k,g;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.token,e.prev=1,r=E(n),a=r.redirectTo,"server"!==(c=r.handlerType)){e.next=19;break}return e.next=6,fetch("".concat("http://get2p.herokuapp.com/api/v1","/request/").concat(n,"/"));case 6:if(o=e.sent,a&&location.assign(a),!o.ok){e.next=14;break}return e.next=11,o.json();case 11:e.t0=e.sent,e.next=15;break;case 14:e.t0=void 0;case 15:return i=e.t0,e.abrupt("return",{code:o.status,type:i.type,message:i.data||o.statusText});case 19:if("client"!==c){e.next=33;break}if(l=E(n),u=l.link,s=l.credentials,d=l.method,m=void 0===d?"GET":d,f=l.body,p=l.headers,v=l.noCorsMode,b={},f&&"GET"!==m)try{JSON.parse(f),b["content-type"]="application/json"}catch(e){b["content-type"]="application/x-www-form-urlencoded"}return e.next=25,fetch(u,{mode:v?"no-cors":void 0,credentials:s?"include":void 0,method:m,body:"GET"!==m?f:void 0,headers:G({},b,{},p)});case 25:return k=e.sent,a&&location.assign(a),e.next=29,k.text();case 29:return g=e.sent,e.abrupt("return",0!==k.status?{code:k.status,message:g}:{code:-2,message:"Content unavailable in case of no-cors mode"});case 33:return e.abrupt("return",void 0);case 34:e.next=40;break;case 36:return e.prev=36,e.t1=e.catch(1),console.error(e.t1),e.abrupt("return",{code:-1,message:"Connection refused"});case 40:case"end":return e.stop()}}),e,null,[[1,36]])})));return function(t){return e.apply(this,arguments)}}()),getFavicon:Object(F.b)("get-favicon",function(){var e=M(regeneratorRuntime.mark((function e(t){var n,r,a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.protocol,r=t.domainUrl,e.prev=1,console.log(n,r),e.next=5,fetch("".concat("http://get2p.herokuapp.com/api/v1","/favicon/").concat(y("".concat(n,"//").concat(r)),"/"));case 5:return e.next=7,e.sent.json();case 7:return a=e.sent,console.log(a),x.favicons.put(r,a),console.info("Favicon loaded"),e.abrupt("return",H({},r,a.data));case 14:throw e.prev=14,e.t0=e.catch(1),console.error(e.t0),e.t0;case 18:case"end":return e.stop()}}),e,null,[[1,14]])})));return function(t){return e.apply(this,arguments)}}())};function _(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function U(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var A=Object(F.c)({name:"favorite",initialState:{},reducers:{favoriteFromStorage:function(e){e.favorite=x.favorite.list()}}}),L=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?_(Object(n),!0).forEach((function(t){U(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):_(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},A.actions),B=A.reducer,I=n(52),K=function(e){var t,n;return null==e||null===(t=e.sendReducer)||void 0===t||null===(n=t.siteResponse)||void 0===n?void 0:n.code},W=function(e){var t,n;return null==e||null===(t=e.sendReducer)||void 0===t||null===(n=t.siteResponse)||void 0===n?void 0:n.message},z=function(e){var t;return null==e||null===(t=e.sendReducer)||void 0===t?void 0:t.favicons},Y=function(e){var t;return null==e||null===(t=e.favoriteReducer)||void 0===t?void 0:t.favorite};function Z(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function $(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Z(Object(n),!0).forEach((function(t){Q(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Z(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function Q(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function X(e,t,n,r,a,c,o){try{var i=e[c](o),l=i.value}catch(e){return void n(e)}i.done?t(l):Promise.resolve(l).then(r,a)}function ee(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var n=[],r=!0,a=!1,c=void 0;try{for(var o,i=e[Symbol.iterator]();!(r=(o=i.next()).done)&&(n.push(o.value),!t||n.length!==t);r=!0);}catch(e){a=!0,c=e}finally{try{r||null==i.return||i.return()}finally{if(a)throw c}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var te=function(e){return a.a.createElement("div",{className:"uk-flex uk-width-1-1 uk-flex-center uk-flex-column uk-child-width-1-1","uk-margin":"margin: uk-margin-top"},e.children)};te.propTypes={children:i.a.node};var ne=function(e){return a.a.createElement(te,null,a.a.createElement("div",{className:"uk-flex uk-width-1-1 uk-flex-between  uk-flex-wrap uk-visible@m","uk-margin":"margin: uk-margin-top"},e.children),a.a.createElement("div",{className:"uk-text-right uk-flex uk-flex-column  uk-hidden@m","uk-margin":"margin: uk-margin-top"},e.children))};ne.propTypes={children:i.a.node};var re=function(e){var t=Object(S.g)(),n=e.favorite,c=e.favoriteFromStorage,o=e.getFavicon,i=ee(Object(r.useState)(!1),2),u=i[0],m=i[1],f=function(){var e,n=(e=regeneratorRuntime.mark((function e(n){var r,a,i,l;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=y($({},n,{type:void 0,body:"GET"===n.method?void 0:n.body})),a=location.origin+"/send?token="+r,i="/send?token="+r,"clipboard"!==n.type){e.next=10;break}return e.next=6,navigator.clipboard.writeText(a);case 6:m(!0),setTimeout((function(){m(!1)}),1e3),e.next=11;break;case 10:"send"===n.type?t.push(i):"favorite"===n.type&&(l=new URL(n.link),o(l.protocol,l.hostname),j(r,(function(){return c()})));case 11:return e.abrupt("return",!0);case 12:case"end":return e.stop()}}),e)})),function(){var t=this,n=arguments;return new Promise((function(r,a){var c=e.apply(t,n);function o(e){X(c,r,a,o,i,"next",e)}function i(e){X(c,r,a,o,i,"throw",e)}o(void 0)}))});return function(e){return n.apply(this,arguments)}}();return a.a.createElement("div",{className:"uk-padding uk-padding-remove-bottom"},a.a.createElement("div",{className:"uk-text-center","uk-grid":""},n&&0!==Object.keys(n).length?a.a.createElement("div",{className:"uk-width-1-3@s uk-width-1-2@l","uk-margin":""},a.a.createElement("div",{className:"uk-card uk-card-body uk-card-default uk-text-left"},a.a.createElement("h3",{className:"uk-card-title"},"Избранное")),Object.keys(n).map((function(e){var t;return a.a.createElement(P.b,{to:n[e].link,onClick:function(e){e.target.closest(".red-closing-sign")&&e.preventDefault()},key:e,className:"uk-flex uk-flex-middle uk-card uk-card-body uk-card-default uk-card-small uk-card-hover uk-text-left card-link uk-link-reset"},a.a.createElement("img",{alt:"",className:"uk-icon-image",src:null===(t=x.favicons.get(n[e].domain))||void 0===t?void 0:t.data}),a.a.createElement("div",{className:"uk-width-expand uk-text-left uk-flex uk-flex-center uk-padding-small uk-padding-remove-vertical"},a.a.createElement("div",{className:"uk-flex uk-flex-column uk-width-1-1"},a.a.createElement("span",{className:" favorite-label"},n[e].name),a.a.createElement("div",null,n[e].labels.map((function(e){return a.a.createElement("span",{key:e.text,className:"uk-margin-small-right uk-label ".concat(e.className)},e.text)}))))),a.a.createElement("span",{className:"red-closing-sign","uk-icon":"icon: close",onClick:function(){w(e,(function(){return c()}))}}))}))):a.a.createElement("div",{className:"uk-width-1-6@s uk-width-1-4@l uk-visible@s"}),a.a.createElement("div",{className:"uk-width-2-3@s uk-width-1-2@l"},a.a.createElement(l.b,{onSubmit:f,mutators:{toggleMethod:function(e,t,n){n.changeValue(t,"method",(function(e){return"GET"===e?"POST":"GET"}))},toggleRedirect:function(e,t,n){n.changeValue(t,"redirect",(function(e){return!e}))},toggleHandlerType:function(e,t,n){n.changeValue(t,"handlerType",(function(e){return"server"===e?"client":"server"}))}},render:function(e){var t=e.handleSubmit,n=e.submitting,r=e.values,c=e.form;return a.a.createElement("form",{onSubmit:t},a.a.createElement("div",{className:"uk-card uk-card-body uk-card-default uk-text-left"},a.a.createElement("h3",{className:"uk-card-title uk-position-relative"},a.a.createElement("span",null,"Новый запрос"),a.a.createElement(P.b,{to:"/help",className:"uk-badge secondary-background uk-position-center-right"},"?")),a.a.createElement("div",{className:"uk-flex uk-flex-center uk-flex-column uk-child-width-1-1","uk-margin":"margin: uk-margin-top"},a.a.createElement("div",{className:"uk-flex"},a.a.createElement(q,{name:"method",firstCheckbox:{initialValue:"GET",value:"GET"},secondCheckbox:{value:"POST"},clickHandler:c.mutators.toggleMethod,visibilityTrigger:!r.method||"GET"===r.method}),a.a.createElement("div",{className:"uk-width-expand"},a.a.createElement(l.a,{name:"link",disabled:n,type:"text",icon:"forward",placeholder:"http://example.com/login/".concat(r.method&&"GET"!==r.method?"":"?foo=bar&bar=foo"),validate:s,autofocus:!1},N))),function(e,t){if(e.method&&"GET"!==e.method)return a.a.createElement(te,null,a.a.createElement(l.a,{name:"body",disabled:t,type:"text",icon:"link",placeholder:"foo=bar&bar=foo"},N))}(r,n),a.a.createElement("ul",{"uk-accordion":""},a.a.createElement("li",null,a.a.createElement("a",{className:"uk-accordion-title uk-text-secondary",href:"#"},"Дополнительно"),a.a.createElement("div",{className:"uk-accordion-content"},a.a.createElement(ne,null,a.a.createElement("div",{className:"uk-width-1-1","uk-margin":""},a.a.createElement(q,{className:"uk-width-expand",name:"handlerType",firstCheckbox:{initialValue:"server",value:"server",label:"Server side"},secondCheckbox:{value:"client",label:"Client side"},clickHandler:c.mutators.toggleHandlerType,visibilityTrigger:!r.handlerType||"server"===r.handlerType}),a.a.createElement(l.a,{name:"headers",disabled:n,type:"text",icon:"cog",placeholder:'{"accept": "application/json"}',validate:d},N),a.a.createElement("div",{className:"uk-flex"},a.a.createElement("div",{className:"uk-width-expand"},a.a.createElement(l.a,{name:"redirectTo",disabled:n,type:"text",icon:"future",placeholder:"http://example.com/main/"},N)))),a.a.createElement(ne,null,a.a.createElement("label",null,a.a.createElement(l.a,{initialValue:!0,name:"credentials",component:"input",type:"checkbox",className:"uk-checkbox"})," ","Credentials"),a.a.createElement("label",{className:r.handlerType&&"server"!==r.handlerType?"":"uk-hidden"},a.a.createElement(l.a,{initialValue:!0,name:"noCorsMode",component:"input",type:"checkbox",className:"uk-checkbox"})," ","No-cors")))))),a.a.createElement(ne,null,a.a.createElement("div",null,a.a.createElement("button",{onClick:function(){c.change("type","favorite")},className:"uk-button uk-position-relative"},a.a.createElement("span",null,"В избранное"))),a.a.createElement("div",null,a.a.createElement("button",{disabled:!window.isSecureContext,onClick:function(){c.change("type","clipboard")},className:"uk-button uk-position-relative"},a.a.createElement("span",{className:u?"uk-invisible":""},"В буфер обмена"),a.a.createElement("span",{className:"".concat(u?"":"uk-invisible"," uk-position-center")},"✓"))),a.a.createElement("div",null,a.a.createElement("button",{onClick:function(){c.change("type","send")},className:"uk-button uk-button-primary"},"Отправить"))))))}}))))};re.propTypes={favorite:i.a.object,favoriteFromStorage:i.a.func.isRequired,getFavicon:i.a.func.isRequired};var ae=Object(I.b)((function(e){return{favorite:Y(e)}}),(function(e){return{favoriteFromStorage:function(){return e(L.favoriteFromStorage(void 0))},getFavicon:function(t,n){return e(V.getFavicon({protocol:t,domainUrl:n}))}}}))(re),ce=function(e){var t=e.isError,n=void 0!==t&&t,r=e.ratio,c=void 0===r?"1":r,o=e.className,i=void 0===o?"":o,l=e.relative,u=e.loading,s=e.errorHandler,d=void 0===s?function(){}:s,m=a.a.createElement(a.a.Fragment,null,a.a.createElement("span",{className:"uk-position-center ".concat(u?"":"uk-invisible"),"uk-spinner":"ratio: ".concat(c)}),a.a.createElement("button",{className:"uk-button uk-position-center ".concat(n?"":"uk-hidden"),onClick:d,"uk-icon":"icon: refresh; ratio: ".concat(c)}),a.a.createElement("div",{className:"".concat(u||n?"uk-invisible":""," ").concat(i)},e.children));return l?a.a.createElement("div",{className:"uk-position-relative"},m):m};ce.propTypes={children:i.a.node.isRequired,loading:i.a.bool.isRequired,isError:i.a.bool,relative:i.a.bool,errorHandler:i.a.func,ratio:i.a.string,className:i.a.string};var oe,ie=ce;function le(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function ue(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?le(Object(n),!0).forEach((function(t){se(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):le(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function se(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var de=Object(F.c)({name:"send",initialState:{},reducers:{clearResponse:function(e){e.siteResponse={}}},extraReducers:(oe={},se(oe,V.sendRequest.fulfilled,(function(e,t){return ue({},e,{siteResponse:ue({},t.payload)})})),se(oe,V.sendRequest.rejected,(function(e,t){return ue({},e,{siteResponse:ue({},t.payload)})})),se(oe,V.getFavicon.fulfilled,(function(e,t){return ue({},e,{favicons:ue({},e.favicons,{},t.payload)})})),oe)}),me=ue({},de.actions),fe=de.reducer,pe=n.p+"37857ad3f846f65476cffb20d3dfc4e5.svg",ve=n.p+"d1d08460bfd28080eb4d570f6baeaa60.svg",be=function(e){var t=e.token,n=e.favoriteFromStorage,r=e.favorite;return a.a.createElement("button",{className:"uk-padding-small",onClick:function(){(null==r?void 0:r[t])?w(t,(function(){return n()})):j(t,(function(){return n()}))},"uk-icon":""},a.a.createElement("img",{alt:"favorite",className:"uk-icon-image ".concat((null==r?void 0:r[t])?"":"uk-hidden"),src:pe,"uk-svg":""}),a.a.createElement("img",{alt:"favorite",className:"uk-icon-image ".concat((null==r?void 0:r[t])?"uk-hidden":""),src:ve,"uk-svg":""}))};be.propTypes={token:i.a.string.isRequired,favoriteFromStorage:i.a.func.isRequired,favorite:i.a.object};var ke=Object(I.b)((function(e){return{favorite:Y(e)}}),(function(e){return{favoriteFromStorage:function(){return e(L.favoriteFromStorage(void 0))}}}))(be);function ge(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function he(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var ye=function(e){var t,n,c=Object(S.h)(),o=e.code,i=e.message,l=e.favicons,u=(e.favorite,e.sendRequest),s=e.clearResponse,d=e.getFavicon,m=(e.favoriteFromStorage,new URLSearchParams(c.search).get("token")),f=function(e){if(!e)return{error:"Вы не указали токен"};var t;try{t=E(e)}catch(e){return{error:"Перегенерируйте токен"}}if(t.headers)try{t.headers=JSON.parse(t.headers)}catch(e){return{error:"Хэдеры должны быть в JSON"}}return t.credentials?t.credentials="include":t.credentials=void 0,t}(m),p=f.redirectTo,v=f.handlerType,b=f.method,k=new URL(f.link),g=k.hostname,h=k.protocol,y=(null==l?void 0:l[g])||(null===(t=x.favicons.get(g))||void 0===t?void 0:t.data)||"",O=function(){u(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ge(Object(n),!0).forEach((function(t){he(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ge(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({token:m},f))};Object(r.useEffect)((function(){y||d(h,g),O()}),[]);try{n=JSON.stringify(JSON.parse(i),null,2)}catch(e){n=i}return n&&(n=n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,(function(e){var t="json-number";return/^"/.test(e)?t=/:$/.test(e)?"json-key":"json-string":/true|false/.test(e)?t="json-boolean":/null/.test(e)&&(t="json-null"),'<span class="'.concat(t,'">').concat(e,"</span>")}))),console.log(),a.a.createElement("div",{className:"uk-height-1-1 uk-flex uk-flex-center"},a.a.createElement(ie,{ratio:"5",loading:!o&&!i,className:"uk-padding uk-flex uk-flex-middle uk-flex-column"},function(e){if(e<0)return a.a.createElement("h1",{className:"uk-margin-remove"},"???");var t="uk-text-success";return e>=300&&(t="uk-text-primary"),e>=400&&(t="uk-text-warning"),e>=500&&(t="uk-text-danger"),a.a.createElement("h1",{className:t+" uk-margin-remove"},e)}(o),a.a.createElement("div",{className:"uk-margin-remove uk-text-muted"},a.a.createElement("span",null,"client"===v?"Client":"Server")," ",a.a.createElement("div",{className:"uk-position-relative",style:{display:"inline"}},a.a.createElement("span",{className:"method-span"},b),a.a.createElement("span",null,"--\x3e"))," ",a.a.createElement("img",{alt:"",className:"uk-icon-image text-img",src:y})," ",a.a.createElement("span",null,"->")," ",a.a.createElement("span",null,"You")),a.a.createElement("pre",{className:"code-block",style:{userSelect:"text"},dangerouslySetInnerHTML:{__html:n}}),a.a.createElement("div",null,a.a.createElement(P.b,{to:"/",className:"uk-padding-small","uk-icon":"icon: home"}),a.a.createElement("button",{className:"uk-padding-small","uk-icon":"icon: refresh",onClick:function(){s(),O()}}),a.a.createElement(ke,{token:m}),a.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:p||h+g,className:"uk-padding-small","uk-icon":""},a.a.createElement("img",{alt:"",className:"uk-icon-image",src:y})))))};ye.propTypes={favicons:i.a.object,favorite:i.a.object,code:i.a.number,message:i.a.string,sendRequest:i.a.func.isRequired,clearResponse:i.a.func.isRequired,favoriteFromStorage:i.a.func.isRequired,getFavicon:i.a.func.isRequired};var Ee=Object(I.b)((function(e){return{code:K(e),message:W(e),favicons:z(e),favorite:Y(e)}}),(function(e){return{sendRequest:function(t){return e(V.sendRequest(t))},clearResponse:function(){return e(me.clearResponse(void 0))},getFavicon:function(t,n){return e(V.getFavicon({protocol:t,domainUrl:n}))},favoriteFromStorage:function(){return e(L.favoriteFromStorage(void 0))}}}))(ye),Oe=function(e){var t=e.index,n=e.text;return a.a.createElement("div",{className:"uk-child-width-1-1 uk-child-width-expand@m","uk-grid":""},a.a.createElement("div",{className:"uk-flex uk-flex-middle uk-flex-center uk-text-left uk-width-auto@m"},a.a.createElement("h1",null,t,".")),a.a.createElement("div",{className:"uk-flex uk-flex-middle uk-flex-center"},a.a.createElement("div",{className:"uk-flex uk-width-expand uk-width-expand"},e.children)),a.a.createElement("div",{className:"uk-flex uk-flex-middle uk-flex-center uk-text-left",style:{whiteSpace:"pre-wrap"}},n))};Oe.propTypes={children:i.a.object.isRequired,index:i.a.number.isRequired,text:i.a.string.isRequired};var xe=function(e){var t=Object(S.g)(),n=function(e){27===e.keyCode&&t.goBack()};return Object(r.useEffect)((function(){return document.addEventListener("keydown",n,!1),function(){return document.removeEventListener("keydown",n,!1)}}),[]),a.a.createElement(l.b,{onSubmit:function(){},render:function(){return a.a.createElement("div",{className:"uk-padding uk-padding-remove-bottom"},a.a.createElement("div",{className:"uk-text-center uk-flex uk-flex-column","uk-margin":"margin: uk-margin"},a.a.createElement(Oe,{index:1,text:"Выберите метод и введите ссылку, на которую надо отправить запрос."},a.a.createElement(a.a.Fragment,null,a.a.createElement(q,{name:"method",firstCheckbox:{initialValue:"GET",value:"GET"},secondCheckbox:{value:"POST"},clickHandler:function(){},visibilityTrigger:!0}),a.a.createElement("div",{className:"uk-width-expand"},a.a.createElement(l.a,{name:"link",type:"text",icon:"forward",placeholder:"http://example.com/login/?foo=bar&bar=foo"},N)))),a.a.createElement(Oe,{index:2,text:'Запрос со стороны сервера может быть полезен, если ваша цель - получить ответ от сайта. \nClient side с включенным "no-cors" не дает получить ответ, но можно, например, POST-запросом залогиниться на каком-то сервисе\nЕсли выключить "no-cors", то некоторые сайты будут блокировать ваш запрос'},a.a.createElement(q,{className:"uk-width-expand",name:"handlerType",firstCheckbox:{initialValue:"server",value:"server",label:"Server side"},secondCheckbox:{value:"client",label:"Client side"},clickHandler:function(){},visibilityTrigger:!0})),a.a.createElement(Oe,{index:3,text:"Если хотите, можно передать дополнительные хэдеры, записанные в JSON формате"},a.a.createElement("div",{className:"uk-width-expand"},a.a.createElement(l.a,{name:"headers",type:"text",icon:"cog",placeholder:'{"accept": "application/json"}'},N))),a.a.createElement(Oe,{index:4,text:"После получения ответа от сайта, можно совершить переход по указанной ссылке"},a.a.createElement("div",{className:"uk-width-expand"},a.a.createElement(l.a,{name:"redirectTo",type:"text",icon:"future",placeholder:"http://example.com/main/"},N))),a.a.createElement("div",{className:"uk-width-expand uk-flex uk-flex-center"},a.a.createElement("span",null,"Нажмите ESC или"," "," ",a.a.createElement("a",{onClick:function(){return t.goBack()}},"сюда"),", чтобы вернуться"))))}})},je=function(){return a.a.createElement(S.d,null,a.a.createElement(S.b,{exact:!0,path:"/send"},a.a.createElement(Ee,null)),a.a.createElement(S.b,{exact:!0,path:"/help"},a.a.createElement(xe,null)),a.a.createElement(S.b,{exact:!0,path:"/"},a.a.createElement(ae,null)),a.a.createElement(S.b,null,a.a.createElement(S.a,{to:"/"})))},we=n(234),Ne=n.n(we),Se=n(235),Pe=n.n(Se),Te=(n(542),n(36)),Re=Object(Te.c)({sendReducer:fe,favoriteReducer:B});!function(){Ne.a.use(Pe.a);var e=Object(F.a)({reducer:Re,middleware:Object(F.d)({thunk:!0}),devTools:!0});e.dispatch(L.favoriteFromStorage(void 0)),c.render(a.a.createElement(P.a,null,a.a.createElement(I.a,{store:e},a.a.createElement(je,null))),document.querySelector("#root"))}()}});