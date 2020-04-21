'use strict';

var Dom$Rt = require("../../common/dom/Dom.bs.js");
var Random = require("bs-platform/lib/js/random.js");
var Color$Rt = require("../../../common/color/Color.bs.js");
var Camera$Rt = require("../../../lib/Scene/Camera.bs.js");
var Tracer$Rt = require("../../../lib/Tracer/Tracer.bs.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");
var WorkerContext$Rt = require("../../common/worker/WorkerContext.bs.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

Random.init(Date.now() | 0);

var id = {
  contents: 0
};

function log(message) {
  console.log(String(id.contents) + (" > " + message));
  return /* () */0;
}

log("starting");

function render(scene, command) {
  var slice = command.slice;
  var widthF = slice.width;
  var heightF = slice.height;
  var dx = slice.width - slice.x | 0;
  var dy = slice.height - slice.y | 0;
  log("rendering " + (String(dx) + (", " + (String(dy) + ""))));
  var defaultPoint = {
    color: Color$Rt.black,
    samples: 0
  };
  var buffer = Caml_array.caml_make_vect(Caml_int32.imul(dx, dy), defaultPoint);
  for(var x = slice.x ,x_finish = (slice.x + slice.width | 0) - 1 | 0; x <= x_finish; ++x){
    for(var y = slice.y ,y_finish = (slice.y + slice.height | 0) - 1 | 0; y <= y_finish; ++y){
      var ux = x + Random.$$float(2.0) - 2.0 / 2.0;
      var uy = y + Random.$$float(2.0) - 2.0 / 2.0;
      var ray = Camera$Rt.rayThrough(command.camera, {
            x: ux / widthF,
            y: uy / heightF
          });
      Caml_array.caml_array_set(buffer, Caml_int32.imul(y, slice.width) + x | 0, {
            color: Tracer$Rt.trace(scene, ray, 10),
            samples: 1
          });
    }
  }
  var rendering = {
    slice: slice,
    buffer: buffer
  };
  var result = /* Result */[rendering];
  postMessage(result);
  return log("complete");
}

WorkerContext$Rt.trapOnWindow(/* () */0);

var scene = {
  contents: undefined
};

var commandQueue = {
  contents: /* [] */0
};

function processCommand(command) {
  log("command");
  var match = scene.contents;
  if (typeof command === "number") {
    return /* () */0;
  } else {
    switch (command.tag | 0) {
      case /* Init */0 :
          throw [
                Caml_builtin_exceptions.match_failure,
                /* tuple */[
                  "RenderWorker.re",
                  53,
                  2
                ]
              ];
      case /* SetScene */1 :
          scene.contents = command[0];
          return /* () */0;
      case /* Render */2 :
          if (match !== undefined) {
            return render(match, command[0]);
          } else {
            return /* () */0;
          }
      
    }
  }
}

function runLoop(param) {
  var match = commandQueue.contents;
  if (match) {
    commandQueue.contents = match[1];
    processCommand(match[0]);
    Dom$Rt.$$setTimeout(0, runLoop);
    return /* () */0;
  } else {
    postMessage(/* Pull */0);
    return /* () */0;
  }
}

WorkerContext$Rt.receive((function ($$event) {
        var command = $$event.data;
        if (typeof command === "number") {
          commandQueue.contents = /* [] */0;
        } else {
          switch (command.tag | 0) {
            case /* Init */0 :
                id.contents = command[0];
                break;
            case /* SetScene */1 :
                processCommand(command);
                break;
            case /* Render */2 :
                commandQueue.contents = /* :: */[
                  command,
                  /* [] */0
                ];
                break;
            
          }
        }
        Dom$Rt.$$setTimeout(0, runLoop);
        return /* () */0;
      }));

postMessage(/* Pull */0);

exports.id = id;
exports.log = log;
exports.render = render;
exports.scene = scene;
exports.commandQueue = commandQueue;
exports.processCommand = processCommand;
exports.runLoop = runLoop;
/*  Not a pure module */
