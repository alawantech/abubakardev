const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Header-BXgX1XhW.js","assets/index-DTKOkqq6.js","assets/index-CGMdaFRs.js","assets/proxy-KfpJZ6Wh.js","assets/Header-D68OhYW6.css","assets/SchoolHeader-S_1OXBqM.js","assets/Footer-maF9ruNK.js","assets/whatsapp-iXsRsBRX.js","assets/whatsapp-BXPgDP-m.css","assets/SchoolFooter-CfHrK95K.js","assets/Contact-BC5VDXCC.js","assets/index-BJi4jAYL.js","assets/Contact-BkvfFzWL.js","assets/Contact-DgnsqYZU.css","assets/SchoolContact-CZ6XJdpI.js","assets/About-DpVyB7Ah.js","assets/About-E3RiT8rh.js","assets/About-yInVy8k1.css","assets/SchoolAbout-DWRg-UW0.js","assets/SchoolLanding-BvQPXC3w.js","assets/Courses-RJI7kygW.js","assets/Courses-CnogYixt.css","assets/use-transform-awMqA8QH.js","assets/SchoolLanding-BHVsyt4K.css","assets/Links-D0jCiObX.js","assets/Links-ebyv267J.css","assets/Chatbot-Z3OXgHVX.js","assets/Chatbot-B5VXPjDR.css","assets/Hero-CUOLmTlo.js","assets/Hero-CNUBrqai.css","assets/Services-DnYEzNHq.js","assets/Services-DznoEM93.css","assets/Portfolio-Dy_QJSRm.js","assets/Portfolio-DmbiIsmF.css","assets/CoursePage-C7_42Pf4.js","assets/formatDescription-ByXp56Kw.js","assets/CoursePage-ColjhqQZ.css","assets/CourseLearning-C76BZ6T3.js","assets/CourseLearning-h-qq1pSa.css","assets/CourseSignUp-DHnOPPle.js","assets/CourseSignUp-mg1O0mPB.css","assets/CoursePayment-BFjE3Ju7.js","assets/CoursePayment-DZ4I_DHR.css","assets/Dashboard-BfJ4Tq_O.js","assets/Dashboard-DfDNLRds.css","assets/Pricing-BeppO32C.js","assets/Pricing-CqfsMX2v.css","assets/Login-BDiKHuqK.js","assets/Login-DQXs0rmA.css","assets/Register-CiS8JO2X.js","assets/Register-CPFRTYJ6.css","assets/AdminDashboard-CLFgXG1X.js","assets/AdminDashboard-UKa1Xslq.css"])))=>i.map(i=>d[i]);
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();var sM=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function HS(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var Sv={exports:{}},xu={},Av={exports:{}},ee={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var fa=Symbol.for("react.element"),qS=Symbol.for("react.portal"),WS=Symbol.for("react.fragment"),KS=Symbol.for("react.strict_mode"),GS=Symbol.for("react.profiler"),QS=Symbol.for("react.provider"),YS=Symbol.for("react.context"),XS=Symbol.for("react.forward_ref"),JS=Symbol.for("react.suspense"),ZS=Symbol.for("react.memo"),eA=Symbol.for("react.lazy"),fg=Symbol.iterator;function tA(t){return t===null||typeof t!="object"?null:(t=fg&&t[fg]||t["@@iterator"],typeof t=="function"?t:null)}var Rv={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Cv=Object.assign,Pv={};function Ps(t,e,n){this.props=t,this.context=e,this.refs=Pv,this.updater=n||Rv}Ps.prototype.isReactComponent={};Ps.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Ps.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function kv(){}kv.prototype=Ps.prototype;function uf(t,e,n){this.props=t,this.context=e,this.refs=Pv,this.updater=n||Rv}var cf=uf.prototype=new kv;cf.constructor=uf;Cv(cf,Ps.prototype);cf.isPureReactComponent=!0;var pg=Array.isArray,Nv=Object.prototype.hasOwnProperty,hf={current:null},Dv={key:!0,ref:!0,__self:!0,__source:!0};function xv(t,e,n){var r,i={},s=null,o=null;if(e!=null)for(r in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)Nv.call(e,r)&&!Dv.hasOwnProperty(r)&&(i[r]=e[r]);var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){for(var u=Array(l),c=0;c<l;c++)u[c]=arguments[c+2];i.children=u}if(t&&t.defaultProps)for(r in l=t.defaultProps,l)i[r]===void 0&&(i[r]=l[r]);return{$$typeof:fa,type:t,key:s,ref:o,props:i,_owner:hf.current}}function nA(t,e){return{$$typeof:fa,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function df(t){return typeof t=="object"&&t!==null&&t.$$typeof===fa}function rA(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var mg=/\/+/g;function Kc(t,e){return typeof t=="object"&&t!==null&&t.key!=null?rA(""+t.key):e.toString(36)}function ml(t,e,n,r,i){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case fa:case qS:o=!0}}if(o)return o=t,i=i(o),t=r===""?"."+Kc(o,0):r,pg(i)?(n="",t!=null&&(n=t.replace(mg,"$&/")+"/"),ml(i,e,n,"",function(c){return c})):i!=null&&(df(i)&&(i=nA(i,n+(!i.key||o&&o.key===i.key?"":(""+i.key).replace(mg,"$&/")+"/")+t)),e.push(i)),1;if(o=0,r=r===""?".":r+":",pg(t))for(var l=0;l<t.length;l++){s=t[l];var u=r+Kc(s,l);o+=ml(s,e,n,u,i)}else if(u=tA(t),typeof u=="function")for(t=u.call(t),l=0;!(s=t.next()).done;)s=s.value,u=r+Kc(s,l++),o+=ml(s,e,n,u,i);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function $a(t,e,n){if(t==null)return t;var r=[],i=0;return ml(t,r,"","",function(s){return e.call(n,s,i++)}),r}function iA(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var pt={current:null},gl={transition:null},sA={ReactCurrentDispatcher:pt,ReactCurrentBatchConfig:gl,ReactCurrentOwner:hf};function Ov(){throw Error("act(...) is not supported in production builds of React.")}ee.Children={map:$a,forEach:function(t,e,n){$a(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return $a(t,function(){e++}),e},toArray:function(t){return $a(t,function(e){return e})||[]},only:function(t){if(!df(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};ee.Component=Ps;ee.Fragment=WS;ee.Profiler=GS;ee.PureComponent=uf;ee.StrictMode=KS;ee.Suspense=JS;ee.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=sA;ee.act=Ov;ee.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var r=Cv({},t.props),i=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=hf.current),e.key!==void 0&&(i=""+e.key),t.type&&t.type.defaultProps)var l=t.type.defaultProps;for(u in e)Nv.call(e,u)&&!Dv.hasOwnProperty(u)&&(r[u]=e[u]===void 0&&l!==void 0?l[u]:e[u])}var u=arguments.length-2;if(u===1)r.children=n;else if(1<u){l=Array(u);for(var c=0;c<u;c++)l[c]=arguments[c+2];r.children=l}return{$$typeof:fa,type:t.type,key:i,ref:s,props:r,_owner:o}};ee.createContext=function(t){return t={$$typeof:YS,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:QS,_context:t},t.Consumer=t};ee.createElement=xv;ee.createFactory=function(t){var e=xv.bind(null,t);return e.type=t,e};ee.createRef=function(){return{current:null}};ee.forwardRef=function(t){return{$$typeof:XS,render:t}};ee.isValidElement=df;ee.lazy=function(t){return{$$typeof:eA,_payload:{_status:-1,_result:t},_init:iA}};ee.memo=function(t,e){return{$$typeof:ZS,type:t,compare:e===void 0?null:e}};ee.startTransition=function(t){var e=gl.transition;gl.transition={};try{t()}finally{gl.transition=e}};ee.unstable_act=Ov;ee.useCallback=function(t,e){return pt.current.useCallback(t,e)};ee.useContext=function(t){return pt.current.useContext(t)};ee.useDebugValue=function(){};ee.useDeferredValue=function(t){return pt.current.useDeferredValue(t)};ee.useEffect=function(t,e){return pt.current.useEffect(t,e)};ee.useId=function(){return pt.current.useId()};ee.useImperativeHandle=function(t,e,n){return pt.current.useImperativeHandle(t,e,n)};ee.useInsertionEffect=function(t,e){return pt.current.useInsertionEffect(t,e)};ee.useLayoutEffect=function(t,e){return pt.current.useLayoutEffect(t,e)};ee.useMemo=function(t,e){return pt.current.useMemo(t,e)};ee.useReducer=function(t,e,n){return pt.current.useReducer(t,e,n)};ee.useRef=function(t){return pt.current.useRef(t)};ee.useState=function(t){return pt.current.useState(t)};ee.useSyncExternalStore=function(t,e,n){return pt.current.useSyncExternalStore(t,e,n)};ee.useTransition=function(){return pt.current.useTransition()};ee.version="18.3.1";Av.exports=ee;var V=Av.exports;const le=HS(V);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var oA=V,aA=Symbol.for("react.element"),lA=Symbol.for("react.fragment"),uA=Object.prototype.hasOwnProperty,cA=oA.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,hA={key:!0,ref:!0,__self:!0,__source:!0};function Vv(t,e,n){var r,i={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(r in e)uA.call(e,r)&&!hA.hasOwnProperty(r)&&(i[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)i[r]===void 0&&(i[r]=e[r]);return{$$typeof:aA,type:t,key:s,ref:o,props:i,_owner:cA.current}}xu.Fragment=lA;xu.jsx=Vv;xu.jsxs=Vv;Sv.exports=xu;var b=Sv.exports,Lv={exports:{}},Vt={},bv={exports:{}},Mv={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e($,Q){var J=$.length;$.push(Q);e:for(;0<J;){var _e=J-1>>>1,De=$[_e];if(0<i(De,Q))$[_e]=Q,$[J]=De,J=_e;else break e}}function n($){return $.length===0?null:$[0]}function r($){if($.length===0)return null;var Q=$[0],J=$.pop();if(J!==Q){$[0]=J;e:for(var _e=0,De=$.length,Wr=De>>>1;_e<Wr;){var bt=2*(_e+1)-1,Kr=$[bt],Kt=bt+1,Qn=$[Kt];if(0>i(Kr,J))Kt<De&&0>i(Qn,Kr)?($[_e]=Qn,$[Kt]=J,_e=Kt):($[_e]=Kr,$[bt]=J,_e=bt);else if(Kt<De&&0>i(Qn,J))$[_e]=Qn,$[Kt]=J,_e=Kt;else break e}}return Q}function i($,Q){var J=$.sortIndex-Q.sortIndex;return J!==0?J:$.id-Q.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var o=Date,l=o.now();t.unstable_now=function(){return o.now()-l}}var u=[],c=[],d=1,p=null,m=3,T=!1,C=!1,P=!1,D=typeof setTimeout=="function"?setTimeout:null,v=typeof clearTimeout=="function"?clearTimeout:null,_=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function I($){for(var Q=n(c);Q!==null;){if(Q.callback===null)r(c);else if(Q.startTime<=$)r(c),Q.sortIndex=Q.expirationTime,e(u,Q);else break;Q=n(c)}}function x($){if(P=!1,I($),!C)if(n(u)!==null)C=!0,js(F);else{var Q=n(c);Q!==null&&Bs(x,Q.startTime-$)}}function F($,Q){C=!1,P&&(P=!1,v(y),y=-1),T=!0;var J=m;try{for(I(Q),p=n(u);p!==null&&(!(p.expirationTime>Q)||$&&!R());){var _e=p.callback;if(typeof _e=="function"){p.callback=null,m=p.priorityLevel;var De=_e(p.expirationTime<=Q);Q=t.unstable_now(),typeof De=="function"?p.callback=De:p===n(u)&&r(u),I(Q)}else r(u);p=n(u)}if(p!==null)var Wr=!0;else{var bt=n(c);bt!==null&&Bs(x,bt.startTime-Q),Wr=!1}return Wr}finally{p=null,m=J,T=!1}}var j=!1,E=null,y=-1,w=5,A=-1;function R(){return!(t.unstable_now()-A<w)}function k(){if(E!==null){var $=t.unstable_now();A=$;var Q=!0;try{Q=E(!0,$)}finally{Q?S():(j=!1,E=null)}}else j=!1}var S;if(typeof _=="function")S=function(){_(k)};else if(typeof MessageChannel<"u"){var We=new MessageChannel,Cn=We.port2;We.port1.onmessage=k,S=function(){Cn.postMessage(null)}}else S=function(){D(k,0)};function js($){E=$,j||(j=!0,S())}function Bs($,Q){y=D(function(){$(t.unstable_now())},Q)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function($){$.callback=null},t.unstable_continueExecution=function(){C||T||(C=!0,js(F))},t.unstable_forceFrameRate=function($){0>$||125<$?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):w=0<$?Math.floor(1e3/$):5},t.unstable_getCurrentPriorityLevel=function(){return m},t.unstable_getFirstCallbackNode=function(){return n(u)},t.unstable_next=function($){switch(m){case 1:case 2:case 3:var Q=3;break;default:Q=m}var J=m;m=Q;try{return $()}finally{m=J}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function($,Q){switch($){case 1:case 2:case 3:case 4:case 5:break;default:$=3}var J=m;m=$;try{return Q()}finally{m=J}},t.unstable_scheduleCallback=function($,Q,J){var _e=t.unstable_now();switch(typeof J=="object"&&J!==null?(J=J.delay,J=typeof J=="number"&&0<J?_e+J:_e):J=_e,$){case 1:var De=-1;break;case 2:De=250;break;case 5:De=1073741823;break;case 4:De=1e4;break;default:De=5e3}return De=J+De,$={id:d++,callback:Q,priorityLevel:$,startTime:J,expirationTime:De,sortIndex:-1},J>_e?($.sortIndex=J,e(c,$),n(u)===null&&$===n(c)&&(P?(v(y),y=-1):P=!0,Bs(x,J-_e))):($.sortIndex=De,e(u,$),C||T||(C=!0,js(F))),$},t.unstable_shouldYield=R,t.unstable_wrapCallback=function($){var Q=m;return function(){var J=m;m=Q;try{return $.apply(this,arguments)}finally{m=J}}}})(Mv);bv.exports=Mv;var dA=bv.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var fA=V,Ot=dA;function U(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Fv=new Set,Bo={};function Ai(t,e){fs(t,e),fs(t+"Capture",e)}function fs(t,e){for(Bo[t]=e,t=0;t<e.length;t++)Fv.add(e[t])}var Fn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Uh=Object.prototype.hasOwnProperty,pA=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,gg={},yg={};function mA(t){return Uh.call(yg,t)?!0:Uh.call(gg,t)?!1:pA.test(t)?yg[t]=!0:(gg[t]=!0,!1)}function gA(t,e,n,r){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function yA(t,e,n,r){if(e===null||typeof e>"u"||gA(t,e,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function mt(t,e,n,r,i,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var Xe={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Xe[t]=new mt(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Xe[e]=new mt(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Xe[t]=new mt(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Xe[t]=new mt(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Xe[t]=new mt(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Xe[t]=new mt(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Xe[t]=new mt(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Xe[t]=new mt(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Xe[t]=new mt(t,5,!1,t.toLowerCase(),null,!1,!1)});var ff=/[\-:]([a-z])/g;function pf(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(ff,pf);Xe[e]=new mt(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(ff,pf);Xe[e]=new mt(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(ff,pf);Xe[e]=new mt(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Xe[t]=new mt(t,1,!1,t.toLowerCase(),null,!1,!1)});Xe.xlinkHref=new mt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Xe[t]=new mt(t,1,!1,t.toLowerCase(),null,!0,!0)});function mf(t,e,n,r){var i=Xe.hasOwnProperty(e)?Xe[e]:null;(i!==null?i.type!==0:r||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(yA(e,n,i,r)&&(n=null),r||i===null?mA(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):i.mustUseProperty?t[i.propertyName]=n===null?i.type===3?!1:"":n:(e=i.attributeName,r=i.attributeNamespace,n===null?t.removeAttribute(e):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?t.setAttributeNS(r,e,n):t.setAttribute(e,n))))}var Gn=fA.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ha=Symbol.for("react.element"),zi=Symbol.for("react.portal"),$i=Symbol.for("react.fragment"),gf=Symbol.for("react.strict_mode"),jh=Symbol.for("react.profiler"),Uv=Symbol.for("react.provider"),jv=Symbol.for("react.context"),yf=Symbol.for("react.forward_ref"),Bh=Symbol.for("react.suspense"),zh=Symbol.for("react.suspense_list"),_f=Symbol.for("react.memo"),ir=Symbol.for("react.lazy"),Bv=Symbol.for("react.offscreen"),_g=Symbol.iterator;function io(t){return t===null||typeof t!="object"?null:(t=_g&&t[_g]||t["@@iterator"],typeof t=="function"?t:null)}var Ie=Object.assign,Gc;function mo(t){if(Gc===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Gc=e&&e[1]||""}return`
`+Gc+t}var Qc=!1;function Yc(t,e){if(!t||Qc)return"";Qc=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var r=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){r=c}t.call(e.prototype)}else{try{throw Error()}catch(c){r=c}t()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var i=c.stack.split(`
`),s=r.stack.split(`
`),o=i.length-1,l=s.length-1;1<=o&&0<=l&&i[o]!==s[l];)l--;for(;1<=o&&0<=l;o--,l--)if(i[o]!==s[l]){if(o!==1||l!==1)do if(o--,l--,0>l||i[o]!==s[l]){var u=`
`+i[o].replace(" at new "," at ");return t.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",t.displayName)),u}while(1<=o&&0<=l);break}}}finally{Qc=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?mo(t):""}function _A(t){switch(t.tag){case 5:return mo(t.type);case 16:return mo("Lazy");case 13:return mo("Suspense");case 19:return mo("SuspenseList");case 0:case 2:case 15:return t=Yc(t.type,!1),t;case 11:return t=Yc(t.type.render,!1),t;case 1:return t=Yc(t.type,!0),t;default:return""}}function $h(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case $i:return"Fragment";case zi:return"Portal";case jh:return"Profiler";case gf:return"StrictMode";case Bh:return"Suspense";case zh:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case jv:return(t.displayName||"Context")+".Consumer";case Uv:return(t._context.displayName||"Context")+".Provider";case yf:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case _f:return e=t.displayName||null,e!==null?e:$h(t.type)||"Memo";case ir:e=t._payload,t=t._init;try{return $h(t(e))}catch{}}return null}function vA(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return $h(e);case 8:return e===gf?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function Pr(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function zv(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function EA(t){var e=zv(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),r=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return i.call(this)},set:function(o){r=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function qa(t){t._valueTracker||(t._valueTracker=EA(t))}function $v(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),r="";return t&&(r=zv(t)?t.checked?"true":"false":t.value),t=r,t!==n?(e.setValue(t),!0):!1}function Ul(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Hh(t,e){var n=e.checked;return Ie({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function vg(t,e){var n=e.defaultValue==null?"":e.defaultValue,r=e.checked!=null?e.checked:e.defaultChecked;n=Pr(e.value!=null?e.value:n),t._wrapperState={initialChecked:r,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function Hv(t,e){e=e.checked,e!=null&&mf(t,"checked",e,!1)}function qh(t,e){Hv(t,e);var n=Pr(e.value),r=e.type;if(n!=null)r==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(r==="submit"||r==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Wh(t,e.type,n):e.hasOwnProperty("defaultValue")&&Wh(t,e.type,Pr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Eg(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var r=e.type;if(!(r!=="submit"&&r!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function Wh(t,e,n){(e!=="number"||Ul(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var go=Array.isArray;function ns(t,e,n,r){if(t=t.options,e){e={};for(var i=0;i<n.length;i++)e["$"+n[i]]=!0;for(n=0;n<t.length;n++)i=e.hasOwnProperty("$"+t[n].value),t[n].selected!==i&&(t[n].selected=i),i&&r&&(t[n].defaultSelected=!0)}else{for(n=""+Pr(n),e=null,i=0;i<t.length;i++){if(t[i].value===n){t[i].selected=!0,r&&(t[i].defaultSelected=!0);return}e!==null||t[i].disabled||(e=t[i])}e!==null&&(e.selected=!0)}}function Kh(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(U(91));return Ie({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function wg(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(U(92));if(go(n)){if(1<n.length)throw Error(U(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:Pr(n)}}function qv(t,e){var n=Pr(e.value),r=Pr(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),r!=null&&(t.defaultValue=""+r)}function Tg(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function Wv(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Gh(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?Wv(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Wa,Kv=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,r,i){MSApp.execUnsafeLocalFunction(function(){return t(e,n,r,i)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(Wa=Wa||document.createElement("div"),Wa.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Wa.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function zo(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Ao={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},wA=["Webkit","ms","Moz","O"];Object.keys(Ao).forEach(function(t){wA.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),Ao[e]=Ao[t]})});function Gv(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||Ao.hasOwnProperty(t)&&Ao[t]?(""+e).trim():e+"px"}function Qv(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=Gv(n,e[n],r);n==="float"&&(n="cssFloat"),r?t.setProperty(n,i):t[n]=i}}var TA=Ie({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Qh(t,e){if(e){if(TA[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(U(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(U(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(U(61))}if(e.style!=null&&typeof e.style!="object")throw Error(U(62))}}function Yh(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Xh=null;function vf(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Jh=null,rs=null,is=null;function Ig(t){if(t=ga(t)){if(typeof Jh!="function")throw Error(U(280));var e=t.stateNode;e&&(e=Mu(e),Jh(t.stateNode,t.type,e))}}function Yv(t){rs?is?is.push(t):is=[t]:rs=t}function Xv(){if(rs){var t=rs,e=is;if(is=rs=null,Ig(t),e)for(t=0;t<e.length;t++)Ig(e[t])}}function Jv(t,e){return t(e)}function Zv(){}var Xc=!1;function eE(t,e,n){if(Xc)return t(e,n);Xc=!0;try{return Jv(t,e,n)}finally{Xc=!1,(rs!==null||is!==null)&&(Zv(),Xv())}}function $o(t,e){var n=t.stateNode;if(n===null)return null;var r=Mu(n);if(r===null)return null;n=r[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(U(231,e,typeof n));return n}var Zh=!1;if(Fn)try{var so={};Object.defineProperty(so,"passive",{get:function(){Zh=!0}}),window.addEventListener("test",so,so),window.removeEventListener("test",so,so)}catch{Zh=!1}function IA(t,e,n,r,i,s,o,l,u){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(d){this.onError(d)}}var Ro=!1,jl=null,Bl=!1,ed=null,SA={onError:function(t){Ro=!0,jl=t}};function AA(t,e,n,r,i,s,o,l,u){Ro=!1,jl=null,IA.apply(SA,arguments)}function RA(t,e,n,r,i,s,o,l,u){if(AA.apply(this,arguments),Ro){if(Ro){var c=jl;Ro=!1,jl=null}else throw Error(U(198));Bl||(Bl=!0,ed=c)}}function Ri(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function tE(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Sg(t){if(Ri(t)!==t)throw Error(U(188))}function CA(t){var e=t.alternate;if(!e){if(e=Ri(t),e===null)throw Error(U(188));return e!==t?null:t}for(var n=t,r=e;;){var i=n.return;if(i===null)break;var s=i.alternate;if(s===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===s.child){for(s=i.child;s;){if(s===n)return Sg(i),t;if(s===r)return Sg(i),e;s=s.sibling}throw Error(U(188))}if(n.return!==r.return)n=i,r=s;else{for(var o=!1,l=i.child;l;){if(l===n){o=!0,n=i,r=s;break}if(l===r){o=!0,r=i,n=s;break}l=l.sibling}if(!o){for(l=s.child;l;){if(l===n){o=!0,n=s,r=i;break}if(l===r){o=!0,r=s,n=i;break}l=l.sibling}if(!o)throw Error(U(189))}}if(n.alternate!==r)throw Error(U(190))}if(n.tag!==3)throw Error(U(188));return n.stateNode.current===n?t:e}function nE(t){return t=CA(t),t!==null?rE(t):null}function rE(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=rE(t);if(e!==null)return e;t=t.sibling}return null}var iE=Ot.unstable_scheduleCallback,Ag=Ot.unstable_cancelCallback,PA=Ot.unstable_shouldYield,kA=Ot.unstable_requestPaint,Oe=Ot.unstable_now,NA=Ot.unstable_getCurrentPriorityLevel,Ef=Ot.unstable_ImmediatePriority,sE=Ot.unstable_UserBlockingPriority,zl=Ot.unstable_NormalPriority,DA=Ot.unstable_LowPriority,oE=Ot.unstable_IdlePriority,Ou=null,fn=null;function xA(t){if(fn&&typeof fn.onCommitFiberRoot=="function")try{fn.onCommitFiberRoot(Ou,t,void 0,(t.current.flags&128)===128)}catch{}}var Zt=Math.clz32?Math.clz32:LA,OA=Math.log,VA=Math.LN2;function LA(t){return t>>>=0,t===0?32:31-(OA(t)/VA|0)|0}var Ka=64,Ga=4194304;function yo(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function $l(t,e){var n=t.pendingLanes;if(n===0)return 0;var r=0,i=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var l=o&~i;l!==0?r=yo(l):(s&=o,s!==0&&(r=yo(s)))}else o=n&~i,o!==0?r=yo(o):s!==0&&(r=yo(s));if(r===0)return 0;if(e!==0&&e!==r&&!(e&i)&&(i=r&-r,s=e&-e,i>=s||i===16&&(s&4194240)!==0))return e;if(r&4&&(r|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=r;0<e;)n=31-Zt(e),i=1<<n,r|=t[n],e&=~i;return r}function bA(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function MA(t,e){for(var n=t.suspendedLanes,r=t.pingedLanes,i=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-Zt(s),l=1<<o,u=i[o];u===-1?(!(l&n)||l&r)&&(i[o]=bA(l,e)):u<=e&&(t.expiredLanes|=l),s&=~l}}function td(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function aE(){var t=Ka;return Ka<<=1,!(Ka&4194240)&&(Ka=64),t}function Jc(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function pa(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-Zt(e),t[e]=n}function FA(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var r=t.eventTimes;for(t=t.expirationTimes;0<n;){var i=31-Zt(n),s=1<<i;e[i]=0,r[i]=-1,t[i]=-1,n&=~s}}function wf(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var r=31-Zt(n),i=1<<r;i&e|t[r]&e&&(t[r]|=e),n&=~i}}var ue=0;function lE(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var uE,Tf,cE,hE,dE,nd=!1,Qa=[],gr=null,yr=null,_r=null,Ho=new Map,qo=new Map,or=[],UA="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Rg(t,e){switch(t){case"focusin":case"focusout":gr=null;break;case"dragenter":case"dragleave":yr=null;break;case"mouseover":case"mouseout":_r=null;break;case"pointerover":case"pointerout":Ho.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":qo.delete(e.pointerId)}}function oo(t,e,n,r,i,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:r,nativeEvent:s,targetContainers:[i]},e!==null&&(e=ga(e),e!==null&&Tf(e)),t):(t.eventSystemFlags|=r,e=t.targetContainers,i!==null&&e.indexOf(i)===-1&&e.push(i),t)}function jA(t,e,n,r,i){switch(e){case"focusin":return gr=oo(gr,t,e,n,r,i),!0;case"dragenter":return yr=oo(yr,t,e,n,r,i),!0;case"mouseover":return _r=oo(_r,t,e,n,r,i),!0;case"pointerover":var s=i.pointerId;return Ho.set(s,oo(Ho.get(s)||null,t,e,n,r,i)),!0;case"gotpointercapture":return s=i.pointerId,qo.set(s,oo(qo.get(s)||null,t,e,n,r,i)),!0}return!1}function fE(t){var e=ni(t.target);if(e!==null){var n=Ri(e);if(n!==null){if(e=n.tag,e===13){if(e=tE(n),e!==null){t.blockedOn=e,dE(t.priority,function(){cE(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function yl(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=rd(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var r=new n.constructor(n.type,n);Xh=r,n.target.dispatchEvent(r),Xh=null}else return e=ga(n),e!==null&&Tf(e),t.blockedOn=n,!1;e.shift()}return!0}function Cg(t,e,n){yl(t)&&n.delete(e)}function BA(){nd=!1,gr!==null&&yl(gr)&&(gr=null),yr!==null&&yl(yr)&&(yr=null),_r!==null&&yl(_r)&&(_r=null),Ho.forEach(Cg),qo.forEach(Cg)}function ao(t,e){t.blockedOn===e&&(t.blockedOn=null,nd||(nd=!0,Ot.unstable_scheduleCallback(Ot.unstable_NormalPriority,BA)))}function Wo(t){function e(i){return ao(i,t)}if(0<Qa.length){ao(Qa[0],t);for(var n=1;n<Qa.length;n++){var r=Qa[n];r.blockedOn===t&&(r.blockedOn=null)}}for(gr!==null&&ao(gr,t),yr!==null&&ao(yr,t),_r!==null&&ao(_r,t),Ho.forEach(e),qo.forEach(e),n=0;n<or.length;n++)r=or[n],r.blockedOn===t&&(r.blockedOn=null);for(;0<or.length&&(n=or[0],n.blockedOn===null);)fE(n),n.blockedOn===null&&or.shift()}var ss=Gn.ReactCurrentBatchConfig,Hl=!0;function zA(t,e,n,r){var i=ue,s=ss.transition;ss.transition=null;try{ue=1,If(t,e,n,r)}finally{ue=i,ss.transition=s}}function $A(t,e,n,r){var i=ue,s=ss.transition;ss.transition=null;try{ue=4,If(t,e,n,r)}finally{ue=i,ss.transition=s}}function If(t,e,n,r){if(Hl){var i=rd(t,e,n,r);if(i===null)lh(t,e,r,ql,n),Rg(t,r);else if(jA(i,t,e,n,r))r.stopPropagation();else if(Rg(t,r),e&4&&-1<UA.indexOf(t)){for(;i!==null;){var s=ga(i);if(s!==null&&uE(s),s=rd(t,e,n,r),s===null&&lh(t,e,r,ql,n),s===i)break;i=s}i!==null&&r.stopPropagation()}else lh(t,e,r,null,n)}}var ql=null;function rd(t,e,n,r){if(ql=null,t=vf(r),t=ni(t),t!==null)if(e=Ri(t),e===null)t=null;else if(n=e.tag,n===13){if(t=tE(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return ql=t,null}function pE(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(NA()){case Ef:return 1;case sE:return 4;case zl:case DA:return 16;case oE:return 536870912;default:return 16}default:return 16}}var fr=null,Sf=null,_l=null;function mE(){if(_l)return _l;var t,e=Sf,n=e.length,r,i="value"in fr?fr.value:fr.textContent,s=i.length;for(t=0;t<n&&e[t]===i[t];t++);var o=n-t;for(r=1;r<=o&&e[n-r]===i[s-r];r++);return _l=i.slice(t,1<r?1-r:void 0)}function vl(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Ya(){return!0}function Pg(){return!1}function Lt(t){function e(n,r,i,s,o){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var l in t)t.hasOwnProperty(l)&&(n=t[l],this[l]=n?n(s):s[l]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?Ya:Pg,this.isPropagationStopped=Pg,this}return Ie(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Ya)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Ya)},persist:function(){},isPersistent:Ya}),e}var ks={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Af=Lt(ks),ma=Ie({},ks,{view:0,detail:0}),HA=Lt(ma),Zc,eh,lo,Vu=Ie({},ma,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Rf,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==lo&&(lo&&t.type==="mousemove"?(Zc=t.screenX-lo.screenX,eh=t.screenY-lo.screenY):eh=Zc=0,lo=t),Zc)},movementY:function(t){return"movementY"in t?t.movementY:eh}}),kg=Lt(Vu),qA=Ie({},Vu,{dataTransfer:0}),WA=Lt(qA),KA=Ie({},ma,{relatedTarget:0}),th=Lt(KA),GA=Ie({},ks,{animationName:0,elapsedTime:0,pseudoElement:0}),QA=Lt(GA),YA=Ie({},ks,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),XA=Lt(YA),JA=Ie({},ks,{data:0}),Ng=Lt(JA),ZA={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},eR={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},tR={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function nR(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=tR[t])?!!e[t]:!1}function Rf(){return nR}var rR=Ie({},ma,{key:function(t){if(t.key){var e=ZA[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=vl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?eR[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Rf,charCode:function(t){return t.type==="keypress"?vl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?vl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),iR=Lt(rR),sR=Ie({},Vu,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Dg=Lt(sR),oR=Ie({},ma,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Rf}),aR=Lt(oR),lR=Ie({},ks,{propertyName:0,elapsedTime:0,pseudoElement:0}),uR=Lt(lR),cR=Ie({},Vu,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),hR=Lt(cR),dR=[9,13,27,32],Cf=Fn&&"CompositionEvent"in window,Co=null;Fn&&"documentMode"in document&&(Co=document.documentMode);var fR=Fn&&"TextEvent"in window&&!Co,gE=Fn&&(!Cf||Co&&8<Co&&11>=Co),xg=" ",Og=!1;function yE(t,e){switch(t){case"keyup":return dR.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function _E(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Hi=!1;function pR(t,e){switch(t){case"compositionend":return _E(e);case"keypress":return e.which!==32?null:(Og=!0,xg);case"textInput":return t=e.data,t===xg&&Og?null:t;default:return null}}function mR(t,e){if(Hi)return t==="compositionend"||!Cf&&yE(t,e)?(t=mE(),_l=Sf=fr=null,Hi=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return gE&&e.locale!=="ko"?null:e.data;default:return null}}var gR={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Vg(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!gR[t.type]:e==="textarea"}function vE(t,e,n,r){Yv(r),e=Wl(e,"onChange"),0<e.length&&(n=new Af("onChange","change",null,n,r),t.push({event:n,listeners:e}))}var Po=null,Ko=null;function yR(t){NE(t,0)}function Lu(t){var e=Ki(t);if($v(e))return t}function _R(t,e){if(t==="change")return e}var EE=!1;if(Fn){var nh;if(Fn){var rh="oninput"in document;if(!rh){var Lg=document.createElement("div");Lg.setAttribute("oninput","return;"),rh=typeof Lg.oninput=="function"}nh=rh}else nh=!1;EE=nh&&(!document.documentMode||9<document.documentMode)}function bg(){Po&&(Po.detachEvent("onpropertychange",wE),Ko=Po=null)}function wE(t){if(t.propertyName==="value"&&Lu(Ko)){var e=[];vE(e,Ko,t,vf(t)),eE(yR,e)}}function vR(t,e,n){t==="focusin"?(bg(),Po=e,Ko=n,Po.attachEvent("onpropertychange",wE)):t==="focusout"&&bg()}function ER(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Lu(Ko)}function wR(t,e){if(t==="click")return Lu(e)}function TR(t,e){if(t==="input"||t==="change")return Lu(e)}function IR(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var tn=typeof Object.is=="function"?Object.is:IR;function Go(t,e){if(tn(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),r=Object.keys(e);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Uh.call(e,i)||!tn(t[i],e[i]))return!1}return!0}function Mg(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Fg(t,e){var n=Mg(t);t=0;for(var r;n;){if(n.nodeType===3){if(r=t+n.textContent.length,t<=e&&r>=e)return{node:n,offset:e-t};t=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Mg(n)}}function TE(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?TE(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function IE(){for(var t=window,e=Ul();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Ul(t.document)}return e}function Pf(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function SR(t){var e=IE(),n=t.focusedElem,r=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&TE(n.ownerDocument.documentElement,n)){if(r!==null&&Pf(n)){if(e=r.start,t=r.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var i=n.textContent.length,s=Math.min(r.start,i);r=r.end===void 0?s:Math.min(r.end,i),!t.extend&&s>r&&(i=r,r=s,s=i),i=Fg(n,s);var o=Fg(n,r);i&&o&&(t.rangeCount!==1||t.anchorNode!==i.node||t.anchorOffset!==i.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(i.node,i.offset),t.removeAllRanges(),s>r?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var AR=Fn&&"documentMode"in document&&11>=document.documentMode,qi=null,id=null,ko=null,sd=!1;function Ug(t,e,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;sd||qi==null||qi!==Ul(r)||(r=qi,"selectionStart"in r&&Pf(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),ko&&Go(ko,r)||(ko=r,r=Wl(id,"onSelect"),0<r.length&&(e=new Af("onSelect","select",null,e,n),t.push({event:e,listeners:r}),e.target=qi)))}function Xa(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Wi={animationend:Xa("Animation","AnimationEnd"),animationiteration:Xa("Animation","AnimationIteration"),animationstart:Xa("Animation","AnimationStart"),transitionend:Xa("Transition","TransitionEnd")},ih={},SE={};Fn&&(SE=document.createElement("div").style,"AnimationEvent"in window||(delete Wi.animationend.animation,delete Wi.animationiteration.animation,delete Wi.animationstart.animation),"TransitionEvent"in window||delete Wi.transitionend.transition);function bu(t){if(ih[t])return ih[t];if(!Wi[t])return t;var e=Wi[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in SE)return ih[t]=e[n];return t}var AE=bu("animationend"),RE=bu("animationiteration"),CE=bu("animationstart"),PE=bu("transitionend"),kE=new Map,jg="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function br(t,e){kE.set(t,e),Ai(e,[t])}for(var sh=0;sh<jg.length;sh++){var oh=jg[sh],RR=oh.toLowerCase(),CR=oh[0].toUpperCase()+oh.slice(1);br(RR,"on"+CR)}br(AE,"onAnimationEnd");br(RE,"onAnimationIteration");br(CE,"onAnimationStart");br("dblclick","onDoubleClick");br("focusin","onFocus");br("focusout","onBlur");br(PE,"onTransitionEnd");fs("onMouseEnter",["mouseout","mouseover"]);fs("onMouseLeave",["mouseout","mouseover"]);fs("onPointerEnter",["pointerout","pointerover"]);fs("onPointerLeave",["pointerout","pointerover"]);Ai("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Ai("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Ai("onBeforeInput",["compositionend","keypress","textInput","paste"]);Ai("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Ai("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Ai("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var _o="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),PR=new Set("cancel close invalid load scroll toggle".split(" ").concat(_o));function Bg(t,e,n){var r=t.type||"unknown-event";t.currentTarget=n,RA(r,e,void 0,t),t.currentTarget=null}function NE(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var r=t[n],i=r.event;r=r.listeners;e:{var s=void 0;if(e)for(var o=r.length-1;0<=o;o--){var l=r[o],u=l.instance,c=l.currentTarget;if(l=l.listener,u!==s&&i.isPropagationStopped())break e;Bg(i,l,c),s=u}else for(o=0;o<r.length;o++){if(l=r[o],u=l.instance,c=l.currentTarget,l=l.listener,u!==s&&i.isPropagationStopped())break e;Bg(i,l,c),s=u}}}if(Bl)throw t=ed,Bl=!1,ed=null,t}function me(t,e){var n=e[cd];n===void 0&&(n=e[cd]=new Set);var r=t+"__bubble";n.has(r)||(DE(e,t,2,!1),n.add(r))}function ah(t,e,n){var r=0;e&&(r|=4),DE(n,t,r,e)}var Ja="_reactListening"+Math.random().toString(36).slice(2);function Qo(t){if(!t[Ja]){t[Ja]=!0,Fv.forEach(function(n){n!=="selectionchange"&&(PR.has(n)||ah(n,!1,t),ah(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Ja]||(e[Ja]=!0,ah("selectionchange",!1,e))}}function DE(t,e,n,r){switch(pE(e)){case 1:var i=zA;break;case 4:i=$A;break;default:i=If}n=i.bind(null,e,n,t),i=void 0,!Zh||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(i=!0),r?i!==void 0?t.addEventListener(e,n,{capture:!0,passive:i}):t.addEventListener(e,n,!0):i!==void 0?t.addEventListener(e,n,{passive:i}):t.addEventListener(e,n,!1)}function lh(t,e,n,r,i){var s=r;if(!(e&1)&&!(e&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var l=r.stateNode.containerInfo;if(l===i||l.nodeType===8&&l.parentNode===i)break;if(o===4)for(o=r.return;o!==null;){var u=o.tag;if((u===3||u===4)&&(u=o.stateNode.containerInfo,u===i||u.nodeType===8&&u.parentNode===i))return;o=o.return}for(;l!==null;){if(o=ni(l),o===null)return;if(u=o.tag,u===5||u===6){r=s=o;continue e}l=l.parentNode}}r=r.return}eE(function(){var c=s,d=vf(n),p=[];e:{var m=kE.get(t);if(m!==void 0){var T=Af,C=t;switch(t){case"keypress":if(vl(n)===0)break e;case"keydown":case"keyup":T=iR;break;case"focusin":C="focus",T=th;break;case"focusout":C="blur",T=th;break;case"beforeblur":case"afterblur":T=th;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":T=kg;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":T=WA;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":T=aR;break;case AE:case RE:case CE:T=QA;break;case PE:T=uR;break;case"scroll":T=HA;break;case"wheel":T=hR;break;case"copy":case"cut":case"paste":T=XA;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":T=Dg}var P=(e&4)!==0,D=!P&&t==="scroll",v=P?m!==null?m+"Capture":null:m;P=[];for(var _=c,I;_!==null;){I=_;var x=I.stateNode;if(I.tag===5&&x!==null&&(I=x,v!==null&&(x=$o(_,v),x!=null&&P.push(Yo(_,x,I)))),D)break;_=_.return}0<P.length&&(m=new T(m,C,null,n,d),p.push({event:m,listeners:P}))}}if(!(e&7)){e:{if(m=t==="mouseover"||t==="pointerover",T=t==="mouseout"||t==="pointerout",m&&n!==Xh&&(C=n.relatedTarget||n.fromElement)&&(ni(C)||C[Un]))break e;if((T||m)&&(m=d.window===d?d:(m=d.ownerDocument)?m.defaultView||m.parentWindow:window,T?(C=n.relatedTarget||n.toElement,T=c,C=C?ni(C):null,C!==null&&(D=Ri(C),C!==D||C.tag!==5&&C.tag!==6)&&(C=null)):(T=null,C=c),T!==C)){if(P=kg,x="onMouseLeave",v="onMouseEnter",_="mouse",(t==="pointerout"||t==="pointerover")&&(P=Dg,x="onPointerLeave",v="onPointerEnter",_="pointer"),D=T==null?m:Ki(T),I=C==null?m:Ki(C),m=new P(x,_+"leave",T,n,d),m.target=D,m.relatedTarget=I,x=null,ni(d)===c&&(P=new P(v,_+"enter",C,n,d),P.target=I,P.relatedTarget=D,x=P),D=x,T&&C)t:{for(P=T,v=C,_=0,I=P;I;I=bi(I))_++;for(I=0,x=v;x;x=bi(x))I++;for(;0<_-I;)P=bi(P),_--;for(;0<I-_;)v=bi(v),I--;for(;_--;){if(P===v||v!==null&&P===v.alternate)break t;P=bi(P),v=bi(v)}P=null}else P=null;T!==null&&zg(p,m,T,P,!1),C!==null&&D!==null&&zg(p,D,C,P,!0)}}e:{if(m=c?Ki(c):window,T=m.nodeName&&m.nodeName.toLowerCase(),T==="select"||T==="input"&&m.type==="file")var F=_R;else if(Vg(m))if(EE)F=TR;else{F=ER;var j=vR}else(T=m.nodeName)&&T.toLowerCase()==="input"&&(m.type==="checkbox"||m.type==="radio")&&(F=wR);if(F&&(F=F(t,c))){vE(p,F,n,d);break e}j&&j(t,m,c),t==="focusout"&&(j=m._wrapperState)&&j.controlled&&m.type==="number"&&Wh(m,"number",m.value)}switch(j=c?Ki(c):window,t){case"focusin":(Vg(j)||j.contentEditable==="true")&&(qi=j,id=c,ko=null);break;case"focusout":ko=id=qi=null;break;case"mousedown":sd=!0;break;case"contextmenu":case"mouseup":case"dragend":sd=!1,Ug(p,n,d);break;case"selectionchange":if(AR)break;case"keydown":case"keyup":Ug(p,n,d)}var E;if(Cf)e:{switch(t){case"compositionstart":var y="onCompositionStart";break e;case"compositionend":y="onCompositionEnd";break e;case"compositionupdate":y="onCompositionUpdate";break e}y=void 0}else Hi?yE(t,n)&&(y="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(y="onCompositionStart");y&&(gE&&n.locale!=="ko"&&(Hi||y!=="onCompositionStart"?y==="onCompositionEnd"&&Hi&&(E=mE()):(fr=d,Sf="value"in fr?fr.value:fr.textContent,Hi=!0)),j=Wl(c,y),0<j.length&&(y=new Ng(y,t,null,n,d),p.push({event:y,listeners:j}),E?y.data=E:(E=_E(n),E!==null&&(y.data=E)))),(E=fR?pR(t,n):mR(t,n))&&(c=Wl(c,"onBeforeInput"),0<c.length&&(d=new Ng("onBeforeInput","beforeinput",null,n,d),p.push({event:d,listeners:c}),d.data=E))}NE(p,e)})}function Yo(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Wl(t,e){for(var n=e+"Capture",r=[];t!==null;){var i=t,s=i.stateNode;i.tag===5&&s!==null&&(i=s,s=$o(t,n),s!=null&&r.unshift(Yo(t,s,i)),s=$o(t,e),s!=null&&r.push(Yo(t,s,i))),t=t.return}return r}function bi(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function zg(t,e,n,r,i){for(var s=e._reactName,o=[];n!==null&&n!==r;){var l=n,u=l.alternate,c=l.stateNode;if(u!==null&&u===r)break;l.tag===5&&c!==null&&(l=c,i?(u=$o(n,s),u!=null&&o.unshift(Yo(n,u,l))):i||(u=$o(n,s),u!=null&&o.push(Yo(n,u,l)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var kR=/\r\n?/g,NR=/\u0000|\uFFFD/g;function $g(t){return(typeof t=="string"?t:""+t).replace(kR,`
`).replace(NR,"")}function Za(t,e,n){if(e=$g(e),$g(t)!==e&&n)throw Error(U(425))}function Kl(){}var od=null,ad=null;function ld(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var ud=typeof setTimeout=="function"?setTimeout:void 0,DR=typeof clearTimeout=="function"?clearTimeout:void 0,Hg=typeof Promise=="function"?Promise:void 0,xR=typeof queueMicrotask=="function"?queueMicrotask:typeof Hg<"u"?function(t){return Hg.resolve(null).then(t).catch(OR)}:ud;function OR(t){setTimeout(function(){throw t})}function uh(t,e){var n=e,r=0;do{var i=n.nextSibling;if(t.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){t.removeChild(i),Wo(e);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);Wo(e)}function vr(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function qg(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var Ns=Math.random().toString(36).slice(2),hn="__reactFiber$"+Ns,Xo="__reactProps$"+Ns,Un="__reactContainer$"+Ns,cd="__reactEvents$"+Ns,VR="__reactListeners$"+Ns,LR="__reactHandles$"+Ns;function ni(t){var e=t[hn];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Un]||n[hn]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=qg(t);t!==null;){if(n=t[hn])return n;t=qg(t)}return e}t=n,n=t.parentNode}return null}function ga(t){return t=t[hn]||t[Un],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function Ki(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(U(33))}function Mu(t){return t[Xo]||null}var hd=[],Gi=-1;function Mr(t){return{current:t}}function ye(t){0>Gi||(t.current=hd[Gi],hd[Gi]=null,Gi--)}function fe(t,e){Gi++,hd[Gi]=t.current,t.current=e}var kr={},ot=Mr(kr),Et=Mr(!1),di=kr;function ps(t,e){var n=t.type.contextTypes;if(!n)return kr;var r=t.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===e)return r.__reactInternalMemoizedMaskedChildContext;var i={},s;for(s in n)i[s]=e[s];return r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=i),i}function wt(t){return t=t.childContextTypes,t!=null}function Gl(){ye(Et),ye(ot)}function Wg(t,e,n){if(ot.current!==kr)throw Error(U(168));fe(ot,e),fe(Et,n)}function xE(t,e,n){var r=t.stateNode;if(e=e.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in e))throw Error(U(108,vA(t)||"Unknown",i));return Ie({},n,r)}function Ql(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||kr,di=ot.current,fe(ot,t),fe(Et,Et.current),!0}function Kg(t,e,n){var r=t.stateNode;if(!r)throw Error(U(169));n?(t=xE(t,e,di),r.__reactInternalMemoizedMergedChildContext=t,ye(Et),ye(ot),fe(ot,t)):ye(Et),fe(Et,n)}var kn=null,Fu=!1,ch=!1;function OE(t){kn===null?kn=[t]:kn.push(t)}function bR(t){Fu=!0,OE(t)}function Fr(){if(!ch&&kn!==null){ch=!0;var t=0,e=ue;try{var n=kn;for(ue=1;t<n.length;t++){var r=n[t];do r=r(!0);while(r!==null)}kn=null,Fu=!1}catch(i){throw kn!==null&&(kn=kn.slice(t+1)),iE(Ef,Fr),i}finally{ue=e,ch=!1}}return null}var Qi=[],Yi=0,Yl=null,Xl=0,Mt=[],Ft=0,fi=null,Nn=1,Dn="";function Zr(t,e){Qi[Yi++]=Xl,Qi[Yi++]=Yl,Yl=t,Xl=e}function VE(t,e,n){Mt[Ft++]=Nn,Mt[Ft++]=Dn,Mt[Ft++]=fi,fi=t;var r=Nn;t=Dn;var i=32-Zt(r)-1;r&=~(1<<i),n+=1;var s=32-Zt(e)+i;if(30<s){var o=i-i%5;s=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Nn=1<<32-Zt(e)+i|n<<i|r,Dn=s+t}else Nn=1<<s|n<<i|r,Dn=t}function kf(t){t.return!==null&&(Zr(t,1),VE(t,1,0))}function Nf(t){for(;t===Yl;)Yl=Qi[--Yi],Qi[Yi]=null,Xl=Qi[--Yi],Qi[Yi]=null;for(;t===fi;)fi=Mt[--Ft],Mt[Ft]=null,Dn=Mt[--Ft],Mt[Ft]=null,Nn=Mt[--Ft],Mt[Ft]=null}var Dt=null,Pt=null,ve=!1,Xt=null;function LE(t,e){var n=jt(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function Gg(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,Dt=t,Pt=vr(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,Dt=t,Pt=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=fi!==null?{id:Nn,overflow:Dn}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=jt(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,Dt=t,Pt=null,!0):!1;default:return!1}}function dd(t){return(t.mode&1)!==0&&(t.flags&128)===0}function fd(t){if(ve){var e=Pt;if(e){var n=e;if(!Gg(t,e)){if(dd(t))throw Error(U(418));e=vr(n.nextSibling);var r=Dt;e&&Gg(t,e)?LE(r,n):(t.flags=t.flags&-4097|2,ve=!1,Dt=t)}}else{if(dd(t))throw Error(U(418));t.flags=t.flags&-4097|2,ve=!1,Dt=t}}}function Qg(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Dt=t}function el(t){if(t!==Dt)return!1;if(!ve)return Qg(t),ve=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!ld(t.type,t.memoizedProps)),e&&(e=Pt)){if(dd(t))throw bE(),Error(U(418));for(;e;)LE(t,e),e=vr(e.nextSibling)}if(Qg(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(U(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){Pt=vr(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}Pt=null}}else Pt=Dt?vr(t.stateNode.nextSibling):null;return!0}function bE(){for(var t=Pt;t;)t=vr(t.nextSibling)}function ms(){Pt=Dt=null,ve=!1}function Df(t){Xt===null?Xt=[t]:Xt.push(t)}var MR=Gn.ReactCurrentBatchConfig;function uo(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(U(309));var r=n.stateNode}if(!r)throw Error(U(147,t));var i=r,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var l=i.refs;o===null?delete l[s]:l[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error(U(284));if(!n._owner)throw Error(U(290,t))}return t}function tl(t,e){throw t=Object.prototype.toString.call(e),Error(U(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function Yg(t){var e=t._init;return e(t._payload)}function ME(t){function e(v,_){if(t){var I=v.deletions;I===null?(v.deletions=[_],v.flags|=16):I.push(_)}}function n(v,_){if(!t)return null;for(;_!==null;)e(v,_),_=_.sibling;return null}function r(v,_){for(v=new Map;_!==null;)_.key!==null?v.set(_.key,_):v.set(_.index,_),_=_.sibling;return v}function i(v,_){return v=Ir(v,_),v.index=0,v.sibling=null,v}function s(v,_,I){return v.index=I,t?(I=v.alternate,I!==null?(I=I.index,I<_?(v.flags|=2,_):I):(v.flags|=2,_)):(v.flags|=1048576,_)}function o(v){return t&&v.alternate===null&&(v.flags|=2),v}function l(v,_,I,x){return _===null||_.tag!==6?(_=yh(I,v.mode,x),_.return=v,_):(_=i(_,I),_.return=v,_)}function u(v,_,I,x){var F=I.type;return F===$i?d(v,_,I.props.children,x,I.key):_!==null&&(_.elementType===F||typeof F=="object"&&F!==null&&F.$$typeof===ir&&Yg(F)===_.type)?(x=i(_,I.props),x.ref=uo(v,_,I),x.return=v,x):(x=Rl(I.type,I.key,I.props,null,v.mode,x),x.ref=uo(v,_,I),x.return=v,x)}function c(v,_,I,x){return _===null||_.tag!==4||_.stateNode.containerInfo!==I.containerInfo||_.stateNode.implementation!==I.implementation?(_=_h(I,v.mode,x),_.return=v,_):(_=i(_,I.children||[]),_.return=v,_)}function d(v,_,I,x,F){return _===null||_.tag!==7?(_=li(I,v.mode,x,F),_.return=v,_):(_=i(_,I),_.return=v,_)}function p(v,_,I){if(typeof _=="string"&&_!==""||typeof _=="number")return _=yh(""+_,v.mode,I),_.return=v,_;if(typeof _=="object"&&_!==null){switch(_.$$typeof){case Ha:return I=Rl(_.type,_.key,_.props,null,v.mode,I),I.ref=uo(v,null,_),I.return=v,I;case zi:return _=_h(_,v.mode,I),_.return=v,_;case ir:var x=_._init;return p(v,x(_._payload),I)}if(go(_)||io(_))return _=li(_,v.mode,I,null),_.return=v,_;tl(v,_)}return null}function m(v,_,I,x){var F=_!==null?_.key:null;if(typeof I=="string"&&I!==""||typeof I=="number")return F!==null?null:l(v,_,""+I,x);if(typeof I=="object"&&I!==null){switch(I.$$typeof){case Ha:return I.key===F?u(v,_,I,x):null;case zi:return I.key===F?c(v,_,I,x):null;case ir:return F=I._init,m(v,_,F(I._payload),x)}if(go(I)||io(I))return F!==null?null:d(v,_,I,x,null);tl(v,I)}return null}function T(v,_,I,x,F){if(typeof x=="string"&&x!==""||typeof x=="number")return v=v.get(I)||null,l(_,v,""+x,F);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case Ha:return v=v.get(x.key===null?I:x.key)||null,u(_,v,x,F);case zi:return v=v.get(x.key===null?I:x.key)||null,c(_,v,x,F);case ir:var j=x._init;return T(v,_,I,j(x._payload),F)}if(go(x)||io(x))return v=v.get(I)||null,d(_,v,x,F,null);tl(_,x)}return null}function C(v,_,I,x){for(var F=null,j=null,E=_,y=_=0,w=null;E!==null&&y<I.length;y++){E.index>y?(w=E,E=null):w=E.sibling;var A=m(v,E,I[y],x);if(A===null){E===null&&(E=w);break}t&&E&&A.alternate===null&&e(v,E),_=s(A,_,y),j===null?F=A:j.sibling=A,j=A,E=w}if(y===I.length)return n(v,E),ve&&Zr(v,y),F;if(E===null){for(;y<I.length;y++)E=p(v,I[y],x),E!==null&&(_=s(E,_,y),j===null?F=E:j.sibling=E,j=E);return ve&&Zr(v,y),F}for(E=r(v,E);y<I.length;y++)w=T(E,v,y,I[y],x),w!==null&&(t&&w.alternate!==null&&E.delete(w.key===null?y:w.key),_=s(w,_,y),j===null?F=w:j.sibling=w,j=w);return t&&E.forEach(function(R){return e(v,R)}),ve&&Zr(v,y),F}function P(v,_,I,x){var F=io(I);if(typeof F!="function")throw Error(U(150));if(I=F.call(I),I==null)throw Error(U(151));for(var j=F=null,E=_,y=_=0,w=null,A=I.next();E!==null&&!A.done;y++,A=I.next()){E.index>y?(w=E,E=null):w=E.sibling;var R=m(v,E,A.value,x);if(R===null){E===null&&(E=w);break}t&&E&&R.alternate===null&&e(v,E),_=s(R,_,y),j===null?F=R:j.sibling=R,j=R,E=w}if(A.done)return n(v,E),ve&&Zr(v,y),F;if(E===null){for(;!A.done;y++,A=I.next())A=p(v,A.value,x),A!==null&&(_=s(A,_,y),j===null?F=A:j.sibling=A,j=A);return ve&&Zr(v,y),F}for(E=r(v,E);!A.done;y++,A=I.next())A=T(E,v,y,A.value,x),A!==null&&(t&&A.alternate!==null&&E.delete(A.key===null?y:A.key),_=s(A,_,y),j===null?F=A:j.sibling=A,j=A);return t&&E.forEach(function(k){return e(v,k)}),ve&&Zr(v,y),F}function D(v,_,I,x){if(typeof I=="object"&&I!==null&&I.type===$i&&I.key===null&&(I=I.props.children),typeof I=="object"&&I!==null){switch(I.$$typeof){case Ha:e:{for(var F=I.key,j=_;j!==null;){if(j.key===F){if(F=I.type,F===$i){if(j.tag===7){n(v,j.sibling),_=i(j,I.props.children),_.return=v,v=_;break e}}else if(j.elementType===F||typeof F=="object"&&F!==null&&F.$$typeof===ir&&Yg(F)===j.type){n(v,j.sibling),_=i(j,I.props),_.ref=uo(v,j,I),_.return=v,v=_;break e}n(v,j);break}else e(v,j);j=j.sibling}I.type===$i?(_=li(I.props.children,v.mode,x,I.key),_.return=v,v=_):(x=Rl(I.type,I.key,I.props,null,v.mode,x),x.ref=uo(v,_,I),x.return=v,v=x)}return o(v);case zi:e:{for(j=I.key;_!==null;){if(_.key===j)if(_.tag===4&&_.stateNode.containerInfo===I.containerInfo&&_.stateNode.implementation===I.implementation){n(v,_.sibling),_=i(_,I.children||[]),_.return=v,v=_;break e}else{n(v,_);break}else e(v,_);_=_.sibling}_=_h(I,v.mode,x),_.return=v,v=_}return o(v);case ir:return j=I._init,D(v,_,j(I._payload),x)}if(go(I))return C(v,_,I,x);if(io(I))return P(v,_,I,x);tl(v,I)}return typeof I=="string"&&I!==""||typeof I=="number"?(I=""+I,_!==null&&_.tag===6?(n(v,_.sibling),_=i(_,I),_.return=v,v=_):(n(v,_),_=yh(I,v.mode,x),_.return=v,v=_),o(v)):n(v,_)}return D}var gs=ME(!0),FE=ME(!1),Jl=Mr(null),Zl=null,Xi=null,xf=null;function Of(){xf=Xi=Zl=null}function Vf(t){var e=Jl.current;ye(Jl),t._currentValue=e}function pd(t,e,n){for(;t!==null;){var r=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,r!==null&&(r.childLanes|=e)):r!==null&&(r.childLanes&e)!==e&&(r.childLanes|=e),t===n)break;t=t.return}}function os(t,e){Zl=t,xf=Xi=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(vt=!0),t.firstContext=null)}function $t(t){var e=t._currentValue;if(xf!==t)if(t={context:t,memoizedValue:e,next:null},Xi===null){if(Zl===null)throw Error(U(308));Xi=t,Zl.dependencies={lanes:0,firstContext:t}}else Xi=Xi.next=t;return e}var ri=null;function Lf(t){ri===null?ri=[t]:ri.push(t)}function UE(t,e,n,r){var i=e.interleaved;return i===null?(n.next=n,Lf(e)):(n.next=i.next,i.next=n),e.interleaved=n,jn(t,r)}function jn(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var sr=!1;function bf(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function jE(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Vn(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function Er(t,e,n){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,se&2){var i=r.pending;return i===null?e.next=e:(e.next=i.next,i.next=e),r.pending=e,jn(t,n)}return i=r.interleaved,i===null?(e.next=e,Lf(r)):(e.next=i.next,i.next=e),r.interleaved=e,jn(t,n)}function El(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,wf(t,n)}}function Xg(t,e){var n=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?i=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?i=s=e:s=s.next=e}else i=s=e;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:s,shared:r.shared,effects:r.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function eu(t,e,n,r){var i=t.updateQueue;sr=!1;var s=i.firstBaseUpdate,o=i.lastBaseUpdate,l=i.shared.pending;if(l!==null){i.shared.pending=null;var u=l,c=u.next;u.next=null,o===null?s=c:o.next=c,o=u;var d=t.alternate;d!==null&&(d=d.updateQueue,l=d.lastBaseUpdate,l!==o&&(l===null?d.firstBaseUpdate=c:l.next=c,d.lastBaseUpdate=u))}if(s!==null){var p=i.baseState;o=0,d=c=u=null,l=s;do{var m=l.lane,T=l.eventTime;if((r&m)===m){d!==null&&(d=d.next={eventTime:T,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var C=t,P=l;switch(m=e,T=n,P.tag){case 1:if(C=P.payload,typeof C=="function"){p=C.call(T,p,m);break e}p=C;break e;case 3:C.flags=C.flags&-65537|128;case 0:if(C=P.payload,m=typeof C=="function"?C.call(T,p,m):C,m==null)break e;p=Ie({},p,m);break e;case 2:sr=!0}}l.callback!==null&&l.lane!==0&&(t.flags|=64,m=i.effects,m===null?i.effects=[l]:m.push(l))}else T={eventTime:T,lane:m,tag:l.tag,payload:l.payload,callback:l.callback,next:null},d===null?(c=d=T,u=p):d=d.next=T,o|=m;if(l=l.next,l===null){if(l=i.shared.pending,l===null)break;m=l,l=m.next,m.next=null,i.lastBaseUpdate=m,i.shared.pending=null}}while(!0);if(d===null&&(u=p),i.baseState=u,i.firstBaseUpdate=c,i.lastBaseUpdate=d,e=i.shared.interleaved,e!==null){i=e;do o|=i.lane,i=i.next;while(i!==e)}else s===null&&(i.shared.lanes=0);mi|=o,t.lanes=o,t.memoizedState=p}}function Jg(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var r=t[e],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(U(191,i));i.call(r)}}}var ya={},pn=Mr(ya),Jo=Mr(ya),Zo=Mr(ya);function ii(t){if(t===ya)throw Error(U(174));return t}function Mf(t,e){switch(fe(Zo,e),fe(Jo,t),fe(pn,ya),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Gh(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Gh(e,t)}ye(pn),fe(pn,e)}function ys(){ye(pn),ye(Jo),ye(Zo)}function BE(t){ii(Zo.current);var e=ii(pn.current),n=Gh(e,t.type);e!==n&&(fe(Jo,t),fe(pn,n))}function Ff(t){Jo.current===t&&(ye(pn),ye(Jo))}var Ee=Mr(0);function tu(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var hh=[];function Uf(){for(var t=0;t<hh.length;t++)hh[t]._workInProgressVersionPrimary=null;hh.length=0}var wl=Gn.ReactCurrentDispatcher,dh=Gn.ReactCurrentBatchConfig,pi=0,we=null,Ue=null,He=null,nu=!1,No=!1,ea=0,FR=0;function et(){throw Error(U(321))}function jf(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!tn(t[n],e[n]))return!1;return!0}function Bf(t,e,n,r,i,s){if(pi=s,we=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,wl.current=t===null||t.memoizedState===null?zR:$R,t=n(r,i),No){s=0;do{if(No=!1,ea=0,25<=s)throw Error(U(301));s+=1,He=Ue=null,e.updateQueue=null,wl.current=HR,t=n(r,i)}while(No)}if(wl.current=ru,e=Ue!==null&&Ue.next!==null,pi=0,He=Ue=we=null,nu=!1,e)throw Error(U(300));return t}function zf(){var t=ea!==0;return ea=0,t}function un(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return He===null?we.memoizedState=He=t:He=He.next=t,He}function Ht(){if(Ue===null){var t=we.alternate;t=t!==null?t.memoizedState:null}else t=Ue.next;var e=He===null?we.memoizedState:He.next;if(e!==null)He=e,Ue=t;else{if(t===null)throw Error(U(310));Ue=t,t={memoizedState:Ue.memoizedState,baseState:Ue.baseState,baseQueue:Ue.baseQueue,queue:Ue.queue,next:null},He===null?we.memoizedState=He=t:He=He.next=t}return He}function ta(t,e){return typeof e=="function"?e(t):e}function fh(t){var e=Ht(),n=e.queue;if(n===null)throw Error(U(311));n.lastRenderedReducer=t;var r=Ue,i=r.baseQueue,s=n.pending;if(s!==null){if(i!==null){var o=i.next;i.next=s.next,s.next=o}r.baseQueue=i=s,n.pending=null}if(i!==null){s=i.next,r=r.baseState;var l=o=null,u=null,c=s;do{var d=c.lane;if((pi&d)===d)u!==null&&(u=u.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:t(r,c.action);else{var p={lane:d,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};u===null?(l=u=p,o=r):u=u.next=p,we.lanes|=d,mi|=d}c=c.next}while(c!==null&&c!==s);u===null?o=r:u.next=l,tn(r,e.memoizedState)||(vt=!0),e.memoizedState=r,e.baseState=o,e.baseQueue=u,n.lastRenderedState=r}if(t=n.interleaved,t!==null){i=t;do s=i.lane,we.lanes|=s,mi|=s,i=i.next;while(i!==t)}else i===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function ph(t){var e=Ht(),n=e.queue;if(n===null)throw Error(U(311));n.lastRenderedReducer=t;var r=n.dispatch,i=n.pending,s=e.memoizedState;if(i!==null){n.pending=null;var o=i=i.next;do s=t(s,o.action),o=o.next;while(o!==i);tn(s,e.memoizedState)||(vt=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,r]}function zE(){}function $E(t,e){var n=we,r=Ht(),i=e(),s=!tn(r.memoizedState,i);if(s&&(r.memoizedState=i,vt=!0),r=r.queue,$f(WE.bind(null,n,r,t),[t]),r.getSnapshot!==e||s||He!==null&&He.memoizedState.tag&1){if(n.flags|=2048,na(9,qE.bind(null,n,r,i,e),void 0,null),qe===null)throw Error(U(349));pi&30||HE(n,e,i)}return i}function HE(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=we.updateQueue,e===null?(e={lastEffect:null,stores:null},we.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function qE(t,e,n,r){e.value=n,e.getSnapshot=r,KE(e)&&GE(t)}function WE(t,e,n){return n(function(){KE(e)&&GE(t)})}function KE(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!tn(t,n)}catch{return!0}}function GE(t){var e=jn(t,1);e!==null&&en(e,t,1,-1)}function Zg(t){var e=un();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ta,lastRenderedState:t},e.queue=t,t=t.dispatch=BR.bind(null,we,t),[e.memoizedState,t]}function na(t,e,n,r){return t={tag:t,create:e,destroy:n,deps:r,next:null},e=we.updateQueue,e===null?(e={lastEffect:null,stores:null},we.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(r=n.next,n.next=t,t.next=r,e.lastEffect=t)),t}function QE(){return Ht().memoizedState}function Tl(t,e,n,r){var i=un();we.flags|=t,i.memoizedState=na(1|e,n,void 0,r===void 0?null:r)}function Uu(t,e,n,r){var i=Ht();r=r===void 0?null:r;var s=void 0;if(Ue!==null){var o=Ue.memoizedState;if(s=o.destroy,r!==null&&jf(r,o.deps)){i.memoizedState=na(e,n,s,r);return}}we.flags|=t,i.memoizedState=na(1|e,n,s,r)}function ey(t,e){return Tl(8390656,8,t,e)}function $f(t,e){return Uu(2048,8,t,e)}function YE(t,e){return Uu(4,2,t,e)}function XE(t,e){return Uu(4,4,t,e)}function JE(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function ZE(t,e,n){return n=n!=null?n.concat([t]):null,Uu(4,4,JE.bind(null,e,t),n)}function Hf(){}function ew(t,e){var n=Ht();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&jf(e,r[1])?r[0]:(n.memoizedState=[t,e],t)}function tw(t,e){var n=Ht();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&jf(e,r[1])?r[0]:(t=t(),n.memoizedState=[t,e],t)}function nw(t,e,n){return pi&21?(tn(n,e)||(n=aE(),we.lanes|=n,mi|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,vt=!0),t.memoizedState=n)}function UR(t,e){var n=ue;ue=n!==0&&4>n?n:4,t(!0);var r=dh.transition;dh.transition={};try{t(!1),e()}finally{ue=n,dh.transition=r}}function rw(){return Ht().memoizedState}function jR(t,e,n){var r=Tr(t);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},iw(t))sw(e,n);else if(n=UE(t,e,n,r),n!==null){var i=dt();en(n,t,r,i),ow(n,e,r)}}function BR(t,e,n){var r=Tr(t),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(iw(t))sw(e,i);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,l=s(o,n);if(i.hasEagerState=!0,i.eagerState=l,tn(l,o)){var u=e.interleaved;u===null?(i.next=i,Lf(e)):(i.next=u.next,u.next=i),e.interleaved=i;return}}catch{}finally{}n=UE(t,e,i,r),n!==null&&(i=dt(),en(n,t,r,i),ow(n,e,r))}}function iw(t){var e=t.alternate;return t===we||e!==null&&e===we}function sw(t,e){No=nu=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function ow(t,e,n){if(n&4194240){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,wf(t,n)}}var ru={readContext:$t,useCallback:et,useContext:et,useEffect:et,useImperativeHandle:et,useInsertionEffect:et,useLayoutEffect:et,useMemo:et,useReducer:et,useRef:et,useState:et,useDebugValue:et,useDeferredValue:et,useTransition:et,useMutableSource:et,useSyncExternalStore:et,useId:et,unstable_isNewReconciler:!1},zR={readContext:$t,useCallback:function(t,e){return un().memoizedState=[t,e===void 0?null:e],t},useContext:$t,useEffect:ey,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,Tl(4194308,4,JE.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Tl(4194308,4,t,e)},useInsertionEffect:function(t,e){return Tl(4,2,t,e)},useMemo:function(t,e){var n=un();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var r=un();return e=n!==void 0?n(e):e,r.memoizedState=r.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},r.queue=t,t=t.dispatch=jR.bind(null,we,t),[r.memoizedState,t]},useRef:function(t){var e=un();return t={current:t},e.memoizedState=t},useState:Zg,useDebugValue:Hf,useDeferredValue:function(t){return un().memoizedState=t},useTransition:function(){var t=Zg(!1),e=t[0];return t=UR.bind(null,t[1]),un().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var r=we,i=un();if(ve){if(n===void 0)throw Error(U(407));n=n()}else{if(n=e(),qe===null)throw Error(U(349));pi&30||HE(r,e,n)}i.memoizedState=n;var s={value:n,getSnapshot:e};return i.queue=s,ey(WE.bind(null,r,s,t),[t]),r.flags|=2048,na(9,qE.bind(null,r,s,n,e),void 0,null),n},useId:function(){var t=un(),e=qe.identifierPrefix;if(ve){var n=Dn,r=Nn;n=(r&~(1<<32-Zt(r)-1)).toString(32)+n,e=":"+e+"R"+n,n=ea++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=FR++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},$R={readContext:$t,useCallback:ew,useContext:$t,useEffect:$f,useImperativeHandle:ZE,useInsertionEffect:YE,useLayoutEffect:XE,useMemo:tw,useReducer:fh,useRef:QE,useState:function(){return fh(ta)},useDebugValue:Hf,useDeferredValue:function(t){var e=Ht();return nw(e,Ue.memoizedState,t)},useTransition:function(){var t=fh(ta)[0],e=Ht().memoizedState;return[t,e]},useMutableSource:zE,useSyncExternalStore:$E,useId:rw,unstable_isNewReconciler:!1},HR={readContext:$t,useCallback:ew,useContext:$t,useEffect:$f,useImperativeHandle:ZE,useInsertionEffect:YE,useLayoutEffect:XE,useMemo:tw,useReducer:ph,useRef:QE,useState:function(){return ph(ta)},useDebugValue:Hf,useDeferredValue:function(t){var e=Ht();return Ue===null?e.memoizedState=t:nw(e,Ue.memoizedState,t)},useTransition:function(){var t=ph(ta)[0],e=Ht().memoizedState;return[t,e]},useMutableSource:zE,useSyncExternalStore:$E,useId:rw,unstable_isNewReconciler:!1};function Qt(t,e){if(t&&t.defaultProps){e=Ie({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function md(t,e,n,r){e=t.memoizedState,n=n(r,e),n=n==null?e:Ie({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var ju={isMounted:function(t){return(t=t._reactInternals)?Ri(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var r=dt(),i=Tr(t),s=Vn(r,i);s.payload=e,n!=null&&(s.callback=n),e=Er(t,s,i),e!==null&&(en(e,t,i,r),El(e,t,i))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var r=dt(),i=Tr(t),s=Vn(r,i);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=Er(t,s,i),e!==null&&(en(e,t,i,r),El(e,t,i))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=dt(),r=Tr(t),i=Vn(n,r);i.tag=2,e!=null&&(i.callback=e),e=Er(t,i,r),e!==null&&(en(e,t,r,n),El(e,t,r))}};function ty(t,e,n,r,i,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,s,o):e.prototype&&e.prototype.isPureReactComponent?!Go(n,r)||!Go(i,s):!0}function aw(t,e,n){var r=!1,i=kr,s=e.contextType;return typeof s=="object"&&s!==null?s=$t(s):(i=wt(e)?di:ot.current,r=e.contextTypes,s=(r=r!=null)?ps(t,i):kr),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=ju,t.stateNode=e,e._reactInternals=t,r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=i,t.__reactInternalMemoizedMaskedChildContext=s),e}function ny(t,e,n,r){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,r),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,r),e.state!==t&&ju.enqueueReplaceState(e,e.state,null)}function gd(t,e,n,r){var i=t.stateNode;i.props=n,i.state=t.memoizedState,i.refs={},bf(t);var s=e.contextType;typeof s=="object"&&s!==null?i.context=$t(s):(s=wt(e)?di:ot.current,i.context=ps(t,s)),i.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(md(t,e,s,n),i.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(e=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),e!==i.state&&ju.enqueueReplaceState(i,i.state,null),eu(t,n,i,r),i.state=t.memoizedState),typeof i.componentDidMount=="function"&&(t.flags|=4194308)}function _s(t,e){try{var n="",r=e;do n+=_A(r),r=r.return;while(r);var i=n}catch(s){i=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:i,digest:null}}function mh(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function yd(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var qR=typeof WeakMap=="function"?WeakMap:Map;function lw(t,e,n){n=Vn(-1,n),n.tag=3,n.payload={element:null};var r=e.value;return n.callback=function(){su||(su=!0,Cd=r),yd(t,e)},n}function uw(t,e,n){n=Vn(-1,n),n.tag=3;var r=t.type.getDerivedStateFromError;if(typeof r=="function"){var i=e.value;n.payload=function(){return r(i)},n.callback=function(){yd(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){yd(t,e),typeof r!="function"&&(wr===null?wr=new Set([this]):wr.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function ry(t,e,n){var r=t.pingCache;if(r===null){r=t.pingCache=new qR;var i=new Set;r.set(e,i)}else i=r.get(e),i===void 0&&(i=new Set,r.set(e,i));i.has(n)||(i.add(n),t=s1.bind(null,t,e,n),e.then(t,t))}function iy(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function sy(t,e,n,r,i){return t.mode&1?(t.flags|=65536,t.lanes=i,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Vn(-1,1),e.tag=2,Er(n,e,1))),n.lanes|=1),t)}var WR=Gn.ReactCurrentOwner,vt=!1;function ht(t,e,n,r){e.child=t===null?FE(e,null,n,r):gs(e,t.child,n,r)}function oy(t,e,n,r,i){n=n.render;var s=e.ref;return os(e,i),r=Bf(t,e,n,r,s,i),n=zf(),t!==null&&!vt?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,Bn(t,e,i)):(ve&&n&&kf(e),e.flags|=1,ht(t,e,r,i),e.child)}function ay(t,e,n,r,i){if(t===null){var s=n.type;return typeof s=="function"&&!Jf(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,cw(t,e,s,r,i)):(t=Rl(n.type,null,r,e,e.mode,i),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&i)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:Go,n(o,r)&&t.ref===e.ref)return Bn(t,e,i)}return e.flags|=1,t=Ir(s,r),t.ref=e.ref,t.return=e,e.child=t}function cw(t,e,n,r,i){if(t!==null){var s=t.memoizedProps;if(Go(s,r)&&t.ref===e.ref)if(vt=!1,e.pendingProps=r=s,(t.lanes&i)!==0)t.flags&131072&&(vt=!0);else return e.lanes=t.lanes,Bn(t,e,i)}return _d(t,e,n,r,i)}function hw(t,e,n){var r=e.pendingProps,i=r.children,s=t!==null?t.memoizedState:null;if(r.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},fe(Zi,Rt),Rt|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,fe(Zi,Rt),Rt|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=s!==null?s.baseLanes:n,fe(Zi,Rt),Rt|=r}else s!==null?(r=s.baseLanes|n,e.memoizedState=null):r=n,fe(Zi,Rt),Rt|=r;return ht(t,e,i,n),e.child}function dw(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function _d(t,e,n,r,i){var s=wt(n)?di:ot.current;return s=ps(e,s),os(e,i),n=Bf(t,e,n,r,s,i),r=zf(),t!==null&&!vt?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,Bn(t,e,i)):(ve&&r&&kf(e),e.flags|=1,ht(t,e,n,i),e.child)}function ly(t,e,n,r,i){if(wt(n)){var s=!0;Ql(e)}else s=!1;if(os(e,i),e.stateNode===null)Il(t,e),aw(e,n,r),gd(e,n,r,i),r=!0;else if(t===null){var o=e.stateNode,l=e.memoizedProps;o.props=l;var u=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=$t(c):(c=wt(n)?di:ot.current,c=ps(e,c));var d=n.getDerivedStateFromProps,p=typeof d=="function"||typeof o.getSnapshotBeforeUpdate=="function";p||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==r||u!==c)&&ny(e,o,r,c),sr=!1;var m=e.memoizedState;o.state=m,eu(e,r,o,i),u=e.memoizedState,l!==r||m!==u||Et.current||sr?(typeof d=="function"&&(md(e,n,d,r),u=e.memoizedState),(l=sr||ty(e,n,l,r,m,u,c))?(p||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=r,e.memoizedState=u),o.props=r,o.state=u,o.context=c,r=l):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),r=!1)}else{o=e.stateNode,jE(t,e),l=e.memoizedProps,c=e.type===e.elementType?l:Qt(e.type,l),o.props=c,p=e.pendingProps,m=o.context,u=n.contextType,typeof u=="object"&&u!==null?u=$t(u):(u=wt(n)?di:ot.current,u=ps(e,u));var T=n.getDerivedStateFromProps;(d=typeof T=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==p||m!==u)&&ny(e,o,r,u),sr=!1,m=e.memoizedState,o.state=m,eu(e,r,o,i);var C=e.memoizedState;l!==p||m!==C||Et.current||sr?(typeof T=="function"&&(md(e,n,T,r),C=e.memoizedState),(c=sr||ty(e,n,c,r,m,C,u)||!1)?(d||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,C,u),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,C,u)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&m===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&m===t.memoizedState||(e.flags|=1024),e.memoizedProps=r,e.memoizedState=C),o.props=r,o.state=C,o.context=u,r=c):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&m===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&m===t.memoizedState||(e.flags|=1024),r=!1)}return vd(t,e,n,r,s,i)}function vd(t,e,n,r,i,s){dw(t,e);var o=(e.flags&128)!==0;if(!r&&!o)return i&&Kg(e,n,!1),Bn(t,e,s);r=e.stateNode,WR.current=e;var l=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return e.flags|=1,t!==null&&o?(e.child=gs(e,t.child,null,s),e.child=gs(e,null,l,s)):ht(t,e,l,s),e.memoizedState=r.state,i&&Kg(e,n,!0),e.child}function fw(t){var e=t.stateNode;e.pendingContext?Wg(t,e.pendingContext,e.pendingContext!==e.context):e.context&&Wg(t,e.context,!1),Mf(t,e.containerInfo)}function uy(t,e,n,r,i){return ms(),Df(i),e.flags|=256,ht(t,e,n,r),e.child}var Ed={dehydrated:null,treeContext:null,retryLane:0};function wd(t){return{baseLanes:t,cachePool:null,transitions:null}}function pw(t,e,n){var r=e.pendingProps,i=Ee.current,s=!1,o=(e.flags&128)!==0,l;if((l=o)||(l=t!==null&&t.memoizedState===null?!1:(i&2)!==0),l?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(i|=1),fe(Ee,i&1),t===null)return fd(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=r.children,t=r.fallback,s?(r=e.mode,s=e.child,o={mode:"hidden",children:o},!(r&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=$u(o,r,0,null),t=li(t,r,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=wd(n),e.memoizedState=Ed,t):qf(e,o));if(i=t.memoizedState,i!==null&&(l=i.dehydrated,l!==null))return KR(t,e,o,r,l,i,n);if(s){s=r.fallback,o=e.mode,i=t.child,l=i.sibling;var u={mode:"hidden",children:r.children};return!(o&1)&&e.child!==i?(r=e.child,r.childLanes=0,r.pendingProps=u,e.deletions=null):(r=Ir(i,u),r.subtreeFlags=i.subtreeFlags&14680064),l!==null?s=Ir(l,s):(s=li(s,o,n,null),s.flags|=2),s.return=e,r.return=e,r.sibling=s,e.child=r,r=s,s=e.child,o=t.child.memoizedState,o=o===null?wd(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=Ed,r}return s=t.child,t=s.sibling,r=Ir(s,{mode:"visible",children:r.children}),!(e.mode&1)&&(r.lanes=n),r.return=e,r.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=r,e.memoizedState=null,r}function qf(t,e){return e=$u({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function nl(t,e,n,r){return r!==null&&Df(r),gs(e,t.child,null,n),t=qf(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function KR(t,e,n,r,i,s,o){if(n)return e.flags&256?(e.flags&=-257,r=mh(Error(U(422))),nl(t,e,o,r)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=r.fallback,i=e.mode,r=$u({mode:"visible",children:r.children},i,0,null),s=li(s,i,o,null),s.flags|=2,r.return=e,s.return=e,r.sibling=s,e.child=r,e.mode&1&&gs(e,t.child,null,o),e.child.memoizedState=wd(o),e.memoizedState=Ed,s);if(!(e.mode&1))return nl(t,e,o,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var l=r.dgst;return r=l,s=Error(U(419)),r=mh(s,r,void 0),nl(t,e,o,r)}if(l=(o&t.childLanes)!==0,vt||l){if(r=qe,r!==null){switch(o&-o){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|o)?0:i,i!==0&&i!==s.retryLane&&(s.retryLane=i,jn(t,i),en(r,t,i,-1))}return Xf(),r=mh(Error(U(421))),nl(t,e,o,r)}return i.data==="$?"?(e.flags|=128,e.child=t.child,e=o1.bind(null,t),i._reactRetry=e,null):(t=s.treeContext,Pt=vr(i.nextSibling),Dt=e,ve=!0,Xt=null,t!==null&&(Mt[Ft++]=Nn,Mt[Ft++]=Dn,Mt[Ft++]=fi,Nn=t.id,Dn=t.overflow,fi=e),e=qf(e,r.children),e.flags|=4096,e)}function cy(t,e,n){t.lanes|=e;var r=t.alternate;r!==null&&(r.lanes|=e),pd(t.return,e,n)}function gh(t,e,n,r,i){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=r,s.tail=n,s.tailMode=i)}function mw(t,e,n){var r=e.pendingProps,i=r.revealOrder,s=r.tail;if(ht(t,e,r.children,n),r=Ee.current,r&2)r=r&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&cy(t,n,e);else if(t.tag===19)cy(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}r&=1}if(fe(Ee,r),!(e.mode&1))e.memoizedState=null;else switch(i){case"forwards":for(n=e.child,i=null;n!==null;)t=n.alternate,t!==null&&tu(t)===null&&(i=n),n=n.sibling;n=i,n===null?(i=e.child,e.child=null):(i=n.sibling,n.sibling=null),gh(e,!1,i,n,s);break;case"backwards":for(n=null,i=e.child,e.child=null;i!==null;){if(t=i.alternate,t!==null&&tu(t)===null){e.child=i;break}t=i.sibling,i.sibling=n,n=i,i=t}gh(e,!0,n,null,s);break;case"together":gh(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Il(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Bn(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),mi|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(U(153));if(e.child!==null){for(t=e.child,n=Ir(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=Ir(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function GR(t,e,n){switch(e.tag){case 3:fw(e),ms();break;case 5:BE(e);break;case 1:wt(e.type)&&Ql(e);break;case 4:Mf(e,e.stateNode.containerInfo);break;case 10:var r=e.type._context,i=e.memoizedProps.value;fe(Jl,r._currentValue),r._currentValue=i;break;case 13:if(r=e.memoizedState,r!==null)return r.dehydrated!==null?(fe(Ee,Ee.current&1),e.flags|=128,null):n&e.child.childLanes?pw(t,e,n):(fe(Ee,Ee.current&1),t=Bn(t,e,n),t!==null?t.sibling:null);fe(Ee,Ee.current&1);break;case 19:if(r=(n&e.childLanes)!==0,t.flags&128){if(r)return mw(t,e,n);e.flags|=128}if(i=e.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),fe(Ee,Ee.current),r)break;return null;case 22:case 23:return e.lanes=0,hw(t,e,n)}return Bn(t,e,n)}var gw,Td,yw,_w;gw=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Td=function(){};yw=function(t,e,n,r){var i=t.memoizedProps;if(i!==r){t=e.stateNode,ii(pn.current);var s=null;switch(n){case"input":i=Hh(t,i),r=Hh(t,r),s=[];break;case"select":i=Ie({},i,{value:void 0}),r=Ie({},r,{value:void 0}),s=[];break;case"textarea":i=Kh(t,i),r=Kh(t,r),s=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(t.onclick=Kl)}Qh(n,r);var o;n=null;for(c in i)if(!r.hasOwnProperty(c)&&i.hasOwnProperty(c)&&i[c]!=null)if(c==="style"){var l=i[c];for(o in l)l.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Bo.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in r){var u=r[c];if(l=i!=null?i[c]:void 0,r.hasOwnProperty(c)&&u!==l&&(u!=null||l!=null))if(c==="style")if(l){for(o in l)!l.hasOwnProperty(o)||u&&u.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in u)u.hasOwnProperty(o)&&l[o]!==u[o]&&(n||(n={}),n[o]=u[o])}else n||(s||(s=[]),s.push(c,n)),n=u;else c==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,l=l?l.__html:void 0,u!=null&&l!==u&&(s=s||[]).push(c,u)):c==="children"?typeof u!="string"&&typeof u!="number"||(s=s||[]).push(c,""+u):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Bo.hasOwnProperty(c)?(u!=null&&c==="onScroll"&&me("scroll",t),s||l===u||(s=[])):(s=s||[]).push(c,u))}n&&(s=s||[]).push("style",n);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};_w=function(t,e,n,r){n!==r&&(e.flags|=4)};function co(t,e){if(!ve)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null}}function tt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,r=0;if(e)for(var i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=t,i=i.sibling;else for(i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=t,i=i.sibling;return t.subtreeFlags|=r,t.childLanes=n,e}function QR(t,e,n){var r=e.pendingProps;switch(Nf(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return tt(e),null;case 1:return wt(e.type)&&Gl(),tt(e),null;case 3:return r=e.stateNode,ys(),ye(Et),ye(ot),Uf(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(t===null||t.child===null)&&(el(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Xt!==null&&(Nd(Xt),Xt=null))),Td(t,e),tt(e),null;case 5:Ff(e);var i=ii(Zo.current);if(n=e.type,t!==null&&e.stateNode!=null)yw(t,e,n,r,i),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!r){if(e.stateNode===null)throw Error(U(166));return tt(e),null}if(t=ii(pn.current),el(e)){r=e.stateNode,n=e.type;var s=e.memoizedProps;switch(r[hn]=e,r[Xo]=s,t=(e.mode&1)!==0,n){case"dialog":me("cancel",r),me("close",r);break;case"iframe":case"object":case"embed":me("load",r);break;case"video":case"audio":for(i=0;i<_o.length;i++)me(_o[i],r);break;case"source":me("error",r);break;case"img":case"image":case"link":me("error",r),me("load",r);break;case"details":me("toggle",r);break;case"input":vg(r,s),me("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!s.multiple},me("invalid",r);break;case"textarea":wg(r,s),me("invalid",r)}Qh(n,s),i=null;for(var o in s)if(s.hasOwnProperty(o)){var l=s[o];o==="children"?typeof l=="string"?r.textContent!==l&&(s.suppressHydrationWarning!==!0&&Za(r.textContent,l,t),i=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(s.suppressHydrationWarning!==!0&&Za(r.textContent,l,t),i=["children",""+l]):Bo.hasOwnProperty(o)&&l!=null&&o==="onScroll"&&me("scroll",r)}switch(n){case"input":qa(r),Eg(r,s,!0);break;case"textarea":qa(r),Tg(r);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(r.onclick=Kl)}r=i,e.updateQueue=r,r!==null&&(e.flags|=4)}else{o=i.nodeType===9?i:i.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=Wv(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof r.is=="string"?t=o.createElement(n,{is:r.is}):(t=o.createElement(n),n==="select"&&(o=t,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):t=o.createElementNS(t,n),t[hn]=e,t[Xo]=r,gw(t,e,!1,!1),e.stateNode=t;e:{switch(o=Yh(n,r),n){case"dialog":me("cancel",t),me("close",t),i=r;break;case"iframe":case"object":case"embed":me("load",t),i=r;break;case"video":case"audio":for(i=0;i<_o.length;i++)me(_o[i],t);i=r;break;case"source":me("error",t),i=r;break;case"img":case"image":case"link":me("error",t),me("load",t),i=r;break;case"details":me("toggle",t),i=r;break;case"input":vg(t,r),i=Hh(t,r),me("invalid",t);break;case"option":i=r;break;case"select":t._wrapperState={wasMultiple:!!r.multiple},i=Ie({},r,{value:void 0}),me("invalid",t);break;case"textarea":wg(t,r),i=Kh(t,r),me("invalid",t);break;default:i=r}Qh(n,i),l=i;for(s in l)if(l.hasOwnProperty(s)){var u=l[s];s==="style"?Qv(t,u):s==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&Kv(t,u)):s==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&zo(t,u):typeof u=="number"&&zo(t,""+u):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(Bo.hasOwnProperty(s)?u!=null&&s==="onScroll"&&me("scroll",t):u!=null&&mf(t,s,u,o))}switch(n){case"input":qa(t),Eg(t,r,!1);break;case"textarea":qa(t),Tg(t);break;case"option":r.value!=null&&t.setAttribute("value",""+Pr(r.value));break;case"select":t.multiple=!!r.multiple,s=r.value,s!=null?ns(t,!!r.multiple,s,!1):r.defaultValue!=null&&ns(t,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(t.onclick=Kl)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return tt(e),null;case 6:if(t&&e.stateNode!=null)_w(t,e,t.memoizedProps,r);else{if(typeof r!="string"&&e.stateNode===null)throw Error(U(166));if(n=ii(Zo.current),ii(pn.current),el(e)){if(r=e.stateNode,n=e.memoizedProps,r[hn]=e,(s=r.nodeValue!==n)&&(t=Dt,t!==null))switch(t.tag){case 3:Za(r.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&Za(r.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[hn]=e,e.stateNode=r}return tt(e),null;case 13:if(ye(Ee),r=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(ve&&Pt!==null&&e.mode&1&&!(e.flags&128))bE(),ms(),e.flags|=98560,s=!1;else if(s=el(e),r!==null&&r.dehydrated!==null){if(t===null){if(!s)throw Error(U(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(U(317));s[hn]=e}else ms(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;tt(e),s=!1}else Xt!==null&&(Nd(Xt),Xt=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(r=r!==null,r!==(t!==null&&t.memoizedState!==null)&&r&&(e.child.flags|=8192,e.mode&1&&(t===null||Ee.current&1?je===0&&(je=3):Xf())),e.updateQueue!==null&&(e.flags|=4),tt(e),null);case 4:return ys(),Td(t,e),t===null&&Qo(e.stateNode.containerInfo),tt(e),null;case 10:return Vf(e.type._context),tt(e),null;case 17:return wt(e.type)&&Gl(),tt(e),null;case 19:if(ye(Ee),s=e.memoizedState,s===null)return tt(e),null;if(r=(e.flags&128)!==0,o=s.rendering,o===null)if(r)co(s,!1);else{if(je!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=tu(t),o!==null){for(e.flags|=128,co(s,!1),r=o.updateQueue,r!==null&&(e.updateQueue=r,e.flags|=4),e.subtreeFlags=0,r=n,n=e.child;n!==null;)s=n,t=r,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return fe(Ee,Ee.current&1|2),e.child}t=t.sibling}s.tail!==null&&Oe()>vs&&(e.flags|=128,r=!0,co(s,!1),e.lanes=4194304)}else{if(!r)if(t=tu(o),t!==null){if(e.flags|=128,r=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),co(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!ve)return tt(e),null}else 2*Oe()-s.renderingStartTime>vs&&n!==1073741824&&(e.flags|=128,r=!0,co(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Oe(),e.sibling=null,n=Ee.current,fe(Ee,r?n&1|2:n&1),e):(tt(e),null);case 22:case 23:return Yf(),r=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==r&&(e.flags|=8192),r&&e.mode&1?Rt&1073741824&&(tt(e),e.subtreeFlags&6&&(e.flags|=8192)):tt(e),null;case 24:return null;case 25:return null}throw Error(U(156,e.tag))}function YR(t,e){switch(Nf(e),e.tag){case 1:return wt(e.type)&&Gl(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return ys(),ye(Et),ye(ot),Uf(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return Ff(e),null;case 13:if(ye(Ee),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(U(340));ms()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return ye(Ee),null;case 4:return ys(),null;case 10:return Vf(e.type._context),null;case 22:case 23:return Yf(),null;case 24:return null;default:return null}}var rl=!1,it=!1,XR=typeof WeakSet=="function"?WeakSet:Set,q=null;function Ji(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){Ce(t,e,r)}else n.current=null}function Id(t,e,n){try{n()}catch(r){Ce(t,e,r)}}var hy=!1;function JR(t,e){if(od=Hl,t=IE(),Pf(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,s=r.focusNode;r=r.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,l=-1,u=-1,c=0,d=0,p=t,m=null;t:for(;;){for(var T;p!==n||i!==0&&p.nodeType!==3||(l=o+i),p!==s||r!==0&&p.nodeType!==3||(u=o+r),p.nodeType===3&&(o+=p.nodeValue.length),(T=p.firstChild)!==null;)m=p,p=T;for(;;){if(p===t)break t;if(m===n&&++c===i&&(l=o),m===s&&++d===r&&(u=o),(T=p.nextSibling)!==null)break;p=m,m=p.parentNode}p=T}n=l===-1||u===-1?null:{start:l,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(ad={focusedElem:t,selectionRange:n},Hl=!1,q=e;q!==null;)if(e=q,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,q=t;else for(;q!==null;){e=q;try{var C=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(C!==null){var P=C.memoizedProps,D=C.memoizedState,v=e.stateNode,_=v.getSnapshotBeforeUpdate(e.elementType===e.type?P:Qt(e.type,P),D);v.__reactInternalSnapshotBeforeUpdate=_}break;case 3:var I=e.stateNode.containerInfo;I.nodeType===1?I.textContent="":I.nodeType===9&&I.documentElement&&I.removeChild(I.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(U(163))}}catch(x){Ce(e,e.return,x)}if(t=e.sibling,t!==null){t.return=e.return,q=t;break}q=e.return}return C=hy,hy=!1,C}function Do(t,e,n){var r=e.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&t)===t){var s=i.destroy;i.destroy=void 0,s!==void 0&&Id(e,n,s)}i=i.next}while(i!==r)}}function Bu(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var r=n.create;n.destroy=r()}n=n.next}while(n!==e)}}function Sd(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function vw(t){var e=t.alternate;e!==null&&(t.alternate=null,vw(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[hn],delete e[Xo],delete e[cd],delete e[VR],delete e[LR])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function Ew(t){return t.tag===5||t.tag===3||t.tag===4}function dy(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||Ew(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Ad(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Kl));else if(r!==4&&(t=t.child,t!==null))for(Ad(t,e,n),t=t.sibling;t!==null;)Ad(t,e,n),t=t.sibling}function Rd(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(r!==4&&(t=t.child,t!==null))for(Rd(t,e,n),t=t.sibling;t!==null;)Rd(t,e,n),t=t.sibling}var Ke=null,Yt=!1;function nr(t,e,n){for(n=n.child;n!==null;)ww(t,e,n),n=n.sibling}function ww(t,e,n){if(fn&&typeof fn.onCommitFiberUnmount=="function")try{fn.onCommitFiberUnmount(Ou,n)}catch{}switch(n.tag){case 5:it||Ji(n,e);case 6:var r=Ke,i=Yt;Ke=null,nr(t,e,n),Ke=r,Yt=i,Ke!==null&&(Yt?(t=Ke,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Ke.removeChild(n.stateNode));break;case 18:Ke!==null&&(Yt?(t=Ke,n=n.stateNode,t.nodeType===8?uh(t.parentNode,n):t.nodeType===1&&uh(t,n),Wo(t)):uh(Ke,n.stateNode));break;case 4:r=Ke,i=Yt,Ke=n.stateNode.containerInfo,Yt=!0,nr(t,e,n),Ke=r,Yt=i;break;case 0:case 11:case 14:case 15:if(!it&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var s=i,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&Id(n,e,o),i=i.next}while(i!==r)}nr(t,e,n);break;case 1:if(!it&&(Ji(n,e),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){Ce(n,e,l)}nr(t,e,n);break;case 21:nr(t,e,n);break;case 22:n.mode&1?(it=(r=it)||n.memoizedState!==null,nr(t,e,n),it=r):nr(t,e,n);break;default:nr(t,e,n)}}function fy(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new XR),e.forEach(function(r){var i=a1.bind(null,t,r);n.has(r)||(n.add(r),r.then(i,i))})}}function Gt(t,e){var n=e.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var s=t,o=e,l=o;e:for(;l!==null;){switch(l.tag){case 5:Ke=l.stateNode,Yt=!1;break e;case 3:Ke=l.stateNode.containerInfo,Yt=!0;break e;case 4:Ke=l.stateNode.containerInfo,Yt=!0;break e}l=l.return}if(Ke===null)throw Error(U(160));ww(s,o,i),Ke=null,Yt=!1;var u=i.alternate;u!==null&&(u.return=null),i.return=null}catch(c){Ce(i,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)Tw(e,t),e=e.sibling}function Tw(t,e){var n=t.alternate,r=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Gt(e,t),ln(t),r&4){try{Do(3,t,t.return),Bu(3,t)}catch(P){Ce(t,t.return,P)}try{Do(5,t,t.return)}catch(P){Ce(t,t.return,P)}}break;case 1:Gt(e,t),ln(t),r&512&&n!==null&&Ji(n,n.return);break;case 5:if(Gt(e,t),ln(t),r&512&&n!==null&&Ji(n,n.return),t.flags&32){var i=t.stateNode;try{zo(i,"")}catch(P){Ce(t,t.return,P)}}if(r&4&&(i=t.stateNode,i!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,l=t.type,u=t.updateQueue;if(t.updateQueue=null,u!==null)try{l==="input"&&s.type==="radio"&&s.name!=null&&Hv(i,s),Yh(l,o);var c=Yh(l,s);for(o=0;o<u.length;o+=2){var d=u[o],p=u[o+1];d==="style"?Qv(i,p):d==="dangerouslySetInnerHTML"?Kv(i,p):d==="children"?zo(i,p):mf(i,d,p,c)}switch(l){case"input":qh(i,s);break;case"textarea":qv(i,s);break;case"select":var m=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!s.multiple;var T=s.value;T!=null?ns(i,!!s.multiple,T,!1):m!==!!s.multiple&&(s.defaultValue!=null?ns(i,!!s.multiple,s.defaultValue,!0):ns(i,!!s.multiple,s.multiple?[]:"",!1))}i[Xo]=s}catch(P){Ce(t,t.return,P)}}break;case 6:if(Gt(e,t),ln(t),r&4){if(t.stateNode===null)throw Error(U(162));i=t.stateNode,s=t.memoizedProps;try{i.nodeValue=s}catch(P){Ce(t,t.return,P)}}break;case 3:if(Gt(e,t),ln(t),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Wo(e.containerInfo)}catch(P){Ce(t,t.return,P)}break;case 4:Gt(e,t),ln(t);break;case 13:Gt(e,t),ln(t),i=t.child,i.flags&8192&&(s=i.memoizedState!==null,i.stateNode.isHidden=s,!s||i.alternate!==null&&i.alternate.memoizedState!==null||(Gf=Oe())),r&4&&fy(t);break;case 22:if(d=n!==null&&n.memoizedState!==null,t.mode&1?(it=(c=it)||d,Gt(e,t),it=c):Gt(e,t),ln(t),r&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!d&&t.mode&1)for(q=t,d=t.child;d!==null;){for(p=q=d;q!==null;){switch(m=q,T=m.child,m.tag){case 0:case 11:case 14:case 15:Do(4,m,m.return);break;case 1:Ji(m,m.return);var C=m.stateNode;if(typeof C.componentWillUnmount=="function"){r=m,n=m.return;try{e=r,C.props=e.memoizedProps,C.state=e.memoizedState,C.componentWillUnmount()}catch(P){Ce(r,n,P)}}break;case 5:Ji(m,m.return);break;case 22:if(m.memoizedState!==null){my(p);continue}}T!==null?(T.return=m,q=T):my(p)}d=d.sibling}e:for(d=null,p=t;;){if(p.tag===5){if(d===null){d=p;try{i=p.stateNode,c?(s=i.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(l=p.stateNode,u=p.memoizedProps.style,o=u!=null&&u.hasOwnProperty("display")?u.display:null,l.style.display=Gv("display",o))}catch(P){Ce(t,t.return,P)}}}else if(p.tag===6){if(d===null)try{p.stateNode.nodeValue=c?"":p.memoizedProps}catch(P){Ce(t,t.return,P)}}else if((p.tag!==22&&p.tag!==23||p.memoizedState===null||p===t)&&p.child!==null){p.child.return=p,p=p.child;continue}if(p===t)break e;for(;p.sibling===null;){if(p.return===null||p.return===t)break e;d===p&&(d=null),p=p.return}d===p&&(d=null),p.sibling.return=p.return,p=p.sibling}}break;case 19:Gt(e,t),ln(t),r&4&&fy(t);break;case 21:break;default:Gt(e,t),ln(t)}}function ln(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(Ew(n)){var r=n;break e}n=n.return}throw Error(U(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(zo(i,""),r.flags&=-33);var s=dy(t);Rd(t,s,i);break;case 3:case 4:var o=r.stateNode.containerInfo,l=dy(t);Ad(t,l,o);break;default:throw Error(U(161))}}catch(u){Ce(t,t.return,u)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function ZR(t,e,n){q=t,Iw(t)}function Iw(t,e,n){for(var r=(t.mode&1)!==0;q!==null;){var i=q,s=i.child;if(i.tag===22&&r){var o=i.memoizedState!==null||rl;if(!o){var l=i.alternate,u=l!==null&&l.memoizedState!==null||it;l=rl;var c=it;if(rl=o,(it=u)&&!c)for(q=i;q!==null;)o=q,u=o.child,o.tag===22&&o.memoizedState!==null?gy(i):u!==null?(u.return=o,q=u):gy(i);for(;s!==null;)q=s,Iw(s),s=s.sibling;q=i,rl=l,it=c}py(t)}else i.subtreeFlags&8772&&s!==null?(s.return=i,q=s):py(t)}}function py(t){for(;q!==null;){var e=q;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:it||Bu(5,e);break;case 1:var r=e.stateNode;if(e.flags&4&&!it)if(n===null)r.componentDidMount();else{var i=e.elementType===e.type?n.memoizedProps:Qt(e.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&Jg(e,s,r);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Jg(e,o,n)}break;case 5:var l=e.stateNode;if(n===null&&e.flags&4){n=l;var u=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var d=c.memoizedState;if(d!==null){var p=d.dehydrated;p!==null&&Wo(p)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(U(163))}it||e.flags&512&&Sd(e)}catch(m){Ce(e,e.return,m)}}if(e===t){q=null;break}if(n=e.sibling,n!==null){n.return=e.return,q=n;break}q=e.return}}function my(t){for(;q!==null;){var e=q;if(e===t){q=null;break}var n=e.sibling;if(n!==null){n.return=e.return,q=n;break}q=e.return}}function gy(t){for(;q!==null;){var e=q;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{Bu(4,e)}catch(u){Ce(e,n,u)}break;case 1:var r=e.stateNode;if(typeof r.componentDidMount=="function"){var i=e.return;try{r.componentDidMount()}catch(u){Ce(e,i,u)}}var s=e.return;try{Sd(e)}catch(u){Ce(e,s,u)}break;case 5:var o=e.return;try{Sd(e)}catch(u){Ce(e,o,u)}}}catch(u){Ce(e,e.return,u)}if(e===t){q=null;break}var l=e.sibling;if(l!==null){l.return=e.return,q=l;break}q=e.return}}var e1=Math.ceil,iu=Gn.ReactCurrentDispatcher,Wf=Gn.ReactCurrentOwner,Bt=Gn.ReactCurrentBatchConfig,se=0,qe=null,Le=null,Ye=0,Rt=0,Zi=Mr(0),je=0,ra=null,mi=0,zu=0,Kf=0,xo=null,yt=null,Gf=0,vs=1/0,Pn=null,su=!1,Cd=null,wr=null,il=!1,pr=null,ou=0,Oo=0,Pd=null,Sl=-1,Al=0;function dt(){return se&6?Oe():Sl!==-1?Sl:Sl=Oe()}function Tr(t){return t.mode&1?se&2&&Ye!==0?Ye&-Ye:MR.transition!==null?(Al===0&&(Al=aE()),Al):(t=ue,t!==0||(t=window.event,t=t===void 0?16:pE(t.type)),t):1}function en(t,e,n,r){if(50<Oo)throw Oo=0,Pd=null,Error(U(185));pa(t,n,r),(!(se&2)||t!==qe)&&(t===qe&&(!(se&2)&&(zu|=n),je===4&&ar(t,Ye)),Tt(t,r),n===1&&se===0&&!(e.mode&1)&&(vs=Oe()+500,Fu&&Fr()))}function Tt(t,e){var n=t.callbackNode;MA(t,e);var r=$l(t,t===qe?Ye:0);if(r===0)n!==null&&Ag(n),t.callbackNode=null,t.callbackPriority=0;else if(e=r&-r,t.callbackPriority!==e){if(n!=null&&Ag(n),e===1)t.tag===0?bR(yy.bind(null,t)):OE(yy.bind(null,t)),xR(function(){!(se&6)&&Fr()}),n=null;else{switch(lE(r)){case 1:n=Ef;break;case 4:n=sE;break;case 16:n=zl;break;case 536870912:n=oE;break;default:n=zl}n=Dw(n,Sw.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function Sw(t,e){if(Sl=-1,Al=0,se&6)throw Error(U(327));var n=t.callbackNode;if(as()&&t.callbackNode!==n)return null;var r=$l(t,t===qe?Ye:0);if(r===0)return null;if(r&30||r&t.expiredLanes||e)e=au(t,r);else{e=r;var i=se;se|=2;var s=Rw();(qe!==t||Ye!==e)&&(Pn=null,vs=Oe()+500,ai(t,e));do try{r1();break}catch(l){Aw(t,l)}while(!0);Of(),iu.current=s,se=i,Le!==null?e=0:(qe=null,Ye=0,e=je)}if(e!==0){if(e===2&&(i=td(t),i!==0&&(r=i,e=kd(t,i))),e===1)throw n=ra,ai(t,0),ar(t,r),Tt(t,Oe()),n;if(e===6)ar(t,r);else{if(i=t.current.alternate,!(r&30)&&!t1(i)&&(e=au(t,r),e===2&&(s=td(t),s!==0&&(r=s,e=kd(t,s))),e===1))throw n=ra,ai(t,0),ar(t,r),Tt(t,Oe()),n;switch(t.finishedWork=i,t.finishedLanes=r,e){case 0:case 1:throw Error(U(345));case 2:ei(t,yt,Pn);break;case 3:if(ar(t,r),(r&130023424)===r&&(e=Gf+500-Oe(),10<e)){if($l(t,0)!==0)break;if(i=t.suspendedLanes,(i&r)!==r){dt(),t.pingedLanes|=t.suspendedLanes&i;break}t.timeoutHandle=ud(ei.bind(null,t,yt,Pn),e);break}ei(t,yt,Pn);break;case 4:if(ar(t,r),(r&4194240)===r)break;for(e=t.eventTimes,i=-1;0<r;){var o=31-Zt(r);s=1<<o,o=e[o],o>i&&(i=o),r&=~s}if(r=i,r=Oe()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*e1(r/1960))-r,10<r){t.timeoutHandle=ud(ei.bind(null,t,yt,Pn),r);break}ei(t,yt,Pn);break;case 5:ei(t,yt,Pn);break;default:throw Error(U(329))}}}return Tt(t,Oe()),t.callbackNode===n?Sw.bind(null,t):null}function kd(t,e){var n=xo;return t.current.memoizedState.isDehydrated&&(ai(t,e).flags|=256),t=au(t,e),t!==2&&(e=yt,yt=n,e!==null&&Nd(e)),t}function Nd(t){yt===null?yt=t:yt.push.apply(yt,t)}function t1(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],s=i.getSnapshot;i=i.value;try{if(!tn(s(),i))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function ar(t,e){for(e&=~Kf,e&=~zu,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-Zt(e),r=1<<n;t[n]=-1,e&=~r}}function yy(t){if(se&6)throw Error(U(327));as();var e=$l(t,0);if(!(e&1))return Tt(t,Oe()),null;var n=au(t,e);if(t.tag!==0&&n===2){var r=td(t);r!==0&&(e=r,n=kd(t,r))}if(n===1)throw n=ra,ai(t,0),ar(t,e),Tt(t,Oe()),n;if(n===6)throw Error(U(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,ei(t,yt,Pn),Tt(t,Oe()),null}function Qf(t,e){var n=se;se|=1;try{return t(e)}finally{se=n,se===0&&(vs=Oe()+500,Fu&&Fr())}}function gi(t){pr!==null&&pr.tag===0&&!(se&6)&&as();var e=se;se|=1;var n=Bt.transition,r=ue;try{if(Bt.transition=null,ue=1,t)return t()}finally{ue=r,Bt.transition=n,se=e,!(se&6)&&Fr()}}function Yf(){Rt=Zi.current,ye(Zi)}function ai(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,DR(n)),Le!==null)for(n=Le.return;n!==null;){var r=n;switch(Nf(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Gl();break;case 3:ys(),ye(Et),ye(ot),Uf();break;case 5:Ff(r);break;case 4:ys();break;case 13:ye(Ee);break;case 19:ye(Ee);break;case 10:Vf(r.type._context);break;case 22:case 23:Yf()}n=n.return}if(qe=t,Le=t=Ir(t.current,null),Ye=Rt=e,je=0,ra=null,Kf=zu=mi=0,yt=xo=null,ri!==null){for(e=0;e<ri.length;e++)if(n=ri[e],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,s=n.pending;if(s!==null){var o=s.next;s.next=i,r.next=o}n.pending=r}ri=null}return t}function Aw(t,e){do{var n=Le;try{if(Of(),wl.current=ru,nu){for(var r=we.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}nu=!1}if(pi=0,He=Ue=we=null,No=!1,ea=0,Wf.current=null,n===null||n.return===null){je=1,ra=e,Le=null;break}e:{var s=t,o=n.return,l=n,u=e;if(e=Ye,l.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var c=u,d=l,p=d.tag;if(!(d.mode&1)&&(p===0||p===11||p===15)){var m=d.alternate;m?(d.updateQueue=m.updateQueue,d.memoizedState=m.memoizedState,d.lanes=m.lanes):(d.updateQueue=null,d.memoizedState=null)}var T=iy(o);if(T!==null){T.flags&=-257,sy(T,o,l,s,e),T.mode&1&&ry(s,c,e),e=T,u=c;var C=e.updateQueue;if(C===null){var P=new Set;P.add(u),e.updateQueue=P}else C.add(u);break e}else{if(!(e&1)){ry(s,c,e),Xf();break e}u=Error(U(426))}}else if(ve&&l.mode&1){var D=iy(o);if(D!==null){!(D.flags&65536)&&(D.flags|=256),sy(D,o,l,s,e),Df(_s(u,l));break e}}s=u=_s(u,l),je!==4&&(je=2),xo===null?xo=[s]:xo.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var v=lw(s,u,e);Xg(s,v);break e;case 1:l=u;var _=s.type,I=s.stateNode;if(!(s.flags&128)&&(typeof _.getDerivedStateFromError=="function"||I!==null&&typeof I.componentDidCatch=="function"&&(wr===null||!wr.has(I)))){s.flags|=65536,e&=-e,s.lanes|=e;var x=uw(s,l,e);Xg(s,x);break e}}s=s.return}while(s!==null)}Pw(n)}catch(F){e=F,Le===n&&n!==null&&(Le=n=n.return);continue}break}while(!0)}function Rw(){var t=iu.current;return iu.current=ru,t===null?ru:t}function Xf(){(je===0||je===3||je===2)&&(je=4),qe===null||!(mi&268435455)&&!(zu&268435455)||ar(qe,Ye)}function au(t,e){var n=se;se|=2;var r=Rw();(qe!==t||Ye!==e)&&(Pn=null,ai(t,e));do try{n1();break}catch(i){Aw(t,i)}while(!0);if(Of(),se=n,iu.current=r,Le!==null)throw Error(U(261));return qe=null,Ye=0,je}function n1(){for(;Le!==null;)Cw(Le)}function r1(){for(;Le!==null&&!PA();)Cw(Le)}function Cw(t){var e=Nw(t.alternate,t,Rt);t.memoizedProps=t.pendingProps,e===null?Pw(t):Le=e,Wf.current=null}function Pw(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=YR(n,e),n!==null){n.flags&=32767,Le=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{je=6,Le=null;return}}else if(n=QR(n,e,Rt),n!==null){Le=n;return}if(e=e.sibling,e!==null){Le=e;return}Le=e=t}while(e!==null);je===0&&(je=5)}function ei(t,e,n){var r=ue,i=Bt.transition;try{Bt.transition=null,ue=1,i1(t,e,n,r)}finally{Bt.transition=i,ue=r}return null}function i1(t,e,n,r){do as();while(pr!==null);if(se&6)throw Error(U(327));n=t.finishedWork;var i=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(U(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(FA(t,s),t===qe&&(Le=qe=null,Ye=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||il||(il=!0,Dw(zl,function(){return as(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Bt.transition,Bt.transition=null;var o=ue;ue=1;var l=se;se|=4,Wf.current=null,JR(t,n),Tw(n,t),SR(ad),Hl=!!od,ad=od=null,t.current=n,ZR(n),kA(),se=l,ue=o,Bt.transition=s}else t.current=n;if(il&&(il=!1,pr=t,ou=i),s=t.pendingLanes,s===0&&(wr=null),xA(n.stateNode),Tt(t,Oe()),e!==null)for(r=t.onRecoverableError,n=0;n<e.length;n++)i=e[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(su)throw su=!1,t=Cd,Cd=null,t;return ou&1&&t.tag!==0&&as(),s=t.pendingLanes,s&1?t===Pd?Oo++:(Oo=0,Pd=t):Oo=0,Fr(),null}function as(){if(pr!==null){var t=lE(ou),e=Bt.transition,n=ue;try{if(Bt.transition=null,ue=16>t?16:t,pr===null)var r=!1;else{if(t=pr,pr=null,ou=0,se&6)throw Error(U(331));var i=se;for(se|=4,q=t.current;q!==null;){var s=q,o=s.child;if(q.flags&16){var l=s.deletions;if(l!==null){for(var u=0;u<l.length;u++){var c=l[u];for(q=c;q!==null;){var d=q;switch(d.tag){case 0:case 11:case 15:Do(8,d,s)}var p=d.child;if(p!==null)p.return=d,q=p;else for(;q!==null;){d=q;var m=d.sibling,T=d.return;if(vw(d),d===c){q=null;break}if(m!==null){m.return=T,q=m;break}q=T}}}var C=s.alternate;if(C!==null){var P=C.child;if(P!==null){C.child=null;do{var D=P.sibling;P.sibling=null,P=D}while(P!==null)}}q=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,q=o;else e:for(;q!==null;){if(s=q,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Do(9,s,s.return)}var v=s.sibling;if(v!==null){v.return=s.return,q=v;break e}q=s.return}}var _=t.current;for(q=_;q!==null;){o=q;var I=o.child;if(o.subtreeFlags&2064&&I!==null)I.return=o,q=I;else e:for(o=_;q!==null;){if(l=q,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:Bu(9,l)}}catch(F){Ce(l,l.return,F)}if(l===o){q=null;break e}var x=l.sibling;if(x!==null){x.return=l.return,q=x;break e}q=l.return}}if(se=i,Fr(),fn&&typeof fn.onPostCommitFiberRoot=="function")try{fn.onPostCommitFiberRoot(Ou,t)}catch{}r=!0}return r}finally{ue=n,Bt.transition=e}}return!1}function _y(t,e,n){e=_s(n,e),e=lw(t,e,1),t=Er(t,e,1),e=dt(),t!==null&&(pa(t,1,e),Tt(t,e))}function Ce(t,e,n){if(t.tag===3)_y(t,t,n);else for(;e!==null;){if(e.tag===3){_y(e,t,n);break}else if(e.tag===1){var r=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(wr===null||!wr.has(r))){t=_s(n,t),t=uw(e,t,1),e=Er(e,t,1),t=dt(),e!==null&&(pa(e,1,t),Tt(e,t));break}}e=e.return}}function s1(t,e,n){var r=t.pingCache;r!==null&&r.delete(e),e=dt(),t.pingedLanes|=t.suspendedLanes&n,qe===t&&(Ye&n)===n&&(je===4||je===3&&(Ye&130023424)===Ye&&500>Oe()-Gf?ai(t,0):Kf|=n),Tt(t,e)}function kw(t,e){e===0&&(t.mode&1?(e=Ga,Ga<<=1,!(Ga&130023424)&&(Ga=4194304)):e=1);var n=dt();t=jn(t,e),t!==null&&(pa(t,e,n),Tt(t,n))}function o1(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),kw(t,n)}function a1(t,e){var n=0;switch(t.tag){case 13:var r=t.stateNode,i=t.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=t.stateNode;break;default:throw Error(U(314))}r!==null&&r.delete(e),kw(t,n)}var Nw;Nw=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||Et.current)vt=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return vt=!1,GR(t,e,n);vt=!!(t.flags&131072)}else vt=!1,ve&&e.flags&1048576&&VE(e,Xl,e.index);switch(e.lanes=0,e.tag){case 2:var r=e.type;Il(t,e),t=e.pendingProps;var i=ps(e,ot.current);os(e,n),i=Bf(null,e,r,t,i,n);var s=zf();return e.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,wt(r)?(s=!0,Ql(e)):s=!1,e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,bf(e),i.updater=ju,e.stateNode=i,i._reactInternals=e,gd(e,r,t,n),e=vd(null,e,r,!0,s,n)):(e.tag=0,ve&&s&&kf(e),ht(null,e,i,n),e=e.child),e;case 16:r=e.elementType;e:{switch(Il(t,e),t=e.pendingProps,i=r._init,r=i(r._payload),e.type=r,i=e.tag=u1(r),t=Qt(r,t),i){case 0:e=_d(null,e,r,t,n);break e;case 1:e=ly(null,e,r,t,n);break e;case 11:e=oy(null,e,r,t,n);break e;case 14:e=ay(null,e,r,Qt(r.type,t),n);break e}throw Error(U(306,r,""))}return e;case 0:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Qt(r,i),_d(t,e,r,i,n);case 1:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Qt(r,i),ly(t,e,r,i,n);case 3:e:{if(fw(e),t===null)throw Error(U(387));r=e.pendingProps,s=e.memoizedState,i=s.element,jE(t,e),eu(e,r,null,n);var o=e.memoizedState;if(r=o.element,s.isDehydrated)if(s={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){i=_s(Error(U(423)),e),e=uy(t,e,r,n,i);break e}else if(r!==i){i=_s(Error(U(424)),e),e=uy(t,e,r,n,i);break e}else for(Pt=vr(e.stateNode.containerInfo.firstChild),Dt=e,ve=!0,Xt=null,n=FE(e,null,r,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(ms(),r===i){e=Bn(t,e,n);break e}ht(t,e,r,n)}e=e.child}return e;case 5:return BE(e),t===null&&fd(e),r=e.type,i=e.pendingProps,s=t!==null?t.memoizedProps:null,o=i.children,ld(r,i)?o=null:s!==null&&ld(r,s)&&(e.flags|=32),dw(t,e),ht(t,e,o,n),e.child;case 6:return t===null&&fd(e),null;case 13:return pw(t,e,n);case 4:return Mf(e,e.stateNode.containerInfo),r=e.pendingProps,t===null?e.child=gs(e,null,r,n):ht(t,e,r,n),e.child;case 11:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Qt(r,i),oy(t,e,r,i,n);case 7:return ht(t,e,e.pendingProps,n),e.child;case 8:return ht(t,e,e.pendingProps.children,n),e.child;case 12:return ht(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(r=e.type._context,i=e.pendingProps,s=e.memoizedProps,o=i.value,fe(Jl,r._currentValue),r._currentValue=o,s!==null)if(tn(s.value,o)){if(s.children===i.children&&!Et.current){e=Bn(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var l=s.dependencies;if(l!==null){o=s.child;for(var u=l.firstContext;u!==null;){if(u.context===r){if(s.tag===1){u=Vn(-1,n&-n),u.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var d=c.pending;d===null?u.next=u:(u.next=d.next,d.next=u),c.pending=u}}s.lanes|=n,u=s.alternate,u!==null&&(u.lanes|=n),pd(s.return,n,e),l.lanes|=n;break}u=u.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(U(341));o.lanes|=n,l=o.alternate,l!==null&&(l.lanes|=n),pd(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}ht(t,e,i.children,n),e=e.child}return e;case 9:return i=e.type,r=e.pendingProps.children,os(e,n),i=$t(i),r=r(i),e.flags|=1,ht(t,e,r,n),e.child;case 14:return r=e.type,i=Qt(r,e.pendingProps),i=Qt(r.type,i),ay(t,e,r,i,n);case 15:return cw(t,e,e.type,e.pendingProps,n);case 17:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Qt(r,i),Il(t,e),e.tag=1,wt(r)?(t=!0,Ql(e)):t=!1,os(e,n),aw(e,r,i),gd(e,r,i,n),vd(null,e,r,!0,t,n);case 19:return mw(t,e,n);case 22:return hw(t,e,n)}throw Error(U(156,e.tag))};function Dw(t,e){return iE(t,e)}function l1(t,e,n,r){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function jt(t,e,n,r){return new l1(t,e,n,r)}function Jf(t){return t=t.prototype,!(!t||!t.isReactComponent)}function u1(t){if(typeof t=="function")return Jf(t)?1:0;if(t!=null){if(t=t.$$typeof,t===yf)return 11;if(t===_f)return 14}return 2}function Ir(t,e){var n=t.alternate;return n===null?(n=jt(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Rl(t,e,n,r,i,s){var o=2;if(r=t,typeof t=="function")Jf(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case $i:return li(n.children,i,s,e);case gf:o=8,i|=8;break;case jh:return t=jt(12,n,e,i|2),t.elementType=jh,t.lanes=s,t;case Bh:return t=jt(13,n,e,i),t.elementType=Bh,t.lanes=s,t;case zh:return t=jt(19,n,e,i),t.elementType=zh,t.lanes=s,t;case Bv:return $u(n,i,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Uv:o=10;break e;case jv:o=9;break e;case yf:o=11;break e;case _f:o=14;break e;case ir:o=16,r=null;break e}throw Error(U(130,t==null?t:typeof t,""))}return e=jt(o,n,e,i),e.elementType=t,e.type=r,e.lanes=s,e}function li(t,e,n,r){return t=jt(7,t,r,e),t.lanes=n,t}function $u(t,e,n,r){return t=jt(22,t,r,e),t.elementType=Bv,t.lanes=n,t.stateNode={isHidden:!1},t}function yh(t,e,n){return t=jt(6,t,null,e),t.lanes=n,t}function _h(t,e,n){return e=jt(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function c1(t,e,n,r,i){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Jc(0),this.expirationTimes=Jc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Jc(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function Zf(t,e,n,r,i,s,o,l,u){return t=new c1(t,e,n,l,u),e===1?(e=1,s===!0&&(e|=8)):e=0,s=jt(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},bf(s),t}function h1(t,e,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:zi,key:r==null?null:""+r,children:t,containerInfo:e,implementation:n}}function xw(t){if(!t)return kr;t=t._reactInternals;e:{if(Ri(t)!==t||t.tag!==1)throw Error(U(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(wt(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(U(171))}if(t.tag===1){var n=t.type;if(wt(n))return xE(t,n,e)}return e}function Ow(t,e,n,r,i,s,o,l,u){return t=Zf(n,r,!0,t,i,s,o,l,u),t.context=xw(null),n=t.current,r=dt(),i=Tr(n),s=Vn(r,i),s.callback=e??null,Er(n,s,i),t.current.lanes=i,pa(t,i,r),Tt(t,r),t}function Hu(t,e,n,r){var i=e.current,s=dt(),o=Tr(i);return n=xw(n),e.context===null?e.context=n:e.pendingContext=n,e=Vn(s,o),e.payload={element:t},r=r===void 0?null:r,r!==null&&(e.callback=r),t=Er(i,e,o),t!==null&&(en(t,i,o,s),El(t,i,o)),o}function lu(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function vy(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function ep(t,e){vy(t,e),(t=t.alternate)&&vy(t,e)}function d1(){return null}var Vw=typeof reportError=="function"?reportError:function(t){console.error(t)};function tp(t){this._internalRoot=t}qu.prototype.render=tp.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(U(409));Hu(t,e,null,null)};qu.prototype.unmount=tp.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;gi(function(){Hu(null,t,null,null)}),e[Un]=null}};function qu(t){this._internalRoot=t}qu.prototype.unstable_scheduleHydration=function(t){if(t){var e=hE();t={blockedOn:null,target:t,priority:e};for(var n=0;n<or.length&&e!==0&&e<or[n].priority;n++);or.splice(n,0,t),n===0&&fE(t)}};function np(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Wu(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Ey(){}function f1(t,e,n,r,i){if(i){if(typeof r=="function"){var s=r;r=function(){var c=lu(o);s.call(c)}}var o=Ow(e,r,t,0,null,!1,!1,"",Ey);return t._reactRootContainer=o,t[Un]=o.current,Qo(t.nodeType===8?t.parentNode:t),gi(),o}for(;i=t.lastChild;)t.removeChild(i);if(typeof r=="function"){var l=r;r=function(){var c=lu(u);l.call(c)}}var u=Zf(t,0,!1,null,null,!1,!1,"",Ey);return t._reactRootContainer=u,t[Un]=u.current,Qo(t.nodeType===8?t.parentNode:t),gi(function(){Hu(e,u,n,r)}),u}function Ku(t,e,n,r,i){var s=n._reactRootContainer;if(s){var o=s;if(typeof i=="function"){var l=i;i=function(){var u=lu(o);l.call(u)}}Hu(e,o,t,i)}else o=f1(n,e,t,i,r);return lu(o)}uE=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=yo(e.pendingLanes);n!==0&&(wf(e,n|1),Tt(e,Oe()),!(se&6)&&(vs=Oe()+500,Fr()))}break;case 13:gi(function(){var r=jn(t,1);if(r!==null){var i=dt();en(r,t,1,i)}}),ep(t,1)}};Tf=function(t){if(t.tag===13){var e=jn(t,134217728);if(e!==null){var n=dt();en(e,t,134217728,n)}ep(t,134217728)}};cE=function(t){if(t.tag===13){var e=Tr(t),n=jn(t,e);if(n!==null){var r=dt();en(n,t,e,r)}ep(t,e)}};hE=function(){return ue};dE=function(t,e){var n=ue;try{return ue=t,e()}finally{ue=n}};Jh=function(t,e,n){switch(e){case"input":if(qh(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var r=n[e];if(r!==t&&r.form===t.form){var i=Mu(r);if(!i)throw Error(U(90));$v(r),qh(r,i)}}}break;case"textarea":qv(t,n);break;case"select":e=n.value,e!=null&&ns(t,!!n.multiple,e,!1)}};Jv=Qf;Zv=gi;var p1={usingClientEntryPoint:!1,Events:[ga,Ki,Mu,Yv,Xv,Qf]},ho={findFiberByHostInstance:ni,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},m1={bundleType:ho.bundleType,version:ho.version,rendererPackageName:ho.rendererPackageName,rendererConfig:ho.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Gn.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=nE(t),t===null?null:t.stateNode},findFiberByHostInstance:ho.findFiberByHostInstance||d1,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var sl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!sl.isDisabled&&sl.supportsFiber)try{Ou=sl.inject(m1),fn=sl}catch{}}Vt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=p1;Vt.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!np(e))throw Error(U(200));return h1(t,e,null,n)};Vt.createRoot=function(t,e){if(!np(t))throw Error(U(299));var n=!1,r="",i=Vw;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(r=e.identifierPrefix),e.onRecoverableError!==void 0&&(i=e.onRecoverableError)),e=Zf(t,1,!1,null,null,n,!1,r,i),t[Un]=e.current,Qo(t.nodeType===8?t.parentNode:t),new tp(e)};Vt.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(U(188)):(t=Object.keys(t).join(","),Error(U(268,t)));return t=nE(e),t=t===null?null:t.stateNode,t};Vt.flushSync=function(t){return gi(t)};Vt.hydrate=function(t,e,n){if(!Wu(e))throw Error(U(200));return Ku(null,t,e,!0,n)};Vt.hydrateRoot=function(t,e,n){if(!np(t))throw Error(U(405));var r=n!=null&&n.hydratedSources||null,i=!1,s="",o=Vw;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=Ow(e,null,t,1,n??null,i,!1,s,o),t[Un]=e.current,Qo(t),r)for(t=0;t<r.length;t++)n=r[t],i=n._getVersion,i=i(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,i]:e.mutableSourceEagerHydrationData.push(n,i);return new qu(e)};Vt.render=function(t,e,n){if(!Wu(e))throw Error(U(200));return Ku(null,t,e,!1,n)};Vt.unmountComponentAtNode=function(t){if(!Wu(t))throw Error(U(40));return t._reactRootContainer?(gi(function(){Ku(null,null,t,!1,function(){t._reactRootContainer=null,t[Un]=null})}),!0):!1};Vt.unstable_batchedUpdates=Qf;Vt.unstable_renderSubtreeIntoContainer=function(t,e,n,r){if(!Wu(n))throw Error(U(200));if(t==null||t._reactInternals===void 0)throw Error(U(38));return Ku(t,e,n,!1,r)};Vt.version="18.3.1-next-f1338f8080-20240426";function Lw(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Lw)}catch(t){console.error(t)}}Lw(),Lv.exports=Vt;var g1=Lv.exports,bw,wy=g1;bw=wy.createRoot,wy.hydrateRoot;const y1="modulepreload",_1=function(t){return"/"+t},Ty={},oe=function(e,n,r){let i=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),l=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));i=Promise.allSettled(n.map(u=>{if(u=_1(u),u in Ty)return;Ty[u]=!0;const c=u.endsWith(".css"),d=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${d}`))return;const p=document.createElement("link");if(p.rel=c?"stylesheet":y1,c||(p.as="script"),p.crossOrigin="",p.href=u,l&&p.setAttribute("nonce",l),document.head.appendChild(p),c)return new Promise((m,T)=>{p.addEventListener("load",m),p.addEventListener("error",()=>T(new Error(`Unable to preload CSS for ${u}`)))})}))}function s(o){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=o,window.dispatchEvent(l),!l.defaultPrevented)throw o}return i.then(o=>{for(const l of o||[])l.status==="rejected"&&s(l.reason);return e().catch(s)})};/**
 * react-router v7.8.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */var Iy="popstate";function v1(t={}){function e(r,i){let{pathname:s,search:o,hash:l}=r.location;return Dd("",{pathname:s,search:o,hash:l},i.state&&i.state.usr||null,i.state&&i.state.key||"default")}function n(r,i){return typeof i=="string"?i:ia(i)}return w1(e,n,null,t)}function Te(t,e){if(t===!1||t===null||typeof t>"u")throw new Error(e)}function wn(t,e){if(!t){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function E1(){return Math.random().toString(36).substring(2,10)}function Sy(t,e){return{usr:t.state,key:t.key,idx:e}}function Dd(t,e,n=null,r){return{pathname:typeof t=="string"?t:t.pathname,search:"",hash:"",...typeof e=="string"?Ds(e):e,state:n,key:e&&e.key||r||E1()}}function ia({pathname:t="/",search:e="",hash:n=""}){return e&&e!=="?"&&(t+=e.charAt(0)==="?"?e:"?"+e),n&&n!=="#"&&(t+=n.charAt(0)==="#"?n:"#"+n),t}function Ds(t){let e={};if(t){let n=t.indexOf("#");n>=0&&(e.hash=t.substring(n),t=t.substring(0,n));let r=t.indexOf("?");r>=0&&(e.search=t.substring(r),t=t.substring(0,r)),t&&(e.pathname=t)}return e}function w1(t,e,n,r={}){let{window:i=document.defaultView,v5Compat:s=!1}=r,o=i.history,l="POP",u=null,c=d();c==null&&(c=0,o.replaceState({...o.state,idx:c},""));function d(){return(o.state||{idx:null}).idx}function p(){l="POP";let D=d(),v=D==null?null:D-c;c=D,u&&u({action:l,location:P.location,delta:v})}function m(D,v){l="PUSH";let _=Dd(P.location,D,v);c=d()+1;let I=Sy(_,c),x=P.createHref(_);try{o.pushState(I,"",x)}catch(F){if(F instanceof DOMException&&F.name==="DataCloneError")throw F;i.location.assign(x)}s&&u&&u({action:l,location:P.location,delta:1})}function T(D,v){l="REPLACE";let _=Dd(P.location,D,v);c=d();let I=Sy(_,c),x=P.createHref(_);o.replaceState(I,"",x),s&&u&&u({action:l,location:P.location,delta:0})}function C(D){return T1(D)}let P={get action(){return l},get location(){return t(i,o)},listen(D){if(u)throw new Error("A history only accepts one active listener");return i.addEventListener(Iy,p),u=D,()=>{i.removeEventListener(Iy,p),u=null}},createHref(D){return e(i,D)},createURL:C,encodeLocation(D){let v=C(D);return{pathname:v.pathname,search:v.search,hash:v.hash}},push:m,replace:T,go(D){return o.go(D)}};return P}function T1(t,e=!1){let n="http://localhost";typeof window<"u"&&(n=window.location.origin!=="null"?window.location.origin:window.location.href),Te(n,"No window.location.(origin|href) available to create URL");let r=typeof t=="string"?t:ia(t);return r=r.replace(/ $/,"%20"),!e&&r.startsWith("//")&&(r=n+r),new URL(r,n)}function Mw(t,e,n="/"){return I1(t,e,n,!1)}function I1(t,e,n,r){let i=typeof e=="string"?Ds(e):e,s=zn(i.pathname||"/",n);if(s==null)return null;let o=Fw(t);S1(o);let l=null;for(let u=0;l==null&&u<o.length;++u){let c=L1(s);l=O1(o[u],c,r)}return l}function Fw(t,e=[],n=[],r="",i=!1){let s=(o,l,u=i,c)=>{let d={relativePath:c===void 0?o.path||"":c,caseSensitive:o.caseSensitive===!0,childrenIndex:l,route:o};if(d.relativePath.startsWith("/")){if(!d.relativePath.startsWith(r)&&u)return;Te(d.relativePath.startsWith(r),`Absolute route path "${d.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),d.relativePath=d.relativePath.slice(r.length)}let p=Ln([r,d.relativePath]),m=n.concat(d);o.children&&o.children.length>0&&(Te(o.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${p}".`),Fw(o.children,e,m,p,u)),!(o.path==null&&!o.index)&&e.push({path:p,score:D1(p,o.index),routesMeta:m})};return t.forEach((o,l)=>{var u;if(o.path===""||!((u=o.path)!=null&&u.includes("?")))s(o,l);else for(let c of Uw(o.path))s(o,l,!0,c)}),e}function Uw(t){let e=t.split("/");if(e.length===0)return[];let[n,...r]=e,i=n.endsWith("?"),s=n.replace(/\?$/,"");if(r.length===0)return i?[s,""]:[s];let o=Uw(r.join("/")),l=[];return l.push(...o.map(u=>u===""?s:[s,u].join("/"))),i&&l.push(...o),l.map(u=>t.startsWith("/")&&u===""?"/":u)}function S1(t){t.sort((e,n)=>e.score!==n.score?n.score-e.score:x1(e.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}var A1=/^:[\w-]+$/,R1=3,C1=2,P1=1,k1=10,N1=-2,Ay=t=>t==="*";function D1(t,e){let n=t.split("/"),r=n.length;return n.some(Ay)&&(r+=N1),e&&(r+=C1),n.filter(i=>!Ay(i)).reduce((i,s)=>i+(A1.test(s)?R1:s===""?P1:k1),r)}function x1(t,e){return t.length===e.length&&t.slice(0,-1).every((r,i)=>r===e[i])?t[t.length-1]-e[e.length-1]:0}function O1(t,e,n=!1){let{routesMeta:r}=t,i={},s="/",o=[];for(let l=0;l<r.length;++l){let u=r[l],c=l===r.length-1,d=s==="/"?e:e.slice(s.length)||"/",p=uu({path:u.relativePath,caseSensitive:u.caseSensitive,end:c},d),m=u.route;if(!p&&c&&n&&!r[r.length-1].route.index&&(p=uu({path:u.relativePath,caseSensitive:u.caseSensitive,end:!1},d)),!p)return null;Object.assign(i,p.params),o.push({params:i,pathname:Ln([s,p.pathname]),pathnameBase:U1(Ln([s,p.pathnameBase])),route:m}),p.pathnameBase!=="/"&&(s=Ln([s,p.pathnameBase]))}return o}function uu(t,e){typeof t=="string"&&(t={path:t,caseSensitive:!1,end:!0});let[n,r]=V1(t.path,t.caseSensitive,t.end),i=e.match(n);if(!i)return null;let s=i[0],o=s.replace(/(.)\/+$/,"$1"),l=i.slice(1);return{params:r.reduce((c,{paramName:d,isOptional:p},m)=>{if(d==="*"){let C=l[m]||"";o=s.slice(0,s.length-C.length).replace(/(.)\/+$/,"$1")}const T=l[m];return p&&!T?c[d]=void 0:c[d]=(T||"").replace(/%2F/g,"/"),c},{}),pathname:s,pathnameBase:o,pattern:t}}function V1(t,e=!1,n=!0){wn(t==="*"||!t.endsWith("*")||t.endsWith("/*"),`Route path "${t}" will be treated as if it were "${t.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${t.replace(/\*$/,"/*")}".`);let r=[],i="^"+t.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,l,u)=>(r.push({paramName:l,isOptional:u!=null}),u?"/?([^\\/]+)?":"/([^\\/]+)")).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return t.endsWith("*")?(r.push({paramName:"*"}),i+=t==="*"||t==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?i+="\\/*$":t!==""&&t!=="/"&&(i+="(?:(?=\\/|$))"),[new RegExp(i,e?void 0:"i"),r]}function L1(t){try{return t.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return wn(!1,`The URL path "${t}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${e}).`),t}}function zn(t,e){if(e==="/")return t;if(!t.toLowerCase().startsWith(e.toLowerCase()))return null;let n=e.endsWith("/")?e.length-1:e.length,r=t.charAt(n);return r&&r!=="/"?null:t.slice(n)||"/"}function b1(t,e="/"){let{pathname:n,search:r="",hash:i=""}=typeof t=="string"?Ds(t):t;return{pathname:n?n.startsWith("/")?n:M1(n,e):e,search:j1(r),hash:B1(i)}}function M1(t,e){let n=e.replace(/\/+$/,"").split("/");return t.split("/").forEach(i=>{i===".."?n.length>1&&n.pop():i!=="."&&n.push(i)}),n.length>1?n.join("/"):"/"}function vh(t,e,n,r){return`Cannot include a '${t}' character in a manually specified \`to.${e}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function F1(t){return t.filter((e,n)=>n===0||e.route.path&&e.route.path.length>0)}function jw(t){let e=F1(t);return e.map((n,r)=>r===e.length-1?n.pathname:n.pathnameBase)}function Bw(t,e,n,r=!1){let i;typeof t=="string"?i=Ds(t):(i={...t},Te(!i.pathname||!i.pathname.includes("?"),vh("?","pathname","search",i)),Te(!i.pathname||!i.pathname.includes("#"),vh("#","pathname","hash",i)),Te(!i.search||!i.search.includes("#"),vh("#","search","hash",i)));let s=t===""||i.pathname==="",o=s?"/":i.pathname,l;if(o==null)l=n;else{let p=e.length-1;if(!r&&o.startsWith("..")){let m=o.split("/");for(;m[0]==="..";)m.shift(),p-=1;i.pathname=m.join("/")}l=p>=0?e[p]:"/"}let u=b1(i,l),c=o&&o!=="/"&&o.endsWith("/"),d=(s||o===".")&&n.endsWith("/");return!u.pathname.endsWith("/")&&(c||d)&&(u.pathname+="/"),u}var Ln=t=>t.join("/").replace(/\/\/+/g,"/"),U1=t=>t.replace(/\/+$/,"").replace(/^\/*/,"/"),j1=t=>!t||t==="?"?"":t.startsWith("?")?t:"?"+t,B1=t=>!t||t==="#"?"":t.startsWith("#")?t:"#"+t;function z1(t){return t!=null&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.internal=="boolean"&&"data"in t}var zw=["POST","PUT","PATCH","DELETE"];new Set(zw);var $1=["GET",...zw];new Set($1);var xs=V.createContext(null);xs.displayName="DataRouter";var Gu=V.createContext(null);Gu.displayName="DataRouterState";V.createContext(!1);var $w=V.createContext({isTransitioning:!1});$w.displayName="ViewTransition";var H1=V.createContext(new Map);H1.displayName="Fetchers";var q1=V.createContext(null);q1.displayName="Await";var Sn=V.createContext(null);Sn.displayName="Navigation";var _a=V.createContext(null);_a.displayName="Location";var An=V.createContext({outlet:null,matches:[],isDataRoute:!1});An.displayName="Route";var rp=V.createContext(null);rp.displayName="RouteError";function W1(t,{relative:e}={}){Te(va(),"useHref() may be used only in the context of a <Router> component.");let{basename:n,navigator:r}=V.useContext(Sn),{hash:i,pathname:s,search:o}=Ea(t,{relative:e}),l=s;return n!=="/"&&(l=s==="/"?n:Ln([n,s])),r.createHref({pathname:l,search:o,hash:i})}function va(){return V.useContext(_a)!=null}function Ur(){return Te(va(),"useLocation() may be used only in the context of a <Router> component."),V.useContext(_a).location}var Hw="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function qw(t){V.useContext(Sn).static||V.useLayoutEffect(t)}function K1(){let{isDataRoute:t}=V.useContext(An);return t?oC():G1()}function G1(){Te(va(),"useNavigate() may be used only in the context of a <Router> component.");let t=V.useContext(xs),{basename:e,navigator:n}=V.useContext(Sn),{matches:r}=V.useContext(An),{pathname:i}=Ur(),s=JSON.stringify(jw(r)),o=V.useRef(!1);return qw(()=>{o.current=!0}),V.useCallback((u,c={})=>{if(wn(o.current,Hw),!o.current)return;if(typeof u=="number"){n.go(u);return}let d=Bw(u,JSON.parse(s),i,c.relative==="path");t==null&&e!=="/"&&(d.pathname=d.pathname==="/"?e:Ln([e,d.pathname])),(c.replace?n.replace:n.push)(d,c.state,c)},[e,n,s,i,t])}V.createContext(null);function oM(){let{matches:t}=V.useContext(An),e=t[t.length-1];return e?e.params:{}}function Ea(t,{relative:e}={}){let{matches:n}=V.useContext(An),{pathname:r}=Ur(),i=JSON.stringify(jw(n));return V.useMemo(()=>Bw(t,JSON.parse(i),r,e==="path"),[t,i,r,e])}function Q1(t,e){return Ww(t,e)}function Ww(t,e,n,r){var v;Te(va(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:i}=V.useContext(Sn),{matches:s}=V.useContext(An),o=s[s.length-1],l=o?o.params:{},u=o?o.pathname:"/",c=o?o.pathnameBase:"/",d=o&&o.route;{let _=d&&d.path||"";Kw(u,!d||_.endsWith("*")||_.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${u}" (under <Route path="${_}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${_}"> to <Route path="${_==="/"?"*":`${_}/*`}">.`)}let p=Ur(),m;if(e){let _=typeof e=="string"?Ds(e):e;Te(c==="/"||((v=_.pathname)==null?void 0:v.startsWith(c)),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c}" but pathname "${_.pathname}" was given in the \`location\` prop.`),m=_}else m=p;let T=m.pathname||"/",C=T;if(c!=="/"){let _=c.replace(/^\//,"").split("/");C="/"+T.replace(/^\//,"").split("/").slice(_.length).join("/")}let P=Mw(t,{pathname:C});wn(d||P!=null,`No routes matched location "${m.pathname}${m.search}${m.hash}" `),wn(P==null||P[P.length-1].route.element!==void 0||P[P.length-1].route.Component!==void 0||P[P.length-1].route.lazy!==void 0,`Matched leaf route at location "${m.pathname}${m.search}${m.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let D=eC(P&&P.map(_=>Object.assign({},_,{params:Object.assign({},l,_.params),pathname:Ln([c,i.encodeLocation?i.encodeLocation(_.pathname).pathname:_.pathname]),pathnameBase:_.pathnameBase==="/"?c:Ln([c,i.encodeLocation?i.encodeLocation(_.pathnameBase).pathname:_.pathnameBase])})),s,n,r);return e&&D?V.createElement(_a.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",...m},navigationType:"POP"}},D):D}function Y1(){let t=sC(),e=z1(t)?`${t.status} ${t.statusText}`:t instanceof Error?t.message:JSON.stringify(t),n=t instanceof Error?t.stack:null,r="rgba(200,200,200, 0.5)",i={padding:"0.5rem",backgroundColor:r},s={padding:"2px 4px",backgroundColor:r},o=null;return console.error("Error handled by React Router default ErrorBoundary:",t),o=V.createElement(V.Fragment,null,V.createElement("p",null,"💿 Hey developer 👋"),V.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",V.createElement("code",{style:s},"ErrorBoundary")," or"," ",V.createElement("code",{style:s},"errorElement")," prop on your route.")),V.createElement(V.Fragment,null,V.createElement("h2",null,"Unexpected Application Error!"),V.createElement("h3",{style:{fontStyle:"italic"}},e),n?V.createElement("pre",{style:i},n):null,o)}var X1=V.createElement(Y1,null),J1=class extends V.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,e){return e.location!==t.location||e.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:e.error,location:e.location,revalidation:t.revalidation||e.revalidation}}componentDidCatch(t,e){console.error("React Router caught the following error during render",t,e)}render(){return this.state.error!==void 0?V.createElement(An.Provider,{value:this.props.routeContext},V.createElement(rp.Provider,{value:this.state.error,children:this.props.component})):this.props.children}};function Z1({routeContext:t,match:e,children:n}){let r=V.useContext(xs);return r&&r.static&&r.staticContext&&(e.route.errorElement||e.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=e.route.id),V.createElement(An.Provider,{value:t},n)}function eC(t,e=[],n=null,r=null){if(t==null){if(!n)return null;if(n.errors)t=n.matches;else if(e.length===0&&!n.initialized&&n.matches.length>0)t=n.matches;else return null}let i=t,s=n==null?void 0:n.errors;if(s!=null){let u=i.findIndex(c=>c.route.id&&(s==null?void 0:s[c.route.id])!==void 0);Te(u>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(s).join(",")}`),i=i.slice(0,Math.min(i.length,u+1))}let o=!1,l=-1;if(n)for(let u=0;u<i.length;u++){let c=i[u];if((c.route.HydrateFallback||c.route.hydrateFallbackElement)&&(l=u),c.route.id){let{loaderData:d,errors:p}=n,m=c.route.loader&&!d.hasOwnProperty(c.route.id)&&(!p||p[c.route.id]===void 0);if(c.route.lazy||m){o=!0,l>=0?i=i.slice(0,l+1):i=[i[0]];break}}}return i.reduceRight((u,c,d)=>{let p,m=!1,T=null,C=null;n&&(p=s&&c.route.id?s[c.route.id]:void 0,T=c.route.errorElement||X1,o&&(l<0&&d===0?(Kw("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),m=!0,C=null):l===d&&(m=!0,C=c.route.hydrateFallbackElement||null)));let P=e.concat(i.slice(0,d+1)),D=()=>{let v;return p?v=T:m?v=C:c.route.Component?v=V.createElement(c.route.Component,null):c.route.element?v=c.route.element:v=u,V.createElement(Z1,{match:c,routeContext:{outlet:u,matches:P,isDataRoute:n!=null},children:v})};return n&&(c.route.ErrorBoundary||c.route.errorElement||d===0)?V.createElement(J1,{location:n.location,revalidation:n.revalidation,component:T,error:p,children:D(),routeContext:{outlet:null,matches:P,isDataRoute:!0}}):D()},null)}function ip(t){return`${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function tC(t){let e=V.useContext(xs);return Te(e,ip(t)),e}function nC(t){let e=V.useContext(Gu);return Te(e,ip(t)),e}function rC(t){let e=V.useContext(An);return Te(e,ip(t)),e}function sp(t){let e=rC(t),n=e.matches[e.matches.length-1];return Te(n.route.id,`${t} can only be used on routes that contain a unique "id"`),n.route.id}function iC(){return sp("useRouteId")}function sC(){var r;let t=V.useContext(rp),e=nC("useRouteError"),n=sp("useRouteError");return t!==void 0?t:(r=e.errors)==null?void 0:r[n]}function oC(){let{router:t}=tC("useNavigate"),e=sp("useNavigate"),n=V.useRef(!1);return qw(()=>{n.current=!0}),V.useCallback(async(i,s={})=>{wn(n.current,Hw),n.current&&(typeof i=="number"?t.navigate(i):await t.navigate(i,{fromRouteId:e,...s}))},[t,e])}var Ry={};function Kw(t,e,n){!e&&!Ry[t]&&(Ry[t]=!0,wn(!1,n))}V.memo(aC);function aC({routes:t,future:e,state:n}){return Ww(t,void 0,n,e)}function Re(t){Te(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function lC({basename:t="/",children:e=null,location:n,navigationType:r="POP",navigator:i,static:s=!1}){Te(!va(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let o=t.replace(/^\/*/,"/"),l=V.useMemo(()=>({basename:o,navigator:i,static:s,future:{}}),[o,i,s]);typeof n=="string"&&(n=Ds(n));let{pathname:u="/",search:c="",hash:d="",state:p=null,key:m="default"}=n,T=V.useMemo(()=>{let C=zn(u,o);return C==null?null:{location:{pathname:C,search:c,hash:d,state:p,key:m},navigationType:r}},[o,u,c,d,p,m,r]);return wn(T!=null,`<Router basename="${o}"> is not able to match the URL "${u}${c}${d}" because it does not start with the basename, so the <Router> won't render anything.`),T==null?null:V.createElement(Sn.Provider,{value:l},V.createElement(_a.Provider,{children:e,value:T}))}function uC({children:t,location:e}){return Q1(xd(t),e)}function xd(t,e=[]){let n=[];return V.Children.forEach(t,(r,i)=>{if(!V.isValidElement(r))return;let s=[...e,i];if(r.type===V.Fragment){n.push.apply(n,xd(r.props.children,s));return}Te(r.type===Re,`[${typeof r.type=="string"?r.type:r.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),Te(!r.props.index||!r.props.children,"An index route cannot have child routes.");let o={id:r.props.id||s.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,hydrateFallbackElement:r.props.hydrateFallbackElement,HydrateFallback:r.props.HydrateFallback,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.hasErrorBoundary===!0||r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(o.children=xd(r.props.children,s)),n.push(o)}),n}var Cl="get",Pl="application/x-www-form-urlencoded";function Qu(t){return t!=null&&typeof t.tagName=="string"}function cC(t){return Qu(t)&&t.tagName.toLowerCase()==="button"}function hC(t){return Qu(t)&&t.tagName.toLowerCase()==="form"}function dC(t){return Qu(t)&&t.tagName.toLowerCase()==="input"}function fC(t){return!!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}function pC(t,e){return t.button===0&&(!e||e==="_self")&&!fC(t)}var ol=null;function mC(){if(ol===null)try{new FormData(document.createElement("form"),0),ol=!1}catch{ol=!0}return ol}var gC=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function Eh(t){return t!=null&&!gC.has(t)?(wn(!1,`"${t}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Pl}"`),null):t}function yC(t,e){let n,r,i,s,o;if(hC(t)){let l=t.getAttribute("action");r=l?zn(l,e):null,n=t.getAttribute("method")||Cl,i=Eh(t.getAttribute("enctype"))||Pl,s=new FormData(t)}else if(cC(t)||dC(t)&&(t.type==="submit"||t.type==="image")){let l=t.form;if(l==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let u=t.getAttribute("formaction")||l.getAttribute("action");if(r=u?zn(u,e):null,n=t.getAttribute("formmethod")||l.getAttribute("method")||Cl,i=Eh(t.getAttribute("formenctype"))||Eh(l.getAttribute("enctype"))||Pl,s=new FormData(l,t),!mC()){let{name:c,type:d,value:p}=t;if(d==="image"){let m=c?`${c}.`:"";s.append(`${m}x`,"0"),s.append(`${m}y`,"0")}else c&&s.append(c,p)}}else{if(Qu(t))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');n=Cl,r=null,i=Pl,o=t}return s&&i==="text/plain"&&(o=s,s=void 0),{action:r,method:n.toLowerCase(),encType:i,formData:s,body:o}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function op(t,e){if(t===!1||t===null||typeof t>"u")throw new Error(e)}function _C(t,e,n){let r=typeof t=="string"?new URL(t,typeof window>"u"?"server://singlefetch/":window.location.origin):t;return r.pathname==="/"?r.pathname=`_root.${n}`:e&&zn(r.pathname,e)==="/"?r.pathname=`${e.replace(/\/$/,"")}/_root.${n}`:r.pathname=`${r.pathname.replace(/\/$/,"")}.${n}`,r}async function vC(t,e){if(t.id in e)return e[t.id];try{let n=await import(t.module);return e[t.id]=n,n}catch(n){return console.error(`Error loading route module \`${t.module}\`, reloading page...`),console.error(n),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function EC(t){return t==null?!1:t.href==null?t.rel==="preload"&&typeof t.imageSrcSet=="string"&&typeof t.imageSizes=="string":typeof t.rel=="string"&&typeof t.href=="string"}async function wC(t,e,n){let r=await Promise.all(t.map(async i=>{let s=e.routes[i.route.id];if(s){let o=await vC(s,n);return o.links?o.links():[]}return[]}));return AC(r.flat(1).filter(EC).filter(i=>i.rel==="stylesheet"||i.rel==="preload").map(i=>i.rel==="stylesheet"?{...i,rel:"prefetch",as:"style"}:{...i,rel:"prefetch"}))}function Cy(t,e,n,r,i,s){let o=(u,c)=>n[c]?u.route.id!==n[c].route.id:!0,l=(u,c)=>{var d;return n[c].pathname!==u.pathname||((d=n[c].route.path)==null?void 0:d.endsWith("*"))&&n[c].params["*"]!==u.params["*"]};return s==="assets"?e.filter((u,c)=>o(u,c)||l(u,c)):s==="data"?e.filter((u,c)=>{var p;let d=r.routes[u.route.id];if(!d||!d.hasLoader)return!1;if(o(u,c)||l(u,c))return!0;if(u.route.shouldRevalidate){let m=u.route.shouldRevalidate({currentUrl:new URL(i.pathname+i.search+i.hash,window.origin),currentParams:((p=n[0])==null?void 0:p.params)||{},nextUrl:new URL(t,window.origin),nextParams:u.params,defaultShouldRevalidate:!0});if(typeof m=="boolean")return m}return!0}):[]}function TC(t,e,{includeHydrateFallback:n}={}){return IC(t.map(r=>{let i=e.routes[r.route.id];if(!i)return[];let s=[i.module];return i.clientActionModule&&(s=s.concat(i.clientActionModule)),i.clientLoaderModule&&(s=s.concat(i.clientLoaderModule)),n&&i.hydrateFallbackModule&&(s=s.concat(i.hydrateFallbackModule)),i.imports&&(s=s.concat(i.imports)),s}).flat(1))}function IC(t){return[...new Set(t)]}function SC(t){let e={},n=Object.keys(t).sort();for(let r of n)e[r]=t[r];return e}function AC(t,e){let n=new Set;return new Set(e),t.reduce((r,i)=>{let s=JSON.stringify(SC(i));return n.has(s)||(n.add(s),r.push({key:s,link:i})),r},[])}function Gw(){let t=V.useContext(xs);return op(t,"You must render this element inside a <DataRouterContext.Provider> element"),t}function RC(){let t=V.useContext(Gu);return op(t,"You must render this element inside a <DataRouterStateContext.Provider> element"),t}var ap=V.createContext(void 0);ap.displayName="FrameworkContext";function Qw(){let t=V.useContext(ap);return op(t,"You must render this element inside a <HydratedRouter> element"),t}function CC(t,e){let n=V.useContext(ap),[r,i]=V.useState(!1),[s,o]=V.useState(!1),{onFocus:l,onBlur:u,onMouseEnter:c,onMouseLeave:d,onTouchStart:p}=e,m=V.useRef(null);V.useEffect(()=>{if(t==="render"&&o(!0),t==="viewport"){let P=v=>{v.forEach(_=>{o(_.isIntersecting)})},D=new IntersectionObserver(P,{threshold:.5});return m.current&&D.observe(m.current),()=>{D.disconnect()}}},[t]),V.useEffect(()=>{if(r){let P=setTimeout(()=>{o(!0)},100);return()=>{clearTimeout(P)}}},[r]);let T=()=>{i(!0)},C=()=>{i(!1),o(!1)};return n?t!=="intent"?[s,m,{}]:[s,m,{onFocus:fo(l,T),onBlur:fo(u,C),onMouseEnter:fo(c,T),onMouseLeave:fo(d,C),onTouchStart:fo(p,T)}]:[!1,m,{}]}function fo(t,e){return n=>{t&&t(n),n.defaultPrevented||e(n)}}function PC({page:t,...e}){let{router:n}=Gw(),r=V.useMemo(()=>Mw(n.routes,t,n.basename),[n.routes,t,n.basename]);return r?V.createElement(NC,{page:t,matches:r,...e}):null}function kC(t){let{manifest:e,routeModules:n}=Qw(),[r,i]=V.useState([]);return V.useEffect(()=>{let s=!1;return wC(t,e,n).then(o=>{s||i(o)}),()=>{s=!0}},[t,e,n]),r}function NC({page:t,matches:e,...n}){let r=Ur(),{manifest:i,routeModules:s}=Qw(),{basename:o}=Gw(),{loaderData:l,matches:u}=RC(),c=V.useMemo(()=>Cy(t,e,u,i,r,"data"),[t,e,u,i,r]),d=V.useMemo(()=>Cy(t,e,u,i,r,"assets"),[t,e,u,i,r]),p=V.useMemo(()=>{if(t===r.pathname+r.search+r.hash)return[];let C=new Set,P=!1;if(e.forEach(v=>{var I;let _=i.routes[v.route.id];!_||!_.hasLoader||(!c.some(x=>x.route.id===v.route.id)&&v.route.id in l&&((I=s[v.route.id])!=null&&I.shouldRevalidate)||_.hasClientLoader?P=!0:C.add(v.route.id))}),C.size===0)return[];let D=_C(t,o,"data");return P&&C.size>0&&D.searchParams.set("_routes",e.filter(v=>C.has(v.route.id)).map(v=>v.route.id).join(",")),[D.pathname+D.search]},[o,l,r,i,c,e,t,s]),m=V.useMemo(()=>TC(d,i),[d,i]),T=kC(d);return V.createElement(V.Fragment,null,p.map(C=>V.createElement("link",{key:C,rel:"prefetch",as:"fetch",href:C,...n})),m.map(C=>V.createElement("link",{key:C,rel:"modulepreload",href:C,...n})),T.map(({key:C,link:P})=>V.createElement("link",{key:C,nonce:n.nonce,...P})))}function DC(...t){return e=>{t.forEach(n=>{typeof n=="function"?n(e):n!=null&&(n.current=e)})}}var Yw=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{Yw&&(window.__reactRouterVersion="7.8.1")}catch{}function xC({basename:t,children:e,window:n}){let r=V.useRef();r.current==null&&(r.current=v1({window:n,v5Compat:!0}));let i=r.current,[s,o]=V.useState({action:i.action,location:i.location}),l=V.useCallback(u=>{V.startTransition(()=>o(u))},[o]);return V.useLayoutEffect(()=>i.listen(l),[i,l]),V.createElement(lC,{basename:t,children:e,location:s.location,navigationType:s.action,navigator:i})}var Xw=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Jw=V.forwardRef(function({onClick:e,discover:n="render",prefetch:r="none",relative:i,reloadDocument:s,replace:o,state:l,target:u,to:c,preventScrollReset:d,viewTransition:p,...m},T){let{basename:C}=V.useContext(Sn),P=typeof c=="string"&&Xw.test(c),D,v=!1;if(typeof c=="string"&&P&&(D=c,Yw))try{let w=new URL(window.location.href),A=c.startsWith("//")?new URL(w.protocol+c):new URL(c),R=zn(A.pathname,C);A.origin===w.origin&&R!=null?c=R+A.search+A.hash:v=!0}catch{wn(!1,`<Link to="${c}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}let _=W1(c,{relative:i}),[I,x,F]=CC(r,m),j=bC(c,{replace:o,state:l,target:u,preventScrollReset:d,relative:i,viewTransition:p});function E(w){e&&e(w),w.defaultPrevented||j(w)}let y=V.createElement("a",{...m,...F,href:D||_,onClick:v||s?e:E,ref:DC(T,x),target:u,"data-discover":!P&&n==="render"?"true":void 0});return I&&!P?V.createElement(V.Fragment,null,y,V.createElement(PC,{page:_})):y});Jw.displayName="Link";var OC=V.forwardRef(function({"aria-current":e="page",caseSensitive:n=!1,className:r="",end:i=!1,style:s,to:o,viewTransition:l,children:u,...c},d){let p=Ea(o,{relative:c.relative}),m=Ur(),T=V.useContext(Gu),{navigator:C,basename:P}=V.useContext(Sn),D=T!=null&&BC(p)&&l===!0,v=C.encodeLocation?C.encodeLocation(p).pathname:p.pathname,_=m.pathname,I=T&&T.navigation&&T.navigation.location?T.navigation.location.pathname:null;n||(_=_.toLowerCase(),I=I?I.toLowerCase():null,v=v.toLowerCase()),I&&P&&(I=zn(I,P)||I);const x=v!=="/"&&v.endsWith("/")?v.length-1:v.length;let F=_===v||!i&&_.startsWith(v)&&_.charAt(x)==="/",j=I!=null&&(I===v||!i&&I.startsWith(v)&&I.charAt(v.length)==="/"),E={isActive:F,isPending:j,isTransitioning:D},y=F?e:void 0,w;typeof r=="function"?w=r(E):w=[r,F?"active":null,j?"pending":null,D?"transitioning":null].filter(Boolean).join(" ");let A=typeof s=="function"?s(E):s;return V.createElement(Jw,{...c,"aria-current":y,className:w,ref:d,style:A,to:o,viewTransition:l},typeof u=="function"?u(E):u)});OC.displayName="NavLink";var VC=V.forwardRef(({discover:t="render",fetcherKey:e,navigate:n,reloadDocument:r,replace:i,state:s,method:o=Cl,action:l,onSubmit:u,relative:c,preventScrollReset:d,viewTransition:p,...m},T)=>{let C=UC(),P=jC(l,{relative:c}),D=o.toLowerCase()==="get"?"get":"post",v=typeof l=="string"&&Xw.test(l),_=I=>{if(u&&u(I),I.defaultPrevented)return;I.preventDefault();let x=I.nativeEvent.submitter,F=(x==null?void 0:x.getAttribute("formmethod"))||o;C(x||I.currentTarget,{fetcherKey:e,method:F,navigate:n,replace:i,state:s,relative:c,preventScrollReset:d,viewTransition:p})};return V.createElement("form",{ref:T,method:D,action:P,onSubmit:r?u:_,...m,"data-discover":!v&&t==="render"?"true":void 0})});VC.displayName="Form";function LC(t){return`${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Zw(t){let e=V.useContext(xs);return Te(e,LC(t)),e}function bC(t,{target:e,replace:n,state:r,preventScrollReset:i,relative:s,viewTransition:o}={}){let l=K1(),u=Ur(),c=Ea(t,{relative:s});return V.useCallback(d=>{if(pC(d,e)){d.preventDefault();let p=n!==void 0?n:ia(u)===ia(c);l(t,{replace:p,state:r,preventScrollReset:i,relative:s,viewTransition:o})}},[u,l,c,n,r,e,t,i,s,o])}var MC=0,FC=()=>`__${String(++MC)}__`;function UC(){let{router:t}=Zw("useSubmit"),{basename:e}=V.useContext(Sn),n=iC();return V.useCallback(async(r,i={})=>{let{action:s,method:o,encType:l,formData:u,body:c}=yC(r,e);if(i.navigate===!1){let d=i.fetcherKey||FC();await t.fetch(d,n,i.action||s,{preventScrollReset:i.preventScrollReset,formData:u,body:c,formMethod:i.method||o,formEncType:i.encType||l,flushSync:i.flushSync})}else await t.navigate(i.action||s,{preventScrollReset:i.preventScrollReset,formData:u,body:c,formMethod:i.method||o,formEncType:i.encType||l,replace:i.replace,state:i.state,fromRouteId:n,flushSync:i.flushSync,viewTransition:i.viewTransition})},[t,e,n])}function jC(t,{relative:e}={}){let{basename:n}=V.useContext(Sn),r=V.useContext(An);Te(r,"useFormAction must be used inside a RouteContext");let[i]=r.matches.slice(-1),s={...Ea(t||".",{relative:e})},o=Ur();if(t==null){s.search=o.search;let l=new URLSearchParams(s.search),u=l.getAll("index");if(u.some(d=>d==="")){l.delete("index"),u.filter(p=>p).forEach(p=>l.append("index",p));let d=l.toString();s.search=d?`?${d}`:""}}return(!t||t===".")&&i.route.index&&(s.search=s.search?s.search.replace(/^\?/,"?index&"):"?index"),n!=="/"&&(s.pathname=s.pathname==="/"?n:Ln([n,s.pathname])),ia(s)}function BC(t,{relative:e}={}){let n=V.useContext($w);Te(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=Zw("useViewTransitionState"),i=Ea(t,{relative:e});if(!n.isTransitioning)return!1;let s=zn(n.currentLocation.pathname,r)||n.currentLocation.pathname,o=zn(n.nextLocation.pathname,r)||n.nextLocation.pathname;return uu(i.pathname,o)!=null||uu(i.pathname,s)!=null}const zC=()=>{};var Py={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eT=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},$C=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const i=t[n++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=t[n++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=t[n++],o=t[n++],l=t[n++],u=((i&7)<<18|(s&63)<<12|(o&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const s=t[n++],o=t[n++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},tT={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<t.length;i+=3){const s=t[i],o=i+1<t.length,l=o?t[i+1]:0,u=i+2<t.length,c=u?t[i+2]:0,d=s>>2,p=(s&3)<<4|l>>4;let m=(l&15)<<2|c>>6,T=c&63;u||(T=64,o||(m=64)),r.push(n[d],n[p],n[m],n[T])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(eT(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):$C(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<t.length;){const s=n[t.charAt(i++)],l=i<t.length?n[t.charAt(i)]:0;++i;const c=i<t.length?n[t.charAt(i)]:64;++i;const p=i<t.length?n[t.charAt(i)]:64;if(++i,s==null||l==null||c==null||p==null)throw new HC;const m=s<<2|l>>4;if(r.push(m),c!==64){const T=l<<4&240|c>>2;if(r.push(T),p!==64){const C=c<<6&192|p;r.push(C)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class HC extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const qC=function(t){const e=eT(t);return tT.encodeByteArray(e,!0)},cu=function(t){return qC(t).replace(/\./g,"")},nT=function(t){try{return tT.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function WC(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const KC=()=>WC().__FIREBASE_DEFAULTS__,GC=()=>{if(typeof process>"u"||typeof Py>"u")return;const t=Py.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},QC=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&nT(t[1]);return e&&JSON.parse(e)},Yu=()=>{try{return zC()||KC()||GC()||QC()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},rT=t=>{var e,n;return(n=(e=Yu())==null?void 0:e.emulatorHosts)==null?void 0:n[t]},iT=t=>{const e=rT(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},sT=()=>{var t;return(t=Yu())==null?void 0:t.config},oT=t=>{var e;return(e=Yu())==null?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YC{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jr(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function lp(t){return(await fetch(t,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aT(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",i=t.iat||0,s=t.sub||t.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}},...t};return[cu(JSON.stringify(n)),cu(JSON.stringify(o)),""].join(".")}const Vo={};function XC(){const t={prod:[],emulator:[]};for(const e of Object.keys(Vo))Vo[e]?t.emulator.push(e):t.prod.push(e);return t}function JC(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let ky=!1;function up(t,e){if(typeof window>"u"||typeof document>"u"||!jr(window.location.host)||Vo[t]===e||Vo[t]||ky)return;Vo[t]=e;function n(m){return`__firebase__banner__${m}`}const r="__firebase__banner",s=XC().prod.length>0;function o(){const m=document.getElementById(r);m&&m.remove()}function l(m){m.style.display="flex",m.style.background="#7faaf0",m.style.position="fixed",m.style.bottom="5px",m.style.left="5px",m.style.padding=".5em",m.style.borderRadius="5px",m.style.alignItems="center"}function u(m,T){m.setAttribute("width","24"),m.setAttribute("id",T),m.setAttribute("height","24"),m.setAttribute("viewBox","0 0 24 24"),m.setAttribute("fill","none"),m.style.marginLeft="-6px"}function c(){const m=document.createElement("span");return m.style.cursor="pointer",m.style.marginLeft="16px",m.style.fontSize="24px",m.innerHTML=" &times;",m.onclick=()=>{ky=!0,o()},m}function d(m,T){m.setAttribute("id",T),m.innerText="Learn more",m.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",m.setAttribute("target","__blank"),m.style.paddingLeft="5px",m.style.textDecoration="underline"}function p(){const m=JC(r),T=n("text"),C=document.getElementById(T)||document.createElement("span"),P=n("learnmore"),D=document.getElementById(P)||document.createElement("a"),v=n("preprendIcon"),_=document.getElementById(v)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(m.created){const I=m.element;l(I),d(D,P);const x=c();u(_,v),I.append(_,C,D,x),document.body.appendChild(I)}s?(C.innerText="Preview backend disconnected.",_.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(_.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,C.innerText="Preview backend running in this workspace."),C.setAttribute("id",T)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",p):p()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function at(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function ZC(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(at())}function eP(){var e;const t=(e=Yu())==null?void 0:e.forceEnvironment;if(t==="node")return!0;if(t==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function tP(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function lT(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function nP(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function rP(){const t=at();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function iP(){return!eP()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function uT(){try{return typeof indexedDB=="object"}catch{return!1}}function cT(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var s;e(((s=i.error)==null?void 0:s.message)||"")}}catch(n){e(n)}})}function sP(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oP="FirebaseError";class Wt extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=oP,Object.setPrototypeOf(this,Wt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ci.prototype.create)}}class Ci{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?aP(s,r):"Error",l=`${this.serviceName}: ${o} (${i}).`;return new Wt(i,l,r)}}function aP(t,e){return t.replace(lP,(n,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const lP=/\{\$([^}]+)}/g;function uP(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Tn(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const i of n){if(!r.includes(i))return!1;const s=t[i],o=e[i];if(Ny(s)&&Ny(o)){if(!Tn(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function Ny(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wa(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function vo(t){const e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function Eo(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function cP(t,e){const n=new hP(t,e);return n.subscribe.bind(n)}class hP{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let i;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");dP(e,["next","error","complete"])?i=e:i={next:e,error:n,complete:r},i.next===void 0&&(i.next=wh),i.error===void 0&&(i.error=wh),i.complete===void 0&&(i.complete=wh);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function dP(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function wh(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fP=1e3,pP=2,mP=4*60*60*1e3,gP=.5;function Dy(t,e=fP,n=pP){const r=e*Math.pow(n,t),i=Math.round(gP*r*(Math.random()-.5)*2);return Math.min(mP,r+i)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ce(t){return t&&t._delegate?t._delegate:t}class qt{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ti="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yP{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new YC;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(e==null?void 0:e.optional)??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(vP(e))try{this.getOrInitializeService({instanceIdentifier:ti})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=ti){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=ti){return this.instances.has(e)}getOptions(e=ti){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[s,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(s);r===l&&o.resolve(i)}return i}onInit(e,n){const r=this.normalizeInstanceIdentifier(n),i=this.onInitCallbacks.get(r)??new Set;i.add(e),this.onInitCallbacks.set(r,i);const s=this.instances.get(r);return s&&e(s,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const i of r)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:_P(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=ti){return this.component?this.component.multipleInstances?e:ti:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function _P(t){return t===ti?void 0:t}function vP(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EP{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new yP(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var te;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(te||(te={}));const wP={debug:te.DEBUG,verbose:te.VERBOSE,info:te.INFO,warn:te.WARN,error:te.ERROR,silent:te.SILENT},TP=te.INFO,IP={[te.DEBUG]:"log",[te.VERBOSE]:"log",[te.INFO]:"info",[te.WARN]:"warn",[te.ERROR]:"error"},SP=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),i=IP[e];if(i)console[i](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Xu{constructor(e){this.name=e,this._logLevel=TP,this._logHandler=SP,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in te))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?wP[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,te.DEBUG,...e),this._logHandler(this,te.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,te.VERBOSE,...e),this._logHandler(this,te.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,te.INFO,...e),this._logHandler(this,te.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,te.WARN,...e),this._logHandler(this,te.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,te.ERROR,...e),this._logHandler(this,te.ERROR,...e)}}const AP=(t,e)=>e.some(n=>t instanceof n);let xy,Oy;function RP(){return xy||(xy=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function CP(){return Oy||(Oy=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const hT=new WeakMap,Od=new WeakMap,dT=new WeakMap,Th=new WeakMap,cp=new WeakMap;function PP(t){const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("success",s),t.removeEventListener("error",o)},s=()=>{n(Sr(t.result)),i()},o=()=>{r(t.error),i()};t.addEventListener("success",s),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&hT.set(n,t)}).catch(()=>{}),cp.set(e,t),e}function kP(t){if(Od.has(t))return;const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",o),t.removeEventListener("abort",o)},s=()=>{n(),i()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",s),t.addEventListener("error",o),t.addEventListener("abort",o)});Od.set(t,e)}let Vd={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Od.get(t);if(e==="objectStoreNames")return t.objectStoreNames||dT.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Sr(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function NP(t){Vd=t(Vd)}function DP(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(Ih(this),e,...n);return dT.set(r,e.sort?e.sort():[e]),Sr(r)}:CP().includes(t)?function(...e){return t.apply(Ih(this),e),Sr(hT.get(this))}:function(...e){return Sr(t.apply(Ih(this),e))}}function xP(t){return typeof t=="function"?DP(t):(t instanceof IDBTransaction&&kP(t),AP(t,RP())?new Proxy(t,Vd):t)}function Sr(t){if(t instanceof IDBRequest)return PP(t);if(Th.has(t))return Th.get(t);const e=xP(t);return e!==t&&(Th.set(t,e),cp.set(e,t)),e}const Ih=t=>cp.get(t);function fT(t,e,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(t,e),l=Sr(o);return r&&o.addEventListener("upgradeneeded",u=>{r(Sr(o.result),u.oldVersion,u.newVersion,Sr(o.transaction),u)}),n&&o.addEventListener("blocked",u=>n(u.oldVersion,u.newVersion,u)),l.then(u=>{s&&u.addEventListener("close",()=>s()),i&&u.addEventListener("versionchange",c=>i(c.oldVersion,c.newVersion,c))}).catch(()=>{}),l}const OP=["get","getKey","getAll","getAllKeys","count"],VP=["put","add","delete","clear"],Sh=new Map;function Vy(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Sh.get(e))return Sh.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,i=VP.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||OP.includes(n)))return;const s=async function(o,...l){const u=this.transaction(o,i?"readwrite":"readonly");let c=u.store;return r&&(c=c.index(l.shift())),(await Promise.all([c[n](...l),i&&u.done]))[0]};return Sh.set(e,s),s}NP(t=>({...t,get:(e,n,r)=>Vy(e,n)||t.get(e,n,r),has:(e,n)=>!!Vy(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LP{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(bP(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function bP(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Ld="@firebase/app",Ly="0.14.5";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $n=new Xu("@firebase/app"),MP="@firebase/app-compat",FP="@firebase/analytics-compat",UP="@firebase/analytics",jP="@firebase/app-check-compat",BP="@firebase/app-check",zP="@firebase/auth",$P="@firebase/auth-compat",HP="@firebase/database",qP="@firebase/data-connect",WP="@firebase/database-compat",KP="@firebase/functions",GP="@firebase/functions-compat",QP="@firebase/installations",YP="@firebase/installations-compat",XP="@firebase/messaging",JP="@firebase/messaging-compat",ZP="@firebase/performance",ek="@firebase/performance-compat",tk="@firebase/remote-config",nk="@firebase/remote-config-compat",rk="@firebase/storage",ik="@firebase/storage-compat",sk="@firebase/firestore",ok="@firebase/ai",ak="@firebase/firestore-compat",lk="firebase",uk="12.5.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bd="[DEFAULT]",ck={[Ld]:"fire-core",[MP]:"fire-core-compat",[UP]:"fire-analytics",[FP]:"fire-analytics-compat",[BP]:"fire-app-check",[jP]:"fire-app-check-compat",[zP]:"fire-auth",[$P]:"fire-auth-compat",[HP]:"fire-rtdb",[qP]:"fire-data-connect",[WP]:"fire-rtdb-compat",[KP]:"fire-fn",[GP]:"fire-fn-compat",[QP]:"fire-iid",[YP]:"fire-iid-compat",[XP]:"fire-fcm",[JP]:"fire-fcm-compat",[ZP]:"fire-perf",[ek]:"fire-perf-compat",[tk]:"fire-rc",[nk]:"fire-rc-compat",[rk]:"fire-gcs",[ik]:"fire-gcs-compat",[sk]:"fire-fst",[ak]:"fire-fst-compat",[ok]:"fire-vertex","fire-js":"fire-js",[lk]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hu=new Map,hk=new Map,Md=new Map;function by(t,e){try{t.container.addComponent(e)}catch(n){$n.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function nn(t){const e=t.name;if(Md.has(e))return $n.debug(`There were multiple attempts to register component ${e}.`),!1;Md.set(e,t);for(const n of hu.values())by(n,t);for(const n of hk.values())by(n,t);return!0}function Br(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Ct(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dk={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ar=new Ci("app","Firebase",dk);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fk{constructor(e,n,r){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new qt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ar.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pi=uk;function pT(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r={name:bd,automaticDataCollectionEnabled:!0,...e},i=r.name;if(typeof i!="string"||!i)throw Ar.create("bad-app-name",{appName:String(i)});if(n||(n=sT()),!n)throw Ar.create("no-options");const s=hu.get(i);if(s){if(Tn(n,s.options)&&Tn(r,s.config))return s;throw Ar.create("duplicate-app",{appName:i})}const o=new EP(i);for(const u of Md.values())o.addComponent(u);const l=new fk(n,r,o);return hu.set(i,l),l}function Ju(t=bd){const e=hu.get(t);if(!e&&t===bd&&sT())return pT();if(!e)throw Ar.create("no-app",{appName:t});return e}function It(t,e,n){let r=ck[t]??t;n&&(r+=`-${n}`);const i=r.match(/\s|\//),s=e.match(/\s|\//);if(i||s){const o=[`Unable to register library "${r}" with version "${e}":`];i&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&s&&o.push("and"),s&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),$n.warn(o.join(" "));return}nn(new qt(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pk="firebase-heartbeat-database",mk=1,sa="firebase-heartbeat-store";let Ah=null;function mT(){return Ah||(Ah=fT(pk,mk,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(sa)}catch(n){console.warn(n)}}}}).catch(t=>{throw Ar.create("idb-open",{originalErrorMessage:t.message})})),Ah}async function gk(t){try{const n=(await mT()).transaction(sa),r=await n.objectStore(sa).get(gT(t));return await n.done,r}catch(e){if(e instanceof Wt)$n.warn(e.message);else{const n=Ar.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});$n.warn(n.message)}}}async function My(t,e){try{const r=(await mT()).transaction(sa,"readwrite");await r.objectStore(sa).put(e,gT(t)),await r.done}catch(n){if(n instanceof Wt)$n.warn(n.message);else{const r=Ar.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});$n.warn(r.message)}}}function gT(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yk=1024,_k=30;class vk{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new wk(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Fy();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)==null?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats.length>_k){const o=Tk(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){$n.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Fy(),{heartbeatsToSend:r,unsentEntries:i}=Ek(this._heartbeatsCache.heartbeats),s=cu(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(n){return $n.warn(n),""}}}function Fy(){return new Date().toISOString().substring(0,10)}function Ek(t,e=yk){const n=[];let r=t.slice();for(const i of t){const s=n.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),Uy(n)>e){s.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),Uy(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class wk{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return uT()?cT().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await gk(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return My(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return My(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Uy(t){return cu(JSON.stringify({version:2,heartbeats:t})).length}function Tk(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let r=1;r<t.length;r++)t[r].date<n&&(n=t[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ik(t){nn(new qt("platform-logger",e=>new LP(e),"PRIVATE")),nn(new qt("heartbeat",e=>new vk(e),"PRIVATE")),It(Ld,Ly,t),It(Ld,Ly,"esm2020"),It("fire-js","")}Ik("");function yT(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Sk=yT,_T=new Ci("auth","Firebase",yT());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const du=new Xu("@firebase/auth");function Ak(t,...e){du.logLevel<=te.WARN&&du.warn(`Auth (${Pi}): ${t}`,...e)}function kl(t,...e){du.logLevel<=te.ERROR&&du.error(`Auth (${Pi}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rn(t,...e){throw hp(t,...e)}function mn(t,...e){return hp(t,...e)}function vT(t,e,n){const r={...Sk(),[e]:n};return new Ci("auth","Firebase",r).create(e,{appName:t.name})}function bn(t){return vT(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function hp(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return _T.create(t,...e)}function K(t,e,...n){if(!t)throw hp(e,...n)}function xn(t){const e="INTERNAL ASSERTION FAILED: "+t;throw kl(e),new Error(e)}function Hn(t,e){t||xn(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fd(){var t;return typeof self<"u"&&((t=self.location)==null?void 0:t.href)||""}function Rk(){return jy()==="http:"||jy()==="https:"}function jy(){var t;return typeof self<"u"&&((t=self.location)==null?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ck(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Rk()||lT()||"connection"in navigator)?navigator.onLine:!0}function Pk(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ta{constructor(e,n){this.shortDelay=e,this.longDelay=n,Hn(n>e,"Short delay should be less than long delay!"),this.isMobile=ZC()||nP()}get(){return Ck()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dp(t,e){Hn(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ET{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;xn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;xn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;xn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kk={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nk=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Dk=new Ta(3e4,6e4);function zr(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function Rn(t,e,n,r,i={}){return wT(t,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const l=wa({key:t.config.apiKey,...o}).slice(1),u=await t._getAdditionalHeaders();u["Content-Type"]="application/json",t.languageCode&&(u["X-Firebase-Locale"]=t.languageCode);const c={method:e,headers:u,...s};return tP()||(c.referrerPolicy="no-referrer"),t.emulatorConfig&&jr(t.emulatorConfig.host)&&(c.credentials="include"),ET.fetch()(await TT(t,t.config.apiHost,n,l),c)})}async function wT(t,e,n){t._canInitEmulator=!1;const r={...kk,...e};try{const i=new Ok(t),s=await Promise.race([n(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw al(t,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const l=s.ok?o.errorMessage:o.error.message,[u,c]=l.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw al(t,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw al(t,"email-already-in-use",o);if(u==="USER_DISABLED")throw al(t,"user-disabled",o);const d=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw vT(t,d,c);rn(t,d)}}catch(i){if(i instanceof Wt)throw i;rn(t,"network-request-failed",{message:String(i)})}}async function Ia(t,e,n,r,i={}){const s=await Rn(t,e,n,r,i);return"mfaPendingCredential"in s&&rn(t,"multi-factor-auth-required",{_serverResponse:s}),s}async function TT(t,e,n,r){const i=`${e}${n}?${r}`,s=t,o=s.config.emulator?dp(t.config,i):`${t.config.apiScheme}://${i}`;return Nk.includes(n)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(o).toString():o}function xk(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Ok{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(mn(this.auth,"network-request-failed")),Dk.get())})}}function al(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=mn(t,e,r);return i.customData._tokenResponse=n,i}function By(t){return t!==void 0&&t.enterprise!==void 0}class Vk{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return xk(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function Lk(t,e){return Rn(t,"GET","/v2/recaptchaConfig",zr(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bk(t,e){return Rn(t,"POST","/v1/accounts:delete",e)}async function fu(t,e){return Rn(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lo(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Mk(t,e=!1){const n=ce(t),r=await n.getIdToken(e),i=fp(r);K(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:Lo(Rh(i.auth_time)),issuedAtTime:Lo(Rh(i.iat)),expirationTime:Lo(Rh(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function Rh(t){return Number(t)*1e3}function fp(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return kl("JWT malformed, contained fewer than 3 sections"),null;try{const i=nT(n);return i?JSON.parse(i):(kl("Failed to decode base64 JWT payload"),null)}catch(i){return kl("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function zy(t){const e=fp(t);return K(e,"internal-error"),K(typeof e.exp<"u","internal-error"),K(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yi(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof Wt&&Fk(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function Fk({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uk{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ud{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Lo(this.lastLoginAt),this.creationTime=Lo(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pu(t){var p;const e=t.auth,n=await t.getIdToken(),r=await yi(t,fu(e,{idToken:n}));K(r==null?void 0:r.users.length,e,"internal-error");const i=r.users[0];t._notifyReloadListener(i);const s=(p=i.providerUserInfo)!=null&&p.length?IT(i.providerUserInfo):[],o=Bk(t.providerData,s),l=t.isAnonymous,u=!(t.email&&i.passwordHash)&&!(o!=null&&o.length),c=l?u:!1,d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new Ud(i.createdAt,i.lastLoginAt),isAnonymous:c};Object.assign(t,d)}async function jk(t){const e=ce(t);await pu(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Bk(t,e){return[...t.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function IT(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zk(t,e){const n=await wT(t,{},async()=>{const r=wa({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=t.config,o=await TT(t,i,"/v1/token",`key=${s}`),l=await t._getAdditionalHeaders();l["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:l,body:r};return t.emulatorConfig&&jr(t.emulatorConfig.host)&&(u.credentials="include"),ET.fetch()(o,u)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function $k(t,e){return Rn(t,"POST","/v2/accounts:revokeToken",zr(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ls{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){K(e.idToken,"internal-error"),K(typeof e.idToken<"u","internal-error"),K(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):zy(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){K(e.length!==0,"internal-error");const n=zy(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(K(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:i,expiresIn:s}=await zk(e,n);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:i,expirationTime:s}=n,o=new ls;return r&&(K(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(K(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(K(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ls,this.toJSON())}_performRefresh(){return xn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rr(t,e){K(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Jt{constructor({uid:e,auth:n,stsTokenManager:r,...i}){this.providerId="firebase",this.proactiveRefresh=new Uk(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new Ud(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await yi(this,this.stsTokenManager.getToken(this.auth,e));return K(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return Mk(this,e)}reload(){return jk(this)}_assign(e){this!==e&&(K(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Jt({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){K(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await pu(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ct(this.auth.app))return Promise.reject(bn(this.auth));const e=await this.getIdToken();return await yi(this,bk(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const r=n.displayName??void 0,i=n.email??void 0,s=n.phoneNumber??void 0,o=n.photoURL??void 0,l=n.tenantId??void 0,u=n._redirectEventId??void 0,c=n.createdAt??void 0,d=n.lastLoginAt??void 0,{uid:p,emailVerified:m,isAnonymous:T,providerData:C,stsTokenManager:P}=n;K(p&&P,e,"internal-error");const D=ls.fromJSON(this.name,P);K(typeof p=="string",e,"internal-error"),rr(r,e.name),rr(i,e.name),K(typeof m=="boolean",e,"internal-error"),K(typeof T=="boolean",e,"internal-error"),rr(s,e.name),rr(o,e.name),rr(l,e.name),rr(u,e.name),rr(c,e.name),rr(d,e.name);const v=new Jt({uid:p,auth:e,email:i,emailVerified:m,displayName:r,isAnonymous:T,photoURL:o,phoneNumber:s,tenantId:l,stsTokenManager:D,createdAt:c,lastLoginAt:d});return C&&Array.isArray(C)&&(v.providerData=C.map(_=>({..._}))),u&&(v._redirectEventId=u),v}static async _fromIdTokenResponse(e,n,r=!1){const i=new ls;i.updateFromServerResponse(n);const s=new Jt({uid:n.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await pu(s),s}static async _fromGetAccountInfoResponse(e,n,r){const i=n.users[0];K(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?IT(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),l=new ls;l.updateFromIdToken(r);const u=new Jt({uid:i.localId,auth:e,stsTokenManager:l,isAnonymous:o}),c={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new Ud(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(u,c),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $y=new Map;function On(t){Hn(t instanceof Function,"Expected a class definition");let e=$y.get(t);return e?(Hn(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,$y.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ST{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}ST.type="NONE";const Hy=ST;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nl(t,e,n){return`firebase:${t}:${e}:${n}`}class us{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=Nl(this.userKey,i.apiKey,s),this.fullPersistenceKey=Nl("persistence",i.apiKey,s),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await fu(this.auth,{idToken:e}).catch(()=>{});return n?Jt._fromGetAccountInfoResponse(this.auth,n,e):null}return Jt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new us(On(Hy),e,r);const i=(await Promise.all(n.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let s=i[0]||On(Hy);const o=Nl(r,e.config.apiKey,e.name);let l=null;for(const c of n)try{const d=await c._get(o);if(d){let p;if(typeof d=="string"){const m=await fu(e,{idToken:d}).catch(()=>{});if(!m)break;p=await Jt._fromGetAccountInfoResponse(e,m,d)}else p=Jt._fromJSON(e,d);c!==s&&(l=p),s=c;break}}catch{}const u=i.filter(c=>c._shouldAllowMigration);return!s._shouldAllowMigration||!u.length?new us(s,e,r):(s=u[0],l&&await s._set(o,l.toJSON()),await Promise.all(n.map(async c=>{if(c!==s)try{await c._remove(o)}catch{}})),new us(s,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qy(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(PT(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(AT(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(NT(e))return"Blackberry";if(DT(e))return"Webos";if(RT(e))return"Safari";if((e.includes("chrome/")||CT(e))&&!e.includes("edge/"))return"Chrome";if(kT(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function AT(t=at()){return/firefox\//i.test(t)}function RT(t=at()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function CT(t=at()){return/crios\//i.test(t)}function PT(t=at()){return/iemobile/i.test(t)}function kT(t=at()){return/android/i.test(t)}function NT(t=at()){return/blackberry/i.test(t)}function DT(t=at()){return/webos/i.test(t)}function pp(t=at()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function Hk(t=at()){var e;return pp(t)&&!!((e=window.navigator)!=null&&e.standalone)}function qk(){return rP()&&document.documentMode===10}function xT(t=at()){return pp(t)||kT(t)||DT(t)||NT(t)||/windows phone/i.test(t)||PT(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function OT(t,e=[]){let n;switch(t){case"Browser":n=qy(at());break;case"Worker":n=`${qy(at())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Pi}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wk{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=s=>new Promise((o,l)=>{try{const u=e(s);o(u)}catch(u){l(u)}});r.onAbort=n,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const i of n)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Kk(t,e={}){return Rn(t,"GET","/v2/passwordPolicy",zr(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gk=6;class Qk{constructor(e){var r;const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??Gk,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=e.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),i&&(n.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yk{constructor(e,n,r,i){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Wy(this),this.idTokenSubscription=new Wy(this),this.beforeStateQueue=new Wk(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=_T,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=On(n)),this._initializationPromise=this.queue(async()=>{var r,i,s;if(!this._deleted&&(this.persistenceManager=await us.create(this,e),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((i=this._popupRedirectResolver)!=null&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)==null?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await fu(this,{idToken:e}),r=await Jt._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var s;if(Ct(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(l,l))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let r=n,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(s=this.redirectUser)==null?void 0:s._redirectEventId,l=r==null?void 0:r._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===l)&&(u!=null&&u.user)&&(r=u.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(o){r=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return K(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await pu(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Pk()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ct(this.app))return Promise.reject(bn(this));const n=e?ce(e):null;return n&&K(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&K(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ct(this.app)?Promise.reject(bn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ct(this.app)?Promise.reject(bn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(On(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Kk(this),n=new Qk(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Ci("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await $k(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&On(e)||this._popupRedirectResolver;K(n,this,"argument-error"),this.redirectPersistenceManager=await us.create(this,[On(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)==null?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((n=this.currentUser)==null?void 0:n.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,i){if(this._deleted)return()=>{};const s=typeof n=="function"?n:n.next.bind(n);let o=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(K(l,this,"internal-error"),l.then(()=>{o||s(this.currentUser)}),typeof n=="function"){const u=e.addObserver(n,r,i);return()=>{o=!0,u()}}else{const u=e.addObserver(n);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return K(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=OT(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var i;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await((i=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:i.getHeartbeatsHeader());n&&(e["X-Firebase-Client"]=n);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){var n;if(Ct(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((n=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:n.getToken());return e!=null&&e.error&&Ak(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function ki(t){return ce(t)}class Wy{constructor(e){this.auth=e,this.observer=null,this.addObserver=cP(n=>this.observer=n)}get next(){return K(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Zu={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Xk(t){Zu=t}function VT(t){return Zu.loadJS(t)}function Jk(){return Zu.recaptchaEnterpriseScript}function Zk(){return Zu.gapiScript}function eN(t){return`__${t}${Math.floor(Math.random()*1e6)}`}class tN{constructor(){this.enterprise=new nN}ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}class nN{ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}const rN="recaptcha-enterprise",LT="NO_RECAPTCHA";class iN{constructor(e){this.type=rN,this.auth=ki(e)}async verify(e="verify",n=!1){async function r(s){if(!n){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,l)=>{Lk(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)l(new Error("recaptcha Enterprise site key undefined"));else{const c=new Vk(u);return s.tenantId==null?s._agentRecaptchaConfig=c:s._tenantRecaptchaConfigs[s.tenantId]=c,o(c.siteKey)}}).catch(u=>{l(u)})})}function i(s,o,l){const u=window.grecaptcha;By(u)?u.enterprise.ready(()=>{u.enterprise.execute(s,{action:e}).then(c=>{o(c)}).catch(()=>{o(LT)})}):l(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new tN().execute("siteKey",{action:"verify"}):new Promise((s,o)=>{r(this.auth).then(l=>{if(!n&&By(window.grecaptcha))i(l,s,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let u=Jk();u.length!==0&&(u+=l),VT(u).then(()=>{i(l,s,o)}).catch(c=>{o(c)})}}).catch(l=>{o(l)})})}}async function Ky(t,e,n,r=!1,i=!1){const s=new iN(t);let o;if(i)o=LT;else try{o=await s.verify(n)}catch{o=await s.verify(n,!0)}const l={...e};if(n==="mfaSmsEnrollment"||n==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in l){const u=l.phoneEnrollmentInfo.phoneNumber,c=l.phoneEnrollmentInfo.recaptchaToken;Object.assign(l,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:c,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in l){const u=l.phoneSignInInfo.recaptchaToken;Object.assign(l,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return l}return r?Object.assign(l,{captchaResp:o}):Object.assign(l,{captchaResponse:o}),Object.assign(l,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(l,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),l}async function jd(t,e,n,r,i){var s;if((s=t._getRecaptchaConfig())!=null&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await Ky(t,e,n,n==="getOobCode");return r(t,o)}else return r(t,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const l=await Ky(t,e,n,n==="getOobCode");return r(t,l)}else return Promise.reject(o)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sN(t,e){const n=Br(t,"auth");if(n.isInitialized()){const i=n.getImmediate(),s=n.getOptions();if(Tn(s,e??{}))return i;rn(i,"already-initialized")}return n.initialize({options:e})}function oN(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(On);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function aN(t,e,n){const r=ki(t);K(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=bT(e),{host:o,port:l}=lN(e),u=l===null?"":`:${l}`,c={url:`${s}//${o}${u}/`},d=Object.freeze({host:o,port:l,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){K(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),K(Tn(c,r.config.emulator)&&Tn(d,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=c,r.emulatorConfig=d,r.settings.appVerificationDisabledForTesting=!0,jr(o)?(lp(`${s}//${o}${u}`),up("Auth",!0)):uN()}function bT(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function lN(t){const e=bT(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:Gy(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:Gy(o)}}}function Gy(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function uN(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mp{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return xn("not implemented")}_getIdTokenResponse(e){return xn("not implemented")}_linkToIdToken(e,n){return xn("not implemented")}_getReauthenticationResolver(e){return xn("not implemented")}}async function cN(t,e){return Rn(t,"POST","/v1/accounts:update",e)}async function hN(t,e){return Rn(t,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dN(t,e){return Ia(t,"POST","/v1/accounts:signInWithPassword",zr(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fN(t,e){return Ia(t,"POST","/v1/accounts:signInWithEmailLink",zr(t,e))}async function pN(t,e){return Ia(t,"POST","/v1/accounts:signInWithEmailLink",zr(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oa extends mp{constructor(e,n,r,i=null){super("password",r),this._email=e,this._password=n,this._tenantId=i}static _fromEmailAndPassword(e,n){return new oa(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new oa(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return jd(e,n,"signInWithPassword",dN);case"emailLink":return fN(e,{email:this._email,oobCode:this._password});default:rn(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":const r={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return jd(e,r,"signUpPassword",hN);case"emailLink":return pN(e,{idToken:n,email:this._email,oobCode:this._password});default:rn(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cs(t,e){return Ia(t,"POST","/v1/accounts:signInWithIdp",zr(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mN="http://localhost";class _i extends mp{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new _i(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):rn("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i,...s}=n;if(!r||!i)return null;const o=new _i(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return cs(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,cs(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,cs(e,n)}buildRequest(){const e={requestUri:mN,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=wa(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gN(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function yN(t){const e=vo(Eo(t)).link,n=e?vo(Eo(e)).deep_link_id:null,r=vo(Eo(t)).deep_link_id;return(r?vo(Eo(r)).link:null)||r||n||e||t}class gp{constructor(e){const n=vo(Eo(e)),r=n.apiKey??null,i=n.oobCode??null,s=gN(n.mode??null);K(r&&i&&s,"argument-error"),this.apiKey=r,this.operation=s,this.code=i,this.continueUrl=n.continueUrl??null,this.languageCode=n.lang??null,this.tenantId=n.tenantId??null}static parseLink(e){const n=yN(e);try{return new gp(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Os{constructor(){this.providerId=Os.PROVIDER_ID}static credential(e,n){return oa._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=gp.parseLink(n);return K(r,"argument-error"),oa._fromEmailAndCode(e,r.code,r.tenantId)}}Os.PROVIDER_ID="password";Os.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Os.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class MT{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sa extends MT{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lr extends Sa{constructor(){super("facebook.com")}static credential(e){return _i._fromParams({providerId:lr.PROVIDER_ID,signInMethod:lr.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return lr.credentialFromTaggedObject(e)}static credentialFromError(e){return lr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return lr.credential(e.oauthAccessToken)}catch{return null}}}lr.FACEBOOK_SIGN_IN_METHOD="facebook.com";lr.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ur extends Sa{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return _i._fromParams({providerId:ur.PROVIDER_ID,signInMethod:ur.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return ur.credentialFromTaggedObject(e)}static credentialFromError(e){return ur.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return ur.credential(n,r)}catch{return null}}}ur.GOOGLE_SIGN_IN_METHOD="google.com";ur.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cr extends Sa{constructor(){super("github.com")}static credential(e){return _i._fromParams({providerId:cr.PROVIDER_ID,signInMethod:cr.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return cr.credentialFromTaggedObject(e)}static credentialFromError(e){return cr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return cr.credential(e.oauthAccessToken)}catch{return null}}}cr.GITHUB_SIGN_IN_METHOD="github.com";cr.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hr extends Sa{constructor(){super("twitter.com")}static credential(e,n){return _i._fromParams({providerId:hr.PROVIDER_ID,signInMethod:hr.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return hr.credentialFromTaggedObject(e)}static credentialFromError(e){return hr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return hr.credential(n,r)}catch{return null}}}hr.TWITTER_SIGN_IN_METHOD="twitter.com";hr.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _N(t,e){return Ia(t,"POST","/v1/accounts:signUp",zr(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vi{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,i=!1){const s=await Jt._fromIdTokenResponse(e,r,i),o=Qy(r);return new vi({user:s,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const i=Qy(r);return new vi({user:e,providerId:i,_tokenResponse:r,operationType:n})}}function Qy(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mu extends Wt{constructor(e,n,r,i){super(n.code,n.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,mu.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,i){return new mu(e,n,r,i)}}function FT(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?mu._fromErrorAndOperation(t,s,e,r):s})}async function vN(t,e,n=!1){const r=await yi(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return vi._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function UT(t,e,n=!1){const{auth:r}=t;if(Ct(r.app))return Promise.reject(bn(r));const i="reauthenticate";try{const s=await yi(t,FT(r,i,e,t),n);K(s.idToken,r,"internal-error");const o=fp(s.idToken);K(o,r,"internal-error");const{sub:l}=o;return K(t.uid===l,r,"user-mismatch"),vi._forOperation(t,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&rn(r,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jT(t,e,n=!1){if(Ct(t.app))return Promise.reject(bn(t));const r="signIn",i=await FT(t,r,e),s=await vi._fromIdTokenResponse(t,r,i);return n||await t._updateCurrentUser(s.user),s}async function EN(t,e){return jT(ki(t),e)}async function aM(t,e){return UT(ce(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function BT(t){const e=ki(t);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function lM(t,e,n){if(Ct(t.app))return Promise.reject(bn(t));const r=ki(t),o=await jd(r,{returnSecureToken:!0,email:e,password:n,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",_N).catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&BT(t),u}),l=await vi._fromIdTokenResponse(r,"signIn",o);return await r._updateCurrentUser(l.user),l}function uM(t,e,n){return Ct(t.app)?Promise.reject(bn(t)):EN(ce(t),Os.credential(e,n)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&BT(t),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wN(t,e){return Rn(t,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cM(t,{displayName:e,photoURL:n}){if(e===void 0&&n===void 0)return;const r=ce(t),s={idToken:await r.getIdToken(),displayName:e,photoUrl:n,returnSecureToken:!0},o=await yi(r,wN(r.auth,s));r.displayName=o.displayName||null,r.photoURL=o.photoUrl||null;const l=r.providerData.find(({providerId:u})=>u==="password");l&&(l.displayName=r.displayName,l.photoURL=r.photoURL),await r._updateTokensIfNecessary(o)}function hM(t,e){return TN(ce(t),null,e)}async function TN(t,e,n){const{auth:r}=t,s={idToken:await t.getIdToken(),returnSecureToken:!0};n&&(s.password=n);const o=await yi(t,cN(r,s));await t._updateTokensIfNecessary(o,!0)}function IN(t,e,n,r){return ce(t).onIdTokenChanged(e,n,r)}function SN(t,e,n){return ce(t).beforeAuthStateChanged(e,n)}function AN(t,e,n,r){return ce(t).onAuthStateChanged(e,n,r)}function RN(t){return ce(t).signOut()}const gu="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zT{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(gu,"1"),this.storage.removeItem(gu),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CN=1e3,PN=10;class $T extends zT{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=xT(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),i=this.localCache[n];r!==i&&e(n,i,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,l,u)=>{this.notifyListeners(o,u)});return}const r=e.key;n?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);qk()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,PN):i()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},CN)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}$T.type="LOCAL";const kN=$T;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HT extends zT{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}HT.type="SESSION";const qT=HT;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function NN(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ec{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(i=>i.isListeningto(e));if(n)return n;const r=new ec(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:i,data:s}=n.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const l=Array.from(o).map(async c=>c(n.origin,s)),u=await NN(l);n.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:u})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ec.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yp(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DN{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((l,u)=>{const c=yp("",20);i.port1.start();const d=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(p){const m=p;if(m.data.eventId===c)switch(m.data.status){case"ack":clearTimeout(d),s=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),l(m.data.response);break;default:clearTimeout(d),clearTimeout(s),u(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:c,data:n},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gn(){return window}function xN(t){gn().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function WT(){return typeof gn().WorkerGlobalScope<"u"&&typeof gn().importScripts=="function"}async function ON(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function VN(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)==null?void 0:t.controller)||null}function LN(){return WT()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const KT="firebaseLocalStorageDb",bN=1,yu="firebaseLocalStorage",GT="fbase_key";class Aa{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function tc(t,e){return t.transaction([yu],e?"readwrite":"readonly").objectStore(yu)}function MN(){const t=indexedDB.deleteDatabase(KT);return new Aa(t).toPromise()}function Bd(){const t=indexedDB.open(KT,bN);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(yu,{keyPath:GT})}catch(i){n(i)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(yu)?e(r):(r.close(),await MN(),e(await Bd()))})})}async function Yy(t,e,n){const r=tc(t,!0).put({[GT]:e,value:n});return new Aa(r).toPromise()}async function FN(t,e){const n=tc(t,!1).get(e),r=await new Aa(n).toPromise();return r===void 0?null:r.value}function Xy(t,e){const n=tc(t,!0).delete(e);return new Aa(n).toPromise()}const UN=800,jN=3;class QT{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Bd(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>jN)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return WT()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ec._getInstance(LN()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var n,r;if(this.activeServiceWorker=await ON(),!this.activeServiceWorker)return;this.sender=new DN(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(n=e[0])!=null&&n.fulfilled&&(r=e[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||VN()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Bd();return await Yy(e,gu,"1"),await Xy(e,gu),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>Yy(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>FN(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Xy(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=tc(i,!1).getAll();return new Aa(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),n.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),n.push(i));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),UN)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}QT.type="LOCAL";const BN=QT;new Ta(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zN(t,e){return e?On(e):(K(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _p extends mp{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return cs(e,this._buildIdpRequest())}_linkToIdToken(e,n){return cs(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return cs(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function $N(t){return jT(t.auth,new _p(t),t.bypassAuthState)}function HN(t){const{auth:e,user:n}=t;return K(n,e,"internal-error"),UT(n,new _p(t),t.bypassAuthState)}async function qN(t){const{auth:e,user:n}=t;return K(n,e,"internal-error"),vN(n,new _p(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YT{constructor(e,n,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:i,tenantId:s,error:o,type:l}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:n,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(u))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return $N;case"linkViaPopup":case"linkViaRedirect":return qN;case"reauthViaPopup":case"reauthViaRedirect":return HN;default:rn(this.auth,"internal-error")}}resolve(e){Hn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Hn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WN=new Ta(2e3,1e4);class es extends YT{constructor(e,n,r,i,s){super(e,n,i,s),this.provider=r,this.authWindow=null,this.pollId=null,es.currentPopupAction&&es.currentPopupAction.cancel(),es.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return K(e,this.auth,"internal-error"),e}async onExecution(){Hn(this.filter.length===1,"Popup operations only handle one event");const e=yp();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(mn(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(mn(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,es.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if((r=(n=this.authWindow)==null?void 0:n.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(mn(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,WN.get())};e()}}es.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const KN="pendingRedirect",Dl=new Map;class GN extends YT{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=Dl.get(this.auth._key());if(!e){try{const r=await QN(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}Dl.set(this.auth._key(),e)}return this.bypassAuthState||Dl.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function QN(t,e){const n=JN(e),r=XN(t);if(!await r._isAvailable())return!1;const i=await r._get(n)==="true";return await r._remove(n),i}function YN(t,e){Dl.set(t._key(),e)}function XN(t){return On(t._redirectPersistence)}function JN(t){return Nl(KN,t.config.apiKey,t.name)}async function ZN(t,e,n=!1){if(Ct(t.app))return Promise.reject(bn(t));const r=ki(t),i=zN(r,e),o=await new GN(r,i,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eD=10*60*1e3;class tD{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!nD(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!XT(e)){const i=((r=e.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";n.onError(mn(this.auth,i))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=eD&&this.cachedEventUids.clear(),this.cachedEventUids.has(Jy(e))}saveEventToCache(e){this.cachedEventUids.add(Jy(e)),this.lastProcessedEventTime=Date.now()}}function Jy(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function XT({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function nD(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return XT(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rD(t,e={}){return Rn(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iD=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,sD=/^https?/;async function oD(t){if(t.config.emulator)return;const{authorizedDomains:e}=await rD(t);for(const n of e)try{if(aD(n))return}catch{}rn(t,"unauthorized-domain")}function aD(t){const e=Fd(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!sD.test(n))return!1;if(iD.test(t))return r===t;const i=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lD=new Ta(3e4,6e4);function Zy(){const t=gn().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function uD(t){return new Promise((e,n)=>{var i,s,o;function r(){Zy(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Zy(),n(mn(t,"network-request-failed"))},timeout:lD.get()})}if((s=(i=gn().gapi)==null?void 0:i.iframes)!=null&&s.Iframe)e(gapi.iframes.getContext());else if((o=gn().gapi)!=null&&o.load)r();else{const l=eN("iframefcb");return gn()[l]=()=>{gapi.load?r():n(mn(t,"network-request-failed"))},VT(`${Zk()}?onload=${l}`).catch(u=>n(u))}}).catch(e=>{throw xl=null,e})}let xl=null;function cD(t){return xl=xl||uD(t),xl}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hD=new Ta(5e3,15e3),dD="__/auth/iframe",fD="emulator/auth/iframe",pD={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},mD=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function gD(t){const e=t.config;K(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?dp(e,fD):`https://${t.config.authDomain}/${dD}`,r={apiKey:e.apiKey,appName:t.name,v:Pi},i=mD.get(t.config.apiHost);i&&(r.eid=i);const s=t._getFrameworks();return s.length&&(r.fw=s.join(",")),`${n}?${wa(r).slice(1)}`}async function yD(t){const e=await cD(t),n=gn().gapi;return K(n,t,"internal-error"),e.open({where:document.body,url:gD(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:pD,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const o=mn(t,"network-request-failed"),l=gn().setTimeout(()=>{s(o)},hD.get());function u(){gn().clearTimeout(l),i(r)}r.ping(u).then(u,()=>{s(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _D={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},vD=500,ED=600,wD="_blank",TD="http://localhost";class e_{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function ID(t,e,n,r=vD,i=ED){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const u={..._D,width:r.toString(),height:i.toString(),top:s,left:o},c=at().toLowerCase();n&&(l=CT(c)?wD:n),AT(c)&&(e=e||TD,u.scrollbars="yes");const d=Object.entries(u).reduce((m,[T,C])=>`${m}${T}=${C},`,"");if(Hk(c)&&l!=="_self")return SD(e||"",l),new e_(null);const p=window.open(e||"",l,d);K(p,t,"popup-blocked");try{p.focus()}catch{}return new e_(p)}function SD(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AD="__/auth/handler",RD="emulator/auth/handler",CD=encodeURIComponent("fac");async function t_(t,e,n,r,i,s){K(t.config.authDomain,t,"auth-domain-config-required"),K(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:Pi,eventId:i};if(e instanceof MT){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",uP(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,p]of Object.entries({}))o[d]=p}if(e instanceof Sa){const d=e.getScopes().filter(p=>p!=="");d.length>0&&(o.scopes=d.join(","))}t.tenantId&&(o.tid=t.tenantId);const l=o;for(const d of Object.keys(l))l[d]===void 0&&delete l[d];const u=await t._getAppCheckToken(),c=u?`#${CD}=${encodeURIComponent(u)}`:"";return`${PD(t)}?${wa(l).slice(1)}${c}`}function PD({config:t}){return t.emulator?dp(t,RD):`https://${t.authDomain}/${AD}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ch="webStorageSupport";class kD{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=qT,this._completeRedirectFn=ZN,this._overrideRedirectResult=YN}async _openPopup(e,n,r,i){var o;Hn((o=this.eventManagers[e._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const s=await t_(e,n,r,Fd(),i);return ID(e,s,yp())}async _openRedirect(e,n,r,i){await this._originValidation(e);const s=await t_(e,n,r,Fd(),i);return xN(s),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:i,promise:s}=this.eventManagers[n];return i?Promise.resolve(i):(Hn(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await yD(e),r=new tD(e);return n.register("authEvent",i=>(K(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Ch,{type:Ch},i=>{var o;const s=(o=i==null?void 0:i[0])==null?void 0:o[Ch];s!==void 0&&n(!!s),rn(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=oD(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return xT()||RT()||pp()}}const ND=kD;var n_="@firebase/auth",r_="1.11.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DD{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){K(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xD(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function OD(t){nn(new qt("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:l}=r.options;K(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:o,authDomain:l,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:OT(t)},c=new Yk(r,i,s,u);return oN(c,n),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),nn(new qt("auth-internal",e=>{const n=ki(e.getProvider("auth").getImmediate());return(r=>new DD(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),It(n_,r_,xD(t)),It(n_,r_,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const VD=5*60,LD=oT("authIdTokenMaxAge")||VD;let i_=null;const bD=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>LD)return;const i=n==null?void 0:n.token;i_!==i&&(i_=i,await fetch(t,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function MD(t=Ju()){const e=Br(t,"auth");if(e.isInitialized())return e.getImmediate();const n=sN(t,{popupRedirectResolver:ND,persistence:[BN,kN,qT]}),r=oT("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const o=bD(s.toString());SN(n,o,()=>o(n.currentUser)),IN(n,l=>o(l))}}const i=rT("auth");return i&&aN(n,`http://${i}`),n}function FD(){var t;return((t=document.getElementsByTagName("head"))==null?void 0:t[0])??document}Xk({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=i=>{const s=mn("internal-error");s.customData=i,n(s)},r.type="text/javascript",r.charset="UTF-8",FD().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});OD("Browser");var s_=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Rr,JT;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,y){function w(){}w.prototype=y.prototype,E.F=y.prototype,E.prototype=new w,E.prototype.constructor=E,E.D=function(A,R,k){for(var S=Array(arguments.length-2),We=2;We<arguments.length;We++)S[We-2]=arguments[We];return y.prototype[R].apply(A,S)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,n),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(E,y,w){w||(w=0);const A=Array(16);if(typeof y=="string")for(var R=0;R<16;++R)A[R]=y.charCodeAt(w++)|y.charCodeAt(w++)<<8|y.charCodeAt(w++)<<16|y.charCodeAt(w++)<<24;else for(R=0;R<16;++R)A[R]=y[w++]|y[w++]<<8|y[w++]<<16|y[w++]<<24;y=E.g[0],w=E.g[1],R=E.g[2];let k=E.g[3],S;S=y+(k^w&(R^k))+A[0]+3614090360&4294967295,y=w+(S<<7&4294967295|S>>>25),S=k+(R^y&(w^R))+A[1]+3905402710&4294967295,k=y+(S<<12&4294967295|S>>>20),S=R+(w^k&(y^w))+A[2]+606105819&4294967295,R=k+(S<<17&4294967295|S>>>15),S=w+(y^R&(k^y))+A[3]+3250441966&4294967295,w=R+(S<<22&4294967295|S>>>10),S=y+(k^w&(R^k))+A[4]+4118548399&4294967295,y=w+(S<<7&4294967295|S>>>25),S=k+(R^y&(w^R))+A[5]+1200080426&4294967295,k=y+(S<<12&4294967295|S>>>20),S=R+(w^k&(y^w))+A[6]+2821735955&4294967295,R=k+(S<<17&4294967295|S>>>15),S=w+(y^R&(k^y))+A[7]+4249261313&4294967295,w=R+(S<<22&4294967295|S>>>10),S=y+(k^w&(R^k))+A[8]+1770035416&4294967295,y=w+(S<<7&4294967295|S>>>25),S=k+(R^y&(w^R))+A[9]+2336552879&4294967295,k=y+(S<<12&4294967295|S>>>20),S=R+(w^k&(y^w))+A[10]+4294925233&4294967295,R=k+(S<<17&4294967295|S>>>15),S=w+(y^R&(k^y))+A[11]+2304563134&4294967295,w=R+(S<<22&4294967295|S>>>10),S=y+(k^w&(R^k))+A[12]+1804603682&4294967295,y=w+(S<<7&4294967295|S>>>25),S=k+(R^y&(w^R))+A[13]+4254626195&4294967295,k=y+(S<<12&4294967295|S>>>20),S=R+(w^k&(y^w))+A[14]+2792965006&4294967295,R=k+(S<<17&4294967295|S>>>15),S=w+(y^R&(k^y))+A[15]+1236535329&4294967295,w=R+(S<<22&4294967295|S>>>10),S=y+(R^k&(w^R))+A[1]+4129170786&4294967295,y=w+(S<<5&4294967295|S>>>27),S=k+(w^R&(y^w))+A[6]+3225465664&4294967295,k=y+(S<<9&4294967295|S>>>23),S=R+(y^w&(k^y))+A[11]+643717713&4294967295,R=k+(S<<14&4294967295|S>>>18),S=w+(k^y&(R^k))+A[0]+3921069994&4294967295,w=R+(S<<20&4294967295|S>>>12),S=y+(R^k&(w^R))+A[5]+3593408605&4294967295,y=w+(S<<5&4294967295|S>>>27),S=k+(w^R&(y^w))+A[10]+38016083&4294967295,k=y+(S<<9&4294967295|S>>>23),S=R+(y^w&(k^y))+A[15]+3634488961&4294967295,R=k+(S<<14&4294967295|S>>>18),S=w+(k^y&(R^k))+A[4]+3889429448&4294967295,w=R+(S<<20&4294967295|S>>>12),S=y+(R^k&(w^R))+A[9]+568446438&4294967295,y=w+(S<<5&4294967295|S>>>27),S=k+(w^R&(y^w))+A[14]+3275163606&4294967295,k=y+(S<<9&4294967295|S>>>23),S=R+(y^w&(k^y))+A[3]+4107603335&4294967295,R=k+(S<<14&4294967295|S>>>18),S=w+(k^y&(R^k))+A[8]+1163531501&4294967295,w=R+(S<<20&4294967295|S>>>12),S=y+(R^k&(w^R))+A[13]+2850285829&4294967295,y=w+(S<<5&4294967295|S>>>27),S=k+(w^R&(y^w))+A[2]+4243563512&4294967295,k=y+(S<<9&4294967295|S>>>23),S=R+(y^w&(k^y))+A[7]+1735328473&4294967295,R=k+(S<<14&4294967295|S>>>18),S=w+(k^y&(R^k))+A[12]+2368359562&4294967295,w=R+(S<<20&4294967295|S>>>12),S=y+(w^R^k)+A[5]+4294588738&4294967295,y=w+(S<<4&4294967295|S>>>28),S=k+(y^w^R)+A[8]+2272392833&4294967295,k=y+(S<<11&4294967295|S>>>21),S=R+(k^y^w)+A[11]+1839030562&4294967295,R=k+(S<<16&4294967295|S>>>16),S=w+(R^k^y)+A[14]+4259657740&4294967295,w=R+(S<<23&4294967295|S>>>9),S=y+(w^R^k)+A[1]+2763975236&4294967295,y=w+(S<<4&4294967295|S>>>28),S=k+(y^w^R)+A[4]+1272893353&4294967295,k=y+(S<<11&4294967295|S>>>21),S=R+(k^y^w)+A[7]+4139469664&4294967295,R=k+(S<<16&4294967295|S>>>16),S=w+(R^k^y)+A[10]+3200236656&4294967295,w=R+(S<<23&4294967295|S>>>9),S=y+(w^R^k)+A[13]+681279174&4294967295,y=w+(S<<4&4294967295|S>>>28),S=k+(y^w^R)+A[0]+3936430074&4294967295,k=y+(S<<11&4294967295|S>>>21),S=R+(k^y^w)+A[3]+3572445317&4294967295,R=k+(S<<16&4294967295|S>>>16),S=w+(R^k^y)+A[6]+76029189&4294967295,w=R+(S<<23&4294967295|S>>>9),S=y+(w^R^k)+A[9]+3654602809&4294967295,y=w+(S<<4&4294967295|S>>>28),S=k+(y^w^R)+A[12]+3873151461&4294967295,k=y+(S<<11&4294967295|S>>>21),S=R+(k^y^w)+A[15]+530742520&4294967295,R=k+(S<<16&4294967295|S>>>16),S=w+(R^k^y)+A[2]+3299628645&4294967295,w=R+(S<<23&4294967295|S>>>9),S=y+(R^(w|~k))+A[0]+4096336452&4294967295,y=w+(S<<6&4294967295|S>>>26),S=k+(w^(y|~R))+A[7]+1126891415&4294967295,k=y+(S<<10&4294967295|S>>>22),S=R+(y^(k|~w))+A[14]+2878612391&4294967295,R=k+(S<<15&4294967295|S>>>17),S=w+(k^(R|~y))+A[5]+4237533241&4294967295,w=R+(S<<21&4294967295|S>>>11),S=y+(R^(w|~k))+A[12]+1700485571&4294967295,y=w+(S<<6&4294967295|S>>>26),S=k+(w^(y|~R))+A[3]+2399980690&4294967295,k=y+(S<<10&4294967295|S>>>22),S=R+(y^(k|~w))+A[10]+4293915773&4294967295,R=k+(S<<15&4294967295|S>>>17),S=w+(k^(R|~y))+A[1]+2240044497&4294967295,w=R+(S<<21&4294967295|S>>>11),S=y+(R^(w|~k))+A[8]+1873313359&4294967295,y=w+(S<<6&4294967295|S>>>26),S=k+(w^(y|~R))+A[15]+4264355552&4294967295,k=y+(S<<10&4294967295|S>>>22),S=R+(y^(k|~w))+A[6]+2734768916&4294967295,R=k+(S<<15&4294967295|S>>>17),S=w+(k^(R|~y))+A[13]+1309151649&4294967295,w=R+(S<<21&4294967295|S>>>11),S=y+(R^(w|~k))+A[4]+4149444226&4294967295,y=w+(S<<6&4294967295|S>>>26),S=k+(w^(y|~R))+A[11]+3174756917&4294967295,k=y+(S<<10&4294967295|S>>>22),S=R+(y^(k|~w))+A[2]+718787259&4294967295,R=k+(S<<15&4294967295|S>>>17),S=w+(k^(R|~y))+A[9]+3951481745&4294967295,E.g[0]=E.g[0]+y&4294967295,E.g[1]=E.g[1]+(R+(S<<21&4294967295|S>>>11))&4294967295,E.g[2]=E.g[2]+R&4294967295,E.g[3]=E.g[3]+k&4294967295}r.prototype.v=function(E,y){y===void 0&&(y=E.length);const w=y-this.blockSize,A=this.C;let R=this.h,k=0;for(;k<y;){if(R==0)for(;k<=w;)i(this,E,k),k+=this.blockSize;if(typeof E=="string"){for(;k<y;)if(A[R++]=E.charCodeAt(k++),R==this.blockSize){i(this,A),R=0;break}}else for(;k<y;)if(A[R++]=E[k++],R==this.blockSize){i(this,A),R=0;break}}this.h=R,this.o+=y},r.prototype.A=function(){var E=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);E[0]=128;for(var y=1;y<E.length-8;++y)E[y]=0;y=this.o*8;for(var w=E.length-8;w<E.length;++w)E[w]=y&255,y/=256;for(this.v(E),E=Array(16),y=0,w=0;w<4;++w)for(let A=0;A<32;A+=8)E[y++]=this.g[w]>>>A&255;return E};function s(E,y){var w=l;return Object.prototype.hasOwnProperty.call(w,E)?w[E]:w[E]=y(E)}function o(E,y){this.h=y;const w=[];let A=!0;for(let R=E.length-1;R>=0;R--){const k=E[R]|0;A&&k==y||(w[R]=k,A=!1)}this.g=w}var l={};function u(E){return-128<=E&&E<128?s(E,function(y){return new o([y|0],y<0?-1:0)}):new o([E|0],E<0?-1:0)}function c(E){if(isNaN(E)||!isFinite(E))return p;if(E<0)return D(c(-E));const y=[];let w=1;for(let A=0;E>=w;A++)y[A]=E/w|0,w*=4294967296;return new o(y,0)}function d(E,y){if(E.length==0)throw Error("number format error: empty string");if(y=y||10,y<2||36<y)throw Error("radix out of range: "+y);if(E.charAt(0)=="-")return D(d(E.substring(1),y));if(E.indexOf("-")>=0)throw Error('number format error: interior "-" character');const w=c(Math.pow(y,8));let A=p;for(let k=0;k<E.length;k+=8){var R=Math.min(8,E.length-k);const S=parseInt(E.substring(k,k+R),y);R<8?(R=c(Math.pow(y,R)),A=A.j(R).add(c(S))):(A=A.j(w),A=A.add(c(S)))}return A}var p=u(0),m=u(1),T=u(16777216);t=o.prototype,t.m=function(){if(P(this))return-D(this).m();let E=0,y=1;for(let w=0;w<this.g.length;w++){const A=this.i(w);E+=(A>=0?A:4294967296+A)*y,y*=4294967296}return E},t.toString=function(E){if(E=E||10,E<2||36<E)throw Error("radix out of range: "+E);if(C(this))return"0";if(P(this))return"-"+D(this).toString(E);const y=c(Math.pow(E,6));var w=this;let A="";for(;;){const R=x(w,y).g;w=v(w,R.j(y));let k=((w.g.length>0?w.g[0]:w.h)>>>0).toString(E);if(w=R,C(w))return k+A;for(;k.length<6;)k="0"+k;A=k+A}},t.i=function(E){return E<0?0:E<this.g.length?this.g[E]:this.h};function C(E){if(E.h!=0)return!1;for(let y=0;y<E.g.length;y++)if(E.g[y]!=0)return!1;return!0}function P(E){return E.h==-1}t.l=function(E){return E=v(this,E),P(E)?-1:C(E)?0:1};function D(E){const y=E.g.length,w=[];for(let A=0;A<y;A++)w[A]=~E.g[A];return new o(w,~E.h).add(m)}t.abs=function(){return P(this)?D(this):this},t.add=function(E){const y=Math.max(this.g.length,E.g.length),w=[];let A=0;for(let R=0;R<=y;R++){let k=A+(this.i(R)&65535)+(E.i(R)&65535),S=(k>>>16)+(this.i(R)>>>16)+(E.i(R)>>>16);A=S>>>16,k&=65535,S&=65535,w[R]=S<<16|k}return new o(w,w[w.length-1]&-2147483648?-1:0)};function v(E,y){return E.add(D(y))}t.j=function(E){if(C(this)||C(E))return p;if(P(this))return P(E)?D(this).j(D(E)):D(D(this).j(E));if(P(E))return D(this.j(D(E)));if(this.l(T)<0&&E.l(T)<0)return c(this.m()*E.m());const y=this.g.length+E.g.length,w=[];for(var A=0;A<2*y;A++)w[A]=0;for(A=0;A<this.g.length;A++)for(let R=0;R<E.g.length;R++){const k=this.i(A)>>>16,S=this.i(A)&65535,We=E.i(R)>>>16,Cn=E.i(R)&65535;w[2*A+2*R]+=S*Cn,_(w,2*A+2*R),w[2*A+2*R+1]+=k*Cn,_(w,2*A+2*R+1),w[2*A+2*R+1]+=S*We,_(w,2*A+2*R+1),w[2*A+2*R+2]+=k*We,_(w,2*A+2*R+2)}for(E=0;E<y;E++)w[E]=w[2*E+1]<<16|w[2*E];for(E=y;E<2*y;E++)w[E]=0;return new o(w,0)};function _(E,y){for(;(E[y]&65535)!=E[y];)E[y+1]+=E[y]>>>16,E[y]&=65535,y++}function I(E,y){this.g=E,this.h=y}function x(E,y){if(C(y))throw Error("division by zero");if(C(E))return new I(p,p);if(P(E))return y=x(D(E),y),new I(D(y.g),D(y.h));if(P(y))return y=x(E,D(y)),new I(D(y.g),y.h);if(E.g.length>30){if(P(E)||P(y))throw Error("slowDivide_ only works with positive integers.");for(var w=m,A=y;A.l(E)<=0;)w=F(w),A=F(A);var R=j(w,1),k=j(A,1);for(A=j(A,2),w=j(w,2);!C(A);){var S=k.add(A);S.l(E)<=0&&(R=R.add(w),k=S),A=j(A,1),w=j(w,1)}return y=v(E,R.j(y)),new I(R,y)}for(R=p;E.l(y)>=0;){for(w=Math.max(1,Math.floor(E.m()/y.m())),A=Math.ceil(Math.log(w)/Math.LN2),A=A<=48?1:Math.pow(2,A-48),k=c(w),S=k.j(y);P(S)||S.l(E)>0;)w-=A,k=c(w),S=k.j(y);C(k)&&(k=m),R=R.add(k),E=v(E,S)}return new I(R,E)}t.B=function(E){return x(this,E).h},t.and=function(E){const y=Math.max(this.g.length,E.g.length),w=[];for(let A=0;A<y;A++)w[A]=this.i(A)&E.i(A);return new o(w,this.h&E.h)},t.or=function(E){const y=Math.max(this.g.length,E.g.length),w=[];for(let A=0;A<y;A++)w[A]=this.i(A)|E.i(A);return new o(w,this.h|E.h)},t.xor=function(E){const y=Math.max(this.g.length,E.g.length),w=[];for(let A=0;A<y;A++)w[A]=this.i(A)^E.i(A);return new o(w,this.h^E.h)};function F(E){const y=E.g.length+1,w=[];for(let A=0;A<y;A++)w[A]=E.i(A)<<1|E.i(A-1)>>>31;return new o(w,E.h)}function j(E,y){const w=y>>5;y%=32;const A=E.g.length-w,R=[];for(let k=0;k<A;k++)R[k]=y>0?E.i(k+w)>>>y|E.i(k+w+1)<<32-y:E.i(k+w);return new o(R,E.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,JT=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=c,o.fromString=d,Rr=o}).apply(typeof s_<"u"?s_:typeof self<"u"?self:typeof window<"u"?window:{});var ll=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ZT,wo,eI,Ol,zd,tI,nI,rI;(function(){var t,e=Object.defineProperty;function n(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof ll=="object"&&ll];for(var h=0;h<a.length;++h){var f=a[h];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var r=n(this);function i(a,h){if(h)e:{var f=r;a=a.split(".");for(var g=0;g<a.length-1;g++){var N=a[g];if(!(N in f))break e;f=f[N]}a=a[a.length-1],g=f[a],h=h(g),h!=g&&h!=null&&e(f,a,{configurable:!0,writable:!0,value:h})}}i("Symbol.dispose",function(a){return a||Symbol("Symbol.dispose")}),i("Array.prototype.values",function(a){return a||function(){return this[Symbol.iterator]()}}),i("Object.entries",function(a){return a||function(h){var f=[],g;for(g in h)Object.prototype.hasOwnProperty.call(h,g)&&f.push([g,h[g]]);return f}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var s=s||{},o=this||self;function l(a){var h=typeof a;return h=="object"&&a!=null||h=="function"}function u(a,h,f){return a.call.apply(a.bind,arguments)}function c(a,h,f){return c=u,c.apply(null,arguments)}function d(a,h){var f=Array.prototype.slice.call(arguments,1);return function(){var g=f.slice();return g.push.apply(g,arguments),a.apply(this,g)}}function p(a,h){function f(){}f.prototype=h.prototype,a.Z=h.prototype,a.prototype=new f,a.prototype.constructor=a,a.Ob=function(g,N,O){for(var B=Array(arguments.length-2),Z=2;Z<arguments.length;Z++)B[Z-2]=arguments[Z];return h.prototype[N].apply(g,B)}}var m=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?a=>a&&AsyncContext.Snapshot.wrap(a):a=>a;function T(a){const h=a.length;if(h>0){const f=Array(h);for(let g=0;g<h;g++)f[g]=a[g];return f}return[]}function C(a,h){for(let g=1;g<arguments.length;g++){const N=arguments[g];var f=typeof N;if(f=f!="object"?f:N?Array.isArray(N)?"array":f:"null",f=="array"||f=="object"&&typeof N.length=="number"){f=a.length||0;const O=N.length||0;a.length=f+O;for(let B=0;B<O;B++)a[f+B]=N[B]}else a.push(N)}}class P{constructor(h,f){this.i=h,this.j=f,this.h=0,this.g=null}get(){let h;return this.h>0?(this.h--,h=this.g,this.g=h.next,h.next=null):h=this.i(),h}}function D(a){o.setTimeout(()=>{throw a},0)}function v(){var a=E;let h=null;return a.g&&(h=a.g,a.g=a.g.next,a.g||(a.h=null),h.next=null),h}class _{constructor(){this.h=this.g=null}add(h,f){const g=I.get();g.set(h,f),this.h?this.h.next=g:this.g=g,this.h=g}}var I=new P(()=>new x,a=>a.reset());class x{constructor(){this.next=this.g=this.h=null}set(h,f){this.h=h,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let F,j=!1,E=new _,y=()=>{const a=Promise.resolve(void 0);F=()=>{a.then(w)}};function w(){for(var a;a=v();){try{a.h.call(a.g)}catch(f){D(f)}var h=I;h.j(a),h.h<100&&(h.h++,a.next=h.g,h.g=a)}j=!1}function A(){this.u=this.u,this.C=this.C}A.prototype.u=!1,A.prototype.dispose=function(){this.u||(this.u=!0,this.N())},A.prototype[Symbol.dispose]=function(){this.dispose()},A.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function R(a,h){this.type=a,this.g=this.target=h,this.defaultPrevented=!1}R.prototype.h=function(){this.defaultPrevented=!0};var k=function(){if(!o.addEventListener||!Object.defineProperty)return!1;var a=!1,h=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const f=()=>{};o.addEventListener("test",f,h),o.removeEventListener("test",f,h)}catch{}return a}();function S(a){return/^[\s\xa0]*$/.test(a)}function We(a,h){R.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a&&this.init(a,h)}p(We,R),We.prototype.init=function(a,h){const f=this.type=a.type,g=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement,this.g=h,h=a.relatedTarget,h||(f=="mouseover"?h=a.fromElement:f=="mouseout"&&(h=a.toElement)),this.relatedTarget=h,g?(this.clientX=g.clientX!==void 0?g.clientX:g.pageX,this.clientY=g.clientY!==void 0?g.clientY:g.pageY,this.screenX=g.screenX||0,this.screenY=g.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=a.pointerType,this.state=a.state,this.i=a,a.defaultPrevented&&We.Z.h.call(this)},We.prototype.h=function(){We.Z.h.call(this);const a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var Cn="closure_listenable_"+(Math.random()*1e6|0),js=0;function Bs(a,h,f,g,N){this.listener=a,this.proxy=null,this.src=h,this.type=f,this.capture=!!g,this.ha=N,this.key=++js,this.da=this.fa=!1}function $(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Q(a,h,f){for(const g in a)h.call(f,a[g],g,a)}function J(a,h){for(const f in a)h.call(void 0,a[f],f,a)}function _e(a){const h={};for(const f in a)h[f]=a[f];return h}const De="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Wr(a,h){let f,g;for(let N=1;N<arguments.length;N++){g=arguments[N];for(f in g)a[f]=g[f];for(let O=0;O<De.length;O++)f=De[O],Object.prototype.hasOwnProperty.call(g,f)&&(a[f]=g[f])}}function bt(a){this.src=a,this.g={},this.h=0}bt.prototype.add=function(a,h,f,g,N){const O=a.toString();a=this.g[O],a||(a=this.g[O]=[],this.h++);const B=Kt(a,h,g,N);return B>-1?(h=a[B],f||(h.fa=!1)):(h=new Bs(h,this.src,O,!!g,N),h.fa=f,a.push(h)),h};function Kr(a,h){const f=h.type;if(f in a.g){var g=a.g[f],N=Array.prototype.indexOf.call(g,h,void 0),O;(O=N>=0)&&Array.prototype.splice.call(g,N,1),O&&($(h),a.g[f].length==0&&(delete a.g[f],a.h--))}}function Kt(a,h,f,g){for(let N=0;N<a.length;++N){const O=a[N];if(!O.da&&O.listener==h&&O.capture==!!f&&O.ha==g)return N}return-1}var Qn="closure_lm_"+(Math.random()*1e6|0),Rc={};function mm(a,h,f,g,N){if(Array.isArray(h)){for(let O=0;O<h.length;O++)mm(a,h[O],f,g,N);return null}return f=_m(f),a&&a[Cn]?a.J(h,f,l(g)?!!g.capture:!1,N):mS(a,h,f,!1,g,N)}function mS(a,h,f,g,N,O){if(!h)throw Error("Invalid event type");const B=l(N)?!!N.capture:!!N;let Z=Pc(a);if(Z||(a[Qn]=Z=new bt(a)),f=Z.add(h,f,g,B,O),f.proxy)return f;if(g=gS(),f.proxy=g,g.src=a,g.listener=f,a.addEventListener)k||(N=B),N===void 0&&(N=!1),a.addEventListener(h.toString(),g,N);else if(a.attachEvent)a.attachEvent(ym(h.toString()),g);else if(a.addListener&&a.removeListener)a.addListener(g);else throw Error("addEventListener and attachEvent are unavailable.");return f}function gS(){function a(f){return h.call(a.src,a.listener,f)}const h=yS;return a}function gm(a,h,f,g,N){if(Array.isArray(h))for(var O=0;O<h.length;O++)gm(a,h[O],f,g,N);else g=l(g)?!!g.capture:!!g,f=_m(f),a&&a[Cn]?(a=a.i,O=String(h).toString(),O in a.g&&(h=a.g[O],f=Kt(h,f,g,N),f>-1&&($(h[f]),Array.prototype.splice.call(h,f,1),h.length==0&&(delete a.g[O],a.h--)))):a&&(a=Pc(a))&&(h=a.g[h.toString()],a=-1,h&&(a=Kt(h,f,g,N)),(f=a>-1?h[a]:null)&&Cc(f))}function Cc(a){if(typeof a!="number"&&a&&!a.da){var h=a.src;if(h&&h[Cn])Kr(h.i,a);else{var f=a.type,g=a.proxy;h.removeEventListener?h.removeEventListener(f,g,a.capture):h.detachEvent?h.detachEvent(ym(f),g):h.addListener&&h.removeListener&&h.removeListener(g),(f=Pc(h))?(Kr(f,a),f.h==0&&(f.src=null,h[Qn]=null)):$(a)}}}function ym(a){return a in Rc?Rc[a]:Rc[a]="on"+a}function yS(a,h){if(a.da)a=!0;else{h=new We(h,this);const f=a.listener,g=a.ha||a.src;a.fa&&Cc(a),a=f.call(g,h)}return a}function Pc(a){return a=a[Qn],a instanceof bt?a:null}var kc="__closure_events_fn_"+(Math.random()*1e9>>>0);function _m(a){return typeof a=="function"?a:(a[kc]||(a[kc]=function(h){return a.handleEvent(h)}),a[kc])}function Ze(){A.call(this),this.i=new bt(this),this.M=this,this.G=null}p(Ze,A),Ze.prototype[Cn]=!0,Ze.prototype.removeEventListener=function(a,h,f,g){gm(this,a,h,f,g)};function lt(a,h){var f,g=a.G;if(g)for(f=[];g;g=g.G)f.push(g);if(a=a.M,g=h.type||h,typeof h=="string")h=new R(h,a);else if(h instanceof R)h.target=h.target||a;else{var N=h;h=new R(g,a),Wr(h,N)}N=!0;let O,B;if(f)for(B=f.length-1;B>=0;B--)O=h.g=f[B],N=Da(O,g,!0,h)&&N;if(O=h.g=a,N=Da(O,g,!0,h)&&N,N=Da(O,g,!1,h)&&N,f)for(B=0;B<f.length;B++)O=h.g=f[B],N=Da(O,g,!1,h)&&N}Ze.prototype.N=function(){if(Ze.Z.N.call(this),this.i){var a=this.i;for(const h in a.g){const f=a.g[h];for(let g=0;g<f.length;g++)$(f[g]);delete a.g[h],a.h--}}this.G=null},Ze.prototype.J=function(a,h,f,g){return this.i.add(String(a),h,!1,f,g)},Ze.prototype.K=function(a,h,f,g){return this.i.add(String(a),h,!0,f,g)};function Da(a,h,f,g){if(h=a.i.g[String(h)],!h)return!0;h=h.concat();let N=!0;for(let O=0;O<h.length;++O){const B=h[O];if(B&&!B.da&&B.capture==f){const Z=B.listener,Fe=B.ha||B.src;B.fa&&Kr(a.i,B),N=Z.call(Fe,g)!==!1&&N}}return N&&!g.defaultPrevented}function _S(a,h){if(typeof a!="function")if(a&&typeof a.handleEvent=="function")a=c(a.handleEvent,a);else throw Error("Invalid listener argument");return Number(h)>2147483647?-1:o.setTimeout(a,h||0)}function vm(a){a.g=_S(()=>{a.g=null,a.i&&(a.i=!1,vm(a))},a.l);const h=a.h;a.h=null,a.m.apply(null,h)}class vS extends A{constructor(h,f){super(),this.m=h,this.l=f,this.h=null,this.i=!1,this.g=null}j(h){this.h=arguments,this.g?this.i=!0:vm(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function zs(a){A.call(this),this.h=a,this.g={}}p(zs,A);var Em=[];function wm(a){Q(a.g,function(h,f){this.g.hasOwnProperty(f)&&Cc(h)},a),a.g={}}zs.prototype.N=function(){zs.Z.N.call(this),wm(this)},zs.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Nc=o.JSON.stringify,ES=o.JSON.parse,wS=class{stringify(a){return o.JSON.stringify(a,void 0)}parse(a){return o.JSON.parse(a,void 0)}};function Tm(){}function Im(){}var $s={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Dc(){R.call(this,"d")}p(Dc,R);function xc(){R.call(this,"c")}p(xc,R);var Gr={},Sm=null;function xa(){return Sm=Sm||new Ze}Gr.Ia="serverreachability";function Am(a){R.call(this,Gr.Ia,a)}p(Am,R);function Hs(a){const h=xa();lt(h,new Am(h))}Gr.STAT_EVENT="statevent";function Rm(a,h){R.call(this,Gr.STAT_EVENT,a),this.stat=h}p(Rm,R);function ut(a){const h=xa();lt(h,new Rm(h,a))}Gr.Ja="timingevent";function Cm(a,h){R.call(this,Gr.Ja,a),this.size=h}p(Cm,R);function qs(a,h){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){a()},h)}function Ws(){this.g=!0}Ws.prototype.ua=function(){this.g=!1};function TS(a,h,f,g,N,O){a.info(function(){if(a.g)if(O){var B="",Z=O.split("&");for(let he=0;he<Z.length;he++){var Fe=Z[he].split("=");if(Fe.length>1){const ze=Fe[0];Fe=Fe[1];const an=ze.split("_");B=an.length>=2&&an[1]=="type"?B+(ze+"="+Fe+"&"):B+(ze+"=redacted&")}}}else B=null;else B=O;return"XMLHTTP REQ ("+g+") [attempt "+N+"]: "+h+`
`+f+`
`+B})}function IS(a,h,f,g,N,O,B){a.info(function(){return"XMLHTTP RESP ("+g+") [ attempt "+N+"]: "+h+`
`+f+`
`+O+" "+B})}function Oi(a,h,f,g){a.info(function(){return"XMLHTTP TEXT ("+h+"): "+AS(a,f)+(g?" "+g:"")})}function SS(a,h){a.info(function(){return"TIMEOUT: "+h})}Ws.prototype.info=function(){};function AS(a,h){if(!a.g)return h;if(!h)return null;try{const O=JSON.parse(h);if(O){for(a=0;a<O.length;a++)if(Array.isArray(O[a])){var f=O[a];if(!(f.length<2)){var g=f[1];if(Array.isArray(g)&&!(g.length<1)){var N=g[0];if(N!="noop"&&N!="stop"&&N!="close")for(let B=1;B<g.length;B++)g[B]=""}}}}return Nc(O)}catch{return h}}var Oa={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Pm={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},km;function Oc(){}p(Oc,Tm),Oc.prototype.g=function(){return new XMLHttpRequest},km=new Oc;function Ks(a){return encodeURIComponent(String(a))}function RS(a){var h=1;a=a.split(":");const f=[];for(;h>0&&a.length;)f.push(a.shift()),h--;return a.length&&f.push(a.join(":")),f}function Yn(a,h,f,g){this.j=a,this.i=h,this.l=f,this.S=g||1,this.V=new zs(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Nm}function Nm(){this.i=null,this.g="",this.h=!1}var Dm={},Vc={};function Lc(a,h,f){a.M=1,a.A=La(on(h)),a.u=f,a.R=!0,xm(a,null)}function xm(a,h){a.F=Date.now(),Va(a),a.B=on(a.A);var f=a.B,g=a.S;Array.isArray(g)||(g=[String(g)]),qm(f.i,"t",g),a.C=0,f=a.j.L,a.h=new Nm,a.g=ug(a.j,f?h:null,!a.u),a.P>0&&(a.O=new vS(c(a.Y,a,a.g),a.P)),h=a.V,f=a.g,g=a.ba;var N="readystatechange";Array.isArray(N)||(N&&(Em[0]=N.toString()),N=Em);for(let O=0;O<N.length;O++){const B=mm(f,N[O],g||h.handleEvent,!1,h.h||h);if(!B)break;h.g[B.key]=B}h=a.J?_e(a.J):{},a.u?(a.v||(a.v="POST"),h["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.B,a.v,a.u,h)):(a.v="GET",a.g.ea(a.B,a.v,null,h)),Hs(),TS(a.i,a.v,a.B,a.l,a.S,a.u)}Yn.prototype.ba=function(a){a=a.target;const h=this.O;h&&Zn(a)==3?h.j():this.Y(a)},Yn.prototype.Y=function(a){try{if(a==this.g)e:{const Z=Zn(this.g),Fe=this.g.ya(),he=this.g.ca();if(!(Z<3)&&(Z!=3||this.g&&(this.h.h||this.g.la()||Jm(this.g)))){this.K||Z!=4||Fe==7||(Fe==8||he<=0?Hs(3):Hs(2)),bc(this);var h=this.g.ca();this.X=h;var f=CS(this);if(this.o=h==200,IS(this.i,this.v,this.B,this.l,this.S,Z,h),this.o){if(this.U&&!this.L){t:{if(this.g){var g,N=this.g;if((g=N.g?N.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!S(g)){var O=g;break t}}O=null}if(a=O)Oi(this.i,this.l,a,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Mc(this,a);else{this.o=!1,this.m=3,ut(12),Qr(this),Gs(this);break e}}if(this.R){a=!0;let ze;for(;!this.K&&this.C<f.length;)if(ze=PS(this,f),ze==Vc){Z==4&&(this.m=4,ut(14),a=!1),Oi(this.i,this.l,null,"[Incomplete Response]");break}else if(ze==Dm){this.m=4,ut(15),Oi(this.i,this.l,f,"[Invalid Chunk]"),a=!1;break}else Oi(this.i,this.l,ze,null),Mc(this,ze);if(Om(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Z!=4||f.length!=0||this.h.h||(this.m=1,ut(16),a=!1),this.o=this.o&&a,!a)Oi(this.i,this.l,f,"[Invalid Chunked Response]"),Qr(this),Gs(this);else if(f.length>0&&!this.W){this.W=!0;var B=this.j;B.g==this&&B.aa&&!B.P&&(B.j.info("Great, no buffering proxy detected. Bytes received: "+f.length),qc(B),B.P=!0,ut(11))}}else Oi(this.i,this.l,f,null),Mc(this,f);Z==4&&Qr(this),this.o&&!this.K&&(Z==4?sg(this.j,this):(this.o=!1,Va(this)))}else zS(this.g),h==400&&f.indexOf("Unknown SID")>0?(this.m=3,ut(12)):(this.m=0,ut(13)),Qr(this),Gs(this)}}}catch{}finally{}};function CS(a){if(!Om(a))return a.g.la();const h=Jm(a.g);if(h==="")return"";let f="";const g=h.length,N=Zn(a.g)==4;if(!a.h.i){if(typeof TextDecoder>"u")return Qr(a),Gs(a),"";a.h.i=new o.TextDecoder}for(let O=0;O<g;O++)a.h.h=!0,f+=a.h.i.decode(h[O],{stream:!(N&&O==g-1)});return h.length=0,a.h.g+=f,a.C=0,a.h.g}function Om(a){return a.g?a.v=="GET"&&a.M!=2&&a.j.Aa:!1}function PS(a,h){var f=a.C,g=h.indexOf(`
`,f);return g==-1?Vc:(f=Number(h.substring(f,g)),isNaN(f)?Dm:(g+=1,g+f>h.length?Vc:(h=h.slice(g,g+f),a.C=g+f,h)))}Yn.prototype.cancel=function(){this.K=!0,Qr(this)};function Va(a){a.T=Date.now()+a.H,Vm(a,a.H)}function Vm(a,h){if(a.D!=null)throw Error("WatchDog timer not null");a.D=qs(c(a.aa,a),h)}function bc(a){a.D&&(o.clearTimeout(a.D),a.D=null)}Yn.prototype.aa=function(){this.D=null;const a=Date.now();a-this.T>=0?(SS(this.i,this.B),this.M!=2&&(Hs(),ut(17)),Qr(this),this.m=2,Gs(this)):Vm(this,this.T-a)};function Gs(a){a.j.I==0||a.K||sg(a.j,a)}function Qr(a){bc(a);var h=a.O;h&&typeof h.dispose=="function"&&h.dispose(),a.O=null,wm(a.V),a.g&&(h=a.g,a.g=null,h.abort(),h.dispose())}function Mc(a,h){try{var f=a.j;if(f.I!=0&&(f.g==a||Fc(f.h,a))){if(!a.L&&Fc(f.h,a)&&f.I==3){try{var g=f.Ba.g.parse(h)}catch{g=null}if(Array.isArray(g)&&g.length==3){var N=g;if(N[0]==0){e:if(!f.v){if(f.g)if(f.g.F+3e3<a.F)ja(f),Fa(f);else break e;Hc(f),ut(18)}}else f.xa=N[1],0<f.xa-f.K&&N[2]<37500&&f.F&&f.A==0&&!f.C&&(f.C=qs(c(f.Va,f),6e3));Mm(f.h)<=1&&f.ta&&(f.ta=void 0)}else Xr(f,11)}else if((a.L||f.g==a)&&ja(f),!S(h))for(N=f.Ba.g.parse(h),h=0;h<N.length;h++){let he=N[h];const ze=he[0];if(!(ze<=f.K))if(f.K=ze,he=he[1],f.I==2)if(he[0]=="c"){f.M=he[1],f.ba=he[2];const an=he[3];an!=null&&(f.ka=an,f.j.info("VER="+f.ka));const Jr=he[4];Jr!=null&&(f.za=Jr,f.j.info("SVER="+f.za));const er=he[5];er!=null&&typeof er=="number"&&er>0&&(g=1.5*er,f.O=g,f.j.info("backChannelRequestTimeoutMs_="+g)),g=f;const tr=a.g;if(tr){const za=tr.g?tr.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(za){var O=g.h;O.g||za.indexOf("spdy")==-1&&za.indexOf("quic")==-1&&za.indexOf("h2")==-1||(O.j=O.l,O.g=new Set,O.h&&(Uc(O,O.h),O.h=null))}if(g.G){const Wc=tr.g?tr.g.getResponseHeader("X-HTTP-Session-Id"):null;Wc&&(g.wa=Wc,pe(g.J,g.G,Wc))}}f.I=3,f.l&&f.l.ra(),f.aa&&(f.T=Date.now()-a.F,f.j.info("Handshake RTT: "+f.T+"ms")),g=f;var B=a;if(g.na=lg(g,g.L?g.ba:null,g.W),B.L){Fm(g.h,B);var Z=B,Fe=g.O;Fe&&(Z.H=Fe),Z.D&&(bc(Z),Va(Z)),g.g=B}else rg(g);f.i.length>0&&Ua(f)}else he[0]!="stop"&&he[0]!="close"||Xr(f,7);else f.I==3&&(he[0]=="stop"||he[0]=="close"?he[0]=="stop"?Xr(f,7):$c(f):he[0]!="noop"&&f.l&&f.l.qa(he),f.A=0)}}Hs(4)}catch{}}var kS=class{constructor(a,h){this.g=a,this.map=h}};function Lm(a){this.l=a||10,o.PerformanceNavigationTiming?(a=o.performance.getEntriesByType("navigation"),a=a.length>0&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function bm(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Mm(a){return a.h?1:a.g?a.g.size:0}function Fc(a,h){return a.h?a.h==h:a.g?a.g.has(h):!1}function Uc(a,h){a.g?a.g.add(h):a.h=h}function Fm(a,h){a.h&&a.h==h?a.h=null:a.g&&a.g.has(h)&&a.g.delete(h)}Lm.prototype.cancel=function(){if(this.i=Um(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Um(a){if(a.h!=null)return a.i.concat(a.h.G);if(a.g!=null&&a.g.size!==0){let h=a.i;for(const f of a.g.values())h=h.concat(f.G);return h}return T(a.i)}var jm=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function NS(a,h){if(a){a=a.split("&");for(let f=0;f<a.length;f++){const g=a[f].indexOf("=");let N,O=null;g>=0?(N=a[f].substring(0,g),O=a[f].substring(g+1)):N=a[f],h(N,O?decodeURIComponent(O.replace(/\+/g," ")):"")}}}function Xn(a){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let h;a instanceof Xn?(this.l=a.l,Qs(this,a.j),this.o=a.o,this.g=a.g,Ys(this,a.u),this.h=a.h,jc(this,Wm(a.i)),this.m=a.m):a&&(h=String(a).match(jm))?(this.l=!1,Qs(this,h[1]||"",!0),this.o=Xs(h[2]||""),this.g=Xs(h[3]||"",!0),Ys(this,h[4]),this.h=Xs(h[5]||"",!0),jc(this,h[6]||"",!0),this.m=Xs(h[7]||"")):(this.l=!1,this.i=new Zs(null,this.l))}Xn.prototype.toString=function(){const a=[];var h=this.j;h&&a.push(Js(h,Bm,!0),":");var f=this.g;return(f||h=="file")&&(a.push("//"),(h=this.o)&&a.push(Js(h,Bm,!0),"@"),a.push(Ks(f).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.u,f!=null&&a.push(":",String(f))),(f=this.h)&&(this.g&&f.charAt(0)!="/"&&a.push("/"),a.push(Js(f,f.charAt(0)=="/"?OS:xS,!0))),(f=this.i.toString())&&a.push("?",f),(f=this.m)&&a.push("#",Js(f,LS)),a.join("")},Xn.prototype.resolve=function(a){const h=on(this);let f=!!a.j;f?Qs(h,a.j):f=!!a.o,f?h.o=a.o:f=!!a.g,f?h.g=a.g:f=a.u!=null;var g=a.h;if(f)Ys(h,a.u);else if(f=!!a.h){if(g.charAt(0)!="/")if(this.g&&!this.h)g="/"+g;else{var N=h.h.lastIndexOf("/");N!=-1&&(g=h.h.slice(0,N+1)+g)}if(N=g,N==".."||N==".")g="";else if(N.indexOf("./")!=-1||N.indexOf("/.")!=-1){g=N.lastIndexOf("/",0)==0,N=N.split("/");const O=[];for(let B=0;B<N.length;){const Z=N[B++];Z=="."?g&&B==N.length&&O.push(""):Z==".."?((O.length>1||O.length==1&&O[0]!="")&&O.pop(),g&&B==N.length&&O.push("")):(O.push(Z),g=!0)}g=O.join("/")}else g=N}return f?h.h=g:f=a.i.toString()!=="",f?jc(h,Wm(a.i)):f=!!a.m,f&&(h.m=a.m),h};function on(a){return new Xn(a)}function Qs(a,h,f){a.j=f?Xs(h,!0):h,a.j&&(a.j=a.j.replace(/:$/,""))}function Ys(a,h){if(h){if(h=Number(h),isNaN(h)||h<0)throw Error("Bad port number "+h);a.u=h}else a.u=null}function jc(a,h,f){h instanceof Zs?(a.i=h,bS(a.i,a.l)):(f||(h=Js(h,VS)),a.i=new Zs(h,a.l))}function pe(a,h,f){a.i.set(h,f)}function La(a){return pe(a,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),a}function Xs(a,h){return a?h?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Js(a,h,f){return typeof a=="string"?(a=encodeURI(a).replace(h,DS),f&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function DS(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Bm=/[#\/\?@]/g,xS=/[#\?:]/g,OS=/[#\?]/g,VS=/[#\?@]/g,LS=/#/g;function Zs(a,h){this.h=this.g=null,this.i=a||null,this.j=!!h}function Yr(a){a.g||(a.g=new Map,a.h=0,a.i&&NS(a.i,function(h,f){a.add(decodeURIComponent(h.replace(/\+/g," ")),f)}))}t=Zs.prototype,t.add=function(a,h){Yr(this),this.i=null,a=Vi(this,a);let f=this.g.get(a);return f||this.g.set(a,f=[]),f.push(h),this.h+=1,this};function zm(a,h){Yr(a),h=Vi(a,h),a.g.has(h)&&(a.i=null,a.h-=a.g.get(h).length,a.g.delete(h))}function $m(a,h){return Yr(a),h=Vi(a,h),a.g.has(h)}t.forEach=function(a,h){Yr(this),this.g.forEach(function(f,g){f.forEach(function(N){a.call(h,N,g,this)},this)},this)};function Hm(a,h){Yr(a);let f=[];if(typeof h=="string")$m(a,h)&&(f=f.concat(a.g.get(Vi(a,h))));else for(a=Array.from(a.g.values()),h=0;h<a.length;h++)f=f.concat(a[h]);return f}t.set=function(a,h){return Yr(this),this.i=null,a=Vi(this,a),$m(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[h]),this.h+=1,this},t.get=function(a,h){return a?(a=Hm(this,a),a.length>0?String(a[0]):h):h};function qm(a,h,f){zm(a,h),f.length>0&&(a.i=null,a.g.set(Vi(a,h),T(f)),a.h+=f.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],h=Array.from(this.g.keys());for(let g=0;g<h.length;g++){var f=h[g];const N=Ks(f);f=Hm(this,f);for(let O=0;O<f.length;O++){let B=N;f[O]!==""&&(B+="="+Ks(f[O])),a.push(B)}}return this.i=a.join("&")};function Wm(a){const h=new Zs;return h.i=a.i,a.g&&(h.g=new Map(a.g),h.h=a.h),h}function Vi(a,h){return h=String(h),a.j&&(h=h.toLowerCase()),h}function bS(a,h){h&&!a.j&&(Yr(a),a.i=null,a.g.forEach(function(f,g){const N=g.toLowerCase();g!=N&&(zm(this,g),qm(this,N,f))},a)),a.j=h}function MS(a,h){const f=new Ws;if(o.Image){const g=new Image;g.onload=d(Jn,f,"TestLoadImage: loaded",!0,h,g),g.onerror=d(Jn,f,"TestLoadImage: error",!1,h,g),g.onabort=d(Jn,f,"TestLoadImage: abort",!1,h,g),g.ontimeout=d(Jn,f,"TestLoadImage: timeout",!1,h,g),o.setTimeout(function(){g.ontimeout&&g.ontimeout()},1e4),g.src=a}else h(!1)}function FS(a,h){const f=new Ws,g=new AbortController,N=setTimeout(()=>{g.abort(),Jn(f,"TestPingServer: timeout",!1,h)},1e4);fetch(a,{signal:g.signal}).then(O=>{clearTimeout(N),O.ok?Jn(f,"TestPingServer: ok",!0,h):Jn(f,"TestPingServer: server error",!1,h)}).catch(()=>{clearTimeout(N),Jn(f,"TestPingServer: error",!1,h)})}function Jn(a,h,f,g,N){try{N&&(N.onload=null,N.onerror=null,N.onabort=null,N.ontimeout=null),g(f)}catch{}}function US(){this.g=new wS}function Bc(a){this.i=a.Sb||null,this.h=a.ab||!1}p(Bc,Tm),Bc.prototype.g=function(){return new ba(this.i,this.h)};function ba(a,h){Ze.call(this),this.H=a,this.o=h,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}p(ba,Ze),t=ba.prototype,t.open=function(a,h){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=a,this.D=h,this.readyState=1,to(this)},t.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const h={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};a&&(h.body=a),(this.H||o).fetch(new Request(this.D,h)).then(this.Pa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,eo(this)),this.readyState=0},t.Pa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,to(this)),this.g&&(this.readyState=3,to(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Km(this)}else a.text().then(this.Oa.bind(this),this.ga.bind(this))};function Km(a){a.j.read().then(a.Ma.bind(a)).catch(a.ga.bind(a))}t.Ma=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var h=a.value?a.value:new Uint8Array(0);(h=this.B.decode(h,{stream:!a.done}))&&(this.response=this.responseText+=h)}a.done?eo(this):to(this),this.readyState==3&&Km(this)}},t.Oa=function(a){this.g&&(this.response=this.responseText=a,eo(this))},t.Na=function(a){this.g&&(this.response=a,eo(this))},t.ga=function(){this.g&&eo(this)};function eo(a){a.readyState=4,a.l=null,a.j=null,a.B=null,to(a)}t.setRequestHeader=function(a,h){this.A.append(a,h)},t.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],h=this.h.entries();for(var f=h.next();!f.done;)f=f.value,a.push(f[0]+": "+f[1]),f=h.next();return a.join(`\r
`)};function to(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(ba.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Gm(a){let h="";return Q(a,function(f,g){h+=g,h+=":",h+=f,h+=`\r
`}),h}function zc(a,h,f){e:{for(g in f){var g=!1;break e}g=!0}g||(f=Gm(f),typeof a=="string"?f!=null&&Ks(f):pe(a,h,f))}function Ae(a){Ze.call(this),this.headers=new Map,this.L=a||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}p(Ae,Ze);var jS=/^https?$/i,BS=["POST","PUT"];t=Ae.prototype,t.Fa=function(a){this.H=a},t.ea=function(a,h,f,g){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);h=h?h.toUpperCase():"GET",this.D=a,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():km.g(),this.g.onreadystatechange=m(c(this.Ca,this));try{this.B=!0,this.g.open(h,String(a),!0),this.B=!1}catch(O){Qm(this,O);return}if(a=f||"",f=new Map(this.headers),g)if(Object.getPrototypeOf(g)===Object.prototype)for(var N in g)f.set(N,g[N]);else if(typeof g.keys=="function"&&typeof g.get=="function")for(const O of g.keys())f.set(O,g.get(O));else throw Error("Unknown input type for opt_headers: "+String(g));g=Array.from(f.keys()).find(O=>O.toLowerCase()=="content-type"),N=o.FormData&&a instanceof o.FormData,!(Array.prototype.indexOf.call(BS,h,void 0)>=0)||g||N||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[O,B]of f)this.g.setRequestHeader(O,B);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(a),this.v=!1}catch(O){Qm(this,O)}};function Qm(a,h){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=h,a.o=5,Ym(a),Ma(a)}function Ym(a){a.A||(a.A=!0,lt(a,"complete"),lt(a,"error"))}t.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=a||7,lt(this,"complete"),lt(this,"abort"),Ma(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Ma(this,!0)),Ae.Z.N.call(this)},t.Ca=function(){this.u||(this.B||this.v||this.j?Xm(this):this.Xa())},t.Xa=function(){Xm(this)};function Xm(a){if(a.h&&typeof s<"u"){if(a.v&&Zn(a)==4)setTimeout(a.Ca.bind(a),0);else if(lt(a,"readystatechange"),Zn(a)==4){a.h=!1;try{const O=a.ca();e:switch(O){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var h=!0;break e;default:h=!1}var f;if(!(f=h)){var g;if(g=O===0){let B=String(a.D).match(jm)[1]||null;!B&&o.self&&o.self.location&&(B=o.self.location.protocol.slice(0,-1)),g=!jS.test(B?B.toLowerCase():"")}f=g}if(f)lt(a,"complete"),lt(a,"success");else{a.o=6;try{var N=Zn(a)>2?a.g.statusText:""}catch{N=""}a.l=N+" ["+a.ca()+"]",Ym(a)}}finally{Ma(a)}}}}function Ma(a,h){if(a.g){a.m&&(clearTimeout(a.m),a.m=null);const f=a.g;a.g=null,h||lt(a,"ready");try{f.onreadystatechange=null}catch{}}}t.isActive=function(){return!!this.g};function Zn(a){return a.g?a.g.readyState:0}t.ca=function(){try{return Zn(this)>2?this.g.status:-1}catch{return-1}},t.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.La=function(a){if(this.g){var h=this.g.responseText;return a&&h.indexOf(a)==0&&(h=h.substring(a.length)),ES(h)}};function Jm(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.F){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function zS(a){const h={};a=(a.g&&Zn(a)>=2&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let g=0;g<a.length;g++){if(S(a[g]))continue;var f=RS(a[g]);const N=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const O=h[N]||[];h[N]=O,O.push(f)}J(h,function(g){return g.join(", ")})}t.ya=function(){return this.o},t.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function no(a,h,f){return f&&f.internalChannelParams&&f.internalChannelParams[a]||h}function Zm(a){this.za=0,this.i=[],this.j=new Ws,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=no("failFast",!1,a),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=no("baseRetryDelayMs",5e3,a),this.Za=no("retryDelaySeedMs",1e4,a),this.Ta=no("forwardChannelMaxRetries",2,a),this.va=no("forwardChannelRequestTimeoutMs",2e4,a),this.ma=a&&a.xmlHttpFactory||void 0,this.Ua=a&&a.Rb||void 0,this.Aa=a&&a.useFetchStreams||!1,this.O=void 0,this.L=a&&a.supportsCrossDomainXhr||!1,this.M="",this.h=new Lm(a&&a.concurrentRequestLimit),this.Ba=new US,this.S=a&&a.fastHandshake||!1,this.R=a&&a.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=a&&a.Pb||!1,a&&a.ua&&this.j.ua(),a&&a.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&a&&a.detectBufferingProxy||!1,this.ia=void 0,a&&a.longPollingTimeout&&a.longPollingTimeout>0&&(this.ia=a.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}t=Zm.prototype,t.ka=8,t.I=1,t.connect=function(a,h,f,g){ut(0),this.W=a,this.H=h||{},f&&g!==void 0&&(this.H.OSID=f,this.H.OAID=g),this.F=this.X,this.J=lg(this,null,this.W),Ua(this)};function $c(a){if(eg(a),a.I==3){var h=a.V++,f=on(a.J);if(pe(f,"SID",a.M),pe(f,"RID",h),pe(f,"TYPE","terminate"),ro(a,f),h=new Yn(a,a.j,h),h.M=2,h.A=La(on(f)),f=!1,o.navigator&&o.navigator.sendBeacon)try{f=o.navigator.sendBeacon(h.A.toString(),"")}catch{}!f&&o.Image&&(new Image().src=h.A,f=!0),f||(h.g=ug(h.j,null),h.g.ea(h.A)),h.F=Date.now(),Va(h)}ag(a)}function Fa(a){a.g&&(qc(a),a.g.cancel(),a.g=null)}function eg(a){Fa(a),a.v&&(o.clearTimeout(a.v),a.v=null),ja(a),a.h.cancel(),a.m&&(typeof a.m=="number"&&o.clearTimeout(a.m),a.m=null)}function Ua(a){if(!bm(a.h)&&!a.m){a.m=!0;var h=a.Ea;F||y(),j||(F(),j=!0),E.add(h,a),a.D=0}}function $S(a,h){return Mm(a.h)>=a.h.j-(a.m?1:0)?!1:a.m?(a.i=h.G.concat(a.i),!0):a.I==1||a.I==2||a.D>=(a.Sa?0:a.Ta)?!1:(a.m=qs(c(a.Ea,a,h),og(a,a.D)),a.D++,!0)}t.Ea=function(a){if(this.m)if(this.m=null,this.I==1){if(!a){this.V=Math.floor(Math.random()*1e5),a=this.V++;const N=new Yn(this,this.j,a);let O=this.o;if(this.U&&(O?(O=_e(O),Wr(O,this.U)):O=this.U),this.u!==null||this.R||(N.J=O,O=null),this.S)e:{for(var h=0,f=0;f<this.i.length;f++){t:{var g=this.i[f];if("__data__"in g.map&&(g=g.map.__data__,typeof g=="string")){g=g.length;break t}g=void 0}if(g===void 0)break;if(h+=g,h>4096){h=f;break e}if(h===4096||f===this.i.length-1){h=f+1;break e}}h=1e3}else h=1e3;h=ng(this,N,h),f=on(this.J),pe(f,"RID",a),pe(f,"CVER",22),this.G&&pe(f,"X-HTTP-Session-Id",this.G),ro(this,f),O&&(this.R?h="headers="+Ks(Gm(O))+"&"+h:this.u&&zc(f,this.u,O)),Uc(this.h,N),this.Ra&&pe(f,"TYPE","init"),this.S?(pe(f,"$req",h),pe(f,"SID","null"),N.U=!0,Lc(N,f,null)):Lc(N,f,h),this.I=2}}else this.I==3&&(a?tg(this,a):this.i.length==0||bm(this.h)||tg(this))};function tg(a,h){var f;h?f=h.l:f=a.V++;const g=on(a.J);pe(g,"SID",a.M),pe(g,"RID",f),pe(g,"AID",a.K),ro(a,g),a.u&&a.o&&zc(g,a.u,a.o),f=new Yn(a,a.j,f,a.D+1),a.u===null&&(f.J=a.o),h&&(a.i=h.G.concat(a.i)),h=ng(a,f,1e3),f.H=Math.round(a.va*.5)+Math.round(a.va*.5*Math.random()),Uc(a.h,f),Lc(f,g,h)}function ro(a,h){a.H&&Q(a.H,function(f,g){pe(h,g,f)}),a.l&&Q({},function(f,g){pe(h,g,f)})}function ng(a,h,f){f=Math.min(a.i.length,f);const g=a.l?c(a.l.Ka,a.l,a):null;e:{var N=a.i;let Z=-1;for(;;){const Fe=["count="+f];Z==-1?f>0?(Z=N[0].g,Fe.push("ofs="+Z)):Z=0:Fe.push("ofs="+Z);let he=!0;for(let ze=0;ze<f;ze++){var O=N[ze].g;const an=N[ze].map;if(O-=Z,O<0)Z=Math.max(0,N[ze].g-100),he=!1;else try{O="req"+O+"_"||"";try{var B=an instanceof Map?an:Object.entries(an);for(const[Jr,er]of B){let tr=er;l(er)&&(tr=Nc(er)),Fe.push(O+Jr+"="+encodeURIComponent(tr))}}catch(Jr){throw Fe.push(O+"type="+encodeURIComponent("_badmap")),Jr}}catch{g&&g(an)}}if(he){B=Fe.join("&");break e}}B=void 0}return a=a.i.splice(0,f),h.G=a,B}function rg(a){if(!a.g&&!a.v){a.Y=1;var h=a.Da;F||y(),j||(F(),j=!0),E.add(h,a),a.A=0}}function Hc(a){return a.g||a.v||a.A>=3?!1:(a.Y++,a.v=qs(c(a.Da,a),og(a,a.A)),a.A++,!0)}t.Da=function(){if(this.v=null,ig(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var a=4*this.T;this.j.info("BP detection timer enabled: "+a),this.B=qs(c(this.Wa,this),a)}},t.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,ut(10),Fa(this),ig(this))};function qc(a){a.B!=null&&(o.clearTimeout(a.B),a.B=null)}function ig(a){a.g=new Yn(a,a.j,"rpc",a.Y),a.u===null&&(a.g.J=a.o),a.g.P=0;var h=on(a.na);pe(h,"RID","rpc"),pe(h,"SID",a.M),pe(h,"AID",a.K),pe(h,"CI",a.F?"0":"1"),!a.F&&a.ia&&pe(h,"TO",a.ia),pe(h,"TYPE","xmlhttp"),ro(a,h),a.u&&a.o&&zc(h,a.u,a.o),a.O&&(a.g.H=a.O);var f=a.g;a=a.ba,f.M=1,f.A=La(on(h)),f.u=null,f.R=!0,xm(f,a)}t.Va=function(){this.C!=null&&(this.C=null,Fa(this),Hc(this),ut(19))};function ja(a){a.C!=null&&(o.clearTimeout(a.C),a.C=null)}function sg(a,h){var f=null;if(a.g==h){ja(a),qc(a),a.g=null;var g=2}else if(Fc(a.h,h))f=h.G,Fm(a.h,h),g=1;else return;if(a.I!=0){if(h.o)if(g==1){f=h.u?h.u.length:0,h=Date.now()-h.F;var N=a.D;g=xa(),lt(g,new Cm(g,f)),Ua(a)}else rg(a);else if(N=h.m,N==3||N==0&&h.X>0||!(g==1&&$S(a,h)||g==2&&Hc(a)))switch(f&&f.length>0&&(h=a.h,h.i=h.i.concat(f)),N){case 1:Xr(a,5);break;case 4:Xr(a,10);break;case 3:Xr(a,6);break;default:Xr(a,2)}}}function og(a,h){let f=a.Qa+Math.floor(Math.random()*a.Za);return a.isActive()||(f*=2),f*h}function Xr(a,h){if(a.j.info("Error code "+h),h==2){var f=c(a.bb,a),g=a.Ua;const N=!g;g=new Xn(g||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||Qs(g,"https"),La(g),N?MS(g.toString(),f):FS(g.toString(),f)}else ut(2);a.I=0,a.l&&a.l.pa(h),ag(a),eg(a)}t.bb=function(a){a?(this.j.info("Successfully pinged google.com"),ut(2)):(this.j.info("Failed to ping google.com"),ut(1))};function ag(a){if(a.I=0,a.ja=[],a.l){const h=Um(a.h);(h.length!=0||a.i.length!=0)&&(C(a.ja,h),C(a.ja,a.i),a.h.i.length=0,T(a.i),a.i.length=0),a.l.oa()}}function lg(a,h,f){var g=f instanceof Xn?on(f):new Xn(f);if(g.g!="")h&&(g.g=h+"."+g.g),Ys(g,g.u);else{var N=o.location;g=N.protocol,h=h?h+"."+N.hostname:N.hostname,N=+N.port;const O=new Xn(null);g&&Qs(O,g),h&&(O.g=h),N&&Ys(O,N),f&&(O.h=f),g=O}return f=a.G,h=a.wa,f&&h&&pe(g,f,h),pe(g,"VER",a.ka),ro(a,g),g}function ug(a,h,f){if(h&&!a.L)throw Error("Can't create secondary domain capable XhrIo object.");return h=a.Aa&&!a.ma?new Ae(new Bc({ab:f})):new Ae(a.ma),h.Fa(a.L),h}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function cg(){}t=cg.prototype,t.ra=function(){},t.qa=function(){},t.pa=function(){},t.oa=function(){},t.isActive=function(){return!0},t.Ka=function(){};function Ba(){}Ba.prototype.g=function(a,h){return new At(a,h)};function At(a,h){Ze.call(this),this.g=new Zm(h),this.l=a,this.h=h&&h.messageUrlParams||null,a=h&&h.messageHeaders||null,h&&h.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=h&&h.initMessageHeaders||null,h&&h.messageContentType&&(a?a["X-WebChannel-Content-Type"]=h.messageContentType:a={"X-WebChannel-Content-Type":h.messageContentType}),h&&h.sa&&(a?a["X-WebChannel-Client-Profile"]=h.sa:a={"X-WebChannel-Client-Profile":h.sa}),this.g.U=a,(a=h&&h.Qb)&&!S(a)&&(this.g.u=a),this.A=h&&h.supportsCrossDomainXhr||!1,this.v=h&&h.sendRawJson||!1,(h=h&&h.httpSessionIdParam)&&!S(h)&&(this.g.G=h,a=this.h,a!==null&&h in a&&(a=this.h,h in a&&delete a[h])),this.j=new Li(this)}p(At,Ze),At.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},At.prototype.close=function(){$c(this.g)},At.prototype.o=function(a){var h=this.g;if(typeof a=="string"){var f={};f.__data__=a,a=f}else this.v&&(f={},f.__data__=Nc(a),a=f);h.i.push(new kS(h.Ya++,a)),h.I==3&&Ua(h)},At.prototype.N=function(){this.g.l=null,delete this.j,$c(this.g),delete this.g,At.Z.N.call(this)};function hg(a){Dc.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var h=a.__sm__;if(h){e:{for(const f in h){a=f;break e}a=void 0}(this.i=a)&&(a=this.i,h=h!==null&&a in h?h[a]:void 0),this.data=h}else this.data=a}p(hg,Dc);function dg(){xc.call(this),this.status=1}p(dg,xc);function Li(a){this.g=a}p(Li,cg),Li.prototype.ra=function(){lt(this.g,"a")},Li.prototype.qa=function(a){lt(this.g,new hg(a))},Li.prototype.pa=function(a){lt(this.g,new dg)},Li.prototype.oa=function(){lt(this.g,"b")},Ba.prototype.createWebChannel=Ba.prototype.g,At.prototype.send=At.prototype.o,At.prototype.open=At.prototype.m,At.prototype.close=At.prototype.close,rI=function(){return new Ba},nI=function(){return xa()},tI=Gr,zd={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Oa.NO_ERROR=0,Oa.TIMEOUT=8,Oa.HTTP_ERROR=6,Ol=Oa,Pm.COMPLETE="complete",eI=Pm,Im.EventType=$s,$s.OPEN="a",$s.CLOSE="b",$s.ERROR="c",$s.MESSAGE="d",Ze.prototype.listen=Ze.prototype.J,wo=Im,Ae.prototype.listenOnce=Ae.prototype.K,Ae.prototype.getLastError=Ae.prototype.Ha,Ae.prototype.getLastErrorCode=Ae.prototype.ya,Ae.prototype.getStatus=Ae.prototype.ca,Ae.prototype.getResponseJson=Ae.prototype.La,Ae.prototype.getResponseText=Ae.prototype.la,Ae.prototype.send=Ae.prototype.ea,Ae.prototype.setWithCredentials=Ae.prototype.Fa,ZT=Ae}).apply(typeof ll<"u"?ll:typeof self<"u"?self:typeof window<"u"?window:{});const o_="@firebase/firestore",a_="4.9.2";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}rt.UNAUTHENTICATED=new rt(null),rt.GOOGLE_CREDENTIALS=new rt("google-credentials-uid"),rt.FIRST_PARTY=new rt("first-party-uid"),rt.MOCK_USER=new rt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Vs="12.3.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ei=new Xu("@firebase/firestore");function Fi(){return Ei.logLevel}function H(t,...e){if(Ei.logLevel<=te.DEBUG){const n=e.map(vp);Ei.debug(`Firestore (${Vs}): ${t}`,...n)}}function qn(t,...e){if(Ei.logLevel<=te.ERROR){const n=e.map(vp);Ei.error(`Firestore (${Vs}): ${t}`,...n)}}function Es(t,...e){if(Ei.logLevel<=te.WARN){const n=e.map(vp);Ei.warn(`Firestore (${Vs}): ${t}`,...n)}}function vp(t){if(typeof t=="string")return t;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(n){return JSON.stringify(n)}(t)}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function G(t,e,n){let r="Unexpected state";typeof e=="string"?r=e:n=e,iI(t,r,n)}function iI(t,e,n){let r=`FIRESTORE (${Vs}) INTERNAL ASSERTION FAILED: ${e} (ID: ${t.toString(16)})`;if(n!==void 0)try{r+=" CONTEXT: "+JSON.stringify(n)}catch{r+=" CONTEXT: "+n}throw qn(r),new Error(r)}function ae(t,e,n,r){let i="Unexpected state";typeof n=="string"?i=n:r=n,t||iI(e,i,r)}function X(t,e){return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const L={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class z extends Wt{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mn{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sI{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class UD{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(rt.UNAUTHENTICATED))}shutdown(){}}class jD{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class BD{constructor(e){this.t=e,this.currentUser=rt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){ae(this.o===void 0,42304);let r=this.i;const i=u=>this.i!==r?(r=this.i,n(u)):Promise.resolve();let s=new Mn;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new Mn,e.enqueueRetryable(()=>i(this.currentUser))};const o=()=>{const u=s;e.enqueueRetryable(async()=>{await u.promise,await i(this.currentUser)})},l=u=>{H("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(u=>l(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?l(u):(H("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new Mn)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(H("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(ae(typeof r.accessToken=="string",31837,{l:r}),new sI(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return ae(e===null||typeof e=="string",2055,{h:e}),new rt(e)}}class zD{constructor(e,n,r){this.P=e,this.T=n,this.I=r,this.type="FirstParty",this.user=rt.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class $D{constructor(e,n,r){this.P=e,this.T=n,this.I=r}getToken(){return Promise.resolve(new zD(this.P,this.T,this.I))}start(e,n){e.enqueueRetryable(()=>n(rt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class l_{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class HD{constructor(e,n){this.V=n,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Ct(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,n){ae(this.o===void 0,3512);const r=s=>{s.error!=null&&H("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const o=s.token!==this.m;return this.m=s.token,H("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};const i=s=>{H("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){const s=this.V.getImmediate({optional:!0});s?i(s):H("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new l_(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(ae(typeof n.token=="string",44558,{tokenResult:n}),this.m=n.token,new l_(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qD(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ep{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const i=qD(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<n&&(r+=e.charAt(i[s]%62))}return r}}function ne(t,e){return t<e?-1:t>e?1:0}function $d(t,e){const n=Math.min(t.length,e.length);for(let r=0;r<n;r++){const i=t.charAt(r),s=e.charAt(r);if(i!==s)return Ph(i)===Ph(s)?ne(i,s):Ph(i)?1:-1}return ne(t.length,e.length)}const WD=55296,KD=57343;function Ph(t){const e=t.charCodeAt(0);return e>=WD&&e<=KD}function ws(t,e,n){return t.length===e.length&&t.every((r,i)=>n(r,e[i]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const u_="__name__";class cn{constructor(e,n,r){n===void 0?n=0:n>e.length&&G(637,{offset:n,range:e.length}),r===void 0?r=e.length-n:r>e.length-n&&G(1746,{length:r,range:e.length-n}),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return cn.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof cn?e.forEach(r=>{n.push(r)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let i=0;i<r;i++){const s=cn.compareSegments(e.get(i),n.get(i));if(s!==0)return s}return ne(e.length,n.length)}static compareSegments(e,n){const r=cn.isNumericId(e),i=cn.isNumericId(n);return r&&!i?-1:!r&&i?1:r&&i?cn.extractNumericId(e).compare(cn.extractNumericId(n)):$d(e,n)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Rr.fromString(e.substring(4,e.length-2))}}class de extends cn{construct(e,n,r){return new de(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new z(L.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(i=>i.length>0))}return new de(n)}static emptyPath(){return new de([])}}const GD=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Qe extends cn{construct(e,n,r){return new Qe(e,n,r)}static isValidIdentifier(e){return GD.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Qe.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===u_}static keyField(){return new Qe([u_])}static fromServerFormat(e){const n=[];let r="",i=0;const s=()=>{if(r.length===0)throw new z(L.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let o=!1;for(;i<e.length;){const l=e[i];if(l==="\\"){if(i+1===e.length)throw new z(L.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[i+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new z(L.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,i+=2}else l==="`"?(o=!o,i++):l!=="."||o?(r+=l,i++):(s(),i++)}if(s(),o)throw new z(L.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Qe(n)}static emptyPath(){return new Qe([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W{constructor(e){this.path=e}static fromPath(e){return new W(de.fromString(e))}static fromName(e){return new W(de.fromString(e).popFirst(5))}static empty(){return new W(de.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&de.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return de.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new W(new de(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oI(t,e,n){if(!n)throw new z(L.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function QD(t,e,n,r){if(e===!0&&r===!0)throw new z(L.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function c_(t){if(!W.isDocumentKey(t))throw new z(L.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function h_(t){if(W.isDocumentKey(t))throw new z(L.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function aI(t){return typeof t=="object"&&t!==null&&(Object.getPrototypeOf(t)===Object.prototype||Object.getPrototypeOf(t)===null)}function nc(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":G(12329,{type:typeof t})}function St(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new z(L.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=nc(t);throw new z(L.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Me(t,e){const n={typeString:t};return e&&(n.value=e),n}function Ra(t,e){if(!aI(t))throw new z(L.INVALID_ARGUMENT,"JSON must be an object");let n;for(const r in e)if(e[r]){const i=e[r].typeString,s="value"in e[r]?{value:e[r].value}:void 0;if(!(r in t)){n=`JSON missing required field: '${r}'`;break}const o=t[r];if(i&&typeof o!==i){n=`JSON field '${r}' must be a ${i}.`;break}if(s!==void 0&&o!==s.value){n=`Expected '${r}' field to equal '${s.value}'`;break}}if(n)throw new z(L.INVALID_ARGUMENT,n);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const d_=-62135596800,f_=1e6;class ge{static now(){return ge.fromMillis(Date.now())}static fromDate(e){return ge.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor((e-1e3*n)*f_);return new ge(n,r)}constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new z(L.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new z(L.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<d_)throw new z(L.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new z(L.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/f_}_compareTo(e){return this.seconds===e.seconds?ne(this.nanoseconds,e.nanoseconds):ne(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ge._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Ra(e,ge._jsonSchema))return new ge(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-d_;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ge._jsonSchemaVersion="firestore/timestamp/1.0",ge._jsonSchema={type:Me("string",ge._jsonSchemaVersion),seconds:Me("number"),nanoseconds:Me("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y{static fromTimestamp(e){return new Y(e)}static min(){return new Y(new ge(0,0))}static max(){return new Y(new ge(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aa=-1;function YD(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,i=Y.fromTimestamp(r===1e9?new ge(n+1,0):new ge(n,r));return new Nr(i,W.empty(),e)}function XD(t){return new Nr(t.readTime,t.key,aa)}class Nr{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new Nr(Y.min(),W.empty(),aa)}static max(){return new Nr(Y.max(),W.empty(),aa)}}function JD(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=W.comparator(t.documentKey,e.documentKey),n!==0?n:ne(t.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZD="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class ex{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ls(t){if(t.code!==L.FAILED_PRECONDITION||t.message!==ZD)throw t;H("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&G(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new M((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(n,s).next(r,i)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof M?n:M.resolve(n)}catch(n){return M.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):M.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):M.reject(n)}static resolve(e){return new M((n,r)=>{n(e)})}static reject(e){return new M((n,r)=>{r(e)})}static waitFor(e){return new M((n,r)=>{let i=0,s=0,o=!1;e.forEach(l=>{++i,l.next(()=>{++s,o&&s===i&&n()},u=>r(u))}),o=!0,s===i&&n()})}static or(e){let n=M.resolve(!1);for(const r of e)n=n.next(i=>i?M.resolve(i):r());return n}static forEach(e,n){const r=[];return e.forEach((i,s)=>{r.push(n.call(this,i,s))}),this.waitFor(r)}static mapArray(e,n){return new M((r,i)=>{const s=e.length,o=new Array(s);let l=0;for(let u=0;u<s;u++){const c=u;n(e[c]).next(d=>{o[c]=d,++l,l===s&&r(o)},d=>i(d))}})}static doWhile(e,n){return new M((r,i)=>{const s=()=>{e()===!0?n().next(()=>{s()},i):r()};s()})}}function tx(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function bs(t){return t.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rc{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>n.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}rc.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wp=-1;function ic(t){return t==null}function _u(t){return t===0&&1/t==-1/0}function nx(t){return typeof t=="number"&&Number.isInteger(t)&&!_u(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lI="";function rx(t){let e="";for(let n=0;n<t.length;n++)e.length>0&&(e=p_(e)),e=ix(t.get(n),e);return p_(e)}function ix(t,e){let n=e;const r=t.length;for(let i=0;i<r;i++){const s=t.charAt(i);switch(s){case"\0":n+="";break;case lI:n+="";break;default:n+=s}}return n}function p_(t){return t+lI+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function m_(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function $r(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function uI(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Se{constructor(e,n){this.comparator=e,this.root=n||Ge.EMPTY}insert(e,n){return new Se(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,Ge.BLACK,null,null))}remove(e){return new Se(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ge.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return n+r.left.size;i<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,r)=>(e(n,r),!1))}toString(){const e=[];return this.inorderTraversal((n,r)=>(e.push(`${n}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new ul(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new ul(this.root,e,this.comparator,!1)}getReverseIterator(){return new ul(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new ul(this.root,e,this.comparator,!0)}}class ul{constructor(e,n,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=n?r(e.key,n):1,n&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Ge{constructor(e,n,r,i,s){this.key=e,this.value=n,this.color=r??Ge.RED,this.left=i??Ge.EMPTY,this.right=s??Ge.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,i,s){return new Ge(e??this.key,n??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let i=this;const s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,n,r),null):s===0?i.copy(null,n,null,null,null):i.copy(null,null,null,null,i.right.insert(e,n,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return Ge.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,i=this;if(n(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,n),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),n(e,i.key)===0){if(i.right.isEmpty())return Ge.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,n))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Ge.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Ge.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw G(43730,{key:this.key,value:this.value});if(this.right.isRed())throw G(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw G(27949);return e+(this.isRed()?0:1)}}Ge.EMPTY=null,Ge.RED=!0,Ge.BLACK=!1;Ge.EMPTY=new class{constructor(){this.size=0}get key(){throw G(57766)}get value(){throw G(16141)}get color(){throw G(16727)}get left(){throw G(29726)}get right(){throw G(36894)}copy(e,n,r,i,s){return this}insert(e,n,r){return new Ge(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be{constructor(e){this.comparator=e,this.data=new Se(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,r)=>(e(n),!1))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;n(i.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new g_(this.data.getIterator())}getIteratorFrom(e){return new g_(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(r=>{n=n.add(r)}),n}isEqual(e){if(!(e instanceof Be)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const i=n.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new Be(this.comparator);return n.data=e,n}}class g_{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kt{constructor(e){this.fields=e,e.sort(Qe.comparator)}static empty(){return new kt([])}unionWith(e){let n=new Be(Qe.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new kt(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return ws(this.fields,e.fields,(n,r)=>n.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cI extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Je{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new cI("Invalid base64 string: "+s):s}}(e);return new Je(n)}static fromUint8Array(e){const n=function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s}(e);return new Je(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const r=new Uint8Array(n.length);for(let i=0;i<n.length;i++)r[i]=n.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ne(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Je.EMPTY_BYTE_STRING=new Je("");const sx=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Dr(t){if(ae(!!t,39018),typeof t=="string"){let e=0;const n=sx.exec(t);if(ae(!!n,46558,{timestamp:t}),n[1]){let i=n[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:xe(t.seconds),nanos:xe(t.nanos)}}function xe(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function xr(t){return typeof t=="string"?Je.fromBase64String(t):Je.fromUint8Array(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hI="server_timestamp",dI="__type__",fI="__previous_value__",pI="__local_write_time__";function Tp(t){var n,r;return((r=(((n=t==null?void 0:t.mapValue)==null?void 0:n.fields)||{})[dI])==null?void 0:r.stringValue)===hI}function sc(t){const e=t.mapValue.fields[fI];return Tp(e)?sc(e):e}function la(t){const e=Dr(t.mapValue.fields[pI].timestampValue);return new ge(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ox{constructor(e,n,r,i,s,o,l,u,c,d){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=l,this.longPollingOptions=u,this.useFetchStreams=c,this.isUsingEmulator=d}}const vu="(default)";class ua{constructor(e,n){this.projectId=e,this.database=n||vu}static empty(){return new ua("","")}get isDefaultDatabase(){return this.database===vu}isEqual(e){return e instanceof ua&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mI="__type__",ax="__max__",cl={mapValue:{}},gI="__vector__",Eu="value";function Or(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?Tp(t)?4:ux(t)?9007199254740991:lx(t)?10:11:G(28295,{value:t})}function In(t,e){if(t===e)return!0;const n=Or(t);if(n!==Or(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return la(t).isEqual(la(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const o=Dr(i.timestampValue),l=Dr(s.timestampValue);return o.seconds===l.seconds&&o.nanos===l.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(i,s){return xr(i.bytesValue).isEqual(xr(s.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(i,s){return xe(i.geoPointValue.latitude)===xe(s.geoPointValue.latitude)&&xe(i.geoPointValue.longitude)===xe(s.geoPointValue.longitude)}(t,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return xe(i.integerValue)===xe(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const o=xe(i.doubleValue),l=xe(s.doubleValue);return o===l?_u(o)===_u(l):isNaN(o)&&isNaN(l)}return!1}(t,e);case 9:return ws(t.arrayValue.values||[],e.arrayValue.values||[],In);case 10:case 11:return function(i,s){const o=i.mapValue.fields||{},l=s.mapValue.fields||{};if(m_(o)!==m_(l))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(l[u]===void 0||!In(o[u],l[u])))return!1;return!0}(t,e);default:return G(52216,{left:t})}}function ca(t,e){return(t.values||[]).find(n=>In(n,e))!==void 0}function Ts(t,e){if(t===e)return 0;const n=Or(t),r=Or(e);if(n!==r)return ne(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return ne(t.booleanValue,e.booleanValue);case 2:return function(s,o){const l=xe(s.integerValue||s.doubleValue),u=xe(o.integerValue||o.doubleValue);return l<u?-1:l>u?1:l===u?0:isNaN(l)?isNaN(u)?0:-1:1}(t,e);case 3:return y_(t.timestampValue,e.timestampValue);case 4:return y_(la(t),la(e));case 5:return $d(t.stringValue,e.stringValue);case 6:return function(s,o){const l=xr(s),u=xr(o);return l.compareTo(u)}(t.bytesValue,e.bytesValue);case 7:return function(s,o){const l=s.split("/"),u=o.split("/");for(let c=0;c<l.length&&c<u.length;c++){const d=ne(l[c],u[c]);if(d!==0)return d}return ne(l.length,u.length)}(t.referenceValue,e.referenceValue);case 8:return function(s,o){const l=ne(xe(s.latitude),xe(o.latitude));return l!==0?l:ne(xe(s.longitude),xe(o.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return __(t.arrayValue,e.arrayValue);case 10:return function(s,o){var m,T,C,P;const l=s.fields||{},u=o.fields||{},c=(m=l[Eu])==null?void 0:m.arrayValue,d=(T=u[Eu])==null?void 0:T.arrayValue,p=ne(((C=c==null?void 0:c.values)==null?void 0:C.length)||0,((P=d==null?void 0:d.values)==null?void 0:P.length)||0);return p!==0?p:__(c,d)}(t.mapValue,e.mapValue);case 11:return function(s,o){if(s===cl.mapValue&&o===cl.mapValue)return 0;if(s===cl.mapValue)return 1;if(o===cl.mapValue)return-1;const l=s.fields||{},u=Object.keys(l),c=o.fields||{},d=Object.keys(c);u.sort(),d.sort();for(let p=0;p<u.length&&p<d.length;++p){const m=$d(u[p],d[p]);if(m!==0)return m;const T=Ts(l[u[p]],c[d[p]]);if(T!==0)return T}return ne(u.length,d.length)}(t.mapValue,e.mapValue);default:throw G(23264,{he:n})}}function y_(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return ne(t,e);const n=Dr(t),r=Dr(e),i=ne(n.seconds,r.seconds);return i!==0?i:ne(n.nanos,r.nanos)}function __(t,e){const n=t.values||[],r=e.values||[];for(let i=0;i<n.length&&i<r.length;++i){const s=Ts(n[i],r[i]);if(s)return s}return ne(n.length,r.length)}function Is(t){return Hd(t)}function Hd(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(n){const r=Dr(n);return`time(${r.seconds},${r.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?function(n){return xr(n).toBase64()}(t.bytesValue):"referenceValue"in t?function(n){return W.fromName(n).toString()}(t.referenceValue):"geoPointValue"in t?function(n){return`geo(${n.latitude},${n.longitude})`}(t.geoPointValue):"arrayValue"in t?function(n){let r="[",i=!0;for(const s of n.values||[])i?i=!1:r+=",",r+=Hd(s);return r+"]"}(t.arrayValue):"mapValue"in t?function(n){const r=Object.keys(n.fields||{}).sort();let i="{",s=!0;for(const o of r)s?s=!1:i+=",",i+=`${o}:${Hd(n.fields[o])}`;return i+"}"}(t.mapValue):G(61005,{value:t})}function Vl(t){switch(Or(t)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=sc(t);return e?16+Vl(e):16;case 5:return 2*t.stringValue.length;case 6:return xr(t.bytesValue).approximateByteSize();case 7:return t.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((i,s)=>i+Vl(s),0)}(t.arrayValue);case 10:case 11:return function(r){let i=0;return $r(r.fields,(s,o)=>{i+=s.length+Vl(o)}),i}(t.mapValue);default:throw G(13486,{value:t})}}function v_(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function qd(t){return!!t&&"integerValue"in t}function Ip(t){return!!t&&"arrayValue"in t}function E_(t){return!!t&&"nullValue"in t}function w_(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function Ll(t){return!!t&&"mapValue"in t}function lx(t){var n,r;return((r=(((n=t==null?void 0:t.mapValue)==null?void 0:n.fields)||{})[mI])==null?void 0:r.stringValue)===gI}function bo(t){if(t.geoPointValue)return{geoPointValue:{...t.geoPointValue}};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:{...t.timestampValue}};if(t.mapValue){const e={mapValue:{fields:{}}};return $r(t.mapValue.fields,(n,r)=>e.mapValue.fields[n]=bo(r)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=bo(t.arrayValue.values[n]);return e}return{...t}}function ux(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue===ax}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t{constructor(e){this.value=e}static empty(){return new _t({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!Ll(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=bo(n)}setAll(e){let n=Qe.emptyPath(),r={},i=[];e.forEach((o,l)=>{if(!n.isImmediateParentOf(l)){const u=this.getFieldsMap(n);this.applyChanges(u,r,i),r={},i=[],n=l.popLast()}o?r[l.lastSegment()]=bo(o):i.push(l.lastSegment())});const s=this.getFieldsMap(n);this.applyChanges(s,r,i)}delete(e){const n=this.field(e.popLast());Ll(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return In(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=n.mapValue.fields[e.get(r)];Ll(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=i),n=i}return n.mapValue.fields}applyChanges(e,n,r){$r(n,(i,s)=>e[i]=s);for(const i of r)delete e[i]}clone(){return new _t(bo(this.value))}}function yI(t){const e=[];return $r(t.fields,(n,r)=>{const i=new Qe([n]);if(Ll(r)){const s=yI(r.mapValue).fields;if(s.length===0)e.push(i);else for(const o of s)e.push(i.child(o))}else e.push(i)}),new kt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class st{constructor(e,n,r,i,s,o,l){this.key=e,this.documentType=n,this.version=r,this.readTime=i,this.createTime=s,this.data=o,this.documentState=l}static newInvalidDocument(e){return new st(e,0,Y.min(),Y.min(),Y.min(),_t.empty(),0)}static newFoundDocument(e,n,r,i){return new st(e,1,n,Y.min(),r,i,0)}static newNoDocument(e,n){return new st(e,2,n,Y.min(),Y.min(),_t.empty(),0)}static newUnknownDocument(e,n){return new st(e,3,n,Y.min(),Y.min(),_t.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(Y.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=_t.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=_t.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Y.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof st&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new st(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wu{constructor(e,n){this.position=e,this.inclusive=n}}function T_(t,e,n){let r=0;for(let i=0;i<t.position.length;i++){const s=e[i],o=t.position[i];if(s.field.isKeyField()?r=W.comparator(W.fromName(o.referenceValue),n.key):r=Ts(o,n.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function I_(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!In(t.position[n],e.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ha{constructor(e,n="asc"){this.field=e,this.dir=n}}function cx(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _I{}class be extends _I{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new dx(e,n,r):n==="array-contains"?new mx(e,r):n==="in"?new gx(e,r):n==="not-in"?new yx(e,r):n==="array-contains-any"?new _x(e,r):new be(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new fx(e,r):new px(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&n.nullValue===void 0&&this.matchesComparison(Ts(n,this.value)):n!==null&&Or(this.value)===Or(n)&&this.matchesComparison(Ts(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return G(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class sn extends _I{constructor(e,n){super(),this.filters=e,this.op=n,this.Pe=null}static create(e,n){return new sn(e,n)}matches(e){return vI(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function vI(t){return t.op==="and"}function EI(t){return hx(t)&&vI(t)}function hx(t){for(const e of t.filters)if(e instanceof sn)return!1;return!0}function Wd(t){if(t instanceof be)return t.field.canonicalString()+t.op.toString()+Is(t.value);if(EI(t))return t.filters.map(e=>Wd(e)).join(",");{const e=t.filters.map(n=>Wd(n)).join(",");return`${t.op}(${e})`}}function wI(t,e){return t instanceof be?function(r,i){return i instanceof be&&r.op===i.op&&r.field.isEqual(i.field)&&In(r.value,i.value)}(t,e):t instanceof sn?function(r,i){return i instanceof sn&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,o,l)=>s&&wI(o,i.filters[l]),!0):!1}(t,e):void G(19439)}function TI(t){return t instanceof be?function(n){return`${n.field.canonicalString()} ${n.op} ${Is(n.value)}`}(t):t instanceof sn?function(n){return n.op.toString()+" {"+n.getFilters().map(TI).join(" ,")+"}"}(t):"Filter"}class dx extends be{constructor(e,n,r){super(e,n,r),this.key=W.fromName(r.referenceValue)}matches(e){const n=W.comparator(e.key,this.key);return this.matchesComparison(n)}}class fx extends be{constructor(e,n){super(e,"in",n),this.keys=II("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class px extends be{constructor(e,n){super(e,"not-in",n),this.keys=II("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function II(t,e){var n;return(((n=e.arrayValue)==null?void 0:n.values)||[]).map(r=>W.fromName(r.referenceValue))}class mx extends be{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return Ip(n)&&ca(n.arrayValue,this.value)}}class gx extends be{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&ca(this.value.arrayValue,n)}}class yx extends be{constructor(e,n){super(e,"not-in",n)}matches(e){if(ca(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&n.nullValue===void 0&&!ca(this.value.arrayValue,n)}}class _x extends be{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!Ip(n)||!n.arrayValue.values)&&n.arrayValue.values.some(r=>ca(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vx{constructor(e,n=null,r=[],i=[],s=null,o=null,l=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=o,this.endAt=l,this.Te=null}}function S_(t,e=null,n=[],r=[],i=null,s=null,o=null){return new vx(t,e,n,r,i,s,o)}function Sp(t){const e=X(t);if(e.Te===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(r=>Wd(r)).join(","),n+="|ob:",n+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),ic(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(r=>Is(r)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(r=>Is(r)).join(",")),e.Te=n}return e.Te}function Ap(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!cx(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!wI(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!I_(t.startAt,e.startAt)&&I_(t.endAt,e.endAt)}function Kd(t){return W.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ms{constructor(e,n=null,r=[],i=[],s=null,o="F",l=null,u=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=o,this.startAt=l,this.endAt=u,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function Ex(t,e,n,r,i,s,o,l){return new Ms(t,e,n,r,i,s,o,l)}function oc(t){return new Ms(t)}function A_(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function SI(t){return t.collectionGroup!==null}function Mo(t){const e=X(t);if(e.Ie===null){e.Ie=[];const n=new Set;for(const s of e.explicitOrderBy)e.Ie.push(s),n.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let l=new Be(Qe.comparator);return o.filters.forEach(u=>{u.getFlattenedFilters().forEach(c=>{c.isInequality()&&(l=l.add(c.field))})}),l})(e).forEach(s=>{n.has(s.canonicalString())||s.isKeyField()||e.Ie.push(new ha(s,r))}),n.has(Qe.keyField().canonicalString())||e.Ie.push(new ha(Qe.keyField(),r))}return e.Ie}function yn(t){const e=X(t);return e.Ee||(e.Ee=wx(e,Mo(t))),e.Ee}function wx(t,e){if(t.limitType==="F")return S_(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(i=>{const s=i.dir==="desc"?"asc":"desc";return new ha(i.field,s)});const n=t.endAt?new wu(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new wu(t.startAt.position,t.startAt.inclusive):null;return S_(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}function Gd(t,e){const n=t.filters.concat([e]);return new Ms(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}function Qd(t,e,n){return new Ms(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function ac(t,e){return Ap(yn(t),yn(e))&&t.limitType===e.limitType}function AI(t){return`${Sp(yn(t))}|lt:${t.limitType}`}function Ui(t){return`Query(target=${function(n){let r=n.path.canonicalString();return n.collectionGroup!==null&&(r+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(r+=`, filters: [${n.filters.map(i=>TI(i)).join(", ")}]`),ic(n.limit)||(r+=", limit: "+n.limit),n.orderBy.length>0&&(r+=`, orderBy: [${n.orderBy.map(i=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(i)).join(", ")}]`),n.startAt&&(r+=", startAt: ",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map(i=>Is(i)).join(",")),n.endAt&&(r+=", endAt: ",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map(i=>Is(i)).join(",")),`Target(${r})`}(yn(t))}; limitType=${t.limitType})`}function lc(t,e){return e.isFoundDocument()&&function(r,i){const s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):W.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(t,e)&&function(r,i){for(const s of Mo(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(t,e)&&function(r,i){for(const s of r.filters)if(!s.matches(i))return!1;return!0}(t,e)&&function(r,i){return!(r.startAt&&!function(o,l,u){const c=T_(o,l,u);return o.inclusive?c<=0:c<0}(r.startAt,Mo(r),i)||r.endAt&&!function(o,l,u){const c=T_(o,l,u);return o.inclusive?c>=0:c>0}(r.endAt,Mo(r),i))}(t,e)}function Tx(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function RI(t){return(e,n)=>{let r=!1;for(const i of Mo(t)){const s=Ix(i,e,n);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function Ix(t,e,n){const r=t.field.isKeyField()?W.comparator(e.key,n.key):function(s,o,l){const u=o.data.field(s),c=l.data.field(s);return u!==null&&c!==null?Ts(u,c):G(42886)}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return G(19790,{direction:t.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ni{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,n]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,n]);i.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[n]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){$r(this.inner,(n,r)=>{for(const[i,s]of r)e(i,s)})}isEmpty(){return uI(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sx=new Se(W.comparator);function Wn(){return Sx}const CI=new Se(W.comparator);function To(...t){let e=CI;for(const n of t)e=e.insert(n.key,n);return e}function PI(t){let e=CI;return t.forEach((n,r)=>e=e.insert(n,r.overlayedDocument)),e}function si(){return Fo()}function kI(){return Fo()}function Fo(){return new Ni(t=>t.toString(),(t,e)=>t.isEqual(e))}const Ax=new Se(W.comparator),Rx=new Be(W.comparator);function re(...t){let e=Rx;for(const n of t)e=e.add(n);return e}const Cx=new Be(ne);function Px(){return Cx}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rp(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:_u(e)?"-0":e}}function NI(t){return{integerValue:""+t}}function kx(t,e){return nx(e)?NI(e):Rp(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uc{constructor(){this._=void 0}}function Nx(t,e,n){return t instanceof da?function(i,s){const o={fields:{[dI]:{stringValue:hI},[pI]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&Tp(s)&&(s=sc(s)),s&&(o.fields[fI]=s),{mapValue:o}}(n,e):t instanceof Ss?xI(t,e):t instanceof As?OI(t,e):function(i,s){const o=DI(i,s),l=R_(o)+R_(i.Ae);return qd(o)&&qd(i.Ae)?NI(l):Rp(i.serializer,l)}(t,e)}function Dx(t,e,n){return t instanceof Ss?xI(t,e):t instanceof As?OI(t,e):n}function DI(t,e){return t instanceof Tu?function(r){return qd(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}class da extends uc{}class Ss extends uc{constructor(e){super(),this.elements=e}}function xI(t,e){const n=VI(e);for(const r of t.elements)n.some(i=>In(i,r))||n.push(r);return{arrayValue:{values:n}}}class As extends uc{constructor(e){super(),this.elements=e}}function OI(t,e){let n=VI(e);for(const r of t.elements)n=n.filter(i=>!In(i,r));return{arrayValue:{values:n}}}class Tu extends uc{constructor(e,n){super(),this.serializer=e,this.Ae=n}}function R_(t){return xe(t.integerValue||t.doubleValue)}function VI(t){return Ip(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cp{constructor(e,n){this.field=e,this.transform=n}}function xx(t,e){return t.field.isEqual(e.field)&&function(r,i){return r instanceof Ss&&i instanceof Ss||r instanceof As&&i instanceof As?ws(r.elements,i.elements,In):r instanceof Tu&&i instanceof Tu?In(r.Ae,i.Ae):r instanceof da&&i instanceof da}(t.transform,e.transform)}class Ox{constructor(e,n){this.version=e,this.transformResults=n}}class zt{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new zt}static exists(e){return new zt(void 0,e)}static updateTime(e){return new zt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function bl(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class cc{}function LI(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new Pp(t.key,zt.none()):new Ca(t.key,t.data,zt.none());{const n=t.data,r=_t.empty();let i=new Be(Qe.comparator);for(let s of e.fields)if(!i.has(s)){let o=n.field(s);o===null&&s.length>1&&(s=s.popLast(),o=n.field(s)),o===null?r.delete(s):r.set(s,o),i=i.add(s)}return new Hr(t.key,r,new kt(i.toArray()),zt.none())}}function Vx(t,e,n){t instanceof Ca?function(i,s,o){const l=i.value.clone(),u=P_(i.fieldTransforms,s,o.transformResults);l.setAll(u),s.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(t,e,n):t instanceof Hr?function(i,s,o){if(!bl(i.precondition,s))return void s.convertToUnknownDocument(o.version);const l=P_(i.fieldTransforms,s,o.transformResults),u=s.data;u.setAll(bI(i)),u.setAll(l),s.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(t,e,n):function(i,s,o){s.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,n)}function Uo(t,e,n,r){return t instanceof Ca?function(s,o,l,u){if(!bl(s.precondition,o))return l;const c=s.value.clone(),d=k_(s.fieldTransforms,u,o);return c.setAll(d),o.convertToFoundDocument(o.version,c).setHasLocalMutations(),null}(t,e,n,r):t instanceof Hr?function(s,o,l,u){if(!bl(s.precondition,o))return l;const c=k_(s.fieldTransforms,u,o),d=o.data;return d.setAll(bI(s)),d.setAll(c),o.convertToFoundDocument(o.version,d).setHasLocalMutations(),l===null?null:l.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(p=>p.field))}(t,e,n,r):function(s,o,l){return bl(s.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):l}(t,e,n)}function Lx(t,e){let n=null;for(const r of t.fieldTransforms){const i=e.data.field(r.field),s=DI(r.transform,i||null);s!=null&&(n===null&&(n=_t.empty()),n.set(r.field,s))}return n||null}function C_(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&ws(r,i,(s,o)=>xx(s,o))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class Ca extends cc{constructor(e,n,r,i=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class Hr extends cc{constructor(e,n,r,i,s=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function bI(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}}),e}function P_(t,e,n){const r=new Map;ae(t.length===n.length,32656,{Re:n.length,Ve:t.length});for(let i=0;i<n.length;i++){const s=t[i],o=s.transform,l=e.data.field(s.field);r.set(s.field,Dx(o,l,n[i]))}return r}function k_(t,e,n){const r=new Map;for(const i of t){const s=i.transform,o=n.data.field(i.field);r.set(i.field,Nx(s,o,e))}return r}class Pp extends cc{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class bx extends cc{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mx{constructor(e,n,r,i){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&Vx(s,e,r[i])}}applyToLocalView(e,n){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(n=Uo(r,e,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(n=Uo(r,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const r=kI();return this.mutations.forEach(i=>{const s=e.get(i.key),o=s.overlayedDocument;let l=this.applyToLocalView(o,s.mutatedFields);l=n.has(i.key)?null:l;const u=LI(o,l);u!==null&&r.set(i.key,u),o.isValidDocument()||o.convertToNoDocument(Y.min())}),r}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),re())}isEqual(e){return this.batchId===e.batchId&&ws(this.mutations,e.mutations,(n,r)=>C_(n,r))&&ws(this.baseMutations,e.baseMutations,(n,r)=>C_(n,r))}}class kp{constructor(e,n,r,i){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=i}static from(e,n,r){ae(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let i=function(){return Ax}();const s=e.mutations;for(let o=0;o<s.length;o++)i=i.insert(s[o].key,r[o].version);return new kp(e,n,r,i)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fx{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ux{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ve,ie;function jx(t){switch(t){case L.OK:return G(64938);case L.CANCELLED:case L.UNKNOWN:case L.DEADLINE_EXCEEDED:case L.RESOURCE_EXHAUSTED:case L.INTERNAL:case L.UNAVAILABLE:case L.UNAUTHENTICATED:return!1;case L.INVALID_ARGUMENT:case L.NOT_FOUND:case L.ALREADY_EXISTS:case L.PERMISSION_DENIED:case L.FAILED_PRECONDITION:case L.ABORTED:case L.OUT_OF_RANGE:case L.UNIMPLEMENTED:case L.DATA_LOSS:return!0;default:return G(15467,{code:t})}}function MI(t){if(t===void 0)return qn("GRPC error has no .code"),L.UNKNOWN;switch(t){case Ve.OK:return L.OK;case Ve.CANCELLED:return L.CANCELLED;case Ve.UNKNOWN:return L.UNKNOWN;case Ve.DEADLINE_EXCEEDED:return L.DEADLINE_EXCEEDED;case Ve.RESOURCE_EXHAUSTED:return L.RESOURCE_EXHAUSTED;case Ve.INTERNAL:return L.INTERNAL;case Ve.UNAVAILABLE:return L.UNAVAILABLE;case Ve.UNAUTHENTICATED:return L.UNAUTHENTICATED;case Ve.INVALID_ARGUMENT:return L.INVALID_ARGUMENT;case Ve.NOT_FOUND:return L.NOT_FOUND;case Ve.ALREADY_EXISTS:return L.ALREADY_EXISTS;case Ve.PERMISSION_DENIED:return L.PERMISSION_DENIED;case Ve.FAILED_PRECONDITION:return L.FAILED_PRECONDITION;case Ve.ABORTED:return L.ABORTED;case Ve.OUT_OF_RANGE:return L.OUT_OF_RANGE;case Ve.UNIMPLEMENTED:return L.UNIMPLEMENTED;case Ve.DATA_LOSS:return L.DATA_LOSS;default:return G(39323,{code:t})}}(ie=Ve||(Ve={}))[ie.OK=0]="OK",ie[ie.CANCELLED=1]="CANCELLED",ie[ie.UNKNOWN=2]="UNKNOWN",ie[ie.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ie[ie.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ie[ie.NOT_FOUND=5]="NOT_FOUND",ie[ie.ALREADY_EXISTS=6]="ALREADY_EXISTS",ie[ie.PERMISSION_DENIED=7]="PERMISSION_DENIED",ie[ie.UNAUTHENTICATED=16]="UNAUTHENTICATED",ie[ie.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ie[ie.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ie[ie.ABORTED=10]="ABORTED",ie[ie.OUT_OF_RANGE=11]="OUT_OF_RANGE",ie[ie.UNIMPLEMENTED=12]="UNIMPLEMENTED",ie[ie.INTERNAL=13]="INTERNAL",ie[ie.UNAVAILABLE=14]="UNAVAILABLE",ie[ie.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bx(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zx=new Rr([4294967295,4294967295],0);function N_(t){const e=Bx().encode(t),n=new JT;return n.update(e),new Uint8Array(n.digest())}function D_(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new Rr([n,r],0),new Rr([i,s],0)]}class Np{constructor(e,n,r){if(this.bitmap=e,this.padding=n,this.hashCount=r,n<0||n>=8)throw new Io(`Invalid padding: ${n}`);if(r<0)throw new Io(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Io(`Invalid hash count: ${r}`);if(e.length===0&&n!==0)throw new Io(`Invalid padding when bitmap length is 0: ${n}`);this.ge=8*e.length-n,this.pe=Rr.fromNumber(this.ge)}ye(e,n,r){let i=e.add(n.multiply(Rr.fromNumber(r)));return i.compare(zx)===1&&(i=new Rr([i.getBits(0),i.getBits(1)],0)),i.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const n=N_(e),[r,i]=D_(n);for(let s=0;s<this.hashCount;s++){const o=this.ye(r,i,s);if(!this.we(o))return!1}return!0}static create(e,n,r){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),o=new Np(s,i,n);return r.forEach(l=>o.insert(l)),o}insert(e){if(this.ge===0)return;const n=N_(e),[r,i]=D_(n);for(let s=0;s<this.hashCount;s++){const o=this.ye(r,i,s);this.Se(o)}}Se(e){const n=Math.floor(e/8),r=e%8;this.bitmap[n]|=1<<r}}class Io extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hc{constructor(e,n,r,i,s){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,n,r){const i=new Map;return i.set(e,Pa.createSynthesizedTargetChangeForCurrentChange(e,n,r)),new hc(Y.min(),i,new Se(ne),Wn(),re())}}class Pa{constructor(e,n,r,i,s){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,n,r){return new Pa(r,n,re(),re(),re())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ml{constructor(e,n,r,i){this.be=e,this.removedTargetIds=n,this.key=r,this.De=i}}class FI{constructor(e,n){this.targetId=e,this.Ce=n}}class UI{constructor(e,n,r=Je.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=i}}class x_{constructor(){this.ve=0,this.Fe=O_(),this.Me=Je.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=re(),n=re(),r=re();return this.Fe.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:n=n.add(i);break;case 1:r=r.add(i);break;default:G(38017,{changeType:s})}}),new Pa(this.Me,this.xe,e,n,r)}qe(){this.Oe=!1,this.Fe=O_()}Qe(e,n){this.Oe=!0,this.Fe=this.Fe.insert(e,n)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,ae(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class $x{constructor(e){this.Ge=e,this.ze=new Map,this.je=Wn(),this.Je=hl(),this.He=hl(),this.Ye=new Se(ne)}Ze(e){for(const n of e.be)e.De&&e.De.isFoundDocument()?this.Xe(n,e.De):this.et(n,e.key,e.De);for(const n of e.removedTargetIds)this.et(n,e.key,e.De)}tt(e){this.forEachTarget(e,n=>{const r=this.nt(n);switch(e.state){case 0:this.rt(n)&&r.Le(e.resumeToken);break;case 1:r.Ke(),r.Ne||r.qe(),r.Le(e.resumeToken);break;case 2:r.Ke(),r.Ne||this.removeTarget(n);break;case 3:this.rt(n)&&(r.We(),r.Le(e.resumeToken));break;case 4:this.rt(n)&&(this.it(n),r.Le(e.resumeToken));break;default:G(56790,{state:e.state})}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.ze.forEach((r,i)=>{this.rt(i)&&n(i)})}st(e){const n=e.targetId,r=e.Ce.count,i=this.ot(n);if(i){const s=i.target;if(Kd(s))if(r===0){const o=new W(s.path);this.et(n,o,st.newNoDocument(o,Y.min()))}else ae(r===1,20013,{expectedCount:r});else{const o=this._t(n);if(o!==r){const l=this.ut(e),u=l?this.ct(l,e,o):1;if(u!==0){this.it(n);const c=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(n,c)}}}}}ut(e){const n=e.Ce.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=n;let o,l;try{o=xr(r).toUint8Array()}catch(u){if(u instanceof cI)return Es("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{l=new Np(o,i,s)}catch(u){return Es(u instanceof Io?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return l.ge===0?null:l}ct(e,n,r){return n.Ce.count===r-this.Pt(e,n.targetId)?0:2}Pt(e,n){const r=this.Ge.getRemoteKeysForTarget(n);let i=0;return r.forEach(s=>{const o=this.Ge.ht(),l=`projects/${o.projectId}/databases/${o.database}/documents/${s.path.canonicalString()}`;e.mightContain(l)||(this.et(n,s,null),i++)}),i}Tt(e){const n=new Map;this.ze.forEach((s,o)=>{const l=this.ot(o);if(l){if(s.current&&Kd(l.target)){const u=new W(l.target.path);this.It(u).has(o)||this.Et(o,u)||this.et(o,u,st.newNoDocument(u,e))}s.Be&&(n.set(o,s.ke()),s.qe())}});let r=re();this.He.forEach((s,o)=>{let l=!0;o.forEachWhile(u=>{const c=this.ot(u);return!c||c.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(s))}),this.je.forEach((s,o)=>o.setReadTime(e));const i=new hc(e,n,this.Ye,this.je,r);return this.je=Wn(),this.Je=hl(),this.He=hl(),this.Ye=new Se(ne),i}Xe(e,n){if(!this.rt(e))return;const r=this.Et(e,n.key)?2:0;this.nt(e).Qe(n.key,r),this.je=this.je.insert(n.key,n),this.Je=this.Je.insert(n.key,this.It(n.key).add(e)),this.He=this.He.insert(n.key,this.dt(n.key).add(e))}et(e,n,r){if(!this.rt(e))return;const i=this.nt(e);this.Et(e,n)?i.Qe(n,1):i.$e(n),this.He=this.He.insert(n,this.dt(n).delete(e)),this.He=this.He.insert(n,this.dt(n).add(e)),r&&(this.je=this.je.insert(n,r))}removeTarget(e){this.ze.delete(e)}_t(e){const n=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let n=this.ze.get(e);return n||(n=new x_,this.ze.set(e,n)),n}dt(e){let n=this.He.get(e);return n||(n=new Be(ne),this.He=this.He.insert(e,n)),n}It(e){let n=this.Je.get(e);return n||(n=new Be(ne),this.Je=this.Je.insert(e,n)),n}rt(e){const n=this.ot(e)!==null;return n||H("WatchChangeAggregator","Detected inactive target",e),n}ot(e){const n=this.ze.get(e);return n&&n.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new x_),this.Ge.getRemoteKeysForTarget(e).forEach(n=>{this.et(e,n,null)})}Et(e,n){return this.Ge.getRemoteKeysForTarget(e).has(n)}}function hl(){return new Se(W.comparator)}function O_(){return new Se(W.comparator)}const Hx={asc:"ASCENDING",desc:"DESCENDING"},qx={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Wx={and:"AND",or:"OR"};class Kx{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function Yd(t,e){return t.useProto3Json||ic(e)?e:{value:e}}function Iu(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function jI(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function Gx(t,e){return Iu(t,e.toTimestamp())}function _n(t){return ae(!!t,49232),Y.fromTimestamp(function(n){const r=Dr(n);return new ge(r.seconds,r.nanos)}(t))}function Dp(t,e){return Xd(t,e).canonicalString()}function Xd(t,e){const n=function(i){return new de(["projects",i.projectId,"databases",i.database])}(t).child("documents");return e===void 0?n:n.child(e)}function BI(t){const e=de.fromString(t);return ae(WI(e),10190,{key:e.toString()}),e}function Jd(t,e){return Dp(t.databaseId,e.path)}function kh(t,e){const n=BI(e);if(n.get(1)!==t.databaseId.projectId)throw new z(L.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new z(L.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new W($I(n))}function zI(t,e){return Dp(t.databaseId,e)}function Qx(t){const e=BI(t);return e.length===4?de.emptyPath():$I(e)}function Zd(t){return new de(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function $I(t){return ae(t.length>4&&t.get(4)==="documents",29091,{key:t.toString()}),t.popFirst(5)}function V_(t,e,n){return{name:Jd(t,e),fields:n.value.mapValue.fields}}function Yx(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(c){return c==="NO_CHANGE"?0:c==="ADD"?1:c==="REMOVE"?2:c==="CURRENT"?3:c==="RESET"?4:G(39313,{state:c})}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(c,d){return c.useProto3Json?(ae(d===void 0||typeof d=="string",58123),Je.fromBase64String(d||"")):(ae(d===void 0||d instanceof Buffer||d instanceof Uint8Array,16193),Je.fromUint8Array(d||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,l=o&&function(c){const d=c.code===void 0?L.UNKNOWN:MI(c.code);return new z(d,c.message||"")}(o);n=new UI(r,i,s,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=kh(t,r.document.name),s=_n(r.document.updateTime),o=r.document.createTime?_n(r.document.createTime):Y.min(),l=new _t({mapValue:{fields:r.document.fields}}),u=st.newFoundDocument(i,s,o,l),c=r.targetIds||[],d=r.removedTargetIds||[];n=new Ml(c,d,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=kh(t,r.document),s=r.readTime?_n(r.readTime):Y.min(),o=st.newNoDocument(i,s),l=r.removedTargetIds||[];n=new Ml([],l,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=kh(t,r.document),s=r.removedTargetIds||[];n=new Ml([],s,i,null)}else{if(!("filter"in e))return G(11601,{Rt:e});{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:s}=r,o=new Ux(i,s),l=r.targetId;n=new FI(l,o)}}return n}function Xx(t,e){let n;if(e instanceof Ca)n={update:V_(t,e.key,e.value)};else if(e instanceof Pp)n={delete:Jd(t,e.key)};else if(e instanceof Hr)n={update:V_(t,e.key,e.data),updateMask:o2(e.fieldMask)};else{if(!(e instanceof bx))return G(16599,{Vt:e.type});n={verify:Jd(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(r=>function(s,o){const l=o.transform;if(l instanceof da)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof Ss)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof As)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof Tu)return{fieldPath:o.field.canonicalString(),increment:l.Ae};throw G(20930,{transform:o.transform})}(0,r))),e.precondition.isNone||(n.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:Gx(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:G(27497)}(t,e.precondition)),n}function Jx(t,e){return t&&t.length>0?(ae(e!==void 0,14353),t.map(n=>function(i,s){let o=i.updateTime?_n(i.updateTime):_n(s);return o.isEqual(Y.min())&&(o=_n(s)),new Ox(o,i.transformResults||[])}(n,e))):[]}function Zx(t,e){return{documents:[zI(t,e.path)]}}function e2(t,e){const n={structuredQuery:{}},r=e.path;let i;e.collectionGroup!==null?(i=r,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=zI(t,i);const s=function(c){if(c.length!==0)return qI(sn.create(c,"and"))}(e.filters);s&&(n.structuredQuery.where=s);const o=function(c){if(c.length!==0)return c.map(d=>function(m){return{field:ji(m.field),direction:r2(m.dir)}}(d))}(e.orderBy);o&&(n.structuredQuery.orderBy=o);const l=Yd(t,e.limit);return l!==null&&(n.structuredQuery.limit=l),e.startAt&&(n.structuredQuery.startAt=function(c){return{before:c.inclusive,values:c.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(c){return{before:!c.inclusive,values:c.position}}(e.endAt)),{ft:n,parent:i}}function t2(t){let e=Qx(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let i=null;if(r>0){ae(r===1,65062);const d=n.from[0];d.allDescendants?i=d.collectionId:e=e.child(d.collectionId)}let s=[];n.where&&(s=function(p){const m=HI(p);return m instanceof sn&&EI(m)?m.getFilters():[m]}(n.where));let o=[];n.orderBy&&(o=function(p){return p.map(m=>function(C){return new ha(Bi(C.field),function(D){switch(D){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(C.direction))}(m))}(n.orderBy));let l=null;n.limit&&(l=function(p){let m;return m=typeof p=="object"?p.value:p,ic(m)?null:m}(n.limit));let u=null;n.startAt&&(u=function(p){const m=!!p.before,T=p.values||[];return new wu(T,m)}(n.startAt));let c=null;return n.endAt&&(c=function(p){const m=!p.before,T=p.values||[];return new wu(T,m)}(n.endAt)),Ex(e,i,o,s,l,"F",u,c)}function n2(t,e){const n=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return G(28987,{purpose:i})}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function HI(t){return t.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":const r=Bi(n.unaryFilter.field);return be.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=Bi(n.unaryFilter.field);return be.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=Bi(n.unaryFilter.field);return be.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Bi(n.unaryFilter.field);return be.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return G(61313);default:return G(60726)}}(t):t.fieldFilter!==void 0?function(n){return be.create(Bi(n.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return G(58110);default:return G(50506)}}(n.fieldFilter.op),n.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(n){return sn.create(n.compositeFilter.filters.map(r=>HI(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return G(1026)}}(n.compositeFilter.op))}(t):G(30097,{filter:t})}function r2(t){return Hx[t]}function i2(t){return qx[t]}function s2(t){return Wx[t]}function ji(t){return{fieldPath:t.canonicalString()}}function Bi(t){return Qe.fromServerFormat(t.fieldPath)}function qI(t){return t instanceof be?function(n){if(n.op==="=="){if(w_(n.value))return{unaryFilter:{field:ji(n.field),op:"IS_NAN"}};if(E_(n.value))return{unaryFilter:{field:ji(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(w_(n.value))return{unaryFilter:{field:ji(n.field),op:"IS_NOT_NAN"}};if(E_(n.value))return{unaryFilter:{field:ji(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:ji(n.field),op:i2(n.op),value:n.value}}}(t):t instanceof sn?function(n){const r=n.getFilters().map(i=>qI(i));return r.length===1?r[0]:{compositeFilter:{op:s2(n.op),filters:r}}}(t):G(54877,{filter:t})}function o2(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function WI(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mr{constructor(e,n,r,i,s=Y.min(),o=Y.min(),l=Je.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=n,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=l,this.expectedCount=u}withSequenceNumber(e){return new mr(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new mr(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new mr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new mr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class a2{constructor(e){this.yt=e}}function l2(t){const e=t2({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?Qd(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class u2{constructor(){this.Cn=new c2}addToCollectionParentIndex(e,n){return this.Cn.add(n),M.resolve()}getCollectionParents(e,n){return M.resolve(this.Cn.getEntries(n))}addFieldIndex(e,n){return M.resolve()}deleteFieldIndex(e,n){return M.resolve()}deleteAllFieldIndexes(e){return M.resolve()}createTargetIndexes(e,n){return M.resolve()}getDocumentsMatchingTarget(e,n){return M.resolve(null)}getIndexType(e,n){return M.resolve(0)}getFieldIndexes(e,n){return M.resolve([])}getNextCollectionGroupToUpdate(e){return M.resolve(null)}getMinOffset(e,n){return M.resolve(Nr.min())}getMinOffsetFromCollectionGroup(e,n){return M.resolve(Nr.min())}updateCollectionGroup(e,n,r){return M.resolve()}updateIndexEntries(e,n){return M.resolve()}}class c2{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),i=this.index[n]||new Be(de.comparator),s=!i.has(r);return this.index[n]=i.add(r),s}has(e){const n=e.lastSegment(),r=e.popLast(),i=this.index[n];return i&&i.has(r)}getEntries(e){return(this.index[e]||new Be(de.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const L_={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},KI=41943040;class gt{static withCacheSize(e){return new gt(e,gt.DEFAULT_COLLECTION_PERCENTILE,gt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,n,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=n,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */gt.DEFAULT_COLLECTION_PERCENTILE=10,gt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,gt.DEFAULT=new gt(KI,gt.DEFAULT_COLLECTION_PERCENTILE,gt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),gt.DISABLED=new gt(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rs{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new Rs(0)}static cr(){return new Rs(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b_="LruGarbageCollector",h2=1048576;function M_([t,e],[n,r]){const i=ne(t,n);return i===0?ne(e,r):i}class d2{constructor(e){this.Ir=e,this.buffer=new Be(M_),this.Er=0}dr(){return++this.Er}Ar(e){const n=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(n);else{const r=this.buffer.last();M_(n,r)<0&&(this.buffer=this.buffer.delete(r).add(n))}}get maxValue(){return this.buffer.last()[0]}}class f2{constructor(e,n,r){this.garbageCollector=e,this.asyncQueue=n,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(e){H(b_,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(n){bs(n)?H(b_,"Ignoring IndexedDB error during garbage collection: ",n):await Ls(n)}await this.Vr(3e5)})}}class p2{constructor(e,n){this.mr=e,this.params=n}calculateTargetCount(e,n){return this.mr.gr(e).next(r=>Math.floor(n/100*r))}nthSequenceNumber(e,n){if(n===0)return M.resolve(rc.ce);const r=new d2(n);return this.mr.forEachTarget(e,i=>r.Ar(i.sequenceNumber)).next(()=>this.mr.pr(e,i=>r.Ar(i))).next(()=>r.maxValue)}removeTargets(e,n,r){return this.mr.removeTargets(e,n,r)}removeOrphanedDocuments(e,n){return this.mr.removeOrphanedDocuments(e,n)}collect(e,n){return this.params.cacheSizeCollectionThreshold===-1?(H("LruGarbageCollector","Garbage collection skipped; disabled"),M.resolve(L_)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(H("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),L_):this.yr(e,n))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,n){let r,i,s,o,l,u,c;const d=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(p=>(p>this.params.maximumSequenceNumbersToCollect?(H("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),i=this.params.maximumSequenceNumbersToCollect):i=p,o=Date.now(),this.nthSequenceNumber(e,i))).next(p=>(r=p,l=Date.now(),this.removeTargets(e,r,n))).next(p=>(s=p,u=Date.now(),this.removeOrphanedDocuments(e,r))).next(p=>(c=Date.now(),Fi()<=te.DEBUG&&H("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-d}ms
	Determined least recently used ${i} in `+(l-o)+`ms
	Removed ${s} targets in `+(u-l)+`ms
	Removed ${p} documents in `+(c-u)+`ms
Total Duration: ${c-d}ms`),M.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:p})))}}function m2(t,e){return new p2(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class g2{constructor(){this.changes=new Ni(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,st.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?M.resolve(r):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class y2{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _2{constructor(e,n,r,i){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,n){let r=null;return this.documentOverlayCache.getOverlay(e,n).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,n))).next(i=>(r!==null&&Uo(r.mutation,i,kt.empty(),ge.now()),i))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.getLocalViewOfDocuments(e,r,re()).next(()=>r))}getLocalViewOfDocuments(e,n,r=re()){const i=si();return this.populateOverlays(e,i,n).next(()=>this.computeViews(e,n,i,r).next(s=>{let o=To();return s.forEach((l,u)=>{o=o.insert(l,u.overlayedDocument)}),o}))}getOverlayedDocuments(e,n){const r=si();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,re()))}populateOverlays(e,n,r){const i=[];return r.forEach(s=>{n.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((o,l)=>{n.set(o,l)})})}computeViews(e,n,r,i){let s=Wn();const o=Fo(),l=function(){return Fo()}();return n.forEach((u,c)=>{const d=r.get(c.key);i.has(c.key)&&(d===void 0||d.mutation instanceof Hr)?s=s.insert(c.key,c):d!==void 0?(o.set(c.key,d.mutation.getFieldMask()),Uo(d.mutation,c,d.mutation.getFieldMask(),ge.now())):o.set(c.key,kt.empty())}),this.recalculateAndSaveOverlays(e,s).next(u=>(u.forEach((c,d)=>o.set(c,d)),n.forEach((c,d)=>l.set(c,new y2(d,o.get(c)??null))),l))}recalculateAndSaveOverlays(e,n){const r=Fo();let i=new Se((o,l)=>o-l),s=re();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(o=>{for(const l of o)l.keys().forEach(u=>{const c=n.get(u);if(c===null)return;let d=r.get(u)||kt.empty();d=l.applyToLocalView(c,d),r.set(u,d);const p=(i.get(l.batchId)||re()).add(u);i=i.insert(l.batchId,p)})}).next(()=>{const o=[],l=i.getReverseIterator();for(;l.hasNext();){const u=l.getNext(),c=u.key,d=u.value,p=kI();d.forEach(m=>{if(!s.has(m)){const T=LI(n.get(m),r.get(m));T!==null&&p.set(m,T),s=s.add(m)}}),o.push(this.documentOverlayCache.saveOverlays(e,c,p))}return M.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,n,r,i){return function(o){return W.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):SI(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,r,i):this.getDocumentsMatchingCollectionQuery(e,n,r,i)}getNextDocuments(e,n,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,r,i).next(s=>{const o=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,r.largestBatchId,i-s.size):M.resolve(si());let l=aa,u=s;return o.next(c=>M.forEach(c,(d,p)=>(l<p.largestBatchId&&(l=p.largestBatchId),s.get(d)?M.resolve():this.remoteDocumentCache.getEntry(e,d).next(m=>{u=u.insert(d,m)}))).next(()=>this.populateOverlays(e,c,s)).next(()=>this.computeViews(e,u,c,re())).next(d=>({batchId:l,changes:PI(d)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new W(n)).next(r=>{let i=To();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,n,r,i){const s=n.collectionGroup;let o=To();return this.indexManager.getCollectionParents(e,s).next(l=>M.forEach(l,u=>{const c=function(p,m){return new Ms(m,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(n,u.child(s));return this.getDocumentsMatchingCollectionQuery(e,c,r,i).next(d=>{d.forEach((p,m)=>{o=o.insert(p,m)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,n,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,r.largestBatchId).next(o=>(s=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,r,s,i))).next(o=>{s.forEach((u,c)=>{const d=c.getKey();o.get(d)===null&&(o=o.insert(d,st.newInvalidDocument(d)))});let l=To();return o.forEach((u,c)=>{const d=s.get(u);d!==void 0&&Uo(d.mutation,c,kt.empty(),ge.now()),lc(n,c)&&(l=l.insert(u,c))}),l})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class v2{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,n){return M.resolve(this.Lr.get(n))}saveBundleMetadata(e,n){return this.Lr.set(n.id,function(i){return{id:i.id,version:i.version,createTime:_n(i.createTime)}}(n)),M.resolve()}getNamedQuery(e,n){return M.resolve(this.kr.get(n))}saveNamedQuery(e,n){return this.kr.set(n.name,function(i){return{name:i.name,query:l2(i.bundledQuery),readTime:_n(i.readTime)}}(n)),M.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class E2{constructor(){this.overlays=new Se(W.comparator),this.qr=new Map}getOverlay(e,n){return M.resolve(this.overlays.get(n))}getOverlays(e,n){const r=si();return M.forEach(n,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,n,r){return r.forEach((i,s)=>{this.St(e,n,s)}),M.resolve()}removeOverlaysForBatchId(e,n,r){const i=this.qr.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.qr.delete(r)),M.resolve()}getOverlaysForCollection(e,n,r){const i=si(),s=n.length+1,o=new W(n.child("")),l=this.overlays.getIteratorFrom(o);for(;l.hasNext();){const u=l.getNext().value,c=u.getKey();if(!n.isPrefixOf(c.path))break;c.path.length===s&&u.largestBatchId>r&&i.set(u.getKey(),u)}return M.resolve(i)}getOverlaysForCollectionGroup(e,n,r,i){let s=new Se((c,d)=>c-d);const o=this.overlays.getIterator();for(;o.hasNext();){const c=o.getNext().value;if(c.getKey().getCollectionGroup()===n&&c.largestBatchId>r){let d=s.get(c.largestBatchId);d===null&&(d=si(),s=s.insert(c.largestBatchId,d)),d.set(c.getKey(),c)}}const l=si(),u=s.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((c,d)=>l.set(c,d)),!(l.size()>=i)););return M.resolve(l)}St(e,n,r){const i=this.overlays.get(r.key);if(i!==null){const o=this.qr.get(i.largestBatchId).delete(r.key);this.qr.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new Fx(n,r));let s=this.qr.get(n);s===void 0&&(s=re(),this.qr.set(n,s)),this.qr.set(n,s.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class w2{constructor(){this.sessionToken=Je.EMPTY_BYTE_STRING}getSessionToken(e){return M.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,M.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xp{constructor(){this.Qr=new Be($e.$r),this.Ur=new Be($e.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,n){const r=new $e(e,n);this.Qr=this.Qr.add(r),this.Ur=this.Ur.add(r)}Wr(e,n){e.forEach(r=>this.addReference(r,n))}removeReference(e,n){this.Gr(new $e(e,n))}zr(e,n){e.forEach(r=>this.removeReference(r,n))}jr(e){const n=new W(new de([])),r=new $e(n,e),i=new $e(n,e+1),s=[];return this.Ur.forEachInRange([r,i],o=>{this.Gr(o),s.push(o.key)}),s}Jr(){this.Qr.forEach(e=>this.Gr(e))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const n=new W(new de([])),r=new $e(n,e),i=new $e(n,e+1);let s=re();return this.Ur.forEachInRange([r,i],o=>{s=s.add(o.key)}),s}containsKey(e){const n=new $e(e,0),r=this.Qr.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class $e{constructor(e,n){this.key=e,this.Yr=n}static $r(e,n){return W.comparator(e.key,n.key)||ne(e.Yr,n.Yr)}static Kr(e,n){return ne(e.Yr,n.Yr)||W.comparator(e.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class T2{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.tr=1,this.Zr=new Be($e.$r)}checkEmpty(e){return M.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,r,i){const s=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new Mx(s,n,r,i);this.mutationQueue.push(o);for(const l of i)this.Zr=this.Zr.add(new $e(l.key,s)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return M.resolve(o)}lookupMutationBatch(e,n){return M.resolve(this.Xr(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,i=this.ei(r),s=i<0?0:i;return M.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return M.resolve(this.mutationQueue.length===0?wp:this.tr-1)}getAllMutationBatches(e){return M.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new $e(n,0),i=new $e(n,Number.POSITIVE_INFINITY),s=[];return this.Zr.forEachInRange([r,i],o=>{const l=this.Xr(o.Yr);s.push(l)}),M.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new Be(ne);return n.forEach(i=>{const s=new $e(i,0),o=new $e(i,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([s,o],l=>{r=r.add(l.Yr)})}),M.resolve(this.ti(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,i=r.length+1;let s=r;W.isDocumentKey(s)||(s=s.child(""));const o=new $e(new W(s),0);let l=new Be(ne);return this.Zr.forEachWhile(u=>{const c=u.key.path;return!!r.isPrefixOf(c)&&(c.length===i&&(l=l.add(u.Yr)),!0)},o),M.resolve(this.ti(l))}ti(e){const n=[];return e.forEach(r=>{const i=this.Xr(r);i!==null&&n.push(i)}),n}removeMutationBatch(e,n){ae(this.ni(n.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Zr;return M.forEach(n.mutations,i=>{const s=new $e(i.key,n.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.Zr=r})}ir(e){}containsKey(e,n){const r=new $e(n,0),i=this.Zr.firstAfterOrEqual(r);return M.resolve(n.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,M.resolve()}ni(e,n){return this.ei(e)}ei(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Xr(e){const n=this.ei(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class I2{constructor(e){this.ri=e,this.docs=function(){return new Se(W.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const r=n.key,i=this.docs.get(r),s=i?i.size:0,o=this.ri(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:o}),this.size+=o-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return M.resolve(r?r.document.mutableCopy():st.newInvalidDocument(n))}getEntries(e,n){let r=Wn();return n.forEach(i=>{const s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():st.newInvalidDocument(i))}),M.resolve(r)}getDocumentsMatchingQuery(e,n,r,i){let s=Wn();const o=n.path,l=new W(o.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(l);for(;u.hasNext();){const{key:c,value:{document:d}}=u.getNext();if(!o.isPrefixOf(c.path))break;c.path.length>o.length+1||JD(XD(d),r)<=0||(i.has(d.key)||lc(n,d))&&(s=s.insert(d.key,d.mutableCopy()))}return M.resolve(s)}getAllFromCollectionGroup(e,n,r,i){G(9500)}ii(e,n){return M.forEach(this.docs,r=>n(r))}newChangeBuffer(e){return new S2(this)}getSize(e){return M.resolve(this.size)}}class S2 extends g2{constructor(e){super(),this.Nr=e}applyChanges(e){const n=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?n.push(this.Nr.addEntry(e,i)):this.Nr.removeEntry(r)}),M.waitFor(n)}getFromCache(e,n){return this.Nr.getEntry(e,n)}getAllFromCache(e,n){return this.Nr.getEntries(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A2{constructor(e){this.persistence=e,this.si=new Ni(n=>Sp(n),Ap),this.lastRemoteSnapshotVersion=Y.min(),this.highestTargetId=0,this.oi=0,this._i=new xp,this.targetCount=0,this.ai=Rs.ur()}forEachTarget(e,n){return this.si.forEach((r,i)=>n(i)),M.resolve()}getLastRemoteSnapshotVersion(e){return M.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return M.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),M.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.oi&&(this.oi=n),M.resolve()}Pr(e){this.si.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.ai=new Rs(n),this.highestTargetId=n),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,n){return this.Pr(n),this.targetCount+=1,M.resolve()}updateTargetData(e,n){return this.Pr(n),M.resolve()}removeTargetData(e,n){return this.si.delete(n.target),this._i.jr(n.targetId),this.targetCount-=1,M.resolve()}removeTargets(e,n,r){let i=0;const s=[];return this.si.forEach((o,l)=>{l.sequenceNumber<=n&&r.get(l.targetId)===null&&(this.si.delete(o),s.push(this.removeMatchingKeysForTargetId(e,l.targetId)),i++)}),M.waitFor(s).next(()=>i)}getTargetCount(e){return M.resolve(this.targetCount)}getTargetData(e,n){const r=this.si.get(n)||null;return M.resolve(r)}addMatchingKeys(e,n,r){return this._i.Wr(n,r),M.resolve()}removeMatchingKeys(e,n,r){this._i.zr(n,r);const i=this.persistence.referenceDelegate,s=[];return i&&n.forEach(o=>{s.push(i.markPotentiallyOrphaned(e,o))}),M.waitFor(s)}removeMatchingKeysForTargetId(e,n){return this._i.jr(n),M.resolve()}getMatchingKeysForTargetId(e,n){const r=this._i.Hr(n);return M.resolve(r)}containsKey(e,n){return M.resolve(this._i.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GI{constructor(e,n){this.ui={},this.overlays={},this.ci=new rc(0),this.li=!1,this.li=!0,this.hi=new w2,this.referenceDelegate=e(this),this.Pi=new A2(this),this.indexManager=new u2,this.remoteDocumentCache=function(i){return new I2(i)}(r=>this.referenceDelegate.Ti(r)),this.serializer=new a2(n),this.Ii=new v2(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new E2,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let r=this.ui[e.toKey()];return r||(r=new T2(n,this.referenceDelegate),this.ui[e.toKey()]=r),r}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,n,r){H("MemoryPersistence","Starting transaction:",e);const i=new R2(this.ci.next());return this.referenceDelegate.Ei(),r(i).next(s=>this.referenceDelegate.di(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Ai(e,n){return M.or(Object.values(this.ui).map(r=>()=>r.containsKey(e,n)))}}class R2 extends ex{constructor(e){super(),this.currentSequenceNumber=e}}class Op{constructor(e){this.persistence=e,this.Ri=new xp,this.Vi=null}static mi(e){return new Op(e)}get fi(){if(this.Vi)return this.Vi;throw G(60996)}addReference(e,n,r){return this.Ri.addReference(r,n),this.fi.delete(r.toString()),M.resolve()}removeReference(e,n,r){return this.Ri.removeReference(r,n),this.fi.add(r.toString()),M.resolve()}markPotentiallyOrphaned(e,n){return this.fi.add(n.toString()),M.resolve()}removeTarget(e,n){this.Ri.jr(n.targetId).forEach(i=>this.fi.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next(i=>{i.forEach(s=>this.fi.add(s.toString()))}).next(()=>r.removeTargetData(e,n))}Ei(){this.Vi=new Set}di(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return M.forEach(this.fi,r=>{const i=W.fromPath(r);return this.gi(e,i).next(s=>{s||n.removeEntry(i,Y.min())})}).next(()=>(this.Vi=null,n.apply(e)))}updateLimboDocument(e,n){return this.gi(e,n).next(r=>{r?this.fi.delete(n.toString()):this.fi.add(n.toString())})}Ti(e){return 0}gi(e,n){return M.or([()=>M.resolve(this.Ri.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Ai(e,n)])}}class Su{constructor(e,n){this.persistence=e,this.pi=new Ni(r=>rx(r.path),(r,i)=>r.isEqual(i)),this.garbageCollector=m2(this,n)}static mi(e,n){return new Su(e,n)}Ei(){}di(e){return M.resolve()}forEachTarget(e,n){return this.persistence.getTargetCache().forEachTarget(e,n)}gr(e){const n=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>n.next(i=>r+i))}wr(e){let n=0;return this.pr(e,r=>{n++}).next(()=>n)}pr(e,n){return M.forEach(this.pi,(r,i)=>this.br(e,r,i).next(s=>s?M.resolve():n(i)))}removeTargets(e,n,r){return this.persistence.getTargetCache().removeTargets(e,n,r)}removeOrphanedDocuments(e,n){let r=0;const i=this.persistence.getRemoteDocumentCache(),s=i.newChangeBuffer();return i.ii(e,o=>this.br(e,o,n).next(l=>{l||(r++,s.removeEntry(o,Y.min()))})).next(()=>s.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,n){return this.pi.set(n,e.currentSequenceNumber),M.resolve()}removeTarget(e,n){const r=n.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,n,r){return this.pi.set(r,e.currentSequenceNumber),M.resolve()}removeReference(e,n,r){return this.pi.set(r,e.currentSequenceNumber),M.resolve()}updateLimboDocument(e,n){return this.pi.set(n,e.currentSequenceNumber),M.resolve()}Ti(e){let n=e.key.toString().length;return e.isFoundDocument()&&(n+=Vl(e.data.value)),n}br(e,n,r){return M.or([()=>this.persistence.Ai(e,n),()=>this.persistence.getTargetCache().containsKey(e,n),()=>{const i=this.pi.get(n);return M.resolve(i!==void 0&&i>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vp{constructor(e,n,r,i){this.targetId=e,this.fromCache=n,this.Es=r,this.ds=i}static As(e,n){let r=re(),i=re();for(const s of n.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new Vp(e,n.fromCache,r,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C2{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P2{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=function(){return iP()?8:tx(at())>0?6:4}()}initialize(e,n){this.ps=e,this.indexManager=n,this.Rs=!0}getDocumentsMatchingQuery(e,n,r,i){const s={result:null};return this.ys(e,n).next(o=>{s.result=o}).next(()=>{if(!s.result)return this.ws(e,n,i,r).next(o=>{s.result=o})}).next(()=>{if(s.result)return;const o=new C2;return this.Ss(e,n,o).next(l=>{if(s.result=l,this.Vs)return this.bs(e,n,o,l.size)})}).next(()=>s.result)}bs(e,n,r,i){return r.documentReadCount<this.fs?(Fi()<=te.DEBUG&&H("QueryEngine","SDK will not create cache indexes for query:",Ui(n),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),M.resolve()):(Fi()<=te.DEBUG&&H("QueryEngine","Query:",Ui(n),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.gs*i?(Fi()<=te.DEBUG&&H("QueryEngine","The SDK decides to create cache indexes for query:",Ui(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,yn(n))):M.resolve())}ys(e,n){if(A_(n))return M.resolve(null);let r=yn(n);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(n.limit!==null&&i===1&&(n=Qd(n,null,"F"),r=yn(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{const o=re(...s);return this.ps.getDocuments(e,o).next(l=>this.indexManager.getMinOffset(e,r).next(u=>{const c=this.Ds(n,l);return this.Cs(n,c,o,u.readTime)?this.ys(e,Qd(n,null,"F")):this.vs(e,c,n,u)}))})))}ws(e,n,r,i){return A_(n)||i.isEqual(Y.min())?M.resolve(null):this.ps.getDocuments(e,r).next(s=>{const o=this.Ds(n,s);return this.Cs(n,o,r,i)?M.resolve(null):(Fi()<=te.DEBUG&&H("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Ui(n)),this.vs(e,o,n,YD(i,aa)).next(l=>l))})}Ds(e,n){let r=new Be(RI(e));return n.forEach((i,s)=>{lc(e,s)&&(r=r.add(s))}),r}Cs(e,n,r,i){if(e.limit===null)return!1;if(r.size!==n.size)return!0;const s=e.limitType==="F"?n.last():n.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}Ss(e,n,r){return Fi()<=te.DEBUG&&H("QueryEngine","Using full collection scan to execute query:",Ui(n)),this.ps.getDocumentsMatchingQuery(e,n,Nr.min(),r)}vs(e,n,r,i){return this.ps.getDocumentsMatchingQuery(e,r,i).next(s=>(n.forEach(o=>{s=s.insert(o.key,o)}),s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lp="LocalStore",k2=3e8;class N2{constructor(e,n,r,i){this.persistence=e,this.Fs=n,this.serializer=i,this.Ms=new Se(ne),this.xs=new Ni(s=>Sp(s),Ap),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(r)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new _2(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.Ms))}}function D2(t,e,n,r){return new N2(t,e,n,r)}async function QI(t,e){const n=X(t);return await n.persistence.runTransaction("Handle user change","readonly",r=>{let i;return n.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,n.Bs(e),n.mutationQueue.getAllMutationBatches(r))).next(s=>{const o=[],l=[];let u=re();for(const c of i){o.push(c.batchId);for(const d of c.mutations)u=u.add(d.key)}for(const c of s){l.push(c.batchId);for(const d of c.mutations)u=u.add(d.key)}return n.localDocuments.getDocuments(r,u).next(c=>({Ls:c,removedBatchIds:o,addedBatchIds:l}))})})}function x2(t,e){const n=X(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const i=e.batch.keys(),s=n.Ns.newChangeBuffer({trackRemovals:!0});return function(l,u,c,d){const p=c.batch,m=p.keys();let T=M.resolve();return m.forEach(C=>{T=T.next(()=>d.getEntry(u,C)).next(P=>{const D=c.docVersions.get(C);ae(D!==null,48541),P.version.compareTo(D)<0&&(p.applyToRemoteDocument(P,c),P.isValidDocument()&&(P.setReadTime(c.commitVersion),d.addEntry(P)))})}),T.next(()=>l.mutationQueue.removeMutationBatch(u,p))}(n,r,e,s).next(()=>s.apply(r)).next(()=>n.mutationQueue.performConsistencyCheck(r)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let u=re();for(let c=0;c<l.mutationResults.length;++c)l.mutationResults[c].transformResults.length>0&&(u=u.add(l.batch.mutations[c].key));return u}(e))).next(()=>n.localDocuments.getDocuments(r,i))})}function YI(t){const e=X(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.Pi.getLastRemoteSnapshotVersion(n))}function O2(t,e){const n=X(t),r=e.snapshotVersion;let i=n.Ms;return n.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{const o=n.Ns.newChangeBuffer({trackRemovals:!0});i=n.Ms;const l=[];e.targetChanges.forEach((d,p)=>{const m=i.get(p);if(!m)return;l.push(n.Pi.removeMatchingKeys(s,d.removedDocuments,p).next(()=>n.Pi.addMatchingKeys(s,d.addedDocuments,p)));let T=m.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(p)!==null?T=T.withResumeToken(Je.EMPTY_BYTE_STRING,Y.min()).withLastLimboFreeSnapshotVersion(Y.min()):d.resumeToken.approximateByteSize()>0&&(T=T.withResumeToken(d.resumeToken,r)),i=i.insert(p,T),function(P,D,v){return P.resumeToken.approximateByteSize()===0||D.snapshotVersion.toMicroseconds()-P.snapshotVersion.toMicroseconds()>=k2?!0:v.addedDocuments.size+v.modifiedDocuments.size+v.removedDocuments.size>0}(m,T,d)&&l.push(n.Pi.updateTargetData(s,T))});let u=Wn(),c=re();if(e.documentUpdates.forEach(d=>{e.resolvedLimboDocuments.has(d)&&l.push(n.persistence.referenceDelegate.updateLimboDocument(s,d))}),l.push(V2(s,o,e.documentUpdates).next(d=>{u=d.ks,c=d.qs})),!r.isEqual(Y.min())){const d=n.Pi.getLastRemoteSnapshotVersion(s).next(p=>n.Pi.setTargetsMetadata(s,s.currentSequenceNumber,r));l.push(d)}return M.waitFor(l).next(()=>o.apply(s)).next(()=>n.localDocuments.getLocalViewOfDocuments(s,u,c)).next(()=>u)}).then(s=>(n.Ms=i,s))}function V2(t,e,n){let r=re(),i=re();return n.forEach(s=>r=r.add(s)),e.getEntries(t,r).next(s=>{let o=Wn();return n.forEach((l,u)=>{const c=s.get(l);u.isFoundDocument()!==c.isFoundDocument()&&(i=i.add(l)),u.isNoDocument()&&u.version.isEqual(Y.min())?(e.removeEntry(l,u.readTime),o=o.insert(l,u)):!c.isValidDocument()||u.version.compareTo(c.version)>0||u.version.compareTo(c.version)===0&&c.hasPendingWrites?(e.addEntry(u),o=o.insert(l,u)):H(Lp,"Ignoring outdated watch update for ",l,". Current version:",c.version," Watch version:",u.version)}),{ks:o,qs:i}})}function L2(t,e){const n=X(t);return n.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=wp),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function b2(t,e){const n=X(t);return n.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return n.Pi.getTargetData(r,e).next(s=>s?(i=s,M.resolve(i)):n.Pi.allocateTargetId(r).next(o=>(i=new mr(e,o,"TargetPurposeListen",r.currentSequenceNumber),n.Pi.addTargetData(r,i).next(()=>i))))}).then(r=>{const i=n.Ms.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(n.Ms=n.Ms.insert(r.targetId,r),n.xs.set(e,r.targetId)),r})}async function ef(t,e,n){const r=X(t),i=r.Ms.get(e),s=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",s,o=>r.persistence.referenceDelegate.removeTarget(o,i))}catch(o){if(!bs(o))throw o;H(Lp,`Failed to update sequence numbers for target ${e}: ${o}`)}r.Ms=r.Ms.remove(e),r.xs.delete(i.target)}function F_(t,e,n){const r=X(t);let i=Y.min(),s=re();return r.persistence.runTransaction("Execute query","readwrite",o=>function(u,c,d){const p=X(u),m=p.xs.get(d);return m!==void 0?M.resolve(p.Ms.get(m)):p.Pi.getTargetData(c,d)}(r,o,yn(e)).next(l=>{if(l)return i=l.lastLimboFreeSnapshotVersion,r.Pi.getMatchingKeysForTargetId(o,l.targetId).next(u=>{s=u})}).next(()=>r.Fs.getDocumentsMatchingQuery(o,e,n?i:Y.min(),n?s:re())).next(l=>(M2(r,Tx(e),l),{documents:l,Qs:s})))}function M2(t,e,n){let r=t.Os.get(e)||Y.min();n.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),t.Os.set(e,r)}class U_{constructor(){this.activeTargetIds=Px()}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class F2{constructor(){this.Mo=new U_,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e,n=!0){return n&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,n,r){this.xo[e]=n}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new U_,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U2{Oo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const j_="ConnectivityMonitor";class B_{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){H(j_,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){H(j_,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let dl=null;function tf(){return dl===null?dl=function(){return 268435456+Math.round(2147483648*Math.random())}():dl++,"0x"+dl.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nh="RestConnection",j2={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class B2{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const n=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.Uo=n+"://"+e.host,this.Ko=`projects/${r}/databases/${i}`,this.Wo=this.databaseId.database===vu?`project_id=${r}`:`project_id=${r}&database_id=${i}`}Go(e,n,r,i,s){const o=tf(),l=this.zo(e,n.toUriEncodedString());H(Nh,`Sending RPC '${e}' ${o}:`,l,r);const u={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(u,i,s);const{host:c}=new URL(l),d=jr(c);return this.Jo(e,l,u,r,d).then(p=>(H(Nh,`Received RPC '${e}' ${o}: `,p),p),p=>{throw Es(Nh,`RPC '${e}' ${o} failed with error: `,p,"url: ",l,"request:",r),p})}Ho(e,n,r,i,s,o){return this.Go(e,n,r,i,s)}jo(e,n,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Vs}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((i,s)=>e[s]=i),r&&r.headers.forEach((i,s)=>e[s]=i)}zo(e,n){const r=j2[e];return`${this.Uo}/v1/${n}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z2{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nt="WebChannelConnection";class $2 extends B2{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,n,r,i,s){const o=tf();return new Promise((l,u)=>{const c=new ZT;c.setWithCredentials(!0),c.listenOnce(eI.COMPLETE,()=>{try{switch(c.getLastErrorCode()){case Ol.NO_ERROR:const p=c.getResponseJson();H(nt,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(p)),l(p);break;case Ol.TIMEOUT:H(nt,`RPC '${e}' ${o} timed out`),u(new z(L.DEADLINE_EXCEEDED,"Request time out"));break;case Ol.HTTP_ERROR:const m=c.getStatus();if(H(nt,`RPC '${e}' ${o} failed with status:`,m,"response text:",c.getResponseText()),m>0){let T=c.getResponseJson();Array.isArray(T)&&(T=T[0]);const C=T==null?void 0:T.error;if(C&&C.status&&C.message){const P=function(v){const _=v.toLowerCase().replace(/_/g,"-");return Object.values(L).indexOf(_)>=0?_:L.UNKNOWN}(C.status);u(new z(P,C.message))}else u(new z(L.UNKNOWN,"Server responded with status "+c.getStatus()))}else u(new z(L.UNAVAILABLE,"Connection failed."));break;default:G(9055,{l_:e,streamId:o,h_:c.getLastErrorCode(),P_:c.getLastError()})}}finally{H(nt,`RPC '${e}' ${o} completed.`)}});const d=JSON.stringify(i);H(nt,`RPC '${e}' ${o} sending request:`,i),c.send(n,"POST",d,r,15)})}T_(e,n,r){const i=tf(),s=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=rI(),l=nI(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;c!==void 0&&(u.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(u.useFetchStreams=!0),this.jo(u.initMessageHeaders,n,r),u.encodeInitMessageHeaders=!0;const d=s.join("");H(nt,`Creating RPC '${e}' stream ${i}: ${d}`,u);const p=o.createWebChannel(d,u);this.I_(p);let m=!1,T=!1;const C=new z2({Yo:D=>{T?H(nt,`Not sending because RPC '${e}' stream ${i} is closed:`,D):(m||(H(nt,`Opening RPC '${e}' stream ${i} transport.`),p.open(),m=!0),H(nt,`RPC '${e}' stream ${i} sending:`,D),p.send(D))},Zo:()=>p.close()}),P=(D,v,_)=>{D.listen(v,I=>{try{_(I)}catch(x){setTimeout(()=>{throw x},0)}})};return P(p,wo.EventType.OPEN,()=>{T||(H(nt,`RPC '${e}' stream ${i} transport opened.`),C.o_())}),P(p,wo.EventType.CLOSE,()=>{T||(T=!0,H(nt,`RPC '${e}' stream ${i} transport closed`),C.a_(),this.E_(p))}),P(p,wo.EventType.ERROR,D=>{T||(T=!0,Es(nt,`RPC '${e}' stream ${i} transport errored. Name:`,D.name,"Message:",D.message),C.a_(new z(L.UNAVAILABLE,"The operation could not be completed")))}),P(p,wo.EventType.MESSAGE,D=>{var v;if(!T){const _=D.data[0];ae(!!_,16349);const I=_,x=(I==null?void 0:I.error)||((v=I[0])==null?void 0:v.error);if(x){H(nt,`RPC '${e}' stream ${i} received error:`,x);const F=x.status;let j=function(w){const A=Ve[w];if(A!==void 0)return MI(A)}(F),E=x.message;j===void 0&&(j=L.INTERNAL,E="Unknown error status: "+F+" with message "+x.message),T=!0,C.a_(new z(j,E)),p.close()}else H(nt,`RPC '${e}' stream ${i} received:`,_),C.u_(_)}}),P(l,tI.STAT_EVENT,D=>{D.stat===zd.PROXY?H(nt,`RPC '${e}' stream ${i} detected buffering proxy`):D.stat===zd.NOPROXY&&H(nt,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{C.__()},0),C}terminate(){this.c_.forEach(e=>e.close()),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter(n=>n===e)}}function Dh(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dc(t){return new Kx(t,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XI{constructor(e,n,r=1e3,i=1.5,s=6e4){this.Mi=e,this.timerId=n,this.d_=r,this.A_=i,this.R_=s,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const n=Math.floor(this.V_+this.y_()),r=Math.max(0,Date.now()-this.f_),i=Math.max(0,n-r);i>0&&H("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.V_} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,i,()=>(this.f_=Date.now(),e())),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const z_="PersistentStream";class JI{constructor(e,n,r,i,s,o,l,u){this.Mi=e,this.S_=r,this.b_=i,this.connection=s,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=l,this.listener=u,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new XI(e,n)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,n){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():n&&n.code===L.RESOURCE_EXHAUSTED?(qn(n.toString()),qn("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):n&&n.code===L.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(n)}K_(){}auth(){this.state=1;const e=this.W_(this.D_),n=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.D_===n&&this.G_(r,i)},r=>{e(()=>{const i=new z(L.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(i)})})}G_(e,n){const r=this.W_(this.D_);this.stream=this.j_(e,n),this.stream.Xo(()=>{r(()=>this.listener.Xo())}),this.stream.t_(()=>{r(()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.t_()))}),this.stream.r_(i=>{r(()=>this.z_(i))}),this.stream.onMessage(i=>{r(()=>++this.F_==1?this.J_(i):this.onNext(i))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return H(z_,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return n=>{this.Mi.enqueueAndForget(()=>this.D_===e?n():(H(z_,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class H2 extends JI{constructor(e,n,r,i,s,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,i,o),this.serializer=s}j_(e,n){return this.connection.T_("Listen",e,n)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const n=Yx(this.serializer,e),r=function(s){if(!("targetChange"in s))return Y.min();const o=s.targetChange;return o.targetIds&&o.targetIds.length?Y.min():o.readTime?_n(o.readTime):Y.min()}(e);return this.listener.H_(n,r)}Y_(e){const n={};n.database=Zd(this.serializer),n.addTarget=function(s,o){let l;const u=o.target;if(l=Kd(u)?{documents:Zx(s,u)}:{query:e2(s,u).ft},l.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){l.resumeToken=jI(s,o.resumeToken);const c=Yd(s,o.expectedCount);c!==null&&(l.expectedCount=c)}else if(o.snapshotVersion.compareTo(Y.min())>0){l.readTime=Iu(s,o.snapshotVersion.toTimestamp());const c=Yd(s,o.expectedCount);c!==null&&(l.expectedCount=c)}return l}(this.serializer,e);const r=n2(this.serializer,e);r&&(n.labels=r),this.q_(n)}Z_(e){const n={};n.database=Zd(this.serializer),n.removeTarget=e,this.q_(n)}}class q2 extends JI{constructor(e,n,r,i,s,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,i,o),this.serializer=s}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,n){return this.connection.T_("Write",e,n)}J_(e){return ae(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,ae(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){ae(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const n=Jx(e.writeResults,e.commitTime),r=_n(e.commitTime);return this.listener.na(r,n)}ra(){const e={};e.database=Zd(this.serializer),this.q_(e)}ea(e){const n={streamToken:this.lastStreamToken,writes:e.map(r=>Xx(this.serializer,r))};this.q_(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W2{}class K2 extends W2{constructor(e,n,r,i){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=i,this.ia=!1}sa(){if(this.ia)throw new z(L.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,n,r,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.Go(e,Xd(n,r),i,s,o)).catch(s=>{throw s.name==="FirebaseError"?(s.code===L.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new z(L.UNKNOWN,s.toString())})}Ho(e,n,r,i,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,l])=>this.connection.Ho(e,Xd(n,r),i,o,l,s)).catch(o=>{throw o.name==="FirebaseError"?(o.code===L.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new z(L.UNKNOWN,o.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}class G2{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(qn(n),this.aa=!1):H("OnlineStateTracker",n)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wi="RemoteStore";class Q2{constructor(e,n,r,i,s){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=s,this.Aa.Oo(o=>{r.enqueueAndForget(async()=>{Di(this)&&(H(wi,"Restarting streams for network reachability change."),await async function(u){const c=X(u);c.Ea.add(4),await ka(c),c.Ra.set("Unknown"),c.Ea.delete(4),await fc(c)}(this))})}),this.Ra=new G2(r,i)}}async function fc(t){if(Di(t))for(const e of t.da)await e(!0)}async function ka(t){for(const e of t.da)await e(!1)}function ZI(t,e){const n=X(t);n.Ia.has(e.targetId)||(n.Ia.set(e.targetId,e),Up(n)?Fp(n):Fs(n).O_()&&Mp(n,e))}function bp(t,e){const n=X(t),r=Fs(n);n.Ia.delete(e),r.O_()&&e0(n,e),n.Ia.size===0&&(r.O_()?r.L_():Di(n)&&n.Ra.set("Unknown"))}function Mp(t,e){if(t.Va.Ue(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(Y.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}Fs(t).Y_(e)}function e0(t,e){t.Va.Ue(e),Fs(t).Z_(e)}function Fp(t){t.Va=new $x({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),At:e=>t.Ia.get(e)||null,ht:()=>t.datastore.serializer.databaseId}),Fs(t).start(),t.Ra.ua()}function Up(t){return Di(t)&&!Fs(t).x_()&&t.Ia.size>0}function Di(t){return X(t).Ea.size===0}function t0(t){t.Va=void 0}async function Y2(t){t.Ra.set("Online")}async function X2(t){t.Ia.forEach((e,n)=>{Mp(t,e)})}async function J2(t,e){t0(t),Up(t)?(t.Ra.ha(e),Fp(t)):t.Ra.set("Unknown")}async function Z2(t,e,n){if(t.Ra.set("Online"),e instanceof UI&&e.state===2&&e.cause)try{await async function(i,s){const o=s.cause;for(const l of s.targetIds)i.Ia.has(l)&&(await i.remoteSyncer.rejectListen(l,o),i.Ia.delete(l),i.Va.removeTarget(l))}(t,e)}catch(r){H(wi,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Au(t,r)}else if(e instanceof Ml?t.Va.Ze(e):e instanceof FI?t.Va.st(e):t.Va.tt(e),!n.isEqual(Y.min()))try{const r=await YI(t.localStore);n.compareTo(r)>=0&&await function(s,o){const l=s.Va.Tt(o);return l.targetChanges.forEach((u,c)=>{if(u.resumeToken.approximateByteSize()>0){const d=s.Ia.get(c);d&&s.Ia.set(c,d.withResumeToken(u.resumeToken,o))}}),l.targetMismatches.forEach((u,c)=>{const d=s.Ia.get(u);if(!d)return;s.Ia.set(u,d.withResumeToken(Je.EMPTY_BYTE_STRING,d.snapshotVersion)),e0(s,u);const p=new mr(d.target,u,c,d.sequenceNumber);Mp(s,p)}),s.remoteSyncer.applyRemoteEvent(l)}(t,n)}catch(r){H(wi,"Failed to raise snapshot:",r),await Au(t,r)}}async function Au(t,e,n){if(!bs(e))throw e;t.Ea.add(1),await ka(t),t.Ra.set("Offline"),n||(n=()=>YI(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{H(wi,"Retrying IndexedDB access"),await n(),t.Ea.delete(1),await fc(t)})}function n0(t,e){return e().catch(n=>Au(t,n,e))}async function pc(t){const e=X(t),n=Vr(e);let r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:wp;for(;eO(e);)try{const i=await L2(e.localStore,r);if(i===null){e.Ta.length===0&&n.L_();break}r=i.batchId,tO(e,i)}catch(i){await Au(e,i)}r0(e)&&i0(e)}function eO(t){return Di(t)&&t.Ta.length<10}function tO(t,e){t.Ta.push(e);const n=Vr(t);n.O_()&&n.X_&&n.ea(e.mutations)}function r0(t){return Di(t)&&!Vr(t).x_()&&t.Ta.length>0}function i0(t){Vr(t).start()}async function nO(t){Vr(t).ra()}async function rO(t){const e=Vr(t);for(const n of t.Ta)e.ea(n.mutations)}async function iO(t,e,n){const r=t.Ta.shift(),i=kp.from(r,e,n);await n0(t,()=>t.remoteSyncer.applySuccessfulWrite(i)),await pc(t)}async function sO(t,e){e&&Vr(t).X_&&await async function(r,i){if(function(o){return jx(o)&&o!==L.ABORTED}(i.code)){const s=r.Ta.shift();Vr(r).B_(),await n0(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await pc(r)}}(t,e),r0(t)&&i0(t)}async function $_(t,e){const n=X(t);n.asyncQueue.verifyOperationInProgress(),H(wi,"RemoteStore received new credentials");const r=Di(n);n.Ea.add(3),await ka(n),r&&n.Ra.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.Ea.delete(3),await fc(n)}async function oO(t,e){const n=X(t);e?(n.Ea.delete(2),await fc(n)):e||(n.Ea.add(2),await ka(n),n.Ra.set("Unknown"))}function Fs(t){return t.ma||(t.ma=function(n,r,i){const s=X(n);return s.sa(),new H2(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(t.datastore,t.asyncQueue,{Xo:Y2.bind(null,t),t_:X2.bind(null,t),r_:J2.bind(null,t),H_:Z2.bind(null,t)}),t.da.push(async e=>{e?(t.ma.B_(),Up(t)?Fp(t):t.Ra.set("Unknown")):(await t.ma.stop(),t0(t))})),t.ma}function Vr(t){return t.fa||(t.fa=function(n,r,i){const s=X(n);return s.sa(),new q2(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(t.datastore,t.asyncQueue,{Xo:()=>Promise.resolve(),t_:nO.bind(null,t),r_:sO.bind(null,t),ta:rO.bind(null,t),na:iO.bind(null,t)}),t.da.push(async e=>{e?(t.fa.B_(),await pc(t)):(await t.fa.stop(),t.Ta.length>0&&(H(wi,`Stopping write stream with ${t.Ta.length} pending writes`),t.Ta=[]))})),t.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jp{constructor(e,n,r,i,s){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new Mn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,i,s){const o=Date.now()+r,l=new jp(e,n,o,i,s);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new z(L.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Bp(t,e){if(qn("AsyncQueue",`${e}: ${t}`),bs(t))return new z(L.UNAVAILABLE,`${e}: ${t}`);throw t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hs{static emptySet(e){return new hs(e.comparator)}constructor(e){this.comparator=e?(n,r)=>e(n,r)||W.comparator(n.key,r.key):(n,r)=>W.comparator(n.key,r.key),this.keyedMap=To(),this.sortedSet=new Se(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,r)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof hs)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const i=n.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new hs;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class H_{constructor(){this.ga=new Se(W.comparator)}track(e){const n=e.doc.key,r=this.ga.get(n);r?e.type!==0&&r.type===3?this.ga=this.ga.insert(n,e):e.type===3&&r.type!==1?this.ga=this.ga.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.ga=this.ga.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.ga=this.ga.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.ga=this.ga.remove(n):e.type===1&&r.type===2?this.ga=this.ga.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.ga=this.ga.insert(n,{type:2,doc:e.doc}):G(63341,{Rt:e,pa:r}):this.ga=this.ga.insert(n,e)}ya(){const e=[];return this.ga.inorderTraversal((n,r)=>{e.push(r)}),e}}class Cs{constructor(e,n,r,i,s,o,l,u,c){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=o,this.syncStateChanged=l,this.excludesMetadataChanges=u,this.hasCachedResults=c}static fromInitialDocuments(e,n,r,i,s){const o=[];return n.forEach(l=>{o.push({type:0,doc:l})}),new Cs(e,n,hs.emptySet(n),o,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&ac(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let i=0;i<n.length;i++)if(n[i].type!==r[i].type||!n[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aO{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class lO{constructor(){this.queries=q_(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(n,r){const i=X(n),s=i.queries;i.queries=q_(),s.forEach((o,l)=>{for(const u of l.Sa)u.onError(r)})})(this,new z(L.ABORTED,"Firestore shutting down"))}}function q_(){return new Ni(t=>AI(t),ac)}async function zp(t,e){const n=X(t);let r=3;const i=e.query;let s=n.queries.get(i);s?!s.ba()&&e.Da()&&(r=2):(s=new aO,r=e.Da()?0:1);try{switch(r){case 0:s.wa=await n.onListen(i,!0);break;case 1:s.wa=await n.onListen(i,!1);break;case 2:await n.onFirstRemoteStoreListen(i)}}catch(o){const l=Bp(o,`Initialization of query '${Ui(e.query)}' failed`);return void e.onError(l)}n.queries.set(i,s),s.Sa.push(e),e.va(n.onlineState),s.wa&&e.Fa(s.wa)&&Hp(n)}async function $p(t,e){const n=X(t),r=e.query;let i=3;const s=n.queries.get(r);if(s){const o=s.Sa.indexOf(e);o>=0&&(s.Sa.splice(o,1),s.Sa.length===0?i=e.Da()?0:1:!s.ba()&&e.Da()&&(i=2))}switch(i){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function uO(t,e){const n=X(t);let r=!1;for(const i of e){const s=i.query,o=n.queries.get(s);if(o){for(const l of o.Sa)l.Fa(i)&&(r=!0);o.wa=i}}r&&Hp(n)}function cO(t,e,n){const r=X(t),i=r.queries.get(e);if(i)for(const s of i.Sa)s.onError(n);r.queries.delete(e)}function Hp(t){t.Ca.forEach(e=>{e.next()})}var nf,W_;(W_=nf||(nf={})).Ma="default",W_.Cache="cache";class qp{constructor(e,n,r){this.query=e,this.xa=n,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new Cs(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),n=!0):this.La(e,this.onlineState)&&(this.ka(e),n=!0),this.Na=e,n}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let n=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),n=!0),n}La(e,n){if(!e.fromCache||!this.Da())return!0;const r=n!=="Offline";return(!this.options.qa||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const n=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}ka(e){e=Cs.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==nf.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s0{constructor(e){this.key=e}}class o0{constructor(e){this.key=e}}class hO{constructor(e,n){this.query=e,this.Ya=n,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=re(),this.mutatedKeys=re(),this.eu=RI(e),this.tu=new hs(this.eu)}get nu(){return this.Ya}ru(e,n){const r=n?n.iu:new H_,i=n?n.tu:this.tu;let s=n?n.mutatedKeys:this.mutatedKeys,o=i,l=!1;const u=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,c=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((d,p)=>{const m=i.get(d),T=lc(this.query,p)?p:null,C=!!m&&this.mutatedKeys.has(m.key),P=!!T&&(T.hasLocalMutations||this.mutatedKeys.has(T.key)&&T.hasCommittedMutations);let D=!1;m&&T?m.data.isEqual(T.data)?C!==P&&(r.track({type:3,doc:T}),D=!0):this.su(m,T)||(r.track({type:2,doc:T}),D=!0,(u&&this.eu(T,u)>0||c&&this.eu(T,c)<0)&&(l=!0)):!m&&T?(r.track({type:0,doc:T}),D=!0):m&&!T&&(r.track({type:1,doc:m}),D=!0,(u||c)&&(l=!0)),D&&(T?(o=o.add(T),s=P?s.add(d):s.delete(d)):(o=o.delete(d),s=s.delete(d)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const d=this.query.limitType==="F"?o.last():o.first();o=o.delete(d.key),s=s.delete(d.key),r.track({type:1,doc:d})}return{tu:o,iu:r,Cs:l,mutatedKeys:s}}su(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r,i){const s=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const o=e.iu.ya();o.sort((d,p)=>function(T,C){const P=D=>{switch(D){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return G(20277,{Rt:D})}};return P(T)-P(C)}(d.type,p.type)||this.eu(d.doc,p.doc)),this.ou(r),i=i??!1;const l=n&&!i?this._u():[],u=this.Xa.size===0&&this.current&&!i?1:0,c=u!==this.Za;return this.Za=u,o.length!==0||c?{snapshot:new Cs(this.query,e.tu,s,o,e.mutatedKeys,u===0,c,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:l}:{au:l}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new H_,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(n=>this.Ya=this.Ya.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Ya=this.Ya.delete(n)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Xa;this.Xa=re(),this.tu.forEach(r=>{this.uu(r.key)&&(this.Xa=this.Xa.add(r.key))});const n=[];return e.forEach(r=>{this.Xa.has(r)||n.push(new o0(r))}),this.Xa.forEach(r=>{e.has(r)||n.push(new s0(r))}),n}cu(e){this.Ya=e.Qs,this.Xa=re();const n=this.ru(e.documents);return this.applyChanges(n,!0)}lu(){return Cs.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const Wp="SyncEngine";class dO{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class fO{constructor(e){this.key=e,this.hu=!1}}class pO{constructor(e,n,r,i,s,o){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=o,this.Pu={},this.Tu=new Ni(l=>AI(l),ac),this.Iu=new Map,this.Eu=new Set,this.du=new Se(W.comparator),this.Au=new Map,this.Ru=new xp,this.Vu={},this.mu=new Map,this.fu=Rs.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function mO(t,e,n=!0){const r=d0(t);let i;const s=r.Tu.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.lu()):i=await a0(r,e,n,!0),i}async function gO(t,e){const n=d0(t);await a0(n,e,!0,!1)}async function a0(t,e,n,r){const i=await b2(t.localStore,yn(e)),s=i.targetId,o=t.sharedClientState.addLocalQueryTarget(s,n);let l;return r&&(l=await yO(t,e,s,o==="current",i.resumeToken)),t.isPrimaryClient&&n&&ZI(t.remoteStore,i),l}async function yO(t,e,n,r,i){t.pu=(p,m,T)=>async function(P,D,v,_){let I=D.view.ru(v);I.Cs&&(I=await F_(P.localStore,D.query,!1).then(({documents:E})=>D.view.ru(E,I)));const x=_&&_.targetChanges.get(D.targetId),F=_&&_.targetMismatches.get(D.targetId)!=null,j=D.view.applyChanges(I,P.isPrimaryClient,x,F);return G_(P,D.targetId,j.au),j.snapshot}(t,p,m,T);const s=await F_(t.localStore,e,!0),o=new hO(e,s.Qs),l=o.ru(s.documents),u=Pa.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline",i),c=o.applyChanges(l,t.isPrimaryClient,u);G_(t,n,c.au);const d=new dO(e,n,o);return t.Tu.set(e,d),t.Iu.has(n)?t.Iu.get(n).push(e):t.Iu.set(n,[e]),c.snapshot}async function _O(t,e,n){const r=X(t),i=r.Tu.get(e),s=r.Iu.get(i.targetId);if(s.length>1)return r.Iu.set(i.targetId,s.filter(o=>!ac(o,e))),void r.Tu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await ef(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),n&&bp(r.remoteStore,i.targetId),rf(r,i.targetId)}).catch(Ls)):(rf(r,i.targetId),await ef(r.localStore,i.targetId,!0))}async function vO(t,e){const n=X(t),r=n.Tu.get(e),i=n.Iu.get(r.targetId);n.isPrimaryClient&&i.length===1&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),bp(n.remoteStore,r.targetId))}async function EO(t,e,n){const r=CO(t);try{const i=await function(o,l){const u=X(o),c=ge.now(),d=l.reduce((T,C)=>T.add(C.key),re());let p,m;return u.persistence.runTransaction("Locally write mutations","readwrite",T=>{let C=Wn(),P=re();return u.Ns.getEntries(T,d).next(D=>{C=D,C.forEach((v,_)=>{_.isValidDocument()||(P=P.add(v))})}).next(()=>u.localDocuments.getOverlayedDocuments(T,C)).next(D=>{p=D;const v=[];for(const _ of l){const I=Lx(_,p.get(_.key).overlayedDocument);I!=null&&v.push(new Hr(_.key,I,yI(I.value.mapValue),zt.exists(!0)))}return u.mutationQueue.addMutationBatch(T,c,v,l)}).next(D=>{m=D;const v=D.applyToLocalDocumentSet(p,P);return u.documentOverlayCache.saveOverlays(T,D.batchId,v)})}).then(()=>({batchId:m.batchId,changes:PI(p)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(o,l,u){let c=o.Vu[o.currentUser.toKey()];c||(c=new Se(ne)),c=c.insert(l,u),o.Vu[o.currentUser.toKey()]=c}(r,i.batchId,n),await Na(r,i.changes),await pc(r.remoteStore)}catch(i){const s=Bp(i,"Failed to persist write");n.reject(s)}}async function l0(t,e){const n=X(t);try{const r=await O2(n.localStore,e);e.targetChanges.forEach((i,s)=>{const o=n.Au.get(s);o&&(ae(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1,22616),i.addedDocuments.size>0?o.hu=!0:i.modifiedDocuments.size>0?ae(o.hu,14607):i.removedDocuments.size>0&&(ae(o.hu,42227),o.hu=!1))}),await Na(n,r,e)}catch(r){await Ls(r)}}function K_(t,e,n){const r=X(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const i=[];r.Tu.forEach((s,o)=>{const l=o.view.va(e);l.snapshot&&i.push(l.snapshot)}),function(o,l){const u=X(o);u.onlineState=l;let c=!1;u.queries.forEach((d,p)=>{for(const m of p.Sa)m.va(l)&&(c=!0)}),c&&Hp(u)}(r.eventManager,e),i.length&&r.Pu.H_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function wO(t,e,n){const r=X(t);r.sharedClientState.updateQueryState(e,"rejected",n);const i=r.Au.get(e),s=i&&i.key;if(s){let o=new Se(W.comparator);o=o.insert(s,st.newNoDocument(s,Y.min()));const l=re().add(s),u=new hc(Y.min(),new Map,new Se(ne),o,l);await l0(r,u),r.du=r.du.remove(s),r.Au.delete(e),Kp(r)}else await ef(r.localStore,e,!1).then(()=>rf(r,e,n)).catch(Ls)}async function TO(t,e){const n=X(t),r=e.batch.batchId;try{const i=await x2(n.localStore,e);c0(n,r,null),u0(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Na(n,i)}catch(i){await Ls(i)}}async function IO(t,e,n){const r=X(t);try{const i=await function(o,l){const u=X(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",c=>{let d;return u.mutationQueue.lookupMutationBatch(c,l).next(p=>(ae(p!==null,37113),d=p.keys(),u.mutationQueue.removeMutationBatch(c,p))).next(()=>u.mutationQueue.performConsistencyCheck(c)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(c,d,l)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(c,d)).next(()=>u.localDocuments.getDocuments(c,d))})}(r.localStore,e);c0(r,e,n),u0(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await Na(r,i)}catch(i){await Ls(i)}}function u0(t,e){(t.mu.get(e)||[]).forEach(n=>{n.resolve()}),t.mu.delete(e)}function c0(t,e,n){const r=X(t);let i=r.Vu[r.currentUser.toKey()];if(i){const s=i.get(e);s&&(n?s.reject(n):s.resolve(),i=i.remove(e)),r.Vu[r.currentUser.toKey()]=i}}function rf(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Iu.get(e))t.Tu.delete(r),n&&t.Pu.yu(r,n);t.Iu.delete(e),t.isPrimaryClient&&t.Ru.jr(e).forEach(r=>{t.Ru.containsKey(r)||h0(t,r)})}function h0(t,e){t.Eu.delete(e.path.canonicalString());const n=t.du.get(e);n!==null&&(bp(t.remoteStore,n),t.du=t.du.remove(e),t.Au.delete(n),Kp(t))}function G_(t,e,n){for(const r of n)r instanceof s0?(t.Ru.addReference(r.key,e),SO(t,r)):r instanceof o0?(H(Wp,"Document no longer in limbo: "+r.key),t.Ru.removeReference(r.key,e),t.Ru.containsKey(r.key)||h0(t,r.key)):G(19791,{wu:r})}function SO(t,e){const n=e.key,r=n.path.canonicalString();t.du.get(n)||t.Eu.has(r)||(H(Wp,"New document in limbo: "+n),t.Eu.add(r),Kp(t))}function Kp(t){for(;t.Eu.size>0&&t.du.size<t.maxConcurrentLimboResolutions;){const e=t.Eu.values().next().value;t.Eu.delete(e);const n=new W(de.fromString(e)),r=t.fu.next();t.Au.set(r,new fO(n)),t.du=t.du.insert(n,r),ZI(t.remoteStore,new mr(yn(oc(n.path)),r,"TargetPurposeLimboResolution",rc.ce))}}async function Na(t,e,n){const r=X(t),i=[],s=[],o=[];r.Tu.isEmpty()||(r.Tu.forEach((l,u)=>{o.push(r.pu(u,e,n).then(c=>{var d;if((c||n)&&r.isPrimaryClient){const p=c?!c.fromCache:(d=n==null?void 0:n.targetChanges.get(u.targetId))==null?void 0:d.current;r.sharedClientState.updateQueryState(u.targetId,p?"current":"not-current")}if(c){i.push(c);const p=Vp.As(u.targetId,c);s.push(p)}}))}),await Promise.all(o),r.Pu.H_(i),await async function(u,c){const d=X(u);try{await d.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>M.forEach(c,m=>M.forEach(m.Es,T=>d.persistence.referenceDelegate.addReference(p,m.targetId,T)).next(()=>M.forEach(m.ds,T=>d.persistence.referenceDelegate.removeReference(p,m.targetId,T)))))}catch(p){if(!bs(p))throw p;H(Lp,"Failed to update sequence numbers: "+p)}for(const p of c){const m=p.targetId;if(!p.fromCache){const T=d.Ms.get(m),C=T.snapshotVersion,P=T.withLastLimboFreeSnapshotVersion(C);d.Ms=d.Ms.insert(m,P)}}}(r.localStore,s))}async function AO(t,e){const n=X(t);if(!n.currentUser.isEqual(e)){H(Wp,"User change. New user:",e.toKey());const r=await QI(n.localStore,e);n.currentUser=e,function(s,o){s.mu.forEach(l=>{l.forEach(u=>{u.reject(new z(L.CANCELLED,o))})}),s.mu.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Na(n,r.Ls)}}function RO(t,e){const n=X(t),r=n.Au.get(e);if(r&&r.hu)return re().add(r.key);{let i=re();const s=n.Iu.get(e);if(!s)return i;for(const o of s){const l=n.Tu.get(o);i=i.unionWith(l.view.nu)}return i}}function d0(t){const e=X(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=l0.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=RO.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=wO.bind(null,e),e.Pu.H_=uO.bind(null,e.eventManager),e.Pu.yu=cO.bind(null,e.eventManager),e}function CO(t){const e=X(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=TO.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=IO.bind(null,e),e}class Ru{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=dc(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,n){return null}Mu(e,n){return null}vu(e){return D2(this.persistence,new P2,e.initialUser,this.serializer)}Cu(e){return new GI(Op.mi,this.serializer)}Du(e){return new F2}async terminate(){var e,n;(e=this.gcScheduler)==null||e.stop(),(n=this.indexBackfillerScheduler)==null||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Ru.provider={build:()=>new Ru};class PO extends Ru{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,n){ae(this.persistence.referenceDelegate instanceof Su,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new f2(r,e.asyncQueue,n)}Cu(e){const n=this.cacheSizeBytes!==void 0?gt.withCacheSize(this.cacheSizeBytes):gt.DEFAULT;return new GI(r=>Su.mi(r,n),this.serializer)}}class sf{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>K_(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=AO.bind(null,this.syncEngine),await oO(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new lO}()}createDatastore(e){const n=dc(e.databaseInfo.databaseId),r=function(s){return new $2(s)}(e.databaseInfo);return function(s,o,l,u){return new K2(s,o,l,u)}(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return function(r,i,s,o,l){return new Q2(r,i,s,o,l)}(this.localStore,this.datastore,e.asyncQueue,n=>K_(this.syncEngine,n,0),function(){return B_.v()?new B_:new U2}())}createSyncEngine(e,n){return function(i,s,o,l,u,c,d){const p=new pO(i,s,o,l,u,c);return d&&(p.gu=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){var e,n;await async function(i){const s=X(i);H(wi,"RemoteStore shutting down."),s.Ea.add(5),await ka(s),s.Aa.shutdown(),s.Ra.set("Unknown")}(this.remoteStore),(e=this.datastore)==null||e.terminate(),(n=this.eventManager)==null||n.terminate()}}sf.provider={build:()=>new sf};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gp{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):qn("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,n){setTimeout(()=>{this.muted||e(n)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lr="FirestoreClient";class kO{constructor(e,n,r,i,s){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=i,this.user=rt.UNAUTHENTICATED,this.clientId=Ep.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,async o=>{H(Lr,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(H(Lr,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Mn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=Bp(n,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function xh(t,e){t.asyncQueue.verifyOperationInProgress(),H(Lr,"Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener(async i=>{r.isEqual(i)||(await QI(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function Q_(t,e){t.asyncQueue.verifyOperationInProgress();const n=await NO(t);H(Lr,"Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(r=>$_(e.remoteStore,r)),t.setAppCheckTokenChangeListener((r,i)=>$_(e.remoteStore,i)),t._onlineComponents=e}async function NO(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){H(Lr,"Using user provided OfflineComponentProvider");try{await xh(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!function(i){return i.name==="FirebaseError"?i.code===L.FAILED_PRECONDITION||i.code===L.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(n))throw n;Es("Error using user provided cache. Falling back to memory cache: "+n),await xh(t,new Ru)}}else H(Lr,"Using default OfflineComponentProvider"),await xh(t,new PO(void 0));return t._offlineComponents}async function f0(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(H(Lr,"Using user provided OnlineComponentProvider"),await Q_(t,t._uninitializedComponentsProvider._online)):(H(Lr,"Using default OnlineComponentProvider"),await Q_(t,new sf))),t._onlineComponents}function DO(t){return f0(t).then(e=>e.syncEngine)}async function Cu(t){const e=await f0(t),n=e.eventManager;return n.onListen=mO.bind(null,e.syncEngine),n.onUnlisten=_O.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=gO.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=vO.bind(null,e.syncEngine),n}function xO(t,e,n={}){const r=new Mn;return t.asyncQueue.enqueueAndForget(async()=>function(s,o,l,u,c){const d=new Gp({next:m=>{d.Nu(),o.enqueueAndForget(()=>$p(s,p));const T=m.docs.has(l);!T&&m.fromCache?c.reject(new z(L.UNAVAILABLE,"Failed to get document because the client is offline.")):T&&m.fromCache&&u&&u.source==="server"?c.reject(new z(L.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):c.resolve(m)},error:m=>c.reject(m)}),p=new qp(oc(l.path),d,{includeMetadataChanges:!0,qa:!0});return zp(s,p)}(await Cu(t),t.asyncQueue,e,n,r)),r.promise}function OO(t,e,n={}){const r=new Mn;return t.asyncQueue.enqueueAndForget(async()=>function(s,o,l,u,c){const d=new Gp({next:m=>{d.Nu(),o.enqueueAndForget(()=>$p(s,p)),m.fromCache&&u.source==="server"?c.reject(new z(L.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):c.resolve(m)},error:m=>c.reject(m)}),p=new qp(l,d,{includeMetadataChanges:!0,qa:!0});return zp(s,p)}(await Cu(t),t.asyncQueue,e,n,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function p0(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Y_=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const m0="firestore.googleapis.com",X_=!0;class J_{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new z(L.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=m0,this.ssl=X_}else this.host=e.host,this.ssl=e.ssl??X_;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=KI;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<h2)throw new z(L.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}QD("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=p0(e.experimentalLongPollingOptions??{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new z(L.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new z(L.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new z(L.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class mc{constructor(e,n,r,i){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new J_({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new z(L.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new z(L.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new J_(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new UD;switch(r.type){case"firstParty":return new $D(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new z(L.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=Y_.get(n);r&&(H("ComponentProvider","Removing Datastore"),Y_.delete(n),r.terminate())}(this),Promise.resolve()}}function VO(t,e,n,r={}){var c;t=St(t,mc);const i=jr(e),s=t._getSettings(),o={...s,emulatorOptions:t._getEmulatorOptions()},l=`${e}:${n}`;i&&(lp(`https://${l}`),up("Firestore",!0)),s.host!==m0&&s.host!==l&&Es("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...s,host:l,ssl:i,emulatorOptions:r};if(!Tn(u,o)&&(t._setSettings(u),r.mockUserToken)){let d,p;if(typeof r.mockUserToken=="string")d=r.mockUserToken,p=rt.MOCK_USER;else{d=aT(r.mockUserToken,(c=t._app)==null?void 0:c.options.projectId);const m=r.mockUserToken.sub||r.mockUserToken.user_id;if(!m)throw new z(L.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");p=new rt(m)}t._authCredentials=new jD(new sI(d,p))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qr{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new qr(this.firestore,e,this._query)}}class Pe{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Cr(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Pe(this.firestore,e,this._key)}toJSON(){return{type:Pe._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,n,r){if(Ra(n,Pe._jsonSchema))return new Pe(e,r||null,new W(de.fromString(n.referencePath)))}}Pe._jsonSchemaVersion="firestore/documentReference/1.0",Pe._jsonSchema={type:Me("string",Pe._jsonSchemaVersion),referencePath:Me("string")};class Cr extends qr{constructor(e,n,r){super(e,n,oc(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Pe(this.firestore,null,new W(e))}withConverter(e){return new Cr(this.firestore,e,this._path)}}function fM(t,e,...n){if(t=ce(t),oI("collection","path",e),t instanceof mc){const r=de.fromString(e,...n);return h_(r),new Cr(t,null,r)}{if(!(t instanceof Pe||t instanceof Cr))throw new z(L.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(de.fromString(e,...n));return h_(r),new Cr(t.firestore,null,r)}}function g0(t,e,...n){if(t=ce(t),arguments.length===1&&(e=Ep.newId()),oI("doc","path",e),t instanceof mc){const r=de.fromString(e,...n);return c_(r),new Pe(t,null,new W(r))}{if(!(t instanceof Pe||t instanceof Cr))throw new z(L.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(de.fromString(e,...n));return c_(r),new Pe(t.firestore,t instanceof Cr?t.converter:null,new W(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Z_="AsyncQueue";class ev{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new XI(this,"async_queue_retry"),this._c=()=>{const r=Dh();r&&H(Z_,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=e;const n=Dh();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const n=Dh();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const n=new Mn;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Xu.push(e),this.lc()))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!bs(e))throw e;H(Z_,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const n=this.ac.then(()=>(this.rc=!0,e().catch(r=>{throw this.nc=r,this.rc=!1,qn("INTERNAL UNHANDLED ERROR: ",tv(r)),r}).then(r=>(this.rc=!1,r))));return this.ac=n,n}enqueueAfterDelay(e,n,r){this.uc(),this.oc.indexOf(e)>-1&&(n=0);const i=jp.createAndSchedule(this,e,n,r,s=>this.hc(s));return this.tc.push(i),i}uc(){this.nc&&G(47125,{Pc:tv(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const n of this.tc)if(n.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{this.tc.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.tc)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.Tc()})}dc(e){this.oc.push(e)}hc(e){const n=this.tc.indexOf(e);this.tc.splice(n,1)}}function tv(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+`
`+t.stack),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nv(t){return function(n,r){if(typeof n!="object"||n===null)return!1;const i=n;for(const s of r)if(s in i&&typeof i[s]=="function")return!0;return!1}(t,["next","error","complete"])}class Kn extends mc{constructor(e,n,r,i){super(e,n,r,i),this.type="firestore",this._queue=new ev,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new ev(e),this._firestoreClient=void 0,await e}}}function LO(t,e){const n=typeof t=="object"?t:Ju(),r=typeof t=="string"?t:vu,i=Br(n,"firestore").getImmediate({identifier:r});if(!i._initialized){const s=iT("firestore");s&&VO(i,...s)}return i}function gc(t){if(t._terminated)throw new z(L.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||bO(t),t._firestoreClient}function bO(t){var r,i,s;const e=t._freezeSettings(),n=function(l,u,c,d){return new ox(l,u,c,d.host,d.ssl,d.experimentalForceLongPolling,d.experimentalAutoDetectLongPolling,p0(d.experimentalLongPollingOptions),d.useFetchStreams,d.isUsingEmulator)}(t._databaseId,((r=t._app)==null?void 0:r.options.appId)||"",t._persistenceKey,e);t._componentsProvider||(i=e.localCache)!=null&&i._offlineComponentProvider&&((s=e.localCache)!=null&&s._onlineComponentProvider)&&(t._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),t._firestoreClient=new kO(t._authCredentials,t._appCheckCredentials,t._queue,n,t._componentsProvider&&function(l){const u=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(u),_online:u}}(t._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ut{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Ut(Je.fromBase64String(e))}catch(n){throw new z(L.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new Ut(Je.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Ut._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Ra(e,Ut._jsonSchema))return Ut.fromBase64String(e.bytes)}}Ut._jsonSchemaVersion="firestore/bytes/1.0",Ut._jsonSchema={type:Me("string",Ut._jsonSchemaVersion),bytes:Me("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yc{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new z(L.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Qe(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Us{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vn{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new z(L.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new z(L.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return ne(this._lat,e._lat)||ne(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:vn._jsonSchemaVersion}}static fromJSON(e){if(Ra(e,vn._jsonSchema))return new vn(e.latitude,e.longitude)}}vn._jsonSchemaVersion="firestore/geoPoint/1.0",vn._jsonSchema={type:Me("string",vn._jsonSchemaVersion),latitude:Me("number"),longitude:Me("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class En{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0}(this._values,e._values)}toJSON(){return{type:En._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Ra(e,En._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(n=>typeof n=="number"))return new En(e.vectorValues);throw new z(L.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}En._jsonSchemaVersion="firestore/vectorValue/1.0",En._jsonSchema={type:Me("string",En._jsonSchemaVersion),vectorValues:Me("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const MO=/^__.*__$/;class FO{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new Hr(e,this.data,this.fieldMask,n,this.fieldTransforms):new Ca(e,this.data,n,this.fieldTransforms)}}class y0{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return new Hr(e,this.data,this.fieldMask,n,this.fieldTransforms)}}function _0(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw G(40011,{Ac:t})}}class _c{constructor(e,n,r,i,s,o){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.Rc(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new _c({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){var i;const n=(i=this.path)==null?void 0:i.child(e),r=this.Vc({path:n,fc:!1});return r.gc(e),r}yc(e){var i;const n=(i=this.path)==null?void 0:i.child(e),r=this.Vc({path:n,fc:!1});return r.Rc(),r}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return Pu(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(e.length===0)throw this.Sc("Document fields must not be empty");if(_0(this.Ac)&&MO.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class UO{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||dc(e)}Cc(e,n,r,i=!1){return new _c({Ac:e,methodName:n,Dc:r,path:Qe.emptyPath(),fc:!1,bc:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function vc(t){const e=t._freezeSettings(),n=dc(t._databaseId);return new UO(t._databaseId,!!e.ignoreUndefinedProperties,n)}function v0(t,e,n,r,i,s={}){const o=t.Cc(s.merge||s.mergeFields?2:0,e,n,i);Jp("Data must be an object, but it was:",o,r);const l=w0(r,o);let u,c;if(s.merge)u=new kt(o.fieldMask),c=o.fieldTransforms;else if(s.mergeFields){const d=[];for(const p of s.mergeFields){const m=of(e,p,n);if(!o.contains(m))throw new z(L.INVALID_ARGUMENT,`Field '${m}' is specified in your field mask but missing from your input data.`);I0(d,m)||d.push(m)}u=new kt(d),c=o.fieldTransforms.filter(p=>u.covers(p.field))}else u=null,c=o.fieldTransforms;return new FO(new _t(l),u,c)}class Ec extends Us{_toFieldTransform(e){if(e.Ac!==2)throw e.Ac===1?e.Sc(`${this._methodName}() can only appear at the top level of your update data`):e.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Ec}}function E0(t,e,n){return new _c({Ac:3,Dc:e.settings.Dc,methodName:t._methodName,fc:n},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class Qp extends Us{_toFieldTransform(e){return new Cp(e.path,new da)}isEqual(e){return e instanceof Qp}}class Yp extends Us{constructor(e,n){super(e),this.vc=n}_toFieldTransform(e){const n=E0(this,e,!0),r=this.vc.map(s=>xi(s,n)),i=new Ss(r);return new Cp(e.path,i)}isEqual(e){return e instanceof Yp&&Tn(this.vc,e.vc)}}class Xp extends Us{constructor(e,n){super(e),this.vc=n}_toFieldTransform(e){const n=E0(this,e,!0),r=this.vc.map(s=>xi(s,n)),i=new As(r);return new Cp(e.path,i)}isEqual(e){return e instanceof Xp&&Tn(this.vc,e.vc)}}function jO(t,e,n,r){const i=t.Cc(1,e,n);Jp("Data must be an object, but it was:",i,r);const s=[],o=_t.empty();$r(r,(u,c)=>{const d=Zp(e,u,n);c=ce(c);const p=i.yc(d);if(c instanceof Ec)s.push(d);else{const m=xi(c,p);m!=null&&(s.push(d),o.set(d,m))}});const l=new kt(s);return new y0(o,l,i.fieldTransforms)}function BO(t,e,n,r,i,s){const o=t.Cc(1,e,n),l=[of(e,r,n)],u=[i];if(s.length%2!=0)throw new z(L.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let m=0;m<s.length;m+=2)l.push(of(e,s[m])),u.push(s[m+1]);const c=[],d=_t.empty();for(let m=l.length-1;m>=0;--m)if(!I0(c,l[m])){const T=l[m];let C=u[m];C=ce(C);const P=o.yc(T);if(C instanceof Ec)c.push(T);else{const D=xi(C,P);D!=null&&(c.push(T),d.set(T,D))}}const p=new kt(c);return new y0(d,p,o.fieldTransforms)}function zO(t,e,n,r=!1){return xi(n,t.Cc(r?4:3,e))}function xi(t,e){if(T0(t=ce(t)))return Jp("Unsupported field value:",e,t),w0(t,e);if(t instanceof Us)return function(r,i){if(!_0(i.Ac))throw i.Sc(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Sc(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.fc&&e.Ac!==4)throw e.Sc("Nested arrays are not supported");return function(r,i){const s=[];let o=0;for(const l of r){let u=xi(l,i.wc(o));u==null&&(u={nullValue:"NULL_VALUE"}),s.push(u),o++}return{arrayValue:{values:s}}}(t,e)}return function(r,i){if((r=ce(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return kx(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=ge.fromDate(r);return{timestampValue:Iu(i.serializer,s)}}if(r instanceof ge){const s=new ge(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Iu(i.serializer,s)}}if(r instanceof vn)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Ut)return{bytesValue:jI(i.serializer,r._byteString)};if(r instanceof Pe){const s=i.databaseId,o=r.firestore._databaseId;if(!o.isEqual(s))throw i.Sc(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:Dp(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof En)return function(o,l){return{mapValue:{fields:{[mI]:{stringValue:gI},[Eu]:{arrayValue:{values:o.toArray().map(c=>{if(typeof c!="number")throw l.Sc("VectorValues must only contain numeric values.");return Rp(l.serializer,c)})}}}}}}(r,i);throw i.Sc(`Unsupported field value: ${nc(r)}`)}(t,e)}function w0(t,e){const n={};return uI(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):$r(t,(r,i)=>{const s=xi(i,e.mc(r));s!=null&&(n[r]=s)}),{mapValue:{fields:n}}}function T0(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof ge||t instanceof vn||t instanceof Ut||t instanceof Pe||t instanceof Us||t instanceof En)}function Jp(t,e,n){if(!T0(n)||!aI(n)){const r=nc(n);throw r==="an object"?e.Sc(t+" a custom object"):e.Sc(t+" "+r)}}function of(t,e,n){if((e=ce(e))instanceof yc)return e._internalPath;if(typeof e=="string")return Zp(t,e);throw Pu("Field path arguments must be of type string or ",t,!1,void 0,n)}const $O=new RegExp("[~\\*/\\[\\]]");function Zp(t,e,n){if(e.search($O)>=0)throw Pu(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new yc(...e.split("."))._internalPath}catch{throw Pu(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Pu(t,e,n,r,i){const s=r&&!r.isEmpty(),o=i!==void 0;let l=`Function ${e}() called with invalid data`;n&&(l+=" (via `toFirestore()`)"),l+=". ";let u="";return(s||o)&&(u+=" (found",s&&(u+=` in field ${r}`),o&&(u+=` in document ${i}`),u+=")"),new z(L.INVALID_ARGUMENT,l+t+u)}function I0(t,e){return t.some(n=>n.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S0{constructor(e,n,r,i,s){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new Pe(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new HO(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(wc("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class HO extends S0{data(){return super.data()}}function wc(t,e){return typeof e=="string"?Zp(t,e):e instanceof yc?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function A0(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new z(L.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class em{}class R0 extends em{}function pM(t,e,...n){let r=[];e instanceof em&&r.push(e),r=r.concat(n),function(s){const o=s.filter(u=>u instanceof tm).length,l=s.filter(u=>u instanceof Tc).length;if(o>1||o>0&&l>0)throw new z(L.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const i of r)t=i._apply(t);return t}class Tc extends R0{constructor(e,n,r){super(),this._field=e,this._op=n,this._value=r,this.type="where"}static _create(e,n,r){return new Tc(e,n,r)}_apply(e){const n=this._parse(e);return C0(e._query,n),new qr(e.firestore,e.converter,Gd(e._query,n))}_parse(e){const n=vc(e.firestore);return function(s,o,l,u,c,d,p){let m;if(c.isKeyField()){if(d==="array-contains"||d==="array-contains-any")throw new z(L.INVALID_ARGUMENT,`Invalid Query. You can't perform '${d}' queries on documentId().`);if(d==="in"||d==="not-in"){iv(p,d);const C=[];for(const P of p)C.push(rv(u,s,P));m={arrayValue:{values:C}}}else m=rv(u,s,p)}else d!=="in"&&d!=="not-in"&&d!=="array-contains-any"||iv(p,d),m=zO(l,o,p,d==="in"||d==="not-in");return be.create(c,d,m)}(e._query,"where",n,e.firestore._databaseId,this._field,this._op,this._value)}}function mM(t,e,n){const r=e,i=wc("where",t);return Tc._create(i,r,n)}class tm extends em{constructor(e,n){super(),this.type=e,this._queryConstraints=n}static _create(e,n){return new tm(e,n)}_parse(e){const n=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return n.length===1?n[0]:sn.create(n,this._getOperator())}_apply(e){const n=this._parse(e);return n.getFilters().length===0?e:(function(i,s){let o=i;const l=s.getFlattenedFilters();for(const u of l)C0(o,u),o=Gd(o,u)}(e._query,n),new qr(e.firestore,e.converter,Gd(e._query,n)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class nm extends R0{constructor(e,n){super(),this._field=e,this._direction=n,this.type="orderBy"}static _create(e,n){return new nm(e,n)}_apply(e){const n=function(i,s,o){if(i.startAt!==null)throw new z(L.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new z(L.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new ha(s,o)}(e._query,this._field,this._direction);return new qr(e.firestore,e.converter,function(i,s){const o=i.explicitOrderBy.concat([s]);return new Ms(i.path,i.collectionGroup,o,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)}(e._query,n))}}function gM(t,e="asc"){const n=e,r=wc("orderBy",t);return nm._create(r,n)}function rv(t,e,n){if(typeof(n=ce(n))=="string"){if(n==="")throw new z(L.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!SI(e)&&n.indexOf("/")!==-1)throw new z(L.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=e.path.child(de.fromString(n));if(!W.isDocumentKey(r))throw new z(L.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return v_(t,new W(r))}if(n instanceof Pe)return v_(t,n._key);throw new z(L.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${nc(n)}.`)}function iv(t,e){if(!Array.isArray(t)||t.length===0)throw new z(L.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function C0(t,e){const n=function(i,s){for(const o of i)for(const l of o.getFlattenedFilters())if(s.indexOf(l.op)>=0)return l.op;return null}(t.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(n!==null)throw n===e.op?new z(L.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new z(L.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}class qO{convertValue(e,n="none"){switch(Or(e)){case 0:return null;case 1:return e.booleanValue;case 2:return xe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(xr(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw G(62114,{value:e})}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const r={};return $r(e,(i,s)=>{r[i]=this.convertValue(s,n)}),r}convertVectorValue(e){var r,i,s;const n=(s=(i=(r=e.fields)==null?void 0:r[Eu].arrayValue)==null?void 0:i.values)==null?void 0:s.map(o=>xe(o.doubleValue));return new En(n)}convertGeoPoint(e){return new vn(xe(e.latitude),xe(e.longitude))}convertArray(e,n){return(e.values||[]).map(r=>this.convertValue(r,n))}convertServerTimestamp(e,n){switch(n){case"previous":const r=sc(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(la(e));default:return null}}convertTimestamp(e){const n=Dr(e);return new ge(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=de.fromString(e);ae(WI(r),9688,{name:e});const i=new ua(r.get(1),r.get(3)),s=new W(r.popFirst(5));return i.isEqual(n)||qn(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function P0(t,e,n){let r;return r=t?t.toFirestore(e):e,r}class So{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class ui extends S0{constructor(e,n,r,i,s,o){super(e,n,r,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new Fl(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(wc("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new z(L.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,n={};return n.type=ui._jsonSchemaVersion,n.bundle="",n.bundleSource="DocumentSnapshot",n.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?n:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),n.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),n)}}ui._jsonSchemaVersion="firestore/documentSnapshot/1.0",ui._jsonSchema={type:Me("string",ui._jsonSchemaVersion),bundleSource:Me("string","DocumentSnapshot"),bundleName:Me("string"),bundle:Me("string")};class Fl extends ui{data(e={}){return super.data(e)}}class ci{constructor(e,n,r,i){this._firestore=e,this._userDataWriter=n,this._snapshot=i,this.metadata=new So(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(r=>{e.call(n,new Fl(this._firestore,this._userDataWriter,r.key,r,new So(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new z(L.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map(l=>{const u=new Fl(i._firestore,i._userDataWriter,l.doc.key,l.doc,new So(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter);return l.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}})}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(l=>s||l.type!==3).map(l=>{const u=new Fl(i._firestore,i._userDataWriter,l.doc.key,l.doc,new So(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter);let c=-1,d=-1;return l.type!==0&&(c=o.indexOf(l.doc.key),o=o.delete(l.doc.key)),l.type!==1&&(o=o.add(l.doc),d=o.indexOf(l.doc.key)),{type:WO(l.type),doc:u,oldIndex:c,newIndex:d}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new z(L.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=ci._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Ep.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const n=[],r=[],i=[];return this.docs.forEach(s=>{s._document!==null&&(n.push(s._document),r.push(this._userDataWriter.convertObjectMap(s._document.data.value.mapValue.fields,"previous")),i.push(s.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function WO(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return G(61501,{type:t})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function KO(t){t=St(t,Pe);const e=St(t.firestore,Kn);return xO(gc(e),t._key).then(n=>k0(e,t,n))}ci._jsonSchemaVersion="firestore/querySnapshot/1.0",ci._jsonSchema={type:Me("string",ci._jsonSchemaVersion),bundleSource:Me("string","QuerySnapshot"),bundleName:Me("string"),bundle:Me("string")};class rm extends qO{constructor(e){super(),this.firestore=e}convertBytes(e){return new Ut(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new Pe(this.firestore,null,n)}}function yM(t){t=St(t,qr);const e=St(t.firestore,Kn),n=gc(e),r=new rm(e);return A0(t._query),OO(n,t._query).then(i=>new ci(e,r,t,i))}function _M(t,e,n){t=St(t,Pe);const r=St(t.firestore,Kn),i=P0(t.converter,e);return Ic(r,[v0(vc(r),"setDoc",t._key,i,t.converter!==null,n).toMutation(t._key,zt.none())])}function vM(t,e,n,...r){t=St(t,Pe);const i=St(t.firestore,Kn),s=vc(i);let o;return o=typeof(e=ce(e))=="string"||e instanceof yc?BO(s,"updateDoc",t._key,e,n,r):jO(s,"updateDoc",t._key,e),Ic(i,[o.toMutation(t._key,zt.exists(!0))])}function EM(t){return Ic(St(t.firestore,Kn),[new Pp(t._key,zt.none())])}function wM(t,e){const n=St(t.firestore,Kn),r=g0(t),i=P0(t.converter,e);return Ic(n,[v0(vc(t.firestore),"addDoc",r._key,i,t.converter!==null,{}).toMutation(r._key,zt.exists(!1))]).then(()=>r)}function TM(t,...e){var u,c,d;t=ce(t);let n={includeMetadataChanges:!1,source:"default"},r=0;typeof e[r]!="object"||nv(e[r])||(n=e[r++]);const i={includeMetadataChanges:n.includeMetadataChanges,source:n.source};if(nv(e[r])){const p=e[r];e[r]=(u=p.next)==null?void 0:u.bind(p),e[r+1]=(c=p.error)==null?void 0:c.bind(p),e[r+2]=(d=p.complete)==null?void 0:d.bind(p)}let s,o,l;if(t instanceof Pe)o=St(t.firestore,Kn),l=oc(t._key.path),s={next:p=>{e[r]&&e[r](k0(o,t,p))},error:e[r+1],complete:e[r+2]};else{const p=St(t,qr);o=St(p.firestore,Kn),l=p._query;const m=new rm(o);s={next:T=>{e[r]&&e[r](new ci(o,m,p,T))},error:e[r+1],complete:e[r+2]},A0(t._query)}return function(m,T,C,P){const D=new Gp(P),v=new qp(T,D,C);return m.asyncQueue.enqueueAndForget(async()=>zp(await Cu(m),v)),()=>{D.Nu(),m.asyncQueue.enqueueAndForget(async()=>$p(await Cu(m),v))}}(gc(o),l,i,s)}function Ic(t,e){return function(r,i){const s=new Mn;return r.asyncQueue.enqueueAndForget(async()=>EO(await DO(r),i,s)),s.promise}(gc(t),e)}function k0(t,e,n){const r=n.docs.get(e._key),i=new rm(t);return new ui(t,i,e._key,r,new So(n.hasPendingWrites,n.fromCache),e.converter)}function IM(){return new Qp("serverTimestamp")}function SM(...t){return new Yp("arrayUnion",t)}function AM(...t){return new Xp("arrayRemove",t)}(function(e,n=!0){(function(i){Vs=i})(Pi),nn(new qt("firestore",(r,{instanceIdentifier:i,options:s})=>{const o=r.getProvider("app").getImmediate(),l=new Kn(new BD(r.getProvider("auth-internal")),new HD(o,r.getProvider("app-check-internal")),function(c,d){if(!Object.prototype.hasOwnProperty.apply(c.options,["projectId"]))throw new z(L.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ua(c.options.projectId,d)}(o,i),o);return s={useFetchStreams:n,...s},l._setSettings(s),l},"PUBLIC").setMultipleInstances(!0)),It(o_,a_,e),It(o_,a_,"esm2020")})();var GO="firebase",QO="12.5.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */It(GO,QO,"app");const N0="@firebase/installations",im="0.6.19";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const D0=1e4,x0=`w:${im}`,O0="FIS_v2",YO="https://firebaseinstallations.googleapis.com/v1",XO=60*60*1e3,JO="installations",ZO="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eV={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},Ti=new Ci(JO,ZO,eV);function V0(t){return t instanceof Wt&&t.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function L0({projectId:t}){return`${YO}/projects/${t}/installations`}function b0(t){return{token:t.token,requestStatus:2,expiresIn:nV(t.expiresIn),creationTime:Date.now()}}async function M0(t,e){const r=(await e.json()).error;return Ti.create("request-failed",{requestName:t,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function F0({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function tV(t,{refreshToken:e}){const n=F0(t);return n.append("Authorization",rV(e)),n}async function U0(t){const e=await t();return e.status>=500&&e.status<600?t():e}function nV(t){return Number(t.replace("s","000"))}function rV(t){return`${O0} ${t}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function iV({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const r=L0(t),i=F0(t),s=e.getImmediate({optional:!0});if(s){const c=await s.getHeartbeatsHeader();c&&i.append("x-firebase-client",c)}const o={fid:n,authVersion:O0,appId:t.appId,sdkVersion:x0},l={method:"POST",headers:i,body:JSON.stringify(o)},u=await U0(()=>fetch(r,l));if(u.ok){const c=await u.json();return{fid:c.fid||n,registrationStatus:2,refreshToken:c.refreshToken,authToken:b0(c.authToken)}}else throw await M0("Create Installation",u)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function j0(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sV(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oV=/^[cdef][\w-]{21}$/,af="";function aV(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=lV(t);return oV.test(n)?n:af}catch{return af}}function lV(t){return sV(t).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sc(t){return`${t.appName}!${t.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const B0=new Map;function z0(t,e){const n=Sc(t);$0(n,e),uV(n,e)}function $0(t,e){const n=B0.get(t);if(n)for(const r of n)r(e)}function uV(t,e){const n=cV();n&&n.postMessage({key:t,fid:e}),hV()}let oi=null;function cV(){return!oi&&"BroadcastChannel"in self&&(oi=new BroadcastChannel("[Firebase] FID Change"),oi.onmessage=t=>{$0(t.data.key,t.data.fid)}),oi}function hV(){B0.size===0&&oi&&(oi.close(),oi=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dV="firebase-installations-database",fV=1,Ii="firebase-installations-store";let Oh=null;function sm(){return Oh||(Oh=fT(dV,fV,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(Ii)}}})),Oh}async function ku(t,e){const n=Sc(t),i=(await sm()).transaction(Ii,"readwrite"),s=i.objectStore(Ii),o=await s.get(n);return await s.put(e,n),await i.done,(!o||o.fid!==e.fid)&&z0(t,e.fid),e}async function H0(t){const e=Sc(t),r=(await sm()).transaction(Ii,"readwrite");await r.objectStore(Ii).delete(e),await r.done}async function Ac(t,e){const n=Sc(t),i=(await sm()).transaction(Ii,"readwrite"),s=i.objectStore(Ii),o=await s.get(n),l=e(o);return l===void 0?await s.delete(n):await s.put(l,n),await i.done,l&&(!o||o.fid!==l.fid)&&z0(t,l.fid),l}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function om(t){let e;const n=await Ac(t.appConfig,r=>{const i=pV(r),s=mV(t,i);return e=s.registrationPromise,s.installationEntry});return n.fid===af?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function pV(t){const e=t||{fid:aV(),registrationStatus:0};return q0(e)}function mV(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const i=Promise.reject(Ti.create("app-offline"));return{installationEntry:e,registrationPromise:i}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=gV(t,n);return{installationEntry:n,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:yV(t)}:{installationEntry:e}}async function gV(t,e){try{const n=await iV(t,e);return ku(t.appConfig,n)}catch(n){throw V0(n)&&n.customData.serverCode===409?await H0(t.appConfig):await ku(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function yV(t){let e=await sv(t.appConfig);for(;e.registrationStatus===1;)await j0(100),e=await sv(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:r}=await om(t);return r||n}return e}function sv(t){return Ac(t,e=>{if(!e)throw Ti.create("installation-not-found");return q0(e)})}function q0(t){return _V(t)?{fid:t.fid,registrationStatus:0}:t}function _V(t){return t.registrationStatus===1&&t.registrationTime+D0<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vV({appConfig:t,heartbeatServiceProvider:e},n){const r=EV(t,n),i=tV(t,n),s=e.getImmediate({optional:!0});if(s){const c=await s.getHeartbeatsHeader();c&&i.append("x-firebase-client",c)}const o={installation:{sdkVersion:x0,appId:t.appId}},l={method:"POST",headers:i,body:JSON.stringify(o)},u=await U0(()=>fetch(r,l));if(u.ok){const c=await u.json();return b0(c)}else throw await M0("Generate Auth Token",u)}function EV(t,{fid:e}){return`${L0(t)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function am(t,e=!1){let n;const r=await Ac(t.appConfig,s=>{if(!W0(s))throw Ti.create("not-registered");const o=s.authToken;if(!e&&IV(o))return s;if(o.requestStatus===1)return n=wV(t,e),s;{if(!navigator.onLine)throw Ti.create("app-offline");const l=AV(s);return n=TV(t,l),l}});return n?await n:r.authToken}async function wV(t,e){let n=await ov(t.appConfig);for(;n.authToken.requestStatus===1;)await j0(100),n=await ov(t.appConfig);const r=n.authToken;return r.requestStatus===0?am(t,e):r}function ov(t){return Ac(t,e=>{if(!W0(e))throw Ti.create("not-registered");const n=e.authToken;return RV(n)?{...e,authToken:{requestStatus:0}}:e})}async function TV(t,e){try{const n=await vV(t,e),r={...e,authToken:n};return await ku(t.appConfig,r),n}catch(n){if(V0(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await H0(t.appConfig);else{const r={...e,authToken:{requestStatus:0}};await ku(t.appConfig,r)}throw n}}function W0(t){return t!==void 0&&t.registrationStatus===2}function IV(t){return t.requestStatus===2&&!SV(t)}function SV(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+XO}function AV(t){const e={requestStatus:1,requestTime:Date.now()};return{...t,authToken:e}}function RV(t){return t.requestStatus===1&&t.requestTime+D0<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function CV(t){const e=t,{installationEntry:n,registrationPromise:r}=await om(e);return r?r.catch(console.error):am(e).catch(console.error),n.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function PV(t,e=!1){const n=t;return await kV(n),(await am(n,e)).token}async function kV(t){const{registrationPromise:e}=await om(t);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function NV(t){if(!t||!t.options)throw Vh("App Configuration");if(!t.name)throw Vh("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw Vh(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function Vh(t){return Ti.create("missing-app-config-values",{valueName:t})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const K0="installations",DV="installations-internal",xV=t=>{const e=t.getProvider("app").getImmediate(),n=NV(e),r=Br(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},OV=t=>{const e=t.getProvider("app").getImmediate(),n=Br(e,K0).getImmediate();return{getId:()=>CV(n),getToken:i=>PV(n,i)}};function VV(){nn(new qt(K0,xV,"PUBLIC")),nn(new qt(DV,OV,"PRIVATE"))}VV();It(N0,im);It(N0,im,"esm2020");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nu="analytics",LV="firebase_id",bV="origin",MV=60*1e3,FV="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",lm="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ft=new Xu("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const UV={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},xt=new Ci("analytics","Analytics",UV);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jV(t){if(!t.startsWith(lm)){const e=xt.create("invalid-gtag-resource",{gtagURL:t});return ft.warn(e.message),""}return t}function G0(t){return Promise.all(t.map(e=>e.catch(n=>n)))}function BV(t,e){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(t,e)),n}function zV(t,e){const n=BV("firebase-js-sdk-policy",{createScriptURL:jV}),r=document.createElement("script"),i=`${lm}?l=${t}&id=${e}`;r.src=n?n==null?void 0:n.createScriptURL(i):i,r.async=!0,document.head.appendChild(r)}function $V(t){let e=[];return Array.isArray(window[t])?e=window[t]:window[t]=e,e}async function HV(t,e,n,r,i,s){const o=r[i];try{if(o)await e[o];else{const u=(await G0(n)).find(c=>c.measurementId===i);u&&await e[u.appId]}}catch(l){ft.error(l)}t("config",i,s)}async function qV(t,e,n,r,i){try{let s=[];if(i&&i.send_to){let o=i.send_to;Array.isArray(o)||(o=[o]);const l=await G0(n);for(const u of o){const c=l.find(p=>p.measurementId===u),d=c&&e[c.appId];if(d)s.push(d);else{s=[];break}}}s.length===0&&(s=Object.values(e)),await Promise.all(s),t("event",r,i||{})}catch(s){ft.error(s)}}function WV(t,e,n,r){async function i(s,...o){try{if(s==="event"){const[l,u]=o;await qV(t,e,n,l,u)}else if(s==="config"){const[l,u]=o;await HV(t,e,n,r,l,u)}else if(s==="consent"){const[l,u]=o;t("consent",l,u)}else if(s==="get"){const[l,u,c]=o;t("get",l,u,c)}else if(s==="set"){const[l]=o;t("set",l)}else t(s,...o)}catch(l){ft.error(l)}}return i}function KV(t,e,n,r,i){let s=function(...o){window[r].push(arguments)};return window[i]&&typeof window[i]=="function"&&(s=window[i]),window[i]=WV(s,t,e,n),{gtagCore:s,wrappedGtag:window[i]}}function GV(t){const e=window.document.getElementsByTagName("script");for(const n of Object.values(e))if(n.src&&n.src.includes(lm)&&n.src.includes(t))return n;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QV=30,YV=1e3;class XV{constructor(e={},n=YV){this.throttleMetadata=e,this.intervalMillis=n}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,n){this.throttleMetadata[e]=n}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const Q0=new XV;function JV(t){return new Headers({Accept:"application/json","x-goog-api-key":t})}async function ZV(t){var o;const{appId:e,apiKey:n}=t,r={method:"GET",headers:JV(n)},i=FV.replace("{app-id}",e),s=await fetch(i,r);if(s.status!==200&&s.status!==304){let l="";try{const u=await s.json();(o=u.error)!=null&&o.message&&(l=u.error.message)}catch{}throw xt.create("config-fetch-failed",{httpStatus:s.status,responseMessage:l})}return s.json()}async function eL(t,e=Q0,n){const{appId:r,apiKey:i,measurementId:s}=t.options;if(!r)throw xt.create("no-app-id");if(!i){if(s)return{measurementId:s,appId:r};throw xt.create("no-api-key")}const o=e.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},l=new rL;return setTimeout(async()=>{l.abort()},MV),Y0({appId:r,apiKey:i,measurementId:s},o,l,e)}async function Y0(t,{throttleEndTimeMillis:e,backoffCount:n},r,i=Q0){var l;const{appId:s,measurementId:o}=t;try{await tL(r,e)}catch(u){if(o)return ft.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${u==null?void 0:u.message}]`),{appId:s,measurementId:o};throw u}try{const u=await ZV(t);return i.deleteThrottleMetadata(s),u}catch(u){const c=u;if(!nL(c)){if(i.deleteThrottleMetadata(s),o)return ft.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${c==null?void 0:c.message}]`),{appId:s,measurementId:o};throw u}const d=Number((l=c==null?void 0:c.customData)==null?void 0:l.httpStatus)===503?Dy(n,i.intervalMillis,QV):Dy(n,i.intervalMillis),p={throttleEndTimeMillis:Date.now()+d,backoffCount:n+1};return i.setThrottleMetadata(s,p),ft.debug(`Calling attemptFetch again in ${d} millis`),Y0(t,p,r,i)}}function tL(t,e){return new Promise((n,r)=>{const i=Math.max(e-Date.now(),0),s=setTimeout(n,i);t.addEventListener(()=>{clearTimeout(s),r(xt.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function nL(t){if(!(t instanceof Wt)||!t.customData)return!1;const e=Number(t.customData.httpStatus);return e===429||e===500||e===503||e===504}class rL{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function iL(t,e,n,r,i){if(i&&i.global){t("event",n,r);return}else{const s=await e,o={...r,send_to:s};t("event",n,o)}}async function sL(t,e,n,r){if(r&&r.global){const i={};for(const s of Object.keys(n))i[`user_properties.${s}`]=n[s];return t("set",i),Promise.resolve()}else{const i=await e;t("config",i,{update:!0,user_properties:n})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function oL(){if(uT())try{await cT()}catch(t){return ft.warn(xt.create("indexeddb-unavailable",{errorInfo:t==null?void 0:t.toString()}).message),!1}else return ft.warn(xt.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function aL(t,e,n,r,i,s,o){const l=eL(t);l.then(m=>{n[m.measurementId]=m.appId,t.options.measurementId&&m.measurementId!==t.options.measurementId&&ft.warn(`The measurement ID in the local Firebase config (${t.options.measurementId}) does not match the measurement ID fetched from the server (${m.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(m=>ft.error(m)),e.push(l);const u=oL().then(m=>{if(m)return r.getId()}),[c,d]=await Promise.all([l,u]);GV(s)||zV(s,c.measurementId),i("js",new Date);const p=(o==null?void 0:o.config)??{};return p[bV]="firebase",p.update=!0,d!=null&&(p[LV]=d),i("config",c.measurementId,p),c.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lL{constructor(e){this.app=e}_delete(){return delete ds[this.app.options.appId],Promise.resolve()}}let ds={},av=[];const lv={};let Lh="dataLayer",uL="gtag",uv,um,cv=!1;function cL(){const t=[];if(lT()&&t.push("This is a browser extension environment."),sP()||t.push("Cookies are not available."),t.length>0){const e=t.map((r,i)=>`(${i+1}) ${r}`).join(" "),n=xt.create("invalid-analytics-context",{errorInfo:e});ft.warn(n.message)}}function hL(t,e,n){cL();const r=t.options.appId;if(!r)throw xt.create("no-app-id");if(!t.options.apiKey)if(t.options.measurementId)ft.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${t.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw xt.create("no-api-key");if(ds[r]!=null)throw xt.create("already-exists",{id:r});if(!cv){$V(Lh);const{wrappedGtag:s,gtagCore:o}=KV(ds,av,lv,Lh,uL);um=s,uv=o,cv=!0}return ds[r]=aL(t,av,lv,e,uv,Lh,n),new lL(t)}function dL(t=Ju()){t=ce(t);const e=Br(t,Nu);return e.isInitialized()?e.getImmediate():fL(t)}function fL(t,e={}){const n=Br(t,Nu);if(n.isInitialized()){const i=n.getImmediate();if(Tn(e,n.getOptions()))return i;throw xt.create("already-initialized")}return n.initialize({options:e})}function pL(t,e,n){t=ce(t),sL(um,ds[t.app.options.appId],e,n).catch(r=>ft.error(r))}function mL(t,e,n,r){t=ce(t),iL(um,ds[t.app.options.appId],e,n,r).catch(i=>ft.error(i))}const hv="@firebase/analytics",dv="0.10.19";function gL(){nn(new qt(Nu,(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("installations-internal").getImmediate();return hL(r,i,n)},"PUBLIC")),nn(new qt("analytics-internal",t,"PRIVATE")),It(hv,dv),It(hv,dv,"esm2020");function t(e){try{const n=e.getProvider(Nu).getImmediate();return{logEvent:(r,i,s)=>mL(n,r,i,s),setUserProperties:(r,i)=>pL(n,r,i)}}catch(n){throw xt.create("interop-component-reg-failed",{reason:n})}}}gL();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const X0="firebasestorage.googleapis.com",J0="storageBucket",yL=2*60*1e3,_L=10*60*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ne extends Wt{constructor(e,n,r=0){super(bh(e),`Firebase Storage: ${n} (${bh(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,Ne.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return bh(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var ke;(function(t){t.UNKNOWN="unknown",t.OBJECT_NOT_FOUND="object-not-found",t.BUCKET_NOT_FOUND="bucket-not-found",t.PROJECT_NOT_FOUND="project-not-found",t.QUOTA_EXCEEDED="quota-exceeded",t.UNAUTHENTICATED="unauthenticated",t.UNAUTHORIZED="unauthorized",t.UNAUTHORIZED_APP="unauthorized-app",t.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",t.INVALID_CHECKSUM="invalid-checksum",t.CANCELED="canceled",t.INVALID_EVENT_NAME="invalid-event-name",t.INVALID_URL="invalid-url",t.INVALID_DEFAULT_BUCKET="invalid-default-bucket",t.NO_DEFAULT_BUCKET="no-default-bucket",t.CANNOT_SLICE_BLOB="cannot-slice-blob",t.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",t.NO_DOWNLOAD_URL="no-download-url",t.INVALID_ARGUMENT="invalid-argument",t.INVALID_ARGUMENT_COUNT="invalid-argument-count",t.APP_DELETED="app-deleted",t.INVALID_ROOT_OPERATION="invalid-root-operation",t.INVALID_FORMAT="invalid-format",t.INTERNAL_ERROR="internal-error",t.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(ke||(ke={}));function bh(t){return"storage/"+t}function cm(){const t="An unknown error occurred, please check the error payload for server response.";return new Ne(ke.UNKNOWN,t)}function vL(t){return new Ne(ke.OBJECT_NOT_FOUND,"Object '"+t+"' does not exist.")}function EL(t){return new Ne(ke.QUOTA_EXCEEDED,"Quota for bucket '"+t+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function wL(){const t="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new Ne(ke.UNAUTHENTICATED,t)}function TL(){return new Ne(ke.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function IL(t){return new Ne(ke.UNAUTHORIZED,"User does not have permission to access '"+t+"'.")}function SL(){return new Ne(ke.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function AL(){return new Ne(ke.CANCELED,"User canceled the upload/download.")}function RL(t){return new Ne(ke.INVALID_URL,"Invalid URL '"+t+"'.")}function CL(t){return new Ne(ke.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+t+"'.")}function PL(){return new Ne(ke.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+J0+"' property when initializing the app?")}function kL(){return new Ne(ke.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function NL(){return new Ne(ke.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function DL(t){return new Ne(ke.UNSUPPORTED_ENVIRONMENT,`${t} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function lf(t){return new Ne(ke.INVALID_ARGUMENT,t)}function Z0(){return new Ne(ke.APP_DELETED,"The Firebase app was deleted.")}function xL(t){return new Ne(ke.INVALID_ROOT_OPERATION,"The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function jo(t,e){return new Ne(ke.INVALID_FORMAT,"String does not match format '"+t+"': "+e)}function po(t){throw new Ne(ke.INTERNAL_ERROR,"Internal error: "+t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nt{constructor(e,n){this.bucket=e,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,n){let r;try{r=Nt.makeFromUrl(e,n)}catch{return new Nt(e,"")}if(r.path==="")return r;throw CL(e)}static makeFromUrl(e,n){let r=null;const i="([A-Za-z0-9.\\-_]+)";function s(x){x.path.charAt(x.path.length-1)==="/"&&(x.path_=x.path_.slice(0,-1))}const o="(/(.*))?$",l=new RegExp("^gs://"+i+o,"i"),u={bucket:1,path:3};function c(x){x.path_=decodeURIComponent(x.path)}const d="v[A-Za-z0-9_]+",p=n.replace(/[.]/g,"\\."),m="(/([^?#]*).*)?$",T=new RegExp(`^https?://${p}/${d}/b/${i}/o${m}`,"i"),C={bucket:1,path:3},P=n===X0?"(?:storage.googleapis.com|storage.cloud.google.com)":n,D="([^?#]*)",v=new RegExp(`^https?://${P}/${i}/${D}`,"i"),I=[{regex:l,indices:u,postModify:s},{regex:T,indices:C,postModify:c},{regex:v,indices:{bucket:1,path:2},postModify:c}];for(let x=0;x<I.length;x++){const F=I[x],j=F.regex.exec(e);if(j){const E=j[F.indices.bucket];let y=j[F.indices.path];y||(y=""),r=new Nt(E,y),F.postModify(r);break}}if(r==null)throw RL(e);return r}}class OL{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function VL(t,e,n){let r=1,i=null,s=null,o=!1,l=0;function u(){return l===2}let c=!1;function d(...D){c||(c=!0,e.apply(null,D))}function p(D){i=setTimeout(()=>{i=null,t(T,u())},D)}function m(){s&&clearTimeout(s)}function T(D,...v){if(c){m();return}if(D){m(),d.call(null,D,...v);return}if(u()||o){m(),d.call(null,D,...v);return}r<64&&(r*=2);let I;l===1?(l=2,I=0):I=(r+Math.random())*1e3,p(I)}let C=!1;function P(D){C||(C=!0,m(),!c&&(i!==null?(D||(l=2),clearTimeout(i),p(0)):D||(l=1)))}return p(0),s=setTimeout(()=>{o=!0,P(!0)},n),P}function LL(t){t(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bL(t){return t!==void 0}function ML(t){return typeof t=="object"&&!Array.isArray(t)}function hm(t){return typeof t=="string"||t instanceof String}function fv(t){return dm()&&t instanceof Blob}function dm(){return typeof Blob<"u"}function pv(t,e,n,r){if(r<e)throw lf(`Invalid value for '${t}'. Expected ${e} or greater.`);if(r>n)throw lf(`Invalid value for '${t}'. Expected ${n} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fm(t,e,n){let r=e;return n==null&&(r=`https://${e}`),`${n}://${r}/v0${t}`}function eS(t){const e=encodeURIComponent;let n="?";for(const r in t)if(t.hasOwnProperty(r)){const i=e(r)+"="+e(t[r]);n=n+i+"&"}return n=n.slice(0,-1),n}var hi;(function(t){t[t.NO_ERROR=0]="NO_ERROR",t[t.NETWORK_ERROR=1]="NETWORK_ERROR",t[t.ABORT=2]="ABORT"})(hi||(hi={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function FL(t,e){const n=t>=500&&t<600,i=[408,429].indexOf(t)!==-1,s=e.indexOf(t)!==-1;return n||i||s}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UL{constructor(e,n,r,i,s,o,l,u,c,d,p,m=!0,T=!1){this.url_=e,this.method_=n,this.headers_=r,this.body_=i,this.successCodes_=s,this.additionalRetryCodes_=o,this.callback_=l,this.errorCallback_=u,this.timeout_=c,this.progressCallback_=d,this.connectionFactory_=p,this.retry=m,this.isUsingEmulator=T,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((C,P)=>{this.resolve_=C,this.reject_=P,this.start_()})}start_(){const e=(r,i)=>{if(i){r(!1,new fl(!1,null,!0));return}const s=this.connectionFactory_();this.pendingConnection_=s;const o=l=>{const u=l.loaded,c=l.lengthComputable?l.total:-1;this.progressCallback_!==null&&this.progressCallback_(u,c)};this.progressCallback_!==null&&s.addUploadProgressListener(o),s.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&s.removeUploadProgressListener(o),this.pendingConnection_=null;const l=s.getErrorCode()===hi.NO_ERROR,u=s.getStatus();if(!l||FL(u,this.additionalRetryCodes_)&&this.retry){const d=s.getErrorCode()===hi.ABORT;r(!1,new fl(!1,null,d));return}const c=this.successCodes_.indexOf(u)!==-1;r(!0,new fl(c,s))})},n=(r,i)=>{const s=this.resolve_,o=this.reject_,l=i.connection;if(i.wasSuccessCode)try{const u=this.callback_(l,l.getResponse());bL(u)?s(u):s()}catch(u){o(u)}else if(l!==null){const u=cm();u.serverResponse=l.getErrorText(),this.errorCallback_?o(this.errorCallback_(l,u)):o(u)}else if(i.canceled){const u=this.appDelete_?Z0():AL();o(u)}else{const u=SL();o(u)}};this.canceled_?n(!1,new fl(!1,null,!0)):this.backoffId_=VL(e,n,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&LL(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class fl{constructor(e,n,r){this.wasSuccessCode=e,this.connection=n,this.canceled=!!r}}function jL(t,e){e!==null&&e.length>0&&(t.Authorization="Firebase "+e)}function BL(t,e){t["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function zL(t,e){e&&(t["X-Firebase-GMPID"]=e)}function $L(t,e){e!==null&&(t["X-Firebase-AppCheck"]=e)}function HL(t,e,n,r,i,s,o=!0,l=!1){const u=eS(t.urlParams),c=t.url+u,d=Object.assign({},t.headers);return zL(d,e),jL(d,n),BL(d,s),$L(d,r),new UL(c,t.method,d,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,i,o,l)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qL(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function WL(...t){const e=qL();if(e!==void 0){const n=new e;for(let r=0;r<t.length;r++)n.append(t[r]);return n.getBlob()}else{if(dm())return new Blob(t);throw new Ne(ke.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function KL(t,e,n){return t.webkitSlice?t.webkitSlice(e,n):t.mozSlice?t.mozSlice(e,n):t.slice?t.slice(e,n):null}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function GL(t){if(typeof atob>"u")throw DL("base-64");return atob(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dn={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class Mh{constructor(e,n){this.data=e,this.contentType=n||null}}function QL(t,e){switch(t){case dn.RAW:return new Mh(tS(e));case dn.BASE64:case dn.BASE64URL:return new Mh(nS(t,e));case dn.DATA_URL:return new Mh(XL(e),JL(e))}throw cm()}function tS(t){const e=[];for(let n=0;n<t.length;n++){let r=t.charCodeAt(n);if(r<=127)e.push(r);else if(r<=2047)e.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(n<t.length-1&&(t.charCodeAt(n+1)&64512)===56320))e.push(239,191,189);else{const s=r,o=t.charCodeAt(++n);r=65536|(s&1023)<<10|o&1023,e.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?e.push(239,191,189):e.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(e)}function YL(t){let e;try{e=decodeURIComponent(t)}catch{throw jo(dn.DATA_URL,"Malformed data URL.")}return tS(e)}function nS(t,e){switch(t){case dn.BASE64:{const i=e.indexOf("-")!==-1,s=e.indexOf("_")!==-1;if(i||s)throw jo(t,"Invalid character '"+(i?"-":"_")+"' found: is it base64url encoded?");break}case dn.BASE64URL:{const i=e.indexOf("+")!==-1,s=e.indexOf("/")!==-1;if(i||s)throw jo(t,"Invalid character '"+(i?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let n;try{n=GL(e)}catch(i){throw i.message.includes("polyfill")?i:jo(t,"Invalid character found")}const r=new Uint8Array(n.length);for(let i=0;i<n.length;i++)r[i]=n.charCodeAt(i);return r}class rS{constructor(e){this.base64=!1,this.contentType=null;const n=e.match(/^data:([^,]+)?,/);if(n===null)throw jo(dn.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=n[1]||null;r!=null&&(this.base64=ZL(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=e.substring(e.indexOf(",")+1)}}function XL(t){const e=new rS(t);return e.base64?nS(dn.BASE64,e.rest):YL(e.rest)}function JL(t){return new rS(t).contentType}function ZL(t,e){return t.length>=e.length?t.substring(t.length-e.length)===e:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dr{constructor(e,n){let r=0,i="";fv(e)?(this.data_=e,r=e.size,i=e.type):e instanceof ArrayBuffer?(n?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(n?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=i}size(){return this.size_}type(){return this.type_}slice(e,n){if(fv(this.data_)){const r=this.data_,i=KL(r,e,n);return i===null?null:new dr(i)}else{const r=new Uint8Array(this.data_.buffer,e,n-e);return new dr(r,!0)}}static getBlob(...e){if(dm()){const n=e.map(r=>r instanceof dr?r.data_:r);return new dr(WL.apply(null,n))}else{const n=e.map(o=>hm(o)?QL(dn.RAW,o).data:o.data_);let r=0;n.forEach(o=>{r+=o.byteLength});const i=new Uint8Array(r);let s=0;return n.forEach(o=>{for(let l=0;l<o.length;l++)i[s++]=o[l]}),new dr(i,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iS(t){let e;try{e=JSON.parse(t)}catch{return null}return ML(e)?e:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eb(t){if(t.length===0)return null;const e=t.lastIndexOf("/");return e===-1?"":t.slice(0,e)}function tb(t,e){const n=e.split("/").filter(r=>r.length>0).join("/");return t.length===0?n:t+"/"+n}function sS(t){const e=t.lastIndexOf("/",t.length-2);return e===-1?t:t.slice(e+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nb(t,e){return e}class ct{constructor(e,n,r,i){this.server=e,this.local=n||e,this.writable=!!r,this.xform=i||nb}}let pl=null;function rb(t){return!hm(t)||t.length<2?t:sS(t)}function oS(){if(pl)return pl;const t=[];t.push(new ct("bucket")),t.push(new ct("generation")),t.push(new ct("metageneration")),t.push(new ct("name","fullPath",!0));function e(s,o){return rb(o)}const n=new ct("name");n.xform=e,t.push(n);function r(s,o){return o!==void 0?Number(o):o}const i=new ct("size");return i.xform=r,t.push(i),t.push(new ct("timeCreated")),t.push(new ct("updated")),t.push(new ct("md5Hash",null,!0)),t.push(new ct("cacheControl",null,!0)),t.push(new ct("contentDisposition",null,!0)),t.push(new ct("contentEncoding",null,!0)),t.push(new ct("contentLanguage",null,!0)),t.push(new ct("contentType",null,!0)),t.push(new ct("metadata","customMetadata",!0)),pl=t,pl}function ib(t,e){function n(){const r=t.bucket,i=t.fullPath,s=new Nt(r,i);return e._makeStorageReference(s)}Object.defineProperty(t,"ref",{get:n})}function sb(t,e,n){const r={};r.type="file";const i=n.length;for(let s=0;s<i;s++){const o=n[s];r[o.local]=o.xform(r,e[o.server])}return ib(r,t),r}function aS(t,e,n){const r=iS(e);return r===null?null:sb(t,r,n)}function ob(t,e,n,r){const i=iS(e);if(i===null||!hm(i.downloadTokens))return null;const s=i.downloadTokens;if(s.length===0)return null;const o=encodeURIComponent;return s.split(",").map(c=>{const d=t.bucket,p=t.fullPath,m="/b/"+o(d)+"/o/"+o(p),T=fm(m,n,r),C=eS({alt:"media",token:c});return T+C})[0]}function ab(t,e){const n={},r=e.length;for(let i=0;i<r;i++){const s=e[i];s.writable&&(n[s.server]=t[s.local])}return JSON.stringify(n)}class lS{constructor(e,n,r,i){this.url=e,this.method=n,this.handler=r,this.timeout=i,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uS(t){if(!t)throw cm()}function lb(t,e){function n(r,i){const s=aS(t,i,e);return uS(s!==null),s}return n}function ub(t,e){function n(r,i){const s=aS(t,i,e);return uS(s!==null),ob(s,i,t.host,t._protocol)}return n}function cS(t){function e(n,r){let i;return n.getStatus()===401?n.getErrorText().includes("Firebase App Check token is invalid")?i=TL():i=wL():n.getStatus()===402?i=EL(t.bucket):n.getStatus()===403?i=IL(t.path):i=r,i.status=n.getStatus(),i.serverResponse=r.serverResponse,i}return e}function cb(t){const e=cS(t);function n(r,i){let s=e(r,i);return r.getStatus()===404&&(s=vL(t.path)),s.serverResponse=i.serverResponse,s}return n}function hb(t,e,n){const r=e.fullServerUrl(),i=fm(r,t.host,t._protocol),s="GET",o=t.maxOperationRetryTime,l=new lS(i,s,ub(t,n),o);return l.errorHandler=cb(e),l}function db(t,e){return t&&t.contentType||e&&e.type()||"application/octet-stream"}function fb(t,e,n){const r=Object.assign({},n);return r.fullPath=t.path,r.size=e.size(),r.contentType||(r.contentType=db(null,e)),r}function pb(t,e,n,r,i){const s=e.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function l(){let I="";for(let x=0;x<2;x++)I=I+Math.random().toString().slice(2);return I}const u=l();o["Content-Type"]="multipart/related; boundary="+u;const c=fb(e,r,i),d=ab(c,n),p="--"+u+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+d+`\r
--`+u+`\r
Content-Type: `+c.contentType+`\r
\r
`,m=`\r
--`+u+"--",T=dr.getBlob(p,r,m);if(T===null)throw kL();const C={name:c.fullPath},P=fm(s,t.host,t._protocol),D="POST",v=t.maxUploadRetryTime,_=new lS(P,D,lb(t,n),v);return _.urlParams=C,_.headers=o,_.body=T.uploadData(),_.errorHandler=cS(e),_}class mb{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=hi.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=hi.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=hi.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,n,r,i,s){if(this.sent_)throw po("cannot .send() more than once");if(jr(e)&&r&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(n,e,!0),s!==void 0)for(const o in s)s.hasOwnProperty(o)&&this.xhr_.setRequestHeader(o,s[o].toString());return i!==void 0?this.xhr_.send(i):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw po("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw po("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw po("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw po("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class gb extends mb{initXhr(){this.xhr_.responseType="text"}}function hS(){return new gb}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Si{constructor(e,n){this._service=e,n instanceof Nt?this._location=n:this._location=Nt.makeFromUrl(n,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,n){return new Si(e,n)}get root(){const e=new Nt(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return sS(this._location.path)}get storage(){return this._service}get parent(){const e=eb(this._location.path);if(e===null)return null;const n=new Nt(this._location.bucket,e);return new Si(this._service,n)}_throwIfRoot(e){if(this._location.path==="")throw xL(e)}}function yb(t,e,n){t._throwIfRoot("uploadBytes");const r=pb(t.storage,t._location,oS(),new dr(e,!0),n);return t.storage.makeRequestWithTokens(r,hS).then(i=>({metadata:i,ref:t}))}function _b(t){t._throwIfRoot("getDownloadURL");const e=hb(t.storage,t._location,oS());return t.storage.makeRequestWithTokens(e,hS).then(n=>{if(n===null)throw NL();return n})}function vb(t,e){const n=tb(t._location.path,e),r=new Nt(t._location.bucket,n);return new Si(t.storage,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Eb(t){return/^[A-Za-z]+:\/\//.test(t)}function wb(t,e){return new Si(t,e)}function dS(t,e){if(t instanceof pm){const n=t;if(n._bucket==null)throw PL();const r=new Si(n,n._bucket);return e!=null?dS(r,e):r}else return e!==void 0?vb(t,e):t}function Tb(t,e){if(e&&Eb(e)){if(t instanceof pm)return wb(t,e);throw lf("To use ref(service, url), the first argument must be a Storage instance.")}else return dS(t,e)}function mv(t,e){const n=e==null?void 0:e[J0];return n==null?null:Nt.makeFromBucketSpec(n,t)}function Ib(t,e,n,r={}){t.host=`${e}:${n}`;const i=jr(e);i&&(lp(`https://${t.host}/b`),up("Storage",!0)),t._isUsingEmulator=!0,t._protocol=i?"https":"http";const{mockUserToken:s}=r;s&&(t._overrideAuthToken=typeof s=="string"?s:aT(s,t.app.options.projectId))}class pm{constructor(e,n,r,i,s,o=!1){this.app=e,this._authProvider=n,this._appCheckProvider=r,this._url=i,this._firebaseVersion=s,this._isUsingEmulator=o,this._bucket=null,this._host=X0,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=yL,this._maxUploadRetryTime=_L,this._requests=new Set,i!=null?this._bucket=Nt.makeFromBucketSpec(i,this._host):this._bucket=mv(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=Nt.makeFromBucketSpec(this._url,e):this._bucket=mv(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){pv("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){pv("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const n=await e.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){if(Ct(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new Si(this,e)}_makeRequest(e,n,r,i,s=!0){if(this._deleted)return new OL(Z0());{const o=HL(e,this._appId,r,i,n,this._firebaseVersion,s,this._isUsingEmulator);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,n){const[r,i]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,n,r,i).getPromise()}}const gv="@firebase/storage",yv="0.14.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fS="storage";function RM(t,e,n){return t=ce(t),yb(t,e,n)}function CM(t){return t=ce(t),_b(t)}function PM(t,e){return t=ce(t),Tb(t,e)}function Sb(t=Ju(),e){t=ce(t);const r=Br(t,fS).getImmediate({identifier:e}),i=iT("storage");return i&&Ab(r,...i),r}function Ab(t,e,n,r={}){Ib(t,e,n,r)}function Rb(t,{instanceIdentifier:e}){const n=t.getProvider("app").getImmediate(),r=t.getProvider("auth-internal"),i=t.getProvider("app-check-internal");return new pm(n,r,i,e,Pi)}function Cb(){nn(new qt(fS,Rb,"PUBLIC").setMultipleInstances(!0)),It(gv,yv,""),It(gv,yv,"esm2020")}Cb();const Pb={BASE_URL:"/",DEV:!1,MODE:"production",PROD:!0,SSR:!1,VITE_ADMIN_EMAIL:"info@zedrotech.com",VITE_FIREBASE_API_KEY:"AIzaSyDQPzAFoyf7tBg3tHAo-8SJZfquXv7MpOI",VITE_FIREBASE_APP_ID:"1:801623264205:web:a88095b412555068721284",VITE_FIREBASE_AUTH_DOMAIN:"abubakardev-b43b5.firebaseapp.com",VITE_FIREBASE_FUNCTIONS_URL:"https://us-central1-abubakardev-b43b5.cloudfunctions.net/verifyPayment",VITE_FIREBASE_MEASUREMENT_ID:"G-832FQZEH3W",VITE_FIREBASE_MESSAGING_SENDER_ID:"801623264205",VITE_FIREBASE_NOTIFICATIONS_URL:"https://us-central1-abubakardev-b43b5.cloudfunctions.net/sendContactNotification",VITE_FIREBASE_PROJECT_ID:"abubakardev-b43b5",VITE_FIREBASE_STORAGE_BUCKET:"abubakardev-b43b5.firebasestorage.app",VITE_FLUTTERWAVE_PUBLIC_KEY:"FLWPUBK-79aa6e13c2b8c3d3528cf1bc89e5bb36-X",VITE_MAILERSEND_API_TOKEN:"mlsn.dce9bb68f690b51277135f1d13c8b2ebbd9996162aed25170515949f68fcfbc6=mlsn.50bb04d04414ccff8a9d05051723ee73ce773d4cd7e4546d96e8f52e8446faa6",VITE_MAILERSEND_API_URL:"https://api.mailersend.com/v1"},kb={apiKey:"AIzaSyDQPzAFoyf7tBg3tHAo-8SJZfquXv7MpOI",authDomain:"abubakardev-b43b5.firebaseapp.com",projectId:"abubakardev-b43b5",storageBucket:"abubakardev-b43b5.firebasestorage.app",messagingSenderId:"801623264205",appId:"1:801623264205:web:a88095b412555068721284",measurementId:"G-832FQZEH3W"},Nb=["VITE_FIREBASE_API_KEY","VITE_FIREBASE_AUTH_DOMAIN","VITE_FIREBASE_PROJECT_ID"],_v=Nb.filter(t=>!Pb[t]);_v.length>0&&console.error("Missing required Firebase environment variables:",_v);let Mi,vv,ts,Du,Ev;try{Mi=pT(kb),vv=dL(Mi),ts=MD(Mi),Du=LO(Mi),Ev=Sb(Mi),console.log("Firebase initialized successfully")}catch(t){console.error("Failed to initialize Firebase:",t),Mi=null,vv=null,ts=null,Du=null,Ev=null}const pS=V.createContext(),kM=()=>{const t=V.useContext(pS);if(!t)throw new Error("useAuth must be used within an AuthProvider");return t},Db=({children:t})=>{const[e,n]=V.useState(null),[r,i]=V.useState(null),[s,o]=V.useState(!0),[l,u]=V.useState(null);V.useEffect(()=>{let p;if(!ts){console.warn("Firebase auth not available, skipping auth initialization"),o(!1);return}try{p=AN(ts,async T=>{try{if(n(T),T&&Du)try{const C=await KO(g0(Du,"users",T.uid));C.exists()&&i(C.data())}catch(C){console.error("Error fetching user data:",C)}else i(null);o(!1)}catch(C){console.error("Auth state change error:",C),u(C),o(!1)}})}catch(T){console.error("Firebase initialization error:",T),u(T),o(!1)}const m=setTimeout(()=>{s&&(console.warn("Firebase auth timeout - proceeding without auth"),o(!1))},1e4);return()=>{p&&p(),clearTimeout(m)}},[]);const d={currentUser:e,userData:r,loading:s,error:l,signOut:async()=>{try{ts&&await RN(ts),n(null),i(null)}catch(p){throw console.error("Error signing out:",p),p}},isAuthenticated:!!e};return b.jsx(pS.Provider,{value:d,children:t})},xb=()=>{if(typeof window>"u")return!1;const t=window.location.hostname;return!!(t.startsWith("school.")||t.includes("school")||new URLSearchParams(window.location.search).get("subdomain")==="school")},Ob=()=>{const{pathname:t}=Ur();return V.useEffect(()=>{window.scrollTo(0,0)},[t]),null},Vb=le.lazy(()=>oe(()=>import("./Header-BXgX1XhW.js"),__vite__mapDeps([0,1,2,3,4]))),Lb=le.lazy(()=>oe(()=>import("./SchoolHeader-S_1OXBqM.js"),__vite__mapDeps([5,1,2,3,4]))),bb=le.lazy(()=>oe(()=>import("./Footer-maF9ruNK.js"),__vite__mapDeps([6,7,8]))),Mb=le.lazy(()=>oe(()=>import("./SchoolFooter-CfHrK95K.js"),__vite__mapDeps([9,7,8]))),wv=le.lazy(()=>oe(()=>import("./Contact-BC5VDXCC.js"),__vite__mapDeps([10,11,1,12,13,3,2]))),Fb=le.lazy(()=>oe(()=>import("./SchoolContact-CZ6XJdpI.js"),__vite__mapDeps([14,11,1,12,13,3,2]))),Fh=le.lazy(()=>oe(()=>import("./About-DpVyB7Ah.js"),__vite__mapDeps([15,11,16,17,1,3]))),Ub=le.lazy(()=>oe(()=>import("./SchoolAbout-DWRg-UW0.js"),__vite__mapDeps([18,11,16,17,1,3]))),jb=le.lazy(()=>oe(()=>import("./SchoolLanding-BvQPXC3w.js"),__vite__mapDeps([19,1,20,3,21,22,23]))),Bb=le.lazy(()=>oe(()=>import("./Links-D0jCiObX.js"),__vite__mapDeps([24,1,25]))),zb=le.lazy(()=>oe(()=>import("./Chatbot-Z3OXgHVX.js"),__vite__mapDeps([26,27]))),$b=le.lazy(()=>oe(()=>import("./FloatingWhatsApp-xTq4Xvkj.js"),[])),Hb=le.lazy(()=>oe(()=>import("./Hero-CUOLmTlo.js"),__vite__mapDeps([28,11,1,3,29]))),Tv=le.lazy(()=>oe(()=>import("./Services-DnYEzNHq.js"),__vite__mapDeps([30,11,1,3,31]))),Iv=le.lazy(()=>oe(()=>import("./Portfolio-Dy_QJSRm.js"),__vite__mapDeps([32,11,1,3,2,33]))),qb=le.lazy(()=>oe(()=>import("./Courses-RJI7kygW.js"),__vite__mapDeps([20,1,3,21]))),Wb=le.lazy(()=>oe(()=>import("./CoursePage-C7_42Pf4.js"),__vite__mapDeps([34,35,1,3,36]))),Kb=le.lazy(()=>oe(()=>import("./CourseLearning-C76BZ6T3.js"),__vite__mapDeps([37,35,38]))),Gb=le.lazy(()=>oe(()=>import("./CourseSignUp-DHnOPPle.js"),__vite__mapDeps([39,1,3,2,40]))),Qb=le.lazy(()=>oe(()=>import("./CoursePayment-BFjE3Ju7.js"),__vite__mapDeps([41,1,3,42]))),Yb=le.lazy(()=>oe(()=>import("./CourseDashboard-BVnuV2Hn.js"),[])),Xb=le.lazy(()=>oe(()=>import("./Dashboard-BfJ4Tq_O.js"),__vite__mapDeps([43,1,3,2,44]))),Jb=le.lazy(()=>oe(()=>import("./RenewPayment-D8bCSQgb.js"),[])),Zb=le.lazy(()=>oe(()=>import("./Pricing-BeppO32C.js"),__vite__mapDeps([45,46]))),eM=le.lazy(()=>oe(()=>import("./Login-BDiKHuqK.js"),__vite__mapDeps([47,1,3,48]))),tM=le.lazy(()=>oe(()=>import("./Register-CiS8JO2X.js"),__vite__mapDeps([49,1,3,50]))),nM=le.lazy(()=>oe(()=>import("./AdminDashboard-CLFgXG1X.js"),__vite__mapDeps([51,1,3,22,2,52]))),rM=le.lazy(()=>oe(()=>import("./ExtendSubscription-BwQEqBoD.js"),[]));function iM(){const t=xb(),e=t?Lb:Vb,n=t?Mb:bb,r=t?Fb:wv,i=t?Ub:Fh;le.useEffect(()=>{const o=setTimeout(()=>{oe(()=>import("./Login-BDiKHuqK.js"),__vite__mapDeps([47,1,3,48])),t&&(oe(()=>import("./Dashboard-BfJ4Tq_O.js"),__vite__mapDeps([43,1,3,2,44])),oe(()=>import("./Courses-RJI7kygW.js"),__vite__mapDeps([20,1,3,21])))},2e3);return()=>clearTimeout(o)},[t]);const s=({children:o})=>!t&&!window.location.hostname.includes("localhost")?(window.location.href=`https://school.zdrotech.com${window.location.pathname}`,null):o;return b.jsx(Db,{children:b.jsxs(xC,{children:[b.jsx(Ob,{}),b.jsxs(le.Suspense,{fallback:b.jsx("div",{className:"flex items-center justify-center min-h-screen bg-gray-50",children:b.jsx("div",{className:"w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"})}),children:[b.jsxs(uC,{children:[b.jsx(Re,{path:"/",element:b.jsxs("div",{className:"App",children:[b.jsx(e,{}),t?b.jsx(jb,{}):b.jsxs(b.Fragment,{children:[b.jsx(Hb,{}),b.jsx(Tv,{}),b.jsx(Iv,{}),b.jsx(Fh,{}),b.jsx(wv,{})]}),b.jsx(n,{})]})}),b.jsx(Re,{path:"/services",element:b.jsxs("div",{className:"App",children:[b.jsx(e,{}),b.jsx(Tv,{}),b.jsx(n,{})]})}),b.jsx(Re,{path:"/chatbot",element:b.jsx(zb,{})}),b.jsx(Re,{path:"/portfolio",element:b.jsxs("div",{className:"App",children:[b.jsx(e,{}),b.jsx(Iv,{}),b.jsx(n,{})]})}),b.jsx(Re,{path:"/about",element:b.jsxs("div",{className:"App",children:[b.jsx(e,{}),b.jsx(i,{}),b.jsx(n,{})]})}),b.jsx(Re,{path:"/courses",element:b.jsx(s,{children:b.jsxs("div",{className:"App",children:[b.jsxs("div",{className:"course-content",children:[b.jsx(e,{}),b.jsx(qb,{})]}),b.jsx(n,{})]})})}),b.jsx(Re,{path:"/course/:courseId",element:b.jsx(s,{children:b.jsxs("div",{className:"App",children:[b.jsxs("div",{className:"course-content",children:[b.jsx(e,{}),b.jsx(Wb,{})]}),b.jsx(n,{})]})})}),b.jsx(Re,{path:"/course/:courseId/learn",element:b.jsx(s,{children:b.jsx("div",{className:"App",children:b.jsx(Kb,{})})})}),b.jsx(Re,{path:"/course/:courseId/signup",element:b.jsx(s,{children:b.jsx("div",{className:"App",children:b.jsxs("div",{className:"course-content",children:[b.jsx(e,{}),b.jsx(Gb,{})]})})})}),b.jsx(Re,{path:"/course/:courseId/payment",element:b.jsx(s,{children:b.jsx("div",{className:"App",children:b.jsxs("div",{className:"course-content",children:[b.jsx(e,{}),b.jsx(Qb,{})]})})})}),b.jsx(Re,{path:"/course/:courseId/dashboard",element:b.jsx(s,{children:b.jsx("div",{className:"App",children:b.jsxs("div",{className:"course-content",children:[b.jsx(e,{}),b.jsx(Yb,{})]})})})}),b.jsx(Re,{path:"/about",element:b.jsxs("div",{className:"App",children:[b.jsx(e,{}),b.jsx(Fh,{}),b.jsx(n,{})]})}),b.jsx(Re,{path:"/contact",element:b.jsxs("div",{className:"App",children:[b.jsx(e,{}),b.jsx(r,{}),b.jsx(n,{})]})}),b.jsx(Re,{path:"/links",element:b.jsx(Bb,{})}),b.jsx(Re,{path:"/pricing",element:b.jsxs("div",{className:"App",children:[b.jsx(e,{}),b.jsx(Zb,{}),b.jsx(n,{})]})}),b.jsx(Re,{path:"/login",element:b.jsx(eM,{})}),b.jsx(Re,{path:"/register",element:b.jsx(tM,{})}),b.jsx(Re,{path:"/admin",element:b.jsx(nM,{})}),b.jsx(Re,{path:"/dashboard",element:b.jsx(s,{children:b.jsx("div",{className:"App",children:b.jsxs("div",{className:"course-content",children:[b.jsx(e,{}),b.jsx(Xb,{})]})})})}),b.jsx(Re,{path:"/renew-payment",element:b.jsx(s,{children:b.jsxs("div",{className:"App",children:[b.jsx(e,{}),b.jsx(Jb,{})]})})}),b.jsx(Re,{path:"/extend-subscription",element:b.jsx(s,{children:b.jsxs("div",{className:"App",children:[b.jsx(e,{}),b.jsx(rM,{})]})})})]}),b.jsx($b,{})]})]})})}bw(document.getElementById("root")).render(b.jsx(V.StrictMode,{children:b.jsx(iM,{})}));export{CM as A,cM as B,aM as C,hM as D,Os as E,uM as F,HS as G,g1 as H,EM as I,TM as J,RN as K,Jw as L,le as R,Ur as a,wM as b,fM as c,Du as d,sM as e,K1 as f,yM as g,oM as h,g0 as i,b as j,KO as k,vM as l,AM as m,SM as n,gM as o,lM as p,pM as q,V as r,IM as s,ts as t,kM as u,_M as v,mM as w,PM as x,Ev as y,RM as z};
