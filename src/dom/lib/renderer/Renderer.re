open Canvas.Context2d;

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

let resolution = 2;
let worker = Worker.create(~scriptUri="worker.js");
let lastRendering: ref(option(Rendering.t)) = ref(None);
let lastContext: ref(option(Canvas.context2d)) = ref(None);
Worker.receive(
  worker,
  message => {
    let event: RenderWorkerEvent.Result.t = WorkerEvent.decode(message);
    Js.log("recv: result");
    switch (lastContext^) {
    | Some(context) =>
      switch (event) {
      | Result(rendering) =>
        lastRendering := Some(rendering);
        context->draw(resolution, rendering);
      }
    | None => ()
    };
  },
);

let render =
    (t: RenderSettings.t, camera: Camera.t, scene: Scene.t, canvas: Canvas.t) => {
  Canvas.setWidth(canvas, float(t.width) *. t.dpr);
  Canvas.setHeight(canvas, float(t.height) *. t.dpr);
  let context = Canvas.getContext2d(canvas);

  context->setScale(t.dpr, t.dpr);
  lastContext := Some(context);

  switch (lastRendering^) {
  | Some(rendering) => context->draw(resolution, rendering)
  | None => ()
  };

  let width = t.width / resolution;
  let height = t.height / resolution;
  let command: RenderWorkerEvent.Command.t =
    Render(scene, camera, width, height);
  Worker.send(worker, command);
};