!function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=7)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.SVG_NS="http://www.w3.org/2000/svg",t.getRandomColor=function(){for(var e="#",t=0;t<6;t++)e+="0123456789ABCDEF"[o(0,16)];return e};var o=t.random=function(e,t){return Math.floor(t-Math.random()*(t-e))};t.bindToContext=function(e,t){e instanceof Array||(e=[e]),e.map(function(e){return t[e]=t[e].bind(t)})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=n(0);var r=["removeShape"],a=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._options=t,this._svg=null,this._shapes=[],this._configure()}return o(e,[{key:"getShapeAt",value:function(e){return this._shapes[e]}},{key:"addShape",value:function(e){this._shapes.push(e),this._svg.appendChild(e.$)}},{key:"removeShape",value:function(e){this._svg.removeChild(e.$),this._shapes.splice(this._shapes.indexOf(e),1)}},{key:"removeAllShapes",value:function(){this._shapes.concat().map(this.removeShape)}},{key:"setBackgroundColor",value:function(e){this._svg.style.backgroundColor=e}},{key:"setViewBox",value:function(e,t){this._svg.setAttribute("viewBox","0 0 "+e+" "+t)}},{key:"destroy",value:function(){this.removeAllShapes()}},{key:"_configure",value:function(){(0,i.bindToContext)(r,this),this._createElement()}},{key:"_createElement",value:function(){this._svg=document.createElementNS(i.SVG_NS,"svg"),this._svg.style.width="100%",this._svg.style.height="100%",this._svg.style.display="block";var e=this._options,t=e.width,n=e.height,o=e.bgColor;this.setViewBox(t,n),o&&this.setBackgroundColor(o)}},{key:"$",get:function(){return this._svg}},{key:"shapesCount",get:function(){return this._shapes.length}}]),e}();t.default=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=n(0);var r=["renderFrame"],a=function(){function e(t,n,o,a,s,u,c,l){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._data={width:t,height:n,rotateDoration:o,translateDoration:a,color:s,x:u,y:c,rotate:l},(0,i.bindToContext)(r,this),this.createElement(),this.setTransform(u,c,l)}return o(e,[{key:"createElement",value:function(){throw new TypeError(this.constructor.name+" 'createElement' method is missing")}},{key:"setDataProp",value:function(e,t){this._data[e]=t}},{key:"getDataProp",value:function(e){return e?this._data[e]:this._data}},{key:"setElement",value:function(e){this._element=e}},{key:"setSize",value:function(e,t){this.setDataProp("width",e),this.setDataProp("height",t),this.setCenter(e/2,t/2),this._element.setAttribute("width",e),this._element.setAttribute("height",t)}},{key:"setFillColor",value:function(e){this.setDataProp("color",e),this._element.setAttribute("fill",e)}},{key:"setCenter",value:function(e,t){this.setDataProp("cx",e),this.setDataProp("cy",t)}},{key:"setTransform",value:function(e,t,n){this.setDataProp("x",e),this.setDataProp("y",t),this.setDataProp("rotate",n);var o=this.getDataProp(),i=o.cx,r=o.cy;this._element.setAttribute("transform","translate("+e+", "+t+") rotate("+n+" "+i+" "+r+")")}},{key:"renderFrame",value:function(e,t,n,o){var r=this.getDataProp(),a=void 0,s=void 0,u=r.y;r.x>=n?(a=0-r.width,u=(0,i.random)(0-r.height,o),s=r.rotate):(a=r.x+n/(r.translateDoration/1e3*60),s=r.rotate+360/(r.rotateDoration/1e3*60)),this.setTransform(a,u,s)}},{key:"$",get:function(){return this._element}}]),e}();t.default=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o,i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),r=n(0),a=n(2),s=(o=a)&&o.__esModule?o:{default:o};var u=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,s.default),i(t,[{key:"createElement",value:function(){var e=this.getDataProp(),t=e.width,n=e.height,o=e.color;this._element=document.createElementNS(r.SVG_NS,"rect"),this.setSize(t,n),this.setFillColor(o)}}]),t}();t.default=u},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.defaultOptions=t.defaultShapeFactory=void 0;var o,i=n(0),r=n(3),a=(o=r)&&o.__esModule?o:{default:o};var s=t.defaultShapeFactory=function(e){var t=e.width,n=e.height,o=e.x,i=e.y,r=e.rotate,s=e.rotateDoration,u=e.translateDoration,c=e.color;return new a.default(t,n,s,u,c,o,i,r)};t.defaultOptions={container:document.body,count:50,shapeFactory:s,getColor:i.getRandomColor,autoPlay:!0,animDurationRange:[5,25],shapeWidthRange:[50,100],shapeHeightRange:[5,10]}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o,i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),r=n(0),a=n(4),s=n(1),u=(o=s)&&o.__esModule?o:{default:o};var c=["_onWindowResize","_tick","pause","play","addShape","scrumble","removeShape","setOption","destroy"],l=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._options=Object.assign({},a.defaultOptions,t),this._container=t.container,this._containerRect=this._container.getBoundingClientRect(),this._isPlaying=!1,this._rafId=0,this._prevFrame=0,this._configure()}return i(e,null,[{key:"create",value:function(t){var n=new e(t);return e.lineArts.push(n),n}},{key:"destroy",value:function(t){t.destroy(),e.lineArts.splice(e.lineArts.indexOf(t),1)}}]),i(e,[{key:"_configure",value:function(){(0,r.bindToContext)(c,this),this._createStage(),this.addShapes(this._options.count),this._bindEvents(),this._options.autoPlay&&this.play()}},{key:"_bindEvents",value:function(){window.addEventListener("resize",this._onWindowResize,{passive:!0})}},{key:"_onWindowResize",value:function(){var e=this;window.requestAnimationFrame(function(){e._containerRect=e._container.getBoundingClientRect();var t=e._containerRect,n=t.width,o=t.height;e._stage.setViewBox(n,o)})}},{key:"_createStage",value:function(){var e=this._containerRect,t=e.width,n=e.height;this._stage=new u.default({width:t,height:n,bgColor:this._options.bgColor}),this._container.appendChild(this._stage.$)}},{key:"_createRandomShape",value:function(){var e=this._getRandomByRange(this._options.shapeWidthRange),t=this._getRandomByRange(this._options.shapeHeightRange),n=this._options.getColor(),o=this._getRandomDurationMiliseconds(),i=this._getRandomDurationMiliseconds(),a=(0,r.random)(0-e,this._containerRect.width),s=(0,r.random)(0-t,this._containerRect.height),u=(0,r.random)(0,360);this._stage.addShape(this._options.shapeFactory({width:e,height:t,x:a,y:s,rotate:u,rotateDoration:o,translateDoration:i,color:n}))}},{key:"_getRandomDurationMiliseconds",value:function(){return 1e3*this._getRandomByRange(this._options.animDurationRange)}},{key:"_getRandomByRange",value:function(e){return r.random.apply(null,e)}},{key:"addShape",value:function(){this.addShapes(1)}},{key:"removeShape",value:function(){this.removeShapes(1)}},{key:"addShapes",value:function(e){for(var t=0;t<e;t++)this._createRandomShape()}},{key:"removeShapes",value:function(e){for(this._stage.shapesCount<e&&(e=this._stage.shapesCount);e-- >0;)this._stage.removeShape(this._stage.getShapeAt(this._stage.shapesCount-1))}},{key:"setOption",value:function(e,t){this._options[e]=t,"bgColor"===e&&this._stage.setBackgroundColor(t),this.scrumble()}},{key:"scrumble",value:function(){this._stage.removeAllShapes(),this.addShapes(this._options.count)}},{key:"pause",value:function(){this._isPlaying&&(this._isPlaying=!1,this._prevFrame=0,window.cancelAnimationFrame(this._rafId))}},{key:"play",value:function(){this._isPlaying||(this._isPlaying=!0,this._rafId=window.requestAnimationFrame(this._tick))}},{key:"destroy",value:function(){this.pause(),this._stage.destroy(),this._container.removeChild(this._stage.$),window.removeEventListener("resize",this._onWindowResize)}},{key:"_tick",value:function(e){for(var t=this._stage.shapesCount;t-- >0;)this._stage.getShapeAt(t).renderFrame(e,this._prevFrame,this._containerRect.width,this._containerRect.height);this._prevFrame=e,this._rafId=window.requestAnimationFrame(this._tick)}}]),e}();l.lineArts=[],t.default=l},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getRandomColor=void 0;var o,i=n(5),r=(o=i)&&o.__esModule?o:{default:o},a=n(0);t.default=r.default,t.getRandomColor=a.getRandomColor},function(e,t,n){"use strict";var o,i=n(6),r=(o=i)&&o.__esModule?o:{default:o};var a=document.querySelector("#pause"),s=document.querySelector("#play"),u=document.querySelector("#add"),c=document.querySelector("#remove"),l=document.querySelector("#restart"),h=document.querySelector("#count"),d={container:document.querySelector(".demo-1"),bgColor:"#5c469f",count:100},f=r.default.create(d);a.addEventListener("click",function(){return f.pause()},!1),s.addEventListener("click",function(){return f.play()},!1),u.addEventListener("click",function(){return f.addShape()},!1),c.addEventListener("click",f.removeShape,!1),l.addEventListener("click",function(){r.default.destroy(f),f=r.default.create(d)},!1),h.addEventListener("change",function(e){d.count=e.target.value,f.setOption("count",d.count)},!1),h.value=d.count}]);
//# sourceMappingURL=main.js.map