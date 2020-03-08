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

let viewport = {width: 700, height: 500};

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

for (x in 0 to viewport.width) {
  for (y in 0 to viewport.height) {
    let ray = camera->rayThrough(float(x), float(y));
    let color =
      switch (Tracer.trace(scene, ray)) {
      | Some(color) => color
      | None => Texture.colorAt(float(x), float(y))
      };

    context->setFillStyle(Color.toDomRgbaString(color));
    context->fillRect(float(x), float(y), 1.0, 1.0);
  };
};