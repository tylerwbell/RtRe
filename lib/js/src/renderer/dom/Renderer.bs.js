'use strict';

var Random = require("bs-platform/lib/js/random.js");
var Color$Rt = require("../../common/color/Color.bs.js");
var Vec3f$Rt = require("../../common/math/Vec3f.bs.js");
var Camera$Rt = require("../../lib/Scene/Camera.bs.js");
var Filter$Rt = require("../../lib/Filter/Filter.bs.js");
var Tracer$Rt = require("../../lib/Tracer/Tracer.bs.js");

function render(t, camera, scene, canvas) {
  canvas.width = t.width;
  canvas.height = t.height;
  var context = canvas.getContext("2d");
  for(var x = 0 ,x_finish = t.width; x <= x_finish; ++x){
    for(var y = 0 ,y_finish = t.height; y <= y_finish; ++y){
      var color = Vec3f$Rt.zero;
      for(var _for = 0 ,_for_finish = t.samples; _for <= _for_finish; ++_for){
        var ux = x + Random.$$float(t.blur) - t.blur / 2.0;
        var uy = y + Random.$$float(t.blur) - t.blur / 2.0;
        var ray = Camera$Rt.rayThrough(camera, {
              x: ux / t.width,
              y: uy / t.height
            });
        color = Vec3f$Rt.add(Tracer$Rt.trace(scene, ray, t.depth), color);
      }
      color = Vec3f$Rt.divScalar(color, t.samples);
      color = Filter$Rt.apply(/* GammaFilter */0, color);
      context.fillStyle = Color$Rt.toDomRgbaString(color);
      context.fillRect(x, y, 1.0, 1.0);
    }
  }
  return /* () */0;
}

exports.render = render;
/* Tracer-Rt Not a pure module */
