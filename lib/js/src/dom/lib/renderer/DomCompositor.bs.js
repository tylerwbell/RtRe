'use strict';

var Color$Rt = require("../../../common/color/Color.bs.js");
var Filter$Rt = require("../../../lib/Filter/Filter.bs.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");

function draw(context, rendering) {
  for(var x = 0 ,x_finish = rendering.width - 1 | 0; x <= x_finish; ++x){
    for(var y = 0 ,y_finish = rendering.height - 1 | 0; y <= y_finish; ++y){
      var pixel = Caml_array.caml_array_get(rendering.buffer, Caml_int32.imul(y, rendering.width) + x | 0);
      var correctedColor = Filter$Rt.apply(/* GammaFilter */0, pixel);
      context.fillStyle = Color$Rt.toDomRgbaString(correctedColor);
      context.fillRect(x, y, 1, 1);
    }
  }
  return /* () */0;
}

exports.draw = draw;
/* No side effect */
