function t(t){return t&&t.__esModule?t.default:t}const o=(t,o)=>fetch(`https://0jz8lc75s6.execute-api.eu-west-1.amazonaws.com/production/?latitude=${t}&longitude=${o}`),e=(t,o)=>Math.floor(Math.random()*(o-t+1))+t;var n={};n=function(){var t=document,o=t.createTextNode.bind(t);function e(t,o,e){t.style.setProperty(o,e)}function n(t,o){return t.appendChild(o)}function s(o,e,s,i){var r=t.createElement("span");return e&&(r.className=e),s&&(!i&&r.setAttribute("data-"+e,s),r.textContent=s),o&&n(o,r)||r}function i(t,o){return t.getAttribute("data-"+o)}function r(o,e){return o&&0!=o.length?o.nodeName?[o]:[].slice.call(o[0].nodeName?o:(e||t).querySelectorAll(o)):[]}function l(t){for(var o=[];t--;)o[t]=[];return o}function c(t,o){t&&t.some(o)}function a(t){return function(o){return t[o]}}function u(t,o,n){var s="--"+o,i=s+"-index";c(n,(function(t,o){Array.isArray(t)?c(t,(function(t){e(t,i,o)})):e(t,i,o)})),e(t,s+"-total",n.length)}var h={};function f(t,o,e){var n=e.indexOf(t);if(-1==n)e.unshift(t),c(h[t].depends,(function(o){f(o,t,e)}));else{var s=e.indexOf(o);e.splice(n,1),e.splice(s,0,t)}return e}function m(t,o,e,n){return{by:t,depends:o,key:e,split:n}}function d(t){return f(t,0,[]).map(a(h))}function p(t){h[t.by]=t}function g(t,e,i,l,a){t.normalize();var u=[],h=document.createDocumentFragment();l&&u.push(t.previousSibling);var f=[];return r(t.childNodes).some((function(t){if(!t.tagName||t.hasChildNodes()){if(t.childNodes&&t.childNodes.length)return f.push(t),void u.push.apply(u,g(t,e,i,l,a));var n=t.wholeText||"",r=n.trim();r.length&&(" "===n[0]&&f.push(o(" ")),c(r.split(i),(function(t,o){o&&a&&f.push(s(h,"whitespace"," ",a));var n=s(h,e,t);u.push(n),f.push(n)}))," "===n[n.length-1]&&f.push(o(" ")))}else f.push(t)})),c(f,(function(t){n(h,t)})),t.innerHTML="",n(t,h),u}var v=0;function y(t,o){for(var e in o)t[e]=o[e];return t}var M="words",C=m(M,v,"word",(function(t){return g(t,"word",/\s+/,0,1)})),b="chars",x=m(b,[M],"char",(function(t,o,e){var n=[];return c(e[M],(function(t,e){n.push.apply(n,g(t,"char","",o.whitespace&&e))})),n}));function T(t){var o=(t=t||{}).key;return r(t.target||"[data-splitting]").map((function(e){var n=e["🍌"];if(!t.force&&n)return n;n=e["🍌"]={el:e};var s=d(t.by||i(e,"splitting")||b),r=y({},t);return c(s,(function(t){if(t.split){var s=t.by,i=(o?"-"+o:"")+t.key,l=t.split(e,r,n);i&&u(e,i,l),n[s]=l,e.classList.add(s)}})),e.classList.add("splitting"),n}))}function w(t){var o=(t=t||{}).target=s();return o.innerHTML=t.content,T(t),o.outerHTML}function A(t,o,e){var n=r(o.matching||t.children,t),s={};return c(n,(function(t){var o=Math.round(t[e]);(s[o]||(s[o]=[])).push(t)})),Object.keys(s).map(Number).sort(O).map(a(s))}function O(t,o){return t-o}T.html=w,T.add=p;var D=m("lines",[M],"line",(function(t,o,e){return A(t,{matching:e[M]},"offsetTop")})),S=m("items",v,"item",(function(t,o){return r(o.matching||t.children,t)})),L=m("rows",v,"row",(function(t,o){return A(t,o,"offsetTop")})),P=m("cols",v,"col",(function(t,o){return A(t,o,"offsetLeft")})),N=m("grid",["rows","cols"]),H="layout",k=m(H,v,v,(function(t,o){var l=o.rows=+(o.rows||i(t,"rows")||1),c=o.columns=+(o.columns||i(t,"columns")||1);if(o.image=o.image||i(t,"image")||t.currentSrc||t.src,o.image){var a=r("img",t)[0];o.image=a&&(a.currentSrc||a.src)}o.image&&e(t,"background-image","url("+o.image+")");for(var u=l*c,h=[],f=s(v,"cell-grid");u--;){var m=s(f,"cell");s(m,"cell-inner"),h.push(m)}return n(t,f),h})),R=m("cellRows",[H],"row",(function(t,o,e){var n=o.rows,s=l(n);return c(e[H],(function(t,o,e){s[Math.floor(o/(e.length/n))].push(t)})),s})),$=m("cellColumns",[H],"col",(function(t,o,e){var n=o.columns,s=l(n);return c(e[H],(function(t,o){s[o%n].push(t)})),s})),q=m("cells",["cellRows","cellColumns"],"cell",(function(t,o,e){return e[H]}));return p(C),p(x),p(D),p(S),p(L),p(P),p(N),p(k),p(R),p($),p(q),T}();class s{position=-1;cells=[];constructor(t){this.position=t}}class i{DOM={el:null};position=-1;previousCellPosition=-1;original;state;color;originalColor;cache;constructor(t,{position:o,previousCellPosition:e}={}){this.DOM.el=t,this.original=this.DOM.el.innerHTML,this.state=this.original,this.color=this.originalColor=getComputedStyle(document.documentElement).getPropertyValue("--color-text"),this.position=o,this.previousCellPosition=e}set(t){this.state=t,this.DOM.el.innerHTML=this.state}}class r{DOM={el:null};lines=[];lettersAndSymbols=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","!","@","#","$","&","*","(",")","-","_","+","=","/","[","]","{","}",";",":","<",">",",","0","1","2","3","4","5","6","7","8","9"];effects={fx1:()=>this.fx1(),fx2:()=>this.fx2(),fx3:()=>this.fx3(),fx4:()=>this.fx4(),fx5:()=>this.fx5(),fx6:()=>this.fx6()};totalChars=0;constructor(o){this.DOM.el=o;const e=t(n)({target:this.DOM.el,by:"lines"});e.forEach((o=>t(n)({target:o.words})));for(const[t,o]of e[0].lines.entries()){const e=new s(t);let n=[],r=0;for(const t of o)for(const o of[...t.querySelectorAll(".char")])n.push(new i(o,{position:r,previousCellPosition:0===r?-1:r-1})),++r;e.cells=n,this.lines.push(e),this.totalChars+=r}}clearCells(){for(const t of this.lines)for(const o of t.cells)o.set("&nbsp;")}getRandomChar(){return this.lettersAndSymbols[Math.floor(Math.random()*this.lettersAndSymbols.length)]}fx1(){let t=0;this.clearCells();const o=(e,n,s=0)=>{n.cache=n.state,44===s?(n.set(n.original),++t,t===this.totalChars&&(this.isAnimating=!1)):0===n.position?n.set(s<9?["*","-","'",'"'][Math.floor(4*Math.random())]:this.getRandomChar()):n.set(e.cells[n.previousCellPosition].cache),"&nbsp;"!=n.cache&&++s,s<45&&setTimeout((()=>o(e,n,s)),15)};for(const t of this.lines)for(const e of t.cells)setTimeout((()=>o(t,e)),200*(t.position+1))}fx2(){let t=0;const o=(e,n,s=0)=>{19===s?(n.set(n.original),n.DOM.el.style.opacity=0,setTimeout((()=>{n.DOM.el.style.opacity=1}),300),++t,t===this.totalChars&&(this.isAnimating=!1)):n.set(this.getRandomChar()),++s<20&&setTimeout((()=>o(e,n,s)),40)};for(const t of this.lines)for(const e of t.cells)setTimeout((()=>o(t,e)),30*(e.position+1))}fx3(){let t=0;this.clearCells();const o=(e,n,s=0)=>{9===s?(n.set(n.original),++t,t===this.totalChars&&(this.isAnimating=!1)):n.set(this.getRandomChar()),++s<10&&setTimeout((()=>o(e,n,s)),80)};for(const t of this.lines)for(const n of t.cells)setTimeout((()=>o(t,n)),e(0,2e3))}fx4(){let t=0;this.clearCells();const o=(e,n,s=0)=>{n.cache=n.state,29===s?(n.set(n.original),++t,t===this.totalChars&&(this.isAnimating=!1)):0===n.position?n.set(["*",":"][Math.floor(2*Math.random())]):n.set(e.cells[n.previousCellPosition].cache),"&nbsp;"!=n.cache&&++s,s<30&&setTimeout((()=>o(e,n,s)),15)};for(const t of this.lines)for(const e of t.cells)setTimeout((()=>o(t,e)),400*Math.abs(this.lines.length/2-t.position))}fx5(){let t=0;this.clearCells();const o=(e,n,s=0)=>{n.cache={state:n.state,color:n.color},29===s?(n.color=n.originalColor,n.DOM.el.style.color=n.color,n.set(n.original),++t,t===this.totalChars&&(this.isAnimating=!1)):0===n.position?(n.color=["#3e775d","#61dca3","#61b3dc"][Math.floor(3*Math.random())],n.DOM.el.style.color=n.color,n.set(s<9?["*","-","'",'"'][Math.floor(4*Math.random())]:this.getRandomChar())):(n.set(e.cells[n.previousCellPosition].cache.state),n.color=e.cells[n.previousCellPosition].cache.color,n.DOM.el.style.color=n.color),"&nbsp;"!=n.cache.state&&++s,s<30&&setTimeout((()=>o(e,n,s)),10)};for(const t of this.lines)for(const e of t.cells)setTimeout((()=>o(t,e)),200*(t.position+1))}fx6(){let t=0;const o=(n,s,i=0)=>{s.cache={state:s.state,color:s.color},14===i?(s.set(s.original),s.color=s.originalColor,s.DOM.el.style.color=s.color,++t,t===this.totalChars&&(this.isAnimating=!1)):(s.set(this.getRandomChar()),s.color=["#2b4539","#61dca3","#61b3dc"][Math.floor(3*Math.random())],s.DOM.el.style.color=s.color),++i<15&&setTimeout((()=>o(n,s,i)),e(30,110))};for(const t of this.lines)for(const e of t.cells)setTimeout((()=>o(t,e)),80*(t.position+1))}trigger(t="fx1"){t in this.effects&&!this.isAnimating&&(this.isAnimating=!0,this.effects[t]())}}navigator.geolocation.getCurrentPosition((async function(t){const e=t.coords.latitude.toFixed(2),n=t.coords.longitude.toFixed(2),s=document.querySelector(".coords"),i=document.querySelector(".haiku"),l=document.querySelector(".content"),c=new r(l);try{const t=await o(e,n),r=await t.json(),[l,a,u]=r.haiku.split("\n");document.body.classList.remove("loading"),s.innerHTML=`${e}, ${n}`,i.innerHTML=`${l} <br> ${a} <br> ${u}`,c.trigger("fx3")}catch(t){document.querySelector(".haiku").innerHTML="Error getting weather, probably don't have permission to get your location.",console.error(t)}}),(function(t){document.querySelector(".haiku").innerHTML="Error getting weather, probably don't have permission to get your location.",console.error(t)}));