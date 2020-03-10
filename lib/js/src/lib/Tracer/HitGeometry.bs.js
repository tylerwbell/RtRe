'use strict';


function nearest(a, b) {
  if (a.t < b.t) {
    return a;
  } else {
    return b;
  }
}

exports.nearest = nearest;
/* No side effect */
