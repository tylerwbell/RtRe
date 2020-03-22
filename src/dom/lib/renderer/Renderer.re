module Settings = {
  type t = {
    width: int,
    height: int,
    samples: int,
    blur: float,
    depth: int,
  };

  let default = (): t => {
    {width: 300, height: 300, samples: 40, blur: 0.0, depth: 20};
  };
};

type t = {
  settings: Settings.t,
  canvas: Canvas.t,
  scene: option(Scene.t),
  camera: option(Camera.t),
  rendering: option(Rendering.t),
  worker: Worker.t,
};

let make = (canvas: Canvas.t): t => {
  let settings = Settings.default();

  Canvas.setWidth(canvas, float(settings.width));
  Canvas.setHeight(canvas, float(settings.height));
  let context = Canvas.getContext2d(canvas);

  let worker = Worker.create(~scriptUri="worker.js");
  Worker.receive(
    worker,
    message => {
      let event: RenderWorkerEvent.Result.t = WorkerEvent.decode(message);
      switch (event) {
      | Result(rendering) => DomCompositor.draw(context, rendering)
      };
    },
  );

  {settings, canvas, scene: None, camera: None, rendering: None, worker};
};

let dispatchRender = (t: t) => {
  switch (t.scene, t.camera) {
  | (Some(scene), Some(camera)) =>
    let command: RenderWorkerEvent.Command.t =
      Render(scene, camera, t.settings.width, t.settings.height);
    Worker.send(t.worker, command);
  | _ => ()
  };
};

let setScene = (t: t, scene: Scene.t): t => {
  let t' = {...t, scene: Some(scene)};
  dispatchRender(t');
  t';
};

let setCamera = (t: t, camera: Camera.t): t => {
  let t' = {...t, camera: Some(camera)};
  dispatchRender(t');
  t';
};