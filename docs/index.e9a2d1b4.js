function t(t){return t&&t.__esModule?t.default:t}const e=(t,e)=>fetch(`https://0jz8lc75s6.execute-api.eu-west-1.amazonaws.com/production/?latitude=${t}&longitude=${e}`);var n={};n=function(){var t=document,e=t.createTextNode.bind(t);function n(t,e,n){t.style.setProperty(e,n)}function o(t,e){return t.appendChild(e)}function r(e,n,r,i){var s=t.createElement("span");return n&&(s.className=n),r&&(!i&&s.setAttribute("data-"+n,r),s.textContent=r),e&&o(e,s)||s}function i(t,e){return t.getAttribute("data-"+e)}function s(e,n){return e&&0!=e.length?e.nodeName?[e]:[].slice.call(e[0].nodeName?e:(n||t).querySelectorAll(e)):[]}function a(t){for(var e=[];t--;)e[t]=[];return e}function c(t,e){t&&t.some(e)}function l(t){return function(e){return t[e]}}function u(t,e,o){var r="--"+e,i=r+"-index";c(o,(function(t,e){Array.isArray(t)?c(t,(function(t){n(t,i,e)})):n(t,i,e)})),n(t,r+"-total",o.length)}var d={};function h(t,e,n){var o=n.indexOf(t);if(-1==o)n.unshift(t),c(d[t].depends,(function(e){h(e,t,n)}));else{var r=n.indexOf(e);n.splice(o,1),n.splice(r,0,t)}return n}function f(t,e,n,o){return{by:t,depends:e,key:n,split:o}}function m(t){return h(t,0,[]).map(l(d))}function p(t){d[t.by]=t}function g(t,n,i,a,l){t.normalize();var u=[],d=document.createDocumentFragment();a&&u.push(t.previousSibling);var h=[];return s(t.childNodes).some((function(t){if(!t.tagName||t.hasChildNodes()){if(t.childNodes&&t.childNodes.length)return h.push(t),void u.push.apply(u,g(t,n,i,a,l));var o=t.wholeText||"",s=o.trim();s.length&&(" "===o[0]&&h.push(e(" ")),c(s.split(i),(function(t,e){e&&l&&h.push(r(d,"whitespace"," ",l));var o=r(d,n,t);u.push(o),h.push(o)}))," "===o[o.length-1]&&h.push(e(" ")))}else h.push(t)})),c(h,(function(t){o(d,t)})),t.innerHTML="",o(t,d),u}var v=0;function y(t,e){for(var n in e)t[n]=e[n];return t}var w="words",M=f(w,v,"word",(function(t){return g(t,"word",/\s+/,0,1)})),C="chars",T=f(C,[w],"char",(function(t,e,n){var o=[];return c(n[w],(function(t,n){o.push.apply(o,g(t,"char","",e.whitespace&&n))})),o}));function S(t){var e=(t=t||{}).key;return s(t.target||"[data-splitting]").map((function(n){var o=n["🍌"];if(!t.force&&o)return o;o=n["🍌"]={el:n};var r=m(t.by||i(n,"splitting")||C),s=y({},t);return c(r,(function(t){if(t.split){var r=t.by,i=(e?"-"+e:"")+t.key,a=t.split(n,s,o);i&&u(n,i,a),o[r]=a,n.classList.add(r)}})),n.classList.add("splitting"),o}))}function b(t){var e=(t=t||{}).target=r();return e.innerHTML=t.content,S(t),e.outerHTML}function L(t,e,n){var o=s(e.matching||t.children,t),r={};return c(o,(function(t){var e=Math.round(t[n]);(r[e]||(r[e]=[])).push(t)})),Object.keys(r).map(Number).sort(_).map(l(r))}function _(t,e){return t-e}S.html=b,S.add=p;var x=f("lines",[w],"line",(function(t,e,n){return L(t,{matching:n[w]},"offsetTop")})),H=f("items",v,"item",(function(t,e){return s(e.matching||t.children,t)})),$=f("rows",v,"row",(function(t,e){return L(t,e,"offsetTop")})),A=f("cols",v,"col",(function(t,e){return L(t,e,"offsetLeft")})),q=f("grid",["rows","cols"]),N="layout",O=f(N,v,v,(function(t,e){var a=e.rows=+(e.rows||i(t,"rows")||1),c=e.columns=+(e.columns||i(t,"columns")||1);if(e.image=e.image||i(t,"image")||t.currentSrc||t.src,e.image){var l=s("img",t)[0];e.image=l&&(l.currentSrc||l.src)}e.image&&n(t,"background-image","url("+e.image+")");for(var u=a*c,d=[],h=r(v,"cell-grid");u--;){var f=r(h,"cell");r(f,"cell-inner"),d.push(f)}return o(t,h),d})),k=f("cellRows",[N],"row",(function(t,e,n){var o=e.rows,r=a(o);return c(n[N],(function(t,e,n){r[Math.floor(e/(n.length/o))].push(t)})),r})),D=f("cellColumns",[N],"col",(function(t,e,n){var o=e.columns,r=a(o);return c(n[N],(function(t,e){r[e%o].push(t)})),r})),P=f("cells",["cellRows","cellColumns"],"cell",(function(t,e,n){return n[N]}));return p(M),p(T),p(x),p(H),p($),p(A),p(q),p(O),p(k),p(D),p(P),S}();class o{position=-1;cells=[];constructor(t){this.position=t}}class r{DOM={el:null};position=-1;previousCellPosition=-1;original;state;color;originalColor;cache;constructor(t,{position:e,previousCellPosition:n}={}){this.DOM.el=t,this.original=this.DOM.el.innerHTML,this.state=this.original,this.color=this.originalColor=getComputedStyle(document.documentElement).getPropertyValue("--color-text"),this.position=e,this.previousCellPosition=n}set(t){this.state=t,this.DOM.el.innerHTML=this.state}}class i{DOM={el:null};lines=[];lettersAndSymbols=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","!","@","#","$","&","*","(",")","-","_","+","=","/","[","]","{","}",";",":","<",">",",","0","1","2","3","4","5","6","7","8","9"];effects={fx1:()=>this.fx1()};totalChars=0;constructor(e){this.DOM.el=e;const i=t(n)({target:this.DOM.el,by:"lines"});i.forEach((e=>t(n)({target:e.words})));for(const[t,e]of i[0].lines.entries()){const n=new o(t);let i=[],s=0;for(const t of e)for(const e of[...t.querySelectorAll(".char")])i.push(new r(e,{position:s,previousCellPosition:0===s?-1:s-1})),++s;n.cells=i,this.lines.push(n),this.totalChars+=s}}clearCells(){for(const t of this.lines)for(const e of t.cells)e.set("&nbsp;")}getRandomChar(){return this.lettersAndSymbols[Math.floor(Math.random()*this.lettersAndSymbols.length)]}fx1(){let t=0;this.clearCells();const e=(n,o,r=0)=>{o.cache=o.state,44===r?(o.set(o.original),++t,t===this.totalChars&&(this.isAnimating=!1)):0===o.position?o.set(r<9?["*","-","'",'"'][Math.floor(4*Math.random())]:this.getRandomChar()):o.set(n.cells[o.previousCellPosition].cache),"&nbsp;"!=o.cache&&++r,r<45&&setTimeout((()=>e(n,o,r)),15)};for(const t of this.lines)for(const n of t.cells)setTimeout((()=>e(t,n)),200*(t.position+1))}trigger(t="fx1"){t in this.effects&&!this.isAnimating&&(this.isAnimating=!0,this.effects[t]())}}navigator.geolocation.getCurrentPosition((async function(t){const n=t.coords.latitude.toFixed(2),o=t.coords.longitude.toFixed(2),r=document.querySelector(".coords"),s=document.querySelector(".content");try{const t=await e(n,o),{haiku:a,weather:c}=await t.json();document.body.classList.remove("loading"),r.innerHTML=`${n}, ${o}`,function(t){const e=document.querySelector(".haiku"),[n,o,r]=t.split("\n");e.innerHTML=`${n} <br> ${o} <br> ${r}`}(a),function(t){const e=document.querySelector(".temperature span:last-child"),n=document.querySelector(".rain span:last-child"),o=document.querySelector(".wind span:last-child"),r=document.querySelector(".high-clouds span:last-child"),i=document.querySelector(".middle-clouds span:last-child"),s=document.querySelector(".low-clouds span:last-child");e.innerHTML=`${t.data.instant.details.air_temperature}°C`,n.innerHTML=`${t.data.next_1_hours.details.precipitation_amount}mm`,o.innerHTML=`${t.data.instant.details.wind_speed}m/s ${t.data.instant.details.wind_from_direction}°`,r.innerHTML=`${t.data.instant.details.cloud_area_fraction_high}%`,i.innerHTML=`${t.data.instant.details.cloud_area_fraction_medium}%`,s.innerHTML=`${t.data.instant.details.cloud_area_fraction_low}%`}(c),new i(s).trigger("fx1")}catch(t){document.querySelector(".haiku").innerHTML="Error getting weather...",console.error(t)}}),(function(t){document.querySelector(".haiku").innerHTML="Error getting weather. App doesnt have permission to get location.",console.error(t)}));