'use strict';

var Hit$Rt = require("./Hit.bs.js");
var Random = require("bs-platform/lib/js/random.js");
var Vec3f$Rt = require("../../common/math/Vec3f.bs.js");
var Sphere$Rt = require("../Scene/Shape/Sphere.bs.js");
var Texture$Rt = require("../Texture/Texture.bs.js");

function _trace(bodies, ray) {
  if (bodies) {
    var match = Sphere$Rt.intersect(bodies[0], undefined, undefined, ray);
    var match$1 = _trace(bodies[1], ray);
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

function _randomInUnitSphere(_param) {
  while(true) {
    var p = Vec3f$Rt.sub(Vec3f$Rt.mult({
              x: Random.$$float(1.0),
              y: Random.$$float(1.0),
              z: Random.$$float(1.0)
            }, 2.0), {
          x: 1.0,
          y: 1.0,
          z: 1.0
        });
    if (Vec3f$Rt.lengthSquared(p) >= 1.0) {
      _param = /* () */0;
      continue ;
    } else {
      return p;
    }
  };
}

function trace(scene, ray) {
  var match = _trace(scene.bodies, ray);
  if (match !== undefined) {
    var hit = match;
    var bounce = Vec3f$Rt.add(Vec3f$Rt.add(hit.position, hit.normal), _randomInUnitSphere(/* () */0));
    return Vec3f$Rt.mult(trace(scene, {
                    origin: hit.position,
                    direction: Vec3f$Rt.sub(bounce, hit.position)
                  }), 0.5);
  } else {
    var unit = Vec3f$Rt.normalized(ray.direction);
    return Texture$Rt.colorAt(scene.background, {
                x: unit.x,
                y: unit.y
              });
  }
}

exports._trace = _trace;
exports._randomInUnitSphere = _randomInUnitSphere;
exports.trace = trace;
/* Texture-Rt Not a pure module */
