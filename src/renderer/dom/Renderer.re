open Camera;
open Canvas.Context2d;
open Vec3f;

let render = (camera: Camera.t, scene: Scene.t, context: Canvas.context2d) => {
  let origin: Vec3f.t = {x: 0.0, y: 0.0, z: 0.0};
  let dx: Vec3f.t = {x: 0.0, y: 0.0, z: 0.0};
  let dy: Vec3f.t = {x: 0.0, y: 0.0, z: 0.0};

  let width = 600;
  let height = 400;

  let texture: LinearGradient.record = {
    a: {
      x: 0.0,
      y: 0.0,
    },
    b: {
      x: 0.0,
      y: 1.0,
    },
    aColor: Color.fromRgb(1.0, 1.0, 1.0),
    bColor: Color.fromRgb(0.0, 0.8, 0.0),
  };

  for (x in 0 to width) {
    for (y in 0 to height) {
      let ray: Ray.t = {
        origin: camera.origin,
        direction:
          origin
          ->add(dx->mult(float(x) /. float(width)))
          ->add(dy->mult(float(y) /. float(height))),
      };

      let color =
        switch (Tracer.trace(scene, ray)) {
        | Some(color) => color
        | None =>
          LinearGradient.Texture.colorAt(
            texture,
            {x: float(x) /. float(width), y: float(y) /. float(height)},
          )
        };

      context->setFillStyle(Color.toDomRgbaString(color));
      context->fillRect(float(x), float(y), 1.0, 1.0);
    };
  };
};