'use strict';

var Vec3f$Rt = require("../../common/math/Vec3f.bs.js");

function rayThrough(t, point) {
  return {
          origin: t.origin,
          direction: Vec3f$Rt.add(Vec3f$Rt.add(t.basis, Vec3f$Rt.multScalar(t.dx, point.x)), Vec3f$Rt.multScalar(t.dy, point.y))
        };
}

exports.rayThrough = rayThrough;
/* No side effect */
