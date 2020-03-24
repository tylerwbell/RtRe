'use strict';

var Color$Rt = require("../../../common/color/Color.bs.js");
var Filter$Rt = require("../../../lib/Filter/Filter.bs.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");
var Rendering$Rt = require("./Rendering.bs.js");

function make(canvas, width, height) {
  canvas.width = width;
  canvas.height = height;
  var context = canvas.getContext("2d");
  var defaultPoint = {
    color: Color$Rt.black,
    samples: 0
  };
  var buffer = Caml_array.caml_make_vect(Caml_int32.imul(width, height), defaultPoint);
  return {
          context: context,
          rendering: {
            slice: {
              x: 0,
              y: 0,
              width: width,
              height: height
            },
            buffer: buffer
          }
        };
}

function draw(t, rendering) {
  Rendering$Rt.Chunk.blend(t.rendering, rendering);
  var slice = t.rendering.slice;
  for(var x = slice.x ,x_finish = slice.width - 1 | 0; x <= x_finish; ++x){
    for(var y = slice.y ,y_finish = slice.height - 1 | 0; y <= y_finish; ++y){
      var point = Caml_array.caml_array_get(t.rendering.buffer, Caml_int32.imul(y, slice.width) + x | 0);
      var correctedColor = Filter$Rt.apply(/* GammaFilter */0, point.color);
      t.context.fillStyle = Color$Rt.toDomRgbaString(correctedColor);
      t.context.fillRect(x, y, 1, 1);
    }
  }
  return /* () */0;
}

exports.make = make;
exports.draw = draw;
/* No side effect */
