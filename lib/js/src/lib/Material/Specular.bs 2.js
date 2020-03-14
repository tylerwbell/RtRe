'use strict';

var Vec3f$Rt = require("../../common/math/Vec3f.bs.js");

function reflect(v, n) {
  return Vec3f$Rt.sub(v, Vec3f$Rt.multScalar(n, 2.0 * Vec3f$Rt.dot(v, n)));
}

function scatter(t, ray, hit) {
  var reflected = reflect(Vec3f$Rt.normalized(ray.direction), hit.normal);
  var scattered_origin = hit.position;
  var scattered = {
    origin: scattered_origin,
    direction: reflected
  };
  if (Vec3f$Rt.dot(reflected, hit.normal) > 0.0) {
    return {
            ray: scattered,
            attenuation: t.albedo
          };
  }
  
}

exports.reflect = reflect;
exports.scatter = scatter;
/* No side effect */
