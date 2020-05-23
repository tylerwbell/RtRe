'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Color$Rt = require("../../../common/color/Color.bs.js");
var Point$Rt = require("../../../common/geometry/Point.bs.js");
var Filter$Rt = require("../../../lib/Filter/Filter.bs.js");
var RenderSlice$Rt = require("./data/RenderSlice.bs.js");
var DomCollections$Rt = require("../../common/collections/DomCollections.bs.js");

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
  for(var x = 0 ,x_finish = t.rendering.frame.size.width; x < x_finish; ++x){
    for(var y = 0 ,y_finish = t.rendering.frame.size.height; y < y_finish; ++y){
      var color = Curry._3(DomCollections$Rt.Uint8ColorArray2d.get, t.rendering.buffer, x, y);
      var correctedColor = Filter$Rt.apply(/* GammaFilter */0, color);
      t.context.fillStyle = Color$Rt.toDomRgbaString(correctedColor);
      t.context.fillRect(x, y, 1, 1);
    }
  }
  
}

exports.make = make;
exports.draw = draw;
/* RenderSlice-Rt Not a pure module */
