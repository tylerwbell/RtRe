'use strict';

var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");

function Make(Source) {
  var make = function (width, height, defaultValue) {
    var source = Curry._2(Source.make, Caml_int32.imul(width, height), defaultValue);
    return {
            size: {
              width: width,
              height: height
            },
            source: source
          };
  };
  var fill = function (t, value) {
    return Curry._2(Source.fill, t.source, value);
  };
  var get = function (t, x, y) {
    return Curry._3(Source.get, t.source, x, y);
  };
  var set = function (t, x, y, value) {
    return Curry._4(Source.set, t.source, x, y, value);
  };
  return {
          make: make,
          fill: fill,
          get: get,
          set: set
        };
}

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

function fill(array, value) {
  return $$Array.fill(array.buffer, 0, Caml_int32.imul(array.size.width, array.size.height), value);
}

function get(array, x, y) {
  var i = x + Caml_int32.imul(y, array.size.width) | 0;
  return Caml_array.caml_array_get(array.buffer, i);
}

function set(array, x, y, value) {
  var i = x + Caml_int32.imul(y, array.size.width) | 0;
  return Caml_array.caml_array_set(array.buffer, i, value);
}

exports.Make = Make;
exports.make = make;
exports.fill = fill;
exports.get = get;
exports.set = set;
/* No side effect */
