'use strict';

var Random = require("bs-platform/lib/js/random.js");
var Color$Rt = require("../../common/color/Color.bs.js");
var Vec3f$Rt = require("../../common/math/Vec3f.bs.js");
var Camera$Rt = require("../../lib/Scene/Camera.bs.js");
var Tracer$Rt = require("../../lib/Tracer/Tracer.bs.js");

function render(camera, scene, context) {
  for(var x = 0; x <= 600; ++x){
    for(var y = 0; y <= 300; ++y){
      var aaColor = Vec3f$Rt.zero;
      for(var _for = 0; _for <= 4; ++_for){
        var ux = x + Random.$$float(1.0) - 1.0 / 2.0;
        var uy = y + Random.$$float(1.0) - 1.0 / 2.0;
        var ray = Camera$Rt.rayThrough(camera, {
              x: ux / 600,
              y: uy / 300
            });
        var color = Tracer$Rt.trace(scene, ray);
        aaColor = Vec3f$Rt.add(aaColor, color);
      }
      aaColor = Vec3f$Rt.div(aaColor, 4);
      var colorGamma2_x = Math.sqrt(aaColor.x);
      var colorGamma2_y = Math.sqrt(aaColor.y);
      var colorGamma2_z = Math.sqrt(aaColor.z);
      var colorGamma2 = {
        x: colorGamma2_x,
        y: colorGamma2_y,
        z: colorGamma2_z
      };
      context.fillStyle = Color$Rt.toDomRgbaString(colorGamma2);
      context.fillRect(x, y, 1.0, 1.0);
    }
  }
  return /* () */0;
}

exports.render = render;
/* Tracer-Rt Not a pure module */
