'use strict';

var DomCompositor$Rt = require("./DomCompositor.bs.js");

function $$default(param) {
  return {
          width: 300,
          height: 300,
          samples: 40,
          blur: 0.0,
          depth: 20
        };
}

var Settings = {
  $$default: $$default
};

function make(canvas) {
  canvas.width = 300;
  canvas.height = 300;
  var context = canvas.getContext("2d");
  var worker = new Worker("worker.js");
  worker.onmessage = (function (message) {
      var $$event = message.data;
      return DomCompositor$Rt.draw(context, $$event[0]);
    });
  return {
          settings: {
            width: 300,
            height: 300,
            samples: 40,
            blur: 0.0,
            depth: 20
          },
          canvas: canvas,
          scene: undefined,
          camera: undefined,
          rendering: undefined,
          worker: worker
        };
}

function dispatchRender(t) {
  var match = t.scene;
  var match$1 = t.camera;
  if (match !== undefined && match$1 !== undefined) {
    var command_002 = t.settings.width;
    var command_003 = t.settings.height;
    var command = /* Render */[
      match,
      match$1,
      command_002,
      command_003
    ];
    t.worker.postMessage(command);
    return /* () */0;
  } else {
    return /* () */0;
  }
}

function setScene(t, scene) {
  var t$prime_settings = t.settings;
  var t$prime_canvas = t.canvas;
  var t$prime_scene = scene;
  var t$prime_camera = t.camera;
  var t$prime_rendering = t.rendering;
  var t$prime_worker = t.worker;
  var t$prime = {
    settings: t$prime_settings,
    canvas: t$prime_canvas,
    scene: t$prime_scene,
    camera: t$prime_camera,
    rendering: t$prime_rendering,
    worker: t$prime_worker
  };
  dispatchRender(t$prime);
  return t$prime;
}

function setCamera(t, camera) {
  var t$prime_settings = t.settings;
  var t$prime_canvas = t.canvas;
  var t$prime_scene = t.scene;
  var t$prime_camera = camera;
  var t$prime_rendering = t.rendering;
  var t$prime_worker = t.worker;
  var t$prime = {
    settings: t$prime_settings,
    canvas: t$prime_canvas,
    scene: t$prime_scene,
    camera: t$prime_camera,
    rendering: t$prime_rendering,
    worker: t$prime_worker
  };
  dispatchRender(t$prime);
  return t$prime;
}

exports.Settings = Settings;
exports.make = make;
exports.dispatchRender = dispatchRender;
exports.setScene = setScene;
exports.setCamera = setCamera;
/* No side effect */
