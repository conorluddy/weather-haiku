!function(){function t(t){return t&&t.__esModule?t.default:t}const n=(t,n)=>fetch(`https://0jz8lc75s6.execute-api.eu-west-1.amazonaws.com/production/?latitude=${t}&longitude=${n}`);var e={};e=function(){"use strict";var t=document,n=t.createTextNode.bind(t);function e(t,n,e){t.style.setProperty(n,e)}function o(t,n){return t.appendChild(n)}function r(n,e,r,s){var i=t.createElement("span");return e&&(i.className=e),r&&(!s&&i.setAttribute("data-"+e,r),i.textContent=r),n&&o(n,i)||i}function s(t,n){return t.getAttribute("data-"+n)}function i(n,e){return n&&0!=n.length?n.nodeName?[n]:[].slice.call(n[0].nodeName?n:(e||t).querySelectorAll(n)):[]}function c(t){for(var n=[];t--;)n[t]=[];return n}function a(t,n){t&&t.some(n)}function l(t){return function(n){return t[n]}}function u(t,n,o){var r="--"+n,s=r+"-index";a(o,(function(t,n){Array.isArray(t)?a(t,(function(t){e(t,s,n)})):e(t,s,n)})),e(t,r+"-total",o.length)}var m={};function d(t,n,e){var o=e.indexOf(t);if(-1==o)e.unshift(t),a(m[t].depends,(function(n){d(n,t,e)}));else{var r=e.indexOf(n);e.splice(o,1),e.splice(r,0,t)}return e}function h(t,n,e,o){return{by:t,depends:n,key:e,split:o}}function w(t){return d(t,0,[]).map(l(m))}function f(t){m[t.by]=t}function p(t,e,s,c,l){t.normalize();var u=[],m=document.createDocumentFragment();c&&u.push(t.previousSibling);var d=[];return i(t.childNodes).some((function(t){if(!t.tagName||t.hasChildNodes()){if(t.childNodes&&t.childNodes.length)return d.push(t),void u.push.apply(u,p(t,e,s,c,l));var o=t.wholeText||"",i=o.trim();i.length&&(" "===o[0]&&d.push(n(" ")),a(i.split(s),(function(t,n){n&&l&&d.push(r(m,"whitespace"," ",l));var o=r(m,e,t);u.push(o),d.push(o)}))," "===o[o.length-1]&&d.push(n(" ")))}else d.push(t)})),a(d,(function(t){o(m,t)})),t.innerHTML="",o(t,m),u}var z=0;function M(t,n){for(var e in n)t[e]=n[e];return t}var b="words",g=h(b,z,"word",(function(t){return p(t,"word",/\s+/,0,1)})),v="chars",L=h(v,[b],"char",(function(t,n,e){var o=[];return a(e[b],(function(t,e){o.push.apply(o,p(t,"char","",n.whitespace&&e))})),o}));function N(t){var n=(t=t||{}).key;return i(t.target||"[data-splitting]").map((function(e){var o=e["🍌"];if(!t.force&&o)return o;o=e["🍌"]={el:e};var r=w(t.by||s(e,"splitting")||v),i=M({},t);return a(r,(function(t){if(t.split){var r=t.by,s=(n?"-"+n:"")+t.key,c=t.split(e,i,o);s&&u(e,s,c),o[r]=c,e.classList.add(r)}})),e.classList.add("splitting"),o}))}function T(t){var n=(t=t||{}).target=r();return n.innerHTML=t.content,N(t),n.outerHTML}function y(t,n,e){var o=i(n.matching||t.children,t),r={};return a(o,(function(t){var n=Math.round(t[e]);(r[n]||(r[n]=[])).push(t)})),Object.keys(r).map(Number).sort(H).map(l(r))}function H(t,n){return t-n}N.html=T,N.add=f;var Y=h("lines",[b],"line",(function(t,n,e){return y(t,{matching:e[b]},"offsetTop")})),W=h("items",z,"item",(function(t,n){return i(n.matching||t.children,t)})),k=h("rows",z,"row",(function(t,n){return y(t,n,"offsetTop")})),D=h("cols",z,"col",(function(t,n){return y(t,n,"offsetLeft")})),X=h("grid",["rows","cols"]),x="layout",G=h(x,z,z,(function(t,n){var c=n.rows=+(n.rows||s(t,"rows")||1),a=n.columns=+(n.columns||s(t,"columns")||1);if(n.image=n.image||s(t,"image")||t.currentSrc||t.src,n.image){var l=i("img",t)[0];n.image=l&&(l.currentSrc||l.src)}n.image&&e(t,"background-image","url("+n.image+")");for(var u=c*a,m=[],d=r(z,"cell-grid");u--;){var h=r(d,"cell");r(h,"cell-inner"),m.push(h)}return o(t,d),m})),Z=h("cellRows",[x],"row",(function(t,n,e){var o=n.rows,r=c(o);return a(e[x],(function(t,n,e){r[Math.floor(n/(e.length/o))].push(t)})),r})),P=h("cellColumns",[x],"col",(function(t,n,e){var o=n.columns,r=c(o);return a(e[x],(function(t,n){r[n%o].push(t)})),r})),j=h("cells",["cellRows","cellColumns"],"cell",(function(t,n,e){return e[x]}));return f(g),f(L),f(Y),f(W),f(k),f(D),f(X),f(G),f(Z),f(P),f(j),N}();class o{position=-1;cells=[];constructor(t){this.position=t}}class r{DOM={el:null};position=-1;previousCellPosition=-1;original;state;color;originalColor;cache;constructor(t,{position:n,previousCellPosition:e}={}){this.DOM.el=t,this.original=this.DOM.el.innerHTML,this.state=this.original,this.color=this.originalColor=getComputedStyle(document.documentElement).getPropertyValue("--color-text"),this.position=n,this.previousCellPosition=e}set(t){this.state=t,this.DOM.el.innerHTML=this.state}}class s{DOM={el:null};lines=[];lettersAndSymbols=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","!","@","#","$","&","*","(",")","-","_","+","=","/","[","]","{","}",";",":","<",">",",","0","1","2","3","4","5","6","7","8","9"];effects={fx1:()=>this.fx1()};totalChars=0;constructor(n){this.DOM.el=n;const s=t(e)({target:this.DOM.el,by:"lines"});s.forEach((n=>t(e)({target:n.words})));for(const[t,n]of s[0].lines.entries()){const e=new o(t);let s=[],i=0;for(const t of n)for(const n of[...t.querySelectorAll(".char")])s.push(new r(n,{position:i,previousCellPosition:0===i?-1:i-1})),++i;e.cells=s,this.lines.push(e),this.totalChars+=i}}clearCells(){for(const t of this.lines)for(const n of t.cells)n.set("&nbsp;")}getRandomChar(){return this.lettersAndSymbols[Math.floor(Math.random()*this.lettersAndSymbols.length)]}fx1(){let t=0;this.clearCells();const n=(e,o,r=0)=>{o.cache=o.state,44===r?(o.set(o.original),++t,t===this.totalChars&&(this.isAnimating=!1)):0===o.position?o.set(r<9?["*","-","'",'"'][Math.floor(4*Math.random())]:this.getRandomChar()):o.set(e.cells[o.previousCellPosition].cache),"&nbsp;"!=o.cache&&++r,r<45&&setTimeout((()=>n(e,o,r)),15)};for(const t of this.lines)for(const e of t.cells)setTimeout((()=>n(t,e)),200*(t.position+1))}trigger(t="fx1"){t in this.effects&&!this.isAnimating&&(this.isAnimating=!0,this.effects[t]())}}const i=document.createElement("template");i.innerHTML='\n  <style>\n  :host {\n    width: 100%;\n    height: 100%;\n    display: inline-block; \n    display: flow-root;\n    min-height: 100vh;\n    background: black repeat left center;\n    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAtoAAALaCAMAAAA4MAQBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDcuMi1jMDAwIDc5LjFiNjVhNzliNCwgMjAyMi8wNi8xMy0yMjowMTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIzLjUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Qzc4QzY5MTY0NjdFMTFFRDhBQTREMTU2NDdGMUM4NDkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Qzc4QzY5MTc0NjdFMTFFRDhBQTREMTU2NDdGMUM4NDkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MkJFOURGRjQ2NzkxMUVEOEFBNEQxNTY0N0YxQzg0OSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2MkJFOUUwMDQ2NzkxMUVEOEFBNEQxNTY0N0YxQzg0OSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtDDggoAAABdUExURSYm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");\n    background-size: 365px 365px;\n  }\n</style><slot/>\n';class c extends HTMLElement{constructor(){super()}connectedCallback(){this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(i.content.cloneNode(!0))}}const a=document.createElement("template");a.innerHTML="\n  <style>\n  :host {\n    display: block;\n  }\n</style><slot/>\n";class l extends HTMLElement{constructor(){super()}connectedCallback(){this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(a.content.cloneNode(!0))}}const u=document.createElement("template");u.innerHTML="\n  <style>\n  :host {\n    display: block;\n    opacity: 0.4\n  }\n</style><slot/>\n";class m extends HTMLElement{constructor(){super()}connectedCallback(){this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(u.content.cloneNode(!0))}}const d=document.createElement("template");d.innerHTML="\n  <style>    \n  :host::before,\n  :host::after {\n      content: '';\n      position: fixed;\n      z-index: 1000;\n  }\n\n  :host::before {\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      background: var(--color-bg);\n  }\n\n  :host::after {\n      top: 50%;\n      left: 50%;\n      width: 60px;\n      height: 60px;\n      margin: -30px 0 0 -30px;\n      border-radius: 50%;\n      opacity: 0.4;\n      background: var(--color-link);\n      animation: loaderAnim 0.7s linear infinite alternate forwards;\n  }\n</style><slot/>\n";class h extends HTMLElement{constructor(){super()}connectedCallback(){this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(d.content.cloneNode(!0))}}window.customElements.define("haiku-text",l),window.customElements.define("background-noise",c),window.customElements.define("weather-point",m),window.customElements.define("loading-spinner",h),navigator.geolocation.getCurrentPosition((async t=>{const e=t.coords.latitude.toFixed(2),o=t.coords.longitude.toFixed(2),r=document.querySelector(".coords"),i=document.querySelector("haiku-text"),c=document.querySelector("loading-spinner");try{const t=await n(e,o),{haiku:a,weather:l}=await t.json();r.innerHTML=`${e}, ${o}`,function(t){const n=document.querySelector("haiku-text"),e=t.replaceAll("\n","<br />");n.innerHTML=e}(a),function(t){const n=document.querySelector(".temperature"),e=document.querySelector(".rain"),o=document.querySelector(".wind"),r=document.querySelector(".high-clouds"),s=document.querySelector(".middle-clouds"),i=document.querySelector(".low-clouds");n.innerHTML=`${t.data.instant.details.air_temperature}°C`,e.innerHTML=`${t.data.next_1_hours.details.precipitation_amount}mm`,o.innerHTML=`${t.data.instant.details.wind_speed}m/s ${t.data.instant.details.wind_from_direction}°`,r.innerHTML=`${t.data.instant.details.cloud_area_fraction_high}%`,s.innerHTML=`${t.data.instant.details.cloud_area_fraction_medium}%`,i.innerHTML=`${t.data.instant.details.cloud_area_fraction_low}%`}(l),c.remove(),new s(i).trigger("fx1")}catch(t){document.querySelector(".haiku").innerHTML="Error getting weather...",console.error(t)}}),(t=>{document.querySelector(".haiku").innerHTML="Error getting weather. App doesnt have permission to get location.",console.error(t)}))}();