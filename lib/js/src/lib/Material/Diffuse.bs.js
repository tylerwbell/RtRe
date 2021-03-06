'use strict';

var Random = require("bs-platform/lib/js/random.js");
var Vec3f$Rt = require("../../common/math/Vec3f.bs.js");

function _randomInUnitSphere(_param) {
  while(true) {
    var p = Vec3f$Rt.sub(Vec3f$Rt.multScalar({
              x: Random.$$float(1.0),
              y: Random.$$float(1.0),
              z: Random.$$float(1.0)
            }, 2.0), {
          x: 1.0,
          y: 1.0,
          z: 1.0
        });
    if (Vec3f$Rt.lengthSquared(p) < 1.0) {
      return p;
    }
    _param = undefined;
    continue ;
  };
}

function scatter(t, param, hit) {
  var target = Vec3f$Rt.add(Vec3f$Rt.add(hit.position, hit.normal), _randomInUnitSphere(undefined));
  var scattered_origin = hit.position;
  var scattered_direction = Vec3f$Rt.sub(target, hit.position);
  var scattered = {
    origin: scattered_origin,
    direction: scattered_direction
  };
  return {
          ray: scattered,
          attenuation: t.albedo
        };
}

exports._randomInUnitSphere = _randomInUnitSphere;
exports.scatter = scatter;
/* No side effect */
