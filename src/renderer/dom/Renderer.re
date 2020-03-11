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

type rendering = {
  width: int,
  height: int,
  buffer: array(Color.t),
};

let render = (t: t, camera: Camera.t, scene: Scene.t): rendering => {
  let buffer = Array.make(t.width * t.height, Color.black);
  for (x in 0 to t.width - 1) {
    for (y in 0 to t.height - 1) {
      let ux = float(x) +. Random.float(t.blur) -. t.blur /. 2.0;
      let uy = float(y) +. Random.float(t.blur) -. t.blur /. 2.0;

      let ray =
        camera->rayThrough({
          x: ux /. float(t.width),
          y: uy /. float(t.height),
        });

      buffer[y * t.width + x] = Tracer.trace(scene, ray, t.depth);
    };
  };

  {width: t.width, height: t.height, buffer};
};

let draw =
    (
      context: Canvas.context2d,
      width: int,
      height: int,
      buffer: array(Color.t),
    ) => {
  for (x in 0 to width - 1) {
    for (y in 0 to height - 1) {
      let color = buffer[y * width + x];
      let correctedColor = Filter.apply(GammaFilter, color);
      context->drawPoint(correctedColor, x, y);
    };
  };
};

let render = (t: t, camera: Camera.t, scene: Scene.t, canvas: Canvas.t) => {
  Canvas.setWidth(canvas, t.width);
  Canvas.setHeight(canvas, t.height);
  let context = Canvas.getContext2d(canvas);

  let sample = ref(1);
  let buffer = Array.make(t.width * t.height, Color.black);
  let rec loop = () => {
    let sample' = sample^;
    Js.log({j|pass $sample'|j});

    let rendering = render(t, camera, scene);

    for (i in 0 to Array.length(buffer) - 1) {
      buffer[i] =
        buffer[i]
        ->multScalar(float(sample^ - 1))
        ->add(rendering.buffer[i])
        ->divScalar(float(sample^));
    };

    context->draw(t.width, t.height, buffer);

    if (sample^ < t.depth) {
      sample := sample^ + 1;
      let _ = Raf.requestAnimationFrame(_ => {loop()});
      ();
    };
  };

  loop();
};