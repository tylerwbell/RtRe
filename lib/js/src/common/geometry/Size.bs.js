'use strict';


function toString(t) {
  return "{" + (String(t.width) + (", " + (String(t.height) + "}")));
}

var zero = {
  width: 0,
  height: 0
};

exports.zero = zero;
exports.toString = toString;
/* No side effect */
