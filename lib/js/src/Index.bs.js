'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Dom$Rt = require("./dom/dom/Dom.bs.js");
var Color$Rt = require("./common/color/Color.bs.js");
var Vec3f$Rt = require("./common/math/Vec3f.bs.js");
var Canvas$Rt = require("./dom/canvas/Canvas.bs.js");
var Renderer$Rt = require("./renderer/dom/Renderer.bs.js");
var CheckerTexture$Rt = require("./lib/Texture/CheckerTexture.bs.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

var style = document.createElement("style");

document.head.appendChild(style);

var canvas = Canvas$Rt.create(/* () */0);

document.body.appendChild(canvas);

var origin = {
  x: 0.0,
  y: 0.0,
  z: 0.5
};

var camera_origin = {
  contents: origin
};

var camera_basis = {
  x: -0.5,
  y: 0.5,
  z: -0.3
};

var camera_dx = {
  x: 1.0,
  y: 0.0,
  z: 0.0
};

var camera_dy = {
  x: 0.0,
  y: -1.0,
  z: 0.0
};

var camera = {
  origin: camera_origin,
  basis: camera_basis,
  dx: camera_dx,
  dy: camera_dy
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

var scene_background = /* CheckerTexture */Block.__(2, [CheckerTexture$Rt.standard]);

var scene_bodies = /* :: */[
  /* Sphere */[{
      center: {
        x: -0.5,
        y: 0.0,
        z: -1.0
      },
      radius: 0.5,
      material: /* Lambertian */Block.__(0, [{
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
        radius: 0.4,
        material: /* Dielectric */Block.__(2, [{
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
          material: /* Metal */Block.__(1, [{
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
            material: /* Metal */Block.__(1, [{
                  albedo: Color$Rt.fromRgb(0.8, 0.8, 0.6)
                }])
          }],
        /* [] */0
      ]
    ]
  ]
];

var scene = {
  background: scene_background,
  bodies: scene_bodies
};

function render(param) {
  return Renderer$Rt.render({
              width: 200,
              height: 200,
              dpr: 3.0,
              samples: 3,
              blur: 1.0,
              depth: 20
            }, camera, scene, canvas);
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
            camera_origin.contents = Vec3f$Rt.add(camera_origin.contents, {
                  x: 0.0,
                  y: 0.1,
                  z: 0.0
                });
          } else {
            camera_origin.contents = Vec3f$Rt.add(camera_origin.contents, {
                  x: 0.0,
                  y: -1.0 * 0.1,
                  z: 0.0
                });
          }
        } else if (keycode !== 65) {
          if (keycode >= 68) {
            camera_origin.contents = Vec3f$Rt.add(camera_origin.contents, {
                  x: 0.1,
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
          camera_origin.contents = Vec3f$Rt.add(camera_origin.contents, {
                x: -1.0 * 0.1,
                y: 0.0,
                z: 0.0
              });
        }
        return render(/* () */0);
      }));

render(/* () */0);

var d = 0.1;

exports.style = style;
exports.canvas = canvas;
exports.origin = origin;
exports.camera = camera;
exports.sky = sky;
exports.scene = scene;
exports.render = render;
exports.d = d;
/* style Not a pure module */
