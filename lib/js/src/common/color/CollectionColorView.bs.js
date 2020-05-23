'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Color$Rt = require("./Color.bs.js");

function Make(Source) {
  var length = function (t) {
    return Curry._1(Source.length, t.source) / 4 | 0;
  };
  var get = function (t, index) {
    var offset = (index << 2);
    var r = Curry._2(Source.get, t.source, offset + 0 | 0) / 255.0;
    var g = Curry._2(Source.get, t.source, offset + 1 | 0) / 255.0;
    var b = Curry._2(Source.get, t.source, offset + 2 | 0) / 255.0;
    return Color$Rt.fromRgb(r, g, b);
  };
  var set = function (t, index, color) {
    var offset = (index << 2);
    Curry._3(Source.set, t.source, offset + 0 | 0, 255.0 * color.x | 0);
    Curry._3(Source.set, t.source, offset + 1 | 0, 255.0 * color.y | 0);
    return Curry._3(Source.set, t.source, offset + 2 | 0, 255.0 * color.z | 0);
  };
  var fill = function (t, color) {
    var length = Curry._1(Source.length, t.source) / 4 | 0;
    for(var i = 0; i <= length; ++i){
      set(t, i, color);
    }
    
  };
  var make = function (size, defaultColor) {
    var t = {
      source: Curry._2(Source.make, (size << 2), 0)
    };
    fill(t, defaultColor);
    return t;
  };
  return {
          length: length,
          get: get,
          set: set,
          fill: fill,
          make: make
        };
}

exports.Make = Make;
/* No side effect */
