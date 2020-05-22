'use strict';

var Sphere$Rt = require("./Sphere.bs.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");

function material(shape) {
  return shape[0].material;
}

function intersect(shape, tMinOpt, tMaxOpt, ray) {
  var tMin = tMinOpt !== undefined ? tMinOpt : 0.0;
  var tMax = tMaxOpt !== undefined ? tMaxOpt : Pervasives.max_float;
  return Sphere$Rt.intersect(shape[0], tMin, tMax, ray);
}

exports.material = material;
exports.intersect = intersect;
/* No side effect */
