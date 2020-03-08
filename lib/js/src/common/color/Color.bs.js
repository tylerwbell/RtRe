'use strict';

var Caml_primitive = require("bs-platform/lib/js/caml_primitive.js");

function fromRgb(r, g, b) {
  return {
          r: r,
          g: g,
          b: b,
          a: 1.0
        };
}

function fromRgba(r, g, b, a) {
  return {
          r: r,
          g: g,
          b: b,
          a: a
        };
}

function toDomRgbaString(param) {
  var r$prime = Caml_primitive.caml_float_max(0.0, Caml_primitive.caml_float_min(255.0, 255.0 * param.r)) | 0;
  var g$prime = Caml_primitive.caml_float_max(0.0, Caml_primitive.caml_float_min(255.0, 255.0 * param.g)) | 0;
  var b$prime = Caml_primitive.caml_float_max(0.0, Caml_primitive.caml_float_min(255.0, 255.0 * param.b)) | 0;
  return "rgba(" + (String(r$prime) + (", " + (String(g$prime) + (", " + (String(b$prime) + (", " + (String(param.a) + ")")))))));
}

exports.fromRgb = fromRgb;
exports.fromRgba = fromRgba;
exports.toDomRgbaString = toDomRgbaString;
/* No side effect */
