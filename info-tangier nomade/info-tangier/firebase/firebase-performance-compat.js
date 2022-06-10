!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(require("@firebase/app-compat"),require("@firebase/app")):"function"==typeof define&&define.amd?define(["@firebase/app-compat","@firebase/app"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).firebase,e.firebase.INTERNAL.modularAPIs)}(this,function(yt,Et){"use strict";try{!(function(){function e(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var t,r,n=e(yt);class o extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,o.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,a.prototype.create)}}class a{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){var r,n=t[0]||{},a=`${this.service}/${e}`,i=this.errors[e],i=i?(r=n,i.replace(s,(e,t)=>{var n=r[t];return null!=n?String(n):`<${t}?>`})):"Error",i=`${this.serviceName}: ${i} (${a}).`;return new o(a,i,n)}}const s=/\{\$([^}]+)}/g;class i{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}(Te=t=t||{})[Te.DEBUG=0]="DEBUG",Te[Te.VERBOSE=1]="VERBOSE",Te[Te.INFO=2]="INFO",Te[Te.WARN=3]="WARN",Te[Te.ERROR=4]="ERROR",Te[Te.SILENT=5]="SILENT";const c={debug:t.DEBUG,verbose:t.VERBOSE,info:t.INFO,warn:t.WARN,error:t.ERROR,silent:t.SILENT},l=t.INFO,u={[t.DEBUG]:"log",[t.VERBOSE]:"log",[t.INFO]:"info",[t.WARN]:"warn",[t.ERROR]:"error"},d=(e,t,...n)=>{if(!(t<e.logLevel)){var r=(new Date).toISOString(),a=u[t];if(!a)throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);console[a](`[${r}]  ${e.name}:`,...n)}};const p=(t,e)=>e.some(e=>t instanceof e);let f,g;const h=new WeakMap,m=new WeakMap,v=new WeakMap,b=new WeakMap,w=new WeakMap;let _={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return m.get(e);if("objectStoreNames"===t)return e.objectStoreNames||v.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return I(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e}};function y(r){return r!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(g=g||[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey]).includes(r)?function(...e){return r.apply(T(this),e),I(h.get(this))}:function(...e){return I(r.apply(T(this),e))}:function(e,...t){var n=r.call(T(this),e,...t);return v.set(n,e.sort?e.sort():[e]),I(n)}}function E(e){return"function"==typeof e?y(e):(e instanceof IDBTransaction&&(i=e,m.has(i)||(t=new Promise((e,t)=>{const n=()=>{i.removeEventListener("complete",r),i.removeEventListener("error",a),i.removeEventListener("abort",a)},r=()=>{e(),n()},a=()=>{t(i.error||new DOMException("AbortError","AbortError")),n()};i.addEventListener("complete",r),i.addEventListener("error",a),i.addEventListener("abort",a)}),m.set(i,t))),p(e,f=f||[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])?new Proxy(e,_):e);var i,t}function I(e){if(e instanceof IDBRequest)return function(i){const e=new Promise((e,t)=>{const n=()=>{i.removeEventListener("success",r),i.removeEventListener("error",a)},r=()=>{e(I(i.result)),n()},a=()=>{t(i.error),n()};i.addEventListener("success",r),i.addEventListener("error",a)});return e.then(e=>{e instanceof IDBCursor&&h.set(e,i)}).catch(()=>{}),w.set(e,i),e}(e);if(b.has(e))return b.get(e);var t=E(e);return t!==e&&(b.set(e,t),w.set(t,e)),t}const T=e=>w.get(e);const S=["get","getKey","getAll","getAllKeys","count"],k=["put","add","delete","clear"],N=new Map;function C(e,t){if(e instanceof IDBDatabase&&!(t in e)&&"string"==typeof t){if(N.get(t))return N.get(t);const a=t.replace(/FromIndex$/,""),i=t!==a,o=k.includes(a);if(a in(i?IDBIndex:IDBObjectStore).prototype&&(o||S.includes(a))){var n=async function(e,...t){var n=this.transaction(e,o?"readwrite":"readonly");let r=n.store;return i&&(r=r.index(t.shift())),(await Promise.all([r[a](...t),o&&n.done]))[0]};return N.set(t,n),n}}}_={...r=_,get:(e,t,n)=>C(e,t)||r.get(e,t,n),has:(e,t)=>!!C(e,t)||r.has(e,t)};var R="@firebase/installations",A="0.5.9";const O=1e4,M=`w:${A}`,P="FIS_v2",L="https://firebaseinstallations.googleapis.com/v1",D=36e5;const B=new a("installations","Installations",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."});function j(e){return e instanceof o&&e.code.includes("request-failed")}function $({projectId:e}){return`${L}/projects/${e}/installations`}function U(e){return{token:e.token,requestStatus:2,expiresIn:(e=e.expiresIn,Number(e.replace("s","000"))),creationTime:Date.now()}}async function F(e,t){var n=(await t.json()).error;return B.create("request-failed",{requestName:e,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function q({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function H(e,{refreshToken:t}){const n=q(e);return n.append("Authorization",(t=t,`${P} ${t}`)),n}async function x(e){var t=await e();return 500<=t.status&&t.status<600?e():t}function V(t){return new Promise(e=>{setTimeout(e,t)})}const W=/^[cdef][\w-]{21}$/,K="";function z(){try{const t=new Uint8Array(17),n=self.crypto||self.msCrypto;n.getRandomValues(t),t[0]=112+t[0]%16;var e=function(e){const t=function(e){const t=btoa(String.fromCharCode(...e));return t.replace(/\+/g,"-").replace(/\//g,"_")}(e);return t.substr(0,22)}(t);return W.test(e)?e:K}catch(e){return K}}function G(e){return`${e.appName}!${e.appId}`}const J=new Map;function Y(e,t){var n=G(e);Z(n,t),function(e,t){const n=function(){!Q&&"BroadcastChannel"in self&&(Q=new BroadcastChannel("[Firebase] FID Change"),Q.onmessage=e=>{Z(e.data.key,e.data.fid)});return Q}();n&&n.postMessage({key:e,fid:t});0===J.size&&Q&&(Q.close(),Q=null)}(n,t)}function Z(e,t){var n=J.get(e);if(n)for(const r of n)r(t)}let Q=null;const X="firebase-installations-store";let ee=null;function te(){return ee=ee||function(e,t,{blocked:n,upgrade:r,blocking:a,terminated:i}){const o=indexedDB.open(e,t),s=I(o);return r&&o.addEventListener("upgradeneeded",e=>{r(I(o.result),e.oldVersion,e.newVersion,I(o.transaction))}),n&&o.addEventListener("blocked",()=>n()),s.then(e=>{i&&e.addEventListener("close",()=>i()),a&&e.addEventListener("versionchange",()=>a())}).catch(()=>{}),s}("firebase-installations-database",1,{upgrade:(e,t)=>{0===t&&e.createObjectStore(X)}}),ee}async function ne(e,t){var n=G(e);const r=await te(),a=r.transaction(X,"readwrite"),i=a.objectStore(X);var o=await i.get(n);return await i.put(t,n),await a.done,o&&o.fid===t.fid||Y(e,t.fid),t}async function re(e){var t=G(e);const n=await te(),r=n.transaction(X,"readwrite");await r.objectStore(X).delete(t),await r.done}async function ae(e,t){var n=G(e);const r=await te(),a=r.transaction(X,"readwrite"),i=a.objectStore(X);var o=await i.get(n),s=t(o);return void 0===s?await i.delete(n):await i.put(s,n),await a.done,!s||o&&o.fid===s.fid||Y(e,s.fid),s}async function ie(n){let r;var e=await ae(n.appConfig,e=>{var t=se(e||{fid:z(),registrationStatus:0}),t=function(e,t){{if(0!==t.registrationStatus)return 1===t.registrationStatus?{installationEntry:t,registrationPromise:async function(e){let t=await oe(e.appConfig);for(;1===t.registrationStatus;)await V(100),t=await oe(e.appConfig);if(0!==t.registrationStatus)return t;{var{installationEntry:n,registrationPromise:r}=await ie(e);return r||n}}(e)}:{installationEntry:t};if(!navigator.onLine){var n=Promise.reject(B.create("app-offline"));return{installationEntry:t,registrationPromise:n}}var r={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},n=async function(t,n){try{var e=await async function({appConfig:e,heartbeatServiceProvider:t},{fid:n}){const r=$(e),a=q(e),i=t.getImmediate({optional:!0});!i||(o=await i.getHeartbeatsHeader())&&a.append("x-firebase-client",o);var o={fid:n,authVersion:P,appId:e.appId,sdkVersion:M};const s={method:"POST",headers:a,body:JSON.stringify(o)},c=await x(()=>fetch(r,s));if(c.ok){o=await c.json();return{fid:o.fid||n,registrationStatus:2,refreshToken:o.refreshToken,authToken:U(o.authToken)}}throw await F("Create Installation",c)}(t,n);return ne(t.appConfig,e)}catch(e){throw j(e)&&409===e.customData.serverCode?await re(t.appConfig):await ne(t.appConfig,{fid:n.fid,registrationStatus:0}),e}}(e,r);return{installationEntry:r,registrationPromise:n}}}(n,t);return r=t.registrationPromise,t.installationEntry});return e.fid===K?{installationEntry:await r}:{installationEntry:e,registrationPromise:r}}function oe(e){return ae(e,e=>{if(!e)throw B.create("installation-not-found");return se(e)})}function se(e){return 1===(t=e).registrationStatus&&t.registrationTime+O<Date.now()?{fid:e.fid,registrationStatus:0}:e;var t}async function ce({appConfig:e,heartbeatServiceProvider:t},n){const r=([a,i]=[e,n["fid"]],`${$(a)}/${i}/authTokens:generate`);var a,i;const o=H(e,n),s=t.getImmediate({optional:!0});!s||(c=await s.getHeartbeatsHeader())&&o.append("x-firebase-client",c);var c={installation:{sdkVersion:M,appId:e.appId}};const l={method:"POST",headers:o,body:JSON.stringify(c)},u=await x(()=>fetch(r,l));if(u.ok)return U(await u.json());throw await F("Generate Auth Token",u)}async function le(r,a=!1){let i;var e=await ae(r.appConfig,e=>{if(!de(e))throw B.create("not-registered");var t,n=e.authToken;if(a||2!==(t=n).requestStatus||function(e){var t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+D}(t)){if(1===n.requestStatus)return i=async function(e,t){let n=await ue(e.appConfig);for(;1===n.authToken.requestStatus;)await V(100),n=await ue(e.appConfig);var r=n.authToken;return 0===r.requestStatus?le(e,t):r}(r,a),e;if(!navigator.onLine)throw B.create("app-offline");n=(t=e,n={requestStatus:1,requestTime:Date.now()},Object.assign(Object.assign({},t),{authToken:n}));return i=async function(t,n){try{var r=await ce(t,n),e=Object.assign(Object.assign({},n),{authToken:r});return await ne(t.appConfig,e),r}catch(e){throw!j(e)||401!==e.customData.serverCode&&404!==e.customData.serverCode?(r=Object.assign(Object.assign({},n),{authToken:{requestStatus:0}}),await ne(t.appConfig,r)):await re(t.appConfig),e}}(r,n),n}return e});return i?await i:e.authToken}function ue(e){return ae(e,e=>{if(!de(e))throw B.create("not-registered");var t,n=e.authToken;return 1===(t=n).requestStatus&&t.requestTime+O<Date.now()?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}function de(e){return void 0!==e&&2===e.registrationStatus}async function pe(e,t=!1){var n,r=e;return await((n=(await ie(r)).registrationPromise)&&await n),(await le(r,t)).token}function fe(e){return B.create("missing-app-config-values",{valueName:e})}const ge="installations",he=e=>{var t=e.getProvider("app").getImmediate();return{app:t,appConfig:function(e){if(!e||!e.options)throw fe("App Configuration");if(!e.name)throw fe("App Name");for(const t of["projectId","apiKey","appId"])if(!e.options[t])throw fe(t);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(t),heartbeatServiceProvider:Et._getProvider(t,"heartbeat"),_delete:()=>Promise.resolve()}},me=e=>{var t=e.getProvider("app").getImmediate();const n=Et._getProvider(t,ge).getImmediate();return{getId:()=>async function(e){var t=e;const{installationEntry:n,registrationPromise:r}=await ie(t);return(r||le(t)).catch(console.error),n.fid}(n),getToken:e=>pe(n,e)}};Et._registerComponent(new i(ge,he,"PUBLIC")),Et._registerComponent(new i("installations-internal",me,"PRIVATE")),Et.registerVersion(R,A),Et.registerVersion(R,A,"esm2017");const ve="@firebase/performance",be="0.5.9",we=be,_e="FB-PERF-TRACE-MEASURE",ye="@firebase/performance/config",Ee="@firebase/performance/configexpire";var Ie,Te,Se,A="Performance";const ke=new a("performance",A,{"trace started":"Trace {$traceName} was started before.","trace stopped":"Trace {$traceName} is not running.","nonpositive trace startTime":"Trace {$traceName} startTime should be positive.","nonpositive trace duration":"Trace {$traceName} duration should be positive.","no window":"Window is not available.","no app id":"App id is not available.","no project id":"Project id is not available.","no api key":"Api key is not available.","invalid cc log":"Attempted to queue invalid cc event","FB not default":"Performance can only start when Firebase app instance is the default one.","RC response not ok":"RC response is not ok","invalid attribute name":"Attribute name {$attributeName} is invalid.","invalid attribute value":"Attribute value {$attributeValue} is invalid.","invalid custom metric name":"Custom metric name {$customMetricName} is invalid","invalid String merger input":"Input for String merger is invalid, contact support team to resolve.","already initialized":"initializePerformance() has already been called with different options. To avoid this error, call initializePerformance() with the same options as when it was originally called, or call getPerformance() to return the already initialized instance."}),Ne=new class{constructor(e){this.name=e,this._logLevel=l,this._logHandler=d,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in t))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?c[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,t.DEBUG,...e),this._logHandler(this,t.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,t.VERBOSE,...e),this._logHandler(this,t.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,t.INFO,...e),this._logHandler(this,t.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,t.WARN,...e),this._logHandler(this,t.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,t.ERROR,...e),this._logHandler(this,t.ERROR,...e)}}(A);Ne.logLevel=t.INFO;let Ce,Re;class Ae{constructor(e){if(!(this.window=e))throw ke.create("no window");this.performance=e.performance,this.PerformanceObserver=e.PerformanceObserver,this.windowLocation=e.location,this.navigator=e.navigator,this.document=e.document,this.navigator&&this.navigator.cookieEnabled&&(this.localStorage=e.localStorage),e.perfMetrics&&e.perfMetrics.onFirstInputDelay&&(this.onFirstInputDelay=e.perfMetrics.onFirstInputDelay)}getUrl(){return this.windowLocation.href.split("?")[0]}mark(e){this.performance&&this.performance.mark&&this.performance.mark(e)}measure(e,t,n){this.performance&&this.performance.measure&&this.performance.measure(e,t,n)}getEntriesByType(e){return this.performance&&this.performance.getEntriesByType?this.performance.getEntriesByType(e):[]}getEntriesByName(e){return this.performance&&this.performance.getEntriesByName?this.performance.getEntriesByName(e):[]}getTimeOrigin(){return this.performance&&(this.performance.timeOrigin||this.performance.timing.navigationStart)}requiredApisAvailable(){return fetch&&Promise&&"undefined"!=typeof navigator&&navigator.cookieEnabled?"object"==typeof indexedDB||(Ne.info("IndexedDB is not supported by current browswer"),!1):(Ne.info("Firebase Performance cannot start if browser does not support fetch and Promise or cookie is disabled."),!1)}setupObserver(e,n){if(this.PerformanceObserver){const t=new this.PerformanceObserver(e=>{for(const t of e.getEntries())n(t)});t.observe({entryTypes:[e]})}}static getInstance(){return void 0===Ce&&(Ce=new Ae(Re)),Ce}}let Oe;function Me(e,t){var n=e.length-t.length;if(n<0||1<n)throw ke.create("invalid String merger input");const r=[];for(let a=0;a<e.length;a++)r.push(e.charAt(a)),t.length>a&&r.push(t.charAt(a));return r.join("")}let Pe;class Le{constructor(){this.instrumentationEnabled=!0,this.dataCollectionEnabled=!0,this.loggingEnabled=!1,this.tracesSamplingRate=1,this.networkRequestsSamplingRate=1,this.logEndPointUrl="https://firebaselogging.googleapis.com/v0cc/log?format=json_proto",this.flTransportEndpointUrl=Me("hts/frbslgigp.ogepscmv/ieo/eaylg","tp:/ieaeogn-agolai.o/1frlglgc/o"),this.transportKey=Me("AzSC8r6ReiGqFMyfvgow","Iayx0u-XT3vksVM-pIV"),this.logSource=462,this.logTraceAfterSampling=!1,this.logNetworkAfterSampling=!1,this.configTimeToLive=12}getFlTransportFullUrl(){return this.flTransportEndpointUrl.concat("?key=",this.transportKey)}static getInstance(){return void 0===Pe&&(Pe=new Le),Pe}}(Te=Ie=Ie||{})[Te.UNKNOWN=0]="UNKNOWN",Te[Te.VISIBLE=1]="VISIBLE",Te[Te.HIDDEN=2]="HIDDEN";const De=["firebase_","google_","ga_"],Be=new RegExp("^[a-zA-Z]\\w*$");function je(){switch(Ae.getInstance().document.visibilityState){case"visible":return Ie.VISIBLE;case"hidden":return Ie.HIDDEN;default:return Ie.UNKNOWN}}function $e(e){var t=null===(t=e.options)||void 0===t?void 0:t.appId;if(!t)throw ke.create("no app id");return t}const Ue="0.0.1",Fe={loggingEnabled:!0},qe="FIREBASE_INSTALLATIONS_AUTH";function He(e,t){var r,a,n=function(){const e=Ae.getInstance().localStorage;if(e){var t=e.getItem(Ee);if(t&&function(e){return Number(e)>Date.now()}(t)){t=e.getItem(ye);if(t)try{return JSON.parse(t)}catch(e){return}}}}();return n?(Ve(n),Promise.resolve()):(a=t,function(e){const t=e.getToken();return t.then(e=>{}),t}((r=e).installations).then(e=>{var t=function(e){var t=null===(t=e.options)||void 0===t?void 0:t.projectId;if(!t)throw ke.create("no project id");return t}(r.app),n=function(e){var t=null===(t=e.options)||void 0===t?void 0:t.apiKey;if(!t)throw ke.create("no api key");return t}(r.app),n=new Request(`https://firebaseremoteconfig.googleapis.com/v1/projects/${t}/namespaces/fireperf:fetch?key=${n}`,{method:"POST",headers:{Authorization:`${qe} ${e}`},body:JSON.stringify({app_instance_id:a,app_instance_id_token:e,app_id:$e(r.app),app_version:we,sdk_version:Ue})});return fetch(n).then(e=>{if(e.ok)return e.json();throw ke.create("RC response not ok")})}).catch(()=>{Ne.info(xe)}).then(Ve).then(e=>function(e){const t=Ae.getInstance().localStorage;e&&t&&(t.setItem(ye,JSON.stringify(e)),t.setItem(Ee,String(Date.now()+60*Le.getInstance().configTimeToLive*60*1e3)))}(e),()=>{}))}const xe="Could not fetch config, will use default configs";function Ve(e){if(!e)return e;const t=Le.getInstance();var n=e.entries||{};return void 0!==n.fpr_enabled?t.loggingEnabled="true"===String(n.fpr_enabled):t.loggingEnabled=Fe.loggingEnabled,n.fpr_log_source?t.logSource=Number(n.fpr_log_source):Fe.logSource&&(t.logSource=Fe.logSource),n.fpr_log_endpoint_url?t.logEndPointUrl=n.fpr_log_endpoint_url:Fe.logEndPointUrl&&(t.logEndPointUrl=Fe.logEndPointUrl),n.fpr_log_transport_key?t.transportKey=n.fpr_log_transport_key:Fe.transportKey&&(t.transportKey=Fe.transportKey),void 0!==n.fpr_vc_network_request_sampling_rate?t.networkRequestsSamplingRate=Number(n.fpr_vc_network_request_sampling_rate):void 0!==Fe.networkRequestsSamplingRate&&(t.networkRequestsSamplingRate=Fe.networkRequestsSamplingRate),void 0!==n.fpr_vc_trace_sampling_rate?t.tracesSamplingRate=Number(n.fpr_vc_trace_sampling_rate):void 0!==Fe.tracesSamplingRate&&(t.tracesSamplingRate=Fe.tracesSamplingRate),t.logTraceAfterSampling=We(t.tracesSamplingRate),t.logNetworkAfterSampling=We(t.networkRequestsSamplingRate),e}function We(e){return Math.random()<=e}let Ke=1,ze;function Ge(e){var t;return Ke=2,ze=ze||(t=e,function(){const n=Ae.getInstance().document;return new Promise(e=>{if(n&&"complete"!==n.readyState){const t=()=>{"complete"===n.readyState&&(n.removeEventListener("readystatechange",t),e())};n.addEventListener("readystatechange",t)}else e()})}().then(()=>function(e){const t=e.getId();return t.then(e=>{Oe=e}),t}(t.installations)).then(e=>He(t,e)).then(()=>Je(),()=>Je())),ze}function Je(){Ke=3}const Ye=1e4,Ze=3,Qe=1e3;let Xe=Ze,et=[],tt=!1;function nt(e){setTimeout(()=>{if(0!==Xe)return et.length?void function(){const e=et.splice(0,Qe),t=e.map(e=>({source_extension_json_proto3:e.message,event_time_ms:String(e.eventTime)})),n={request_time_ms:String(Date.now()),client_info:{client_type:1,js_client_info:{}},log_source:Le.getInstance().logSource,log_event:t};!function(e,r){return function(e){var t=Le.getInstance().getFlTransportFullUrl();return fetch(t,{method:"POST",body:JSON.stringify(e)})}(e).then(e=>(e.ok||Ne.info("Call to Firebase backend failed."),e.json())).then(e=>{var t=Number(e.nextRequestWaitMillis);let n=Ye;isNaN(t)||(n=Math.max(t,n));t=e.logResponseDetails;Array.isArray(t)&&0<t.length&&"RETRY_REQUEST_LATER"===t[0].responseAction&&(et=[...r,...et],Ne.info("Retry transport request later.")),Xe=Ze,nt(n)})}(n,e).catch(()=>{et=[...e,...et],Xe--,Ne.info(`Tries left: ${Xe}.`),nt(Ye)})}():nt(Ye)},e)}function rt(t){return(...e)=>{!function(e){if(!e.eventTime||!e.message)throw ke.create("invalid cc log");et=[...et,e]}({message:t(...e),eventTime:Date.now()})}}let at;function it(e,t){at=at||rt(ct),at(e,t)}function ot(e){var t=Le.getInstance();!t.instrumentationEnabled&&e.isAuto||(t.dataCollectionEnabled||e.isAuto)&&Ae.getInstance().requiredApisAvailable()&&(e.isAuto&&je()!==Ie.VISIBLE||(3===Ke?st(e):Ge(e.performanceController).then(()=>st(e),()=>st(e))))}function st(e){var t;!Oe||(t=Le.getInstance()).loggingEnabled&&t.logTraceAfterSampling&&setTimeout(()=>it(e,1),0)}function ct(e,t){return 0===t?(n={url:e.url,http_method:e.httpMethod||0,http_response_code:200,response_payload_bytes:e.responsePayloadBytes,client_start_time_us:e.startTimeUs,time_to_response_initiated_us:e.timeToResponseInitiatedUs,time_to_response_completed_us:e.timeToResponseCompletedUs},n={application_info:lt(e.performanceController.app),network_request_metric:n},JSON.stringify(n)):function(e){const t={name:e.name,is_auto:e.isAuto,client_start_time_us:e.startTimeUs,duration_us:e.durationUs};0!==Object.keys(e.counters).length&&(t.counters=e.counters);var n=e.getAttributes();0!==Object.keys(n).length&&(t.custom_attributes=n);n={application_info:lt(e.performanceController.app),trace_metric:t};return JSON.stringify(n)}(e);var n}function lt(e){return{google_app_id:$e(e),app_instance_id:Oe,web_app_info:{sdk_version:we,page_url:Ae.getInstance().getUrl(),service_worker_status:"serviceWorker"in(t=Ae.getInstance().navigator)?t.serviceWorker.controller?2:3:1,visibility_state:je(),effective_connection_type:function(){var e=Ae.getInstance().navigator.connection;switch(e&&e.effectiveType){case"slow-2g":return 1;case"2g":return 2;case"3g":return 3;case"4g":return 4;default:return 0}}()},application_process_state:0};var t}const ut=["_fp","_fcp","_fid"];class dt{constructor(e,t,n=!1,r){this.performanceController=e,this.name=t,this.isAuto=n,this.state=1,this.customAttributes={},this.counters={},this.api=Ae.getInstance(),this.randomId=Math.floor(1e6*Math.random()),this.isAuto||(this.traceStartMark=`FB-PERF-TRACE-START-${this.randomId}-${this.name}`,this.traceStopMark=`FB-PERF-TRACE-STOP-${this.randomId}-${this.name}`,this.traceMeasure=r||`${_e}-${this.randomId}-${this.name}`,r&&this.calculateTraceMetrics())}start(){if(1!==this.state)throw ke.create("trace started",{traceName:this.name});this.api.mark(this.traceStartMark),this.state=2}stop(){if(2!==this.state)throw ke.create("trace stopped",{traceName:this.name});this.state=3,this.api.mark(this.traceStopMark),this.api.measure(this.traceMeasure,this.traceStartMark,this.traceStopMark),this.calculateTraceMetrics(),ot(this)}record(e,t,n){if(e<=0)throw ke.create("nonpositive trace startTime",{traceName:this.name});if(t<=0)throw ke.create("nonpositive trace duration",{traceName:this.name});if(this.durationUs=Math.floor(1e3*t),this.startTimeUs=Math.floor(1e3*e),n&&n.attributes&&(this.customAttributes=Object.assign({},n.attributes)),n&&n.metrics)for(const r of Object.keys(n.metrics))isNaN(Number(n.metrics[r]))||(this.counters[r]=Math.floor(Number(n.metrics[r])));ot(this)}incrementMetric(e,t=1){void 0===this.counters[e]?this.putMetric(e,t):this.putMetric(e,this.counters[e]+t)}putMetric(e,t){if(r=e,a=this.name,0===r.length||100<r.length||!(a&&a.startsWith("_wt_")&&-1<ut.indexOf(r))&&r.startsWith("_"))throw ke.create("invalid custom metric name",{customMetricName:e});var n,r,a;this.counters[e]=(t=null!=t?t:0,(n=Math.floor(t))<t&&Ne.info(`Metric value should be an Integer, setting the value as : ${n}.`),n)}getMetric(e){return this.counters[e]||0}putAttribute(e,t){var n,r,a=!(0===(n=e).length||40<n.length)&&(!De.some(e=>n.startsWith(e))&&!!n.match(Be)),i=0!==(r=t).length&&r.length<=100;if(a&&i)this.customAttributes[e]=t;else{if(!a)throw ke.create("invalid attribute name",{attributeName:e});if(!i)throw ke.create("invalid attribute value",{attributeValue:t})}}getAttribute(e){return this.customAttributes[e]}removeAttribute(e){void 0!==this.customAttributes[e]&&delete this.customAttributes[e]}getAttributes(){return Object.assign({},this.customAttributes)}setStartTime(e){this.startTimeUs=e}setDuration(e){this.durationUs=e}calculateTraceMetrics(){var e=this.api.getEntriesByName(this.traceMeasure),e=e&&e[0];e&&(this.durationUs=Math.floor(1e3*e.duration),this.startTimeUs=Math.floor(1e3*(e.startTime+this.api.getTimeOrigin())))}static createOobTrace(e,t,n,r){var a=Ae.getInstance().getUrl();if(a){const i=new dt(e,"_wt_"+a,!0);a=Math.floor(1e3*Ae.getInstance().getTimeOrigin());i.setStartTime(a),t&&t[0]&&(i.setDuration(Math.floor(1e3*t[0].duration)),i.putMetric("domInteractive",Math.floor(1e3*t[0].domInteractive)),i.putMetric("domContentLoadedEventEnd",Math.floor(1e3*t[0].domContentLoadedEventEnd)),i.putMetric("loadEventEnd",Math.floor(1e3*t[0].loadEventEnd)));n&&((a=n.find(e=>"first-paint"===e.name))&&a.startTime&&i.putMetric("_fp",Math.floor(1e3*a.startTime)),(a=n.find(e=>"first-contentful-paint"===e.name))&&a.startTime&&i.putMetric("_fcp",Math.floor(1e3*a.startTime)),r&&i.putMetric("_fid",Math.floor(1e3*r))),ot(i)}}static createUserTimingTrace(e,t){ot(new dt(e,t,!1,t))}}function pt(e,t){const n=t;var r,a,i;n&&void 0!==n.responseStart&&(i=Ae.getInstance().getTimeOrigin(),r=Math.floor(1e3*(n.startTime+i)),a=n.responseStart?Math.floor(1e3*(n.responseStart-n.startTime)):void 0,i=Math.floor(1e3*(n.responseEnd-n.startTime)),function(e){const t=Le.getInstance();var n,r,a;t.instrumentationEnabled&&(n=e.url,r=t.logEndPointUrl.split("?")[0],a=t.flTransportEndpointUrl.split("?")[0],n!==r&&n!==a&&t.loggingEnabled&&t.logNetworkAfterSampling&&setTimeout(()=>it(e,0),0))}({performanceController:e,url:n.name&&n.name.split("?")[0],responsePayloadBytes:n.transferSize,startTimeUs:r,timeToResponseInitiatedUs:a,timeToResponseCompletedUs:i}))}const ft=5e3;function gt(e){Oe&&(setTimeout(()=>function(n){const e=Ae.getInstance(),r=e.getEntriesByType("navigation"),a=e.getEntriesByType("paint");if(e.onFirstInputDelay){let t=setTimeout(()=>{dt.createOobTrace(n,r,a),t=void 0},ft);e.onFirstInputDelay(e=>{t&&(clearTimeout(t),dt.createOobTrace(n,r,a,e))})}else dt.createOobTrace(n,r,a)}(e),0),setTimeout(()=>function(t){const e=Ae.getInstance(),n=e.getEntriesByType("resource");for(const r of n)pt(t,r);e.setupObserver("resource",e=>pt(t,e))}(e),0),setTimeout(()=>function(t){const e=Ae.getInstance(),n=e.getEntriesByType("measure");for(const r of n)ht(t,r);e.setupObserver("measure",e=>ht(t,e))}(e),0))}function ht(e,t){const n=t.name;n.substring(0,_e.length)!==_e&&dt.createUserTimingTrace(e,n)}class mt{constructor(e,t){this.app=e,this.installations=t,this.initialized=!1}_init(e){this.initialized||(void 0!==(null==e?void 0:e.dataCollectionEnabled)&&(this.dataCollectionEnabled=e.dataCollectionEnabled),void 0!==(null==e?void 0:e.instrumentationEnabled)&&(this.instrumentationEnabled=e.instrumentationEnabled),Ae.getInstance().requiredApisAvailable()?new Promise((t,n)=>{try{let e=!0;const r="validate-browser-context-for-indexeddb-analytics-module",a=self.indexedDB.open(r);a.onsuccess=()=>{a.result.close(),e||self.indexedDB.deleteDatabase(r),t(!0)},a.onupgradeneeded=()=>{e=!1},a.onerror=()=>{var e;n((null===(e=a.error)||void 0===e?void 0:e.message)||"")}}catch(e){n(e)}}).then(e=>{e&&(tt||(nt(5500),tt=!0),Ge(this).then(()=>gt(this),()=>gt(this)),this.initialized=!0)}).catch(e=>{Ne.info(`Environment doesn't support IndexedDB: ${e}`)}):Ne.info('Firebase Performance cannot start if the browser does not support "Fetch" and "Promise", or cookies are disabled.'))}set instrumentationEnabled(e){Le.getInstance().instrumentationEnabled=e}get instrumentationEnabled(){return Le.getInstance().instrumentationEnabled}set dataCollectionEnabled(e){Le.getInstance().dataCollectionEnabled=e}get dataCollectionEnabled(){return Le.getInstance().dataCollectionEnabled}}const vt="[DEFAULT]";const bt=(e,{options:t})=>{var n=e.getProvider("app").getImmediate(),r=e.getProvider("installations-internal").getImmediate();if(n.name!==vt)throw ke.create("FB not default");if("undefined"==typeof window)throw ke.create("no window");e=window,Re=e;const a=new mt(n,r);return a._init(t),a};Et._registerComponent(new i("performance",bt,"PUBLIC")),Et.registerVersion(ve,be),Et.registerVersion(ve,be,"esm2017");class wt{constructor(e,t){this.app=e,this._delegate=t}get instrumentationEnabled(){return this._delegate.instrumentationEnabled}set instrumentationEnabled(e){this._delegate.instrumentationEnabled=e}get dataCollectionEnabled(){return this._delegate.dataCollectionEnabled}set dataCollectionEnabled(e){this._delegate.dataCollectionEnabled=e}trace(e){return t=this._delegate,n=e,t=(e=t)&&e._delegate?e._delegate:e,new dt(t,n);var t,n}}function _t(e){var t=e.getProvider("app-compat").getImmediate(),n=e.getProvider("performance").getImmediate();return new wt(t,n)}(Se=n.default).INTERNAL.registerComponent(new i("performance-compat",_t,"PUBLIC")),Se.registerVersion("@firebase/performance-compat","0.1.9")}).apply(this,arguments)}catch(e){throw console.error(e),new Error("Cannot instantiate firebase-performance-compat.js - be sure to load firebase-app.js first.")}});
//# sourceMappingURL=firebase-performance-compat.js.map
