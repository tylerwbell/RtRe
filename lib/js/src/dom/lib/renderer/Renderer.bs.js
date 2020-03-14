'use strict';

var Color$Rt = require("../../../common/color/Color.bs.js");
var Filter$Rt = require("../../../lib/Filter/Filter.bs.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");

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

var worker = new Worker("worker.js");

var lastRendering = {
  contents: undefined
};

var lastContext = {
  contents: undefined
};

worker.onmessage = (function (message) {
    var $$event = message.data;
    console.log("recv: result");
    var match = lastContext.contents;
    if (match !== undefined) {
      var rendering = $$event[0];
      lastRendering.contents = rendering;
      return draw(Caml_option.valFromOption(match), 2, rendering);
    } else {
      return /* () */0;
    }
  });

function render(t, camera, scene, canvas) {
  canvas.width = t.width * t.dpr;
  canvas.height = t.height * t.dpr;
  var context = canvas.getContext("2d");
  context.scale(t.dpr, t.dpr);
  lastContext.contents = Caml_option.some(context);
  var match = lastRendering.contents;
  if (match !== undefined) {
    draw(context, 2, match);
  }
  var width = t.width / 2 | 0;
  var height = t.height / 2 | 0;
  var command = /* Render */[
    scene,
    camera,
    width,
    height
  ];
  worker.postMessage(command);
  return /* () */0;
}

var resolution = 2;

exports.draw = draw;
exports.resolution = resolution;
exports.worker = worker;
exports.lastRendering = lastRendering;
exports.lastContext = lastContext;
exports.render = render;
/* worker Not a pure module */
