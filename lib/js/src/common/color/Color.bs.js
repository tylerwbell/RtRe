'use strict';

var Caml_primitive = require("bs-platform/lib/js/caml_primitive.js");

function fromRgb(r, g, b) {
  return {
          x: r,
          y: g,
          z: b
        };
}

function toDomRgbaString(t) {
  var r$prime = Caml_primitive.caml_float_max(0.0, Caml_primitive.caml_float_min(255.0, 255.0 * t.x)) | 0;
  var g$prime = Caml_primitive.caml_float_max(0.0, Caml_primitive.caml_float_min(255.0, 255.0 * t.y)) | 0;
  var b$prime = Caml_primitive.caml_float_max(0.0, Caml_primitive.caml_float_min(255.0, 255.0 * t.z)) | 0;
  return "rgba(" + (String(r$prime) + (", " + (String(g$prime) + (", " + (String(b$prime) + ")")))));
}

var red = {
  x: 1.0,
  y: 0.0,
  z: 0.0
};

var green = {
  x: 0.0,
  y: 1.0,
  z: 0.0
};

var blue = {
  x: 0.0,
  y: 0.0,
  z: 1.0
};

var white = {
  x: 1.0,
  y: 1.0,
  z: 1.0
};

var black = {
  x: 0.0,
  y: 0.0,
  z: 0.0
};

exports.fromRgb = fromRgb;
exports.toDomRgbaString = toDomRgbaString;
exports.red = red;
exports.green = green;
exports.blue = blue;
exports.white = white;
exports.black = black;
/* No side effect */
