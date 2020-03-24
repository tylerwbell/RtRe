type t = {
  settings: RenderSettings.t,
  compositor: DomCompositor.t,
  scene: option(Scene.t),
  camera: option(Camera.t),
  rendering: option(Rendering.Chunk.t),
  scheduler: RenderScheduler.t,
};

let make = (canvas: Canvas.t): t => {
  let settings = RenderSettings.default();
  let compositor =
    DomCompositor.make(canvas, settings.width, settings.height);

  let scheduler = RenderScheduler.make(DomCompositor.draw(compositor));

  {
    settings,
    compositor,
    scene: None,
    camera: None,
    rendering: None,
    scheduler,
  };
};

let dispatchRender = (t: t) => {
  switch (t.scene, t.camera) {
  | (Some(_), Some(camera)) =>
    let commands = RenderStrategy.make(t.settings, camera);
    RenderScheduler.map(t.scheduler, commands);
  | _ => ()
  };
};

let setScene = (t: t, scene: Scene.t): t => {
  let command: RenderWorkerEvent.Command.t = SetScene(scene);
  RenderScheduler.clearAndDispatchAll(t.scheduler, command);

  let t' = {...t, scene: Some(scene)};
  dispatchRender(t');
  t';
};

let setCamera = (t: t, camera: Camera.t): t => {
  let t' = {...t, camera: Some(camera)};
  dispatchRender(t');
  t';
};