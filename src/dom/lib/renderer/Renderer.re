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

let workerPool: ref(list(Worker.t)) = ref([]);
let lastRendering: ref(option(Rendering.t)) = ref(None);

let rec terminateAll = (workers: list(Worker.t)) => {
  switch (workers) {
  | [head, ...tail] =>
    Worker.terminate(head);
    terminateAll(tail);
  | [] => ()
  };
};

let render =
    (t: RenderSettings.t, camera: Camera.t, scene: Scene.t, canvas: Canvas.t) => {
  Canvas.setWidth(canvas, float(t.width) *. t.dpr);
  Canvas.setHeight(canvas, float(t.height) *. t.dpr);
  let context = Canvas.getContext2d(canvas);

  terminateAll(workerPool^);
  workerPool := [];
  context->setScale(t.dpr, t.dpr);

  switch (lastRendering^) {
  | Some(rendering) => context->draw(20, rendering)
  | None => ()
  };

  for (resolution in 20 downto 20) {
    let width = t.width / resolution;
    let height = t.height / resolution;

    let worker = Worker.create(~scriptUri="worker.js");
    workerPool := [worker, ...workerPool^];
    let command: RenderWorkerEvent.Command.t =
      Render(scene, camera, width, height);
    Worker.send(worker, command);
    Worker.receive(
      worker,
      message => {
        let event: RenderWorkerEvent.Result.t = WorkerEvent.decode(message);
        Js.log("recv: result");
        switch (event) {
        | Result(rendering) =>
          lastRendering := Some(rendering);
          context->draw(resolution, rendering);
        };
      },
    );
  };
};