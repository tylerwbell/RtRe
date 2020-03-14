'use strict';

var Dom$Rt = require("../common/dom/Dom.bs.js");
var Camera$Rt = require("../../lib/Scene/Camera.bs.js");
var Canvas$Rt = require("../common/canvas/Canvas.bs.js");
var Renderer$Rt = require("../lib/renderer/Renderer.bs.js");
var DefaultScene$Rt = require("./DefaultScene.bs.js");

var style = document.createElement("style");

document.head.appendChild(style);

var canvas = Canvas$Rt.create(/* () */0);

document.body.appendChild(canvas);

var camera = {
  contents: {
    position: {
      x: 0.0,
      y: 1.0,
      z: 10.0
    },
    direction: {
      x: 0.0,
      y: -0.1,
      z: -1.0
    },
    fov: 80.0,
    aspect: 2.0
  }
};

var scene = DefaultScene$Rt.make(/* () */0);

function render(param) {
  return Renderer$Rt.render({
              width: 500,
              height: 500,
              dpr: 1.0,
              samples: 40,
              blur: 0.0,
              depth: 20
            }, camera.contents, scene, canvas);
}

Dom$Rt.addKeyDownEventListener((function (keycode) {
        if (keycode >= 69) {
          if (keycode !== 83) {
            if (keycode !== 87) {
              
            } else {
              camera.contents = Camera$Rt.moveAlongDirection(camera.contents, 5.0);
            }
          } else {
            camera.contents = Camera$Rt.moveAlongDirection(camera.contents, -1.0 * 5.0);
          }
        } else if (keycode !== 65) {
          if (keycode >= 68) {
            camera.contents = Camera$Rt.move(camera.contents, {
                  x: 5.0,
                  y: 0.0,
                  z: 0.0
                });
          }
          
        } else {
          camera.contents = Camera$Rt.move(camera.contents, {
                x: -1.0 * 5.0,
                y: 0.0,
                z: 0.0
              });
        }
        return render(/* () */0);
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
        return /* () */0;
      }));

Dom$Rt.addMouseUpEventListener((function (param) {
        mousedown.contents = false;
        return /* () */0;
      }));

Dom$Rt.addMouseMoveEventListener((function (x, y) {
        var dx = prevX.contents - x | 0;
        var dy = prevY.contents - y | 0;
        prevX.contents = x;
        prevY.contents = y;
        if (mousedown.contents) {
          camera.contents = Camera$Rt.tilt(camera.contents, {
                x: 0.001 * dx,
                y: -0.001 * dy
              });
          return render(/* () */0);
        } else {
          return 0;
        }
      }));

render(/* () */0);

console.log("constructing worker");

var worker = new Worker("worker.js");

worker.postMessage("index: sending");

worker.onmessage = (function (message) {
    var data = message.data;
    console.log("index: received: " + (String(data) + ""));
    return /* () */0;
  });

var d = 5.0;

exports.style = style;
exports.canvas = canvas;
exports.camera = camera;
exports.scene = scene;
exports.render = render;
exports.d = d;
exports.prevX = prevX;
exports.prevY = prevY;
exports.mousedown = mousedown;
exports.worker = worker;
/* style Not a pure module */
