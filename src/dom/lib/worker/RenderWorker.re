open Camera;
open Rect;

Random.init(int_of_float(Js.Date.now()));

let id = ref(0);
let log = (message: string) => {
  Js.log(string_of_int(id^) ++ " > " ++ message);
};

let render = (scene: Scene.t, command: RenderWorkerEvent.RenderCommand.t) => {
  // render configuration
  let frame = command.frame;
  let blur = 2.0; // TODO: from command
  let rayDepth = 10; // TODO: from command

  // output buffer
  let defaultSample: RenderSlice.sample = {color: Color.green, samples: 0};
  let buffer = Array2d.make(frame->width, frame->height, defaultSample);

  let widthF = float(frame->width);
  let heightF = float(frame->height);
  for (dx in 0 to frame->width - 1) {
    for (dy in 0 to frame->height - 1) {
      let x = frame->minX + dx;
      let y = frame->minY + dy;
      let ux = float(x) +. Random.float(blur) -. blur /. 2.0;
      let uy = float(y) +. Random.float(blur) -. blur /. 2.0;

      let ray =
        command.camera->rayThrough({x: ux /. widthF, y: uy /. heightF});
      let color = Tracer.trace(scene, ray, rayDepth);

      Array2d.set(buffer, dx, dy, {color, samples: 1});
    };
  };

  let result: RenderWorkerEvent.Output.t = Rendering({frame, buffer});
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
  | (Init(_), _) => ()
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