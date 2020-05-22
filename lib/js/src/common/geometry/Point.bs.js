'use strict';


function toString(t) {
  return "{" + (String(t.x) + (", " + (String(t.y) + "}")));
}

var zero = {
  x: 0,
  y: 0
};

exports.zero = zero;
exports.toString = toString;
/* No side effect */
