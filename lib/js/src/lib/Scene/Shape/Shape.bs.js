'use strict';

var Sphere$Rt = require("./Sphere.bs.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");

function material(shape) {
  return shape[0].material;
}

function intersect(shape, $staropt$star, $staropt$star$1, ray) {
  var tMin = $staropt$star !== undefined ? $staropt$star : 0.0;
  var tMax = $staropt$star$1 !== undefined ? $staropt$star$1 : Pervasives.max_float;
  return Sphere$Rt.intersect(shape[0], tMin, tMax, ray);
}

exports.material = material;
exports.intersect = intersect;
/* No side effect */
