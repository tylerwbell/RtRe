'use strict';

var $$Array = require("bs-platform/lib/js/array.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Collection2dView$Rt = require("./Collection2dView.bs.js");

var make = Caml_array.caml_make_vect;

function length(t) {
  return t.length;
}

var get = Caml_array.caml_array_get;

var set = Caml_array.caml_array_set;

function fill(t, value) {
  return $$Array.fill(t, 0, t.length, value);
}

var RandomAccessArray = {
  make: make,
  length: length,
  get: get,
  set: set,
  fill: fill
};

var Array2d = Collection2dView$Rt.MakeGeneric(RandomAccessArray);

exports.RandomAccessArray = RandomAccessArray;
exports.Array2d = Array2d;
/* Array2d Not a pure module */
