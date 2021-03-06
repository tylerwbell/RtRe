'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");

function MakeGeneric(Source) {
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
    return Curry._2(Source.get, t.source, y + Caml_int32.imul(x, t.size.width) | 0);
  };
  var set = function (t, x, y, value) {
    return Curry._3(Source.set, t.source, y + Caml_int32.imul(x, t.size.width) | 0, value);
  };
  return {
          make: make,
          fill: fill,
          get: get,
          set: set
        };
}

function MakeInt(Source) {
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
    return Curry._2(Source.get, t.source, y + Caml_int32.imul(x, t.size.width) | 0);
  };
  var set = function (t, x, y, value) {
    return Curry._3(Source.set, t.source, y + Caml_int32.imul(x, t.size.width) | 0, value);
  };
  return {
          make: make,
          fill: fill,
          get: get,
          set: set
        };
}

function MakeColor(Source) {
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
    return Curry._2(Source.get, t.source, x + Caml_int32.imul(y, t.size.height) | 0);
  };
  var set = function (t, x, y, value) {
    return Curry._3(Source.set, t.source, x + Caml_int32.imul(y, t.size.height) | 0, value);
  };
  return {
          make: make,
          fill: fill,
          get: get,
          set: set
        };
}

exports.MakeGeneric = MakeGeneric;
exports.MakeInt = MakeInt;
exports.MakeColor = MakeColor;
/* No side effect */
