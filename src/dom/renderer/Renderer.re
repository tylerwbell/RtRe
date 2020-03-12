open Camera;
open Canvas.Context2d;
open Vec3f;

// TODO: fix depth
// TODO: fix blur
let render =
    (width: int, height: int, blur: float, camera: Camera.t, scene: Scene.t)
    : Rendering.t => {
  let buffer = Array.make(width * height, Color.black);
  for (x in 0 to width - 1) {
    for (y in 0 to height - 1) {
      let ux = float(x) +. Random.float(blur) -. blur /. 2.0;
      let uy = float(y) +. Random.float(blur) -. blur /. 2.0;

      let ray =
        camera->rayThrough({x: ux /. float(width), y: uy /. float(height)});

      buffer[y * width + x] = Tracer.trace(scene, ray, 10);
    };
  };

  {width, height, buffer};
};

let draw = (context: Canvas.context2d, pixel: int, rendering: Rendering.t) => {
  for (x in 0 to rendering.width - 1) {
    for (y in 0 to rendering.height - 1) {
      let color = rendering.buffer[y * rendering.width + x];
      let correctedColor = Filter.apply(GammaFilter, color);

      let ox = x * pixel;
      let oy = y * pixel;
      context->setFillStyle(Color.toDomRgbaString(correctedColor));
      context->fillRect(ox, oy, pixel, pixel);
    };
  };
};

let scheduler = RenderScheduler.make();

let render =
    (t: RenderSettings.t, camera: Camera.t, scene: Scene.t, canvas: Canvas.t) => {
  Canvas.setWidth(canvas, float(t.width) *. t.dpr);
  Canvas.setHeight(canvas, float(t.height) *. t.dpr);
  let context = Canvas.getContext2d(canvas);

  context->setScale(t.dpr, t.dpr);

  let resolution = ref(20);

  let rec loop = () => {
    let width = t.width / resolution^;
    let height = t.height / resolution^;
    let rendering = render(width, height, t.blur, camera, scene);
    context->draw(resolution^, rendering);

    if (resolution^ > 1) {
      resolution := resolution^ - 1;
      let id = RenderScheduler.enqueue(scheduler, loop);
      RenderScheduler.cancelBefore(scheduler, id);
    };
  };

  let id = RenderScheduler.enqueue(scheduler, loop);
  RenderScheduler.cancelBefore(scheduler, id);
};