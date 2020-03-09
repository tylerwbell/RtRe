'use strict';

var Hit$Rt = require("./Hit.bs.js");
var Sphere$Rt = require("../Scene/Shape/Sphere.bs.js");

function trace(bodies, ray) {
  if (bodies) {
    var match = Sphere$Rt.intersect(bodies[0], undefined, undefined, ray);
    var match$1 = trace(bodies[1], ray);
    if (match !== undefined) {
      var hitA = match;
      if (match$1 !== undefined) {
        return Hit$Rt.nearest(hitA, match$1);
      } else {
        return hitA;
      }
    } else if (match$1 !== undefined) {
      return match$1;
    } else {
      return ;
    }
  }
  
}

function trace$1(scene, ray) {
  var match = trace(scene.bodies, ray);
  if (match !== undefined) {
    return match.normal;
  }
  
}

exports.trace = trace$1;
/* No side effect */
