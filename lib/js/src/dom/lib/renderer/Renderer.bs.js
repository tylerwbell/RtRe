'use strict';

var Block = require("bs-platform/lib/js/block.js");
var RenderSlice$Rt = require("./data/RenderSlice.bs.js");
var DomCompositor$Rt = require("./DomCompositor.bs.js");
var RenderSettings$Rt = require("./RenderSettings.bs.js");
var RenderStrategy$Rt = require("./RenderStrategy.bs.js");
var RenderScheduler$Rt = require("./RenderScheduler.bs.js");

function make(canvas) {
  var settings = RenderSettings$Rt.$$default(undefined);
  var compositor = DomCompositor$Rt.make(canvas, settings.width, settings.height);
  var scheduler = RenderScheduler$Rt.make((function (slice) {
          RenderSlice$Rt.blend(compositor.rendering, slice);
          return DomCompositor$Rt.draw(compositor);
        }));
  return {
          settings: settings,
          compositor: compositor,
          scene: undefined,
          camera: undefined,
          rendering: undefined,
          scheduler: scheduler
        };
}

function dispatchRender(t) {
  var match = t.scene;
  var match$1 = t.camera;
  if (match === undefined) {
    return ;
  }
  if (match$1 === undefined) {
    return ;
  }
  var commands = RenderStrategy$Rt.make(t.settings, match$1);
  return RenderScheduler$Rt.map(t.scheduler, commands);
}

function setScene(t, scene) {
  var command = /* SetScene */Block.__(1, [scene]);
  RenderScheduler$Rt.clearAndDispatchAll(t.scheduler, command);
  var t$prime_settings = t.settings;
  var t$prime_compositor = t.compositor;
  var t$prime_scene = scene;
  var t$prime_camera = t.camera;
  var t$prime_rendering = t.rendering;
  var t$prime_scheduler = t.scheduler;
  var t$prime = {
    settings: t$prime_settings,
    compositor: t$prime_compositor,
    scene: t$prime_scene,
    camera: t$prime_camera,
    rendering: t$prime_rendering,
    scheduler: t$prime_scheduler
  };
  dispatchRender(t$prime);
  return t$prime;
}

function setCamera(t, camera) {
  var t$prime_settings = t.settings;
  var t$prime_compositor = t.compositor;
  var t$prime_scene = t.scene;
  var t$prime_camera = camera;
  var t$prime_rendering = t.rendering;
  var t$prime_scheduler = t.scheduler;
  var t$prime = {
    settings: t$prime_settings,
    compositor: t$prime_compositor,
    scene: t$prime_scene,
    camera: t$prime_camera,
    rendering: t$prime_rendering,
    scheduler: t$prime_scheduler
  };
  dispatchRender(t$prime);
  return t$prime;
}

exports.make = make;
exports.dispatchRender = dispatchRender;
exports.setScene = setScene;
exports.setCamera = setCamera;
/* No side effect */
