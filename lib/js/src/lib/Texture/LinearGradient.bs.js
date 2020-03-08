'use strict';

var Vec2f$Rt = require("../../common/math/Vec2f.bs.js");

function colorAt(t, p) {
  var direction = Vec2f$Rt.sub(t.b, t.a);
  var length = Vec2f$Rt.length(direction);
  var normalized = Vec2f$Rt.div(direction, length);
  var r = Vec2f$Rt.dot(normalized, p) / length;
  var r$prime = 1.0 - r;
  return {
          r: r$prime * t.aColor.r + r * t.bColor.r,
          g: r$prime * t.aColor.g + r * t.bColor.g,
          b: r$prime * t.aColor.b + r * t.bColor.b,
          a: 1.0
        };
}

var Texture = {
  colorAt: colorAt
};

exports.Texture = Texture;
/* No side effect */
