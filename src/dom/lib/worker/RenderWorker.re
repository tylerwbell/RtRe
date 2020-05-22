open Camera;
open Rect;

// Init
WorkerContext.trapOnWindow();
Random.init(int_of_float(Js.Date.now()));
let id = ref(0);

// Util
let log = (message: string) => {
  Js.log(string_of_int(id^) ++ " > " ++ message);
};

// TODO: support doing multiple samples here
// Render
let render =
    (scene: Scene.t, command: RenderWorkerEvent.RenderCommand.t)
    : RenderSlice.t => {
  // render configuration
  let viewport = command.viewport;
  let frame = command.frame;
  let blur = 1.0; // TODO: from command
  let rayDepth = 5; // TODO: from command

  // result slice
  let slice = RenderSlice.make(command.frame, Color.black);

  let widthF = float(viewport.width);
  let heightF = float(viewport.height);
  for (dx in 0 to frame->width - 1) {
    for (dy in 0 to frame->height - 1) {
      let x = frame->minX + dx;
      let y = frame->minY + dy;
      let ux = float(x) +. Random.float(blur) -. blur /. 2.0;
      let uy = float(y) +. Random.float(blur) -. blur /. 2.0;

      let ray =
        command.camera->rayThrough({x: ux /. widthF, y: uy /. heightF});
      let color = Tracer.trace(scene, ray, rayDepth);

      Array2d.set(slice.buffer, dx, dy, {color, samples: 1});
    };
  };

  slice;
};

let scene: ref(option(Scene.t)) = ref(None);
let commandQueue: ref(list(RenderWorkerEvent.Command.t)) = ref([]);

let processCommand = (command: RenderWorkerEvent.Command.t) => {
  log("command");
  switch (command, scene^) {
  | (Init(_), _) => ()
  | (Render(command), Some(scene)) =>
    let slice = render(scene, command);
    let result: RenderWorkerEvent.Output.t = Rendering(slice);
    WorkerContext.send(result);
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
  | [] => WorkerContext.send(RenderWorkerEvent.Output.Pull)
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

// Startup.
WorkerContext.send(RenderWorkerEvent.Output.Pull);