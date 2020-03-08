'use strict';


function rayThrough(camera, x, y) {
  return {
          origin: camera.origin,
          direction: {
            x: x,
            y: y,
            z: 0.0
          }
        };
}

exports.rayThrough = rayThrough;
/* No side effect */
