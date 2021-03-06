'use strict';

var Dom$Rt = require("../common/dom/Dom.bs.js");
var Camera$Rt = require("../../lib/Scene/Camera.bs.js");
var Canvas$Rt = require("../common/canvas/Canvas.bs.js");
var Renderer$Rt = require("../lib/renderer/Renderer.bs.js");
var DefaultScene$Rt = require("./DefaultScene.bs.js");

var style = document.createElement("style");

document.head.appendChild(style);

var canvas = Canvas$Rt.create(undefined);

document.body.appendChild(canvas);

var camera = {
  contents: {
    position: {
      x: 1.0,
      y: 5.0,
      z: 10.0
    },
    direction: {
      x: 0.0,
      y: -1.0,
      z: -1.0
    },
    fov: 100.0,
    aspect: 1.0
  }
};

var scene = DefaultScene$Rt.make(undefined);

var renderer = {
  contents: Renderer$Rt.make(canvas)
};

renderer.contents = Renderer$Rt.setScene(renderer.contents, scene);

Dom$Rt.addKeyDownEventListener((function (keycode) {
        if (keycode >= 69) {
          if (keycode !== 83) {
            if (keycode !== 87) {
              
            } else {
              camera.contents = Camera$Rt.moveAlongDirection(camera.contents, 1.0);
            }
          } else {
            camera.contents = Camera$Rt.moveAlongDirection(camera.contents, -1.0 * 1.0);
          }
        } else if (keycode !== 65) {
          if (keycode >= 68) {
            camera.contents = Camera$Rt.move(camera.contents, {
                  x: 1.0,
                  y: 0.0,
                  z: 0.0
                });
          }
          
        } else {
          camera.contents = Camera$Rt.move(camera.contents, {
                x: -1.0 * 1.0,
                y: 0.0,
                z: 0.0
              });
        }
        renderer.contents = Renderer$Rt.setCamera(renderer.contents, camera.contents);
        
      }));

var prevX = {
  contents: -1
};

var prevY = {
  contents: -1
};

var mousedown = {
  contents: false
};

Dom$Rt.addMouseDownEventListener((function (param) {
        mousedown.contents = true;
        
      }));

Dom$Rt.addMouseUpEventListener((function (param) {
        mousedown.contents = false;
        
      }));

Dom$Rt.addMouseMoveEventListener((function (x, y) {
        var dx = prevX.contents - x | 0;
        var dy = prevY.contents - y | 0;
        prevX.contents = x;
        prevY.contents = y;
        if (mousedown.contents) {
          camera.contents = Camera$Rt.tilt(camera.contents, {
                x: 0.003 * dx,
                y: -0.003 * dy
              });
          renderer.contents = Renderer$Rt.setCamera(renderer.contents, camera.contents);
          return ;
        }
        
      }));

renderer.contents = Renderer$Rt.setCamera(renderer.contents, camera.contents);

var d = 1.0;

exports.style = style;
exports.canvas = canvas;
exports.camera = camera;
exports.scene = scene;
exports.renderer = renderer;
exports.d = d;
exports.prevX = prevX;
exports.prevY = prevY;
exports.mousedown = mousedown;
/* style Not a pure module */
