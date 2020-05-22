'use strict';

var Color$Rt = require("../../../common/color/Color.bs.js");
var Point$Rt = require("../../../common/geometry/Point.bs.js");
var Filter$Rt = require("../../../lib/Filter/Filter.bs.js");
var Array2d$Rt = require("../../../common/Array2d.bs.js");

function make(canvas, width, height) {
  canvas.width = width;
  canvas.height = height;
  var context = canvas.getContext("2d");
  var defaultPoint = {
    color: Color$Rt.black,
    samples: 0
  };
  var buffer = Array2d$Rt.make(width, height, defaultPoint);
  return {
          context: context,
          rendering: {
            frame: {
              origin: Point$Rt.zero,
              size: {
                width: width,
                height: height
              }
            },
            buffer: buffer
          }
        };
}

function draw(t) {
  for(var x = 0 ,x_finish = t.rendering.frame.size.width; x < x_finish; ++x){
    for(var y = 0 ,y_finish = t.rendering.frame.size.height; y < y_finish; ++y){
      var sample = Array2d$Rt.get(t.rendering.buffer, x, y);
      var correctedColor = Filter$Rt.apply(/* GammaFilter */0, sample.color);
      t.context.fillStyle = Color$Rt.toDomRgbaString(correctedColor);
      t.context.fillRect(x, y, 1, 1);
    }
  }
  
}

exports.make = make;
exports.draw = draw;
/* No side effect */
