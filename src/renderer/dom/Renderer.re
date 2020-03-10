open Camera;
open Canvas.Context2d;
open Vec3f;

let render = (camera: Camera.t, scene: Scene.t, context: Canvas.context2d) => {
  let width = 600;
  let height = 300;

  for (x in 0 to width) {
    for (y in 0 to height) {
      let ray =
        camera->rayThrough({
          x: float(x) /. float(width),
          y: float(y) /. float(height),
        });

      let color =
        switch (Tracer.trace(scene, ray)) {
        | Some(color) => color
        | None =>
          Texture.colorAt(
            scene.background,
            {x: float(x) /. float(width), y: float(y) /. float(height)},
          )
        };

      context->setFillStyle(Color.toDomRgbaString(color));
      context->fillRect(float(x), float(y), 1.0, 1.0);
    };
  };
};