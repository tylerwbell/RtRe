'use strict';

var $$Array = require("bs-platform/lib/js/array.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var RandomAccessCollection2dView$Rt = require("./RandomAccessCollection2dView.bs.js");

var make = Caml_array.caml_make_vect;

var get = Caml_array.caml_array_get;

var set = Caml_array.caml_array_set;

function fill(t, value) {
  return $$Array.fill(t, 0, t.length, value);
}

var RandomAccessArray = {
  make: make,
  get: get,
  set: set,
  fill: fill
};

var Array2d = RandomAccessCollection2dView$Rt.Make(RandomAccessArray);

exports.RandomAccessArray = RandomAccessArray;
exports.Array2d = Array2d;
/* Array2d Not a pure module */
