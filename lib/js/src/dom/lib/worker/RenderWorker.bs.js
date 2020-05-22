'use strict';

var Dom$Rt = require("../../common/dom/Dom.bs.js");
var Random = require("bs-platform/lib/js/random.js");
var Rect$Rt = require("../../../common/geometry/Rect.bs.js");
var Color$Rt = require("../../../common/color/Color.bs.js");
var Camera$Rt = require("../../../lib/Scene/Camera.bs.js");
var Tracer$Rt = require("../../../lib/Tracer/Tracer.bs.js");
var Array2d$Rt = require("../../../common/Array2d.bs.js");
var RenderSlice$Rt = require("../renderer/data/RenderSlice.bs.js");
var WorkerContext$Rt = require("../../common/worker/WorkerContext.bs.js");

Random.init(Date.now() | 0);

var id = {
  contents: 0
};

function log(message) {
  console.log(String(id.contents) + (" > " + message));
  
}

function render(scene, command) {
  var frame = command.frame;
  var slice = RenderSlice$Rt.make(command.frame, Color$Rt.black);
  var widthF = Rect$Rt.width(frame);
  var heightF = Rect$Rt.height(frame);
  for(var dx = 0 ,dx_finish = Rect$Rt.width(frame); dx < dx_finish; ++dx){
    for(var dy = 0 ,dy_finish = Rect$Rt.height(frame); dy < dy_finish; ++dy){
      var x = Rect$Rt.minX(frame) + dx | 0;
      var y = Rect$Rt.minY(frame) + dy | 0;
      var ux = x + Random.$$float(0.0) - 0.0 / 2.0;
      var uy = y + Random.$$float(0.0) - 0.0 / 2.0;
      var ray = Camera$Rt.rayThrough(command.camera, {
            x: ux / widthF,
            y: uy / heightF
          });
      var color = Tracer$Rt.trace(scene, ray, 4);
      Array2d$Rt.set(slice.buffer, dx, dy, {
            color: color,
            samples: 1
          });
    }
  }
  var result = /* Rendering */[slice];
  postMessage(result);
  return log("complete");
}

WorkerContext$Rt.trapOnWindow(undefined);

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
    return ;
  }
  switch (command.tag | 0) {
    case /* Init */0 :
        return ;
    case /* SetScene */1 :
        scene.contents = command[0];
        return ;
    case /* Render */2 :
        if (match !== undefined) {
          return render(match, command[0]);
        } else {
          return ;
        }
    
  }
}

function runLoop(param) {
  var match = commandQueue.contents;
  if (match) {
    commandQueue.contents = match[1];
    processCommand(match[0]);
    Dom$Rt.$$setTimeout(0, runLoop);
    return ;
  } else {
    postMessage(/* Pull */0);
    return ;
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
