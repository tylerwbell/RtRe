'use strict';

var Random = require("bs-platform/lib/js/random.js");
var Color$Rt = require("../../common/color/Color.bs.js");
var Camera$Rt = require("../../lib/Scene/Camera.bs.js");
var Canvas$Rt = require("../../dom/canvas/Canvas.bs.js");
var Filter$Rt = require("../../lib/Filter/Filter.bs.js");
var Tracer$Rt = require("../../lib/Tracer/Tracer.bs.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");

function render(t, camera, scene) {
  var buffer = Caml_array.caml_make_vect(Caml_int32.imul(t.width, t.height), Color$Rt.black);
  for(var x = 0 ,x_finish = t.width - 1 | 0; x <= x_finish; ++x){
    for(var y = 0 ,y_finish = t.height - 1 | 0; y <= y_finish; ++y){
      var ux = x + Random.$$float(t.blur) - t.blur / 2.0;
      var uy = y + Random.$$float(t.blur) - t.blur / 2.0;
      var ray = Camera$Rt.rayThrough(camera, {
            x: ux / t.width,
            y: uy / t.height
          });
      Caml_array.caml_array_set(buffer, Caml_int32.imul(y, t.width) + x | 0, Tracer$Rt.trace(scene, ray, t.depth));
    }
  }
  return {
          width: t.width,
          height: t.height,
          buffer: buffer
        };
}

function draw(context, r) {
  for(var x = 0 ,x_finish = r.width - 1 | 0; x <= x_finish; ++x){
    for(var y = 0 ,y_finish = r.height - 1 | 0; y <= y_finish; ++y){
      var color = Caml_array.caml_array_get(r.buffer, Caml_int32.imul(y, r.width) + x | 0);
      var correctedColor = Filter$Rt.apply(/* GammaFilter */0, color);
      Canvas$Rt.Context2d.drawPoint(context, correctedColor, x, y);
    }
  }
  return /* () */0;
}

function render$1(t, camera, scene, canvas) {
  canvas.width = t.width;
  canvas.height = t.height;
  var context = canvas.getContext("2d");
  var loop = function (param) {
    var rendering = render(t, camera, scene);
    draw(context, rendering);
    requestAnimationFrame((function (param) {
            return loop(/* () */0);
          }));
    return /* () */0;
  };
  return loop(/* () */0);
}

exports.draw = draw;
exports.render = render$1;
/* Tracer-Rt Not a pure module */
