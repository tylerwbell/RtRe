'use strict';

var Vec3f$Rt = require("../../../common/math/Vec3f.bs.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");

function blend(a, b) {
  for(var sliceX = 0 ,sliceX_finish = b.slice.width - 1 | 0; sliceX <= sliceX_finish; ++sliceX){
    for(var sliceY = 0 ,sliceY_finish = b.slice.height - 1 | 0; sliceY <= sliceY_finish; ++sliceY){
      var absoluteX = sliceX + b.slice.x | 0;
      var absoluteY = sliceY + b.slice.y | 0;
      var i = absoluteX + Caml_int32.imul(absoluteY, a.slice.width) | 0;
      var j = sliceX + Caml_int32.imul(sliceY, b.slice.width) | 0;
      var pointA = Caml_array.caml_array_get(a.buffer, i);
      var pointB = Caml_array.caml_array_get(b.buffer, j);
      var samplesA = pointA.samples;
      var samplesB = pointB.samples;
      var samples = samplesA + samplesB | 0;
      var color = Vec3f$Rt.divScalar(Vec3f$Rt.add(Vec3f$Rt.multScalar(pointA.color, samplesA), Vec3f$Rt.multScalar(pointB.color, samplesB)), samples);
      Caml_array.caml_array_set(a.buffer, i, {
            color: color,
            samples: samples
          });
    }
  }
  return /* () */0;
}

exports.blend = blend;
/* No side effect */
