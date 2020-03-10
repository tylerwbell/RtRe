'use strict';

var Ray$Rt = require("../../Tracer/Ray.bs.js");
var Vec3f$Rt = require("../../../common/math/Vec3f.bs.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");

function hit(record, $staropt$star, $staropt$star$1, ray, t) {
  var tMin = $staropt$star !== undefined ? $staropt$star : 0.0001;
  var tMax = $staropt$star$1 !== undefined ? $staropt$star$1 : Pervasives.max_float;
  if (t > tMin && t < tMax) {
    var position = Ray$Rt.pointAtParameter(ray, t);
    var normal = Vec3f$Rt.divScalar(Vec3f$Rt.sub(position, record.center), record.radius);
    return {
            t: t,
            position: position,
            normal: normal
          };
  }
  
}

function intersect(t, $staropt$star, $staropt$star$1, ray) {
  var oc = Vec3f$Rt.sub(ray.origin, t.center);
  var a = Vec3f$Rt.dot(ray.direction, ray.direction);
  var b = Vec3f$Rt.dot(oc, ray.direction);
  var c = Vec3f$Rt.dot(oc, oc) - t.radius * t.radius;
  var discriminant = b * b - a * c;
  if (discriminant > 0.0) {
    var root = Math.sqrt(discriminant);
    var t$prime = (-1.0 * b - root) / a;
    var match = hit(t, undefined, undefined, ray, t$prime);
    if (match !== undefined) {
      return match;
    } else {
      var t$prime$1 = (-1.0 * b + root) / a;
      return hit(t, undefined, undefined, ray, t$prime$1);
    }
  }
  
}

exports.hit = hit;
exports.intersect = intersect;
/* No side effect */
