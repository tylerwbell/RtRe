open Camera;
open Canvas.Context2d;
open Vec3f;

let render = (camera: Camera.t, scene: Scene.t, context: Canvas.context2d) => {
  let width = 600;
  let height = 300;
  let aa = 50;
  let epsilon = 1.0;
  let traceDepth = 50;

  for (x in 0 to width) {
    for (y in 0 to height) {
      let aaColor: ref(Color.t) = ref(Vec3f.zero);
      for (_ in 0 to aa) {
        let ux = float(x) +. Random.float(epsilon) -. epsilon /. 2.0;
        let uy = float(y) +. Random.float(epsilon) -. epsilon /. 2.0;

        let ray =
          camera->rayThrough({
            x: ux /. float(width),
            y: uy /. float(height),
          });

        let color = Tracer.trace(scene, ray, traceDepth);
        aaColor := (aaColor^)->add(color);
      };

      aaColor := (aaColor^)->divScalar(float(aa));
      let colorGamma2: Color.t = {
        x: sqrt(aaColor^.x),
        y: sqrt(aaColor^.y),
        z: sqrt(aaColor^.z),
      };
      context->setFillStyle(Color.toDomRgbaString(colorGamma2));
      context->fillRect(float(x), float(y), 1.0, 1.0);
    };
  };
};