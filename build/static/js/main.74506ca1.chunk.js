(this.webpackJsonpieee754=this.webpackJsonpieee754||[]).push([[0],{136:function(e,t,a){e.exports={"bit-s":"bit_bit-s___iCdS","bit-e":"bit_bit-e__3812g","bit-m":"bit_bit-m__1KpJo","bit-z1":"bit_bit-z1__1hVOy","bit-z2":"bit_bit-z2__2_4mp",true:"bit_true__1wynV",false:"bit_false__1jIXF"}},137:function(e,t,a){e.exports={"search-box":"IEEEadd_search-box__AD8b7","btn-box":"IEEEadd_btn-box__2AcAy","btn-centent":"IEEEadd_btn-centent__vIWIo"}},159:function(e,t){},168:function(e,t,a){e.exports={"move-box":"move_move-box__P1hfW"}},169:function(e,t,a){e.exports=a.p+"static/media/ieee754formula.d91ebafc.png"},170:function(e,t,a){e.exports={"search-box":"decimalToIEEE_search-box__1zEdn"}},171:function(e,t,a){e.exports={"search-box":"IEEEToDecimal_search-box__3nV_p"}},172:function(e,t,a){e.exports=a.p+"static/media/ieee-754-2008.41338a9a.pdf"},173:function(e,t,a){e.exports={doc:"IEEEdoc_doc__2YOe7"}},186:function(e,t,a){e.exports=a(281)},191:function(e,t,a){},192:function(e,t,a){},198:function(e,t,a){},276:function(e,t){},277:function(e,t){},278:function(e,t){},279:function(e,t){},280:function(e,t){},281:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(31),c=a.n(i),l=(a(191),a(192),a(160)),o=a(161),u=a(182),s=a(178),m=a(106),d=a(27),f=a(144),p=a.n(f),v=(a(198),a(123));var E=function(e){var t=Object(d.k)(),a=t.location,n=t.push,i="/"==a.pathname?qe[0].path:a.pathname;return r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"center"},r.a.createElement(v.a.Group,{defaultValue:i,buttonStyle:"solid",onChange:function(e){n(e.target.value)}},qe.map((function(e){return r.a.createElement(v.a.Button,{value:e.path,key:e.path},e.title)})))),r.a.createElement("div",null,e.children))},h=a(20),b=a(286),g=a(183),x=a(288),y=a(284),_=a(25),O=a(59),j=a(134);function S(e){return(e=(e=e.replace(/^0+(?!0)/,"")).replace(/^\./,"0."))||"0"}var N=[{reg:/^NaN|Infinity|-Infinity$/,f:function(e){return{sign:"",value:e[0],order:0,other:e}}},{reg:/^(-?)(\d+)\.(\d+)e-(\d+)$/,f:function(e){return{sign:e[1],value:S(e[2]+e[3]),order:1+~(+e[4]+e[3].length),other:e}}},{reg:/^(-?)(\d+)\.(\d+)e\+(\d+)$/,f:function(e){return{sign:e[1],value:S(e[2]+e[3]),order:e[4]-e[3].length,other:e}}},{reg:/^(-?)(\d+)e-(\d+)$/,f:function(e){return{sign:e[1],value:S(e[2]),order:1+~e[3],other:e}}},{reg:/^(-?)(\d+)e\+(\d+)$/,f:function(e){return{sign:e[1],value:S(e[2]),order:+e[3],other:e}}},{reg:/^(-?)(\d+)\.(\d+)$/,f:function(e){return{sign:e[1],value:S(e[2]+e[3]),order:1+~e[3].length,other:e}}},{reg:/^(-?)(\d+)$/,f:function(e){return{sign:e[1],value:S(e[2]),order:0,other:e}}}];function M(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:N.length;e="".concat(e);for(var a=0,n=null;a<t;){if(n=e.match(N[a].reg))return N[a].f(n);a++}return 5===t?e:N[0].f("NaN".match(N[0].reg))}function T(e){return Math.min.apply(null,e.map((function(e){return e.order})))}function V(e){var t=e.map((function(e){return M(e)})),a=function(e){return Math.max.apply(null,e.map((function(e){return e.order})))}(t);return{arr:e,all:t,max:a,min:T(t)}}function w(e){return function(){for(var t=arguments.length,a=new Array(t),n=0;n<t;n++)a[n]=arguments[n];if(0!==a.length)return 1===a.length?"NaN":e.apply(this,a)}}function k(e){var t=M(e,5);return"string"===typeof t?t:function(e){if(1===e.other.length)return e.other[0];var t=4===e.other.length?0:e.other[3].length;return e.order<0?"".concat(e.sign,"0.").concat("".padEnd(~e.order-t,0)).concat(e.value):"".concat(e.sign).concat(e.value).concat("".padEnd(e.order,0))}(t)}w((function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];var n=V(t),r=n.all,i=n.min,c=Math.abs(i),l=r.reduce((function(e,t,a){return e+"".concat(t.sign).concat(t.value)*Math.pow(10,t.order+c)}),0);return"".concat(l/Math.pow(10,c))})),w((function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];var n=V(t),r=n.all,i=n.min,c=Math.abs(i),l=r.shift(),o=r.reduce((function(e,t){return e-"".concat(t.sign).concat(t.value)*Math.pow(10,t.order+c)}),"".concat(l.sign).concat(l.value)*Math.pow(10,l.order+c));return"".concat(o/Math.pow(10,c))})),w((function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];var n=V(t),r=n.all,i=r.reduce((function(e,t){return{value:e.value*"".concat(t.sign).concat(t.value),order:e.order+t.order}}),{value:1,order:0});return i.order<0?"".concat(i.value/Math.pow(10,1+~i.order)):"".concat(i.value*Math.pow(10,i.order))})),w((function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];var n=V(t),r=n.all,i=r.reduce((function(e,t){var a=Math.abs(T([e,t]));return M("".concat(e.sign).concat(e.value)*Math.pow(10,e.order+a)/("".concat(t.sign).concat(t.value)*Math.pow(10,t.order+a)))}));return i.order<0?"".concat(i.sign).concat(i.value/Math.pow(10,1+~i.order)):"".concat(i.sign).concat(i.value*Math.pow(10,i.order))}));var I=function(){var e=D(11),t=D(11,1),a=D(16),n=D(51),r=D(52);return new Map([["0",{Sign:"0",Hide:"0.",Exponent:e,Mantissa:r,Round:a,DecimalTruthValue:"0",BinaryTruthValue:"0",roundValue:{Sign:"0",Hide:"0.",Exponent:e,Mantissa:r,BinaryTruthValue:"0",DecimalTruthValue:{truthSign:"",value:"0",text:[]}}}],["-0",{Sign:"1",Hide:"0.",Exponent:e,Mantissa:r,Round:a,DecimalTruthValue:"-0",BinaryTruthValue:"-0",roundValue:{Sign:"1",Hide:"0.",Exponent:e,Mantissa:r,BinaryTruthValue:"-0",DecimalTruthValue:{truthSign:"-",value:"0",text:[]}}}],["NaN",{Sign:"0",Hide:"0.",Exponent:t,Mantissa:n+1,Round:a,DecimalTruthValue:"NaN",BinaryTruthValue:"NaN",roundValue:{Sign:"0",Hide:"0.",Exponent:t,Mantissa:n+1,BinaryTruthValue:"NaN",DecimalTruthValue:{truthSign:"",value:"NaN",text:[]}}}],["Infinity",{Sign:"0",Hide:"0.",Exponent:t,Mantissa:r,Round:a,DecimalTruthValue:"Infinity",BinaryTruthValue:"Infinity",roundValue:{Sign:"0",Hide:"0.",Exponent:t,Mantissa:r,BinaryTruthValue:"Infinity",DecimalTruthValue:{truthSign:"",value:"Infinity",text:[]}}}],["-Infinity",{Sign:"1",Hide:"0.",Exponent:t,Mantissa:r,Round:a,DecimalTruthValue:"-Infinity",BinaryTruthValue:"-Infinity",roundValue:{Sign:"1",Hide:"0.",Exponent:t,Mantissa:r,BinaryTruthValue:"-Infinity",DecimalTruthValue:{truthSign:"",value:"-Infinity",text:[]}}}]])}();function B(e){return e?((e=(e="".concat(e)).replace(/\.(0+)?$/,"")).indexOf(".")>-1&&(e=e.replace(/(?<!0)0+$/,"")),e):"0"}function D(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return"".padEnd(e,t)}function R(e,t){if(!e)return"0";if((e="".concat(e))<2)return t&&t.push({dividend:e,key:e,quotient:0,remainder:+e}),e;var a,n=e.split(""),r=0,i="",c=Object(j.a)(n);try{for(c.s();!(a=c.n()).done;){var l=a.value,o=(l=r?+l+10:l)/2,u=o>>0;r=o===u?0:1,i+=u}}catch(s){c.e(s)}finally{c.f()}return i=S(i),t&&t.push({dividend:e,key:e,quotient:i,remainder:r}),""+R(i,t)+r}function H(e,t){var a=".";if(!e)return a;for(var n=0;n<1090;n++){var r={multiplicand:e,key:n};if((e=A(10,e,e))>=1){if(a+=1,r.remainder="1",1==e){r.product="0",t&&t.push(r);break}e=e.replace("1.","0.")}else r.remainder="0",a+=0;r.product=e,t&&t.push(r)}return a}function C(e,t){var a=Math.pow(2,52),n=Math.log(a)/Math.log(e)>>0,r=t%n,i=Array(t/n>>0).fill(n);i.push(r);var c,l=i.shift(),o=Math.pow(e,l),u=Object(j.a)(i);try{for(u.s();!(c=u.n()).done;)for(var s=c.value,m=0;m<s;m++)o=A.apply(void 0,[10].concat(Object(O.a)(Array(+e).fill(o))))}catch(d){u.e(d)}finally{u.f()}return o}function z(e){var t=(e="".concat(e)).replace("-","").split("."),a=Object(h.a)(t,2),n=a[0],r=a[1];if(n){var i=(n=n.split("")).length-1;n=n.reduce((function(e,t,a){return{text:[].concat(Object(O.a)(e.text),[{item:t,size:i-a}]),value:A(10,e.value,"1"===t?"".concat(C(2,i-a)):"0")}}),{text:[],value:"0"})}else n={text:[],value:"0"};return r=r?(r=r.split("")).reduce((function(e,t,a){return{text:[].concat(Object(O.a)(e.text),[{item:t,size:~a}]),value:A(10,e.value,"1"===t?"".concat(Math.pow(2,~a)):"0")}}),{text:[],value:"0"}):{text:[],value:"0"},{truthSign:e.indexOf("-")>-1?"-":"",text:n.text.concat(r.text),value:B(A(10,n.value,r.value))}}function A(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),n=1;n<t;n++)a[n-1]=arguments[n];a=a.map((function(e){return M(e)}));for(var r=function(){var e=a.map((function(e){return e.order}));return{min:Math.min.apply(Math,Object(O.a)(e))}}(),i=0,c=0,l=[],o=a.map((function(e){var t=(e.value+D(e.order-r.min)).split("").reverse(),a=t.length;return a>i&&(i=a),t})),u=function(t){var a=o.reduce((function(e,a){return e+(a[t]?+a[t]:0)}),c);a>=e?(c=Math.floor(a/e),a%=e):c=0,l.unshift(a)},s=0;s<i;s++)u(s);if(c&&l.unshift(10==e?c:R(c)),r.min<0){var m=Math.abs(r.min)-l.length;m<0?(l.splice(r.min,0,"."),l=l.join("")):l="0."+"".padEnd(m,0)+l.join(""),l=l.replace(/(?<!0)0+$/,"").replace(/\.$/,"")}else l=l.join("");return l}function L(e){var t,a=e.Sign,n=e.Exponent,r=e.Mantissa,i=Object(j.a)(I.values());try{for(i.s();!(t=i.n()).done;){var c=t.value;if(a===c.Sign&&n===c.Exponent&&r===c.Mantissa)return Object(_.a)({},c);if("11111111111"===n&&r.indexOf("1")>-1)return Object(_.a)({},I.get("NaN"))}}catch(l){i.e(l)}finally{i.f()}return!1}function $(e){return/(^-?[0-9]+((.([0-9]+(e\+|e\-))?[0-9]+)|((e\+|e\-)[0-9]+))?)$/.test(e)}function W(e){var t=e.Sign,a=e.Exponent,n=e.Mantissa;if(1!==t.length)return console.error("\u7b26\u53f7\u4f4d\u4e0d\u662f1\u4f4d!!");if(11!==a.length)return console.error("\u6307\u6570\u4e0d\u662f11\u4f4d!!");if(52!==n.length)return console.error("\u5c3e\u6570\u4e0d\u662f52\u4f4d\uff01\uff01");var r=L({Sign:t,Exponent:a,Mantissa:n});if(r)return{BinaryTruthValue:r.BinaryTruthValue,DecimalTruthValue:r.roundValue.DecimalTruthValue};var i,c,l="0"===t?"":"-";return n=(a=z(a).value-1023)<=-1023&&0!=+n?n.split(""):(1+n).split(""),a>=0?a>52?i=n.join("")+D(a-52):(n.splice(a+1,0,"."),i=n.join("")):i="0.".concat(D(~a))+n.join(""),c=z(l+i),{BinaryTruthValue:i=B(i),DecimalTruthValue:c}}function X(e){var t=e.Sign,a=e.Exponent,n=e.Mantissa,r=e.Round,i={Sign:t,Exponent:a,Mantissa:n},c=1==r[0]&&r.match(/1/g).length>1,l=1==r[0]&&1==n[51];if(c||l){var o=A(2,1+n,1);if(o.length>53){i.Mantissa=o.substr(1,52),i.Exponent=A(2,a,1);var u=L(i);if(u)return Object(_.a)({},u.roundValue)}else i.Mantissa=o.substr(1,52)}var s=W({Sign:t,Exponent:i.Exponent,Mantissa:i.Mantissa});return i.DecimalTruthValue=s.DecimalTruthValue,i.BinaryTruthValue=s.BinaryTruthValue,i}function F(e){if(e="".concat(e),I.has(e))return I.get(e);if(!$(e))return!1;var t="1.",a="0",n="";(e=k(e)).indexOf("-")>-1&&(a="1",n="-");var r=e=e.replace("-",""),i=function(e){var t=e.split("."),a=Object(h.a)(t,2),n=a[0],r=a[1];return(n?R(n):"0")+(r?H("0.".concat(r)):".")}(e);if(i.indexOf("1")<0)return I.get(n+"0");var c=i.indexOf(".")-i.indexOf("1");c>0&&c--;var l=c+1023,o=R(Math.max(l,0));o=D(11-o.length)+o;var u,s=i.replace(".","");l>0?u=s.substr(s.indexOf("1")+1,68):(t="0.",u=s.substr(1023,68));var m=(u+=D(68-u.length)).substr(0,52),d=u.substr(52),f=function(){var e=i.indexOf("1")+52+16+2;return i.substr(0,e)}(),p=X({Sign:a,Exponent:o,Mantissa:m,Round:d});return p.Hide=t,{Sign:a,Exponent:o,Mantissa:m,Round:d,Hide:t,BinaryTruthValue:B(n+f),DecimalTruthValue:B(n+r),roundValue:p}}function q(e){return"".concat(e).split(/[,\uff0c]/).map((function(e){return e.trim()})).filter(Boolean)}function G(e){var t=e.value,a=void 0===t?"":t,n=e.bits,r=void 0===n?"32":n;return r--,((a="".concat(a)).indexOf("-")>-1?"1":"0")+(a=D(r-(a=(a=R(a=a.replace("-",""))).slice(1+~r)).length)+a)}function P(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=["1","0"];return e.split("").map((function(e){return t[e]})).join("")}var U=a(45),Y=a.n(U),K=[{title:"\u88ab\u9664\u6570",align:"center",dataIndex:"dividend",render:function(e){return+e}},{align:"center",key:"l1",render:function(){return"\xf7"}},{title:"\u9664\u6570",key:"l2",align:"center",render:function(){return"2"}},{align:"center",key:"l3",render:function(){return"\uff1d"}},{title:"\u5546",align:"center",dataIndex:"quotient",render:function(e){return+e}},{align:"center",key:"l4",render:function(){return"\xb7\xb7\xb7\xb7\xb7\xb7\xb7\xb7"}},{title:"\u4f59\u6570",align:"center",dataIndex:"remainder"}],J=[{align:"center",key:"r1",render:function(e,t){return t.dividend>1?"2":""}},{title:"\u7ad6\u5f0f\u8868\u793a",align:"center",dataIndex:"dividend",render:function(e,t){return r.a.createElement("span",{className:t.dividend>1?Y.a["int-right-dividend"]:""},+e)}},{align:"center",key:"r2",render:function(){return"\xb7\xb7\xb7\xb7\xb7\xb7\xb7\xb7"}},{align:"center",dataIndex:"remainder",render:function(e){return+e}}],Q=[{title:"\u88ab\u4e58\u6570",align:"center",dataIndex:"multiplicand",render:function(e){return+e}},{align:"center",key:"l1",render:function(){return"\xd7"}},{title:"\u4e58\u6570",key:"l2",align:"center",render:function(){return"2"}},{align:"center",key:"l3",render:function(){return"\uff1d"}},{title:"\u4f2a\u4e58\u79ef",align:"center",dataIndex:"product",render:function(e,t){return r.a.createElement(r.a.Fragment,null,"1"===t.remainder&&"0"!==e?r.a.createElement(r.a.Fragment,null,r.a.createElement("span",{className:Y.a.delete},t.remainder),r.a.createElement("em",null,+e.replace("0.","."))):+e)}},{align:"center",key:"l4",render:function(){return"\xb7\xb7\xb7\xb7\xb7\xb7\xb7\xb7"}},{title:"\u4f2a\u4f59\u6570",align:"center",dataIndex:"remainder"}],Z=b.a.Search,ee=a(97),te=a(289),ae=a(287),ne=a(283),re=a(136),ie=a.n(re),ce=function(e){var t=e.className,a=e.type,n=e.children;return r.a.createElement("span",{className:"bit-item ".concat(ie.a[function(e){return{0:"bit-s",1:"bit-e",2:"bit-m",3:"bit-z1",4:"bit-z2"}[e]}(a)]," ").concat(t)},r.a.createElement("em",{className:1==n?ie.a.true:ie.a.false},n))},le=function(e){var t=e.value,a=void 0===t?"":t;a=a.split("");var n=function(e){return 0===e?"0":"2"};return r.a.createElement("div",null,a.map((function(e,t){return r.a.createElement(ce,{key:e+t,type:n(t)},e)})))},oe=a(62),ue=a.n(oe),se=ee.a.Option,me=b.a.Search,de=[{label:"\u539f\u7801",value:"gold"},{label:"\u8865\u7801",value:"lime"}],fe=a(168),pe=a.n(fe),ve=function(e){var t=e.callback,a=e.move,n=e.children,i=e.className,c=0,l={mouseup:function(){Object.keys(l).forEach((function(e){window.removeEventListener(e,l[e],!1)}))},mousemove:function(e){t((e.pageX-c)/10>>0)}};return r.a.createElement("span",{className:"".concat(pe.a["move-box"]," ").concat(i),onMouseDown:function(e){a&&(c=e.pageX,Object.keys(l).forEach((function(e){window.addEventListener(e,l[e],!1)})))}},n)},Ee=a(99),he=a.n(Ee),be=function(e){var t=e.data,a=void 0===t?{}:t,i=e.move,c=void 0!==i&&i,l=e.none,o=void 0===l?{}:l,u=e.newData,s=void 0===u?function(){}:u,m=a.Sign,d=a.Exponent,f=a.Hide,p=a.Mantissa,v=a.Round,E=a.index,b=Object(n.useState)(d),g=Object(h.a)(b,2),x=g[0],y=g[1],_=Object(n.useState)(f),O=Object(h.a)(_,2),j=O[0],S=O[1],N=Object(n.useState)(p),M=Object(h.a)(N,2),T=M[0],V=M[1],w=Object(n.useState)(v),k=Object(h.a)(w,2),I=k[0],B=k[1];s({index:E,value:{Sign:m,Exponent:x,Hide:j,Mantissa:T,Round:I}});var R=function(e){return 0===e?"3":"4"},H=function(e){return e?"none":""},C=Object(n.useCallback)((function(e){var t=parseInt(x,2);+(t=D(11-(t=(t+e).toString(2)).length)+t)>=+d&&+t<=11111111110&&y(t)}),[x]);return Object(n.useEffect)((function(){if(c){var e=parseInt(x,2)-parseInt(d,2);if(e>0){var t=D(e-1)+ +f+p;S("0."),V(t.slice(0,52)),B(t.slice(52,68))}else S(f),V(p),B(v)}}),[x]),r.a.createElement("div",{className:"".concat(he.a["bit-box"]," ").concat(c&&"user")},r.a.createElement("div",{className:he.a["bit-line"]},m&&r.a.createElement(ce,{className:H(o.Sign),type:"0"},m),x&&r.a.createElement(ve,{className:H(o.Exponent),callback:C,move:c},x.split("").map((function(e,t){return r.a.createElement(ce,{key:t,type:"1"},e)})))),r.a.createElement("div",{className:he.a["bit-line"]},j&&r.a.createElement("span",{className:"bit-item ".concat(he.a["bit-tip"]," ").concat(H(o.Hide))},j),T&&T.split("").map((function(e,t){return r.a.createElement(ce,{className:H(o.Mantissa),key:t,type:"2"},e)})),I&&I.split("").map((function(e,t){return r.a.createElement(ce,{className:H(o.Round),key:t,type:R(t)},e)}))))},ge=a(58),xe=a(113),ye=a(39),_e=a.n(ye),Oe=a(169),je=a.n(Oe),Se=function(e){var t=e.data,a=t.Sign,n=t.Exponent,i=t.Hide,c=t.Mantissa,l=L({Sign:a,Exponent:n,Mantissa:c});if(l)return l.DecimalTruthValue;var o=parseInt(n,2);o=0==o?"-1022":"".concat(o," - 1023 = ").concat(o-1023);return r.a.createElement("div",{className:_e.a["formula-box"]},r.a.createElement("span",{className:_e.a["formula-item"]},"-1",r.a.createElement("sup",{className:_e.a.sing},a)),r.a.createElement("i",null,"x"),r.a.createElement("span",null,"2",r.a.createElement("sup",{className:_e.a.exponent},o)),r.a.createElement("i",null,"x"),r.a.createElement("i",{className:_e.a["formula-big"]},"("),r.a.createElement("span",null,+i),c.split("").map((function(e,t){return r.a.createElement("div",Object(xe.a)({key:t,className:"dddd"},"className",function(e){return"0"==e?"".concat(_e.a["formula-fraction"]," ").concat(_e.a["formula-fraction-0"]):"".concat(_e.a["formula-fraction"]," ").concat(_e.a["formula-fraction-1"])}(e)),r.a.createElement("i",null,"+"),r.a.createElement("em",null,e),r.a.createElement("em",{style:{padding:"0 5px"}},"x"),r.a.createElement("div",{className:_e.a["formula-fraction-item"]},r.a.createElement("span",null,"1"),r.a.createElement("span",{className:_e.a["formula-fraction-line"]}),r.a.createElement("span",null,"2",r.a.createElement("sup",null,t+1))))})),r.a.createElement("i",{className:_e.a["formula-big"]},")"),r.a.createElement(ge.a,{type:"link",onClick:function(){g.a.open({key:"Ieee754formula",description:r.a.createElement("img",{src:je.a}),duration:0,className:_e.a.Ieee754formula})}},"\u67e5\u770b\u516c\u5f0f"))},Ne=a(34),Me=a.n(Ne),Te=function(e){var t=Object(n.useState)(!1),a=Object(h.a)(t,2),i=a[0],c=a[1],l=e.children,o=e.data,u=void 0===o?{}:o,s=u.DecimalTruthValue,m=u.RoundDecimalTruthValue,d=u.BinaryTruthValue,f=u.RoundBinaryTruthValue,p=u.formulaData;return r.a.createElement("div",{style:{marginBottom:"20px"}},r.a.createElement(ae.b,{size:"small",bordered:!0},l&&r.a.createElement(ae.b.Item,{className:Me.a["list-item"]},l),s&&r.a.createElement(ae.b.Item,{className:Me.a["list-item"]},r.a.createElement("span",{className:Me.a["list-item-lable"]},"\u5341\u8fdb\u5236\u771f\u503c\uff1a"),r.a.createElement("div",{className:Me.a["list-item-text"]},s)),m&&r.a.createElement(ae.b.Item,{className:Me.a["list-item"]},r.a.createElement("span",{className:Me.a["list-item-lable"]},"\u820d\u5165\u5341\u8fdb\u5236\uff1a"),r.a.createElement("div",{className:Me.a["list-item-text"]},m)),d&&r.a.createElement(ae.b.Item,{className:Me.a["list-item"]},r.a.createElement("span",{className:Me.a["list-item-lable"]},"\u4e8c\u8fdb\u5236\u771f\u503c\uff1a"),r.a.createElement("div",{className:Me.a["list-item-text"]},d)),f&&r.a.createElement(ae.b.Item,{className:Me.a["list-item"]},r.a.createElement("span",{className:Me.a["list-item-lable"]},"\u820d\u5165\u4e8c\u8fdb\u5236\uff1a"),r.a.createElement("div",{className:Me.a["list-item-text"]},f)),p&&r.a.createElement(ae.b.Item,{className:Me.a["list-item"]},r.a.createElement("span",{className:Me.a["list-item-lable"]},r.a.createElement(ge.a,{type:"link",onClick:function(){return c(!i)},style:{padding:0,height:"26px"}},"\u5341\u8fdb\u5236\u6b65\u9aa4\uff1a")),r.a.createElement("div",{className:Me.a["list-item-text"]},i?r.a.createElement(Se,{data:p}):r.a.createElement("span",null,"\u70b9\u51fb\u6807\u9898\u663e\u793a\u5185\u5bb9")))))},Ve=a(170),we=a.n(Ve),ke=b.a.Search,Ie=a(285),Be=a(137),De=a.n(Be),Re=Ie.a.Step,He=b.a.Search,Ce=[{title:"\u9636\u7801\u5bf9\u9636",description:"\u5927\u9636\u4e0d\u53d8\uff0c\u5c0f\u9636\u5411\u5927\u9636\u5bf9\u9f50\u3002"},{title:"\u5c3e\u6570\u76f8\u52a0",description:"\u5c3e\u6570\u901a\u8fc7\u52a0\u6cd5\u5668\u8fd0\u7b97\u5f97\u51fa\u7ed3\u679c\u3002"},{title:"\u89c4\u683c\u5316",description:"\u8ba1\u7b97\u540e\u7684\u5c3e\u6570\u9700\u8981\u53d8\u62101.xxxx\u7684\u5f62\u5f0f\uff0c\u53f3\u79fb\u4e00\u4f4d\uff0c\u9636\u7801 +1\u3002"},{title:"\u5c3e\u6570\u820d\u5165",description:"\u6839\u636e\u56db\u820d\u516d\u5165\u4e94\u53d6\u5076\u539f\u5219\u8fdb\u884c\u820d\u5165\u64cd\u4f5c\u3002"},{title:"\u6ea2\u51fa\u5224\u65ad",description:"\u5982\u679c\u6307\u6570\u8d85\u51fa 11111111111\uff0c\u5219\u5411\u65e0\u7a77\u820d\u5165\uff1b\u5982\u679c\u6307\u6570\u5c0f\u4e8e0\uff0c\u5219\u54110\u820d\u5165\uff1b"}];var ze=a(171),Ae=a.n(ze),Le=a(172),$e=a.n(Le),We=a(100),Xe=a(173),Fe=a.n(Xe);We.c.GlobalWorkerOptions.workerSrc="//cdnjs.cloudflare.com/ajax/libs/pdf.js/".concat(We.c.version,"/pdf.worker.js");var qe=[{path:"/decimalToBinary",title:"10\u8fdb\u5236\u8f6c2\u8fdb\u5236",component:function(){var e=Object(n.useState)([]),t=Object(h.a)(e,2),a=t[0],i=t[1],c=Object(n.useState)([]),l=Object(h.a)(c,2),o=l[0],u=l[1],s=Object(n.useState)(""),m=Object(h.a)(s,2),d=m[0],f=m[1],p=Object(n.useState)(""),v=Object(h.a)(p,2),E=v[0],b=v[1],_=Object(n.useState)(""),O=Object(h.a)(_,2),j=O[0],S=O[1],N=Object(n.useState)(""),M=Object(h.a)(N,2),T=M[0],V=M[1],w=Object(n.useState)(0),I=Object(h.a)(w,2),B=I[0],D=I[1];return r.a.createElement("div",null,r.a.createElement("div",{className:"center"},r.a.createElement("div",{className:Y.a["search-box"]},r.a.createElement(Z,{placeholder:"\u8f93\u516510\u8fdb\u5236",enterButton:"\u7f16\u7801",onSearch:function(e){if(!$(e=e.replace(/^\-/,"")))return g.a.error({key:"zhishuyichu",message:"\u6570\u5b57\u683c\u5f0f\u4e0d\u5bf9\uff01",duration:2});var t=(e=k(e)).split("."),a=Object(h.a)(t,2),n=a[0],r=void 0===n?"":n,c=a[1],l=void 0===c?"":c,o=r&&"0"!==r,s=l&&"0"!==l;if(o){var m=[];f(r),S(R(r,m)),i(m),D(0)}else f(""),S(""),i([]);if(s){var d=[];b("0.".concat(l)),V(H("0.".concat(l),d)),u(d),D(1)}else b(""),V(""),u([]);o&&s&&D(2)}}))),r.a.createElement("div",{className:Y.a.message},""!==j&&r.a.createElement(x.a,{message:r.a.createElement("div",null,"10\u8fdb\u5236\u6570\u503c\u201c",d,"\u201d\u8f6c\u5316\u62102\u8fdb\u5236\u4e3a\uff1a",j),type:"success"}),""!==T&&r.a.createElement(x.a,{message:r.a.createElement("div",null,"10\u8fdb\u5236\u6570\u503c\u201c",E,"\u201d\u8f6c\u5316\u62102\u8fdb\u5236\u4e3a\uff1a0",function(e){return(e="".concat(e)).length>=200?e.substr(0,200)+"......":e}(T)),type:"error"})),r.a.createElement("div",{className:Y.a["line-box"]},1!==B&&0!=a.length&&r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:Y.a["int-left-box"]},r.a.createElement(y.a,{columns:K,dataSource:a,pagination:!1,size:"small"}),r.a.createElement("div",{className:Y.a["top-arrows"]})),r.a.createElement("div",{className:Y.a["line-line"]}),0===B&&r.a.createElement("div",{className:Y.a["int-right-box"]},r.a.createElement(y.a,{columns:J,dataSource:a,pagination:!1,size:"small"}),r.a.createElement("div",{className:Y.a["top-arrows"]}))),0!==B&&0!=o.length&&r.a.createElement("div",{className:Y.a["int-right-box"]},r.a.createElement(y.a,{columns:Q,dataSource:o,pagination:!1,size:"small"}),r.a.createElement("div",{className:Y.a["bottom-arrows"]}))))},cache:!0},{path:"/machineCode",title:"\u539f\u7801 & \u8865\u7801",component:function(){var e=Object(n.useState)({type:["gold","lime"],bits:"32"}),t=Object(h.a)(e,2),a=t[0],i=t[1],c=Object(n.useState)([]),l=Object(h.a)(c,2),o=l[0],u=l[1],s=function(e){var t=a.bits;if(!function(e){var t=a.bits,n=a.type;if(!$(e))return g.a.error({key:"notNumber",message:"".concat(e," \u662f\u9519\u8bef\u7684\u6570\u5b57\u683c\u5f0f\uff01"),duration:2});var r=!n.includes("gold")&&e<0?Math.pow(2,t-1):Math.pow(2,t-1)-1;return Math.abs(e)>r?g.a.error({key:"bits",message:"\u8d85\u51fa".concat(t,"bit\u754c\u9650\uff01"),duration:2}):k(e)}(e))return!1;var n=G({value:e,bits:t}),r=P(n.replace(/^\d/,"0"));return{trueCode:n,onesComplementCode:r,complementCode:function(e){var t=e.value,a=void 0===t?"":t,n=e.bits,r=void 0===n?"32":n;return"0"===(a=G({value:a,bits:r}))[0]?a:(a=(a=A(2,a=P(a=a.replace(/^1/,"0")),1)).slice(1+~r)).replace(/^[01]/,"1")}({value:e,bits:t}),inputValue:e}};return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"center"},r.a.createElement("div",{className:ue.a["search-box"]},r.a.createElement("div",{className:ue.a["search-box-select"]},r.a.createElement(b.a.Group,{compact:!0},r.a.createElement(ee.a,{mode:"multiple",showArrow:!0,tagRender:function(e){var t=e.label,a=e.value,n=e.closable,i=e.onClose;return r.a.createElement(te.a,{color:a,closable:n,onClose:i,style:{marginRight:3}},t)},defaultValue:a.type,style:{width:"150px"},options:de,onChange:function(e){i(Object(_.a)(Object(_.a)({},a),{},{type:e}))},placeholder:"\u9009\u62e9\u7f16\u7801\u7c7b\u578b"}),r.a.createElement(ee.a,{defaultValue:a.bits,onChange:function(e){i(Object(_.a)(Object(_.a)({},a),{},{bits:e}))}},r.a.createElement(se,{value:"8"},"8\u4f4d"),r.a.createElement(se,{value:"16"},"16\u4f4d"),r.a.createElement(se,{value:"32"},"32\u4f4d"),r.a.createElement(se,{value:"64"},"64\u4f4d")))),r.a.createElement("div",{className:ue.a["search-box-info"]},r.a.createElement(me,{placeholder:"\u8bf7\u8f93\u516510\u8fdb\u5236\u7684\u6574\u6570\u503c",enterButton:"\u7f16\u7801",onSearch:function(e){var t=q(e).map((function(e){return s(e)})).filter(Boolean);u(t)}})))),r.a.createElement("div",null,o.map((function(e){var t=e.trueCode,n=void 0===t?"":t,i=e.onesComplementCode,c=void 0===i?"":i,l=e.complementCode,o=void 0===l?"":l,u=e.inputValue,s=void 0===u?"":u,m="0"===n[0],d=a.type.includes("gold"),f=a.type.includes("lime");return r.a.createElement("div",{key:n},r.a.createElement("div",{style:{marginBottom:"20px"}},r.a.createElement(ae.b,{size:"small",bordered:!0},d&&r.a.createElement(ae.b.Item,{style:{flexWrap:"wrap"}},r.a.createElement(ne.a,{orientation:"left",style:{fontSize:20}},"\u539f\u7801"),r.a.createElement(le,{value:n})),f&&r.a.createElement(ae.b.Item,{style:{flexWrap:"wrap"}},r.a.createElement(ne.a,{orientation:"left",style:{fontSize:20}},"\u8865\u7801"),m?r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:ue.a["line-tip"]},r.a.createElement(te.a,{color:"magenta"},"\u7531\u4e8e ",s," \u4e3a\u6b63\u6570\uff0c\u6240\u4ee5\u8865\u7801\u4e3a\u5b83\u672c\u8eab\uff1a")),r.a.createElement(le,{value:o})):r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:ue.a["line-tip"]},r.a.createElement(te.a,{color:"magenta"},"\u7531\u4e8e ",s," \u4e3a\u8d1f\u6570\uff0c\u6240\u4ee5\u8f6c\u5316\u6210\u8865\u7801\u6b65\u9aa4\u5982\u4e0b\uff1a")),r.a.createElement("div",{className:ue.a["line-tip"]},r.a.createElement(te.a,{color:"purple"},"1. \u83b7\u5f97 | ",s," | = ",s.replace("-","")," \u7684\u539f\u7801")),r.a.createElement(le,{value:n.replace(/^\d/,"0")}),r.a.createElement("div",{className:ue.a["line-tip"]},r.a.createElement(te.a,{color:"purple"},"2. \u5404\u4f4d\u53d6\u53cd")),r.a.createElement(le,{value:c}),r.a.createElement("div",{className:ue.a["line-tip"]},r.a.createElement(te.a,{color:"purple"},"3. \u7136\u540e + 1")),r.a.createElement(le,{value:o}))))))}))))},cache:!0},{path:"/DecimalToIEEE",title:"10\u8fdb\u5236\u8f6cIEEE754",component:function(){var e=Object(n.useState)([]),t=Object(h.a)(e,2),a=t[0],i=t[1],c=function(e){var t=e.data,a=t.Sign,n=t.Exponent,i=t.Hide,c=t.Mantissa,l=t.Round,o=t.DecimalTruthValue,u=t.BinaryTruthValue,s=t.roundValue;return r.a.createElement("div",null,r.a.createElement("div",{style:{margin:"20px 0"}},r.a.createElement(be,{data:{Sign:a,Exponent:n,Hide:i,Mantissa:c,Round:l}}),r.a.createElement("div",{style:{width:"100%",height:"30px"}}),r.a.createElement(be,{data:{Sign:a,Exponent:s.Exponent,Hide:s.Hide,Mantissa:s.Mantissa,Round:""}})),r.a.createElement(Te,{data:{DecimalTruthValue:o,RoundDecimalTruthValue:s.DecimalTruthValue.truthSign+s.DecimalTruthValue.value,BinaryTruthValue:u,RoundBinaryTruthValue:s.DecimalTruthValue.truthSign+s.BinaryTruthValue,formulaData:s}}))};return r.a.createElement("div",null,r.a.createElement("div",{className:"center"},r.a.createElement("div",{className:we.a["search-box"]},r.a.createElement(ke,{placeholder:"\u8f93\u516510\u8fdb\u5236\uff0c\u591a\u4e2a\u7528\u9017\u53f7\u5206\u5272",enterButton:"\u7f16\u7801",onSearch:function(e){var t=q(e).map((function(e){var t=F(e);return!1===t&&g.a.error({key:e,message:"".concat(e," \u662f\u9519\u8bef\u7684\u6570\u5b57\u683c\u5f0f\uff01"),duration:0}),t})).filter(Boolean);i(t)}}))),a.map((function(e){return r.a.createElement(c,{data:e,key:e.DecimalTruthValue})})))},cache:!0},{path:"/IEEEAdd",title:"IEEE754\u52a0\u6cd5\u8fd0\u7b97",component:function(){var e=Object(n.useState)([]),t=Object(h.a)(e,2),a=t[0],i=t[1],c=Object(n.useState)({}),l=Object(h.a)(c,2),o=l[0],u=l[1],s=Object(n.useState)({}),m=Object(h.a)(s,2),d=m[0],f=m[1],p=Object(n.useState)({Sign:"",Exponent:"",Hide:"",Mantissa:"",Round:""}),v=Object(h.a)(p,2),E=v[0],b=v[1],x=Object(n.useState)(0),y=Object(h.a)(x,2),j=y[0],S=y[1],N=Object(n.useState)(null),M=Object(h.a)(N,2),T=M[0],V=M[1],w=Object(n.useRef)([]),k=Object(n.useCallback)((function(e){var t=e.index,a=e.value;w.current[t]=a}),[a]);Object(n.useEffect)((function(){if(E.Sign&&E.Exponent&&E.Mantissa){var e=W(E),t=e.BinaryTruthValue,a=e.DecimalTruthValue;V({DecimalTruthValue:a.value,BinaryTruthValue:t,formulaData:Object(_.a)({},E)})}}),[E]);var B={0:function(){return w.current.every((function(e){return e.Exponent===E.Exponent}))?(S(1),u({Sign:!0,Exponent:!0}),f({Hide:!0,Mantissa:!0,Round:!0}),!0):(g.a.error({key:"duijie",message:"\u5bf9\u9636\u9519\u8bef!",description:"\u5411\u53f3\u62d6\u52a8\u5c0f\u9636\u90e8\u5206\uff0c\u4f7f\u5176\u4e0e\u5927\u9636\u76f8\u540c\u3002",duration:2.5}),!1)},1:function(){if(1!==j)return!1;var e=w.current.reduce((function(e,t){return A(2,e,t.Hide+t.Mantissa+t.Round)}),0).split("."),t=Object(h.a)(e,2),a=t[0],n=void 0===a?"":a,r=t[1],i=void 0===r?"":r,c=i.slice(0,52);return b(Object(_.a)(Object(_.a)({},E),{},{Hide:"".concat(n,"."),Mantissa:c+D(52-c.length),Round:i.slice(52)})),u({Sign:!0,Exponent:!0,Hide:!0,Mantissa:!0,Round:!0}),f({}),!0},2:function(){if(2!==j)return!1;var e=E.Hide+E.Mantissa+E.Round,t=e.split("."),a=Object(h.a)(t,2),n=a[0],r=a[1],i=n.length-1,c=A(2,E.Exponent,i.toString(2));c=D(11-c.length)+c;var l=n.slice(0,1)+".";return e=n.slice(1)+r,1===+l&&0===+c&&(c="00000000001"),b(Object(_.a)(Object(_.a)({},E),{},{Exponent:c,Hide:l,Mantissa:e.slice(0,52),Round:e.slice(52)})),!0},3:function(){if(3!==j)return!1;var e=X(E),t=e.Exponent,a=e.Mantissa;return b(Object(_.a)(Object(_.a)({},E),{},{Exponent:t,Mantissa:a,Round:""})),!0},4:function(){if(4!==j)return!1;var e=E.Exponent,t=E.Mantissa,a="";return"11111111111"===e&&(b(I.get("Infinity")),a="\u6307\u6570\u5411\u4e0a\u6ea2\u51fa\uff01\u4ee5\u820d\u5165\u81f3\u65e0\u7a77"),0===+e&&0===+t&&(b(I.get("0")),a="\u6307\u6570\u5411\u4e0b\u6ea2\u51fa\uff01\u4ee5\u820d\u5165\u81f30"),a&&g.a.warning({key:"zhishuyichu",message:a,duration:0}),!0}};return r.a.createElement("div",null,r.a.createElement("div",{className:"center"},r.a.createElement("div",{className:De.a["search-box"]},r.a.createElement(He,{placeholder:"\u8f93\u5165\u81f3\u5c112\u4e2a10\u8fdb\u5236\u7684\u503c\uff0c\u7528\u9017\u53f7\u5206\u5272",enterButton:"\u7f16\u7801",onSearch:function(e){var t=q(e);if(2!==t.length)return g.a.error({key:"notTwo",message:"\u5fc5\u987b\u662f2\u4e2a\u6570\u5b57\u76f8\u52a0\uff01",duration:2.5});try{t=t.map((function(e){w.current=[];var t=F(e);if(!1===t)throw g.a.error({key:"notNumber",message:"".concat(e," \u662f\u9519\u8bef\u7684\u6570\u5b57\u683c\u5f0f\uff01"),duration:2.5}),new Error("\u4e2d\u65ad\u64cd\u4f5c\uff01");return Object(_.a)(Object(_.a)({key:Math.random(),Sign:t.Sign},t.roundValue),{},{Round:""})}))}catch(o){return console.error(o)}var a,n=Object(O.a)(t);n.sort((a="Exponent",function(e,t){return t[a]-e[a]}));var r=n[0],c=r.Sign,l=r.Exponent;i(t),S(0),u({}),V(null),b(Object(_.a)(Object(_.a)({},E),{},{Sign:c,Exponent:l}))}})),r.a.createElement("div",{style:{marginLeft:"20px"}},a.length>1&&j<Ce.length&&r.a.createElement(ge.a,{type:"primary",onClick:function(){B[j]()&&S(j+1)}},j==Ce.length-1?"\u5b8c\u6210":"\u4e0b\u4e00\u6b65"))),a.length>1&&r.a.createElement("div",null,r.a.createElement("div",{className:De.a["btn-box"]},r.a.createElement(Ie.a,{current:j},Ce.map((function(e){return r.a.createElement(Re,{key:e.title,description:e.description,title:e.title})}))),r.a.createElement("div",{style:{height:"20px"}})),r.a.createElement("div",{className:De.a["btn-centent"]},j>0&&r.a.createElement(be,{data:E,key:Math.random(),none:d}))),r.a.createElement("div",null,a.map((function(e,t){return r.a.createElement("div",{style:{marginBottom:"20px"},key:e.key},r.a.createElement(be,{data:Object(_.a)(Object(_.a)({},e),{},{index:t}),none:o,move:!0,newData:k}))}))),T&&j==Ce.length&&r.a.createElement(Te,{data:T}))},cache:!0},{path:"/IEEEToDecimal",title:"IEEE754\u8f6c10\u8fdb\u5236",component:function(){var e=Object(n.useState)([]),t=Object(h.a)(e,2),a=t[0],i=t[1],c=Object(n.useRef)(null),l=function(e){var t=function(e){var t=e.slice(0,1),a=e.slice(1,12),n=e.slice(12);if(/^[01]{64}$/.test(e)&&a<=11111111111){var r=L({Sign:t,Exponent:a,Mantissa:n});if(r)return Object(_.a)({},r.roundValue);var i=0===+a?"0.":"1.",c=W({Sign:t,Exponent:a,Mantissa:n});return{Sign:t,Exponent:a,Hide:i,Mantissa:n,BinaryTruthValue:c.BinaryTruthValue,DecimalTruthValue:c.DecimalTruthValue}}return!1}(e);return!1===t&&g.a.error({key:e,message:"".concat(e," \u662f\u9519\u8bef\u7684ieee754\u683c\u5f0f\uff01"),duration:0}),t},o=function(e){var t=e.data,a=t.Sign,n=t.Exponent,i=t.Hide,c=t.Mantissa,l=t.DecimalTruthValue,o=t.BinaryTruthValue;return r.a.createElement("div",null,r.a.createElement("div",{style:{margin:"20px 0"}},r.a.createElement(be,{data:{Sign:a,Exponent:n,Hide:i,Mantissa:c,Round:""}})),r.a.createElement(Te,{data:{DecimalTruthValue:l.value,BinaryTruthValue:o,formulaData:{Sign:a,Exponent:n,Hide:i,Mantissa:c}}}))};return r.a.createElement("div",null,r.a.createElement("div",{className:"center"},r.a.createElement("div",{className:"".concat(Ae.a["search-box"]," center")},r.a.createElement(b.a.TextArea,{ref:c,placeholder:"\u8f93\u5165IEEE754\u53cc\u7cbe\u5ea6\u6d6e\u70b9\u6570\u683c\u5f0f\uff0c\u591a\u4e2a\u7528\u9017\u53f7\u5206\u5272"}),r.a.createElement(ge.a,{type:"primary",onClick:function(){var e=q(c.current.state.value).map((function(e){return l(e)})).filter(Boolean);i(e)},style:{marginLeft:"20px"}},"\u7f16\u7801"))),a.map((function(e){return r.a.createElement(o,{data:e,key:e.DecimalTruthValue.value})})))},cache:!0},{path:"/IEEEdoc",title:"IEEE754-2008\u6587\u6863",component:function(e){var t=Object(n.useState)(0),a=Object(h.a)(t,2),i=a[0],c=a[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,r.a.createElement(We.a,{className:Fe.a.doc,file:$e.a,onLoadSuccess:function(e){var t=e.numPages;c(t)},onLoadError:console.error,renderMode:"canvas",loading:"\u6b63\u5728\u52aa\u529b\u52a0\u8f7d\u4e2d",externalLinkTarget:"_blank"},new Array(i).fill("").map((function(e,t){return r.a.createElement(We.b,{key:t+1,pageNumber:t+1,noData:" ",scale:2,width:400})})))))},cache:!1}],Ge=function(e){Object(u.a)(a,e);var t=Object(s.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){return r.a.createElement(m.HashRouter,null,r.a.createElement(E,null,r.a.createElement(f.CacheSwitch,null,qe.map((function(e){var t=e.cache?p.a:d.d;return r.a.createElement(t,{path:e.path,key:e.path,component:e.component})})),r.a.createElement(d.c,{from:"/*",to:qe[0].path}))))}}]),a}(n.Component),Pe=a(175),Ue=a(138),Ye=Symbol(),Ke={calcList:[]},Je=a(174),Qe=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}):Ue.b,Ze=Object(Ue.c)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ke,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case Ye:var a=Object(O.a)(e.calcList);return a[t.index]=t.value,Object(_.a)(Object(_.a)({},e),{},{calcList:a});default:return e}}),Qe(Object(Ue.a)(Je.a)));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(Pe.a,{store:Ze},r.a.createElement(Ge,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},34:function(e,t,a){e.exports={"list-item":"detailsList_list-item__2pWrd","list-item-lable":"detailsList_list-item-lable__23xjG","list-item-text":"detailsList_list-item-text__2xQPo"}},39:function(e,t,a){e.exports={"formula-box":"formula_formula-box__yqFiK",sing:"formula_sing__3yOcz",exponent:"formula_exponent__3-UxE","formula-big":"formula_formula-big__qN4Us","formula-fraction":"formula_formula-fraction__7i9K8","formula-fraction-line":"formula_formula-fraction-line__1t1Hc","formula-fraction-0":"formula_formula-fraction-0__3vfzZ","formula-fraction-1":"formula_formula-fraction-1__YMhhm","formula-fraction-item":"formula_formula-fraction-item__Xl2c6",Ieee754formula:"formula_Ieee754formula__1rTfO"}},45:function(e,t,a){e.exports={"search-box":"decimalToBinary_search-box__3RVna","line-box":"decimalToBinary_line-box__2WGGs","line-line":"decimalToBinary_line-line__3dRVN","int-left-box":"decimalToBinary_int-left-box__2es-K","int-right-box":"decimalToBinary_int-right-box__16syN","int-right-item":"decimalToBinary_int-right-item__15AHS","int-right-dividend":"decimalToBinary_int-right-dividend__3vXcP",delete:"decimalToBinary_delete__2bgtv",message:"decimalToBinary_message__HcUAR","top-arrows":"decimalToBinary_top-arrows__1OYHX","bottom-arrows":"decimalToBinary_bottom-arrows__22cBY"}},62:function(e,t,a){e.exports={"search-box":"machineCode_search-box__C5WEq","search-box-select":"machineCode_search-box-select__2o8e9","search-box-info":"machineCode_search-box-info__1SOHl","line-tip":"machineCode_line-tip__2Q_ex"}},99:function(e,t,a){e.exports={"bit-box":"ieee754_bit-box__3aYWq","bit-line":"ieee754_bit-line__3d0GS","bit-tip":"ieee754_bit-tip__2aDua"}}},[[186,1,2]]]);
//# sourceMappingURL=main.74506ca1.chunk.js.map