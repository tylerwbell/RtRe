'use strict';


function nearest(a, b) {
  if (a.geometry.t < b.geometry.t) {
    return a;
  } else {
    return b;
  }
}

exports.nearest = nearest;
/* No side effect */
