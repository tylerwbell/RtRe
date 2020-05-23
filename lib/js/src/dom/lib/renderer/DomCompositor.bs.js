'use strict';

var Color$Rt = require("../../../common/color/Color.bs.js");
var Point$Rt = require("../../../common/geometry/Point.bs.js");
var Canvas$Rt = require("../../common/canvas/Canvas.bs.js");
var RenderSlice$Rt = require("./data/RenderSlice.bs.js");

function make(canvas, width, height) {
  canvas.width = width;
  canvas.height = height;
  var context = canvas.getContext("2d");
  var slice = RenderSlice$Rt.make({
        origin: Point$Rt.zero,
        size: {
          width: width,
          height: height
        }
      }, Color$Rt.black);
  return {
          context: context,
          rendering: slice
        };
}

function draw(t) {
  var buffer = t.rendering.buffer.source.source.buffer;
  var uint8Array = new Uint8ClampedArray(buffer);
  return Canvas$Rt.Context2d.drawImageData(t.context, uint8Array, t.rendering.frame.size.width, t.rendering.frame.size.height, 0, 0);
}

exports.make = make;
exports.draw = draw;
/* RenderSlice-Rt Not a pure module */
