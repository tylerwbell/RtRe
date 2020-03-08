'use strict';

var Color$Rt = require("./common/color/Color.bs.js");
var Canvas$Rt = require("./common/dom/canvas/Canvas.bs.js");

var style = document.createElement("style");

document.head.appendChild(style);

var canvas = Canvas$Rt.createElement(800, 500);

document.body.appendChild(canvas);

var context = canvas.getContext("2d");

var clearColor = Color$Rt.fromRgb(0.0, 0.0, 0.0);

context.fillStyle = Color$Rt.toRgbaString(clearColor);

context.fillRect(0.0, 0.0, 800, 500);

for(var x = 0; x <= 800; ++x){
  for(var y = 0; y <= 500; ++y){
    var color = Color$Rt.fromRgb(x / 800, y / 500, 0.0);
    context.fillStyle = Color$Rt.toRgbaString(color);
    context.fillRect(x, y, 1.0, 1.0);
  }
}

var viewport = {
  width: 800,
  height: 500
};

exports.style = style;
exports.viewport = viewport;
exports.canvas = canvas;
exports.context = context;
exports.clearColor = clearColor;
/* style Not a pure module */
