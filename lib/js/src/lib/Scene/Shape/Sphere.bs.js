'use strict';

var Ray$Rt = require("../../Tracer/Ray.bs.js");
var Vec3f$Rt = require("../../../common/math/Vec3f.bs.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");

function hit(record, tMinOpt, tMaxOpt, ray, t) {
  var tMin = tMinOpt !== undefined ? tMinOpt : 0.0001;
  var tMax = tMaxOpt !== undefined ? tMaxOpt : Pervasives.max_float;
  if (!(t > tMin && t < tMax)) {
    return ;
  }
  var position = Ray$Rt.pointAtParameter(ray, t);
  var normal = Vec3f$Rt.divScalar(Vec3f$Rt.sub(position, record.center), record.radius);
  return {
          t: t,
          position: position,
          normal: normal
        };
}

function intersect(t, _tMinOpt, _tMaxOpt, ray) {
  var oc = Vec3f$Rt.sub(ray.origin, t.center);
  var a = Vec3f$Rt.dot(ray.direction, ray.direction);
  var b = Vec3f$Rt.dot(oc, ray.direction);
  var c = Vec3f$Rt.dot(oc, oc) - t.radius * t.radius;
  var discriminant = b * b - a * c;
  if (discriminant <= 0.0) {
    return ;
  }
  var root = Math.sqrt(discriminant);
  var t$prime = (-1.0 * b - root) / a;
  var hit$1 = hit(t, undefined, undefined, ray, t$prime);
  if (hit$1 !== undefined) {
    return hit$1;
  }
  var t$prime$1 = (-1.0 * b + root) / a;
  return hit(t, undefined, undefined, ray, t$prime$1);
}

exports.hit = hit;
exports.intersect = intersect;
/* No side effect */
