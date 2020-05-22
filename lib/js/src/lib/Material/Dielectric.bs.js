'use strict';

var Vec3f$Rt = require("../../common/math/Vec3f.bs.js");
var Specular$Rt = require("./Specular.bs.js");

function refract(v, n, niOverNt) {
  var uv = Vec3f$Rt.normalized(v);
  var dt = Vec3f$Rt.dot(uv, n);
  var discriminant = 1.0 - niOverNt * niOverNt * (1.0 - dt * dt);
  if (discriminant > 0.0) {
    return Vec3f$Rt.sub(Vec3f$Rt.multScalar(Vec3f$Rt.sub(uv, Vec3f$Rt.multScalar(n, dt)), niOverNt), Vec3f$Rt.multScalar(n, Math.sqrt(discriminant)));
  }
  
}

function scatter(t, ray, hit) {
  var properties = Vec3f$Rt.dot(ray.direction, hit.normal) > 0.0 ? ({
        outwardNormal: Vec3f$Rt.multScalar(hit.normal, -1.0),
        niOverNt: t.refractiveIndex
      }) : ({
        outwardNormal: hit.normal,
        niOverNt: 1.0 / t.refractiveIndex
      });
  var refracted = refract(ray.direction, properties.outwardNormal, properties.niOverNt);
  if (refracted !== undefined) {
    var ray_origin = hit.position;
    var ray$1 = {
      origin: ray_origin,
      direction: refracted
    };
    return {
            ray: ray$1,
            attenuation: t.attenuation
          };
  }
  var reflected = Specular$Rt.reflect(Vec3f$Rt.normalized(ray.direction), hit.normal);
  var ray_origin$1 = hit.position;
  var ray$2 = {
    origin: ray_origin$1,
    direction: reflected
  };
  return {
          ray: ray$2,
          attenuation: t.attenuation
        };
}

exports.refract = refract;
exports.scatter = scatter;
/* No side effect */
