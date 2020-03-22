open Camera;

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

let command: ref(option(RenderWorkerEvent.Command.t)) = ref(None);

let processCommand = (command: RenderWorkerEvent.Command.t) => {
  switch (command) {
  | Render(scene, camera, width, height) =>
    Js.log({j|worker: recv: command>render @ $width x $height|j});
    let rendering = render(width, height, 1.0, camera, scene);
    let result: RenderWorkerEvent.Result.t = Result(rendering);
    WorkerContext.send(result);
  };
};

// TODO:
// - start tick with command if none present.
// - store current tick to prevent making a new one.
// - clear when dequeued.
// - work queue, for active tasks and checking for cancellation.

WorkerContext.trapOnWindow();

let tick = () => {
  let _ =
    Dom.setTimeout(
      () => {
        switch (command^) {
        | Some(dequeueCommand) =>
          processCommand(dequeueCommand);
          command := None;
        | None => ()
        }
      },
      10,
    );
  ();
};

WorkerContext.receive(event => {
  command := Some(WorkerEvent.decode(event));
  tick();
});