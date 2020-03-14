'use strict';


function apply(color) {
  return {
          x: Math.sqrt(color.x),
          y: Math.sqrt(color.y),
          z: Math.sqrt(color.z)
        };
}

exports.apply = apply;
/* No side effect */
