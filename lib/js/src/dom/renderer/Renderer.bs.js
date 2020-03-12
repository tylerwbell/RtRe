'use strict';

var Random = require("bs-platform/lib/js/random.js");
var Color$Rt = require("../../common/color/Color.bs.js");
var Camera$Rt = require("../../lib/Scene/Camera.bs.js");
var Filter$Rt = require("../../lib/Filter/Filter.bs.js");
var Tracer$Rt = require("../../lib/Tracer/Tracer.bs.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");
var RenderScheduler$Rt = require("./RenderScheduler.bs.js");

function render(width, height, blur, camera, scene) {
  var buffer = Caml_array.caml_make_vect(Caml_int32.imul(width, height), Color$Rt.black);
  for(var x = 0 ,x_finish = width - 1 | 0; x <= x_finish; ++x){
    for(var y = 0 ,y_finish = height - 1 | 0; y <= y_finish; ++y){
      var ux = x + Random.$$float(blur) - blur / 2.0;
      var uy = y + Random.$$float(blur) - blur / 2.0;
      var ray = Camera$Rt.rayThrough(camera, {
            x: ux / width,
            y: uy / height
          });
      Caml_array.caml_array_set(buffer, Caml_int32.imul(y, width) + x | 0, Tracer$Rt.trace(scene, ray, 10));
    }
  }
  return {
          width: width,
          height: height,
          buffer: buffer
        };
}

function draw(context, pixel, rendering) {
  for(var x = 0 ,x_finish = rendering.width - 1 | 0; x <= x_finish; ++x){
    for(var y = 0 ,y_finish = rendering.height - 1 | 0; y <= y_finish; ++y){
      var color = Caml_array.caml_array_get(rendering.buffer, Caml_int32.imul(y, rendering.width) + x | 0);
      var correctedColor = Filter$Rt.apply(/* GammaFilter */0, color);
      var ox = Caml_int32.imul(x, pixel);
      var oy = Caml_int32.imul(y, pixel);
      context.fillStyle = Color$Rt.toDomRgbaString(correctedColor);
      context.fillRect(ox, oy, pixel, pixel);
    }
  }
  return /* () */0;
}

var scheduler = RenderScheduler$Rt.make(/* () */0);

function render$1(t, camera, scene, canvas) {
  canvas.width = t.width * t.dpr;
  canvas.height = t.height * t.dpr;
  var context = canvas.getContext("2d");
  context.scale(t.dpr, t.dpr);
  var resolution = {
    contents: 20
  };
  var loop = function (param) {
    var width = Caml_int32.div(t.width, resolution.contents);
    var height = Caml_int32.div(t.height, resolution.contents);
    var rendering = render(width, height, t.blur, camera, scene);
    draw(context, resolution.contents, rendering);
    if (resolution.contents > 1) {
      resolution.contents = resolution.contents - 1 | 0;
      var id = RenderScheduler$Rt.enqueue(scheduler, loop);
      return RenderScheduler$Rt.cancelBefore(scheduler, id);
    } else {
      return 0;
    }
  };
  var id = RenderScheduler$Rt.enqueue(scheduler, loop);
  return RenderScheduler$Rt.cancelBefore(scheduler, id);
}

exports.draw = draw;
exports.scheduler = scheduler;
exports.render = render$1;
/* scheduler Not a pure module */
