'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
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

exports.Make = Make;
/* No side effect */
