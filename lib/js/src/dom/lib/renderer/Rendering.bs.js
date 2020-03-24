'use strict';

var Vec3f$Rt = require("../../../common/math/Vec3f.bs.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");

function blend(a, b) {
  for(var i = 0 ,i_finish = a.buffer.length - 1 | 0; i <= i_finish; ++i){
    var pointA = Caml_array.caml_array_get(a.buffer, i);
    var pointB = Caml_array.caml_array_get(b.buffer, i);
    var samplesA = pointA.samples;
    var samplesB = pointB.samples;
    var samples = samplesA + samplesB | 0;
    var color = Vec3f$Rt.divScalar(Vec3f$Rt.add(Vec3f$Rt.multScalar(pointA.color, samplesA), Vec3f$Rt.multScalar(pointB.color, samplesB)), samples);
    Caml_array.caml_array_set(a.buffer, i, {
          color: color,
          samples: samples
        });
  }
  return /* () */0;
}

var Chunk = {
  blend: blend
};

exports.Chunk = Chunk;
/* No side effect */
