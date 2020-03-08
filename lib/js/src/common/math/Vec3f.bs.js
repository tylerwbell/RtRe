'use strict';


function mult(v, scalar) {
  return {
          x: scalar * v.x,
          y: scalar * v.y,
          z: scalar * v.z
        };
}

function div(v, scalar) {
  return mult(v, 1.0 / scalar);
}

function add(a, b) {
  return {
          x: a.x + b.x,
          y: a.y + b.y,
          z: a.z + b.z
        };
}

function sub(a, b) {
  return {
          x: a.x - b.x,
          y: a.y - b.y,
          z: a.z - b.z
        };
}

function dot(a, b) {
  return a.x * a.y + a.y * b.y + a.z * b.z;
}

function cross(a, b) {
  return {
          x: a.y * b.z - a.z * b.y,
          y: -1.0 * (a.x * b.z - a.z * b.x),
          z: a.x * b.y - a.y * b.x
        };
}

function length(v) {
  return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
}

function normalized(v) {
  return div(v, length(v));
}

exports.mult = mult;
exports.div = div;
exports.add = add;
exports.sub = sub;
exports.dot = dot;
exports.cross = cross;
exports.length = length;
exports.normalized = normalized;
/* No side effect */
