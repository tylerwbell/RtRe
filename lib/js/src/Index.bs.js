'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Color$Rt = require("./common/color/Color.bs.js");
var Canvas$Rt = require("./dom/canvas/Canvas.bs.js");
var Renderer$Rt = require("./renderer/dom/Renderer.bs.js");
var CheckerTexture$Rt = require("./lib/Texture/CheckerTexture.bs.js");

var style = document.createElement("style");

document.head.appendChild(style);

var canvas = Canvas$Rt.create(/* () */0);

document.body.appendChild(canvas);

var camera = {
  origin: {
    x: 0.0,
    y: 0.0,
    z: 1.0
  },
  basis: {
    x: -0.5,
    y: 0.5,
    z: -0.3
  },
  dx: {
    x: 1.0,
    y: 0.0,
    z: 0.0
  },
  dy: {
    x: 0.0,
    y: -1.0,
    z: 0.0
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
      aColor: Color$Rt.fromRgb(0.3, 0.8, 0.1),
      bColor: Color$Rt.fromRgb(0.8, 0.6, 0.6)
    }]);

var scene_background = /* CheckerTexture */Block.__(2, [CheckerTexture$Rt.standard]);

var scene_bodies = /* :: */[
  /* Sphere */[{
      center: {
        x: -1.0,
        y: 0.0,
        z: -1.0
      },
      radius: 0.5,
      material: /* Lambertian */Block.__(0, [{
            albedo: Color$Rt.fromRgb(0.8, 0.3, 0.3)
          }])
    }],
  /* :: */[
    /* Sphere */[{
        center: {
          x: 0.0,
          y: 0.0,
          z: -1.0
        },
        radius: 0.5,
        material: /* Lambertian */Block.__(0, [{
              albedo: Color$Rt.blue
            }])
      }],
    /* :: */[
      /* Sphere */[{
          center: {
            x: 1.0,
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
                  albedo: Color$Rt.fromRgb(0.8, 0.8, 0.0)
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

Renderer$Rt.render({
      width: 600,
      height: 600,
      samples: 10,
      blur: 2.0,
      depth: 10
    }, camera, scene, canvas);

exports.style = style;
exports.canvas = canvas;
exports.camera = camera;
exports.sky = sky;
exports.scene = scene;
/* style Not a pure module */
