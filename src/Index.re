// Entry point
open Canvas.Context2d;
open Camera;

[@bs.val] external document: Js.t({..}) = "document";

let style = document##createElement("style");
document##head##appendChild(style);

type viewport = {
  width: int,
  height: int,
};

let viewport = {width: 600, height: 400};

let canvas = Canvas.createElement(viewport.width, viewport.height);
document##body##appendChild(canvas);

let context = Canvas.getContext2d(canvas);
context->setFillStyle("");

let clearColor = Color.fromRgb(0.0, 0.0, 0.0);
context->setFillStyle(Color.toDomRgbaString(clearColor));
context->fillRect(0.0, 0.0, float(viewport.width), float(viewport.height));

let camera: Camera.t = {
  origin: {
    x: 0.0,
    y: 0.0,
    z: 0.0,
  },
};

let scene: Scene.t = {
  a: {
    x: 0.0,
    y: 0.0,
    z: 0.0,
  },
};

Renderer.render(camera, scene, context);