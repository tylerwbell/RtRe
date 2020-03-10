'use strict';

var Color$Rt = require("../../common/color/Color.bs.js");
var Camera$Rt = require("../../lib/Scene/Camera.bs.js");
var Tracer$Rt = require("../../lib/Tracer/Tracer.bs.js");
var Texture$Rt = require("../../lib/Texture/Texture.bs.js");

function render(camera, scene, context) {
  for(var x = 0; x <= 600; ++x){
    for(var y = 0; y <= 300; ++y){
      var ray = Camera$Rt.rayThrough(camera, {
            x: x / 600,
            y: y / 300
          });
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
