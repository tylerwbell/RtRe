'use strict';

var Size$Rt = require("./Size.bs.js");
var Point$Rt = require("./Point.bs.js");

var zero = {
  origin: Point$Rt.zero,
  size: Size$Rt.zero
};

function width(t) {
  return t.size.width;
}

function height(t) {
  return t.size.width;
}

function minX(t) {
  return t.origin.x;
}

function minY(t) {
  return t.origin.y;
}

function maxX(t) {
  return t.origin.x + t.size.width | 0;
}

function maxY(t) {
  return t.origin.x + t.size.height | 0;
}

function toString(t) {
  return "[origin: " + (Point$Rt.toString(t.origin) + (", size: " + (Size$Rt.toString(t.size) + "]")));
}

exports.zero = zero;
exports.width = width;
exports.height = height;
exports.minX = minX;
exports.minY = minY;
exports.maxX = maxX;
exports.maxY = maxY;
exports.toString = toString;
/* No side effect */
