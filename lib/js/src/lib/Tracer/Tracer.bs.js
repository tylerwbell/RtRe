'use strict';

var Color$Rt = require("../../common/color/Color.bs.js");
var Vec3f$Rt = require("../../common/math/Vec3f.bs.js");

function hitSphere(center, radius, ray, color) {
  var oc = Vec3f$Rt.sub(ray.origin, center);
  var a = Vec3f$Rt.dot(ray.direction, ray.direction);
  var b = 2.0 * Vec3f$Rt.dot(oc, ray.direction);
  var c = Vec3f$Rt.dot(oc, oc) - radius * radius;
  var discriminant = b * b - 4.0 * a * c;
  if (discriminant > 0.0) {
    return color;
  }
  
}

function trace(scene, ray) {
  var a = hitSphere({
        x: 0.0,
        y: 0.0,
        z: 1.0
      }, 0.5, ray, Color$Rt.fromRgb(1.0, 0.0, 0.0));
  var b = hitSphere({
        x: 0.0,
        y: -55.0,
        z: 35.0
      }, 50.0, ray, Color$Rt.fromRgb(1.0, 1.0, 0.0));
  if (a !== undefined) {
    return a;
  } else {
    return b;
  }
}

exports.hitSphere = hitSphere;
exports.trace = trace;
/* No side effect */
