!function(){function t(t){return t&&t.__esModule?t.default:t}const e=(t,e)=>fetch(`https://0jz8lc75s6.execute-api.eu-west-1.amazonaws.com/production/?latitude=${t}&longitude=${e}`);var n={};n=function(){"use strict";var t=document,e=t.createTextNode.bind(t);function n(t,e,n){t.style.setProperty(e,n)}function o(t,e){return t.appendChild(e)}function r(e,n,r,i){var s=t.createElement("span");return n&&(s.className=n),r&&(!i&&s.setAttribute("data-"+n,r),s.textContent=r),e&&o(e,s)||s}function i(t,e){return t.getAttribute("data-"+e)}function s(e,n){return e&&0!=e.length?e.nodeName?[e]:[].slice.call(e[0].nodeName?e:(n||t).querySelectorAll(e)):[]}function c(t){for(var e=[];t--;)e[t]=[];return e}function a(t,e){t&&t.some(e)}function l(t){return function(e){return t[e]}}function u(t,e,o){var r="--"+e,i=r+"-index";a(o,(function(t,e){Array.isArray(t)?a(t,(function(t){n(t,i,e)})):n(t,i,e)})),n(t,r+"-total",o.length)}var d={};function f(t,e,n){var o=n.indexOf(t);if(-1==o)n.unshift(t),a(d[t].depends,(function(e){f(e,t,n)}));else{var r=n.indexOf(e);n.splice(o,1),n.splice(r,0,t)}return n}function h(t,e,n,o){return{by:t,depends:e,key:n,split:o}}function m(t){return f(t,0,[]).map(l(d))}function p(t){d[t.by]=t}function g(t,n,i,c,l){t.normalize();var u=[],d=document.createDocumentFragment();c&&u.push(t.previousSibling);var f=[];return s(t.childNodes).some((function(t){if(!t.tagName||t.hasChildNodes()){if(t.childNodes&&t.childNodes.length)return f.push(t),void u.push.apply(u,g(t,n,i,c,l));var o=t.wholeText||"",s=o.trim();s.length&&(" "===o[0]&&f.push(e(" ")),a(s.split(i),(function(t,e){e&&l&&f.push(r(d,"whitespace"," ",l));var o=r(d,n,t);u.push(o),f.push(o)}))," "===o[o.length-1]&&f.push(e(" ")))}else f.push(t)})),a(f,(function(t){o(d,t)})),t.innerHTML="",o(t,d),u}var v=0;function y(t,e){for(var n in e)t[n]=e[n];return t}var w="words",M=h(w,v,"word",(function(t){return g(t,"word",/\s+/,0,1)})),C="chars",S=h(C,[w],"char",(function(t,e,n){var o=[];return a(n[w],(function(t,n){o.push.apply(o,g(t,"char","",e.whitespace&&n))})),o}));function T(t){var e=(t=t||{}).key;return s(t.target||"[data-splitting]").map((function(n){var o=n["🍌"];if(!t.force&&o)return o;o=n["🍌"]={el:n};var r=m(t.by||i(n,"splitting")||C),s=y({},t);return a(r,(function(t){if(t.split){var r=t.by,i=(e?"-"+e:"")+t.key,c=t.split(n,s,o);i&&u(n,i,c),o[r]=c,n.classList.add(r)}})),n.classList.add("splitting"),o}))}function b(t){var e=(t=t||{}).target=r();return e.innerHTML=t.content,T(t),e.outerHTML}function L(t,e,n){var o=s(e.matching||t.children,t),r={};return a(o,(function(t){var e=Math.round(t[n]);(r[e]||(r[e]=[])).push(t)})),Object.keys(r).map(Number).sort(_).map(l(r))}function _(t,e){return t-e}T.html=b,T.add=p;var x=h("lines",[w],"line",(function(t,e,n){return L(t,{matching:n[w]},"offsetTop")})),H=h("items",v,"item",(function(t,e){return s(e.matching||t.children,t)})),$=h("rows",v,"row",(function(t,e){return L(t,e,"offsetTop")})),q=h("cols",v,"col",(function(t,e){return L(t,e,"offsetLeft")})),A=h("grid",["rows","cols"]),N="layout",O=h(N,v,v,(function(t,e){var c=e.rows=+(e.rows||i(t,"rows")||1),a=e.columns=+(e.columns||i(t,"columns")||1);if(e.image=e.image||i(t,"image")||t.currentSrc||t.src,e.image){var l=s("img",t)[0];e.image=l&&(l.currentSrc||l.src)}e.image&&n(t,"background-image","url("+e.image+")");for(var u=c*a,d=[],f=r(v,"cell-grid");u--;){var h=r(f,"cell");r(h,"cell-inner"),d.push(h)}return o(t,f),d})),k=h("cellRows",[N],"row",(function(t,e,n){var o=e.rows,r=c(o);return a(n[N],(function(t,e,n){r[Math.floor(e/(n.length/o))].push(t)})),r})),D=h("cellColumns",[N],"col",(function(t,e,n){var o=e.columns,r=c(o);return a(n[N],(function(t,e){r[e%o].push(t)})),r})),P=h("cells",["cellRows","cellColumns"],"cell",(function(t,e,n){return n[N]}));return p(M),p(S),p(x),p(H),p($),p(q),p(A),p(O),p(k),p(D),p(P),T}();class o{position=-1;cells=[];constructor(t){this.position=t}}class r{DOM={el:null};position=-1;previousCellPosition=-1;original;state;color;originalColor;cache;constructor(t,{position:e,previousCellPosition:n}={}){this.DOM.el=t,this.original=this.DOM.el.innerHTML,this.state=this.original,this.color=this.originalColor=getComputedStyle(document.documentElement).getPropertyValue("--color-text"),this.position=e,this.previousCellPosition=n}set(t){this.state=t,this.DOM.el.innerHTML=this.state}}class i{DOM={el:null};lines=[];lettersAndSymbols=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","!","@","#","$","&","*","(",")","-","_","+","=","/","[","]","{","}",";",":","<",">",",","0","1","2","3","4","5","6","7","8","9"];effects={fx1:()=>this.fx1()};totalChars=0;constructor(e){this.DOM.el=e;const i=t(n)({target:this.DOM.el,by:"lines"});i.forEach((e=>t(n)({target:e.words})));for(const[t,e]of i[0].lines.entries()){const n=new o(t);let i=[],s=0;for(const t of e)for(const e of[...t.querySelectorAll(".char")])i.push(new r(e,{position:s,previousCellPosition:0===s?-1:s-1})),++s;n.cells=i,this.lines.push(n),this.totalChars+=s}}clearCells(){for(const t of this.lines)for(const e of t.cells)e.set("&nbsp;")}getRandomChar(){return this.lettersAndSymbols[Math.floor(Math.random()*this.lettersAndSymbols.length)]}fx1(){let t=0;this.clearCells();const e=(n,o,r=0)=>{o.cache=o.state,44===r?(o.set(o.original),++t,t===this.totalChars&&(this.isAnimating=!1)):0===o.position?o.set(r<9?["*","-","'",'"'][Math.floor(4*Math.random())]:this.getRandomChar()):o.set(n.cells[o.previousCellPosition].cache),"&nbsp;"!=o.cache&&++r,r<45&&setTimeout((()=>e(n,o,r)),15)};for(const t of this.lines)for(const n of t.cells)setTimeout((()=>e(t,n)),200*(t.position+1))}trigger(t="fx1"){t in this.effects&&!this.isAnimating&&(this.isAnimating=!0,this.effects[t]())}}navigator.geolocation.getCurrentPosition((async function(t){const n=t.coords.latitude.toFixed(2),o=t.coords.longitude.toFixed(2),r=document.querySelector(".coords"),s=document.querySelector(".content"),c=document.querySelector(".sub-content");try{const t=await e(n,o),{haiku:a,weather:l}=await t.json();document.body.classList.remove("loading"),r.innerHTML=`${n}, ${o}`,function(t){const e=document.querySelector(".haiku"),[n,o,r]=t.split("\n");e.innerHTML=`${n} <br> ${o} <br> ${r}`}(a),function(t){const e=document.querySelector(".temperature"),n=document.querySelector(".rain"),o=document.querySelector(".wind"),r=document.querySelector(".highClouds"),i=document.querySelector(".middleClouds"),s=document.querySelector(".lowClouds");e.innerHTML=`${t.data.instant.details.air_temperature}°C`,n.innerHTML=`${t.data.next_1_hours.details.precipitation_amount}mm`,o.innerHTML=`${t.data.instant.details.wind_speed}m/s ${t.data.instant.details.wind_from_direction}°`,r.innerHTML=`${t.data.instant.details.cloud_area_fraction_high}%`,i.innerHTML=`${t.data.instant.details.cloud_area_fraction_medium}%`,s.innerHTML=`${t.data.instant.details.cloud_area_fraction_low}%`}(l),new i(s).trigger("fx1"),new i(c).trigger("fx1")}catch(t){document.querySelector(".haiku").innerHTML="Error getting weather...",console.error(t)}}),(function(t){document.querySelector(".haiku").innerHTML="Error getting weather. App doesnt have permission to get location.",console.error(t)}))}();