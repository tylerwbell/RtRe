'use strict';

var Random = require("bs-platform/lib/js/random.js");
var Color$Rt = require("../../../common/color/Color.bs.js");
var Camera$Rt = require("../../../lib/Scene/Camera.bs.js");
var Tracer$Rt = require("../../../lib/Tracer/Tracer.bs.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");
var WorkerContext$Rt = require("../../common/worker/WorkerContext.bs.js");

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

var command = {
  contents: undefined
};

function processCommand(command) {
  var height = command[3];
  var width = command[2];
  console.log("worker: recv: command>render @ " + (String(width) + (" x " + (String(height) + ""))));
  var rendering = render(width, height, 1.0, command[1], command[0]);
  var result = /* Result */[rendering];
  postMessage(result);
  return /* () */0;
}

WorkerContext$Rt.trapOnWindow(/* () */0);

WorkerContext$Rt.receive((function ($$event) {
        command.contents = $$event.data;
        return /* () */0;
      }));

function tick(param) {
  setTimeout((function (param) {
          var match = command.contents;
          if (match !== undefined) {
            processCommand(match);
            command.contents = undefined;
          }
          return tick(/* () */0);
        }), 10);
  return /* () */0;
}

tick(/* () */0);

exports.render = render;
exports.command = command;
exports.processCommand = processCommand;
exports.tick = tick;
/*  Not a pure module */
