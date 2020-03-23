open Camera;

// TODO: add back blur
let render = (scene: Scene.t, command: RenderWorkerEvent.RenderCommand.t) => {
  let slice = command.slice;

  let widthF = float(slice.width);
  let heightF = float(slice.height);
  let dx = slice.width - slice.x;
  let dy = slice.height - slice.y;

  let defaultPoint: Rendering.Chunk.point = {color: Color.black, samples: 0};
  let buffer = Array.make(dx * dy, defaultPoint);
  for (x in slice.x to slice.width - 1) {
    for (y in slice.y to slice.height - 1) {
      let ux = float(x);
      let uy = float(y);

      let ray =
        command.camera->rayThrough({x: ux /. widthF, y: uy /. heightF});

      buffer[y * slice.width + x] = {
        color: Tracer.trace(scene, ray, 10),
        samples: 1,
      };
    };
  };

  let rendering: Rendering.Chunk.t = {slice, buffer};
  let result: RenderWorkerEvent.Result.t = Result(rendering);
  WorkerContext.send(result);
};

// Init
WorkerContext.trapOnWindow();
let scene: ref(option(Scene.t)) = ref(None);
let commandQueue: ref(list(RenderWorkerEvent.Command.t)) = ref([]);

let processCommand = (command: RenderWorkerEvent.Command.t) => {
  switch (command, scene^) {
  | (Render(command), Some(scene)) => render(scene, command)
  | (SetScene(t), _) => scene := Some(t)
  | (Cancel, _) => ()
  | (Render(_), None) => ()
  };
};

let rec runLoop = () => {
  switch (commandQueue^) {
  | [command, ...rest] =>
    commandQueue := rest;
    processCommand(command);
    let _ = Dom.setTimeout(0, runLoop);
    ();
  | [] => ()
  };
};

WorkerContext.receive(event => {
  let command: RenderWorkerEvent.Command.t = WorkerEvent.decode(event);
  switch (command) {
  | SetScene(_) => processCommand(command)
  | Render(_) => commandQueue := [command]
  | Cancel => commandQueue := []
  };

  // Debounce
  let _ = Dom.setTimeout(10, runLoop);
  ();
});