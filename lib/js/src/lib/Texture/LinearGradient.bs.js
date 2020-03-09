'use strict';

var Vec2f$Rt = require("../../common/math/Vec2f.bs.js");
var Vec3f$Rt = require("../../common/math/Vec3f.bs.js");

function colorAt(t, p) {
  var direction = Vec2f$Rt.sub(t.b, t.a);
  var length = Vec2f$Rt.length(direction);
  var normalized = Vec2f$Rt.div(direction, length);
  var r = Vec2f$Rt.dot(normalized, p);
  return Vec3f$Rt.add(Vec3f$Rt.mult(t.aColor, 1.0 - r), Vec3f$Rt.mult(t.bColor, r));
}

var Texture = {
  colorAt: colorAt
};

exports.Texture = Texture;
/* No side effect */
