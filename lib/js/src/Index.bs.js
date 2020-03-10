'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Color$Rt = require("./common/color/Color.bs.js");
var Canvas$Rt = require("./dom/canvas/Canvas.bs.js");
var Renderer$Rt = require("./renderer/dom/Renderer.bs.js");
var CheckerTexture$Rt = require("./lib/Texture/CheckerTexture.bs.js");

var style = document.createElement("style");

document.head.appendChild(style);

var canvas = Canvas$Rt.createElement(600, 300);

document.body.appendChild(canvas);

var context = canvas.getContext("2d");

context.fillStyle = "";

var clearColor = Color$Rt.fromRgb(0.0, 0.0, 0.0);

context.fillStyle = Color$Rt.toDomRgbaString(clearColor);

context.fillRect(0.0, 0.0, 600, 300);

var camera = {
  origin: {
    x: 0.0,
    y: 0.0,
    z: 0.0
  },
  basis: {
    x: -1.0,
    y: 0.5,
    z: -0.3
  },
  dx: {
    x: 2.0,
    y: 0.0,
    z: 0.0
  },
  dy: {
    x: 0.0,
    y: -1.0,
    z: 0.0
  }
};

var scene_background = /* CheckerTexture */Block.__(2, [CheckerTexture$Rt.standard]);

var scene_bodies = /* :: */[
  {
    center: {
      x: 0.0,
      y: 0.0,
      z: -1.0
    },
    radius: 0.5,
    color: Color$Rt.fromRgb(1.0, 0.0, 0.0)
  },
  /* :: */[
    {
      center: {
        x: 0.0,
        y: -100.5,
        z: -1.0
      },
      radius: 100.0,
      color: Color$Rt.fromRgb(1.0, 0.0, 0.0)
    },
    /* [] */0
  ]
];

var scene = {
  background: scene_background,
  bodies: scene_bodies
};

Renderer$Rt.render(camera, scene, context);

var viewport = {
  width: 600,
  height: 300
};

exports.style = style;
exports.viewport = viewport;
exports.canvas = canvas;
exports.context = context;
exports.clearColor = clearColor;
exports.camera = camera;
exports.scene = scene;
/* style Not a pure module */
