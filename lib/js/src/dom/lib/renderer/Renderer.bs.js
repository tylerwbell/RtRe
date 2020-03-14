'use strict';

var Color$Rt = require("../../../common/color/Color.bs.js");
var Filter$Rt = require("../../../lib/Filter/Filter.bs.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");

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

var workerPool = {
  contents: /* [] */0
};

var lastRendering = {
  contents: undefined
};

function terminateAll(_workers) {
  while(true) {
    var workers = _workers;
    if (workers) {
      workers[0].terminate();
      _workers = workers[1];
      continue ;
    } else {
      return /* () */0;
    }
  };
}

function render(t, camera, scene, canvas) {
  canvas.width = t.width * t.dpr;
  canvas.height = t.height * t.dpr;
  var context = canvas.getContext("2d");
  terminateAll(workerPool.contents);
  workerPool.contents = /* [] */0;
  context.scale(t.dpr, t.dpr);
  var match = lastRendering.contents;
  if (match !== undefined) {
    draw(context, 20, match);
  }
  for(var resolution = 20; resolution >= 20; --resolution){
    var width = Caml_int32.div(t.width, resolution);
    var height = Caml_int32.div(t.height, resolution);
    var worker = new Worker("worker.js");
    workerPool.contents = /* :: */[
      worker,
      workerPool.contents
    ];
    var command = /* Render */[
      scene,
      camera,
      width,
      height
    ];
    worker.postMessage(command);
    worker.onmessage = (function(resolution){
    return function (message) {
      var $$event = message.data;
      console.log("recv: result");
      var rendering = $$event[0];
      lastRendering.contents = rendering;
      return draw(context, resolution, rendering);
    }
    }(resolution));
  }
  return /* () */0;
}

exports.draw = draw;
exports.workerPool = workerPool;
exports.lastRendering = lastRendering;
exports.terminateAll = terminateAll;
exports.render = render;
/* No side effect */
