(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{132:function(e,t){},133:function(e,t){},180:function(e,t,n){"use strict";n.r(t);var o=n(3),a=n.n(o),c=n(84),r=n.n(c),i=(n(91),n(13)),l=n(14),s=n(31),u=n(30),d=n(32),m=n(10),h=n(85),p=n.n(h),f=(n(83),{IMG_WIDTH:256}),g=f,v=function(e){function t(){return Object(i.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.context=this.refs.element.getContext("2d")}},{key:"render",value:function(){var e=this;return a.a.createElement("canvas",{width:g.IMG_WIDTH,height:g.IMG_WIDTH,className:"draw",ref:"element",onMouseDown:function(t){e.onMouseDown(t)}})}},{key:"clear",value:function(){this.context.fillStyle="white",this.context.fillRect(0,0,this.context.canvas.width,this.context.canvas.height),this.context.beginPath()}},{key:"computePosition",value:function(e){var t=[0,0];do{t[0]+=e.offsetLeft,t[1]+=e.offsetTop,e=e.parentNode}while(e!=document.body);return t}},{key:"onMouseDown",value:function(e){this.basicDraw(e)}},{key:"basicDraw",value:function(e){var t,n,o,a,c,r=this,i=e.pageX||(e.changedTouches?e.changedTouches[0].pageX:0),l=e.pageY||(e.changedTouches?e.changedTouches[0].pageY:0),s=!1,u=function(e){var u=e.pageX||(e.changedTouches?e.changedTouches[0].pageX:0),d=e.pageY||(e.changedTouches?e.changedTouches[0].pageY:0);!s&&Math.abs(d-l)<4&&Math.abs(u-i)<4||(s||(s=!0,t=r.refs.element,n=r.computePosition(t),c=n[1]-t.scrollTop,a=n[0]-t.scrollLeft,r.context.moveTo(i-a,l-c),o=setInterval(function(){r.context.stroke()},30)),r.context.lineTo(u-a,d-c))},d=function(e){e.preventDefault()},m=function e(t){document.removeEventListener("touchmove",d,{passive:!1}),document.removeEventListener("mousemove",u,!1),document.removeEventListener("mouseup",e,!1),document.removeEventListener("touchmove",u,!1),document.removeEventListener("touchend",e,!1),document.removeEventListener("touchcancel",e,!1),s&&(clearInterval(o),r.context.stroke())};document.addEventListener("touchmove",d,{passive:!1}),document.addEventListener("mousemove",u,!1),document.addEventListener("mouseup",m,!1),document.addEventListener("touchmove",u,!1),document.addEventListener("touchend",m,!1),document.addEventListener("touchcancel",m,!1)}}]),t}(o.Component),w=function(){function e(t,n){Object(i.a)(this,e);var o,a=g.IMG_WIDTH;if("IMAGE"===t.tagName){var c=document.createElement("canvas");c.width=a,c.height=a,(o=c.getContext("2d")).drawImage(t,0,0),console.log("img")}else"CANVAS"===t.tagName&&(o=t.getContext("2d"),console.log("canvas"));for(var r=o.getImageData(0,0,a,a).data,l=new Uint8Array(new ArrayBuffer(a*a),0,a*a),s=0,u=0;u<r.length;u+=4)l[s++]=r[u]>128?0:2;this.contour=l,this.colour=n||[255,255,255]}return Object(l.a)(e,[{key:"getInput",value:function(){var e=this.colour;e[0]=e[0]/255*2-1,e[1]=e[1]/255*2-1,e[2]=e[2]/255*2-1;for(var t=this.contour,n=g.IMG_WIDTH,o=new Float32Array(new ArrayBuffer(n*n*4*4),0,n*n*4),a=0,c=0;c<o.length;c+=4)o[c]=e[0],o[c+1]=e[1],o[c+2]=e[2],o[c+3]=t[a++]-1;return m.c(o,[1,n,n,4])}}]),e}(),k=n(18),E=function(){function e(){Object(i.a)(this,e),this.load(function(){console.log("Model loaded")})}return Object(l.a)(e,[{key:"run",value:function(e){var t=new w(e.sketch,e.colour).getInput();t.print();var n=this.model.execute({input:t});m.d(m.b(m.a(n,"int32"),[256,256,3]),document.getElementById("123456"))}},{key:"load",value:function(e){var t=this;Object(k.a)("static/model/JS_MODEL_1/tensorflowjs_model.pb","static/model/JS_MODEL_1/weights_manifest.json").then(function(n){t.model=n,e()},function(e){console.log(e)})}}]),e}(),y=function(e){function t(){return Object(i.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.model=new E,this.initContour()}},{key:"generate",value:function(){if(!this.model)return alert("Model not loaded");var e=this.refs.draw.refs.element;this.model.run({sketch:e,colour:this.pickedColour||[58,60,200]})}},{key:"pickColour",value:function(e){console.log(e),this.pickedColour=e}},{key:"initContour",value:function(){var e=this,t=new Image(256,256);t.src="static/img/1234.jpg",t.onload=function(){window.timestart=(new Date).getTime();var n=g.IMG_WIDTH,o=document.createElement("canvas");o.width=n,o.height=n;var a=o.getContext("2d");a.drawImage(t,0,0);for(var c=a.getImageData(0,0,n,n).data,r=new Uint8Array(new ArrayBuffer(n*n),0,n*n),i=0,l=0;l<c.length;l+=4)r[i++]=c[l]>128?255:0;m.d(m.b(m.a(r,"int32"),[256,256,1]),e.refs.draw.refs.element),console.log("elapsed: "+((new Date).getTime()-window.timestart))}}},{key:"render",value:function(){var e=this;return a.a.createElement("div",{className:"App"},a.a.createElement("header",{className:"App-header"},a.a.createElement("img",{src:p.a,className:"App-logo",alt:"logo"}),a.a.createElement("p",null,"Edit ",a.a.createElement("code",null,"src/App.js")," and save to reload."),a.a.createElement("span",{style:{position:"relative"}},a.a.createElement(v,{ref:"draw"}),a.a.createElement("canvas",{id:"123456",width:256,height:256,className:"display"})),a.a.createElement("div",{style:{position:"relative"}},a.a.createElement("button",{style:{marginRight:6,width:75},onClick:function(){e.refs.draw.clear()}},"CLEAR"),a.a.createElement("input",{className:"pick-colour",onChange:function(){e.pickColour([20,20,200])},defaultChecked:!0,type:"radio",name:"pick-colour"}),a.a.createElement("span",{className:"colour-radio",style:{backgroundColor:"rgb(20, 20, 200)"}}),a.a.createElement("input",{className:"pick-colour",onChange:function(){e.pickColour([200,20,20])},type:"radio",name:"pick-colour"}),a.a.createElement("span",{className:"colour-radio",style:{backgroundColor:"rgb(200, 20, 20)"}}),a.a.createElement("input",{className:"pick-colour",onChange:function(){e.pickColour([250,250,250])},type:"radio",name:"pick-colour"}),a.a.createElement("span",{className:"colour-radio",style:{backgroundColor:"rgb(250, 250, 250)"}}),a.a.createElement("input",{className:"pick-colour",onChange:function(){e.pickColour([150,150,150])},type:"radio",name:"pick-colour"}),a.a.createElement("span",{className:"colour-radio",style:{backgroundColor:"rgb(150, 150, 150)"}}),a.a.createElement("input",{className:"pick-colour",onChange:function(){e.pickColour([20,20,20])},type:"radio",name:"pick-colour"}),a.a.createElement("span",{className:"colour-radio",style:{backgroundColor:"rgb(20, 20, 20)"}}),a.a.createElement("button",{style:{marginLeft:10,width:50},onClick:function(){e.generate()}},"GO"))))}}]),t}(o.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(a.a.createElement(y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},83:function(e,t,n){},85:function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},86:function(e,t,n){e.exports=n(180)},91:function(e,t,n){},97:function(e,t){},99:function(e,t){}},[[86,2,1]]]);
//# sourceMappingURL=main.24584a1b.chunk.js.map