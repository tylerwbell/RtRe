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

function addScalar(v, scalar) {
  return {
          x: v.x + scalar,
          y: v.y + scalar,
          z: v.z + scalar
        };
}

function subScalar(v, scalar) {
  return addScalar(v, -1.0 * scalar);
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
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

function cross(a, b) {
  return {
          x: a.y * b.z - a.z * b.y,
          y: -1.0 * (a.x * b.z - a.z * b.x),
          z: a.x * b.y - a.y * b.x
        };
}

function lengthSquared(v) {
  return v.x * v.x + v.y * v.y + v.z * v.z;
}

function length(v) {
  return Math.sqrt(lengthSquared(v));
}

function normalized(v) {
  return div(v, Math.sqrt(lengthSquared(v)));
}

var zero = {
  x: 0.0,
  y: 0.0,
  z: 0.0
};

exports.zero = zero;
exports.mult = mult;
exports.div = div;
exports.addScalar = addScalar;
exports.subScalar = subScalar;
exports.add = add;
exports.sub = sub;
exports.dot = dot;
exports.cross = cross;
exports.lengthSquared = lengthSquared;
exports.length = length;
exports.normalized = normalized;
/* No side effect */
