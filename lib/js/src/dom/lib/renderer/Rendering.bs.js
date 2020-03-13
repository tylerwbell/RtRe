'use strict';

var Vec3f$Rt = require("../../../common/math/Vec3f.bs.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");

function blend(a, b, weight) {
  var weight$prime = weight - 1.0;
  for(var i = 0 ,i_finish = a.length - 1 | 0; i <= i_finish; ++i){
    Caml_array.caml_array_set(a, i, Vec3f$Rt.divScalar(Vec3f$Rt.add(Vec3f$Rt.multScalar(Caml_array.caml_array_get(a, i), weight$prime), Caml_array.caml_array_get(b, i)), weight));
  }
  return /* () */0;
}

exports.blend = blend;
/* No side effect */
