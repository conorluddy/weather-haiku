!function(){function t(t){return t&&t.__esModule?t.default:t}const e=(t,e)=>fetch(`https://0jz8lc75s6.execute-api.eu-west-1.amazonaws.com/production/?latitude=${t}&longitude=${e}`),o=(t,e)=>Math.floor(Math.random()*(e-t+1))+t;var n={};n=function(){"use strict";var t=document,e=t.createTextNode.bind(t);function o(t,e,o){t.style.setProperty(e,o)}function n(t,e){return t.appendChild(e)}function i(e,o,i,r){var s=t.createElement("span");return o&&(s.className=o),i&&(!r&&s.setAttribute("data-"+o,i),s.textContent=i),e&&n(e,s)||s}function r(t,e){return t.getAttribute("data-"+e)}function s(e,o){return e&&0!=e.length?e.nodeName?[e]:[].slice.call(e[0].nodeName?e:(o||t).querySelectorAll(e)):[]}function l(t){for(var e=[];t--;)e[t]=[];return e}function a(t,e){t&&t.some(e)}function c(t){return function(e){return t[e]}}function u(t,e,n){var i="--"+e,r=i+"-index";a(n,(function(t,e){Array.isArray(t)?a(t,(function(t){o(t,r,e)})):o(t,r,e)})),o(t,i+"-total",n.length)}var h={};function f(t,e,o){var n=o.indexOf(t);if(-1==n)o.unshift(t),a(h[t].depends,(function(e){f(e,t,o)}));else{var i=o.indexOf(e);o.splice(n,1),o.splice(i,0,t)}return o}function d(t,e,o,n){return{by:t,depends:e,key:o,split:n}}function m(t){return f(t,0,[]).map(c(h))}function p(t){h[t.by]=t}function g(t,o,r,l,c){t.normalize();var u=[],h=document.createDocumentFragment();l&&u.push(t.previousSibling);var f=[];return s(t.childNodes).some((function(t){if(!t.tagName||t.hasChildNodes()){if(t.childNodes&&t.childNodes.length)return f.push(t),void u.push.apply(u,g(t,o,r,l,c));var n=t.wholeText||"",s=n.trim();s.length&&(" "===n[0]&&f.push(e(" ")),a(s.split(r),(function(t,e){e&&c&&f.push(i(h,"whitespace"," ",c));var n=i(h,o,t);u.push(n),f.push(n)}))," "===n[n.length-1]&&f.push(e(" ")))}else f.push(t)})),a(f,(function(t){n(h,t)})),t.innerHTML="",n(t,h),u}var C=0;function y(t,e){for(var o in e)t[o]=e[o];return t}var M="words",v=d(M,C,"word",(function(t){return g(t,"word",/\s+/,0,1)})),w="chars",b=d(w,[M],"char",(function(t,e,o){var n=[];return a(o[M],(function(t,o){n.push.apply(n,g(t,"char","",e.whitespace&&o))})),n}));function T(t){var e=(t=t||{}).key;return s(t.target||"[data-splitting]").map((function(o){var n=o["🍌"];if(!t.force&&n)return n;n=o["🍌"]={el:o};var i=m(t.by||r(o,"splitting")||w),s=y({},t);return a(i,(function(t){if(t.split){var i=t.by,r=(e?"-"+e:"")+t.key,l=t.split(o,s,n);r&&u(o,r,l),n[i]=l,o.classList.add(i)}})),o.classList.add("splitting"),n}))}function x(t){var e=(t=t||{}).target=i();return e.innerHTML=t.content,T(t),e.outerHTML}function S(t,e,o){var n=s(e.matching||t.children,t),i={};return a(n,(function(t){var e=Math.round(t[o]);(i[e]||(i[e]=[])).push(t)})),Object.keys(i).map(Number).sort(L).map(c(i))}function L(t,e){return t-e}T.html=x,T.add=p;var _=d("lines",[M],"line",(function(t,e,o){return S(t,{matching:o[M]},"offsetTop")})),A=d("items",C,"item",(function(t,e){return s(e.matching||t.children,t)})),O=d("rows",C,"row",(function(t,e){return S(t,e,"offsetTop")})),$=d("cols",C,"col",(function(t,e){return S(t,e,"offsetLeft")})),D=d("grid",["rows","cols"]),H="layout",q=d(H,C,C,(function(t,e){var l=e.rows=+(e.rows||r(t,"rows")||1),a=e.columns=+(e.columns||r(t,"columns")||1);if(e.image=e.image||r(t,"image")||t.currentSrc||t.src,e.image){var c=s("img",t)[0];e.image=c&&(c.currentSrc||c.src)}e.image&&o(t,"background-image","url("+e.image+")");for(var u=l*a,h=[],f=i(C,"cell-grid");u--;){var d=i(f,"cell");i(d,"cell-inner"),h.push(d)}return n(t,f),h})),P=d("cellRows",[H],"row",(function(t,e,o){var n=e.rows,i=l(n);return a(o[H],(function(t,e,o){i[Math.floor(e/(o.length/n))].push(t)})),i})),k=d("cellColumns",[H],"col",(function(t,e,o){var n=e.columns,i=l(n);return a(o[H],(function(t,e){i[e%n].push(t)})),i})),N=d("cells",["cellRows","cellColumns"],"cell",(function(t,e,o){return o[H]}));return p(v),p(b),p(_),p(A),p(O),p($),p(D),p(q),p(P),p(k),p(N),T}();class i{position=-1;cells=[];constructor(t){this.position=t}}class r{DOM={el:null};position=-1;previousCellPosition=-1;original;state;color;originalColor;cache;constructor(t,{position:e,previousCellPosition:o}={}){this.DOM.el=t,this.original=this.DOM.el.innerHTML,this.state=this.original,this.color=this.originalColor=getComputedStyle(document.documentElement).getPropertyValue("--color-text"),this.position=e,this.previousCellPosition=o}set(t){this.state=t,this.DOM.el.innerHTML=this.state}}class s{DOM={el:null};lines=[];lettersAndSymbols=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","!","@","#","$","&","*","(",")","-","_","+","=","/","[","]","{","}",";",":","<",">",",","0","1","2","3","4","5","6","7","8","9"];effects={fx1:()=>this.fx1(),fx2:()=>this.fx2(),fx3:()=>this.fx3(),fx4:()=>this.fx4(),fx5:()=>this.fx5(),fx6:()=>this.fx6()};totalChars=0;constructor(e){this.DOM.el=e;const o=t(n)({target:this.DOM.el,by:"lines"});o.forEach((e=>t(n)({target:e.words})));for(const[t,e]of o[0].lines.entries()){const o=new i(t);let n=[],s=0;for(const t of e)for(const e of[...t.querySelectorAll(".char")])n.push(new r(e,{position:s,previousCellPosition:0===s?-1:s-1})),++s;o.cells=n,this.lines.push(o),this.totalChars+=s}}clearCells(){for(const t of this.lines)for(const e of t.cells)e.set("&nbsp;")}getRandomChar(){return this.lettersAndSymbols[Math.floor(Math.random()*this.lettersAndSymbols.length)]}fx1(){let t=0;this.clearCells();const e=(o,n,i=0)=>{n.cache=n.state,44===i?(n.set(n.original),++t,t===this.totalChars&&(this.isAnimating=!1)):0===n.position?n.set(i<9?["*","-","'",'"'][Math.floor(4*Math.random())]:this.getRandomChar()):n.set(o.cells[n.previousCellPosition].cache),"&nbsp;"!=n.cache&&++i,i<45&&setTimeout((()=>e(o,n,i)),15)};for(const t of this.lines)for(const o of t.cells)setTimeout((()=>e(t,o)),200*(t.position+1))}fx2(){let t=0;const e=(o,n,i=0)=>{19===i?(n.set(n.original),n.DOM.el.style.opacity=0,setTimeout((()=>{n.DOM.el.style.opacity=1}),300),++t,t===this.totalChars&&(this.isAnimating=!1)):n.set(this.getRandomChar()),++i<20&&setTimeout((()=>e(o,n,i)),40)};for(const t of this.lines)for(const o of t.cells)setTimeout((()=>e(t,o)),30*(o.position+1))}fx3(){let t=0;this.clearCells();const e=(o,n,i=0)=>{9===i?(n.set(n.original),++t,t===this.totalChars&&(this.isAnimating=!1)):n.set(this.getRandomChar()),++i<10&&setTimeout((()=>e(o,n,i)),80)};for(const t of this.lines)for(const n of t.cells)setTimeout((()=>e(t,n)),o(0,2e3))}fx4(){let t=0;this.clearCells();const e=(o,n,i=0)=>{n.cache=n.state,29===i?(n.set(n.original),++t,t===this.totalChars&&(this.isAnimating=!1)):0===n.position?n.set(["*",":"][Math.floor(2*Math.random())]):n.set(o.cells[n.previousCellPosition].cache),"&nbsp;"!=n.cache&&++i,i<30&&setTimeout((()=>e(o,n,i)),15)};for(const t of this.lines)for(const o of t.cells)setTimeout((()=>e(t,o)),400*Math.abs(this.lines.length/2-t.position))}fx5(){let t=0;this.clearCells();const e=(o,n,i=0)=>{n.cache={state:n.state,color:n.color},29===i?(n.color=n.originalColor,n.DOM.el.style.color=n.color,n.set(n.original),++t,t===this.totalChars&&(this.isAnimating=!1)):0===n.position?(n.color=["#3e775d","#61dca3","#61b3dc"][Math.floor(3*Math.random())],n.DOM.el.style.color=n.color,n.set(i<9?["*","-","'",'"'][Math.floor(4*Math.random())]:this.getRandomChar())):(n.set(o.cells[n.previousCellPosition].cache.state),n.color=o.cells[n.previousCellPosition].cache.color,n.DOM.el.style.color=n.color),"&nbsp;"!=n.cache.state&&++i,i<30&&setTimeout((()=>e(o,n,i)),10)};for(const t of this.lines)for(const o of t.cells)setTimeout((()=>e(t,o)),200*(t.position+1))}fx6(){let t=0;const e=(n,i,r=0)=>{i.cache={state:i.state,color:i.color},14===r?(i.set(i.original),i.color=i.originalColor,i.DOM.el.style.color=i.color,++t,t===this.totalChars&&(this.isAnimating=!1)):(i.set(this.getRandomChar()),i.color=["#2b4539","#61dca3","#61b3dc"][Math.floor(3*Math.random())],i.DOM.el.style.color=i.color),++r<15&&setTimeout((()=>e(n,i,r)),o(30,110))};for(const t of this.lines)for(const o of t.cells)setTimeout((()=>e(t,o)),80*(t.position+1))}trigger(t="fx1"){t in this.effects&&!this.isAnimating&&(this.isAnimating=!0,this.effects[t]())}}navigator.geolocation.getCurrentPosition((async function(t){const o=t.coords.latitude.toFixed(2),n=t.coords.longitude.toFixed(2),i=document.querySelector(".coords"),r=document.querySelector(".content"),l=new s(r);try{const t=await e(o,n),r=await t.json();document.body.classList.remove("loading"),i.innerHTML=`${o}, ${n}`,function(t){const e=document.querySelector(".haiku"),[o,n,i,r,s,l]=haikuJson.haiku.split("\n");e.innerHTML=`${o} <br> ${n} <br> ${i} <br> ${r} <br> ${s} <br> ${l}`}(r.haiku),a=r.weather,temperatureContainer=document.querySelector(".temperature"),speedContainer=document.querySelector(".speed"),windContainer=document.querySelector(".wind"),highCloudsContainer=document.querySelector(".highClouds"),middleCloudsContainer=document.querySelector(".middleClouds"),lowCloudsContainer=document.querySelector(".lowClouds"),temperatureContainer.innerHTML=`${a.data.instant.details.air_temperature}°C`,rainContainer.innerHTML=`${a.data.next_1_hours.details.precipitation_amount}mm`,windContainer.innerHTML=`${a.data.instant.details.wind_speed}m/s ${a.data.instant.details.wind_from_direction}°`,highCloudsContainer.innerHTML=`${a.data.instant.details.cloud_area_fraction_high}%`,middleCloudsContainer.innerHTML=`${a.data.instant.details.cloud_area_fraction_medium}%`,lowCloudsContainer.innerHTML=`${a.data.instant.details.cloud_area_fraction_low}%`,l.trigger("fx3")}catch(t){document.querySelector(".haiku").innerHTML="Error getting weather, probably don't have permission to get your location.",console.error(t)}var a}),(function(t){document.querySelector(".haiku").innerHTML="Error getting weather, probably don't have permission to get your location.",console.error(t)}))}();