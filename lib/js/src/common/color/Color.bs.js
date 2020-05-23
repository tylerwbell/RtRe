'use strict';


function fromRgb(r, g, b) {
  return {
          x: r,
          y: g,
          z: b
        };
}

function toDomRgbaString(t) {
  var r$prime = 255.0 * t.x;
  var g$prime = 255.0 * t.y;
  var b$prime = 255.0 * t.z;
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
