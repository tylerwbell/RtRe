'use strict';

var Color$Rt = require("../../common/color/Color.bs.js");
var Vec3f$Rt = require("../../common/math/Vec3f.bs.js");
var Sphere$Rt = require("../Scene/Shape/Sphere.bs.js");

function trace(scene, ray) {
  var sphere_center = {
    x: 0.0,
    y: 0.0,
    z: -1.0
  };
  var sphere_color = Color$Rt.fromRgb(1.0, 0.0, 0.0);
  var sphere = {
    center: sphere_center,
    radius: 0.5,
    color: sphere_color
  };
  var match = Sphere$Rt.intersect(sphere, undefined, undefined, ray);
  if (match !== undefined) {
    var vec = Vec3f$Rt.mult(Vec3f$Rt.addScalar(match.normal, 1.0), 0.5);
    return Color$Rt.fromRgb(vec.x, vec.y, vec.z);
  }
  
}

exports.trace = trace;
/* No side effect */
