'use strict';

var Hit$Rt = require("./Hit.bs.js");
var Color$Rt = require("../../common/color/Color.bs.js");
var Shape$Rt = require("../Scene/Shape/Shape.bs.js");
var Vec3f$Rt = require("../../common/math/Vec3f.bs.js");
var Texture$Rt = require("../Texture/Texture.bs.js");
var Material$Rt = require("../Material/Material.bs.js");

function _trace(bodies, ray) {
  if (!bodies) {
    return ;
  }
  var body = bodies[0];
  var match = Shape$Rt.intersect(body, undefined, undefined, ray);
  var match$1 = _trace(bodies[1], ray);
  if (match !== undefined) {
    if (match$1 !== undefined) {
      return Hit$Rt.nearest({
                  geometry: match,
                  body: body
                }, match$1);
    } else {
      return {
              geometry: match,
              body: body
            };
    }
  } else if (match$1 !== undefined) {
    return match$1;
  } else {
    return ;
  }
}

function trace(scene, ray, traceDepth) {
  if (traceDepth === 0) {
    return Color$Rt.black;
  }
  var hit = _trace(scene.bodies, ray);
  if (hit !== undefined) {
    var scattered = Material$Rt.scatter(Shape$Rt.material(hit.body), ray, hit.geometry);
    if (scattered !== undefined) {
      return Vec3f$Rt.mult(trace(scene, scattered.ray, traceDepth - 1 | 0), scattered.attenuation);
    } else {
      return Color$Rt.black;
    }
  }
  var unit = Vec3f$Rt.normalized(ray.direction);
  return Texture$Rt.colorAt(scene.background, {
              x: unit.x,
              y: unit.y
            });
}

exports._trace = _trace;
exports.trace = trace;
/* Texture-Rt Not a pure module */
