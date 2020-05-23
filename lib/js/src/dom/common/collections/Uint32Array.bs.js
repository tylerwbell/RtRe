'use strict';


var get = (function (t, i) {
        return t[i];
    });

var set = (function (t, i, value) {
        t[i] = value;
    });

function fill(t, value) {
  for(var i = 0 ,i_finish = t.length; i <= i_finish; ++i){
    set(t, i, value);
  }
  
}

function make(size, defaultValue) {
  var create = (function(size) {
        return new Uint32Array(size);
    });
  var array = create(size);
  fill(array, defaultValue);
  return array;
}

var RandomAccessCollection = {
  get: get,
  set: set,
  fill: fill,
  make: make
};

exports.RandomAccessCollection = RandomAccessCollection;
/* No side effect */
