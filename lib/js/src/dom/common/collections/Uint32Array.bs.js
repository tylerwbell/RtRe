'use strict';


function get(t, index) {
  return t[index];
}

function set(t, index, value) {
  t[index] = value;
  
}

function fill(t, value) {
  t.fill(value);
  
}

function make(size, defaultValue) {
  var array = new Uint32Array(new ArrayBuffer((size << 2)));
  array.fill(defaultValue);
  return array;
}

var RandomAccessCollection = {
  get: get,
  set: set,
  fill: fill,
  make: make
};

var $$ArrayBuffer$1;

var S;

exports.$$ArrayBuffer = $$ArrayBuffer$1;
exports.S = S;
exports.RandomAccessCollection = RandomAccessCollection;
/* No side effect */
