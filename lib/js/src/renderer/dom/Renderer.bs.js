'use strict';

var Color$Rt = require("../../common/color/Color.bs.js");
var Vec3f$Rt = require("../../common/math/Vec3f.bs.js");
var Tracer$Rt = require("../../lib/Tracer/Tracer.bs.js");
var Texture$Rt = require("../../lib/Texture/Texture.bs.js");

function render(camera, scene, context) {
  for(var x = 0; x <= 600; ++x){
    for(var y = 0; y <= 300; ++y){
      var ray_origin = camera.origin;
      var ray_direction = Vec3f$Rt.add(Vec3f$Rt.add({
                x: -1.0,
                y: 0.5,
                z: -0.3
              }, Vec3f$Rt.mult({
                    x: 2.0,
                    y: 0.0,
                    z: 0.0
                  }, x / 600)), Vec3f$Rt.mult({
                x: 0.0,
                y: -1.0,
                z: 0.0
              }, y / 300));
      var ray = {
        origin: ray_origin,
        direction: ray_direction
      };
      var match = Tracer$Rt.trace(scene, ray);
      var color = match !== undefined ? match : Texture$Rt.colorAt(scene.background, {
              x: x / 600,
              y: y / 300
            });
      context.fillStyle = Color$Rt.toDomRgbaString(color);
      context.fillRect(x, y, 1.0, 1.0);
    }
  }
  return /* () */0;
}

exports.render = render;
/* Texture-Rt Not a pure module */
