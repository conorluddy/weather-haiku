function t(t){return t&&t.__esModule?t.default:t}var e={};e=function(){var t=document,e=t.createTextNode.bind(t);function n(t,e,n){t.style.setProperty(e,n)}function i(t,e){return t.appendChild(e)}function r(e,n,r,o){var a=t.createElement("span");return n&&(a.className=n),r&&(!o&&a.setAttribute("data-"+n,r),a.textContent=r),e&&i(e,a)||a}function o(t,e){return t.getAttribute("data-"+e)}function a(e,n){return e&&0!=e.length?e.nodeName?[e]:[].slice.call(e[0].nodeName?e:(n||t).querySelectorAll(e)):[]}function s(t){for(var e=[];t--;)e[t]=[];return e}function l(t,e){t&&t.some(e)}function c(t){return function(e){return t[e]}}function u(t,e,i){var r="--"+e,o=r+"-index";l(i,(function(t,e){Array.isArray(t)?l(t,(function(t){n(t,o,e)})):n(t,o,e)})),n(t,r+"-total",i.length)}var d={};function h(t,e,n){var i=n.indexOf(t);if(-1==i)n.unshift(t),l(d[t].depends,(function(e){h(e,t,n)}));else{var r=n.indexOf(e);n.splice(i,1),n.splice(r,0,t)}return n}function f(t,e,n,i){return{by:t,depends:e,key:n,split:i}}function m(t){return h(t,0,[]).map(c(d))}function p(t){d[t.by]=t}function _(t,n,o,s,c){t.normalize();var u=[],d=document.createDocumentFragment();s&&u.push(t.previousSibling);var h=[];return a(t.childNodes).some((function(t){if(!t.tagName||t.hasChildNodes()){if(t.childNodes&&t.childNodes.length)return h.push(t),void u.push.apply(u,_(t,n,o,s,c));var i=t.wholeText||"",a=i.trim();a.length&&(" "===i[0]&&h.push(e(" ")),l(a.split(o),(function(t,e){e&&c&&h.push(r(d,"whitespace"," ",c));var i=r(d,n,t);u.push(i),h.push(i)}))," "===i[i.length-1]&&h.push(e(" ")))}else h.push(t)})),l(h,(function(t){i(d,t)})),t.innerHTML="",i(t,d),u}var g=0;function y(t,e){for(var n in e)t[n]=e[n];return t}var v="words",w=f(v,g,"word",(function(t){return _(t,"word",/\s+/,0,1)})),b="chars",M=f(b,[v],"char",(function(t,e,n){var i=[];return l(n[v],(function(t,n){i.push.apply(i,_(t,"char","",e.whitespace&&n))})),i}));function x(t){var e=(t=t||{}).key;return a(t.target||"[data-splitting]").map((function(n){var i=n["🍌"];if(!t.force&&i)return i;i=n["🍌"]={el:n};var r=m(t.by||o(n,"splitting")||b),a=y({},t);return l(r,(function(t){if(t.split){var r=t.by,o=(e?"-"+e:"")+t.key,s=t.split(n,a,i);o&&u(n,o,s),i[r]=s,n.classList.add(r)}})),n.classList.add("splitting"),i}))}function C(t){var e=(t=t||{}).target=r();return e.innerHTML=t.content,x(t),e.outerHTML}function T(t,e,n){var i=a(e.matching||t.children,t),r={};return l(i,(function(t){var e=Math.round(t[n]);(r[e]||(r[e]=[])).push(t)})),Object.keys(r).map(Number).sort(L).map(c(r))}function L(t,e){return t-e}x.html=C,x.add=p;var S=f("lines",[v],"line",(function(t,e,n){return T(t,{matching:n[v]},"offsetTop")})),H=f("items",g,"item",(function(t,e){return a(e.matching||t.children,t)})),q=f("rows",g,"row",(function(t,e){return T(t,e,"offsetTop")})),A=f("cols",g,"col",(function(t,e){return T(t,e,"offsetLeft")})),$=f("grid",["rows","cols"]),k="layout",N=f(k,g,g,(function(t,e){var s=e.rows=+(e.rows||o(t,"rows")||1),l=e.columns=+(e.columns||o(t,"columns")||1);if(e.image=e.image||o(t,"image")||t.currentSrc||t.src,e.image){var c=a("img",t)[0];e.image=c&&(c.currentSrc||c.src)}e.image&&n(t,"background-image","url("+e.image+")");for(var u=s*l,d=[],h=r(g,"cell-grid");u--;){var f=r(h,"cell");r(f,"cell-inner"),d.push(f)}return i(t,h),d})),O=f("cellRows",[k],"row",(function(t,e,n){var i=e.rows,r=s(i);return l(n[k],(function(t,e,n){r[Math.floor(e/(n.length/i))].push(t)})),r})),D=f("cellColumns",[k],"col",(function(t,e,n){var i=e.columns,r=s(i);return l(n[k],(function(t,e){r[e%i].push(t)})),r})),P=f("cells",["cellRows","cellColumns"],"cell",(function(t,e,n){return n[k]}));return p(w),p(M),p(S),p(H),p(q),p(A),p($),p(N),p(O),p(D),p(P),x}();class n{position=-1;cells=[];constructor(t){this.position=t}}class i{DOM={el:null};position=-1;previousCellPosition=-1;original;state;color;originalColor;cache;constructor(t,{position:e,previousCellPosition:n}={}){this.DOM.el=t,this.original=this.DOM.el.innerHTML,this.state=this.original,this.color=this.originalColor=getComputedStyle(document.documentElement).getPropertyValue("--color-text"),this.position=e,this.previousCellPosition=n}set(t){this.state=t,this.DOM.el.innerHTML=this.state}}class r{DOM={el:null};lines=[];lettersAndSymbols=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","!","@","#","$","&","*","(",")","-","_","+","=","/","[","]","{","}",";",":","<",">",",","0","1","2","3","4","5","6","7","8","9"];effects={fx1:()=>this.fx1()};totalChars=0;constructor(r){this.DOM.el=r;const o=t(e)({target:this.DOM.el,by:"lines"});o.forEach((n=>t(e)({target:n.words})));for(const[t,e]of o[0].lines.entries()){const r=new n(t);let o=[],a=0;for(const t of e)for(const e of[...t.querySelectorAll(".char")])o.push(new i(e,{position:a,previousCellPosition:0===a?-1:a-1})),++a;r.cells=o,this.lines.push(r),this.totalChars+=a}}clearCells(){for(const t of this.lines)for(const e of t.cells)e.set("&nbsp;")}getRandomChar(){return this.lettersAndSymbols[Math.floor(Math.random()*this.lettersAndSymbols.length)]}fx1(){let t=0;this.clearCells();const e=(n,i,r=0)=>{i.cache=i.state,44===r?(i.set(i.original),++t,t===this.totalChars&&(this.isAnimating=!1)):0===i.position?i.set(r<9?["*","-","'",'"'][Math.floor(4*Math.random())]:this.getRandomChar()):i.set(n.cells[i.previousCellPosition].cache),"&nbsp;"!=i.cache&&++r,r<45&&setTimeout((()=>e(n,i,r)),15)};for(const t of this.lines)for(const n of t.cells)setTimeout((()=>e(t,n)),200*(t.position+1))}trigger(t="fx1"){t in this.effects&&!this.isAnimating&&(this.isAnimating=!0,this.effects[t]())}}navigator.geolocation.getCurrentPosition((async function(t){const e=t.coords.latitude.toFixed(2),n=t.coords.longitude.toFixed(2),i=document.querySelector(".coords"),a=document.querySelector(".content");try{const{haiku:t,weather:s}=o;document.body.classList.remove("loading"),i.innerHTML=`${e}, ${n}`,function(t){const e=document.querySelector(".haiku"),[n,i,r]=t.split("\n");e.innerHTML=`${n} <br> ${i} <br> ${r}`}(t),function(t){const e=document.querySelector(".temperature span:last-child"),n=document.querySelector(".rain span:last-child"),i=document.querySelector(".wind span:last-child"),r=document.querySelector(".high-clouds span:last-child"),o=document.querySelector(".middle-clouds span:last-child"),a=document.querySelector(".low-clouds span:last-child");e.innerHTML=`${t.data.instant.details.air_temperature}°C`,n.innerHTML=`${t.data.next_1_hours.details.precipitation_amount}mm`,i.innerHTML=`${t.data.instant.details.wind_speed}m/s ${t.data.instant.details.wind_from_direction}°`,r.innerHTML=`${t.data.instant.details.cloud_area_fraction_high}%`,o.innerHTML=`${t.data.instant.details.cloud_area_fraction_medium}%`,a.innerHTML=`${t.data.instant.details.cloud_area_fraction_low}%`}(s),new r(a).trigger("fx1")}catch(t){document.querySelector(".haiku").innerHTML="Error getting weather...",console.error(t)}}),(function(t){document.querySelector(".haiku").innerHTML="Error getting weather. App doesnt have permission to get location.",console.error(t)}));const o={request_id:"bfe11d19-ea80-4682-ba11-38cd2d62c113",haiku:"Low clouds gather near,\nMedium layers stretch above,\nHigh clouds disappear.\n\nChilly winds blow strong,\nRain refrains from joining in,\nHumidity clings.",weather:{data:{instant:{details:{air_pressure_at_sea_level:994.8,air_temperature:6.2,cloud_area_fraction:18,cloud_area_fraction_high:0,cloud_area_fraction_low:16.4,cloud_area_fraction_medium:5.5,dew_point_temperature:3.5,fog_area_fraction:0,relative_humidity:82.8,wind_from_direction:277.5,wind_speed:9.7,wind_speed_of_gust:null}},next_1_hours:{summary:{symbol_code:"fair_night"},details:{air_temperature_max:null,air_temperature_min:null,precipitation_amount:0,precipitation_amount_max:null,precipitation_amount_min:null,probability_of_precipitation:null,probability_of_thunder:null,ultraviolet_index_clear_sky_max:null}},next_6_hours:{summary:{symbol_code:"fair_night"},details:{air_temperature_max:5.9,air_temperature_min:4.6,precipitation_amount:0,precipitation_amount_max:null,precipitation_amount_min:null,probability_of_precipitation:null,probability_of_thunder:null,ultraviolet_index_clear_sky_max:null}},next_12_hours:{summary:{symbol_code:"fair_day"},details:null}},time:"2023-04-12T21:00:00Z"}};