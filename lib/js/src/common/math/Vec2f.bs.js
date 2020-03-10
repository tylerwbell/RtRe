'use strict';


function mult(v, scalar) {
  return {
          x: scalar * v.x,
          y: scalar * v.y
        };
}

function div(v, scalar) {
  return mult(v, 1.0 / scalar);
}

function add(a, b) {
  return {
          x: a.x + b.x,
          y: a.y + b.y
        };
}

function sub(a, b) {
  return {
          x: a.x - b.x,
          y: a.y - b.y
        };
}

function dot(a, b) {
  return a.x * b.x + a.y * b.y;
}

function length(v) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

function normalized(v) {
  return div(v, length(v));
}

var zero = {
  x: 0.0,
  y: 0.0
};

exports.zero = zero;
exports.mult = mult;
exports.div = div;
exports.add = add;
exports.sub = sub;
exports.dot = dot;
exports.length = length;
exports.normalized = normalized;
/* No side effect */
