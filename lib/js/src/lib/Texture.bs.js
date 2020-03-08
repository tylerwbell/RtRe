'use strict';

var Color$Rt = require("../common/color/Color.bs.js");

function colorAt(x, y) {
  return Color$Rt.fromRgb(x, y, 0.2);
}

exports.colorAt = colorAt;
/* No side effect */
