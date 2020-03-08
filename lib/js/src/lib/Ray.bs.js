'use strict';

var Vec3f$Rt = require("../common/math/Vec3f.bs.js");

function pointAtParameter(r, t) {
  return Vec3f$Rt.add(r.origin, Vec3f$Rt.mult(r.direction, t));
}

exports.pointAtParameter = pointAtParameter;
/* No side effect */
