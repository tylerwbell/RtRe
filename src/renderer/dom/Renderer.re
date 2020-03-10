open Camera;
open Canvas.Context2d;
open Vec3f;

type t = {
  width: int,
  height: int,
  samples: int,
  blur: float,
  depth: int,
};

let render = (t: t, camera: Camera.t, scene: Scene.t, canvas: Canvas.t) => {
  Canvas.setWidth(canvas, t.width);
  Canvas.setHeight(canvas, t.height);
  let context = Canvas.getContext2d(canvas);

  for (x in 0 to t.width) {
    for (y in 0 to t.height) {
      let color: ref(Color.t) = ref(Vec3f.zero);
      // TODO:
      for (_ in 0 to t.samples) {
        let ux = float(x) +. Random.float(t.blur) -. t.blur /. 2.0;
        let uy = float(y) +. Random.float(t.blur) -. t.blur /. 2.0;

        let ray =
          camera->rayThrough({
            x: ux /. float(t.width),
            y: uy /. float(t.height),
          });

        color := Tracer.trace(scene, ray, t.depth)->add(color^);
      };

      color := (color^)->divScalar(float(t.samples));
      color := Filter.apply(GammaFilter, color^);
      context->setFillStyle(Color.toDomRgbaString(color^));
      context->fillRect(float(x), float(y), 1.0, 1.0);
    };
  };
};