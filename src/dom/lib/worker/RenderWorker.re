open Camera;

Random.init(int_of_float(Js.Date.now()));

let id = ref(0);
let log = (message: string) => {
  Js.log(string_of_int(id^) ++ " > " ++ message);
};

log("starting");

// TODO: add back blur
let render = (scene: Scene.t, command: RenderWorkerEvent.RenderCommand.t) => {
  let slice = command.slice;

  let blur = 2.0;
  let widthF = float(slice.width);
  let heightF = float(slice.height);
  let dx = slice.width - slice.x;
  let dy = slice.height - slice.y;
  log({j|rendering $dx, $dy|j});

  let defaultPoint: Rendering.Chunk.point = {color: Color.black, samples: 0};
  let buffer = Array.make(dx * dy, defaultPoint);
  for (x in slice.x to slice.x + slice.width - 1) {
    for (y in slice.y to slice.y + slice.height - 1) {
      let ux = float(x) +. Random.float(blur) -. blur /. 2.0;
      let uy = float(y) +. Random.float(blur) -. blur /. 2.0;

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
  log("complete");
};

// Init
WorkerContext.trapOnWindow();
let scene: ref(option(Scene.t)) = ref(None);
let commandQueue: ref(list(RenderWorkerEvent.Command.t)) = ref([]);

let processCommand = (command: RenderWorkerEvent.Command.t) => {
  log("command");
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
  | [] => WorkerContext.send(RenderWorkerEvent.Result.Pull)
  };
};

WorkerContext.receive(event => {
  let command: RenderWorkerEvent.Command.t = WorkerEvent.decode(event);
  switch (command) {
  | Init(id') => id := id'
  | SetScene(_) => processCommand(command)
  | Render(_) => commandQueue := [command]
  | Cancel => commandQueue := []
  };

  // Debounce
  let _ = Dom.setTimeout(0, runLoop);
  ();
});

WorkerContext.send(RenderWorkerEvent.Result.Pull);