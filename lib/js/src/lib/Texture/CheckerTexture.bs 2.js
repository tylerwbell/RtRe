'use strict';

var Color$Rt = require("../../common/color/Color.bs.js");

var standard_onColor = Color$Rt.fromRgb(0.2, 0.3, 0.1);

var standard_offColor = Color$Rt.fromRgb(0.9, 0.9, 0.9);

var standard = {
  rows: 10,
  columns: 15,
  onColor: standard_onColor,
  offColor: standard_offColor
};

function colorAt(t, p) {
  if (Math.floor(p.y * t.rows % 2.0) === Math.floor(p.x * t.columns % 2.0)) {
    return t.onColor;
  } else {
    return t.offColor;
  }
}

exports.standard = standard;
exports.colorAt = colorAt;
/* standard Not a pure module */
