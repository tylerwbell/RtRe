'use strict';

var Color$Rt = require("../../../common/color/Color.bs.js");
var Filter$Rt = require("../../../lib/Filter/Filter.bs.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");

function draw(context, rendering) {
  var slice = rendering.slice;
  for(var x = slice.x ,x_finish = slice.width - 1 | 0; x <= x_finish; ++x){
    for(var y = slice.y ,y_finish = slice.height - 1 | 0; y <= y_finish; ++y){
      var point = Caml_array.caml_array_get(rendering.buffer, Caml_int32.imul(y, slice.width) + x | 0);
      var correctedColor = Filter$Rt.apply(/* GammaFilter */0, point.color);
      context.fillStyle = Color$Rt.toDomRgbaString(correctedColor);
      context.fillRect(x, y, 1, 1);
    }
  }
  return /* () */0;
}

exports.draw = draw;
/* No side effect */
