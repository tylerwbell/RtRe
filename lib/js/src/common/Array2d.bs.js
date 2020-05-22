'use strict';

var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");

function make(width, height, defaultValue) {
  var buffer = Caml_array.caml_make_vect(Caml_int32.imul(width, height), defaultValue);
  return {
          size: {
            width: width,
            height: height
          },
          buffer: buffer
        };
}

function get(array, x, y) {
  var i = x + Caml_int32.imul(y, array.size.width) | 0;
  return Caml_array.caml_array_get(array.buffer, i);
}

function set(array, x, y, value) {
  var i = x + Caml_int32.imul(y, array.size.width) | 0;
  return Caml_array.caml_array_set(array.buffer, i, value);
}

exports.make = make;
exports.get = get;
exports.set = set;
/* No side effect */
