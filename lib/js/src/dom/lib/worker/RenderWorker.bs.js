'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Random = require("bs-platform/lib/js/random.js");
var Rect$Rt = require("../../../common/geometry/Rect.bs.js");
var Color$Rt = require("../../../common/color/Color.bs.js");
var Camera$Rt = require("../../../lib/Scene/Camera.bs.js");
var Tracer$Rt = require("../../../lib/Tracer/Tracer.bs.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");
var RunLoop$Rt = require("./RunLoop.bs.js");
var RenderSlice$Rt = require("../renderer/data/RenderSlice.bs.js");
var WorkerContext$Rt = require("../../common/worker/WorkerContext.bs.js");
var DomCollections$Rt = require("../../common/collections/DomCollections.bs.js");

WorkerContext$Rt.trapOnWindow(undefined);

Random.init(Date.now() | 0);

var id = {
  contents: 0
};

var scene = {
  contents: undefined
};

function log(message) {
  console.log(String(id.contents) + (" > " + message));
  
}

function render(scene, command) {
  var viewport = command.viewport;
  var frame = command.frame;
  var slice = RenderSlice$Rt.make(command.frame, Color$Rt.black);
  var widthF = viewport.width;
  var heightF = viewport.height;
  for(var dx = 0 ,dx_finish = Rect$Rt.width(frame); dx < dx_finish; ++dx){
    for(var dy = 0 ,dy_finish = Rect$Rt.height(frame); dy < dy_finish; ++dy){
      var x = Rect$Rt.minX(frame) + dx | 0;
      var y = Rect$Rt.minY(frame) + dy | 0;
      var ux = x + Random.$$float(1.0) - 1.0 / 2.0;
      var uy = y + Random.$$float(1.0) - 1.0 / 2.0;
      var ray = Camera$Rt.rayThrough(command.camera, {
            x: ux / widthF,
            y: uy / heightF
          });
      var color = Tracer$Rt.trace(scene, ray, 10);
      Curry._4(DomCollections$Rt.Uint8ColorArray2d.set, slice.buffer, dx, dy, color);
      Curry._4(DomCollections$Rt.Uint32Array2d.set, slice.samples, dx, dy, 1);
    }
  }
  return slice;
}

function execute(param, command) {
  var match = scene.contents;
  if (typeof command === "number") {
    return Pervasives.failwith("invalid state: `Cancel` should be processed outside the run loop.");
  }
  switch (command.tag | 0) {
    case /* Init */0 :
        id.contents = command[0];
        return ;
    case /* SetScene */1 :
        scene.contents = command[0];
        return ;
    case /* Render */2 :
        if (match === undefined) {
          return Pervasives.failwith("invalid state: `Render` should only be invoked after a Scene has been set.");
        }
        var slice = render(match, command[0]);
        var result = /* Rendering */[slice];
        var colorsBuffer = slice.buffer.source.source.buffer;
        var samplesBuffer = slice.samples.source.buffer;
        postMessage(result, [
              colorsBuffer,
              samplesBuffer
            ]);
        return ;
    
  }
}

var looper = RunLoop$Rt.make((function (param) {
        postMessage(/* Pull */0, []);
        
      }));

WorkerContext$Rt.receive((function ($$event) {
        var command = $$event.data;
        if (typeof command === "number") {
          return log("cancel not implemeneted");
        } else {
          return RunLoop$Rt.dispatch(looper, (function (loop) {
                        return execute(loop, command);
                      }));
        }
      }));

exports.id = id;
exports.scene = scene;
exports.log = log;
exports.render = render;
exports.execute = execute;
exports.looper = looper;
/*  Not a pure module */
