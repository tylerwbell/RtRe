open Camera;
open Rect;
open DomCollections;

// Init
WorkerContext.trapOnWindow();
Random.init(int_of_float(Js.Date.now()));

// State
let id: ref(int) = ref(0);
let scene: ref(option(Scene.t)) = ref(None);

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
  let rayDepth = 10; // TODO: from command

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

      Uint8ColorArray2d.set(slice.buffer, dx, dy, color);
      Uint32Array2d.set(slice.samples, dx, dy, 1);
    };
  };

  slice;
};

let execute = (_: RunLoop.t, command: RenderWorkerEvent.Command.t) => {
  switch (command, scene^) {
  | (Init(id'), _) => id := id'
  | (Render(command), Some(scene)) =>
    let slice = render(scene, command);
    let result: RenderWorkerEvent.Output.t = Rendering(slice);
    let colorsBuffer =
      Uint8ClampedArray.RandomAccessCollection.buffer(
        slice.buffer.source.source,
      );
    let samplesBuffer =
      Uint32Array.RandomAccessCollection.buffer(slice.samples.source);

    WorkerContext.send(result, [|colorsBuffer, samplesBuffer|]);
  | (SetScene(t), _) => scene := Some(t)
  | (Cancel, _) =>
    failwith(
      "invalid state: `Cancel` should be processed outside the run loop.",
    )
  | (Render(_), None) =>
    failwith(
      "invalid state: `Render` should only be invoked after a Scene has been set.",
    )
  };
};

let looper =
  RunLoop.make(_ => {
    // Request more work when we are out.
    WorkerContext.send(
      RenderWorkerEvent.Output.Pull,
      [||],
    )
  });

WorkerContext.receive(event => {
  let command: RenderWorkerEvent.Command.t = WorkerEvent.decode(event);
  switch (command) {
  | Cancel => log("cancel not implemeneted")
  | _ => RunLoop.dispatch(looper, loop => {execute(loop, command)})
  };
});

// Startup.
WorkerContext.send(RenderWorkerEvent.Output.Pull);