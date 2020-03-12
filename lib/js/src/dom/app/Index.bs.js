'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Dom$Rt = require("../common/dom/Dom.bs.js");
var Color$Rt = require("../../common/color/Color.bs.js");
var Camera$Rt = require("../../lib/Scene/Camera.bs.js");
var Canvas$Rt = require("../common/canvas/Canvas.bs.js");
var Renderer$Rt = require("../renderer/Renderer.bs.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

var style = document.createElement("style");

document.head.appendChild(style);

var canvas = Canvas$Rt.create(/* () */0);

document.body.appendChild(canvas);

var camera = {
  contents: {
    position: {
      x: 0.0,
      y: 0.0,
      z: 5.0
    },
    direction: {
      x: 0.0,
      y: 0.0,
      z: -1.0
    },
    fov: 40.0,
    aspect: 2.0
  }
};

var sky = /* LinearGradient */Block.__(1, [{
      a: {
        x: 0.0,
        y: 0.0
      },
      b: {
        x: 0.0,
        y: 1.0
      },
      aColor: Color$Rt.fromRgb(0.5, 0.5, 0.1),
      bColor: Color$Rt.fromRgb(1.0, 0.8, 0.8)
    }]);

var scene_bodies = /* :: */[
  /* Sphere */[{
      center: {
        x: -0.5,
        y: 0.0,
        z: -1.0
      },
      radius: 0.5,
      material: /* Diffuse */Block.__(0, [{
            albedo: Color$Rt.fromRgb(0.8, 0.4, 0.4)
          }])
    }],
  /* :: */[
    /* Sphere */[{
        center: {
          x: -0.0,
          y: 0.1,
          z: -0.3
        },
        radius: 0.2,
        material: /* Dielectric */Block.__(2, [{
              attenuation: Color$Rt.fromRgb(0.9, 1.0, 1.0),
              refractiveIndex: 1.5
            }])
      }],
    /* :: */[
      /* Sphere */[{
          center: {
            x: 0.5,
            y: 0.0,
            z: -1.0
          },
          radius: 0.5,
          material: /* Specular */Block.__(1, [{
                albedo: Color$Rt.fromRgb(0.8, 0.6, 0.2)
              }])
        }],
      /* :: */[
        /* Sphere */[{
            center: {
              x: 0.0,
              y: -100.5,
              z: -1.0
            },
            radius: 100.0,
            material: /* Diffuse */Block.__(0, [{
                  albedo: Color$Rt.fromRgb(0.5, 0.9, 0.2)
                }])
          }],
        /* [] */0
      ]
    ]
  ]
];

var scene = {
  background: sky,
  bodies: scene_bodies
};

function render(param) {
  return Renderer$Rt.render({
              width: 500,
              height: 500,
              dpr: 2.0,
              samples: 40,
              blur: 0.0,
              depth: 20
            }, camera.contents, scene, canvas);
}

Dom$Rt.addKeyDownEventListener((function (keycode) {
        if (keycode >= 69) {
          if (keycode !== 83) {
            if (keycode !== 87) {
              throw [
                    Caml_builtin_exceptions.match_failure,
                    /* tuple */[
                      "Index.re",
                      101,
                      2
                    ]
                  ];
            }
            camera.contents = Camera$Rt.moveAlongDirection(camera.contents, 5.0);
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
          } else {
            throw [
                  Caml_builtin_exceptions.match_failure,
                  /* tuple */[
                    "Index.re",
                    101,
                    2
                  ]
                ];
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
        console.log("down");
        mousedown.contents = true;
        return /* () */0;
      }));

Dom$Rt.addMouseUpEventListener((function (param) {
        console.log("up");
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

var d = 5.0;

exports.style = style;
exports.canvas = canvas;
exports.camera = camera;
exports.sky = sky;
exports.scene = scene;
exports.render = render;
exports.d = d;
exports.prevX = prevX;
exports.prevY = prevY;
exports.mousedown = mousedown;
/* style Not a pure module */
