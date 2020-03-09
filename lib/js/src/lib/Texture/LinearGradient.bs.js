'use strict';

var Color$Rt = require("../../common/color/Color.bs.js");
var Vec2f$Rt = require("../../common/math/Vec2f.bs.js");

function colorAt(t, p) {
  var direction = Vec2f$Rt.sub(t.b, t.a);
  var length = Vec2f$Rt.length(direction);
  var normalized = Vec2f$Rt.div(direction, length);
  var r = Vec2f$Rt.dot(normalized, p);
  var r$prime = 1.0 - r;
  return Color$Rt.fromRgb(r$prime * t.aColor.r + r * t.bColor.r, r$prime * t.aColor.g + r * t.bColor.g, r$prime * t.aColor.b + r * t.bColor.b);
}

var Texture = {
  colorAt: colorAt
};

exports.Texture = Texture;
/* No side effect */
