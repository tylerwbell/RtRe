'use strict';

var Color$Rt = require("../common/color/Color.bs.js");

function colorAt(x, y) {
  return Color$Rt.fromRgb(x / 800.0, y / 800.0, 0.2);
}

exports.colorAt = colorAt;
/* No side effect */
