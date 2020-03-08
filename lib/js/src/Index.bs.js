'use strict';

var Color$Rt = require("./common/color/Color.bs.js");
var Camera$Rt = require("./lib/Camera.bs.js");
var Canvas$Rt = require("./dom/canvas/Canvas.bs.js");
var Tracer$Rt = require("./lib/Tracer.bs.js");
var Texture$Rt = require("./lib/Texture.bs.js");

var style = document.createElement("style");

document.head.appendChild(style);

var canvas = Canvas$Rt.createElement(700, 500);

document.body.appendChild(canvas);

var context = canvas.getContext("2d");

context.fillStyle = "";

var clearColor = Color$Rt.fromRgb(0.0, 0.0, 0.0);

context.fillStyle = Color$Rt.toDomRgbaString(clearColor);

context.fillRect(0.0, 0.0, 700, 500);

var camera = {
  origin: {
    x: 0.0,
    y: 0.0,
    z: 0.0
  }
};

var scene = {
  a: {
    x: 0.0,
    y: 0.0,
    z: 0.0
  }
};

for(var x = 0; x <= 700; ++x){
  for(var y = 0; y <= 500; ++y){
    var ray = Camera$Rt.rayThrough(camera, x, y);
    var match = Tracer$Rt.trace(scene, ray);
    var color = match !== undefined ? match : Texture$Rt.colorAt(x, y);
    context.fillStyle = Color$Rt.toDomRgbaString(color);
    context.fillRect(x, y, 1.0, 1.0);
  }
}

var viewport = {
  width: 700,
  height: 500
};

exports.style = style;
exports.viewport = viewport;
exports.canvas = canvas;
exports.context = context;
exports.clearColor = clearColor;
exports.camera = camera;
exports.scene = scene;
/* style Not a pure module */
