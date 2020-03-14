open Camera;
open Canvas.Context2d;

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

WorkerContext.trapOnWindow();

WorkerContext.receive(event => {
  let command: RenderWorkerEvent.Command.t = WorkerEvent.decode(event);
  switch (command) {
  | Render(scene, camera, width, height) =>
    Js.log({j|worker: recv: command>render @ $width x $height|j});
    let rendering = render(width, height, 1.0, camera, scene);
    let result: RenderWorkerEvent.Result.t = Result(rendering);
    WorkerContext.send(result);
    WorkerContext.exit();
  };
});