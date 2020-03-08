'use strict';

var Random = require("bs-platform/lib/js/random.js");
var Canvas$Rt = require("./common/dom/canvas/Canvas.bs.js");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");

var style = document.createElement("style");

document.head.appendChild(style);

var canvas = Canvas$Rt.createElement(800, 500);

document.body.appendChild(canvas);

var context = canvas.getContext("2d");

function clear(param) {
  context.fillStyle = "#000000";
  context.fillRect(0.0, 0.0, 800, 500);
  context.fillStyle = "#aaaa00";
  for(var x = 0; x <= 800; ++x){
    for(var y = 0; y <= 500; ++y){
      if (Random.$$int(100) === 0) {
        context.fillRect(x, y, 1.0, 1.0);
      }
      
    }
  }
  return /* () */0;
}

var x = {
  contents: 0
};

var vx = {
  contents: 10
};

function loop(t) {
  console.log(t);
  clear(/* () */0);
  x.contents = x.contents + vx.contents | 0;
  var x$1 = x.contents;
  vx.contents = x$1 < 0 || x$1 > 800 ? Caml_int32.imul(-1, vx.contents) : vx.contents;
  context.fillStyle = "#FF0000";
  context.fillRect(x.contents, 10.0, 10.0, 10.0);
  requestAnimationFrame(loop);
  return /* () */0;
}

loop(0.0);

var viewport = {
  x: 800,
  y: 500
};

exports.style = style;
exports.viewport = viewport;
exports.canvas = canvas;
exports.context = context;
exports.clear = clear;
exports.x = x;
exports.vx = vx;
exports.loop = loop;
/* style Not a pure module */
